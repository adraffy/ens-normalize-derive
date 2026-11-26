# Review: derive process (Unicode 18)

Findings from porting `ens-normalize.js/derive` (`unicode-18` branch) and running the result against every known ENS label. Numbers are for Unicode 18.0.0 + CLDR 48.2 as of `d6f2bc4`.

## Status (2026-11-25)

Decided or done since the first review:

- **Bopomofo:** accepted. Bopo is Limited Use, so it doesn't mix with Han. The 34 Bopomofo+Han registrations (§1) break in the Unicode 18 release.
- **chars-disallow:** replaced by [rules/disallow/](../rules/disallow/). There are 13 area files with one entry per block, about 2,450 lines instead of 8,560. Blocks that are mostly disallowed are written as `{block, except}`. Duplicates, IDNA no-ops and the unassigned 1FB93 are gone. Every pre-18 character resolves exactly as before.
- **New in 18.0:** 222 new characters are now disallowed. The old process had let them through as valid, with no review:
  - 127 come from deny-policy blocks: Musical Symbols, Supplemental Punctuation, Geometric Shapes Extended, and the IPA-style Latin Extended-G digraphs.
  - 95 are Common/Inherited symbols in new or mostly-allowed blocks. These are covered by [unreviewed.ts](../rules/disallow/unreviewed.ts).
  - As a side effect, 33 IDNA mappings of new 18.0 capitals and Kana ligatures drop out, because their targets are now disallowed.
  - None of these can break a registration; they weren't normalizable before.
- **New 18.0 letters and symbols:** everything new in a script used by an unrestricted group is disallowed until reviewed. That's 143 characters: 39 Arabic Extended-C, Hebrew, Oriya, Bengali, Devanagari, Kana, one Han ideograph, currency signs, and Leibnizian/musical/misc symbols. `bun run review` lists them. Only the new restricted scripts (Seal, Jurchen, Proto-Cuneiform, …) are valid without review.
- **chars-escape / unprintables:** now derived from properties (§2). 32 format characters were missing and are now escaped.
- **Rule annotations** (`0x…, // (c) NAME`) are checked by `bun run lint`; all 5,731 match the UCD.
- **Registrations** after all of the above: BROKEN 34 (Bopo, accepted), CHANGED 0, ALLOWED 5 (new emoji).

## Confusables sync (2026-11-25)

`rules/confuse.ts` was a hand-edited copy of Unicode 15.0's `confusables.txt`: 21,463 lines, 3,289 groups. 957 groups had no live members and 1,825 had exactly one. Only about 500 sets did anything, and the file was never updated for 16–18.

It's now **181 lines of edits over live data**. Derive reads `data/unicode/<v>/confusables.txt` and applies:

- `primary` 69 and `allow` 18: your decisions.
- `split` 32: pull characters out of their Unicode set.
- `join` 51: merge sets.
- `defaultAllow`.

`output/confusables.txt` (generated, committed) shows every set with 2+ members in groups and what happened to each member.

How it was migrated:

1. The hand edits were extracted relative to 15.0 (2 splits, 41 joins, 68 primary, 18 allow). Re-applying them to 15.0 reproduces all 2,157 sets exactly.
2. On 18.0, Unicode moved some members to better sets (e.g. Cyrillic ӏ is now an l-lookalike), and those moves are followed. Ten pairs that Unicode 18 dropped entirely are kept as joins: ç/ҫ, 郎/郞, 隷/隸, …
3. Unicode 16–18 additions apply, except where they would break a registered name. Those were found by iterating derive against all registrations:
   - 28 new characters are split out, mostly restricted-script lookalikes (Coptic, Batak). 丫 is kept valid: it's real Chinese, with 3 active registrations.
   - 丅 is **not** protected: it's archaic, used only as a faux-Latin T (三丅卄 = "ETH"), and none of its 4 names is registered in ENSv2.
   - ᄋ is made primary.
   - Two sets that Unicode merged ({ш ⲽ}, {ᩅ ᪀ ᪐}) are restored.

