import type {CodePoint} from '../../src/utils.ts';
import type {Rule} from '../../src/select.ts';
import {SCRIPT_GROUPS} from '../scripts.ts';

// characters new in the current Unicode version that nobody has reviewed yet
//
// New characters in any script used by an unrestricted group (Latin, Arabic, Han, Common, ...)
// are disallowed until someone allows them. New scripts are handled by rules/scripts.ts instead
// (usually as restricted groups).
// Unreviewed characters can't break registrations: they weren't normalizable before.
//
// review:  `bun run review` lists what's pending and prints lines to paste into REVIEWED
//          `bun run review --html` does the same as a page with glyphs and code charts
// upgrade: bump AGE and empty REVIEWED

export const AGE = '18.0';

// reviewed and allowed (paste from `bun run review`)
export const REVIEWED: CodePoint[] = [
	// Currency Symbols
	0x20C3, // (⃃) UAE DIRHAM SIGN (Arabic only, see rules/scripts.ts)
	// 20261126: scripts that don't mix with Latin (marks get the group's non-spacing mark checks)
	// Devanagari Extended-A
	0x11B0A, // (𑬊) DEVANAGARI LETTER ALTERNATE DDDA
	// Bengali Supplement
	0x11DF0, // (◌𑷰) BENGALI SIGN COMBINING ANUSVARA ABOVE
	0x11DF1, // (𑷱) BENGALI LETTER ALTERNATE BARGIYA BA
	// Hebrew
	0x5C8, // (◌׈) HEBREW POINT SHEVA NA MUDGASH
	0x5C9, // (◌׉) HEBREW POINT DAGESH HAZAQ MUDGASH
	// Oriya
	0xB53, // (◌୓) ORIYA SIGN DOT ABOVE
	0xB54, // (◌୔) ORIYA SIGN DOUBLE DOT ABOVE
	// Arabic Extended-C
	0x10EC9, // (𐻉) ARABIC SMALL BASELINE FATHA
	0x10ECA, // (𐻊) ARABIC SMALL BASELINE DOTLESS HEAD OF KHAH
	0x10ECB, // (◌𐻋) ARABIC NORTHEAST POINTING ARROWHEAD ABOVE
	0x10ECC, // (◌𐻌) ARABIC NORTHEAST POINTING ARROWHEAD BELOW
	0x10ECD, // (◌𐻍) ARABIC SOUTHWEST POINTING ARROWHEAD BELOW
	0x10ECE, // (◌𐻎) ARABIC SMALL CIRCLE ABOVE
	0x10ECF, // (◌𐻏) ARABIC LARGE CIRCLE ABOVE
	0x10ED9, // (𐻙) ARABIC CROWN LETTER BEH
	0x10EDA, // (𐻚) ARABIC CROWN LETTER PEH
	0x10EDB, // (𐻛) ARABIC CROWN LETTER TEH
	0x10EDC, // (𐻜) ARABIC CROWN LETTER THEH
	0x10EDD, // (𐻝) ARABIC CROWN LETTER JEEM
	0x10EDE, // (𐻞) ARABIC CROWN LETTER HAH
	0x10EDF, // (𐻟) ARABIC CROWN LETTER KHAH
	0x10EE0, // (𐻠) ARABIC CROWN LETTER SEEN
	0x10EE1, // (𐻡) ARABIC CROWN LETTER SHEEN
	0x10EE2, // (𐻢) ARABIC CROWN LETTER SAD
	0x10EE3, // (𐻣) ARABIC CROWN LETTER DAD
	0x10EE4, // (𐻤) ARABIC CROWN LETTER TAH
	0x10EE5, // (𐻥) ARABIC CROWN LETTER ZAH
	0x10EE6, // (𐻦) ARABIC CROWN LETTER AIN
	0x10EE7, // (𐻧) ARABIC CROWN LETTER GHAIN
	0x10EE8, // (𐻨) ARABIC CROWN LETTER FEH
	0x10EE9, // (𐻩) ARABIC CROWN LETTER QAF
	0x10EEA, // (𐻪) ARABIC CROWN LETTER KAF
	0x10EEB, // (𐻫) ARABIC CROWN LETTER MEEM
	0x10EEC, // (𐻬) ARABIC CROWN LETTER NOON
	0x10EED, // (𐻭) ARABIC CROWN LETTER HEH
	0x10EEE, // (𐻮) ARABIC CROWN LETTER YEH
	0x10EF0, // (◌𐻰) ARABIC SMALL LOW UPRIGHT RECTANGULAR ZERO
	0x10EF1, // (◌𐻱) ARABIC SQUARE BELOW
	0x10EF2, // (◌𐻲) ARABIC FILLED SQUARE BELOW
	0x10EF3, // (◌𐻳) ARABIC SMALL HIGH NOON WITH FATHA
	0x10EF4, // (◌𐻴) ARABIC SMALL LOW NOON WITH FATHA
	0x10EF5, // (◌𐻵) ARABIC SMALL HIGH NOON WITH DAMMA
	0x10EF6, // (◌𐻶) ARABIC SMALL LOW NOON WITH DAMMA
	0x10EF7, // (◌𐻷) ARABIC SMALL HIGH HEH INITIAL FORM
	0x10EF8, // (◌𐻸) ARABIC SMALL HIGH WORD KABBIR
	0x10EF9, // (◌𐻹) ARABIC MARK CROWN
	// 20261126: one more Extension D ideograph, like the other 222
	// CJK Unified Ideographs Extension D
	0x2B81E, // (𫠞) CJK Ideograph Extension D-2B81E [223/223]
];

const GROUP_SCRIPTS = [...new Set(['Zinh', ...SCRIPT_GROUPS.flatMap((g) => [...g.test, ...(g.rest ?? [])])])].sort();

export default [
	{
		reason: `new in ${AGE}: unreviewed`,
		age: AGE,
		script: GROUP_SCRIPTS,
		except: REVIEWED,
	},
] satisfies Rule[];
