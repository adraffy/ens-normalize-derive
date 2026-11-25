// Reference NFC/NFD implementation built from the UCD.
// https://unicode.org/reports/tr15/

import type {UnicodeSpec} from './ucd.ts';
import {type CodePoint, compareArrays, explodeCp, getOrInsert, mulberry32, permutations} from './utils.ts';

// algorithmic hangul
// https://www.unicode.org/versions/Unicode15.0.0/ch03.pdf (page 144)
const S0 = 0xac00;
const L0 = 0x1100;
const V0 = 0x1161;
const T0 = 0x11a7;
const L_COUNT = 19;
const V_COUNT = 21;
const T_COUNT = 28;
const N_COUNT = V_COUNT * T_COUNT;
const S_COUNT = L_COUNT * N_COUNT;
const S1 = S0 + S_COUNT;
const L1 = L0 + L_COUNT;
const V1 = V0 + V_COUNT;
const T1 = T0 + T_COUNT;

const isHangul = (cp: CodePoint) => cp >= S0 && cp < S1;
const unpackCC = (packed: number) => (packed >> 24) & 0xff;
const unpackCp = (packed: number) => packed & 0xffffff;

export interface NF {
	nfd(cps: readonly CodePoint[]): CodePoint[];
	nfc(cps: readonly CodePoint[]): CodePoint[];
	isNFC(cp: CodePoint): boolean;
	isDecomposed(cp: CodePoint): boolean;
	isComposite(cp: CodePoint): boolean;
	/** returns failures against NormalizationTest.txt */
	runTests(): {name: string; input: CodePoint[]; expect: CodePoint[]; actual: CodePoint[]}[];
	/** asserts nfc(x) == nfc(nfd(x)) and nfd(x) == nfd(nfc(x)) on random input */
	runRandomTests(n?: number, len?: number, seed?: number): void;
	/** cps that are between NFC and NFD in the composition graph */
	innerParts(cp: CodePoint): CodePoint[];
}

