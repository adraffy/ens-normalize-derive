// Reference ENSIP-15 implementation that runs directly on output/spec.json + output/nf.json.
//
// Unoptimized on purpose: it mirrors ens-normalize.js (src/lib.js) step for step, including the
// error messages, so it can (1) generate tests.json for a spec without building a library first,
// and (2) be checked against the released library: with baseline/1.11.1 it must reproduce
// @adraffy/ens-normalize@1.11.1 exactly (see scripts/parity.ts).
//
// Differences from 1.11.1, none of which changes a registered label (parity still holds):
//   20261126: in a group without a CM whitelist, a combining mark's base must be primary (checkGroup)
//   20261126: a combining mark that doesn't fit the group is "unsupported combining mark" instead of an
//     "illegal mixture" naming whichever group lists the mark first (errorGroupMember). Same outcome,
//     different message: scripts/parity.ts accepts this pair.
//
// https://docs.ens.domains/ensip/15

import type {NFJSON, SpecJSON} from './derive.ts';
import {createNF, type NF} from './nf.ts';
import {type CodePoint, compareArrays, explodeCp, hexCp} from './utils.ts';

const HYPHEN = 0x2d;
const UNDERSCORE = 0x5f;
const STOP = '.';
const FE0F = 0xfe0f;
const XI_SMALL = 0x3be;
const XI_CAPITAL = 0x39e;

interface Group {
	/** "Latin" or "Restricted[Bopo]" */
	name: string;
	restricted: boolean;
	primary: Set<CodePoint>;
	secondary: Set<CodePoint>;
	/** true if not CM-whitelisted: check NSM rules */
	checkNSM: boolean;
}

interface Whole {
	members: CodePoint[];
	/** cp => groups (outside cp's extent) that contain a lookalike */
	complements: Map<CodePoint, Set<Group>>;
}

/** a text run (NFC) or an emoji (fully-qualified) */
export interface Token {
	cps: CodePoint[];
	emoji?: boolean;
}

export interface Label {
	input: CodePoint[];
	/** codepoint offset of the label in the name */
	offset: number;
	tokens?: Token[];
	output?: CodePoint[];
	emoji?: boolean;
	/** "ASCII", "Emoji", a group name, or "Restricted[Xxxx]" */
	type?: string;
	error?: Error;
}

const UNIQUE = Symbol('unique non-confusable');

const strFromCps = (cps: readonly CodePoint[]) => String.fromCodePoint(...cps);
const quoteCp = (cp: CodePoint) => `{${hexCp(cp)}}`;
const bidiQQ = (s: string) => `"${s}"‎`; // strong LTR after the quote

export class ENSIP15 {
	readonly nf: NF;
	readonly mapped: Map<CodePoint, CodePoint[]>;
	readonly ignored: Set<CodePoint>;
	readonly cm: Set<CodePoint>;
	readonly nsm: Set<CodePoint>;
	readonly nsmMax: number;
	readonly escape: Set<CodePoint>;
	readonly fenced: Map<CodePoint, string>;
	readonly groups: Group[];
	/** every cp that can appear in a valid label (incl. NFD parts) */
	readonly valid: Set<CodePoint>;
	readonly emoji: CodePoint[][];
	private readonly wholeMap = new Map<CodePoint, Whole | typeof UNIQUE>();
	private readonly emojiRoot: EmojiNode = new Map();

