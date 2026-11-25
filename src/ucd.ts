// Parsers for the Unicode Character Database (+ related UTS data files) and CLDR extracts.
// Files are read exactly as downloaded from unicode.org (see scripts/download-unicode.ts).

import {readFileSync} from 'node:fs';
import {type CodePoint, explodeCp, getOrInsert, hexCp, MAX_CP, parseCp, parseCpRange, parseCpSequence} from './utils.ts';

export const DATA_DIR = new URL('../data/', import.meta.url);

export const AUGMENTED_ALL = 'ALL';

export type ScriptType = 'Excluded' | 'LimitedUse';
export const SCRIPT_TYPE_EXCLUDED: ScriptType = 'Excluded';
export const SCRIPT_TYPE_LIMITED_USE: ScriptType = 'LimitedUse';

// https://www.unicode.org/reports/tr39/#def-augmented-script-set
// 20240910: no change (16.0.0)
// 20250914: no change (17.0.0)
// 20260520: no change (18.0.0)
// note: this is a UTS-39 (confusable detection) concept and is independent of the
// UAX-31 identifier status, so Bopo => Hanb still holds even though Bopo is now Limited Use
export function augmentScriptSet(set: Set<string>): Set<string> {
	if (set.has('Hani')) {
		set.add('Hanb');
		set.add('Jpan');
		set.add('Kore');
	}
	if (set.has('Hira')) set.add('Jpan');
	if (set.has('Kana')) set.add('Jpan');
	if (set.has('Hang')) set.add('Kore');
	if (set.has('Bopo')) set.add('Hanb');
	if (set.has('Zyyy') || set.has('Zinh')) {
		set.clear();
		set.add(AUGMENTED_ALL);
	}
	return set;
}

/** "\x{23}" => "#" */
export function unescapeUnicodeString(s: string): string {
	return s.replace(/\\x\{([0-9a-f]{2,})\}/gi, (_, x) => String.fromCodePoint(parseInt(x, 16)));
}

/**
 * Generic parser for the UCD "a ; b ; c # comment" format.
 * `row` receives the trimmed fields and the trailing comment (if any).
 * `comment` receives comment-only lines.
 */
export function parseSemicolonFile(
	file: URL,
	row: (fields: string[], comment: string | undefined) => void,
	comment?: (text: string) => void,
) {
	const text = readFileSync(file, 'utf8');
	for (let line of text.split('\n')) {
		let rest: string | undefined;
		const pos = line.indexOf('#');
		if (pos >= 0) {
			rest = line.slice(pos + 1).trim();
			line = line.slice(0, pos);
		}
		line = line.trim();
		try {
			if (line) {
				row(
					line.split(';').map((s) => s.trim()),
					rest,
				);
			} else if (rest) {
				comment?.(rest);
			}
		} catch (cause) {
			throw new Error(`Error parsing ${file.pathname}: ${line}`, {cause});
		}
	}
}

/** parse "Key ; cps" files into {Key: [cp, ...]} */
function parseRangeBuckets(file: URL): Record<string, CodePoint[]> {
	const root: Record<string, CodePoint[]> = {};
	parseSemicolonFile(file, ([src, key]) => {
		if (!src || !key) throw new Error('expected src + key');
		root[key] ??= [];
		root[key].push(...parseCpRange(src));
	});
	return root;
}

function bucket<T>(root: Record<string, T[]>, key: string | undefined): T[] {
	if (!key) throw new Error(`empty bucket key`);
	root[key] ??= [];
	return root[key];
}

function parseEmojiVersion(comment: string | undefined): string {
	const match = comment?.match(/^E(\d+.\d+)\b/);
	if (!match) throw new Error(`expected version: ${comment}`);
	return match[1]!;
}

export interface CharRange {
	cp0: CodePoint;
	cp1: CodePoint;
	prefix: string;
}

export class UnicodeChar {
	cp!: CodePoint;
	name!: string;
	oldName?: string;
	/** general category */
	gc!: string;
	/** canonical combining class */
	cc!: number;
	bidiClass!: string;
	bidiMirrored!: boolean;
	decompType?: string;
	decomp?: CodePoint[];
	upper?: CodePoint;
	lower?: CodePoint;
	title?: CodePoint;
	/** set when this char is part of a "<X, First>..<X, Last>" range */
	range?: CharRange;
	/** CLDR short name */
	short?: string;
	script!: UnicodeScript;
	/** script extensions (if different from [script]) */
	extended?: UnicodeScript[];
	/** Blocks.txt (every assigned char is in a block) */
	block!: UnicodeBlock;
	/** DerivedAge.txt: version that assigned this char, eg. "18.0" */
	age!: string;

