// Registration impact report: how does the new spec treat every known ENS label vs the released library?
//
// usage (after `bun scripts/test-ts.ts <checkout> --labels` has rebuilt it and fetched the labels):
//   bun scripts/registrations.ts ../ens-normalize.ts [--out report.txt]
//
// Compares <checkout>/src/index.ts (rebuilt from our output/) with the released ens-normalize.js
// (<checkout>/test/data/ens-normalize.mjs) over <checkout>/test/data/labels.json.
//
// Categories:
//   BROKEN     valid before, error now (an existing registration stops resolving)
//   CHANGED    valid before and now, but normalizes differently (resolves to a different node!)
//   ALLOWED    error before, valid now
//   MESSAGE    error before and now, different message (harmless)

import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parseArgs} from 'node:util';

const {values: opts, positionals} = parseArgs({allowPositionals: true, options: {out: {type: 'string'}}});
const root = resolve(positionals[0] ?? '../ens-normalize.ts');

type Normalize = (s: string) => string;
const next: {ensNormalize: Normalize} = await import(`${root}/src/index.ts`);
const prev: {ens_normalize: Normalize} = await import(`${root}/test/data/ens-normalize.mjs`);
const labels: string[] = await Bun.file(`${root}/test/data/labels.json`).json();

function run(f: Normalize, s: string): {norm?: string; error?: string} {
	try {
		return {norm: f(s)};
	} catch (err) {
		return {error: (err as Error).message};
	}
}

const buckets: Record<string, string[]> = {BROKEN: [], CHANGED: [], ALLOWED: [], MESSAGE: []};
const reasons = new Map<string, number>();
for (const label of labels) {
	const a = run(prev.ens_normalize, label);
	const b = run(next.ensNormalize, label);
	if (a.norm === b.norm && a.error === b.error) continue;
	const q = JSON.stringify(label);
	if (a.norm !== undefined && b.error !== undefined) {
		buckets.BROKEN!.push(`${q}\n    ${b.error}`);
		const reason = b.error.replace(/".*$/, '').trim(); // group by message prefix
		reasons.set(reason, (reasons.get(reason) ?? 0) + 1);
	} else if (a.norm !== undefined && b.norm !== undefined) {
		buckets.CHANGED!.push(`${q}\n    ${JSON.stringify(a.norm)} => ${JSON.stringify(b.norm)}`);
	} else if (a.error !== undefined && b.norm !== undefined) {
		buckets.ALLOWED!.push(`${q}\n    was: ${a.error}`);
	} else {
		buckets.MESSAGE!.push(`${q}\n    ${a.error}\n    ${b.error}`);
	}
}

const lines: string[] = [`${labels.length} labels`];
for (const [k, v] of Object.entries(buckets)) lines.push(`${k.padEnd(8)} ${v.length}`);
if (reasons.size) {
	lines.push('', 'BROKEN by reason:');
	for (const [k, n] of [...reasons].sort((a, b) => b[1] - a[1])) lines.push(`  ${String(n).padStart(5)} ${k}`);
}
for (const [k, v] of Object.entries(buckets)) {
	if (!v.length) continue;
	lines.push('', `==== ${k} (${v.length}) ====`, ...v);
}
const report = lines.join('\n');
if (opts.out) {
	writeFileSync(opts.out, report + '\n');
	console.log(lines.slice(0, 6 + reasons.size + 2).join('\n'));
	console.log(`\nWrote: ${opts.out}`);
} else {
	console.log(report);
}
process.exit(buckets.BROKEN!.length || buckets.CHANGED!.length ? 1 : 0);
