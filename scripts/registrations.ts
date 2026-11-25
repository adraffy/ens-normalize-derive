// Registration impact report: how does the new spec treat every known ENS label vs the released library?
//
// usage (after `bun scripts/test-ts.ts <checkout>` has rebuilt ens-normalize.ts from our output/):
//   bun scripts/registrations.ts ../ens-normalize.ts [--out report.txt] [--expiry] [--rpc URL]
//
// Compares <checkout>/src/index.ts (rebuilt from our output/) with the released library
// (@adraffy/ens-normalize, see BASELINE_VERSION) over every known label (adraffy/ens-labels).
//
// Categories:
//   BROKEN     valid before, error now (an existing registration stops resolving)
//   CHANGED    valid before and now, but normalizes differently (resolves to a different node!)
//   ALLOWED    error before, valid now
//   MESSAGE    error before and now, different message (harmless)
//
// --expiry: looks up BROKEN and CHANGED labels as .eth names in the ENSv2 ETHRegistry (mainnet)
//   active    expiry in the future (REGISTERED, or RESERVED = v1 holder that hasn't migrated yet)
//   grace     expired less than 28 days ago (only the holder can renew)
//   expired   anyone can register it
//   lapsed    no v2 entry; was a v1 .eth name that lapsed (now held by the v2 Graveyard, or just expired)
//   never     no .eth 2LD with this label, ever (the label is known from a subname or elsewhere)
// RPC: --rpc or $RPC_URL, else viem's default public mainnet endpoint.

import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parseArgs} from 'node:util';
import {ens_normalize} from '@adraffy/ens-normalize';
import {createPublicClient, hexToBigInt, http, labelhash, parseAbi} from 'viem';
import {mainnet} from 'viem/chains';
import {BASELINE_VERSION, loadLabels} from '../src/labels.ts';

const {values: opts, positionals} = parseArgs({
	allowPositionals: true,
	options: {
		out: {type: 'string'},
		expiry: {type: 'boolean', default: false},
		rpc: {type: 'string', default: process.env.RPC_URL},
	},
});
const root = resolve(positionals[0] ?? '../ens-normalize.ts');

type Normalize = (s: string) => string;
const next: {ensNormalize: Normalize} = await import(`${root}/src/index.ts`);
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
	const b = run(next.ensNormalize, label);
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
// v1, frozen: only used to explain names with no v2 entry
const V1_BASE_REGISTRAR = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
const GRAVEYARD = '0xda021a2c1c2f99574d861ef8c6fa745851beb7f6';
const GRACE_PERIOD = 28 * 24 * 60 * 60; // ETHRegistrar.GRACE_PERIOD()
const STATUS = ['AVAILABLE', 'RESERVED', 'REGISTERED'];
const ABI = parseAbi([
	'function getExpiry(uint256 anyId) view returns (uint64)', // the registry masks the low 32 version bits
	'function getStatus(uint256 anyId) view returns (uint8)',
]);
const V1_ABI = parseAbi(['function nameExpires(uint256 id) view returns (uint256)', 'function ownerOf(uint256 id) view returns (address)']);

const expiries = new Map<string, string>();
const expiryCounts = new Map<string, number>();
if (opts.expiry) {
	const client = createPublicClient({chain: mainnet, transport: http(opts.rpc), batch: {multicall: true}});
	const block = await client.getBlock();
	const now = Number(block.timestamp);
	const check = [...buckets.BROKEN, ...buckets.CHANGED].map((x) => x.label);
	// registered labels are hashed as registered (not normalized)
	const ids = check.map((label) => hexToBigInt(labelhash(label)));
	const results = await client.multicall({
		allowFailure: true,
		contracts: ids.flatMap((id) => [
			{address: ETH_REGISTRY, abi: ABI, functionName: 'getExpiry', args: [id]} as const,
			{address: ETH_REGISTRY, abi: ABI, functionName: 'getStatus', args: [id]} as const,
			{address: V1_BASE_REGISTRAR, abi: V1_ABI, functionName: 'nameExpires', args: [id]} as const,
			{address: V1_BASE_REGISTRAR, abi: V1_ABI, functionName: 'ownerOf', args: [id]} as const, // reverts when expired
		]),
	});
	check.forEach((label, i) => {
		const [e, s, v1e, v1o] = results.slice(4 * i, 4 * i + 4) as [
			(typeof results)[number],
			(typeof results)[number],
			(typeof results)[number],
			(typeof results)[number],
		];
		let state: string;
		let info: string;
		if (e.status !== 'success' || s.status !== 'success') {
			state = 'error';
			info = 'call failed';
		} else {
			const expiry = Number(e.result);
			const date = new Date(expiry * 1000).toISOString().slice(0, 10);
			if (expiry > now) state = 'active';
			else if (expiry && expiry + GRACE_PERIOD > now) state = 'grace';
			else if (expiry) state = 'expired';
			else if (v1e.status === 'success' && v1e.result) state = 'lapsed';
			else state = 'never';
			if (expiry) {
				info = `${STATUS[Number(s.result)] ?? s.result} until ${date}`;
			} else if (state === 'lapsed') {
				const owner = v1o.status === 'success' ? String(v1o.result).toLowerCase() : undefined;
				info = owner === GRAVEYARD ? 'v1 name, now held by the Graveyard' : 'v1 name, expired before the v2 migration';
			} else {
				info = 'not a .eth 2LD';
			}
		}
		expiries.set(label, `${state}: ${info}`);
		expiryCounts.set(state, (expiryCounts.get(state) ?? 0) + 1);
	});
	console.log(`ENSv2 ETHRegistry ${ETH_REGISTRY} @ block ${block.number}`);
}

// ************************************************************
// report

const lines: string[] = [`${labels.length} labels, @adraffy/ens-normalize@${BASELINE_VERSION} vs ${root}`];
for (const [k, v] of Object.entries(buckets)) lines.push(`${k.padEnd(8)} ${v.length}`);
if (reasons.size) {
	lines.push('', 'BROKEN by reason:');
	for (const [k, n] of [...reasons].sort((a, b) => b[1] - a[1])) lines.push(`  ${String(n).padStart(5)} ${k}`);
}
if (expiryCounts.size) {
	lines.push('', 'BROKEN + CHANGED as .eth:');
	for (const k of ['active', 'grace', 'expired', 'lapsed', 'never', 'error']) {
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