	static parse(v: string[]): UnicodeChar {
		// https://www.unicode.org/reports/tr44/#UnicodeData.txt
		if (v.length !== 15) throw new Error(`missing columns`);
		const c = new UnicodeChar();
		c.cp = parseCp(v[0]!);
		c.name = v[1]!;
		c.gc = v[2]!;
		c.cc = parseInt(v[3]!, 10);
		c.bidiClass = v[4]!;
		// "" | "<tag>" | "XXXX YYYY" | "<tag>XXXX YYYY"
		let temp = v[5]!;
		if (temp.startsWith('<')) {
			const pos = temp.indexOf('>');
			if (pos === -1) throw new Error('expected closing bracket');
			c.decompType = temp.slice(1, pos);
			temp = temp.slice(pos + 1).trim();
			if (temp) c.decomp = parseCpSequence(temp);
		} else if (temp) {
			c.decomp = parseCpSequence(temp);
		}
		c.bidiMirrored = v[9] === 'Y';
		if (v[10]) c.oldName = v[10];
		if (v[12]) c.upper = parseCp(v[12]);
		if (v[13]) c.lower = parseCp(v[13]);
		if (v[14]) c.title = parseCp(v[14]);
		return c;
	}
	get isCM() {
		return this.gc.startsWith('M');
	}
	get isNSM() {
		return this.gc === 'Mn' || this.gc === 'Me';
	}
	getName(useShort = false): string {
		const {name, range, short, oldName} = this;
		if (useShort && short) return short;
		if (range) {
			const {prefix, cp0, cp1} = range;
			let s = `${prefix}-${hexCp(this.cp)}`;
			// 20230517: if short name, don't include range index
			if (!useShort) s += ` [${1 + this.cp - cp0}/${1 + cp1 - cp0}]`;
			return s;
		}
		if (name === '<control>' && oldName) return oldName;
		return name;
	}
	getExtended(): UnicodeScript[] {
		return this.extended ?? [this.script];
	}
	toString() {
		return `UnicodeChar(${hexCp(this.cp)}, ${this.name})`;
	}
}

export class UnicodeScript {
	type?: ScriptType;
	readonly map = new Map<CodePoint, UnicodeChar>();
	constructor(
		readonly abbr: string,
		readonly name: string,
	) {}
	get description() {
		let desc = `[${this.abbr}] ${this.name}`;
		switch (this.type) {
			case SCRIPT_TYPE_EXCLUDED:
				desc += ' [X]';
				break;
			case SCRIPT_TYPE_LIMITED_USE:
				desc += ' [L]';
				break;
		}
		return desc;
	}
	toString() {
		return `UnicodeScript(${this.abbr}, ${this.name})`;
	}
}

export interface UnicodeBlock {
	name: string;
	cp0: CodePoint;
	cp1: CodePoint;
	/** assigned chars */
	chars: UnicodeChar[];
}

export interface VersionInfo {
	version: string;
	date: string;
	[key: string]: unknown;
}

export interface Release {
	spec_hash?: string;
	library?: string;
	unicode: string;
	cldr: string;
	tag?: string;
}

export interface EmojiRecord {
	cps: CodePoint[];
	type: string;
	name: string;
	version: string;
}

export interface EmojiDataRecord {
	cp: CodePoint;
	type: string;
	name: string;
	/** full Unicode name, when different from the CLDR short name */
	name0?: string;
	version: string;
}

export interface EmojiTestRecord {
	cps: CodePoint[];
	type: string;
	group?: string;
	subgroup?: string;
}

export interface IdnaTable {
	valid: string[];
	valid_NV8: string[];
	valid_XV8: string[];
	deviation_mapped: [string, string][];
	deviation_ignored: string[];
	disallowed: string[];
	disallowed_STD3_mapped: [string, string][];
	disallowed_STD3_valid: string[];
	ignored: string[];
	mapped: [string, string][];
}

