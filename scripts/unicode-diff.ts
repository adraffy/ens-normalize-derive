// Compare two Unicode releases AFTER parsing.
//
// usage:
//   bun scripts/unicode-diff.ts            # prior vs current
//   bun scripts/unicode-diff.ts 17         # 17 vs current
//   bun scripts/unicode-diff.ts 17 18      # 17 vs 18

import {ensIdnaRules} from '../src/idna.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, hexCp} from '../src/utils.ts';

const hexCps = (cps: readonly CodePoint[]) => cps.map(hexCp).join(' ');

type Diffable = Map<string, string> | Set<string>;

function expand(u: UnicodeSpec): Record<string, Diffable> {
	const {valid, mapped, ignored} = ensIdnaRules(u);
	const out: Record<string, Diffable> = {
		'idna/valid': new Set(valid.map(hexCp)),
		'idna/ignored': new Set(ignored.map(hexCp)),
		'idna/mapped': new Map(mapped.map(([k, v]) => [hexCp(k), hexCps(v)])),
		'chars/name': new Map([...u.charMap.values()].map((x) => [hexCp(x.cp), x.getName()])),
		'chars/gc': new Map([...u.charMap.values()].map((x) => [hexCp(x.cp), x.gc])),
		'chars/cc': new Map([...u.charMap.values()].map((x) => [hexCp(x.cp), String(x.cc)])),
		'chars/script': new Map([...u.charMap.values()].map((x) => [hexCp(x.cp), x.script.abbr])),
		'chars/script-ext': new Map(
			[...u.charMap.values()].filter((x) => x.extended).map((x) => [hexCp(x.cp), x.extended!.map((s) => s.abbr).join(' ')]),
		),
		'chars/short': new Map([...u.charMap.values()].filter((x) => x.short).map((x) => [hexCp(x.cp), x.short!])),
		decompositions: new Map(u.decompositions().map(([k, v]) => [hexCp(k), hexCps(v)])),
		regions: new Set(u.readRegions()),
		confusables: new Map(u.readConfusables().flatMap(([target, cps]) => cps.map((cp) => [hexCp(cp), hexCps(target)]))),
		intentional: new Set(u.readIntentionalConfusables().map((v) => hexCps(v))),
		noncharacters: new Set(u.getNoncharacterCps().map(hexCp)),
		scripts: new Map([...u.scriptMap.values()].map((s) => [s.abbr, `${s.name} ${s.type ?? 'Recommended'} (${s.map.size})`])),
	};
	for (const [k, v] of Object.entries(u.readEmojiData())) out[`emoji-data/${k}`] = new Set(v.map((x) => hexCp(x.cp)));
	for (const [k, v] of Object.entries(u.readEmojiSequences())) out[`emoji-seq/${k}`] = new Set(v.map((x) => hexCps(x.cps)));
	for (const [k, v] of Object.entries(u.readEmojiZWJs())) out[`emoji-zwj/${k}`] = new Set(v.map((x) => hexCps(x.cps)));
	return out;
}

const args = process.argv.slice(2);
if (!args.length) args.push('prior');
if (args.length < 2) args.push('current');
const [a, b] = args.map((x) => expand(UnicodeSpec.fromRelease(x))) as [Record<string, Diffable>, Record<string, Diffable>];

for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
	const x = a[key];
	const y = b[key];
	if (!x || !y) {
		console.log(`[${key}] ${x ? 'removed' : 'added'}`);
		continue;
	}
	if (x instanceof Set && y instanceof Set) {
		const lost = [...x].filter((k) => !y.has(k));
		const gained = [...y].filter((k) => !x.has(k));
		if (lost.length) console.log(`[${key}] -${lost.length}: ${lost.join(', ')}`);
		if (gained.length) console.log(`[${key}] +${gained.length}: ${gained.join(', ')}`);
	} else if (x instanceof Map && y instanceof Map) {
		for (const k of new Set([...x.keys(), ...y.keys()])) {
			const u = x.get(k);
			const v = y.get(k);
			if (u !== v) console.log(`[${key}/${k}] ${u ?? '∅'} => ${v ?? '∅'}`);
		}
	}
}