Result: whole-script checked characters go from 1,190 to 2,108 (+522 Han, +270 restricted). Seven characters become invalid (the six unregistered ones plus 丅). Registrations vs 1.11.1: BROKEN 38 (34 Bopo + 4 丅, none active in ENSv2), CHANGED 0.

Still unsolved: confusables _within_ one group, such as Katakana vs Han in the Japanese group (ム/厶) and simplified vs traditional Han (户/戶). The whole-script model only compares across groups, and Unicode lists many of these pairs. Handling them needs a different mechanism (a per-group rule).

## Unicode text and data audit (2026-11-25)

Behavior that comes only from report text, checked against the 18.0 revisions. Revisions are now recorded in `data/unicode/<v>/reports.json`, the reviewed ones in `rules/reports.ts`, and `bun run review` flags anything newer.

- **UTS-39 rev 34 changed the augmented script set:** it adds Hntl (Traditional Han with Latin) for every Hani and every Latn character, so Han+Latin is now single-script under UTS-39. The upstream note "no change (18.0.0)" was based on the draft. `augmentScriptSet` is updated, but derive never used it. The ENS policy is hand-coded in `rules/scripts.ts`, and Han/Japanese/Korean already allow a–z, a strict subset of Hntl.
- **UTS-39:** "nonspacing mark" is now explicitly Mn + Me, as derive already did. The joining-control context changed, which doesn't apply because ZWJ/ZWNJ are disallowed outside emoji.
- **UTS-46 rev 36 and UAX-15 rev 58:** no changes. UAX-24 is explanatory only. UAX-31 adds the three new Excluded scripts. UTS-51 revises FE0F guidance, which doesn't apply because emoji are normalized without FE0F.
- **UAX-31 kinds vs `rules/scripts.ts`:** consistent, and now enforced by derive. Every Limited Use or Excluded script must be restricted or disallowed, and groups can only be identified by Recommended scripts.
- **Script_Extensions leaks (fixed):** Latin diacritics were valid in groups without a CM whitelist, where base + mark isn't checked. They are U+0303 in Thai, U+0307 in Hebrew, and U+0308 in Hebrew and Armenian, all present since before 17.0 and used by 0 registrations. They're removed with the new `{remove: [...]}` override.
- **Script_Extensions changes 17 → 18:** U+0B83 TAMIL SIGN VISARGA gained Knda/Mlym/Telu and is pinned to Taml until reviewed. Vedic U+1CF5/1CF6 lost Deva, which has no effect.
- **confusables.txt changed heavily in 18.0** (now synced, see Confusables sync above) (+1,457 / −1,310 pairs), and `confuse.ts` was never regenerated from it. 445 characters valid in unrestricted groups are confusables.txt sources but appear nowhere in `confuse.ts`. 415 of those predate Unicode 10, so this is an original gap; 113 are used by registrations. Most are Han, and most are confusables _within_ one group, which the whole-script model can't express:
  - simplified vs traditional: 户/戶, 吴/吳, 娱/娛
  - Katakana vs Han: ム/厶, ネ/礻, ヒ/匕, ヨ/彐
  - CJK Radicals Supplement vs ideographs: ⺁/厂, ⺊/卜, ⺝/月

  Also missing are some 17.0 additions (SAUDI RIYAL SIGN, ARABIC LETTER THIN NOON). This needs its own pass: a `confuse.ts` sync tool and a policy for same-group confusables.

## Validation (2026-11-25)

- **Reference implementation:** `src/ensip15.ts` matches `@adraffy/ens-normalize@1.11.1` exactly on 3,460,714 names: all registered labels plus the 1.11.1 `tests.json`.
- **Test file:** upstream's `validate/` is replaced by `scripts/make-tests.ts`. It is deterministic (upstream used `Math.random`, and random names lived in an uncommitted cache), needs no library build, and samples registrations per group as well as per outcome. It adds Unicode's IdnaTestV2 inputs and every registered label that changed since the baseline. 44,974 tests, 3.1 MB. A rebuilt ens-normalize.ts passes all of them.
- **Custom tests:** now `validate/custom.ts`, typed, with `\u{…}` escapes. Added 29 Unicode 18 cases: Bopomofo restriction, maqaf and other fences, the new Latin letters, rejected look-alikes (ţ ǎ ı ᴀ ǝ), unreviewed 18.0 characters, and the newly disallowed blocks.
- **ӕ:** stays valid. Upstream's custom test `тӕ` relies on it, so the earlier disallow was reverted. On its own, `ӕ` is a whole-script confusable.
- **Group order:** fixed in `rules/group-order.ts` instead of regenerated from registration counts. Spec output is unchanged.
- **Still open:** `א̇` (Hebrew + U+0307) is valid, through 18.0 script extensions.

