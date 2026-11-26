// Derives the ENSIP-15 spec from Unicode data + rules.
// Port of ens-normalize.js/derive/make.js: same steps, same output, same log lines.
//
// Pipeline:
//   1. IDNA (UTS-46) gives the initial valid / ignored / mapped sets
//   2. emoji (UTS-51) are registered, and emoji characters are removed from the text sets
//   3. rules add mapped / ignored / valid characters, then remove disallowed characters
//   4. characters are partitioned into script groups (rules/scripts.ts)
//   5. combining marks are restricted (rules/cm.ts) per group
//   6. confusables (rules/confuse.ts) are resolved per group into "wholes"
//   7. leftovers are pruned, invariants are asserted, and the payloads are built

import {CONFUSE_TYPE_ALLOW, CONFUSE_TYPE_VALID, type ConfuseType, confusableSets} from './confuse.ts';
import {describer} from './describe.ts';
import {ensIdnaRules} from './idna.ts';
import {Logger} from './log.ts';
import {createNF, type NF, nfDataFromUnicode} from './nf.ts';
import type {Rules} from './rules.ts';
import {describeSelector, resolveRules} from './select.ts';
import type {UnicodeScript, UnicodeSpec, VersionInfo} from './ucd.ts';
import {type CodePoint, compareArrays, explodeCp, getOrInsert, groupBy, parseCpSequence, sortedCps} from './utils.ts';

const STOP = 0x2e; // label separator
const FE0F = 0xfe0f; // emoji style

// ************************************************************
// output types

export interface SpecGroup {
	name: string;
	restricted?: boolean;
	primary: CodePoint[];
	secondary: CodePoint[];
	cm?: {cp: CodePoint; seqs: CodePoint[][]}[];
}

export interface SpecWhole {
	target: string;
	valid: CodePoint[];
	confused: CodePoint[];
}

export interface SpecJSON {
	created: string;
	unicode: string;
	cldr: string;
	emoji: CodePoint[][];
	ignored: CodePoint[];
	mapped: [CodePoint, CodePoint[]][];
	fenced: [CodePoint, string][];
	wholes: SpecWhole[];
	cm: CodePoint[];
	nsm: CodePoint[];
	nsm_max: number;
	escape: CodePoint[];
	groups: SpecGroup[];
	nfc_check: CodePoint[];
}

export interface NFJSON {
	created: string;
	unicode: string;
	ranks: CodePoint[][];
	exclusions: CodePoint[];
	decomp: [CodePoint, CodePoint[]][];
	qc: CodePoint[];
}

export interface DeriveOutput {
	/** the ENSIP-15 spec */
	spec: SpecJSON;
	/** standalone NF data */
	nf: NFJSON;
	nfTests: Record<string, [string, string, string][]>;
	/** for emoji.html */
	emojiInfo: Record<string, unknown>[];
	/** for chars.html */
	names: unknown;
	/** for confuse.html */
	confused: unknown;
	/** every confusable set with 2+ members in groups, and what happened to each member */
	confusables: string;
}

// ************************************************************
// internal types

interface EmojiInfo {
	cps: CodePoint[];
	cp?: CodePoint;
	type: string;
	name: string;
	name0?: string;
	version?: string;
	used?: boolean;
	group?: string;
	subgroup?: string;
	component?: boolean;
}

class ScriptGroup {
	readonly validSet = new Set<CodePoint>();
	/** base cp => [cm sequence, ...] */
	readonly cmMap = new Map<CodePoint, CodePoint[][]>();
	restricted?: boolean;
	uniqueSet = new Set<CodePoint>();
	order = 0;
	/** assigned after ordering (removed groups keep undefined) */
	index?: number;
	spec?: SpecGroup;
	constructor(
		readonly name: string,
		readonly testScripts: Set<UnicodeScript>,
		readonly restScripts: Set<UnicodeScript>,
		readonly extraSet: Set<CodePoint>,
		readonly cmWhitelisted: boolean,
	) {}
	/** every cp that could appear in this group: nfc chars, their nfd parts, and whitelisted cm */
	computeParts(nf: NF): Set<CodePoint> {
		const parts = new Set(this.validSet);
		for (const cp of this.validSet) for (const x of nf.nfd([cp])) parts.add(x);
		for (const seqs of this.cmMap.values()) for (const seq of seqs) for (const x of seq) parts.add(x);
		return parts;
	}
}

interface ConfuseMember {
	cp: CodePoint;
	type?: ConfuseType;
	groups: Set<ScriptGroup>;
	restricted: boolean;
	auto?: boolean;
}

class Whole {
	/** cp => groups where cp is confusable */
	readonly map = new Map<CodePoint, Set<ScriptGroup>>();
	constructor(
		readonly target: string,
		readonly defs: ConfuseMember[],
		readonly valid: CodePoint[],
	) {}
	add(cp: CodePoint, g: ScriptGroup) {
		const set = getOrInsert(this.map, cp, () => new Set());
		set.add(g);
	}
}

const versionStr = (x: VersionInfo) => `${x.version} (${x.date})`;

export interface DeriveOptions {
	unicode: UnicodeSpec;
	rules: Rules;
	/** debugging/migration hook: called with the live sets at a stage */
	inspect?: (stage: 'disallow', sets: {valid: Set<CodePoint>; mapped: Map<CodePoint, CodePoint[]>; ignored: Set<CodePoint>}) => void;
	log?: Logger;
	/** defaults to now */
	created?: Date;
	/** skip the (slow) NF self-tests */
	skipNFTests?: boolean;
}

