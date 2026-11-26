import type {Rule} from '../../src/select.ts';

// disallowed: numbers and enclosed alphanumerics
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 2460..24FF Enclosed Alphanumerics: 21/140 denied
	{block: 'Enclosed Alphanumerics', cps: [
		// 20230220: moved from chars-mapped.js / note: IDNA maps the non-negated versions: / "2460 ; mapped ; 0031      # 1.1  CIRCLED DIGIT ONE / "2473 ; mapped ; 0032 0030 # 1.1  CIRCLED NUMBER TWENTY / "24B6 ; mapped ; 0061      # 1.1  CIRCLED LATIN CAPITAL LETTER A" / "24CF ; mapped ; 007A      # 1.1  CIRCLED LATIN CAPITAL LETTER Z" / negative circled
		0x24FF, // (⓿) NEGATIVE CIRCLED DIGIT ZERO
		0x24EB, // (⓫) NEGATIVE CIRCLED NUMBER ELEVEN
		0x24EC, // (⓬) NEGATIVE CIRCLED NUMBER TWELVE
		0x24ED, // (⓭) NEGATIVE CIRCLED NUMBER THIRTEEN
		0x24EE, // (⓮) NEGATIVE CIRCLED NUMBER FOURTEEN
		0x24EF, // (⓯) NEGATIVE CIRCLED NUMBER FIFTEEN
		0x24F0, // (⓰) NEGATIVE CIRCLED NUMBER SIXTEEN
		0x24F1, // (⓱) NEGATIVE CIRCLED NUMBER SEVENTEEN
		0x24F2, // (⓲) NEGATIVE CIRCLED NUMBER EIGHTEEN
		0x24F3, // (⓳) NEGATIVE CIRCLED NUMBER NINETEEN
		0x24F4, // (⓴) NEGATIVE CIRCLED NUMBER TWENTY
		// double-circled
		0x24F5, // (⓵) DOUBLE CIRCLED DIGIT ONE
		0x24F6, // (⓶) DOUBLE CIRCLED DIGIT TWO
		0x24F7, // (⓷) DOUBLE CIRCLED DIGIT THREE
		0x24F8, // (⓸) DOUBLE CIRCLED DIGIT FOUR
		0x24F9, // (⓹) DOUBLE CIRCLED DIGIT FIVE
		0x24FA, // (⓺) DOUBLE CIRCLED DIGIT SIX
		0x24FB, // (⓻) DOUBLE CIRCLED DIGIT SEVEN
		0x24FC, // (⓼) DOUBLE CIRCLED DIGIT EIGHT
		0x24FD, // (⓽) DOUBLE CIRCLED DIGIT NINE
		0x24FE, // (⓾) DOUBLE CIRCLED NUMBER TEN
	]},
	// A830..A83F Common Indic Number Forms: 10/10 denied
	{block: 'Common Indic Number Forms'},
	// 10100..1013F Aegean Numbers: 57/57 denied
	{block: 'Aegean Numbers'},
	// 102E0..102FF Coptic Epact Numbers: 28/28 denied
	{block: 'Coptic Epact Numbers'},
	// 1D360..1D37F Counting Rod Numerals: 25/25 denied
	{block: 'Counting Rod Numerals'},
	// 1EC70..1ECBF Indic Siyaq Numbers: 68/68 denied
	{block: 'Indic Siyaq Numbers'},
	// 1ED00..1ED4F Ottoman Siyaq Numbers: 61/61 denied
	{block: 'Ottoman Siyaq Numbers'},
	// 1F100..1F1FF Enclosed Alphanumeric Supplement: 34/159 denied
	{block: 'Enclosed Alphanumeric Supplement', cps: [
		// exclaim/question mark
		0x1F18A, // (🆊) CROSSED NEGATIVE SQUARED LATIN CAPITAL LETTER P
		// circled sans-serif
		0x1F10B, // (🄋) DINGBAT CIRCLED SANS-SERIF DIGIT ZERO
		// negative circled sans-serif
		0x1F10C, // (🄌) DINGBAT NEGATIVE CIRCLED SANS-SERIF DIGIT ZERO
		// negative circled => a-z
		0x1F150, // (🅐) NEGATIVE CIRCLED LATIN CAPITAL LETTER A
		0x1F151, // (🅑) NEGATIVE CIRCLED LATIN CAPITAL LETTER B
		0x1F152, // (🅒) NEGATIVE CIRCLED LATIN CAPITAL LETTER C
		0x1F153, // (🅓) NEGATIVE CIRCLED LATIN CAPITAL LETTER D
		0x1F154, // (🅔) NEGATIVE CIRCLED LATIN CAPITAL LETTER E
		0x1F155, // (🅕) NEGATIVE CIRCLED LATIN CAPITAL LETTER F
		0x1F156, // (🅖) NEGATIVE CIRCLED LATIN CAPITAL LETTER G
		0x1F157, // (🅗) NEGATIVE CIRCLED LATIN CAPITAL LETTER H
		0x1F158, // (🅘) NEGATIVE CIRCLED LATIN CAPITAL LETTER I
		0x1F159, // (🅙) NEGATIVE CIRCLED LATIN CAPITAL LETTER J
		0x1F15A, // (🅚) NEGATIVE CIRCLED LATIN CAPITAL LETTER K
		0x1F15B, // (🅛) NEGATIVE CIRCLED LATIN CAPITAL LETTER L
		0x1F15C, // (🅜) NEGATIVE CIRCLED LATIN CAPITAL LETTER M
		0x1F15D, // (🅝) NEGATIVE CIRCLED LATIN CAPITAL LETTER N
		0x1F15E, // (🅞) NEGATIVE CIRCLED LATIN CAPITAL LETTER O
		0x1F15F, // (🅟) NEGATIVE CIRCLED LATIN CAPITAL LETTER P
		0x1F160, // (🅠) NEGATIVE CIRCLED LATIN CAPITAL LETTER Q
		0x1F161, // (🅡) NEGATIVE CIRCLED LATIN CAPITAL LETTER R
		0x1F162, // (🅢) NEGATIVE CIRCLED LATIN CAPITAL LETTER S
		0x1F163, // (🅣) NEGATIVE CIRCLED LATIN CAPITAL LETTER T
		0x1F164, // (🅤) NEGATIVE CIRCLED LATIN CAPITAL LETTER U
		0x1F165, // (🅥) NEGATIVE CIRCLED LATIN CAPITAL LETTER V
		0x1F166, // (🅦) NEGATIVE CIRCLED LATIN CAPITAL LETTER W
		0x1F167, // (🅧) NEGATIVE CIRCLED LATIN CAPITAL LETTER X
		0x1F168, // (🅨) NEGATIVE CIRCLED LATIN CAPITAL LETTER Y
		0x1F169, // (🅩) NEGATIVE CIRCLED LATIN CAPITAL LETTER Z
		// circles
		0x1F10D, // (🄍) CIRCLED ZERO WITH SLASH
		0x1F10E, // (🄎) CIRCLED ANTICLOCKWISE ARROW
		0x1F10F, // (🄏) CIRCLED DOLLAR SIGN WITH OVERLAID BACKSLASH
		0x1F16E, // (🅮) CIRCLED C WITH OVERLAID BACKSLASH
		// 20261126: new in 18.0, reviewed: shared symbol, would be valid next to Latin
		0x1F1AE, // (🆮) TOMOBIKI SYMBOL
	]},
] satisfies Rule[];
