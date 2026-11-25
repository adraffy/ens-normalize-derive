// Registration impact report: how does the new spec treat every known ENS label vs the released library?
//
// usage:
//   bun run registrations [--out report.txt] [--expiry] [--rpc URL] [--grace DAYS]
//   bun run registrations --ts ../ens-normalize.ts   # use a rebuilt ens-normalize.ts instead (see test-ts.ts)
//
// Compares the new spec (reference implementation on output/, or a rebuilt ens-normalize.ts) with the
// released library (@adraffy/ens-normalize, see BASELINE_VERSION) over every known label (adraffy/ens-labels).
//
// Categories:
//   BROKEN     valid before, error now (an existing registration stops resolving)
//   CHANGED    valid before and now, but normalizes differently (resolves to a different node!)
//   ALLOWED    error before, valid now
//   MESSAGE    error before and now, different message (harmless)
//
// --expiry: looks up BROKEN and CHANGED labels as .eth names in the ENSv2 ETHRegistry (mainnet, the authority)
//   active    expiry in the future
//   grace     expired less than --grace days ago (default 120)
//   expired   expired longer ago
//   none      no entry (never a .eth 2LD, or lapsed before the v2 migration)
// RPC: --rpc or $RPC_URL, else viem's default public mainnet endpoint.

import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parseArgs} from 'node:util';
import {ens_normalize} from '@adraffy/ens-normalize';
import {createPublicClient, hexToBigInt, http, labelhash, parseAbi} from 'viem';
import {mainnet} from 'viem/chains';
import {loadENSIP15} from '../src/ensip15.ts';
import {BASELINE_VERSION, loadLabels} from '../src/labels.ts';

const {values: opts} = parseArgs({
	options: {
		ts: {type: 'string'},
		out: {type: 'string'},
		expiry: {type: 'boolean', default: false},
		grace: {type: 'string', default: '120'}, // days
		rpc: {type: 'string', default: process.env.RPC_URL},
	},
});
type Normalize = (s: string) => string;
let next: Normalize;
let nextName: string;
if (opts.ts) {
	const root = resolve(opts.ts);
	const lib: {ensNormalize: Normalize} = await import(`${root}/src/index.ts`);
	next = lib.ensNormalize;
	nextName = root;
} else {
	const ref = await loadENSIP15();
	next = (s) => ref.normalize(s);
	nextName = 'output/ (reference)';
}
const labels = await loadLabels();

function run(f: Normalize, s: string): {norm?: string; error?: string} {
	try {
		return {norm: f(s)};
	} catch (err) {
		return {error: (err as Error).message};
	}
}

interface Diff {
	label: string;
	detail: string;
}
const buckets: Record<'BROKEN' | 'CHANGED' | 'ALLOWED' | 'MESSAGE', Diff[]> = {BROKEN: [], CHANGED: [], ALLOWED: [], MESSAGE: []};
const reasons = new Map<string, number>();
for (const label of labels) {
	const a = run(ens_normalize, label);
	const b = run(next, label);
	if (a.norm === b.norm && a.error === b.error) continue;
	if (a.norm !== undefined && b.error !== undefined) {
		buckets.BROKEN.push({label, detail: b.error});
		const reason = b.error.replace(/".*$/, '').trim(); // group by message prefix
		reasons.set(reason, (reasons.get(reason) ?? 0) + 1);
	} else if (a.norm !== undefined && b.norm !== undefined) {
		buckets.CHANGED.push({label, detail: `${JSON.stringify(a.norm)} => ${JSON.stringify(b.norm)}`});
	} else if (a.error !== undefined && b.norm !== undefined) {
		buckets.ALLOWED.push({label, detail: `was: ${a.error}`});
	} else {
		buckets.MESSAGE.push({label, detail: `${a.error}\n    ${b.error}`});
	}
}

// ************************************************************
// .eth expiry (ENSv2)

// https://github.com/ensdomains/contracts-v2/blob/v1.0.1/contracts/deployments/mainnet/addresses.md
const ETH_REGISTRY = '0xf60aba43e1f7f3dab1186ff03b561401c9df85e2';
// the registry masks the low 32 version bits, so a plain labelhash works
const ABI = parseAbi(['function getExpiry(uint256 anyId) view returns (uint64)']);

const expiries = new Map<string, string>();
const expiryCounts = new Map<string, number>();
if (opts.expiry) {
	const graceDays = Number(opts.grace);
	if (!Number.isFinite(graceDays) || graceDays < 0) throw new Error(`invalid --grace: ${opts.grace}`);
	const client = createPublicClient({chain: mainnet, transport: http(opts.rpc), batch: {multicall: true}});
	const block = await client.getBlock();
	const now = Number(block.timestamp);
	const check = [...buckets.BROKEN, ...buckets.CHANGED].map((x) => x.label);
	// registered labels are hashed as registered (not normalized)
	const results = await client.multicall({
		allowFailure: true,
		contracts: check.map(
			(label) => ({address: ETH_REGISTRY, abi: ABI, functionName: 'getExpiry', args: [hexToBigInt(labelhash(label))]}) as const,
		),
	});
	check.forEach((label, i) => {
		const r = results[i]!;
		let state: string;
		let info = '';
		if (r.status !== 'success') {
			state = 'error';
			info = ': call failed';
		} else {
			const expiry = Number(r.result);
			if (!expiry) state = 'none';
			else if (expiry > now) state = 'active';
			else if (expiry + graceDays * 86400 > now) state = 'grace';
			else state = 'expired';
			if (expiry) info = ` ${new Date(expiry * 1000).toISOString().slice(0, 10)}`;
		}
		expiries.set(label, `${state}${info}`);
		expiryCounts.set(state, (expiryCounts.get(state) ?? 0) + 1);
	});
	console.log(`ENSv2 ETHRegistry ${ETH_REGISTRY} @ block ${block.number}, grace ${graceDays} days`);
}

// ************************************************************
// report

const lines: string[] = [`${labels.length} labels, @adraffy/ens-normalize@${BASELINE_VERSION} vs ${nextName}`];
for (const [k, v] of Object.entries(buckets)) lines.push(`${k.padEnd(8)} ${v.length}`);
if (reasons.size) {
	lines.push('', 'BROKEN by reason:');
	for (const [k, n] of [...reasons].sort((a, b) => b[1] - a[1])) lines.push(`  ${String(n).padStart(5)} ${k}`);
}
if (expiryCounts.size) {
	lines.push('', 'BROKEN + CHANGED as .eth:');
	for (const k of ['active', 'grace', 'expired', 'none', 'error']) {
		const n = expiryCounts.get(k);
		if (n) lines.push(`  ${String(n).padStart(5)} ${k}`);
	}
}
const summary = lines.length;
for (const [k, v] of Object.entries(buckets)) {
	if (!v.length) continue;
	lines.push('', `==== ${k} (${v.length}) ====`);
	for (const {label, detail} of v) {
		const exp = expiries.get(label);
		lines.push(`${JSON.stringify(label)}${exp ? `  [${exp}]` : ''}`, `    ${detail}`);
	}
}
const report = lines.join('\n');
if (opts.out) {
	writeFileSync(opts.out, `${report}\n`);
	console.log(lines.slice(0, summary).join('\n'));
	console.log(`\nWrote: ${opts.out}`);
} else {
	console.log(report);
}
process.exit(buckets.BROKEN.length || buckets.CHANGED.length ? 1 : 0);
