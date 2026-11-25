import type {Rule} from '../../src/select.ts';

// disallowed: IPA, phonetic, modifier letters, super/subscripts
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 250..2AF IPA Extensions: 96/96 denied
	{block: 'IPA Extensions'},
	// 2B0..2FF Spacing Modifier Letters: 74/80 denied
	{block: 'Spacing Modifier Letters', except: [
		0x2D8, // (˘) BREVE
		0x2D9, // (˙) DOT ABOVE
		0x2DA, // (˚) RING ABOVE
		0x2DB, // (˛) OGONEK
		0x2DC, // (˜) SMALL TILDE
		0x2DD, // (˝) DOUBLE ACUTE ACCENT
	]},
	// 1D00..1D7F Phonetic Extensions: 128/128 denied
	{block: 'Phonetic Extensions'},
	// 1D80..1DBF Phonetic Extensions Supplement: 64/64 denied
	{block: 'Phonetic Extensions Supplement'},
	// 2070..209F Superscripts and Subscripts: 19/42 denied
	{block: 'Superscripts and Subscripts', cps: [
		// subscript
		0x2090, // (ₐ) LATIN SUBSCRIPT SMALL LETTER A
		0x2091, // (ₑ) LATIN SUBSCRIPT SMALL LETTER E
		0x2095, // (ₕ) LATIN SUBSCRIPT SMALL LETTER H
		0x2096, // (ₖ) LATIN SUBSCRIPT SMALL LETTER K
		0x2097, // (ₗ) LATIN SUBSCRIPT SMALL LETTER L
		0x2098, // (ₘ) LATIN SUBSCRIPT SMALL LETTER M
		0x2099, // (ₙ) LATIN SUBSCRIPT SMALL LETTER N
		0x2092, // (ₒ) LATIN SUBSCRIPT SMALL LETTER O
		0x209A, // (ₚ) LATIN SUBSCRIPT SMALL LETTER P
		0x209B, // (ₛ) LATIN SUBSCRIPT SMALL LETTER S
		0x209C, // (ₜ) LATIN SUBSCRIPT SMALL LETTER T
		0x2093, // (ₓ) LATIN SUBSCRIPT SMALL LETTER X
		// subscript digits
		0x2080, // (₀) SUBSCRIPT ZERO
		0x2081, // (₁) SUBSCRIPT ONE
		// superscript
		0x2071, // (ⁱ) SUPERSCRIPT LATIN SMALL LETTER I
		0x207F, // (ⁿ) SUPERSCRIPT LATIN SMALL LETTER N
		// superscript digits
		0x2070, // (⁰) SUPERSCRIPT ZERO
		// bad hyphens
		0x207B, // (⁻) SUPERSCRIPT MINUS
		0x208B, // (₋) SUBSCRIPT MINUS
	]},
	// 31F0..31FF Katakana Phonetic Extensions: 16/16 denied
	{block: 'Katakana Phonetic Extensions'},
	// A700..A71F Modifier Tone Letters: 32/32 denied
	{block: 'Modifier Tone Letters'},
	// FE50..FE6F Small Form Variants: 2/25 denied
	{block: 'Small Form Variants', cps: [
		// exclaim/question mark
		0xFE56, // (﹖) SMALL QUESTION MARK
		0xFE57, // (﹗) SMALL EXCLAMATION MARK
	]},
] satisfies Rule[];