export class UnicodeSpec {
	static releases(): Release[] {
		return JSON.parse(readFileSync(new URL('releases.json', DATA_DIR), 'utf8'));
	}
	/** release = "current" | "prior" (tag), "17" | "17.0.0" (unicode version), "#3" (index) */
	static fromRelease(release = 'current'): UnicodeSpec {
		const v = UnicodeSpec.releases();
		let info: Release | undefined;
		if (/^#\d+$/.test(release)) {
			info = v[parseInt(release.slice(1), 10)];
		} else if (/^[\d.]+$/.test(release)) {
			const want = release.split('.').concat('0', '0').slice(0, 3).join('.');
			info = v.findLast((x) => x.unicode === want);
		} else {
			info = v.find((x) => x.tag === release);
		}
		if (!info) throw new Error(`unknown release: ${release}`);
		return UnicodeSpec.fromVersions(info);
	}
	static fromVersions({unicode, cldr}: {unicode: string; cldr: string}): UnicodeSpec {
		return new this(new URL(`unicode/${unicode}/`, DATA_DIR), new URL(`cldr/${cldr}/`, DATA_DIR));
	}

	readonly unicodeVersion: VersionInfo;
	readonly cldrVersion: VersionInfo;
	readonly charMap: Map<CodePoint, UnicodeChar>;
	readonly scriptMap = new Map<string, UnicodeScript>();
	readonly blocks: UnicodeBlock[];
	/** gc = M* */
	readonly cm: Set<CodePoint>;
	/** gc = Mn | Me */
	readonly nsm: Set<CodePoint>;

	constructor(
		readonly dataDir: URL,
		readonly cldrDir: URL,
	) {
		this.unicodeVersion = this.readJSON(dataDir, 'version.json');
		this.cldrVersion = this.readJSON(cldrDir, 'version.json');
		this.charMap = new Map(this.readUCD().map((x) => [x.cp, x]));
		const chars = [...this.charMap.values()];
		this.cm = new Set(chars.filter((x) => x.isCM).map((x) => x.cp));
		this.nsm = new Set(chars.filter((x) => x.isNSM).map((x) => x.cp));
		// add all single char CLDR short names
		// since they are lost due to the A..B syntax
		// emoji sequences already have proper names
		for (const [form, name] of Object.entries(this.readShortNames())) {
			const cps = explodeCp(form);
			if (cps.length === 1) {
				const info = this.charMap.get(cps[0]!);
				if (info) info.short = name;
			}
		}
		const name2abbr = new Map(this.readPropertyValueAliases().sc!.map((v) => [v[1]!, v[0]!]));
		for (const [name, cps] of this.readScripts()) {
			const abbr = name2abbr.get(name);
			if (!abbr) throw new TypeError(`unknown script: ${name}`);
			const script = new UnicodeScript(abbr, name.replaceAll('_', ' '));
			for (const cp of cps) {
				const char = this.requireChar(cp);
				script.map.set(cp, char);
				char.script = script;
			}
			this.scriptMap.set(abbr, script);
		}
		// "All code points not explicitly listed for Script have the value Unknown (Zzzz)."
		const unknown = new UnicodeScript('Zzzz', 'Unknown');
		unknown.type = SCRIPT_TYPE_EXCLUDED;
		this.scriptMap.set(unknown.abbr, unknown);
		for (const char of this.charMap.values()) {
			if (!char.script) {
				char.script = unknown;
				unknown.map.set(char.cp, char);
			}
		}
		for (const [cp, abbrs] of this.readScriptExtensions()) {
			this.requireChar(cp).extended = abbrs.toSorted().map((x) => this.requireScript(x)); // sorted, assume unique
		}
		const {limited_use, excluded} = this.readScriptKinds();
		for (const abbr of excluded) this.requireScript(abbr).type = SCRIPT_TYPE_EXCLUDED;
		for (const abbr of limited_use) this.requireScript(abbr).type = SCRIPT_TYPE_LIMITED_USE;
		this.blocks = this.readBlocks().map(([cp0, cp1, name]) => {
			const block: UnicodeBlock = {name, cp0, cp1, chars: []};
			for (let cp = cp0; cp <= cp1; cp++) {
				const char = this.charMap.get(cp);
				if (!char) continue;
				char.block = block;
				block.chars.push(char);
			}
			return block;
		});
		for (const [age, cps] of Object.entries(this.readAges())) {
			for (const cp of cps) {
				const char = this.charMap.get(cp);
				if (char) char.age = age;
			}
		}
		for (const char of this.charMap.values()) {
			if (!char.block) throw new Error(`no block: ${char}`);
			if (!char.age) throw new Error(`no age: ${char}`);
		}
	}