## Rules review (2026-11-25)

Usage numbers count the 3,399,305 labels that are valid under 1.11.1.

### Missed disallows (applied)

These 422 characters were still valid in unrestricted groups, matched the conventions in the old `chars-disallow` header, and are used by **no** valid registration. They are now disallowed:

- unused characters in symbol blocks the rules otherwise reject (341): Znamenny Musical Notation, Symbols for Legacy Computing (+Supplement), Supplemental Arrows-A/C, Misc Symbols Supplement, Geometric Shapes Extended, Chess, Alchemical, Control Pictures, Supplemental Symbols and Pictographs
- punctuation (47), rotated forms (31), Cyrillic ligatures ҥ ҵ ӕ

Not applied, your call:

- Modifier letters with no registrations: kana iteration marks ゝゞヽヾ, Arabic small yeh/waw. These are real orthography.
- Box/shade characters that _are_ used: ▁▂▃▄▅▆▇█ and ░▒▓ each appear in 14–73 names.
- U+0307 COMBINING DOT ABOVE is valid in the Hebrew group through its 18.0 script extensions. That looks unintended, but disallowing it globally would affect Latin ż. The fix would be a `SCRIPT_EXTENSIONS` override.

Duplicates removed: `chars-valid` `$` and `_` (IDNA-valid since 16.0). 850 `confuse.ts` members that are disallowed are now commented `//DISALLOW:`. Derive warns if that happens again.

### CM whitelist

- All 114 entries are precomposed characters. The sequence half of the mechanism (base + mark with no precomposed form) is never used, so every group's `cm` in `spec.json` is empty. In practice the whitelist is a list of allowed accented letters.
- Unused entries: ǹ, ΐ ϋ, ѓ ӣ ќ ӯ, ヷヸヹヺヾ, ぢゔゞ (harmless).
- **Considered and rejected:** ī ė ț ș į ų ÿ ř ň ť ď ľ ő ű. Whitelisting them would have made 311 invalid registered labels valid, but most of those labels are ASCII words with one letter swapped for an accented twin: ėth, mėta, monėy (72 of 79 ė labels), biťcoin, ďegen, mcdonalďs, crÿpto, crypțo, fīrst. ď ť ľ are worse, because their caron renders like an apostrophe and ’ is valid (ďegen vs d’egen). Registration count measures demand from spoofers as much as from speakers, so it isn't a reason to whitelist. They were added in e3415a6 and reverted before release, so nothing breaks.
- Not added: ı (dotless i, 595 labels). It's a classic i-confusable and needs a confusable decision, not a whitelist entry. ǎ stays out by the existing breve-over-caron rule (ă). ǔ was already whitelisted.

### Fencing

Fenced today: ’ (11,394 names), ⁄ (520), ・ (54), none at the start, end, or doubled. The candidates, with how many valid names would break:

| char                      | names   | would break                             |                                 |
| ------------------------- | ------- | --------------------------------------- | ------------------------------- |
| -                         | 154,209 | 38,400 start, 5,102 end, 11,378 doubled | no                              |
| _                         | 29,228  | all of them start with it               | no (already leading-only)       |
| •                         | 13,924  | 13,223 start                            | no                              |
| ‿                         | 66      | ~11                                     | maybe: it acts as an underscore |
| ־ HEBREW MAQAF            | 1       | 0                                       | **yes**: it's a hyphen          |
| ་ Tibetan tsheg, ׳ geresh | 26, 3   | 18+, 1                                  | no: they end words by design    |

### Registrations still at stake (`--expiry`)

