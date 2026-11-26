# Script groups

A label is valid only if every character belongs to a single **group**: roughly a writing system (Latin, Han, Arabic, …) plus the shared characters that system uses. Groups do two jobs:

1. **Mixing:** a label can't combine scripts that no group allows together. `аbc` (Cyrillic а + Latin bc) is rejected as an _illegal mixture_.
2. **Spoofing:** within a group, the whole-script confusable check rejects a label that could be spelled with lookalikes from another group. `аре` is all Cyrillic, but every letter has a Latin twin, so it's rejected as a _whole-script confusable_.

This page covers how [src/derive.ts](../src/derive.ts) builds the groups into `spec.json`, then how a label is checked against them ([src/ensip15.ts](../src/ensip15.ts), which mirrors ens-normalize.js).

Current numbers (Unicode 18): 171 groups, 28 unrestricted and 143 restricted, plus 292 wholes (962 checked characters).

## Building the groups

### 1. Script membership

Every valid character has a set of scripts from Unicode's `Script_Extensions` (UAX-24). For most characters this is just its `Script`, but shared characters list every script that uses them. For example, U+0300 COMBINING GRAVE ACCENT has `Cher Copt Cyrl Grek Latn Perm Sunu Tale`. `Zyyy` (Common) covers digits, punctuation and symbols, but not letters: a-z are `Latn`. `Zinh` (Inherited) covers marks that take the script of the letter they attach to.

[rules/scripts.ts](../rules/scripts.ts) `SCRIPT_EXTENSIONS` overrides individual characters, either by replacing the set or by removing scripts from it:

```ts
[0x3BE, ['Zyyy']],                    // ξ is usable wherever Common is (the ETH symbol)
[0x307, {remove: ['Hebr']}],          // ◌̇ shouldn't leak into Hebrew, where marks aren't whitelisted
```

### 2. Group definitions

An unrestricted group is defined in `SCRIPT_GROUPS`:

```ts
{name: 'Japanese', test: ['Kana', 'Hira'], rest: ['Hani', 'Zyyy'], extra: [$AZ], cm: true}
```

| field   | meaning                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------- |
| `test`  | the scripts that identify the group. Each script is the `test` of at most one group.                                |
| `rest`  | other scripts whose characters are also allowed (Han inside Japanese, Common inside Latin, CJK, Cyrillic and Greek) |
| `extra` | individual characters allowed regardless of script (a-z in CJK groups, π in Latin, ₪ in Hebrew)                     |
| `cm`    | `true` means combining marks are only allowed via the whitelist (see step 3)                                        |

A character joins **every** group whose `test ∪ rest` intersects its script set, or whose `extra` lists it. Membership overlaps on purpose: `a` is in Latin and, via `extra`, in Han, Korean and Japanese. `1` is in every group that has `Zyyy`. Only Common, Latin, Han, Japanese, Korean, Cyrillic and Greek have it, so `ب1` (Arabic + ASCII digit) is an illegal mixture.

**Common** (`test: ['Zyyy']`) holds only the shared characters, so it's a subset of every group that has Zyyy. It can't make a label valid or invalid. It's first in priority so that a label without letters, like `€100` or `💎100`, is typed Common instead of Latin.

Every script must be accounted for exactly once. It is either the `test` of a group, a **restricted** script, or a **disallowed** script. `Zinh` and `Zzzz` are excluded. Derive fails on a leftover or duplicate.

**Restricted groups.** Each script in `RESTRICTED_SCRIPTS` becomes a single-script group named by its code (`Bopo`, `Cher`, …) with no `rest`, so it can't mix with anything, not even Common. UAX-31 drives this: derive fails if a Limited Use or Excluded script ([data/unicode/<v>/script-kinds.json](../data/unicode/)) isn't restricted or disallowed, or if an unrestricted group is identified by one. Bopomofo became Limited Use in 17.0. That's why `ㄐㄐㄐ` is now `Restricted[Bopo]` and `中ㄐ` is an illegal mixture.

### 3. Combining marks

The groups with `cm: true` are Common, Latin, Cyrillic, Greek, Han, Japanese and Korean. In these groups, a character survives only if its NFD contains no combining mark, or it is listed in [rules/cm.ts](../rules/cm.ts). Every whitelist entry is a precomposed letter (`é`, `ガ`), so in practice:

