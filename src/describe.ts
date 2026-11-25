// Human-readable descriptions of characters (logs, errors, rule comments).
//
//   d.str([0x300, 0x61])   "◌̀a"                    safe display: leading CM gets a dotted circle, escaped cps become {XX}
//   d.cp(0x61)             "61 (a) LATIN SMALL LETTER A"
//   d.seq([0x61, 0x62])    "[61 62] (ab) LATIN SMALL LETTER A + LATIN SMALL LETTER B"
//   d.mapped(0x41, [0x61]) "41 (A) ... => [61] (a) ..."  (single-cp sequences print like d.cp)
//   d.comment(0x61)        "0x61, // (a) LATIN SMALL LETTER A"   (rule-file line)

import type {UnicodeSpec} from './ucd.ts';
import {type CodePoint, hexCp, hexSeq, quoteCp} from './utils.ts';

export interface Describer {
	str(cps: readonly CodePoint[]): string;
	cp(cp: CodePoint): string;
	seq(cps: readonly CodePoint[]): string;
	mapped(x: CodePoint, ys: readonly CodePoint[]): string;
	emoji(cps: readonly CodePoint[], name?: string): string;
	/** "Latn" or "Zyyy => Arab,Syrc" when Script_Extensions differ */
	scripts(cp: CodePoint): string;
	comment(cp: CodePoint): string;
}

/** `escape`: cps that are never printed raw (spec.escape); unassigned cps are always escaped */
export function describer(unicode: UnicodeSpec, escape: ReadonlySet<CodePoint>): Describer {
	const name = (cp: CodePoint) => unicode.getName(cp);
	const escaped = (cp: CodePoint) => escape.has(cp) || !unicode.charMap.has(cp);
	const d: Describer = {
		str(cps) {
			let s = '';
			if (cps.length && !escaped(cps[0]!) && unicode.cm.has(cps[0]!)) s = '◌'; // DOTTED CIRCLE
			for (const cp of cps) s += escaped(cp) ? quoteCp(cp) : String.fromCodePoint(cp);
			return s;
		},
		cp: (cp) => `${hexCp(cp)} (${d.str([cp])}) ${name(cp)}`,
		seq: (cps) => (cps.length === 1 ? d.cp(cps[0]!) : `${hexSeq(cps)} (${d.str(cps)}) ${cps.map(name).join(' + ')}`),
		mapped: (x, ys) => `${d.cp(x)} => ${d.seq(ys)}`,
		emoji: (cps, label) => `${hexSeq(cps)} (${String.fromCodePoint(...cps)}) ${label || cps.map(name).join(' + ')}`,
		scripts(cp) {
			const char = unicode.charMap.get(cp);
			if (!char) return 'Unknown';
			const ext = char.getExtended();
			if (ext.length === 1 && ext[0] === char.script) return char.script.abbr;
			return `${char.script.abbr} => ${ext.map((s) => s.abbr).join(',')}`;
		},
		comment: (cp) => `0x${hexCp(cp)}, // (${d.str([cp])}) ${name(cp)}`,
	};
	return d;
}
