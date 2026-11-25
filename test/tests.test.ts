// output/tests.json and validate/custom.ts must agree with the reference implementation on output/.
// If this fails after a rules change: bun run derive && bun run make-tests

import {expect, test} from 'bun:test';
import {loadENSIP15} from '../src/ensip15.ts';
import {checkTest, type TestCase} from '../src/tests.ts';
import CUSTOM from '../validate/custom.ts';

const ref = await loadENSIP15();

function failures(tests: TestCase[]) {
	return tests.flatMap((t) => {
		const why = checkTest(ref, t);
		return why ? [{name: t.name, comment: t.comment, why}] : [];
	});
}

test('custom tests', () => {
	expect(failures(CUSTOM)).toEqual([]);
});

test('tests.json matches the spec', async () => {
	const [version, ...tests]: [{spec_hash: string}, ...TestCase[]] = await Bun.file(new URL('../output/tests.json', import.meta.url)).json();
	const bytes = await Bun.file(new URL('../output/spec.json', import.meta.url)).bytes();
	expect(version.spec_hash).toBe(new Bun.CryptoHasher('sha256').update(bytes).digest('hex'));
	expect(failures(tests).slice(0, 10)).toEqual([]);
});