	private file(name: string) {
		return new URL(name, this.dataDir);
	}
	private readJSON<T>(dir: URL, name: string): T {
		return JSON.parse(readFileSync(new URL(name, dir), 'utf8'));
	}

	// ************************************************************
	// characters

	requireChar(cp: CodePoint): UnicodeChar {
		const char = this.charMap.get(cp);
		if (!char) throw new TypeError(`invalid codepoint: ${hexCp(cp)}`);
		return char;
	}
	requireBlock(name: string): UnicodeBlock {
		const block = this.blocks.find((x) => x.name === name);
		if (!block) throw new TypeError(`unknown block: ${name}`);
		return block;
	}
	requireScript(abbr: string): UnicodeScript {
		const script = this.scriptMap.get(abbr);
		if (!script) throw new TypeError(`unknown script abbr: ${abbr}`);
		return script;
	}
	getName(cp: CodePoint, useShort = false): string {
		return this.charMap.get(cp)?.getName(useShort) ?? `???-${hexCp(cp)}`;
	}

	// ************************************************************
	// scripts

	getScript(cp: CodePoint): UnicodeScript | undefined {
		return this.charMap.get(cp)?.script;
	}
	getExtendedScriptSet(x: string | CodePoint | readonly CodePoint[]): Set<UnicodeScript> {
		const ret = new Set<UnicodeScript>();
		for (const cp of explodeCp(x)) {
			const info = this.charMap.get(cp);
			if (!info) continue;
			for (const s of info.getExtended()) ret.add(s);
		}
		return ret;
	}
	getAugmentedScriptSet(x: string | CodePoint | readonly CodePoint[]): Set<string> {
		return augmentScriptSet(new Set([...this.getExtendedScriptSet(x)].map((s) => s.abbr)));
	}
	// https://www.unicode.org/reports/tr39/#def-resolved-script-set
	getResolvedScriptSet(x: string | CodePoint | readonly CodePoint[]): Set<string> {
		const cps = explodeCp(x);
		if (!cps.length) return new Set();
		let resolved = this.getAugmentedScriptSet(cps[0]!);
		for (let i = 1; i < cps.length; i++) {
			const set = this.getAugmentedScriptSet(cps[i]!);
			if (set.has(AUGMENTED_ALL)) continue;
			if (resolved.has(AUGMENTED_ALL)) {
				resolved = set;
			} else {
				for (const abbr of resolved) {
					if (!set.has(abbr)) resolved.delete(abbr);
				}
			}
		}
		return resolved;
	}

	// ************************************************************
	// UCD