	constructor(spec: SpecJSON, nf: Pick<NFJSON, 'ranks' | 'exclusions' | 'decomp'>) {
		this.nf = createNF(nf);
		this.mapped = new Map(spec.mapped);
		this.ignored = new Set(spec.ignored);
		this.cm = new Set(spec.cm);
		this.nsm = new Set(spec.nsm);
		this.nsmMax = spec.nsm_max;
		this.escape = new Set(spec.escape);
		this.fenced = new Map(spec.fenced);
		this.groups = spec.groups.map((g) => ({
			name: g.restricted ? `Restricted[${g.name}]` : g.name,
			restricted: !!g.restricted,
			primary: new Set(g.primary),
			secondary: new Set(g.secondary),
			checkNSM: !Array.isArray(g.cm),
		}));

		// wholes: members are sorted by cp (as the library decodes them)
		const wholeValid = new Set(spec.wholes.flatMap((w) => w.valid));
		const wholes: Whole[] = spec.wholes.map((w) => ({
			members: [...w.valid, ...w.confused].sort((a, b) => a - b),
			complements: new Map(),
		}));
		for (const w of wholes) {
			for (const cp of w.members) if (!wholeValid.has(cp)) this.wholeMap.set(cp, w);
		}
		for (const w of new Set(this.wholeMap.values()) as Set<Whole>) {
			// connect the groups that share each whole member into extents
			const extents: {groups: Set<Group>; cps: CodePoint[]}[] = [];
			for (const cp of w.members) {
				const gs = this.groups.filter((g) => groupHas(g, cp));
				let ext = extents.find((x) => gs.some((g) => x.groups.has(g)));
				if (!ext) {
					ext = {groups: new Set(), cps: []};
					extents.push(ext);
				}
				ext.cps.push(cp);
				for (const g of gs) ext.groups.add(g);
			}
			const union = extents.flatMap((x) => [...x.groups]);
			for (const {groups, cps} of extents) {
				const complement = new Set(union.filter((g) => !groups.has(g)));
				for (const cp of cps) w.complements.set(cp, complement);
			}
		}

		// valid = union of groups; unique non-confusables get a placeholder
		this.valid = new Set();
		const multi = new Set<CodePoint>();
		for (const g of this.groups) {
			for (const cp of [...g.primary, ...g.secondary]) {
				if (this.valid.has(cp)) multi.add(cp);
				else this.valid.add(cp);
			}
		}
		for (const cp of this.valid) {
			if (!this.wholeMap.has(cp) && !multi.has(cp)) this.wholeMap.set(cp, UNIQUE);
		}
		for (const cp of this.nf.nfd([...this.valid])) this.valid.add(cp);

		// emoji trie: FE0F is optional everywhere it appears in the fully-qualified form
		this.emoji = spec.emoji.map((v) => v.slice()).sort(compareArrays);
		for (const cps of this.emoji) {
			let prev: EmojiNode[] = [this.emojiRoot];
			for (const cp of cps) {
				const next = prev.map((node) => {
					let child = node.get(cp);
					if (!child) {
						child = new Map();
						node.set(cp, child);
					}
					return child;
				});
				if (cp === FE0F) prev.push(...next);
				else prev = next;
			}
			for (const node of prev) node.V = cps;
		}
	}

	// ************************************************************
	// public api (mirrors ens-normalize.js)

	normalize(name: string): string {
		return this.flatten(this.split(name, (cps) => cps.filter((cp) => cp !== FE0F)));
	}

	beautify(name: string): string {
		const labels = this.split(name, (cps) => cps);
		for (const {type, output, error} of labels) {
			if (error) break;
			// ξ => Ξ if not greek
			if (type !== 'Greek') {
				for (let i = 0; i < output!.length; i++) if (output![i] === XI_SMALL) output![i] = XI_CAPITAL;
			}
		}
		return this.flatten(labels);
	}

	/** labels with type/output or error (emoji without FE0F unless preserveEmoji) */
	split(name: string, ef: (cps: CodePoint[]) => CodePoint[] = (cps) => cps.filter((cp) => cp !== FE0F)): Label[] {
		if (!name) return [];
		let offset = 0;
		return name.split(STOP).map((s) => {
			const input = explodeCp(s);
			const info: Label = {input, offset};
			offset += input.length + 1;
			try {
				const tokens = this.tokens(input, ef);
				info.tokens = tokens;
				if (!tokens.length) throw new Error('empty label');
				const norm = tokens.flatMap((t) => t.cps);
				info.output = norm;
				checkLeadingUnderscore(norm);
				const emoji = tokens.length > 1 || !!tokens[0]!.emoji;
				info.emoji = emoji;
				if (!emoji && norm.every((cp) => cp < 0x80)) {
					checkLabelExtension(norm);
					info.type = 'ASCII';
				} else {
					const chars = tokens.flatMap((t) => (t.emoji ? [] : t.cps));
					if (!chars.length) {
						info.type = 'Emoji';
					} else {
						if (this.cm.has(norm[0]!)) throw errorPlacement('leading combining mark');
						for (let i = 1; i < tokens.length; i++) {
							const t = tokens[i]!;
							if (!t.emoji && this.cm.has(t.cps[0]!)) {
								throw errorPlacement(`emoji + combining mark: "${strFromCps(tokens[i - 1]!.cps)} + ${this.safeStr([t.cps[0]!])}"`);
							}
						}
						this.checkFenced(norm);
						const unique = [...new Set(chars)];
						const [g] = this.determineGroup(unique, chars);
						this.checkGroup(g!, chars);
						this.checkWhole(g!, unique);
						info.type = g!.name;
					}
				}
			} catch (err) {
				info.error = err as Error;
			}
			return info;
		});
	}