All 34 BROKEN labels (Bopomofo + Han) have **no entry in the ENSv2 ETHRegistry**, so none is registered. They lapsed before the v2 migration. **No active registration breaks.**

Current totals vs 1.11.1: BROKEN 38 (34 Bopo + 4 丅), CHANGED 0, ALLOWED 5 (new emoji), MESSAGE 690. 610 of those messages come from the new Common group: `$٠٠` now reads "Common + Arabic" instead of "Latin + Arabic". 37 are a combining mark outside the label's group, which now reads `unsupported combining mark: "i + ◌̇"` instead of an illegal mixture naming an unrelated group (`İzmir`, `x̂`). Common also retypes about 60,000 valid labels from Latin to Common (`€100`, `💎100`) without changing any normalization. See [groups.md](groups.md).

## 1. Registration impact of Unicode 18 (needs a decision)

`bun scripts/registrations.ts` (new spec vs released 1.11.1, 3,422,100 labels):

| bucket                            | count               |
| --------------------------------- | ------------------- |
| BROKEN (valid → error)            | **34**              |
| CHANGED (different normalization) | 0                   |
| ALLOWED (error → valid)           | 5 (new emoji 🫝 🫫) |
| MESSAGE (error text only)         | 29                  |

All 34 breaks are one rule change: **Bopomofo moved from its own group (`test: Bopo, rest: Hani`) to restricted**, because UAX-31 made Bopo Limited Use in 17.0. Bopomofo+Han mixes now fail with `illegal mixture: Han + Restricted[Bopo]`.

Almost all 34 are faux-Latin spoofs: 乃卂ㄚ匚 reads as "BAYC", 丂ㄥ卂丂卄 as "SLASH", 卂卩卩ㄥ乇 as "APPLE". One or two look like genuine Taiwanese use (ㄎㄧㄤ起來).

Options:

1. **Accept the breaks.** Policy wins and the victims are mostly spoofs, but this violates the "don't break registrations" goal.
2. **Keep the 17.0 `Bopomofo` group.** No breaks, but it diverges from UAX-31.
3. **Keep the Bopomofo group, but treat the Bopomofo letters that look like Latin as confusables** (ㄚ ㄒ ㄥ ㄖ ㄩ …). That needs a Han/Bopo-as-Latin confusable list (see §3), and those names would break anyway.

Related TODO in `augmentScriptSet`: the Bopo → Hanb augmentation is UTS-39 (confusable detection) and is independent of UAX-31 identifier status, so it's still correct.

## 2. Bugs and mistakes found

Fixed in this repo:

- **Pre-release data.** `data/18.0.0` was downloaded 2026-08-22 from the beta. The UCD files turned out byte-identical to the final release. `script-kinds.json` came from tr31 `proposed.html`, which still listed Chisoi, and that is what forced the `missing = {Chis: "Chisoi"}` hack and the `'Chis'` restricted entry. Both are removed now that the data comes from tr31-45.
- **`confused.json` depended on whether some group was empty.** "Remove Empty Groups" also dropped every whole without confused members, but only when it removed a group. `spec.json` was unaffected.
- **`Confusable: N` log stat** used `flatMap(w => w.map.keys())`. `flatMap` doesn't flatten iterators, so it counted wholes (490) instead of characters (1,203).
- **NF random tests** used `Math.random()`. They now use a seeded PRNG, so runs are reproducible.
- **`UnicodePrinter.jsstr()`** called `this.spec.desc_for_cp`, which doesn't exist, so it threw for unprintables.
- **`get_unnamed_cps()`** used `cp < MAX_CP` and skipped U+10FFFF.
- **Log noise.** The log started with the build date, so it always changed. It is now deterministic and committed, which makes rule changes reviewable as a diff.

Still present (rules content, left untouched):

