# Review: Unicode 18 derive

Findings, decisions and open questions from porting `ens-normalize.js/derive` and designing the Unicode 18 spec. For the resulting changes, see [unicode-18.md](unicode-18.md). Usage numbers count the 3,422,100 known labels (3,399,305 valid under 1.11.1).

## Open

- **143 new 18.0 characters wait for review** (`bun run review`): Arabic Extended-C, Hebrew, Oriya, Bengali, Devanagari, Kana, one Han ideograph, currency signs and symbols. Each one allowed goes into `REVIEWED` in [rules/disallow/unreviewed.ts](../rules/disallow/unreviewed.ts). U+0B83 TAMIL SIGN VISARGA, whose Script_Extensions grew in 18.0, is also pinned to Tamil until reviewed.
- **Same-group confusables** (see [below](#confusables-cjk-and-faux-latin)): Katakana vs Han, simplified vs traditional Han, and Han/Bopomofo used as faux-Latin. The whole-script check can't express them.
- **`spec.json` `unicode`** embeds the download timestamp (`"18.0.0 (2026-11-25T…)"`), so re-downloading identical data changes the spec hash. The version alone would do.
- **The ENSIP-15 text** doesn't describe the combining mark base rule or the unsupported combining mark message yet ([implementers.md](implementers.md)).
- **Not applied, your call:**
  - Modifier letters with no registrations: kana iteration marks ゝゞヽヾ, Arabic small yeh/waw. These are real orthography.
  - Box and shade characters that are used: ▁▂▃▄▅▆▇█ and ░▒▓ each appear in 14–73 names.
  - Fencing ‿ (66 names, about 11 would break). It acts as an underscore.
- **Tooling not built yet:** a readable spec diff (per group: characters added and removed, wholes, emoji, mappings) for release notes, and CI running `check`, `bun test`, `typecheck` and the registrations report.

## Decisions

- **Bopomofo is restricted.** UAX-31 lists it as Limited Use, so the 34 Bopomofo + Han labels break. Almost all are faux-Latin spoofs (乃卂ㄚ匚 = "BAYC", 丂ㄥ卂丂卄 = "SLASH"). One or two look like real Taiwanese use (ㄎㄧㄤ起來). None is registered in ENSv2.
- **丅 is not protected.** It's archaic and used only as a faux-Latin T (三丅卄 = "ETH"). Unicode 18 made it a T confusable, and none of its 4 labels is registered in ENSv2. 丫 is kept valid: it's real Chinese, with 3 active registrations.
- **Common group:** labels without a letter are typed Common instead of Latin. See [groups.md](groups.md).
- **Combining marks:** in groups without a whitelist, a mark must follow a primary character, and a mark outside the label's group gets the `unsupported combining mark` message. See [implementers.md](implementers.md).
- **Inert confusables are pruned.** 1,148 confused characters had no lookalike in another group and ended the whole-script check early.
- **Group order** is fixed in [rules/group-order.ts](../rules/group-order.ts) rather than regenerated from registration counts, so it's part of the spec. It's the 1.11.1 order with Common first, except Myanmar and Gujarati are swapped. They share no characters, so the swap changes nothing.
- **ӕ stays valid.** Upstream's custom test `тӕ` relies on it. On its own, `ӕ` is a whole-script confusable.
- **İ keeps its UTS-46 mapping** to `i` + U+0307. That never composes and U+0307 isn't valid in Latin, so `İ` labels fail with `unsupported combining mark: "i + ◌̇"` (20 registered labels). That is the intended result.
- **ı (dotless i) stays disallowed** ([rules/disallow/latin.ts](../rules/disallow/latin.ts)). It's a classic i spoof.

### CM whitelist

All 128 entries are precomposed letters (51 Latin, 11 Greek, 8 Cyrillic, 58 Japanese). The base + mark half of the mechanism is never used, so every group's `cm` in `spec.json` is empty. Unused entries: ǹ, ΐ ϋ, ѓ ӣ ќ ӯ, ヷヸヹヺヾ, ぢゔゞ (harmless).

**Considered and rejected:** ī ė ț ș į ų ÿ ř ň ť ď ľ ő ű. Whitelisting them would have made 311 invalid labels valid, but most of those are ASCII words with one letter swapped for an accented twin: ėth, mėta, monėy (72 of 79 ė labels), biťcoin, ďegen, mcdonalďs, crÿpto, crypțo, fīrst. ď ť ľ are worse, because their caron renders like an apostrophe and ’ is valid (ďegen vs d’egen). Registration counts measure spoofers as much as speakers, so they aren't a reason to whitelist. ǎ stays out by the breve-over-caron rule (ă).

### Fencing

Fenced: ’ (11,394 names), ⁄ (520), ・ (54), and since Unicode 18 ־ HEBREW MAQAF (1 name, a hyphen). Candidates that weren't fenced, with the valid names that would break:

| char                      | names   | would break                             |                                 |
| ------------------------- | ------- | --------------------------------------- | ------------------------------- |
| -                         | 154,209 | 38,400 start, 5,102 end, 11,378 doubled | no                              |
| \_                        | 29,228  | all of them start with it               | no (already leading-only)       |
| •                         | 13,924  | 13,223 start                            | no                              |
| ‿                         | 66      | ~11                                     | maybe: it acts as an underscore |
| ་ Tibetan tsheg, ׳ geresh | 26, 3   | 18+, 1                                  | no: they end words by design    |

## Confusables: CJK and faux-Latin

`confusables.txt` is built for cross-script spoof detection. ENSIP-15 can use it in two ways:

- **Across groups (whole-script):** a lookalike in group A has a twin in group B. Each member is decided `primary`, `allow` (whole-script checked) or removed. This works well for Latin, Greek and Cyrillic.
- **Within a group:** both lookalikes are valid in the same group. The only tool is removing one, and in CJK both are real, heavily used characters.

The second case is the CJK problem. Unicode lists many of these pairs: Katakana vs Han (ロ/口, カ/力, エ/工, ー/一, ム/厶, ネ/礻), simplified vs traditional Han (户/戶, 吴/吳), CJK Radicals Supplement vs ideographs (⺁/厂, ⺝/月). Kana and Han share the Japanese group, so these sets end up **Unresolved** (631 in `output/log.txt`, 362 of them Japanese+Korean+Han) and are allowed by `defaultAllow`. Most have no lookalike in another group, so derive prunes them from the wholes.

What `confusables.txt` doesn't have is what registrations show: **Han and Bopomofo used as faux-Latin** (卂=A, 乃=B, 匚=C, 丂=S, 乇=E, 卄=H, ㄚ=Y, ㄒ=T, ㄥ=L, ㄖ=O, ㄩ=U, 几=N, 尺=R, 爪=M, 山=W, …). Every Bopomofo break follows this pattern.

Options:

1. **Mine the registrations:** find labels made mostly of a small faux-Latin set of Han, Bopomofo or Hangul characters that read as an ASCII word. That gives a concrete list (about 30 characters) and a count of who uses it.
2. **A "looks-Latin" whole for those characters:** a label made _only_ of faux-Latin Han/Bopomofo would be whole-script confusable with Latin. Han can't simply be removed, so this is a label-level rule. It would break existing spoofs; `bun run registrations` gives the exact count.
3. **Visual-similarity mining** for same-group pairs: render candidates in the fonts wallets use (Noto Sans CJK, system fonts) and score pairs by perceptual hash or SSIM. That produces a review list in `confuse.ts` form.
4. **Contextual rules** for Kana/Han lookalikes (ロ/口, カ/力, ー/一): for example, a Katakana-lookalike Han character must appear next to Han. ー (U+30FC) is already context-sensitive in IDNA2008 (CONTEXTO). Measure against registrations first.
5. **Leave same-group CJK confusables to UIs** (display a warning) and say so in ENSIP-15.

## How the rules were rebuilt

- **Disallow rules:** the 8,560-line `chars-disallow` (6,811 entries, mostly a denylist of Common symbols) is now [rules/disallow/](../rules/disallow/), with one file per area and one entry per block, about 2,500 lines.
  - Blocks that are mostly disallowed are `{block, except}`, so later additions are disallowed automatically.
  - Duplicates, IDNA no-ops and an unassigned codepoint are gone, and every pre-18 character resolved as before.
  - Then 422 characters that matched the old conventions but were still valid, and that no valid label used, were disallowed.
- **New characters are default-deny.** Anything new in a script used by an unrestricted group is disallowed until reviewed ([unreviewed.ts](../rules/disallow/unreviewed.ts)). This can't break a registration, because nothing new was normalizable before.
- **Confusables:** [rules/confuse.ts](../rules/confuse.ts) was a hand-edited copy of Unicode 15.0's `confusables.txt` (21,463 lines, 3,289 sets, most of them inert). It's now a set of edits over the live file.
  - The 15.0 edits were extracted first, and re-applying them to 15.0 reproduces all 2,157 sets exactly.
  - On 18.0, Unicode's own moves are followed (Cyrillic ӏ is now an l-lookalike).
  - Ten pairs that Unicode dropped are kept as joins (ç/ҫ, 郎/郞, 隷/隸).
  - Additions that would break a registered name are split out, mostly restricted-script lookalikes (Coptic, Batak).
  - Two sets Unicode merged ({ш ⲽ}, {ᩅ ᪀ ᪐}) are restored.

  [output/confusables.txt](../output/confusables.txt) shows every set and what happened to each member.
- **Escapes** are derived from properties ([rules/chars-escape.ts](../rules/chars-escape.ts)). The hand list had missed 32 format characters.
- **Annotations:** every `0x…, // (c) NAME` in `rules/` is checked against the UCD by `bun run lint`.
- **Script_Extensions overrides** remove Latin diacritics that leaked into groups without a whitelist (U+0303 in Thai, U+0307 in Hebrew, U+0308 in Hebrew and Armenian).

## Unicode report audit (18.0)

These behaviors come only from report text, so they were checked against the 18.0 revisions. `data/unicode/<v>/reports.json` records each release's revisions, and [rules/reports.ts](../rules/reports.ts) records the ones that have been read. `bun run review` flags newer ones.

- **UTS-39 rev 34** adds Hntl (Traditional Han with Latin) to the augmented script set of every Hani and Latn character, so Han + Latin is single-script under UTS-39. Derive doesn't use augmented sets for policy, and Han, Japanese and Korean already allow a–z, a strict subset of Hntl.
- **UTS-39 also** makes "nonspacing mark" explicitly Mn + Me, as derive already did. Its joining-control change doesn't apply, because ZWJ/ZWNJ are disallowed outside emoji.
- **UTS-46 rev 36 and UAX-15 rev 58:** no changes. UAX-24 is explanatory. UTS-51 revises FE0F guidance, which doesn't apply because emoji are matched without FE0F.
- **UAX-31** adds three Excluded scripts (Jurchen, Proto-Cuneiform, Seal), which become restricted groups. Derive enforces the tables: every Limited Use or Excluded script must be restricted or disallowed, and only Recommended scripts can identify a group.
- **Script_Extensions 17 → 18:** U+0B83 TAMIL SIGN VISARGA gained Kannada, Malayalam and Telugu, and is pinned to Tamil until reviewed. Vedic U+1CF5/1CF6 lost Devanagari, which has no effect.

## Bugs fixed in the port

- **Pre-release data:** `data/18.0.0` was first downloaded from the beta. The UCD files were byte-identical to the release, but `script-kinds.json` came from the proposed UAX-31, which still listed Chisoi. Downloads now record `draft: true` for beta data.
- `confused.json` depended on whether some group happened to be empty.
- The `Confusable: N` log stat counted wholes instead of characters (`flatMap` doesn't flatten iterators).
- NF random tests used `Math.random()`; they're seeded now. Upstream's random test names lived in an uncommitted cache.
- `UnicodePrinter.jsstr()` called a method that doesn't exist. `get_unnamed_cps()` skipped U+10FFFF.
- Group ordering relied on `NaN` comparing as equal for unlisted groups.
- The log started with the build date. It's now deterministic and committed, so rule changes show up as a diff.
