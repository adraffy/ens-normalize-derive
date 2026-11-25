import type {Rule} from '../../src/select.ts';

// disallowed: combining marks
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 300..36F Combining Diacritical Marks: 97/112 denied
	{block: 'Combining Diacritical Marks', except: [
		0x300, // (◌̀) COMBINING GRAVE ACCENT
		0x301, // (◌́) COMBINING ACUTE ACCENT
		0x302, // (◌̂) COMBINING CIRCUMFLEX ACCENT
		0x303, // (◌̃) COMBINING TILDE
		0x304, // (◌̄) COMBINING MACRON
		0x305, // (◌̅) COMBINING OVERLINE
		0x306, // (◌̆) COMBINING BREVE
		0x307, // (◌̇) COMBINING DOT ABOVE
		0x308, // (◌̈) COMBINING DIAERESIS
		0x309, // (◌̉) COMBINING HOOK ABOVE
		0x30A, // (◌̊) COMBINING RING ABOVE
		0x30B, // (◌̋) COMBINING DOUBLE ACUTE ACCENT
		0x30C, // (◌̌) COMBINING CARON
		0x327, // (◌̧) COMBINING CEDILLA
		0x343, // (◌̓) COMBINING GREEK KORONIS
	]},
	// 1AB0..1AFF Combining Diacritical Marks Extended: 58/58 denied
	{block: 'Combining Diacritical Marks Extended'},
	// 1DC0..1DFF Combining Diacritical Marks Supplement: 64/64 denied
	{block: 'Combining Diacritical Marks Supplement'},
	// 20D0..20FF Combining Diacritical Marks for Symbols: 33/33 denied
	{block: 'Combining Diacritical Marks for Symbols'},
	// FE20..FE2F Combining Half Marks: 16/16 denied
	{block: 'Combining Half Marks'},
] satisfies Rule[];
