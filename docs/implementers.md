# Updating an ENSIP-15 implementation to Unicode 18

Until now a new spec only needed new data: swap in `spec.json` and `nf.json`, rebuild, and run `tests.json`. Unicode 18 still has the same file shapes (same keys in `spec.json`, its groups and wholes, and `nf.json`), but it also has **two small code changes** to the group check. An implementation that only swaps the data will pass every registered label, but it will fail a few new entries in `tests.json` and report different error messages.

| change                                                         | code? | outcome changes?                   |
| -------------------------------------------------------------- | ----- | ---------------------------------- |
| [1. New data](#1-new-data), including the Common group         | no    | yes, from data alone               |
| [2. Combining mark base](#2-combining-mark-base)               | yes   | yes (no registered label affected) |
| [3. Unsupported combining mark](#3-unsupported-combining-mark) | yes   | no, error message only             |

The reference is [src/ensip15.ts](../src/ensip15.ts) (`determineGroup`, `checkGroup`, `errorGroupMember`), and [adraffy/ens-normalize.ts#4](https://github.com/adraffy/ens-normalize.ts/pull/4) makes the same changes to a real library. Both are short diffs.

## 1. New data

Take `output/spec.json`, `output/nf.json`, `output/tests.json` and `output/nf-tests.json` from this repo. Against every registered label (vs 1.11.1): 38 valid labels become invalid (34 Bopomofo, now a restricted script, and 4 `丅`), 5 invalid labels become valid (new emoji), and none normalizes differently. See [review.md](review.md).

**The Common group needs no code** if your implementation follows the data: groups in file order, the label's type is the group's `name`, and whitelist groups are the ones with a `cm` key. Check for these assumptions:

- **Group order.** `Common` is now `groups[0]`, ahead of `Latin`. It holds only shared characters (digits, punctuation, symbols, no letters), so it's a subset of Latin, Han, Japanese, Korean, Cyrillic and Greek. It must be first to name anything. Don't hardcode `Latin` as the first group, or as the type of a label without letters.
- **New type.** Labels without a letter (`€100`, `💎100`) now have type `Common` instead of `Latin`. Anything that maps types to colors, icons or filters needs a `Common` entry.
- **Mixture messages.** An illegal mixture names the first group still in the running, then the first group where the conflicting character is primary. Both can now be Common: `$٠٠` reads `illegal mixture: Common + Arabic "٠"` instead of `Latin + Arabic`. That accounts for 610 of the changed messages, all from the data.
- **Combining marks.** Common has `cm: []`, so it's a whitelist group like Latin: no bare marks, and no non-spacing-mark checks.

The whole-script confusable check needs no change either. Which characters are "unique" (in one group and no whole) is computed from the groups, so it stays correct as long as you derive it from the data rather than a hardcoded list.

## 2. Combining mark base

**New rule:** in a group **without** a CM whitelist (no `cm` key, the groups that get the non-spacing-mark checks), every combining mark must follow a character that is **primary** in that group.

A combining mark takes the script of the character it's on (UAX-24 Inherited), but the old check only required both to be members of the group. Shared extras slipped through: an Arabic mark on a hyphen (`ب-ًب`), a Hebrew mark on `₪`, a Thai mark on `฿`. No registered label uses one.

Add it to the group check after the membership loop and before the non-spacing-mark checks. `cps` is the label's text with emoji removed, after NFC. A mark can't be first, and can't follow an emoji (both are already rejected), so `cps[0]` is a base.

```ts
for (const cp of cps) if (!group.has(cp)) throw mixture(...);   // existing
if (group has a cm whitelist) return;                            // existing
// new:
for (let i = 1, base = cps[0]; i < cps.length; i++) {
	const cp = cps[i];
	if (!isCombiningMark(cp)) base = cp;
	else if (!group.primary.has(base)) {
		throw new Error(`illegal placement: combining mark on non-${group.name}: "${safeStr([base])} + ${safeStr([cp])}"`);
	}
}
// existing: duplicate/excessive non-spacing marks (on the NFD)
```

`isCombiningMark` is `spec.cm`. `safeStr` is the existing printable form, which puts `◌` before a leading mark. There's no `{HEX}` suffix and no U+200E: `illegal placement: combining mark on non-Arabic: "- + ◌ً"`.

## 3. Unsupported combining mark

**New message, same outcome.** When a character isn't in the label's group and it's a combining mark, report the mark and its base instead of an illegal mixture.

The old message named the first group where the mark is primary, which is usually unrelated: `x̂` gave `illegal mixture: Latin + Restricted[Cher] "◌̂"`, and `İzmir` (`İ` maps to `i` + U+0307) named Hebrew in 1.11.1 and Syriac in Unicode 18. Now:

```
illegal placement: unsupported combining mark: "x + ◌̂"
illegal placement: unsupported combining mark: "i + ◌̇"
```

The mixture error is thrown in two places. Both need the label's text (`cps` as above), to find the base:

- **Determining the group**, when a character fits none of the remaining groups (after the `disallowed character` check, which still comes first).
- **Checking the group**, in the membership loop, when the group was settled early.

```ts
function errorMixture(group, cp, cps) {
	if (isCombiningMark(cp)) {
		let i = cps.indexOf(cp); // its first occurrence is where the check failed
		while (isCombiningMark(cps[--i])); // skip earlier marks on the same base
		return new Error(`illegal placement: unsupported combining mark: "${safeStr([cps[i]])} + ${safeStr([cp])}"`);
	}
	// existing: illegal mixture: GROUP + [OTHER] "x" {HEX}
}
```

37 registered labels get this message, mostly Turkish `İ`. Every label that failed before still fails.

## Checking your implementation

- `tests.json` has cases for both rules. Its `comment` starts with `Inherited:` (rule 2) or `Unsupported mark:` (rule 3), for example `ب-ًب`, `א₪ּ`, `ก฿ั`, `x̂`, `İzmir`, `abً`, `ა́`. It records only `error: true`, not the message.
- For messages, compare your output with the reference on any names: `loadENSIP15()` from [src/ensip15.ts](../src/ensip15.ts) runs straight on `output/`.
- Against 1.11.1, the reference matches exactly except for rule 3's message (`bun run parity`). `bun run registrations` lists every registered label whose outcome or message changed.
