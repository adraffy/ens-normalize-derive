// Consistent human-readable descriptions of characters, used in logs and generated rule comments.

import type {UnicodeSpec} from './ucd.ts';
import {type CodePoint, explodeCp, hexCp, hexSeq, requireCodePoint} from './utils.ts';
import UNPRINTABLES from './unprintables.ts';

export interface EmojiLike {
	cps?: readonly CodePoint[];
	cp?: CodePoint;
	name?: string;
	name0?: string;
}

export class UnicodePrinter {
	constructor(readonly spec: UnicodeSpec) {}

	header(): string[] {
		return [
			`// Computed: ${new Date().toJSON()}`,
			`// Version: Unicode(${this.spec.unicodeVersion.version}) CLDR(${this.spec.cldrVersion.version})`,
		];
	}
	display(cp: CodePoint) {
		return this.spec.safeString(cp);
	}
	/** 0x61, // (a) LATIN SMALL LETTER A */
	js(cp: CodePoint): string {
		return `0x${hexCp(cp)}, // (${this.display(cp)}) ${this.spec.getName(cp)}`;
	}
	/** 0x61, // (a) LATIN SMALL LETTER A [Latn] */
	jss(cp: CodePoint): string {
		return `${this.js(cp)} [${this.scripts(cp)}]`;
	}
	/** 'a', // 61 (a) LATIN SMALL LETTER A */
	jsstr(cp: CodePoint): string {
		if (UNPRINTABLES.has(cp)) throw new TypeError(`unprintable: ${this.cp(cp)}`);
		return `'${String.fromCodePoint(cp)}', // ${hexCp(cp)} (${this.display(cp)}) ${this.spec.getName(cp)}`;
	}
	/** * `61 (a)` LATIN SMALL LETTER A */
	md(cp: CodePoint): string {
		return `* \`${hexCp(cp)} (${this.display(cp)})\` ${this.spec.getName(cp)}`;
	}
	scripts(cp: CodePoint): string {
		const script = this.spec.getScript(cp);
		if (!script) return 'Unknown';
		const ext = this.spec.getExtendedScriptSet(cp);
		if (ext.size === 1 && ext.has(script)) return script.abbr;
		return `${script.abbr} => ${[...ext].map((x) => x.abbr).join(',')}`;
	}
	names(cps: readonly CodePoint[]): string {
		return cps.map((cp) => this.spec.getName(cp)).join(' + ');
	}
	/** 61 (a) LATIN SMALL LETTER A */
	cp(cp: CodePoint): string {
		requireCodePoint(cp);
		return `${hexCp(cp)} (${this.display(cp)}) ${this.spec.getName(cp)}`;
	}
	/** [61 62] (ab) LATIN SMALL LETTER A + LATIN SMALL LETTER B */
	cps(x: string | CodePoint | readonly CodePoint[]): string {
		const cps = explodeCp(x);
		return `${hexSeq(cps)} (${this.spec.safeString(cps)}) ${this.names(cps)}`;
	}
	mapped(x: CodePoint, ys: readonly CodePoint[]): string {
		return `${this.cp(x)} => ${this.cps(ys)}`;
	}
	emoji(info: EmojiLike): string {
		const cps = info.cps ?? [info.cp!];
		let name = info.name || this.names(cps);
		if (info.name0) name = `${name} / ${info.name0}`;
		return `${hexSeq(cps)} (${String.fromCodePoint(...cps)}) ${name}`;
	}
}
