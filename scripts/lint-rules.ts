// Checks the human annotations in rules/**/*.ts against the UCD:
//   0x61, // (a) LATIN SMALL LETTER A
//          ^^^ ^^^^^^^^^^^^^^^^^^^^^^ must match the codepoint
// Catches hex typos (the comment says one character, the literal is another) and stale names.
//
// usage: bun scripts/lint-rules.ts [--release current]

import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';
import {parseArgs} from 'node:util';
import {UnicodeSpec} from '../src/ucd.ts';
import {hexCp} from '../src/utils.ts';

const {values: opts} = parseArgs({options: {release: {type: 'string', default: 'current'}}});
const unicode = UnicodeSpec.fromRelease(opts.release);
const root = new URL('../rules/', import.meta.url).pathname;

function* files(dir: string): Generator<string> {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* files(path);
		else if (name.endsWith('.ts')) yield path;
	}
}

// optional valid()/allow() wrapper, the literal, then "// (form) NAME"
const LINE = /^\s*(?:\w+\()?0x([0-9A-Fa-f]+)\)?,\s*\/\/\s*\((.*?)\)\s+(.+)$/;
// names in comments may carry notes: "NAME [Latn]=>[Latn]", "NAME (20221204: missing)", "NAME <1/2>"
const stripNotes = (s: string) => s.replace(/\s*(\[.*|<.*|\(\d{8}.*)$/, '').trim();
// range chars were written as "CJK Ideograph-53E3" (older) or "CJK Ideograph-53E3 [1/2]"
const normName = (s: string) => s.replace(/\s*[[<]\d+\/\d+[\]>]$/, '').toUpperCase();

let checked = 0;
const problems: string[] = [];
for (const file of files(root)) {
	const lines = readFileSync(file, 'utf8').split(/\r?\n/);
	lines.forEach((line, i) => {
		const m = line.match(LINE);
		if (!m) return;
		checked++;
		const cp = parseInt(m[1]!, 16);
		const where = `${relative(process.cwd(), file)}:${i + 1}`;
		const char = unicode.charMap.get(cp);
		if (!char) {
			problems.push(`${where} ${hexCp(cp)} is unassigned`);
			return;
		}
		const form = m[2]!.replace(/^◌/, '');
		// unprintables were written as U+FFFD, {XX}, or blank
		const printable = form && form !== '�' && !/^\{[0-9A-F]+\}$/i.test(form) && !/^\s+$/.test(form);
		if (printable && form.replace(/\uFE0F$/, '') !== String.fromCodePoint(cp)) {
			problems.push(`${where} ${hexCp(cp)} comment shows "${form}" but the literal is "${String.fromCodePoint(cp)}"`);
		}
		const name = normName(stripNotes(m[3]!));
		const names = [char.getName(), char.getName(true), char.name, char.oldName ?? ''].map((x) => normName(x));
		if (!names.some((x) => x && (name === x || name.startsWith(`${x} `) || x.startsWith(name)))) {
			problems.push(`${where} ${hexCp(cp)} comment says "${stripNotes(m[3]!)}" but the name is "${char.getName()}"`);
		}
	});
}
for (const p of problems) console.log(p);
console.log(`${checked} annotations checked, ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
