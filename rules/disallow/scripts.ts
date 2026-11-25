import type {Rule} from '../../src/select.ts';

// disallowed: other scripts
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 530..58F Armenian: 9/91 denied
	{block: 'Armenian', cps: [
		// scripted stops
		0x589, // (։) ARMENIAN FULL STOP
		// exclaim/question mark
		0x55E, // (՞) ARMENIAN QUESTION MARK
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x55B, // (՛) ARMENIAN EMPHASIS MARK
		0x55C, // (՜) ARMENIAN EXCLAMATION MARK
		0x55F, // (՟) ARMENIAN ABBREVIATION MARK
		// comma
		0x55D, // (՝) ARMENIAN COMMA
		// quotation
		0x559, // (ՙ) ARMENIAN MODIFIER LETTER LEFT HALF RING
		0x55A, // (՚) ARMENIAN APOSTROPHE
		// bad hyphens
		0x58A, // (֊) ARMENIAN HYPHEN
	]},
	// 590..5FF Hebrew: 6/88 denied
	{block: 'Hebrew', cps: [
		// hebrew
		0x5C3, // (׃) HEBREW PUNCTUATION SOF PASUQ
		0x5C6, // (׆) HEBREW PUNCTUATION NUN HAFUKHA
		0x5C0, // (׀) HEBREW PUNCTUATION PASEQ
		0x5F4, // (״) HEBREW PUNCTUATION GERSHAYIM
		// obsolete
		0x5A2, // (◌֢) HEBREW ACCENT ATNAH HAFUKH
		0x5C5, // (◌ׅ) HEBREW MARK LOWER DOT
	]},
	// 600..6FF Arabic: 58/248 denied
	{block: 'Arabic', cps: [
		// scripted stops
		0x61D, // (؝) ARABIC END OF TEXT MARK
		0x61E, // (؞) ARABIC TRIPLE DOT PUNCTUATION MARK
		0x6D4, // (۔) ARABIC FULL STOP
		// exclaim/question mark
		0x61F, // (؟) ARABIC QUESTION MARK
		// superscript
		0x671, // (ٱ) ARABIC LETTER ALEF WASLA
		0x672, // (ٲ) ARABIC LETTER ALEF WITH WAVY HAMZA ABOVE
		0x673, // (ٳ) ARABIC LETTER ALEF WITH WAVY HAMZA BELOW
		0x674, // (ٴ) ARABIC LETTER HIGH HAMZA
		0x675, // (ٵ) ARABIC LETTER HIGH HAMZA ALEF
		0x676, // (ٶ) ARABIC LETTER HIGH HAMZA WAW
		0x677, // (ٷ) ARABIC LETTER U WITH HAMZA ABOVE
		0x678, // (ٸ) ARABIC LETTER HIGH HAMZA YEH
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x615, // (◌ؕ) ARABIC SMALL HIGH TAH
		0x616, // (◌ؖ) ARABIC SMALL HIGH LIGATURE ALEF WITH LAM WITH YEH
		0x617, // (◌ؗ) ARABIC SMALL HIGH ZAIN
		0x618, // (◌ؘ) ARABIC SMALL FATHA
		0x619, // (◌ؙ) ARABIC SMALL DAMMA
		0x61A, // (◌ؚ) ARABIC SMALL KASRA
		0x656, // (◌ٖ) ARABIC SUBSCRIPT ALEF
		0x657, // (◌ٗ) ARABIC INVERTED DAMMA
		0x658, // (◌٘) ARABIC MARK NOON GHUNNA
		0x659, // (◌ٙ) ARABIC ZWARAKAY
		0x65A, // (◌ٚ) ARABIC VOWEL SIGN SMALL V ABOVE
		0x65B, // (◌ٛ) ARABIC VOWEL SIGN INVERTED SMALL V ABOVE
		0x65C, // (◌ٜ) ARABIC VOWEL SIGN DOT BELOW
		0x65D, // (◌ٝ) ARABIC REVERSED DAMMA
		0x65E, // (◌ٞ) ARABIC FATHA WITH TWO DOTS
		0x65F, // (◌ٟ) ARABIC WAVY HAMZA BELOW
		0x670, // (◌ٰ) ARABIC LETTER SUPERSCRIPT ALEF
		0x6D6, // (◌ۖ) ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA
		0x6D7, // (◌ۗ) ARABIC SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA
		0x6D8, // (◌ۘ) ARABIC SMALL HIGH MEEM INITIAL FORM
		0x6D9, // (◌ۙ) ARABIC SMALL HIGH LAM ALEF
		0x6DA, // (◌ۚ) ARABIC SMALL HIGH JEEM
		0x6DB, // (◌ۛ) ARABIC SMALL HIGH THREE DOTS
		0x6DC, // (◌ۜ) ARABIC SMALL HIGH SEEN
		0x6DF, // (◌۟) ARABIC SMALL HIGH ROUNDED ZERO
		0x6E0, // (◌۠) ARABIC SMALL HIGH UPRIGHT RECTANGULAR ZERO
		0x6E1, // (◌ۡ) ARABIC SMALL HIGH DOTLESS HEAD OF KHAH
		0x6E2, // (◌ۢ) ARABIC SMALL HIGH MEEM ISOLATED FORM
		0x6E4, // (◌ۤ) ARABIC SMALL HIGH MADDA
		0x6E7, // (◌ۧ) ARABIC SMALL HIGH YEH
		0x6E8, // (◌ۨ) ARABIC SMALL HIGH NOON
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x609, // (؉) ARABIC-INDIC PER MILLE SIGN
		0x60A, // (؊) ARABIC-INDIC PER TEN THOUSAND SIGN
		0x60D, // (؍) ARABIC DATE SEPARATOR
		0x66A, // (٪) ARABIC PERCENT SIGN
		0x66B, // (٫) ARABIC DECIMAL SEPARATOR
		0x66C, // (٬) ARABIC THOUSANDS SEPARATOR
		0x66D, // (٭) ARABIC FIVE POINTED STAR
		// ampersand
		0x6FD, // (۽) ARABIC SIGN SINDHI AMPERSAND
		// comma
		0x60C, // (،) ARABIC COMMA
		// colon
		0x61B, // (؛) ARABIC SEMICOLON
		// bad hyphens
		0x640, // (ـ) ARABIC TATWEEL
		// obsolete
		0x66E, // (ٮ) ARABIC LETTER DOTLESS BEH
		0x66F, // (ٯ) ARABIC LETTER DOTLESS QAF
		0x68E, // (ڎ) ARABIC LETTER DUL
		0x6A1, // (ڡ) ARABIC LETTER DOTLESS FEH
	]},
	// 700..74F Syriac: 12/76 denied
	{block: 'Syriac', cps: [
		// scripted stops
		0x700, // (܀) SYRIAC END OF PARAGRAPH
		0x701, // (܁) SYRIAC SUPRALINEAR FULL STOP
		0x702, // (܂) SYRIAC SUBLINEAR FULL STOP
		0x740, // (◌݀) SYRIAC FEMININE DOT
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x711, // (◌ܑ) SYRIAC LETTER SUPERSCRIPT ALAPH
		// colon
		0x703, // (܃) SYRIAC SUPRALINEAR COLON
		0x704, // (܄) SYRIAC SUBLINEAR COLON
		0x705, // (܅) SYRIAC HORIZONTAL COLON
		0x706, // (܆) SYRIAC COLON SKEWED LEFT
		0x707, // (܇) SYRIAC COLON SKEWED RIGHT
		0x708, // (܈) SYRIAC SUPRALINEAR COLON SKEWED LEFT
		0x709, // (܉) SYRIAC SUBLINEAR COLON SKEWED RIGHT
	]},
	// 7C0..7FF NKo: 8/62 denied
	{block: 'NKo', cps: [
		// exclaim/question mark
		0x7F9, // (߹) NKO EXCLAMATION MARK
		// comma
		0x7F8, // (߸) NKO COMMA
		// quotation
		0x7F4, // (ߴ) NKO HIGH TONE APOSTROPHE
		0x7F5, // (ߵ) NKO LOW TONE APOSTROPHE
		// obsolete
		0x7E8, // (ߨ) NKO LETTER JONA JA
		0x7E9, // (ߩ) NKO LETTER JONA CHA
		0x7EA, // (ߪ) NKO LETTER JONA RA
		0x7FA, // (ߺ) NKO LAJANYALAN
	]},
	// 800..83F Samaritan: 4/61 denied
	{block: 'Samaritan', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x837, // (࠷) SAMARITAN PUNCTUATION MELODIC QITSA
		0x839, // (࠹) SAMARITAN PUNCTUATION QITSA
		0x83D, // (࠽) SAMARITAN PUNCTUATION SOF MASHFAAT
		0x83E, // (࠾) SAMARITAN PUNCTUATION ANNAAU
	]},
	// 870..89F Arabic Extended-B: 2/41 denied
	{block: 'Arabic Extended-B', cps: [
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x898, // (◌࢘) ARABIC SMALL HIGH WORD AL-JUZ
		0x89D, // (◌࢝) ARABIC SUPERSCRIPT ALEF MOKHASSAS
	]},
	// 8A0..8FF Arabic Extended-A: 31/95 denied
	{block: 'Arabic Extended-A', cps: [
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x8CA, // (◌࣊) ARABIC SMALL HIGH FARSI YEH
		0x8CB, // (◌࣋) ARABIC SMALL HIGH YEH BARREE WITH TWO DOTS BELOW
		0x8CC, // (◌࣌) ARABIC SMALL HIGH WORD SAH
		0x8CD, // (◌࣍) ARABIC SMALL HIGH ZAH
		0x8CE, // (◌࣎) ARABIC LARGE ROUND DOT ABOVE
		0x8CF, // (◌࣏) ARABIC LARGE ROUND DOT BELOW
		0x8D0, // (◌࣐) ARABIC SUKUN BELOW
		0x8D1, // (◌࣑) ARABIC LARGE CIRCLE BELOW
		0x8D2, // (◌࣒) ARABIC LARGE ROUND DOT INSIDE CIRCLE BELOW
		0x8D3, // (◌࣓) ARABIC SMALL LOW WAW
		0x8D4, // (◌ࣔ) ARABIC SMALL HIGH WORD AR-RUB
		0x8D5, // (◌ࣕ) ARABIC SMALL HIGH SAD
		0x8D6, // (◌ࣖ) ARABIC SMALL HIGH AIN
		0x8D7, // (◌ࣗ) ARABIC SMALL HIGH QAF
		0x8D8, // (◌ࣘ) ARABIC SMALL HIGH NOON WITH KASRA
		0x8D9, // (◌ࣙ) ARABIC SMALL LOW NOON WITH KASRA
		0x8DA, // (◌ࣚ) ARABIC SMALL HIGH WORD ATH-THALATHA
		0x8DB, // (◌ࣛ) ARABIC SMALL HIGH WORD AS-SAJDA
		0x8DC, // (◌ࣜ) ARABIC SMALL HIGH WORD AN-NISF
		0x8DD, // (◌ࣝ) ARABIC SMALL HIGH WORD SAKTA
		0x8DE, // (◌ࣞ) ARABIC SMALL HIGH WORD QIF
		0x8DF, // (◌ࣟ) ARABIC SMALL HIGH WORD WAQFA
		0x8E0, // (◌࣠) ARABIC SMALL HIGH FOOTNOTE MARKER
		0x8E1, // (◌࣡) ARABIC SMALL HIGH SIGN SAFHA
		0x8F3, // (◌ࣳ) ARABIC SMALL HIGH WAW
		0x8E3, // (◌ࣣ) ARABIC TURNED DAMMA BELOW
		// obsolete
		0x8AD, // (ࢭ) ARABIC LETTER LOW ALEF
		0x8AE, // (ࢮ) ARABIC LETTER DAL WITH THREE DOTS BELOW
		0x8AF, // (ࢯ) ARABIC LETTER SAD WITH THREE DOTS BELOW
		0x8B0, // (ࢰ) ARABIC LETTER GAF WITH INVERTED STROKE
		0x8B1, // (ࢱ) ARABIC LETTER STRAIGHT WAW
	]},
	// 900..97F Devanagari: 10/128 denied
	{block: 'Devanagari', cps: [
		// scripted stops
		0x964, // (।) DEVANAGARI DANDA
		// glottal
		0x97D, // (ॽ) DEVANAGARI LETTER GLOTTAL STOP
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0x953, // (◌॓) DEVANAGARI GRAVE ACCENT
		0x954, // (◌॔) DEVANAGARI ACUTE ACCENT
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x965, // (॥) DEVANAGARI DOUBLE DANDA
		// bad hyphens
		0x971, // (ॱ) DEVANAGARI SIGN HIGH SPACING DOT
		// obsolete
		0x94E, // (◌ॎ) DEVANAGARI VOWEL SIGN PRISHTHAMATRA E
		0x951, // (◌॑) DEVANAGARI STRESS SIGN UDATTA
		0x952, // (◌॒) DEVANAGARI STRESS SIGN ANUDATTA
		0x978, // (ॸ) DEVANAGARI LETTER MARWARI DDA
	]},
	// 980..9FF Bengali: 2/96 denied
	{block: 'Bengali', cps: [
		// obsolete
		0x980, // (ঀ) BENGALI ANJI
		0x9FC, // (ৼ) BENGALI LETTER VEDIC ANUSVARA
	]},
	// B80..BFF Tamil: 1/72 denied
	{block: 'Tamil', cps: [
		// 20221112: https://scriptsource.org/cms/scripts/page.php?item_id=character_detail&key=U000953
		0xB82, // (◌ஂ) TAMIL SIGN ANUSVARA
	]},
	// C00..C7F Telugu: 4/101 denied
	{block: 'Telugu', cps: [
		// obsolete
		0xC00, // (◌ఀ) TELUGU SIGN COMBINING CANDRABINDU ABOVE
		0xC34, // (ఴ) TELUGU LETTER LLLA
		0xC58, // (ౘ) TELUGU LETTER TSA
		0xC59, // (ౙ) TELUGU LETTER DZA
	]},
	// C80..CFF Kannada: 2/92 denied
	{block: 'Kannada', cps: [
		// obsolete
		0xC81, // (◌ಁ) KANNADA SIGN CANDRABINDU
		0xCDE, // (ೞ) KANNADA LETTER FA
	]},
	// D00..D7F Malayalam: 5/118 denied
	{block: 'Malayalam', cps: [
		// obsolete
		0xD01, // (◌ഁ) MALAYALAM SIGN CANDRABINDU
		0xD04, // (ഄ) MALAYALAM LETTER VEDIC ANUSVARA
		0xD3B, // (◌഻) MALAYALAM SIGN VERTICAL BAR VIRAMA
		0xD3C, // (◌഼) MALAYALAM SIGN CIRCULAR VIRAMA
		0xD5F, // (ൟ) MALAYALAM LETTER ARCHAIC II
	]},
	// F00..FFF Tibetan: 7/211 denied
	{block: 'Tibetan', cps: [
		// comma
		0xF14, // (༔) TIBETAN MARK GTER TSHEG
		// 20221112: i dont know what to do about these / https://en.wikipedia.org/wiki/Swastika
		0xFD5, // (࿕) RIGHT-FACING SVASTI SIGN
		0xFD6, // (࿖) LEFT-FACING SVASTI SIGN
		0xFD7, // (࿗) RIGHT-FACING SVASTI SIGN WITH DOTS
		0xFD8, // (࿘) LEFT-FACING SVASTI SIGN WITH DOTS
		// depreciated
		0xF77, // (◌ཷ) TIBETAN VOWEL SIGN VOCALIC RR
		0xF79, // (◌ཹ) TIBETAN VOWEL SIGN VOCALIC LL
	]},
	// 1000..109F Myanmar: 2/160 denied
	{block: 'Myanmar', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x104A, // (၊) MYANMAR SIGN LITTLE SECTION
		0x104B, // (။) MYANMAR SIGN SECTION
	]},
	// 10A0..10FF Georgian: 8/88 denied
	{block: 'Georgian', cps: [
		// all modifier letters
		0x10FC, // (ჼ) MODIFIER LETTER GEORGIAN NAR
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x10FB, // (჻) GEORGIAN PARAGRAPH SEPARATOR
		// georgian (obsolete)
		0x10F1, // (ჱ) GEORGIAN LETTER HE
		0x10F2, // (ჲ) GEORGIAN LETTER HIE
		0x10F3, // (ჳ) GEORGIAN LETTER WE
		0x10F4, // (ჴ) GEORGIAN LETTER HAR
		0x10F5, // (ჵ) GEORGIAN LETTER HOE
		0x10F6, // (ჶ) GEORGIAN LETTER FI
	]},
	// 1200..137F Ethiopic: 8/358 denied
	{block: 'Ethiopic', cps: [
		// scripted stops
		0x1362, // (።) ETHIOPIC FULL STOP
		// tones
		0x1363, // (፣) ETHIOPIC COMMA
		0x1364, // (፤) ETHIOPIC SEMICOLON
		0x1365, // (፥) ETHIOPIC COLON
		0x1366, // (፦) ETHIOPIC PREFACE COLON
		0x1367, // (፧) ETHIOPIC QUESTION MARK
		0x1361, // (፡) ETHIOPIC WORDSPACE
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1368, // (፨) ETHIOPIC PARAGRAPH SEPARATOR
	]},
	// 1380..139F Ethiopic Supplement: 10/26 denied
	{block: 'Ethiopic Supplement', cps: [
		// 20240423: why weren't these disabled? / `node tools/reg-count.js 1390..1399` shows 1 illegal reg / TODO: disable for 16 / 20240926: forgot / 20250806: applied
		0x1390, // (᎐) ETHIOPIC TONAL MARK YIZET
		0x1391, // (᎑) ETHIOPIC TONAL MARK DERET
		0x1392, // (᎒) ETHIOPIC TONAL MARK RIKRIK
		0x1393, // (᎓) ETHIOPIC TONAL MARK SHORT RIKRIK
		0x1394, // (᎔) ETHIOPIC TONAL MARK DIFAT
		0x1395, // (᎕) ETHIOPIC TONAL MARK KENAT
		0x1396, // (᎖) ETHIOPIC TONAL MARK CHIRET
		0x1397, // (᎗) ETHIOPIC TONAL MARK HIDET
		0x1398, // (᎘) ETHIOPIC TONAL MARK DERET-HIDET
		0x1399, // (᎙) ETHIOPIC TONAL MARK KURT
	]},
	// 1400..167F Unified Canadian Aboriginal Syllabics: 4/640 denied
	{block: 'Unified Canadian Aboriginal Syllabics', cps: [
		// scripted stops
		0x166E, // (᙮) CANADIAN SYLLABICS FULL STOP
		// middle dot
		0x1427, // (ᐧ) CANADIAN SYLLABICS FINAL MIDDLE DOT
		// bad hyphens
		0x1400, // (᐀) CANADIAN SYLLABICS HYPHEN
		// valid chars with multiple cm / these are now free with cm.js logic / no mac / https://discuss.ens.domains/t/ens-name-normalization-2/14564/3 / canadian syllabics / TODO: more needs done with this script
		0x141E, // (ᐞ) CANADIAN SYLLABICS GLOTTAL STOP
	]},
	// 16A0..16FF Runic: 3/89 denied
	{block: 'Runic', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x16ED, // (᛭) RUNIC CROSS PUNCTUATION
		0x16EB, // (᛫) RUNIC SINGLE PUNCTUATION
		// colon
		0x16EC, // (᛬) RUNIC MULTIPLE PUNCTUATION
	]},
	// 1720..173F Hanunoo: 2/23 denied
	{block: 'Hanunoo', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1735, // (᜵) PHILIPPINE SINGLE PUNCTUATION
		0x1736, // (᜶) PHILIPPINE DOUBLE PUNCTUATION
	]},
	// 1780..17FF Khmer: 9/114 denied
	{block: 'Khmer', cps: [
		// depreciated
		0x17A3, // (ឣ) KHMER INDEPENDENT VOWEL QAQ
		0x17A4, // (ឤ) KHMER INDEPENDENT VOWEL QAA
		// obsolete
		0x17A8, // (ឨ) KHMER INDEPENDENT VOWEL QUK
		0x17D1, // (◌៑) KHMER SIGN VIRIAM
		0x17D3, // (◌៓) KHMER SIGN BATHAMASAT
		0x17D8, // (៘) KHMER SIGN BEYYAL
		0x17DD, // (◌៝) KHMER SIGN ATTHACAN
		// 20240912: in 16.0.0 a bunch of invisibles were changed to ignored / decision: keep these disabled
		0x17B4, // ({17B4}) KHMER VOWEL INHERENT AQ
		0x17B5, // ({17B5}) KHMER VOWEL INHERENT AA
	]},
	// 1800..18AF Mongolian: 12/158 denied
	{block: 'Mongolian', cps: [
		// scripted stops
		0x1803, // (᠃) MONGOLIAN FULL STOP
		0x1809, // (᠉) MONGOLIAN MANCHU FULL STOP
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1805, // (᠅) MONGOLIAN FOUR DOTS
		0x1800, // (᠀) MONGOLIAN BIRGA
		0x1807, // (᠇) MONGOLIAN SIBE SYLLABLE BOUNDARY MARKER
		0x180A, // (᠊) MONGOLIAN NIRUGU
		// comma
		0x1802, // (᠂) MONGOLIAN COMMA
		0x1808, // (᠈) MONGOLIAN MANCHU COMMA
		// colon
		0x1804, // (᠄) MONGOLIAN COLON
		// bad hyphens
		0x1806, // (᠆) MONGOLIAN TODO SOFT HYPHEN
		// 20230916: these became legal in unicode 15.1 idna changes / however this decision was insane as no registrar is gonna allow these (and "=" will never valid) / note: these were already disabled by norm
		0x1801, // (᠁) MONGOLIAN ELLIPSIS
		// 20240912: in 16.0.0 a bunch of invisibles were changed to ignored / decision: keep these disabled
		0x180E, // ({180E}) MONGOLIAN VOWEL SEPARATOR
	]},
	// 1900..194F Limbu: 2/68 denied
	{block: 'Limbu', cps: [
		// exclaim/question mark
		0x1945, // (᥅) LIMBU QUESTION MARK
		0x1944, // (᥄) LIMBU EXCLAMATION MARK
	]},
	// 1A20..1AAF Tai Tham: 4/127 denied
	{block: 'Tai Tham', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1AA8, // (᪨) TAI THAM SIGN KAAN
		0x1AA9, // (᪩) TAI THAM SIGN KAANKUU
		0x1AAA, // (᪪) TAI THAM SIGN SATKAAN
		0x1AAB, // (᪫) TAI THAM SIGN SATKAANKUU
	]},
	// 1B00..1B7F Balinese: 37/127 denied
	{block: 'Balinese', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1B5A, // (᭚) BALINESE PANTI
		0x1B5B, // (᭛) BALINESE PAMADA
		0x1B5E, // (᭞) BALINESE CARIK SIKI
		0x1B5F, // (᭟) BALINESE CARIK PAREREN
		0x1B7D, // (᭽) BALINESE PANTI LANTANG
		0x1B7E, // (᭾) BALINESE PAMADA LANTANG
		0x1B7F, // (᭿) BALINESE PANTI BAWAK
		0x1B4E, // (᭎) BALINESE INVERTED CARIK SIKI
		0x1B4F, // (᭏) BALINESE INVERTED CARIK PAREREN
		// balinese musical
		0x1B61, // (᭡) BALINESE MUSICAL SYMBOL DONG
		0x1B62, // (᭢) BALINESE MUSICAL SYMBOL DENG
		0x1B63, // (᭣) BALINESE MUSICAL SYMBOL DUNG
		0x1B64, // (᭤) BALINESE MUSICAL SYMBOL DANG
		0x1B65, // (᭥) BALINESE MUSICAL SYMBOL DANG SURANG
		0x1B66, // (᭦) BALINESE MUSICAL SYMBOL DING
		0x1B67, // (᭧) BALINESE MUSICAL SYMBOL DAENG
		0x1B68, // (᭨) BALINESE MUSICAL SYMBOL DEUNG
		0x1B69, // (᭩) BALINESE MUSICAL SYMBOL DAING
		0x1B6A, // (᭪) BALINESE MUSICAL SYMBOL DANG GEDE
		0x1B6B, // (◌᭫) BALINESE MUSICAL SYMBOL COMBINING TEGEH
		0x1B6C, // (◌᭬) BALINESE MUSICAL SYMBOL COMBINING ENDEP
		0x1B6D, // (◌᭭) BALINESE MUSICAL SYMBOL COMBINING KEMPUL
		0x1B6E, // (◌᭮) BALINESE MUSICAL SYMBOL COMBINING KEMPLI
		0x1B6F, // (◌᭯) BALINESE MUSICAL SYMBOL COMBINING JEGOGAN
		0x1B70, // (◌᭰) BALINESE MUSICAL SYMBOL COMBINING KEMPUL WITH JEGOGAN
		0x1B71, // (◌᭱) BALINESE MUSICAL SYMBOL COMBINING KEMPLI WITH JEGOGAN
		0x1B72, // (◌᭲) BALINESE MUSICAL SYMBOL COMBINING BENDE
		0x1B73, // (◌᭳) BALINESE MUSICAL SYMBOL COMBINING GONG
		0x1B74, // (᭴) BALINESE MUSICAL SYMBOL RIGHT-HAND OPEN DUG
		0x1B75, // (᭵) BALINESE MUSICAL SYMBOL RIGHT-HAND OPEN DAG
		0x1B76, // (᭶) BALINESE MUSICAL SYMBOL RIGHT-HAND CLOSED TUK
		0x1B77, // (᭷) BALINESE MUSICAL SYMBOL RIGHT-HAND CLOSED TAK
		0x1B78, // (᭸) BALINESE MUSICAL SYMBOL LEFT-HAND OPEN PANG
		0x1B79, // (᭹) BALINESE MUSICAL SYMBOL LEFT-HAND OPEN PUNG
		0x1B7A, // (᭺) BALINESE MUSICAL SYMBOL LEFT-HAND CLOSED PLAK
		0x1B7B, // (᭻) BALINESE MUSICAL SYMBOL LEFT-HAND CLOSED PLUK
		0x1B7C, // (᭼) BALINESE MUSICAL SYMBOL LEFT-HAND OPEN PING
	]},
	// 1C00..1C4F Lepcha: 2/74 denied
	{block: 'Lepcha', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1C3B, // (᰻) LEPCHA PUNCTUATION TA-ROL
		0x1C3C, // (᰼) LEPCHA PUNCTUATION NYET THYOOM TA-ROL
	]},
	// 1C50..1C7F Ol Chiki: 2/48 denied
	{block: 'Ol Chiki', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1C7E, // (᱾) OL CHIKI PUNCTUATION MUCAAD
		0x1C7F, // (᱿) OL CHIKI PUNCTUATION DOUBLE MUCAAD
	]},
	// 2D00..2D2F Georgian Supplement: 38/40 denied
	{block: 'Georgian Supplement', except: [
		0x2D27, // (ⴧ) GEORGIAN SMALL LETTER YN
		0x2D2D, // (ⴭ) GEORGIAN SMALL LETTER AEN
	]},
	// A4D0..A4FF Lisu: 8/48 denied
	{block: 'Lisu', cps: [
		// scripted stops
		0xA4FF, // (꓿) LISU PUNCTUATION FULL STOP
		0xA4F8, // (ꓸ) LISU LETTER TONE MYA TI
		0xA4F9, // (ꓹ) LISU LETTER TONE NA PO
		0xA4FA, // (ꓺ) LISU LETTER TONE MYA CYA
		0xA4FB, // (ꓻ) LISU LETTER TONE MYA BO
		0xA4FC, // (ꓼ) LISU LETTER TONE MYA NA
		0xA4FD, // (ꓽ) LISU LETTER TONE MYA JEU
		// comma
		0xA4FE, // (꓾) LISU PUNCTUATION COMMA
	]},
	// A500..A63F Vai: 8/300 denied
	{block: 'Vai', cps: [
		// scripted stops
		0xA60E, // (꘎) VAI FULL STOP
		// exclaim/question mark
		0xA60F, // (꘏) VAI QUESTION MARK
		// comma
		0xA60D, // (꘍) VAI COMMA
		// obsolete
		0xA610, // (ꘐ) VAI SYLLABLE NDOLE FA
		0xA611, // (ꘑ) VAI SYLLABLE NDOLE KA
		0xA612, // (ꘒ) VAI SYLLABLE NDOLE SOO
		0xA62A, // (ꘪ) VAI SYLLABLE NDOLE MA
		0xA62B, // (ꘫ) VAI SYLLABLE NDOLE DO
	]},
	// A6A0..A6FF Bamum: 3/88 denied
	{block: 'Bamum', cps: [
		// scripted stops
		0xA6F3, // (꛳) BAMUM FULL STOP
		// exclaim/question mark
		0xA6F7, // (꛷) BAMUM QUESTION MARK
		// colon
		0xA6F6, // (꛶) BAMUM SEMICOLON
	]},
	// A840..A87F Phags-pa: 2/56 denied
	{block: 'Phags-pa', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xA876, // (꡶) PHAGS-PA MARK SHAD
		0xA877, // (꡷) PHAGS-PA MARK DOUBLE SHAD
	]},
	// A880..A8DF Saurashtra: 2/82 denied
	{block: 'Saurashtra', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xA8CE, // (꣎) SAURASHTRA DANDA
		0xA8CF, // (꣏) SAURASHTRA DOUBLE DANDA
	]},
	// A8E0..A8FF Devanagari Extended: 32/32 denied
	{block: 'Devanagari Extended'},
	// A900..A92F Kayah Li: 2/48 denied
	{block: 'Kayah Li', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xA92E, // (꤮) KAYAH LI SIGN CWI
		0xA92F, // (꤯) KAYAH LI SIGN SHYA
	]},
	// A980..A9DF Javanese: 2/91 denied
	{block: 'Javanese', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xA9C8, // (꧈) JAVANESE PADA LINGSA
		0xA9C9, // (꧉) JAVANESE PADA LUNGSI
	]},
	// A9E0..A9FF Myanmar Extended-B: 7/31 denied
	{block: 'Myanmar Extended-B', cps: [
		// georgian (obsolete)
		0xA9E0, // (ꧠ) MYANMAR LETTER SHAN GHA
		0xA9E1, // (ꧡ) MYANMAR LETTER SHAN CHA
		0xA9E2, // (ꧢ) MYANMAR LETTER SHAN JHA
		0xA9E3, // (ꧣ) MYANMAR LETTER SHAN NNA
		0xA9E4, // (ꧤ) MYANMAR LETTER SHAN BHA
		0xA9E5, // (◌ꧥ) MYANMAR SIGN SHAN SAW
		0xA9E6, // (ꧦ) MYANMAR MODIFIER LETTER SHAN REDUPLICATION
	]},
	// AA00..AA5F Cham: 3/83 denied
	{block: 'Cham', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xAA5D, // (꩝) CHAM PUNCTUATION DANDA
		0xAA5E, // (꩞) CHAM PUNCTUATION DOUBLE DANDA
		0xAA5F, // (꩟) CHAM PUNCTUATION TRIPLE DANDA
	]},
	// AAE0..AAFF Meetei Mayek Extensions: 2/23 denied
	{block: 'Meetei Mayek Extensions', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xAAF0, // (꫰) MEETEI MAYEK CHEIKHAN
		0xAAF1, // (꫱) MEETEI MAYEK AHANG KHUDAM
	]},
	// ABC0..ABFF Meetei Mayek: 1/56 denied
	{block: 'Meetei Mayek', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0xABEB, // (꯫) MEETEI MAYEK CHEIKHEI
	]},
	// FB00..FB4F Alphabetic Presentation Forms: 2/58 denied
	{block: 'Alphabetic Presentation Forms', cps: [
		// digraphs
		0xFB05, // (ﬅ) LATIN SMALL LIGATURE LONG S T
		0xFB06, // (ﬆ) LATIN SMALL LIGATURE ST
	]},
	// FB50..FDFF Arabic Presentation Forms-A: 8/656 denied
	{block: 'Arabic Presentation Forms-A', cps: [
		// superscript
		0xFC5B, // (ﱛ) ARABIC LIGATURE THAL WITH SUPERSCRIPT ALEF ISOLATED FORM
		0xFC5C, // (ﱜ) ARABIC LIGATURE REH WITH SUPERSCRIPT ALEF ISOLATED FORM
		0xFC5D, // (ﱝ) ARABIC LIGATURE ALEF MAKSURA WITH SUPERSCRIPT ALEF ISOLATED FORM
		0xFC63, // (ﱣ) ARABIC LIGATURE SHADDA WITH SUPERSCRIPT ALEF ISOLATED FORM
		0xFC90, // (ﲐ) ARABIC LIGATURE ALEF MAKSURA WITH SUPERSCRIPT ALEF FINAL FORM
		0xFCD9, // (ﳙ) ARABIC LIGATURE HEH WITH SUPERSCRIPT ALEF INITIAL FORM
		// brackets
		0xFD3E, // (﴾) ORNATE LEFT PARENTHESIS
		0xFD3F, // (﴿) ORNATE RIGHT PARENTHESIS
	]},
	// 10A00..10A5F Kharoshthi: 8/68 denied
	{block: 'Kharoshthi', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x10A56, // (𐩖) KHAROSHTHI PUNCTUATION DANDA
		0x10A57, // (𐩗) KHAROSHTHI PUNCTUATION DOUBLE DANDA
		0x10A50, // (𐩐) KHAROSHTHI PUNCTUATION DOT
		0x10A51, // (𐩑) KHAROSHTHI PUNCTUATION SMALL CIRCLE
		0x10A52, // (𐩒) KHAROSHTHI PUNCTUATION CIRCLE
		0x10A53, // (𐩓) KHAROSHTHI PUNCTUATION CRESCENT BAR
		0x10A54, // (𐩔) KHAROSHTHI PUNCTUATION MANGALAM
		0x10A58, // (𐩘) KHAROSHTHI PUNCTUATION LINES
	]},
	// 10F30..10F6F Sogdian: 5/42 denied
	{block: 'Sogdian', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x10F55, // (𐽕) SOGDIAN PUNCTUATION TWO VERTICAL BARS
		0x10F56, // (𐽖) SOGDIAN PUNCTUATION TWO VERTICAL BARS WITH DOTS
		0x10F57, // (𐽗) SOGDIAN PUNCTUATION CIRCLE WITH DOT
		0x10F58, // (𐽘) SOGDIAN PUNCTUATION TWO CIRCLES WITH DOTS
		0x10F59, // (𐽙) SOGDIAN PUNCTUATION HALF CIRCLE WITH DOT
	]},
	// 10F70..10FAF Old Uyghur: 4/26 denied
	{block: 'Old Uyghur', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x10F86, // (𐾆) OLD UYGHUR PUNCTUATION BAR
		0x10F87, // (𐾇) OLD UYGHUR PUNCTUATION TWO BARS
		0x10F88, // (𐾈) OLD UYGHUR PUNCTUATION TWO DOTS
		0x10F89, // (𐾉) OLD UYGHUR PUNCTUATION FOUR DOTS
	]},
	// 11000..1107F Brahmi: 2/115 denied
	{block: 'Brahmi', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11047, // (𑁇) BRAHMI DANDA
		0x11048, // (𑁈) BRAHMI DOUBLE DANDA
	]},
	// 11080..110CF Kaithi: 4/66 denied
	{block: 'Kaithi', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x110BE, // (𑂾) KAITHI SECTION MARK
		0x110BF, // (𑂿) KAITHI DOUBLE SECTION MARK
		0x110C0, // (𑃀) KAITHI DANDA
		0x110C1, // (𑃁) KAITHI DOUBLE DANDA
	]},
	// 11100..1114F Chakma: 3/71 denied
	{block: 'Chakma', cps: [
		// exclaim/question mark
		0x11143, // (𑅃) CHAKMA QUESTION MARK
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11141, // (𑅁) CHAKMA DANDA
		0x11142, // (𑅂) CHAKMA DOUBLE DANDA
	]},
	// 11180..111DF Sharada: 5/96 denied
	{block: 'Sharada', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x111C5, // (𑇅) SHARADA DANDA
		0x111C6, // (𑇆) SHARADA DOUBLE DANDA
		0x111CD, // (𑇍) SHARADA SUTRA MARK
		0x111DE, // (𑇞) SHARADA SECTION MARK-1
		0x111DF, // (𑇟) SHARADA SECTION MARK-2
	]},
	// 11200..1124F Khojki: 4/65 denied
	{block: 'Khojki', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11238, // (𑈸) KHOJKI DANDA
		0x11239, // (𑈹) KHOJKI DOUBLE DANDA
		0x1123B, // (𑈻) KHOJKI SECTION MARK
		0x1123C, // (𑈼) KHOJKI DOUBLE SECTION MARK
	]},
	// 11280..112AF Multani: 1/38 denied
	{block: 'Multani', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x112A9, // (𑊩) MULTANI SECTION MARK
	]},
	// 11380..113FF Tulu-Tigalari: 2/80 denied
	{block: 'Tulu-Tigalari', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x113D4, // (𑏔) TULU-TIGALARI DANDA
		0x113D5, // (𑏕) TULU-TIGALARI DOUBLE DANDA
	]},
	// 11400..1147F Newa: 4/97 denied
	{block: 'Newa', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1144B, // (𑑋) NEWA DANDA
		0x1144C, // (𑑌) NEWA DOUBLE DANDA
		// comma
		0x1144D, // (𑑍) NEWA COMMA
		0x1145A, // (𑑚) NEWA DOUBLE COMMA
	]},
	// 11580..115FF Siddham: 17/92 denied
	{block: 'Siddham', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x115C2, // (𑗂) SIDDHAM DANDA
		0x115C3, // (𑗃) SIDDHAM DOUBLE DANDA
		0x115C9, // (𑗉) SIDDHAM END OF TEXT MARK
		0x115CA, // (𑗊) SIDDHAM SECTION MARK WITH TRIDENT AND U-SHAPED ORNAMENTS
		0x115CB, // (𑗋) SIDDHAM SECTION MARK WITH TRIDENT AND DOTTED CRESCENTS
		0x115CC, // (𑗌) SIDDHAM SECTION MARK WITH RAYS AND DOTTED CRESCENTS
		0x115CD, // (𑗍) SIDDHAM SECTION MARK WITH RAYS AND DOTTED DOUBLE CRESCENTS
		0x115CE, // (𑗎) SIDDHAM SECTION MARK WITH RAYS AND DOTTED TRIPLE CRESCENTS
		0x115CF, // (𑗏) SIDDHAM SECTION MARK DOUBLE RING
		0x115D0, // (𑗐) SIDDHAM SECTION MARK DOUBLE RING WITH RAYS
		0x115D1, // (𑗑) SIDDHAM SECTION MARK WITH DOUBLE CRESCENTS
		0x115D2, // (𑗒) SIDDHAM SECTION MARK WITH TRIPLE CRESCENTS
		0x115D3, // (𑗓) SIDDHAM SECTION MARK WITH QUADRUPLE CRESCENTS
		0x115D4, // (𑗔) SIDDHAM SECTION MARK WITH SEPTUPLE CRESCENTS
		0x115D5, // (𑗕) SIDDHAM SECTION MARK WITH CIRCLES AND RAYS
		0x115D6, // (𑗖) SIDDHAM SECTION MARK WITH CIRCLES AND TWO ENCLOSURES
		0x115D7, // (𑗗) SIDDHAM SECTION MARK WITH CIRCLES AND FOUR ENCLOSURES
	]},
	// 11600..1165F Modi: 2/79 denied
	{block: 'Modi', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11641, // (𑙁) MODI DANDA
		0x11642, // (𑙂) MODI DOUBLE DANDA
	]},
	// 11700..1174F Ahom: 3/65 denied
	{block: 'Ahom', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1173C, // (𑜼) AHOM SIGN SMALL SECTION
		0x1173D, // (𑜽) AHOM SIGN SECTION
		0x1173E, // (𑜾) AHOM SIGN RULAI
	]},
	// 11900..1195F Dives Akuru: 2/72 denied
	{block: 'Dives Akuru', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11944, // (𑥄) DIVES AKURU DOUBLE DANDA
		0x11946, // (𑥆) DIVES AKURU END OF TEXT MARK
	]},
	// 11A00..11A4F Zanabazar Square: 2/72 denied
	{block: 'Zanabazar Square', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11A42, // (𑩂) ZANABAZAR SQUARE MARK SHAD
		0x11A43, // (𑩃) ZANABAZAR SQUARE MARK DOUBLE SHAD
	]},
	// 11A50..11AAF Soyombo: 2/83 denied
	{block: 'Soyombo', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11A9B, // (𑪛) SOYOMBO MARK SHAD
		0x11A9C, // (𑪜) SOYOMBO MARK DOUBLE SHAD
	]},
	// 11C00..11C6F Bhaiksuki: 2/97 denied
	{block: 'Bhaiksuki', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11C41, // (𑱁) BHAIKSUKI DANDA
		0x11C42, // (𑱂) BHAIKSUKI DOUBLE DANDA
	]},
	// 11EE0..11EFF Makasar: 2/25 denied
	{block: 'Makasar', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11EF7, // (𑻷) MAKASAR PASSIMBANG
		0x11EF8, // (𑻸) MAKASAR END OF SECTION
	]},
	// 11F00..11F5F Kawi: 2/87 denied
	{block: 'Kawi', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x11F43, // (𑽃) KAWI DANDA
		0x11F44, // (𑽄) KAWI DOUBLE DANDA
	]},
	// 16A40..16A6F Mro: 2/43 denied
	{block: 'Mro', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x16A6E, // (𖩮) MRO DANDA
		0x16A6F, // (𖩯) MRO DOUBLE DANDA
	]},
	// 16AD0..16AFF Bassa Vah: 1/36 denied
	{block: 'Bassa Vah', cps: [
		// scripted stops
		0x16AF5, // (𖫵) BASSA VAH FULL STOP
	]},
	// 16B00..16B8F Pahawh Hmong: 3/127 denied
	{block: 'Pahawh Hmong', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x16B37, // (𖬷) PAHAWH HMONG SIGN VOS THOM
		0x16B38, // (𖬸) PAHAWH HMONG SIGN VOS TSHAB CEEB
		0x16B44, // (𖭄) PAHAWH HMONG SIGN XAUS
	]},
	// 16D40..16D7F Kirat Rai: 2/58 denied
	{block: 'Kirat Rai', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x16D6E, // (𖵮) KIRAT RAI DANDA
		0x16D6F, // (𖵯) KIRAT RAI DOUBLE DANDA
	]},
	// 16E40..16E9F Medefaidrin: 2/91 denied
	{block: 'Medefaidrin', cps: [
		// scripted stops
		0x16E98, // (𖺘) MEDEFAIDRIN FULL STOP
		// comma
		0x16E97, // (𖺗) MEDEFAIDRIN COMMA
	]},
	// 1BC00..1BC9F Duployan: 1/143 denied
	{block: 'Duployan', cps: [
		// scripted stops
		0x1BC9F, // (𛲟) DUPLOYAN PUNCTUATION CHINOOK FULL STOP
	]},
	// 1E900..1E95F Adlam: 2/88 denied
	{block: 'Adlam', cps: [
		// exclaim/question mark
		0x1E95F, // (𞥟) ADLAM INITIAL QUESTION MARK
		0x1E95E, // (𞥞) ADLAM INITIAL EXCLAMATION MARK
	]},
	// 1EE00..1EEFF Arabic Mathematical Alphabetic Symbols: 2/143 denied
	{block: 'Arabic Mathematical Alphabetic Symbols', cps: [
		// general punctuation / https://discuss.ens.domains/t/ens-name-normalization/8652/396
		0x1EEF0, // (𞻰) ARABIC MATHEMATICAL OPERATOR MEEM WITH HAH WITH TATWEEL
		0x1EEF1, // (𞻱) ARABIC MATHEMATICAL OPERATOR HAH WITH DAL
	]},
] satisfies Rule[];
