export type CodePoint = number;

export const MAX_CP = 0x10ffff;

export function requireCodePoint(cp: number): CodePoint {
	if (!Number.isSafeInteger(cp) || cp < 0 || cp > MAX_CP) {
		throw new TypeError(`expected codepoint: ${cp}`);
	}
	return cp;
}

/** 61 => "61", 1F600 => "1F600" */
export function hexCp(cp: CodePoint): string {
	return cp.toString(16).padStart(2, '0').toUpperCase();
}

/** [61, 62] => "[61 62]" */
export function hexSeq(cps: readonly CodePoint[]): string {
	return `[${cps.map(hexCp).join(' ')}]`;
}

/** 61 => "{61}" */
export function quoteCp(cp: CodePoint): string {
	return `{${hexCp(cp)}}`;
}

/** "abc" | 0x61 | [0x61] => [0x61, ...] */
export function explodeCp(x: string | CodePoint | readonly CodePoint[]): CodePoint[] {
	if (typeof x === 'string') {
		return Array.from(x, (c) => c.codePointAt(0)!);
	} else if (typeof x === 'number') {
		return [x];
	} else if (Array.isArray(x)) {
		return x.slice();
	}
	throw new TypeError('expected codepoint coercible');
}

/** "1F600" => 0x1F600 */
export function parseCp(s: string): CodePoint {
	if (/^[0-9a-f]+$/i.test(s)) {
		return requireCodePoint(parseInt(s, 16));
	}
	throw new TypeError(`expected hex codepoint: ${s}`);
}

/** "AAAA BBBB" => [0xAAAA, 0xBBBB] */
export function parseCpSequence(s: string): CodePoint[] {
	return s.trim().split(/\s+/).map(parseCp);
}

/** "AAAA" => [0xAAAA], "AAAA..AAAC" => [0xAAAA, 0xAAAB, 0xAAAC] */
export function parseCpRange(s: string): CodePoint[] {
	const pos = s.indexOf('..');
	if (pos < 0) return [parseCp(s)];
	const lo = parseCp(s.slice(0, pos));
	const hi = parseCp(s.slice(pos + 2));
	if (hi < lo) throw new Error(`expected non-empty range: ${s}`);
	return Array.from({length: hi - lo + 1}, (_, i) => lo + i);
}

/** "61 63..65" => [0x61, 0x63, 0x64, 0x65] */
export function parseCps(spec: string | CodePoint): CodePoint[] {
	if (typeof spec === 'number') return [spec];
	return spec.split(/\s+/).filter(Boolean).flatMap(parseCpRange);
}

export function compareArrays(a: readonly number[], b: readonly number[]): number {
	const n = a.length;
	let c = n - b.length;
	for (let i = 0; c === 0 && i < n; i++) c = a[i]! - b[i]!;
	return c;
}

export function sameArrays(a: readonly number[], b: readonly number[]): boolean {
	return compareArrays(a, b) === 0;
}

export function sortedCps(v: Iterable<CodePoint>): CodePoint[] {
	return [...v].sort((a, b) => a - b);
}

export function groupBy<T, K>(iterable: Iterable<T>, fn: (x: T) => K): Map<K, T[]> {
	const map = new Map<K, T[]>();
	for (const x of iterable) {
		const key = fn(x);
		let bucket = map.get(key);
		if (!bucket) map.set(key, (bucket = []));
		bucket.push(x);
	}
	return map;
}

/** Heap's algorithm, every permutation is a copy */
export function* permutations<T>(v: readonly T[]): Generator<T[]> {
	const n = v.length;
	if (!n) return;
	const a = v.slice();
	yield a.slice();
	if (n === 1) return;
	const u = new Array<number>(n).fill(0);
	let i = 1;
	while (i < n) {
		if (u[i]! < i) {
			const j = i & 1 ? u[i]! : 0;
			[a[j], a[i]] = [a[i]!, a[j]!];
			yield a.slice();
			u[i]!++;
			i = 1;
		} else {
			u[i] = 0;
			i++;
		}
	}
}

export interface Version {
	major: number;
	minor: number;
	patch: number;
}

export function parseVersion(s: string): Version {
	const match = s.match(/^(\d+)(?:\.(\d+)(?:\.(\d+))?)?$/);
	if (!match) throw new Error(`expected version string: ${s}`);
	return {
		major: parseInt(match[1]!),
		minor: parseInt(match[2] ?? '0'),
		patch: parseInt(match[3] ?? '0'),
	};
}

export function versionString({major, minor, patch}: Version): string {
	return `${major}.${minor}.${patch}`;
}

export function compareVersions(a: string | Version, b: string | Version): number {
	const x = typeof a === 'string' ? parseVersion(a) : a;
	const y = typeof b === 'string' ? parseVersion(b) : b;
	return x.major - y.major || x.minor - y.minor || x.patch - y.patch;
}

/** deterministic PRNG: https://gist.github.com/tommyettinger/46a874533244883189143505d203312c */
export function mulberry32(seed: number): () => number {
	return () => {
		let t = (seed = (seed + 0x6d2b79f5) | 0);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
	};
}

export function formatTable(cols: string[], rows: (string | number)[][], sep = ' | '): string[] {
	const widths = cols.map((_, i) => rows.reduce((a, v) => Math.max(a, String(v[i]).length), 0));
	const lines = [cols.map((x, i) => x.slice(0, widths[i]).padEnd(widths[i]!)).join(sep)];
	for (const row of rows) {
		lines.push(row.map((x, i) => (typeof x === 'number' ? String(x).padStart(widths[i]!) : x.padEnd(widths[i]!))).join(sep));
	}
	return lines;
}
