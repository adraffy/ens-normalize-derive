// Every known ENS label (adraffy/ens-labels), pinned, and per-codepoint usage among
// the labels that are valid under the released library (the baseline).

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {ens_normalize} from '@adraffy/ens-normalize';
import {type CodePoint, explodeCp} from './utils.ts';

// same pin as ens-normalize.ts/scripts/download.ts
const LABELS_COMMIT = '9e96e2ba97142df523ac9dc386458dec8804d1d9'; // 2026-10-18, 3,422,100 labels
const LABELS_SHA256 = '38c7b537db15cebfe38bfcbfe574ad7ac5feb8ec2aa7c2fb5e907bfa50a858b2';
export const BASELINE_VERSION = '1.11.1'; // @adraffy/ens-normalize in package.json

const CACHE = new URL('../.cache/', import.meta.url);

export async function loadLabels(): Promise<string[]> {
	const file = new URL('labels.json', CACHE);
	if (!existsSync(file)) {
		mkdirSync(CACHE, {recursive: true});
		const url = `https://raw.githubusercontent.com/adraffy/ens-labels/${LABELS_COMMIT}/labels.json`;
		console.log(`Downloading ${url} (about 50 MB)`);
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
		writeFileSync(file, await res.bytes());
	}
	const bytes = readFileSync(file);
	const hash = new Bun.CryptoHasher('sha256').update(bytes).digest('hex');
	if (hash !== LABELS_SHA256) throw new Error(`labels.json: wrong sha256 (${hash})`);
	return JSON.parse(bytes.toString('utf8'));
}

export interface CpUsage {
	/** valid labels containing the cp (after normalization) */
	labels: number;
	/** ... as the first / last character */
	start: number;
	end: number;
	/** ... next to itself */
	doubled: number;
	/** a few examples (normalized) */
	examples: string[];
}

export interface Usage {
	total: number;
	valid: number;
	cps: Map<CodePoint, CpUsage>;
}

/** per-codepoint usage over the normalized valid labels (cached in .cache/) */
export async function loadUsage(): Promise<Usage> {
	const file = new URL(`usage-${BASELINE_VERSION}.json`, CACHE);
	if (existsSync(file)) {
		const {total, valid, cps} = JSON.parse(readFileSync(file, 'utf8'));
		return {total, valid, cps: new Map(cps)};
	}
	const labels = await loadLabels();
	const cps = new Map<CodePoint, CpUsage>();
	let valid = 0;
	for (const label of labels) {
		let norm: string;
		try {
			norm = ens_normalize(label);
		} catch {
			continue;
		}
		valid++;
		const v = explodeCp(norm);
		const seen = new Set<CodePoint>();
		v.forEach((cp, i) => {
			let u = cps.get(cp);
			if (!u) {
				u = {labels: 0, start: 0, end: 0, doubled: 0, examples: []};
				cps.set(cp, u);
			}
			if (!seen.has(cp)) {
				seen.add(cp);
				u.labels++;
				if (u.examples.length < 5) u.examples.push(norm);
			}
			if (i === 0) u.start++;
			if (i === v.length - 1) u.end++;
			if (v[i + 1] === cp) u.doubled++;
		});
	}
	const usage = {total: labels.length, valid, cps};
	writeFileSync(file, JSON.stringify({total: usage.total, valid, cps: [...cps]}));
	return usage;
}