	/** printable form: leading CM gets a dotted circle, escaped cps become {XX} */
	safeStr(cps: readonly CodePoint[], max = Infinity): string {
		const buf: string[] = [];
		if (this.cm.has(cps[0]!)) buf.push('◌');
		let v = cps;
		if (v.length > max) {
			const half = max >> 1;
			v = [...v.slice(0, half), 0x2026, ...v.slice(-half)];
		}
		let prev = 0;
		for (let i = 0; i < v.length; i++) {
			if (this.escape.has(v[i]!)) {
				buf.push(strFromCps(v.slice(prev, i)), quoteCp(v[i]!));
				prev = i + 1;
			}
		}
		buf.push(strFromCps(v.slice(prev)));
		return buf.join('');
	}

	// ************************************************************
	// internals

	private flatten(labels: Label[]): string {
		return labels
			.map(({input, error, output}) => {
				if (error) {
					const msg = error.message;
					throw new Error(labels.length === 1 ? msg : `Invalid label ${bidiQQ(this.safeStr(input, 63))}: ${msg}`);
				}
				return strFromCps(output!);
			})
			.join(STOP);
	}

	private tokens(input: CodePoint[], ef: (cps: CodePoint[]) => CodePoint[]): Token[] {
		const ret: Token[] = [];
		let chars: CodePoint[] = [];
		const rev = input.toReversed();
		while (rev.length) {
			const emoji = this.consumeEmojiReversed(rev);
			if (emoji) {
				if (chars.length) {
					ret.push({cps: this.nf.nfc(chars)});
					chars = [];
				}
				ret.push({cps: ef(emoji), emoji: true});
			} else {
				const cp = rev.pop()!;
				if (this.valid.has(cp)) {
					chars.push(cp);
				} else {
					const cps = this.mapped.get(cp);
					if (cps) chars.push(...cps);
					else if (!this.ignored.has(cp)) throw this.errorDisallowed(cp);
				}
			}
		}
		if (chars.length) ret.push({cps: this.nf.nfc(chars)});
		return ret;
	}

	/** longest emoji match at the end of the reversed input (truncates it) */
	private consumeEmojiReversed(cps: CodePoint[]): CodePoint[] | undefined {
		let node: EmojiNode | undefined = this.emojiRoot;
		let emoji: CodePoint[] | undefined;
		let pos = cps.length;
		while (pos) {
			node = node.get(cps[--pos]!);
			if (!node) break;
			if (node.V) {
				emoji = node.V;
				cps.length = pos;
			}
		}
		return emoji;
	}

	private checkFenced(cps: CodePoint[]) {
		let prev = this.fenced.get(cps[0]!);
		if (prev) throw errorPlacement(`leading ${prev}`);
		const n = cps.length;
		let last = -1;
		for (let i = 1; i < n; i++) {
			const match = this.fenced.get(cps[i]!);
			if (match) {
				if (last === i) throw errorPlacement(`${prev} + ${match}`);
				last = i + 1;
				prev = match;
			}
		}
		if (last === n) throw errorPlacement(`trailing ${prev}`);
	}

	private determineGroup(unique: CodePoint[], chars: CodePoint[]): Group[] {
		let groups = this.groups;
		for (const cp of unique) {
			const gs = groups.filter((g) => groupHas(g, cp));
			if (!gs.length) {
				if (!this.groups.some((g) => groupHas(g, cp))) throw this.errorDisallowed(cp);
				throw this.errorGroupMember(groups[0]!, cp, chars);
			}
			groups = gs;
			if (gs.length === 1) break;
		}
		return groups;
	}