- `chars-disallow`: **16 duplicate entries** (e.g. 0964 DEVANAGARI DANDA, 060C ARABIC COMMA, 2AF6), **4 entries already disallowed by IDNA** (FE52, FE12, FE19, FE30), and **1 unassigned codepoint** (1FB93).
- **827 `chars-disallow` entries are also `confuse.ts` members.** Since they are disallowed first, those confuse entries are dead weight and make the confusable tables harder to read.
- `spec.json.unicode` embeds the _download timestamp_ (`"18.0.0 (2026-11-25T…)"`). Re-downloading changes the spec, and its hash, even when no data changed. The version alone is enough. If provenance matters, use the file header dates or a hash of the data files.
- Group ordering uses `order = indexOf + 1 || Infinity` and `a.order - b.order`. Two groups missing from `group-order` give `NaN`, which only works because `sort` is stable and treats `NaN` as 0.
- `Remove Invalid Mappings` TODO: mappings to non-NFC sequences of valid characters (İ → i + ◌̇) are not caught.

## 3. chars-disallow: why it's so much work, and what to do instead

The file holds 6,811 entries across 168 blocks:

| what                                                                        | entries |
| --------------------------------------------------------------------------- | ------- |
| Common (Zyyy) symbols: So 3,046, Sm 877, Po 349, …                          | 4,347   |
| letters/marks of group scripts (Latin 671, Hira 286, Grek 189, Cyrl 186, …) | ~1,850  |
| Inherited (combining marks)                                                 | 330     |
| restricted-script-only                                                      | 282     |

The work is mostly a **denylist of Common symbols**. Every Common character joins every group that includes Zyyy (Latin, Japanese, Korean, Han, Cyrillic, Greek). Removing `chars-disallow` (except ASCII/escapes) would add about 4,200–4,500 characters to _each_ of those groups. Of the 6,884 IDNA-valid Common-only characters, just **1,200 survive** (So 1,017, Sm 82, Sc 30, …). So the allowlist is about a fifth the size of the denylist.

**30 blocks are disallowed entirely** (every IDNA-valid/mapped char): IPA Extensions, Phonetic Extensions (+Supplement), Box Drawing, Kana Supplement, Byzantine Musical Symbols, Domino Tiles, Ancient Greek Numbers, Yijing Hexagram Symbols, Cyrillic Extended-A/D, …. The largest per-block lists that remain are Symbols for Legacy Computing Supplement (593), Supplemental Mathematical Operators (259), Musical Symbols (232) and Misc Technical (211).

Suggestions, roughly by payoff:

1. **Default-deny new characters.** Add `DerivedAge.txt` to the download. A character introduced in this Unicode version, that isn't an emoji and isn't listed as reviewed, is disallowed by default. Derive then writes `output/new-chars.txt` for triage. Upgrades become bounded and safe. Nobody has to hand-list 593 Legacy Computing symbols, and new symbols can't silently become valid. Since nothing new is registered yet, default-deny never breaks a registration.
2. **Express policy as rules, not codepoints.** For example: `disallow: {blocks: ['Box Drawing', 'Domino Tiles', …]}`, `disallow: {script: 'Zyyy', gc: ['Sm', 'Sk', 'Po', 'Ps', 'Pe', …], except: [...]}`, `allow: {script: 'Zyyy', gc: 'So', except: [...]}`. Each rule carries a reason. The derive log already shows the per-character effect.
3. **Split what stays per area**, one file per script or block family: `rules/disallow/latin.ts` (IPA, phonetic, Latin Ext-D/E), `greek.ts`, `cyrillic.ts`, `kana.ts` (hentaigana), `math.ts`, `arrows.ts`, `legacy-computing.ts`, `music.ts`, `punctuation.ts`, `ascii-std3.ts`. Smaller diffs, and each area has an owner.
4. **Lint the rules** (`bun run lint-rules`): duplicates, no-ops (already disallowed by IDNA or an earlier rule), unassigned codepoints, conflicts (disallowed ∩ confuse, disallowed ∩ mapped), and comment/name drift. The `// (x) NAME` comments can be regenerated from the UCD, which also catches typos in hex literals.
5. **Report the cost of each rule.** For a disallow/confuse change, count how many registered labels it affects (`registrations.ts` already has the labels). This turns "is this symbol used?" into a number.

## 4. Confusables, and CJK specifically

`confuse.ts` is derived from UTS-39 `confusables.txt`. That file is skeleton-based and built for cross-script spoof detection. ENSIP-15 uses it in two ways:

