import type {Rule} from '../../src/select.ts';

// disallowed: CJK, Kana, Hangul, Bopomofo
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 1100..11FF Hangul Jamo: 2/256 denied
	{block: 'Hangul Jamo', cps: [
		// 20240912: in 16.0.0 a bunch of invisibles were changed to ignored / decision: keep these disabled
		0x115F, // ({115F}) HANGUL CHOSEONG FILLER
		0x1160, // ({1160}) HANGUL JUNGSEONG FILLER
	]},
	// 3000..303F CJK Symbols and Punctuation: 44/62 denied
	{block: 'CJK Symbols and Punctuation', except: [
		0x3000, // ({3000}) IDEOGRAPHIC SPACE
		0x3004, // (〄) JAPANESE INDUSTRIAL STANDARD SYMBOL
		0x3007, // (〇) IDEOGRAPHIC NUMBER ZERO
		0x3013, // (〓) GETA MARK
		0x3020, // (〠) POSTAL MARK FACE
		0x3021, // (〡) HANGZHOU NUMERAL ONE
		0x3022, // (〢) HANGZHOU NUMERAL TWO
		0x3023, // (〣) HANGZHOU NUMERAL THREE
		0x3024, // (〤) HANGZHOU NUMERAL FOUR
		0x3025, // (〥) HANGZHOU NUMERAL FIVE
		0x3026, // (〦) HANGZHOU NUMERAL SIX
		0x3027, // (〧) HANGZHOU NUMERAL SEVEN
		0x3028, // (〨) HANGZHOU NUMERAL EIGHT
		0x3029, // (〩) HANGZHOU NUMERAL NINE
		0x3036, // (〶) CIRCLED POSTAL MARK
		0x3038, // (〸) HANGZHOU NUMERAL TEN
		0x3039, // (〹) HANGZHOU NUMERAL TWENTY
		0x303A, // (〺) HANGZHOU NUMERAL THIRTY
	]},
	// 3040..309F Hiragana: 2/93 denied
	{block: 'Hiragana', cps: [
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x309B, // (゛) KATAKANA-HIRAGANA VOICED SOUND MARK
		0x309C, // (゜) KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK
	]},
	// 30A0..30FF Katakana: 1/96 denied
	{block: 'Katakana', cps: [
		// bad hyphens
		0x30A0, // (゠) KATAKANA-HIRAGANA DOUBLE HYPHEN
	]},
	// 3100..312F Bopomofo: 1/43 denied
	{block: 'Bopomofo', cps: [
		// obsolete
		0x312E, // (ㄮ) BOPOMOFO LETTER O WITH DOT ABOVE
	]},
	// 3130..318F Hangul Compatibility Jamo: 1/94 denied
	{block: 'Hangul Compatibility Jamo', cps: [
		// 20240912: in 16.0.0 a bunch of invisibles were changed to ignored / decision: keep these disabled
		0x3164, // ({3164}) HANGUL FILLER
	]},
	// 3190..319F Kanbun: 2/16 denied
	{block: 'Kanbun', cps: [
		// cjk
		0x3190, // (㆐) IDEOGRAPHIC ANNOTATION LINKING MARK
		0x3191, // (㆑) IDEOGRAPHIC ANNOTATION REVERSE MARK
	]},
	// 31C0..31EF CJK Strokes: 38/38 denied
	{block: 'CJK Strokes'},
	// 4DC0..4DFF Yijing Hexagram Symbols: 64/64 denied
	{block: 'Yijing Hexagram Symbols'},
	// FE30..FE4F CJK Compatibility Forms: 24/31 denied
	{block: 'CJK Compatibility Forms', except: [
		0xFE49, // (﹉) DASHED OVERLINE
		0xFE4A, // (﹊) CENTRELINE OVERLINE
		0xFE4B, // (﹋) WAVY OVERLINE
		0xFE4C, // (﹌) DOUBLE WAVY OVERLINE
		0xFE4D, // (﹍) DASHED LOW LINE
		0xFE4E, // (﹎) CENTRELINE LOW LINE
		0xFE4F, // (﹏) WAVY LOW LINE
	]},
	// 16FE0..16FFF Ideographic Symbols and Punctuation: 3/12 denied
	{block: 'Ideographic Symbols and Punctuation', cps: [
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x16FF0, // (◌𖿰) VIETNAMESE ALTERNATE READING MARK CA
		0x16FF1, // (◌𖿱) VIETNAMESE ALTERNATE READING MARK NHAY
		// obsolete
		0x16FE3, // (𖿣) OLD CHINESE ITERATION MARK
		// 20261125: unused by registrations (punctuation)
		0x16FE2, // (𖿢) OLD CHINESE HOOK MARK
	]},
	// 1B000..1B0FF Kana Supplement: 256/256 denied
	{block: 'Kana Supplement'},
	// 1B100..1B12F Kana Extended-A: 31/35 denied
	{block: 'Kana Extended-A', except: [
		0x1B11F, // (𛄟) HIRAGANA LETTER ARCHAIC WU
		0x1B120, // (𛄠) KATAKANA LETTER ARCHAIC YI
		0x1B121, // (𛄡) KATAKANA LETTER ARCHAIC YE
		0x1B122, // (𛄢) KATAKANA LETTER ARCHAIC WU
	]},
	// 1B130..1B16F Small Kana Extension: 1/10 denied
	{block: 'Small Kana Extension', cps: [
		// 20261126: new in 18.0, reviewed: archaic
		0x1B168, // (𛅨) KATAKANA LETTER SMALL ARCHAIC YE
	]},
	// 1D300..1D35F Tai Xuan Jing Symbols: 87/87 denied
	{block: 'Tai Xuan Jing Symbols'},
] satisfies Rule[];
