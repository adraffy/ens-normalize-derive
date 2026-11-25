// Print characters with consistent formatting (useful for writing rules).
//
// usage:
//   bun scripts/names.ts 61..7A 200D         # hex codepoints / ranges (or literal characters)
//   bun scripts/names.ts find abc            # search names (regex, case-insensitive)
//   bun scripts/names.ts script Latn         # every character in a script
//   bun scripts/names.ts prop White_Space    # every character with a PropList property
//   bun scripts/names.ts block 0400..04FF    # alias of a range
//   bun scripts/names.ts idna-valid | idna-ignored | idna-mapped | cm
// options:
//   --format=js|jss|jsstr|md|csv   (default: js)
//   --release=current|prior|17     (default: current)
//   --old                          (find: also search old names)

import {parseArgs} from 'node:util';
import {ensIdnaRules} from '../src/idna.ts';
import {UnicodePrinter} from '../src/printer.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, explodeCp, hexCp, parseCpRange} from '../src/utils.ts';

const {values: opts, positionals: args} = parseArgs({
	allowPositionals: true,
	options: {
		format: {type: 'string', default: 'js'},
		release: {type: 'string', default: 'current'},
		old: {type: 'boolean', default: false},
	},
});

const unicode = UnicodeSpec.fromRelease(opts.release);
const P = new UnicodePrinter(unicode);

let cps: CodePoint[];
switch (args[0]) {
	case 'find': {
		const re = new RegExp(args.slice(1).join(' '), 'i');
		cps = [...unicode.charMap.values()]
			.filter((x) => re.test(x.name) || (x.short && re.test(x.short)) || (opts.old && x.oldName && re.test(x.oldName)))
			.map((x) => x.cp);
		break;
	}
	case 'script': {
		cps = [...unicode.requireScript(args[1]!).map.keys()];
		break;
	}
	case 'prop': {
		const props = unicode.readProps();
		cps = args.slice(1).flatMap((p) => {
			const v = props[p];
			if (!v) throw new Error(`unknown property: ${p}`);
			return v;
		});
		break;
	}
	case 'idna-valid': cps = ensIdnaRules(unicode).valid; break;
	case 'idna-ignored': cps = ensIdnaRules(unicode).ignored; break;
	case 'idna-mapped': cps = ensIdnaRules(unicode).mapped.map((x) => x[0]); break;
	case 'cm': cps = [...unicode.cm]; break;
	default: {
		const v = args.slice(args[0] === 'block' ? 1 : 0).flatMap((arg) => (/^[0-9a-f]/i.test(arg) ? parseCpRange(arg) : explodeCp(arg)));
		cps = [...new Set(v)].sort((a, b) => a - b);
	}
}

switch (opts.format) {
	case 'js':
	case 'jss':
	case 'jsstr':
	case 'md': {
		const fmt = opts.format;
		for (const cp of cps) console.log(P[fmt](cp));
		console.log(cps.length);
		break;
	}
	case 'csv': {
		console.log(`Dec,Hex,Form,Name`);
		for (const cp of cps) console.log(`${cp},${hexCp(cp)},"${P.display(cp)}","${unicode.getName(cp)}"`);
		break;
	}
	default: throw new Error(`unknown format: ${opts.format}`);
}
