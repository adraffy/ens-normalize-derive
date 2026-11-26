# ens-normalize-derive

Derives the [ENSIP-15](https://docs.ens.domains/ensip/15) normalization payloads (`output/spec.json`, `output/nf.json`) from the Unicode data files, as published, plus a set of hand-maintained rules.

Started as a Bun + TypeScript port of [`ens-normalize.js/derive`](https://github.com/adraffy/ens-normalize.js/tree/main/derive) (`unicode-18` branch; the first commit reproduces its output byte-for-byte). It is now where the **Unicode 18** spec is designed.

Goal: a normalization scheme that **doesn't break existing registrations** ([adraffy/ens-labels](https://github.com/adraffy/ens-labels)) but tries to stop confusables.

See [docs/review.md](docs/review.md) for findings from the port (Unicode 18 registration impact, bugs, and suggestions for chars-disallow and CJK confusables) and [docs/groups.md](docs/groups.md) for how script groups are built and checked.

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
bun run diff [17] [18]              # parsed diff between two releases
bun scripts/emoji-new.ts            # emoji new in the current release
```

## Validation

[src/ensip15.ts](src/ensip15.ts) is a small, unoptimized ENSIP-15 implementation that runs straight on `output/spec.json` + `output/nf.json`. It mirrors ens-normalize.js step for step, error messages included. `bun run parity` proves it: on [baseline/1.11.1](baseline/1.11.1/) it reproduces `@adraffy/ens-normalize@1.11.1` exactly over every known label (normalize, beautify, label types). The only accepted difference is the clearer `unsupported combining mark` message, listed in the file's header.

That means a new spec can be validated before any library is built:

```sh
bun run make-tests                      # output/tests.json (deterministic)
bun run registrations [--expiry]        # every known label: new spec vs the 1.11.1 release
bun run group-stats                     # registered labels per group
```

**output/tests.json** uses the format ens-normalize.js and ens-normalize.ts already read (`{name, norm?, error?, comment?}`, a version entry first). Sources:

- **required** (the build fails otherwise): the hand-written tests in [validate/custom.ts](validate/custom.ts), every emoji in every optional-FE0F form, every character the rules disallow, disabled emoji
- **expected** (mismatches are printed for review): rule mappings, fences, CM exemplars, whitespace/noncharacter/terminal properties, ignored variation selectors
- **recorded**: per-group samples and cross-group mixtures, whole-script confusables, Unicode's IdnaTestV2 inputs, every registered label whose result changed since the baseline, registered labels sampled per group and per outcome, and seeded random names

**registrations** buckets every difference from the release: **BROKEN** (valid → error), **CHANGED** (normalizes differently), **ALLOWED** (error → valid) and **MESSAGE** (different error). BROKEN and CHANGED need a decision. `--expiry` looks up those labels as `.eth` names in the ENSv2 ETHRegistry on mainnet and classifies them as active, grace (expired less than `--grace` days ago, default 120), expired, or none. The RPC comes from `--rpc` or `RPC_URL`, otherwise viem's public default. Labels come from [adraffy/ens-labels](https://github.com/adraffy/ens-labels), pinned and cached in `.cache/`. [src/labels.ts](src/labels.ts) also counts per-codepoint usage over the valid labels: how many use a character, and how many at the start, at the end, or doubled. Use it to price a disallow or fence before making it.

To check a library build, use a local [ens-normalize.ts](https://github.com/adraffy/ens-normalize.ts) checkout:

```sh
bun scripts/test-ts.ts ../ens-normalize.ts          # copy spec/nf/tests into it, rebuild, bun test
bun run registrations --ts ../ens-normalize.ts      # registrations through the rebuilt library
```

Restore the checkout's own data afterwards with `bun run download` there.

## Pipeline

[src/derive.ts](src/derive.ts), in order:

1. **IDNA** ([src/idna.ts](src/idna.ts)): UTS-46 with IDNA2003 + STD3 + valid deviations gives the initial valid / ignored / mapped sets.
2. **Emoji**: RGI sequences, then single emoji (with FE0F handling). [rules/emoji.ts](rules/emoji.ts) demotes or disables some. Emoji characters are removed from the text sets.
3. **Characters**: [chars-mapped](rules/chars-mapped.ts), [chars-ignored](rules/chars-ignored.ts), [chars-valid](rules/chars-valid.ts) are added, then the [disallow rules](rules/disallow/) are removed.
4. **Script groups** ([rules/scripts.ts](rules/scripts.ts), explained in [docs/groups.md](docs/groups.md)): each valid char joins every group whose test/rest scripts cover its script extensions. Limited Use and Excluded scripts become single-script _restricted_ groups.
5. **Combining marks**: Latin-like and CJK groups only allow the sequences in [rules/cm.ts](rules/cm.ts). Other groups drop chars that decompose into duplicate NSMs.
6. **Confusables** ([src/confuse.ts](src/confuse.ts): `confusables.txt` edited by [rules/confuse.ts](rules/confuse.ts)): per group, a confusable is removed, kept (`primary`), or kept but whole-script checked (`allow`). This produces `wholes`.
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
- [rules/confuse.ts](rules/confuse.ts): edits over Unicode's `confusables.txt`, which is read live. `primary`/`allow` decide members; `split`/`join` reshape sets. [output/confusables.txt](output/confusables.txt) shows every resulting set and what happened to each member.
- [rules/chars-escape.ts](rules/chars-escape.ts): derived from properties (it replaced the hand list and `unprintables`).
- [rules/scripts.ts](rules/scripts.ts) `SCRIPT_EXTENSIONS`: replace a character's Script_Extensions (`[cp, ['Zyyy']]`) or remove scripts from it (`[cp, {remove: ['Hebr']}]`). Derive checks that removed scripts are actually present, and checks the script lists against UAX-31.
- [rules/reports.ts](rules/reports.ts): the revisions of the Unicode reports whose text defines behavior (UAX-15/24/31, UTS-39/46/51) that have been read. `data/unicode/<v>/reports.json` records each release's revisions; derive and `bun run review` flag newer ones.
- [rules/group-order.ts](rules/group-order.ts): a fixed group priority. The first matching group names a label and is the one named in "illegal mixture" errors, so the order is part of the output. Derive fails if an unrestricted group isn't listed. `bun run group-stats` compares it with registrations.

## Upgrading Unicode

1. `bun run download:unicode <v>` and `bun run download:cldr`, then point `current` in `data/releases.json` at them and move the old one to `prior`.
2. In `rules/disallow/unreviewed.ts`, bump `AGE` and empty `REVIEWED`. Read the Modifications sections `bun run review` lists and update `rules/reports.ts`. Add new scripts to `rules/scripts.ts` (derive fails on unassigned scripts).
3. `bun run review`: paste the characters you allow into `REVIEWED`, then `bun run derive`.
4. `bun run make-tests` (fix any FAILED/REVIEW lines), then `bun run registrations --expiry`. BROKEN and CHANGED must be empty or explicitly accepted. Add tests for the release's decisions to `validate/custom.ts`.
5. `bun scripts/test-ts.ts ../ens-normalize.ts` to check the library build.

## Layout

| path                 | what                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------- |
| `data/unicode/<v>/`  | Unicode files as downloaded (+ `script-kinds.json` scraped from UAX-31, `version.json`) |
| `data/cldr/<v>/`     | CLDR XML + extracted `regions.json`, `short-names.json`                                 |
| `data/releases.json` | released library versions ↔ Unicode/CLDR versions (`current`, `prior` tags)             |
| `rules/`             | hand-maintained rules                                                                   |
| `src/select.ts`      | rule selectors (block / gc / script / prop / name / age / cps)                          |
| `src/describe.ts`    | character descriptions for logs and rule comments                                       |
| `src/ensip15.ts`     | reference ENSIP-15 implementation over `spec.json` (see Validation)                     |
| `validate/custom.ts` | hand-written tests                                                                      |
| `src/ucd.ts`         | data file parsers (`UnicodeSpec`)                                                       |
| `src/nf.ts`          | reference NFC/NFD, checked against `NormalizationTest.txt` on every derive              |
| `src/derive.ts`      | the derivation (pure function: data + rules → payloads + log)                           |
| `scripts/`           | CLIs                                                                                    |
| `output/`            | generated payloads + `tests.json` (commit these)                                        |
| `baseline/<v>/`      | outputs of each release (1.9.4 … 1.11.1), hashes match `data/releases.json`             |

Unicode 11.0.0 – 18.0.0 and CLDR 42 – 48.2 are checked in (the older ones copied from ens-normalize.js and re-verified against unicode.org / GitHub with the download scripts). Every version parses and passes its own NormalizationTest. `rules/` targets the current release only, so `derive --release` for anything before 18 stops at a rule naming a newer character or script; the released outputs for those are in `baseline/`.

## License

MIT, see [LICENSE](LICENSE). The files in `data/` are Unicode and CLDR data, distributed under the [Unicode License v3](https://www.unicode.org/license.txt).