export function derive({unicode, rules, log = new Logger(), created = new Date(), skipNFTests, inspect}: DeriveOptions): DeriveOutput {
	const NF = createNF(nfDataFromUnicode(unicode));
	const IDNA = ensIdnaRules(unicode);
	const escaped = resolveRules(unicode, rules.charsEscape).cps;
	const desc = describer(unicode, escaped);
	const emojiDesc = (x: {cps?: readonly CodePoint[]; cp?: CodePoint; name?: string; name0?: string}) =>
		desc.emoji(x.cps ?? [x.cp!], x.name0 ? `${x.name} / ${x.name0}` : x.name);
	const CM = unicode.cm;
	const NSM = unicode.nsm;

	log.log(`Unicode Version: ${versionStr(unicode.unicodeVersion)}`);
	log.log(`CLDR Version: ${versionStr(unicode.cldrVersion)}`);

	// behavior defined by report text: flag revisions nobody has read yet (rules/reports.ts)
	for (const [tr, rev] of Object.entries(unicode.readReportRevisions())) {
		const reviewed = rules.reviewedReports[tr];
		if (reviewed !== undefined && rev > reviewed) {
			log.log(
				`*** Unreviewed report: ${tr}-${rev} (reviewed ${tr}-${reviewed}) https://www.unicode.org/reports/${tr}/${tr}-${rev}.html#Modifications`,
			);
		}
	}

	if (!skipNFTests) {
		const errors = NF.runTests(unicode.readNFTests());
		if (errors.length) throw new Error(`nf implementation wrong: ${errors.length} failures`);
		NF.runRandomTests();
	}

	// these are our primary output structures
	const ignored = new Set(IDNA.ignored);
	const valid = new Set(IDNA.valid);
	const mapped = new Map(IDNA.mapped);
	const validEmoji = new Map<string, EmojiInfo>();
	const disabledEmoji = new Map<string, EmojiInfo>();

	// a character should only be in one of the sets
	function disallowChar(cp: CodePoint) {
		const ys = mapped.get(cp);
		if (ys) {
			mapped.delete(cp);
			log.log(`Removed Mapped: ${desc.mapped(cp, ys)}`);
		} else if (ignored.delete(cp)) {
			log.log(`Removed Ignored: ${desc.cp(cp)}`);
		} else if (valid.delete(cp)) {
			log.log(`Removed Valid: ${desc.cp(cp)}`);
		}
	}

	function registerEmoji(info: EmojiInfo) {
		const {cps} = info;
		if (!Array.isArray(cps) || !cps.length) throw new Error('expected cps');
		if (!info.name) throw new Error('expected name');
		if (!info.type) throw new Error('expected type');
		const key = String.fromCodePoint(...cps);
		if (validEmoji.has(key)) throw new Error(`duplicate emoji: ${emojiDesc(info)}`);
		if (disabledEmoji.has(key)) throw new Error(`disabled emoji: ${emojiDesc(info)}`);
		log.log(`Register Emoji [${info.type}]: ${emojiDesc(info)}`);
		validEmoji.set(key, info);
	}

	function markEmojiDisabled(info: EmojiInfo) {
		info.cps ??= [info.cp!]; // make every disabled emoji a solo-sequence
		info.type = 'Disabled';
		disabledEmoji.set(String.fromCodePoint(...info.cps), info);
	}

	// ************************************************************
	// emoji

	const emojiZWJs = unicode.readEmojiZWJs();
	log.section('RGI Emoji ZWJ Sequences');
	emojiZWJs.RGI_Emoji_ZWJ_Sequence!.forEach(registerEmoji);

	const emojiSeqs = unicode.readEmojiSequences();
	log.section('RGI Emoji Keycap Sequences');
	emojiSeqs.Emoji_Keycap_Sequence!.forEach(registerEmoji);
	log.section('RGI Emoji Tag Sequences');
	emojiSeqs.RGI_Emoji_Tag_Sequence!.forEach(registerEmoji);
	log.section('RGI Emoji Modifier Sequences');
	emojiSeqs.RGI_Emoji_Modifier_Sequence!.forEach(registerEmoji);
	// note: deriving flags from CLDR regions includes EZ and QO, so use the RGI list instead
	log.section('RGI Emoji Flag Sequences');
	emojiSeqs.RGI_Emoji_Flag_Sequence!.forEach(registerEmoji);

	const emojiData = unicode.readEmojiData();
	// these records are mutated (used, cps, type) as they are processed
	const emojiMap = new Map(emojiData.Emoji!.map((x) => [x.cp, x as unknown as EmojiInfo]));

	log.section(`Demote Emoji to Characters`);
	for (const cp of rules.emojiDemoted) {
		const info = emojiMap.get(cp);
		if (!info) throw new Error(`Expected emoji: ${desc.cp(cp)}`);
		if (info.used) throw new Error(`Duplicate: ${desc.cp(cp)}`);
		info.used = true;
		log.log(`Demoted Emoji: ${emojiDesc(info)}`);
		markEmojiDisabled(info);
	}

	log.section(`Disable Emoji (and Characters)`);
	for (const cp of rules.emojiDisabled) {
		const info = emojiMap.get(cp);
		if (!info) throw new Error(`Expected emoji: ${desc.cp(cp)}`);
		if (info.used) throw new Error(`Duplicate: ${desc.cp(cp)}`);
		info.used = true;
		disallowChar(cp);
		markEmojiDisabled(info);
	}

	log.section('Remove Emoji from Characters');
	for (const info of emojiMap.values()) {
		if (!info.used) disallowChar(info.cp!);
	}

	log.section('Register Basic Emoji with Forced Emoji-Presentation');
	for (const seq of emojiSeqs.Basic_Emoji!) {
		const {cps} = seq;
		if (cps.length === 2 && cps[1] === FE0F) {
			// X + FE0F
			const info = emojiMap.get(cps[0]!);
			if (!info) throw new Error(`Expected emoji: ${emojiDesc(seq)}`);
			if (info.used) continue;
			info.used = true;
			registerEmoji(seq);
		}
	}

	log.section('Register Default Emoji-Presentation Emoji');
	for (const seq of emojiData.Emoji_Presentation!) {
		const info = emojiMap.get(seq.cp);
		if (!info) throw new Error(`Expected emoji: ${emojiDesc(seq)}`);
		if (info.used) continue;
		info.used = true;
		registerEmoji({cps: [seq.cp, FE0F], ...seq});
	}

	log.section('Register Leftover Emoji');
	for (const info of emojiMap.values()) {
		if (!info.used) registerEmoji({...info, cps: [info.cp!]});
	}

	log.section('Whitelist Emoji');
	for (const {hex, name} of rules.emojiSeqWhitelist) {
		registerEmoji({cps: parseCpSequence(hex), type: 'Whitelisted', name});
	}

	log.section('Blacklist Emoji');
	for (const def of rules.emojiSeqBlacklist) {
		const cps = typeof def === 'number' ? [def] : parseCpSequence(def);
		const key = String.fromCodePoint(...cps);
		const info = validEmoji.get(key);
		if (!info) throw new Error(`Expected emoji sequence: ${desc.seq(cps)}`);
		log.log(`Unregistered Emoji: ${emojiDesc(info)}`);
		validEmoji.delete(key);
		markEmojiDisabled(info);
	}

	// 20230903: added, is there a better official source for this stuff?
	// 20240123: fixed to deal with FE0F and multiple types per match
	// TODO: check CLDR
	log.section('Assign Emoji Groups');
	{
		const stripFE0F = (s: string) => s.replaceAll('️', '');
		const map = new Map<string, EmojiInfo>();
		for (const [k, v] of validEmoji) map.set(stripFE0F(k), v);
		for (const [k, v] of disabledEmoji) map.set(stripFE0F(k), v);
		for (const [key, tests] of groupBy(unicode.readEmojiTest(), (x) => stripFE0F(String.fromCodePoint(...x.cps)))) {
			const info = map.get(key);
			if (!info) continue;
			const test = tests.find((x) => x.type === 'fully-qualified' || x.type === 'component'); // exclusive
			if (!test) throw new Error(`Expected emoji group: ${emojiDesc(info)}`);
			info.group = test.group;
			info.subgroup = test.subgroup;
			if (test.type === 'component') info.component = true;
		}
	}

	// ************************************************************
	// characters

	log.section('Add Mapped Characters');
	for (const [x, ys] of rules.charsMapped) {
		const old = mapped.get(x);
		if (old && !compareArrays(old, ys)) throw new Error(`Duplicate mapped: ${desc.mapped(x, ys)}`);
		disallowChar(x);
		mapped.set(x, ys);
		log.log(`Add Mapped: ${desc.mapped(x, ys)}`);
	}

	log.section('Add Ignored Characters');
	for (const cp of rules.charsIgnored) {
		if (ignored.has(cp)) throw new Error(`Already ignored: ${desc.cp(cp)}`);
		disallowChar(cp);
		ignored.add(cp);
		log.log(`Added Ignored: ${desc.cp(cp)}`);
	}

	log.section('Add Valid Characters');
	for (const cp of rules.charsValid) {
		if (valid.has(cp)) {
			log.log(`*** Already valid: ${desc.cp(cp)}`);
			continue;
		}
		disallowChar(cp);
		valid.add(cp);
		log.log(`Added Valid: ${desc.cp(cp)}`);
	}

	// 20221213: this comes after Adds
	log.section('Remove Disallowed Characters');
	{
		inspect?.('disallow', {valid, mapped, ignored});
		const {byRule, warnings} = resolveRules(unicode, rules.charsDisallowed);
		for (const w of warnings) log.log(`*** ${w}`);
		for (const [rule, cps] of byRule) {
			const live = cps.filter((cp) => valid.has(cp) || mapped.has(cp) || ignored.has(cp));
			log.log(`Rule: ${rule.reason ?? describeSelector(rule)} [${live.length}/${cps.length}]`);
			for (const cp of live) disallowChar(cp);
		}
	}
	disallowChar(STOP);

	log.section(`Apply ScriptExt`);
	for (const [cp, change] of rules.scriptExtensions) {
		try {
			if (!valid.has(cp)) throw new Error(`Not Valid`);
			const char = unicode.requireChar(cp);
			let abbrs: string[];
			if (Array.isArray(change)) {
				abbrs = change;
			} else {
				const current = char.getExtended().map((x) => x.abbr);
				for (const x of change.remove) if (!current.includes(x)) throw new Error(`Not present: ${x}`);
				abbrs = current.filter((x) => !change.remove.includes(x));
			}
			// an explicit [] leaves the char with no script: it joins only groups that list it in `extra`
			if (!abbrs.length && !Array.isArray(change)) throw new Error(`Empty`);
			const scripts = [...new Set(abbrs.toSorted().map((x) => unicode.requireScript(x)))];
			log.log(`${desc.cp(cp)} [${char.getExtended().map((x) => x.abbr)} => ${scripts.map((x) => x.abbr)}]`);
			char.extended = scripts; // replace
		} catch (err) {
			throw new Error(`ScriptExt "${(err as Error).message}": ${desc.cp(cp)}`);
		}
	}

	// ************************************************************
	// groups

	log.section('Create Groups');
	const untested = new Set(unicode.scriptMap.values());
	untested.delete(unicode.requireScript('Zinh')); // should not be testable
	untested.delete(unicode.requireScript('Zzzz')); // should not be used
	let groups: ScriptGroup[] = [];
	for (const config of rules.scriptGroups) {
		const {name, test, rest = [], extra = [], cm = false} = config;
		try {
			if (!name) throw new Error(`Expected name`);
			if (!test.length) throw new Error(`Expected test`);
			const testSet = new Set<UnicodeScript>();
			for (const abbr of test) {
				const script = unicode.requireScript(abbr);
				// every testable script can only be used once
				if (!untested.delete(script)) throw new Error(`Duplicate: ${script.description}`);
				testSet.add(script);
			}
			const restSet = new Set<UnicodeScript>();
			for (const abbr of rest) {
				const script = unicode.requireScript(abbr);
				if (testSet.has(script)) throw new Error(`Test + Rest: ${script.description}`);
				if (restSet.has(script)) throw new Error(`Duplicate: ${script.description}`);
				restSet.add(script);
			}
			const extraSet = new Set(extra.flatMap((x) => (typeof x === 'string' ? explodeCp(x) : [x])));
			groups.push(new ScriptGroup(name, testSet, restSet, extraSet, cm));
		} catch (err) {
			throw new Error(`Script group ${JSON.stringify(config)}: ${(err as Error).message}`);
		}
	}
	for (const abbr of rules.disallowedScripts) {
		const script = unicode.requireScript(abbr);
		if (!untested.delete(script)) throw new Error(`Missing disallowed script: ${script.description}`);
		log.log(`Disallowed Script: ${script.description}`);
	}
	for (const abbr of rules.restrictedScripts) {
		const script = unicode.requireScript(abbr);
		if (!untested.delete(script)) throw new Error(`Missing restricted script: ${script.description}`);
		const g = new ScriptGroup(script.abbr, new Set([script]), new Set(), new Set(), false);
		g.restricted = true;
		groups.push(g);
	}
	// UAX-31: Limited Use and Excluded scripts can only be restricted (or disallowed),
	// and groups can only be identified by Recommended scripts
	{
		const restrictedOrDisallowed = new Set([...rules.restrictedScripts, ...rules.disallowedScripts]);
		for (const script of unicode.scriptMap.values()) {
			if (script.type && script.abbr !== 'Zzzz' && script.map.size && !restrictedOrDisallowed.has(script.abbr)) {
				throw new Error(`UAX-31 ${script.type} script must be restricted or disallowed: ${script.description}`);
			}
		}
		for (const g of groups) {
			for (const script of g.testScripts) {
				if (!g.restricted && script.type)
					throw new Error(`Group "${g.name}" is identified by a ${script.type} script: ${script.description}`);
			}
		}
		log.checked('UAX-31 script kinds');
	}
	if (untested.size) {
		throw new Error(`leftover scripts: ${[...untested].map((x) => x.description).join(', ')}`);
	}
	for (const cp of valid) {
		const scripts = unicode.requireChar(cp).getExtended();
		let joined = false;
		for (const g of groups) {
			if (scripts.some((s) => g.testScripts.has(s) || g.restScripts.has(s)) || g.extraSet.has(cp)) {
				g.validSet.add(cp);
				joined = true;
			}
		}
		if (!scripts.length && !joined) throw new Error(`No script and no group lists it in extra: ${desc.cp(cp)}`);
	}
	log.table(
		['Valid', 'Name', 'Test', 'Rest', 'Extra'],
		groups.map((g) => [
			g.validSet.size,
			g.name + (g.restricted ? ' [R]' : ''),
			[...g.testScripts].map((s) => s.abbr).join('+'),
			[...g.restScripts].map((s) => s.abbr).join('+'),
			[...g.extraSet].map((cp) => desc.str([cp])).join(''),
		]),
	);

	// ************************************************************
	// combining marks

	log.section(`Compute CM Whitelist`);
	const cmWhitelist = new Set<string>();
	for (const form of rules.cmWhitelist) {
		const cps = NF.nfc(explodeCp(form));
		try {
			const key = String.fromCodePoint(...cps);
			if (cmWhitelist.has(key)) throw new Error('Duplicate');
			cmWhitelist.add(key);
			const [base, ...cms] = cps as [CodePoint, ...CodePoint[]];
			const baseChar = unicode.requireChar(base);
			if (!valid.has(base)) throw new Error(`Base not Valid: ${desc.cp(base)}`);
			if (baseChar.isCM) throw new Error(`Base is CM: ${desc.cp(base)}`);
			const gs = groups.filter((g) => g.validSet.has(base));
			if (!gs.length) throw new Error(`No group`);
			for (const cp of cms) {
				if (!unicode.requireChar(cp).isCM) throw new Error(`Not CM: ${desc.cp(cp)}`);
				if (!valid.has(cp)) throw new Error(`CM not Valid: ${desc.cp(cp)}`);
				for (const g of gs) {
					if (!g.validSet.has(cp)) throw new Error(`Group "${g.name} missing CM: ${desc.cp(cp)}`);
				}
			}
			for (const g of gs) {
				const v = getOrInsert(g.cmMap, base, () => []);
				v.push(cms);
			}
			log.log(
				`${desc.seq(cps)} <${cms.length}> "${NF.nfd(cps)
					.map((cp) => desc.str([cp]))
					.join('+')}" [${gs.map((g) => g.name)}]`,
			);
		} catch (err) {
			throw new Error(`Whitelist CM "${form}": ${(err as Error).message}`);
		}
	}

	for (const g of groups) {
		const purged: CodePoint[] = [];
		if (g.cmWhitelisted) {
			// allow only whitelisted cm, remove unreachable
			const cm = new Set([...g.cmMap.values()].flat(2));
			for (const cp of g.validSet) {
				if (g.cmMap.has(cp)) continue; // whitelisted
				if (CM.has(cp) && cm.has(cp)) continue; // necessary
				if (NF.nfd([cp]).every((x) => !CM.has(x) || cm.has(x))) continue;
				purged.push(cp);
			}
		} else {
			// remove any char that decomposes into duplicate nsm
			for (const cp of g.validSet) {
				const nsm = NF.nfd([cp]).filter((x) => NSM.has(x));
				if (nsm.length > 1 && new Set(nsm).size < nsm.length) purged.push(cp);
				if (nsm.length > rules.nsmMax) throw new Error('missing optimization'); // no need to remove these if none exist
			}
		}
		if (!purged.length) continue;
		log.section(`Purge CM: ${g.name} (${purged.length})`);
		for (const cp of purged) {
			g.validSet.delete(cp);
			log.log(desc.mapped(cp, NF.nfd([cp])));
		}
	}

	// ************************************************************
	// confusables

	log.section('Compute Confusables');
	const confusablesReport: string[] = [];
	const wholes: Whole[] = [];
	const confusedUnion = new Set<CodePoint>();
	{
		const parts = new Map(groups.map((g) => [g, g.computeParts(NF)]));
		const {sets, warnings} = confusableSets(unicode.readConfusables(), rules.confuse);
		for (const w of warnings) log.log(`*** confuse: ${w}`);
		for (const {target, members} of sets) {
			const defs: ConfuseMember[] = [];
			for (const {cp, type} of members) {
				// assert that every confusable is unique
				// note: this is tested before group tests, so this includes invalid characters
				if (confusedUnion.has(cp)) throw new Error(`Duplicate confusable "${target}": ${desc.cp(cp)}`);
				confusedUnion.add(cp);
				switch (type) {
					case undefined:
					case CONFUSE_TYPE_VALID:
					case CONFUSE_TYPE_ALLOW:
						break;
					default:
						throw new Error(`Unknown confusable type "${type}": ${desc.cp(cp)}`);
				}
				// find the groups that COULD contain this character
				let gs = groups.filter((g) => parts.get(g)!.has(cp));
				// TODO: not really sure how to handle confusable-cms
				if (CM.has(cp)) gs = gs.filter((g) => !g.cmWhitelisted); // already handled via whitelist
				if (!gs.length) continue;
				defs.push({cp, type, groups: new Set(gs), restricted: gs.every((g) => g.restricted)});
			}
			if (defs.length < 2) continue;
			const union = new Set(defs.flatMap((x) => [...x.groups]));

			// if there's no decisions and only 1 character is in an unrestricted group, make it valid
			if (!defs.some((x) => x.type)) {
				const free = defs.filter((x) => !x.restricted);
				if (free.length === 1) {
					free[0]!.auto = true;
					free[0]!.type = CONFUSE_TYPE_VALID;
				}
			}

			const whole = new Whole(
				target,
				defs,
				defs.filter((x) => x.type === CONFUSE_TYPE_VALID).map((x) => x.cp),
			);
			wholes.push(whole);

			const unresolved = new Map<string, ScriptGroup[]>();
			// for output/confusables.txt: cp => what happened per group
			const status = new Map<CodePoint, string[]>(defs.map((x) => [x.cp, []]));
			const note = (cp: CodePoint, g: ScriptGroup, what: string) => status.get(cp)!.push(`${g.name}: ${what}`);
			for (const g of union) {
				const confuse = defs.filter((x) => x.groups.has(g));
				if (confuse.some((x) => x.type)) {
					// if there's any decisions, use them
					for (const def of confuse) {
						switch (def.type) {
							case CONFUSE_TYPE_VALID:
								note(def.cp, g, def.auto ? 'valid (auto)' : 'valid');
								break; // char can be used freely
							case CONFUSE_TYPE_ALLOW:
								whole.add(def.cp, g);
								note(def.cp, g, 'allowed, whole-script checked');
								break; // char requires additional hints
							default:
								g.validSet.delete(def.cp); // char is single-script confusable
								note(def.cp, g, 'REMOVED');
						}
					}
					continue;
				}
				// there's only 1 for this group, ALLOW it
				if (confuse.length === 1) {
					whole.add(confuse[0]!.cp, g);
					note(confuse[0]!.cp, g, 'allowed, whole-script checked');
					continue;
				}
				// there are 2+ confusables without a decision for the same group
				const key = confuse
					.map((x) => x.cp)
					.toSorted()
					.join(); // note: lexicographic, only used as a key
				const v = getOrInsert(unresolved, key, () => []);
				v.push(g);
				for (const def of confuse) {
					if (rules.confuse.defaultAllow) {
						whole.add(def.cp, g);
						note(def.cp, g, 'allowed, whole-script checked (unresolved)');
					} else {
						g.validSet.delete(def.cp);
						note(def.cp, g, 'REMOVED (unresolved)');
					}
				}
			}
			if (!whole.map.size && !whole.valid.length) throw new Error(`Confusable without member: ${target}`);
			confusablesReport.push(`[${target}] ${defs.map((x) => desc.str([x.cp])).join(' ')}`);
			for (const x of defs) confusablesReport.push(`\t${desc.cp(x.cp)}\t${status.get(x.cp)!.join('; ')}`);
			for (const def of defs) {
				if (def.type !== CONFUSE_TYPE_VALID) continue;
				if (def.auto) {
					log.log(
						`Auto-Override: ${desc.cp(def.cp)} [${[...def.groups].map((g) => g.name)} vs ${[...union].filter((g) => !def.groups.has(g)).map((g) => g.name)}]`,
					);
				} else {
					log.log(`Override: ${desc.cp(def.cp)} [${[...def.groups].map((g) => g.name)}]`);
				}
			}
			for (const [key, gs] of unresolved) {
				const cps = key.split(',').map((s) => parseInt(s, 10));
				log.log(`Unresolved: [${gs.map((g) => g.name)}] ${cps.map((x) => desc.cp(x)).join(' vs ')}`);
			}
		}
	}

	// find characters that can never be part of a name or its construction
	log.section('Disallow Leftover Characters');
	const partsUnion = new Set(groups.flatMap((g) => [...g.computeParts(NF)]));
	for (const cp of valid) {
		if (!partsUnion.has(cp)) disallowChar(cp);
	}

	// this should be last so we don't need to recover toggled mappings
	// a mapping is removed only if its target has a character that is never valid (eg. Ď => ď), so the
	// source becomes a disallowed character instead: every label using it was already invalid.
	// note: "İ" [130] => "i + ◌̇" [69 307] stays: both are valid somewhere, and labels using it fail
	//   later with "unsupported combining mark". Intended, so no extra pass for non-NFC targets.
	log.section('Remove Invalid Mappings');
	for (const [x, ys] of mapped) {
		if (!ys.every((cp) => valid.has(cp))) {
			mapped.delete(x);
			log.log(`Removed Mapping: ${desc.mapped(x, ys)}`);
		}
	}

	log.section('Remove Empty Groups');
	groups = groups.filter((g) => {
		if (g.validSet.size) return true;
		log.log(`Removed Group: ${g.name}`);
		// remove whole links
		// note: upstream also dropped every whole without confused members here, which made
		// confused.json depend on whether any group happened to be empty (spec.json filters them anyway)
		for (const w of wholes) {
			for (const [cp, set] of w.map) {
				if (set.delete(g) && !set.size) w.map.delete(cp);
			}
		}
		return false;
	});

	// ************************************************************
	// invariants

	log.section('Assert Invariants');

	for (const cp of ignored) {
		if (valid.has(cp)) throw new Error(`Ignored is Valid: ${desc.cp(cp)}`);
		if (mapped.has(cp)) throw new Error(`Ignored is Mapped: ${desc.cp(cp)}`);
	}
	log.checked(`Ignored`);

	for (const [x, ys] of mapped) {
		if (valid.has(x)) throw new Error(`Mapped is Valid: ${desc.mapped(x, ys)}`);
	}
	log.checked('Mapped is Valid');

	if (valid.has(STOP)) throw new Error(`Stop is Valid`);
	for (const [x, ys] of mapped) {
		if (x === STOP || ys.includes(STOP)) throw new Error(`Mapped contains Stop: ${desc.mapped(x, ys)}`);
	}
	log.checked(`Stop isn't Mapped`);

	for (const cp of valid) {
		if (!NF.isNFC(cp)) throw new Error(`Valid Non-NFC: ${desc.cp(cp)}`);
	}
	log.checked(`Valid are NFC`);

	// this prevents us from disabling a non-trivial intermediate part
	for (const cp0 of valid) {
		for (const cp of NF.innerParts(cp0)) {
			if (!valid.has(cp)) throw new Error(`Not Closed: ${desc.cp(cp0)} w/part ${desc.cp(cp)}`);
		}
	}
	log.checked(`Valid is Closed (via Brute-force)`);

	for (const cp of escaped) {
		if (valid.has(cp)) throw new Error(`Escaped character is valid: ${desc.cp(cp)}`);
	}
	log.checked(`No Valid Escaped`);

	for (const cp of unicode.getNoncharacterCps()) {
		if (valid.has(cp)) throw new Error(`Non-character is valid: ${desc.cp(cp)}`);
	}
	log.checked('No Valid Non-Characters');

	for (let cp = 0xd800; cp <= 0xdfff; cp++) {
		if (valid.has(cp)) throw new Error(`Surrogate is valid: ${desc.cp(cp)}`);
	}
	log.checked(`No Valid Surrogates`);

	const fencedMap = new Map<CodePoint, string>();
	for (const [cp, name] of rules.charsFenced) {
		if (!valid.has(cp)) throw new Error(`Fenced character is not valid: ${desc.cp(cp)}`);
		if (!name) throw new Error(`Fenced character needs a name: ${desc.cp(cp)}`);
		fencedMap.set(cp, name);
	}
	log.checked('Fenced are Valid');

	const nonzeroCC = new Set([...unicode.charMap.values()].filter((x) => x.cc).map((x) => x.cp));
	for (const info of validEmoji.values()) {
		const {cps} = info;
		if (nonzeroCC.has(cps[0]!) || nonzeroCC.has(cps.at(-1)!)) {
			throw new Error(`Emoji with non-zero CC Boundary: ${emojiDesc(info)}`);
		}
	}
	log.checked('Emoji Boundaries');

	for (const info of validEmoji.values()) {
		const {cps} = info;
		if (compareArrays(cps, NF.nfc(cps))) throw new Error(`Emoji doesn't survive NFC: ${emojiDesc(info)}`);
		if (compareArrays(cps, NF.nfd(cps))) throw new Error(`Emoji doesn't survive NFD: ${emojiDesc(info)}`);
	}
	log.checked('Emoji are NF-Safe');

	// check that ASCII can be fast-pathed
	for (let cp = 0; cp < 0x80; cp++) {
		if (!valid.has(cp)) continue;
		const fail = (msg: string) => new Error(`ASCII ${desc.cp(cp)}: ${msg}`);
		const char = unicode.requireChar(cp);
		if (!char.script) throw fail(`Missing script`);
		if (!NF.isDecomposed(cp)) throw fail(`Decomposes`);
		if (char.isCM) throw fail('CM');
		if (fencedMap.has(cp)) throw fail('Fenced');
		if (wholes.some((w) => w.map.has(cp))) throw fail('Whole');
		if (char.script.abbr !== 'Zyyy' && char.script.abbr !== 'Latn') throw fail(`Unexpected script: ${char.script.description}`);
	}
	log.checked(`Fastpath ASCII`);

	for (const g of groups) {
		if (!/^[A-Z][a-z]*$/.test(g.name)) throw new Error(`Group name isn't [A-Z][a-z]*: ${g.name}`);
	}
	log.checked(`Groups Names are A-Z`);

	log.section('Find Unique Characters');
	const validUnion = new Set<CodePoint>();
	const multiGroup = new Set<CodePoint>();
	for (const g of groups) {
		for (const cp of g.validSet) {
			if (validUnion.has(cp)) {
				multiGroup.add(cp);
			} else {
				validUnion.add(cp);
			}
		}
	}
	const validUnique = new Set([...validUnion].filter((cp) => !multiGroup.has(cp)));
	log.log(`Valid: ${validUnion.size}`);
	log.log(`Multi: ${multiGroup.size}`);
	log.log(`Unique: ${validUnique.size}`);
	for (const g of groups) {
		g.uniqueSet = new Set([...validUnique].filter((cp) => g.validSet.has(cp)));
	}

	for (const cp of validUnique) {
		const gs = groups.filter((g) => g.validSet.has(cp));
		if (!gs.length) throw new Error('bug');
		if (gs.some((g) => g.cmWhitelisted !== gs[0]!.cmWhitelisted)) {
			throw new Error(`Different CM style: ${desc.cp(cp)} [${gs.map((g) => `${g.name}=${g.cmWhitelisted}`)}]`);
		}
	}
	log.checked(`Matching Groups have Same CM Style`);

	for (const w of wholes) {
		for (const [cp, set] of w.map) {
			for (const g of set) {
				if (!g.validSet.has(cp)) throw new Error(`Whole member not valid: ${g.name} ${desc.cp(cp)}`);
			}
		}
	}
	log.checked(`Wholes are Valid`);

	// a confused cp only matters if another group (outside its extent) holds a lookalike. With none, the
	// whole-script check stops at it, an accidental exemption: eg. Han-internal sets made those Han
	// chars end the check early, unlike any other Han char. Prune them, then assert none are left.
	// complements() mirrors src/ensip15.ts (and ens-normalize.js) exactly.
	const complements = (w: Whole) => {
		const extents: {groups: Set<ScriptGroup>; cps: CodePoint[]}[] = [];
		for (const cp of sortedCps([...w.valid, ...w.map.keys()])) {
			const gs = groups.filter((g) => g.validSet.has(cp));
			let ext = extents.find((x) => gs.some((g) => x.groups.has(g)));
			if (!ext) {
				ext = {groups: new Set(), cps: []};
				extents.push(ext);
			}
			ext.cps.push(cp);
			for (const g of gs) ext.groups.add(g);
		}
		const union = extents.flatMap((x) => [...x.groups]);
		const map = new Map<CodePoint, ScriptGroup[]>();
		for (const {groups, cps} of extents) {
			const complement = union.filter((g) => !groups.has(g));
			for (const cp of cps) map.set(cp, complement);
		}
		return map;
	};
	log.section('Prune Inert Confusables');
	{
		let pruned = 0;
		for (const w of wholes) {
			if (!w.map.size) continue;
			const comp = complements(w);
			const inert = [...w.map.keys()].filter((cp) => !comp.get(cp)!.length);
			if (!inert.length) continue;
			for (const cp of inert) w.map.delete(cp);
			pruned += inert.length;
			log.log(`[${w.target}] ${inert.map((cp) => desc.cp(cp)).join(' ')}`);
		}
		log.log(`Pruned: ${pruned}`);
	}
	for (const w of wholes) {
		const comp = complements(w);
		for (const cp of w.map.keys()) {
			if (!comp.get(cp)!.length) throw new Error(`Confusable has no lookalike in another group: ${desc.cp(cp)}`);
		}
	}
	log.checked('Confusables have a Lookalike Group');

	const confusedWhole = wholes.flatMap((w) => [...w.map.keys()]);
	const confusedValid = wholes.flatMap((w) => w.valid);
	log.log(`Confusable: ${confusedWhole.length}`);
	log.log(`Not Confusable: ${confusedValid.length}`);
	log.log(`Non-Confusable Non-Unique: ${confusedValid.filter((cp) => validUnique.has(cp)).length}`);

	// ************************************************************
	// compress

	log.section('Compress Wholes');
	const specWholes: SpecWhole[] = wholes
		.filter((w) => w.map.size)
		.map((w) => ({target: w.target, valid: sortedCps(w.valid), confused: sortedCps(w.map.keys())}));

	log.section('Compress Groups');
	for (const g of groups) {
		let cm: SpecGroup['cm'];
		if (g.cmWhitelisted) {
			cm = [];
			for (const [cp, seqs] of g.cmMap) {
				if (seqs.length === 1 && !seqs[0]!.length) continue; // just a valid char
				cm.push({cp, seqs: seqs.toSorted(compareArrays)});
			}
			cm.sort((a, b) => a.cp - b.cp);
		}
		const primary: CodePoint[] = [];
		const secondary: CodePoint[] = [];
		for (const cp of sortedCps(g.validSet)) {
			if (
				unicode
					.requireChar(cp)
					.getExtended()
					.some((s) => g.testScripts.has(s))
			) {
				primary.push(cp);
			} else {
				secondary.push(cp);
			}
		}
		g.spec = {name: g.name, restricted: g.restricted, primary, secondary, cm};
	}

	log.section('Order Groups');
	// the order is a fixed priority (rules/group-order.ts): the first matching group names a label,
	// and names the group in "illegal mixture" errors, so changing it changes output
	for (const name of rules.groupOrder) {
		if (!groups.some((g) => g.name === name)) throw new Error(`group-order: unknown group: ${name}`);
	}
	for (const g of groups) {
		const i = rules.groupOrder.indexOf(g.name);
		if (i < 0 && !g.restricted) throw new Error(`group-order: unrestricted group needs a position: ${g.name}`);
		g.order = i < 0 ? Infinity : i; // unlisted restricted groups keep rules/scripts.ts order
	}
	groups.sort((a, b) => Number(!!a.restricted) - Number(!!b.restricted) || a.order - b.order || 0);
	for (const [i, g] of groups.entries()) g.index = i;
	log.checked(`All Unrestricted before Restricted`);
	log.checked(`Ordered by rules/group-order.ts`);

	log.section('Group Summary');
	log.table(
		['Order', 'Valid', 'Unique', 'Primary', 'Secondary', 'CM', 'Group'],
		groups.map((g, i) => [
			i + 1,
			g.validSet.size,
			g.uniqueSet.size,
			g.spec!.primary.length,
			g.spec!.secondary.length,
			g.cmWhitelisted ? `${g.spec!.cm!.length}/${g.cmMap.size}` : '',
			g.name,
		]),
	);

	// union of non-zero combining class + nfc_qc
	log.section('NFC Quick Check');
	const ranks = unicode.combiningRanks();
	const nfcQC = unicode.readNFProps().qc.NFC_QC!.map((x) => x[0]);
	const nfcCheck0 = [...new Set([...ranks.flat(), ...nfcQC])];
	const nfcCheck = nfcCheck0.filter((cp) => partsUnion.has(cp));
	log.log(`Optimized: ${nfcCheck0.length} => ${nfcCheck.length}`);

	log.section('Compute NSM from Groups w/o CM Whitelist');
	const nsms = groups.filter((g) => !g.cmWhitelisted).map((g) => [...g.computeParts(NF)].filter((cp) => NSM.has(cp)));
	const nsm = new Set(nsms.flat());
	log.log(`CM(${CM.size}) => NSM(${NSM.size}) => ${nsm.size}`);
	log.log(`Per Group Max: ${Math.max(...nsms.map((v) => v.length))}`);

	// characters new in this Unicode version that ended up valid need a human decision
	log.section(`Review: New in ${unicode.unicodeVersion.version}`);
	{
		const age = unicode.unicodeVersion.version.split('.').slice(0, 2).join('.');
		const fresh = sortedCps(validUnion).filter((cp) => unicode.requireChar(cp).age === age);
		// restricted groups are single-script by construction, so summarize them
		const restricted = new Map<string, number>();
		for (const cp of fresh) {
			const gs = groups.filter((g) => g.validSet.has(cp));
			if (gs.every((g) => g.restricted)) {
				for (const g of gs) restricted.set(g.name, (restricted.get(g.name) ?? 0) + 1);
			} else {
				log.log(`${desc.cp(cp)} [${gs.map((g) => g.name)}]`);
			}
		}
		for (const [name, n] of restricted) log.log(`Restricted ${name}: ${n}`);
		log.log(`New Valid: ${fresh.length}`);
	}

	// ************************************************************
	// payloads

	const createdStr = created.toJSON();
	const unicodeStr = versionStr(unicode.unicodeVersion);
	const spec: SpecJSON = {
		created: createdStr,
		unicode: unicodeStr,
		cldr: versionStr(unicode.cldrVersion),
		emoji: [...validEmoji.values()].map((x) => x.cps).sort(compareArrays),
		ignored: sortedCps(ignored),
		mapped: [...mapped].sort((a, b) => a[0] - b[0]),
		fenced: [...fencedMap].sort((a, b) => a[0] - b[0]),
		wholes: specWholes,
		cm: sortedCps(CM),
		nsm: sortedCps(nsm),
		nsm_max: rules.nsmMax,
		escape: sortedCps(escaped),
		groups: groups.map((g) => g.spec!),
		nfc_check: sortedCps(nfcCheck),
	};

	// this file should be independent so we can create a standalone nf implementation
	const nf: NFJSON = {
		created: createdStr,
		unicode: unicodeStr,
		ranks, // already sorted
		exclusions: sortedCps(unicode.readCompositionExclusions()),
		decomp: unicode.decompositions(), // already sorted
		qc: sortedCps(nfcQC),
	};

	const emojiInfo = [...validEmoji.values(), ...disabledEmoji.values()].map((info) => {
		const {cp, cps, used, ...rest} = info;
		return {form: String.fromCodePoint(...cps), ...rest};
	});

	const chars = [...unicode.charMap.values()];
	const names = {
		chars: chars.filter((x) => !x.range).map((x) => [x.cp, x.getName(true)]),
		ranges: [...new Set(chars.map((x) => x.range).filter((x) => x))].map((x) => [x!.cp0, x!.cp1, x!.prefix]),
		scripts: [...unicode.scriptMap.values()].map(({name, abbr, map}) => ({name, abbr, cps: sortedCps(map.keys())})),
	};

	const confused = {
		wholes: wholes.map(({target, valid, map, defs}) => ({
			target,
			valid: sortedCps(valid),
			confused: sortedCps(map.keys()),
			defs: defs.map(({cp, type, groups}) => ({cp, type, groups: [...groups].map((g) => g.index)})),
		})),
	};

	const confusables = [
		'# Confusable sets (Unicode confusables.txt + rules/confuse.ts) with 2+ members in groups',
		'# [prototype] members, then per member: what happened in each group',
		...confusablesReport,
	].join('\n');
	return {spec, nf, nfTests: unicode.readNFTests(), emojiInfo, names, confused, confusables: `${confusables}\n`};
}
