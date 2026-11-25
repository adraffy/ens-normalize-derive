// Print emoji introduced in a release.
// usage: bun scripts/emoji-new.ts [release=current]

import {describer} from '../src/describe.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, compareVersions, getOrInsert} from '../src/utils.ts';

const unicode = UnicodeSpec.fromRelease(process.argv[2] ?? 'current');
const d = describer(unicode, new Set());
const threshold = unicode.unicodeVersion.version;

const found = new Map<string, {cps: CodePoint[]; name: string; version: string; types: string[]}>();
function add(cps: CodePoint[], info: {type: string; name: string; version: string}) {
	if (compareVersions(info.version, threshold) < 0) return;
	const key = String.fromCodePoint(...cps);
	const rec = getOrInsert(found, key, () => ({cps, name: info.name, version: info.version, types: []}));
	rec.types.push(info.type);
}

for (const x of Object.values(unicode.readEmojiData()).flat()) add([x.cp], x);
for (const x of Object.values(unicode.readEmojiSequences()).flat()) add(x.cps, x);
for (const x of Object.values(unicode.readEmojiZWJs()).flat()) add(x.cps, x);

for (const rec of found.values()) console.log(`${d.emoji(rec.cps, rec.name)} [${rec.types}]`);
console.log(found.size);
