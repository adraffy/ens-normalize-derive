# Review: derive process (Unicode 18)

Findings from porting `ens-normalize.js/derive` (`unicode-18` branch) and running the result against every known ENS label. Numbers are for Unicode 18.0.0 + CLDR 48.2 as of `d6f2bc4`.

## 1. Registration impact of Unicode 18 (needs a decision)

`bun scripts/registrations.ts` (new spec vs released 1.11.1, 3,422,100 labels):

| bucket | count |
|---|---|
| BROKEN (valid → error) | **34** |
| CHANGED (different normalization) | 0 |
| ALLOWED (error → valid) | 5 (new emoji 🫝 🫫) |
| MESSAGE (error text only) | 29 |

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
- `spec.json.unicode` embeds the *download timestamp* (`"18.0.0 (2026-11-25T…)"`). Re-downloading changes the spec, and its hash, even when no data changed. The version alone is enough. If provenance matters, use the file header dates or a hash of the data files.
- Group ordering uses `order = indexOf + 1 || Infinity` and `a.order - b.order`. Two groups missing from `group-order` give `NaN`, which only works because `sort` is stable and treats `NaN` as 0.
- `Remove Invalid Mappings` TODO: mappings to non-NFC sequences of valid characters (İ → i + ◌̇) are not caught.

## 3. chars-disallow: why it's so much work, and what to do instead

The file holds 6,811 entries across 168 blocks:

| what | entries |
|---|---|
| Common (Zyyy) symbols: So 3,046, Sm 877, Po 349, … | 4,347 |
| letters/marks of group scripts (Latin 671, Hira 286, Grek 189, Cyrl 186, …) | ~1,850 |
| Inherited (combining marks) | 330 |
| restricted-script-only | 282 |

The work is mostly a **denylist of Common symbols**. Every Common character joins every group that includes Zyyy (Latin, Japanese, Korean, Han, Cyrillic, Greek). Removing `chars-disallow` (except ASCII/escapes) would add about 4,200–4,500 characters to *each* of those groups. Of the 6,884 IDNA-valid Common-only characters, just **1,200 survive** (So 1,017, Sm 82, Sc 30, …). So the allowlist is about a fifth the size of the denylist.

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
- **Same-group:** two confusables valid in the *same* group. The only tool is removing one, and for CJK both characters are real and heavily used.

That second case is the CJK problem. `confusables.txt` covers more CJK than you'd expect: 1,456 of its 6,712 entries touch Hani/Hira/Kana/Hang/Bopo, and ロ/口, カ/力, エ/工, ニ/二, ー/一, タ/夕, ト/卜, ハ/八, へ/ヘ are all listed. But Kana and Han live in the same Japanese group, so these pairs end up **Unresolved** (344 unresolved lines in the log: 113 Japanese+Korean+Han, 73 Korean, 9 Japanese) and are effectively allowed by `CONFUSE_DEFAULT_ALLOW`.

What's **missing** from `confusables.txt` is exactly what shows up in registrations: **Han and Bopomofo used as faux-Latin** (卂=A, 乃=B, 匚=C, 丂=S, 乇=E, 卄=H, ㄚ=Y, ㄒ=T, ㄥ=L, ㄖ=O, ㄩ=U, 几=N, 尺=R, 爪=M, 山=W, …). Every one of the 34 Bopomofo breaks is this pattern.

Options:

1. **Mine the registrations.** Find labels that are mostly Han/Bopo/Hangul from a small "faux-Latin" alphabet and transliterate to a plausible ASCII word. That gives a concrete list (about 30 characters) and a count of who uses it.
2. **Add a "looks-Latin" whole for those characters.** Treat 卂乃匚丂… as confusable with Latin. Han can't simply be removed, but the existing whole-script machinery could flag a label made *only* of faux-Latin Han/Bopo characters (a label-level rule rather than a character rule). This would break existing spoofs, which you may or may not want; `registrations.ts` gives the exact count.
3. **Visual-similarity mining for same-group pairs.** Render candidates with the fonts wallets actually use (Noto Sans CJK, system fonts) and score pairs by perceptual hash or SSIM. The output is a review list in `confuse.ts` format. This scales to Kana/Han and Hangul/Han, which UTS-39 only partly covers.
4. **Contextual rules for Kana/Han lookalikes** (ロ/口, カ/力, ー/一). Mapping is out, since both are valid. A rule could require that a Katakana-lookalike Han character appears next to Han, or vice versa. Precedent: ー (30FC) is already context-sensitive in IDNA2008 (CONTEXTO). Measure against registrations before committing.
5. **Accept same-group CJK confusables at the protocol level** and leave them to UIs (display a warning). This is honest about the limits of normalization. Document it in ENSIP-15.

## 5. Process

- **Testing loop** (works today): `bun scripts/test-ts.ts ../ens-normalize.ts --labels` copies `output/` into a local ens-normalize.ts, rebuilds, runs its tests and compares all labels. `bun scripts/registrations.ts` turns that into BROKEN/CHANGED/ALLOWED/MESSAGE buckets. Two ens-normalize.ts tests are expected to fail with a new spec: `api.test.ts` asserts Unicode `17.0.0`, and `validate.test.ts` uses `tests.json` recorded from 1.11.1.
- **A reference ENSIP-15 implementation over `spec.json` in this repo** (unoptimized, a few hundred lines) would let `bun test` gate on "0 BROKEN / 0 CHANGED vs baseline" without a second checkout or the compressed encoder. ens-normalize.ts would remain the production build, and both should agree.
- **Spec diff.** A `spec-diff baseline/1.11.1 output` script that reports, per group, characters added and removed, wholes changed, emoji added and mapped changes, in readable form. Use it for release notes and for review.
- **CI** (when this goes on GitHub): `bun run check` (output is up to date), `bun test`, typecheck, and the registration report as an artifact.
- **Data.** Only download from final releases (`version.json` now records `draft: true` for beta downloads). Keep only the current and prior Unicode/CLDR versions in git (24 MB vs 108 MB upstream).
