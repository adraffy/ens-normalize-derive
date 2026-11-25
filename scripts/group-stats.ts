// Registered labels per label type (group), under the current spec. Report only.
// The group order itself is fixed in rules/group-order.ts; this shows how it compares to usage.
//
// usage: bun run group-stats

import {loadENSIP15} from '../src/ensip15.ts';
import {loadLabels} from '../src/labels.ts';
import {loadRules} from '../src/rules.ts';

const ref = await loadENSIP15();
const labels = await loadLabels();
const order = (await loadRules()).groupOrder;

const tally = new Map<string, number>();
for (const label of labels) {
	const split = ref.split(label);
	if (split.length !== 1) continue;
	const type = split[0]!.error ? '*** Error' : split[0]!.type!;
	tally.set(type, (tally.get(type) ?? 0) + 1);
}

const rows = [...tally].sort((a, b) => b[1] - a[1]);
const w = Math.max(...rows.map(([k]) => k.length));
console.log(`${labels.length} labels (single-label names only)`);
console.log(`${'type'.padEnd(w)}  ${'labels'.padStart(8)}  ${'%'.padStart(9)}  fixed order`);
for (const [type, n] of rows) {
	const name = type.replace(/^Restricted\[(.*)\]$/, '$1');
	const pos = order.indexOf(name);
	const where = type === 'ASCII' || type === 'Emoji' || type === '*** Error' ? '' : pos < 0 ? 'unlisted' : `#${pos + 1}`;
	console.log(`${type.padEnd(w)}  ${String(n).padStart(8)}  ${((n / labels.length) * 100).toFixed(5).padStart(9)}  ${where}`);
}
