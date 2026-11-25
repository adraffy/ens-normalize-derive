// Print emoji introduced in a release.
// usage: bun scripts/emoji-new.ts [release=current]

import {UnicodePrinter} from '../src/printer.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, compareVersions} from '../src/utils.ts';

const unicode = UnicodeSpec.fromRelease(process.argv[2] ?? 'current');
const P = new UnicodePrinter(unicode);
const threshold = unicode.unicodeVersion.version;

const found = new Map<string, {cps: CodePoint[]; name: string; version: string; types: string[]}>();
function add(cps: CodePoint[], info: {type: string; name: string; version: string}) {
	if (compareVersions(info.version, threshold) < 0) return;
	const key = String.fromCodePoint(...cps);
	let rec = found.get(key);
	if (!rec) found.set(key, (rec = {cps, name: info.name, version: info.version, types: []}));
	rec.types.push(info.type);
}

for (const x of Object.values(unicode.readEmojiData()).flat()) add([x.cp], x);
for (const x of Object.values(unicode.readEmojiSequences()).flat()) add(x.cps, x);
for (const x of Object.values(unicode.readEmojiZWJs()).flat()) add(x.cps, x);

for (const rec of found.values()) console.log(`${P.emoji(rec)} [${rec.types}]`);
console.log(found.size);
