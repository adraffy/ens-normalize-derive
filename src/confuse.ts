// Confusable sets: Unicode's confusables.txt, edited by rules/confuse.ts.
//
// A Unicode set is a prototype's sources, plus the prototype itself if it's a single character.
// Rules then:
//   split  pull characters out of their Unicode set (they start a set of their own)
//   join   merge the sets of two characters (applied after splits)
// and decide members:
//   primary  stays valid without restriction (the others in its set are the confusables)
//   allow    stays valid, but labels using it get the whole-script check
// A set without decisions whose only ASCII member is X treats X as primary (ASCII is never confusable).
// Undecided sets follow `defaultAllow` (see derive.ts).

import {type CodePoint, getOrInsert} from './utils.ts';

export const CONFUSE_TYPE_ALLOW = 'allow';
export const CONFUSE_TYPE_VALID = 'primary';
export type ConfuseType = typeof CONFUSE_TYPE_ALLOW | typeof CONFUSE_TYPE_VALID;

export interface ConfuseRules {
	/** a set with 2+ undecided members in one group: true = allow them (whole-script checked), false = disallow them */
	defaultAllow: boolean;
	primary: CodePoint[];
	allow: CodePoint[];
	split: CodePoint[];
	join: [CodePoint, CodePoint][];
}

export interface ConfuseSet {
	/** Unicode prototype (hex) of the largest source set, eg. "61" or "72 6E" */
	target: string;
	members: {cp: CodePoint; type?: ConfuseType}[];
}

/** confusables.txt as [prototype, sources] */
export type Confusables = [CodePoint[], CodePoint[]][];

const hex = (cps: readonly CodePoint[]) => cps.map((cp) => cp.toString(16).toUpperCase()).join(' ');

/**
 * builds the edited sets (only sets with 2+ members)
 * warnings: rules that no longer do anything with this data (eg. Unicode dropped or merged it)
 */
export function confusableSets(confusables: Confusables, rules: ConfuseRules): {sets: ConfuseSet[]; warnings: string[]} {
	const warnings: string[] = [];
	// base sets
	const setOf = new Map<CodePoint, number>();
	const targets: string[] = [];
	const sizes: number[] = [];
	confusables.forEach(([proto, sources]) => {
		const id = targets.length;
		const members = proto.length === 1 ? [proto[0]!, ...sources] : sources;
		for (const cp of members) {
			if (setOf.has(cp)) throw new Error(`confusable in two sets: ${hex([cp])}`);
			setOf.set(cp, id);
		}
		targets.push(hex(proto));
		sizes.push(members.length);
	});
	// splits become their own set
	for (const cp of rules.split) {
		if (!setOf.has(cp)) {
			warnings.push(`split: not in confusables.txt (no-op): ${hex([cp])}`);
			continue;
		}
		setOf.set(cp, targets.length);
		targets.push(hex([cp]));
		sizes.push(1);
	}
	// joins: union-find over set ids (a cp not in any set gets its own)
	const parent = targets.map((_, i) => i);
	const find = (i: number): number => {
		while (parent[i] !== i) {
			parent[i] = parent[parent[i]!]!;
			i = parent[i]!;
		}
		return i;
	};
	const idOf = (cp: CodePoint) => {
		let id = setOf.get(cp);
		if (id === undefined) {
			id = targets.length;
			setOf.set(cp, id);
			targets.push(hex([cp]));
			sizes.push(1);
			parent.push(id);
		}
		return id;
	};
	for (const [a, b] of rules.join) {
		const x = find(idOf(a));
		const y = find(idOf(b));
		if (x === y) {
			warnings.push(`join: already together (no-op): ${hex([a])} + ${hex([b])}`);
			continue;
		}
		parent[y] = x;
	}
	// collect
	const types = new Map<CodePoint, ConfuseType>();
	for (const cp of rules.primary) types.set(cp, CONFUSE_TYPE_VALID);
	for (const cp of rules.allow) {
		if (types.has(cp)) throw new Error(`primary + allow: ${hex([cp])}`);
		types.set(cp, CONFUSE_TYPE_ALLOW);
	}
	const groups = new Map<number, CodePoint[]>();
	for (const [cp, id] of setOf) getOrInsert(groups, find(id), () => []).push(cp);
	for (const cp of types.keys()) {
		const id = setOf.get(cp);
		const v = id === undefined ? undefined : groups.get(find(id));
		if (!v || v.length < 2) warnings.push(`decision on a non-confusable (no-op): ${hex([cp])}`);
	}
	const sets: ConfuseSet[] = [];
	for (const [root, cps] of groups) {
		if (cps.length < 2) continue;
		cps.sort((a, b) => a - b);
		// name the set after its largest Unicode set
		let best = root;
		for (const cp of cps) {
			const id = setOf.get(cp)!;
			if (sizes[id]! > sizes[best]!) best = id;
		}
		// a set's only ASCII member is primary unless the set has decisions (as the original generator did)
		const ascii = cps.filter((cp) => cp < 0x80);
		const auto = ascii.length === 1 && !cps.some((cp) => types.has(cp)) ? ascii[0] : undefined;
		sets.push({
			target: targets[best]!,
			members: cps.map((cp) => {
				const type = cp === auto ? CONFUSE_TYPE_VALID : types.get(cp);
				return {cp, ...(type && {type})};
			}),
		});
	}
	sets.sort((a, b) => a.members[0]!.cp - b.members[0]!.cp);
	return {sets, warnings};
}