	readUCD(): UnicodeChar[] {
		// 0000;<control>;Cc;0;BN;;;;;N;NULL;;;;
		// 4E00;<CJK Ideograph, First>;Lo;0;L;;;;;N;;;;;
		// 9FFF;<CJK Ideograph, Last>;Lo;0;L;;;;;N;;;;;
		const root: UnicodeChar[] = [];
		parseSemicolonFile(this.file('UnicodeData.txt'), (v) => {
			const char = UnicodeChar.parse(v);
			if (char.name.endsWith(', Last>')) {
				const first = root.pop();
				if (!first?.name.endsWith(', First>')) throw new Error(`expected first`);
				const range: CharRange = {cp0: first.cp, cp1: char.cp, prefix: first.name.slice(1, -8)};
				for (let cp = range.cp0; cp <= range.cp1; cp++) {
					const temp = Object.assign(new UnicodeChar(), char);
					temp.cp = cp;
					temp.name = range.prefix;
					temp.range = range;
					root.push(temp);
				}
			} else {
				root.push(char);
			}
		});
		return root;
	}
	readProps(): Record<string, CodePoint[]> {
		// 0009..000D    ; White_Space # Cc   [5] <control-0009>..<control-000D>
		return parseRangeBuckets(this.file('PropList.txt'));
	}
	readCoreProps(): Record<string, CodePoint[]> {
		// 003C..003E    ; Math # Sm   [3] LESS-THAN SIGN..GREATER-THAN SIGN
		return parseRangeBuckets(this.file('DerivedCoreProperties.txt'));
	}
	readPropertyValueAliases(): Record<string, string[][]> {
		// sc ; Latn ; Latin
		const root: Record<string, string[][]> = {};
		parseSemicolonFile(this.file('PropertyValueAliases.txt'), ([key, ...a]) => {
			bucket(root, key).push(a);
		});
		return root;
	}
	/** WARNING: returns full names, eg. ["Latin", [...]] */
	readScripts(): [string, CodePoint[]][] {
		// 0000..001F    ; Common # Cc  [32] <control-0000>..<control-001F>
		return Object.entries(parseRangeBuckets(this.file('Scripts.txt')));
	}
	/** [[cp0, cp1, name], ...] */
	readBlocks(): [CodePoint, CodePoint, string][] {
		// 0000..007F; Basic Latin
		const root: [CodePoint, CodePoint, string][] = [];
		parseSemicolonFile(this.file('Blocks.txt'), ([src, name]) => {
			const cps = parseCpRange(src!);
			root.push([cps[0]!, cps.at(-1)!, name!]);
		});
		return root;
	}
	/** {"1.1": [cp, ...], ...} */
	readAges(): Record<string, CodePoint[]> {
		// 0000..001F    ; 1.1 #  [32] <control-0000>..<control-001F>
		return parseRangeBuckets(this.file('DerivedAge.txt'));
	}
	readScriptExtensions(): [CodePoint, string[]][] {
		// 102E1..102FB  ; Arab Copt # No  [27] COPTIC EPACT DIGIT ONE..COPTIC EPACT NUMBER NINE HUNDRED
		const root: [CodePoint, string[]][] = [];
		parseSemicolonFile(this.file('ScriptExtensions.txt'), ([src, abbrs]) => {
			const v = abbrs!.split(/\s+/);
			for (const cp of parseCpRange(src!)) root.push([cp, v]);
		});
		return root;
	}
	readScriptKinds(): {limited_use: string[]; excluded: string[]; recommended: string[]} {
		const {limited_use, excluded, recommended} = this.readJSON<Record<string, string[]>>(this.dataDir, 'script-kinds.json');
		return {limited_use: limited_use!, excluded: excluded!, recommended: recommended!};
	}
	getNoncharacterCps(): CodePoint[] {
		// https://www.unicode.org/versions/corrigendum9.html
		return this.readProps().Noncharacter_Code_Point!;
	}
	getUnassignedCps(): CodePoint[] {
		const cps: CodePoint[] = [];
		for (let cp = 0; cp <= MAX_CP; cp++) {
			if (!this.charMap.has(cp)) cps.push(cp);
		}
		return cps;
	}

	// ************************************************************
	// normalization

