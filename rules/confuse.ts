import type {ConfuseRules} from '../src/confuse.ts';

// Confusables
//
// Sets come from Unicode's confusables.txt (data/unicode/<v>/confusables.txt), read when deriving:
// the sources of a prototype, plus the prototype itself when it is a single character.
// These rules edit those sets and decide their members. output/confusables.txt lists every set
// that has 2+ valid members and what happened to it.
//
//   primary  stays valid; the other members of its set are confusables of it
//   allow    stays valid, but a label using it must pass the whole-script check
//   split    pulled out of its Unicode set
//   join     merges the sets of two characters (after splits)
//
// notes:
// - arabic digit confusables are deemed valid
// - upper/lower case ASCII confusables are merged (uppercase normalizes to lowercase)
// - 0/1 are split: they link too many sets together (0oO and lL1Ii)
// - 20261125: migrated from a hand-edited copy of confusables.txt (Unicode 15.0, 21k lines) to edits
//   over live data; Unicode 16-18 additions now apply, pairs Unicode 18 dropped are kept as joins
//
// useful links:
// https://util.unicode.org/UnicodeJsps/confusables.jsp
// https://adraffy.github.io/ens-normalize.js/test/confused.html
export default {
	// a set with 2+ undecided members in one group: true = allow them (whole-script checked), false = disallow them
	defaultAllow: true,

	primary: [
		0x2D, // (-) HYPHEN-MINUS
		0x2E, // (.) FULL STOP
		0x32, // (2) DIGIT TWO
		0x33, // (3) DIGIT THREE
		0x34, // (4) DIGIT FOUR
		0x35, // (5) DIGIT FIVE
		0x36, // (6) DIGIT SIX
		0x37, // (7) DIGIT SEVEN
		0x38, // (8) DIGIT EIGHT
		0x39, // (9) DIGIT NINE
		0x5F, // (_) LOW LINE
		0x61, // (a) LATIN SMALL LETTER A
		0x62, // (b) LATIN SMALL LETTER B
		0x63, // (c) LATIN SMALL LETTER C
		0x64, // (d) LATIN SMALL LETTER D
		0x65, // (e) LATIN SMALL LETTER E
		0x66, // (f) LATIN SMALL LETTER F
		0x67, // (g) LATIN SMALL LETTER G
		0x68, // (h) LATIN SMALL LETTER H
		0x69, // (i) LATIN SMALL LETTER I
		0x6A, // (j) LATIN SMALL LETTER J
		0x6B, // (k) LATIN SMALL LETTER K
		0x6C, // (l) LATIN SMALL LETTER L
		0x6D, // (m) LATIN SMALL LETTER M
		0x6E, // (n) LATIN SMALL LETTER N
		0x6F, // (o) LATIN SMALL LETTER O
		0x70, // (p) LATIN SMALL LETTER P
		0x71, // (q) LATIN SMALL LETTER Q
		0x72, // (r) LATIN SMALL LETTER R
		0x73, // (s) LATIN SMALL LETTER S
		0x74, // (t) LATIN SMALL LETTER T
		0x75, // (u) LATIN SMALL LETTER U
		0x76, // (v) LATIN SMALL LETTER V
		0x77, // (w) LATIN SMALL LETTER W
		0x78, // (x) LATIN SMALL LETTER X
		0x79, // (y) LATIN SMALL LETTER Y
		0x7A, // (z) LATIN SMALL LETTER Z
		0xDF, // (ß) LATIN SMALL LETTER SHARP S
		0xE6, // (æ) LATIN SMALL LETTER AE
		0xE7, // (ç) LATIN SMALL LETTER C WITH CEDILLA
		0xF6, // (ö) LATIN SMALL LETTER O WITH DIAERESIS
		0x3C0, // (π) GREEK SMALL LETTER PI
		0x43F, // (п) CYRILLIC SMALL LETTER PE
		0x660, // (٠) ARABIC-INDIC DIGIT ZERO
		0x661, // (١) ARABIC-INDIC DIGIT ONE
		0x664, // (٤) ARABIC-INDIC DIGIT FOUR (20221008: allowed by discussion)
		0x665, // (٥) ARABIC-INDIC DIGIT FIVE (20221008: allowed by discussion)
		0x666, // (٦) ARABIC-INDIC DIGIT SIX (20221008: allowed by discussion)
		0x667, // (٧) ARABIC-INDIC DIGIT SEVEN
		0x669, // (٩) ARABIC-INDIC DIGIT NINE
		0x6F4, // (۴) EXTENDED ARABIC-INDIC DIGIT FOUR
		0x6F5, // (۵) EXTENDED ARABIC-INDIC DIGIT FIVE
		0x6F6, // (۶) EXTENDED ARABIC-INDIC DIGIT SIX
		0x967, // (१) DEVANAGARI DIGIT ONE
		0x968, // (२) DEVANAGARI DIGIT TWO
		0x969, // (३) DEVANAGARI DIGIT THREE
		0x96A, // (४) DEVANAGARI DIGIT FOUR
		0x96E, // (८) DEVANAGARI DIGIT EIGHT
		0xB89, // (உ) TAMIL LETTER U
		0xBE8, // (௨) TAMIL DIGIT TWO
		0xD09, // (ഉ) MALAYALAM LETTER U
		0x2019, // (’) RIGHT SINGLE QUOTATION MARK (fenced)
		0x2022, // (•) BULLET
		0x3007, // (〇) IDEOGRAPHIC NUMBER ZERO
		0x30CB, // (ニ) KATAKANA LETTER NI
		0x30CF, // (ハ) KATAKANA LETTER HA
		0x4E8C, // (二) CJK Ideograph-4E8C [141/20992]
		0x516B, // (八) CJK Ideograph-516B [876/20992]
		// 20261125: Unicode 18 put this into a decided set; primary keeps registered names valid
		0x110B, // (ᄋ) HANGUL CHOSEONG IEUNG (6 registered labels)
	],

	allow: [
		0x3BF, // (ο) GREEK SMALL LETTER OMICRON
		0x3C3, // (σ) GREEK SMALL LETTER SIGMA
		0x431, // (б) CYRILLIC SMALL LETTER BE
		0x456, // (і) CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I
		0x4CF, // (ӏ) CYRILLIC SMALL LETTER PALOCHKA
		0x627, // (ا) ARABIC LETTER ALEF
		0x629, // (ة) ARABIC LETTER TEH MARBUTA (20221110: decided by registrations)
		0x62B, // (ث) ARABIC LETTER THEH
		0x639, // (ع) ARABIC LETTER AIN
		0x641, // (ف) ARABIC LETTER FEH
		0x643, // (ك) ARABIC LETTER KAF
		0x647, // (ه) ARABIC LETTER HEH
		0x67E, // (پ) ARABIC LETTER PEH
		0x6A9, // (ک) ARABIC LETTER KEHEH
		0x1041, // (၁) MYANMAR DIGIT ONE
		0x30FB, // (・) KATAKANA MIDDLE DOT
		0x30FC, // (ー) KATAKANA-HIRAGANA PROLONGED SOUND MARK
		0x4E00, // (一) CJK Ideograph-4E00 [1/20992]
	],

	split: [
		0x30, // (0) DIGIT ZERO (20221203: this links too many confusables together)
		0x31, // (1) DIGIT ONE (20221203: this links too many confusables together)
		// 20261125: Unicode 16-18 additions that would break registered names (count = labels kept valid)
		0x3B7, // (η) GREEK SMALL LETTER ETA (2 registered labels)
		0x3ED, // (ϭ) COPTIC SMALL LETTER SHIMA (7 registered labels)
		0x447, // (ч) CYRILLIC SMALL LETTER CHE (2 registered labels)
		0x575, // (յ) ARMENIAN SMALL LETTER YI (1 registered label)
		0x84F, // (ࡏ) MANDAIC LETTER IN (2 registered labels)
		0x858, // (ࡘ) MANDAIC LETTER AIN (2 registered labels)
		0x91F, // (ट) DEVANAGARI LETTER TTA (1 registered label)
		0xA20, // (ਠ) GURMUKHI LETTER TTHA (1 registered label)
		0xAEB, // (૫) GUJARATI DIGIT FIVE (2 registered labels)
		0xC26, // (ద) TELUGU LETTER DA (1 registered label)
		0xC3F, // (◌ి) TELUGU VOWEL SIGN I (1 registered label)
		0x1004, // (င) MYANMAR LETTER NGA (1 registered label)
		0x1340, // (ፀ) ETHIOPIC SYLLABLE TZA (5 registered labels)
		0x17E0, // (០) KHMER DIGIT ZERO (4 registered labels)
		0x1BC7, // (ᯇ) BATAK LETTER PA (12 registered labels)
		0x2CA7, // (ⲧ) COPTIC SMALL LETTER TAU (5 registered labels)
		0x2CA9, // (ⲩ) COPTIC SMALL LETTER UA (2 registered labels)
		0x2CC7, // (ⳇ) COPTIC SMALL LETTER OLD COPTIC ESH (5 registered labels)
		0x2CCF, // (ⳏ) COPTIC SMALL LETTER OLD COPTIC HA (4 registered labels)
		0x2CD3, // (ⳓ) COPTIC SMALL LETTER OLD COPTIC HEI (5 registered labels)
		0x2CE1, // (ⳡ) COPTIC SMALL LETTER OLD NUBIAN NYI (1 registered label)
		0x3111, // (ㄑ) BOPOMOFO LETTER Q (1 registered label)
		// 0x4E05 (丅) not split: archaic, only used as a faux-Latin T (三丅卄 = ETH), 4 names, none registered in ENSv2
		0x4E2B, // (丫) CJK Ideograph-4E2B [44/20992] (6 registered labels: mostly real Chinese, 3 active)
		0x1091F, // (𐤟) PHOENICIAN WORD SEPARATOR (1 registered label)
		0x10D08, // (𐴈) HANIFI ROHINGYA LETTER KHA (2 registered labels)
		0x10D09, // (𐴉) HANIFI ROHINGYA LETTER FA (1 registered label)
		0x1104B, // (𑁋) BRAHMI PUNCTUATION LINE (12 registered labels)
		0x3110, // (ㄐ) BOPOMOFO LETTER J (1 registered label: pure Bopomofo, confusable with Han in 18.0)
		// 20261125: Unicode 18 merged these old sets into larger ones; restored below (see join)
		0x448, // (ш) CYRILLIC SMALL LETTER SHA
		0x1A45, // (ᩅ) TAI THAM LETTER WA
		0x1A80, // (᪀) TAI THAM HORA DIGIT ZERO
		0x1A90, // (᪐) TAI THAM THAM DIGIT ZERO
		0x2CBD, // (ⲽ) COPTIC SMALL LETTER CRYPTOGRAMMIC NI
	],

	join: [
		[0x16D0, 0x10A61], // (ᛐ) + (𐩡) RUNIC LETTER SHORT-TWIG-TYR T + OLD SOUTH ARABIAN LETTER LAMEDH
		// 20221204: missing
		[0x33, 0xC69], // (3) + (౩) DIGIT THREE + TELUGU DIGIT THREE
		// 20221210: added
		[0x69, 0x16E7], // (i) + (ᛧ) LATIN SMALL LETTER I + RUNIC LETTER SHORT-TWIG-YR
		[0x245, 0x10321], // (Ʌ) + (𐌡) LATIN CAPITAL LETTER TURNED V + OLD ITALIC NUMERAL FIVE
		// 20221115: moved from '19B1'
		[0x254, 0x19B1], // (ɔ) + (ᦱ) LATIN SMALL LETTER OPEN O + NEW TAI LUE VOWEL SIGN AA
		// 20221119: added; 20221202: merge case
		[0x6C, 0x10A7D], // (l) + (𐩽) LATIN SMALL LETTER L + OLD SOUTH ARABIAN NUMBER ONE
		[0x6C, 0x4C], // (l) + (L) LATIN SMALL LETTER L + LATIN CAPITAL LETTER L
		// 2022115: moved from '199E'; 20221202: merge case
		[0x6F, 0x3007], // (o) + (〇) LATIN SMALL LETTER O + IDEOGRAPHIC NUMBER ZERO
		[0x6F, 0x199E], // (o) + (ᦞ) LATIN SMALL LETTER O + NEW TAI LUE LETTER LOW VA
		// 20221202: merge case
		[0x61, 0x41], // (a) + (A) LATIN SMALL LETTER A + LATIN CAPITAL LETTER A
		[0x62, 0x42], // (b) + (B) LATIN SMALL LETTER B + LATIN CAPITAL LETTER B
		[0x63, 0x43], // (c) + (C) LATIN SMALL LETTER C + LATIN CAPITAL LETTER C
		[0x64, 0x44], // (d) + (D) LATIN SMALL LETTER D + LATIN CAPITAL LETTER D
		[0x65, 0x45], // (e) + (E) LATIN SMALL LETTER E + LATIN CAPITAL LETTER E
		[0x66, 0x46], // (f) + (F) LATIN SMALL LETTER F + LATIN CAPITAL LETTER F
		[0x67, 0x47], // (g) + (G) LATIN SMALL LETTER G + LATIN CAPITAL LETTER G
		[0x68, 0x48], // (h) + (H) LATIN SMALL LETTER H + LATIN CAPITAL LETTER H
		[0x6A, 0x4A], // (j) + (J) LATIN SMALL LETTER J + LATIN CAPITAL LETTER J
		[0x6B, 0x4B], // (k) + (K) LATIN SMALL LETTER K + LATIN CAPITAL LETTER K
		[0x6D, 0x4D], // (m) + (M) LATIN SMALL LETTER M + LATIN CAPITAL LETTER M
		[0x6E, 0x4E], // (n) + (N) LATIN SMALL LETTER N + LATIN CAPITAL LETTER N
		[0x70, 0x50], // (p) + (P) LATIN SMALL LETTER P + LATIN CAPITAL LETTER P
		[0x71, 0x51], // (q) + (Q) LATIN SMALL LETTER Q + LATIN CAPITAL LETTER Q
		[0x72, 0x52], // (r) + (R) LATIN SMALL LETTER R + LATIN CAPITAL LETTER R
		[0x73, 0x53], // (s) + (S) LATIN SMALL LETTER S + LATIN CAPITAL LETTER S
		[0x74, 0x54], // (t) + (T) LATIN SMALL LETTER T + LATIN CAPITAL LETTER T
		[0x75, 0x55], // (u) + (U) LATIN SMALL LETTER U + LATIN CAPITAL LETTER U
		[0x76, 0x667], // (v) + (٧) LATIN SMALL LETTER V + ARABIC-INDIC DIGIT SEVEN
		[0x77, 0x57], // (w) + (W) LATIN SMALL LETTER W + LATIN CAPITAL LETTER W
		[0x78, 0x4B3], // (x) + (ҳ) LATIN SMALL LETTER X + CYRILLIC SMALL LETTER HA WITH DESCENDER
		[0x78, 0x58], // (x) + (X) LATIN SMALL LETTER X + LATIN CAPITAL LETTER X
		[0x78, 0x10A69], // (x) + (𐩩) LATIN SMALL LETTER X + OLD SOUTH ARABIAN LETTER TAW
		[0x79, 0x59], // (y) + (Y) LATIN SMALL LETTER Y + LATIN CAPITAL LETTER Y
		[0x7A, 0x5A], // (z) + (Z) LATIN SMALL LETTER Z + LATIN CAPITAL LETTER Z
		[0x7A, 0x104FB], // (z) + (𐓻) LATIN SMALL LETTER Z + OSAGE SMALL LETTER ZHA
		// 20261125: kept, Unicode 18 no longer lists this pair
		[0x63, 0x1051C], // (c) + (𐔜) LATIN SMALL LETTER C + ELBASAN LETTER SHE
		[0xE7, 0x4AB], // (ç) + (ҫ) LATIN SMALL LETTER C WITH CEDILLA + CYRILLIC SMALL LETTER ES WITH DESCENDER
		[0x13BF, 0x21B], // (Ꮏ) + (ț) CHEROKEE LETTER HNA + LATIN SMALL LETTER T WITH COMMA BELOW
		[0x629, 0xF6], // (ة) + (ö) ARABIC LETTER TEH MARBUTA + LATIN SMALL LETTER O WITH DIAERESIS
		[0x6C0, 0x6C2], // (ۀ) + (ۂ) ARABIC LETTER HEH WITH YEH ABOVE + ARABIC LETTER HEH GOAL WITH HAMZA ABOVE
		[0x9CB, 0x114BC], // (◌ো) + (◌𑒼) BENGALI VOWEL SIGN O + TIRHUTA VOWEL SIGN O
		[0x9CC, 0x114BE], // (◌ৌ) + (◌𑒾) BENGALI VOWEL SIGN AU + TIRHUTA VOWEL SIGN AU
		[0xA4ED, 0x1660], // (ꓭ) + (ᙠ) LISU LETTER GHA + CANADIAN SYLLABICS CARRIER TSA
		[0x90CE, 0x90DE], // (郎) + (郞) CJK Ideograph-90CE [17103/20992] + CJK Ideograph-90DE [17119/20992]
		[0x96B7, 0x96B8], // (隷) + (隸) CJK Ideograph-96B7 [18616/20992] + CJK Ideograph-96B8 [18617/20992]
		// 20261125: restore sets Unicode 18 merged into larger ones (split above)
		[0x2CBD, 0x448], // (ⲽ) + (ш) COPTIC SMALL LETTER CRYPTOGRAMMIC NI + CYRILLIC SMALL LETTER SHA
		[0x1A45, 0x1A80], // (ᩅ) + (᪀) TAI THAM LETTER WA + TAI THAM HORA DIGIT ZERO
		[0x1A45, 0x1A90], // (ᩅ) + (᪐) TAI THAM LETTER WA + TAI THAM THAM DIGIT ZERO
	],
} satisfies ConfuseRules;
