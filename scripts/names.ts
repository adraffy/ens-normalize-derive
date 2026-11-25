// Print characters with consistent formatting (useful for writing rules).
//
// usage:
//   bun scripts/names.ts 61..7A 200D         # hex codepoints / ranges (or literal characters)
//   bun scripts/names.ts find abc            # search names (regex, case-insensitive)
//   bun scripts/names.ts script Latn         # every character in a script
//   bun scripts/names.ts prop White_Space    # every character with a PropList property
//   bun scripts/names.ts block "Box Drawing" # every character in a block
//   bun scripts/names.ts new                 # characters new in this version
//   bun scripts/names.ts idna-valid | idna-ignored | idna-mapped | cm
// options:
//   --format=js|jss|jsstr|md|csv   (default: js)
//   --release=current|prior|17     (default: current)
//   --old                          (find: also search old names)

import {parseArgs} from 'node:util';
import {describer} from '../src/describe.ts';
import {ensIdnaRules} from '../src/idna.ts';
import {loadRules} from '../src/rules.ts';
import {resolveRules} from '../src/select.ts';
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
const d = describer(unicode, resolveRules(unicode, (await loadRules()).charsEscape).cps);

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
	case 'idna-valid':
		cps = ensIdnaRules(unicode).valid;
		break;
	case 'idna-ignored':
		cps = ensIdnaRules(unicode).ignored;
		break;
	case 'idna-mapped':
		cps = ensIdnaRules(unicode).mapped.map((x) => x[0]);
		break;
	case 'cm':
		cps = [...unicode.cm];
		break;
	case 'block':
		cps = unicode.requireBlock(args.slice(1).join(' ')).chars.map((x) => x.cp);
		break;
	case 'new': {
		const age = unicode.unicodeVersion.version.split('.').slice(0, 2).join('.');
		cps = [...unicode.charMap.values()].filter((x) => x.age === age).map((x) => x.cp);
		break;
	}
	default: {
		const v = args.flatMap((arg) => (/^[0-9a-f]/i.test(arg) ? parseCpRange(arg) : explodeCp(arg)));
		cps = [...new Set(v)].sort((a, b) => a - b);
	}
}

// line formats (for pasting into rule files)
const name = (cp: CodePoint) => unicode.getName(cp);
const FORMATS: Record<string, (cp: CodePoint) => string> = {
	js: (cp) => d.comment(cp), //                              0x61, // (a) LATIN SMALL LETTER A
	jss: (cp) => `${d.comment(cp)} [${d.scripts(cp)}]`, //      0x61, // (a) LATIN SMALL LETTER A [Latn]
	jsstr: (cp) => `'${String.fromCodePoint(cp)}', // ${d.cp(cp)}`, // 'a', // 61 (a) LATIN SMALL LETTER A
	md: (cp) => `* \`${hexCp(cp)} (${d.str([cp])})\` ${name(cp)}`,
	csv: (cp) => `${cp},${hexCp(cp)},"${d.str([cp])}","${name(cp)}"`,
};
const fmt = FORMATS[opts.format];
if (!fmt) throw new Error(`unknown format: ${opts.format} (${Object.keys(FORMATS)})`);
if (opts.format === 'csv') console.log('Dec,Hex,Form,Name');
for (const cp of cps) console.log(fmt(cp));
if (opts.format !== 'csv') console.log(cps.length);