- **Cross-group (whole-script):** a confusable in group A and its twin in group B. The resolution is `primary`, `allow` (+ whole-script check), or removal. This works well for Latin/Greek/Cyrillic.
- **Same-group:** two confusables valid in the _same_ group. The only tool is removing one, and for CJK both characters are real and heavily used.

That second case is the CJK problem. `confusables.txt` covers more CJK than you'd expect: 1,456 of its 6,712 entries touch Hani/Hira/Kana/Hang/Bopo, and ロ/口, カ/力, エ/工, ニ/二, ー/一, タ/夕, ト/卜, ハ/八, へ/ヘ are all listed. But Kana and Han live in the same Japanese group, so these pairs end up **Unresolved** (344 unresolved lines in the log: 113 Japanese+Korean+Han, 73 Korean, 9 Japanese) and are effectively allowed by `CONFUSE_DEFAULT_ALLOW`.

What's **missing** from `confusables.txt` is exactly what shows up in registrations: **Han and Bopomofo used as faux-Latin** (卂=A, 乃=B, 匚=C, 丂=S, 乇=E, 卄=H, ㄚ=Y, ㄒ=T, ㄥ=L, ㄖ=O, ㄩ=U, 几=N, 尺=R, 爪=M, 山=W, …). Every one of the 34 Bopomofo breaks is this pattern.

Options:

1. **Mine the registrations.** Find labels that are mostly Han/Bopo/Hangul from a small "faux-Latin" alphabet and transliterate to a plausible ASCII word. That gives a concrete list (about 30 characters) and a count of who uses it.
2. **Add a "looks-Latin" whole for those characters.** Treat 卂乃匚丂… as confusable with Latin. Han can't simply be removed, but the existing whole-script machinery could flag a label made _only_ of faux-Latin Han/Bopo characters (a label-level rule rather than a character rule). This would break existing spoofs, which you may or may not want; `registrations.ts` gives the exact count.
3. **Visual-similarity mining for same-group pairs.** Render candidates with the fonts wallets actually use (Noto Sans CJK, system fonts) and score pairs by perceptual hash or SSIM. The output is a review list in `confuse.ts` format. This scales to Kana/Han and Hangul/Han, which UTS-39 only partly covers.
4. **Contextual rules for Kana/Han lookalikes** (ロ/口, カ/力, ー/一). Mapping is out, since both are valid. A rule could require that a Katakana-lookalike Han character appears next to Han, or vice versa. Precedent: ー (30FC) is already context-sensitive in IDNA2008 (CONTEXTO). Measure against registrations before committing.
5. **Accept same-group CJK confusables at the protocol level** and leave them to UIs (display a warning). This is honest about the limits of normalization. Document it in ENSIP-15.

## 5. Process

- **Testing loop** (works today): `bun scripts/test-ts.ts ../ens-normalize.ts --labels` copies `output/` into a local ens-normalize.ts, rebuilds, runs its tests and compares all labels. `bun scripts/registrations.ts` turns that into BROKEN/CHANGED/ALLOWED/MESSAGE buckets. Two ens-normalize.ts tests are expected to fail with a new spec: `api.test.ts` asserts Unicode `17.0.0`, and `validate.test.ts` uses `tests.json` recorded from 1.11.1.
- **A reference ENSIP-15 implementation over `spec.json` in this repo** (unoptimized, a few hundred lines) would let `bun test` gate on "0 BROKEN / 0 CHANGED vs baseline" without a second checkout or the compressed encoder. ens-normalize.ts would remain the production build, and both should agree.
- **Spec diff.** A `spec-diff baseline/1.11.1 output` script that reports, per group, characters added and removed, wholes changed, emoji added and mapped changes, in readable form. Use it for release notes and for review.
- **CI** (when this goes on GitHub): `bun run check` (output is up to date), `bun test`, typecheck, and the registration report as an artifact.
- **Data.** Only download from final releases (`version.json` now records `draft: true` for beta downloads). Keep only the current and prior Unicode/CLDR versions in git (24 MB vs 108 MB upstream).