	/** [[cp, ...], ...] grouped by increasing combining class (skips cc=0) */
	combiningRanks(): CodePoint[][] {
		const map = new Map<number, CodePoint[]>();
		for (const {cp, cc} of this.charMap.values()) {
			if (cc > 0) {
				const v = getOrInsert(map, cc, () => []);
				v.push(cp);
			}
		}
		return [...map].sort((a, b) => a[0] - b[0]).map((x) => x[1]);
	}
	/** [[cc, [cp, ...]], ...] sorted by cc */
	combiningClasses(): [number, CodePoint[]][] {
		const map = new Map<number, CodePoint[]>();
		for (const {cp, cc} of this.charMap.values()) {
			const v = getOrInsert(map, cc, () => []);
			v.push(cp);
		}
		return [...map].sort((a, b) => a[0] - b[0]);
	}
	/** canonical decompositions: [[cp, [cp, ...]], ...] */
	decompositions(compat = false): [CodePoint, CodePoint[]][] {
		// "the presence of a formatting tag also indicates that the mapping is a compatibility mapping"
		return [...this.charMap.values()].filter((x) => x.decomp && (compat || !x.decompType)).map((x) => [x.cp, x.decomp!]);
	}
	readCompositionExclusions(): CodePoint[] {
		// 0958    #  DEVANAGARI LETTER QA
		const root: CodePoint[] = [];
		parseSemicolonFile(this.file('CompositionExclusions.txt'), ([src]) => {
			root.push(parseCp(src!));
		});
		return root;
	}
	readNFProps(): {
		qc: Record<string, [CodePoint, string][]>;
		fc: Record<string, [CodePoint, CodePoint[]][]>;
		props: Record<string, CodePoint[]>;
	} {
		// 11127       ; NFKC_QC                     ; M         # Mn CHAKMA VOWEL SIGN A
		// 037A        ; FC_NFKC                     ; 0020 03B9 # Lm GREEK YPOGEGRAMMENI
		// 1F73        ; Full_Composition_Exclusion              # L& GREEK SMALL LETTER EPSILON WITH OXIA
		const qc: Record<string, [CodePoint, string][]> = {};
		const fc: Record<string, [CodePoint, CodePoint[]][]> = {};
		const props: Record<string, CodePoint[]> = {};
		parseSemicolonFile(this.file('DerivedNormalizationProps.txt'), ([src, type, value]) => {
			if (type!.endsWith('_QC')) {
				const v = bucket(qc, type);
				for (const cp of parseCpRange(src!)) v.push([cp, value!]);
			} else if (type!.startsWith('FC_')) {
				bucket(fc, type).push([parseCp(src!), parseCpSequence(value!)]);
			} else {
				bucket(props, type).push(...parseCpRange(src!));
			}
		});
		return {qc, fc, props};
	}
	/** {"Part0: ...": [[input, nfd, nfc], ...]} */
	readNFTests(): Record<string, [string, string, string][]> {
		const root: Record<string, [string, string, string][]> = {};
		let test: [string, string, string][] | undefined;
		parseSemicolonFile(this.file('NormalizationTest.txt'), ([src, nfc, nfd], comment) => {
			if (src!.startsWith('@')) {
				test = bucket(root, comment?.trim());
			} else {
				if (!test) throw new Error('expected test');
				const [a, b, c] = [src!, nfd!, nfc!].map((s) => String.fromCodePoint(...parseCpSequence(s)));
				test.push([a!, b!, c!]);
			}
		});
		return root;
	}

	// ************************************************************
	// IDNA

	readIDNA(): IdnaTable {
		const root: Record<string, (string | [string, string])[]> = {};
		parseSemicolonFile(this.file('IdnaMappingTable.txt'), ([src, type, dst, status]) => {
			if (!src || !type) throw new Error('expected src + type');
			if (type === 'deviation') type = dst ? 'deviation_mapped' : 'deviation_ignored';
			if (status) type = `${type}_${status}`; // NV8/XV8
			const v = bucket(root, type);
			if (type.includes('mapped')) {
				if (!dst) throw new Error('expected dst');
				v.push([src, dst]);
			} else {
				v.push(src);
			}
		});
		const known: (keyof IdnaTable)[] = [
			'valid',
			'valid_NV8',
			'valid_XV8',
			'deviation_mapped',
			'deviation_ignored',
			'disallowed',
			'disallowed_STD3_mapped',
			'disallowed_STD3_valid',
			'ignored',
			'mapped',
		];
		const extra = Object.keys(root).filter((k) => !known.includes(k as keyof IdnaTable));
		if (extra.length) throw new Error(`unknown IDNA keys: ${extra}`);
		return Object.fromEntries(known.map((k) => [k, root[k] ?? []])) as unknown as IdnaTable;
	}

	// ************************************************************
	// emoji