- `e + ◌́` is fine: the label is NFC'd first and composes to `é`, which is whitelisted.
- `x + ◌̂` fails with `unsupported combining mark: "x + ◌̂"`: it doesn't compose, and bare marks aren't members of these groups.
- Accented letters not on the whitelist (`ẹ`, `ơ`) are purged from the group, and from the spec entirely if no other group keeps them.

The format also supports base + mark sequences without a precomposed form (`spec.groups[].cm`), but no rule uses them today, so every `cm` array is empty.

Other groups keep their marks. Instead, derive removes any character whose NFD repeats a nonspacing mark. At runtime the label is checked against UTS-39's optional detection: no repeated nonspacing mark in a run, and at most `nsm_max` (4) in a row.

**Inherited marks are handled by membership, not position.** UAX-24 says a `Zinh` mark takes the script of its base. The groups never look at which character a mark follows. They only require the mark and the base to be in the same group, and that works out the same in practice:

- In the seven whitelisted groups, no bare mark survives. Marks only exist inside whitelisted precomposed letters. No group has `Zinh` in `rest`. Latin, Cyrillic and Greek used to have it, but it only added bare marks that the whitelist then purged, and removing it left `spec.json` unchanged.
- In every other group, a mark is valid only if its own `Script_Extensions` names the group's script. For example, `ა́` (Georgian + U+0301) is rejected because U+0301 isn't Georgian. 595 marks are `Zinh` only, and none is valid as a bare mark anywhere.
- That leaves marks on a group's `extra` characters, which membership alone would allow: `ب-ًب` (an Arabic mark on a hyphen), `₪ּא`, `ก฿ั`. So in groups without a whitelist, a mark's base (the character before it, after NFC) must be **primary** in the group: `illegal placement: combining mark on non-Arabic: "- + ◌ً"`. This is the one positional rule, and it's new after 1.11.1. Only Arabic `-`, Hebrew `₪` and Thai `฿` are affected, and no registered label uses them that way.

### 4. Confusables → wholes

