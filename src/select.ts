// Declarative character selection for rule files.
//
// A Selector picks characters by Unicode properties instead of listing codepoints,
// so rules keep working when a new Unicode version adds characters.
//
//   {block: 'Box Drawing'}                         every char in the block
//   {block: 'Arrows', except: [0x2190, 0x2192]}    ... except these
//   {gc: ['Cc', 'Cf'], except: [0x20]}             by general category
//   {prop: 'Default_Ignorable_Code_Point'}         by PropList/DerivedCoreProperties (includes unassigned)
//   {script: 'Zyyy', gc: 'Sm'}                     fields are AND-ed
//   {name: /\bSUBSCRIPT\b/}                        by name
//   {age: '18.0'}                                  by DerivedAge
//   {block: 'Latin Extended-D', cps: [0xA7CE]}     explicit cps; other fields become assertions
//
// note: `script` matches the Script property (not Script_Extensions).

import type {UnicodeChar, UnicodeSpec} from './ucd.ts';
import {type CodePoint, hexCp, parseCps} from './utils.ts';

type OneOrMany<T> = T | readonly T[];

export interface Selector {
	/** explicit codepoints: numbers or a hex string "2500..257F 2600" */
	cps?: OneOrMany<CodePoint> | string;
	block?: OneOrMany<string>;
	script?: OneOrMany<string>;
	/** general category: exact ("Sm") or major class ("S") */
	gc?: OneOrMany<string>;
	/** binary property from PropList.txt or DerivedCoreProperties.txt */
	prop?: OneOrMany<string>;
	name?: RegExp;
	/** DerivedAge, eg. "18.0" */
	age?: OneOrMany<string>;
}

export interface Rule extends Selector {
	/** removed from the selection */
	except?: Selector | readonly CodePoint[];
	/** why (shown in the log) */
	reason?: string;
}

const many = <T>(x: OneOrMany<T> | undefined): readonly T[] | undefined => (x === undefined ? undefined : Array.isArray(x) ? x : [x as T]);

const propCache = new WeakMap<UnicodeSpec, Record<string, CodePoint[]>>();
function properties(unicode: UnicodeSpec): Record<string, CodePoint[]> {
	let props = propCache.get(unicode);
	if (!props) {
		props = {...unicode.readProps(), ...unicode.readCoreProps()};
		propCache.set(unicode, props);
	}
	return props;
}

function explicitCps(x: Selector['cps']): CodePoint[] {
	if (typeof x === 'string') return parseCps(x);
	return [...many(x)!];
}

export function describeSelector(sel: Selector): string {
	const parts: string[] = [];
	if (sel.cps !== undefined) parts.push(`cps(${explicitCps(sel.cps).length})`);
	if (sel.block) parts.push(`block=${many(sel.block)!.join('|')}`);
	if (sel.script) parts.push(`script=${many(sel.script)!.join('|')}`);
	if (sel.gc) parts.push(`gc=${many(sel.gc)!.join('|')}`);
	if (sel.prop) parts.push(`prop=${many(sel.prop)!.join('|')}`);
	if (sel.name) parts.push(`name=${sel.name}`);
	if (sel.age) parts.push(`age=${many(sel.age)!.join('|')}`);
	return parts.join(' ') || '(everything)';
}

/** returns a predicate for the non-cps fields */
function matcher(unicode: UnicodeSpec, sel: Selector): (cp: CodePoint, char?: UnicodeChar) => boolean {
	const blocks = many(sel.block);
	const scripts = many(sel.script);
	const gcs = many(sel.gc);
	const ages = many(sel.age);
	const props = many(sel.prop)?.map((p) => {
		const v = properties(unicode)[p];
		if (!v) throw new Error(`unknown property: ${p}`);
		return new Set(v);
	});
	for (const b of blocks ?? []) unicode.requireBlock(b);
	for (const s of scripts ?? []) unicode.requireScript(s);
	return (cp, char) => {
		if (props && !props.every((set) => set.has(cp))) return false;
		if (!blocks && !scripts && !gcs && !ages && !sel.name) return true;
		if (!char) return false;
		if (blocks && !blocks.includes(char.block.name)) return false;
		if (scripts && !scripts.includes(char.script.abbr)) return false;
		if (gcs && !gcs.some((g) => (g.length === 1 ? char.gc.startsWith(g) : char.gc === g))) return false;
		if (ages && !ages.includes(char.age)) return false;
		if (sel.name && !sel.name.test(char.name)) return false;
		return true;
	};
}

export function select(unicode: UnicodeSpec, sel: Selector): CodePoint[] {
	const match = matcher(unicode, sel);
	if (sel.cps !== undefined) {
		const cps = explicitCps(sel.cps);
		for (const cp of cps) {
			// explicit cps must satisfy the other fields (catches typos and misfiled entries)
			if (!match(cp, unicode.charMap.get(cp))) {
				throw new Error(`${hexCp(cp)} (${unicode.getName(cp)}) doesn't match ${describeSelector({...sel, cps: undefined})}`);
			}
		}
		return cps;
	}
	if (sel.prop) {
		// properties can include unassigned codepoints (eg. Default_Ignorable_Code_Point)
		const first = many(sel.prop)![0]!;
		return properties(unicode)[first]!.filter((cp) => match(cp, unicode.charMap.get(cp)));
	}
	const ret: CodePoint[] = [];
	if (sel.block && !sel.script && !sel.gc && !sel.name && !sel.age) {
		for (const b of many(sel.block)!) for (const c of unicode.requireBlock(b).chars) ret.push(c.cp);
		return ret;
	}
	for (const [cp, char] of unicode.charMap) if (match(cp, char)) ret.push(cp);
	return ret;
}

export interface Resolved {
	cps: Set<CodePoint>;
	/** per rule: the cps it contributed */
	byRule: [Rule, CodePoint[]][];
	/** problems worth fixing in the rule files */
	warnings: string[];
}

/** union of all rules (each rule minus its exceptions) */
export function resolveRules(unicode: UnicodeSpec, rules: readonly Rule[]): Resolved {
	const cps = new Set<CodePoint>();
	const byRule: [Rule, CodePoint[]][] = [];
	const warnings: string[] = [];
	const owner = new Map<CodePoint, Rule>();
	for (const rule of rules) {
		let v = select(unicode, rule);
		if (rule.except) {
			const except = new Set(Array.isArray(rule.except) ? rule.except : select(unicode, rule.except as Selector));
			const unused = Array.isArray(rule.except) ? [...except].filter((cp) => !v.includes(cp)) : [];
			if (unused.length) warnings.push(`${describeSelector(rule)}: except doesn't match ${unused.map(hexCp).join(' ')}`);
			v = v.filter((cp) => !except.has(cp));
		}
		if (!v.length) warnings.push(`${describeSelector(rule)}: selects nothing`);
		for (const cp of v) {
			const prev = owner.get(cp);
			// overlapping property rules are fine; an explicit cp that another rule already covers is redundant
			if (prev && (prev.cps !== undefined || rule.cps !== undefined)) {
				warnings.push(`${hexCp(cp)} (${unicode.getName(cp)}) selected twice: ${describeSelector(prev)} + ${describeSelector(rule)}`);
			} else {
				owner.set(cp, rule);
			}
			cps.add(cp);
		}
		byRule.push([rule, v]);
	}
	return {cps, byRule, warnings};
}