export function createNF(unicode: UnicodeSpec): NF {
	const SHIFTED_RANK = new Map(unicode.combiningRanks().flatMap((v, i) => v.map((cp) => [cp, (i + 1) << 24])));
	const EXCLUSIONS = new Set(unicode.readCompositionExclusions());
	const DECOMP = new Map<CodePoint, CodePoint[]>();
	const RECOMP = new Map<CodePoint, Map<CodePoint, CodePoint>>();

	for (const [cp, cps] of unicode.decompositions()) {
		DECOMP.set(cp, cps.toReversed());
		if (!EXCLUSIONS.has(cp) && cps.length === 2) {
			const [a, b] = cps as [CodePoint, CodePoint];
			const m = getOrInsert(RECOMP, a, () => new Map());
			m.set(b, cp);
		}
	}

	function composePair(a: CodePoint, b: CodePoint): CodePoint {
		if (a >= L0 && a < L1 && b >= V0 && b < V1) {
			return S0 + (a - L0) * N_COUNT + (b - V0) * T_COUNT;
		} else if (isHangul(a) && b > T0 && b < T1 && (a - S0) % T_COUNT === 0) {
			return a + (b - T0);
		} else {
			return RECOMP.get(a)?.get(b) ?? -1;
		}
	}

	// returns packed: (rank << 24) | cp
	function decomposed(cps: readonly CodePoint[]): number[] {
		const ret: number[] = [];
		const buf: CodePoint[] = [];
		let checkOrder = false;
		function add(cp: CodePoint) {
			const cc = SHIFTED_RANK.get(cp);
			if (cc) {
				checkOrder = true;
				cp |= cc;
			}
			ret.push(cp);
		}
		for (const cp0 of cps) {
			buf.push(cp0);
			do {
				const cp = buf.pop()!;
				if (cp < 0x80) {
					ret.push(cp);
				} else if (isHangul(cp)) {
					const s = cp - S0;
					add(L0 + ((s / N_COUNT) | 0));
					add(V0 + (((s % N_COUNT) / T_COUNT) | 0));
					const t = s % T_COUNT;
					if (t > 0) add(T0 + t);
				} else {
					const mapped = DECOMP.get(cp);
					if (mapped) {
						buf.push(...mapped);
					} else {
						add(cp);
					}
				}
			} while (buf.length);
		}
		if (checkOrder && ret.length > 1) {
			// canonical ordering (insertion sort by cc)
			let prev = unpackCC(ret[0]!);
			for (let i = 1; i < ret.length; i++) {
				const cc = unpackCC(ret[i]!);
				if (cc === 0 || prev <= cc) {
					prev = cc;
					continue;
				}
				let j = i - 1;
				while (true) {
					[ret[j], ret[j + 1]] = [ret[j + 1]!, ret[j]!];
					if (!j) break;
					prev = unpackCC(ret[--j]!);
					if (prev <= cc) break;
				}
				prev = unpackCC(ret[i]!);
			}
		}
		return ret;
	}

	function composedFromDecomposed(v: number[]): CodePoint[] {
		const ret: CodePoint[] = [];
		const stack: CodePoint[] = [];
		let prevCp = -1;
		let prevCC = 0;
		for (const packed of v) {
			const cc = unpackCC(packed);
			const cp = unpackCp(packed);
			if (prevCp === -1) {
				if (cc === 0) {
					prevCp = cp;
				} else {
					ret.push(cp);
				}
			} else if (prevCC > 0 && prevCC >= cc) {
				if (cc === 0) {
					ret.push(prevCp, ...stack);
					stack.length = 0;
					prevCp = cp;
				} else {
					stack.push(cp);
				}
				prevCC = cc;
			} else {
				const composed = composePair(prevCp, cp);
				if (composed >= 0) {
					prevCp = composed;
				} else if (prevCC === 0 && cc === 0) {
					ret.push(prevCp);
					prevCp = cp;
				} else {
					stack.push(cp);
					prevCC = cc;
				}
			}
		}
		if (prevCp >= 0) ret.push(prevCp, ...stack);
		return ret;
	}

	const nf: NF = {
		nfd: (cps) => decomposed(cps).map(unpackCp),
		nfc: (cps) => composedFromDecomposed(decomposed(cps)),
		isNFC(cp) {
			const cps = nf.nfc([cp]);
			return cps.length === 1 && cps[0] === cp;
		},
		isDecomposed(cp) {
			const cps = nf.nfd([cp]);
			return cps.length === 1 && cps[0] === cp;
		},
		isComposite: (cp) => nf.nfd([cp]).length > 1,
		runTests() {
			const errors: ReturnType<NF['runTests']> = [];
			for (const [name, cases] of Object.entries(unicode.readNFTests())) {
				for (const strs of cases) {
					const [input, nfd0, nfc0] = strs.map((s) => explodeCp(s)) as [CodePoint[], CodePoint[], CodePoint[]];
					const nfd1 = nf.nfd(input);
					if (compareArrays(nfd0, nfd1)) errors.push({name: `${name} (NFD)`, input, expect: nfd0, actual: nfd1});
					const nfc1 = nf.nfc(input);
					if (compareArrays(nfc0, nfc1)) errors.push({name: `${name} (NFC)`, input, expect: nfc0, actual: nfc1});
				}
			}
			return errors;
		},
		runRandomTests(n = 10000, len = 256, seed = 0x5eed) {
			const rng = mulberry32(seed);
			const v: CodePoint[] = [];
			for (; n > 0; n--) {
				for (let i = 0; i < len; i++) v[i] = (rng() * 0x110000) | 0;
				if (compareArrays(nf.nfc(v), nf.nfc(nf.nfd(v)))) throw new Error('random nfc');
				if (compareArrays(nf.nfd(v), nf.nfd(nf.nfc(v)))) throw new Error('random nfd');
			}
		},
		// note: this could be computed efficiently using internal NF knowledge,
		// however brute-force avoids thinking
		innerParts(cp0) {
			const [base, ...extra] = nf.nfd([cp0]);
			if (!extra.length) return [];
			const found = new Set<CodePoint>();
			for (const perm of permutations(extra)) {
				for (let n = 1; n <= perm.length; n++) {
					const part = nf.nfc([base!, ...perm.slice(0, n)]);
					const rest = nf.nfc([...part, ...perm.slice(n)]);
					if (rest.length === 1 && rest[0] === cp0) {
						for (const cp of part) {
							if (cp !== cp0 && cp !== base && !extra.includes(cp)) found.add(cp);
						}
					}
				}
			}
			return [...found];
		},
	};
	return nf;
}
