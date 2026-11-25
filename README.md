# ens-normalize-derive

Derives the [ENSIP-15](https://docs.ens.domains/ensip/15) normalization payloads (`output/spec.json`, `output/nf.json`) from the Unicode data files, as published, plus a set of hand-maintained rules.

This is a Bun + TypeScript port of [`ens-normalize.js/derive`](https://github.com/adraffy/ens-normalize.js/tree/main/derive) (`unicode-18` branch). It produces byte-identical `spec.json`, `nf.json`, `nf-tests.json`, `emoji-info.json`, `names.json` and `confused.json`.

Goal: a normalization scheme that **doesn't break existing registrations** ([adraffy/ens-labels](https://github.com/adraffy/ens-labels)) but tries to stop confusables.

See [docs/REVIEW.md](docs/REVIEW.md) for findings from the port: Unicode 18 registration impact, bugs, and suggestions for chars-disallow and CJK confusables.

## Commands

Requires [Bun](https://bun.sh) 1.4+.

```sh
bun install
bun run derive              # data/ + rules/ => output/
bun run check               # exit 1 if output/ is stale
bun test                    # NF conformance + output/ is up to date
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
3. **Characters**: [chars-mapped](rules/chars-mapped.ts), [chars-ignored](rules/chars-ignored.ts), [chars-valid](rules/chars-valid.ts) are added, then [chars-disallow](rules/chars-disallow.ts) is removed.
4. **Script groups** ([rules/scripts.ts](rules/scripts.ts)): each valid char joins every group whose test/rest scripts cover its script extensions. Limited Use and Excluded scripts become single-script *restricted* groups.
5. **Combining marks**: Latin-like and CJK groups only allow the sequences in [rules/cm.ts](rules/cm.ts). Other groups drop chars that decompose into duplicate NSMs.
6. **Confusables** ([rules/confuse.ts](rules/confuse.ts), built from `confusables.txt`): per group, a confusable is removed, kept (`primary`), or kept but whole-script checked (`allow`). This produces `wholes`.
7. Leftovers are pruned and invariants asserted, then the payloads are written.

`output/log.txt` records every decision and is committed, so rule changes show up as a readable diff.

## Layout

| path | what |
|---|---|
| `data/unicode/<v>/` | Unicode files as downloaded (+ `script-kinds.json` scraped from UAX-31, `version.json`) |
| `data/cldr/<v>/` | CLDR XML + extracted `regions.json`, `short-names.json` |
| `data/releases.json` | released library versions ↔ Unicode/CLDR versions (`current`, `prior` tags) |
| `rules/` | hand-maintained rules (same content as upstream, typed) |
| `src/ucd.ts` | data file parsers (`UnicodeSpec`) |
| `src/nf.ts` | reference NFC/NFD, checked against `NormalizationTest.txt` on every derive |
| `src/derive.ts` | the derivation (pure function: data + rules → payloads + log) |
| `scripts/` | CLIs |
| `output/` | generated payloads (commit these) |
| `baseline/1.11.1/` | payloads of the last release (Unicode 17), for comparison |

Only Unicode 17.0.0 / 18.0.0 and CLDR 47 / 48.2 are checked in. Older versions can be fetched with the download scripts.
