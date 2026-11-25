// UTS-46 (IDNA) rule derivation
// https://unicode.org/reports/tr46/#Implementation_Notes

import type {UnicodeSpec} from './ucd.ts';
import {type CodePoint, parseCpRange, parseCpSequence} from './utils.ts';

export interface IdnaOptions {
	version: 2003 | 2008;
	useSTD3: boolean;
	validDeviations: boolean;
}

export interface IdnaRules {
	valid: CodePoint[];
	ignored: CodePoint[];
	mapped: [CodePoint, CodePoint[]][];
}

export function deriveIdnaRules(unicode: UnicodeSpec, {version, useSTD3, validDeviations}: IdnaOptions): IdnaRules {
	// 20240910: "Starting with Unicode 16.0, UseSTD3ASCIIRules=true is handled only in the Validity Criteria
	// An implementation may choose to allow additional ASCII characters but should always consider
	// ASCII lowercase letters, digits, and the hyphen-minus ([-a-z0-9]) as valid."
	const t = unicode.readIDNA();
	const valid0 = [...t.valid];
	const ignored0 = [...t.ignored];
	const mapped0 = [...t.mapped];
	if (!useSTD3) {
		// disallowed_STD3_*: the status is disallowed if UseSTD3ASCIIRules=true (the normal case)
		valid0.push(...t.disallowed_STD3_valid);
		mapped0.push(...t.disallowed_STD3_mapped);
	}
	if (version === 2003) {
		// NV8: valid but excluded by IDNA2008 from all domain names for all versions of Unicode.
		// XV8: excluded by IDNA2008 for the current version of Unicode.
		valid0.push(...t.valid_NV8, ...t.valid_XV8);
	}
	// IDNA2008 allows the joiner characters (ZWJ and ZWNJ) in labels.
	// By contrast, these are removed by the mapping in IDNA2003.
	if (version === 2008 || validDeviations) {
		valid0.push(...t.deviation_mapped.map(([x]) => x), ...t.deviation_ignored);
	} else {
		mapped0.push(...t.deviation_mapped);
		ignored0.push(...t.deviation_ignored);
	}
	const valid = valid0.flatMap(parseCpRange);
	const validSet = new Set(valid);
	const ignored = ignored0.flatMap(parseCpRange);
	if (ignored.some((cp) => validSet.has(cp))) throw new Error(`bug: ignored is valid`);
	// re-apply the rules to the mapped output: drop mappings to non-valid
	const mapped = mapped0.flatMap(([src, dst]): [CodePoint, CodePoint[]][] => {
		const cps = parseCpSequence(dst);
		return cps.every((cp) => validSet.has(cp)) ? parseCpRange(src).map((x) => [x, cps]) : [];
	});
	return {valid, ignored, mapped};
}

/** the IDNA configuration ENSIP-15 starts from */
export function ensIdnaRules(unicode: UnicodeSpec): IdnaRules {
	return deriveIdnaRules(unicode, {
		// because 2008 makes emoji invalid
		// 20231103: whatwg uses compat: https://url.spec.whatwg.org/#idna
		version: 2003,
		// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-137.md
		useSTD3: true,
		// because 200C and 200D were allowed (deviations)
		// this is effectively "Nontransitional Processing"
		// 20220123: this is also the WHATWG URL recommendation
		validDeviations: true,
	});
}
