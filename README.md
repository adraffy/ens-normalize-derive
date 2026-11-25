# ens-normalize-derive

Derives the [ENSIP-15](https://docs.ens.domains/ensip/15) normalization payloads (`output/spec.json`, `output/nf.json`) from the Unicode data files, as published, plus a set of hand-maintained rules.

Started as a Bun + TypeScript port of [`ens-normalize.js/derive`](https://github.com/adraffy/ens-normalize.js/tree/main/derive) (`unicode-18` branch; the first commit reproduces its output byte-for-byte). It is now where the **Unicode 18** spec is designed.

Goal: a normalization scheme that **doesn't break existing registrations** ([adraffy/ens-labels](https://github.com/adraffy/ens-labels)) but tries to stop confusables.

See [docs/REVIEW.md](docs/REVIEW.md) for findings from the port: Unicode 18 registration impact, bugs, and suggestions for chars-disallow and CJK confusables.

## Commands

Requires [Bun](https://bun.sh) 1.4+.

```sh
bun install
bun run derive              # data/ + rules/ => output/
bun run check               # exit 1 if output/ is stale
bun run review              # new characters waiting for a decision (--all for everything new)
bun test                    # NF conformance + output/ is up to date
bun run lint                # biome + check every `0x…, // (c) NAME` rule annotation against the UCD
bun run format              # biome (rules/ is lint-only: hand-written uppercase hex and comments are kept)
bun run typecheck
```

Data:

```sh
bun run download:unicode            # latest Unicode release => data/unicode/<version>/
bun run download:unicode 18.0.0     # specific version
bun run download:unicode draft      # beta (from /Public/draft/)
bun run download:cldr [48.2]        # CLDR => data/cldr/<version>/
```

Then point the `current` tag in [data/releases.json](data/releases.json) at the versions to use.

Helpers:

```sh
bun run names 61..7A 200D           # describe codepoints (rule-file formatting)
bun run names find "letter pi"      # search by name
bun run names script Latn           # every char in a script
bun run names block Box Drawing     # every char in a block
bun run names new                   # every char new in this Unicode version
bun run names -- --format=md prop White_Space
bun run unicode-diff [17] [18]      # parsed diff between two releases
bun scripts/emoji-new.ts            # emoji new in the current release
```

## Testing against registrations

The payloads are consumed by [ens-normalize.ts](https://github.com/adraffy/ens-normalize.ts). With a local checkout:

```sh
bun scripts/test-ts.ts ../ens-normalize.ts --labels   # copy output/, rebuild, bun test, compare every ENS label
bun scripts/registrations.ts ../ens-normalize.ts --out report.txt
```

`registrations.ts` compares the rebuilt library against the released ens-normalize.js over every known label and buckets the differences: **BROKEN** (valid → error), **CHANGED** (normalizes differently), **ALLOWED** (error → valid), **MESSAGE** (different error). BROKEN and CHANGED need a decision.

Restore the checkout's own data afterwards with `bun run download` there.

## Pipeline

[src/derive.ts](src/derive.ts), in order:

1. **IDNA** ([src/idna.ts](src/idna.ts)): UTS-46 with IDNA2003 + STD3 + valid deviations gives the initial valid / ignored / mapped sets.
2. **Emoji**: RGI sequences, then single emoji (with FE0F handling). [rules/emoji.ts](rules/emoji.ts) demotes or disables some. Emoji characters are removed from the text sets.
3. **Characters**: [chars-mapped](rules/chars-mapped.ts), [chars-ignored](rules/chars-ignored.ts), [chars-valid](rules/chars-valid.ts) are added, then the [disallow rules](rules/disallow/) are removed.
4. **Script groups** ([rules/scripts.ts](rules/scripts.ts)): each valid char joins every group whose test/rest scripts cover its script extensions. Limited Use and Excluded scripts become single-script _restricted_ groups.
5. **Combining marks**: Latin-like and CJK groups only allow the sequences in [rules/cm.ts](rules/cm.ts). Other groups drop chars that decompose into duplicate NSMs.
6. **Confusables** ([rules/confuse.ts](rules/confuse.ts), built from `confusables.txt`): per group, a confusable is removed, kept (`primary`), or kept but whole-script checked (`allow`). This produces `wholes`.
7. Leftovers are pruned and invariants asserted, then the payloads are written.

`output/log.txt` records every decision and is committed, so rule changes show up as a readable diff. Its **Review: New in X** section lists every character new in the current Unicode version that ended up valid.

## Rules

Hand-written rule files keep the upstream convention: every codepoint literal carries `// (char) NAME`, and `bun run lint` verifies those annotations. `bun run names …` prints lines in that format.

Character sets that follow Unicode structure are written as [selectors](src/select.ts) instead of codepoint lists, so a new Unicode version is handled by the rule rather than by hand:

```ts
{block: 'Box Drawing'}                                   // the whole block, including future additions
{block: 'Arrows', except: [0x2190, 0x2192]}              // the block minus a few kept characters
{block: 'Latin Extended-A', cps: [0x149]}                // just these (the block is asserted)
{gc: ['Cc', 'Cf', 'Zs', 'Zl', 'Zp'], except: [0x20]}     // by general category
{prop: 'Default_Ignorable_Code_Point'}                   // by property
{age: '18.0', script: ['Zyyy', 'Zinh']}                  // by Unicode version
```

- [rules/disallow/](rules/disallow/): one file per area (latin, phonetic, symbols, math-arrows, music, cjk, scripts, …), one entry per block. A block that is mostly disallowed is written as `{block, except}`, so characters Unicode adds to it later are disallowed automatically.
- [rules/disallow/unreviewed.ts](rules/disallow/unreviewed.ts): every character new in this Unicode version, in a script used by an unrestricted group, is disallowed until it is listed in `REVIEWED`. `bun run review` prints the pending characters, grouped by block and ready to paste, plus the mappings that allowing them would enable.
- [rules/chars-escape.ts](rules/chars-escape.ts): derived from properties (it replaced the hand list and `unprintables`).

## Upgrading Unicode

1. `bun run download:unicode <v>` and `bun run download:cldr`, then point `current` in `data/releases.json` at them and move the old one to `prior`.
2. In `rules/disallow/unreviewed.ts`, bump `AGE` and empty `REVIEWED`. Add new scripts to `rules/scripts.ts` (derive fails on unassigned scripts).
3. `bun run review`: paste the characters you allow into `REVIEWED`, then `bun run derive`.
4. `bun scripts/test-ts.ts ../ens-normalize.ts --labels` and `bun scripts/registrations.ts ../ens-normalize.ts`: BROKEN and CHANGED must be empty or explicitly accepted.

## Layout

| path                 | what                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------- |
| `data/unicode/<v>/`  | Unicode files as downloaded (+ `script-kinds.json` scraped from UAX-31, `version.json`) |
| `data/cldr/<v>/`     | CLDR XML + extracted `regions.json`, `short-names.json`                                 |
| `data/releases.json` | released library versions ↔ Unicode/CLDR versions (`current`, `prior` tags)             |
| `rules/`             | hand-maintained rules                                                                   |
| `src/select.ts`      | rule selectors (block / gc / script / prop / name / age / cps)                          |
| `src/describe.ts`    | character descriptions for logs and rule comments                                       |
| `src/ucd.ts`         | data file parsers (`UnicodeSpec`)                                                       |
| `src/nf.ts`          | reference NFC/NFD, checked against `NormalizationTest.txt` on every derive              |
| `src/derive.ts`      | the derivation (pure function: data + rules → payloads + log)                           |
| `scripts/`           | CLIs                                                                                    |
| `output/`            | generated payloads (commit these)                                                       |
| `baseline/1.11.1/`   | payloads of the last release (Unicode 17), for comparison                               |

Only Unicode 17.0.0 / 18.0.0 and CLDR 47 / 48.2 are checked in. Older versions can be fetched with the download scripts.

## License

MIT, see [LICENSE](LICENSE). The files in `data/` are Unicode and CLDR data, distributed under the [Unicode License v3](https://www.unicode.org/license.txt).
