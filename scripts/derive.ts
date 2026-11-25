// Derives output/*.json from data/ + rules/
//
// usage:
//   bun scripts/derive.ts                    # current release (data/releases.json tag "current")
//   bun scripts/derive.ts --release 17       # another release (tag, unicode version, or #index)
//   bun scripts/derive.ts --check            # don't write, exit 1 if spec.json/nf.json would change
//   bun scripts/derive.ts --out dir/         # write somewhere else
//   bun scripts/derive.ts --verbose          # echo the log
//
// Files are only rewritten when their content (ignoring "created") changes.

import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {parseArgs} from 'node:util';
import {derive} from '../src/derive.ts';
import {Logger} from '../src/log.ts';
import {loadRules} from '../src/rules.ts';
import {UnicodeSpec} from '../src/ucd.ts';

const {values: args} = parseArgs({
	options: {
		release: {type: 'string', default: 'current'},
		check: {type: 'boolean', default: false},
		out: {type: 'string'},
		verbose: {type: 'boolean', short: 'v', default: false},
	},
});

const outDir = args.out ? new URL(args.out.replace(/\/?$/, '/'), `file://${process.cwd()}/`) : new URL('../output/', import.meta.url);

const t0 = performance.now();
const log = new Logger(args.verbose);
const unicode = UnicodeSpec.fromRelease(args.release);
const out = derive({unicode, rules: await loadRules(), log});
console.log(`Derived Unicode ${unicode.unicodeVersion.version} + CLDR ${unicode.cldrVersion.version} in ${Math.round(performance.now() - t0)}ms`);

/** stable comparison key: drops the volatile "created" field */
function contentKey(json: unknown): string {
	if (json && typeof json === 'object' && !Array.isArray(json)) {
		const {created, ...rest} = json as Record<string, unknown>;
		return JSON.stringify(rest);
	}
	return JSON.stringify(json);
}

function readExisting(name: string): unknown {
	try {
		return JSON.parse(readFileSync(new URL(name, outDir), 'utf8'));
	} catch {
		return undefined;
	}
}

const files: [name: string, json: unknown, indent?: boolean][] = [
	['spec.json', out.spec],
	['nf.json', out.nf],
	['nf-tests.json', out.nfTests],
	['emoji-info.json', out.emojiInfo, true],
	['names.json', out.names],
	['confused.json', out.confused],
];

if (args.check) {
	let changed = 0;
	for (const [name, json] of files) {
		const same = contentKey(readExisting(name)) === contentKey(json);
		if (!same) changed++;
		console.log(`${same ? 'Same' : 'DIFF'}: ${name}`);
	}
	process.exit(changed ? 1 : 0);
}

mkdirSync(outDir, {recursive: true});
for (const [name, json, indent] of files) {
	if (contentKey(readExisting(name)) === contentKey(json)) {
		console.log(`Unchanged: ${name}`);
		continue;
	}
	const buf = Buffer.from(JSON.stringify(json, null, indent ? '\t' : undefined));
	writeFileSync(new URL(name, outDir), buf);
	console.log(`Wrote: ${name} [${buf.length}]`);
}
writeFileSync(new URL('log.txt', outDir), log.toString());
console.log(`Wrote: log.txt [${log.lines.length} lines]`);
