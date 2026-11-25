// Testing loop: rebuild a local ens-normalize.ts checkout with our output/ and run its checks.
//
// usage:
//   bun scripts/test-ts.ts ../ens-normalize.ts            # copy files, make, bun test
//   bun scripts/test-ts.ts ../ens-normalize.ts --labels   # also compare every ENS label vs the released ens-normalize.js
//
// The labels comparison runs adraffy/ens-labels (every known registered label) through the rebuilt
// library and through the released ens-normalize.js. With a new spec, every mismatch is a label whose
// normalization changed: a valid label that becomes invalid is a registration that would break.
//
// note: ens-normalize.ts only downloads its data/ if missing, so the copied files are used as-is.
// Restore its upstream data with `bun run download` in that repo.

import {copyFileSync, existsSync, mkdirSync} from 'node:fs';
import {resolve} from 'node:path';

const [target, ...flags] = process.argv.slice(2);
if (!target) throw new Error('usage: bun scripts/test-ts.ts <path/to/ens-normalize.ts> [--labels]');
const root = resolve(target);
if (!existsSync(`${root}/scripts/make.ts`)) throw new Error(`not an ens-normalize.ts checkout: ${root}`);

const out = new URL('../output/', import.meta.url).pathname;
const copies: [string, string][] = [
	['spec.json', 'data/spec.json'],
	['nf.json', 'data/nf.json'],
	['nf-tests.json', 'test/data/nf-tests.json'],
];
for (const [src, dst] of copies) {
	mkdirSync(resolve(root, dst, '..'), {recursive: true});
	copyFileSync(out + src, resolve(root, dst));
	console.log(`Copied ${src} => ${dst}`);
}

function run(...cmd: string[]): number {
	console.log(`\n$ ${cmd.join(' ')}`);
	return Bun.spawnSync(cmd, {cwd: root, stdio: ['inherit', 'inherit', 'inherit']}).exitCode;
}

const results: [string, number][] = [];
for (const cmd of [['bun', 'install'], ['bun', 'scripts/make.ts'], ['bun', 'test']]) {
	const code = run(...cmd);
	results.push([cmd.join(' '), code]);
	if (code && cmd[1] !== 'test') break;
}
if (flags.includes('--labels')) {
	results.push(['bun test/labels.ts', run('bun', 'test/labels.ts')]);
}
console.log();
for (const [cmd, code] of results) console.log(`${code ? 'FAIL' : 'PASS'} ${cmd}`);
process.exit(results.some(([, code]) => code) ? 1 : 0);
