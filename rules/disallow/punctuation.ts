import type {Rule} from '../../src/select.ts';

// disallowed: punctuation
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 2000..206F General Punctuation: 60/93 denied
	{block: 'General Punctuation', except: [
		0x2000, // ({2000}) EN QUAD
		0x2001, // ({2001}) EM QUAD
		0x2002, // ({2002}) EN SPACE
		0x2003, // ({2003}) EM SPACE
		0x2004, // ({2004}) THREE-PER-EM SPACE
		0x2005, // ({2005}) FOUR-PER-EM SPACE
		0x2006, // ({2006}) SIX-PER-EM SPACE
		0x2007, // ({2007}) FIGURE SPACE
		0x2008, // ({2008}) PUNCTUATION SPACE
		0x2009, // ({2009}) THIN SPACE
		0x200A, // ({200A}) HAIR SPACE
		0x200B, // ({200B}) ZERO WIDTH SPACE
		0x2010, // (‐) HYPHEN
		0x2011, // (‑) NON-BREAKING HYPHEN
		0x2012, // (‒) FIGURE DASH
		0x2013, // (–) EN DASH
		0x2014, // (—) EM DASH
		0x2015, // (―) HORIZONTAL BAR
		0x2017, // (‗) DOUBLE LOW LINE
		0x2019, // (’) RIGHT SINGLE QUOTATION MARK
		0x2022, // (•) BULLET
		0x202F, // ({202F}) NARROW NO-BREAK SPACE
		0x203E, // (‾) OVERLINE
		0x203F, // (‿) UNDERTIE
		0x2043, // (⁃) HYPHEN BULLET
		0x2044, // (⁄) FRACTION SLASH
		0x2047, // (⁇) DOUBLE QUESTION MARK
		0x2048, // (⁈) QUESTION EXCLAMATION MARK
		0x2054, // (⁔) INVERTED UNDERTIE
		0x2055, // (⁕) FLOWER PUNCTUATION MARK
		0x205F, // ({205F}) MEDIUM MATHEMATICAL SPACE
		0x2060, // ({2060}) WORD JOINER
		0x2064, // ({2064}) INVISIBLE PLUS
	]},
	// 2E00..2E7F Supplemental Punctuation: 91/94 denied
	{block: 'Supplemental Punctuation', except: [
		0x2E19, // (⸙) PALM BRANCH
		0x2E3A, // (⸺) TWO-EM DASH
		0x2E3B, // (⸻) THREE-EM DASH
	]},
	// FE10..FE1F Vertical Forms: 8/8 denied
	{block: 'Vertical Forms'},
] satisfies Rule[];