	private checkGroup(g: Group, cps: CodePoint[]) {
		for (const cp of cps) {
			if (!groupHas(g, cp)) throw this.errorGroupMember(g, cp, cps);
		}
		if (!g.checkNSM) return;
		// 20261126: a combining mark inherits the script of its base (UAX-24), so in a group without a
		// CM whitelist the base must be one of the group's own (primary) characters, not a shared extra
		// eg. Arabic "-" + U+064B. CM after an emoji was already rejected, so the base is in the same text.
		for (let i = 1, base = cps[0]!; i < cps.length; i++) {
			const cp = cps[i]!;
			if (!this.cm.has(cp)) base = cp;
			else if (!g.primary.has(base)) {
				throw errorPlacement(`combining mark on non-${g.name}: "${this.safeStr([base])} + ${this.safeStr([cp])}"`);
			}
		}
		const d = this.nf.nfd(cps);
		for (let i = 1, e = d.length; i < e; i++) {
			if (!this.nsm.has(d[i]!)) continue;
			let j = i + 1;
			for (; j < e && this.nsm.has(d[j]!); j++) {
				const cp = d[j]!;
				for (let k = i; k < j; k++) {
					if (d[k] === cp) throw new Error(`duplicate non-spacing marks: ${this.quotedCp(cp)}`);
				}
			}
			if (j - i > this.nsmMax) {
				throw new Error(`excessive non-spacing marks: ${bidiQQ(this.safeStr(d.slice(i - 1, j)))} (${j - i}/${this.nsmMax})`);
			}
			i = j;
		}
	}

	private checkWhole(g: Group, unique: CodePoint[]) {
		let maker: Group[] | undefined;
		const shared: CodePoint[] = [];
		for (const cp of unique) {
			const whole = this.wholeMap.get(cp);
			if (whole === UNIQUE) return;
			if (whole) {
				const set = whole.complements.get(cp)!;
				maker = maker ? maker.filter((x) => set.has(x)) : [...set];
				if (!maker.length) return;
			} else {
				shared.push(cp);
			}
		}
		if (maker) {
			for (const x of maker) {
				if (shared.every((cp) => groupHas(x, cp))) throw new Error(`whole-script confusable: ${g.name}/${x.name}`);
			}
		}
	}

	private quotedCp(cp: CodePoint): string {
		return (this.escape.has(cp) ? '' : `${bidiQQ(this.safeStr([cp]))} `) + quoteCp(cp);
	}
	private errorDisallowed(cp: CodePoint) {
		return new Error(`disallowed character: ${this.quotedCp(cp)}`);
	}
	/** chars: the label's text, to find the base of a combining mark */
	private errorGroupMember(g: Group, cp: CodePoint, chars: CodePoint[]) {
		if (this.cm.has(cp)) {
			// the mark exists in some group, but not with this text: name its base, not an unrelated group
			// (eg. "x" + U+0302 isn't Restricted[Cher]). chars[0] isn't a CM, so a base exists
			let i = chars.indexOf(cp);
			while (this.cm.has(chars[--i]!));
			return errorPlacement(`unsupported combining mark: "${this.safeStr([chars[i]!])} + ${this.safeStr([cp])}"`);
		}
		let quoted = this.quotedCp(cp);
		const primary = this.groups.find((x) => x.primary.has(cp));
		if (primary) quoted = `${primary.name} ${quoted}`;
		return new Error(`illegal mixture: ${g.name} + ${quoted}`);
	}
}

type EmojiNode = Map<CodePoint, EmojiNode> & {V?: CodePoint[]};

function groupHas(g: Group, cp: CodePoint) {
	return g.primary.has(cp) || g.secondary.has(cp);
}
function checkLabelExtension(cps: CodePoint[]) {
	if (cps.length >= 4 && cps[2] === HYPHEN && cps[3] === HYPHEN) {
		throw new Error(`invalid label extension: "${strFromCps(cps.slice(0, 4))}"`);
	}
}
function checkLeadingUnderscore(cps: CodePoint[]) {
	for (let i = cps.lastIndexOf(UNDERSCORE); i > 0; ) {
		if (cps[--i] !== UNDERSCORE) throw new Error('underscore allowed only at start');
	}
}
function errorPlacement(where: string) {
	return new Error(`illegal placement: ${where}`);
}

/** loads output/ (or another directory with spec.json + nf.json) */
export async function loadENSIP15(dir: URL = new URL('../output/', import.meta.url)): Promise<ENSIP15> {
	const [spec, nf] = await Promise.all([Bun.file(new URL('spec.json', dir)).json(), Bun.file(new URL('nf.json', dir)).json()]);
	return new ENSIP15(spec, nf);
}
