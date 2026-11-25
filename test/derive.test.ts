// The committed output/ must match what the rules + data produce.
// If this fails after editing rules, run `bun run derive` and review the diff.

import {expect, test} from 'bun:test';
import {derive} from '../src/derive.ts';
import {loadRules} from '../src/rules.ts';
import {UnicodeSpec} from '../src/ucd.ts';

const out = derive({unicode: UnicodeSpec.fromRelease('current'), rules: await loadRules(), skipNFTests: true});

async function committed(name: string) {
	const {created, ...rest} = await Bun.file(new URL(`../output/${name}`, import.meta.url)).json();
	return rest;
}

test('spec.json is up to date', async () => {
	const {created, ...spec} = out.spec;
	expect(spec).toEqual(await committed('spec.json'));
});

test('nf.json is up to date', async () => {
	const {created, ...nf} = out.nf;
	expect(nf).toEqual(await committed('nf.json'));
});

test('ascii is valid in Latin', () => {
	const latin = out.spec.groups.find((g) => g.name === 'Latin')!;
	for (const cp of 'abcxyz0189-_$') expect(latin.primary).toContain(cp.codePointAt(0)!);
});
