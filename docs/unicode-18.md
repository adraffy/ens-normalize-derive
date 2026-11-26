# Unicode 18: what changed since 1.11.1

This compares `output/spec.json` (Unicode 18.0.0, CLDR 48.2) with [baseline/1.11.1](../baseline/1.11.1/) (Unicode 17.0.0, CLDR 47), the last released spec. For what an ENSIP-15 library has to change, see [implementers.md](implementers.md).

## Registered labels

`bun run registrations`, over all 3,422,100 known labels:

| bucket                            | count | what                                                                                           |
| --------------------------------- | ----- | ---------------------------------------------------------------------------------------------- |
| BROKEN (valid → error)            | 38    | 34 Bopomofo + Han mixes, 4 labels using `丅` as a Latin T. None is registered in ENSv2.        |
| CHANGED (different normalization) | 0     |                                                                                                |
| ALLOWED (error → valid)           | 5     | new emoji (🫝 🫫)                                                                              |
| MESSAGE (error text only)         | 690   | 610 name the Common group, 37 are the new combining mark message, 43 follow other data changes |

About 60,000 valid labels without a letter (`€100`, `💎100`) change type from Latin to Common. Their normalization doesn't change.

## Characters

| section of `spec.json` | 1.11.1 → 18                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| valid (in some group)  | +12,623, −428                                                                                              |
| emoji                  | +19 sequences: 🛙 🪋 🪌 🪍 🫌 🫝 🫫 🫹 🫺, plus skin tones of 🫹 🫺                                        |
| mapped                 | −6 (targets now disallowed: Ҥ Ҵ, three Tibetan vowel signs, Georgian Mtavruli U+1CB9). None added.         |
| ignored                | unchanged                                                                                                  |
| fenced                 | + ־ HEBREW PUNCTUATION MAQAF (a hyphen: 1 registration, none at the start, end or doubled)                 |
| escape                 | +32 format characters (now derived from properties, see [rules/chars-escape.ts](../rules/chars-escape.ts)) |
| cm / nsm / nfc_check   | +37 / −4 / −2, following the new and newly disallowed marks                                                |

**New in Unicode 18** (13,007 characters):

- **12,623 are valid,** all in restricted groups: the new scripts Seal (11,328), Jurchen (965) and Proto-Cuneiform (164), plus additions to Cuneiform (159), Khitan Small Script (5) and Tangut (2). Restricted groups can't mix with anything, so these can't affect existing labels.
- **9 new emoji.**
- **375 are not valid.** 143 are letters and symbols in scripts that unrestricted groups use (Arabic Extended-C, Hebrew, Oriya, Bengali, Devanagari, Kana, one Han ideograph, currency signs, …). They wait for review in [rules/disallow/unreviewed.ts](../rules/disallow/unreviewed.ts); `bun run review` lists them. 144 more are disallowed by block rules (Musical Symbols, Supplemental Punctuation, Geometric Shapes Extended, Latin Extended-G digraphs, …). The other 88 are IDNA mappings whose targets aren't valid.

**Disallowed although valid in 1.11.1** (428 characters):

- 354 shared symbols and punctuation that no valid label uses (Legacy Computing, Arrows, Alchemical, Geometric Shapes, Chess, Control Pictures, …). They left every group with Common at once.
- 73 script-specific characters that no valid label uses: punctuation and signs in Arabic, Devanagari, Tibetan, Thai, Khmer, Myanmar and others, rare Cyrillic ҥ ҵ ꙾, Han 𖿢 𠄞 𠄟 𠄠, Hangul ᆼ, Bengali ৽.
- 丅, a Han character used only as a faux-Latin T (三丅卄 = "ETH"). Unicode 18 made it a T confusable.

Some characters also left individual groups. Combining marks had leaked through Script_Extensions into groups without a whitelist, where base + mark isn't checked: U+0303 in Thai, U+0307 in Hebrew, U+0308 in Hebrew and Armenian. They're removed with [rules/scripts.ts](../rules/scripts.ts) `SCRIPT_EXTENSIONS` overrides and stay valid elsewhere. No registered label used them.

## Groups

171 groups (28 unrestricted, 143 restricted), up from 167.

- **Common** (new, first): only shared characters (digits, punctuation, symbols). It's a subset of Latin, Han, Japanese, Korean, Cyrillic and Greek, so it can't make a label valid or invalid. It only names labels without a letter. See [groups.md](groups.md).
- **Bopomofo** is now `Restricted[Bopo]`. UAX-31 lists Bopomofo as Limited Use, so it no longer mixes with Han (`中ㄐ` is an illegal mixture). This is the 34 BROKEN labels, almost all faux-Latin spoofs (乃卂ㄚ匚 = "BAYC").
- **New restricted groups:** `Seal`, `Jurc`, `Pcun`. Chisoi was in the draft of UAX-31 but not in the final 18.0.0.
- **Script_Extensions:** U+0B83 TAMIL SIGN VISARGA gained Kannada, Malayalam and Telugu in 18.0. It stays Tamil-only until reviewed.
- **Order:** unchanged except that Common is first. (Myanmar and Gujarati swapped places in the port. They share no characters, so nothing depends on it.)

## Combining marks

- **CM whitelist:** unchanged, 128 precomposed letters (51 Latin, 11 Greek, 8 Cyrillic, 58 Japanese). Fourteen more Latin letters (ī ė ț ș į ų ÿ ř ň ť ď ľ ő ű) were considered and rejected, see [review.md](review.md#cm-whitelist).
- **New rule:** in a group without a whitelist, a combining mark must follow one of the group's own (primary) characters, not a shared extra. This rejects marks on Arabic `-`, Hebrew `₪` and Thai `฿`. No registered label is affected.
- **New message:** a combining mark that isn't in the label's group gives `illegal placement: unsupported combining mark: "x + ◌̂"` instead of an illegal mixture naming an unrelated group. Only the message changes.

Both are code changes; [implementers.md](implementers.md) has the details.

## Confusables

[rules/confuse.ts](../rules/confuse.ts) used to be a hand-edited copy of Unicode 15.0's `confusables.txt` (21,463 lines). It's now 170 edits over the live Unicode 18 file: 69 `primary`, 18 `allow`, 35 `split` and 48 `join`. Unicode 16–18 additions now apply, except where they would break a registered name.

Derive then drops confused characters with no lookalike in another group. Those made the whole-script check stop early, so `α∞` passed while `α1` failed.

| wholes                          | 1.11.1 | 18  |
| ------------------------------- | ------ | --- |
| count                           | 490    | 292 |
| whole-script checked characters | 1,204  | 959 |

Results: `丅` is a T confusable (4 BROKEN labels). Some short labels mixing a lookalike with a shared character are now whole-script confusable, such as `α∞`, `ஐ௮` (Tamil/Grantha) and `ဝ၁` (Myanmar/Chakma). No other registered label changes.

## Library changes

- **Data:** same file shapes as 1.11.1, so `spec.json` and `nf.json` are drop-in replacements.
- **Code:** the combining mark rule and message above.
- **Tests:** `output/tests.json` (44,958 tests) has cases for every change on this page. [adraffy/ens-normalize.ts#4](https://github.com/adraffy/ens-normalize.ts/pull/4) is the Unicode 18 build of ens-normalize.ts.