	readEmojiZWJs(): Record<string, EmojiRecord[]> {
		// 1F468 200D 2764 FE0F 200D 1F468 ; RGI_Emoji_ZWJ_Sequence  ; couple with heart: man, man # E2.0   [1] (👨‍❤️‍👨)
		const root: Record<string, EmojiRecord[]> = {};
		parseSemicolonFile(this.file('emoji-zwj-sequences.txt'), ([src, type, name], comment) => {
			const cps = parseCpSequence(src!);
			const version = parseEmojiVersion(comment);
			bucket(root, type).push({cps, type: type!, name: name!, version});
		});
		return root;
	}
	readEmojiSequences(): Record<string, EmojiRecord[]> {
		// 231A..231B    ; Basic_Emoji                  ; watch                              # E0.6   [2] (⌚..⌛)
		// 0023 FE0F 20E3; Emoji_Keycap_Sequence        ; keycap: \x{23}                     # E0.6   [1] (#️⃣)
		const root: Record<string, EmojiRecord[]> = {};
		parseSemicolonFile(this.file('emoji-sequences.txt'), ([src, type, name], comment) => {
			const version = parseEmojiVersion(comment);
			const v = bucket(root, type);
			if (src!.includes('..')) {
				for (const cp of parseCpRange(src!)) {
					v.push({cps: [cp], type: type!, name: this.getName(cp, true), version});
				}
			} else {
				v.push({cps: parseCpSequence(src!), type: type!, name: unescapeUnicodeString(name!), version});
			}
		});
		return root;
	}
	readEmojiData(): Record<string, EmojiDataRecord[]> {
		// 0030..0039    ; Emoji                # E0.0  [10] (0️..9️)    digit zero..digit nine
		const root: Record<string, EmojiDataRecord[]> = {};
		parseSemicolonFile(this.file('emoji-data.txt'), ([src, type], comment) => {
			const version = parseEmojiVersion(comment);
			const v = bucket(root, type);
			for (const cp of parseCpRange(src!)) {
				const name = this.getName(cp, true);
				const name0 = this.getName(cp, false);
				v.push({cp, type: type!, name, name0: name === name0 ? undefined : name0, version});
			}
		});
		return root;
	}
	readEmojiTest(): EmojiTestRecord[] {
		// # group: Smileys & Emotion
		// # subgroup: face-smiling
		// 263A FE0F ; fully-qualified     # ☺️ E0.6 smiling face
		const root: EmojiTestRecord[] = [];
		let group: string | undefined;
		let subgroup: string | undefined;
		parseSemicolonFile(
			this.file('emoji-test.txt'),
			([src, type]) => {
				root.push({cps: parseCpSequence(src!), type: type!, group, subgroup});
			},
			(s) => {
				const g = s.match(/^group:(.*)$/);
				const sg = s.match(/^subgroup:(.*)$/);
				if (g) group = g[1]!.trim();
				if (sg) subgroup = sg[1]!.trim();
			},
		);
		return root;
	}

	// ************************************************************
	// security

	/** [[target, [cp, ...]], ...]: SINGLE characters that are confusable with a SEQUENCE */
	readConfusables(): [CodePoint[], CodePoint[]][] {
		// 06E8 ;	0306 0307 ;	MA	# ( ۨ → ̆̇ ) ARABIC SMALL HIGH NOON → COMBINING BREVE, COMBINING DOT ABOVE
		const map = new Map<string, CodePoint[]>();
		parseSemicolonFile(this.file('confusables.txt'), ([src, target]) => {
			const key = String.fromCodePoint(...parseCpSequence(target!));
			const v = getOrInsert(map, key, () => []);
			v.push(parseCp(src!));
		});
		return [...map].map(([key, cps]) => [explodeCp(key), cps]);
	}
	/** [[cp, cp], ...] */
	readIntentionalConfusables(): [CodePoint, CodePoint][] {
		// 0021 ;	01C3	#* ( ! ~ ǃ ) EXCLAMATION MARK ~ LATIN LETTER RETROFLEX CLICK
		const root: [CodePoint, CodePoint][] = [];
		parseSemicolonFile(this.file('intentional.txt'), ([a, b]) => {
			root.push([parseCp(a!), parseCp(b!)]);
		});
		return root;
	}
	readAllowedIdentifiers(): CodePoint[] {
		// 002D..002E ; Allowed    # 1.1    [2] HYPHEN-MINUS..FULL STOP
		const root: CodePoint[] = [];
		parseSemicolonFile(this.file('IdentifierStatus.txt'), ([src, type]) => {
			if (type !== 'Allowed') throw new Error(`unexpected type: ${type}`);
			root.push(...parseCpRange(src!));
		});
		return root;
	}
	readIdentifierTypes(): Record<string, CodePoint[]> {
		return parseRangeBuckets(this.file('IdentifierType.txt'));
	}

	// ************************************************************
	// CLDR

	/** {"emoji-form-without-FE0F": "short name"} */
	readShortNames(): Record<string, string> {
		return this.readJSON(this.cldrDir, 'short-names.json');
	}
	readRegions(): string[] {
		return this.readJSON(this.cldrDir, 'regions.json');
	}
}