Each confusable set (Unicode's `confusables.txt` as edited by [rules/confuse.ts](../rules/confuse.ts), see [src/confuse.ts](../src/confuse.ts)) is resolved **per group**, over the members that group could contain:

| situation in a group                         | result                                      |
| -------------------------------------------- | ------------------------------------------- |
| member is `primary` (or auto-primary)        | valid, unrestricted                         |
| member is `allow`                            | valid, but **whole-script checked**         |
| set has decisions, member has none           | removed from this group                     |
| no decisions, only this member in this group | valid, whole-script checked                 |
| no decisions, 2+ members in this group       | `defaultAllow` decides: checked, or removed |

A set without decisions whose only unrestricted member is X makes X primary automatically. ASCII is never confusable (an invariant). Each resolved set becomes a **whole**: its `valid` (primary) members, plus its `confused` members, each tagged with the groups where it is checked. [output/confusables.txt](../output/confusables.txt) lists what happened to every member in every group.

**Inert confusables are pruned.** A confused member only matters if some _other_ group holds one of its lookalikes (the label-check step 5 below). When every member of a set lands in the same groups, there's nobody to confuse it with, and leaving it in would make the check stop early at that character, an accidental exemption. For example, `∞` was in a set of shared characters, so `α∞` passed while `α1` failed. Derive drops these members (1,148 in Unicode 18, mostly Han-internal sets such as 户/戶) and asserts that every remaining confused character has a lookalike group. `output/log.txt` lists them under **Prune Inert Confusables**. Lookalikes inside one group need a different mechanism (see [review.md](review.md)).

### 5. Pruning, primary/secondary, order

- Characters that end up in no group (and aren't part of one) are disallowed. Empty groups are dropped.
- In `spec.json` each group splits its characters into **primary** (script set intersects `test`) and **secondary** (came in through `rest`/`extra`). Primary decides which group an "illegal mixture" error names, and which characters a combining mark may follow (below).
- Groups are ordered by [rules/group-order.ts](../rules/group-order.ts), a fixed priority with Common, then Latin, first. Restricted groups come after all unrestricted ones, in `RESTRICTED_SCRIPTS` order unless listed. The order is part of the output, because it decides which group names a label.

## Checking a label

For each label (after mapping, NFC and emoji tokenizing):

1. **Fast paths.** All ASCII → `ASCII`. Only emoji → `Emoji`. Emoji are ignored from here on.
2. **Placement.** No leading combining mark, or combining mark right after an emoji. Fenced characters (apostrophe ’, fraction slash ⁄, katakana middle dot ・, maqaf ־) can't lead, trail, or touch each other.
3. **Determine the group.** Start from all groups in priority order. For each distinct character, keep only the groups that contain it, and stop once one group remains. The first remaining group is the label's group, which becomes its `type`.
   - If no group contains the character at all: `disallowed character`.
   - If some group contains it but none of the remaining ones does: `illegal mixture: <first remaining group> + <first group where the character is primary> "x"`. If that character is a combining mark, the error is `illegal placement: unsupported combining mark: "<base> + <mark>"` instead (new after 1.11.1, same outcome).
4. **Check the group.** Every character must be in that group (same errors as step 3). In groups without a CM whitelist, every combining mark must follow a primary character, and the nonspacing-mark checks apply.
5. **Whole-script confusable check.** Walk the distinct characters:
   - A character in exactly one group and in no whole is **unique**: no other group can spell this label, so the check passes.
   - A **confused** character narrows the candidate groups to the other groups that hold a lookalike of it. These are the groups of its whole's other members, minus its own. If none remain, the check passes.
   - Anything else (shared non-confusables like digits) must also exist in the candidate group.
   - If a candidate group contains lookalikes for every confused character and all of the shared ones, the label is rejected: `whole-script confusable: <group>/<other>`.

### Examples

All of these come from `output/spec.json`:

| label        | result                                       | why                                                                  |
| ------------ | -------------------------------------------- | -------------------------------------------------------------------- |
| `raffy`      | ASCII                                        | fast path                                                            |
| `café`       | Latin                                        | é is whitelisted                                                     |
| `€100`       | Common                                       | no letters: only shared characters                                   |
| `💎100`      | Common                                       | emoji are skipped; the rest is shared                                |
| `ab日`       | Han                                          | a-z are extras of Han, Korean and Japanese. Han is first in priority |
| `ラーメンab` | Japanese                                     | katakana narrows to Japanese                                         |
| `ξabc`       | Latin                                        | ξ is Common through the scx override                                 |
| `аbc`        | illegal mixture: Cyrillic + Latin "b"        | no group has both                                                    |
| `аре`        | whole-script confusable: Cyrillic/Latin      | а р е all have Latin twins                                           |
| `αβγ`        | whole-script confusable: Greek/Latin         | same, against Latin                                                  |
| `привет`     | Cyrillic                                     | every letter is confusable, but no one group has twins for all six   |
| `ㄐㄐㄐ`     | Restricted[Bopo]                             | Limited Use script                                                   |
| `中ㄐ`       | illegal mixture: Han + Restricted[Bopo] "ㄐ" | restricted groups don't mix                                          |
| `x̂`          | unsupported combining mark: "x + ◌̂"          | no precomposed form, and bare marks aren't in Latin                  |
| `'ab`        | illegal placement: leading apostrophe        | fenced                                                               |

## Changed error messages

- **Unsupported combining marks.** A bare mark that isn't in the label's group used to be an illegal mixture naming the first group where the mark is primary. That group was usually unrelated: `x̂` named Cherokee, and `İzmir` (`İ` maps to `i` + U+0307 under UTS-46) named Hebrew in 1.11.1 and Syriac now. Both are now `illegal placement: unsupported combining mark: "x + ◌̂"`, naming the mark's base. Only the message changed, for 37 registered labels: 20 Turkish `İ`, 9 Cyrillic vowels with a stress accent (`и́`), and a few others. (`ı`, dotless i, is separately disallowed in [rules/disallow/latin.ts](../rules/disallow/latin.ts).)

## Where to change things

| change                                             | file                                                                          |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| add or reshape a group, restrict a script          | [rules/scripts.ts](../rules/scripts.ts) `SCRIPT_GROUPS`, `RESTRICTED_SCRIPTS` |
| fix a character's scripts                          | [rules/scripts.ts](../rules/scripts.ts) `SCRIPT_EXTENSIONS`                   |
| allow an accented letter in a Latin-like/CJK group | [rules/cm.ts](../rules/cm.ts)                                                 |
| confusable decisions                               | [rules/confuse.ts](../rules/confuse.ts)                                       |
| which group names a label                          | [rules/group-order.ts](../rules/group-order.ts)                               |

`output/log.txt` shows the result of each step: **Create Groups** (membership table), **Compute CM Whitelist** and **Purge CM**, **Compute Confusables**, and **Group Summary**. `bun run group-stats` shows registrations per group.
