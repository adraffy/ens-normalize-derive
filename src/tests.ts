// ENSIP-15 validation test format (tests.json), shared with ens-normalize.js / ens-normalize.ts:
//   {name}               valid as-is
//   {name, norm}         valid after normalization
//   {name, error: true}  invalid (comment = error message in generated tests)

import type {ENSIP15} from './ensip15.ts';

export interface TestCase {
	name: string;
	norm?: string;
	error?: true;
	comment?: string;
}

/** runs a name through the reference implementation and records the outcome */
export function makeTest(ref: ENSIP15, name: string, comment?: string): TestCase {
	try {
		const norm = ref.normalize(name);
		return {name, ...(norm !== name && {norm}), ...(comment && {comment})};
	} catch (err) {
		return {name, error: true, comment: comment ? `${comment}: ${(err as Error).message}` : (err as Error).message};
	}
}

/** returns a description of the mismatch, or undefined if the test passes */
export function checkTest(ref: ENSIP15, {name, norm = name, error}: TestCase): string | undefined {
	let result: string;
	try {
		result = ref.normalize(name);
	} catch (err) {
		return error ? undefined : `unexpected error: ${(err as Error).message}`;
	}
	if (error) return `expected error, got ${JSON.stringify(result)}`;
	if (result !== norm) return `expected ${JSON.stringify(norm)}, got ${JSON.stringify(result)}`;
	return undefined;
}
