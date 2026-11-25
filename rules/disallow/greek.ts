import type {Rule} from '../../src/select.ts';

// disallowed: Greek and Coptic
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 370..3FF Greek and Coptic: 19/135 denied
	{block: 'Greek and Coptic', cps: [
		// greek
		0x371, // (ͱ) GREEK SMALL LETTER HETA
		0x373, // (ͳ) GREEK SMALL LETTER ARCHAIC SAMPI
		0x374, // (ʹ) GREEK NUMERAL SIGN
		0x375, // (͵) GREEK LOWER NUMERAL SIGN
		0x37B, // (ͻ) GREEK SMALL REVERSED LUNATE SIGMA SYMBOL
		0x37C, // (ͼ) GREEK SMALL DOTTED LUNATE SIGMA SYMBOL
		0x37D, // (ͽ) GREEK SMALL REVERSED DOTTED LUNATE SIGMA SYMBOL
		0x3D7, // (ϗ) GREEK KAI SYMBOL
		0x3F6, // (϶) GREEK REVERSED LUNATE EPSILON SYMBOL
		0x3F8, // (ϸ) GREEK SMALL LETTER SHO
		0x3FB, // (ϻ) GREEK SMALL LETTER SAN
		0x3FC, // (ϼ) GREEK RHO WITH STROKE SYMBOL
		0x3D9, // (ϙ) GREEK SMALL LETTER ARCHAIC KOPPA
		0x3DB, // (ϛ) GREEK SMALL LETTER STIGMA
		0x3DD, // (ϝ) GREEK SMALL LETTER DIGAMMA
		0x3E1, // (ϡ) GREEK SMALL LETTER SAMPI
		0x377, // (ͷ) GREEK SMALL LETTER PAMPHYLIAN DIGAMMA
		0x3DF, // (ϟ) GREEK SMALL LETTER KOPPA
		0x3F3, // (ϳ) GREEK LETTER YOT
	]},
	// 1F00..1FFF Greek Extended: 1/233 denied
	{block: 'Greek Extended', cps: [
		// subscript
		0x1FBE, // (ι) GREEK PROSGEGRAMMENI
	]},
	// 2C80..2CFF Coptic: 4/123 denied
	{block: 'Coptic', cps: [
		// scripted stops
		0x2CF9, // (⳹) COPTIC OLD NUBIAN FULL STOP
		0x2CFE, // (⳾) COPTIC FULL STOP
		// exclaim/question mark
		0x2CFA, // (⳺) COPTIC OLD NUBIAN DIRECT QUESTION MARK
		0x2CFB, // (⳻) COPTIC OLD NUBIAN INDIRECT QUESTION MARK
	]},
	// 10140..1018F Ancient Greek Numbers: 79/79 denied
	{block: 'Ancient Greek Numbers'},
	// 1D200..1D24F Ancient Greek Musical Notation: 70/70 denied
	{block: 'Ancient Greek Musical Notation'},
] satisfies Rule[];
