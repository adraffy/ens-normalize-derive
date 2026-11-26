import type {Rule} from '../../src/select.ts';

// disallowed: math and arrows
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 2190..21FF Arrows: 99/104 denied
	{block: 'Arrows', except: [
		0x2190, // (←) LEFTWARDS ARROW
		0x2191, // (↑) UPWARDS ARROW
		0x2192, // (→) RIGHTWARDS ARROW
		0x2193, // (↓) DOWNWARDS ARROW
		0x21AF, // (↯) DOWNWARDS ZIGZAG ARROW
	]},
	// 2200..22FF Mathematical Operators: 242/256 denied
	{block: 'Mathematical Operators', except: [
		0x2202, // (∂) PARTIAL DIFFERENTIAL
		0x220F, // (∏) N-ARY PRODUCT
		0x2211, // (∑) N-ARY SUMMATION
		0x2212, // (−) MINUS SIGN
		0x221A, // (√) SQUARE ROOT
		0x221E, // (∞) INFINITY
		0x222B, // (∫) INTEGRAL
		0x222C, // (∬) DOUBLE INTEGRAL
		0x222D, // (∭) TRIPLE INTEGRAL
		0x222E, // (∮) CONTOUR INTEGRAL
		0x222F, // (∯) SURFACE INTEGRAL
		0x2230, // (∰) VOLUME INTEGRAL
		0x224B, // (≋) TRIPLE TILDE
		0x22C8, // (⋈) BOWTIE
	]},
	// 27C0..27EF Miscellaneous Mathematical Symbols-A: 45/48 denied
	{block: 'Miscellaneous Mathematical Symbols-A', except: [
		0x27C0, // (⟀) THREE DIMENSIONAL ANGLE
		0x27C1, // (⟁) WHITE TRIANGLE CONTAINING SMALL WHITE TRIANGLE
		0x27E0, // (⟠) LOZENGE DIVIDED BY HORIZONTAL RULE
	]},
	// 27F0..27FF Supplemental Arrows-A: 14/16 denied
	{block: 'Supplemental Arrows-A'},
	// 2900..297F Supplemental Arrows-B: 126/126 denied
	{block: 'Supplemental Arrows-B'},
	// 2980..29FF Miscellaneous Mathematical Symbols-B: 127/128 denied
	{block: 'Miscellaneous Mathematical Symbols-B', except: [
		0x29EB, // (⧫) BLACK LOZENGE
	]},
	// 2A00..2AFF Supplemental Mathematical Operators: 255/256 denied
	{block: 'Supplemental Mathematical Operators', except: [
		0x2A0C, // (⨌) QUADRUPLE INTEGRAL OPERATOR
	]},
	// 2B00..2BFF Miscellaneous Symbols and Arrows: 206/247 denied
	{block: 'Miscellaneous Symbols and Arrows', except: [
		0x2B12, // (⬒) SQUARE WITH TOP HALF BLACK
		0x2B13, // (⬓) SQUARE WITH BOTTOM HALF BLACK
		0x2B14, // (⬔) SQUARE WITH UPPER RIGHT DIAGONAL HALF BLACK
		0x2B15, // (⬕) SQUARE WITH LOWER LEFT DIAGONAL HALF BLACK
		0x2B16, // (⬖) DIAMOND WITH LEFT HALF BLACK
		0x2B17, // (⬗) DIAMOND WITH RIGHT HALF BLACK
		0x2B18, // (⬘) DIAMOND WITH TOP HALF BLACK
		0x2B19, // (⬙) DIAMOND WITH BOTTOM HALF BLACK
		0x2B1A, // (⬚) DOTTED SQUARE
		0x2B1F, // (⬟) BLACK PENTAGON
		0x2B20, // (⬠) WHITE PENTAGON
		0x2B21, // (⬡) WHITE HEXAGON
		0x2B22, // (⬢) BLACK HEXAGON
		0x2B23, // (⬣) HORIZONTAL BLACK HEXAGON
		0x2B24, // (⬤) BLACK LARGE CIRCLE
		0x2B25, // (⬥) BLACK MEDIUM DIAMOND
		0x2B26, // (⬦) WHITE MEDIUM DIAMOND
		0x2B29, // (⬩) BLACK SMALL DIAMOND
		0x2B2E, // (⬮) BLACK VERTICAL ELLIPSE
		0x2B31, // (⬱) THREE LEFTWARDS ARROWS
		0x2B45, // (⭅) LEFTWARDS QUADRUPLE ARROW
		0x2B46, // (⭆) RIGHTWARDS QUADRUPLE ARROW
		0x2B4D, // (⭍) DOWNWARDS TRIANGLE-HEADED ZIGZAG ARROW
		0x2B56, // (⭖) HEAVY OVAL WITH OVAL INSIDE
		0x2B57, // (⭗) HEAVY CIRCLE WITH CIRCLE INSIDE
		0x2BC0, // (⯀) BLACK SQUARE CENTRED
		0x2BC1, // (⯁) BLACK DIAMOND CENTRED
		0x2BC3, // (⯃) HORIZONTAL BLACK OCTAGON
		0x2BC4, // (⯄) BLACK OCTAGON
		0x2BC5, // (⯅) BLACK MEDIUM UP-POINTING TRIANGLE CENTRED
		0x2BC6, // (⯆) BLACK MEDIUM DOWN-POINTING TRIANGLE CENTRED
		0x2BC7, // (⯇) BLACK MEDIUM LEFT-POINTING TRIANGLE CENTRED
		0x2BC8, // (⯈) BLACK MEDIUM RIGHT-POINTING TRIANGLE CENTRED
		0x2BC9, // (⯉) NEPTUNE FORM TWO
		0x2BCA, // (⯊) TOP HALF BLACK CIRCLE
		0x2BCB, // (⯋) BOTTOM HALF BLACK CIRCLE
		0x2BCC, // (⯌) LIGHT FOUR POINTED BLACK CUSP
		0x2BCD, // (⯍) ROTATED LIGHT FOUR POINTED BLACK CUSP
		0x2BCE, // (⯎) WHITE FOUR POINTED CUSP
		0x2BD0, // (⯐) SQUARE POSITION INDICATOR
	]},
	// 1DB00..1DBFF Miscellaneous Symbols and Arrows Extended: new in 18.0, all denied
	{block: 'Miscellaneous Symbols and Arrows Extended'},
	// 1F800..1F8FF Supplemental Arrows-C: 136/171 denied
	{block: 'Supplemental Arrows-C'},
] satisfies Rule[];
