// Proves src/ensip15.ts is exact: on the baseline spec it must reproduce the released library.
//
// usage: bun scripts/parity.ts [--limit N] [--names tests.json ...]
//   --names: extra names (a JSON array of strings or {name} objects, eg. an ens-normalize.js tests.json)
//
// Compares ENSIP15(baseline/<v>/spec.json + nf.json) with @adraffy/ens-normalize@<v> over every known
// label: normalize + beautify (output or error message) and the per-label group type of ens_split.

import {parseArgs} from 'node:util';
import {ens_beautify, ens_normalize, ens_split} from '@adraffy/ens-normalize';
import {loadENSIP15} from '../src/ensip15.ts';
import {BASELINE_VERSION, loadLabels} from '../src/labels.ts';

const {values: opts} = parseArgs({options: {limit: {type: 'string'}, names: {type: 'string', multiple: true}}});

const ref = await loadENSIP15(new URL(`../baseline/${BASELINE_VERSION}/`, import.meta.url));
let labels = await loadLabels();
if (opts.limit) labels = labels.slice(0, Number(opts.limit));
for (const file of opts.names ?? []) {
	const v: (string | {name: string})[] = await Bun.file(file).json();
	labels = [...labels, ...v.map((x) => (typeof x === 'string' ? x : x.name))];
}

const run = (f: (s: string) => string, s: string) => {
	try {
		return f(s);
	} catch (err) {
		return `Error: ${(err as Error).message}`;
	}
};

const t0 = performance.now();
const bad = new Map<string, number>();
let shown = 0;
for (const label of labels) {
	const checks: [string, string, string][] = [
		['normalize', run((s) => ref.normalize(s), label), run(ens_normalize, label)],
		['beautify', run((s) => ref.beautify(s), label), run(ens_beautify, label)],
		[
			'type',
			ref
				.split(label)
				.map((x) => x.type ?? '-')
				.join('.'),
			ens_split(label)
				.map((x: {type?: string}) => x.type ?? '-')
				.join('.'),
		],
	];
	for (const [what, a, b] of checks) {
		if (a === b) continue;
		bad.set(what, (bad.get(what) ?? 0) + 1);
		if (shown++ < 20) console.log(`mismatch ${what} ${JSON.stringify(label)}\n  ref: ${a}\n  lib: ${b}`);
	}
}
const secs = ((performance.now() - t0) / 1000).toFixed(1);
console.log(`${labels.length} labels in ${secs}s vs @adraffy/ens-normalize@${BASELINE_VERSION}`);
console.log(bad.size ? `MISMATCH ${[...bad].map(([k, n]) => `${k}=${n}`).join(' ')}` : 'exact match');
process.exit(bad.size ? 1 : 0);
