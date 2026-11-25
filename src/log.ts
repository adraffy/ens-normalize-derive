import {formatTable} from './utils.ts';

/** collects the build log (output/log.txt) and optionally echoes it */
export class Logger {
	readonly lines: string[] = [];
	constructor(public echo = false) {}
	log(...a: unknown[]) {
		const line = a.map((x) => (typeof x === 'string' ? x : Bun.inspect(x))).join(' ');
		this.lines.push(line);
		if (this.echo) console.log(line);
	}
	section(s: string) {
		this.log(`==== ${s} ====`);
	}
	checked(s = 'OK') {
		this.log(`[✓] ${s}`);
	}
	table(cols: string[], rows: (string | number)[][]) {
		for (const line of formatTable(cols, rows)) this.log(line);
	}
	toString() {
		return this.lines.map((x) => x + '\n').join('');
	}
}
