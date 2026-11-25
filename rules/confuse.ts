import {CONFUSE_TYPE_ALLOW, CONFUSE_TYPE_VALID, type ConfuseDef, type ConfuseGroup} from '../src/rules.ts';
import type {CodePoint} from '../src/utils.ts';

// notes:
// - arabic digit confusables are deemed valid
// - upper/lower case ASCII confusables are merged
// - 0/1 confusables are disabled since they cause too many connections (0oO and lL1Ii)
// - //IDNA: members are invalid by IDNA, //DISALLOW: members are disallowed by rules/disallow/ (kept for reference)

// useful links:
// https://util.unicode.org/UnicodeJsps/confusables.jsp
// https://unicode-org.github.io/cldr-staging/charts/latest/by_type/core_data.alphabetic_information.main.html
// https://adraffy.github.io/ens-normalize.js/test/confused.html
// https://en.wikipedia.org/wiki/Arabic_script_in_Unicode

// markup convenience
function valid(cp: CodePoint): ConfuseDef { return {cp, type: CONFUSE_TYPE_VALID}; }
function allow(cp: CodePoint): ConfuseDef { return {cp, type: CONFUSE_TYPE_ALLOW}; } 

// when there are 2+ confusables for a group without a decision
export const CONFUSE_DEFAULT_ALLOW: boolean = true;

// format: [hex-string, cp, cp, ...]
export const CONFUSE_GROUPS = [
	[
		// "2" <Same>
		'32', // DIGIT TWO [Zyyy]=>[ALL]
		valid(0x32), // (2) DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x1D7D0, // (𝟐) MATHEMATICAL BOLD DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x1D7DA, // (𝟚) MATHEMATICAL DOUBLE-STRUCK DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x1D7E4, // (𝟤) MATHEMATICAL SANS-SERIF DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x1D7EE, // (𝟮) MATHEMATICAL SANS-SERIF BOLD DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x1D7F8, // (𝟸) MATHEMATICAL MONOSPACE DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x1FBF2, // (🯲) SEGMENTED DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0xA75A, // (Ꝛ) LATIN CAPITAL LETTER R ROTUNDA [Latn]=>[Latn]
		//IDNA:0x1A7, // (Ƨ) LATIN CAPITAL LETTER TONE TWO [Latn]=>[Latn]
		//IDNA:0x3E8, // (Ϩ) COPTIC CAPITAL LETTER HORI [Copt]=>[Copt]
		//IDNA:0xA644, // (Ꙅ) CYRILLIC CAPITAL LETTER REVERSED DZE [Cyrl]=>[Cyrl]
		0x14BF, // (ᒿ) CANADIAN SYLLABICS SAYISI M [Cans]=>[Cans]
		0xA6EF, // (ꛯ) BAMUM LETTER KOGHOM [Bamu]=>[Bamu]
	],
	[
		// "3" <Same>
		'33', // DIGIT THREE [Zyyy]=>[ALL]
		valid(0x33), // (3) DIGIT THREE [Zyyy]=>[ALL]
		//DISALLOW:0x1D206, // (𝈆) GREEK VOCAL NOTATION SYMBOL-7 [Grek]=>[Grek]
		//IDNA:0x1D7D1, // (𝟑) MATHEMATICAL BOLD DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0x1D7DB, // (𝟛) MATHEMATICAL DOUBLE-STRUCK DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0x1D7E5, // (𝟥) MATHEMATICAL SANS-SERIF DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0x1D7EF, // (𝟯) MATHEMATICAL SANS-SERIF BOLD DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0x1D7F9, // (𝟹) MATHEMATICAL MONOSPACE DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0x1FBF3, // (🯳) SEGMENTED DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0xA7AB, // (Ɜ) LATIN CAPITAL LETTER REVERSED OPEN E [Latn]=>[Latn]
		//IDNA:0x21C, // (Ȝ) LATIN CAPITAL LETTER YOGH [Latn]=>[Latn]
		//IDNA:0x1B7, // (Ʒ) LATIN CAPITAL LETTER EZH [Latn]=>[Latn]
		//IDNA:0xA76A, // (Ꝫ) LATIN CAPITAL LETTER ET [Latn]=>[Latn]
		//IDNA:0x2CCC, // (Ⳍ) COPTIC CAPITAL LETTER OLD COPTIC HORI [Copt]=>[Copt]
		//IDNA:0x417, // (З) CYRILLIC CAPITAL LETTER ZE [Cyrl]=>[Cyrl]
		//IDNA:0x4E0, // (Ӡ) CYRILLIC CAPITAL LETTER ABKHASIAN DZE [Cyrl]=>[Cyrl]
		0x16F3B, // (𖼻) MIAO LETTER ZA [Plrd]=>[Plrd]
		0x118CA, // (𑣊) WARANG CITI SMALL LETTER ANG [Wara]=>[Wara]
		0xC69, // (౩) TELUGU DIGIT THREE (20221204: missing)
	],
	[
		// "4" <Same>
		'34', // DIGIT FOUR [Zyyy]=>[ALL]
		valid(0x34), // (4) DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x1D7D2, // (𝟒) MATHEMATICAL BOLD DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x1D7DC, // (𝟜) MATHEMATICAL DOUBLE-STRUCK DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x1D7E6, // (𝟦) MATHEMATICAL SANS-SERIF DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x1D7F0, // (𝟰) MATHEMATICAL SANS-SERIF BOLD DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x1D7FA, // (𝟺) MATHEMATICAL MONOSPACE DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x1FBF4, // (🯴) SEGMENTED DIGIT FOUR [Zyyy]=>[ALL]
		0x13CE, // (Ꮞ) CHEROKEE LETTER SE [Cher]=>[Cher]
		//IDNA:0x118AF, // (𑢯) WARANG CITI CAPITAL LETTER UC [Wara]=>[Wara]
	],
	[
		// "5" <Same>
		'35', // DIGIT FIVE [Zyyy]=>[ALL]
		valid(0x35), // (5) DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1D7D3, // (𝟓) MATHEMATICAL BOLD DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1D7DD, // (𝟝) MATHEMATICAL DOUBLE-STRUCK DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1D7E7, // (𝟧) MATHEMATICAL SANS-SERIF DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1D7F1, // (𝟱) MATHEMATICAL SANS-SERIF BOLD DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1D7FB, // (𝟻) MATHEMATICAL MONOSPACE DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1FBF5, // (🯵) SEGMENTED DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x1BC, // (Ƽ) LATIN CAPITAL LETTER TONE FIVE [Latn]=>[Latn]
		//IDNA:0x118BB, // (𑢻) WARANG CITI CAPITAL LETTER HORR [Wara]=>[Wara]
	],
	[
		// "6" <Same>
		'36', // DIGIT SIX [Zyyy]=>[ALL]
		valid(0x36), // (6) DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x1D7D4, // (𝟔) MATHEMATICAL BOLD DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x1D7DE, // (𝟞) MATHEMATICAL DOUBLE-STRUCK DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x1D7E8, // (𝟨) MATHEMATICAL SANS-SERIF DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x1D7F2, // (𝟲) MATHEMATICAL SANS-SERIF BOLD DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x1D7FC, // (𝟼) MATHEMATICAL MONOSPACE DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x1FBF6, // (🯶) SEGMENTED DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x2CD2, // (Ⳓ) COPTIC CAPITAL LETTER OLD COPTIC HEI [Copt]=>[Copt]
		allow(0x431), // (б) CYRILLIC SMALL LETTER BE [Cyrl]=>[Cyrl]
		0x13EE, // (Ꮾ) CHEROKEE LETTER WV [Cher]=>[Cher]
		0x118D5, // (𑣕) WARANG CITI SMALL LETTER AT [Wara]=>[Wara]
	],
	[
		// "7" <Same>
		'37', // DIGIT SEVEN [Zyyy]=>[ALL]
		valid(0x37), // (7) DIGIT SEVEN [Zyyy]=>[ALL]
		//DISALLOW:0x1D212, // (𝈒) GREEK VOCAL NOTATION SYMBOL-19 [Grek]=>[Grek]
		//IDNA:0x1D7D5, // (𝟕) MATHEMATICAL BOLD DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x1D7DF, // (𝟟) MATHEMATICAL DOUBLE-STRUCK DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x1D7E9, // (𝟩) MATHEMATICAL SANS-SERIF DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x1D7F3, // (𝟳) MATHEMATICAL SANS-SERIF BOLD DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x1D7FD, // (𝟽) MATHEMATICAL MONOSPACE DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x1FBF7, // (🯷) SEGMENTED DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x104D2, // (𐓒) OSAGE CAPITAL LETTER ZA [Osge]=>[Osge]
		0x118C6, // (𑣆) WARANG CITI SMALL LETTER II [Wara]=>[Wara]
	],
	[
		// "8" <Same>
		'38', // DIGIT EIGHT [Zyyy]=>[ALL]
		valid(0x38), // (8) DIGIT EIGHT [Zyyy]=>[ALL]
		0xB03, // (◌ଃ) ORIYA SIGN VISARGA [Orya]=>[Orya]
		0x9EA, // (৪) BENGALI DIGIT FOUR [Beng]=>[Beng,Cakm,Sylo]
		0xA6A, // (੪) GURMUKHI DIGIT FOUR [Guru]=>[Guru,Mult]
		0x1E8CB, // (𞣋) MENDE KIKAKUI DIGIT FIVE [Mend]=>[Mend]
		//IDNA:0x1D7D6, // (𝟖) MATHEMATICAL BOLD DIGIT EIGHT [Zyyy]=>[ALL]
		//IDNA:0x1D7E0, // (𝟠) MATHEMATICAL DOUBLE-STRUCK DIGIT EIGHT [Zyyy]=>[ALL]
		//IDNA:0x1D7EA, // (𝟪) MATHEMATICAL SANS-SERIF DIGIT EIGHT [Zyyy]=>[ALL]
		//IDNA:0x1D7F4, // (𝟴) MATHEMATICAL SANS-SERIF BOLD DIGIT EIGHT [Zyyy]=>[ALL]
		//IDNA:0x1D7FE, // (𝟾) MATHEMATICAL MONOSPACE DIGIT EIGHT [Zyyy]=>[ALL]
		//IDNA:0x1FBF8, // (🯸) SEGMENTED DIGIT EIGHT [Zyyy]=>[ALL]
		//DISALLOW:0x223, // (ȣ) LATIN SMALL LETTER OU [Latn]=>[Latn]
		//IDNA:0x222, // (Ȣ) LATIN CAPITAL LETTER OU [Latn]=>[Latn]
		0x1031A, // (𐌚) OLD ITALIC LETTER EF [Ital]=>[Ital]
	],
	[
		// "9" <Same>
		'39', // DIGIT NINE [Zyyy]=>[ALL]
		valid(0x39), // (9) DIGIT NINE [Zyyy]=>[ALL]
		0xA67, // (੧) GURMUKHI DIGIT ONE [Guru]=>[Guru,Mult]
		0xB68, // (୨) ORIYA DIGIT TWO [Orya]=>[Orya]
		0x9ED, // (৭) BENGALI DIGIT SEVEN [Beng]=>[Beng,Cakm,Sylo]
		0xD6D, // (൭) MALAYALAM DIGIT SEVEN [Mlym]=>[Mlym]
		//IDNA:0x1D7D7, // (𝟗) MATHEMATICAL BOLD DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0x1D7E1, // (𝟡) MATHEMATICAL DOUBLE-STRUCK DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0x1D7EB, // (𝟫) MATHEMATICAL SANS-SERIF DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0x1D7F5, // (𝟵) MATHEMATICAL SANS-SERIF BOLD DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0x1D7FF, // (𝟿) MATHEMATICAL MONOSPACE DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0x1FBF9, // (🯹) SEGMENTED DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0xA76E, // (Ꝯ) LATIN CAPITAL LETTER CON [Latn]=>[Latn]
		//IDNA:0x2CCA, // (Ⳋ) COPTIC CAPITAL LETTER DIALECT-P HORI [Copt]=>[Copt]
		0x118CC, // (𑣌) WARANG CITI SMALL LETTER KO [Wara]=>[Wara]
		//IDNA:0x118AC, // (𑢬) WARANG CITI CAPITAL LETTER KO [Wara]=>[Wara]
		0x118D6, // (𑣖) WARANG CITI SMALL LETTER AM [Wara]=>[Wara]
	],
	[
		// "◌֖" <Same>
		'596', // HEBREW ACCENT TIPEHA [Hebr]=>[Hebr]
		0x596, // (◌֖) HEBREW ACCENT TIPEHA [Hebr]=>[Hebr]
		0x5AD, // (◌֭) HEBREW ACCENT DEHI [Hebr]=>[Hebr]
	],
	[
		// "◌֘" <Same>
		'598', // HEBREW ACCENT ZARQA [Hebr]=>[Hebr]
		0x598, // (◌֘) HEBREW ACCENT ZARQA [Hebr]=>[Hebr]
		0x5AE, // (◌֮) HEBREW ACCENT ZINOR [Hebr]=>[Hebr]
	],
	[
		// "◌֙" <Same>
		'599', // HEBREW ACCENT PASHTA [Hebr]=>[Hebr]
		0x599, // (◌֙) HEBREW ACCENT PASHTA [Hebr]=>[Hebr]
		0x5A8, // (◌֨) HEBREW ACCENT QADMA [Hebr]=>[Hebr]
	],
	[
		// "◌֚" <Same>
		'59A', // HEBREW ACCENT YETIV [Hebr]=>[Hebr]
		0x59A, // (◌֚) HEBREW ACCENT YETIV [Hebr]=>[Hebr]
		0x5A4, // (◌֤) HEBREW ACCENT MAHAPAKH [Hebr]=>[Hebr]
	],
	[
		// "◌ۛ" <Same>
		'6DB', // ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		//DISALLOW:0x6DB, // (◌ۛ) ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		//DISALLOW:0x1AB4, // (◌᪴) COMBINING TRIPLE DOT [Zinh]=>[ALL]
		//DISALLOW:0x20DB, // (◌⃛) COMBINING THREE DOTS ABOVE [Zinh]=>[ALL]
	],
	[
		// "◌̓" <Same>
		'313', // COMBINING COMMA ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x313, // (◌̓) COMBINING COMMA ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x619, // (◌ؙ) ARABIC SMALL DAMMA [Arab]=>[Arab]
		//DISALLOW:0x8F3, // (◌ࣳ) ARABIC SMALL HIGH WAW [Arab]=>[Arab]
		//IDNA:0x343, // (◌̓) COMBINING GREEK KORONIS [Zinh]=>[ALL]
		//DISALLOW:0x315, // (◌̕) COMBINING COMMA ABOVE RIGHT [Zinh]=>[ALL]
		0x64F, // (◌ُ) ARABIC DAMMA [Zinh]=>[Arab,Syrc]
	],
	[
		// "◌̔" <Same>
		'314', // COMBINING REVERSED COMMA ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x314, // (◌̔) COMBINING REVERSED COMMA ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x65D, // (◌ٝ) ARABIC REVERSED DAMMA [Arab]=>[Arab]
	],
	[
		// "◌́" <Same>
		'301', // COMBINING ACUTE ACCENT [Zinh]=>[ALL]
		0x301, // (◌́) COMBINING ACUTE ACCENT [Zinh]=>[ALL]
		0x59C, // (◌֜) HEBREW ACCENT GERESH [Hebr]=>[Hebr]
		0x59D, // (◌֝) HEBREW ACCENT GERESH MUQDAM [Hebr]=>[Hebr]
		//DISALLOW:0x618, // (◌ؘ) ARABIC SMALL FATHA [Arab]=>[Arab]
		0x747, // (◌݇) SYRIAC OBLIQUE LINE ABOVE [Syrc]=>[Syrc]
		//IDNA:0x341, // (◌́) COMBINING ACUTE TONE MARK [Zinh]=>[ALL]
		//DISALLOW:0x954, // (◌॔) DEVANAGARI ACUTE ACCENT [Zinh]=>[ALL]
		0x64E, // (◌َ) ARABIC FATHA [Zinh]=>[Arab,Syrc]
	],
	[
		// "◌̀" <Same>
		'300', // COMBINING GRAVE ACCENT [Zinh]=>[ALL]
		0x300, // (◌̀) COMBINING GRAVE ACCENT [Zinh]=>[ALL]
		//IDNA:0x340, // (◌̀) COMBINING GRAVE TONE MARK [Zinh]=>[ALL]
		//DISALLOW:0x953, // (◌॓) DEVANAGARI GRAVE ACCENT [Zinh]=>[ALL]
	],
	[
		// "◌̆" <Same>
		'306', // COMBINING BREVE [Zinh]=>[ALL]
		0x306, // (◌̆) COMBINING BREVE [Zinh]=>[ALL]
		0x30C, // (◌̌) COMBINING CARON [Zinh]=>[ALL]
		//DISALLOW:0xA67C, // (◌꙼) COMBINING CYRILLIC KAVYKA [Cyrl]=>[Cyrl]
		//DISALLOW:0x658, // (◌٘) ARABIC MARK NOON GHUNNA [Arab]=>[Arab]
		//DISALLOW:0x65A, // (◌ٚ) ARABIC VOWEL SIGN SMALL V ABOVE [Arab]=>[Arab]
		//DISALLOW:0x36E, // (◌ͮ) COMBINING LATIN SMALL LETTER V [Zinh]=>[Latn]
	],
	[
		// "◌̆̇" <Same>
		'306 307', // COMBINING BREVE + COMBINING DOT ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x6E8, // (◌ۨ) ARABIC SMALL HIGH NOON [Arab]=>[Arab]
		//DISALLOW:0x310, // (◌̐) COMBINING CANDRABINDU [Zinh]=>[ALL]
		0x901, // (◌ँ) DEVANAGARI SIGN CANDRABINDU [Deva]=>[Deva]
		0x981, // (◌ঁ) BENGALI SIGN CANDRABINDU [Beng]=>[Beng]
		0xA81, // (◌ઁ) GUJARATI SIGN CANDRABINDU [Gujr]=>[Gujr]
		0xB01, // (◌ଁ) ORIYA SIGN CANDRABINDU [Orya]=>[Orya]
		//DISALLOW:0xC00, // (◌ఀ) TELUGU SIGN COMBINING CANDRABINDU ABOVE [Telu]=>[Telu]
		//DISALLOW:0xC81, // (◌ಁ) KANNADA SIGN CANDRABINDU [Knda]=>[Knda]
		//DISALLOW:0xD01, // (◌ഁ) MALAYALAM SIGN CANDRABINDU [Mlym]=>[Mlym]
		0x114BF, // (◌𑒿) TIRHUTA SIGN CANDRABINDU [Tirh]=>[Tirh]
	],
	[
		// "◌̂" <Same>
		'302', // COMBINING CIRCUMFLEX ACCENT [Zinh]=>[ALL]
		0x302, // (◌̂) COMBINING CIRCUMFLEX ACCENT [Zinh]=>[ALL]
		//DISALLOW:0x1CD0, // (◌᳐) VEDIC TONE KARSHANA [Zinh]=>[Beng,Deva,Gran,Knda]
		//DISALLOW:0x311, // (◌̑) COMBINING INVERTED BREVE [Zinh]=>[ALL]
		//DISALLOW:0x65B, // (◌ٛ) ARABIC VOWEL SIGN INVERTED SMALL V ABOVE [Arab]=>[Arab]
		0x7EE, // (◌߮) NKO COMBINING LONG DESCENDING TONE [Nkoo]=>[Nkoo]
		0xA6F0, // (◌꛰) BAMUM COMBINING MARK KOQNDON [Bamu]=>[Bamu]
	],
	[
		// "◌̊" <Same>
		'30A', // COMBINING RING ABOVE [Zinh]=>[ALL]
		0x30A, // (◌̊) COMBINING RING ABOVE [Zinh]=>[ALL]
		0x5AF, // (◌֯) HEBREW MARK MASORA CIRCLE [Hebr]=>[Hebr]
		//DISALLOW:0x6DF, // (◌۟) ARABIC SMALL HIGH ROUNDED ZERO [Arab]=>[Arab]
		//DISALLOW:0x17D3, // (◌៓) KHMER SIGN BATHAMASAT [Khmr]=>[Khmr]
		0x309A, // (◌゚) COMBINING KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK [Zinh]=>[Hira,Kana,Jpan]
		0x652, // (◌ْ) ARABIC SUKUN [Zinh]=>[Arab,Syrc]
		//DISALLOW:0xB82, // (◌ஂ) TAMIL SIGN ANUSVARA [Taml]=>[Taml]
		0x1036, // (◌ံ) MYANMAR SIGN ANUSVARA [Mymr]=>[Mymr]
		0x17C6, // (◌ំ) KHMER SIGN NIKAHIT [Khmr]=>[Khmr]
		0x11300, // (◌𑌀) GRANTHA SIGN COMBINING ANUSVARA ABOVE [Gran]=>[Gran]
		0xE4D, // (◌ํ) THAI CHARACTER NIKHAHIT [Thai]=>[Thai]
		0xECD, // (◌ໍ) LAO NIGGAHITA [Laoo]=>[Laoo]
		//DISALLOW:0x366, // (◌ͦ) COMBINING LATIN SMALL LETTER O [Zinh]=>[Latn]
		//DISALLOW:0x2DEA, // (◌ⷪ) COMBINING CYRILLIC LETTER O [Cyrl]=>[Cyrl]
	],
	[
		// "◌̈" <Same>
		'308', // COMBINING DIAERESIS [Zinh]=>[ALL]
		0x308, // (◌̈) COMBINING DIAERESIS [Zinh]=>[ALL]
		0x8EB, // (◌࣫) ARABIC TONE TWO DOTS ABOVE [Arab]=>[Arab]
		0x7F3, // (◌߳) NKO COMBINING DOUBLE DOT ABOVE [Nkoo]=>[Nkoo]
	],
	[
		// "◌̋" <Same>
		'30B', // COMBINING DOUBLE ACUTE ACCENT [Zinh]=>[ALL]
		0x30B, // (◌̋) COMBINING DOUBLE ACUTE ACCENT [Zinh]=>[ALL]
		0x64B, // (◌ً) ARABIC FATHATAN [Zinh]=>[Arab,Syrc]
		0x8F0, // (◌ࣰ) ARABIC OPEN FATHATAN [Arab]=>[Arab]
	],
	[
		// "◌̃" <Same>
		'303', // COMBINING TILDE [Zinh]=>[ALL]
		0x303, // (◌̃) COMBINING TILDE [Zinh]=>[ALL]
		//DISALLOW:0x342, // (◌͂) COMBINING GREEK PERISPOMENI [Zinh]=>[Grek]
		0x653, // (◌ٓ) ARABIC MADDAH ABOVE [Zinh]=>[Arab,Syrc]
	],
	[
		// "◌̇" <Same>
		'307', // COMBINING DOT ABOVE [Zinh]=>[ALL]
		0x307, // (◌̇) COMBINING DOT ABOVE [Zinh]=>[ALL]
		0x5C4, // (◌ׄ) HEBREW MARK UPPER DOT [Hebr]=>[Hebr]
		0x6EC, // (◌۬) ARABIC ROUNDED HIGH STOP WITH FILLED CENTRE [Arab]=>[Arab]
		//DISALLOW:0x740, // (◌݀) SYRIAC FEMININE DOT [Syrc]=>[Syrc]
		0x8EA, // (◌࣪) ARABIC TONE ONE DOT ABOVE [Arab]=>[Arab]
		0x741, // (◌݁) SYRIAC QUSHSHAYA [Syrc]=>[Syrc]
		//DISALLOW:0x358, // (◌͘) COMBINING DOT ABOVE RIGHT [Zinh]=>[ALL]
		0x5B9, // (◌ֹ) HEBREW POINT HOLAM [Hebr]=>[Hebr]
		0x5BA, // (◌ֺ) HEBREW POINT HOLAM HASER FOR VAV [Hebr]=>[Hebr]
		0x5C2, // (◌ׂ) HEBREW POINT SIN DOT [Hebr]=>[Hebr]
		0x5C1, // (◌ׁ) HEBREW POINT SHIN DOT [Hebr]=>[Hebr]
		0x7ED, // (◌߭) NKO COMBINING SHORT RISING TONE [Nkoo]=>[Nkoo]
		0x902, // (◌ं) DEVANAGARI SIGN ANUSVARA [Deva]=>[Deva]
		0xA02, // (◌ਂ) GURMUKHI SIGN BINDI [Guru]=>[Guru]
		0xA82, // (◌ં) GUJARATI SIGN ANUSVARA [Gujr]=>[Gujr]
		0xBCD, // (◌்) TAMIL SIGN VIRAMA [Taml]=>[Taml]
	],
	[
		// "◌̸" <Same>
		'338', // COMBINING LONG SOLIDUS OVERLAY [Zinh]=>[ALL]
		//DISALLOW:0x338, // (◌̸) COMBINING LONG SOLIDUS OVERLAY [Zinh]=>[ALL]
		//DISALLOW:0x337, // (◌̷) COMBINING SHORT SOLIDUS OVERLAY [Zinh]=>[ALL]
	],
	[
		// "◌̨" <Same>
		'328', // COMBINING OGONEK [Zinh]=>[ALL]
		//DISALLOW:0x328, // (◌̨) COMBINING OGONEK [Zinh]=>[ALL]
		//DISALLOW:0x1AB7, // (◌᪷) COMBINING OPEN MARK BELOW [Zinh]=>[ALL]
		//DISALLOW:0x322, // (◌̢) COMBINING RETROFLEX HOOK BELOW [Zinh]=>[ALL]
		//IDNA:0x345, // (◌ͅ) COMBINING GREEK YPOGEGRAMMENI [Zinh]=>[Grek]
	],
	[
		// "◌̄" <Same>
		'304', // COMBINING MACRON [Zinh]=>[ALL]
		0x304, // (◌̄) COMBINING MACRON [Zinh]=>[ALL]
		//DISALLOW:0x1CD2, // (◌᳒) VEDIC TONE PRENKHA [Zinh]=>[Beng,Deva,Gran,Knda]
		0x305, // (◌̅) COMBINING OVERLINE [Zinh]=>[ALL]
		//DISALLOW:0x659, // (◌ٙ) ARABIC ZWARAKAY [Arab]=>[Arab]
		0x7EB, // (◌߫) NKO COMBINING SHORT HIGH TONE [Nkoo]=>[Nkoo]
		0xA6F1, // (◌꛱) BAMUM COMBINING MARK TUKWENTIS [Bamu]=>[Bamu]
	],
	[
		// "◌̎" <Same>
		'30E', // COMBINING DOUBLE VERTICAL LINE ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x30E, // (◌̎) COMBINING DOUBLE VERTICAL LINE ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x1CDA, // (◌᳚) VEDIC TONE DOUBLE SVARITA [Zinh]=>[Deva,Knda,Mlym,Orya,Taml,Telu]
	],
	[
		// "◌̒" <Same>
		'312', // COMBINING TURNED COMMA ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x312, // (◌̒) COMBINING TURNED COMMA ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x657, // (◌ٗ) ARABIC INVERTED DAMMA [Arab]=>[Arab]
	],
	[
		// "◌͐" <Same>
		'350', // COMBINING RIGHT ARROWHEAD ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x350, // (◌͐) COMBINING RIGHT ARROWHEAD ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x357, // (◌͗) COMBINING RIGHT HALF RING ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x8FF, // (◌ࣿ) ARABIC MARK SIDEWAYS NOON GHUNNA [Arab]=>[Arab]
		0x8F8, // (◌ࣸ) ARABIC RIGHT ARROWHEAD ABOVE [Arab]=>[Arab]
	],
	[
		// "◌͒" <Same>
		'352', // COMBINING FERMATA [Zinh]=>[ALL]
		//DISALLOW:0x352, // (◌͒) COMBINING FERMATA [Zinh]=>[ALL]
		//DISALLOW:0x900, // (◌ऀ) DEVANAGARI SIGN INVERTED CANDRABINDU [Deva]=>[Deva]
	],
	[
		// "◌̖" <Same>
		'316', // COMBINING GRAVE ACCENT BELOW [Zinh]=>[ALL]
		//DISALLOW:0x316, // (◌̖) COMBINING GRAVE ACCENT BELOW [Zinh]=>[ALL]
		//DISALLOW:0x1CED, // (◌᳭) VEDIC SIGN TIRYAK [Zinh]=>[Beng,Deva]
	],
	[
		// "◌̩" <Same>
		'329', // COMBINING VERTICAL LINE BELOW [Zinh]=>[ALL]
		//DISALLOW:0x329, // (◌̩) COMBINING VERTICAL LINE BELOW [Zinh]=>[ALL]
		//DISALLOW:0x1CDC, // (◌᳜) VEDIC TONE KATHAKA ANUDATTA [Zinh]=>[Deva,Shrd]
		//DISALLOW:0x656, // (◌ٖ) ARABIC SUBSCRIPT ALEF [Arab]=>[Arab]
	],
	[
		// "◌̫" <Same>
		'32B', // COMBINING INVERTED DOUBLE ARCH BELOW [Zinh]=>[ALL]
		//DISALLOW:0x32B, // (◌̫) COMBINING INVERTED DOUBLE ARCH BELOW [Zinh]=>[ALL]
		//DISALLOW:0x1CD5, // (◌᳕) VEDIC TONE YAJURVEDIC AGGRAVATED INDEPENDENT SVARITA [Zinh]=>[Beng,Deva]
	],
	[
		// "◌̳" <Same>
		'333', // COMBINING DOUBLE LOW LINE [Zinh]=>[ALL]
		//DISALLOW:0x333, // (◌̳) COMBINING DOUBLE LOW LINE [Zinh]=>[ALL]
		//DISALLOW:0x347, // (◌͇) COMBINING EQUALS SIGN BELOW [Zinh]=>[ALL]
	],
	[
		// "◌͔" <Same>
		'354', // COMBINING LEFT ARROWHEAD BELOW [Zinh]=>[ALL]
		//DISALLOW:0x354, // (◌͔) COMBINING LEFT ARROWHEAD BELOW [Zinh]=>[ALL]
		0x8F9, // (◌ࣹ) ARABIC LEFT ARROWHEAD BELOW [Arab]=>[Arab]
	],
	[
		// "◌͕" <Same>
		'355', // COMBINING RIGHT ARROWHEAD BELOW [Zinh]=>[ALL]
		//DISALLOW:0x355, // (◌͕) COMBINING RIGHT ARROWHEAD BELOW [Zinh]=>[ALL]
		0x8FA, // (◌ࣺ) ARABIC RIGHT ARROWHEAD BELOW [Arab]=>[Arab]
	],
	[
		// "ﾞ" <Same>
		'FF9E', // HALFWIDTH KATAKANA VOICED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0xFF9E, // (ﾞ) HALFWIDTH KATAKANA VOICED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0x309B, // (゛) KATAKANA-HIRAGANA VOICED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
	],
	[
		// "ﾟ" <Same>
		'FF9F', // HALFWIDTH KATAKANA SEMI-VOICED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0xFF9F, // (ﾟ) HALFWIDTH KATAKANA SEMI-VOICED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0x309C, // (゜) KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
	],
	[
		// "◌̵" <Same>
		'335', // COMBINING SHORT STROKE OVERLAY [Zinh]=>[ALL]
		//DISALLOW:0x335, // (◌̵) COMBINING SHORT STROKE OVERLAY [Zinh]=>[ALL]
		//DISALLOW:0x336, // (◌̶) COMBINING LONG STROKE OVERLAY [Zinh]=>[ALL]
	],
	[
		// "◌̉" <Same>
		'309', // COMBINING HOOK ABOVE [Zinh]=>[ALL]
		0x309, // (◌̉) COMBINING HOOK ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x302C, // (◌〬) IDEOGRAPHIC DEPARTING TONE MARK [Zinh]=>[Bopo,Hani,Hanb,Jpan,Kore]
	],
	[
		// "◌̣" <Same>
		'323', // COMBINING DOT BELOW [Zinh]=>[ALL]
		//DISALLOW:0x323, // (◌̣) COMBINING DOT BELOW [Zinh]=>[ALL]
		//DISALLOW:0x5C5, // (◌ׅ) HEBREW MARK LOWER DOT [Hebr]=>[Hebr]
		0x8ED, // (◌࣭) ARABIC TONE ONE DOT BELOW [Arab]=>[Arab]
		//DISALLOW:0x1CDD, // (◌᳝) VEDIC TONE DOT BELOW [Zinh]=>[Deva,Shrd]
		0x5B4, // (◌ִ) HEBREW POINT HIRIQ [Hebr]=>[Hebr]
		//DISALLOW:0x65C, // (◌ٜ) ARABIC VOWEL SIGN DOT BELOW [Arab]=>[Arab]
		0x93C, // (◌़) DEVANAGARI SIGN NUKTA [Deva]=>[Deva]
		0x9BC, // (◌়) BENGALI SIGN NUKTA [Beng]=>[Beng]
		0xA3C, // (◌਼) GURMUKHI SIGN NUKTA [Guru]=>[Guru]
		0xABC, // (◌઼) GUJARATI SIGN NUKTA [Gujr]=>[Gujr]
		0xB3C, // (◌଼) ORIYA SIGN NUKTA [Orya]=>[Orya]
		0x111CA, // (◌𑇊) SHARADA SIGN NUKTA [Shrd]=>[Shrd]
		0x114C3, // (◌𑓃) TIRHUTA SIGN NUKTA [Tirh]=>[Tirh]
		0x10A3A, // (◌𐨺) KHAROSHTHI SIGN DOT BELOW [Khar]=>[Khar]
	],
	[
		// "◌̤" <Same>
		'324', // COMBINING DIAERESIS BELOW [Zinh]=>[ALL]
		//DISALLOW:0x324, // (◌̤) COMBINING DIAERESIS BELOW [Zinh]=>[ALL]
		0x8EE, // (◌࣮) ARABIC TONE TWO DOTS BELOW [Arab]=>[Arab]
		//DISALLOW:0x1CDE, // (◌᳞) VEDIC TONE TWO DOTS BELOW [Zinh]=>[Deva]
	],
	[
		// "◌̥" <Same>
		'325', // COMBINING RING BELOW [Zinh]=>[ALL]
		//DISALLOW:0x325, // (◌̥) COMBINING RING BELOW [Zinh]=>[ALL]
		0xF37, // (◌༷) TIBETAN MARK NGAS BZUNG SGOR RTAGS [Tibt]=>[Tibt]
		//DISALLOW:0x302D, // (◌〭) IDEOGRAPHIC ENTERING TONE MARK [Zinh]=>[Bopo,Hani,Hanb,Jpan,Kore]
	],
	[
		// "◌̦" <Same>
		'326', // COMBINING COMMA BELOW [Zinh]=>[ALL]
		//DISALLOW:0x326, // (◌̦) COMBINING COMMA BELOW [Zinh]=>[ALL]
		0x327, // (◌̧) COMBINING CEDILLA [Zinh]=>[ALL]
		//DISALLOW:0x321, // (◌̡) COMBINING PALATALIZED HOOK BELOW [Zinh]=>[ALL]
		//DISALLOW:0x339, // (◌̹) COMBINING RIGHT HALF RING BELOW [Zinh]=>[ALL]
	],
	[
		// "◌̭" <Same>
		'32D', // COMBINING CIRCUMFLEX ACCENT BELOW [Zinh]=>[ALL]
		//DISALLOW:0x32D, // (◌̭) COMBINING CIRCUMFLEX ACCENT BELOW [Zinh]=>[ALL]
		//DISALLOW:0x1CD9, // (◌᳙) VEDIC TONE YAJURVEDIC KATHAKA INDEPENDENT SVARITA SCHROEDER [Zinh]=>[Deva,Shrd]
	],
	[
		// "◌̮" <Same>
		'32E', // COMBINING BREVE BELOW [Zinh]=>[ALL]
		//DISALLOW:0x32E, // (◌̮) COMBINING BREVE BELOW [Zinh]=>[ALL]
		//DISALLOW:0x1CD8, // (◌᳘) VEDIC TONE CANDRA BELOW [Zinh]=>[Beng,Deva]
	],
	[
		// "◌̱" <Same>
		'331', // COMBINING MACRON BELOW [Zinh]=>[ALL]
		//DISALLOW:0x331, // (◌̱) COMBINING MACRON BELOW [Zinh]=>[ALL]
		//DISALLOW:0x952, // (◌॒) DEVANAGARI STRESS SIGN ANUDATTA [Zinh]=>[Beng,Deva,Gran,Gujr,Guru,Knda,Latn,Mlym,Orya,Taml,Telu,Tirh]
		//DISALLOW:0x320, // (◌̠) COMBINING MINUS SIGN BELOW [Zinh]=>[ALL]
	],
	[
		// "◌ٌ" <Same>
		'64C', // ARABIC DAMMATAN [Zinh]=>[Arab,Syrc]
		0x64C, // (◌ٌ) ARABIC DAMMATAN [Zinh]=>[Arab,Syrc]
		0x8F1, // (◌ࣱ) ARABIC OPEN DAMMATAN [Arab]=>[Arab]
		0x8E8, // (◌ࣨ) ARABIC CURLY DAMMATAN [Arab]=>[Arab]
		0x8E5, // (◌ࣥ) ARABIC CURLY DAMMA [Arab]=>[Arab]
	],
	[
		// "ﹲّ" <Same>
		'FE72 651', // ARABIC DAMMATAN ISOLATED FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFC5E, // (ﱞ) ARABIC LIGATURE SHADDA WITH DAMMATAN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "◌ٍ" <Same>
		'64D', // ARABIC KASRATAN [Zinh]=>[Arab,Syrc]
		0x64D, // (◌ٍ) ARABIC KASRATAN [Zinh]=>[Arab,Syrc]
		0x8F2, // (◌ࣲ) ARABIC OPEN KASRATAN [Arab]=>[Arab]
	],
	[
		// "ﹴّ" <Same>
		'FE74 651', // ARABIC KASRATAN ISOLATED FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFC5F, // (ﱟ) ARABIC LIGATURE SHADDA WITH KASRATAN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ﹷّ" <Same>
		'FE77 651', // ARABIC FATHA MEDIAL FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFCF2, // (ﳲ) ARABIC LIGATURE SHADDA WITH FATHA MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "ﹶّ" <Same>
		'FE76 651', // ARABIC FATHA ISOLATED FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFC60, // (ﱠ) ARABIC LIGATURE SHADDA WITH FATHA ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ﹹّ" <Same>
		'FE79 651', // ARABIC DAMMA MEDIAL FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFCF3, // (ﳳ) ARABIC LIGATURE SHADDA WITH DAMMA MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "ﹸّ" <Same>
		'FE78 651', // ARABIC DAMMA ISOLATED FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFC61, // (ﱡ) ARABIC LIGATURE SHADDA WITH DAMMA ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "◌ِ" <Same>
		'650', // ARABIC KASRA [Zinh]=>[Arab,Syrc]
		0x650, // (◌ِ) ARABIC KASRA [Zinh]=>[Arab,Syrc]
		//DISALLOW:0x61A, // (◌ؚ) ARABIC SMALL KASRA [Arab]=>[Arab]
		//DISALLOW:0x317, // (◌̗) COMBINING ACUTE ACCENT BELOW [Zinh]=>[ALL]
	],
	[
		// "ﹻّ" <Same>
		'FE7B 651', // ARABIC KASRA MEDIAL FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFCF4, // (ﳴ) ARABIC LIGATURE SHADDA WITH KASRA MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "ﹺّ" <Same>
		'FE7A 651', // ARABIC KASRA ISOLATED FORM + ARABIC SHADDA [Arab,Zinh]=>[Arab]
		//IDNA:0xFC62, // (ﱢ) ARABIC LIGATURE SHADDA WITH KASRA ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ﹼٰ" <Same>
		'FE7C 670', // ARABIC SHADDA ISOLATED FORM + ARABIC LETTER SUPERSCRIPT ALEF [Arab,Zinh]=>[Arab]
		//IDNA:0xFC63, // (ﱣ) ARABIC LIGATURE SHADDA WITH SUPERSCRIPT ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "◌ٕ" <Same>
		'655', // ARABIC HAMZA BELOW [Zinh]=>[Arab,Syrc]
		0x655, // (◌ٕ) ARABIC HAMZA BELOW [Zinh]=>[Arab,Syrc]
		//DISALLOW:0x65F, // (◌ٟ) ARABIC WAVY HAMZA BELOW [Arab]=>[Arab]
	],
	[
		// "◌ٰ" <Same>
		'670', // ARABIC LETTER SUPERSCRIPT ALEF [Zinh]=>[Arab,Syrc]
		//DISALLOW:0x670, // (◌ٰ) ARABIC LETTER SUPERSCRIPT ALEF [Zinh]=>[Arab,Syrc]
		//DISALLOW:0x30D, // (◌̍) COMBINING VERTICAL LINE ABOVE [Zinh]=>[ALL]
	],
	[
		// "◌ܼ" <Same>
		'73C', // SYRIAC HBASA-ESASA DOTTED [Syrc]=>[Syrc]
		0x73C, // (◌ܼ) SYRIAC HBASA-ESASA DOTTED [Syrc]=>[Syrc]
		0x742, // (◌݂) SYRIAC RUKKAKHA [Syrc]=>[Syrc]
	],
	[
		// "◌ঃ" <Same>
		'983', // BENGALI SIGN VISARGA [Beng]=>[Beng]
		0x983, // (◌ঃ) BENGALI SIGN VISARGA [Beng]=>[Beng]
		0xA03, // (◌ਃ) GURMUKHI SIGN VISARGA [Guru]=>[Guru]
		0xC03, // (◌ః) TELUGU SIGN VISARGA [Telu]=>[Telu]
		0xC83, // (◌ಃ) KANNADA SIGN VISARGA [Knda]=>[Knda]
		0xD03, // (◌ഃ) MALAYALAM SIGN VISARGA [Mlym]=>[Mlym]
		0xD83, // (◌ඃ) SINHALA SIGN VISARGAYA [Sinh]=>[Sinh]
		0x1038, // (◌း) MYANMAR SIGN VISARGA [Mymr]=>[Mymr]
		0x114C1, // (◌𑓁) TIRHUTA SIGN VISARGA [Tirh]=>[Tirh]
	],
	[
		// "◌่" <Same>
		'E48', // THAI CHARACTER MAI EK [Thai]=>[Thai]
		0xE48, // (◌่) THAI CHARACTER MAI EK [Thai]=>[Thai]
		0x17CB, // (◌់) KHMER SIGN BANTOC [Khmr]=>[Khmr]
		0xEC8, // (◌່) LAO TONE MAI EK [Laoo]=>[Laoo]
	],
	[
		// "◌้" <Same>
		'E49', // THAI CHARACTER MAI THO [Thai]=>[Thai]
		0xE49, // (◌้) THAI CHARACTER MAI THO [Thai]=>[Thai]
		0xEC9, // (◌້) LAO TONE MAI THO [Laoo]=>[Laoo]
	],
	[
		// "◌๊" <Same>
		'E4A', // THAI CHARACTER MAI TRI [Thai]=>[Thai]
		0xE4A, // (◌๊) THAI CHARACTER MAI TRI [Thai]=>[Thai]
		0xECA, // (◌໊) LAO TONE MAI TI [Laoo]=>[Laoo]
	],
	[
		// "◌๋" <Same>
		'E4B', // THAI CHARACTER MAI CHATTAWA [Thai]=>[Thai]
		0xE4B, // (◌๋) THAI CHARACTER MAI CHATTAWA [Thai]=>[Thai]
		0xECB, // (◌໋) LAO TONE MAI CATAWA [Laoo]=>[Laoo]
	],
	[
		// "◌⃩" <Same>
		'20E9', // COMBINING WIDE BRIDGE ABOVE [Zinh]=>[ALL]
		//DISALLOW:0x20E9, // (◌⃩) COMBINING WIDE BRIDGE ABOVE [Zinh]=>[ALL]
		//DISALLOW:0xA66F, // (◌꙯) COMBINING CYRILLIC VZMET [Cyrl]=>[Cyrl,Glag]
	],
	[
		// " " <Same>
		'20', // SPACE [Zyyy]=>[ALL]
		//IDNA:0x20, // ( ) SPACE [Zyyy]=>[ALL]
		//IDNA:0x2028, // (�) LINE SEPARATOR [Zyyy]=>[ALL]
		//IDNA:0x2029, // (�) PARAGRAPH SEPARATOR [Zyyy]=>[ALL]
		//IDNA:0x1680, // ( ) OGHAM SPACE MARK [Ogam]=>[Ogam]
		//IDNA:0x2000, // ( ) EN QUAD [Zyyy]=>[ALL]
		//IDNA:0x2001, // ( ) EM QUAD [Zyyy]=>[ALL]
		//IDNA:0x2002, // ( ) EN SPACE [Zyyy]=>[ALL]
		//IDNA:0x2003, // ( ) EM SPACE [Zyyy]=>[ALL]
		//IDNA:0x2004, // ( ) THREE-PER-EM SPACE [Zyyy]=>[ALL]
		//IDNA:0x2005, // ( ) FOUR-PER-EM SPACE [Zyyy]=>[ALL]
		//IDNA:0x2006, // ( ) SIX-PER-EM SPACE [Zyyy]=>[ALL]
		//IDNA:0x2008, // ( ) PUNCTUATION SPACE [Zyyy]=>[ALL]
		//IDNA:0x2009, // ( ) THIN SPACE [Zyyy]=>[ALL]
		//IDNA:0x200A, // ( ) HAIR SPACE [Zyyy]=>[ALL]
		//IDNA:0x205F, // ( ) MEDIUM MATHEMATICAL SPACE [Zyyy]=>[ALL]
		//IDNA:0xA0, // ( ) NO-BREAK SPACE [Zyyy]=>[ALL]
		//IDNA:0x2007, // ( ) FIGURE SPACE [Zyyy]=>[ALL]
		//IDNA:0x202F, // ( ) NARROW NO-BREAK SPACE [Zyyy]=>[Latn,Mong]
	],
	[
		// "_" <Same>
		'5F', // LOW LINE [Zyyy]=>[ALL]
		valid(0x5F), // (_) LOW LINE [Zyyy]=>[ALL]
		//DISALLOW:0x7FA, // (ߺ) NKO LAJANYALAN [Nkoo]=>[Nkoo]
		//IDNA:0xFE4D, // (﹍) DASHED LOW LINE [Zyyy]=>[ALL]
		//IDNA:0xFE4E, // (﹎) CENTRELINE LOW LINE [Zyyy]=>[ALL]
		//IDNA:0xFE4F, // (﹏) WAVY LOW LINE [Zyyy]=>[ALL]
	],
	[
		// "-" <Same>
		'2D', // HYPHEN-MINUS [Zyyy]=>[ALL]
		valid(0x2D), // (-) HYPHEN-MINUS [Zyyy]=>[ALL]
		0x2010, // (‐) HYPHEN [Zyyy]=>[ALL]
		//IDNA:0x2011, // (‑) NON-BREAKING HYPHEN [Zyyy]=>[ALL]
		0x2012, // (‒) FIGURE DASH [Zyyy]=>[ALL]
		0x2013, // (–) EN DASH [Zyyy]=>[ALL]
		//IDNA:0xFE58, // (﹘) SMALL EM DASH [Zyyy]=>[ALL]
		//DISALLOW:0x6D4, // (۔) ARABIC FULL STOP [Arab]=>[Arab,Rohg]
		0x2043, // (⁃) HYPHEN BULLET [Zyyy]=>[ALL]
		//DISALLOW:0x2D7, // (˗) MODIFIER LETTER MINUS SIGN [Zyyy]=>[ALL]
		0x2212, // (−) MINUS SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2796, // (➖) HEAVY MINUS SIGN [Zyyy]=>[ALL]
		//IDNA:0x2CBA, // (Ⲻ) COPTIC CAPITAL LETTER DIALECT-P NI [Copt]=>[Copt]
	],
	[
		// "-̓" <Same>
		'2D 313', // HYPHEN-MINUS + COMBINING COMMA ABOVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A29, // (⨩) MINUS SIGN WITH COMMA ABOVE [Zyyy]=>[ALL]
	],
	[
		// "-̈" <Same>
		'2D 308', // HYPHEN-MINUS + COMBINING DIAERESIS [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2E1A, // (⸚) HYPHEN WITH DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "-̇" <Same>
		'2D 307', // HYPHEN-MINUS + COMBINING DOT ABOVE [Zyyy,Zinh]=>[ALL]
		//IDNA:0xFB29, // (﬩) HEBREW LETTER ALTERNATIVE PLUS SIGN [Hebr]=>[Hebr]
		//DISALLOW:0x2238, // (∸) DOT MINUS [Zyyy]=>[ALL]
	],
	[
		// "-̣" <Same>
		'2D 323', // HYPHEN-MINUS + COMBINING DOT BELOW [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A2A, // (⨪) MINUS SIGN WITH DOT BELOW [Zyyy]=>[ALL]
	],
	[
		// "-." <Same>
		'2D 2E', // HYPHEN-MINUS + FULL STOP [Zyyy]=>[ALL]
		//DISALLOW:0xA4FE, // (꓾) LISU PUNCTUATION COMMA [Lisu]=>[Lisu]
	],
	[
		// "〜" <Same>
		'301C', // WAVE DASH [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Hanb,Jpan,Kore]
		//DISALLOW:0x301C, // (〜) WAVE DASH [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Hanb,Jpan,Kore]
		//IDNA:0xFF5E, // (～) FULLWIDTH TILDE [Zyyy]=>[ALL]
	],
	[
		// "," <Same>
		'2C', // COMMA [Zyyy]=>[ALL]
		//IDNA:0x2C, // (,) COMMA [Zyyy]=>[ALL]
		//DISALLOW:0x60D, // (؍) ARABIC DATE SEPARATOR [Arab]=>[Arab]
		//DISALLOW:0x66B, // (٫) ARABIC DECIMAL SEPARATOR [Arab]=>[Arab]
		//DISALLOW:0x201A, // (‚) SINGLE LOW-9 QUOTATION MARK [Zyyy]=>[ALL]
		//IDNA:0xB8, // (¸) CEDILLA [Zyyy]=>[ALL]
		//DISALLOW:0xA4F9, // (ꓹ) LISU LETTER TONE NA PO [Lisu]=>[Lisu]
	],
	[
		// "،" <Same>
		'60C', // ARABIC COMMA [Zyyy]=>[Arab,Nkoo,Rohg,Syrc,Thaa,Yezi]
		//DISALLOW:0x60C, // (،) ARABIC COMMA [Zyyy]=>[Arab,Nkoo,Rohg,Syrc,Thaa,Yezi]
		//DISALLOW:0x2E32, // (⸲) TURNED COMMA [Zyyy]=>[ALL]
		//DISALLOW:0x66C, // (٬) ARABIC THOUSANDS SEPARATOR [Arab]=>[Arab]
	],
	[
		// ";" <Same>
		'3B', // SEMICOLON [Zyyy]=>[ALL]
		//IDNA:0x3B, // (;) SEMICOLON [Zyyy]=>[ALL]
		//IDNA:0x37E, // (;) GREEK QUESTION MARK [Zyyy]=>[ALL]
	],
	[
		// "؛" <Same>
		'61B', // ARABIC SEMICOLON [Zyyy]=>[Arab,Nkoo,Rohg,Syrc,Thaa,Yezi]
		//DISALLOW:0x61B, // (؛) ARABIC SEMICOLON [Zyyy]=>[Arab,Nkoo,Rohg,Syrc,Thaa,Yezi]
		//DISALLOW:0x2E35, // (⸵) TURNED SEMICOLON [Zyyy]=>[ALL]
	],
	[
		// ":" <Same>
		'3A', // COLON [Zyyy]=>[ALL]
		//IDNA:0x3A, // (:) COLON [Zyyy]=>[ALL]
		0x903, // (◌ः) DEVANAGARI SIGN VISARGA [Deva]=>[Deva]
		0xA83, // (◌ઃ) GUJARATI SIGN VISARGA [Gujr]=>[Gujr]
		//IDNA:0xFF1A, // (：) FULLWIDTH COLON [Zyyy]=>[ALL]
		//DISALLOW:0x589, // (։) ARMENIAN FULL STOP [Armn]=>[Armn]
		//DISALLOW:0x703, // (܃) SYRIAC SUPRALINEAR COLON [Syrc]=>[Syrc]
		//DISALLOW:0x704, // (܄) SYRIAC SUBLINEAR COLON [Syrc]=>[Syrc]
		//DISALLOW:0x16EC, // (᛬) RUNIC MULTIPLE PUNCTUATION [Zyyy]=>[ALL]
		//IDNA:0xFE30, // (︰) PRESENTATION FORM FOR VERTICAL TWO DOT LEADER [Zyyy]=>[ALL]
		//DISALLOW:0x1803, // (᠃) MONGOLIAN FULL STOP [Zyyy]=>[Mong,Phag]
		//DISALLOW:0x1809, // (᠉) MONGOLIAN MANCHU FULL STOP [Mong]=>[Mong]
		//DISALLOW:0x205A, // (⁚) TWO DOT PUNCTUATION [Zyyy]=>[ALL]
		//DISALLOW:0x5C3, // (׃) HEBREW PUNCTUATION SOF PASUQ [Hebr]=>[Hebr]
		//DISALLOW:0x2F8, // (˸) MODIFIER LETTER RAISED COLON [Zyyy]=>[ALL]
		//DISALLOW:0xA789, // (꞉) MODIFIER LETTER COLON [Zyyy]=>[ALL]
		//DISALLOW:0x2236, // (∶) RATIO [Zyyy]=>[ALL]
		//DISALLOW:0x2D0, // (ː) MODIFIER LETTER TRIANGULAR COLON [Zyyy]=>[ALL]
		//DISALLOW:0xA4FD, // (ꓽ) LISU LETTER TONE MYA JEU [Lisu]=>[Lisu]
	],
	[
		// "::=" <Same>
		'3A 3A 3D', // COLON + COLON + EQUALS SIGN [Zyyy]=>[ALL]
		//IDNA:0x2A74, // (⩴) DOUBLE COLON EQUAL [Zyyy]=>[ALL]
	],
	[
		// ":→" <Same>
		'3A 2192', // COLON + RIGHTWARDS ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x29F4, // (⧴) RULE-DELAYED [Zyyy]=>[ALL]
	],
	[
		// "!" <Same>
		'21', // EXCLAMATION MARK [Zyyy]=>[ALL]
		//IDNA:0x21, // (!) EXCLAMATION MARK [Zyyy]=>[ALL]
		//IDNA:0xFF01, // (！) FULLWIDTH EXCLAMATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x1C3, // (ǃ) LATIN LETTER RETROFLEX CLICK [Latn]=>[Latn]
		0x2D51, // (ⵑ) TIFINAGH LETTER TUAREG YANG [Tfng]=>[Tfng]
	],
	[
		// "!!" <Same>
		'21 21', // EXCLAMATION MARK + EXCLAMATION MARK [Zyyy]=>[ALL]
		//IDNA:0x203C, // (‼) DOUBLE EXCLAMATION MARK [Zyyy]=>[ALL]
	],
	[
		// "!?" <Same>
		'21 3F', // EXCLAMATION MARK + QUESTION MARK [Zyyy]=>[ALL]
		//IDNA:0x2049, // (⁉) EXCLAMATION QUESTION MARK [Zyyy]=>[ALL]
	],
	[
		// "?" <Same>
		'3F', // QUESTION MARK [Zyyy]=>[ALL]
		//IDNA:0x3F, // (?) QUESTION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x294, // (ʔ) LATIN LETTER GLOTTAL STOP [Latn]=>[Latn]
		//IDNA:0x241, // (Ɂ) LATIN CAPITAL LETTER GLOTTAL STOP [Latn]=>[Latn]
		//DISALLOW:0x97D, // (ॽ) DEVANAGARI LETTER GLOTTAL STOP [Deva]=>[Deva]
		0x13AE, // (Ꭾ) CHEROKEE LETTER HE [Cher]=>[Cher]
		0xA6EB, // (ꛫ) BAMUM LETTER NTUU [Bamu]=>[Bamu]
	],
	[
		// "?!" <Same>
		'3F 21', // QUESTION MARK + EXCLAMATION MARK [Zyyy]=>[ALL]
		//IDNA:0x2048, // (⁈) QUESTION EXCLAMATION MARK [Zyyy]=>[ALL]
	],
	[
		// "??" <Same>
		'3F 3F', // QUESTION MARK + QUESTION MARK [Zyyy]=>[ALL]
		//IDNA:0x2047, // (⁇) DOUBLE QUESTION MARK [Zyyy]=>[ALL]
	],
	[
		// "؟" <Same>
		'61F', // ARABIC QUESTION MARK [Zyyy]=>[Adlm,Arab,Nkoo,Rohg,Syrc,Thaa,Yezi]
		//DISALLOW:0x61F, // (؟) ARABIC QUESTION MARK [Zyyy]=>[Adlm,Arab,Nkoo,Rohg,Syrc,Thaa,Yezi]
		//DISALLOW:0x2E2E, // (⸮) REVERSED QUESTION MARK [Zyyy]=>[ALL]
	],
	[
		// "." <Same>
		'2E', // FULL STOP [Zyyy]=>[ALL]
		valid(0x2E), // (.) FULL STOP [Zyyy]=>[ALL]
		//DISALLOW:0x1D16D, // (◌𝅭) MUSICAL SYMBOL COMBINING AUGMENTATION DOT [Zyyy]=>[ALL]
		//IDNA:0x2024, // (․) ONE DOT LEADER [Zyyy]=>[ALL]
		//DISALLOW:0x701, // (܁) SYRIAC SUPRALINEAR FULL STOP [Syrc]=>[Syrc]
		//DISALLOW:0x702, // (܂) SYRIAC SUBLINEAR FULL STOP [Syrc]=>[Syrc]
		//DISALLOW:0xA60E, // (꘎) VAI FULL STOP [Vaii]=>[Vaii]
		//DISALLOW:0x10A50, // (𐩐) KHAROSHTHI PUNCTUATION DOT [Khar]=>[Khar]
		valid(0x660), // (٠) ARABIC-INDIC DIGIT ZERO [Arab]=>[Arab,Thaa,Yezi]
		0x6F0, // (۰) EXTENDED ARABIC-INDIC DIGIT ZERO [Arab]=>[Arab]
		//DISALLOW:0xA4F8, // (ꓸ) LISU LETTER TONE MYA TI [Lisu]=>[Lisu]
	],
	[
		// ".," <Same>
		'2E 2C', // FULL STOP + COMMA [Zyyy]=>[ALL]
		//DISALLOW:0xA4FB, // (ꓻ) LISU LETTER TONE MYA BO [Lisu]=>[Lisu]
	],
	[
		// ".." <Same>
		'2E 2E', // FULL STOP + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x2025, // (‥) TWO DOT LEADER [Zyyy]=>[ALL]
		//DISALLOW:0xA4FA, // (ꓺ) LISU LETTER TONE MYA CYA [Lisu]=>[Lisu]
	],
	[
		// "..." <Same>
		'2E 2E 2E', // FULL STOP + FULL STOP + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x2026, // (…) HORIZONTAL ELLIPSIS [Zyyy]=>[ALL]
	],
	[
		// "꛳꛳" <Same>
		'A6F3 A6F3', // BAMUM FULL STOP + BAMUM FULL STOP [Bamu]=>[Bamu]
		0xA6F4, // (꛴) BAMUM COLON [Bamu]=>[Bamu]
	],
	[
		// "·" <Same>
		'B7', // MIDDLE DOT [Zyyy]=>[ALL]
		//DISALLOW:0xB7, // (·) MIDDLE DOT [Zyyy]=>[ALL]
		allow(0x30FB), // (・) KATAKANA MIDDLE DOT [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
		//IDNA:0xFF65, // (･) HALFWIDTH KATAKANA MIDDLE DOT [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
		//DISALLOW:0x16EB, // (᛫) RUNIC SINGLE PUNCTUATION [Zyyy]=>[ALL]
		//IDNA:0x387, // (·) GREEK ANO TELEIA [Zyyy]=>[ALL]
		//DISALLOW:0x2E31, // (⸱) WORD SEPARATOR MIDDLE DOT [Zyyy]=>[ALL]
		//DISALLOW:0x10101, // (𐄁) AEGEAN WORD SEPARATOR DOT [Zyyy]=>[Cpmn,Cprt,Linb]
		valid(0x2022), // (•) BULLET [Zyyy]=>[ALL]
		//DISALLOW:0x2027, // (‧) HYPHENATION POINT [Zyyy]=>[ALL]
		//DISALLOW:0x2219, // (∙) BULLET OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x22C5, // (⋅) DOT OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0xA78F, // (ꞏ) LATIN LETTER SINOLOGICAL DOT [Latn]=>[Latn]
		//DISALLOW:0x1427, // (ᐧ) CANADIAN SYLLABICS FINAL MIDDLE DOT [Cans]=>[Cans]
	],
	[
		// "···" <Same>
		'B7 B7 B7', // MIDDLE DOT + MIDDLE DOT + MIDDLE DOT [Zyyy]=>[ALL]
		//DISALLOW:0x22EF, // (⋯) MIDLINE HORIZONTAL ELLIPSIS [Zyyy]=>[ALL]
		0x2D48, // (ⵈ) TIFINAGH LETTER TUAREG YAQ [Tfng]=>[Tfng]
	],
	[
		// "·<" <Same>
		'B7 3C', // MIDDLE DOT + LESS-THAN SIGN [Zyyy]=>[ALL]
		0x1444, // (ᑄ) CANADIAN SYLLABICS PWA [Cans]=>[Cans]
	],
	[
		// "·>" <Same>
		'B7 3E', // MIDDLE DOT + GREATER-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x22D7, // (⋗) GREATER-THAN WITH DOT [Zyyy]=>[ALL]
		0x1437, // (ᐷ) CANADIAN SYLLABICS CARRIER HI [Cans]=>[Cans]
		0x1440, // (ᑀ) CANADIAN SYLLABICS PWO [Cans]=>[Cans]
	],
	[
		// "·4" <Same>
		'B7 34', // MIDDLE DOT + DIGIT FOUR [Zyyy]=>[ALL]
		0x152F, // (ᔯ) CANADIAN SYLLABICS YWE [Cans]=>[Cans]
	],
	[
		// "·b" <Same>
		'B7 62', // MIDDLE DOT + LATIN SMALL LETTER B [Zyyy,Latn]=>[Latn]
		0x147E, // (ᑾ) CANADIAN SYLLABICS KWA [Cans]=>[Cans]
	],
	[
		// "·ḃ" <NFC(false) NFD(true)>
		'B7 62 307', // MIDDLE DOT + LATIN SMALL LETTER B + COMBINING DOT ABOVE [Zyyy,Latn,Zinh]=>[Latn]
		0x1480, // (ᒀ) CANADIAN SYLLABICS KWAA [Cans]=>[Cans]
	],
	[
		// "·d" <Same>
		'B7 64', // MIDDLE DOT + LATIN SMALL LETTER D [Zyyy,Latn]=>[Latn]
		0x147A, // (ᑺ) CANADIAN SYLLABICS KWO [Cans]=>[Cans]
	],
	[
		// "·J" <Same>
		'B7 4A', // MIDDLE DOT + LATIN CAPITAL LETTER J [Zyyy,Latn]=>[Latn]
		0x1498, // (ᒘ) CANADIAN SYLLABICS CWO [Cans]=>[Cans]
	],
	[
		// "·L" <Same>
		'B7 4C', // MIDDLE DOT + LATIN CAPITAL LETTER L [Zyyy,Latn]=>[Latn]
		0x14B6, // (ᒶ) CANADIAN SYLLABICS MWA [Cans]=>[Cans]
	],
	[
		// "·P" <Same>
		'B7 50', // MIDDLE DOT + LATIN CAPITAL LETTER P [Zyyy,Latn]=>[Latn]
		0x1476, // (ᑶ) CANADIAN SYLLABICS KWI [Cans]=>[Cans]
	],
	[
		// "·U" <Same>
		'B7 55', // MIDDLE DOT + LATIN CAPITAL LETTER U [Zyyy,Latn]=>[Latn]
		0x1457, // (ᑗ) CANADIAN SYLLABICS TWE [Cans]=>[Cans]
	],
	[
		// "·V" <Same>
		'B7 56', // MIDDLE DOT + LATIN CAPITAL LETTER V [Zyyy,Latn]=>[Latn]
		0x143A, // (ᐺ) CANADIAN SYLLABICS PWE [Cans]=>[Cans]
	],
	[
		// "·Ʌ" <Same>
		'B7 245', // MIDDLE DOT + LATIN CAPITAL LETTER TURNED V [Zyyy,Latn]=>[Latn]
		0x143C, // (ᐼ) CANADIAN SYLLABICS PWI [Cans]=>[Cans]
	],
	[
		// "·Γ" <Same>
		'B7 393', // MIDDLE DOT + GREEK CAPITAL LETTER GAMMA [Zyyy,Grek]=>[Grek]
		0x14AE, // (ᒮ) CANADIAN SYLLABICS MWI [Cans]=>[Cans]
	],
	[
		// "·Δ" <Same>
		'B7 394', // MIDDLE DOT + GREEK CAPITAL LETTER DELTA [Zyyy,Grek]=>[Grek]
		0x140E, // (ᐎ) CANADIAN SYLLABICS WI [Cans]=>[Cans]
	],
	[
		// "·Ո" <Same>
		'B7 548', // MIDDLE DOT + ARMENIAN CAPITAL LETTER VO [Zyyy,Armn]=>[Armn]
		0x1459, // (ᑙ) CANADIAN SYLLABICS TWI [Cans]=>[Cans]
	],
	[
		// "·ᐁ" <Same>
		'B7 1401', // MIDDLE DOT + CANADIAN SYLLABICS E [Zyyy,Cans]=>[Cans]
		0x140C, // (ᐌ) CANADIAN SYLLABICS WE [Cans]=>[Cans]
	],
	[
		// "·ᐄ" <Same>
		'B7 1404', // MIDDLE DOT + CANADIAN SYLLABICS II [Zyyy,Cans]=>[Cans]
		0x1410, // (ᐐ) CANADIAN SYLLABICS WII [Cans]=>[Cans]
	],
	[
		// "·ᐅ" <Same>
		'B7 1405', // MIDDLE DOT + CANADIAN SYLLABICS O [Zyyy,Cans]=>[Cans]
		0x1412, // (ᐒ) CANADIAN SYLLABICS WO [Cans]=>[Cans]
	],
	[
		// "·ᐆ" <Same>
		'B7 1406', // MIDDLE DOT + CANADIAN SYLLABICS OO [Zyyy,Cans]=>[Cans]
		0x1414, // (ᐔ) CANADIAN SYLLABICS WOO [Cans]=>[Cans]
	],
	[
		// "·ᐊ" <Same>
		'B7 140A', // MIDDLE DOT + CANADIAN SYLLABICS A [Zyyy,Cans]=>[Cans]
		0x1417, // (ᐗ) CANADIAN SYLLABICS WA [Cans]=>[Cans]
	],
	[
		// "·ᐋ" <Same>
		'B7 140B', // MIDDLE DOT + CANADIAN SYLLABICS AA [Zyyy,Cans]=>[Cans]
		0x1419, // (ᐙ) CANADIAN SYLLABICS WAA [Cans]=>[Cans]
	],
	[
		// "·ᐲ" <Same>
		'B7 1432', // MIDDLE DOT + CANADIAN SYLLABICS PII [Zyyy,Cans]=>[Cans]
		0x143E, // (ᐾ) CANADIAN SYLLABICS PWII [Cans]=>[Cans]
	],
	[
		// "·ᐴ" <Same>
		'B7 1434', // MIDDLE DOT + CANADIAN SYLLABICS POO [Zyyy,Cans]=>[Cans]
		0x1442, // (ᑂ) CANADIAN SYLLABICS PWOO [Cans]=>[Cans]
	],
	[
		// "·ᐹ" <Same>
		'B7 1439', // MIDDLE DOT + CANADIAN SYLLABICS PAA [Zyyy,Cans]=>[Cans]
		0x1446, // (ᑆ) CANADIAN SYLLABICS PWAA [Cans]=>[Cans]
	],
	[
		// "·ᑏ" <Same>
		'B7 144F', // MIDDLE DOT + CANADIAN SYLLABICS TII [Zyyy,Cans]=>[Cans]
		0x145B, // (ᑛ) CANADIAN SYLLABICS TWII [Cans]=>[Cans]
	],
	[
		// "·ᑐ" <Same>
		'B7 1450', // MIDDLE DOT + CANADIAN SYLLABICS TO [Zyyy,Cans]=>[Cans]
		0x1454, // (ᑔ) CANADIAN SYLLABICS CARRIER DI [Cans]=>[Cans]
		0x145D, // (ᑝ) CANADIAN SYLLABICS TWO [Cans]=>[Cans]
	],
	[
		// "·ᑑ" <Same>
		'B7 1451', // MIDDLE DOT + CANADIAN SYLLABICS TOO [Zyyy,Cans]=>[Cans]
		0x145F, // (ᑟ) CANADIAN SYLLABICS TWOO [Cans]=>[Cans]
	],
	[
		// "·ᑕ" <Same>
		'B7 1455', // MIDDLE DOT + CANADIAN SYLLABICS TA [Zyyy,Cans]=>[Cans]
		0x1461, // (ᑡ) CANADIAN SYLLABICS TWA [Cans]=>[Cans]
	],
	[
		// "·ᑖ" <Same>
		'B7 1456', // MIDDLE DOT + CANADIAN SYLLABICS TAA [Zyyy,Cans]=>[Cans]
		0x1463, // (ᑣ) CANADIAN SYLLABICS TWAA [Cans]=>[Cans]
	],
	[
		// "·ᑫ" <Same>
		'B7 146B', // MIDDLE DOT + CANADIAN SYLLABICS KE [Zyyy,Cans]=>[Cans]
		0x1474, // (ᑴ) CANADIAN SYLLABICS KWE [Cans]=>[Cans]
	],
	[
		// "·ᑮ" <Same>
		'B7 146E', // MIDDLE DOT + CANADIAN SYLLABICS KII [Zyyy,Cans]=>[Cans]
		0x1478, // (ᑸ) CANADIAN SYLLABICS KWII [Cans]=>[Cans]
	],
	[
		// "·ᑰ" <Same>
		'B7 1470', // MIDDLE DOT + CANADIAN SYLLABICS KOO [Zyyy,Cans]=>[Cans]
		0x147C, // (ᑼ) CANADIAN SYLLABICS KWOO [Cans]=>[Cans]
	],
	[
		// "·ᒉ" <Same>
		'B7 1489', // MIDDLE DOT + CANADIAN SYLLABICS CE [Zyyy,Cans]=>[Cans]
		0x1492, // (ᒒ) CANADIAN SYLLABICS CWE [Cans]=>[Cans]
	],
	[
		// "·ᒋ" <Same>
		'B7 148B', // MIDDLE DOT + CANADIAN SYLLABICS CI [Zyyy,Cans]=>[Cans]
		0x1494, // (ᒔ) CANADIAN SYLLABICS CWI [Cans]=>[Cans]
	],
	[
		// "·ᒌ" <Same>
		'B7 148C', // MIDDLE DOT + CANADIAN SYLLABICS CII [Zyyy,Cans]=>[Cans]
		0x1496, // (ᒖ) CANADIAN SYLLABICS CWII [Cans]=>[Cans]
	],
	[
		// "·ᒎ" <Same>
		'B7 148E', // MIDDLE DOT + CANADIAN SYLLABICS COO [Zyyy,Cans]=>[Cans]
		0x149A, // (ᒚ) CANADIAN SYLLABICS CWOO [Cans]=>[Cans]
	],
	[
		// "·ᒐ" <Same>
		'B7 1490', // MIDDLE DOT + CANADIAN SYLLABICS CA [Zyyy,Cans]=>[Cans]
		0x149C, // (ᒜ) CANADIAN SYLLABICS CWA [Cans]=>[Cans]
	],
	[
		// "·ᒑ" <Same>
		'B7 1491', // MIDDLE DOT + CANADIAN SYLLABICS CAA [Zyyy,Cans]=>[Cans]
		0x149E, // (ᒞ) CANADIAN SYLLABICS CWAA [Cans]=>[Cans]
	],
	[
		// "·ᒣ" <Same>
		'B7 14A3', // MIDDLE DOT + CANADIAN SYLLABICS ME [Zyyy,Cans]=>[Cans]
		0x14AC, // (ᒬ) CANADIAN SYLLABICS MWE [Cans]=>[Cans]
	],
	[
		// "·ᒦ" <Same>
		'B7 14A6', // MIDDLE DOT + CANADIAN SYLLABICS MII [Zyyy,Cans]=>[Cans]
		0x14B0, // (ᒰ) CANADIAN SYLLABICS MWII [Cans]=>[Cans]
	],
	[
		// "·ᒧ" <Same>
		'B7 14A7', // MIDDLE DOT + CANADIAN SYLLABICS MO [Zyyy,Cans]=>[Cans]
		0x14B2, // (ᒲ) CANADIAN SYLLABICS MWO [Cans]=>[Cans]
	],
	[
		// "·ᒨ" <Same>
		'B7 14A8', // MIDDLE DOT + CANADIAN SYLLABICS MOO [Zyyy,Cans]=>[Cans]
		0x14B4, // (ᒴ) CANADIAN SYLLABICS MWOO [Cans]=>[Cans]
	],
	[
		// "·ᒫ" <Same>
		'B7 14AB', // MIDDLE DOT + CANADIAN SYLLABICS MAA [Zyyy,Cans]=>[Cans]
		0x14B8, // (ᒸ) CANADIAN SYLLABICS MWAA [Cans]=>[Cans]
	],
	[
		// "·ᓀ" <Same>
		'B7 14C0', // MIDDLE DOT + CANADIAN SYLLABICS NE [Zyyy,Cans]=>[Cans]
		0x14C9, // (ᓉ) CANADIAN SYLLABICS NWE [Cans]=>[Cans]
	],
	[
		// "·ᓂ" <Same>
		'B7 14C2', // MIDDLE DOT + CANADIAN SYLLABICS NI [Zyyy,Cans]=>[Cans]
		0x18C6, // (ᣆ) CANADIAN SYLLABICS NWI [Cans]=>[Cans]
	],
	[
		// "·ᓃ" <Same>
		'B7 14C3', // MIDDLE DOT + CANADIAN SYLLABICS NII [Zyyy,Cans]=>[Cans]
		0x18C8, // (ᣈ) CANADIAN SYLLABICS NWII [Cans]=>[Cans]
	],
	[
		// "·ᓄ" <Same>
		'B7 14C4', // MIDDLE DOT + CANADIAN SYLLABICS NO [Zyyy,Cans]=>[Cans]
		0x18CA, // (ᣊ) CANADIAN SYLLABICS NWO [Cans]=>[Cans]
	],
	[
		// "·ᓅ" <Same>
		'B7 14C5', // MIDDLE DOT + CANADIAN SYLLABICS NOO [Zyyy,Cans]=>[Cans]
		0x18CC, // (ᣌ) CANADIAN SYLLABICS NWOO [Cans]=>[Cans]
	],
	[
		// "·ᓇ" <Same>
		'B7 14C7', // MIDDLE DOT + CANADIAN SYLLABICS NA [Zyyy,Cans]=>[Cans]
		0x14CB, // (ᓋ) CANADIAN SYLLABICS NWA [Cans]=>[Cans]
	],
	[
		// "·ᓈ" <Same>
		'B7 14C8', // MIDDLE DOT + CANADIAN SYLLABICS NAA [Zyyy,Cans]=>[Cans]
		0x14CD, // (ᓍ) CANADIAN SYLLABICS NWAA [Cans]=>[Cans]
	],
	[
		// "·ᓓ" <Same>
		'B7 14D3', // MIDDLE DOT + CANADIAN SYLLABICS LE [Zyyy,Cans]=>[Cans]
		0x14DC, // (ᓜ) CANADIAN SYLLABICS LWE [Cans]=>[Cans]
	],
	[
		// "·ᓕ" <Same>
		'B7 14D5', // MIDDLE DOT + CANADIAN SYLLABICS LI [Zyyy,Cans]=>[Cans]
		0x14DE, // (ᓞ) CANADIAN SYLLABICS LWI [Cans]=>[Cans]
	],
	[
		// "·ᓖ" <Same>
		'B7 14D6', // MIDDLE DOT + CANADIAN SYLLABICS LII [Zyyy,Cans]=>[Cans]
		0x14E0, // (ᓠ) CANADIAN SYLLABICS LWII [Cans]=>[Cans]
	],
	[
		// "·ᓗ" <Same>
		'B7 14D7', // MIDDLE DOT + CANADIAN SYLLABICS LO [Zyyy,Cans]=>[Cans]
		0x14E2, // (ᓢ) CANADIAN SYLLABICS LWO [Cans]=>[Cans]
	],
	[
		// "·ᓘ" <Same>
		'B7 14D8', // MIDDLE DOT + CANADIAN SYLLABICS LOO [Zyyy,Cans]=>[Cans]
		0x14E4, // (ᓤ) CANADIAN SYLLABICS LWOO [Cans]=>[Cans]
	],
	[
		// "·ᓚ" <Same>
		'B7 14DA', // MIDDLE DOT + CANADIAN SYLLABICS LA [Zyyy,Cans]=>[Cans]
		0x14E6, // (ᓦ) CANADIAN SYLLABICS LWA [Cans]=>[Cans]
	],
	[
		// "·ᓛ" <Same>
		'B7 14DB', // MIDDLE DOT + CANADIAN SYLLABICS LAA [Zyyy,Cans]=>[Cans]
		0x14E8, // (ᓨ) CANADIAN SYLLABICS LWAA [Cans]=>[Cans]
	],
	[
		// "·ᓭ" <Same>
		'B7 14ED', // MIDDLE DOT + CANADIAN SYLLABICS SE [Zyyy,Cans]=>[Cans]
		0x14F6, // (ᓶ) CANADIAN SYLLABICS SWE [Cans]=>[Cans]
	],
	[
		// "·ᓯ" <Same>
		'B7 14EF', // MIDDLE DOT + CANADIAN SYLLABICS SI [Zyyy,Cans]=>[Cans]
		0x14F8, // (ᓸ) CANADIAN SYLLABICS SWI [Cans]=>[Cans]
	],
	[
		// "·ᓰ" <Same>
		'B7 14F0', // MIDDLE DOT + CANADIAN SYLLABICS SII [Zyyy,Cans]=>[Cans]
		0x14FA, // (ᓺ) CANADIAN SYLLABICS SWII [Cans]=>[Cans]
	],
	[
		// "·ᓱ" <Same>
		'B7 14F1', // MIDDLE DOT + CANADIAN SYLLABICS SO [Zyyy,Cans]=>[Cans]
		0x14FC, // (ᓼ) CANADIAN SYLLABICS SWO [Cans]=>[Cans]
	],
	[
		// "·ᓲ" <Same>
		'B7 14F2', // MIDDLE DOT + CANADIAN SYLLABICS SOO [Zyyy,Cans]=>[Cans]
		0x14FE, // (ᓾ) CANADIAN SYLLABICS SWOO [Cans]=>[Cans]
	],
	[
		// "·ᓴ" <Same>
		'B7 14F4', // MIDDLE DOT + CANADIAN SYLLABICS SA [Zyyy,Cans]=>[Cans]
		0x1500, // (ᔀ) CANADIAN SYLLABICS SWA [Cans]=>[Cans]
	],
	[
		// "·ᓵ" <Same>
		'B7 14F5', // MIDDLE DOT + CANADIAN SYLLABICS SAA [Zyyy,Cans]=>[Cans]
		0x1502, // (ᔂ) CANADIAN SYLLABICS SWAA [Cans]=>[Cans]
	],
	[
		// "·ᔐ" <Same>
		'B7 1510', // MIDDLE DOT + CANADIAN SYLLABICS SHE [Zyyy,Cans]=>[Cans]
		0x1517, // (ᔗ) CANADIAN SYLLABICS SHWE [Cans]=>[Cans]
	],
	[
		// "·ᔑ" <Same>
		'B7 1511', // MIDDLE DOT + CANADIAN SYLLABICS SHI [Zyyy,Cans]=>[Cans]
		0x1519, // (ᔙ) CANADIAN SYLLABICS SHWI [Cans]=>[Cans]
	],
	[
		// "·ᔒ" <Same>
		'B7 1512', // MIDDLE DOT + CANADIAN SYLLABICS SHII [Zyyy,Cans]=>[Cans]
		0x151B, // (ᔛ) CANADIAN SYLLABICS SHWII [Cans]=>[Cans]
	],
	[
		// "·ᔓ" <Same>
		'B7 1513', // MIDDLE DOT + CANADIAN SYLLABICS SHO [Zyyy,Cans]=>[Cans]
		0x151D, // (ᔝ) CANADIAN SYLLABICS SHWO [Cans]=>[Cans]
	],
	[
		// "·ᔔ" <Same>
		'B7 1514', // MIDDLE DOT + CANADIAN SYLLABICS SHOO [Zyyy,Cans]=>[Cans]
		0x151F, // (ᔟ) CANADIAN SYLLABICS SHWOO [Cans]=>[Cans]
	],
	[
		// "·ᔕ" <Same>
		'B7 1515', // MIDDLE DOT + CANADIAN SYLLABICS SHA [Zyyy,Cans]=>[Cans]
		0x1521, // (ᔡ) CANADIAN SYLLABICS SHWA [Cans]=>[Cans]
	],
	[
		// "·ᔖ" <Same>
		'B7 1516', // MIDDLE DOT + CANADIAN SYLLABICS SHAA [Zyyy,Cans]=>[Cans]
		0x1523, // (ᔣ) CANADIAN SYLLABICS SHWAA [Cans]=>[Cans]
	],
	[
		// "·ᔨ" <Same>
		'B7 1528', // MIDDLE DOT + CANADIAN SYLLABICS YI [Zyyy,Cans]=>[Cans]
		0x1531, // (ᔱ) CANADIAN SYLLABICS YWI [Cans]=>[Cans]
	],
	[
		// "·ᔩ" <Same>
		'B7 1529', // MIDDLE DOT + CANADIAN SYLLABICS YII [Zyyy,Cans]=>[Cans]
		0x1533, // (ᔳ) CANADIAN SYLLABICS YWII [Cans]=>[Cans]
	],
	[
		// "·ᔪ" <Same>
		'B7 152A', // MIDDLE DOT + CANADIAN SYLLABICS YO [Zyyy,Cans]=>[Cans]
		0x1535, // (ᔵ) CANADIAN SYLLABICS YWO [Cans]=>[Cans]
	],
	[
		// "·ᔫ" <Same>
		'B7 152B', // MIDDLE DOT + CANADIAN SYLLABICS YOO [Zyyy,Cans]=>[Cans]
		0x1537, // (ᔷ) CANADIAN SYLLABICS YWOO [Cans]=>[Cans]
	],
	[
		// "·ᔭ" <Same>
		'B7 152D', // MIDDLE DOT + CANADIAN SYLLABICS YA [Zyyy,Cans]=>[Cans]
		0x1539, // (ᔹ) CANADIAN SYLLABICS YWA [Cans]=>[Cans]
	],
	[
		// "·ᔮ" <Same>
		'B7 152E', // MIDDLE DOT + CANADIAN SYLLABICS YAA [Zyyy,Cans]=>[Cans]
		0x153B, // (ᔻ) CANADIAN SYLLABICS YWAA [Cans]=>[Cans]
	],
	[
		// "·ᕃ" <Same>
		'B7 1543', // MIDDLE DOT + CANADIAN SYLLABICS R-CREE RE [Zyyy,Cans]=>[Cans]
		0x18CE, // (ᣎ) CANADIAN SYLLABICS RWEE [Cans]=>[Cans]
	],
	[
		// "·ᕆ" <Same>
		'B7 1546', // MIDDLE DOT + CANADIAN SYLLABICS RI [Zyyy,Cans]=>[Cans]
		0x18CF, // (ᣏ) CANADIAN SYLLABICS RWI [Cans]=>[Cans]
	],
	[
		// "·ᕇ" <Same>
		'B7 1547', // MIDDLE DOT + CANADIAN SYLLABICS RII [Zyyy,Cans]=>[Cans]
		0x18D0, // (ᣐ) CANADIAN SYLLABICS RWII [Cans]=>[Cans]
	],
	[
		// "·ᕈ" <Same>
		'B7 1548', // MIDDLE DOT + CANADIAN SYLLABICS RO [Zyyy,Cans]=>[Cans]
		0x18D1, // (ᣑ) CANADIAN SYLLABICS RWO [Cans]=>[Cans]
	],
	[
		// "·ᕉ" <Same>
		'B7 1549', // MIDDLE DOT + CANADIAN SYLLABICS ROO [Zyyy,Cans]=>[Cans]
		0x18D2, // (ᣒ) CANADIAN SYLLABICS RWOO [Cans]=>[Cans]
	],
	[
		// "·ᕋ" <Same>
		'B7 154B', // MIDDLE DOT + CANADIAN SYLLABICS RA [Zyyy,Cans]=>[Cans]
		0x18D3, // (ᣓ) CANADIAN SYLLABICS RWA [Cans]=>[Cans]
	],
	[
		// "·ᕌ" <Same>
		'B7 154C', // MIDDLE DOT + CANADIAN SYLLABICS RAA [Zyyy,Cans]=>[Cans]
		0x154E, // (ᕎ) CANADIAN SYLLABICS RWAA [Cans]=>[Cans]
	],
	[
		// "·ᕚ" <Same>
		'B7 155A', // MIDDLE DOT + CANADIAN SYLLABICS FAA [Zyyy,Cans]=>[Cans]
		0x155B, // (ᕛ) CANADIAN SYLLABICS FWAA [Cans]=>[Cans]
	],
	[
		// "·ᕧ" <Same>
		'B7 1567', // MIDDLE DOT + CANADIAN SYLLABICS THAA [Zyyy,Cans]=>[Cans]
		0x1568, // (ᕨ) CANADIAN SYLLABICS THWAA [Cans]=>[Cans]
	],
	[
		// "·ᢱ" <Same>
		'B7 18B1', // MIDDLE DOT + CANADIAN SYLLABICS AY [Zyyy,Cans]=>[Cans]
		0x18B3, // (ᢳ) CANADIAN SYLLABICS WAY [Cans]=>[Cans]
	],
	[
		// "·ᢴ" <Same>
		'B7 18B4', // MIDDLE DOT + CANADIAN SYLLABICS POY [Zyyy,Cans]=>[Cans]
		0x18B6, // (ᢶ) CANADIAN SYLLABICS PWOY [Cans]=>[Cans]
	],
	[
		// "·ᢸ" <Same>
		'B7 18B8', // MIDDLE DOT + CANADIAN SYLLABICS KAY [Zyyy,Cans]=>[Cans]
		0x18B9, // (ᢹ) CANADIAN SYLLABICS KWAY [Cans]=>[Cans]
	],
	[
		// "·ᣀ" <Same>
		'B7 18C0', // MIDDLE DOT + CANADIAN SYLLABICS SHOY [Zyyy,Cans]=>[Cans]
		0x18C2, // (ᣂ) CANADIAN SYLLABICS SHWOY [Cans]=>[Cans]
	],
	[
		// "।" <Same>
		'964', // DEVANAGARI DANDA [Zyyy]=>[Beng,Deva Dogr,Gong,Gonm,Gran,Gujr,Guru,Knda,Mahj,Mlym,Nand,Orya,Sind,Sinh,Sylo,Takr,Taml,Telu,Tirh]
		//DISALLOW:0x964, // (।) DEVANAGARI DANDA [Zyyy]=>[Beng,Deva Dogr,Gong,Gonm,Gran,Gujr,Guru,Knda,Mahj,Mlym,Nand,Orya,Sind,Sinh,Sylo,Takr,Taml,Telu,Tirh]
		//DISALLOW:0xA830, // (꠰) NORTH INDIC FRACTION ONE QUARTER [Zyyy]=>[Deva Dogr,Gujr,Guru,Khoj,Knda,Kthi,Mahj,Mlym,Modi,Nand,Sind,Takr,Tirh]
	],
	[
		// "।।" <Same>
		'964 964', // DEVANAGARI DANDA + DEVANAGARI DANDA [Zyyy]=>[Beng,Deva Dogr,Gong,Gonm,Gran,Gujr,Guru,Knda,Mahj,Mlym,Nand,Orya,Sind,Sinh,Sylo,Takr,Taml,Telu,Tirh]
		//DISALLOW:0x965, // (॥) DEVANAGARI DOUBLE DANDA [Zyyy]=>[Beng,Deva Dogr,Gong,Gonm,Gran,Gujr,Guru,Knda,Limb,Mahj,Mlym,Nand,Orya,Sind,Sinh,Sylo,Takr,Taml,Telu,Tirh]
	],
	[
		// "᰻᰻" <Same>
		'1C3B 1C3B', // LEPCHA PUNCTUATION TA-ROL + LEPCHA PUNCTUATION TA-ROL [Lepc]=>[Lepc]
		//DISALLOW:0x1C3C, // (᰼) LEPCHA PUNCTUATION NYET THYOOM TA-ROL [Lepc]=>[Lepc]
	],
	[
		// "၊၊" <Same>
		'104A 104A', // MYANMAR SIGN LITTLE SECTION + MYANMAR SIGN LITTLE SECTION [Mymr]=>[Mymr]
		//DISALLOW:0x104B, // (။) MYANMAR SIGN SECTION [Mymr]=>[Mymr]
	],
	[
		// "᪨᪨" <Same>
		'1AA8 1AA8', // TAI THAM SIGN KAAN + TAI THAM SIGN KAAN [Lana]=>[Lana]
		//DISALLOW:0x1AA9, // (᪩) TAI THAM SIGN KAANKUU [Lana]=>[Lana]
	],
	[
		// "᪪᪨" <Same>
		'1AAA 1AA8', // TAI THAM SIGN SATKAAN + TAI THAM SIGN KAAN [Lana]=>[Lana]
		//DISALLOW:0x1AAB, // (᪫) TAI THAM SIGN SATKAANKUU [Lana]=>[Lana]
	],
	[
		// "᭞᭞" <Same>
		'1B5E 1B5E', // BALINESE CARIK SIKI + BALINESE CARIK SIKI [Bali]=>[Bali]
		//DISALLOW:0x1B5F, // (᭟) BALINESE CARIK PAREREN [Bali]=>[Bali]
	],
	[
		// "𐩖𐩖" <Same>
		'10A56 10A56', // KHAROSHTHI PUNCTUATION DANDA + KHAROSHTHI PUNCTUATION DANDA [Khar]=>[Khar]
		//DISALLOW:0x10A57, // (𐩗) KHAROSHTHI PUNCTUATION DOUBLE DANDA [Khar]=>[Khar]
	],
	[
		// "𑑋𑑋" <Same>
		'1144B 1144B', // NEWA DANDA + NEWA DANDA [Newa]=>[Newa]
		//DISALLOW:0x1144C, // (𑑌) NEWA DOUBLE DANDA [Newa]=>[Newa]
	],
	[
		// "𑙁𑙁" <Same>
		'11641 11641', // MODI DANDA + MODI DANDA [Modi]=>[Modi]
		//DISALLOW:0x11642, // (𑙂) MODI DOUBLE DANDA [Modi]=>[Modi]
	],
	[
		// "𑱁𑱁" <Same>
		'11C41 11C41', // BHAIKSUKI DANDA + BHAIKSUKI DANDA [Bhks]=>[Bhks]
		//DISALLOW:0x11C42, // (𑱂) BHAIKSUKI DOUBLE DANDA [Bhks]=>[Bhks]
	],
	[
		// "᱾᱾" <Same>
		'1C7E 1C7E', // OL CHIKI PUNCTUATION MUCAAD + OL CHIKI PUNCTUATION MUCAAD [Olck]=>[Olck]
		//DISALLOW:0x1C7F, // (᱿) OL CHIKI PUNCTUATION DOUBLE MUCAAD [Olck]=>[Olck]
	],
	[
		// "'" <Same>
		'27', // APOSTROPHE [Zyyy]=>[ALL]
		//IDNA:0x27, // (') APOSTROPHE [Zyyy]=>[ALL]
		//DISALLOW:0x55D, // (՝) ARMENIAN COMMA [Armn]=>[Armn]
		//IDNA:0xFF07, // (＇) FULLWIDTH APOSTROPHE [Zyyy]=>[ALL]
		//DISALLOW:0x2018, // (‘) LEFT SINGLE QUOTATION MARK [Zyyy]=>[ALL]
		valid(0x2019), // (’) RIGHT SINGLE QUOTATION MARK [Zyyy]=>[ALL] (fenced)
		//DISALLOW:0x201B, // (‛) SINGLE HIGH-REVERSED-9 QUOTATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x2032, // (′) PRIME [Zyyy]=>[ALL]
		//DISALLOW:0x2035, // (‵) REVERSED PRIME [Zyyy]=>[ALL]
		//DISALLOW:0x55A, // (՚) ARMENIAN APOSTROPHE [Armn]=>[Armn]
		0x5F3, // (׳) HEBREW PUNCTUATION GERESH [Hebr]=>[Hebr]
		//IDNA:0x60, // (`) GRAVE ACCENT [Zyyy]=>[ALL]
		//IDNA:0x1FEF, // (`) GREEK VARIA [Grek]=>[Grek]
		//IDNA:0xFF40, // (｀) FULLWIDTH GRAVE ACCENT [Zyyy]=>[ALL]
		//IDNA:0xB4, // (´) ACUTE ACCENT [Zyyy]=>[ALL]
		//IDNA:0x384, // (΄) GREEK TONOS [Grek]=>[Grek]
		//IDNA:0x1FFD, // (´) GREEK OXIA [Grek]=>[Grek]
		//IDNA:0x1FBD, // (᾽) GREEK KORONIS [Grek]=>[Grek]
		//IDNA:0x1FBF, // (᾿) GREEK PSILI [Grek]=>[Grek]
		//IDNA:0x1FFE, // (῾) GREEK DASIA [Grek]=>[Grek]
		//DISALLOW:0x2B9, // (ʹ) MODIFIER LETTER PRIME [Zyyy]=>[ALL]
		//IDNA:0x374, // (ʹ) GREEK NUMERAL SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2C8, // (ˈ) MODIFIER LETTER VERTICAL LINE [Zyyy]=>[ALL]
		//DISALLOW:0x2CA, // (ˊ) MODIFIER LETTER ACUTE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2CB, // (ˋ) MODIFIER LETTER GRAVE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2F4, // (˴) MODIFIER LETTER MIDDLE GRAVE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2BB, // (ʻ) MODIFIER LETTER TURNED COMMA [Zyyy]=>[ALL]
		//DISALLOW:0x2BD, // (ʽ) MODIFIER LETTER REVERSED COMMA [Zyyy]=>[ALL]
		//DISALLOW:0x2BC, // (ʼ) MODIFIER LETTER APOSTROPHE [Zyyy]=>[ALL]
		//DISALLOW:0x2BE, // (ʾ) MODIFIER LETTER RIGHT HALF RING [Zyyy]=>[ALL]
		//DISALLOW:0xA78C, // (ꞌ) LATIN SMALL LETTER SALTILLO [Latn]=>[Latn]
		0x5D9, // (י) HEBREW LETTER YOD [Hebr]=>[Hebr]
		//DISALLOW:0x7F4, // (ߴ) NKO HIGH TONE APOSTROPHE [Nkoo]=>[Nkoo]
		//DISALLOW:0x7F5, // (ߵ) NKO LOW TONE APOSTROPHE [Nkoo]=>[Nkoo]
		0x144A, // (ᑊ) CANADIAN SYLLABICS WEST-CREE P [Cans]=>[Cans]
		0x16CC, // (ᛌ) RUNIC LETTER SHORT-TWIG-SOL S [Runr]=>[Runr]
		0x16F51, // (◌𖽑) MIAO SIGN ASPIRATION [Plrd]=>[Plrd]
		0x16F52, // (◌𖽒) MIAO SIGN REFORMED VOICING [Plrd]=>[Plrd]
	],
	[
		// "''" <Same>
		'27 27', // APOSTROPHE + APOSTROPHE [Zyyy]=>[ALL]
		//DISALLOW:0x1CD3, // (᳓) VEDIC SIGN NIHSHVASA [Zyyy]=>[Deva,Gran]
		//IDNA:0x22, // (") QUOTATION MARK [Zyyy]=>[ALL]
		//IDNA:0xFF02, // (＂) FULLWIDTH QUOTATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x201C, // (“) LEFT DOUBLE QUOTATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x201D, // (”) RIGHT DOUBLE QUOTATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x201F, // (‟) DOUBLE HIGH-REVERSED-9 QUOTATION MARK [Zyyy]=>[ALL]
		//IDNA:0x2033, // (″) DOUBLE PRIME [Zyyy]=>[ALL]
		//IDNA:0x2036, // (‶) REVERSED DOUBLE PRIME [Zyyy]=>[ALL]
		//DISALLOW:0x3003, // (〃) DITTO MARK [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Hanb,Jpan,Kore]
		//DISALLOW:0x5F4, // (״) HEBREW PUNCTUATION GERSHAYIM [Hebr]=>[Hebr]
		//IDNA:0x2DD, // (˝) DOUBLE ACUTE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2BA, // (ʺ) MODIFIER LETTER DOUBLE PRIME [Zyyy]=>[ALL]
		//DISALLOW:0x2F6, // (˶) MODIFIER LETTER MIDDLE DOUBLE ACUTE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2EE, // (ˮ) MODIFIER LETTER DOUBLE APOSTROPHE [Zyyy]=>[ALL]
		0x5F2, // (ײ) HEBREW LIGATURE YIDDISH DOUBLE YOD [Hebr]=>[Hebr]
	],
	[
		// "'''" <Same>
		'27 27 27', // APOSTROPHE + APOSTROPHE + APOSTROPHE [Zyyy]=>[ALL]
		//IDNA:0x2034, // (‴) TRIPLE PRIME [Zyyy]=>[ALL]
		//IDNA:0x2037, // (‷) REVERSED TRIPLE PRIME [Zyyy]=>[ALL]
	],
	[
		// "''''" <Same>
		'27 27 27 27', // APOSTROPHE + APOSTROPHE + APOSTROPHE + APOSTROPHE [Zyyy]=>[ALL]
		//IDNA:0x2057, // (⁗) QUADRUPLE PRIME [Zyyy]=>[ALL]
	],
	[
		// "'B" <Same>
		'27 42', // APOSTROPHE + LATIN CAPITAL LETTER B [Zyyy,Latn]=>[Latn]
		//IDNA:0x181, // (Ɓ) LATIN CAPITAL LETTER B WITH HOOK [Latn]=>[Latn]
	],
	[
		// "'D" <Same>
		'27 44', // APOSTROPHE + LATIN CAPITAL LETTER D [Zyyy,Latn]=>[Latn]
		//IDNA:0x18A, // (Ɗ) LATIN CAPITAL LETTER D WITH HOOK [Latn]=>[Latn]
	],
	[
		// "'n" <Same>
		'27 6E', // APOSTROPHE + LATIN SMALL LETTER N [Zyyy,Latn]=>[Latn]
		//IDNA:0x149, // (ŉ) LATIN SMALL LETTER N PRECEDED BY APOSTROPHE [Latn]=>[Latn]
	],
	[
		// "'P" <Same>
		'27 50', // APOSTROPHE + LATIN CAPITAL LETTER P [Zyyy,Latn]=>[Latn]
		//IDNA:0x1A4, // (Ƥ) LATIN CAPITAL LETTER P WITH HOOK [Latn]=>[Latn]
	],
	[
		// "'T" <Same>
		'27 54', // APOSTROPHE + LATIN CAPITAL LETTER T [Zyyy,Latn]=>[Latn]
		//IDNA:0x1AC, // (Ƭ) LATIN CAPITAL LETTER T WITH HOOK [Latn]=>[Latn]
	],
	[
		// "'Y" <Same>
		'27 59', // APOSTROPHE + LATIN CAPITAL LETTER Y [Zyyy,Latn]=>[Latn]
		//IDNA:0x1B3, // (Ƴ) LATIN CAPITAL LETTER Y WITH HOOK [Latn]=>[Latn]
	],
	[
		// "(" <Same>
		'28', // LEFT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x28, // (() LEFT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0xFF3B, // (［) FULLWIDTH LEFT SQUARE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x2768, // (❨) MEDIUM LEFT PARENTHESIS ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x2772, // (❲) LIGHT LEFT TORTOISE SHELL BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x3014, // (〔) LEFT TORTOISE SHELL BRACKET [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
		//DISALLOW:0xFD3E, // (﴾) ORNATE LEFT PARENTHESIS [Zyyy]=>[Arab,Nkoo]
	],
	[
		// "((" <Same>
		'28 28', // LEFT PARENTHESIS + LEFT PARENTHESIS [Zyyy]=>[ALL]
		//DISALLOW:0x2E28, // (⸨) LEFT DOUBLE PARENTHESIS [Zyyy]=>[ALL]
	],
	[
		// "(ー)" <Same>
		'28 30FC 29', // LEFT PARENTHESIS + KATAKANA-HIRAGANA PROLONGED SOUND MARK + RIGHT PARENTHESIS [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0x3220, // (㈠) PARENTHESIZED IDEOGRAPH ONE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(2)" <Same>
		'28 32 29', // LEFT PARENTHESIS + DIGIT TWO + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x2475, // (⑵) PARENTHESIZED DIGIT TWO [Zyyy]=>[ALL]
	],
	[
		// "(2O)" <Same>
		'28 32 4F 29', // LEFT PARENTHESIS + DIGIT TWO + LATIN CAPITAL LETTER O + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2487, // (⒇) PARENTHESIZED NUMBER TWENTY [Zyyy]=>[ALL]
	],
	[
		// "(3)" <Same>
		'28 33 29', // LEFT PARENTHESIS + DIGIT THREE + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x2476, // (⑶) PARENTHESIZED DIGIT THREE [Zyyy]=>[ALL]
	],
	[
		// "(4)" <Same>
		'28 34 29', // LEFT PARENTHESIS + DIGIT FOUR + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x2477, // (⑷) PARENTHESIZED DIGIT FOUR [Zyyy]=>[ALL]
	],
	[
		// "(5)" <Same>
		'28 35 29', // LEFT PARENTHESIS + DIGIT FIVE + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x2478, // (⑸) PARENTHESIZED DIGIT FIVE [Zyyy]=>[ALL]
	],
	[
		// "(6)" <Same>
		'28 36 29', // LEFT PARENTHESIS + DIGIT SIX + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x2479, // (⑹) PARENTHESIZED DIGIT SIX [Zyyy]=>[ALL]
	],
	[
		// "(7)" <Same>
		'28 37 29', // LEFT PARENTHESIS + DIGIT SEVEN + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x247A, // (⑺) PARENTHESIZED DIGIT SEVEN [Zyyy]=>[ALL]
	],
	[
		// "(8)" <Same>
		'28 38 29', // LEFT PARENTHESIS + DIGIT EIGHT + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x247B, // (⑻) PARENTHESIZED DIGIT EIGHT [Zyyy]=>[ALL]
	],
	[
		// "(9)" <Same>
		'28 39 29', // LEFT PARENTHESIS + DIGIT NINE + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x247C, // (⑼) PARENTHESIZED DIGIT NINE [Zyyy]=>[ALL]
	],
	[
		// "(a)" <Same>
		'28 61 29', // LEFT PARENTHESIS + LATIN SMALL LETTER A + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x249C, // (⒜) PARENTHESIZED LATIN SMALL LETTER A [Zyyy]=>[ALL]
	],
	[
		// "(A)" <Same>
		'28 41 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER A + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F110, // (🄐) PARENTHESIZED LATIN CAPITAL LETTER A [Zyyy]=>[ALL]
	],
	[
		// "(b)" <Same>
		'28 62 29', // LEFT PARENTHESIS + LATIN SMALL LETTER B + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x249D, // (⒝) PARENTHESIZED LATIN SMALL LETTER B [Zyyy]=>[ALL]
	],
	[
		// "(B)" <Same>
		'28 42 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER B + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F111, // (🄑) PARENTHESIZED LATIN CAPITAL LETTER B [Zyyy]=>[ALL]
	],
	[
		// "(c)" <Same>
		'28 63 29', // LEFT PARENTHESIS + LATIN SMALL LETTER C + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x249E, // (⒞) PARENTHESIZED LATIN SMALL LETTER C [Zyyy]=>[ALL]
	],
	[
		// "(C)" <Same>
		'28 43 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER C + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F112, // (🄒) PARENTHESIZED LATIN CAPITAL LETTER C [Zyyy]=>[ALL]
	],
	[
		// "(d)" <Same>
		'28 64 29', // LEFT PARENTHESIS + LATIN SMALL LETTER D + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x249F, // (⒟) PARENTHESIZED LATIN SMALL LETTER D [Zyyy]=>[ALL]
	],
	[
		// "(D)" <Same>
		'28 44 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER D + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F113, // (🄓) PARENTHESIZED LATIN CAPITAL LETTER D [Zyyy]=>[ALL]
	],
	[
		// "(e)" <Same>
		'28 65 29', // LEFT PARENTHESIS + LATIN SMALL LETTER E + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A0, // (⒠) PARENTHESIZED LATIN SMALL LETTER E [Zyyy]=>[ALL]
	],
	[
		// "(E)" <Same>
		'28 45 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER E + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F114, // (🄔) PARENTHESIZED LATIN CAPITAL LETTER E [Zyyy]=>[ALL]
	],
	[
		// "(f)" <Same>
		'28 66 29', // LEFT PARENTHESIS + LATIN SMALL LETTER F + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A1, // (⒡) PARENTHESIZED LATIN SMALL LETTER F [Zyyy]=>[ALL]
	],
	[
		// "(F)" <Same>
		'28 46 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER F + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F115, // (🄕) PARENTHESIZED LATIN CAPITAL LETTER F [Zyyy]=>[ALL]
	],
	[
		// "(g)" <Same>
		'28 67 29', // LEFT PARENTHESIS + LATIN SMALL LETTER G + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A2, // (⒢) PARENTHESIZED LATIN SMALL LETTER G [Zyyy]=>[ALL]
	],
	[
		// "(G)" <Same>
		'28 47 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER G + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F116, // (🄖) PARENTHESIZED LATIN CAPITAL LETTER G [Zyyy]=>[ALL]
	],
	[
		// "(h)" <Same>
		'28 68 29', // LEFT PARENTHESIS + LATIN SMALL LETTER H + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A3, // (⒣) PARENTHESIZED LATIN SMALL LETTER H [Zyyy]=>[ALL]
	],
	[
		// "(H)" <Same>
		'28 48 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER H + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F117, // (🄗) PARENTHESIZED LATIN CAPITAL LETTER H [Zyyy]=>[ALL]
	],
	[
		// "(i)" <Same>
		'28 69 29', // LEFT PARENTHESIS + LATIN SMALL LETTER I + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A4, // (⒤) PARENTHESIZED LATIN SMALL LETTER I [Zyyy]=>[ALL]
	],
	[
		// "(j)" <Same>
		'28 6A 29', // LEFT PARENTHESIS + LATIN SMALL LETTER J + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A5, // (⒥) PARENTHESIZED LATIN SMALL LETTER J [Zyyy]=>[ALL]
	],
	[
		// "(J)" <Same>
		'28 4A 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER J + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F119, // (🄙) PARENTHESIZED LATIN CAPITAL LETTER J [Zyyy]=>[ALL]
	],
	[
		// "(k)" <Same>
		'28 6B 29', // LEFT PARENTHESIS + LATIN SMALL LETTER K + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A6, // (⒦) PARENTHESIZED LATIN SMALL LETTER K [Zyyy]=>[ALL]
	],
	[
		// "(K)" <Same>
		'28 4B 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER K + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F11A, // (🄚) PARENTHESIZED LATIN CAPITAL LETTER K [Zyyy]=>[ALL]
	],
	[
		// "(l)" <Same>
		'28 6C 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2474, // (⑴) PARENTHESIZED DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x1F118, // (🄘) PARENTHESIZED LATIN CAPITAL LETTER I [Zyyy]=>[ALL]
		//IDNA:0x24A7, // (⒧) PARENTHESIZED LATIN SMALL LETTER L [Zyyy]=>[ALL]
	],
	[
		// "(L)" <Same>
		'28 4C 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER L + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F11B, // (🄛) PARENTHESIZED LATIN CAPITAL LETTER L [Zyyy]=>[ALL]
	],
	[
		// "(l2)" <Same>
		'28 6C 32 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT TWO + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x247F, // (⑿) PARENTHESIZED NUMBER TWELVE [Zyyy]=>[ALL]
	],
	[
		// "(l3)" <Same>
		'28 6C 33 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT THREE + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2480, // (⒀) PARENTHESIZED NUMBER THIRTEEN [Zyyy]=>[ALL]
	],
	[
		// "(l4)" <Same>
		'28 6C 34 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT FOUR + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2481, // (⒁) PARENTHESIZED NUMBER FOURTEEN [Zyyy]=>[ALL]
	],
	[
		// "(l5)" <Same>
		'28 6C 35 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT FIVE + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2482, // (⒂) PARENTHESIZED NUMBER FIFTEEN [Zyyy]=>[ALL]
	],
	[
		// "(l6)" <Same>
		'28 6C 36 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT SIX + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2483, // (⒃) PARENTHESIZED NUMBER SIXTEEN [Zyyy]=>[ALL]
	],
	[
		// "(l7)" <Same>
		'28 6C 37 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT SEVEN + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2484, // (⒄) PARENTHESIZED NUMBER SEVENTEEN [Zyyy]=>[ALL]
	],
	[
		// "(l8)" <Same>
		'28 6C 38 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT EIGHT + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2485, // (⒅) PARENTHESIZED NUMBER EIGHTEEN [Zyyy]=>[ALL]
	],
	[
		// "(l9)" <Same>
		'28 6C 39 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + DIGIT NINE + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x2486, // (⒆) PARENTHESIZED NUMBER NINETEEN [Zyyy]=>[ALL]
	],
	[
		// "(ll)" <Same>
		'28 6C 6C 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + LATIN SMALL LETTER L + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x247E, // (⑾) PARENTHESIZED NUMBER ELEVEN [Zyyy]=>[ALL]
	],
	[
		// "(lO)" <Same>
		'28 6C 4F 29', // LEFT PARENTHESIS + LATIN SMALL LETTER L + LATIN CAPITAL LETTER O + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x247D, // (⑽) PARENTHESIZED NUMBER TEN [Zyyy]=>[ALL]
	],
	[
		// "(M)" <Same>
		'28 4D 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER M + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F11C, // (🄜) PARENTHESIZED LATIN CAPITAL LETTER M [Zyyy]=>[ALL]
	],
	[
		// "(n)" <Same>
		'28 6E 29', // LEFT PARENTHESIS + LATIN SMALL LETTER N + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A9, // (⒩) PARENTHESIZED LATIN SMALL LETTER N [Zyyy]=>[ALL]
	],
	[
		// "(N)" <Same>
		'28 4E 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER N + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F11D, // (🄝) PARENTHESIZED LATIN CAPITAL LETTER N [Zyyy]=>[ALL]
	],
	[
		// "(o)" <Same>
		'28 6F 29', // LEFT PARENTHESIS + LATIN SMALL LETTER O + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24AA, // (⒪) PARENTHESIZED LATIN SMALL LETTER O [Zyyy]=>[ALL]
	],
	[
		// "(O)" <Same>
		'28 4F 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER O + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F11E, // (🄞) PARENTHESIZED LATIN CAPITAL LETTER O [Zyyy]=>[ALL]
	],
	[
		// "(p)" <Same>
		'28 70 29', // LEFT PARENTHESIS + LATIN SMALL LETTER P + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24AB, // (⒫) PARENTHESIZED LATIN SMALL LETTER P [Zyyy]=>[ALL]
	],
	[
		// "(P)" <Same>
		'28 50 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER P + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F11F, // (🄟) PARENTHESIZED LATIN CAPITAL LETTER P [Zyyy]=>[ALL]
	],
	[
		// "(q)" <Same>
		'28 71 29', // LEFT PARENTHESIS + LATIN SMALL LETTER Q + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24AC, // (⒬) PARENTHESIZED LATIN SMALL LETTER Q [Zyyy]=>[ALL]
	],
	[
		// "(Q)" <Same>
		'28 51 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER Q + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F120, // (🄠) PARENTHESIZED LATIN CAPITAL LETTER Q [Zyyy]=>[ALL]
	],
	[
		// "(r)" <Same>
		'28 72 29', // LEFT PARENTHESIS + LATIN SMALL LETTER R + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24AD, // (⒭) PARENTHESIZED LATIN SMALL LETTER R [Zyyy]=>[ALL]
	],
	[
		// "(R)" <Same>
		'28 52 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER R + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F121, // (🄡) PARENTHESIZED LATIN CAPITAL LETTER R [Zyyy]=>[ALL]
	],
	[
		// "(rn)" <Same>
		'28 72 6E 29', // LEFT PARENTHESIS + LATIN SMALL LETTER R + LATIN SMALL LETTER N + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24A8, // (⒨) PARENTHESIZED LATIN SMALL LETTER M [Zyyy]=>[ALL]
	],
	[
		// "(s)" <Same>
		'28 73 29', // LEFT PARENTHESIS + LATIN SMALL LETTER S + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24AE, // (⒮) PARENTHESIZED LATIN SMALL LETTER S [Zyyy]=>[ALL]
	],
	[
		// "(S)" <Same>
		'28 53 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER S + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F122, // (🄢) PARENTHESIZED LATIN CAPITAL LETTER S [Zyyy]=>[ALL]
		//IDNA:0x1F12A, // (🄪) TORTOISE SHELL BRACKETED LATIN CAPITAL LETTER S [Zyyy]=>[ALL]
	],
	[
		// "(t)" <Same>
		'28 74 29', // LEFT PARENTHESIS + LATIN SMALL LETTER T + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24AF, // (⒯) PARENTHESIZED LATIN SMALL LETTER T [Zyyy]=>[ALL]
	],
	[
		// "(T)" <Same>
		'28 54 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER T + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F123, // (🄣) PARENTHESIZED LATIN CAPITAL LETTER T [Zyyy]=>[ALL]
	],
	[
		// "(u)" <Same>
		'28 75 29', // LEFT PARENTHESIS + LATIN SMALL LETTER U + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24B0, // (⒰) PARENTHESIZED LATIN SMALL LETTER U [Zyyy]=>[ALL]
	],
	[
		// "(U)" <Same>
		'28 55 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER U + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F124, // (🄤) PARENTHESIZED LATIN CAPITAL LETTER U [Zyyy]=>[ALL]
	],
	[
		// "(v)" <Same>
		'28 76 29', // LEFT PARENTHESIS + LATIN SMALL LETTER V + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24B1, // (⒱) PARENTHESIZED LATIN SMALL LETTER V [Zyyy]=>[ALL]
	],
	[
		// "(V)" <Same>
		'28 56 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER V + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F125, // (🄥) PARENTHESIZED LATIN CAPITAL LETTER V [Zyyy]=>[ALL]
	],
	[
		// "(w)" <Same>
		'28 77 29', // LEFT PARENTHESIS + LATIN SMALL LETTER W + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24B2, // (⒲) PARENTHESIZED LATIN SMALL LETTER W [Zyyy]=>[ALL]
	],
	[
		// "(W)" <Same>
		'28 57 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER W + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F126, // (🄦) PARENTHESIZED LATIN CAPITAL LETTER W [Zyyy]=>[ALL]
	],
	[
		// "(x)" <Same>
		'28 78 29', // LEFT PARENTHESIS + LATIN SMALL LETTER X + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24B3, // (⒳) PARENTHESIZED LATIN SMALL LETTER X [Zyyy]=>[ALL]
	],
	[
		// "(X)" <Same>
		'28 58 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER X + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F127, // (🄧) PARENTHESIZED LATIN CAPITAL LETTER X [Zyyy]=>[ALL]
	],
	[
		// "(y)" <Same>
		'28 79 29', // LEFT PARENTHESIS + LATIN SMALL LETTER Y + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24B4, // (⒴) PARENTHESIZED LATIN SMALL LETTER Y [Zyyy]=>[ALL]
	],
	[
		// "(Y)" <Same>
		'28 59 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER Y + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F128, // (🄨) PARENTHESIZED LATIN CAPITAL LETTER Y [Zyyy]=>[ALL]
	],
	[
		// "(z)" <Same>
		'28 7A 29', // LEFT PARENTHESIS + LATIN SMALL LETTER Z + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x24B5, // (⒵) PARENTHESIZED LATIN SMALL LETTER Z [Zyyy]=>[ALL]
	],
	[
		// "(Z)" <Same>
		'28 5A 29', // LEFT PARENTHESIS + LATIN CAPITAL LETTER Z + RIGHT PARENTHESIS [Zyyy,Latn]=>[Latn]
		//IDNA:0x1F129, // (🄩) PARENTHESIZED LATIN CAPITAL LETTER Z [Zyyy]=>[ALL]
	],
	[
		// "(ᄀ)" <Same>
		'28 1100 29', // LEFT PARENTHESIS + HANGUL CHOSEONG KIYEOK + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3200, // (㈀) PARENTHESIZED HANGUL KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "(가)" <NFC(true) NFD(false)>
		'28 AC00 29', // LEFT PARENTHESIS + Hangul Syllable-AC00 <1/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x320E, // (㈎) PARENTHESIZED HANGUL KIYEOK A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄂ)" <Same>
		'28 1102 29', // LEFT PARENTHESIS + HANGUL CHOSEONG NIEUN + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3201, // (㈁) PARENTHESIZED HANGUL NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "(나)" <NFC(true) NFD(false)>
		'28 B098 29', // LEFT PARENTHESIS + Hangul Syllable-B098 <1177/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x320F, // (㈏) PARENTHESIZED HANGUL NIEUN A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄃ)" <Same>
		'28 1103 29', // LEFT PARENTHESIS + HANGUL CHOSEONG TIKEUT + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3202, // (㈂) PARENTHESIZED HANGUL TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "(다)" <NFC(true) NFD(false)>
		'28 B2E4 29', // LEFT PARENTHESIS + Hangul Syllable-B2E4 <1765/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3210, // (㈐) PARENTHESIZED HANGUL TIKEUT A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄅ)" <Same>
		'28 1105 29', // LEFT PARENTHESIS + HANGUL CHOSEONG RIEUL + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3203, // (㈃) PARENTHESIZED HANGUL RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "(라)" <NFC(true) NFD(false)>
		'28 B77C 29', // LEFT PARENTHESIS + Hangul Syllable-B77C <2941/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3211, // (㈑) PARENTHESIZED HANGUL RIEUL A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄆ)" <Same>
		'28 1106 29', // LEFT PARENTHESIS + HANGUL CHOSEONG MIEUM + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3204, // (㈄) PARENTHESIZED HANGUL MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "(마)" <NFC(true) NFD(false)>
		'28 B9C8 29', // LEFT PARENTHESIS + Hangul Syllable-B9C8 <3529/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3212, // (㈒) PARENTHESIZED HANGUL MIEUM A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄇ)" <Same>
		'28 1107 29', // LEFT PARENTHESIS + HANGUL CHOSEONG PIEUP + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3205, // (㈅) PARENTHESIZED HANGUL PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "(바)" <NFC(true) NFD(false)>
		'28 BC14 29', // LEFT PARENTHESIS + Hangul Syllable-BC14 <4117/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3213, // (㈓) PARENTHESIZED HANGUL PIEUP A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄉ)" <Same>
		'28 1109 29', // LEFT PARENTHESIS + HANGUL CHOSEONG SIOS + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3206, // (㈆) PARENTHESIZED HANGUL SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "(사)" <NFC(true) NFD(false)>
		'28 C0AC 29', // LEFT PARENTHESIS + Hangul Syllable-C0AC <5293/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3214, // (㈔) PARENTHESIZED HANGUL SIOS A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄋ)" <Same>
		'28 110B 29', // LEFT PARENTHESIS + HANGUL CHOSEONG IEUNG + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3207, // (㈇) PARENTHESIZED HANGUL IEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "(아)" <NFC(true) NFD(false)>
		'28 C544 29', // LEFT PARENTHESIS + Hangul Syllable-C544 <6469/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3215, // (㈕) PARENTHESIZED HANGUL IEUNG A [Hang]=>[Hang,Kore]
	],
	[
		// "(오전)" <NFC(true) NFD(false)>
		'28 C624 C804 29', // LEFT PARENTHESIS + Hangul Syllable-C624 <6693/11172> + Hangul Syllable-C804 <7173/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x321D, // (㈝) PARENTHESIZED KOREAN CHARACTER OJEON [Hang]=>[Hang,Kore]
	],
	[
		// "(오후)" <NFC(true) NFD(false)>
		'28 C624 D6C4 29', // LEFT PARENTHESIS + Hangul Syllable-C624 <6693/11172> + Hangul Syllable-D6C4 <10949/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x321E, // (㈞) PARENTHESIZED KOREAN CHARACTER O HU [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄌ)" <Same>
		'28 110C 29', // LEFT PARENTHESIS + HANGUL CHOSEONG CIEUC + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3208, // (㈈) PARENTHESIZED HANGUL CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "(자)" <NFC(true) NFD(false)>
		'28 C790 29', // LEFT PARENTHESIS + Hangul Syllable-C790 <7057/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3216, // (㈖) PARENTHESIZED HANGUL CIEUC A [Hang]=>[Hang,Kore]
	],
	[
		// "(주)" <NFC(true) NFD(false)>
		'28 C8FC 29', // LEFT PARENTHESIS + Hangul Syllable-C8FC <7421/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x321C, // (㈜) PARENTHESIZED HANGUL CIEUC U [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄎ)" <Same>
		'28 110E 29', // LEFT PARENTHESIS + HANGUL CHOSEONG CHIEUCH + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3209, // (㈉) PARENTHESIZED HANGUL CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "(차)" <NFC(true) NFD(false)>
		'28 CC28 29', // LEFT PARENTHESIS + Hangul Syllable-CC28 <8233/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3217, // (㈗) PARENTHESIZED HANGUL CHIEUCH A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄏ)" <Same>
		'28 110F 29', // LEFT PARENTHESIS + HANGUL CHOSEONG KHIEUKH + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x320A, // (㈊) PARENTHESIZED HANGUL KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "(카)" <NFC(true) NFD(false)>
		'28 CE74 29', // LEFT PARENTHESIS + Hangul Syllable-CE74 <8821/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3218, // (㈘) PARENTHESIZED HANGUL KHIEUKH A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄐ)" <Same>
		'28 1110 29', // LEFT PARENTHESIS + HANGUL CHOSEONG THIEUTH + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x320B, // (㈋) PARENTHESIZED HANGUL THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "(타)" <NFC(true) NFD(false)>
		'28 D0C0 29', // LEFT PARENTHESIS + Hangul Syllable-D0C0 <9409/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x3219, // (㈙) PARENTHESIZED HANGUL THIEUTH A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄑ)" <Same>
		'28 1111 29', // LEFT PARENTHESIS + HANGUL CHOSEONG PHIEUPH + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x320C, // (㈌) PARENTHESIZED HANGUL PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "(파)" <NFC(true) NFD(false)>
		'28 D30C 29', // LEFT PARENTHESIS + Hangul Syllable-D30C <9997/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x321A, // (㈚) PARENTHESIZED HANGUL PHIEUPH A [Hang]=>[Hang,Kore]
	],
	[
		// "(ᄒ)" <Same>
		'28 1112 29', // LEFT PARENTHESIS + HANGUL CHOSEONG HIEUH + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x320D, // (㈍) PARENTHESIZED HANGUL HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "(하)" <NFC(true) NFD(false)>
		'28 D558 29', // LEFT PARENTHESIS + Hangul Syllable-D558 <10585/11172> + RIGHT PARENTHESIS [Zyyy,Hang]=>[Hang,Kore]
		//IDNA:0x321B, // (㈛) PARENTHESIZED HANGUL HIEUH A [Hang]=>[Hang,Kore]
	],
	[
		// "(七)" <Same>
		'28 4E03 29', // LEFT PARENTHESIS + CJK Ideograph-4E03 <4/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3226, // (㈦) PARENTHESIZED IDEOGRAPH SEVEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(三)" <Same>
		'28 4E09 29', // LEFT PARENTHESIS + CJK Ideograph-4E09 <10/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3222, // (㈢) PARENTHESIZED IDEOGRAPH THREE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F241, // (🉁) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-4E09 [Zyyy]=>[ALL]
	],
	[
		// "(九)" <Same>
		'28 4E5D 29', // LEFT PARENTHESIS + CJK Ideograph-4E5D <94/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3228, // (㈨) PARENTHESIZED IDEOGRAPH NINE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(二)" <Same>
		'28 4E8C 29', // LEFT PARENTHESIS + CJK Ideograph-4E8C <141/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3221, // (㈡) PARENTHESIZED IDEOGRAPH TWO [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F242, // (🉂) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-4E8C [Zyyy]=>[ALL]
	],
	[
		// "(五)" <Same>
		'28 4E94 29', // LEFT PARENTHESIS + CJK Ideograph-4E94 <149/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3224, // (㈤) PARENTHESIZED IDEOGRAPH FIVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(代)" <Same>
		'28 4EE3 29', // LEFT PARENTHESIS + CJK Ideograph-4EE3 <228/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3239, // (㈹) PARENTHESIZED IDEOGRAPH REPRESENT [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(企)" <Same>
		'28 4F01 29', // LEFT PARENTHESIS + CJK Ideograph-4F01 <258/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x323D, // (㈽) PARENTHESIZED IDEOGRAPH ENTERPRISE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(休)" <Same>
		'28 4F11 29', // LEFT PARENTHESIS + CJK Ideograph-4F11 <274/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3241, // (㉁) PARENTHESIZED IDEOGRAPH REST [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(八)" <Same>
		'28 516B 29', // LEFT PARENTHESIS + CJK Ideograph-516B <876/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3227, // (㈧) PARENTHESIZED IDEOGRAPH EIGHT [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(六)" <Same>
		'28 516D 29', // LEFT PARENTHESIS + CJK Ideograph-516D <878/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3225, // (㈥) PARENTHESIZED IDEOGRAPH SIX [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(労)" <Same>
		'28 52B4 29', // LEFT PARENTHESIS + CJK Ideograph-52B4 <1205/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3238, // (㈸) PARENTHESIZED IDEOGRAPH LABOR [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(勝)" <Same>
		'28 52DD 29', // LEFT PARENTHESIS + CJK Ideograph-52DD <1246/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F247, // (🉇) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-52DD [Zyyy]=>[ALL]
	],
	[
		// "(十)" <Same>
		'28 5341 29', // LEFT PARENTHESIS + CJK Ideograph-5341 <1346/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3229, // (㈩) PARENTHESIZED IDEOGRAPH TEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(協)" <Same>
		'28 5354 29', // LEFT PARENTHESIS + CJK Ideograph-5354 <1365/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x323F, // (㈿) PARENTHESIZED IDEOGRAPH ALLIANCE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(名)" <Same>
		'28 540D 29', // LEFT PARENTHESIS + CJK Ideograph-540D <1550/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3234, // (㈴) PARENTHESIZED IDEOGRAPH NAME [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(呼)" <Same>
		'28 547C 29', // LEFT PARENTHESIS + CJK Ideograph-547C <1661/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x323A, // (㈺) PARENTHESIZED IDEOGRAPH CALL [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(四)" <Same>
		'28 56DB 29', // LEFT PARENTHESIS + CJK Ideograph-56DB <2268/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3223, // (㈣) PARENTHESIZED IDEOGRAPH FOUR [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(土)" <Same>
		'28 571F 29', // LEFT PARENTHESIS + CJK Ideograph-571F <2336/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x322F, // (㈯) PARENTHESIZED IDEOGRAPH EARTH [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(学)" <Same>
		'28 5B66 29', // LEFT PARENTHESIS + CJK Ideograph-5B66 <3431/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x323B, // (㈻) PARENTHESIZED IDEOGRAPH STUDY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(安)" <Same>
		'28 5B89 29', // LEFT PARENTHESIS + CJK Ideograph-5B89 <3466/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F243, // (🉃) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-5B89 [Zyyy]=>[ALL]
	],
	[
		// "(打)" <Same>
		'28 6253 29', // LEFT PARENTHESIS + CJK Ideograph-6253 <5204/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F245, // (🉅) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-6253 [Zyyy]=>[ALL]
	],
	[
		// "(敗)" <Same>
		'28 6557 29', // LEFT PARENTHESIS + CJK Ideograph-6557 <5976/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F248, // (🉈) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-6557 [Zyyy]=>[ALL]
	],
	[
		// "(日)" <Same>
		'28 65E5 29', // LEFT PARENTHESIS + CJK Ideograph-65E5 <6118/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3230, // (㈰) PARENTHESIZED IDEOGRAPH SUN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(月)" <Same>
		'28 6708 29', // LEFT PARENTHESIS + CJK Ideograph-6708 <6409/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x322A, // (㈪) PARENTHESIZED IDEOGRAPH MOON [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(有)" <Same>
		'28 6709 29', // LEFT PARENTHESIS + CJK Ideograph-6709 <6410/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3232, // (㈲) PARENTHESIZED IDEOGRAPH HAVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(木)" <Same>
		'28 6728 29', // LEFT PARENTHESIS + CJK Ideograph-6728 <6441/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x322D, // (㈭) PARENTHESIZED IDEOGRAPH WOOD [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(本)" <Same>
		'28 672C 29', // LEFT PARENTHESIS + CJK Ideograph-672C <6445/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F240, // (🉀) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-672C [Zyyy]=>[ALL]
	],
	[
		// "(株)" <Same>
		'28 682A 29', // LEFT PARENTHESIS + CJK Ideograph-682A <6699/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3231, // (㈱) PARENTHESIZED IDEOGRAPH STOCK [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(水)" <Same>
		'28 6C34 29', // LEFT PARENTHESIS + CJK Ideograph-6C34 <7733/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x322C, // (㈬) PARENTHESIZED IDEOGRAPH WATER [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(火)" <Same>
		'28 706B 29', // LEFT PARENTHESIS + CJK Ideograph-706B <8812/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x322B, // (㈫) PARENTHESIZED IDEOGRAPH FIRE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(点)" <Same>
		'28 70B9 29', // LEFT PARENTHESIS + CJK Ideograph-70B9 <8890/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F244, // (🉄) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-70B9 [Zyyy]=>[ALL]
	],
	[
		// "(特)" <Same>
		'28 7279 29', // LEFT PARENTHESIS + CJK Ideograph-7279 <9338/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3235, // (㈵) PARENTHESIZED IDEOGRAPH SPECIAL [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(盗)" <Same>
		'28 76D7 29', // LEFT PARENTHESIS + CJK Ideograph-76D7 <10456/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x1F246, // (🉆) TORTOISE SHELL BRACKETED CJK UNIFIED IDEOGRAPH-76D7 [Zyyy]=>[ALL]
	],
	[
		// "(監)" <Same>
		'28 76E3 29', // LEFT PARENTHESIS + CJK Ideograph-76E3 <10468/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x323C, // (㈼) PARENTHESIZED IDEOGRAPH SUPERVISE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(社)" <Same>
		'28 793E 29', // LEFT PARENTHESIS + CJK Ideograph-793E <11071/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3233, // (㈳) PARENTHESIZED IDEOGRAPH SOCIETY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(祝)" <Same>
		'28 795D 29', // LEFT PARENTHESIS + CJK Ideograph-795D <11102/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3237, // (㈷) PARENTHESIZED IDEOGRAPH CONGRATULATION [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(祭)" <Same>
		'28 796D 29', // LEFT PARENTHESIS + CJK Ideograph-796D <11118/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3240, // (㉀) PARENTHESIZED IDEOGRAPH FESTIVAL [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(自)" <Same>
		'28 81EA 29', // LEFT PARENTHESIS + CJK Ideograph-81EA <13291/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3242, // (㉂) PARENTHESIZED IDEOGRAPH SELF [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(至)" <Same>
		'28 81F3 29', // LEFT PARENTHESIS + CJK Ideograph-81F3 <13300/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3243, // (㉃) PARENTHESIZED IDEOGRAPH REACH [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(財)" <Same>
		'28 8CA1 29', // LEFT PARENTHESIS + CJK Ideograph-8CA1 <16034/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3236, // (㈶) PARENTHESIZED IDEOGRAPH FINANCIAL [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(資)" <Same>
		'28 8CC7 29', // LEFT PARENTHESIS + CJK Ideograph-8CC7 <16072/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x323E, // (㈾) PARENTHESIZED IDEOGRAPH RESOURCE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "(金)" <Same>
		'28 91D1 29', // LEFT PARENTHESIS + CJK Ideograph-91D1 <17362/20992> + RIGHT PARENTHESIS [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x322E, // (㈮) PARENTHESIZED IDEOGRAPH METAL [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// ")" <Same>
		'29', // RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0x29, // ()) RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0xFF3D, // (］) FULLWIDTH RIGHT SQUARE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x2769, // (❩) MEDIUM RIGHT PARENTHESIS ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x2773, // (❳) LIGHT RIGHT TORTOISE SHELL BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x3015, // (〕) RIGHT TORTOISE SHELL BRACKET [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
		//DISALLOW:0xFD3F, // (﴿) ORNATE RIGHT PARENTHESIS [Zyyy]=>[Arab,Nkoo]
	],
	[
		// "))" <Same>
		'29 29', // RIGHT PARENTHESIS + RIGHT PARENTHESIS [Zyyy]=>[ALL]
		//DISALLOW:0x2E29, // (⸩) RIGHT DOUBLE PARENTHESIS [Zyyy]=>[ALL]
	],
	[
		// "{" <Same>
		'7B', // LEFT CURLY BRACKET [Zyyy]=>[ALL]
		//IDNA:0x7B, // ({) LEFT CURLY BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x2774, // (❴) MEDIUM LEFT CURLY BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x1D114, // (𝄔) MUSICAL SYMBOL BRACE [Zyyy]=>[ALL]
	],
	[
		// "}" <Same>
		'7D', // RIGHT CURLY BRACKET [Zyyy]=>[ALL]
		//IDNA:0x7D, // (}) RIGHT CURLY BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x2775, // (❵) MEDIUM RIGHT CURLY BRACKET ORNAMENT [Zyyy]=>[ALL]
	],
	[
		// "⟦" <Same>
		'27E6', // MATHEMATICAL LEFT WHITE SQUARE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x27E6, // (⟦) MATHEMATICAL LEFT WHITE SQUARE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x301A, // (〚) LEFT WHITE SQUARE BRACKET [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
	],
	[
		// "⟧" <Same>
		'27E7', // MATHEMATICAL RIGHT WHITE SQUARE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x27E7, // (⟧) MATHEMATICAL RIGHT WHITE SQUARE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x301B, // (〛) RIGHT WHITE SQUARE BRACKET [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
	],
	[
		// "❬" <Same>
		'276C', // MEDIUM LEFT-POINTING ANGLE BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x276C, // (❬) MEDIUM LEFT-POINTING ANGLE BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x27E8, // (⟨) MATHEMATICAL LEFT ANGLE BRACKET [Zyyy]=>[ALL]
		//IDNA:0x2329, // (〈) LEFT-POINTING ANGLE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x3008, // (〈) LEFT ANGLE BRACKET [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
		//DISALLOW:0x31DB, // (㇛) CJK STROKE PD [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		0x304F, // (く) HIRAGANA LETTER KU [Hira]=>[Hira,Jpan]
		0x21FE8, // (𡿨) CJK Ideograph Extension B-21FE8 <8169/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "❭" <Same>
		'276D', // MEDIUM RIGHT-POINTING ANGLE BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x276D, // (❭) MEDIUM RIGHT-POINTING ANGLE BRACKET ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x27E9, // (⟩) MATHEMATICAL RIGHT ANGLE BRACKET [Zyyy]=>[ALL]
		//IDNA:0x232A, // (〉) RIGHT-POINTING ANGLE BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x3009, // (〉) RIGHT ANGLE BRACKET [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
	],
	[
		// "︿" <Same>
		'FE3F', // PRESENTATION FORM FOR VERTICAL LEFT ANGLE BRACKET [Zyyy]=>[ALL]
		//IDNA:0xFE3F, // (︿) PRESENTATION FORM FOR VERTICAL LEFT ANGLE BRACKET [Zyyy]=>[ALL]
		//IDNA:0xFF3E, // (＾) FULLWIDTH CIRCUMFLEX ACCENT [Zyyy]=>[ALL]
	],
	[
		// "¶" <Same>
		'B6', // PILCROW SIGN [Zyyy]=>[ALL]
		//DISALLOW:0xB6, // (¶) PILCROW SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2E3F, // (⸿) CAPITULUM [Zyyy]=>[ALL]
	],
	[
		// "*" <Same>
		'2A', // ASTERISK [Zyyy]=>[ALL]
		//IDNA:0x2A, // (*) ASTERISK [Zyyy]=>[ALL]
		//DISALLOW:0x204E, // (⁎) LOW ASTERISK [Zyyy]=>[ALL]
		//DISALLOW:0x66D, // (٭) ARABIC FIVE POINTED STAR [Arab]=>[Arab]
		//DISALLOW:0x2217, // (∗) ASTERISK OPERATOR [Zyyy]=>[ALL]
		0x1031F, // (𐌟) OLD ITALIC LETTER ESS [Ital]=>[Ital]
	],
	[
		// "/" <Same>
		'2F', // SOLIDUS [Zyyy]=>[ALL]
		//IDNA:0x2F, // (/) SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x1735, // (᜵) PHILIPPINE SINGLE PUNCTUATION [Zyyy]=>[Buhd,Hano,Tagb,Tglg]
		//DISALLOW:0x2041, // (⁁) CARET INSERTION POINT [Zyyy]=>[ALL]
		//DISALLOW:0x2215, // (∕) DIVISION SLASH [Zyyy]=>[ALL]
		0x2044, // (⁄) FRACTION SLASH [Zyyy]=>[ALL]
		//DISALLOW:0x2571, // (╱) BOX DRAWINGS LIGHT DIAGONAL UPPER RIGHT TO LOWER LEFT [Zyyy]=>[ALL]
		//DISALLOW:0x27CB, // (⟋) MATHEMATICAL RISING DIAGONAL [Zyyy]=>[ALL]
		//DISALLOW:0x29F8, // (⧸) BIG SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x1D23A, // (𝈺) GREEK INSTRUMENTAL NOTATION SYMBOL-47 [Grek]=>[Grek]
		//DISALLOW:0x31D3, // (㇓) CJK STROKE SP [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0x3033, // (〳) VERTICAL KANA REPEAT MARK UPPER HALF [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0x2CC6, // (Ⳇ) COPTIC CAPITAL LETTER OLD COPTIC ESH [Copt]=>[Copt]
		0x30CE, // (ノ) KATAKANA LETTER NO [Kana]=>[Kana,Jpan]
		0x4E3F, // (丿) CJK Ideograph-4E3F <64/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F03, // (⼃) KANGXI RADICAL SLASH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "/̄" <Same>
		'2F 304', // SOLIDUS + COMBINING MACRON [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x29F6, // (⧶) SOLIDUS WITH OVERBAR [Zyyy]=>[ALL]
	],
	[
		// "//" <Same>
		'2F 2F', // SOLIDUS + SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x2AFD, // (⫽) DOUBLE SOLIDUS OPERATOR [Zyyy]=>[ALL]
	],
	[
		// "///" <Same>
		'2F 2F 2F', // SOLIDUS + SOLIDUS + SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x2AFB, // (⫻) TRIPLE SOLIDUS BINARY RELATION [Zyyy]=>[ALL]
	],
	[
		// "\" <Same>
		'5C', // REVERSE SOLIDUS [Zyyy]=>[ALL]
		//IDNA:0x5C, // (\) REVERSE SOLIDUS [Zyyy]=>[ALL]
		//IDNA:0xFF3C, // (＼) FULLWIDTH REVERSE SOLIDUS [Zyyy]=>[ALL]
		//IDNA:0xFE68, // (﹨) SMALL REVERSE SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x2216, // (∖) SET MINUS [Zyyy]=>[ALL]
		//DISALLOW:0x27CD, // (⟍) MATHEMATICAL FALLING DIAGONAL [Zyyy]=>[ALL]
		//DISALLOW:0x29F5, // (⧵) REVERSE SOLIDUS OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x29F9, // (⧹) BIG REVERSE SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x1D20F, // (𝈏) GREEK VOCAL NOTATION SYMBOL-16 [Grek]=>[Grek]
		//DISALLOW:0x1D23B, // (𝈻) GREEK INSTRUMENTAL NOTATION SYMBOL-48 [Grek]=>[Grek]
		//DISALLOW:0x31D4, // (㇔) CJK STROKE D [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		0x4E36, // (丶) CJK Ideograph-4E36 <55/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F02, // (⼂) KANGXI RADICAL DOT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "\\" <Same>
		'5C 5C', // REVERSE SOLIDUS + REVERSE SOLIDUS [Zyyy]=>[ALL]
		//DISALLOW:0x2CF9, // (⳹) COPTIC OLD NUBIAN FULL STOP [Copt]=>[Copt]
		//DISALLOW:0x244A, // (⑊) OCR DOUBLE BACKSLASH [Zyyy]=>[ALL]
	],
	[
		// "\ᑕ" <Same>
		'5C 1455', // REVERSE SOLIDUS + CANADIAN SYLLABICS TA [Zyyy,Cans]=>[Cans]
		//DISALLOW:0x27C8, // (⟈) REVERSE SOLIDUS PRECEDING SUBSET [Zyyy]=>[ALL]
	],
	[
		// "&" <Same>
		'26', // AMPERSAND [Zyyy]=>[ALL]
		//IDNA:0x26, // (&) AMPERSAND [Zyyy]=>[ALL]
		//DISALLOW:0xA778, // (ꝸ) LATIN SMALL LETTER UM [Latn]=>[Latn]
	],
	[
		// "॰" <Same>
		'970', // DEVANAGARI ABBREVIATION SIGN [Deva]=>[Deva]
		//DISALLOW:0x970, // (॰) DEVANAGARI ABBREVIATION SIGN [Deva]=>[Deva]
		//DISALLOW:0xAF0, // (૰) GUJARATI ABBREVIATION SIGN [Gujr]=>[Gujr]
		0x110BB, // (𑂻) KAITHI ABBREVIATION SIGN [Kthi]=>[Kthi]
		0x111C7, // (𑇇) SHARADA ABBREVIATION SIGN [Shrd]=>[Shrd]
		//DISALLOW:0x26AC, // (⚬) MEDIUM SMALL WHITE CIRCLE [Zyyy]=>[ALL]
	],
	[
		// "꣼" <Same>
		'A8FC', // DEVANAGARI SIGN SIDDHAM [Deva]=>[Deva]
		//DISALLOW:0xA8FC, // (꣼) DEVANAGARI SIGN SIDDHAM [Deva]=>[Deva]
		0x111DB, // (𑇛) SHARADA SIGN SIDDHAM [Shrd]=>[Shrd]
	],
	[
		// "๏" <Same>
		'E4F', // THAI CHARACTER FONGMAN [Thai]=>[Thai]
		//DISALLOW:0xE4F, // (๏) THAI CHARACTER FONGMAN [Thai]=>[Thai]
		//DISALLOW:0x17D9, // (៙) KHMER SIGN PHNAEK MUAN [Khmr]=>[Khmr]
	],
	[
		// "๚" <Same>
		'E5A', // THAI CHARACTER ANGKHANKHU [Thai]=>[Thai]
		//DISALLOW:0xE5A, // (๚) THAI CHARACTER ANGKHANKHU [Thai]=>[Thai]
		//DISALLOW:0x17D5, // (៕) KHMER SIGN BARIYOOSAN [Khmr]=>[Khmr]
	],
	[
		// "๛" <Same>
		'E5B', // THAI CHARACTER KHOMUT [Thai]=>[Thai]
		//DISALLOW:0xE5B, // (๛) THAI CHARACTER KHOMUT [Thai]=>[Thai]
		//DISALLOW:0x17DA, // (៚) KHMER SIGN KOOMUUT [Khmr]=>[Khmr]
	],
	[
		// "་" <Same>
		'F0B', // TIBETAN MARK INTERSYLLABIC TSHEG [Tibt]=>[Tibt]
		0xF0B, // (་) TIBETAN MARK INTERSYLLABIC TSHEG [Tibt]=>[Tibt]
		//IDNA:0xF0C, // (༌) TIBETAN MARK DELIMITER TSHEG BSTAR [Tibt]=>[Tibt]
	],
	[
		// "།།" <Same>
		'F0D F0D', // TIBETAN MARK SHAD + TIBETAN MARK SHAD [Tibt]=>[Tibt]
		0xF0E, // (༎) TIBETAN MARK NYIS SHAD [Tibt]=>[Tibt]
	],
	[
		// "^" <Same>
		'5E', // CIRCUMFLEX ACCENT [Zyyy]=>[ALL]
		//IDNA:0x5E, // (^) CIRCUMFLEX ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2C4, // (˄) MODIFIER LETTER UP ARROWHEAD [Zyyy]=>[ALL]
		//DISALLOW:0x2C6, // (ˆ) MODIFIER LETTER CIRCUMFLEX ACCENT [Zyyy]=>[ALL]
	],
	[
		// "ˇ" <Same>
		'2C7', // CARON [Zyyy]=>[ALL]
		//DISALLOW:0x2C7, // (ˇ) CARON [Zyyy]=>[ALL]
		//DISALLOW:0xA67E, // (꙾) CYRILLIC KAVYKA [Cyrl]=>[Cyrl]
		//IDNA:0x2D8, // (˘) BREVE [Zyyy]=>[ALL]
	],
	[
		// "ˉ" <Same>
		'2C9', // MODIFIER LETTER MACRON [Zyyy]=>[ALL]
		//DISALLOW:0x2C9, // (ˉ) MODIFIER LETTER MACRON [Zyyy]=>[ALL]
		//IDNA:0x203E, // (‾) OVERLINE [Zyyy]=>[ALL]
		//IDNA:0xFE49, // (﹉) DASHED OVERLINE [Zyyy]=>[ALL]
		//IDNA:0xFE4A, // (﹊) CENTRELINE OVERLINE [Zyyy]=>[ALL]
		//IDNA:0xFE4B, // (﹋) WAVY OVERLINE [Zyyy]=>[ALL]
		//IDNA:0xFE4C, // (﹌) DOUBLE WAVY OVERLINE [Zyyy]=>[ALL]
		//IDNA:0xAF, // (¯) MACRON [Zyyy]=>[ALL]
		//IDNA:0xFFE3, // (￣) FULLWIDTH MACRON [Zyyy]=>[ALL]
		//DISALLOW:0x2594, // (▔) UPPER ONE EIGHTH BLOCK [Zyyy]=>[ALL]
	],
	[
		// "ˉb" <Same>
		'2C9 62', // MODIFIER LETTER MACRON + LATIN SMALL LETTER B [Zyyy,Latn]=>[Latn]
		0x44A, // (ъ) CYRILLIC SMALL LETTER HARD SIGN [Cyrl]=>[Cyrl]
	],
	[
		// "ˉbi" <Same>
		'2C9 62 69', // MODIFIER LETTER MACRON + LATIN SMALL LETTER B + LATIN SMALL LETTER I [Zyyy,Latn]=>[Latn]
		//DISALLOW:0xA651, // (ꙑ) CYRILLIC SMALL LETTER YERU WITH BACK YER [Cyrl]=>[Cyrl]
	],
	[
		// "ˏ" <Same>
		'2CF', // MODIFIER LETTER LOW ACUTE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x2CF, // (ˏ) MODIFIER LETTER LOW ACUTE ACCENT [Zyyy]=>[ALL]
		//DISALLOW:0x375, // (͵) GREEK LOWER NUMERAL SIGN [Grek]=>[Grek]
	],
	[
		// "˪" <Same>
		'2EA', // MODIFIER LETTER YIN DEPARTING TONE MARK [Bopo]=>[Bopo,Hanb]
		//DISALLOW:0x2EA, // (˪) MODIFIER LETTER YIN DEPARTING TONE MARK [Bopo]=>[Bopo,Hanb]
		//DISALLOW:0x2FB, // (˻) MODIFIER LETTER BEGIN LOW TONE [Zyyy]=>[ALL]
		//DISALLOW:0xA716, // (꜖) MODIFIER LETTER EXTRA-LOW LEFT-STEM TONE BAR [Zyyy]=>[ALL]
	],
	[
		// "˫" <Same>
		'2EB', // MODIFIER LETTER YANG DEPARTING TONE MARK [Bopo]=>[Bopo,Hanb]
		//DISALLOW:0x2EB, // (˫) MODIFIER LETTER YANG DEPARTING TONE MARK [Bopo]=>[Bopo,Hanb]
		//DISALLOW:0xA714, // (꜔) MODIFIER LETTER MID LEFT-STEM TONE BAR [Zyyy]=>[ALL]
	],
	[
		// "˳" <Same>
		'2F3', // MODIFIER LETTER LOW RING [Zyyy]=>[ALL]
		//DISALLOW:0x2F3, // (˳) MODIFIER LETTER LOW RING [Zyyy]=>[ALL]
		//IDNA:0x3002, // (。) IDEOGRAPHIC FULL STOP [Zyyy]=>[Bopo,Hang,Hani,Hira,Kana,Yiii,Hanb,Jpan,Kore]
	],
	[
		// "°" <Same>
		'B0', // DEGREE SIGN [Zyyy]=>[ALL]
		0xB0, // (°) DEGREE SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2E30, // (⸰) RING POINT [Zyyy]=>[ALL]
		//IDNA:0x2DA, // (˚) RING ABOVE [Zyyy]=>[ALL]
		//DISALLOW:0x2218, // (∘) RING OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x25CB, // (○) WHITE CIRCLE [Zyyy]=>[ALL]
		//DISALLOW:0x25E6, // (◦) WHITE BULLET [Zyyy]=>[ALL]
	],
	[
		// "°̲" <Same>
		'B0 332', // DEGREE SIGN + COMBINING LOW LINE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x235C, // (⍜) APL FUNCTIONAL SYMBOL CIRCLE UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "°̈" <Same>
		'B0 308', // DEGREE SIGN + COMBINING DIAERESIS [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2364, // (⍤) APL FUNCTIONAL SYMBOL JOT DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "°C" <Same>
		'B0 43', // DEGREE SIGN + LATIN CAPITAL LETTER C [Zyyy,Latn]=>[Latn]
		//IDNA:0x2103, // (℃) DEGREE CELSIUS [Zyyy]=>[ALL]
	],
	[
		// "°F" <Same>
		'B0 46', // DEGREE SIGN + LATIN CAPITAL LETTER F [Zyyy,Latn]=>[Latn]
		//IDNA:0x2109, // (℉) DEGREE FAHRENHEIT [Zyyy]=>[ALL]
	],
	[
		// "௳" <Same>
		'BF3', // TAMIL DAY SIGN [Taml]=>[Gran,Taml]
		0xBF3, // (௳) TAMIL DAY SIGN [Taml]=>[Gran,Taml]
		0xBF5, // (௵) TAMIL YEAR SIGN [Taml]=>[Taml]
	],
	[
		// "༚༚" <Same>
		'F1A F1A', // TIBETAN SIGN RDEL DKAR GCIG + TIBETAN SIGN RDEL DKAR GCIG [Tibt]=>[Tibt]
		0xF1B, // (༛) TIBETAN SIGN RDEL DKAR GNYIS [Tibt]=>[Tibt]
	],
	[
		// "༚༝" <Same>
		'F1A F1D', // TIBETAN SIGN RDEL DKAR GCIG + TIBETAN SIGN RDEL NAG GCIG [Tibt]=>[Tibt]
		0xF1F, // (༟) TIBETAN SIGN RDEL DKAR RDEL NAG [Tibt]=>[Tibt]
	],
	[
		// "༝༚" <Same>
		'F1D F1A', // TIBETAN SIGN RDEL NAG GCIG + TIBETAN SIGN RDEL DKAR GCIG [Tibt]=>[Tibt]
		0xFCE, // (࿎) TIBETAN SIGN RDEL NAG RDEL DKAR [Tibt]=>[Tibt]
	],
	[
		// "༝༝" <Same>
		'F1D F1D', // TIBETAN SIGN RDEL NAG GCIG + TIBETAN SIGN RDEL NAG GCIG [Tibt]=>[Tibt]
		0xF1E, // (༞) TIBETAN SIGN RDEL NAG GNYIS [Tibt]=>[Tibt]
	],
	[
		// "©" <Same>
		'A9', // COPYRIGHT SIGN [Zyyy]=>[ALL]
		0xA9, // (©) COPYRIGHT SIGN [Zyyy]=>[ALL]
		//IDNA:0x24B8, // (Ⓒ) CIRCLED LATIN CAPITAL LETTER C [Zyyy]=>[ALL]
	],
	[
		// "®" <Same>
		'AE', // REGISTERED SIGN [Zyyy]=>[ALL]
		0xAE, // (®) REGISTERED SIGN [Zyyy]=>[ALL]
		//IDNA:0x24C7, // (Ⓡ) CIRCLED LATIN CAPITAL LETTER R [Zyyy]=>[ALL]
	],
	[
		// "℗" <Same>
		'2117', // SOUND RECORDING COPYRIGHT [Zyyy]=>[ALL]
		0x2117, // (℗) SOUND RECORDING COPYRIGHT [Zyyy]=>[ALL]
		//IDNA:0x24C5, // (Ⓟ) CIRCLED LATIN CAPITAL LETTER P [Zyyy]=>[ALL]
	],
	[
		// "⅄" <Same>
		'2144', // TURNED SANS-SERIF CAPITAL Y [Zyyy]=>[ALL]
		//DISALLOW:0x2144, // (⅄) TURNED SANS-SERIF CAPITAL Y [Zyyy]=>[ALL]
		//DISALLOW:0x1D21B, // (𝈛) GREEK VOCAL NOTATION SYMBOL-53 [Grek]=>[Grek]
	],
	[
		// "↞" <Same>
		'219E', // LEFTWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x219E, // (↞) LEFTWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x2BEC, // (⯬) LEFTWARDS TWO-HEADED ARROW WITH TRIANGLE ARROWHEADS [Zyyy]=>[ALL]
	],
	[
		// "↟" <Same>
		'219F', // UPWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x219F, // (↟) UPWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x2BED, // (⯭) UPWARDS TWO-HEADED ARROW WITH TRIANGLE ARROWHEADS [Zyyy]=>[ALL]
	],
	[
		// "↠" <Same>
		'21A0', // RIGHTWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x21A0, // (↠) RIGHTWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x2BEE, // (⯮) RIGHTWARDS TWO-HEADED ARROW WITH TRIANGLE ARROWHEADS [Zyyy]=>[ALL]
	],
	[
		// "↡" <Same>
		'21A1', // DOWNWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x21A1, // (↡) DOWNWARDS TWO HEADED ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x2BEF, // (⯯) DOWNWARDS TWO-HEADED ARROW WITH TRIANGLE ARROWHEADS [Zyyy]=>[ALL]
	],
	[
		// "↲" <Same>
		'21B2', // DOWNWARDS ARROW WITH TIP LEFTWARDS [Zyyy]=>[ALL]
		//DISALLOW:0x21B2, // (↲) DOWNWARDS ARROW WITH TIP LEFTWARDS [Zyyy]=>[ALL]
		//DISALLOW:0x21B5, // (↵) DOWNWARDS ARROW WITH CORNER LEFTWARDS [Zyyy]=>[ALL]
	],
	[
		// "⇃⇂" <Same>
		'21C3 21C2', // DOWNWARDS HARPOON WITH BARB LEFTWARDS + DOWNWARDS HARPOON WITH BARB RIGHTWARDS [Zyyy]=>[ALL]
		//DISALLOW:0x2965, // (⥥) DOWNWARDS HARPOON WITH BARB LEFT BESIDE DOWNWARDS HARPOON WITH BARB RIGHT [Zyyy]=>[ALL]
	],
	[
		// "⇃ᛚ" <Same>
		'21C3 16DA', // DOWNWARDS HARPOON WITH BARB LEFTWARDS + RUNIC LETTER LAUKAZ LAGU LOGR L [Zyyy,Runr]=>[Runr]
		//DISALLOW:0x296F, // (⥯) DOWNWARDS HARPOON WITH BARB LEFT BESIDE UPWARDS HARPOON WITH BARB RIGHT [Zyyy]=>[ALL]
	],
	[
		// "∂" <Same>
		'2202', // PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		0x2202, // (∂) PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		//IDNA:0x1D6DB, // (𝛛) MATHEMATICAL BOLD PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		//IDNA:0x1D715, // (𝜕) MATHEMATICAL ITALIC PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		//IDNA:0x1D74F, // (𝝏) MATHEMATICAL BOLD ITALIC PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		//IDNA:0x1D789, // (𝞉) MATHEMATICAL SANS-SERIF BOLD PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		//IDNA:0x1D7C3, // (𝟃) MATHEMATICAL SANS-SERIF BOLD ITALIC PARTIAL DIFFERENTIAL [Zyyy]=>[ALL]
		0x1E8CC, // (𞣌) MENDE KIKAKUI DIGIT SIX [Mend]=>[Mend]
	],
	[
		// "∂̵" <Same>
		'2202 335', // PARTIAL DIFFERENTIAL + COMBINING SHORT STROKE OVERLAY [Zyyy,Zinh]=>[ALL]
		0x1E8CD, // (𞣍) MENDE KIKAKUI DIGIT SEVEN [Mend]=>[Mend]
		//DISALLOW:0xF0, // (ð) LATIN SMALL LETTER ETH [Latn]=>[Latn]
	],
	[
		// "∅" <Same>
		'2205', // EMPTY SET [Zyyy]=>[ALL]
		//DISALLOW:0x2205, // (∅) EMPTY SET [Zyyy]=>[ALL]
		//DISALLOW:0x2300, // (⌀) DIAMETER SIGN [Zyyy]=>[ALL]
	],
	[
		// "∇" <Same>
		'2207', // NABLA [Zyyy]=>[ALL]
		//DISALLOW:0x2207, // (∇) NABLA [Zyyy]=>[ALL]
		//IDNA:0x1D6C1, // (𝛁) MATHEMATICAL BOLD NABLA [Zyyy]=>[ALL]
		//IDNA:0x1D6FB, // (𝛻) MATHEMATICAL ITALIC NABLA [Zyyy]=>[ALL]
		//IDNA:0x1D735, // (𝜵) MATHEMATICAL BOLD ITALIC NABLA [Zyyy]=>[ALL]
		//IDNA:0x1D76F, // (𝝯) MATHEMATICAL SANS-SERIF BOLD NABLA [Zyyy]=>[ALL]
		//IDNA:0x1D7A9, // (𝞩) MATHEMATICAL SANS-SERIF BOLD ITALIC NABLA [Zyyy]=>[ALL]
		//IDNA:0x118A8, // (𑢨) WARANG CITI CAPITAL LETTER E [Wara]=>[Wara]
	],
	[
		// "∇̈" <Same>
		'2207 308', // NABLA + COMBINING DIAERESIS [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2362, // (⍢) APL FUNCTIONAL SYMBOL DEL DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "∇̴" <Same>
		'2207 334', // NABLA + COMBINING TILDE OVERLAY [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x236B, // (⍫) APL FUNCTIONAL SYMBOL DEL TILDE [Zyyy]=>[ALL]
	],
	[
		// "∎" <Same>
		'220E', // END OF PROOF [Zyyy]=>[ALL]
		//DISALLOW:0x220E, // (∎) END OF PROOF [Zyyy]=>[ALL]
		0x2588, // (█) FULL BLOCK [Zyyy]=>[ALL]
		//DISALLOW:0x25A0, // (■) BLACK SQUARE [Zyyy]=>[ALL]
	],
	[
		// "∐" <Same>
		'2210', // N-ARY COPRODUCT [Zyyy]=>[ALL]
		//DISALLOW:0x2210, // (∐) N-ARY COPRODUCT [Zyyy]=>[ALL]
		//DISALLOW:0x2A3F, // (⨿) AMALGAMATION OR COPRODUCT [Zyyy]=>[ALL]
	],
	[
		// "+" <Same>
		'2B', // PLUS SIGN [Zyyy]=>[ALL]
		//IDNA:0x2B, // (+) PLUS SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x16ED, // (᛭) RUNIC CROSS PUNCTUATION [Zyyy]=>[ALL]
		//DISALLOW:0x2795, // (➕) HEAVY PLUS SIGN [Zyyy]=>[ALL]
		0x1029B, // (𐊛) LYCIAN LETTER H [Lyci]=>[Lyci]
	],
	[
		// "+̂" <Same>
		'2B 302', // PLUS SIGN + COMBINING CIRCUMFLEX ACCENT [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A23, // (⨣) PLUS SIGN WITH CIRCUMFLEX ACCENT ABOVE [Zyyy]=>[ALL]
	],
	[
		// "+̊" <Same>
		'2B 30A', // PLUS SIGN + COMBINING RING ABOVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A22, // (⨢) PLUS SIGN WITH SMALL CIRCLE ABOVE [Zyyy]=>[ALL]
	],
	[
		// "+̃" <Same>
		'2B 303', // PLUS SIGN + COMBINING TILDE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A24, // (⨤) PLUS SIGN WITH TILDE ABOVE [Zyyy]=>[ALL]
	],
	[
		// "+̇" <Same>
		'2B 307', // PLUS SIGN + COMBINING DOT ABOVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2214, // (∔) DOT PLUS [Zyyy]=>[ALL]
	],
	[
		// "+̣" <Same>
		'2B 323', // PLUS SIGN + COMBINING DOT BELOW [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A25, // (⨥) PLUS SIGN WITH DOT BELOW [Zyyy]=>[ALL]
	],
	[
		// "+̰" <Same>
		'2B 330', // PLUS SIGN + COMBINING TILDE BELOW [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2A26, // (⨦) PLUS SIGN WITH TILDE BELOW [Zyyy]=>[ALL]
	],
	[
		// "+₂" <Same>
		'2B 2082', // PLUS SIGN + SUBSCRIPT TWO [Zyyy]=>[ALL]
		//DISALLOW:0x2A27, // (⨧) PLUS SIGN WITH SUBSCRIPT TWO [Zyyy]=>[ALL]
	],
	[
		// "÷" <Same>
		'F7', // DIVISION SIGN [Zyyy]=>[ALL]
		//DISALLOW:0xF7, // (÷) DIVISION SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2797, // (➗) HEAVY DIVISION SIGN [Zyyy]=>[ALL]
	],
	[
		// "<" <Same>
		'3C', // LESS-THAN SIGN [Zyyy]=>[ALL]
		//IDNA:0x3C, // (<) LESS-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2039, // (‹) SINGLE LEFT-POINTING ANGLE QUOTATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x276E, // (❮) HEAVY LEFT-POINTING ANGLE QUOTATION MARK ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x2C2, // (˂) MODIFIER LETTER LEFT ARROWHEAD [Zyyy]=>[ALL]
		//DISALLOW:0x1D236, // (𝈶) GREEK INSTRUMENTAL NOTATION SYMBOL-40 [Grek]=>[Grek]
		0x1438, // (ᐸ) CANADIAN SYLLABICS PA [Cans]=>[Cans]
		0x16B2, // (ᚲ) RUNIC LETTER KAUNA [Runr]=>[Runr]
	],
	[
		// "<·" <Same>
		'3C B7', // LESS-THAN SIGN + MIDDLE DOT [Zyyy]=>[ALL]
		//DISALLOW:0x22D6, // (⋖) LESS-THAN WITH DOT [Zyyy]=>[ALL]
		//IDNA:0x2CB4, // (Ⲵ) COPTIC CAPITAL LETTER OLD COPTIC AIN [Copt]=>[Copt]
		0x1445, // (ᑅ) CANADIAN SYLLABICS WEST-CREE PWA [Cans]=>[Cans]
	],
	[
		// "<<" <Same>
		'3C 3C', // LESS-THAN SIGN + LESS-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x226A, // (≪) MUCH LESS-THAN [Zyyy]=>[ALL]
	],
	[
		// "<<<" <Same>
		'3C 3C 3C', // LESS-THAN SIGN + LESS-THAN SIGN + LESS-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x22D8, // (⋘) VERY MUCH LESS-THAN [Zyyy]=>[ALL]
	],
	[
		// "=" <Same>
		'3D', // EQUALS SIGN [Zyyy]=>[ALL]
		//IDNA:0x3D, // (=) EQUALS SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x1400, // (᐀) CANADIAN SYLLABICS HYPHEN [Cans]=>[Cans]
		//DISALLOW:0x2E40, // (⹀) DOUBLE HYPHEN [Zyyy]=>[ALL]
		//DISALLOW:0x30A0, // (゠) KATAKANA-HIRAGANA DOUBLE HYPHEN [Zyyy]=>[Hira,Kana,Jpan]
		//DISALLOW:0xA4FF, // (꓿) LISU PUNCTUATION FULL STOP [Lisu]=>[Lisu]
	],
	[
		// "=̆" <Same>
		'3D 306', // EQUALS SIGN + COMBINING BREVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x225A, // (≚) EQUIANGULAR TO [Zyyy]=>[ALL]
	],
	[
		// "=̂" <Same>
		'3D 302', // EQUALS SIGN + COMBINING CIRCUMFLEX ACCENT [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2259, // (≙) ESTIMATES [Zyyy]=>[ALL]
	],
	[
		// "=̊" <Same>
		'3D 30A', // EQUALS SIGN + COMBINING RING ABOVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2257, // (≗) RING EQUAL TO [Zyyy]=>[ALL]
	],
	[
		// "=̇" <Same>
		'3D 307', // EQUALS SIGN + COMBINING DOT ABOVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2250, // (≐) APPROACHES THE LIMIT [Zyyy]=>[ALL]
	],
	[
		// "=̣̇" <NF(false)>
		'3D 307 323', // EQUALS SIGN + COMBINING DOT ABOVE + COMBINING DOT BELOW [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2251, // (≑) GEOMETRICALLY EQUAL TO [Zyyy]=>[ALL]
	],
	[
		// "=⃰" <Same>
		'3D 20F0', // EQUALS SIGN + COMBINING ASTERISK ABOVE [Zyyy,Zinh]=>[Deva,Gran,Latn]
		//DISALLOW:0x2A6E, // (⩮) EQUALS WITH ASTERISK [Zyyy]=>[ALL]
	],
	[
		// "==" <Same>
		'3D 3D', // EQUALS SIGN + EQUALS SIGN [Zyyy]=>[ALL]
		//IDNA:0x2A75, // (⩵) TWO CONSECUTIVE EQUALS SIGNS [Zyyy]=>[ALL]
	],
	[
		// "===" <Same>
		'3D 3D 3D', // EQUALS SIGN + EQUALS SIGN + EQUALS SIGN [Zyyy]=>[ALL]
		//IDNA:0x2A76, // (⩶) THREE CONSECUTIVE EQUALS SIGNS [Zyyy]=>[ALL]
	],
	[
		// "=ͫ" <Same>
		'3D 36B', // EQUALS SIGN + COMBINING LATIN SMALL LETTER M [Zyyy,Zinh]=>[Latn]
		//DISALLOW:0x225E, // (≞) MEASURED BY [Zyyy]=>[ALL]
	],
	[
		// ">" <Same>
		'3E', // GREATER-THAN SIGN [Zyyy]=>[ALL]
		//IDNA:0x3E, // (>) GREATER-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x203A, // (›) SINGLE RIGHT-POINTING ANGLE QUOTATION MARK [Zyyy]=>[ALL]
		//DISALLOW:0x276F, // (❯) HEAVY RIGHT-POINTING ANGLE QUOTATION MARK ORNAMENT [Zyyy]=>[ALL]
		//DISALLOW:0x2C3, // (˃) MODIFIER LETTER RIGHT ARROWHEAD [Zyyy]=>[ALL]
		//DISALLOW:0x1D237, // (𝈷) GREEK INSTRUMENTAL NOTATION SYMBOL-42 [Grek]=>[Grek]
		0x1433, // (ᐳ) CANADIAN SYLLABICS PO [Cans]=>[Cans]
		0x16F3F, // (𖼿) MIAO LETTER ARCHAIC ZZA [Plrd]=>[Plrd]
	],
	[
		// ">·" <Same>
		'3E B7', // GREATER-THAN SIGN + MIDDLE DOT [Zyyy]=>[ALL]
		0x1441, // (ᑁ) CANADIAN SYLLABICS WEST-CREE PWO [Cans]=>[Cans]
	],
	[
		// "><" <Same>
		'3E 3C', // GREATER-THAN SIGN + LESS-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2AA5, // (⪥) GREATER-THAN BESIDE LESS-THAN [Zyyy]=>[ALL]
	],
	[
		// ">>" <Same>
		'3E 3E', // GREATER-THAN SIGN + GREATER-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x226B, // (≫) MUCH GREATER-THAN [Zyyy]=>[ALL]
		//DISALLOW:0x2A20, // (⨠) Z NOTATION SCHEMA PIPING [Zyyy]=>[ALL]
	],
	[
		// ">>>" <Same>
		'3E 3E 3E', // GREATER-THAN SIGN + GREATER-THAN SIGN + GREATER-THAN SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x22D9, // (⋙) VERY MUCH GREATER-THAN [Zyyy]=>[ALL]
	],
	[
		// "~" <Same>
		'7E', // TILDE [Zyyy]=>[ALL]
		//IDNA:0x7E, // (~) TILDE [Zyyy]=>[ALL]
		//DISALLOW:0x2053, // (⁓) SWUNG DASH [Zyyy]=>[ALL]
		//IDNA:0x2DC, // (˜) SMALL TILDE [Zyyy]=>[ALL]
		//IDNA:0x1FC0, // (῀) GREEK PERISPOMENI [Grek]=>[Grek]
		//DISALLOW:0x223C, // (∼) TILDE OPERATOR [Zyyy]=>[ALL]
	],
	[
		// "~̈" <Same>
		'7E 308', // TILDE + COMBINING DIAERESIS [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2368, // (⍨) APL FUNCTIONAL SYMBOL TILDE DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "~̇" <Same>
		'7E 307', // TILDE + COMBINING DOT ABOVE [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2E1E, // (⸞) TILDE WITH DOT ABOVE [Zyyy]=>[ALL]
		//DISALLOW:0x2A6A, // (⩪) TILDE OPERATOR WITH DOT ABOVE [Zyyy]=>[ALL]
	],
	[
		// "~̣" <Same>
		'7E 323', // TILDE + COMBINING DOT BELOW [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2E1F, // (⸟) TILDE WITH DOT BELOW [Zyyy]=>[ALL]
	],
	[
		// "∠" <Same>
		'2220', // ANGLE [Zyyy]=>[ALL]
		//DISALLOW:0x2220, // (∠) ANGLE [Zyyy]=>[ALL]
		0x1E8C8, // (𞣈) MENDE KIKAKUI DIGIT TWO [Mend]=>[Mend]
	],
	[
		// "∧" <Same>
		'2227', // LOGICAL AND [Zyyy]=>[ALL]
		//DISALLOW:0x2227, // (∧) LOGICAL AND [Zyyy]=>[ALL]
		//DISALLOW:0x22C0, // (⋀) N-ARY LOGICAL AND [Zyyy]=>[ALL]
	],
	[
		// "∮∮" <Same>
		'222E 222E', // CONTOUR INTEGRAL + CONTOUR INTEGRAL [Zyyy]=>[ALL]
		//IDNA:0x222F, // (∯) SURFACE INTEGRAL [Zyyy]=>[ALL]
	],
	[
		// "∮∮∮" <Same>
		'222E 222E 222E', // CONTOUR INTEGRAL + CONTOUR INTEGRAL + CONTOUR INTEGRAL [Zyyy]=>[ALL]
		//IDNA:0x2230, // (∰) VOLUME INTEGRAL [Zyyy]=>[ALL]
	],
	[
		// "∴" <Same>
		'2234', // THEREFORE [Zyyy]=>[ALL]
		//DISALLOW:0x2234, // (∴) THEREFORE [Zyyy]=>[ALL]
		//DISALLOW:0x2E2B, // (⸫) ONE DOT OVER TWO DOTS PUNCTUATION [Zyyy]=>[ALL]
	],
	[
		// "∵" <Same>
		'2235', // BECAUSE [Zyyy]=>[ALL]
		//DISALLOW:0x2235, // (∵) BECAUSE [Zyyy]=>[ALL]
		//DISALLOW:0x2E2A, // (⸪) TWO DOTS OVER ONE DOT PUNCTUATION [Zyyy]=>[ALL]
	],
	[
		// "∷" <Same>
		'2237', // PROPORTION [Zyyy]=>[ALL]
		//DISALLOW:0x2237, // (∷) PROPORTION [Zyyy]=>[ALL]
		//DISALLOW:0x2E2C, // (⸬) SQUARED FOUR DOT PUNCTUATION [Zyyy]=>[ALL]
	],
	[
		// "≈" <Same>
		'2248', // ALMOST EQUAL TO [Zyyy]=>[ALL]
		//DISALLOW:0x2248, // (≈) ALMOST EQUAL TO [Zyyy]=>[ALL]
		//DISALLOW:0x111DE, // (𑇞) SHARADA SECTION MARK-1 [Shrd]=>[Shrd]
	],
	[
		// "≏" <Same>
		'224F', // DIFFERENCE BETWEEN [Zyyy]=>[ALL]
		//DISALLOW:0x224F, // (≏) DIFFERENCE BETWEEN [Zyyy]=>[ALL]
		0x264E, // (♎) LIBRA [Zyyy]=>[ALL]
		//DISALLOW:0x1F75E, // (🝞) ALCHEMICAL SYMBOL FOR SUBLIMATION [Zyyy]=>[ALL]
	],
	[
		// "≡" <Same>
		'2261', // IDENTICAL TO [Zyyy]=>[ALL]
		//DISALLOW:0x2261, // (≡) IDENTICAL TO [Zyyy]=>[ALL]
		//DISALLOW:0x2263, // (≣) STRICTLY EQUIVALENT TO [Zyyy]=>[ALL]
	],
	[
		// "⊍" <Same>
		'228D', // MULTISET MULTIPLICATION [Zyyy]=>[ALL]
		//DISALLOW:0x228D, // (⊍) MULTISET MULTIPLICATION [Zyyy]=>[ALL]
		//DISALLOW:0x2A03, // (⨃) N-ARY UNION OPERATOR WITH DOT [Zyyy]=>[ALL]
	],
	[
		// "⊎" <Same>
		'228E', // MULTISET UNION [Zyyy]=>[ALL]
		//DISALLOW:0x228E, // (⊎) MULTISET UNION [Zyyy]=>[ALL]
		//DISALLOW:0x2A04, // (⨄) N-ARY UNION OPERATOR WITH PLUS [Zyyy]=>[ALL]
	],
	[
		// "⊏" <Same>
		'228F', // SQUARE IMAGE OF [Zyyy]=>[ALL]
		//DISALLOW:0x228F, // (⊏) SQUARE IMAGE OF [Zyyy]=>[ALL]
		//DISALLOW:0x1D238, // (𝈸) GREEK INSTRUMENTAL NOTATION SYMBOL-43 [Grek]=>[Grek]
	],
	[
		// "⊐" <Same>
		'2290', // SQUARE ORIGINAL OF [Zyyy]=>[ALL]
		//DISALLOW:0x2290, // (⊐) SQUARE ORIGINAL OF [Zyyy]=>[ALL]
		//DISALLOW:0x1D239, // (𝈹) GREEK INSTRUMENTAL NOTATION SYMBOL-45 [Grek]=>[Grek]
	],
	[
		// "⊓" <Same>
		'2293', // SQUARE CAP [Zyyy]=>[ALL]
		//DISALLOW:0x2293, // (⊓) SQUARE CAP [Zyyy]=>[ALL]
		//DISALLOW:0x2A05, // (⨅) N-ARY SQUARE INTERSECTION OPERATOR [Zyyy]=>[ALL]
	],
	[
		// "⊔" <Same>
		'2294', // SQUARE CUP [Zyyy]=>[ALL]
		//DISALLOW:0x2294, // (⊔) SQUARE CUP [Zyyy]=>[ALL]
		//DISALLOW:0x2A06, // (⨆) N-ARY SQUARE UNION OPERATOR [Zyyy]=>[ALL]
	],
	[
		// "⊗" <Same>
		'2297', // CIRCLED TIMES [Zyyy]=>[ALL]
		//DISALLOW:0x2297, // (⊗) CIRCLED TIMES [Zyyy]=>[ALL]
		//DISALLOW:0x2A02, // (⨂) N-ARY CIRCLED TIMES OPERATOR [Zyyy]=>[ALL]
	],
	[
		// "⊛" <Same>
		'229B', // CIRCLED ASTERISK OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x229B, // (⊛) CIRCLED ASTERISK OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x235F, // (⍟) APL FUNCTIONAL SYMBOL CIRCLE STAR [Zyyy]=>[ALL]
	],
	[
		// "⊠" <Same>
		'22A0', // SQUARED TIMES [Zyyy]=>[ALL]
		//DISALLOW:0x22A0, // (⊠) SQUARED TIMES [Zyyy]=>[ALL]
		//DISALLOW:0x1F771, // (🝱) ALCHEMICAL SYMBOL FOR MONTH [Zyyy]=>[ALL]
	],
	[
		// "⊡" <Same>
		'22A1', // SQUARED DOT OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x22A1, // (⊡) SQUARED DOT OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x1F755, // (🝕) ALCHEMICAL SYMBOL FOR URINE [Zyyy]=>[ALL]
	],
	[
		// "⊲" <Same>
		'22B2', // NORMAL SUBGROUP OF [Zyyy]=>[ALL]
		//DISALLOW:0x22B2, // (⊲) NORMAL SUBGROUP OF [Zyyy]=>[ALL]
		0x25C1, // (◁) WHITE LEFT-POINTING TRIANGLE [Zyyy]=>[ALL]
	],
	[
		// "⊳" <Same>
		'22B3', // CONTAINS AS NORMAL SUBGROUP [Zyyy]=>[ALL]
		//DISALLOW:0x22B3, // (⊳) CONTAINS AS NORMAL SUBGROUP [Zyyy]=>[ALL]
		0x25B7, // (▷) WHITE RIGHT-POINTING TRIANGLE [Zyyy]=>[ALL]
	],
	[
		// "⋆̈" <Same>
		'22C6 308', // STAR OPERATOR + COMBINING DIAERESIS [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x2363, // (⍣) APL FUNCTIONAL SYMBOL STAR DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "⌇" <Same>
		'2307', // WAVY LINE [Zyyy]=>[ALL]
		0x2307, // (⌇) WAVY LINE [Zyyy]=>[ALL]
		//IDNA:0xFE34, // (︴) PRESENTATION FORM FOR VERTICAL WAVY LOW LINE [Zyyy]=>[ALL]
	],
	[
		// "⌒" <Same>
		'2312', // ARC [Zyyy]=>[ALL]
		//DISALLOW:0x2312, // (⌒) ARC [Zyyy]=>[ALL]
		//DISALLOW:0x25E0, // (◠) UPPER HALF CIRCLE [Zyyy]=>[ALL]
	],
	[
		// "⌙" <Same>
		'2319', // TURNED NOT SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2319, // (⌙) TURNED NOT SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x2A3D, // (⨽) RIGHTHAND INTERIOR PRODUCT [Zyyy]=>[ALL]
	],
	[
		// "⌤" <Same>
		'2324', // UP ARROWHEAD BETWEEN TWO HORIZONTAL BARS [Zyyy]=>[ALL]
		//DISALLOW:0x2324, // (⌤) UP ARROWHEAD BETWEEN TWO HORIZONTAL BARS [Zyyy]=>[ALL]
		0x2325, // (⌥) OPTION KEY [Zyyy]=>[ALL]
	],
	[
		// "⌻" <Same>
		'233B', // APL FUNCTIONAL SYMBOL QUAD JOT [Zyyy]=>[ALL]
		//DISALLOW:0x233B, // (⌻) APL FUNCTIONAL SYMBOL QUAD JOT [Zyyy]=>[ALL]
		//DISALLOW:0x29C7, // (⧇) SQUARED SMALL CIRCLE [Zyyy]=>[ALL]
	],
	[
		// "⌾" <Same>
		'233E', // APL FUNCTIONAL SYMBOL CIRCLE JOT [Zyyy]=>[ALL]
		//DISALLOW:0x233E, // (⌾) APL FUNCTIONAL SYMBOL CIRCLE JOT [Zyyy]=>[ALL]
		0x25CE, // (◎) BULLSEYE [Zyyy]=>[ALL]
		//DISALLOW:0x29BE, // (⦾) CIRCLED WHITE BULLET [Zyyy]=>[ALL]
	],
	[
		// "⍂" <Same>
		'2342', // APL FUNCTIONAL SYMBOL QUAD BACKSLASH [Zyyy]=>[ALL]
		//DISALLOW:0x2342, // (⍂) APL FUNCTIONAL SYMBOL QUAD BACKSLASH [Zyyy]=>[ALL]
		//DISALLOW:0x29C5, // (⧅) SQUARED FALLING DIAGONAL SLASH [Zyyy]=>[ALL]
	],
	[
		// "⍉" <Same>
		'2349', // APL FUNCTIONAL SYMBOL CIRCLE BACKSLASH [Zyyy]=>[ALL]
		//DISALLOW:0x2349, // (⍉) APL FUNCTIONAL SYMBOL CIRCLE BACKSLASH [Zyyy]=>[ALL]
		//DISALLOW:0x29B0, // (⦰) REVERSED EMPTY SET [Zyyy]=>[ALL]
	],
	[
		// "⍋" <Same>
		'234B', // APL FUNCTIONAL SYMBOL DELTA STILE [Zyyy]=>[ALL]
		//DISALLOW:0x234B, // (⍋) APL FUNCTIONAL SYMBOL DELTA STILE [Zyyy]=>[ALL]
		//DISALLOW:0x23C3, // (⏃) DENTISTRY SYMBOL LIGHT VERTICAL WITH TRIANGLE [Zyyy]=>[ALL]
	],
	[
		// "⍎" <Same>
		'234E', // APL FUNCTIONAL SYMBOL DOWN TACK JOT [Zyyy]=>[ALL]
		//DISALLOW:0x234E, // (⍎) APL FUNCTIONAL SYMBOL DOWN TACK JOT [Zyyy]=>[ALL]
		//DISALLOW:0x23C2, // (⏂) DENTISTRY SYMBOL LIGHT UP AND HORIZONTAL WITH CIRCLE [Zyyy]=>[ALL]
	],
	[
		// "⍕" <Same>
		'2355', // APL FUNCTIONAL SYMBOL UP TACK JOT [Zyyy]=>[ALL]
		//DISALLOW:0x2355, // (⍕) APL FUNCTIONAL SYMBOL UP TACK JOT [Zyyy]=>[ALL]
		//DISALLOW:0x23C1, // (⏁) DENTISTRY SYMBOL LIGHT DOWN AND HORIZONTAL WITH CIRCLE [Zyyy]=>[ALL]
	],
	[
		// "⍭" <Same>
		'236D', // APL FUNCTIONAL SYMBOL STILE TILDE [Zyyy]=>[ALL]
		//DISALLOW:0x236D, // (⍭) APL FUNCTIONAL SYMBOL STILE TILDE [Zyyy]=>[ALL]
		//DISALLOW:0x23C6, // (⏆) DENTISTRY SYMBOL LIGHT VERTICAL AND WAVE [Zyyy]=>[ALL]
	],
	[
		// "⎈" <Same>
		'2388', // HELM SYMBOL [Zyyy]=>[ALL]
		0x2388, // (⎈) HELM SYMBOL [Zyyy]=>[ALL]
		0x2638, // (☸) WHEEL OF DHARMA [Zyyy]=>[ALL]
	],
	[
		// "⏜" <Same>
		'23DC', // TOP PARENTHESIS [Zyyy]=>[ALL]
		//DISALLOW:0x23DC, // (⏜) TOP PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0xFE35, // (︵) PRESENTATION FORM FOR VERTICAL LEFT PARENTHESIS [Zyyy]=>[ALL]
	],
	[
		// "⏝" <Same>
		'23DD', // BOTTOM PARENTHESIS [Zyyy]=>[ALL]
		//DISALLOW:0x23DD, // (⏝) BOTTOM PARENTHESIS [Zyyy]=>[ALL]
		//IDNA:0xFE36, // (︶) PRESENTATION FORM FOR VERTICAL RIGHT PARENTHESIS [Zyyy]=>[ALL]
	],
	[
		// "⏞" <Same>
		'23DE', // TOP CURLY BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x23DE, // (⏞) TOP CURLY BRACKET [Zyyy]=>[ALL]
		//IDNA:0xFE37, // (︷) PRESENTATION FORM FOR VERTICAL LEFT CURLY BRACKET [Zyyy]=>[ALL]
	],
	[
		// "⏟" <Same>
		'23DF', // BOTTOM CURLY BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x23DF, // (⏟) BOTTOM CURLY BRACKET [Zyyy]=>[ALL]
		//IDNA:0xFE38, // (︸) PRESENTATION FORM FOR VERTICAL RIGHT CURLY BRACKET [Zyyy]=>[ALL]
	],
	[
		// "⏠" <Same>
		'23E0', // TOP TORTOISE SHELL BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x23E0, // (⏠) TOP TORTOISE SHELL BRACKET [Zyyy]=>[ALL]
		//IDNA:0xFE39, // (︹) PRESENTATION FORM FOR VERTICAL LEFT TORTOISE SHELL BRACKET [Zyyy]=>[ALL]
	],
	[
		// "⏡" <Same>
		'23E1', // BOTTOM TORTOISE SHELL BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x23E1, // (⏡) BOTTOM TORTOISE SHELL BRACKET [Zyyy]=>[ALL]
		//IDNA:0xFE3A, // (︺) PRESENTATION FORM FOR VERTICAL RIGHT TORTOISE SHELL BRACKET [Zyyy]=>[ALL]
	],
	[
		// "⏥" <Same>
		'23E5', // FLATNESS [Zyyy]=>[ALL]
		//DISALLOW:0x23E5, // (⏥) FLATNESS [Zyyy]=>[ALL]
		0x25B1, // (▱) WHITE PARALLELOGRAM [Zyyy]=>[ALL]
	],
	[
		// "⏻" <Same>
		'23FB', // POWER SYMBOL [Zyyy]=>[ALL]
		0x23FB, // (⏻) POWER SYMBOL [Zyyy]=>[ALL]
		//DISALLOW:0x23FC, // (⏼) POWER ON-OFF SYMBOL [Zyyy]=>[ALL]
	],
	[
		// "│" <Same>
		'2502', // BOX DRAWINGS LIGHT VERTICAL [Zyyy]=>[ALL]
		//DISALLOW:0x2502, // (│) BOX DRAWINGS LIGHT VERTICAL [Zyyy]=>[ALL]
		//IDNA:0xFE31, // (︱) PRESENTATION FORM FOR VERTICAL EM DASH [Zyyy]=>[ALL]
		//IDNA:0xFF5C, // (｜) FULLWIDTH VERTICAL LINE [Zyyy]=>[ALL]
		//DISALLOW:0x2503, // (┃) BOX DRAWINGS HEAVY VERTICAL [Zyyy]=>[ALL]
	],
	[
		// "┌" <Same>
		'250C', // BOX DRAWINGS LIGHT DOWN AND RIGHT [Zyyy]=>[ALL]
		//DISALLOW:0x250C, // (┌) BOX DRAWINGS LIGHT DOWN AND RIGHT [Zyyy]=>[ALL]
		//DISALLOW:0x250F, // (┏) BOX DRAWINGS HEAVY DOWN AND RIGHT [Zyyy]=>[ALL]
	],
	[
		// "├" <Same>
		'251C', // BOX DRAWINGS LIGHT VERTICAL AND RIGHT [Zyyy]=>[ALL]
		//DISALLOW:0x251C, // (├) BOX DRAWINGS LIGHT VERTICAL AND RIGHT [Zyyy]=>[ALL]
		//DISALLOW:0x2523, // (┣) BOX DRAWINGS HEAVY VERTICAL AND RIGHT [Zyyy]=>[ALL]
	],
	[
		// "▌" <Same>
		'258C', // LEFT HALF BLOCK [Zyyy]=>[ALL]
		//DISALLOW:0x258C, // (▌) LEFT HALF BLOCK [Zyyy]=>[ALL]
		//DISALLOW:0x2590, // (▐) RIGHT HALF BLOCK [Zyyy]=>[ALL]
	],
	[
		// "▖" <Same>
		'2596', // QUADRANT LOWER LEFT [Zyyy]=>[ALL]
		//DISALLOW:0x2596, // (▖) QUADRANT LOWER LEFT [Zyyy]=>[ALL]
		//DISALLOW:0x2597, // (▗) QUADRANT LOWER RIGHT [Zyyy]=>[ALL]
	],
	[
		// "▘" <Same>
		'2598', // QUADRANT UPPER LEFT [Zyyy]=>[ALL]
		//DISALLOW:0x2598, // (▘) QUADRANT UPPER LEFT [Zyyy]=>[ALL]
		//DISALLOW:0x259D, // (▝) QUADRANT UPPER RIGHT [Zyyy]=>[ALL]
	],
	[
		// "□" <Same>
		'25A1', // WHITE SQUARE [Zyyy]=>[ALL]
		//DISALLOW:0x25A1, // (□) WHITE SQUARE [Zyyy]=>[ALL]
		//DISALLOW:0x2610, // (☐) BALLOT BOX [Zyyy]=>[ALL]
	],
	[
		// "▪" <Same>
		'25AA', // BLACK SMALL SQUARE [Zyyy]=>[ALL]
		0x25AA, // (▪) BLACK SMALL SQUARE [Zyyy]=>[ALL]
		//IDNA:0xFFED, // (￭) HALFWIDTH BLACK SQUARE [Zyyy]=>[ALL]
	],
	[
		// "▶" <Same>
		'25B6', // BLACK RIGHT-POINTING TRIANGLE [Zyyy]=>[ALL]
		0x25B6, // (▶) BLACK RIGHT-POINTING TRIANGLE [Zyyy]=>[ALL]
		//DISALLOW:0x25B8, // (▸) BLACK RIGHT-POINTING SMALL TRIANGLE [Zyyy]=>[ALL]
		//DISALLOW:0x25BA, // (►) BLACK RIGHT-POINTING POINTER [Zyyy]=>[ALL]
	],
	[
		// "☧" <Same>
		'2627', // CHI RHO [Zyyy]=>[ALL]
		0x2627, // (☧) CHI RHO [Zyyy]=>[ALL]
		0x2CE9, // (⳩) COPTIC SYMBOL KHI RO [Copt]=>[Copt]
	],
	[
		// "☩" <Same>
		'2629', // CROSS OF JERUSALEM [Zyyy]=>[ALL]
		0x2629, // (☩) CROSS OF JERUSALEM [Zyyy]=>[ALL]
		//DISALLOW:0x1F70A, // (🜊) ALCHEMICAL SYMBOL FOR VINEGAR [Zyyy]=>[ALL]
	],
	[
		// "☽" <Same>
		'263D', // FIRST QUARTER MOON [Zyyy]=>[ALL]
		0x263D, // (☽) FIRST QUARTER MOON [Zyyy]=>[ALL]
		0x1F312, // (🌒) WAXING CRESCENT MOON SYMBOL [Zyyy]=>[ALL]
		0x1F319, // (🌙) CRESCENT MOON [Zyyy]=>[ALL]
	],
	[
		// "☾" <Same>
		'263E', // LAST QUARTER MOON [Zyyy]=>[ALL]
		0x263E, // (☾) LAST QUARTER MOON [Zyyy]=>[ALL]
		//DISALLOW:0x23FE, // (⏾) POWER SLEEP SYMBOL [Zyyy]=>[ALL]
		0x1F318, // (🌘) WANING CRESCENT MOON SYMBOL [Zyyy]=>[ALL]
	],
	[
		// "⦚" <Same>
		'299A', // VERTICAL ZIGZAG LINE [Zyyy]=>[ALL]
		//DISALLOW:0x299A, // (⦚) VERTICAL ZIGZAG LINE [Zyyy]=>[ALL]
		//DISALLOW:0x29D9, // (⧙) RIGHT WIGGLY FENCE [Zyyy]=>[ALL]
	],
	[
		// "⧟" <Same>
		'29DF', // DOUBLE-ENDED MULTIMAP [Zyyy]=>[ALL]
		//DISALLOW:0x29DF, // (⧟) DOUBLE-ENDED MULTIMAP [Zyyy]=>[ALL]
		//DISALLOW:0x1F73A, // (🜺) ALCHEMICAL SYMBOL FOR ARSENIC [Zyyy]=>[ALL]
	],
	[
		// "⨟" <Same>
		'2A1F', // Z NOTATION SCHEMA COMPOSITION [Zyyy]=>[ALL]
		//DISALLOW:0x2A1F, // (⨟) Z NOTATION SCHEMA COMPOSITION [Zyyy]=>[ALL]
		//DISALLOW:0x2A3E, // (⨾) Z NOTATION RELATIONAL COMPOSITION [Zyyy]=>[ALL]
	],
	[
		// "⳨" <Same>
		'2CE8', // COPTIC SYMBOL TAU RO [Copt]=>[Copt]
		0x2CE8, // (⳨) COPTIC SYMBOL TAU RO [Copt]=>[Copt]
		//DISALLOW:0x101A0, // (𐆠) GREEK SYMBOL TAU RHO [Grek]=>[Grek]
	],
	[
		// "𝅘𝅥" <Same>
		'1D158 1D165', // MUSICAL SYMBOL NOTEHEAD BLACK + MUSICAL SYMBOL COMBINING STEM [Zyyy]=>[ALL]
		0x2669, // (♩) QUARTER NOTE [Zyyy]=>[ALL]
	],
	[
		// "𝅘𝅥𝅮" <Same>
		'1D158 1D165 1D16E', // MUSICAL SYMBOL NOTEHEAD BLACK + MUSICAL SYMBOL COMBINING STEM + MUSICAL SYMBOL COMBINING FLAG-1 [Zyyy]=>[ALL]
		0x266A, // (♪) EIGHTH NOTE [Zyyy]=>[ALL]
	],
	[
		// "🄍" <Same>
		'1F10D', // CIRCLED ZERO WITH SLASH [Zyyy]=>[ALL]
		//DISALLOW:0x1F10D, // (🄍) CIRCLED ZERO WITH SLASH [Zyyy]=>[ALL]
		//IDNA:0x24EA, // (⓪) CIRCLED DIGIT ZERO [Zyyy]=>[ALL]
	],
	[
		// "🄎" <Same>
		'1F10E', // CIRCLED ANTICLOCKWISE ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x1F10E, // (🄎) CIRCLED ANTICLOCKWISE ARROW [Zyyy]=>[ALL]
		//DISALLOW:0x21BA, // (↺) ANTICLOCKWISE OPEN CIRCLE ARROW [Zyyy]=>[ALL]
	],
	[
		// "ॱ" <Same>
		'971', // DEVANAGARI SIGN HIGH SPACING DOT [Deva]=>[Deva]
		//DISALLOW:0x971, // (ॱ) DEVANAGARI SIGN HIGH SPACING DOT [Deva]=>[Deva]
		//IDNA:0x2D9, // (˙) DOT ABOVE [Zyyy]=>[ALL]
		0xD4E, // (ൎ) MALAYALAM LETTER DOT REPH [Mlym]=>[Mlym]
	],
	[
		// "ー" <Same>
		'30FC', // KATAKANA-HIRAGANA PROLONGED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		allow(0x30FC), // (ー) KATAKANA-HIRAGANA PROLONGED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		//IDNA:0xFF0D, // (－) FULLWIDTH HYPHEN-MINUS [Zyyy]=>[ALL]
		0x2014, // (—) EM DASH [Zyyy]=>[ALL]
		0x2015, // (―) HORIZONTAL BAR [Zyyy]=>[ALL]
		//DISALLOW:0x2500, // (─) BOX DRAWINGS LIGHT HORIZONTAL [Zyyy]=>[ALL]
		//DISALLOW:0x2501, // (━) BOX DRAWINGS HEAVY HORIZONTAL [Zyyy]=>[ALL]
		//DISALLOW:0x31D0, // (㇐) CJK STROKE H [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0xA7F7, // (ꟷ) LATIN EPIGRAPHIC LETTER SIDEWAYS I [Latn]=>[Latn]
		0x1173, // (ᅳ) HANGUL JUNGSEONG EU [Hang]=>[Hang,Kore]
		//IDNA:0x3161, // (ㅡ) HANGUL LETTER EU [Hang]=>[Hang,Kore]
		allow(0x4E00), // (一) CJK Ideograph-4E00 <1/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F00, // (⼀) KANGXI RADICAL ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "ーー" <Same>
		'30FC 30FC', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + KATAKANA-HIRAGANA PROLONGED SOUND MARK [Zyyy]=>[Hira,Kana,Jpan]
		0x1196, // (ᆖ) HANGUL JUNGSEONG EU-EU [Hang]=>[Hang,Kore]
	],
	[
		// "ーᅡ" <Same>
		'30FC 1161', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + HANGUL JUNGSEONG A [Zyyy,Hang]=>[]
		0xD7B9, // (ힹ) HANGUL JUNGSEONG EU-A [Hang]=>[Hang,Kore]
	],
	[
		// "ーᅥ" <Same>
		'30FC 1165', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + HANGUL JUNGSEONG EO [Zyyy,Hang]=>[]
		0xD7BA, // (ힺ) HANGUL JUNGSEONG EU-EO [Hang]=>[Hang,Kore]
	],
	[
		// "ーᅥ丨" <Same>
		'30FC 1165 4E28', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + HANGUL JUNGSEONG EO + CJK Ideograph-4E28 <41/20992> [Zyyy,Hang,Hani]=>[]
		0xD7BB, // (ힻ) HANGUL JUNGSEONG EU-E [Hang]=>[Hang,Kore]
	],
	[
		// "ーᅩ" <Same>
		'30FC 1169', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + HANGUL JUNGSEONG O [Zyyy,Hang]=>[]
		0xD7BC, // (ힼ) HANGUL JUNGSEONG EU-O [Hang]=>[Hang,Kore]
	],
	[
		// "ーᅮ" <Same>
		'30FC 116E', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + HANGUL JUNGSEONG U [Zyyy,Hang]=>[]
		0x1195, // (ᆕ) HANGUL JUNGSEONG EU-U [Hang]=>[Hang,Kore]
	],
	[
		// "ー丨" <Same>
		'30FC 4E28', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + CJK Ideograph-4E28 <41/20992> [Zyyy,Hani]=>[Jpan]
		0x1174, // (ᅴ) HANGUL JUNGSEONG YI [Hang]=>[Hang,Kore]
		//IDNA:0x3162, // (ㅢ) HANGUL LETTER YI [Hang]=>[Hang,Kore]
	],
	[
		// "ー丨ᅮ" <Same>
		'30FC 4E28 116E', // KATAKANA-HIRAGANA PROLONGED SOUND MARK + CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG U [Zyyy,Hani,Hang]=>[]
		0x1197, // (ᆗ) HANGUL JUNGSEONG YI-U [Hang]=>[Hang,Kore]
	],
	[
		// "$⃠" <Same>
		'24 20E0', // DOLLAR SIGN + COMBINING ENCLOSING CIRCLE BACKSLASH [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x1F10F, // (🄏) CIRCLED DOLLAR SIGN WITH OVERLAID BACKSLASH [Zyyy]=>[ALL]
	],
	[
		// "£" <Same>
		'A3', // POUND SIGN [Zyyy]=>[ALL]
		0xA3, // (£) POUND SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x20A4, // (₤) LIRA SIGN [Zyyy]=>[ALL]
	],
	[
		// "₸" <Same>
		'20B8', // TENGE SIGN [Zyyy]=>[ALL]
		0x20B8, // (₸) TENGE SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x3012, // (〒) POSTAL MARK [Zyyy]=>[ALL]
		//IDNA:0x3036, // (〶) CIRCLED POSTAL MARK [Zyyy]=>[ALL]
	],
	[
		// "᭐" <Same>
		'1B50', // BALINESE DIGIT ZERO [Bali]=>[Bali]
		0x1B50, // (᭐) BALINESE DIGIT ZERO [Bali]=>[Bali]
		0x1B5C, // (᭜) BALINESE WINDU [Bali]=>[Bali]
	],
	[
		// "꧐" <Same>
		'A9D0', // JAVANESE DIGIT ZERO [Java]=>[Java]
		0xA9D0, // (꧐) JAVANESE DIGIT ZERO [Java]=>[Java]
		0xA9C6, // (꧆) JAVANESE PADA WINDU [Java]=>[Java]
	],
	[
		// "১" <Same>
		'9E7', // BENGALI DIGIT ONE [Beng]=>[Beng,Cakm,Sylo]
		0x9E7, // (১) BENGALI DIGIT ONE [Beng]=>[Beng,Cakm,Sylo]
		0x114D1, // (𑓑) TIRHUTA DIGIT ONE [Tirh]=>[Tirh]
	],
	[
		// "౧" <Same>
		'C67', // TELUGU DIGIT ONE [Telu]=>[Telu]
		0xC67, // (౧) TELUGU DIGIT ONE [Telu]=>[Telu]
		0xCE7, // (೧) KANNADA DIGIT ONE [Knda]=>[Knda,Nand]
	],
	[
		// "၁" <Same>
		'1041', // MYANMAR DIGIT ONE [Mymr]=>[Cakm,Mymr,Tale]
		allow(0x1041), // (၁) MYANMAR DIGIT ONE [Mymr]=>[Cakm,Mymr,Tale]
		0x1065, // (ၥ) MYANMAR LETTER WESTERN PWO KAREN THA [Mymr]=>[Mymr]
	],
	[
		// "➀" <Same>
		'2780', // DINGBAT CIRCLED SANS-SERIF DIGIT ONE [Zyyy]=>[ALL]
		//DISALLOW:0x2780, // (➀) DINGBAT CIRCLED SANS-SERIF DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x2460, // (①) CIRCLED DIGIT ONE [Zyyy]=>[ALL]
	],
	[
		// "➉" <Same>
		'2789', // DINGBAT CIRCLED SANS-SERIF NUMBER TEN [Zyyy]=>[ALL]
		//DISALLOW:0x2789, // (➉) DINGBAT CIRCLED SANS-SERIF NUMBER TEN [Zyyy]=>[ALL]
		//IDNA:0x2469, // (⑩) CIRCLED NUMBER TEN [Zyyy]=>[ALL]
	],
	[
		// "₁₀" <Same>
		'2081 2080', // SUBSCRIPT ONE + SUBSCRIPT ZERO [Zyyy]=>[ALL]
		//DISALLOW:0x23E8, // (⏨) DECIMAL EXPONENT SYMBOL [Zyyy]=>[ALL]
	],
	[
		// "٢" <Same>
		'662', // ARABIC-INDIC DIGIT TWO [Arab]=>[Arab,Thaa,Yezi]
		0x662, // (٢) ARABIC-INDIC DIGIT TWO [Arab]=>[Arab,Thaa,Yezi]
		0xA9CF, // (ꧏ) JAVANESE PANGRANGKEP [Zyyy]=>[Bugi,Java]
		0x6F2, // (۲) EXTENDED ARABIC-INDIC DIGIT TWO [Arab]=>[Arab]
	],
	[
		// "२" <Same>
		'968', // DEVANAGARI DIGIT TWO [Deva]=>[Deva Dogr,Kthi,Mahj]
		valid(0x968), // (२) DEVANAGARI DIGIT TWO [Deva]=>[Deva Dogr,Kthi,Mahj]
		0xAE8, // (૨) GUJARATI DIGIT TWO [Gujr]=>[Gujr,Khoj]
	],
	[
		// "২" <Same>
		'9E8', // BENGALI DIGIT TWO [Beng]=>[Beng,Cakm,Sylo]
		0x9E8, // (২) BENGALI DIGIT TWO [Beng]=>[Beng,Cakm,Sylo]
		0x114D2, // (𑓒) TIRHUTA DIGIT TWO [Tirh]=>[Tirh]
	],
	[
		// "౨" <Same>
		'C68', // TELUGU DIGIT TWO [Telu]=>[Telu]
		0xC68, // (౨) TELUGU DIGIT TWO [Telu]=>[Telu]
		0xCE8, // (೨) KANNADA DIGIT TWO [Knda]=>[Knda,Nand]
	],
	[
		// "➁" <Same>
		'2781', // DINGBAT CIRCLED SANS-SERIF DIGIT TWO [Zyyy]=>[ALL]
		//DISALLOW:0x2781, // (➁) DINGBAT CIRCLED SANS-SERIF DIGIT TWO [Zyyy]=>[ALL]
		//IDNA:0x2461, // (②) CIRCLED DIGIT TWO [Zyyy]=>[ALL]
	],
	[
		// "2̵" <Same>
		'32 335', // DIGIT TWO + COMBINING SHORT STROKE OVERLAY [Zyyy,Zinh]=>[ALL]
		//DISALLOW:0x1BB, // (ƻ) LATIN LETTER TWO WITH STROKE [Latn]=>[Latn]
	],
	[
		// "2," <Same>
		'32 2C', // DIGIT TWO + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F103, // (🄃) DIGIT TWO COMMA [Zyyy]=>[ALL]
	],
	[
		// "2." <Same>
		'32 2E', // DIGIT TWO + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x2489, // (⒉) DIGIT TWO FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "22日" <Same>
		'32 32 65E5', // DIGIT TWO + DIGIT TWO + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33F5, // (㏵) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-TWO [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "22点" <Same>
		'32 32 70B9', // DIGIT TWO + DIGIT TWO + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x336E, // (㍮) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWENTY-TWO [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "23日" <Same>
		'32 33 65E5', // DIGIT TWO + DIGIT THREE + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33F6, // (㏶) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-THREE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "23点" <Same>
		'32 33 70B9', // DIGIT TWO + DIGIT THREE + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x336F, // (㍯) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWENTY-THREE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "24日" <Same>
		'32 34 65E5', // DIGIT TWO + DIGIT FOUR + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33F7, // (㏷) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-FOUR [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "24点" <Same>
		'32 34 70B9', // DIGIT TWO + DIGIT FOUR + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3370, // (㍰) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWENTY-FOUR [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "25日" <Same>
		'32 35 65E5', // DIGIT TWO + DIGIT FIVE + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33F8, // (㏸) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-FIVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "26日" <Same>
		'32 36 65E5', // DIGIT TWO + DIGIT SIX + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33F9, // (㏹) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-SIX [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "27日" <Same>
		'32 37 65E5', // DIGIT TWO + DIGIT SEVEN + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33FA, // (㏺) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-SEVEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "28日" <Same>
		'32 38 65E5', // DIGIT TWO + DIGIT EIGHT + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33FB, // (㏻) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-EIGHT [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "29日" <Same>
		'32 39 65E5', // DIGIT TWO + DIGIT NINE + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33FC, // (㏼) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-NINE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "2l日" <Same>
		'32 6C 65E5', // DIGIT TWO + LATIN SMALL LETTER L + CJK Ideograph-65E5 <6118/20992> [Zyyy,Latn,Hani]=>[]
		//IDNA:0x33F4, // (㏴) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY-ONE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "2l点" <Same>
		'32 6C 70B9', // DIGIT TWO + LATIN SMALL LETTER L + CJK Ideograph-70B9 <8890/20992> [Zyyy,Latn,Hani]=>[]
		//IDNA:0x336D, // (㍭) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWENTY-ONE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "2O." <Same>
		'32 4F 2E', // DIGIT TWO + LATIN CAPITAL LETTER O + FULL STOP [Zyyy,Latn]=>[Latn]
		//IDNA:0x249B, // (⒛) NUMBER TWENTY FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "2O日" <Same>
		'32 4F 65E5', // DIGIT TWO + LATIN CAPITAL LETTER O + CJK Ideograph-65E5 <6118/20992> [Zyyy,Latn,Hani]=>[]
		//IDNA:0x33F3, // (㏳) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWENTY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "2O点" <Same>
		'32 4F 70B9', // DIGIT TWO + LATIN CAPITAL LETTER O + CJK Ideograph-70B9 <8890/20992> [Zyyy,Latn,Hani]=>[]
		//IDNA:0x336C, // (㍬) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWENTY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "෨ා" <Same>
		'DE8 DCF', // SINHALA LITH DIGIT TWO + SINHALA VOWEL SIGN AELA-PILLA [Sinh]=>[Sinh]
		0xDE9, // (෩) SINHALA LITH DIGIT THREE [Sinh]=>[Sinh]
	],
	[
		// "෨ී" <Same>
		'DE8 DD3', // SINHALA LITH DIGIT TWO + SINHALA VOWEL SIGN DIGA IS-PILLA [Sinh]=>[Sinh]
		0xDEF, // (෯) SINHALA LITH DIGIT NINE [Sinh]=>[Sinh]
	],
	[
		// "2日" <Same>
		'32 65E5', // DIGIT TWO + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E1, // (㏡) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWO [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "2月" <Same>
		'32 6708', // DIGIT TWO + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C1, // (㋁) IDEOGRAPHIC TELEGRAPH SYMBOL FOR FEBRUARY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "2点" <Same>
		'32 70B9', // DIGIT TWO + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x335A, // (㍚) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWO [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "٣" <Same>
		'663', // ARABIC-INDIC DIGIT THREE [Arab]=>[Arab,Thaa,Yezi]
		0x663, // (٣) ARABIC-INDIC DIGIT THREE [Arab]=>[Arab,Thaa,Yezi]
		0x6F3, // (۳) EXTENDED ARABIC-INDIC DIGIT THREE [Arab]=>[Arab]
		0x1E8C9, // (𞣉) MENDE KIKAKUI DIGIT THREE [Mend]=>[Mend]
	],
	[
		// "३" <Same>
		'969', // DEVANAGARI DIGIT THREE [Deva]=>[Deva Dogr,Kthi,Mahj]
		valid(0x969), // (३) DEVANAGARI DIGIT THREE [Deva]=>[Deva Dogr,Kthi,Mahj]
		0xAE9, // (૩) GUJARATI DIGIT THREE [Gujr]=>[Gujr,Khoj]
	],
	[
		// "➂" <Same>
		'2782', // DINGBAT CIRCLED SANS-SERIF DIGIT THREE [Zyyy]=>[ALL]
		//DISALLOW:0x2782, // (➂) DINGBAT CIRCLED SANS-SERIF DIGIT THREE [Zyyy]=>[ALL]
		//IDNA:0x2462, // (③) CIRCLED DIGIT THREE [Zyyy]=>[ALL]
	],
	[
		// "3̦" <Same>
		'33 326', // DIGIT THREE + COMBINING COMMA BELOW [Zyyy,Zinh]=>[ALL]
		//IDNA:0x498, // (Ҙ) CYRILLIC CAPITAL LETTER ZE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "3," <Same>
		'33 2C', // DIGIT THREE + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F104, // (🄄) DIGIT THREE COMMA [Zyyy]=>[ALL]
	],
	[
		// "3." <Same>
		'33 2E', // DIGIT THREE + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x248A, // (⒊) DIGIT THREE FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "3l日" <Same>
		'33 6C 65E5', // DIGIT THREE + LATIN SMALL LETTER L + CJK Ideograph-65E5 <6118/20992> [Zyyy,Latn,Hani]=>[]
		//IDNA:0x33FE, // (㏾) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY THIRTY-ONE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "3O日" <Same>
		'33 4F 65E5', // DIGIT THREE + LATIN CAPITAL LETTER O + CJK Ideograph-65E5 <6118/20992> [Zyyy,Latn,Hani]=>[]
		//IDNA:0x33FD, // (㏽) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY THIRTY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "3日" <Same>
		'33 65E5', // DIGIT THREE + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E2, // (㏢) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY THREE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "3月" <Same>
		'33 6708', // DIGIT THREE + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C2, // (㋂) IDEOGRAPHIC TELEGRAPH SYMBOL FOR MARCH [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "3点" <Same>
		'33 70B9', // DIGIT THREE + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x335B, // (㍛) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR THREE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "٤" <Same>
		'664', // ARABIC-INDIC DIGIT FOUR [Arab]=>[Arab,Thaa,Yezi]
		valid(0x664), // (٤) ARABIC-INDIC DIGIT FOUR [Arab]=>[Arab,Thaa,Yezi] (20221008: allowed by discussion)
		valid(0x6F4), // (۴) EXTENDED ARABIC-INDIC DIGIT FOUR [Arab]=>[Arab]
	],
	[
		// "४" <Same>
		'96A', // DEVANAGARI DIGIT FOUR [Deva]=>[Deva Dogr,Kthi,Mahj]
		valid(0x96A), // (४) DEVANAGARI DIGIT FOUR [Deva]=>[Deva Dogr,Kthi,Mahj]
		0xAEA, // (૪) GUJARATI DIGIT FOUR [Gujr]=>[Gujr,Khoj]
	],
	[
		// "➃" <Same>
		'2783', // DINGBAT CIRCLED SANS-SERIF DIGIT FOUR [Zyyy]=>[ALL]
		//DISALLOW:0x2783, // (➃) DINGBAT CIRCLED SANS-SERIF DIGIT FOUR [Zyyy]=>[ALL]
		//IDNA:0x2463, // (④) CIRCLED DIGIT FOUR [Zyyy]=>[ALL]
	],
	[
		// "4," <Same>
		'34 2C', // DIGIT FOUR + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F105, // (🄅) DIGIT FOUR COMMA [Zyyy]=>[ALL]
	],
	[
		// "4." <Same>
		'34 2E', // DIGIT FOUR + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x248B, // (⒋) DIGIT FOUR FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "4·" <Same>
		'34 B7', // DIGIT FOUR + MIDDLE DOT [Zyyy]=>[ALL]
		0x1530, // (ᔰ) CANADIAN SYLLABICS WEST-CREE YWE [Cans]=>[Cans]
	],
	[
		// "4日" <Same>
		'34 65E5', // DIGIT FOUR + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E3, // (㏣) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY FOUR [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "4月" <Same>
		'34 6708', // DIGIT FOUR + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C3, // (㋃) IDEOGRAPHIC TELEGRAPH SYMBOL FOR APRIL [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "4点" <Same>
		'34 70B9', // DIGIT FOUR + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x335C, // (㍜) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR FOUR [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "➄" <Same>
		'2784', // DINGBAT CIRCLED SANS-SERIF DIGIT FIVE [Zyyy]=>[ALL]
		//DISALLOW:0x2784, // (➄) DINGBAT CIRCLED SANS-SERIF DIGIT FIVE [Zyyy]=>[ALL]
		//IDNA:0x2464, // (⑤) CIRCLED DIGIT FIVE [Zyyy]=>[ALL]
	],
	[
		// "5," <Same>
		'35 2C', // DIGIT FIVE + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F106, // (🄆) DIGIT FIVE COMMA [Zyyy]=>[ALL]
	],
	[
		// "5." <Same>
		'35 2E', // DIGIT FIVE + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x248C, // (⒌) DIGIT FIVE FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "5日" <Same>
		'35 65E5', // DIGIT FIVE + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E4, // (㏤) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY FIVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "5月" <Same>
		'35 6708', // DIGIT FIVE + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C4, // (㋄) IDEOGRAPHIC TELEGRAPH SYMBOL FOR MAY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "5点" <Same>
		'35 70B9', // DIGIT FIVE + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x335D, // (㍝) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR FIVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "٦" <Same>
		'666', // ARABIC-INDIC DIGIT SIX [Arab]=>[Arab,Thaa,Yezi]
		valid(0x666), // (٦) ARABIC-INDIC DIGIT SIX [Arab]=>[Arab,Thaa,Yezi] (20221008: allowed by discussion)
		valid(0x6F6), // (۶) EXTENDED ARABIC-INDIC DIGIT SIX [Arab]=>[Arab]
	],
	[
		// "৬" <Same>
		'9EC', // BENGALI DIGIT SIX [Beng]=>[Beng,Cakm,Sylo]
		0x9EC, // (৬) BENGALI DIGIT SIX [Beng]=>[Beng,Cakm,Sylo]
		0x114D6, // (𑓖) TIRHUTA DIGIT SIX [Tirh]=>[Tirh]
	],
	[
		// "➅" <Same>
		'2785', // DINGBAT CIRCLED SANS-SERIF DIGIT SIX [Zyyy]=>[ALL]
		//DISALLOW:0x2785, // (➅) DINGBAT CIRCLED SANS-SERIF DIGIT SIX [Zyyy]=>[ALL]
		//IDNA:0x2465, // (⑥) CIRCLED DIGIT SIX [Zyyy]=>[ALL]
	],
	[
		// "6," <Same>
		'36 2C', // DIGIT SIX + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F107, // (🄇) DIGIT SIX COMMA [Zyyy]=>[ALL]
	],
	[
		// "6." <Same>
		'36 2E', // DIGIT SIX + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x248D, // (⒍) DIGIT SIX FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "6日" <Same>
		'36 65E5', // DIGIT SIX + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E5, // (㏥) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY SIX [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "6月" <Same>
		'36 6708', // DIGIT SIX + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C5, // (㋅) IDEOGRAPHIC TELEGRAPH SYMBOL FOR JUNE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "6点" <Same>
		'36 70B9', // DIGIT SIX + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x335E, // (㍞) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR SIX [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "➆" <Same>
		'2786', // DINGBAT CIRCLED SANS-SERIF DIGIT SEVEN [Zyyy]=>[ALL]
		//DISALLOW:0x2786, // (➆) DINGBAT CIRCLED SANS-SERIF DIGIT SEVEN [Zyyy]=>[ALL]
		//IDNA:0x2466, // (⑦) CIRCLED DIGIT SEVEN [Zyyy]=>[ALL]
	],
	[
		// "7," <Same>
		'37 2C', // DIGIT SEVEN + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F108, // (🄈) DIGIT SEVEN COMMA [Zyyy]=>[ALL]
	],
	[
		// "7." <Same>
		'37 2E', // DIGIT SEVEN + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x248E, // (⒎) DIGIT SEVEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "7日" <Same>
		'37 65E5', // DIGIT SEVEN + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E6, // (㏦) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY SEVEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "7月" <Same>
		'37 6708', // DIGIT SEVEN + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C6, // (㋆) IDEOGRAPHIC TELEGRAPH SYMBOL FOR JULY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "7点" <Same>
		'37 70B9', // DIGIT SEVEN + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x335F, // (㍟) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR SEVEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "८" <Same>
		'96E', // DEVANAGARI DIGIT EIGHT [Deva]=>[Deva Dogr,Kthi,Mahj]
		valid(0x96E), // (८) DEVANAGARI DIGIT EIGHT [Deva]=>[Deva Dogr,Kthi,Mahj]
		0xAEE, // (૮) GUJARATI DIGIT EIGHT [Gujr]=>[Gujr,Khoj]
	],
	[
		// "➇" <Same>
		'2787', // DINGBAT CIRCLED SANS-SERIF DIGIT EIGHT [Zyyy]=>[ALL]
		//DISALLOW:0x2787, // (➇) DINGBAT CIRCLED SANS-SERIF DIGIT EIGHT [Zyyy]=>[ALL]
		//IDNA:0x2467, // (⑧) CIRCLED DIGIT EIGHT [Zyyy]=>[ALL]
	],
	[
		// "8," <Same>
		'38 2C', // DIGIT EIGHT + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F109, // (🄉) DIGIT EIGHT COMMA [Zyyy]=>[ALL]
	],
	[
		// "8." <Same>
		'38 2E', // DIGIT EIGHT + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x248F, // (⒏) DIGIT EIGHT FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "8日" <Same>
		'38 65E5', // DIGIT EIGHT + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E7, // (㏧) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY EIGHT [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "8月" <Same>
		'38 6708', // DIGIT EIGHT + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C7, // (㋇) IDEOGRAPHIC TELEGRAPH SYMBOL FOR AUGUST [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "8点" <Same>
		'38 70B9', // DIGIT EIGHT + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3360, // (㍠) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR EIGHT [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "٩" <Same>
		'669', // ARABIC-INDIC DIGIT NINE [Arab]=>[Arab,Thaa,Yezi]
		valid(0x669), // (٩) ARABIC-INDIC DIGIT NINE [Arab]=>[Arab,Thaa,Yezi]
		valid(0x967), // (१) DEVANAGARI DIGIT ONE [Deva]=>[Deva Dogr,Kthi,Mahj]
		0x118E4, // (𑣤) WARANG CITI DIGIT FOUR [Wara]=>[Wara]
		0x6F9, // (۹) EXTENDED ARABIC-INDIC DIGIT NINE [Arab]=>[Arab]
	],
	[
		// "౯" <Same>
		'C6F', // TELUGU DIGIT NINE [Telu]=>[Telu]
		0xC6F, // (౯) TELUGU DIGIT NINE [Telu]=>[Telu]
		0xCEF, // (೯) KANNADA DIGIT NINE [Knda]=>[Knda,Nand]
	],
	[
		// "➈" <Same>
		'2788', // DINGBAT CIRCLED SANS-SERIF DIGIT NINE [Zyyy]=>[ALL]
		//DISALLOW:0x2788, // (➈) DINGBAT CIRCLED SANS-SERIF DIGIT NINE [Zyyy]=>[ALL]
		//IDNA:0x2468, // (⑨) CIRCLED DIGIT NINE [Zyyy]=>[ALL]
	],
	[
		// "9," <Same>
		'39 2C', // DIGIT NINE + COMMA [Zyyy]=>[ALL]
		//IDNA:0x1F10A, // (🄊) DIGIT NINE COMMA [Zyyy]=>[ALL]
	],
	[
		// "9." <Same>
		'39 2E', // DIGIT NINE + FULL STOP [Zyyy]=>[ALL]
		//IDNA:0x2490, // (⒐) DIGIT NINE FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "9日" <Same>
		'39 65E5', // DIGIT NINE + CJK Ideograph-65E5 <6118/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x33E8, // (㏨) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY NINE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "9月" <Same>
		'39 6708', // DIGIT NINE + CJK Ideograph-6708 <6409/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x32C8, // (㋈) IDEOGRAPHIC TELEGRAPH SYMBOL FOR SEPTEMBER [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "9点" <Same>
		'39 70B9', // DIGIT NINE + CJK Ideograph-70B9 <8890/20992> [Zyyy,Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3361, // (㍡) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR NINE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "◌ͣ" <Same>
		'363', // COMBINING LATIN SMALL LETTER A [Zinh]=>[Latn]
		//DISALLOW:0x363, // (◌ͣ) COMBINING LATIN SMALL LETTER A [Zinh]=>[Latn]
		//DISALLOW:0x2DF6, // (◌ⷶ) COMBINING CYRILLIC LETTER A [Cyrl]=>[Cyrl]
	],
	[
		// "a" <Same>
		'61', // LATIN SMALL LETTER A [Latn]=>[Latn]
		valid(0x61), // (a) LATIN SMALL LETTER A [Latn]=>[Latn]
		//DISALLOW:0x237A, // (⍺) APL FUNCTIONAL SYMBOL ALPHA [Zyyy]=>[ALL]
		//IDNA:0xFF41, // (ａ) FULLWIDTH LATIN SMALL LETTER A [Latn]=>[Latn]
		//IDNA:0x1D41A, // (𝐚) MATHEMATICAL BOLD SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D44E, // (𝑎) MATHEMATICAL ITALIC SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D482, // (𝒂) MATHEMATICAL BOLD ITALIC SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D4B6, // (𝒶) MATHEMATICAL SCRIPT SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D4EA, // (𝓪) MATHEMATICAL BOLD SCRIPT SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D51E, // (𝔞) MATHEMATICAL FRAKTUR SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D552, // (𝕒) MATHEMATICAL DOUBLE-STRUCK SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D586, // (𝖆) MATHEMATICAL BOLD FRAKTUR SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D5BA, // (𝖺) MATHEMATICAL SANS-SERIF SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D5EE, // (𝗮) MATHEMATICAL SANS-SERIF BOLD SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D622, // (𝘢) MATHEMATICAL SANS-SERIF ITALIC SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D656, // (𝙖) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL A [Zyyy]=>[ALL]
		//IDNA:0x1D68A, // (𝚊) MATHEMATICAL MONOSPACE SMALL A [Zyyy]=>[ALL]
		//DISALLOW:0x251, // (ɑ) LATIN SMALL LETTER ALPHA [Latn]=>[Latn]
		0x3B1, // (α) GREEK SMALL LETTER ALPHA [Grek]=>[Grek]
		//IDNA:0x1D6C2, // (𝛂) MATHEMATICAL BOLD SMALL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D6FC, // (𝛼) MATHEMATICAL ITALIC SMALL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D736, // (𝜶) MATHEMATICAL BOLD ITALIC SMALL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D770, // (𝝰) MATHEMATICAL SANS-SERIF BOLD SMALL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D7AA, // (𝞪) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL ALPHA [Zyyy]=>[ALL]
		0x430, // (а) CYRILLIC SMALL LETTER A [Cyrl]=>[Cyrl]
		// 20221202: merge case
		// "A" <Same>
		//'41', // LATIN CAPITAL LETTER A [Latn]=>[Latn]
		//IDNA:0x41, // (A) LATIN CAPITAL LETTER A [Latn]=>[Latn]
		//IDNA:0xFF21, // (Ａ) FULLWIDTH LATIN CAPITAL LETTER A [Latn]=>[Latn]
		//IDNA:0x1D400, // (𝐀) MATHEMATICAL BOLD CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D434, // (𝐴) MATHEMATICAL ITALIC CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D468, // (𝑨) MATHEMATICAL BOLD ITALIC CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D49C, // (𝒜) MATHEMATICAL SCRIPT CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D4D0, // (𝓐) MATHEMATICAL BOLD SCRIPT CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D504, // (𝔄) MATHEMATICAL FRAKTUR CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D538, // (𝔸) MATHEMATICAL DOUBLE-STRUCK CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D56C, // (𝕬) MATHEMATICAL BOLD FRAKTUR CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D5A0, // (𝖠) MATHEMATICAL SANS-SERIF CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D5D4, // (𝗔) MATHEMATICAL SANS-SERIF BOLD CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D608, // (𝘈) MATHEMATICAL SANS-SERIF ITALIC CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D63C, // (𝘼) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x1D670, // (𝙰) MATHEMATICAL MONOSPACE CAPITAL A [Zyyy]=>[ALL]
		//IDNA:0x391, // (Α) GREEK CAPITAL LETTER ALPHA [Grek]=>[Grek]
		//IDNA:0x1D6A8, // (𝚨) MATHEMATICAL BOLD CAPITAL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D6E2, // (𝛢) MATHEMATICAL ITALIC CAPITAL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D71C, // (𝜜) MATHEMATICAL BOLD ITALIC CAPITAL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D756, // (𝝖) MATHEMATICAL SANS-SERIF BOLD CAPITAL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x1D790, // (𝞐) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL ALPHA [Zyyy]=>[ALL]
		//IDNA:0x410, // (А) CYRILLIC CAPITAL LETTER A [Cyrl]=>[Cyrl]
		0x13AA, // (Ꭺ) CHEROKEE LETTER GO [Cher]=>[Cher]
		0x15C5, // (ᗅ) CANADIAN SYLLABICS CARRIER GHO [Cans]=>[Cans]
		0xA4EE, // (ꓮ) LISU LETTER A [Lisu]=>[Lisu]
		0x16F40, // (𖽀) MIAO LETTER ZZYA [Plrd]=>[Plrd]
		0x102A0, // (𐊠) CARIAN LETTER A [Cari]=>[Cari]
	],
	[
		// "a̲" <Same>
		'61 332', // LATIN SMALL LETTER A + COMBINING LOW LINE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2376, // (⍶) APL FUNCTIONAL SYMBOL ALPHA UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "ă" <NFC(true) NFD(false)>
		'103', // LATIN SMALL LETTER A WITH BREVE [Latn]=>[Latn]
		0x103, // (ă) LATIN SMALL LETTER A WITH BREVE [Latn]=>[Latn]
		0x1CE, // (ǎ) LATIN SMALL LETTER A WITH CARON [Latn]=>[Latn]
	],
	[
		// "Ă" <NFC(true) NFD(false)>
		'102', // LATIN CAPITAL LETTER A WITH BREVE [Latn]=>[Latn]
		//IDNA:0x102, // (Ă) LATIN CAPITAL LETTER A WITH BREVE [Latn]=>[Latn]
		//IDNA:0x1CD, // (Ǎ) LATIN CAPITAL LETTER A WITH CARON [Latn]=>[Latn]
	],
	[
		// "å" <NFC(true) NFD(false)>
		'E5', // LATIN SMALL LETTER A WITH RING ABOVE [Latn]=>[Latn]
		0xE5, // (å) LATIN SMALL LETTER A WITH RING ABOVE [Latn]=>[Latn]
		0x227, // (ȧ) LATIN SMALL LETTER A WITH DOT ABOVE [Latn]=>[Latn]
	],
	[
		// "Å" <NFC(true) NFD(false)>
		'C5', // LATIN CAPITAL LETTER A WITH RING ABOVE [Latn]=>[Latn]
		//IDNA:0xC5, // (Å) LATIN CAPITAL LETTER A WITH RING ABOVE [Latn]=>[Latn]
		//IDNA:0x226, // (Ȧ) LATIN CAPITAL LETTER A WITH DOT ABOVE [Latn]=>[Latn]
	],
	[
		// "ả" <NFC(true) NFD(false)>
		'1EA3', // LATIN SMALL LETTER A WITH HOOK ABOVE [Latn]=>[Latn]
		0x1EA3, // (ả) LATIN SMALL LETTER A WITH HOOK ABOVE [Latn]=>[Latn]
		//IDNA:0x1E9A, // (ẚ) LATIN SMALL LETTER A WITH RIGHT HALF RING [Latn]=>[Latn]
	],
	[
		// "a/c" <Same>
		'61 2F 63', // LATIN SMALL LETTER A + SOLIDUS + LATIN SMALL LETTER C [Latn,Zyyy]=>[Latn]
		//IDNA:0x2100, // (℀) ACCOUNT OF [Zyyy]=>[ALL]
	],
	[
		// "a/s" <Same>
		'61 2F 73', // LATIN SMALL LETTER A + SOLIDUS + LATIN SMALL LETTER S [Latn,Zyyy]=>[Latn]
		//IDNA:0x2101, // (℁) ADDRESSED TO THE SUBJECT [Zyyy]=>[ALL]
	],
	[
		// "aa" <Same>
		'61 61', // LATIN SMALL LETTER A + LATIN SMALL LETTER A [Latn]=>[Latn]
		//DISALLOW:0xA733, // (ꜳ) LATIN SMALL LETTER AA [Latn]=>[Latn]
	],
	[
		// "AA" <Same>
		'41 41', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER A [Latn]=>[Latn]
		//IDNA:0xA732, // (Ꜳ) LATIN CAPITAL LETTER AA [Latn]=>[Latn]
	],
	[
		// "ae" <Same>
		'61 65', // LATIN SMALL LETTER A + LATIN SMALL LETTER E [Latn]=>[Latn]
		valid(0xE6), // (æ) LATIN SMALL LETTER AE [Latn]=>[Latn]
		0x4D5, // (ӕ) CYRILLIC SMALL LIGATURE A IE [Cyrl]=>[Cyrl]
	],
	[
		// "AE" <Same>
		'41 45', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER E [Latn]=>[Latn]
		//IDNA:0xC6, // (Æ) LATIN CAPITAL LETTER AE [Latn]=>[Latn]
		//IDNA:0x4D4, // (Ӕ) CYRILLIC CAPITAL LIGATURE A IE [Cyrl]=>[Cyrl]
	],
	[
		// "ao" <Same>
		'61 6F', // LATIN SMALL LETTER A + LATIN SMALL LETTER O [Latn]=>[Latn]
		//DISALLOW:0xA735, // (ꜵ) LATIN SMALL LETTER AO [Latn]=>[Latn]
	],
	[
		// "AO" <Same>
		'41 4F', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER O [Latn]=>[Latn]
		//IDNA:0xA734, // (Ꜵ) LATIN CAPITAL LETTER AO [Latn]=>[Latn]
	],
	[
		// "AR" <Same>
		'41 52', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER R [Latn]=>[Latn]
		//DISALLOW:0x1F707, // (🜇) ALCHEMICAL SYMBOL FOR AQUA REGIA-2 [Zyyy]=>[ALL]
	],
	[
		// "au" <Same>
		'61 75', // LATIN SMALL LETTER A + LATIN SMALL LETTER U [Latn]=>[Latn]
		//DISALLOW:0xA737, // (ꜷ) LATIN SMALL LETTER AU [Latn]=>[Latn]
	],
	[
		// "AU" <Same>
		'41 55', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER U [Latn]=>[Latn]
		//IDNA:0xA736, // (Ꜷ) LATIN CAPITAL LETTER AU [Latn]=>[Latn]
	],
	[
		// "av" <Same>
		'61 76', // LATIN SMALL LETTER A + LATIN SMALL LETTER V [Latn]=>[Latn]
		//DISALLOW:0xA739, // (ꜹ) LATIN SMALL LETTER AV [Latn]=>[Latn]
		//DISALLOW:0xA73B, // (ꜻ) LATIN SMALL LETTER AV WITH HORIZONTAL BAR [Latn]=>[Latn]
	],
	[
		// "AV" <Same>
		'41 56', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER V [Latn]=>[Latn]
		//IDNA:0xA738, // (Ꜹ) LATIN CAPITAL LETTER AV [Latn]=>[Latn]
		//IDNA:0xA73A, // (Ꜻ) LATIN CAPITAL LETTER AV WITH HORIZONTAL BAR [Latn]=>[Latn]
	],
	[
		// "ay" <Same>
		'61 79', // LATIN SMALL LETTER A + LATIN SMALL LETTER Y [Latn]=>[Latn]
		//DISALLOW:0xA73D, // (ꜽ) LATIN SMALL LETTER AY [Latn]=>[Latn]
	],
	[
		// "AY" <Same>
		'41 59', // LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER Y [Latn]=>[Latn]
		//IDNA:0xA73C, // (Ꜽ) LATIN CAPITAL LETTER AY [Latn]=>[Latn]
	],
	[
		// "ᴀ" <Same>
		'1D00', // LATIN LETTER SMALL CAPITAL A [Latn]=>[Latn]
		//DISALLOW:0x1D00, // (ᴀ) LATIN LETTER SMALL CAPITAL A [Latn]=>[Latn]
		//IDNA:0xAB7A, // (ꭺ) CHEROKEE SMALL LETTER GO [Cher]=>[Cher]
	],
	[
		// "Ɐ" <Same>
		'2C6F', // LATIN CAPITAL LETTER TURNED A [Latn]=>[Latn]
		//IDNA:0x2C6F, // (Ɐ) LATIN CAPITAL LETTER TURNED A [Latn]=>[Latn]
		//DISALLOW:0x2200, // (∀) FOR ALL [Zyyy]=>[ALL]
		//DISALLOW:0x1D217, // (𝈗) GREEK VOCAL NOTATION SYMBOL-24 [Grek]=>[Grek]
		0x15C4, // (ᗄ) CANADIAN SYLLABICS CARRIER GHU [Cans]=>[Cans]
		0xA4EF, // (ꓯ) LISU LETTER AE [Lisu]=>[Lisu]
	],
	[
		// "Ɒ" <Same>
		'2C70', // LATIN CAPITAL LETTER TURNED ALPHA [Latn]=>[Latn]
		//IDNA:0x2C70, // (Ɒ) LATIN CAPITAL LETTER TURNED ALPHA [Latn]=>[Latn]
		//IDNA:0x1041F, // (𐐟) DESERET CAPITAL LETTER ESH [Dsrt]=>[Dsrt]
	],
	[
		// "b" <Same>
		'62', // LATIN SMALL LETTER B [Latn]=>[Latn]
		valid(0x62), // (b) LATIN SMALL LETTER B [Latn]=>[Latn]
		//IDNA:0x1D41B, // (𝐛) MATHEMATICAL BOLD SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D44F, // (𝑏) MATHEMATICAL ITALIC SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D483, // (𝒃) MATHEMATICAL BOLD ITALIC SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D4B7, // (𝒷) MATHEMATICAL SCRIPT SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D4EB, // (𝓫) MATHEMATICAL BOLD SCRIPT SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D51F, // (𝔟) MATHEMATICAL FRAKTUR SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D553, // (𝕓) MATHEMATICAL DOUBLE-STRUCK SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D587, // (𝖇) MATHEMATICAL BOLD FRAKTUR SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D5BB, // (𝖻) MATHEMATICAL SANS-SERIF SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D5EF, // (𝗯) MATHEMATICAL SANS-SERIF BOLD SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D623, // (𝘣) MATHEMATICAL SANS-SERIF ITALIC SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D657, // (𝙗) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL B [Zyyy]=>[ALL]
		//IDNA:0x1D68B, // (𝚋) MATHEMATICAL MONOSPACE SMALL B [Zyyy]=>[ALL]
		//IDNA:0x184, // (Ƅ) LATIN CAPITAL LETTER TONE SIX [Latn]=>[Latn]
		//IDNA:0x42C, // (Ь) CYRILLIC CAPITAL LETTER SOFT SIGN [Cyrl]=>[Cyrl]
		0x13CF, // (Ꮟ) CHEROKEE LETTER SI [Cher]=>[Cher]
		0x1472, // (ᑲ) CANADIAN SYLLABICS KA [Cans]=>[Cans]
		0x15AF, // (ᖯ) CANADIAN SYLLABICS AIVILIK B [Cans]=>[Cans]
		// 20221202: merge case
		// "B" <Same>
		//'42', // LATIN CAPITAL LETTER B [Latn]=>[Latn]
		//IDNA:0x42, // (B) LATIN CAPITAL LETTER B [Latn]=>[Latn]
		//IDNA:0xFF22, // (Ｂ) FULLWIDTH LATIN CAPITAL LETTER B [Latn]=>[Latn]
		//IDNA:0x212C, // (ℬ) SCRIPT CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D401, // (𝐁) MATHEMATICAL BOLD CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D435, // (𝐵) MATHEMATICAL ITALIC CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D469, // (𝑩) MATHEMATICAL BOLD ITALIC CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D4D1, // (𝓑) MATHEMATICAL BOLD SCRIPT CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D505, // (𝔅) MATHEMATICAL FRAKTUR CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D539, // (𝔹) MATHEMATICAL DOUBLE-STRUCK CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D56D, // (𝕭) MATHEMATICAL BOLD FRAKTUR CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D5A1, // (𝖡) MATHEMATICAL SANS-SERIF CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D5D5, // (𝗕) MATHEMATICAL SANS-SERIF BOLD CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D609, // (𝘉) MATHEMATICAL SANS-SERIF ITALIC CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D63D, // (𝘽) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0x1D671, // (𝙱) MATHEMATICAL MONOSPACE CAPITAL B [Zyyy]=>[ALL]
		//IDNA:0xA7B4, // (Ꞵ) LATIN CAPITAL LETTER BETA [Latn]=>[Latn]
		//IDNA:0x392, // (Β) GREEK CAPITAL LETTER BETA [Grek]=>[Grek]
		//IDNA:0x1D6A9, // (𝚩) MATHEMATICAL BOLD CAPITAL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D6E3, // (𝛣) MATHEMATICAL ITALIC CAPITAL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D71D, // (𝜝) MATHEMATICAL BOLD ITALIC CAPITAL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D757, // (𝝗) MATHEMATICAL SANS-SERIF BOLD CAPITAL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D791, // (𝞑) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL BETA [Zyyy]=>[ALL]
		//IDNA:0x412, // (В) CYRILLIC CAPITAL LETTER VE [Cyrl]=>[Cyrl]
		0x13F4, // (Ᏼ) CHEROKEE LETTER YV [Cher]=>[Cher]
		0x15F7, // (ᗷ) CANADIAN SYLLABICS CARRIER KHE [Cans]=>[Cans]
		0xA4D0, // (ꓐ) LISU LETTER BA [Lisu]=>[Lisu]
		0x10282, // (𐊂) LYCIAN LETTER B [Lyci]=>[Lyci]
		0x102A1, // (𐊡) CARIAN LETTER P2 [Cari]=>[Cari]
		0x10301, // (𐌁) OLD ITALIC LETTER BE [Ital]=>[Ital]
	],
	[
		// "b̔" <Same>
		'62 314', // LATIN SMALL LETTER B + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x253, // (ɓ) LATIN SMALL LETTER B WITH HOOK [Latn]=>[Latn]
	],
	[
		// "ḃ" <NFC(false) NFD(true)>
		'62 307', // LATIN SMALL LETTER B + COMBINING DOT ABOVE [Latn,Zinh]=>[Latn]
		0x1473, // (ᑳ) CANADIAN SYLLABICS KAA [Cans]=>[Cans]
	],
	[
		// "b̄" <Same>
		'62 304', // LATIN SMALL LETTER B + COMBINING MACRON [Latn,Zinh]=>[Latn]
		//DISALLOW:0x183, // (ƃ) LATIN SMALL LETTER B WITH TOPBAR [Latn]=>[Latn]
		//IDNA:0x182, // (Ƃ) LATIN CAPITAL LETTER B WITH TOPBAR [Latn]=>[Latn]
		//IDNA:0x411, // (Б) CYRILLIC CAPITAL LETTER BE [Cyrl]=>[Cyrl]
	],
	[
		// "b̵" <Same>
		'62 335', // LATIN SMALL LETTER B + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x180, // (ƀ) LATIN SMALL LETTER B WITH STROKE [Latn]=>[Latn]
		0x48D, // (ҍ) CYRILLIC SMALL LETTER SEMISOFT SIGN [Cyrl]=>[Cyrl]
		//IDNA:0x48C, // (Ҍ) CYRILLIC CAPITAL LETTER SEMISOFT SIGN [Cyrl]=>[Cyrl]
		//DISALLOW:0x463, // (ѣ) CYRILLIC SMALL LETTER YAT [Cyrl]=>[Cyrl]
		//IDNA:0x462, // (Ѣ) CYRILLIC CAPITAL LETTER YAT [Cyrl]=>[Cyrl]
	],
	[
		// "b·" <Same>
		'62 B7', // LATIN SMALL LETTER B + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x147F, // (ᑿ) CANADIAN SYLLABICS WEST-CREE KWA [Cans]=>[Cans]
	],
	[
		// "ḃ·" <NFC(false) NFD(true)>
		'62 307 B7', // LATIN SMALL LETTER B + COMBINING DOT ABOVE + MIDDLE DOT [Latn,Zinh,Zyyy]=>[Latn]
		0x1481, // (ᒁ) CANADIAN SYLLABICS WEST-CREE KWAA [Cans]=>[Cans]
	],
	[
		// "b'" <Same>
		'62 27', // LATIN SMALL LETTER B + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x1488, // (ᒈ) CANADIAN SYLLABICS SOUTH-SLAVEY KAH [Cans]=>[Cans]
	],
	[
		// "bl" <Same>
		'62 6C', // LATIN SMALL LETTER B + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x42B, // (Ы) CYRILLIC CAPITAL LETTER YERU [Cyrl]=>[Cyrl]
	],
	[
		// "ʙ" <Same>
		'299', // LATIN LETTER SMALL CAPITAL B [Latn]=>[Latn]
		//DISALLOW:0x299, // (ʙ) LATIN LETTER SMALL CAPITAL B [Latn]=>[Latn]
		0x432, // (в) CYRILLIC SMALL LETTER VE [Cyrl]=>[Cyrl]
		//IDNA:0x13FC, // (ᏼ) CHEROKEE SMALL LETTER YV [Cher]=>[Cher]
	],
	[
		// "◌ͨ" <Same>
		'368', // COMBINING LATIN SMALL LETTER C [Zinh]=>[Latn]
		//DISALLOW:0x368, // (◌ͨ) COMBINING LATIN SMALL LETTER C [Zinh]=>[Latn]
		//DISALLOW:0x2DED, // (◌ⷭ) COMBINING CYRILLIC LETTER ES [Cyrl]=>[Cyrl]
	],
	[
		// "c" <Same>
		'63', // LATIN SMALL LETTER C [Latn]=>[Latn]
		valid(0x63), // (c) LATIN SMALL LETTER C [Latn]=>[Latn]
		//IDNA:0xFF43, // (ｃ) FULLWIDTH LATIN SMALL LETTER C [Latn]=>[Latn]
		//IDNA:0x217D, // (ⅽ) SMALL ROMAN NUMERAL ONE HUNDRED [Latn]=>[Latn]
		//IDNA:0x1D41C, // (𝐜) MATHEMATICAL BOLD SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D450, // (𝑐) MATHEMATICAL ITALIC SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D484, // (𝒄) MATHEMATICAL BOLD ITALIC SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D4B8, // (𝒸) MATHEMATICAL SCRIPT SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D4EC, // (𝓬) MATHEMATICAL BOLD SCRIPT SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D520, // (𝔠) MATHEMATICAL FRAKTUR SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D554, // (𝕔) MATHEMATICAL DOUBLE-STRUCK SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D588, // (𝖈) MATHEMATICAL BOLD FRAKTUR SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D5BC, // (𝖼) MATHEMATICAL SANS-SERIF SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D5F0, // (𝗰) MATHEMATICAL SANS-SERIF BOLD SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D624, // (𝘤) MATHEMATICAL SANS-SERIF ITALIC SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D658, // (𝙘) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL C [Zyyy]=>[ALL]
		//IDNA:0x1D68C, // (𝚌) MATHEMATICAL MONOSPACE SMALL C [Zyyy]=>[ALL]
		//DISALLOW:0x1D04, // (ᴄ) LATIN LETTER SMALL CAPITAL C [Latn]=>[Latn]
		//IDNA:0x3F2, // (ϲ) GREEK LUNATE SIGMA SYMBOL [Grek]=>[Grek]
		0x2CA5, // (ⲥ) COPTIC SMALL LETTER SIMA [Copt]=>[Copt]
		0x441, // (с) CYRILLIC SMALL LETTER ES [Cyrl]=>[Cyrl]
		//IDNA:0xABAF, // (ꮯ) CHEROKEE SMALL LETTER TLI [Cher]=>[Cher]
		0x1043D, // (𐐽) DESERET SMALL LETTER CHEE [Dsrt]=>[Dsrt]
		// 20221202: merge case
		// "C" <Same>
		//'43', // LATIN CAPITAL LETTER C [Latn]=>[Latn]
		//IDNA:0x43, // (C) LATIN CAPITAL LETTER C [Latn]=>[Latn]
		//DISALLOW:0x1F74C, // (🝌) ALCHEMICAL SYMBOL FOR CALX [Zyyy]=>[ALL]
		0x118F2, // (𑣲) WARANG CITI NUMBER NINETY [Wara]=>[Wara]
		0x118E9, // (𑣩) WARANG CITI DIGIT NINE [Wara]=>[Wara]
		//IDNA:0xFF23, // (Ｃ) FULLWIDTH LATIN CAPITAL LETTER C [Latn]=>[Latn]
		//IDNA:0x216D, // (Ⅽ) ROMAN NUMERAL ONE HUNDRED [Latn]=>[Latn]
		//IDNA:0x2102, // (ℂ) DOUBLE-STRUCK CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x212D, // (ℭ) BLACK-LETTER CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D402, // (𝐂) MATHEMATICAL BOLD CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D436, // (𝐶) MATHEMATICAL ITALIC CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D46A, // (𝑪) MATHEMATICAL BOLD ITALIC CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D49E, // (𝒞) MATHEMATICAL SCRIPT CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D4D2, // (𝓒) MATHEMATICAL BOLD SCRIPT CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D56E, // (𝕮) MATHEMATICAL BOLD FRAKTUR CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D5A2, // (𝖢) MATHEMATICAL SANS-SERIF CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D5D6, // (𝗖) MATHEMATICAL SANS-SERIF BOLD CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D60A, // (𝘊) MATHEMATICAL SANS-SERIF ITALIC CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D63E, // (𝘾) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x1D672, // (𝙲) MATHEMATICAL MONOSPACE CAPITAL C [Zyyy]=>[ALL]
		//IDNA:0x3F9, // (Ϲ) GREEK CAPITAL LUNATE SIGMA SYMBOL [Grek]=>[Grek]
		//IDNA:0x2CA4, // (Ⲥ) COPTIC CAPITAL LETTER SIMA [Copt]=>[Copt]
		//IDNA:0x421, // (С) CYRILLIC CAPITAL LETTER ES [Cyrl]=>[Cyrl]
		0x13DF, // (Ꮯ) CHEROKEE LETTER TLI [Cher]=>[Cher]
		0xA4DA, // (ꓚ) LISU LETTER CA [Lisu]=>[Lisu]
		0x102A2, // (𐊢) CARIAN LETTER D [Cari]=>[Cari]
		0x10302, // (𐌂) OLD ITALIC LETTER KE [Ital]=>[Ital]
		//IDNA:0x10415, // (𐐕) DESERET CAPITAL LETTER CHEE [Dsrt]=>[Dsrt]
		0x1051C, // (𐔜) ELBASAN LETTER SHE [Elba]=>[Elba]
	],
	[
		// "c̸" <Same>
		'63 338', // LATIN SMALL LETTER C + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		0xA2, // (¢) CENT SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x23C, // (ȼ) LATIN SMALL LETTER C WITH STROKE [Latn]=>[Latn]
	],
	[
		// "C⃫" <Same>
		'43 20EB', // LATIN CAPITAL LETTER C + COMBINING LONG DOUBLE SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		0x20A1, // (₡) COLON SIGN [Zyyy]=>[ALL]
	],
	[
		// "C⃠" <Same>
		'43 20E0', // LATIN CAPITAL LETTER C + COMBINING ENCLOSING CIRCLE BACKSLASH [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1F16E, // (🅮) CIRCLED C WITH OVERLAID BACKSLASH [Zyyy]=>[ALL]
	],
	[
		// "c̦" <Same>
		'63 326', // LATIN SMALL LETTER C + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		valid(0xE7), // (ç) LATIN SMALL LETTER C WITH CEDILLA [Latn]=>[Latn]
		0x4AB, // (ҫ) CYRILLIC SMALL LETTER ES WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "C̦" <Same>
		'43 326', // LATIN CAPITAL LETTER C + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0xC7, // (Ç) LATIN CAPITAL LETTER C WITH CEDILLA [Latn]=>[Latn]
		//IDNA:0x4AA, // (Ҫ) CYRILLIC CAPITAL LETTER ES WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "C'" <Same>
		'43 27', // LATIN CAPITAL LETTER C + APOSTROPHE [Latn,Zyyy]=>[Latn]
		//IDNA:0x187, // (Ƈ) LATIN CAPITAL LETTER C WITH HOOK [Latn]=>[Latn]
	],
	[
		// "c/o" <Same>
		'63 2F 6F', // LATIN SMALL LETTER C + SOLIDUS + LATIN SMALL LETTER O [Latn,Zyyy]=>[Latn]
		//IDNA:0x2105, // (℅) CARE OF [Zyyy]=>[ALL]
	],
	[
		// "c/u" <Same>
		'63 2F 75', // LATIN SMALL LETTER C + SOLIDUS + LATIN SMALL LETTER U [Latn,Zyyy]=>[Latn]
		//IDNA:0x2106, // (℆) CADA UNA [Zyyy]=>[ALL]
	],
	[
		// "㏄�⃝" <Same>
		'33C4 09 20DD', // SQUARE CC + CHARACTER TABULATION + COMBINING ENCLOSING CIRCLE [Zyyy,Zinh]=>[ALL]
		0x1F16D, // (🅭) CIRCLED CC [Zyyy]=>[ALL]
	],
	[
		// "ꞓ" <Same>
		'A793', // LATIN SMALL LETTER C WITH BAR [Latn]=>[Latn]
		//DISALLOW:0xA793, // (ꞓ) LATIN SMALL LETTER C WITH BAR [Latn]=>[Latn]
		//DISALLOW:0x22F4, // (⋴) SMALL ELEMENT OF WITH VERTICAL BAR AT END OF HORIZONTAL STROKE [Zyyy]=>[ALL]
		//DISALLOW:0x25B, // (ɛ) LATIN SMALL LETTER OPEN E [Latn]=>[Latn]
		0x3B5, // (ε) GREEK SMALL LETTER EPSILON [Grek]=>[Grek]
		//IDNA:0x3F5, // (ϵ) GREEK LUNATE EPSILON SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6C6, // (𝛆) MATHEMATICAL BOLD SMALL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D6DC, // (𝛜) MATHEMATICAL BOLD EPSILON SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D700, // (𝜀) MATHEMATICAL ITALIC SMALL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D716, // (𝜖) MATHEMATICAL ITALIC EPSILON SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D73A, // (𝜺) MATHEMATICAL BOLD ITALIC SMALL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D750, // (𝝐) MATHEMATICAL BOLD ITALIC EPSILON SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D774, // (𝝴) MATHEMATICAL SANS-SERIF BOLD SMALL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D78A, // (𝞊) MATHEMATICAL SANS-SERIF BOLD EPSILON SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D7AE, // (𝞮) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D7C4, // (𝟄) MATHEMATICAL SANS-SERIF BOLD ITALIC EPSILON SYMBOL [Zyyy]=>[ALL]
		0x2C89, // (ⲉ) COPTIC SMALL LETTER EIE [Copt]=>[Copt]
		0x454, // (є) CYRILLIC SMALL LETTER UKRAINIAN IE [Cyrl]=>[Cyrl]
		//DISALLOW:0x511, // (ԑ) CYRILLIC SMALL LETTER REVERSED ZE [Cyrl]=>[Cyrl]
		//IDNA:0xAB9B, // (ꮛ) CHEROKEE SMALL LETTER QUV [Cher]=>[Cher]
		0x118CE, // (𑣎) WARANG CITI SMALL LETTER YUJ [Wara]=>[Wara]
		0x10429, // (𐐩) DESERET SMALL LETTER LONG E [Dsrt]=>[Dsrt]
	],
	[
		// "Ꞓ" <Same>
		'A792', // LATIN CAPITAL LETTER C WITH BAR [Latn]=>[Latn]
		//IDNA:0xA792, // (Ꞓ) LATIN CAPITAL LETTER C WITH BAR [Latn]=>[Latn]
		0x20AC, // (€) EURO SIGN [Zyyy]=>[ALL]
		//IDNA:0x2C88, // (Ⲉ) COPTIC CAPITAL LETTER EIE [Copt]=>[Copt]
		//IDNA:0x404, // (Є) CYRILLIC CAPITAL LETTER UKRAINIAN IE [Cyrl]=>[Cyrl]
	],
	[
		// "ꞓ̲" <Same>
		'A793 332', // LATIN SMALL LETTER C WITH BAR + COMBINING LOW LINE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2377, // (⍷) APL FUNCTIONAL SYMBOL EPSILON UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "ꜿ" <Same>
		'A73F', // LATIN SMALL LETTER REVERSED C WITH DOT [Latn]=>[Latn]
		//DISALLOW:0xA73F, // (ꜿ) LATIN SMALL LETTER REVERSED C WITH DOT [Latn]=>[Latn]
		//DISALLOW:0x37D, // (ͽ) GREEK SMALL REVERSED DOTTED LUNATE SIGMA SYMBOL [Grek]=>[Grek]
	],
	[
		// "Ꜿ" <Same>
		'A73E', // LATIN CAPITAL LETTER REVERSED C WITH DOT [Latn]=>[Latn]
		//IDNA:0xA73E, // (Ꜿ) LATIN CAPITAL LETTER REVERSED C WITH DOT [Latn]=>[Latn]
		//IDNA:0x3FF, // (Ͽ) GREEK CAPITAL REVERSED DOTTED LUNATE SIGMA SYMBOL [Grek]=>[Grek]
	],
	[
		// "d" <Same>
		'64', // LATIN SMALL LETTER D [Latn]=>[Latn]
		valid(0x64), // (d) LATIN SMALL LETTER D [Latn]=>[Latn]
		//IDNA:0x217E, // (ⅾ) SMALL ROMAN NUMERAL FIVE HUNDRED [Latn]=>[Latn]
		//IDNA:0x2146, // (ⅆ) DOUBLE-STRUCK ITALIC SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D41D, // (𝐝) MATHEMATICAL BOLD SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D451, // (𝑑) MATHEMATICAL ITALIC SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D485, // (𝒅) MATHEMATICAL BOLD ITALIC SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D4B9, // (𝒹) MATHEMATICAL SCRIPT SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D4ED, // (𝓭) MATHEMATICAL BOLD SCRIPT SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D521, // (𝔡) MATHEMATICAL FRAKTUR SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D555, // (𝕕) MATHEMATICAL DOUBLE-STRUCK SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D589, // (𝖉) MATHEMATICAL BOLD FRAKTUR SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D5BD, // (𝖽) MATHEMATICAL SANS-SERIF SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D5F1, // (𝗱) MATHEMATICAL SANS-SERIF BOLD SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D625, // (𝘥) MATHEMATICAL SANS-SERIF ITALIC SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D659, // (𝙙) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL D [Zyyy]=>[ALL]
		//IDNA:0x1D68D, // (𝚍) MATHEMATICAL MONOSPACE SMALL D [Zyyy]=>[ALL]
		//DISALLOW:0x501, // (ԁ) CYRILLIC SMALL LETTER KOMI DE [Cyrl]=>[Cyrl]
		0x13E7, // (Ꮷ) CHEROKEE LETTER TSU [Cher]=>[Cher]
		0x146F, // (ᑯ) CANADIAN SYLLABICS KO [Cans]=>[Cans]
		0xA4D2, // (ꓒ) LISU LETTER PHA [Lisu]=>[Lisu]
		// 20221202: merge case
		// "D" <Same>
		//'44', // LATIN CAPITAL LETTER D [Latn]=>[Latn]
		//IDNA:0x44, // (D) LATIN CAPITAL LETTER D [Latn]=>[Latn]
		//IDNA:0x216E, // (Ⅾ) ROMAN NUMERAL FIVE HUNDRED [Latn]=>[Latn]
		//IDNA:0x2145, // (ⅅ) DOUBLE-STRUCK ITALIC CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D403, // (𝐃) MATHEMATICAL BOLD CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D437, // (𝐷) MATHEMATICAL ITALIC CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D46B, // (𝑫) MATHEMATICAL BOLD ITALIC CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D49F, // (𝒟) MATHEMATICAL SCRIPT CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D4D3, // (𝓓) MATHEMATICAL BOLD SCRIPT CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D507, // (𝔇) MATHEMATICAL FRAKTUR CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D53B, // (𝔻) MATHEMATICAL DOUBLE-STRUCK CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D56F, // (𝕯) MATHEMATICAL BOLD FRAKTUR CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D5A3, // (𝖣) MATHEMATICAL SANS-SERIF CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D5D7, // (𝗗) MATHEMATICAL SANS-SERIF BOLD CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D60B, // (𝘋) MATHEMATICAL SANS-SERIF ITALIC CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D63F, // (𝘿) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL D [Zyyy]=>[ALL]
		//IDNA:0x1D673, // (𝙳) MATHEMATICAL MONOSPACE CAPITAL D [Zyyy]=>[ALL]
		0x13A0, // (Ꭰ) CHEROKEE LETTER A [Cher]=>[Cher]
		0x15DE, // (ᗞ) CANADIAN SYLLABICS CARRIER THE [Cans]=>[Cans]
		0x15EA, // (ᗪ) CANADIAN SYLLABICS CARRIER PE [Cans]=>[Cans]
		0xA4D3, // (ꓓ) LISU LETTER DA [Lisu]=>[Lisu]
	],
	[
		// "d̔" <Same>
		'64 314', // LATIN SMALL LETTER D + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x257, // (ɗ) LATIN SMALL LETTER D WITH HOOK [Latn]=>[Latn]
	],
	[
		// "d̨" <Same>
		'64 328', // LATIN SMALL LETTER D + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//DISALLOW:0x256, // (ɖ) LATIN SMALL LETTER D WITH TAIL [Latn]=>[Latn]
	],
	[
		// "d̄" <Same>
		'64 304', // LATIN SMALL LETTER D + COMBINING MACRON [Latn,Zinh]=>[Latn]
		//DISALLOW:0x18C, // (ƌ) LATIN SMALL LETTER D WITH TOPBAR [Latn]=>[Latn]
	],
	[
		// "d̵" <Same>
		'64 335', // LATIN SMALL LETTER D + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x111, // (đ) LATIN SMALL LETTER D WITH STROKE [Latn]=>[Latn]
	],
	[
		// "D̵" <Same>
		'44 335', // LATIN CAPITAL LETTER D + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x110, // (Đ) LATIN CAPITAL LETTER D WITH STROKE [Latn]=>[Latn]
		//IDNA:0xD0, // (Ð) LATIN CAPITAL LETTER ETH [Latn]=>[Latn]
		//IDNA:0x189, // (Ɖ) LATIN CAPITAL LETTER AFRICAN D [Latn]=>[Latn]
	],
	[
		// "ḏ̵" <NFC(false) NFD(true)>
		'64 335 331', // LATIN SMALL LETTER D + COMBINING SHORT STROKE OVERLAY + COMBINING MACRON BELOW [Latn,Zinh]=>[Latn]
		0x20AB, // (₫) DONG SIGN [Zyyy]=>[ALL]
	],
	[
		// "Ꝺ" <Same>
		'A779', // LATIN CAPITAL LETTER INSULAR D [Latn]=>[Latn]
		//IDNA:0xA779, // (Ꝺ) LATIN CAPITAL LETTER INSULAR D [Latn]=>[Latn]
		//DISALLOW:0xA77A, // (ꝺ) LATIN SMALL LETTER INSULAR D [Latn]=>[Latn]
	],
	[
		// "d·" <Same>
		'64 B7', // LATIN SMALL LETTER D + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x147B, // (ᑻ) CANADIAN SYLLABICS WEST-CREE KWO [Cans]=>[Cans]
	],
	[
		// "d'" <Same>
		'64 27', // LATIN SMALL LETTER D + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x1487, // (ᒇ) CANADIAN SYLLABICS SOUTH-SLAVEY KOH [Cans]=>[Cans]
	],
	[
		// "dȝ" <Same>
		'64 21D', // LATIN SMALL LETTER D + LATIN SMALL LETTER YOGH [Latn]=>[Latn]
		//DISALLOW:0x2A4, // (ʤ) LATIN SMALL LETTER DEZH DIGRAPH [Latn]=>[Latn]
	],
	[
		// "dz" <Same>
		'64 7A', // LATIN SMALL LETTER D + LATIN SMALL LETTER Z [Latn]=>[Latn]
		//IDNA:0x1F3, // (ǳ) LATIN SMALL LETTER DZ [Latn]=>[Latn]
		//DISALLOW:0x2A3, // (ʣ) LATIN SMALL LETTER DZ DIGRAPH [Latn]=>[Latn]
	],
	[
		// "Dz" <Same>
		'44 7A', // LATIN CAPITAL LETTER D + LATIN SMALL LETTER Z [Latn]=>[Latn]
		//IDNA:0x1F2, // (ǲ) LATIN CAPITAL LETTER D WITH SMALL LETTER Z [Latn]=>[Latn]
	],
	[
		// "DZ" <Same>
		'44 5A', // LATIN CAPITAL LETTER D + LATIN CAPITAL LETTER Z [Latn]=>[Latn]
		//IDNA:0x1F1, // (Ǳ) LATIN CAPITAL LETTER DZ [Latn]=>[Latn]
	],
	[
		// "dž" <NFC(true) NFD(false)>
		'64 17E', // LATIN SMALL LETTER D + LATIN SMALL LETTER Z WITH CARON [Latn]=>[Latn]
		//IDNA:0x1C6, // (ǆ) LATIN SMALL LETTER DZ WITH CARON [Latn]=>[Latn]
	],
	[
		// "Dž" <NFC(true) NFD(false)>
		'44 17E', // LATIN CAPITAL LETTER D + LATIN SMALL LETTER Z WITH CARON [Latn]=>[Latn]
		//IDNA:0x1C5, // (ǅ) LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON [Latn]=>[Latn]
	],
	[
		// "DŽ" <NFC(true) NFD(false)>
		'44 17D', // LATIN CAPITAL LETTER D + LATIN CAPITAL LETTER Z WITH CARON [Latn]=>[Latn]
		//IDNA:0x1C4, // (Ǆ) LATIN CAPITAL LETTER DZ WITH CARON [Latn]=>[Latn]
	],
	[
		// "dʑ" <Same>
		'64 291', // LATIN SMALL LETTER D + LATIN SMALL LETTER Z WITH CURL [Latn]=>[Latn]
		//DISALLOW:0x2A5, // (ʥ) LATIN SMALL LETTER DZ DIGRAPH WITH CURL [Latn]=>[Latn]
	],
	[
		// "ᴅ" <Same>
		'1D05', // LATIN LETTER SMALL CAPITAL D [Latn]=>[Latn]
		//DISALLOW:0x1D05, // (ᴅ) LATIN LETTER SMALL CAPITAL D [Latn]=>[Latn]
		//IDNA:0xAB70, // (ꭰ) CHEROKEE SMALL LETTER A [Cher]=>[Cher]
	],
	[
		// "ẟ" <Same>
		'1E9F', // LATIN SMALL LETTER DELTA [Latn]=>[Latn]
		//DISALLOW:0x1E9F, // (ẟ) LATIN SMALL LETTER DELTA [Latn]=>[Latn]
		//DISALLOW:0x2E39, // (⸹) TOP HALF SECTION SIGN [Zyyy]=>[ALL]
		0x3B4, // (δ) GREEK SMALL LETTER DELTA [Grek]=>[Grek]
		//IDNA:0x1D6C5, // (𝛅) MATHEMATICAL BOLD SMALL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D6FF, // (𝛿) MATHEMATICAL ITALIC SMALL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D739, // (𝜹) MATHEMATICAL BOLD ITALIC SMALL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D773, // (𝝳) MATHEMATICAL SANS-SERIF BOLD SMALL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D7AD, // (𝞭) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL DELTA [Zyyy]=>[ALL]
		0x56E, // (ծ) ARMENIAN SMALL LETTER CA [Armn]=>[Armn]
		0x1577, // (ᕷ) CANADIAN SYLLABICS NUNAVIK HO [Cans]=>[Cans]
	],
	[
		// "◌ͤ" <Same>
		'364', // COMBINING LATIN SMALL LETTER E [Zinh]=>[Latn]
		//DISALLOW:0x364, // (◌ͤ) COMBINING LATIN SMALL LETTER E [Zinh]=>[Latn]
		//DISALLOW:0x2DF7, // (◌ⷷ) COMBINING CYRILLIC LETTER IE [Cyrl]=>[Cyrl]
	],
	[
		// "e" <Same>
		'65', // LATIN SMALL LETTER E [Latn]=>[Latn]
		valid(0x65), // (e) LATIN SMALL LETTER E [Latn]=>[Latn]
		//DISALLOW:0x212E, // (℮) ESTIMATED SYMBOL [Zyyy]=>[ALL]
		//IDNA:0xFF45, // (ｅ) FULLWIDTH LATIN SMALL LETTER E [Latn]=>[Latn]
		//IDNA:0x212F, // (ℯ) SCRIPT SMALL E [Zyyy]=>[ALL]
		//IDNA:0x2147, // (ⅇ) DOUBLE-STRUCK ITALIC SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D41E, // (𝐞) MATHEMATICAL BOLD SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D452, // (𝑒) MATHEMATICAL ITALIC SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D486, // (𝒆) MATHEMATICAL BOLD ITALIC SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D4EE, // (𝓮) MATHEMATICAL BOLD SCRIPT SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D522, // (𝔢) MATHEMATICAL FRAKTUR SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D556, // (𝕖) MATHEMATICAL DOUBLE-STRUCK SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D58A, // (𝖊) MATHEMATICAL BOLD FRAKTUR SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D5BE, // (𝖾) MATHEMATICAL SANS-SERIF SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D5F2, // (𝗲) MATHEMATICAL SANS-SERIF BOLD SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D626, // (𝘦) MATHEMATICAL SANS-SERIF ITALIC SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D65A, // (𝙚) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL E [Zyyy]=>[ALL]
		//IDNA:0x1D68E, // (𝚎) MATHEMATICAL MONOSPACE SMALL E [Zyyy]=>[ALL]
		//DISALLOW:0xAB32, // (ꬲ) LATIN SMALL LETTER BLACKLETTER E [Latn]=>[Latn]
		0x435, // (е) CYRILLIC SMALL LETTER IE [Cyrl]=>[Cyrl]
		0x4BD, // (ҽ) CYRILLIC SMALL LETTER ABKHASIAN CHE [Cyrl]=>[Cyrl]
		// 20221202: merge case
		// "E" <Same>
		//'45', // LATIN CAPITAL LETTER E [Latn]=>[Latn]
		//IDNA:0x45, // (E) LATIN CAPITAL LETTER E [Latn]=>[Latn]
		//DISALLOW:0x22FF, // (⋿) Z NOTATION BAG MEMBERSHIP [Zyyy]=>[ALL]
		//IDNA:0xFF25, // (Ｅ) FULLWIDTH LATIN CAPITAL LETTER E [Latn]=>[Latn]
		//IDNA:0x2130, // (ℰ) SCRIPT CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D404, // (𝐄) MATHEMATICAL BOLD CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D438, // (𝐸) MATHEMATICAL ITALIC CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D46C, // (𝑬) MATHEMATICAL BOLD ITALIC CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D4D4, // (𝓔) MATHEMATICAL BOLD SCRIPT CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D508, // (𝔈) MATHEMATICAL FRAKTUR CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D53C, // (𝔼) MATHEMATICAL DOUBLE-STRUCK CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D570, // (𝕰) MATHEMATICAL BOLD FRAKTUR CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D5A4, // (𝖤) MATHEMATICAL SANS-SERIF CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D5D8, // (𝗘) MATHEMATICAL SANS-SERIF BOLD CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D60C, // (𝘌) MATHEMATICAL SANS-SERIF ITALIC CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D640, // (𝙀) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x1D674, // (𝙴) MATHEMATICAL MONOSPACE CAPITAL E [Zyyy]=>[ALL]
		//IDNA:0x395, // (Ε) GREEK CAPITAL LETTER EPSILON [Grek]=>[Grek]
		//IDNA:0x1D6AC, // (𝚬) MATHEMATICAL BOLD CAPITAL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D6E6, // (𝛦) MATHEMATICAL ITALIC CAPITAL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D720, // (𝜠) MATHEMATICAL BOLD ITALIC CAPITAL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D75A, // (𝝚) MATHEMATICAL SANS-SERIF BOLD CAPITAL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D794, // (𝞔) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL EPSILON [Zyyy]=>[ALL]
		//IDNA:0x415, // (Е) CYRILLIC CAPITAL LETTER IE [Cyrl]=>[Cyrl]
		0x2D39, // (ⴹ) TIFINAGH LETTER YADD [Tfng]=>[Tfng]
		0x13AC, // (Ꭼ) CHEROKEE LETTER GV [Cher]=>[Cher]
		0xA4F0, // (ꓰ) LISU LETTER E [Lisu]=>[Lisu]
		//IDNA:0x118A6, // (𑢦) WARANG CITI CAPITAL LETTER II [Wara]=>[Wara]
		//IDNA:0x118AE, // (𑢮) WARANG CITI CAPITAL LETTER YUJ [Wara]=>[Wara]
		0x10286, // (𐊆) LYCIAN LETTER I [Lyci]=>[Lyci]
	],
	[
		// "ĕ" <NFC(true) NFD(false)>
		'115', // LATIN SMALL LETTER E WITH BREVE [Latn]=>[Latn]
		0x115, // (ĕ) LATIN SMALL LETTER E WITH BREVE [Latn]=>[Latn]
		0x11B, // (ě) LATIN SMALL LETTER E WITH CARON [Latn]=>[Latn]
	],
	[
		// "Ĕ" <NFC(true) NFD(false)>
		'114', // LATIN CAPITAL LETTER E WITH BREVE [Latn]=>[Latn]
		//IDNA:0x114, // (Ĕ) LATIN CAPITAL LETTER E WITH BREVE [Latn]=>[Latn]
		//IDNA:0x11A, // (Ě) LATIN CAPITAL LETTER E WITH CARON [Latn]=>[Latn]
	],
	[
		// "e̸" <Same>
		'65 338', // LATIN SMALL LETTER E + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x247, // (ɇ) LATIN SMALL LETTER E WITH STROKE [Latn]=>[Latn]
	],
	[
		// "E̸" <Same>
		'45 338', // LATIN CAPITAL LETTER E + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x246, // (Ɇ) LATIN CAPITAL LETTER E WITH STROKE [Latn]=>[Latn]
	],
	[
		// "ę" <NFC(false) NFD(true)>
		'65 328', // LATIN SMALL LETTER E + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		0x4BF, // (ҿ) CYRILLIC SMALL LETTER ABKHASIAN CHE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "ᴇ" <Same>
		'1D07', // LATIN LETTER SMALL CAPITAL E [Latn]=>[Latn]
		//DISALLOW:0x1D07, // (ᴇ) LATIN LETTER SMALL CAPITAL E [Latn]=>[Latn]
		//IDNA:0xAB7C, // (ꭼ) CHEROKEE SMALL LETTER GV [Cher]=>[Cher]
	],
	[
		// "ǝ" <Same>
		'1DD', // LATIN SMALL LETTER TURNED E [Latn]=>[Latn]
		//DISALLOW:0x1DD, // (ǝ) LATIN SMALL LETTER TURNED E [Latn]=>[Latn]
		//DISALLOW:0x259, // (ə) LATIN SMALL LETTER SCHWA [Latn]=>[Latn]
		0x4D9, // (ә) CYRILLIC SMALL LETTER SCHWA [Cyrl]=>[Cyrl]
	],
	[
		// "Ǝ" <Same>
		'18E', // LATIN CAPITAL LETTER REVERSED E [Latn]=>[Latn]
		//IDNA:0x18E, // (Ǝ) LATIN CAPITAL LETTER REVERSED E [Latn]=>[Latn]
		//DISALLOW:0x2203, // (∃) THERE EXISTS [Zyyy]=>[ALL]
		0x2D3A, // (ⴺ) TIFINAGH LETTER YADDH [Tfng]=>[Tfng]
		0xA4F1, // (ꓱ) LISU LETTER EU [Lisu]=>[Lisu]
	],
	[
		// "ǝ˞" <Same>
		'1DD 2DE', // LATIN SMALL LETTER TURNED E + MODIFIER LETTER RHOTIC HOOK [Latn,Zyyy]=>[Latn]
		//DISALLOW:0x25A, // (ɚ) LATIN SMALL LETTER SCHWA WITH HOOK [Latn]=>[Latn]
	],
	[
		// "ǝo" <Same>
		'1DD 6F', // LATIN SMALL LETTER TURNED E + LATIN SMALL LETTER O [Latn]=>[Latn]
		//DISALLOW:0x1D14, // (ᴔ) LATIN SMALL LETTER TURNED OE [Latn]=>[Latn]
	],
	[
		// "ǝo̸" <Same>
		'1DD 6F 338', // LATIN SMALL LETTER TURNED E + LATIN SMALL LETTER O + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0xAB41, // (ꭁ) LATIN SMALL LETTER TURNED OE WITH STROKE [Latn]=>[Latn]
	],
	[
		// "ǝo̵" <Same>
		'1DD 6F 335', // LATIN SMALL LETTER TURNED E + LATIN SMALL LETTER O + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0xAB42, // (ꭂ) LATIN SMALL LETTER TURNED OE WITH HORIZONTAL STROKE [Latn]=>[Latn]
	],
	[
		// "Ə" <Same>
		'18F', // LATIN CAPITAL LETTER SCHWA [Latn]=>[Latn]
		//IDNA:0x18F, // (Ə) LATIN CAPITAL LETTER SCHWA [Latn]=>[Latn]
		//IDNA:0x4D8, // (Ә) CYRILLIC CAPITAL LETTER SCHWA [Cyrl]=>[Cyrl]
	],
	[
		// "Ɛ" <Same>
		'190', // LATIN CAPITAL LETTER OPEN E [Latn]=>[Latn]
		//IDNA:0x190, // (Ɛ) LATIN CAPITAL LETTER OPEN E [Latn]=>[Latn]
		//DISALLOW:0x1D221, // (𝈡) GREEK INSTRUMENTAL NOTATION SYMBOL-7 [Grek]=>[Grek]
		//IDNA:0x2107, // (ℇ) EULER CONSTANT [Zyyy]=>[ALL]
		//IDNA:0x510, // (Ԑ) CYRILLIC CAPITAL LETTER REVERSED ZE [Cyrl]=>[Cyrl]
		0x13CB, // (Ꮛ) CHEROKEE LETTER QUV [Cher]=>[Cher]
		0x16F2D, // (𖼭) MIAO LETTER NYHA [Plrd]=>[Plrd]
		//IDNA:0x10401, // (𐐁) DESERET CAPITAL LETTER LONG E [Dsrt]=>[Dsrt]
	],
	[
		// "ᵋ" <Same>
		'1D4B', // MODIFIER LETTER SMALL OPEN E [Latn]=>[Latn]
		//IDNA:0x1D4B, // (ᵋ) MODIFIER LETTER SMALL OPEN E [Latn]=>[Latn]
		//IDNA:0x1D9F, // (ᶟ) MODIFIER LETTER SMALL REVERSED OPEN E [Latn]=>[Latn]
	],
	[
		// "ɜ" <Same>
		'25C', // LATIN SMALL LETTER REVERSED OPEN E [Latn]=>[Latn]
		//DISALLOW:0x25C, // (ɜ) LATIN SMALL LETTER REVERSED OPEN E [Latn]=>[Latn]
		//DISALLOW:0x1D08, // (ᴈ) LATIN SMALL LETTER TURNED OPEN E [Latn]=>[Latn]
		0x437, // (з) CYRILLIC SMALL LETTER ZE [Cyrl]=>[Cyrl]
	],
	[
		// "ɜ̦" <Same>
		'25C 326', // LATIN SMALL LETTER REVERSED OPEN E + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		0x499, // (ҙ) CYRILLIC SMALL LETTER ZE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "ɞ" <Same>
		'25E', // LATIN SMALL LETTER CLOSED REVERSED OPEN E [Latn]=>[Latn]
		//DISALLOW:0x25E, // (ɞ) LATIN SMALL LETTER CLOSED REVERSED OPEN E [Latn]=>[Latn]
		0x10442, // (𐑂) DESERET SMALL LETTER VEE [Dsrt]=>[Dsrt]
	],
	[
		// "ʚ" <Same>
		'29A', // LATIN SMALL LETTER CLOSED OPEN E [Latn]=>[Latn]
		//DISALLOW:0x29A, // (ʚ) LATIN SMALL LETTER CLOSED OPEN E [Latn]=>[Latn]
		//DISALLOW:0xA79D, // (ꞝ) LATIN SMALL LETTER VOLAPUK OE [Latn]=>[Latn]
		0x1042A, // (𐐪) DESERET SMALL LETTER LONG A [Dsrt]=>[Dsrt]
	],
	[
		// "f" <Same>
		'66', // LATIN SMALL LETTER F [Latn]=>[Latn]
		valid(0x66), // (f) LATIN SMALL LETTER F [Latn]=>[Latn]
		//IDNA:0x1D41F, // (𝐟) MATHEMATICAL BOLD SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D453, // (𝑓) MATHEMATICAL ITALIC SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D487, // (𝒇) MATHEMATICAL BOLD ITALIC SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D4BB, // (𝒻) MATHEMATICAL SCRIPT SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D4EF, // (𝓯) MATHEMATICAL BOLD SCRIPT SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D523, // (𝔣) MATHEMATICAL FRAKTUR SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D557, // (𝕗) MATHEMATICAL DOUBLE-STRUCK SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D58B, // (𝖋) MATHEMATICAL BOLD FRAKTUR SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D5BF, // (𝖿) MATHEMATICAL SANS-SERIF SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D5F3, // (𝗳) MATHEMATICAL SANS-SERIF BOLD SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D627, // (𝘧) MATHEMATICAL SANS-SERIF ITALIC SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D65B, // (𝙛) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL F [Zyyy]=>[ALL]
		//IDNA:0x1D68F, // (𝚏) MATHEMATICAL MONOSPACE SMALL F [Zyyy]=>[ALL]
		//DISALLOW:0xAB35, // (ꬵ) LATIN SMALL LETTER LENIS F [Latn]=>[Latn]
		//DISALLOW:0xA799, // (ꞙ) LATIN SMALL LETTER F WITH STROKE [Latn]=>[Latn]
		//IDNA:0x17F, // (ſ) LATIN SMALL LETTER LONG S [Latn]=>[Latn]
		//DISALLOW:0x1E9D, // (ẝ) LATIN SMALL LETTER LONG S WITH HIGH STROKE [Latn]=>[Latn]
		0x584, // (ք) ARMENIAN SMALL LETTER KEH [Armn]=>[Armn]
		// 20221202: merge case
		// "F" <Same>
		//'46', // LATIN CAPITAL LETTER F [Latn]=>[Latn]
		//IDNA:0x46, // (F) LATIN CAPITAL LETTER F [Latn]=>[Latn]
		//DISALLOW:0x1D213, // (𝈓) GREEK VOCAL NOTATION SYMBOL-20 [Grek]=>[Grek]
		//IDNA:0x2131, // (ℱ) SCRIPT CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D405, // (𝐅) MATHEMATICAL BOLD CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D439, // (𝐹) MATHEMATICAL ITALIC CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D46D, // (𝑭) MATHEMATICAL BOLD ITALIC CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D4D5, // (𝓕) MATHEMATICAL BOLD SCRIPT CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D509, // (𝔉) MATHEMATICAL FRAKTUR CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D53D, // (𝔽) MATHEMATICAL DOUBLE-STRUCK CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D571, // (𝕱) MATHEMATICAL BOLD FRAKTUR CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D5A5, // (𝖥) MATHEMATICAL SANS-SERIF CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D5D9, // (𝗙) MATHEMATICAL SANS-SERIF BOLD CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D60D, // (𝘍) MATHEMATICAL SANS-SERIF ITALIC CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D641, // (𝙁) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0x1D675, // (𝙵) MATHEMATICAL MONOSPACE CAPITAL F [Zyyy]=>[ALL]
		//IDNA:0xA798, // (Ꞙ) LATIN CAPITAL LETTER F WITH STROKE [Latn]=>[Latn]
		//IDNA:0x3DC, // (Ϝ) GREEK LETTER DIGAMMA [Grek]=>[Grek]
		//IDNA:0x1D7CA, // (𝟊) MATHEMATICAL BOLD CAPITAL DIGAMMA [Zyyy]=>[ALL]
		0x15B4, // (ᖴ) CANADIAN SYLLABICS BLACKFOOT WE [Cans]=>[Cans]
		0xA4DD, // (ꓝ) LISU LETTER TSA [Lisu]=>[Lisu]
		0x118C2, // (𑣂) WARANG CITI SMALL LETTER WI [Wara]=>[Wara]
		//IDNA:0x118A2, // (𑢢) WARANG CITI CAPITAL LETTER WI [Wara]=>[Wara]
		0x10287, // (𐊇) LYCIAN LETTER W [Lyci]=>[Lyci]
		0x102A5, // (𐊥) CARIAN LETTER R [Cari]=>[Cari]
		0x10525, // (𐔥) ELBASAN LETTER GHE [Elba]=>[Elba]
	],
	[
		// "f̦" <Same>
		'66 326', // LATIN SMALL LETTER F + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//DISALLOW:0x192, // (ƒ) LATIN SMALL LETTER F WITH HOOK [Latn]=>[Latn]
	],
	[
		// "F̦" <Same>
		'46 326', // LATIN CAPITAL LETTER F + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x191, // (Ƒ) LATIN CAPITAL LETTER F WITH HOOK [Latn]=>[Latn]
	],
	[
		// "f̴" <Same>
		'66 334', // LATIN SMALL LETTER F + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D6E, // (ᵮ) LATIN SMALL LETTER F WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "FAX" <Same>
		'46 41 58', // LATIN CAPITAL LETTER F + LATIN CAPITAL LETTER A + LATIN CAPITAL LETTER X [Latn]=>[Latn]
		//IDNA:0x213B, // (℻) FACSIMILE SIGN [Zyyy]=>[ALL]
	],
	[
		// "ff" <Same>
		'66 66', // LATIN SMALL LETTER F + LATIN SMALL LETTER F [Latn]=>[Latn]
		//IDNA:0xFB00, // (ﬀ) LATIN SMALL LIGATURE FF [Latn]=>[Latn]
	],
	[
		// "ffi" <Same>
		'66 66 69', // LATIN SMALL LETTER F + LATIN SMALL LETTER F + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0xFB03, // (ﬃ) LATIN SMALL LIGATURE FFI [Latn]=>[Latn]
	],
	[
		// "ffl" <Same>
		'66 66 6C', // LATIN SMALL LETTER F + LATIN SMALL LETTER F + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0xFB04, // (ﬄ) LATIN SMALL LIGATURE FFL [Latn]=>[Latn]
	],
	[
		// "fi" <Same>
		'66 69', // LATIN SMALL LETTER F + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0xFB01, // (ﬁ) LATIN SMALL LIGATURE FI [Latn]=>[Latn]
	],
	[
		// "fl" <Same>
		'66 6C', // LATIN SMALL LETTER F + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0xFB02, // (ﬂ) LATIN SMALL LIGATURE FL [Latn]=>[Latn]
	],
	[
		// "fŋ" <Same>
		'66 14B', // LATIN SMALL LETTER F + LATIN SMALL LETTER ENG [Latn]=>[Latn]
		//DISALLOW:0x2A9, // (ʩ) LATIN SMALL LETTER FENG DIGRAPH [Latn]=>[Latn]
	],
	[
		// "Ⅎ" <Same>
		'2132', // TURNED CAPITAL F [Latn]=>[Latn]
		//IDNA:0x2132, // (Ⅎ) TURNED CAPITAL F [Latn]=>[Latn]
		0x15B5, // (ᖵ) CANADIAN SYLLABICS BLACKFOOT WI [Cans]=>[Cans]
		0xA4DE, // (ꓞ) LISU LETTER TSHA [Lisu]=>[Lisu]
	],
	[
		// "ꟻ" <Same>
		'A7FB', // LATIN EPIGRAPHIC LETTER REVERSED F [Latn]=>[Latn]
		//DISALLOW:0xA7FB, // (ꟻ) LATIN EPIGRAPHIC LETTER REVERSED F [Latn]=>[Latn]
		//DISALLOW:0x1D230, // (𝈰) GREEK INSTRUMENTAL NOTATION SYMBOL-30 [Grek]=>[Grek]
		0x15B7, // (ᖷ) CANADIAN SYLLABICS BLACKFOOT WA [Cans]=>[Cans]
	],
	[
		// "g" <Same>
		'67', // LATIN SMALL LETTER G [Latn]=>[Latn]
		valid(0x67), // (g) LATIN SMALL LETTER G [Latn]=>[Latn]
		//IDNA:0xFF47, // (ｇ) FULLWIDTH LATIN SMALL LETTER G [Latn]=>[Latn]
		//IDNA:0x210A, // (ℊ) SCRIPT SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D420, // (𝐠) MATHEMATICAL BOLD SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D454, // (𝑔) MATHEMATICAL ITALIC SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D488, // (𝒈) MATHEMATICAL BOLD ITALIC SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D4F0, // (𝓰) MATHEMATICAL BOLD SCRIPT SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D524, // (𝔤) MATHEMATICAL FRAKTUR SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D558, // (𝕘) MATHEMATICAL DOUBLE-STRUCK SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D58C, // (𝖌) MATHEMATICAL BOLD FRAKTUR SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D5C0, // (𝗀) MATHEMATICAL SANS-SERIF SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D5F4, // (𝗴) MATHEMATICAL SANS-SERIF BOLD SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D628, // (𝘨) MATHEMATICAL SANS-SERIF ITALIC SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D65C, // (𝙜) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL G [Zyyy]=>[ALL]
		//IDNA:0x1D690, // (𝚐) MATHEMATICAL MONOSPACE SMALL G [Zyyy]=>[ALL]
		//DISALLOW:0x261, // (ɡ) LATIN SMALL LETTER SCRIPT G [Latn]=>[Latn]
		//DISALLOW:0x1D83, // (ᶃ) LATIN SMALL LETTER G WITH PALATAL HOOK [Latn]=>[Latn]
		//DISALLOW:0x18D, // (ƍ) LATIN SMALL LETTER TURNED DELTA [Latn]=>[Latn]
		0x581, // (ց) ARMENIAN SMALL LETTER CO [Armn]=>[Armn]
		// 20221202: merge case
		// "G" <Same>
		//'47', // LATIN CAPITAL LETTER G [Latn]=>[Latn]
		//IDNA:0x47, // (G) LATIN CAPITAL LETTER G [Latn]=>[Latn]
		//IDNA:0x1D406, // (𝐆) MATHEMATICAL BOLD CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D43A, // (𝐺) MATHEMATICAL ITALIC CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D46E, // (𝑮) MATHEMATICAL BOLD ITALIC CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D4A2, // (𝒢) MATHEMATICAL SCRIPT CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D4D6, // (𝓖) MATHEMATICAL BOLD SCRIPT CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D50A, // (𝔊) MATHEMATICAL FRAKTUR CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D53E, // (𝔾) MATHEMATICAL DOUBLE-STRUCK CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D572, // (𝕲) MATHEMATICAL BOLD FRAKTUR CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D5A6, // (𝖦) MATHEMATICAL SANS-SERIF CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D5DA, // (𝗚) MATHEMATICAL SANS-SERIF BOLD CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D60E, // (𝘎) MATHEMATICAL SANS-SERIF ITALIC CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D642, // (𝙂) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x1D676, // (𝙶) MATHEMATICAL MONOSPACE CAPITAL G [Zyyy]=>[ALL]
		//IDNA:0x50C, // (Ԍ) CYRILLIC CAPITAL LETTER KOMI SJE [Cyrl]=>[Cyrl]
		0x13C0, // (Ꮐ) CHEROKEE LETTER NAH [Cher]=>[Cher]
		0x13F3, // (Ᏻ) CHEROKEE LETTER YU [Cher]=>[Cher]
		0xA4D6, // (ꓖ) LISU LETTER GA [Lisu]=>[Lisu]		
	],
	[
		// "ᵍ" <Same>
		'1D4D', // MODIFIER LETTER SMALL G [Latn]=>[Latn]
		//IDNA:0x1D4D, // (ᵍ) MODIFIER LETTER SMALL G [Latn]=>[Latn]
		//IDNA:0x1DA2, // (ᶢ) MODIFIER LETTER SMALL SCRIPT G [Latn]=>[Latn]
	],
	[
		// "g̔" <Same>
		'67 314', // LATIN SMALL LETTER G + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x260, // (ɠ) LATIN SMALL LETTER G WITH HOOK [Latn]=>[Latn]
	],
	[
		// "ğ" <NFC(true) NFD(false)>
		'11F', // LATIN SMALL LETTER G WITH BREVE [Latn]=>[Latn]
		0x11F, // (ğ) LATIN SMALL LETTER G WITH BREVE [Latn]=>[Latn]
		0x1E7, // (ǧ) LATIN SMALL LETTER G WITH CARON [Latn]=>[Latn]
	],
	[
		// "Ğ" <NFC(true) NFD(false)>
		'11E', // LATIN CAPITAL LETTER G WITH BREVE [Latn]=>[Latn]
		//IDNA:0x11E, // (Ğ) LATIN CAPITAL LETTER G WITH BREVE [Latn]=>[Latn]
		//IDNA:0x1E6, // (Ǧ) LATIN CAPITAL LETTER G WITH CARON [Latn]=>[Latn]
	],
	[
		// "ģ" <NFC(true) NFD(false)>
		'123', // LATIN SMALL LETTER G WITH CEDILLA [Latn]=>[Latn]
		0x123, // (ģ) LATIN SMALL LETTER G WITH CEDILLA [Latn]=>[Latn]
		0x1F5, // (ǵ) LATIN SMALL LETTER G WITH ACUTE [Latn]=>[Latn]
	],
	[
		// "g̵" <Same>
		'67 335', // LATIN SMALL LETTER G + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1E5, // (ǥ) LATIN SMALL LETTER G WITH STROKE [Latn]=>[Latn]
	],
	[
		// "G̵" <Same>
		'47 335', // LATIN CAPITAL LETTER G + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x1E4, // (Ǥ) LATIN CAPITAL LETTER G WITH STROKE [Latn]=>[Latn]
	],
	[
		// "G'" <Same>
		'47 27', // LATIN CAPITAL LETTER G + APOSTROPHE [Latn,Zyyy]=>[Latn]
		//IDNA:0x193, // (Ɠ) LATIN CAPITAL LETTER G WITH HOOK [Latn]=>[Latn]
	],
	[
		// "ɢ" <Same>
		'262', // LATIN LETTER SMALL CAPITAL G [Latn]=>[Latn]
		//DISALLOW:0x262, // (ɢ) LATIN LETTER SMALL CAPITAL G [Latn]=>[Latn]
		//DISALLOW:0x50D, // (ԍ) CYRILLIC SMALL LETTER KOMI SJE [Cyrl]=>[Cyrl]
		//IDNA:0xAB90, // (ꮐ) CHEROKEE SMALL LETTER NAH [Cher]=>[Cher]
		//IDNA:0x13FB, // (ᏻ) CHEROKEE SMALL LETTER YU [Cher]=>[Cher]
	],
	[
		// "h" <Same>
		'68', // LATIN SMALL LETTER H [Latn]=>[Latn]
		valid(0x68), // (h) LATIN SMALL LETTER H [Latn]=>[Latn]
		//IDNA:0xFF48, // (ｈ) FULLWIDTH LATIN SMALL LETTER H [Latn]=>[Latn]
		//IDNA:0x210E, // (ℎ) PLANCK CONSTANT [Zyyy]=>[ALL]
		//IDNA:0x1D421, // (𝐡) MATHEMATICAL BOLD SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D489, // (𝒉) MATHEMATICAL BOLD ITALIC SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D4BD, // (𝒽) MATHEMATICAL SCRIPT SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D4F1, // (𝓱) MATHEMATICAL BOLD SCRIPT SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D525, // (𝔥) MATHEMATICAL FRAKTUR SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D559, // (𝕙) MATHEMATICAL DOUBLE-STRUCK SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D58D, // (𝖍) MATHEMATICAL BOLD FRAKTUR SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D5C1, // (𝗁) MATHEMATICAL SANS-SERIF SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D5F5, // (𝗵) MATHEMATICAL SANS-SERIF BOLD SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D629, // (𝘩) MATHEMATICAL SANS-SERIF ITALIC SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D65D, // (𝙝) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL H [Zyyy]=>[ALL]
		//IDNA:0x1D691, // (𝚑) MATHEMATICAL MONOSPACE SMALL H [Zyyy]=>[ALL]
		0x4BB, // (һ) CYRILLIC SMALL LETTER SHHA [Cyrl]=>[Cyrl]
		0x570, // (հ) ARMENIAN SMALL LETTER HO [Armn]=>[Armn]
		0x13C2, // (Ꮒ) CHEROKEE LETTER NI [Cher]=>[Cher]
		// 20221202: merge case
		// "H" <Same>
		//'48', // LATIN CAPITAL LETTER H [Latn]=>[Latn]
		//IDNA:0x48, // (H) LATIN CAPITAL LETTER H [Latn]=>[Latn]
		//IDNA:0xFF28, // (Ｈ) FULLWIDTH LATIN CAPITAL LETTER H [Latn]=>[Latn]
		//IDNA:0x210B, // (ℋ) SCRIPT CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x210C, // (ℌ) BLACK-LETTER CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x210D, // (ℍ) DOUBLE-STRUCK CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D407, // (𝐇) MATHEMATICAL BOLD CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D43B, // (𝐻) MATHEMATICAL ITALIC CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D46F, // (𝑯) MATHEMATICAL BOLD ITALIC CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D4D7, // (𝓗) MATHEMATICAL BOLD SCRIPT CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D573, // (𝕳) MATHEMATICAL BOLD FRAKTUR CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D5A7, // (𝖧) MATHEMATICAL SANS-SERIF CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D5DB, // (𝗛) MATHEMATICAL SANS-SERIF BOLD CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D60F, // (𝘏) MATHEMATICAL SANS-SERIF ITALIC CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D643, // (𝙃) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x1D677, // (𝙷) MATHEMATICAL MONOSPACE CAPITAL H [Zyyy]=>[ALL]
		//IDNA:0x397, // (Η) GREEK CAPITAL LETTER ETA [Grek]=>[Grek]
		//IDNA:0x1D6AE, // (𝚮) MATHEMATICAL BOLD CAPITAL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D6E8, // (𝛨) MATHEMATICAL ITALIC CAPITAL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D722, // (𝜢) MATHEMATICAL BOLD ITALIC CAPITAL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D75C, // (𝝜) MATHEMATICAL SANS-SERIF BOLD CAPITAL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D796, // (𝞖) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL ETA [Zyyy]=>[ALL]
		//IDNA:0x2C8E, // (Ⲏ) COPTIC CAPITAL LETTER HATE [Copt]=>[Copt]
		//IDNA:0x41D, // (Н) CYRILLIC CAPITAL LETTER EN [Cyrl]=>[Cyrl]
		0x13BB, // (Ꮋ) CHEROKEE LETTER MI [Cher]=>[Cher]
		0x157C, // (ᕼ) CANADIAN SYLLABICS NUNAVUT H [Cans]=>[Cans]
		0xA4E7, // (ꓧ) LISU LETTER XA [Lisu]=>[Lisu]
		0x102CF, // (𐋏) CARIAN LETTER E2 [Cari]=>[Cari]
	],
	[
		// "ᴴ" <Same>
		'1D34', // MODIFIER LETTER CAPITAL H [Latn]=>[Latn]
		//IDNA:0x1D34, // (ᴴ) MODIFIER LETTER CAPITAL H [Latn]=>[Latn]
		//IDNA:0x1D78, // (ᵸ) MODIFIER LETTER CYRILLIC EN [Cyrl]=>[Cyrl]
	],
	[
		// "h̔" <Same>
		'68 314', // LATIN SMALL LETTER H + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x266, // (ɦ) LATIN SMALL LETTER H WITH HOOK [Latn]=>[Latn]
		//DISALLOW:0xA695, // (ꚕ) CYRILLIC SMALL LETTER HWE [Cyrl]=>[Cyrl]
		0x13F2, // (Ᏺ) CHEROKEE LETTER YO [Cher]=>[Cher]
	],
	[
		// "H̩" <Same>
		'48 329', // LATIN CAPITAL LETTER H + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x2C67, // (Ⱨ) LATIN CAPITAL LETTER H WITH DESCENDER [Latn]=>[Latn]
		//IDNA:0x4A2, // (Ң) CYRILLIC CAPITAL LETTER EN WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "h̵" <Same>
		'68 335', // LATIN SMALL LETTER H + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x127, // (ħ) LATIN SMALL LETTER H WITH STROKE [Latn]=>[Latn]
		//IDNA:0x210F, // (ℏ) PLANCK CONSTANT OVER TWO PI [Zyyy]=>[ALL]
		0x45B, // (ћ) CYRILLIC SMALL LETTER TSHE [Cyrl]=>[Cyrl]
	],
	[
		// "H̵" <Same>
		'48 335', // LATIN CAPITAL LETTER H + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x126, // (Ħ) LATIN CAPITAL LETTER H WITH STROKE [Latn]=>[Latn]
	],
	[
		// "H̦" <Same>
		'48 326', // LATIN CAPITAL LETTER H + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x4C9, // (Ӊ) CYRILLIC CAPITAL LETTER EN WITH TAIL [Cyrl]=>[Cyrl]
		//IDNA:0x4C7, // (Ӈ) CYRILLIC CAPITAL LETTER EN WITH HOOK [Cyrl]=>[Cyrl]
	],
	[
		// "ʜ" <Same>
		'29C', // LATIN LETTER SMALL CAPITAL H [Latn]=>[Latn]
		//DISALLOW:0x29C, // (ʜ) LATIN LETTER SMALL CAPITAL H [Latn]=>[Latn]
		0x43D, // (н) CYRILLIC SMALL LETTER EN [Cyrl]=>[Cyrl]
		//IDNA:0xAB8B, // (ꮋ) CHEROKEE SMALL LETTER MI [Cher]=>[Cher]
	],
	[
		// "ʜ̩" <Same>
		'29C 329', // LATIN LETTER SMALL CAPITAL H + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		0x4A3, // (ң) CYRILLIC SMALL LETTER EN WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "ʜ̦" <Same>
		'29C 326', // LATIN LETTER SMALL CAPITAL H + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		0x4CA, // (ӊ) CYRILLIC SMALL LETTER EN WITH TAIL [Cyrl]=>[Cyrl]
		0x4C8, // (ӈ) CYRILLIC SMALL LETTER EN WITH HOOK [Cyrl]=>[Cyrl]
	],
	[
		// "Ƕ" <Same>
		'1F6', // LATIN CAPITAL LETTER HWAIR [Latn]=>[Latn]
		//IDNA:0x1F6, // (Ƕ) LATIN CAPITAL LETTER HWAIR [Latn]=>[Latn]
		//IDNA:0x50A, // (Ԋ) CYRILLIC CAPITAL LETTER KOMI NJE [Cyrl]=>[Cyrl]
	],
	[
		// "ⱶ" <Same>
		'2C76', // LATIN SMALL LETTER HALF H [Latn]=>[Latn]
		//DISALLOW:0x2C76, // (ⱶ) LATIN SMALL LETTER HALF H [Latn]=>[Latn]
		//IDNA:0xAB80, // (ꮀ) CHEROKEE SMALL LETTER HO [Cher]=>[Cher]
	],
	[
		// "Ⱶ" <Same>
		'2C75', // LATIN CAPITAL LETTER HALF H [Latn]=>[Latn]
		//IDNA:0x2C75, // (Ⱶ) LATIN CAPITAL LETTER HALF H [Latn]=>[Latn]
		//IDNA:0x370, // (Ͱ) GREEK CAPITAL LETTER HETA [Grek]=>[Grek]
		0x13A8, // (Ꭸ) CHEROKEE LETTER GE [Cher]=>[Cher]
		0x13B0, // (Ꮀ) CHEROKEE LETTER HO [Cher]=>[Cher]
		0xA6B1, // (ꚱ) BAMUM LETTER NDAA [Bamu]=>[Bamu]
	],
	[
		// "ꜧ" <Same>
		'A727', // LATIN SMALL LETTER HENG [Latn]=>[Latn]
		//DISALLOW:0xA727, // (ꜧ) LATIN SMALL LETTER HENG [Latn]=>[Latn]
		//DISALLOW:0xA795, // (ꞕ) LATIN SMALL LETTER H WITH PALATAL HOOK [Latn]=>[Latn]
	],
	[
		// "i" <Same>
		'69', // LATIN SMALL LETTER I [Latn]=>[Latn]
		valid(0x69), // (i) LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2DB, // (˛) OGONEK [Zyyy]=>[ALL]
		//DISALLOW:0x2373, // (⍳) APL FUNCTIONAL SYMBOL IOTA [Zyyy]=>[ALL]
		//IDNA:0xFF49, // (ｉ) FULLWIDTH LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2170, // (ⅰ) SMALL ROMAN NUMERAL ONE [Latn]=>[Latn]
		//IDNA:0x2139, // (ℹ) INFORMATION SOURCE [Zyyy]=>[ALL]
		//IDNA:0x2148, // (ⅈ) DOUBLE-STRUCK ITALIC SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D422, // (𝐢) MATHEMATICAL BOLD SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D456, // (𝑖) MATHEMATICAL ITALIC SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D48A, // (𝒊) MATHEMATICAL BOLD ITALIC SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D4BE, // (𝒾) MATHEMATICAL SCRIPT SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D4F2, // (𝓲) MATHEMATICAL BOLD SCRIPT SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D526, // (𝔦) MATHEMATICAL FRAKTUR SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D55A, // (𝕚) MATHEMATICAL DOUBLE-STRUCK SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D58E, // (𝖎) MATHEMATICAL BOLD FRAKTUR SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D5C2, // (𝗂) MATHEMATICAL SANS-SERIF SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D5F6, // (𝗶) MATHEMATICAL SANS-SERIF BOLD SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D62A, // (𝘪) MATHEMATICAL SANS-SERIF ITALIC SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D65E, // (𝙞) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL I [Zyyy]=>[ALL]
		//IDNA:0x1D692, // (𝚒) MATHEMATICAL MONOSPACE SMALL I [Zyyy]=>[ALL]
		//DISALLOW:0x131, // (ı) LATIN SMALL LETTER DOTLESS I [Latn]=>[Latn]
		//IDNA:0x1D6A4, // (𝚤) MATHEMATICAL ITALIC SMALL DOTLESS I [Zyyy]=>[ALL]
		//DISALLOW:0x26A, // (ɪ) LATIN LETTER SMALL CAPITAL I [Latn]=>[Latn]
		//DISALLOW:0x269, // (ɩ) LATIN SMALL LETTER IOTA [Latn]=>[Latn]
		0x3B9, // (ι) GREEK SMALL LETTER IOTA [Grek]=>[Grek]
		//IDNA:0x1FBE, // (ι) GREEK PROSGEGRAMMENI [Grek]=>[Grek]
		//IDNA:0x37A, // (ͺ) GREEK YPOGEGRAMMENI [Grek]=>[Grek]
		//IDNA:0x1D6CA, // (𝛊) MATHEMATICAL BOLD SMALL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D704, // (𝜄) MATHEMATICAL ITALIC SMALL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D73E, // (𝜾) MATHEMATICAL BOLD ITALIC SMALL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D778, // (𝝸) MATHEMATICAL SANS-SERIF BOLD SMALL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D7B2, // (𝞲) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL IOTA [Zyyy]=>[ALL]
		allow(0x456), // (і) CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I [Cyrl]=>[Cyrl]
		//DISALLOW:0xA647, // (ꙇ) CYRILLIC SMALL LETTER IOTA [Cyrl]=>[Cyrl]
		allow(0x4CF), // (ӏ) CYRILLIC SMALL LETTER PALOCHKA [Cyrl]=>[Cyrl]
		//IDNA:0xAB75, // (ꭵ) CHEROKEE SMALL LETTER V [Cher]=>[Cher]
		0x13A5, // (Ꭵ) CHEROKEE LETTER V [Cher]=>[Cher]
		0x118C3, // (𑣃) WARANG CITI SMALL LETTER YU [Wara]=>[Wara]
		0x16E7, // (ᛧ) RUNIC LETTER SHORT-TWIG-YR (20221210: added)
	],
	[
		// "Ⓘ" <Same>
		'24BE', // CIRCLED LATIN CAPITAL LETTER I [Zyyy]=>[ALL]
		//IDNA:0x24BE, // (Ⓘ) CIRCLED LATIN CAPITAL LETTER I [Zyyy]=>[ALL]
		//IDNA:0x24DB, // (ⓛ) CIRCLED LATIN SMALL LETTER L [Zyyy]=>[ALL]
	],
	[
		// "i̲" <Same>
		'69 332', // LATIN SMALL LETTER I + COMBINING LOW LINE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2378, // (⍸) APL FUNCTIONAL SYMBOL IOTA UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "ĭ" <NFC(true) NFD(false)>
		'12D', // LATIN SMALL LETTER I WITH BREVE [Latn]=>[Latn]
		0x12D, // (ĭ) LATIN SMALL LETTER I WITH BREVE [Latn]=>[Latn]
		0x1D0, // (ǐ) LATIN SMALL LETTER I WITH CARON [Latn]=>[Latn]
	],
	[
		// "Ĭ" <NFC(true) NFD(false)>
		'12C', // LATIN CAPITAL LETTER I WITH BREVE [Latn]=>[Latn]
		//IDNA:0x12C, // (Ĭ) LATIN CAPITAL LETTER I WITH BREVE [Latn]=>[Latn]
		//IDNA:0x1CF, // (Ǐ) LATIN CAPITAL LETTER I WITH CARON [Latn]=>[Latn]
	],
	[
		// "i̵" <Same>
		'69 335', // LATIN SMALL LETTER I + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x268, // (ɨ) LATIN SMALL LETTER I WITH STROKE [Latn]=>[Latn]
		//DISALLOW:0x1D7B, // (ᵻ) LATIN SMALL CAPITAL LETTER I WITH STROKE [Latn]=>[Latn]
		//DISALLOW:0x1D7C, // (ᵼ) LATIN SMALL LETTER IOTA WITH STROKE [Latn]=>[Latn]
	],
	[
		// "ii" <Same>
		'69 69', // LATIN SMALL LETTER I + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2171, // (ⅱ) SMALL ROMAN NUMERAL TWO [Latn]=>[Latn]
	],
	[
		// "iii" <Same>
		'69 69 69', // LATIN SMALL LETTER I + LATIN SMALL LETTER I + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2172, // (ⅲ) SMALL ROMAN NUMERAL THREE [Latn]=>[Latn]
	],
	[
		// "ij" <Same>
		'69 6A', // LATIN SMALL LETTER I + LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0x133, // (ĳ) LATIN SMALL LIGATURE IJ [Latn]=>[Latn]
	],
	[
		// "iv" <Same>
		'69 76', // LATIN SMALL LETTER I + LATIN SMALL LETTER V [Latn]=>[Latn]
		//IDNA:0x2173, // (ⅳ) SMALL ROMAN NUMERAL FOUR [Latn]=>[Latn]
	],
	[
		// "ix" <Same>
		'69 78', // LATIN SMALL LETTER I + LATIN SMALL LETTER X [Latn]=>[Latn]
		//IDNA:0x2178, // (ⅸ) SMALL ROMAN NUMERAL NINE [Latn]=>[Latn]
	],
	[
		// "j" <Same>
		'6A', // LATIN SMALL LETTER J [Latn]=>[Latn]
		valid(0x6A), // (j) LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0xFF4A, // (ｊ) FULLWIDTH LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0x2149, // (ⅉ) DOUBLE-STRUCK ITALIC SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D423, // (𝐣) MATHEMATICAL BOLD SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D457, // (𝑗) MATHEMATICAL ITALIC SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D48B, // (𝒋) MATHEMATICAL BOLD ITALIC SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D4BF, // (𝒿) MATHEMATICAL SCRIPT SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D4F3, // (𝓳) MATHEMATICAL BOLD SCRIPT SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D527, // (𝔧) MATHEMATICAL FRAKTUR SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D55B, // (𝕛) MATHEMATICAL DOUBLE-STRUCK SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D58F, // (𝖏) MATHEMATICAL BOLD FRAKTUR SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D5C3, // (𝗃) MATHEMATICAL SANS-SERIF SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D5F7, // (𝗷) MATHEMATICAL SANS-SERIF BOLD SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D62B, // (𝘫) MATHEMATICAL SANS-SERIF ITALIC SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D65F, // (𝙟) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL J [Zyyy]=>[ALL]
		//IDNA:0x1D693, // (𝚓) MATHEMATICAL MONOSPACE SMALL J [Zyyy]=>[ALL]
		//DISALLOW:0x3F3, // (ϳ) GREEK LETTER YOT [Grek]=>[Grek]
		0x458, // (ј) CYRILLIC SMALL LETTER JE [Cyrl]=>[Cyrl]
		// 20221202: merge case
		// "J" <Same>
		//'4A', // LATIN CAPITAL LETTER J [Latn]=>[Latn]
		//IDNA:0x4A, // (J) LATIN CAPITAL LETTER J [Latn]=>[Latn]
		//IDNA:0xFF2A, // (Ｊ) FULLWIDTH LATIN CAPITAL LETTER J [Latn]=>[Latn]
		//IDNA:0x1D409, // (𝐉) MATHEMATICAL BOLD CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D43D, // (𝐽) MATHEMATICAL ITALIC CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D471, // (𝑱) MATHEMATICAL BOLD ITALIC CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D4A5, // (𝒥) MATHEMATICAL SCRIPT CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D4D9, // (𝓙) MATHEMATICAL BOLD SCRIPT CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D50D, // (𝔍) MATHEMATICAL FRAKTUR CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D541, // (𝕁) MATHEMATICAL DOUBLE-STRUCK CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D575, // (𝕵) MATHEMATICAL BOLD FRAKTUR CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D5A9, // (𝖩) MATHEMATICAL SANS-SERIF CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D5DD, // (𝗝) MATHEMATICAL SANS-SERIF BOLD CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D611, // (𝘑) MATHEMATICAL SANS-SERIF ITALIC CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D645, // (𝙅) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0x1D679, // (𝙹) MATHEMATICAL MONOSPACE CAPITAL J [Zyyy]=>[ALL]
		//IDNA:0xA7B2, // (Ʝ) LATIN CAPITAL LETTER J WITH CROSSED-TAIL [Latn]=>[Latn]
		//IDNA:0x37F, // (Ϳ) GREEK CAPITAL LETTER YOT [Grek]=>[Grek]
		//IDNA:0x408, // (Ј) CYRILLIC CAPITAL LETTER JE [Cyrl]=>[Cyrl]
		0x13AB, // (Ꭻ) CHEROKEE LETTER GU [Cher]=>[Cher]
		0x148D, // (ᒍ) CANADIAN SYLLABICS CO [Cans]=>[Cans]
		0xA4D9, // (ꓙ) LISU LETTER JA [Lisu]=>[Lisu]
	],
	[
		// "j̵" <Same>
		'6A 335', // LATIN SMALL LETTER J + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x249, // (ɉ) LATIN SMALL LETTER J WITH STROKE [Latn]=>[Latn]
	],
	[
		// "J̵" <Same>
		'4A 335', // LATIN CAPITAL LETTER J + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x248, // (Ɉ) LATIN CAPITAL LETTER J WITH STROKE [Latn]=>[Latn]
	],
	[
		// "J·" <Same>
		'4A B7', // LATIN CAPITAL LETTER J + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x1499, // (ᒙ) CANADIAN SYLLABICS WEST-CREE CWO [Cans]=>[Cans]
	],
	[
		// "ȷ" <Same>
		'237', // LATIN SMALL LETTER DOTLESS J [Latn]=>[Latn]
		//DISALLOW:0x237, // (ȷ) LATIN SMALL LETTER DOTLESS J [Latn]=>[Latn]
		//IDNA:0x1D6A5, // (𝚥) MATHEMATICAL ITALIC SMALL DOTLESS J [Zyyy]=>[ALL]
		0x575, // (յ) ARMENIAN SMALL LETTER YI [Armn]=>[Armn]
	],
	[
		// "ᴊ" <Same>
		'1D0A', // LATIN LETTER SMALL CAPITAL J [Latn]=>[Latn]
		//DISALLOW:0x1D0A, // (ᴊ) LATIN LETTER SMALL CAPITAL J [Latn]=>[Latn]
		//IDNA:0xAB7B, // (ꭻ) CHEROKEE SMALL LETTER GU [Cher]=>[Cher]
	],
	[
		// "k" <Same>
		'6B', // LATIN SMALL LETTER K [Latn]=>[Latn]
		valid(0x6B), // (k) LATIN SMALL LETTER K [Latn]=>[Latn]
		//IDNA:0x1D424, // (𝐤) MATHEMATICAL BOLD SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D458, // (𝑘) MATHEMATICAL ITALIC SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D48C, // (𝒌) MATHEMATICAL BOLD ITALIC SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D4C0, // (𝓀) MATHEMATICAL SCRIPT SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D4F4, // (𝓴) MATHEMATICAL BOLD SCRIPT SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D528, // (𝔨) MATHEMATICAL FRAKTUR SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D55C, // (𝕜) MATHEMATICAL DOUBLE-STRUCK SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D590, // (𝖐) MATHEMATICAL BOLD FRAKTUR SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D5C4, // (𝗄) MATHEMATICAL SANS-SERIF SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D5F8, // (𝗸) MATHEMATICAL SANS-SERIF BOLD SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D62C, // (𝘬) MATHEMATICAL SANS-SERIF ITALIC SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D660, // (𝙠) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL K [Zyyy]=>[ALL]
		//IDNA:0x1D694, // (𝚔) MATHEMATICAL MONOSPACE SMALL K [Zyyy]=>[ALL]
		// 20221202: merge case
		// "K" <Same>
		//'4B', // LATIN CAPITAL LETTER K [Latn]=>[Latn]
		//IDNA:0x4B, // (K) LATIN CAPITAL LETTER K [Latn]=>[Latn]
		//IDNA:0x212A, // (K) KELVIN SIGN [Latn]=>[Latn]
		//IDNA:0xFF2B, // (Ｋ) FULLWIDTH LATIN CAPITAL LETTER K [Latn]=>[Latn]
		//IDNA:0x1D40A, // (𝐊) MATHEMATICAL BOLD CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D43E, // (𝐾) MATHEMATICAL ITALIC CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D472, // (𝑲) MATHEMATICAL BOLD ITALIC CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D4A6, // (𝒦) MATHEMATICAL SCRIPT CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D4DA, // (𝓚) MATHEMATICAL BOLD SCRIPT CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D50E, // (𝔎) MATHEMATICAL FRAKTUR CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D542, // (𝕂) MATHEMATICAL DOUBLE-STRUCK CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D576, // (𝕶) MATHEMATICAL BOLD FRAKTUR CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D5AA, // (𝖪) MATHEMATICAL SANS-SERIF CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D5DE, // (𝗞) MATHEMATICAL SANS-SERIF BOLD CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D612, // (𝘒) MATHEMATICAL SANS-SERIF ITALIC CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D646, // (𝙆) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x1D67A, // (𝙺) MATHEMATICAL MONOSPACE CAPITAL K [Zyyy]=>[ALL]
		//IDNA:0x39A, // (Κ) GREEK CAPITAL LETTER KAPPA [Grek]=>[Grek]
		//IDNA:0x1D6B1, // (𝚱) MATHEMATICAL BOLD CAPITAL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D6EB, // (𝛫) MATHEMATICAL ITALIC CAPITAL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D725, // (𝜥) MATHEMATICAL BOLD ITALIC CAPITAL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D75F, // (𝝟) MATHEMATICAL SANS-SERIF BOLD CAPITAL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D799, // (𝞙) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x2C94, // (Ⲕ) COPTIC CAPITAL LETTER KAPA [Copt]=>[Copt]
		//IDNA:0x41A, // (К) CYRILLIC CAPITAL LETTER KA [Cyrl]=>[Cyrl]
		0x13E6, // (Ꮶ) CHEROKEE LETTER TSO [Cher]=>[Cher]
		0x16D5, // (ᛕ) RUNIC LETTER OPEN-P [Runr]=>[Runr]
		0xA4D7, // (ꓗ) LISU LETTER KA [Lisu]=>[Lisu]
		0x10518, // (𐔘) ELBASAN LETTER QE [Elba]=>[Elba]
	],
	[
		// "k̔" <Same>
		'6B 314', // LATIN SMALL LETTER K + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x199, // (ƙ) LATIN SMALL LETTER K WITH HOOK [Latn]=>[Latn]
	],
	[
		// "K̩" <Same>
		'4B 329', // LATIN CAPITAL LETTER K + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x2C69, // (Ⱪ) LATIN CAPITAL LETTER K WITH DESCENDER [Latn]=>[Latn]
		//IDNA:0x49A, // (Қ) CYRILLIC CAPITAL LETTER KA WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "K̵" <Same>
		'4B 335', // LATIN CAPITAL LETTER K + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		0x20AD, // (₭) KIP SIGN [Zyyy]=>[ALL]
		//IDNA:0xA740, // (Ꝁ) LATIN CAPITAL LETTER K WITH STROKE [Latn]=>[Latn]
		//IDNA:0x49E, // (Ҟ) CYRILLIC CAPITAL LETTER KA WITH STROKE [Cyrl]=>[Cyrl]
	],
	[
		// "K'" <Same>
		'4B 27', // LATIN CAPITAL LETTER K + APOSTROPHE [Latn,Zyyy]=>[Latn]
		//IDNA:0x198, // (Ƙ) LATIN CAPITAL LETTER K WITH HOOK [Latn]=>[Latn]
	],
	[
		// "l" <Same>
		'6C', // LATIN SMALL LETTER L [Latn]=>[Latn]
		valid(0x6C), // (l) LATIN SMALL LETTER L [Latn]=>[Latn]
		//DISALLOW:0x5C0, // (׀) HEBREW PUNCTUATION PASEQ [Hebr]=>[Hebr]
		//IDNA:0x7C, // (|) VERTICAL LINE [Zyyy]=>[ALL]
		//DISALLOW:0x2223, // (∣) DIVIDES [Zyyy]=>[ALL]
		//DISALLOW:0x23FD, // (⏽) POWER ON SYMBOL [Zyyy]=>[ALL]
		//IDNA:0xFFE8, // (￨) HALFWIDTH FORMS LIGHT VERTICAL [Zyyy]=>[ALL]
		// valid(0x31), // (1) DIGIT ONE [Zyyy]=>[ALL] (20221203: this links too many confusables together)
		valid(0x661), // (١) ARABIC-INDIC DIGIT ONE [Arab]=>[Arab,Thaa,Yezi]
		0x6F1, // (۱) EXTENDED ARABIC-INDIC DIGIT ONE [Arab]=>[Arab]
		0x10320, // (𐌠) OLD ITALIC NUMERAL ONE [Ital]=>[Ital]
		0x1E8C7, // (𞣇) MENDE KIKAKUI DIGIT ONE [Mend]=>[Mend]
		//IDNA:0x1D7CF, // (𝟏) MATHEMATICAL BOLD DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x1D7D9, // (𝟙) MATHEMATICAL DOUBLE-STRUCK DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x1D7E3, // (𝟣) MATHEMATICAL SANS-SERIF DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x1D7ED, // (𝟭) MATHEMATICAL SANS-SERIF BOLD DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x1D7F7, // (𝟷) MATHEMATICAL MONOSPACE DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x1FBF1, // (🯱) SEGMENTED DIGIT ONE [Zyyy]=>[ALL]
		//IDNA:0x49, // (I) LATIN CAPITAL LETTER I [Latn]=>[Latn]
		//IDNA:0xFF29, // (Ｉ) FULLWIDTH LATIN CAPITAL LETTER I [Latn]=>[Latn]
		//IDNA:0x2160, // (Ⅰ) ROMAN NUMERAL ONE [Latn]=>[Latn]
		//IDNA:0x2110, // (ℐ) SCRIPT CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x2111, // (ℑ) BLACK-LETTER CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D408, // (𝐈) MATHEMATICAL BOLD CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D43C, // (𝐼) MATHEMATICAL ITALIC CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D470, // (𝑰) MATHEMATICAL BOLD ITALIC CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D4D8, // (𝓘) MATHEMATICAL BOLD SCRIPT CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D540, // (𝕀) MATHEMATICAL DOUBLE-STRUCK CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D574, // (𝕴) MATHEMATICAL BOLD FRAKTUR CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D5A8, // (𝖨) MATHEMATICAL SANS-SERIF CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D5DC, // (𝗜) MATHEMATICAL SANS-SERIF BOLD CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D610, // (𝘐) MATHEMATICAL SANS-SERIF ITALIC CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D644, // (𝙄) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x1D678, // (𝙸) MATHEMATICAL MONOSPACE CAPITAL I [Zyyy]=>[ALL]
		//IDNA:0x196, // (Ɩ) LATIN CAPITAL LETTER IOTA [Latn]=>[Latn]
		//IDNA:0xFF4C, // (ｌ) FULLWIDTH LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x217C, // (ⅼ) SMALL ROMAN NUMERAL FIFTY [Latn]=>[Latn]
		//IDNA:0x2113, // (ℓ) SCRIPT SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D425, // (𝐥) MATHEMATICAL BOLD SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D459, // (𝑙) MATHEMATICAL ITALIC SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D48D, // (𝒍) MATHEMATICAL BOLD ITALIC SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D4C1, // (𝓁) MATHEMATICAL SCRIPT SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D4F5, // (𝓵) MATHEMATICAL BOLD SCRIPT SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D529, // (𝔩) MATHEMATICAL FRAKTUR SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D55D, // (𝕝) MATHEMATICAL DOUBLE-STRUCK SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D591, // (𝖑) MATHEMATICAL BOLD FRAKTUR SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D5C5, // (𝗅) MATHEMATICAL SANS-SERIF SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D5F9, // (𝗹) MATHEMATICAL SANS-SERIF BOLD SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D62D, // (𝘭) MATHEMATICAL SANS-SERIF ITALIC SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D661, // (𝙡) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL L [Zyyy]=>[ALL]
		//IDNA:0x1D695, // (𝚕) MATHEMATICAL MONOSPACE SMALL L [Zyyy]=>[ALL]
		//DISALLOW:0x1C0, // (ǀ) LATIN LETTER DENTAL CLICK [Latn]=>[Latn]
		//IDNA:0x399, // (Ι) GREEK CAPITAL LETTER IOTA [Grek]=>[Grek]
		//IDNA:0x1D6B0, // (𝚰) MATHEMATICAL BOLD CAPITAL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D6EA, // (𝛪) MATHEMATICAL ITALIC CAPITAL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D724, // (𝜤) MATHEMATICAL BOLD ITALIC CAPITAL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D75E, // (𝝞) MATHEMATICAL SANS-SERIF BOLD CAPITAL IOTA [Zyyy]=>[ALL]
		//IDNA:0x1D798, // (𝞘) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL IOTA [Zyyy]=>[ALL]
		//IDNA:0x2C92, // (Ⲓ) COPTIC CAPITAL LETTER IAUDA [Copt]=>[Copt]
		//IDNA:0x406, // (І) CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I [Cyrl]=>[Cyrl]
		//IDNA:0x4C0, // (Ӏ) CYRILLIC LETTER PALOCHKA [Cyrl]=>[Cyrl]
		0x5D5, // (ו) HEBREW LETTER VAV [Hebr]=>[Hebr]
		0x5DF, // (ן) HEBREW LETTER FINAL NUN [Hebr]=>[Hebr]
		allow(0x627), // (ا) ARABIC LETTER ALEF [Arab]=>[Arab]
		//IDNA:0x1EE00, // (𞸀) ARABIC MATHEMATICAL ALEF [Arab]=>[Arab]
		//IDNA:0x1EE80, // (𞺀) ARABIC MATHEMATICAL LOOPED ALEF [Arab]=>[Arab]
		//IDNA:0xFE8E, // (ﺎ) ARABIC LETTER ALEF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE8D, // (ﺍ) ARABIC LETTER ALEF ISOLATED FORM [Arab]=>[Arab]
		0x7CA, // (ߊ) NKO LETTER A [Nkoo]=>[Nkoo]
		0x2D4F, // (ⵏ) TIFINAGH LETTER YAN [Tfng]=>[Tfng]
		0x16C1, // (ᛁ) RUNIC LETTER ISAZ IS ISS I [Runr]=>[Runr]
		0xA4F2, // (ꓲ) LISU LETTER I [Lisu]=>[Lisu]
		0x16F28, // (𖼨) MIAO LETTER GHA [Plrd]=>[Plrd]
		0x1028A, // (𐊊) LYCIAN LETTER J [Lyci]=>[Lyci]
		0x10309, // (𐌉) OLD ITALIC LETTER I [Ital]=>[Ital]
		// 20221119: added
		0x10A7D, // (𐩽) OLD SOUTH ARABIAN NUMBER ONE
		// 20221202: merge case
		// "L" <Same>
		//'4C', // LATIN CAPITAL LETTER L [Latn]=>[Latn]
		//IDNA:0x4C, // (L) LATIN CAPITAL LETTER L [Latn]=>[Latn]
		//DISALLOW:0x1D22A, // (𝈪) GREEK INSTRUMENTAL NOTATION SYMBOL-23 [Grek]=>[Grek]
		//IDNA:0x216C, // (Ⅼ) ROMAN NUMERAL FIFTY [Latn]=>[Latn]
		//IDNA:0x2112, // (ℒ) SCRIPT CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D40B, // (𝐋) MATHEMATICAL BOLD CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D43F, // (𝐿) MATHEMATICAL ITALIC CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D473, // (𝑳) MATHEMATICAL BOLD ITALIC CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D4DB, // (𝓛) MATHEMATICAL BOLD SCRIPT CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D50F, // (𝔏) MATHEMATICAL FRAKTUR CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D543, // (𝕃) MATHEMATICAL DOUBLE-STRUCK CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D577, // (𝕷) MATHEMATICAL BOLD FRAKTUR CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D5AB, // (𝖫) MATHEMATICAL SANS-SERIF CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D5DF, // (𝗟) MATHEMATICAL SANS-SERIF BOLD CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D613, // (𝘓) MATHEMATICAL SANS-SERIF ITALIC CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D647, // (𝙇) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x1D67B, // (𝙻) MATHEMATICAL MONOSPACE CAPITAL L [Zyyy]=>[ALL]
		//IDNA:0x2CD0, // (Ⳑ) COPTIC CAPITAL LETTER L-SHAPED HA [Copt]=>[Copt]
		0x13DE, // (Ꮮ) CHEROKEE LETTER TLE [Cher]=>[Cher]
		0x14AA, // (ᒪ) CANADIAN SYLLABICS MA [Cans]=>[Cans]
		0xA4E1, // (ꓡ) LISU LETTER LA [Lisu]=>[Lisu]
		0x16F16, // (𖼖) MIAO LETTER LA [Plrd]=>[Plrd]
		//IDNA:0x118A3, // (𑢣) WARANG CITI CAPITAL LETTER YU [Wara]=>[Wara]
		//IDNA:0x118B2, // (𑢲) WARANG CITI CAPITAL LETTER TTE [Wara]=>[Wara]
		//IDNA:0x1041B, // (𐐛) DESERET CAPITAL LETTER ETH [Dsrt]=>[Dsrt]
		0x10526, // (𐔦) ELBASAN LETTER GHAMMA [Elba]=>[Elba]
	],
	[
		// "l̋" <Same>
		'6C 30B', // LATIN SMALL LETTER L + COMBINING DOUBLE ACUTE ACCENT [Latn,Zinh]=>[Latn]
		//IDNA:0xFD3C, // (ﴼ) ARABIC LIGATURE ALEF WITH FATHATAN FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD3D, // (ﴽ) ARABIC LIGATURE ALEF WITH FATHATAN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "l̸" <Same>
		'6C 338', // LATIN SMALL LETTER L + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		0x142, // (ł) LATIN SMALL LETTER L WITH STROKE [Latn]=>[Latn]
	],
	[
		// "L̸" <Same>
		'4C 338', // LATIN CAPITAL LETTER L + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x141, // (Ł) LATIN CAPITAL LETTER L WITH STROKE [Latn]=>[Latn]
	],
	[
		// "l̨" <Same>
		'6C 328', // LATIN SMALL LETTER L + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//DISALLOW:0x26D, // (ɭ) LATIN SMALL LETTER L WITH RETROFLEX HOOK [Latn]=>[Latn]
	],
	[
		// "l̵" <Same>
		'6C 335', // LATIN SMALL LETTER L + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x197, // (Ɨ) LATIN CAPITAL LETTER I WITH STROKE [Latn]=>[Latn]
		//DISALLOW:0x19A, // (ƚ) LATIN SMALL LETTER L WITH BAR [Latn]=>[Latn]
	],
	[
		// "l̴" <Same>
		'6C 334', // LATIN SMALL LETTER L + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x26B, // (ɫ) LATIN SMALL LETTER L WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "lٕ" <Same>
		'6C 655', // LATIN SMALL LETTER L + ARABIC HAMZA BELOW [Latn,Zinh]=>[]
		0x625, // (إ) ARABIC LETTER ALEF WITH HAMZA BELOW [Arab]=>[Arab]
		//IDNA:0xFE88, // (ﺈ) ARABIC LETTER ALEF WITH HAMZA BELOW FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE87, // (ﺇ) ARABIC LETTER ALEF WITH HAMZA BELOW ISOLATED FORM [Arab]=>[Arab]
		//DISALLOW:0x673, // (ٳ) ARABIC LETTER ALEF WITH WAVY HAMZA BELOW [Arab]=>[Arab]
	],
	[
		// "l·" <Same>
		'6C B7', // LATIN SMALL LETTER L + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		//IDNA:0x140, // (ŀ) LATIN SMALL LETTER L WITH MIDDLE DOT [Latn]=>[Latn]
		//IDNA:0x13F, // (Ŀ) LATIN CAPITAL LETTER L WITH MIDDLE DOT [Latn]=>[Latn]
		0x14B7, // (ᒷ) CANADIAN SYLLABICS WEST-CREE MWA [Cans]=>[Cans]
	],
	[
		// "l," <Same>
		'6C 2C', // LATIN SMALL LETTER L + COMMA [Latn,Zyyy]=>[Latn]
		//IDNA:0x1F102, // (🄂) DIGIT ONE COMMA [Zyyy]=>[ALL]
	],
	[
		// "l." <Same>
		'6C 2E', // LATIN SMALL LETTER L + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2488, // (⒈) DIGIT ONE FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l'" <Same>
		'6C 27', // LATIN SMALL LETTER L + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x5F1, // (ױ) HEBREW LIGATURE YIDDISH VAV YOD [Hebr]=>[Hebr]
	],
	[
		// "l2." <Same>
		'6C 32 2E', // LATIN SMALL LETTER L + DIGIT TWO + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2493, // (⒓) NUMBER TWELVE FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l2日" <Same>
		'6C 32 65E5', // LATIN SMALL LETTER L + DIGIT TWO + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33EB, // (㏫) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TWELVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l2月" <Same>
		'6C 32 6708', // LATIN SMALL LETTER L + DIGIT TWO + CJK Ideograph-6708 <6409/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x32CB, // (㋋) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DECEMBER [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l2点" <Same>
		'6C 32 70B9', // LATIN SMALL LETTER L + DIGIT TWO + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x3364, // (㍤) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TWELVE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l3." <Same>
		'6C 33 2E', // LATIN SMALL LETTER L + DIGIT THREE + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2494, // (⒔) NUMBER THIRTEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l3日" <Same>
		'6C 33 65E5', // LATIN SMALL LETTER L + DIGIT THREE + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33EC, // (㏬) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY THIRTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l3点" <Same>
		'6C 33 70B9', // LATIN SMALL LETTER L + DIGIT THREE + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x3365, // (㍥) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR THIRTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l4." <Same>
		'6C 34 2E', // LATIN SMALL LETTER L + DIGIT FOUR + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2495, // (⒕) NUMBER FOURTEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l4日" <Same>
		'6C 34 65E5', // LATIN SMALL LETTER L + DIGIT FOUR + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33ED, // (㏭) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY FOURTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l4点" <Same>
		'6C 34 70B9', // LATIN SMALL LETTER L + DIGIT FOUR + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x3366, // (㍦) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR FOURTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l5." <Same>
		'6C 35 2E', // LATIN SMALL LETTER L + DIGIT FIVE + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2496, // (⒖) NUMBER FIFTEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l5日" <Same>
		'6C 35 65E5', // LATIN SMALL LETTER L + DIGIT FIVE + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33EE, // (㏮) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY FIFTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l5点" <Same>
		'6C 35 70B9', // LATIN SMALL LETTER L + DIGIT FIVE + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x3367, // (㍧) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR FIFTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l6." <Same>
		'6C 36 2E', // LATIN SMALL LETTER L + DIGIT SIX + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2497, // (⒗) NUMBER SIXTEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l6日" <Same>
		'6C 36 65E5', // LATIN SMALL LETTER L + DIGIT SIX + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33EF, // (㏯) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY SIXTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l6点" <Same>
		'6C 36 70B9', // LATIN SMALL LETTER L + DIGIT SIX + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x3368, // (㍨) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR SIXTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l7." <Same>
		'6C 37 2E', // LATIN SMALL LETTER L + DIGIT SEVEN + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2498, // (⒘) NUMBER SEVENTEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l7日" <Same>
		'6C 37 65E5', // LATIN SMALL LETTER L + DIGIT SEVEN + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33F0, // (㏰) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY SEVENTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l7点" <Same>
		'6C 37 70B9', // LATIN SMALL LETTER L + DIGIT SEVEN + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x3369, // (㍩) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR SEVENTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l8." <Same>
		'6C 38 2E', // LATIN SMALL LETTER L + DIGIT EIGHT + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2499, // (⒙) NUMBER EIGHTEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l8日" <Same>
		'6C 38 65E5', // LATIN SMALL LETTER L + DIGIT EIGHT + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33F1, // (㏱) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY EIGHTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l8点" <Same>
		'6C 38 70B9', // LATIN SMALL LETTER L + DIGIT EIGHT + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x336A, // (㍪) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR EIGHTEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l9." <Same>
		'6C 39 2E', // LATIN SMALL LETTER L + DIGIT NINE + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x249A, // (⒚) NUMBER NINETEEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "l9日" <Same>
		'6C 39 65E5', // LATIN SMALL LETTER L + DIGIT NINE + CJK Ideograph-65E5 <6118/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x33F2, // (㏲) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY NINETEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l9点" <Same>
		'6C 39 70B9', // LATIN SMALL LETTER L + DIGIT NINE + CJK Ideograph-70B9 <8890/20992> [Latn,Zyyy,Hani]=>[]
		//IDNA:0x336B, // (㍫) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR NINETEEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "lj" <Same>
		'6C 6A', // LATIN SMALL LETTER L + LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0x1C9, // (ǉ) LATIN SMALL LETTER LJ [Latn]=>[Latn]
	],
	[
		// "lJ" <Same>
		'6C 4A', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER J [Latn]=>[Latn]
		//IDNA:0x132, // (Ĳ) LATIN CAPITAL LIGATURE IJ [Latn]=>[Latn]
	],
	[
		// "Lj" <Same>
		'4C 6A', // LATIN CAPITAL LETTER L + LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0x1C8, // (ǈ) LATIN CAPITAL LETTER L WITH SMALL LETTER J [Latn]=>[Latn]
	],
	[
		// "LJ" <Same>
		'4C 4A', // LATIN CAPITAL LETTER L + LATIN CAPITAL LETTER J [Latn]=>[Latn]
		//IDNA:0x1C7, // (Ǉ) LATIN CAPITAL LETTER LJ [Latn]=>[Latn]
	],
	[
		// "ll" <Same>
		'6C 6C', // LATIN SMALL LETTER L + LATIN SMALL LETTER L [Latn]=>[Latn]
		//DISALLOW:0x2016, // (‖) DOUBLE VERTICAL LINE [Zyyy]=>[ALL]
		//DISALLOW:0x2225, // (∥) PARALLEL TO [Zyyy]=>[ALL]
		//IDNA:0x2161, // (Ⅱ) ROMAN NUMERAL TWO [Latn]=>[Latn]
		//DISALLOW:0x1C1, // (ǁ) LATIN LETTER LATERAL CLICK [Latn]=>[Latn]
		0x5F0, // (װ) HEBREW LIGATURE YIDDISH DOUBLE VAV [Hebr]=>[Hebr]
	],
	[
		// "l̵l̵" <Same>
		'6C 335 6C 335', // LATIN SMALL LETTER L + COMBINING SHORT STROKE OVERLAY + LATIN SMALL LETTER L + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x10199, // (𐆙) ROMAN DUPONDIUS SIGN [Zyyy]=>[ALL]
	],
	[
		// "ll." <Same>
		'6C 6C 2E', // LATIN SMALL LETTER L + LATIN SMALL LETTER L + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2492, // (⒒) NUMBER ELEVEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "lll" <Same>
		'6C 6C 6C', // LATIN SMALL LETTER L + LATIN SMALL LETTER L + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x2162, // (Ⅲ) ROMAN NUMERAL THREE [Latn]=>[Latn]
	],
	[
		// "l̵l̵S̵" <Same>
		'6C 335 6C 335 53 335', // LATIN SMALL LETTER L + COMBINING SHORT STROKE OVERLAY + LATIN SMALL LETTER L + COMBINING SHORT STROKE OVERLAY + LATIN CAPITAL LETTER S + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x10198, // (𐆘) ROMAN SESTERTIUS SIGN [Zyyy]=>[ALL]
	],
	[
		// "ll日" <Same>
		'6C 6C 65E5', // LATIN SMALL LETTER L + LATIN SMALL LETTER L + CJK Ideograph-65E5 <6118/20992> [Latn,Hani]=>[]
		//IDNA:0x33EA, // (㏪) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY ELEVEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "ll月" <Same>
		'6C 6C 6708', // LATIN SMALL LETTER L + LATIN SMALL LETTER L + CJK Ideograph-6708 <6409/20992> [Latn,Hani]=>[]
		//IDNA:0x32CA, // (㋊) IDEOGRAPHIC TELEGRAPH SYMBOL FOR NOVEMBER [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "ll点" <Same>
		'6C 6C 70B9', // LATIN SMALL LETTER L + LATIN SMALL LETTER L + CJK Ideograph-70B9 <8890/20992> [Latn,Hani]=>[]
		//IDNA:0x3363, // (㍣) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR ELEVEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "lO" <Same>
		'6C 4F', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER O [Latn]=>[Latn]
		//IDNA:0x42E, // (Ю) CYRILLIC CAPITAL LETTER YU [Cyrl]=>[Cyrl]
	],
	[
		// "lO." <Same>
		'6C 4F 2E', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER O + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x2491, // (⒑) NUMBER TEN FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "lO日" <Same>
		'6C 4F 65E5', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER O + CJK Ideograph-65E5 <6118/20992> [Latn,Hani]=>[]
		//IDNA:0x33E9, // (㏩) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY TEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "lO月" <Same>
		'6C 4F 6708', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER O + CJK Ideograph-6708 <6409/20992> [Latn,Hani]=>[]
		//IDNA:0x32C9, // (㋉) IDEOGRAPHIC TELEGRAPH SYMBOL FOR OCTOBER [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "lO点" <Same>
		'6C 4F 70B9', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER O + CJK Ideograph-70B9 <8890/20992> [Latn,Hani]=>[]
		//IDNA:0x3362, // (㍢) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR TEN [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "ls" <Same>
		'6C 73', // LATIN SMALL LETTER L + LATIN SMALL LETTER S [Latn]=>[Latn]
		//DISALLOW:0x2AA, // (ʪ) LATIN SMALL LETTER LS DIGRAPH [Latn]=>[Latn]
	],
	[
		// "lt" <Same>
		'6C 74', // LATIN SMALL LETTER L + LATIN SMALL LETTER T [Latn]=>[Latn]
		//DISALLOW:0x20B6, // (₶) LIVRE TOURNOIS SIGN [Zyyy]=>[ALL]
	],
	[
		// "lV" <Same>
		'6C 56', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER V [Latn]=>[Latn]
		//IDNA:0x2163, // (Ⅳ) ROMAN NUMERAL FOUR [Latn]=>[Latn]
	],
	[
		// "lX" <Same>
		'6C 58', // LATIN SMALL LETTER L + LATIN CAPITAL LETTER X [Latn]=>[Latn]
		//IDNA:0x2168, // (Ⅸ) ROMAN NUMERAL NINE [Latn]=>[Latn]
	],
	[
		// "lȝ" <Same>
		'6C 21D', // LATIN SMALL LETTER L + LATIN SMALL LETTER YOGH [Latn]=>[Latn]
		//DISALLOW:0x26E, // (ɮ) LATIN SMALL LETTER LEZH [Latn]=>[Latn]
	],
	[
		// "lz" <Same>
		'6C 7A', // LATIN SMALL LETTER L + LATIN SMALL LETTER Z [Latn]=>[Latn]
		//DISALLOW:0x2AB, // (ʫ) LATIN SMALL LETTER LZ DIGRAPH [Latn]=>[Latn]
	],
	[
		// "lٴ" <Same>
		'6C 674', // LATIN SMALL LETTER L + ARABIC LETTER HIGH HAMZA [Latn,Arab]=>[]
		//IDNA:0x675, // (ٵ) ARABIC LETTER HIGH HAMZA ALEF [Arab]=>[Arab]
		0x623, // (أ) ARABIC LETTER ALEF WITH HAMZA ABOVE [Arab]=>[Arab]
		//IDNA:0xFE84, // (ﺄ) ARABIC LETTER ALEF WITH HAMZA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE83, // (ﺃ) ARABIC LETTER ALEF WITH HAMZA ABOVE ISOLATED FORM [Arab]=>[Arab]
		//DISALLOW:0x672, // (ٲ) ARABIC LETTER ALEF WITH WAVY HAMZA ABOVE [Arab]=>[Arab]
	],
	[
		// "lكبر" <Same>
		'6C 643 628 631', // LATIN SMALL LETTER L + ARABIC LETTER KAF + ARABIC LETTER BEH + ARABIC LETTER REH [Latn,Arab]=>[]
		//IDNA:0xFDF3, // (ﷳ) ARABIC LIGATURE AKBAR ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "lللّٰo" <Same>
		'6C 644 644 651 670 6F', // LATIN SMALL LETTER L + ARABIC LETTER LAM + ARABIC LETTER LAM + ARABIC SHADDA + ARABIC LETTER SUPERSCRIPT ALEF + LATIN SMALL LETTER O [Latn,Arab,Zinh]=>[]
		//IDNA:0xFDF2, // (ﷲ) ARABIC LIGATURE ALLAH ISOLATED FORM [Arab]=>[Arab,Thaa]
	],
	[
		// "l日" <Same>
		'6C 65E5', // LATIN SMALL LETTER L + CJK Ideograph-65E5 <6118/20992> [Latn,Hani]=>[]
		//IDNA:0x33E0, // (㏠) IDEOGRAPHIC TELEGRAPH SYMBOL FOR DAY ONE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l月" <Same>
		'6C 6708', // LATIN SMALL LETTER L + CJK Ideograph-6708 <6409/20992> [Latn,Hani]=>[]
		//IDNA:0x32C0, // (㋀) IDEOGRAPHIC TELEGRAPH SYMBOL FOR JANUARY [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "l点" <Same>
		'6C 70B9', // LATIN SMALL LETTER L + CJK Ideograph-70B9 <8890/20992> [Latn,Hani]=>[]
		//IDNA:0x3359, // (㍙) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR ONE [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "ʟ" <Same>
		'29F', // LATIN LETTER SMALL CAPITAL L [Latn]=>[Latn]
		//DISALLOW:0x29F, // (ʟ) LATIN LETTER SMALL CAPITAL L [Latn]=>[Latn]
		0x2CD1, // (ⳑ) COPTIC SMALL LETTER L-SHAPED HA [Copt]=>[Copt]
		//IDNA:0xABAE, // (ꮮ) CHEROKEE SMALL LETTER TLE [Cher]=>[Cher]
		0x10443, // (𐑃) DESERET SMALL LETTER ETH [Dsrt]=>[Dsrt]
	],
	[
		// "rn" <Same>
		'72 6E', // LATIN SMALL LETTER R + LATIN SMALL LETTER N [Latn]=>[Latn]
		0x118E3, // (𑣣) WARANG CITI DIGIT THREE [Wara]=>[Wara]
		valid(0x6D), // (m) LATIN SMALL LETTER M [Latn]=>[Latn]
		//IDNA:0x217F, // (ⅿ) SMALL ROMAN NUMERAL ONE THOUSAND [Latn]=>[Latn]
		//IDNA:0x1D426, // (𝐦) MATHEMATICAL BOLD SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D45A, // (𝑚) MATHEMATICAL ITALIC SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D48E, // (𝒎) MATHEMATICAL BOLD ITALIC SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D4C2, // (𝓂) MATHEMATICAL SCRIPT SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D4F6, // (𝓶) MATHEMATICAL BOLD SCRIPT SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D52A, // (𝔪) MATHEMATICAL FRAKTUR SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D55E, // (𝕞) MATHEMATICAL DOUBLE-STRUCK SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D592, // (𝖒) MATHEMATICAL BOLD FRAKTUR SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D5C6, // (𝗆) MATHEMATICAL SANS-SERIF SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D5FA, // (𝗺) MATHEMATICAL SANS-SERIF BOLD SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D62E, // (𝘮) MATHEMATICAL SANS-SERIF ITALIC SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D662, // (𝙢) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL M [Zyyy]=>[ALL]
		//IDNA:0x1D696, // (𝚖) MATHEMATICAL MONOSPACE SMALL M [Zyyy]=>[ALL]
		0x11700, // (𑜀) AHOM LETTER KA [Ahom]=>[Ahom]
		// 20221202: merge case
		// "M" <Same>
		//'4D', // LATIN CAPITAL LETTER M [Latn]=>[Latn]
		//IDNA:0x4D, // (M) LATIN CAPITAL LETTER M [Latn]=>[Latn]
		//IDNA:0xFF2D, // (Ｍ) FULLWIDTH LATIN CAPITAL LETTER M [Latn]=>[Latn]
		//IDNA:0x216F, // (Ⅿ) ROMAN NUMERAL ONE THOUSAND [Latn]=>[Latn]
		//IDNA:0x2133, // (ℳ) SCRIPT CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D40C, // (𝐌) MATHEMATICAL BOLD CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D440, // (𝑀) MATHEMATICAL ITALIC CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D474, // (𝑴) MATHEMATICAL BOLD ITALIC CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D4DC, // (𝓜) MATHEMATICAL BOLD SCRIPT CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D510, // (𝔐) MATHEMATICAL FRAKTUR CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D544, // (𝕄) MATHEMATICAL DOUBLE-STRUCK CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D578, // (𝕸) MATHEMATICAL BOLD FRAKTUR CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D5AC, // (𝖬) MATHEMATICAL SANS-SERIF CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D5E0, // (𝗠) MATHEMATICAL SANS-SERIF BOLD CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D614, // (𝘔) MATHEMATICAL SANS-SERIF ITALIC CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D648, // (𝙈) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x1D67C, // (𝙼) MATHEMATICAL MONOSPACE CAPITAL M [Zyyy]=>[ALL]
		//IDNA:0x39C, // (Μ) GREEK CAPITAL LETTER MU [Grek]=>[Grek]
		//IDNA:0x1D6B3, // (𝚳) MATHEMATICAL BOLD CAPITAL MU [Zyyy]=>[ALL]
		//IDNA:0x1D6ED, // (𝛭) MATHEMATICAL ITALIC CAPITAL MU [Zyyy]=>[ALL]
		//IDNA:0x1D727, // (𝜧) MATHEMATICAL BOLD ITALIC CAPITAL MU [Zyyy]=>[ALL]
		//IDNA:0x1D761, // (𝝡) MATHEMATICAL SANS-SERIF BOLD CAPITAL MU [Zyyy]=>[ALL]
		//IDNA:0x1D79B, // (𝞛) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL MU [Zyyy]=>[ALL]
		//IDNA:0x3FA, // (Ϻ) GREEK CAPITAL LETTER SAN [Grek]=>[Grek]
		//IDNA:0x2C98, // (Ⲙ) COPTIC CAPITAL LETTER MI [Copt]=>[Copt]
		//IDNA:0x41C, // (М) CYRILLIC CAPITAL LETTER EM [Cyrl]=>[Cyrl]
		0x13B7, // (Ꮇ) CHEROKEE LETTER LU [Cher]=>[Cher]
		0x15F0, // (ᗰ) CANADIAN SYLLABICS CARRIER GO [Cans]=>[Cans]
		0x16D6, // (ᛖ) RUNIC LETTER EHWAZ EH E [Runr]=>[Runr]
		0xA4DF, // (ꓟ) LISU LETTER MA [Lisu]=>[Lisu]
		0x102B0, // (𐊰) CARIAN LETTER S [Cari]=>[Cari]
		0x10311, // (𐌑) OLD ITALIC LETTER SHE [Ital]=>[Ital]
	],
	[
		// "M̦" <Same>
		'4D 326', // LATIN CAPITAL LETTER M + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x4CD, // (Ӎ) CYRILLIC CAPITAL LETTER EM WITH TAIL [Cyrl]=>[Cyrl]
	],
	[
		// "MB" <Same>
		'4D 42', // LATIN CAPITAL LETTER M + LATIN CAPITAL LETTER B [Latn]=>[Latn]
		//DISALLOW:0x1F76B, // (🝫) ALCHEMICAL SYMBOL FOR BATH OF MARY [Zyyy]=>[ALL]
	],
	[
		// "◌ᷟ" <Same>
		'1DDF', // COMBINING LATIN LETTER SMALL CAPITAL M [Zinh]=>[ALL]
		//DISALLOW:0x1DDF, // (◌ᷟ) COMBINING LATIN LETTER SMALL CAPITAL M [Zinh]=>[ALL]
		//DISALLOW:0x2DE8, // (◌ⷨ) COMBINING CYRILLIC LETTER EM [Cyrl]=>[Cyrl]
	],
	[
		// "n" <Same>
		'6E', // LATIN SMALL LETTER N [Latn]=>[Latn]
		valid(0x6E), // (n) LATIN SMALL LETTER N [Latn]=>[Latn]
		//IDNA:0x1D427, // (𝐧) MATHEMATICAL BOLD SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D45B, // (𝑛) MATHEMATICAL ITALIC SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D48F, // (𝒏) MATHEMATICAL BOLD ITALIC SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D4C3, // (𝓃) MATHEMATICAL SCRIPT SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D4F7, // (𝓷) MATHEMATICAL BOLD SCRIPT SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D52B, // (𝔫) MATHEMATICAL FRAKTUR SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D55F, // (𝕟) MATHEMATICAL DOUBLE-STRUCK SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D593, // (𝖓) MATHEMATICAL BOLD FRAKTUR SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D5C7, // (𝗇) MATHEMATICAL SANS-SERIF SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D5FB, // (𝗻) MATHEMATICAL SANS-SERIF BOLD SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D62F, // (𝘯) MATHEMATICAL SANS-SERIF ITALIC SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D663, // (𝙣) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL N [Zyyy]=>[ALL]
		//IDNA:0x1D697, // (𝚗) MATHEMATICAL MONOSPACE SMALL N [Zyyy]=>[ALL]
		0x578, // (ո) ARMENIAN SMALL LETTER VO [Armn]=>[Armn]
		0x57C, // (ռ) ARMENIAN SMALL LETTER RA [Armn]=>[Armn]
		// 20221202: merge case
		// "N" <Same>
		//'4E', // LATIN CAPITAL LETTER N [Latn]=>[Latn]
		//IDNA:0x4E, // (N) LATIN CAPITAL LETTER N [Latn]=>[Latn]
		//IDNA:0xFF2E, // (Ｎ) FULLWIDTH LATIN CAPITAL LETTER N [Latn]=>[Latn]
		//IDNA:0x2115, // (ℕ) DOUBLE-STRUCK CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D40D, // (𝐍) MATHEMATICAL BOLD CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D441, // (𝑁) MATHEMATICAL ITALIC CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D475, // (𝑵) MATHEMATICAL BOLD ITALIC CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D4A9, // (𝒩) MATHEMATICAL SCRIPT CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D4DD, // (𝓝) MATHEMATICAL BOLD SCRIPT CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D511, // (𝔑) MATHEMATICAL FRAKTUR CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D579, // (𝕹) MATHEMATICAL BOLD FRAKTUR CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D5AD, // (𝖭) MATHEMATICAL SANS-SERIF CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D5E1, // (𝗡) MATHEMATICAL SANS-SERIF BOLD CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D615, // (𝘕) MATHEMATICAL SANS-SERIF ITALIC CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D649, // (𝙉) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x1D67D, // (𝙽) MATHEMATICAL MONOSPACE CAPITAL N [Zyyy]=>[ALL]
		//IDNA:0x39D, // (Ν) GREEK CAPITAL LETTER NU [Grek]=>[Grek]
		//IDNA:0x1D6B4, // (𝚴) MATHEMATICAL BOLD CAPITAL NU [Zyyy]=>[ALL]
		//IDNA:0x1D6EE, // (𝛮) MATHEMATICAL ITALIC CAPITAL NU [Zyyy]=>[ALL]
		//IDNA:0x1D728, // (𝜨) MATHEMATICAL BOLD ITALIC CAPITAL NU [Zyyy]=>[ALL]
		//IDNA:0x1D762, // (𝝢) MATHEMATICAL SANS-SERIF BOLD CAPITAL NU [Zyyy]=>[ALL]
		//IDNA:0x1D79C, // (𝞜) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL NU [Zyyy]=>[ALL]
		//IDNA:0x2C9A, // (Ⲛ) COPTIC CAPITAL LETTER NI [Copt]=>[Copt]
		0xA4E0, // (ꓠ) LISU LETTER NA [Lisu]=>[Lisu]
		0x10513, // (𐔓) ELBASAN LETTER NE [Elba]=>[Elba]
	],
	[
		// "N̊" <Same>
		'4E 30A', // LATIN CAPITAL LETTER N + COMBINING RING ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1018E, // (𐆎) NOMISMA SIGN [Grek]=>[Grek]
	],
	[
		// "n̨" <Same>
		'6E 328', // LATIN SMALL LETTER N + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//DISALLOW:0x273, // (ɳ) LATIN SMALL LETTER N WITH RETROFLEX HOOK [Latn]=>[Latn]
	],
	[
		// "n̩" <Same>
		'6E 329', // LATIN SMALL LETTER N + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		//DISALLOW:0x19E, // (ƞ) LATIN SMALL LETTER N WITH LONG RIGHT LEG [Latn]=>[Latn]
		0x3B7, // (η) GREEK SMALL LETTER ETA [Grek]=>[Grek]
		//IDNA:0x1D6C8, // (𝛈) MATHEMATICAL BOLD SMALL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D702, // (𝜂) MATHEMATICAL ITALIC SMALL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D73C, // (𝜼) MATHEMATICAL BOLD ITALIC SMALL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D776, // (𝝶) MATHEMATICAL SANS-SERIF BOLD SMALL ETA [Zyyy]=>[ALL]
		//IDNA:0x1D7B0, // (𝞰) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL ETA [Zyyy]=>[ALL]
	],
	[
		// "N̦" <Same>
		'4E 326', // LATIN CAPITAL LETTER N + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x19D, // (Ɲ) LATIN CAPITAL LETTER N WITH LEFT HOOK [Latn]=>[Latn]
	],
	[
		// "n̴" <Same>
		'6E 334', // LATIN SMALL LETTER N + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D70, // (ᵰ) LATIN SMALL LETTER N WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "nj" <Same>
		'6E 6A', // LATIN SMALL LETTER N + LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0x1CC, // (ǌ) LATIN SMALL LETTER NJ [Latn]=>[Latn]
	],
	[
		// "Nj" <Same>
		'4E 6A', // LATIN CAPITAL LETTER N + LATIN SMALL LETTER J [Latn]=>[Latn]
		//IDNA:0x1CB, // (ǋ) LATIN CAPITAL LETTER N WITH SMALL LETTER J [Latn]=>[Latn]
	],
	[
		// "NJ" <Same>
		'4E 4A', // LATIN CAPITAL LETTER N + LATIN CAPITAL LETTER J [Latn]=>[Latn]
		//IDNA:0x1CA, // (Ǌ) LATIN CAPITAL LETTER NJ [Latn]=>[Latn]
	],
	[
		// "No" <Same>
		'4E 6F', // LATIN CAPITAL LETTER N + LATIN SMALL LETTER O [Latn]=>[Latn]
		//IDNA:0x2116, // (№) NUMERO SIGN [Zyyy]=>[ALL]
	],
	[
		// "ᴎ" <Same>
		'1D0E', // LATIN LETTER SMALL CAPITAL REVERSED N [Latn]=>[Latn]
		//DISALLOW:0x1D0E, // (ᴎ) LATIN LETTER SMALL CAPITAL REVERSED N [Latn]=>[Latn]
		//DISALLOW:0x377, // (ͷ) GREEK SMALL LETTER PAMPHYLIAN DIGAMMA [Grek]=>[Grek]
		0x438, // (и) CYRILLIC SMALL LETTER I [Cyrl]=>[Cyrl]
		0x1044D, // (𐑍) DESERET SMALL LETTER ENG [Dsrt]=>[Dsrt]
	],
	[
		// "ɲ" <Same>
		'272', // LATIN SMALL LETTER N WITH LEFT HOOK [Latn]=>[Latn]
		//DISALLOW:0x272, // (ɲ) LATIN SMALL LETTER N WITH LEFT HOOK [Latn]=>[Latn]
		0x146, // (ņ) LATIN SMALL LETTER N WITH CEDILLA [Latn]=>[Latn]
	],
	[
		// "o" <Same>
		'6F', // LATIN SMALL LETTER O [Latn]=>[Latn]
		valid(0x6F), // (o) LATIN SMALL LETTER O [Latn]=>[Latn]
		0xC02, // (◌ం) TELUGU SIGN ANUSVARA [Telu]=>[Telu]
		0xC82, // (◌ಂ) KANNADA SIGN ANUSVARA [Knda]=>[Knda]
		0xD02, // (◌ം) MALAYALAM SIGN ANUSVARA [Mlym]=>[Mlym]
		0xD82, // (◌ං) SINHALA SIGN ANUSVARAYA [Sinh]=>[Sinh]
		0x966, // (०) DEVANAGARI DIGIT ZERO [Deva]=>[Deva Dogr,Kthi,Mahj] (possible? https://discuss.ens.domains/t/ens-name-normalization-2nd/14564/33)
		0xA66, // (੦) GURMUKHI DIGIT ZERO [Guru]=>[Guru,Mult]
		0xAE6, // (૦) GUJARATI DIGIT ZERO [Gujr]=>[Gujr,Khoj]
		0xBE6, // (௦) TAMIL DIGIT ZERO [Taml]=>[Gran,Taml]
		0xC66, // (౦) TELUGU DIGIT ZERO [Telu]=>[Telu]
		0xCE6, // (೦) KANNADA DIGIT ZERO [Knda]=>[Knda,Nand]
		0xD66, // (൦) MALAYALAM DIGIT ZERO [Mlym]=>[Mlym]
		0xE50, // (๐) THAI DIGIT ZERO [Thai]=>[Thai]
		0xED0, // (໐) LAO DIGIT ZERO [Laoo]=>[Laoo]
		0x1040, // (၀) MYANMAR DIGIT ZERO [Mymr]=>[Cakm,Mymr,Tale]
		valid(0x665), // (٥) ARABIC-INDIC DIGIT FIVE [Arab]=>[Arab,Thaa,Yezi] (20221008: allowed by discussion)
		valid(0x6F5), // (۵) EXTENDED ARABIC-INDIC DIGIT FIVE [Arab]=>[Arab]
		//IDNA:0xFF4F, // (ｏ) FULLWIDTH LATIN SMALL LETTER O [Latn]=>[Latn]
		//IDNA:0x2134, // (ℴ) SCRIPT SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D428, // (𝐨) MATHEMATICAL BOLD SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D45C, // (𝑜) MATHEMATICAL ITALIC SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D490, // (𝒐) MATHEMATICAL BOLD ITALIC SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D4F8, // (𝓸) MATHEMATICAL BOLD SCRIPT SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D52C, // (𝔬) MATHEMATICAL FRAKTUR SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D560, // (𝕠) MATHEMATICAL DOUBLE-STRUCK SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D594, // (𝖔) MATHEMATICAL BOLD FRAKTUR SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D5C8, // (𝗈) MATHEMATICAL SANS-SERIF SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D5FC, // (𝗼) MATHEMATICAL SANS-SERIF BOLD SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D630, // (𝘰) MATHEMATICAL SANS-SERIF ITALIC SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D664, // (𝙤) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL O [Zyyy]=>[ALL]
		//IDNA:0x1D698, // (𝚘) MATHEMATICAL MONOSPACE SMALL O [Zyyy]=>[ALL]
		//DISALLOW:0x1D0F, // (ᴏ) LATIN LETTER SMALL CAPITAL O [Latn]=>[Latn]
		//DISALLOW:0x1D11, // (ᴑ) LATIN SMALL LETTER SIDEWAYS O [Latn]=>[Latn]
		//DISALLOW:0xAB3D, // (ꬽ) LATIN SMALL LETTER BLACKLETTER O [Latn]=>[Latn]
		allow(0x3BF), // (ο) GREEK SMALL LETTER OMICRON [Grek]=>[Grek]
		//IDNA:0x1D6D0, // (𝛐) MATHEMATICAL BOLD SMALL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D70A, // (𝜊) MATHEMATICAL ITALIC SMALL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D744, // (𝝄) MATHEMATICAL BOLD ITALIC SMALL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D77E, // (𝝾) MATHEMATICAL SANS-SERIF BOLD SMALL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D7B8, // (𝞸) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL OMICRON [Zyyy]=>[ALL]
		allow(0x3C3), // (σ) GREEK SMALL LETTER SIGMA [Grek]=>[Grek]
		//IDNA:0x1D6D4, // (𝛔) MATHEMATICAL BOLD SMALL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D70E, // (𝜎) MATHEMATICAL ITALIC SMALL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D748, // (𝝈) MATHEMATICAL BOLD ITALIC SMALL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D782, // (𝞂) MATHEMATICAL SANS-SERIF BOLD SMALL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D7BC, // (𝞼) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL SIGMA [Zyyy]=>[ALL]
		0x2C9F, // (ⲟ) COPTIC SMALL LETTER O [Copt]=>[Copt]
		0x43E, // (о) CYRILLIC SMALL LETTER O [Cyrl]=>[Cyrl]
		0x10FF, // (ჿ) GEORGIAN LETTER LABIAL SIGN [Geor]=>[Geor]
		0x585, // (օ) ARMENIAN SMALL LETTER OH [Armn]=>[Armn]
		0x5E1, // (ס) HEBREW LETTER SAMEKH [Hebr]=>[Hebr]
		allow(0x647), // (ه) ARABIC LETTER HEH [Arab]=>[Arab]
		//IDNA:0x1EE24, // (𞸤) ARABIC MATHEMATICAL INITIAL HEH [Arab]=>[Arab]
		//IDNA:0x1EE64, // (𞹤) ARABIC MATHEMATICAL STRETCHED HEH [Arab]=>[Arab]
		//IDNA:0x1EE84, // (𞺄) ARABIC MATHEMATICAL LOOPED HEH [Arab]=>[Arab]
		//IDNA:0xFEEB, // (ﻫ) ARABIC LETTER HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEEC, // (ﻬ) ARABIC LETTER HEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEEA, // (ﻪ) ARABIC LETTER HEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE9, // (ﻩ) ARABIC LETTER HEH ISOLATED FORM [Arab]=>[Arab]
		0x6BE, // (ھ) ARABIC LETTER HEH DOACHASHMEE [Arab]=>[Arab] // 20221215: 8 regs, has ligature form, but ە.x == ہ.x 
		//IDNA:0xFBAC, // (ﮬ) ARABIC LETTER HEH DOACHASHMEE INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBAD, // (ﮭ) ARABIC LETTER HEH DOACHASHMEE MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBAB, // (ﮫ) ARABIC LETTER HEH DOACHASHMEE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBAA, // (ﮪ) ARABIC LETTER HEH DOACHASHMEE ISOLATED FORM [Arab]=>[Arab]
		0x6C1, // (ہ) ARABIC LETTER HEH GOAL [Arab]=>[Arab]
		//IDNA:0xFBA8, // (ﮨ) ARABIC LETTER HEH GOAL INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA9, // (ﮩ) ARABIC LETTER HEH GOAL MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA7, // (ﮧ) ARABIC LETTER HEH GOAL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA6, // (ﮦ) ARABIC LETTER HEH GOAL ISOLATED FORM [Arab]=>[Arab]
		0x6D5, // (ە) ARABIC LETTER AE [Arab]=>[Arab]
		0xD20, // (ഠ) MALAYALAM LETTER TTHA [Mlym]=>[Mlym]
		0x101D, // (ဝ) MYANMAR LETTER WA [Mymr]=>[Mymr]
		0x104EA, // (𐓪) OSAGE SMALL LETTER O [Osge]=>[Osge]
		0x118C8, // (𑣈) WARANG CITI SMALL LETTER E [Wara]=>[Wara]
		0x118D7, // (𑣗) WARANG CITI SMALL LETTER BU [Wara]=>[Wara]
		0x1042C, // (𐐬) DESERET SMALL LETTER LONG O [Dsrt]=>[Dsrt]
		// 2022115: moved from '199E'
		0x199E, // (ᦞ) NEW TAI LUE LETTER LOW VA [Talu]=>[Talu]
		0x19D0, // (᧐) NEW TAI LUE DIGIT ZERO [Talu]=>[Talu]
		// 20221202: merge case
		// "O" <Same>
		//'4F', // LATIN CAPITAL LETTER O [Latn]=>[Latn]
		//IDNA:0x4F, // (O) LATIN CAPITAL LETTER O [Latn]=>[Latn]
		// valid(0x30), // (0) DIGIT ZERO [Zyyy]=>[ALL] (20221203: this links too many confusables together)
		0x7C0, // (߀) NKO DIGIT ZERO [Nkoo]=>[Nkoo]
		0x9E6, // (০) BENGALI DIGIT ZERO [Beng]=>[Beng,Cakm,Sylo]
		0xB66, // (୦) ORIYA DIGIT ZERO [Orya]=>[Orya]
		valid(0x3007), // (〇) IDEOGRAPHIC NUMBER ZERO [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x114D0, // (𑓐) TIRHUTA DIGIT ZERO [Tirh]=>[Tirh]
		0x118E0, // (𑣠) WARANG CITI DIGIT ZERO [Wara]=>[Wara]
		//IDNA:0x1D7CE, // (𝟎) MATHEMATICAL BOLD DIGIT ZERO [Zyyy]=>[ALL]
		//IDNA:0x1D7D8, // (𝟘) MATHEMATICAL DOUBLE-STRUCK DIGIT ZERO [Zyyy]=>[ALL]
		//IDNA:0x1D7E2, // (𝟢) MATHEMATICAL SANS-SERIF DIGIT ZERO [Zyyy]=>[ALL]
		//IDNA:0x1D7EC, // (𝟬) MATHEMATICAL SANS-SERIF BOLD DIGIT ZERO [Zyyy]=>[ALL]
		//IDNA:0x1D7F6, // (𝟶) MATHEMATICAL MONOSPACE DIGIT ZERO [Zyyy]=>[ALL]
		//IDNA:0x1FBF0, // (🯰) SEGMENTED DIGIT ZERO [Zyyy]=>[ALL]
		//IDNA:0xFF2F, // (Ｏ) FULLWIDTH LATIN CAPITAL LETTER O [Latn]=>[Latn]
		//IDNA:0x1D40E, // (𝐎) MATHEMATICAL BOLD CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D442, // (𝑂) MATHEMATICAL ITALIC CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D476, // (𝑶) MATHEMATICAL BOLD ITALIC CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D4AA, // (𝒪) MATHEMATICAL SCRIPT CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D4DE, // (𝓞) MATHEMATICAL BOLD SCRIPT CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D512, // (𝔒) MATHEMATICAL FRAKTUR CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D546, // (𝕆) MATHEMATICAL DOUBLE-STRUCK CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D57A, // (𝕺) MATHEMATICAL BOLD FRAKTUR CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D5AE, // (𝖮) MATHEMATICAL SANS-SERIF CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D5E2, // (𝗢) MATHEMATICAL SANS-SERIF BOLD CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D616, // (𝘖) MATHEMATICAL SANS-SERIF ITALIC CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D64A, // (𝙊) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x1D67E, // (𝙾) MATHEMATICAL MONOSPACE CAPITAL O [Zyyy]=>[ALL]
		//IDNA:0x39F, // (Ο) GREEK CAPITAL LETTER OMICRON [Grek]=>[Grek]
		//IDNA:0x1D6B6, // (𝚶) MATHEMATICAL BOLD CAPITAL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D6F0, // (𝛰) MATHEMATICAL ITALIC CAPITAL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D72A, // (𝜪) MATHEMATICAL BOLD ITALIC CAPITAL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D764, // (𝝤) MATHEMATICAL SANS-SERIF BOLD CAPITAL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x1D79E, // (𝞞) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL OMICRON [Zyyy]=>[ALL]
		//IDNA:0x2C9E, // (Ⲟ) COPTIC CAPITAL LETTER O [Copt]=>[Copt]
		//IDNA:0x41E, // (О) CYRILLIC CAPITAL LETTER O [Cyrl]=>[Cyrl]
		//IDNA:0x555, // (Օ) ARMENIAN CAPITAL LETTER OH [Armn]=>[Armn]
		0x2D54, // (ⵔ) TIFINAGH LETTER YAR [Tfng]=>[Tfng]
		0x12D0, // (ዐ) ETHIOPIC SYLLABLE PHARYNGEAL A [Ethi]=>[Ethi]
		0xB20, // (ଠ) ORIYA LETTER TTHA [Orya]=>[Orya]
		//IDNA:0x104C2, // (𐓂) OSAGE CAPITAL LETTER O [Osge]=>[Osge]
		0xA4F3, // (ꓳ) LISU LETTER O [Lisu]=>[Lisu]
		//IDNA:0x118B5, // (𑢵) WARANG CITI CAPITAL LETTER AT [Wara]=>[Wara]
		0x10292, // (𐊒) LYCIAN LETTER U [Lyci]=>[Lyci]
		0x102AB, // (𐊫) CARIAN LETTER O [Cari]=>[Cari]
		//IDNA:0x10404, // (𐐄) DESERET CAPITAL LETTER LONG O [Dsrt]=>[Dsrt]
		0x10516, // (𐔖) ELBASAN LETTER O [Elba]=>[Elba]
		0x1030F, // (𐌏) OLD ITALIC LETTER O [Ital]=>[Ital] (20221210: added)
	],
	[
		// "º" <Same>
		'BA', // MASCULINE ORDINAL INDICATOR [Latn]=>[Latn]
		//IDNA:0xBA, // (º) MASCULINE ORDINAL INDICATOR [Latn]=>[Latn]
		//IDNA:0x2070, // (⁰) SUPERSCRIPT ZERO [Zyyy]=>[ALL]
		//IDNA:0x1D52, // (ᵒ) MODIFIER LETTER SMALL O [Latn]=>[Latn]
	],
	[
		// "ŏ" <NFC(true) NFD(false)>
		'14F', // LATIN SMALL LETTER O WITH BREVE [Latn]=>[Latn]
		0x14F, // (ŏ) LATIN SMALL LETTER O WITH BREVE [Latn]=>[Latn]
		0x1D2, // (ǒ) LATIN SMALL LETTER O WITH CARON [Latn]=>[Latn]
	],
	[
		// "Ŏ" <NFC(true) NFD(false)>
		'14E', // LATIN CAPITAL LETTER O WITH BREVE [Latn]=>[Latn]
		//IDNA:0x14E, // (Ŏ) LATIN CAPITAL LETTER O WITH BREVE [Latn]=>[Latn]
		//IDNA:0x1D1, // (Ǒ) LATIN CAPITAL LETTER O WITH CARON [Latn]=>[Latn]
	],
	[
		// "ô" <NFC(false) NFD(true)>
		'6F 302', // LATIN SMALL LETTER O + COMBINING CIRCUMFLEX ACCENT [Latn,Zinh]=>[Latn]
		//DISALLOW:0x6FF, // (ۿ) ARABIC LETTER HEH WITH INVERTED V [Arab]=>[Arab]
	],
	[
		// "Ö" <NFC(true) NFD(false)>
		'D6', // LATIN CAPITAL LETTER O WITH DIAERESIS [Latn]=>[Latn]
		//IDNA:0xD6, // (Ö) LATIN CAPITAL LETTER O WITH DIAERESIS [Latn]=>[Latn]
		//IDNA:0x150, // (Ő) LATIN CAPITAL LETTER O WITH DOUBLE ACUTE [Latn]=>[Latn]
	],
	[
		// "o̸" <Same>
		'6F 338', // LATIN SMALL LETTER O + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		0xF8, // (ø) LATIN SMALL LETTER O WITH STROKE [Latn]=>[Latn]
		//DISALLOW:0xAB3E, // (ꬾ) LATIN SMALL LETTER BLACKLETTER O WITH STROKE [Latn]=>[Latn]
	],
	[
		// "O̸" <Same>
		'4F 338', // LATIN CAPITAL LETTER O + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0xD8, // (Ø) LATIN CAPITAL LETTER O WITH STROKE [Latn]=>[Latn]
		0x2D41, // (ⵁ) TIFINAGH LETTER BERBER ACADEMY YAH [Tfng]=>[Tfng]
	],
	[
		// "Ó̸" <NFC(false) NFD(true)>
		'4F 338 301', // LATIN CAPITAL LETTER O + COMBINING LONG SOLIDUS OVERLAY + COMBINING ACUTE ACCENT [Latn,Zinh]=>[Latn]
		//IDNA:0x1FE, // (Ǿ) LATIN CAPITAL LETTER O WITH STROKE AND ACUTE [Latn]=>[Latn]
	],
	[
		// "o̵" <Same>
		'6F 335', // LATIN SMALL LETTER O + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x275, // (ɵ) LATIN SMALL LETTER BARRED O [Latn]=>[Latn]
		//DISALLOW:0xA74B, // (ꝋ) LATIN SMALL LETTER O WITH LONG STROKE OVERLAY [Latn]=>[Latn]
		0x4E9, // (ө) CYRILLIC SMALL LETTER BARRED O [Cyrl]=>[Cyrl]
		//DISALLOW:0x473, // (ѳ) CYRILLIC SMALL LETTER FITA [Cyrl]=>[Cyrl]
		//IDNA:0xAB8E, // (ꮎ) CHEROKEE SMALL LETTER NA [Cher]=>[Cher]
		//IDNA:0xABBB, // (ꮻ) CHEROKEE SMALL LETTER WI [Cher]=>[Cher]
	],
	[
		// "O̵" <Same>
		'4F 335', // LATIN CAPITAL LETTER O + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2296, // (⊖) CIRCLED MINUS [Zyyy]=>[ALL]
		//DISALLOW:0x229D, // (⊝) CIRCLED DASH [Zyyy]=>[ALL]
		//DISALLOW:0x236C, // (⍬) APL FUNCTIONAL SYMBOL ZILDE [Zyyy]=>[ALL]
		//DISALLOW:0x1D21A, // (𝈚) GREEK VOCAL NOTATION SYMBOL-52 [Grek]=>[Grek]
		//DISALLOW:0x1F714, // (🜔) ALCHEMICAL SYMBOL FOR SALT [Zyyy]=>[ALL]
		//IDNA:0x19F, // (Ɵ) LATIN CAPITAL LETTER O WITH MIDDLE TILDE [Latn]=>[Latn]
		//IDNA:0xA74A, // (Ꝋ) LATIN CAPITAL LETTER O WITH LONG STROKE OVERLAY [Latn]=>[Latn]
		0x3B8, // (θ) GREEK SMALL LETTER THETA [Grek]=>[Grek]
		//IDNA:0x3D1, // (ϑ) GREEK THETA SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6C9, // (𝛉) MATHEMATICAL BOLD SMALL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D6DD, // (𝛝) MATHEMATICAL BOLD THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D703, // (𝜃) MATHEMATICAL ITALIC SMALL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D717, // (𝜗) MATHEMATICAL ITALIC THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D73D, // (𝜽) MATHEMATICAL BOLD ITALIC SMALL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D751, // (𝝑) MATHEMATICAL BOLD ITALIC THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D777, // (𝝷) MATHEMATICAL SANS-SERIF BOLD SMALL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D78B, // (𝞋) MATHEMATICAL SANS-SERIF BOLD THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D7B1, // (𝞱) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D7C5, // (𝟅) MATHEMATICAL SANS-SERIF BOLD ITALIC THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x398, // (Θ) GREEK CAPITAL LETTER THETA [Grek]=>[Grek]
		//IDNA:0x3F4, // (ϴ) GREEK CAPITAL THETA SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6AF, // (𝚯) MATHEMATICAL BOLD CAPITAL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D6B9, // (𝚹) MATHEMATICAL BOLD CAPITAL THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D6E9, // (𝛩) MATHEMATICAL ITALIC CAPITAL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D6F3, // (𝛳) MATHEMATICAL ITALIC CAPITAL THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D723, // (𝜣) MATHEMATICAL BOLD ITALIC CAPITAL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D72D, // (𝜭) MATHEMATICAL BOLD ITALIC CAPITAL THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D75D, // (𝝝) MATHEMATICAL SANS-SERIF BOLD CAPITAL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D767, // (𝝧) MATHEMATICAL SANS-SERIF BOLD CAPITAL THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D797, // (𝞗) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL THETA [Zyyy]=>[ALL]
		//IDNA:0x1D7A1, // (𝞡) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL THETA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x4E8, // (Ө) CYRILLIC CAPITAL LETTER BARRED O [Cyrl]=>[Cyrl]
		//IDNA:0x472, // (Ѳ) CYRILLIC CAPITAL LETTER FITA [Cyrl]=>[Cyrl]
		0x2D31, // (ⴱ) TIFINAGH LETTER YAB [Tfng]=>[Tfng]
		0x13BE, // (Ꮎ) CHEROKEE LETTER NA [Cher]=>[Cher]
		0x13EB, // (Ꮻ) CHEROKEE LETTER WI [Cher]=>[Cher]
	],
	[
		// "ơ" <NFC(false) NFD(true)>
		'6F 31B', // LATIN SMALL LETTER O + COMBINING HORN [Latn,Zinh]=>[Latn]
		//IDNA:0xAB74, // (ꭴ) CHEROKEE SMALL LETTER U [Cher]=>[Cher]
	],
	[
		// "oٰ" <Same>
		'6F 670', // LATIN SMALL LETTER O + ARABIC LETTER SUPERSCRIPT ALEF [Latn,Zinh]=>[]
		//IDNA:0xFCD9, // (ﳙ) ARABIC LIGATURE HEH WITH SUPERSCRIPT ALEF INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "O," <Same>
		'4F 2C', // LATIN CAPITAL LETTER O + COMMA [Latn,Zyyy]=>[Latn]
		//IDNA:0x1F101, // (🄁) DIGIT ZERO COMMA [Zyyy]=>[ALL]
	],
	[
		// "O." <Same>
		'4F 2E', // LATIN CAPITAL LETTER O + FULL STOP [Latn,Zyyy]=>[Latn]
		//IDNA:0x1F100, // (🄀) DIGIT ZERO FULL STOP [Zyyy]=>[ALL]
	],
	[
		// "o'" <Same>
		'6F 27', // LATIN SMALL LETTER O + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x1A1, // (ơ) LATIN SMALL LETTER O WITH HORN [Latn]=>[Latn]
	],
	[
		// "O'" <Same>
		'4F 27', // LATIN CAPITAL LETTER O + APOSTROPHE [Latn,Zyyy]=>[Latn]
		//IDNA:0x1A0, // (Ơ) LATIN CAPITAL LETTER O WITH HORN [Latn]=>[Latn]
		0x13A4, // (Ꭴ) CHEROKEE LETTER U [Cher]=>[Cher]
	],
	[
		// "º/₀" <Same>
		'BA 2F 2080', // MASCULINE ORDINAL INDICATOR + SOLIDUS + SUBSCRIPT ZERO [Latn,Zyyy]=>[Latn]
		//IDNA:0x25, // (%) PERCENT SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x66A, // (٪) ARABIC PERCENT SIGN [Arab]=>[Arab]
		//DISALLOW:0x2052, // (⁒) COMMERCIAL MINUS SIGN [Zyyy]=>[ALL]
	],
	[
		// "º/₀₀" <Same>
		'BA 2F 2080 2080', // MASCULINE ORDINAL INDICATOR + SOLIDUS + SUBSCRIPT ZERO + SUBSCRIPT ZERO [Latn,Zyyy]=>[Latn]
		//DISALLOW:0x2030, // (‰) PER MILLE SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x609, // (؉) ARABIC-INDIC PER MILLE SIGN [Arab]=>[Arab]
	],
	[
		// "º/₀₀₀" <Same>
		'BA 2F 2080 2080 2080', // MASCULINE ORDINAL INDICATOR + SOLIDUS + SUBSCRIPT ZERO + SUBSCRIPT ZERO + SUBSCRIPT ZERO [Latn,Zyyy]=>[Latn]
		//DISALLOW:0x2031, // (‱) PER TEN THOUSAND SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x60A, // (؊) ARABIC-INDIC PER TEN THOUSAND SIGN [Arab]=>[Arab]
	],
	[
		// "oe" <Same>
		'6F 65', // LATIN SMALL LETTER O + LATIN SMALL LETTER E [Latn]=>[Latn]
		//DISALLOW:0x153, // (œ) LATIN SMALL LIGATURE OE [Latn]=>[Latn]
	],
	[
		// "OE" <Same>
		'4F 45', // LATIN CAPITAL LETTER O + LATIN CAPITAL LETTER E [Latn]=>[Latn]
		//IDNA:0x152, // (Œ) LATIN CAPITAL LIGATURE OE [Latn]=>[Latn]
	],
	[
		// "oᴇ" <Same>
		'6F 1D07', // LATIN SMALL LETTER O + LATIN LETTER SMALL CAPITAL E [Latn]=>[Latn]
		//DISALLOW:0x276, // (ɶ) LATIN LETTER SMALL CAPITAL OE [Latn]=>[Latn]
	],
	[
		// "oo" <Same>
		'6F 6F', // LATIN SMALL LETTER O + LATIN SMALL LETTER O [Latn]=>[Latn]
		0x221E, // (∞) INFINITY [Zyyy]=>[ALL]
		//DISALLOW:0xA74F, // (ꝏ) LATIN SMALL LETTER OO [Latn]=>[Latn]
		//DISALLOW:0xA699, // (ꚙ) CYRILLIC SMALL LETTER DOUBLE O [Cyrl]=>[Cyrl]
	],
	[
		// "OO" <Same>
		'4F 4F', // LATIN CAPITAL LETTER O + LATIN CAPITAL LETTER O [Latn]=>[Latn]
		//IDNA:0xA74E, // (Ꝏ) LATIN CAPITAL LETTER OO [Latn]=>[Latn]
		//IDNA:0xA698, // (Ꚙ) CYRILLIC CAPITAL LETTER DOUBLE O [Cyrl]=>[Cyrl]
	],
	[
		// "oج" <Same>
		'6F 62C', // LATIN SMALL LETTER O + ARABIC LETTER JEEM [Latn,Arab]=>[]
		//IDNA:0xFCD7, // (ﳗ) ARABIC LIGATURE HEH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC51, // (ﱑ) ARABIC LIGATURE HEH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "oم" <Same>
		'6F 645', // LATIN SMALL LETTER O + ARABIC LETTER MEEM [Latn,Arab]=>[]
		//IDNA:0xFCD8, // (ﳘ) ARABIC LIGATURE HEH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC52, // (ﱒ) ARABIC LIGATURE HEH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "oمج" <Same>
		'6F 645 62C', // LATIN SMALL LETTER O + ARABIC LETTER MEEM + ARABIC LETTER JEEM [Latn,Arab]=>[]
		//IDNA:0xFD93, // (ﶓ) ARABIC LIGATURE HEH WITH MEEM WITH JEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "oمم" <Same>
		'6F 645 645', // LATIN SMALL LETTER O + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Latn,Arab]=>[]
		//IDNA:0xFD94, // (ﶔ) ARABIC LIGATURE HEH WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "oى" <Same>
		'6F 649', // LATIN SMALL LETTER O + ARABIC LETTER ALEF MAKSURA [Latn,Arab]=>[]
		//IDNA:0xFC53, // (ﱓ) ARABIC LIGATURE HEH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC54, // (ﱔ) ARABIC LIGATURE HEH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "oരo" <Same>
		'6F D30 6F', // LATIN SMALL LETTER O + MALAYALAM LETTER RA + LATIN SMALL LETTER O [Latn,Mlym]=>[]
		//DISALLOW:0xD5F, // (ൟ) MALAYALAM LETTER ARCHAIC II [Mlym]=>[Mlym]
	],
	[
		// "oာ" <Same>
		'6F 102C', // LATIN SMALL LETTER O + MYANMAR VOWEL SIGN AA [Latn,Mymr]=>[]
		0x1010, // (တ) MYANMAR LETTER TA [Mymr]=>[Mymr]
	],
	[
		// "O点" <Same>
		'4F 70B9', // LATIN CAPITAL LETTER O + CJK Ideograph-70B9 <8890/20992> [Latn,Hani]=>[]
		//IDNA:0x3358, // (㍘) IDEOGRAPHIC TELEGRAPH SYMBOL FOR HOUR ZERO [Zyyy]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "ɔ" <Same>
		'254', // LATIN SMALL LETTER OPEN O [Latn]=>[Latn]
		//DISALLOW:0x254, // (ɔ) LATIN SMALL LETTER OPEN O [Latn]=>[Latn]
		//DISALLOW:0x2184, // (ↄ) LATIN SMALL LETTER REVERSED C [Latn]=>[Latn]
		//DISALLOW:0x1D10, // (ᴐ) LATIN LETTER SMALL CAPITAL OPEN O [Latn]=>[Latn]
		//DISALLOW:0x37B, // (ͻ) GREEK SMALL REVERSED LUNATE SIGMA SYMBOL [Grek]=>[Grek]
		0x1044B, // (𐑋) DESERET SMALL LETTER EM [Dsrt]=>[Dsrt]
		// 20221115: moved from '19B1'
		0x19B1, // (ᦱ) NEW TAI LUE VOWEL SIGN AA [Talu]=>[Talu]
		0x19D1, // (᧑) NEW TAI LUE DIGIT ONE [Talu]=>[Talu]
	],
	[
		// "Ɔ" <Same>
		'186', // LATIN CAPITAL LETTER OPEN O [Latn]=>[Latn]
		//IDNA:0x186, // (Ɔ) LATIN CAPITAL LETTER OPEN O [Latn]=>[Latn]
		//IDNA:0x2183, // (Ↄ) ROMAN NUMERAL REVERSED ONE HUNDRED [Latn]=>[Latn]
		//IDNA:0x3FD, // (Ͻ) GREEK CAPITAL REVERSED LUNATE SIGMA SYMBOL [Grek]=>[Grek]
		0xA4DB, // (ꓛ) LISU LETTER CHA [Lisu]=>[Lisu]
		//IDNA:0x10423, // (𐐣) DESERET CAPITAL LETTER EM [Dsrt]=>[Dsrt]
	],
	[
		// "ɔ̸" <Same>
		'254 338', // LATIN SMALL LETTER OPEN O + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0xAB3F, // (ꬿ) LATIN SMALL LETTER OPEN O WITH STROKE [Latn]=>[Latn]
	],
	[
		// "ɔe" <Same>
		'254 65', // LATIN SMALL LETTER OPEN O + LATIN SMALL LETTER E [Latn]=>[Latn]
		//DISALLOW:0xAB62, // (ꭢ) LATIN SMALL LETTER OPEN OE [Latn]=>[Latn]
	],
	[
		// "ɷ" <Same>
		'277', // LATIN SMALL LETTER CLOSED OMEGA [Latn]=>[Latn]
		//DISALLOW:0x277, // (ɷ) LATIN SMALL LETTER CLOSED OMEGA [Latn]=>[Latn]
		0x1043F, // (𐐿) DESERET SMALL LETTER KAY [Dsrt]=>[Dsrt]
	],
	[
		// "p" <Same>
		'70', // LATIN SMALL LETTER P [Latn]=>[Latn]
		valid(0x70), // (p) LATIN SMALL LETTER P [Latn]=>[Latn]
		//DISALLOW:0x2374, // (⍴) APL FUNCTIONAL SYMBOL RHO [Zyyy]=>[ALL]
		//IDNA:0xFF50, // (ｐ) FULLWIDTH LATIN SMALL LETTER P [Latn]=>[Latn]
		//IDNA:0x1D429, // (𝐩) MATHEMATICAL BOLD SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D45D, // (𝑝) MATHEMATICAL ITALIC SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D491, // (𝒑) MATHEMATICAL BOLD ITALIC SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D4C5, // (𝓅) MATHEMATICAL SCRIPT SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D4F9, // (𝓹) MATHEMATICAL BOLD SCRIPT SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D52D, // (𝔭) MATHEMATICAL FRAKTUR SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D561, // (𝕡) MATHEMATICAL DOUBLE-STRUCK SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D595, // (𝖕) MATHEMATICAL BOLD FRAKTUR SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D5C9, // (𝗉) MATHEMATICAL SANS-SERIF SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D5FD, // (𝗽) MATHEMATICAL SANS-SERIF BOLD SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D631, // (𝘱) MATHEMATICAL SANS-SERIF ITALIC SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D665, // (𝙥) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL P [Zyyy]=>[ALL]
		//IDNA:0x1D699, // (𝚙) MATHEMATICAL MONOSPACE SMALL P [Zyyy]=>[ALL]
		0x3C1, // (ρ) GREEK SMALL LETTER RHO [Grek]=>[Grek]
		//IDNA:0x3F1, // (ϱ) GREEK RHO SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6D2, // (𝛒) MATHEMATICAL BOLD SMALL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D6E0, // (𝛠) MATHEMATICAL BOLD RHO SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D70C, // (𝜌) MATHEMATICAL ITALIC SMALL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D71A, // (𝜚) MATHEMATICAL ITALIC RHO SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D746, // (𝝆) MATHEMATICAL BOLD ITALIC SMALL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D754, // (𝝔) MATHEMATICAL BOLD ITALIC RHO SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D780, // (𝞀) MATHEMATICAL SANS-SERIF BOLD SMALL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D78E, // (𝞎) MATHEMATICAL SANS-SERIF BOLD RHO SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D7BA, // (𝞺) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D7C8, // (𝟈) MATHEMATICAL SANS-SERIF BOLD ITALIC RHO SYMBOL [Zyyy]=>[ALL]
		0x2CA3, // (ⲣ) COPTIC SMALL LETTER RO [Copt]=>[Copt]
		0x440, // (р) CYRILLIC SMALL LETTER ER [Cyrl]=>[Cyrl]
		// 20221202: merge case
		// "P" <Same>
		//'50', // LATIN CAPITAL LETTER P [Latn]=>[Latn]
		//IDNA:0x50, // (P) LATIN CAPITAL LETTER P [Latn]=>[Latn]
		//IDNA:0xFF30, // (Ｐ) FULLWIDTH LATIN CAPITAL LETTER P [Latn]=>[Latn]
		//IDNA:0x2119, // (ℙ) DOUBLE-STRUCK CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D40F, // (𝐏) MATHEMATICAL BOLD CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D443, // (𝑃) MATHEMATICAL ITALIC CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D477, // (𝑷) MATHEMATICAL BOLD ITALIC CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D4AB, // (𝒫) MATHEMATICAL SCRIPT CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D4DF, // (𝓟) MATHEMATICAL BOLD SCRIPT CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D513, // (𝔓) MATHEMATICAL FRAKTUR CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D57B, // (𝕻) MATHEMATICAL BOLD FRAKTUR CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D5AF, // (𝖯) MATHEMATICAL SANS-SERIF CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D5E3, // (𝗣) MATHEMATICAL SANS-SERIF BOLD CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D617, // (𝘗) MATHEMATICAL SANS-SERIF ITALIC CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D64B, // (𝙋) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x1D67F, // (𝙿) MATHEMATICAL MONOSPACE CAPITAL P [Zyyy]=>[ALL]
		//IDNA:0x3A1, // (Ρ) GREEK CAPITAL LETTER RHO [Grek]=>[Grek]
		//IDNA:0x1D6B8, // (𝚸) MATHEMATICAL BOLD CAPITAL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D6F2, // (𝛲) MATHEMATICAL ITALIC CAPITAL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D72C, // (𝜬) MATHEMATICAL BOLD ITALIC CAPITAL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D766, // (𝝦) MATHEMATICAL SANS-SERIF BOLD CAPITAL RHO [Zyyy]=>[ALL]
		//IDNA:0x1D7A0, // (𝞠) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL RHO [Zyyy]=>[ALL]
		//IDNA:0x2CA2, // (Ⲣ) COPTIC CAPITAL LETTER RO [Copt]=>[Copt]
		//IDNA:0x420, // (Р) CYRILLIC CAPITAL LETTER ER [Cyrl]=>[Cyrl]
		0x13E2, // (Ꮲ) CHEROKEE LETTER TLV [Cher]=>[Cher]
		0x146D, // (ᑭ) CANADIAN SYLLABICS KI [Cans]=>[Cans]
		0xA4D1, // (ꓑ) LISU LETTER PA [Lisu]=>[Lisu]
		0x10295, // (𐊕) LYCIAN LETTER R [Lyci]=>[Lyci]
	],
	[
		// "p̔" <Same>
		'70 314', // LATIN SMALL LETTER P + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1A5, // (ƥ) LATIN SMALL LETTER P WITH HOOK [Latn]=>[Latn]
	],
	[
		// "p̵" <Same>
		'70 335', // LATIN SMALL LETTER P + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D7D, // (ᵽ) LATIN SMALL LETTER P WITH STROKE [Latn]=>[Latn]
	],
	[
		// "p·" <Same>
		'70 B7', // LATIN SMALL LETTER P + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x1477, // (ᑷ) CANADIAN SYLLABICS WEST-CREE KWI [Cans]=>[Cans]
	],
	[
		// "P'" <Same>
		'50 27', // LATIN CAPITAL LETTER P + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x1486, // (ᒆ) CANADIAN SYLLABICS SOUTH-SLAVEY KIH [Cans]=>[Cans]
	],
	[
		// "ᴘ" <Same>
		'1D18', // LATIN LETTER SMALL CAPITAL P [Latn]=>[Latn]
		//DISALLOW:0x1D18, // (ᴘ) LATIN LETTER SMALL CAPITAL P [Latn]=>[Latn]
		//DISALLOW:0x1D29, // (ᴩ) GREEK LETTER SMALL CAPITAL RHO [Grek]=>[Grek]
		//IDNA:0xABB2, // (ꮲ) CHEROKEE SMALL LETTER TLV [Cher]=>[Cher]
	],
	[
		// "ɸ" <Same>
		'278', // LATIN SMALL LETTER PHI [Latn]=>[Latn]
		//DISALLOW:0x278, // (ɸ) LATIN SMALL LETTER PHI [Latn]=>[Latn]
		0x3C6, // (φ) GREEK SMALL LETTER PHI [Grek]=>[Grek]
		//IDNA:0x3D5, // (ϕ) GREEK PHI SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6D7, // (𝛗) MATHEMATICAL BOLD SMALL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D6DF, // (𝛟) MATHEMATICAL BOLD PHI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D711, // (𝜑) MATHEMATICAL ITALIC SMALL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D719, // (𝜙) MATHEMATICAL ITALIC PHI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D74B, // (𝝋) MATHEMATICAL BOLD ITALIC SMALL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D753, // (𝝓) MATHEMATICAL BOLD ITALIC PHI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D785, // (𝞅) MATHEMATICAL SANS-SERIF BOLD SMALL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D78D, // (𝞍) MATHEMATICAL SANS-SERIF BOLD PHI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D7BF, // (𝞿) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D7C7, // (𝟇) MATHEMATICAL SANS-SERIF BOLD ITALIC PHI SYMBOL [Zyyy]=>[ALL]
		0x2CAB, // (ⲫ) COPTIC SMALL LETTER FI [Copt]=>[Copt]
		0x444, // (ф) CYRILLIC SMALL LETTER EF [Cyrl]=>[Cyrl]
	],
	[
		// "q" <Same>
		'71', // LATIN SMALL LETTER Q [Latn]=>[Latn]
		valid(0x71), // (q) LATIN SMALL LETTER Q [Latn]=>[Latn]
		//IDNA:0x1D42A, // (𝐪) MATHEMATICAL BOLD SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D45E, // (𝑞) MATHEMATICAL ITALIC SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D492, // (𝒒) MATHEMATICAL BOLD ITALIC SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D4C6, // (𝓆) MATHEMATICAL SCRIPT SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D4FA, // (𝓺) MATHEMATICAL BOLD SCRIPT SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D52E, // (𝔮) MATHEMATICAL FRAKTUR SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D562, // (𝕢) MATHEMATICAL DOUBLE-STRUCK SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D596, // (𝖖) MATHEMATICAL BOLD FRAKTUR SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D5CA, // (𝗊) MATHEMATICAL SANS-SERIF SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D5FE, // (𝗾) MATHEMATICAL SANS-SERIF BOLD SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D632, // (𝘲) MATHEMATICAL SANS-SERIF ITALIC SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D666, // (𝙦) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL Q [Zyyy]=>[ALL]
		//IDNA:0x1D69A, // (𝚚) MATHEMATICAL MONOSPACE SMALL Q [Zyyy]=>[ALL]
		0x51B, // (ԛ) CYRILLIC SMALL LETTER QA [Cyrl]=>[Cyrl]
		0x563, // (գ) ARMENIAN SMALL LETTER GIM [Armn]=>[Armn]
		0x566, // (զ) ARMENIAN SMALL LETTER ZA [Armn]=>[Armn]
		// 20221202: merge case
		// "Q" <Same>
		//'51', // LATIN CAPITAL LETTER Q [Latn]=>[Latn]
		//IDNA:0x51, // (Q) LATIN CAPITAL LETTER Q [Latn]=>[Latn]
		//IDNA:0x211A, // (ℚ) DOUBLE-STRUCK CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D410, // (𝐐) MATHEMATICAL BOLD CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D444, // (𝑄) MATHEMATICAL ITALIC CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D478, // (𝑸) MATHEMATICAL BOLD ITALIC CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D4AC, // (𝒬) MATHEMATICAL SCRIPT CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D4E0, // (𝓠) MATHEMATICAL BOLD SCRIPT CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D514, // (𝔔) MATHEMATICAL FRAKTUR CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D57C, // (𝕼) MATHEMATICAL BOLD FRAKTUR CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D5B0, // (𝖰) MATHEMATICAL SANS-SERIF CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D5E4, // (𝗤) MATHEMATICAL SANS-SERIF BOLD CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D618, // (𝘘) MATHEMATICAL SANS-SERIF ITALIC CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D64C, // (𝙌) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL Q [Zyyy]=>[ALL]
		//IDNA:0x1D680, // (𝚀) MATHEMATICAL MONOSPACE CAPITAL Q [Zyyy]=>[ALL]
		0x2D55, // (ⵕ) TIFINAGH LETTER YARR [Tfng]=>[Tfng]
	],
	[
		// "q̔" <Same>
		'71 314', // LATIN SMALL LETTER Q + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2A0, // (ʠ) LATIN SMALL LETTER Q WITH HOOK [Latn]=>[Latn]
	],
	[
		// "QE" <Same>
		'51 45', // LATIN CAPITAL LETTER Q + LATIN CAPITAL LETTER E [Latn]=>[Latn]
		//DISALLOW:0x1F700, // (🜀) ALCHEMICAL SYMBOL FOR QUINTESSENCE [Zyyy]=>[ALL]
	],
	[
		// "ɋ" <Same>
		'24B', // LATIN SMALL LETTER Q WITH HOOK TAIL [Latn]=>[Latn]
		//DISALLOW:0x24B, // (ɋ) LATIN SMALL LETTER Q WITH HOOK TAIL [Latn]=>[Latn]
		//DISALLOW:0x1D90, // (ᶐ) LATIN SMALL LETTER ALPHA WITH RETROFLEX HOOK [Latn]=>[Latn]
	],
	[
		// "ĸ" <Same>
		'138', // LATIN SMALL LETTER KRA [Latn]=>[Latn]
		//DISALLOW:0x138, // (ĸ) LATIN SMALL LETTER KRA [Latn]=>[Latn]
		//DISALLOW:0x1D0B, // (ᴋ) LATIN LETTER SMALL CAPITAL K [Latn]=>[Latn]
		0x3BA, // (κ) GREEK SMALL LETTER KAPPA [Grek]=>[Grek]
		//IDNA:0x3F0, // (ϰ) GREEK KAPPA SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6CB, // (𝛋) MATHEMATICAL BOLD SMALL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D6DE, // (𝛞) MATHEMATICAL BOLD KAPPA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D705, // (𝜅) MATHEMATICAL ITALIC SMALL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D718, // (𝜘) MATHEMATICAL ITALIC KAPPA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D73F, // (𝜿) MATHEMATICAL BOLD ITALIC SMALL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D752, // (𝝒) MATHEMATICAL BOLD ITALIC KAPPA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D779, // (𝝹) MATHEMATICAL SANS-SERIF BOLD SMALL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D78C, // (𝞌) MATHEMATICAL SANS-SERIF BOLD KAPPA SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D7B3, // (𝞳) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL KAPPA [Zyyy]=>[ALL]
		//IDNA:0x1D7C6, // (𝟆) MATHEMATICAL SANS-SERIF BOLD ITALIC KAPPA SYMBOL [Zyyy]=>[ALL]
		0x2C95, // (ⲕ) COPTIC SMALL LETTER KAPA [Copt]=>[Copt]
		0x43A, // (к) CYRILLIC SMALL LETTER KA [Cyrl]=>[Cyrl]
		//IDNA:0xABB6, // (ꮶ) CHEROKEE SMALL LETTER TSO [Cher]=>[Cher]
	],
	[
		// "ĸ̩" <Same>
		'138 329', // LATIN SMALL LETTER KRA + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		0x49B, // (қ) CYRILLIC SMALL LETTER KA WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "ĸ̵" <Same>
		'138 335', // LATIN SMALL LETTER KRA + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		0x49F, // (ҟ) CYRILLIC SMALL LETTER KA WITH STROKE [Cyrl]=>[Cyrl]
	],
	[
		// "r" <Same>
		'72', // LATIN SMALL LETTER R [Latn]=>[Latn]
		valid(0x72), // (r) LATIN SMALL LETTER R [Latn]=>[Latn]
		//IDNA:0x1D42B, // (𝐫) MATHEMATICAL BOLD SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D45F, // (𝑟) MATHEMATICAL ITALIC SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D493, // (𝒓) MATHEMATICAL BOLD ITALIC SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D4C7, // (𝓇) MATHEMATICAL SCRIPT SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D4FB, // (𝓻) MATHEMATICAL BOLD SCRIPT SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D52F, // (𝔯) MATHEMATICAL FRAKTUR SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D563, // (𝕣) MATHEMATICAL DOUBLE-STRUCK SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D597, // (𝖗) MATHEMATICAL BOLD FRAKTUR SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D5CB, // (𝗋) MATHEMATICAL SANS-SERIF SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D5FF, // (𝗿) MATHEMATICAL SANS-SERIF BOLD SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D633, // (𝘳) MATHEMATICAL SANS-SERIF ITALIC SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D667, // (𝙧) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL R [Zyyy]=>[ALL]
		//IDNA:0x1D69B, // (𝚛) MATHEMATICAL MONOSPACE SMALL R [Zyyy]=>[ALL]
		//DISALLOW:0xAB47, // (ꭇ) LATIN SMALL LETTER R WITHOUT HANDLE [Latn]=>[Latn]
		//DISALLOW:0xAB48, // (ꭈ) LATIN SMALL LETTER DOUBLE R [Latn]=>[Latn]
		//DISALLOW:0x1D26, // (ᴦ) GREEK LETTER SMALL CAPITAL GAMMA [Grek]=>[Grek]
		0x2C85, // (ⲅ) COPTIC SMALL LETTER GAMMA [Copt]=>[Copt]
		0x433, // (г) CYRILLIC SMALL LETTER GHE [Cyrl]=>[Cyrl]
		//IDNA:0xAB81, // (ꮁ) CHEROKEE SMALL LETTER HU [Cher]=>[Cher]
		// 20221202: merge case
		// "R" <Same>
		//'52', // LATIN CAPITAL LETTER R [Latn]=>[Latn]
		//IDNA:0x52, // (R) LATIN CAPITAL LETTER R [Latn]=>[Latn]
		//DISALLOW:0x1D216, // (𝈖) GREEK VOCAL NOTATION SYMBOL-23 [Grek]=>[Grek]
		//IDNA:0x211B, // (ℛ) SCRIPT CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x211C, // (ℜ) BLACK-LETTER CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x211D, // (ℝ) DOUBLE-STRUCK CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D411, // (𝐑) MATHEMATICAL BOLD CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D445, // (𝑅) MATHEMATICAL ITALIC CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D479, // (𝑹) MATHEMATICAL BOLD ITALIC CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D4E1, // (𝓡) MATHEMATICAL BOLD SCRIPT CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D57D, // (𝕽) MATHEMATICAL BOLD FRAKTUR CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D5B1, // (𝖱) MATHEMATICAL SANS-SERIF CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D5E5, // (𝗥) MATHEMATICAL SANS-SERIF BOLD CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D619, // (𝘙) MATHEMATICAL SANS-SERIF ITALIC CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D64D, // (𝙍) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1D681, // (𝚁) MATHEMATICAL MONOSPACE CAPITAL R [Zyyy]=>[ALL]
		//IDNA:0x1A6, // (Ʀ) LATIN LETTER YR [Latn]=>[Latn]
		0x13A1, // (Ꭱ) CHEROKEE LETTER E [Cher]=>[Cher]
		0x13D2, // (Ꮢ) CHEROKEE LETTER SV [Cher]=>[Cher]
		//IDNA:0x104B4, // (𐒴) OSAGE CAPITAL LETTER BRA [Osge]=>[Osge]
		0x1587, // (ᖇ) CANADIAN SYLLABICS TLHI [Cans]=>[Cans]
		0xA4E3, // (ꓣ) LISU LETTER ZHA [Lisu]=>[Lisu]
		0x16F35, // (𖼵) MIAO LETTER ZHA [Plrd]=>[Plrd]
	],
	[
		// "r̨" <Same>
		'72 328', // LATIN SMALL LETTER R + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//DISALLOW:0x27D, // (ɽ) LATIN SMALL LETTER R WITH TAIL [Latn]=>[Latn]
	],
	[
		// "r̩" <Same>
		'72 329', // LATIN SMALL LETTER R + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		//DISALLOW:0x27C, // (ɼ) LATIN SMALL LETTER R WITH LONG LEG [Latn]=>[Latn]
	],
	[
		// "r̵" <Same>
		'72 335', // LATIN SMALL LETTER R + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x24D, // (ɍ) LATIN SMALL LETTER R WITH STROKE [Latn]=>[Latn]
		0x493, // (ғ) CYRILLIC SMALL LETTER GHE WITH STROKE [Cyrl]=>[Cyrl]
	],
	[
		// "r̴" <Same>
		'72 334', // LATIN SMALL LETTER R + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D72, // (ᵲ) LATIN SMALL LETTER R WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "r'" <Same>
		'72 27', // LATIN SMALL LETTER R + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x491, // (ґ) CYRILLIC SMALL LETTER GHE WITH UPTURN [Cyrl]=>[Cyrl]
	],
	[
		// "rn̸" <Same>
		'72 6E 338', // LATIN SMALL LETTER R + LATIN SMALL LETTER N + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x20A5, // (₥) MILL SIGN [Zyyy]=>[ALL]
	],
	[
		// "rn̦" <Same>
		'72 6E 326', // LATIN SMALL LETTER R + LATIN SMALL LETTER N + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//DISALLOW:0x271, // (ɱ) LATIN SMALL LETTER M WITH HOOK [Latn]=>[Latn]
	],
	[
		// "rn̴" <Same>
		'72 6E 334', // LATIN SMALL LETTER R + LATIN SMALL LETTER N + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D6F, // (ᵯ) LATIN SMALL LETTER M WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "Rs" <Same>
		'52 73', // LATIN CAPITAL LETTER R + LATIN SMALL LETTER S [Latn]=>[Latn]
		//IDNA:0x20A8, // (₨) RUPEE SIGN [Zyyy]=>[ALL]
	],
	[
		// "ʀ" <Same>
		'280', // LATIN LETTER SMALL CAPITAL R [Latn]=>[Latn]
		//DISALLOW:0x280, // (ʀ) LATIN LETTER SMALL CAPITAL R [Latn]=>[Latn]
		//IDNA:0xAB71, // (ꭱ) CHEROKEE SMALL LETTER E [Cher]=>[Cher]
		//IDNA:0xABA2, // (ꮢ) CHEROKEE SMALL LETTER SV [Cher]=>[Cher]
	],
	[
		// "ᴙ" <Same>
		'1D19', // LATIN LETTER SMALL CAPITAL REVERSED R [Latn]=>[Latn]
		//DISALLOW:0x1D19, // (ᴙ) LATIN LETTER SMALL CAPITAL REVERSED R [Latn]=>[Latn]
		0x44F, // (я) CYRILLIC SMALL LETTER YA [Cyrl]=>[Cyrl]
	],
	[
		// "ɾ̴" <Same>
		'27E 334', // LATIN SMALL LETTER R WITH FISHHOOK + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D73, // (ᵳ) LATIN SMALL LETTER R WITH FISHHOOK AND MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "ɿ" <Same>
		'27F', // LATIN SMALL LETTER REVERSED R WITH FISHHOOK [Latn]=>[Latn]
		//DISALLOW:0x27F, // (ɿ) LATIN SMALL LETTER REVERSED R WITH FISHHOOK [Latn]=>[Latn]
		//DISALLOW:0x2129, // (℩) TURNED GREEK SMALL LETTER IOTA [Zyyy]=>[ALL]
	],
	[
		// "s" <Same>
		'73', // LATIN SMALL LETTER S [Latn]=>[Latn]
		valid(0x73), // (s) LATIN SMALL LETTER S [Latn]=>[Latn]
		//IDNA:0xFF53, // (ｓ) FULLWIDTH LATIN SMALL LETTER S [Latn]=>[Latn]
		//IDNA:0x1D42C, // (𝐬) MATHEMATICAL BOLD SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D460, // (𝑠) MATHEMATICAL ITALIC SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D494, // (𝒔) MATHEMATICAL BOLD ITALIC SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D4C8, // (𝓈) MATHEMATICAL SCRIPT SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D4FC, // (𝓼) MATHEMATICAL BOLD SCRIPT SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D530, // (𝔰) MATHEMATICAL FRAKTUR SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D564, // (𝕤) MATHEMATICAL DOUBLE-STRUCK SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D598, // (𝖘) MATHEMATICAL BOLD FRAKTUR SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D5CC, // (𝗌) MATHEMATICAL SANS-SERIF SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D600, // (𝘀) MATHEMATICAL SANS-SERIF BOLD SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D634, // (𝘴) MATHEMATICAL SANS-SERIF ITALIC SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D668, // (𝙨) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL S [Zyyy]=>[ALL]
		//IDNA:0x1D69C, // (𝚜) MATHEMATICAL MONOSPACE SMALL S [Zyyy]=>[ALL]
		//DISALLOW:0xA731, // (ꜱ) LATIN LETTER SMALL CAPITAL S [Latn]=>[Latn]
		//DISALLOW:0x1BD, // (ƽ) LATIN SMALL LETTER TONE FIVE [Latn]=>[Latn]
		0x455, // (ѕ) CYRILLIC SMALL LETTER DZE [Cyrl]=>[Cyrl]
		//IDNA:0xABAA, // (ꮪ) CHEROKEE SMALL LETTER DU [Cher]=>[Cher]
		0x118C1, // (𑣁) WARANG CITI SMALL LETTER A [Wara]=>[Wara]
		0x10448, // (𐑈) DESERET SMALL LETTER ZHEE [Dsrt]=>[Dsrt]
		// 20221202: merge case
		// "S" <Same>
		//'53', // LATIN CAPITAL LETTER S [Latn]=>[Latn]
		//IDNA:0x53, // (S) LATIN CAPITAL LETTER S [Latn]=>[Latn]
		//IDNA:0xFF33, // (Ｓ) FULLWIDTH LATIN CAPITAL LETTER S [Latn]=>[Latn]
		//IDNA:0x1D412, // (𝐒) MATHEMATICAL BOLD CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D446, // (𝑆) MATHEMATICAL ITALIC CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D47A, // (𝑺) MATHEMATICAL BOLD ITALIC CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D4AE, // (𝒮) MATHEMATICAL SCRIPT CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D4E2, // (𝓢) MATHEMATICAL BOLD SCRIPT CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D516, // (𝔖) MATHEMATICAL FRAKTUR CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D54A, // (𝕊) MATHEMATICAL DOUBLE-STRUCK CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D57E, // (𝕾) MATHEMATICAL BOLD FRAKTUR CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D5B2, // (𝖲) MATHEMATICAL SANS-SERIF CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D5E6, // (𝗦) MATHEMATICAL SANS-SERIF BOLD CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D61A, // (𝘚) MATHEMATICAL SANS-SERIF ITALIC CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D64E, // (𝙎) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x1D682, // (𝚂) MATHEMATICAL MONOSPACE CAPITAL S [Zyyy]=>[ALL]
		//IDNA:0x405, // (Ѕ) CYRILLIC CAPITAL LETTER DZE [Cyrl]=>[Cyrl]
		//IDNA:0x54F, // (Տ) ARMENIAN CAPITAL LETTER TIWN [Armn]=>[Armn]
		0x13D5, // (Ꮥ) CHEROKEE LETTER DE [Cher]=>[Cher]
		0x13DA, // (Ꮪ) CHEROKEE LETTER DU [Cher]=>[Cher]
		0xA4E2, // (ꓢ) LISU LETTER SA [Lisu]=>[Lisu]
		0x16F3A, // (𖼺) MIAO LETTER SA [Plrd]=>[Plrd]
		0x10296, // (𐊖) LYCIAN LETTER S [Lyci]=>[Lyci]
		//IDNA:0x10420, // (𐐠) DESERET CAPITAL LETTER ZHEE [Dsrt]=>[Dsrt]
	],
	[
		// "s̨" <Same>
		'73 328', // LATIN SMALL LETTER S + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//DISALLOW:0x282, // (ʂ) LATIN SMALL LETTER S WITH HOOK [Latn]=>[Latn]
	],
	[
		// "s̴" <Same>
		'73 334', // LATIN SMALL LETTER S + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D74, // (ᵴ) LATIN SMALL LETTER S WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "ß" <Same>
		'DF', // LATIN SMALL LETTER SHARP S [Latn]=>[Latn]
		valid(0xDF), // (ß) LATIN SMALL LETTER SHARP S [Latn]=>[Latn]
		//DISALLOW:0xA7B5, // (ꞵ) LATIN SMALL LETTER BETA [Latn]=>[Latn]
		//IDNA:0x1E9E, // (ẞ) LATIN CAPITAL LETTER SHARP S [Latin]=>[Latin] (16.0.0)
		//IDNA:0xA7D6, // (Ꟗ) LATIN CAPITAL LETTER MIDDLE SCOTS S [Latin]=>[Latin] (16.0.0)	
		0x3B2, // (β) GREEK SMALL LETTER BETA [Grek]=>[Grek]
		//IDNA:0x3D0, // (ϐ) GREEK BETA SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6C3, // (𝛃) MATHEMATICAL BOLD SMALL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D6FD, // (𝛽) MATHEMATICAL ITALIC SMALL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D737, // (𝜷) MATHEMATICAL BOLD ITALIC SMALL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D771, // (𝝱) MATHEMATICAL SANS-SERIF BOLD SMALL BETA [Zyyy]=>[ALL]
		//IDNA:0x1D7AB, // (𝞫) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL BETA [Zyyy]=>[ALL]
		0x13F0, // (Ᏸ) CHEROKEE LETTER YE [Cher]=>[Cher]
	],
	[
		// "sss" <Same>
		'73 73 73', // LATIN SMALL LETTER S + LATIN SMALL LETTER S + LATIN SMALL LETTER S [Latn]=>[Latn]
		//DISALLOW:0x1F75C, // (🝜) ALCHEMICAL SYMBOL FOR STRATUM SUPER STRATUM [Zyyy]=>[ALL]
	],
	[
		// "st" <Same>
		'73 74', // LATIN SMALL LETTER S + LATIN SMALL LETTER T [Latn]=>[Latn]
		//IDNA:0xFB06, // (ﬆ) LATIN SMALL LIGATURE ST [Latn]=>[Latn]
	],
	[
		// "ʃ" <Same>
		'283', // LATIN SMALL LETTER ESH [Latn]=>[Latn]
		//DISALLOW:0x283, // (ʃ) LATIN SMALL LETTER ESH [Latn]=>[Latn]
		0x222B, // (∫) INTEGRAL [Zyyy]=>[ALL]
		//DISALLOW:0xAB4D, // (ꭍ) LATIN SMALL LETTER BASELINE ESH [Latn]=>[Latn]
	],
	[
		// "Ʃ" <Same>
		'1A9', // LATIN CAPITAL LETTER ESH [Latn]=>[Latn]
		//IDNA:0x1A9, // (Ʃ) LATIN CAPITAL LETTER ESH [Latn]=>[Latn]
		0x2211, // (∑) N-ARY SUMMATION [Zyyy]=>[ALL]
		//IDNA:0x2140, // (⅀) DOUBLE-STRUCK N-ARY SUMMATION [Zyyy]=>[ALL]
		//IDNA:0x3A3, // (Σ) GREEK CAPITAL LETTER SIGMA [Grek]=>[Grek]
		//IDNA:0x1D6BA, // (𝚺) MATHEMATICAL BOLD CAPITAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D6F4, // (𝛴) MATHEMATICAL ITALIC CAPITAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D72E, // (𝜮) MATHEMATICAL BOLD ITALIC CAPITAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D768, // (𝝨) MATHEMATICAL SANS-SERIF BOLD CAPITAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D7A2, // (𝞢) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL SIGMA [Zyyy]=>[ALL]
		0x2D49, // (ⵉ) TIFINAGH LETTER YI [Tfng]=>[Tfng]
	],
	[
		// "ʃʃ" <Same>
		'283 283', // LATIN SMALL LETTER ESH + LATIN SMALL LETTER ESH [Latn]=>[Latn]
		//IDNA:0x222C, // (∬) DOUBLE INTEGRAL [Zyyy]=>[ALL]
	],
	[
		// "ʃʃʃ" <Same>
		'283 283 283', // LATIN SMALL LETTER ESH + LATIN SMALL LETTER ESH + LATIN SMALL LETTER ESH [Latn]=>[Latn]
		//IDNA:0x222D, // (∭) TRIPLE INTEGRAL [Zyyy]=>[ALL]
	],
	[
		// "ʃʃʃʃ" <Same>
		'283 283 283 283', // LATIN SMALL LETTER ESH + LATIN SMALL LETTER ESH + LATIN SMALL LETTER ESH + LATIN SMALL LETTER ESH [Latn]=>[Latn]
		//IDNA:0x2A0C, // (⨌) QUADRUPLE INTEGRAL OPERATOR [Zyyy]=>[ALL]
	],
	[
		// "t" <Same>
		'74', // LATIN SMALL LETTER T [Latn]=>[Latn]
		valid(0x74), // (t) LATIN SMALL LETTER T [Latn]=>[Latn]
		//IDNA:0x1D42D, // (𝐭) MATHEMATICAL BOLD SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D461, // (𝑡) MATHEMATICAL ITALIC SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D495, // (𝒕) MATHEMATICAL BOLD ITALIC SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D4C9, // (𝓉) MATHEMATICAL SCRIPT SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D4FD, // (𝓽) MATHEMATICAL BOLD SCRIPT SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D531, // (𝔱) MATHEMATICAL FRAKTUR SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D565, // (𝕥) MATHEMATICAL DOUBLE-STRUCK SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D599, // (𝖙) MATHEMATICAL BOLD FRAKTUR SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D5CD, // (𝗍) MATHEMATICAL SANS-SERIF SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D601, // (𝘁) MATHEMATICAL SANS-SERIF BOLD SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D635, // (𝘵) MATHEMATICAL SANS-SERIF ITALIC SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D669, // (𝙩) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL T [Zyyy]=>[ALL]
		//IDNA:0x1D69D, // (𝚝) MATHEMATICAL MONOSPACE SMALL T [Zyyy]=>[ALL]
		// 20221202: merge case
		// "T" <Same>
		//'54', // LATIN CAPITAL LETTER T [Latn]=>[Latn]
		//IDNA:0x54, // (T) LATIN CAPITAL LETTER T [Latn]=>[Latn]
		//DISALLOW:0x22A4, // (⊤) DOWN TACK [Zyyy]=>[ALL]
		//DISALLOW:0x27D9, // (⟙) LARGE DOWN TACK [Zyyy]=>[ALL]
		//DISALLOW:0x1F768, // (🝨) ALCHEMICAL SYMBOL FOR CRUCIBLE-4 [Zyyy]=>[ALL]
		//IDNA:0xFF34, // (Ｔ) FULLWIDTH LATIN CAPITAL LETTER T [Latn]=>[Latn]
		//IDNA:0x1D413, // (𝐓) MATHEMATICAL BOLD CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D447, // (𝑇) MATHEMATICAL ITALIC CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D47B, // (𝑻) MATHEMATICAL BOLD ITALIC CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D4AF, // (𝒯) MATHEMATICAL SCRIPT CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D4E3, // (𝓣) MATHEMATICAL BOLD SCRIPT CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D517, // (𝔗) MATHEMATICAL FRAKTUR CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D54B, // (𝕋) MATHEMATICAL DOUBLE-STRUCK CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D57F, // (𝕿) MATHEMATICAL BOLD FRAKTUR CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D5B3, // (𝖳) MATHEMATICAL SANS-SERIF CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D5E7, // (𝗧) MATHEMATICAL SANS-SERIF BOLD CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D61B, // (𝘛) MATHEMATICAL SANS-SERIF ITALIC CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D64F, // (𝙏) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x1D683, // (𝚃) MATHEMATICAL MONOSPACE CAPITAL T [Zyyy]=>[ALL]
		//IDNA:0x3A4, // (Τ) GREEK CAPITAL LETTER TAU [Grek]=>[Grek]
		//IDNA:0x1D6BB, // (𝚻) MATHEMATICAL BOLD CAPITAL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D6F5, // (𝛵) MATHEMATICAL ITALIC CAPITAL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D72F, // (𝜯) MATHEMATICAL BOLD ITALIC CAPITAL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D769, // (𝝩) MATHEMATICAL SANS-SERIF BOLD CAPITAL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D7A3, // (𝞣) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL TAU [Zyyy]=>[ALL]
		//IDNA:0x2CA6, // (Ⲧ) COPTIC CAPITAL LETTER TAU [Copt]=>[Copt]
		//IDNA:0x422, // (Т) CYRILLIC CAPITAL LETTER TE [Cyrl]=>[Cyrl]
		0x13A2, // (Ꭲ) CHEROKEE LETTER I [Cher]=>[Cher]
		0xA4D4, // (ꓔ) LISU LETTER TA [Lisu]=>[Lisu]
		0x16F0A, // (𖼊) MIAO LETTER TA [Plrd]=>[Plrd]
		//IDNA:0x118BC, // (𑢼) WARANG CITI CAPITAL LETTER HAR [Wara]=>[Wara]
		0x10297, // (𐊗) LYCIAN LETTER T [Lyci]=>[Lyci]
		0x102B1, // (𐊱) CARIAN LETTER C-18 [Cari]=>[Cari]
		0x10315, // (𐌕) OLD ITALIC LETTER TE [Ital]=>[Ital]
	],
	[
		// "t̔" <Same>
		'74 314', // LATIN SMALL LETTER T + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1AD, // (ƭ) LATIN SMALL LETTER T WITH HOOK [Latn]=>[Latn]
	],
	[
		// "T̈" <Same>
		'54 308', // LATIN CAPITAL LETTER T + COMBINING DIAERESIS [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2361, // (⍡) APL FUNCTIONAL SYMBOL UP TACK DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "T̸" <Same>
		'54 338', // LATIN CAPITAL LETTER T + COMBINING LONG SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x23E, // (Ⱦ) LATIN CAPITAL LETTER T WITH DIAGONAL STROKE [Latn]=>[Latn]
	],
	[
		// "Ţ" <NFC(true) NFD(false)>
		'162', // LATIN CAPITAL LETTER T WITH CEDILLA [Latn]=>[Latn]
		//IDNA:0x162, // (Ţ) LATIN CAPITAL LETTER T WITH CEDILLA [Latn]=>[Latn]
		//IDNA:0x21A, // (Ț) LATIN CAPITAL LETTER T WITH COMMA BELOW [Latn]=>[Latn]
	],
	[
		// "T̨" <Same>
		'54 328', // LATIN CAPITAL LETTER T + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//IDNA:0x1AE, // (Ʈ) LATIN CAPITAL LETTER T WITH RETROFLEX HOOK [Latn]=>[Latn]
	],
	[
		// "T̩" <Same>
		'54 329', // LATIN CAPITAL LETTER T + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x4AC, // (Ҭ) CYRILLIC CAPITAL LETTER TE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "T⃫" <Same>
		'54 20EB', // LATIN CAPITAL LETTER T + COMBINING LONG DOUBLE SOLIDUS OVERLAY [Latn,Zinh]=>[Latn]
		0x20AE, // (₮) TUGRIK SIGN [Zyyy]=>[ALL]
	],
	[
		// "t̵" <Same>
		'74 335', // LATIN SMALL LETTER T + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x167, // (ŧ) LATIN SMALL LETTER T WITH STROKE [Latn]=>[Latn]
	],
	[
		// "T̵" <Same>
		'54 335', // LATIN CAPITAL LETTER T + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x166, // (Ŧ) LATIN CAPITAL LETTER T WITH STROKE [Latn]=>[Latn]
	],
	[
		// "t̴" <Same>
		'74 334', // LATIN SMALL LETTER T + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D75, // (ᵵ) LATIN SMALL LETTER T WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "Ꞇ" <Same>
		'A786', // LATIN CAPITAL LETTER INSULAR T [Latn]=>[Latn]
		//IDNA:0xA786, // (Ꞇ) LATIN CAPITAL LETTER INSULAR T [Latn]=>[Latn]
		//IDNA:0x10A0, // (Ⴀ) GEORGIAN CAPITAL LETTER AN [Geor]=>[Geor]
	],
	[
		// "T3" <Same>
		'54 33', // LATIN CAPITAL LETTER T + DIGIT THREE [Latn,Zyyy]=>[Latn]
		//IDNA:0xA728, // (Ꜩ) LATIN CAPITAL LETTER TZ [Latn]=>[Latn]
	],
	[
		// "tɕ" <Same>
		'74 255', // LATIN SMALL LETTER T + LATIN SMALL LETTER C WITH CURL [Latn]=>[Latn]
		//DISALLOW:0x2A8, // (ʨ) LATIN SMALL LETTER TC DIGRAPH WITH CURL [Latn]=>[Latn]
	],
	[
		// "TEL" <Same>
		'54 45 4C', // LATIN CAPITAL LETTER T + LATIN CAPITAL LETTER E + LATIN CAPITAL LETTER L [Latn]=>[Latn]
		//IDNA:0x2121, // (℡) TELEPHONE SIGN [Zyyy]=>[ALL]
	],
	[
		// "tf" <Same>
		'74 66', // LATIN SMALL LETTER T + LATIN SMALL LETTER F [Latn]=>[Latn]
		//DISALLOW:0xA777, // (ꝷ) LATIN SMALL LETTER TUM [Latn]=>[Latn]
	],
	[
		// "ts" <Same>
		'74 73', // LATIN SMALL LETTER T + LATIN SMALL LETTER S [Latn]=>[Latn]
		//DISALLOW:0x2A6, // (ʦ) LATIN SMALL LETTER TS DIGRAPH [Latn]=>[Latn]
	],
	[
		// "tʃ" <Same>
		'74 283', // LATIN SMALL LETTER T + LATIN SMALL LETTER ESH [Latn]=>[Latn]
		//DISALLOW:0x2A7, // (ʧ) LATIN SMALL LETTER TESH DIGRAPH [Latn]=>[Latn]
	],
	[
		// "tȝ" <Same>
		'74 21D', // LATIN SMALL LETTER T + LATIN SMALL LETTER YOGH [Latn]=>[Latn]
		//DISALLOW:0xA729, // (ꜩ) LATIN SMALL LETTER TZ [Latn]=>[Latn]
	],
	[
		// "ᴛ" <Same>
		'1D1B', // LATIN LETTER SMALL CAPITAL T [Latn]=>[Latn]
		//DISALLOW:0x1D1B, // (ᴛ) LATIN LETTER SMALL CAPITAL T [Latn]=>[Latn]
		0x3C4, // (τ) GREEK SMALL LETTER TAU [Grek]=>[Grek]
		//IDNA:0x1D6D5, // (𝛕) MATHEMATICAL BOLD SMALL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D70F, // (𝜏) MATHEMATICAL ITALIC SMALL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D749, // (𝝉) MATHEMATICAL BOLD ITALIC SMALL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D783, // (𝞃) MATHEMATICAL SANS-SERIF BOLD SMALL TAU [Zyyy]=>[ALL]
		//IDNA:0x1D7BD, // (𝞽) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL TAU [Zyyy]=>[ALL]
		0x442, // (т) CYRILLIC SMALL LETTER TE [Cyrl]=>[Cyrl]
		//IDNA:0xAB72, // (ꭲ) CHEROKEE SMALL LETTER I [Cher]=>[Cher]
	],
	[
		// "ᴛ̩" <Same>
		'1D1B 329', // LATIN LETTER SMALL CAPITAL T + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		0x4AD, // (ҭ) CYRILLIC SMALL LETTER TE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "ƫ" <Same>
		'1AB', // LATIN SMALL LETTER T WITH PALATAL HOOK [Latn]=>[Latn]
		//DISALLOW:0x1AB, // (ƫ) LATIN SMALL LETTER T WITH PALATAL HOOK [Latn]=>[Latn]
		0x163, // (ţ) LATIN SMALL LETTER T WITH CEDILLA [Latn]=>[Latn]
		0x21B, // (ț) LATIN SMALL LETTER T WITH COMMA BELOW [Latn]=>[Latn]
		0x13BF, // (Ꮏ) CHEROKEE LETTER HNA [Cher]=>[Cher]
	],
	[
		// "u" <Same>
		'75', // LATIN SMALL LETTER U [Latn]=>[Latn]
		valid(0x75), // (u) LATIN SMALL LETTER U [Latn]=>[Latn]
		//IDNA:0x1D42E, // (𝐮) MATHEMATICAL BOLD SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D462, // (𝑢) MATHEMATICAL ITALIC SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D496, // (𝒖) MATHEMATICAL BOLD ITALIC SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D4CA, // (𝓊) MATHEMATICAL SCRIPT SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D4FE, // (𝓾) MATHEMATICAL BOLD SCRIPT SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D532, // (𝔲) MATHEMATICAL FRAKTUR SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D566, // (𝕦) MATHEMATICAL DOUBLE-STRUCK SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D59A, // (𝖚) MATHEMATICAL BOLD FRAKTUR SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D5CE, // (𝗎) MATHEMATICAL SANS-SERIF SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D602, // (𝘂) MATHEMATICAL SANS-SERIF BOLD SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D636, // (𝘶) MATHEMATICAL SANS-SERIF ITALIC SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D66A, // (𝙪) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL U [Zyyy]=>[ALL]
		//IDNA:0x1D69E, // (𝚞) MATHEMATICAL MONOSPACE SMALL U [Zyyy]=>[ALL]
		//DISALLOW:0xA79F, // (ꞟ) LATIN SMALL LETTER VOLAPUK UE [Latn]=>[Latn]
		//DISALLOW:0x1D1C, // (ᴜ) LATIN LETTER SMALL CAPITAL U [Latn]=>[Latn]
		//DISALLOW:0xAB4E, // (ꭎ) LATIN SMALL LETTER U WITH SHORT RIGHT LEG [Latn]=>[Latn]
		//DISALLOW:0xAB52, // (ꭒ) LATIN SMALL LETTER U WITH LEFT HOOK [Latn]=>[Latn]
		//DISALLOW:0x28B, // (ʋ) LATIN SMALL LETTER V WITH HOOK [Latn]=>[Latn]
		0x3C5, // (υ) GREEK SMALL LETTER UPSILON [Grek]=>[Grek]
		//IDNA:0x1D6D6, // (𝛖) MATHEMATICAL BOLD SMALL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D710, // (𝜐) MATHEMATICAL ITALIC SMALL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D74A, // (𝝊) MATHEMATICAL BOLD ITALIC SMALL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D784, // (𝞄) MATHEMATICAL SANS-SERIF BOLD SMALL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D7BE, // (𝞾) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL UPSILON [Zyyy]=>[ALL]
		0x57D, // (ս) ARMENIAN SMALL LETTER SEH [Armn]=>[Armn]
		0x104F6, // (𐓶) OSAGE SMALL LETTER U [Osge]=>[Osge]
		0x118D8, // (𑣘) WARANG CITI SMALL LETTER PU [Wara]=>[Wara]
		// 20221202: merge case
		// "U" <Same>
		//'55', // LATIN CAPITAL LETTER U [Latn]=>[Latn]
		//IDNA:0x55, // (U) LATIN CAPITAL LETTER U [Latn]=>[Latn]
		//DISALLOW:0x222A, // (∪) UNION [Zyyy]=>[ALL]
		//DISALLOW:0x22C3, // (⋃) N-ARY UNION [Zyyy]=>[ALL]
		//IDNA:0x1D414, // (𝐔) MATHEMATICAL BOLD CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D448, // (𝑈) MATHEMATICAL ITALIC CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D47C, // (𝑼) MATHEMATICAL BOLD ITALIC CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D4B0, // (𝒰) MATHEMATICAL SCRIPT CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D4E4, // (𝓤) MATHEMATICAL BOLD SCRIPT CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D518, // (𝔘) MATHEMATICAL FRAKTUR CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D54C, // (𝕌) MATHEMATICAL DOUBLE-STRUCK CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D580, // (𝖀) MATHEMATICAL BOLD FRAKTUR CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D5B4, // (𝖴) MATHEMATICAL SANS-SERIF CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D5E8, // (𝗨) MATHEMATICAL SANS-SERIF BOLD CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D61C, // (𝘜) MATHEMATICAL SANS-SERIF ITALIC CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D650, // (𝙐) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x1D684, // (𝚄) MATHEMATICAL MONOSPACE CAPITAL U [Zyyy]=>[ALL]
		//IDNA:0x54D, // (Ս) ARMENIAN CAPITAL LETTER SEH [Armn]=>[Armn]
		0x1200, // (ሀ) ETHIOPIC SYLLABLE HA [Ethi]=>[Ethi]
		//IDNA:0x104CE, // (𐓎) OSAGE CAPITAL LETTER U [Osge]=>[Osge]
		0x144C, // (ᑌ) CANADIAN SYLLABICS TE [Cans]=>[Cans]
		0xA4F4, // (ꓴ) LISU LETTER U [Lisu]=>[Lisu]
		0x16F42, // (𖽂) MIAO LETTER WA [Plrd]=>[Plrd]
		//IDNA:0x118B8, // (𑢸) WARANG CITI CAPITAL LETTER PU [Wara]=>[Wara]
	],
	[
		// "ŭ" <NFC(true) NFD(false)>
		'16D', // LATIN SMALL LETTER U WITH BREVE [Latn]=>[Latn]
		0x16D, // (ŭ) LATIN SMALL LETTER U WITH BREVE [Latn]=>[Latn]
		0x1D4, // (ǔ) LATIN SMALL LETTER U WITH CARON [Latn]=>[Latn]
	],
	[
		// "Ŭ" <NFC(true) NFD(false)>
		'16C', // LATIN CAPITAL LETTER U WITH BREVE [Latn]=>[Latn]
		//IDNA:0x16C, // (Ŭ) LATIN CAPITAL LETTER U WITH BREVE [Latn]=>[Latn]
		//IDNA:0x1D3, // (Ǔ) LATIN CAPITAL LETTER U WITH CARON [Latn]=>[Latn]
	],
	[
		// "u̵" <Same>
		'75 335', // LATIN SMALL LETTER U + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D7E, // (ᵾ) LATIN SMALL CAPITAL LETTER U WITH STROKE [Latn]=>[Latn]
		//IDNA:0xAB9C, // (ꮜ) CHEROKEE SMALL LETTER SA [Cher]=>[Cher]
	],
	[
		// "U̵" <Same>
		'55 335', // LATIN CAPITAL LETTER U + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x244, // (Ʉ) LATIN CAPITAL LETTER U BAR [Latn]=>[Latn]
		0x13CC, // (Ꮜ) CHEROKEE LETTER SA [Cher]=>[Cher]
	],
	[
		// "U·" <Same>
		'55 B7', // LATIN CAPITAL LETTER U + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x1458, // (ᑘ) CANADIAN SYLLABICS WEST-CREE TWE [Cans]=>[Cans]
	],
	[
		// "U'" <Same>
		'55 27', // LATIN CAPITAL LETTER U + APOSTROPHE [Latn,Zyyy]=>[Latn]
		0x1467, // (ᑧ) CANADIAN SYLLABICS TTE [Cans]=>[Cans]
	],
	[
		// "ue" <Same>
		'75 65', // LATIN SMALL LETTER U + LATIN SMALL LETTER E [Latn]=>[Latn]
		//DISALLOW:0x1D6B, // (ᵫ) LATIN SMALL LETTER UE [Latn]=>[Latn]
	],
	[
		// "uo" <Same>
		'75 6F', // LATIN SMALL LETTER U + LATIN SMALL LETTER O [Latn]=>[Latn]
		//DISALLOW:0xAB63, // (ꭣ) LATIN SMALL LETTER UO [Latn]=>[Latn]
	],
	[
		// "ꭑ" <Same>
		'AB51', // LATIN SMALL LETTER TURNED UI [Latn]=>[Latn]
		//DISALLOW:0xAB51, // (ꭑ) LATIN SMALL LETTER TURNED UI [Latn]=>[Latn]
		0x1E43, // (ṃ) LATIN SMALL LETTER M WITH DOT BELOW [Latn]=>[Latn]
	],
	[
		// "ɰ" <Same>
		'270', // LATIN SMALL LETTER TURNED M WITH LONG LEG [Latn]=>[Latn]
		//DISALLOW:0x270, // (ɰ) LATIN SMALL LETTER TURNED M WITH LONG LEG [Latn]=>[Latn]
		0x57A, // (պ) ARMENIAN SMALL LETTER PEH [Armn]=>[Armn]
		0x1223, // (ሣ) ETHIOPIC SYLLABLE SZAA [Ethi]=>[Ethi]
	],
	[
		// "Ʊ" <Same>
		'1B1', // LATIN CAPITAL LETTER UPSILON [Latn]=>[Latn]
		//IDNA:0x1B1, // (Ʊ) LATIN CAPITAL LETTER UPSILON [Latn]=>[Latn]
		//DISALLOW:0x2127, // (℧) INVERTED OHM SIGN [Zyyy]=>[ALL]
		0x162E, // (ᘮ) CANADIAN SYLLABICS CARRIER LHU [Cans]=>[Cans]
		0x1634, // (ᘴ) CANADIAN SYLLABICS CARRIER TLHU [Cans]=>[Cans]
	],
	[
		// "ʊ̵" <Same>
		'28A 335', // LATIN SMALL LETTER UPSILON + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D7F, // (ᵿ) LATIN SMALL LETTER UPSILON WITH STROKE [Latn]=>[Latn]
	],
	[
		// "v" <Same>
		'76', // LATIN SMALL LETTER V [Latn]=>[Latn]
		valid(0x76), // (v) LATIN SMALL LETTER V [Latn]=>[Latn]
		//DISALLOW:0x2228, // (∨) LOGICAL OR [Zyyy]=>[ALL]
		//DISALLOW:0x22C1, // (⋁) N-ARY LOGICAL OR [Zyyy]=>[ALL]
		//IDNA:0xFF56, // (ｖ) FULLWIDTH LATIN SMALL LETTER V [Latn]=>[Latn]
		//IDNA:0x2174, // (ⅴ) SMALL ROMAN NUMERAL FIVE [Latn]=>[Latn]
		//IDNA:0x1D42F, // (𝐯) MATHEMATICAL BOLD SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D463, // (𝑣) MATHEMATICAL ITALIC SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D497, // (𝒗) MATHEMATICAL BOLD ITALIC SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D4CB, // (𝓋) MATHEMATICAL SCRIPT SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D4FF, // (𝓿) MATHEMATICAL BOLD SCRIPT SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D533, // (𝔳) MATHEMATICAL FRAKTUR SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D567, // (𝕧) MATHEMATICAL DOUBLE-STRUCK SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D59B, // (𝖛) MATHEMATICAL BOLD FRAKTUR SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D5CF, // (𝗏) MATHEMATICAL SANS-SERIF SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D603, // (𝘃) MATHEMATICAL SANS-SERIF BOLD SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D637, // (𝘷) MATHEMATICAL SANS-SERIF ITALIC SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D66B, // (𝙫) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL V [Zyyy]=>[ALL]
		//IDNA:0x1D69F, // (𝚟) MATHEMATICAL MONOSPACE SMALL V [Zyyy]=>[ALL]
		//DISALLOW:0x1D20, // (ᴠ) LATIN LETTER SMALL CAPITAL V [Latn]=>[Latn]
		0x3BD, // (ν) GREEK SMALL LETTER NU [Grek]=>[Grek]
		//IDNA:0x1D6CE, // (𝛎) MATHEMATICAL BOLD SMALL NU [Zyyy]=>[ALL]
		//IDNA:0x1D708, // (𝜈) MATHEMATICAL ITALIC SMALL NU [Zyyy]=>[ALL]
		//IDNA:0x1D742, // (𝝂) MATHEMATICAL BOLD ITALIC SMALL NU [Zyyy]=>[ALL]
		//IDNA:0x1D77C, // (𝝼) MATHEMATICAL SANS-SERIF BOLD SMALL NU [Zyyy]=>[ALL]
		//IDNA:0x1D7B6, // (𝞶) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL NU [Zyyy]=>[ALL]
		//DISALLOW:0x475, // (ѵ) CYRILLIC SMALL LETTER IZHITSA [Cyrl]=>[Cyrl]
		0x5D8, // (ט) HEBREW LETTER TET [Hebr]=>[Hebr]
		0x11706, // (𑜆) AHOM LETTER PA [Ahom]=>[Ahom]
		//IDNA:0xABA9, // (ꮩ) CHEROKEE SMALL LETTER DO [Cher]=>[Cher]
		0x118C0, // (𑣀) WARANG CITI SMALL LETTER NGAA [Wara]=>[Wara]
		// 20221202: merge case
		// "V" <Same>
		//'56', // LATIN CAPITAL LETTER V [Latn]=>[Latn]
		//IDNA:0x56, // (V) LATIN CAPITAL LETTER V [Latn]=>[Latn]
		//DISALLOW:0x1D20D, // (𝈍) GREEK VOCAL NOTATION SYMBOL-14 [Grek]=>[Grek]
		valid(0x667), // (٧) ARABIC-INDIC DIGIT SEVEN [Arab]=>[Arab,Thaa,Yezi]
		0x6F7, // (۷) EXTENDED ARABIC-INDIC DIGIT SEVEN [Arab]=>[Arab]
		//IDNA:0x2164, // (Ⅴ) ROMAN NUMERAL FIVE [Latn]=>[Latn]
		//IDNA:0x1D415, // (𝐕) MATHEMATICAL BOLD CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D449, // (𝑉) MATHEMATICAL ITALIC CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D47D, // (𝑽) MATHEMATICAL BOLD ITALIC CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D4B1, // (𝒱) MATHEMATICAL SCRIPT CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D4E5, // (𝓥) MATHEMATICAL BOLD SCRIPT CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D519, // (𝔙) MATHEMATICAL FRAKTUR CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D54D, // (𝕍) MATHEMATICAL DOUBLE-STRUCK CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D581, // (𝖁) MATHEMATICAL BOLD FRAKTUR CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D5B5, // (𝖵) MATHEMATICAL SANS-SERIF CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D5E9, // (𝗩) MATHEMATICAL SANS-SERIF BOLD CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D61D, // (𝘝) MATHEMATICAL SANS-SERIF ITALIC CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D651, // (𝙑) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x1D685, // (𝚅) MATHEMATICAL MONOSPACE CAPITAL V [Zyyy]=>[ALL]
		//IDNA:0x474, // (Ѵ) CYRILLIC CAPITAL LETTER IZHITSA [Cyrl]=>[Cyrl]
		0x2D38, // (ⴸ) TIFINAGH LETTER YADH [Tfng]=>[Tfng]
		0x13D9, // (Ꮩ) CHEROKEE LETTER DO [Cher]=>[Cher]
		0x142F, // (ᐯ) CANADIAN SYLLABICS PE [Cans]=>[Cans]
		0xA6DF, // (ꛟ) BAMUM LETTER KO [Bamu]=>[Bamu]
		0xA4E6, // (ꓦ) LISU LETTER HA [Lisu]=>[Lisu]
		0x16F08, // (𖼈) MIAO LETTER VA [Plrd]=>[Plrd]
		//IDNA:0x118A0, // (𑢠) WARANG CITI CAPITAL LETTER NGAA [Wara]=>[Wara]
		0x1051D, // (𐔝) ELBASAN LETTER TE [Elba]=>[Elba]
	],
	[
		// "V̵" <Same>
		'56 335', // LATIN CAPITAL LETTER V + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x10197, // (𐆗) ROMAN QUINARIUS SIGN [Zyyy]=>[ALL]
	],
	[
		// "V·" <Same>
		'56 B7', // LATIN CAPITAL LETTER V + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x143B, // (ᐻ) CANADIAN SYLLABICS WEST-CREE PWE [Cans]=>[Cans]
	],
	[
		// "VB" <Same>
		'56 42', // LATIN CAPITAL LETTER V + LATIN CAPITAL LETTER B [Latn]=>[Latn]
		//DISALLOW:0x1F76C, // (🝬) ALCHEMICAL SYMBOL FOR BATH OF VAPOURS [Zyyy]=>[ALL]
	],
	[
		// "vi" <Same>
		'76 69', // LATIN SMALL LETTER V + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2175, // (ⅵ) SMALL ROMAN NUMERAL SIX [Latn]=>[Latn]
	],
	[
		// "vii" <Same>
		'76 69 69', // LATIN SMALL LETTER V + LATIN SMALL LETTER I + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2176, // (ⅶ) SMALL ROMAN NUMERAL SEVEN [Latn]=>[Latn]
	],
	[
		// "viii" <Same>
		'76 69 69 69', // LATIN SMALL LETTER V + LATIN SMALL LETTER I + LATIN SMALL LETTER I + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x2177, // (ⅷ) SMALL ROMAN NUMERAL EIGHT [Latn]=>[Latn]
	],
	[
		// "Vl" <Same>
		'56 6C', // LATIN CAPITAL LETTER V + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x2165, // (Ⅵ) ROMAN NUMERAL SIX [Latn]=>[Latn]
	],
	[
		// "Vll" <Same>
		'56 6C 6C', // LATIN CAPITAL LETTER V + LATIN SMALL LETTER L + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x2166, // (Ⅶ) ROMAN NUMERAL SEVEN [Latn]=>[Latn]
	],
	[
		// "Vlll" <Same>
		'56 6C 6C 6C', // LATIN CAPITAL LETTER V + LATIN SMALL LETTER L + LATIN SMALL LETTER L + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x2167, // (Ⅷ) ROMAN NUMERAL EIGHT [Latn]=>[Latn]
	],
	[
		// "Vᷤ" <Same>
		'56 1DE4', // LATIN CAPITAL LETTER V + COMBINING LATIN SMALL LETTER S [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1F708, // (🜈) ALCHEMICAL SYMBOL FOR AQUA VITAE [Zyyy]=>[ALL]
	],
	[
		// "ʌ" <Same>
		'28C', // LATIN SMALL LETTER TURNED V [Latn]=>[Latn]
		//DISALLOW:0x28C, // (ʌ) LATIN SMALL LETTER TURNED V [Latn]=>[Latn]
		//DISALLOW:0x1D27, // (ᴧ) GREEK LETTER SMALL CAPITAL LAMDA [Grek]=>[Grek]
		0x104D8, // (𐓘) OSAGE SMALL LETTER A [Osge]=>[Osge]
	],
	[
		// "Ʌ" <Same>
		'245', // LATIN CAPITAL LETTER TURNED V [Latn]=>[Latn]
		//IDNA:0x245, // (Ʌ) LATIN CAPITAL LETTER TURNED V [Latn]=>[Latn]
		0x668, // (٨) ARABIC-INDIC DIGIT EIGHT [Arab]=>[Arab,Thaa,Yezi]
		0x6F8, // (۸) EXTENDED ARABIC-INDIC DIGIT EIGHT [Arab]=>[Arab]
		//IDNA:0xA7DA, // (Ꟛ) LATIN CAPITAL LETTER LAMBDA [Latin]=>[Latin] (16.0.0)
		//IDNA:0x39B, // (Λ) GREEK CAPITAL LETTER LAMDA [Grek]=>[Grek]
		//IDNA:0x1D6B2, // (𝚲) MATHEMATICAL BOLD CAPITAL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D6EC, // (𝛬) MATHEMATICAL ITALIC CAPITAL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D726, // (𝜦) MATHEMATICAL BOLD ITALIC CAPITAL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D760, // (𝝠) MATHEMATICAL SANS-SERIF BOLD CAPITAL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D79A, // (𝞚) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x41B, // (Л) CYRILLIC CAPITAL LETTER EL [Cyrl]=>[Cyrl]
		0x2D37, // (ⴷ) TIFINAGH LETTER YAD [Tfng]=>[Tfng]
		//IDNA:0x104B0, // (𐒰) OSAGE CAPITAL LETTER A [Osge]=>[Osge]
		0x1431, // (ᐱ) CANADIAN SYLLABICS PI [Cans]=>[Cans]
		0xA6CE, // (ꛎ) BAMUM LETTER MI [Bamu]=>[Bamu]
		0xA4E5, // (ꓥ) LISU LETTER NGA [Lisu]=>[Lisu]
		0x16F3D, // (𖼽) MIAO LETTER ZZA [Plrd]=>[Plrd]
		0x1028D, // (𐊍) LYCIAN LETTER L [Lyci]=>[Lyci]
		0x10321, // (𐌡) OLD ITALIC NUMERAL FIVE [Ital]=>[Ital] (20221210: added)
	],
	[
		// "Ʌ̦" <Same>
		'245 326', // LATIN CAPITAL LETTER TURNED V + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x4C5, // (Ӆ) CYRILLIC CAPITAL LETTER EL WITH TAIL [Cyrl]=>[Cyrl]
	],
	[
		// "Ʌ·" <Same>
		'245 B7', // LATIN CAPITAL LETTER TURNED V + MIDDLE DOT [Latn,Zyyy]=>[Latn]
		0x143D, // (ᐽ) CANADIAN SYLLABICS WEST-CREE PWI [Cans]=>[Cans]
	],
	[
		// "w" <Same>
		'77', // LATIN SMALL LETTER W [Latn]=>[Latn]
		valid(0x77), // (w) LATIN SMALL LETTER W [Latn]=>[Latn]
		//DISALLOW:0x26F, // (ɯ) LATIN SMALL LETTER TURNED M [Latn]=>[Latn]
		//IDNA:0x1D430, // (𝐰) MATHEMATICAL BOLD SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D464, // (𝑤) MATHEMATICAL ITALIC SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D498, // (𝒘) MATHEMATICAL BOLD ITALIC SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D4CC, // (𝓌) MATHEMATICAL SCRIPT SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D500, // (𝔀) MATHEMATICAL BOLD SCRIPT SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D534, // (𝔴) MATHEMATICAL FRAKTUR SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D568, // (𝕨) MATHEMATICAL DOUBLE-STRUCK SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D59C, // (𝖜) MATHEMATICAL BOLD FRAKTUR SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D5D0, // (𝗐) MATHEMATICAL SANS-SERIF SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D604, // (𝘄) MATHEMATICAL SANS-SERIF BOLD SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D638, // (𝘸) MATHEMATICAL SANS-SERIF ITALIC SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D66C, // (𝙬) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL W [Zyyy]=>[ALL]
		//IDNA:0x1D6A0, // (𝚠) MATHEMATICAL MONOSPACE SMALL W [Zyyy]=>[ALL]
		//DISALLOW:0x1D21, // (ᴡ) LATIN LETTER SMALL CAPITAL W [Latn]=>[Latn]
		//DISALLOW:0x461, // (ѡ) CYRILLIC SMALL LETTER OMEGA [Cyrl]=>[Cyrl]
		0x51D, // (ԝ) CYRILLIC SMALL LETTER WE [Cyrl]=>[Cyrl]
		0x561, // (ա) ARMENIAN SMALL LETTER AYB [Armn]=>[Armn]
		0x1170A, // (𑜊) AHOM LETTER JA [Ahom]=>[Ahom]
		0x1170E, // (𑜎) AHOM LETTER LA [Ahom]=>[Ahom]
		0x1170F, // (𑜏) AHOM LETTER SA [Ahom]=>[Ahom]
		//IDNA:0xAB83, // (ꮃ) CHEROKEE SMALL LETTER LA [Cher]=>[Cher]
		// 20221202: merge case
		// "W" <Same>
		//'57', // LATIN CAPITAL LETTER W [Latn]=>[Latn]
		//IDNA:0x57, // (W) LATIN CAPITAL LETTER W [Latn]=>[Latn]
		0x118EF, // (𑣯) WARANG CITI NUMBER SIXTY [Wara]=>[Wara]
		0x118E6, // (𑣦) WARANG CITI DIGIT SIX [Wara]=>[Wara]
		//IDNA:0x1D416, // (𝐖) MATHEMATICAL BOLD CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D44A, // (𝑊) MATHEMATICAL ITALIC CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D47E, // (𝑾) MATHEMATICAL BOLD ITALIC CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D4B2, // (𝒲) MATHEMATICAL SCRIPT CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D4E6, // (𝓦) MATHEMATICAL BOLD SCRIPT CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D51A, // (𝔚) MATHEMATICAL FRAKTUR CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D54E, // (𝕎) MATHEMATICAL DOUBLE-STRUCK CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D582, // (𝖂) MATHEMATICAL BOLD FRAKTUR CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D5B6, // (𝖶) MATHEMATICAL SANS-SERIF CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D5EA, // (𝗪) MATHEMATICAL SANS-SERIF BOLD CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D61E, // (𝘞) MATHEMATICAL SANS-SERIF ITALIC CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D652, // (𝙒) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x1D686, // (𝚆) MATHEMATICAL MONOSPACE CAPITAL W [Zyyy]=>[ALL]
		//IDNA:0x51C, // (Ԝ) CYRILLIC CAPITAL LETTER WE [Cyrl]=>[Cyrl]
		0x13B3, // (Ꮃ) CHEROKEE LETTER LA [Cher]=>[Cher]
		0x13D4, // (Ꮤ) CHEROKEE LETTER TA [Cher]=>[Cher]
		0xA4EA, // (ꓪ) LISU LETTER WA [Lisu]=>[Lisu]
	],
	[
		// "w҆҇" <Same>
		'77 486 487', // LATIN SMALL LETTER W + COMBINING CYRILLIC PSILI PNEUMATA + COMBINING CYRILLIC POKRYTIE [Latn,Zinh,Cyrl]=>[]
		//DISALLOW:0x47D, // (ѽ) CYRILLIC SMALL LETTER OMEGA WITH TITLO [Cyrl]=>[Cyrl]
	],
	[
		// "ẇ" <NFC(false) NFD(true)>
		'77 307', // LATIN SMALL LETTER W + COMBINING DOT ABOVE [Latn,Zinh]=>[Latn]
		0x114C5, // (𑓅) TIRHUTA GVANG [Tirh]=>[Tirh]
	],
	[
		// "W̵" <Same>
		'57 335', // LATIN CAPITAL LETTER W + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		0x20A9, // (₩) WON SIGN [Zyyy]=>[ALL]
	],
	[
		// "w̦" <Same>
		'77 326', // LATIN SMALL LETTER W + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//DISALLOW:0xA761, // (ꝡ) LATIN SMALL LETTER VY [Latn]=>[Latn]
	],
	[
		// "ʍ" <Same>
		'28D', // LATIN SMALL LETTER TURNED W [Latn]=>[Latn]
		//DISALLOW:0x28D, // (ʍ) LATIN SMALL LETTER TURNED W [Latn]=>[Latn]
		//DISALLOW:0x1D0D, // (ᴍ) LATIN LETTER SMALL CAPITAL M [Latn]=>[Latn]
		0x43C, // (м) CYRILLIC SMALL LETTER EM [Cyrl]=>[Cyrl]
		//IDNA:0xAB87, // (ꮇ) CHEROKEE SMALL LETTER LU [Cher]=>[Cher]
	],
	[
		// "ʍ̦" <Same>
		'28D 326', // LATIN SMALL LETTER TURNED W + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		0x4CE, // (ӎ) CYRILLIC SMALL LETTER EM WITH TAIL [Cyrl]=>[Cyrl]
	],
	[
		// "◌ͯ" <Same>
		'36F', // COMBINING LATIN SMALL LETTER X [Zinh]=>[Latn]
		//DISALLOW:0x36F, // (◌ͯ) COMBINING LATIN SMALL LETTER X [Zinh]=>[Latn]
		//DISALLOW:0x2DEF, // (◌ⷯ) COMBINING CYRILLIC LETTER HA [Cyrl]=>[Cyrl]
	],
	[
		// "x" <Same>
		'78', // LATIN SMALL LETTER X [Latn]=>[Latn]
		valid(0x78), // (x) LATIN SMALL LETTER X [Latn]=>[Latn]
		//DISALLOW:0x166E, // (᙮) CANADIAN SYLLABICS FULL STOP [Cans]=>[Cans]
		//DISALLOW:0xD7, // (×) MULTIPLICATION SIGN [Zyyy]=>[ALL]
		//DISALLOW:0x292B, // (⤫) RISING DIAGONAL CROSSING FALLING DIAGONAL [Zyyy]=>[ALL]
		//DISALLOW:0x292C, // (⤬) FALLING DIAGONAL CROSSING RISING DIAGONAL [Zyyy]=>[ALL]
		//DISALLOW:0x2A2F, // (⨯) VECTOR OR CROSS PRODUCT [Zyyy]=>[ALL]
		//IDNA:0xFF58, // (ｘ) FULLWIDTH LATIN SMALL LETTER X [Latn]=>[Latn]
		//IDNA:0x2179, // (ⅹ) SMALL ROMAN NUMERAL TEN [Latn]=>[Latn]
		//IDNA:0x1D431, // (𝐱) MATHEMATICAL BOLD SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D465, // (𝑥) MATHEMATICAL ITALIC SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D499, // (𝒙) MATHEMATICAL BOLD ITALIC SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D4CD, // (𝓍) MATHEMATICAL SCRIPT SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D501, // (𝔁) MATHEMATICAL BOLD SCRIPT SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D535, // (𝔵) MATHEMATICAL FRAKTUR SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D569, // (𝕩) MATHEMATICAL DOUBLE-STRUCK SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D59D, // (𝖝) MATHEMATICAL BOLD FRAKTUR SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D5D1, // (𝗑) MATHEMATICAL SANS-SERIF SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D605, // (𝘅) MATHEMATICAL SANS-SERIF BOLD SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D639, // (𝘹) MATHEMATICAL SANS-SERIF ITALIC SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D66D, // (𝙭) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL X [Zyyy]=>[ALL]
		//IDNA:0x1D6A1, // (𝚡) MATHEMATICAL MONOSPACE SMALL X [Zyyy]=>[ALL]
		0x445, // (х) CYRILLIC SMALL LETTER HA [Cyrl]=>[Cyrl]
		0x4B3, // (ҳ) CYRILLIC SMALL LETTER HA WITH DESCENDER (added)
		0x1541, // (ᕁ) CANADIAN SYLLABICS SAYISI YI [Cans]=>[Cans]
		0x157D, // (ᕽ) CANADIAN SYLLABICS HK [Cans]=>[Cans]
		// 20221202: merge case
		// "X" <Same>
		//'58', // LATIN CAPITAL LETTER X [Latn]=>[Latn]
		//IDNA:0x58, // (X) LATIN CAPITAL LETTER X [Latn]=>[Latn]
		0x166D, // (᙭) CANADIAN SYLLABICS CHI SIGN [Cans]=>[Cans]
		//DISALLOW:0x2573, // (╳) BOX DRAWINGS LIGHT DIAGONAL CROSS [Zyyy]=>[ALL]
		0x10322, // (𐌢) OLD ITALIC NUMERAL TEN [Ital]=>[Ital]
		0x118EC, // (𑣬) WARANG CITI NUMBER THIRTY [Wara]=>[Wara]
		//IDNA:0xFF38, // (Ｘ) FULLWIDTH LATIN CAPITAL LETTER X [Latn]=>[Latn]
		//IDNA:0x2169, // (Ⅹ) ROMAN NUMERAL TEN [Latn]=>[Latn]
		//IDNA:0x1D417, // (𝐗) MATHEMATICAL BOLD CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D44B, // (𝑋) MATHEMATICAL ITALIC CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D47F, // (𝑿) MATHEMATICAL BOLD ITALIC CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D4B3, // (𝒳) MATHEMATICAL SCRIPT CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D4E7, // (𝓧) MATHEMATICAL BOLD SCRIPT CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D51B, // (𝔛) MATHEMATICAL FRAKTUR CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D54F, // (𝕏) MATHEMATICAL DOUBLE-STRUCK CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D583, // (𝖃) MATHEMATICAL BOLD FRAKTUR CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D5B7, // (𝖷) MATHEMATICAL SANS-SERIF CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D5EB, // (𝗫) MATHEMATICAL SANS-SERIF BOLD CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D61F, // (𝘟) MATHEMATICAL SANS-SERIF ITALIC CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D653, // (𝙓) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0x1D687, // (𝚇) MATHEMATICAL MONOSPACE CAPITAL X [Zyyy]=>[ALL]
		//IDNA:0xA7B3, // (Ꭓ) LATIN CAPITAL LETTER CHI [Latn]=>[Latn]
		//IDNA:0x3A7, // (Χ) GREEK CAPITAL LETTER CHI [Grek]=>[Grek]
		//IDNA:0x1D6BE, // (𝚾) MATHEMATICAL BOLD CAPITAL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D6F8, // (𝛸) MATHEMATICAL ITALIC CAPITAL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D732, // (𝜲) MATHEMATICAL BOLD ITALIC CAPITAL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D76C, // (𝝬) MATHEMATICAL SANS-SERIF BOLD CAPITAL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D7A6, // (𝞦) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL CHI [Zyyy]=>[ALL]
		//IDNA:0x2CAC, // (Ⲭ) COPTIC CAPITAL LETTER KHI [Copt]=>[Copt]
		//IDNA:0x425, // (Х) CYRILLIC CAPITAL LETTER HA [Cyrl]=>[Cyrl]
		0x2D5D, // (ⵝ) TIFINAGH LETTER YATH [Tfng]=>[Tfng]
		0x16B7, // (ᚷ) RUNIC LETTER GEBO GYFU G [Runr]=>[Runr]
		0xA4EB, // (ꓫ) LISU LETTER SHA [Lisu]=>[Lisu]
		0x10290, // (𐊐) LYCIAN LETTER MM [Lyci]=>[Lyci]
		0x102B4, // (𐊴) CARIAN LETTER X [Cari]=>[Cari]
		0x10317, // (𐌗) OLD ITALIC LETTER EKS [Ital]=>[Ital]
		0x10527, // (𐔧) ELBASAN LETTER KHE [Elba]=>[Elba]
		0x10A69, // (𐩩) OLD SOUTH ARABIAN LETTER TAW [Sarb] 
	],
	[
		// "ẋ" <NFC(false) NFD(true)>
		'78 307', // LATIN SMALL LETTER X + COMBINING DOT ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x2A30, // (⨰) MULTIPLICATION SIGN WITH DOT ABOVE [Zyyy]=>[ALL]
	],
	[
		// "X̩" <Same>
		'58 329', // LATIN CAPITAL LETTER X + COMBINING VERTICAL LINE BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x4B2, // (Ҳ) CYRILLIC CAPITAL LETTER HA WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "X̵" <Same>
		'58 335', // LATIN CAPITAL LETTER X + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x10196, // (𐆖) ROMAN DENARIUS SIGN [Zyyy]=>[ALL]
	],
	[
		// "xi" <Same>
		'78 69', // LATIN SMALL LETTER X + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x217A, // (ⅺ) SMALL ROMAN NUMERAL ELEVEN [Latn]=>[Latn]
	],
	[
		// "xii" <Same>
		'78 69 69', // LATIN SMALL LETTER X + LATIN SMALL LETTER I + LATIN SMALL LETTER I [Latn]=>[Latn]
		//IDNA:0x217B, // (ⅻ) SMALL ROMAN NUMERAL TWELVE [Latn]=>[Latn]
	],
	[
		// "Xl" <Same>
		'58 6C', // LATIN CAPITAL LETTER X + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x216A, // (Ⅺ) ROMAN NUMERAL ELEVEN [Latn]=>[Latn]
	],
	[
		// "Xll" <Same>
		'58 6C 6C', // LATIN CAPITAL LETTER X + LATIN SMALL LETTER L + LATIN SMALL LETTER L [Latn]=>[Latn]
		//IDNA:0x216B, // (Ⅻ) ROMAN NUMERAL TWELVE [Latn]=>[Latn]
	],
	[
		// "y" <Same>
		'79', // LATIN SMALL LETTER Y [Latn]=>[Latn]
		valid(0x79), // (y) LATIN SMALL LETTER Y [Latn]=>[Latn]
		//DISALLOW:0x263, // (ɣ) LATIN SMALL LETTER GAMMA [Latn]=>[Latn]
		//DISALLOW:0x1D8C, // (ᶌ) LATIN SMALL LETTER V WITH PALATAL HOOK [Latn]=>[Latn]
		//IDNA:0xFF59, // (ｙ) FULLWIDTH LATIN SMALL LETTER Y [Latn]=>[Latn]
		//IDNA:0x1D432, // (𝐲) MATHEMATICAL BOLD SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D466, // (𝑦) MATHEMATICAL ITALIC SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D49A, // (𝒚) MATHEMATICAL BOLD ITALIC SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D4CE, // (𝓎) MATHEMATICAL SCRIPT SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D502, // (𝔂) MATHEMATICAL BOLD SCRIPT SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D536, // (𝔶) MATHEMATICAL FRAKTUR SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D56A, // (𝕪) MATHEMATICAL DOUBLE-STRUCK SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D59E, // (𝖞) MATHEMATICAL BOLD FRAKTUR SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D5D2, // (𝗒) MATHEMATICAL SANS-SERIF SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D606, // (𝘆) MATHEMATICAL SANS-SERIF BOLD SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D63A, // (𝘺) MATHEMATICAL SANS-SERIF ITALIC SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D66E, // (𝙮) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL Y [Zyyy]=>[ALL]
		//IDNA:0x1D6A2, // (𝚢) MATHEMATICAL MONOSPACE SMALL Y [Zyyy]=>[ALL]
		//DISALLOW:0x28F, // (ʏ) LATIN LETTER SMALL CAPITAL Y [Latn]=>[Latn]
		//DISALLOW:0x1EFF, // (ỿ) LATIN SMALL LETTER Y WITH LOOP [Latn]=>[Latn]
		//DISALLOW:0xAB5A, // (ꭚ) LATIN SMALL LETTER Y WITH SHORT RIGHT LEG [Latn]=>[Latn]
		0x3B3, // (γ) GREEK SMALL LETTER GAMMA [Grek]=>[Grek]
		//IDNA:0x213D, // (ℽ) DOUBLE-STRUCK SMALL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D6C4, // (𝛄) MATHEMATICAL BOLD SMALL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D6FE, // (𝛾) MATHEMATICAL ITALIC SMALL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D738, // (𝜸) MATHEMATICAL BOLD ITALIC SMALL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D772, // (𝝲) MATHEMATICAL SANS-SERIF BOLD SMALL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D7AC, // (𝞬) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL GAMMA [Zyyy]=>[ALL]
		0x443, // (у) CYRILLIC SMALL LETTER U [Cyrl]=>[Cyrl]
		0x4AF, // (ү) CYRILLIC SMALL LETTER STRAIGHT U [Cyrl]=>[Cyrl]
		0x10E7, // (ყ) GEORGIAN LETTER QAR [Geor]=>[Geor]
		0x118DC, // (𑣜) WARANG CITI SMALL LETTER HAR [Wara]=>[Wara]
		// 20221202: merge case
		// "Y" <Same>
		//'59', // LATIN CAPITAL LETTER Y [Latn]=>[Latn]
		//IDNA:0x59, // (Y) LATIN CAPITAL LETTER Y [Latn]=>[Latn]
		//IDNA:0xFF39, // (Ｙ) FULLWIDTH LATIN CAPITAL LETTER Y [Latn]=>[Latn]
		//IDNA:0x1D418, // (𝐘) MATHEMATICAL BOLD CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D44C, // (𝑌) MATHEMATICAL ITALIC CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D480, // (𝒀) MATHEMATICAL BOLD ITALIC CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D4B4, // (𝒴) MATHEMATICAL SCRIPT CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D4E8, // (𝓨) MATHEMATICAL BOLD SCRIPT CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D51C, // (𝔜) MATHEMATICAL FRAKTUR CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D550, // (𝕐) MATHEMATICAL DOUBLE-STRUCK CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D584, // (𝖄) MATHEMATICAL BOLD FRAKTUR CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D5B8, // (𝖸) MATHEMATICAL SANS-SERIF CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D5EC, // (𝗬) MATHEMATICAL SANS-SERIF BOLD CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D620, // (𝘠) MATHEMATICAL SANS-SERIF ITALIC CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D654, // (𝙔) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x1D688, // (𝚈) MATHEMATICAL MONOSPACE CAPITAL Y [Zyyy]=>[ALL]
		//IDNA:0x3A5, // (Υ) GREEK CAPITAL LETTER UPSILON [Grek]=>[Grek]
		//IDNA:0x3D2, // (ϒ) GREEK UPSILON WITH HOOK SYMBOL [Grek]=>[Grek]
		//IDNA:0x1D6BC, // (𝚼) MATHEMATICAL BOLD CAPITAL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D6F6, // (𝛶) MATHEMATICAL ITALIC CAPITAL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D730, // (𝜰) MATHEMATICAL BOLD ITALIC CAPITAL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D76A, // (𝝪) MATHEMATICAL SANS-SERIF BOLD CAPITAL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x1D7A4, // (𝞤) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL UPSILON [Zyyy]=>[ALL]
		//IDNA:0x2CA8, // (Ⲩ) COPTIC CAPITAL LETTER UA [Copt]=>[Copt]
		//IDNA:0x423, // (У) CYRILLIC CAPITAL LETTER U [Cyrl]=>[Cyrl]
		//IDNA:0x4AE, // (Ү) CYRILLIC CAPITAL LETTER STRAIGHT U [Cyrl]=>[Cyrl]
		0x13A9, // (Ꭹ) CHEROKEE LETTER GI [Cher]=>[Cher]
		0x13BD, // (Ꮍ) CHEROKEE LETTER MU [Cher]=>[Cher]
		0xA4EC, // (ꓬ) LISU LETTER YA [Lisu]=>[Lisu]
		0x16F43, // (𖽃) MIAO LETTER AH [Plrd]=>[Plrd]
		//IDNA:0x118A4, // (𑢤) WARANG CITI CAPITAL LETTER YA [Wara]=>[Wara]
		0x102B2, // (𐊲) CARIAN LETTER U [Cari]=>[Cari]
	],
	[
		// "y̔" <Same>
		'79 314', // LATIN SMALL LETTER Y + COMBINING REVERSED COMMA ABOVE [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1B4, // (ƴ) LATIN SMALL LETTER Y WITH HOOK [Latn]=>[Latn]
	],
	[
		// "y̵" <Same>
		'79 335', // LATIN SMALL LETTER Y + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x24F, // (ɏ) LATIN SMALL LETTER Y WITH STROKE [Latn]=>[Latn]
		0x4B1, // (ұ) CYRILLIC SMALL LETTER STRAIGHT U WITH STROKE [Cyrl]=>[Cyrl]
	],
	[
		// "Y̵" <Same>
		'59 335', // LATIN CAPITAL LETTER Y + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		0xA5, // (¥) YEN SIGN [Zyyy]=>[ALL]
		//IDNA:0x24E, // (Ɏ) LATIN CAPITAL LETTER Y WITH STROKE [Latn]=>[Latn]
		//IDNA:0x4B0, // (Ұ) CYRILLIC CAPITAL LETTER STRAIGHT U WITH STROKE [Cyrl]=>[Cyrl]
	],
	[
		// "ȝ" <Same>
		'21D', // LATIN SMALL LETTER YOGH [Latn]=>[Latn]
		//DISALLOW:0x21D, // (ȝ) LATIN SMALL LETTER YOGH [Latn]=>[Latn]
		//DISALLOW:0x292, // (ʒ) LATIN SMALL LETTER EZH [Latn]=>[Latn]
		//DISALLOW:0xA76B, // (ꝫ) LATIN SMALL LETTER ET [Latn]=>[Latn]
		0x2CCD, // (ⳍ) COPTIC SMALL LETTER OLD COPTIC HORI [Copt]=>[Copt]
		0x4E1, // (ӡ) CYRILLIC SMALL LETTER ABKHASIAN DZE [Cyrl]=>[Cyrl]
		//DISALLOW:0x10F3, // (ჳ) GEORGIAN LETTER WE [Geor]=>[Geor]
	],
	[
		// "z" <Same>
		'7A', // LATIN SMALL LETTER Z [Latn]=>[Latn]
		valid(0x7A), // (z) LATIN SMALL LETTER Z [Latn]=>[Latn]
		//IDNA:0x1D433, // (𝐳) MATHEMATICAL BOLD SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D467, // (𝑧) MATHEMATICAL ITALIC SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D49B, // (𝒛) MATHEMATICAL BOLD ITALIC SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D4CF, // (𝓏) MATHEMATICAL SCRIPT SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D503, // (𝔃) MATHEMATICAL BOLD SCRIPT SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D537, // (𝔷) MATHEMATICAL FRAKTUR SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D56B, // (𝕫) MATHEMATICAL DOUBLE-STRUCK SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D59F, // (𝖟) MATHEMATICAL BOLD FRAKTUR SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D5D3, // (𝗓) MATHEMATICAL SANS-SERIF SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D607, // (𝘇) MATHEMATICAL SANS-SERIF BOLD SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D63B, // (𝘻) MATHEMATICAL SANS-SERIF ITALIC SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D66F, // (𝙯) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL Z [Zyyy]=>[ALL]
		//IDNA:0x1D6A3, // (𝚣) MATHEMATICAL MONOSPACE SMALL Z [Zyyy]=>[ALL]
		//DISALLOW:0x1D22, // (ᴢ) LATIN LETTER SMALL CAPITAL Z [Latn]=>[Latn]
		//IDNA:0xAB93, // (ꮓ) CHEROKEE SMALL LETTER NO [Cher]=>[Cher]
		0x118C4, // (𑣄) WARANG CITI SMALL LETTER YA [Wara]=>[Wara]
		// 20221202: merge case
		// "Z" <Same>
		//'5A', // LATIN CAPITAL LETTER Z [Latn]=>[Latn]
		//IDNA:0x5A, // (Z) LATIN CAPITAL LETTER Z [Latn]=>[Latn]
		//DISALLOW:0x102F5, // (𐋵) COPTIC EPACT NUMBER THREE HUNDRED [Zyyy]=>[Arab Copt]
		0x118E5, // (𑣥) WARANG CITI DIGIT FIVE [Wara]=>[Wara]
		//IDNA:0xFF3A, // (Ｚ) FULLWIDTH LATIN CAPITAL LETTER Z [Latn]=>[Latn]
		//IDNA:0x2124, // (ℤ) DOUBLE-STRUCK CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x2128, // (ℨ) BLACK-LETTER CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D419, // (𝐙) MATHEMATICAL BOLD CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D44D, // (𝑍) MATHEMATICAL ITALIC CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D481, // (𝒁) MATHEMATICAL BOLD ITALIC CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D4B5, // (𝒵) MATHEMATICAL SCRIPT CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D4E9, // (𝓩) MATHEMATICAL BOLD SCRIPT CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D585, // (𝖅) MATHEMATICAL BOLD FRAKTUR CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D5B9, // (𝖹) MATHEMATICAL SANS-SERIF CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D5ED, // (𝗭) MATHEMATICAL SANS-SERIF BOLD CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D621, // (𝘡) MATHEMATICAL SANS-SERIF ITALIC CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D655, // (𝙕) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x1D689, // (𝚉) MATHEMATICAL MONOSPACE CAPITAL Z [Zyyy]=>[ALL]
		//IDNA:0x396, // (Ζ) GREEK CAPITAL LETTER ZETA [Grek]=>[Grek]
		//IDNA:0x1D6AD, // (𝚭) MATHEMATICAL BOLD CAPITAL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D6E7, // (𝛧) MATHEMATICAL ITALIC CAPITAL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D721, // (𝜡) MATHEMATICAL BOLD ITALIC CAPITAL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D75B, // (𝝛) MATHEMATICAL SANS-SERIF BOLD CAPITAL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D795, // (𝞕) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL ZETA [Zyyy]=>[ALL]
		0x13C3, // (Ꮓ) CHEROKEE LETTER NO [Cher]=>[Cher]
		0xA4DC, // (ꓜ) LISU LETTER DZA [Lisu]=>[Lisu]
		//IDNA:0x118A9, // (𑢩) WARANG CITI CAPITAL LETTER O [Wara]=>[Wara]
		0x104FB, // (𐓻) OSAGE SMALL LETTER ZHA [Osge]=>[osge]
	],
	[
		// "z̨" <Same>
		'7A 328', // LATIN SMALL LETTER Z + COMBINING OGONEK [Latn,Zinh]=>[Latn]
		//DISALLOW:0x290, // (ʐ) LATIN SMALL LETTER Z WITH RETROFLEX HOOK [Latn]=>[Latn]
	],
	[
		// "z̵" <Same>
		'7A 335', // LATIN SMALL LETTER Z + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1B6, // (ƶ) LATIN SMALL LETTER Z WITH STROKE [Latn]=>[Latn]
	],
	[
		// "Z̵" <Same>
		'5A 335', // LATIN CAPITAL LETTER Z + COMBINING SHORT STROKE OVERLAY [Latn,Zinh]=>[Latn]
		//IDNA:0x1B5, // (Ƶ) LATIN CAPITAL LETTER Z WITH STROKE [Latn]=>[Latn]
	],
	[
		// "z̦" <Same>
		'7A 326', // LATIN SMALL LETTER Z + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//DISALLOW:0x225, // (ȥ) LATIN SMALL LETTER Z WITH HOOK [Latn]=>[Latn]
	],
	[
		// "Z̦" <Same>
		'5A 326', // LATIN CAPITAL LETTER Z + COMBINING COMMA BELOW [Latn,Zinh]=>[Latn]
		//IDNA:0x224, // (Ȥ) LATIN CAPITAL LETTER Z WITH HOOK [Latn]=>[Latn]
	],
	[
		// "z̴" <Same>
		'7A 334', // LATIN SMALL LETTER Z + COMBINING TILDE OVERLAY [Latn,Zinh]=>[Latn]
		//DISALLOW:0x1D76, // (ᵶ) LATIN SMALL LETTER Z WITH MIDDLE TILDE [Latn]=>[Latn]
	],
	[
		// "þ" <Same>
		'FE', // LATIN SMALL LETTER THORN [Latn]=>[Latn]
		//DISALLOW:0xFE, // (þ) LATIN SMALL LETTER THORN [Latn]=>[Latn]
		//DISALLOW:0x1BF, // (ƿ) LATIN LETTER WYNN [Latn]=>[Latn]
		//DISALLOW:0x3F8, // (ϸ) GREEK SMALL LETTER SHO [Grek]=>[Grek]
	],
	[
		// "Þ" <Same>
		'DE', // LATIN CAPITAL LETTER THORN [Latn]=>[Latn]
		//IDNA:0xDE, // (Þ) LATIN CAPITAL LETTER THORN [Latn]=>[Latn]
		//IDNA:0x3F7, // (Ϸ) GREEK CAPITAL LETTER SHO [Grek]=>[Grek]
		//IDNA:0x104C4, // (𐓄) OSAGE CAPITAL LETTER PA [Osge]=>[Osge]
	],
	[
		// "ꝰ" <Same>
		'A770', // MODIFIER LETTER US [Latn]=>[Latn]
		//IDNA:0xA770, // (ꝰ) MODIFIER LETTER US [Latn]=>[Latn]
		//IDNA:0x2079, // (⁹) SUPERSCRIPT NINE [Zyyy]=>[ALL]
	],
	[
		// "ƨ" <Same>
		'1A8', // LATIN SMALL LETTER TONE TWO [Latn]=>[Latn]
		//DISALLOW:0x1A8, // (ƨ) LATIN SMALL LETTER TONE TWO [Latn]=>[Latn]
		//DISALLOW:0x1D24, // (ᴤ) LATIN LETTER VOICED LARYNGEAL SPIRANT [Latn]=>[Latn]
		0x3E9, // (ϩ) COPTIC SMALL LETTER HORI [Copt]=>[Copt]
		//DISALLOW:0xA645, // (ꙅ) CYRILLIC SMALL LETTER REVERSED DZE [Cyrl]=>[Cyrl]
	],
	[
		// "ƅ" <Same>
		'185', // LATIN SMALL LETTER TONE SIX [Latn]=>[Latn]
		//DISALLOW:0x185, // (ƅ) LATIN SMALL LETTER TONE SIX [Latn]=>[Latn]
		0x44C, // (ь) CYRILLIC SMALL LETTER SOFT SIGN [Cyrl]=>[Cyrl]
		//IDNA:0xAB9F, // (ꮟ) CHEROKEE SMALL LETTER SI [Cher]=>[Cher]
	],
	[
		// "ƅi" <Same>
		'185 69', // LATIN SMALL LETTER TONE SIX + LATIN SMALL LETTER I [Latn]=>[Latn]
		0x44B, // (ы) CYRILLIC SMALL LETTER YERU [Cyrl]=>[Cyrl]
	],
	[
		// "ɂ" <Same>
		'242', // LATIN SMALL LETTER GLOTTAL STOP [Latn]=>[Latn]
		//DISALLOW:0x242, // (ɂ) LATIN SMALL LETTER GLOTTAL STOP [Latn]=>[Latn]
		//IDNA:0xAB7E, // (ꭾ) CHEROKEE SMALL LETTER HE [Cher]=>[Cher]
	],
	[
		// "ˁ" <Same>
		'2C1', // MODIFIER LETTER REVERSED GLOTTAL STOP [Zyyy]=>[ALL]
		//DISALLOW:0x2C1, // (ˁ) MODIFIER LETTER REVERSED GLOTTAL STOP [Zyyy]=>[ALL]
		//IDNA:0x2E4, // (ˤ) MODIFIER LETTER SMALL REVERSED GLOTTAL STOP [Latn]=>[Latn]
	],
	[
		// "ʡ" <Same>
		'2A1', // LATIN LETTER GLOTTAL STOP WITH STROKE [Latn]=>[Latn]
		//DISALLOW:0x2A1, // (ʡ) LATIN LETTER GLOTTAL STOP WITH STROKE [Latn]=>[Latn]
		0xA6CD, // (ꛍ) BAMUM LETTER LU [Bamu]=>[Bamu]
	],
	[
		// "ʘ" <Same>
		'298', // LATIN LETTER BILABIAL CLICK [Latn]=>[Latn]
		//DISALLOW:0x298, // (ʘ) LATIN LETTER BILABIAL CLICK [Latn]=>[Latn]
		//DISALLOW:0x2299, // (⊙) CIRCLED DOT OPERATOR [Zyyy]=>[ALL]
		0x2609, // (☉) SUN [Zyyy]=>[ALL]
		//DISALLOW:0x2A00, // (⨀) N-ARY CIRCLED DOT OPERATOR [Zyyy]=>[ALL]
		//IDNA:0xA668, // (Ꙩ) CYRILLIC CAPITAL LETTER MONOCULAR O [Cyrl]=>[Cyrl]
		0x2D59, // (ⵙ) TIFINAGH LETTER YAS [Tfng]=>[Tfng]
		//IDNA:0x104C3, // (𐓃) OSAGE CAPITAL LETTER OIN [Osge]=>[Osge]
	],
	[
		// "Γ" <Same>
		'393', // GREEK CAPITAL LETTER GAMMA [Grek]=>[Grek]
		//IDNA:0x393, // (Γ) GREEK CAPITAL LETTER GAMMA [Grek]=>[Grek]
		//IDNA:0x213E, // (ℾ) DOUBLE-STRUCK CAPITAL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D6AA, // (𝚪) MATHEMATICAL BOLD CAPITAL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D6E4, // (𝛤) MATHEMATICAL ITALIC CAPITAL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D71E, // (𝜞) MATHEMATICAL BOLD ITALIC CAPITAL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D758, // (𝝘) MATHEMATICAL SANS-SERIF BOLD CAPITAL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x1D792, // (𝞒) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL GAMMA [Zyyy]=>[ALL]
		//IDNA:0x2C84, // (Ⲅ) COPTIC CAPITAL LETTER GAMMA [Copt]=>[Copt]
		//IDNA:0x413, // (Г) CYRILLIC CAPITAL LETTER GHE [Cyrl]=>[Cyrl]
		0x13B1, // (Ꮁ) CHEROKEE LETTER HU [Cher]=>[Cher]
		0x14A5, // (ᒥ) CANADIAN SYLLABICS MI [Cans]=>[Cans]
		0x16F07, // (𖼇) MIAO LETTER FA [Plrd]=>[Plrd]
	],
	[
		// "Γ̵" <Same>
		'393 335', // GREEK CAPITAL LETTER GAMMA + COMBINING SHORT STROKE OVERLAY [Grek,Zinh]=>[Grek]
		//IDNA:0x492, // (Ғ) CYRILLIC CAPITAL LETTER GHE WITH STROKE [Cyrl]=>[Cyrl]
	],
	[
		// "Γ·" <Same>
		'393 B7', // GREEK CAPITAL LETTER GAMMA + MIDDLE DOT [Grek,Zyyy]=>[Grek]
		0x14AF, // (ᒯ) CANADIAN SYLLABICS WEST-CREE MWI [Cans]=>[Cans]
	],
	[
		// "Γ'" <Same>
		'393 27', // GREEK CAPITAL LETTER GAMMA + APOSTROPHE [Grek,Zyyy]=>[Grek]
		//IDNA:0x490, // (Ґ) CYRILLIC CAPITAL LETTER GHE WITH UPTURN [Cyrl]=>[Cyrl]
	],
	[
		// "Δ" <Same>
		'394', // GREEK CAPITAL LETTER DELTA [Grek]=>[Grek]
		//IDNA:0x394, // (Δ) GREEK CAPITAL LETTER DELTA [Grek]=>[Grek]
		//DISALLOW:0x2206, // (∆) INCREMENT [Zyyy]=>[ALL]
		0x25B3, // (△) WHITE UP-POINTING TRIANGLE [Zyyy]=>[ALL]
		//DISALLOW:0x1F702, // (🜂) ALCHEMICAL SYMBOL FOR FIRE [Zyyy]=>[ALL]
		//IDNA:0x1D6AB, // (𝚫) MATHEMATICAL BOLD CAPITAL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D6E5, // (𝛥) MATHEMATICAL ITALIC CAPITAL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D71F, // (𝜟) MATHEMATICAL BOLD ITALIC CAPITAL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D759, // (𝝙) MATHEMATICAL SANS-SERIF BOLD CAPITAL DELTA [Zyyy]=>[ALL]
		//IDNA:0x1D793, // (𝞓) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL DELTA [Zyyy]=>[ALL]
		//IDNA:0x2C86, // (Ⲇ) COPTIC CAPITAL LETTER DALDA [Copt]=>[Copt]
		0x2D60, // (ⵠ) TIFINAGH LETTER YAV [Tfng]=>[Tfng]
		0x1403, // (ᐃ) CANADIAN SYLLABICS I [Cans]=>[Cans]
		0x16F1A, // (𖼚) MIAO LETTER TLHA [Plrd]=>[Plrd]
		0x10285, // (𐊅) LYCIAN LETTER D [Lyci]=>[Lyci]
		0x102A3, // (𐊣) CARIAN LETTER L [Cari]=>[Cari]
	],
	[
		// "Δ̲" <Same>
		'394 332', // GREEK CAPITAL LETTER DELTA + COMBINING LOW LINE [Grek,Zinh]=>[Grek]
		//DISALLOW:0x2359, // (⍙) APL FUNCTIONAL SYMBOL DELTA UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "Δ·" <Same>
		'394 B7', // GREEK CAPITAL LETTER DELTA + MIDDLE DOT [Grek,Zyyy]=>[Grek]
		0x140F, // (ᐏ) CANADIAN SYLLABICS WEST-CREE WI [Cans]=>[Cans]
	],
	[
		// "Δᐠ" <Same>
		'394 1420', // GREEK CAPITAL LETTER DELTA + CANADIAN SYLLABICS FINAL GRAVE [Grek,Cans]=>[]
		0x142C, // (ᐬ) CANADIAN SYLLABICS IN [Cans]=>[Cans]
	],
	[
		// "ϝ" <Same>
		'3DD', // GREEK SMALL LETTER DIGAMMA [Grek]=>[Grek]
		//DISALLOW:0x3DD, // (ϝ) GREEK SMALL LETTER DIGAMMA [Grek]=>[Grek]
		//IDNA:0x1D7CB, // (𝟋) MATHEMATICAL BOLD SMALL DIGAMMA [Zyyy]=>[ALL]
	],
	[
		// "ζ" <Same>
		'3B6', // GREEK SMALL LETTER ZETA [Grek]=>[Grek]
		0x3B6, // (ζ) GREEK SMALL LETTER ZETA [Grek]=>[Grek]
		//IDNA:0x1D6C7, // (𝛇) MATHEMATICAL BOLD SMALL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D701, // (𝜁) MATHEMATICAL ITALIC SMALL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D73B, // (𝜻) MATHEMATICAL BOLD ITALIC SMALL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D775, // (𝝵) MATHEMATICAL SANS-SERIF BOLD SMALL ZETA [Zyyy]=>[ALL]
		//IDNA:0x1D7AF, // (𝞯) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL ZETA [Zyyy]=>[ALL]
	],
	[
		// "ϗ" <Same>
		'3D7', // GREEK KAI SYMBOL [Grek]=>[Grek]
		//DISALLOW:0x3D7, // (ϗ) GREEK KAI SYMBOL [Grek]=>[Grek]
		0x2CE4, // (ⳤ) COPTIC SYMBOL KAI [Copt]=>[Copt]
	],
	[
		// "λ" <Same>
		'3BB', // GREEK SMALL LETTER LAMDA [Grek]=>[Grek]
		0x3BB, // (λ) GREEK SMALL LETTER LAMDA [Grek]=>[Grek]
		//IDNA:0x1D6CC, // (𝛌) MATHEMATICAL BOLD SMALL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D706, // (𝜆) MATHEMATICAL ITALIC SMALL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D740, // (𝝀) MATHEMATICAL BOLD ITALIC SMALL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D77A, // (𝝺) MATHEMATICAL SANS-SERIF BOLD SMALL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x1D7B4, // (𝞴) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL LAMDA [Zyyy]=>[ALL]
		//IDNA:0x2C96, // (Ⲗ) COPTIC CAPITAL LETTER LAULA [Copt]=>[Copt]
		0x104DB, // (𐓛) OSAGE SMALL LETTER AH [Osge]=>[Osge]
	],
	[
		// "μ" <Same>
		'3BC', // GREEK SMALL LETTER MU [Grek]=>[Grek]
		0x3BC, // (μ) GREEK SMALL LETTER MU [Grek]=>[Grek]
		//IDNA:0xB5, // (µ) MICRO SIGN [Zyyy]=>[ALL]
		//IDNA:0x1D6CD, // (𝛍) MATHEMATICAL BOLD SMALL MU [Zyyy]=>[ALL]
		//IDNA:0x1D707, // (𝜇) MATHEMATICAL ITALIC SMALL MU [Zyyy]=>[ALL]
		//IDNA:0x1D741, // (𝝁) MATHEMATICAL BOLD ITALIC SMALL MU [Zyyy]=>[ALL]
		//IDNA:0x1D77B, // (𝝻) MATHEMATICAL SANS-SERIF BOLD SMALL MU [Zyyy]=>[ALL]
		//IDNA:0x1D7B5, // (𝞵) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL MU [Zyyy]=>[ALL]
	],
	[
		// "ξ" <Same>
		'3BE', // GREEK SMALL LETTER XI [Grek]=>[Grek]
		0x3BE, // (ξ) GREEK SMALL LETTER XI [Grek]=>[Grek]
		//IDNA:0x1D6CF, // (𝛏) MATHEMATICAL BOLD SMALL XI [Zyyy]=>[ALL]
		//IDNA:0x1D709, // (𝜉) MATHEMATICAL ITALIC SMALL XI [Zyyy]=>[ALL]
		//IDNA:0x1D743, // (𝝃) MATHEMATICAL BOLD ITALIC SMALL XI [Zyyy]=>[ALL]
		//IDNA:0x1D77D, // (𝝽) MATHEMATICAL SANS-SERIF BOLD SMALL XI [Zyyy]=>[ALL]
		//IDNA:0x1D7B7, // (𝞷) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL XI [Zyyy]=>[ALL]
	],
	[
		// "Ξ" <Same>
		'39E', // GREEK CAPITAL LETTER XI [Grek]=>[Grek]
		//IDNA:0x39E, // (Ξ) GREEK CAPITAL LETTER XI [Grek]=>[Grek]
		//IDNA:0x1D6B5, // (𝚵) MATHEMATICAL BOLD CAPITAL XI [Zyyy]=>[ALL]
		//IDNA:0x1D6EF, // (𝛯) MATHEMATICAL ITALIC CAPITAL XI [Zyyy]=>[ALL]
		//IDNA:0x1D729, // (𝜩) MATHEMATICAL BOLD ITALIC CAPITAL XI [Zyyy]=>[ALL]
		//IDNA:0x1D763, // (𝝣) MATHEMATICAL SANS-SERIF BOLD CAPITAL XI [Zyyy]=>[ALL]
		//IDNA:0x1D79D, // (𝞝) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL XI [Zyyy]=>[ALL]
	],
	[
		// "π" <Same>
		'3C0', // GREEK SMALL LETTER PI [Grek]=>[Grek]
		valid(0x3C0), // (π) GREEK SMALL LETTER PI [Grek]=>[Grek]
		//IDNA:0x3D6, // (ϖ) GREEK PI SYMBOL [Grek]=>[Grek]
		//IDNA:0x213C, // (ℼ) DOUBLE-STRUCK SMALL PI [Zyyy]=>[ALL]
		//IDNA:0x1D6D1, // (𝛑) MATHEMATICAL BOLD SMALL PI [Zyyy]=>[ALL]
		//IDNA:0x1D6E1, // (𝛡) MATHEMATICAL BOLD PI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D70B, // (𝜋) MATHEMATICAL ITALIC SMALL PI [Zyyy]=>[ALL]
		//IDNA:0x1D71B, // (𝜛) MATHEMATICAL ITALIC PI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D745, // (𝝅) MATHEMATICAL BOLD ITALIC SMALL PI [Zyyy]=>[ALL]
		//IDNA:0x1D755, // (𝝕) MATHEMATICAL BOLD ITALIC PI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D77F, // (𝝿) MATHEMATICAL SANS-SERIF BOLD SMALL PI [Zyyy]=>[ALL]
		//IDNA:0x1D78F, // (𝞏) MATHEMATICAL SANS-SERIF BOLD PI SYMBOL [Zyyy]=>[ALL]
		//IDNA:0x1D7B9, // (𝞹) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL PI [Zyyy]=>[ALL]
		//IDNA:0x1D7C9, // (𝟉) MATHEMATICAL SANS-SERIF BOLD ITALIC PI SYMBOL [Zyyy]=>[ALL]
		//DISALLOW:0x1D28, // (ᴨ) GREEK LETTER SMALL CAPITAL PI [Grek]=>[Grek]
		valid(0x43F), // (п) CYRILLIC SMALL LETTER PE [Cyrl]=>[Cyrl]
	],
	[
		// "Π" <Same>
		'3A0', // GREEK CAPITAL LETTER PI [Grek]=>[Grek]
		//IDNA:0x3A0, // (Π) GREEK CAPITAL LETTER PI [Grek]=>[Grek]
		0x220F, // (∏) N-ARY PRODUCT [Zyyy]=>[ALL]
		//IDNA:0x213F, // (ℿ) DOUBLE-STRUCK CAPITAL PI [Zyyy]=>[ALL]
		//IDNA:0x1D6B7, // (𝚷) MATHEMATICAL BOLD CAPITAL PI [Zyyy]=>[ALL]
		//IDNA:0x1D6F1, // (𝛱) MATHEMATICAL ITALIC CAPITAL PI [Zyyy]=>[ALL]
		//IDNA:0x1D72B, // (𝜫) MATHEMATICAL BOLD ITALIC CAPITAL PI [Zyyy]=>[ALL]
		//IDNA:0x1D765, // (𝝥) MATHEMATICAL SANS-SERIF BOLD CAPITAL PI [Zyyy]=>[ALL]
		//IDNA:0x1D79F, // (𝞟) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL PI [Zyyy]=>[ALL]
		//IDNA:0x2CA0, // (Ⲡ) COPTIC CAPITAL LETTER PI [Copt]=>[Copt]
		//IDNA:0x41F, // (П) CYRILLIC CAPITAL LETTER PE [Cyrl]=>[Cyrl]
		0xA6DB, // (ꛛ) BAMUM LETTER NA [Bamu]=>[Bamu]
	],
	[
		// "Ϙ" <Same>
		'3D8', // GREEK LETTER ARCHAIC KOPPA [Grek]=>[Grek]
		//IDNA:0x3D8, // (Ϙ) GREEK LETTER ARCHAIC KOPPA [Grek]=>[Grek]
		0x102AD, // (𐊭) CARIAN LETTER T [Cari]=>[Cari]
		0x10312, // (𐌒) OLD ITALIC LETTER KU [Ital]=>[Ital]
	],
	[
		// "ς" <Same>
		'3C2', // GREEK SMALL LETTER FINAL SIGMA [Grek]=>[Grek]
		0x3C2, // (ς) GREEK SMALL LETTER FINAL SIGMA [Grek]=>[Grek]
		//DISALLOW:0x3DB, // (ϛ) GREEK SMALL LETTER STIGMA [Grek]=>[Grek]
		//IDNA:0x1D6D3, // (𝛓) MATHEMATICAL BOLD SMALL FINAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D70D, // (𝜍) MATHEMATICAL ITALIC SMALL FINAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D747, // (𝝇) MATHEMATICAL BOLD ITALIC SMALL FINAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D781, // (𝞁) MATHEMATICAL SANS-SERIF BOLD SMALL FINAL SIGMA [Zyyy]=>[ALL]
		//IDNA:0x1D7BB, // (𝞻) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL FINAL SIGMA [Zyyy]=>[ALL]
	],
	[
		// "Φ" <Same>
		'3A6', // GREEK CAPITAL LETTER PHI [Grek]=>[Grek]
		//IDNA:0x3A6, // (Φ) GREEK CAPITAL LETTER PHI [Grek]=>[Grek]
		//IDNA:0x1D6BD, // (𝚽) MATHEMATICAL BOLD CAPITAL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D6F7, // (𝛷) MATHEMATICAL ITALIC CAPITAL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D731, // (𝜱) MATHEMATICAL BOLD ITALIC CAPITAL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D76B, // (𝝫) MATHEMATICAL SANS-SERIF BOLD CAPITAL PHI [Zyyy]=>[ALL]
		//IDNA:0x1D7A5, // (𝞥) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL PHI [Zyyy]=>[ALL]
		//IDNA:0x2CAA, // (Ⲫ) COPTIC CAPITAL LETTER FI [Copt]=>[Copt]
		//IDNA:0x424, // (Ф) CYRILLIC CAPITAL LETTER EF [Cyrl]=>[Cyrl]
		//IDNA:0x553, // (Փ) ARMENIAN CAPITAL LETTER PIWR [Armn]=>[Armn]
		0x1240, // (ቀ) ETHIOPIC SYLLABLE QA [Ethi]=>[Ethi]
		0x16F0, // (ᛰ) RUNIC BELGTHOR SYMBOL [Runr]=>[Runr]
		0x102B3, // (𐊳) CARIAN LETTER NN [Cari]=>[Cari]
	],
	[
		// "χ" <Same>
		'3C7', // GREEK SMALL LETTER CHI [Grek]=>[Grek]
		0x3C7, // (χ) GREEK SMALL LETTER CHI [Grek]=>[Grek]
		//DISALLOW:0xAB53, // (ꭓ) LATIN SMALL LETTER CHI [Latn]=>[Latn]
		//DISALLOW:0xAB55, // (ꭕ) LATIN SMALL LETTER CHI WITH LOW LEFT SERIF [Latn]=>[Latn]
		//IDNA:0x1D6D8, // (𝛘) MATHEMATICAL BOLD SMALL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D712, // (𝜒) MATHEMATICAL ITALIC SMALL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D74C, // (𝝌) MATHEMATICAL BOLD ITALIC SMALL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D786, // (𝞆) MATHEMATICAL SANS-SERIF BOLD SMALL CHI [Zyyy]=>[ALL]
		//IDNA:0x1D7C0, // (𝟀) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL CHI [Zyyy]=>[ALL]
		0x2CAD, // (ⲭ) COPTIC SMALL LETTER KHI [Copt]=>[Copt]
	],
	[
		// "ψ" <Same>
		'3C8', // GREEK SMALL LETTER PSI [Grek]=>[Grek]
		0x3C8, // (ψ) GREEK SMALL LETTER PSI [Grek]=>[Grek]
		//IDNA:0x1D6D9, // (𝛙) MATHEMATICAL BOLD SMALL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D713, // (𝜓) MATHEMATICAL ITALIC SMALL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D74D, // (𝝍) MATHEMATICAL BOLD ITALIC SMALL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D787, // (𝞇) MATHEMATICAL SANS-SERIF BOLD SMALL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D7C1, // (𝟁) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL PSI [Zyyy]=>[ALL]
		//DISALLOW:0x471, // (ѱ) CYRILLIC SMALL LETTER PSI [Cyrl]=>[Cyrl]
		0x104F9, // (𐓹) OSAGE SMALL LETTER GHA [Osge]=>[Osge]
	],
	[
		// "Ψ" <Same>
		'3A8', // GREEK CAPITAL LETTER PSI [Grek]=>[Grek]
		//IDNA:0x3A8, // (Ψ) GREEK CAPITAL LETTER PSI [Grek]=>[Grek]
		//IDNA:0x1D6BF, // (𝚿) MATHEMATICAL BOLD CAPITAL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D6F9, // (𝛹) MATHEMATICAL ITALIC CAPITAL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D733, // (𝜳) MATHEMATICAL BOLD ITALIC CAPITAL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D76D, // (𝝭) MATHEMATICAL SANS-SERIF BOLD CAPITAL PSI [Zyyy]=>[ALL]
		//IDNA:0x1D7A7, // (𝞧) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL PSI [Zyyy]=>[ALL]
		//IDNA:0x2CAE, // (Ⲯ) COPTIC CAPITAL LETTER PSI [Copt]=>[Copt]
		//IDNA:0x470, // (Ѱ) CYRILLIC CAPITAL LETTER PSI [Cyrl]=>[Cyrl]
		//IDNA:0x104D1, // (𐓑) OSAGE CAPITAL LETTER GHA [Osge]=>[Osge]
		0x16D8, // (ᛘ) RUNIC LETTER LONG-BRANCH-MADR M [Runr]=>[Runr]
		0x102B5, // (𐊵) CARIAN LETTER N [Cari]=>[Cari]
	],
	[
		// "ω" <Same>
		'3C9', // GREEK SMALL LETTER OMEGA [Grek]=>[Grek]
		0x3C9, // (ω) GREEK SMALL LETTER OMEGA [Grek]=>[Grek]
		//DISALLOW:0x2375, // (⍵) APL FUNCTIONAL SYMBOL OMEGA [Zyyy]=>[ALL]
		//DISALLOW:0xA7B7, // (ꞷ) LATIN SMALL LETTER OMEGA [Latn]=>[Latn]
		//IDNA:0x1D6DA, // (𝛚) MATHEMATICAL BOLD SMALL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D714, // (𝜔) MATHEMATICAL ITALIC SMALL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D74E, // (𝝎) MATHEMATICAL BOLD ITALIC SMALL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D788, // (𝞈) MATHEMATICAL SANS-SERIF BOLD SMALL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D7C2, // (𝟂) MATHEMATICAL SANS-SERIF BOLD ITALIC SMALL OMEGA [Zyyy]=>[ALL]
		0x2CB1, // (ⲱ) COPTIC SMALL LETTER OOU [Copt]=>[Copt]
		//DISALLOW:0xA64D, // (ꙍ) CYRILLIC SMALL LETTER BROAD OMEGA [Cyrl]=>[Cyrl]
	],
	[
		// "Ω" <Same>
		'3A9', // GREEK CAPITAL LETTER OMEGA [Grek]=>[Grek]
		//IDNA:0x3A9, // (Ω) GREEK CAPITAL LETTER OMEGA [Grek]=>[Grek]
		//IDNA:0x2126, // (Ω) OHM SIGN [Grek]=>[Grek]
		//IDNA:0x1D6C0, // (𝛀) MATHEMATICAL BOLD CAPITAL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D6FA, // (𝛺) MATHEMATICAL ITALIC CAPITAL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D734, // (𝜴) MATHEMATICAL BOLD ITALIC CAPITAL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D76E, // (𝝮) MATHEMATICAL SANS-SERIF BOLD CAPITAL OMEGA [Zyyy]=>[ALL]
		//IDNA:0x1D7A8, // (𝞨) MATHEMATICAL SANS-SERIF BOLD ITALIC CAPITAL OMEGA [Zyyy]=>[ALL]
		0x162F, // (ᘯ) CANADIAN SYLLABICS CARRIER LHO [Cans]=>[Cans]
		0x1635, // (ᘵ) CANADIAN SYLLABICS CARRIER TLHO [Cans]=>[Cans]
		0x102B6, // (𐊶) CARIAN LETTER TT2 [Cari]=>[Cari]
	],
	[
		// "ω̲" <Same>
		'3C9 332', // GREEK SMALL LETTER OMEGA + COMBINING LOW LINE [Grek,Zinh]=>[Grek]
		//DISALLOW:0x2379, // (⍹) APL FUNCTIONAL SYMBOL OMEGA UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "ῴ" <NFC(true) NFD(false)>
		'1FF4', // GREEK SMALL LETTER OMEGA WITH OXIA AND YPOGEGRAMMENI [Grek]=>[Grek]
		//IDNA:0x1FF4, // (ῴ) GREEK SMALL LETTER OMEGA WITH OXIA AND YPOGEGRAMMENI [Grek]=>[Grek]
		//IDNA:0x1F7D, // (ώ) GREEK SMALL LETTER OMEGA WITH OXIA [Grek]=>[Grek]
	],
	[
		// "Ⲷ" <Same>
		'2CB6', // COPTIC CAPITAL LETTER CRYPTOGRAMMIC EIE [Copt]=>[Copt]
		//IDNA:0x2CB6, // (Ⲷ) COPTIC CAPITAL LETTER CRYPTOGRAMMIC EIE [Copt]=>[Copt]
		//DISALLOW:0x2630, // (☰) TRIGRAM FOR HEAVEN [Zyyy]=>[ALL]
	],
	[
		// "Ϭ" <Same>
		'3EC', // COPTIC CAPITAL LETTER SHIMA [Copt]=>[Copt]
		//IDNA:0x3EC, // (Ϭ) COPTIC CAPITAL LETTER SHIMA [Copt]=>[Copt]
		//IDNA:0x2CDC, // (Ⳝ) COPTIC CAPITAL LETTER OLD NUBIAN SHIMA [Copt]=>[Copt]
	],
	[
		// "ж̩" <Same>
		'436 329', // CYRILLIC SMALL LETTER ZHE + COMBINING VERTICAL LINE BELOW [Cyrl,Zinh]=>[Cyrl]
		0x497, // (җ) CYRILLIC SMALL LETTER ZHE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "Ж̩" <Same>
		'416 329', // CYRILLIC CAPITAL LETTER ZHE + COMBINING VERTICAL LINE BELOW [Cyrl,Zinh]=>[Cyrl]
		//IDNA:0x496, // (Җ) CYRILLIC CAPITAL LETTER ZHE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "И" <Same>
		'418', // CYRILLIC CAPITAL LETTER I [Cyrl]=>[Cyrl]
		//IDNA:0x418, // (И) CYRILLIC CAPITAL LETTER I [Cyrl]=>[Cyrl]
		//DISALLOW:0x1D20B, // (𝈋) GREEK VOCAL NOTATION SYMBOL-12 [Grek]=>[Grek]
		//IDNA:0x376, // (Ͷ) GREEK CAPITAL LETTER PAMPHYLIAN DIGAMMA [Grek]=>[Grek]
		0xA6A1, // (ꚡ) BAMUM LETTER KA [Bamu]=>[Bamu]
		//IDNA:0x10425, // (𐐥) DESERET CAPITAL LETTER ENG [Dsrt]=>[Dsrt]
	],
	[
		// "Ѝ" <NFC(true) NFD(false)>
		'40D', // CYRILLIC CAPITAL LETTER I WITH GRAVE [Cyrl]=>[Cyrl]
		//IDNA:0x40D, // (Ѝ) CYRILLIC CAPITAL LETTER I WITH GRAVE [Cyrl]=>[Cyrl]
		//IDNA:0x419, // (Й) CYRILLIC CAPITAL LETTER SHORT I [Cyrl]=>[Cyrl]
	],
	[
		// "Ѝ̦" <NFC(true) NFD(false)>
		'40D 326', // CYRILLIC CAPITAL LETTER I WITH GRAVE + COMBINING COMMA BELOW [Cyrl,Zinh]=>[Cyrl]
		//IDNA:0x48A, // (Ҋ) CYRILLIC CAPITAL LETTER SHORT I WITH TAIL [Cyrl]=>[Cyrl]
	],
	[
		// "й" <NFC(true) NFD(false)>
		'439', // CYRILLIC SMALL LETTER SHORT I [Cyrl]=>[Cyrl]
		0x439, // (й) CYRILLIC SMALL LETTER SHORT I [Cyrl]=>[Cyrl]
		0x45D, // (ѝ) CYRILLIC SMALL LETTER I WITH GRAVE [Cyrl]=>[Cyrl]
	],
	[
		// "й̦" <NFC(true) NFD(false)>
		'439 326', // CYRILLIC SMALL LETTER SHORT I + COMBINING COMMA BELOW [Cyrl,Zinh]=>[Cyrl]
		0x48B, // (ҋ) CYRILLIC SMALL LETTER SHORT I WITH TAIL [Cyrl]=>[Cyrl]
	],
	[
		// "Ӄ" <Same>
		'4C3', // CYRILLIC CAPITAL LETTER KA WITH HOOK [Cyrl]=>[Cyrl]
		//IDNA:0x4C3, // (Ӄ) CYRILLIC CAPITAL LETTER KA WITH HOOK [Cyrl]=>[Cyrl]
		//IDNA:0x104BC, // (𐒼) OSAGE CAPITAL LETTER KA [Osge]=>[Osge]
	],
	[
		// "л" <Same>
		'43B', // CYRILLIC SMALL LETTER EL [Cyrl]=>[Cyrl]
		0x43B, // (л) CYRILLIC SMALL LETTER EL [Cyrl]=>[Cyrl]
		//DISALLOW:0x1D2B, // (ᴫ) CYRILLIC LETTER SMALL CAPITAL EL [Cyrl]=>[Cyrl]
	],
	[
		// "л̦" <Same>
		'43B 326', // CYRILLIC SMALL LETTER EL + COMBINING COMMA BELOW [Cyrl,Zinh]=>[Cyrl]
		0x4C6, // (ӆ) CYRILLIC SMALL LETTER EL WITH TAIL [Cyrl]=>[Cyrl]
	],
	[
		// "љ" <Same>
		'459', // CYRILLIC SMALL LETTER LJE [Cyrl]=>[Cyrl]
		0x459, // (љ) CYRILLIC SMALL LETTER LJE [Cyrl]=>[Cyrl]
		//DISALLOW:0xAB60, // (ꭠ) LATIN SMALL LETTER SAKHA YAT [Latn]=>[Latn]
	],
	[
		// "ꙩ" <Same>
		'A669', // CYRILLIC SMALL LETTER MONOCULAR O [Cyrl]=>[Cyrl]
		//DISALLOW:0xA669, // (ꙩ) CYRILLIC SMALL LETTER MONOCULAR O [Cyrl]=>[Cyrl]
		0x104EB, // (𐓫) OSAGE SMALL LETTER OIN [Osge]=>[Osge]
	],
	[
		// "◌ⷬ" <Same>
		'2DEC', // COMBINING CYRILLIC LETTER ER [Cyrl]=>[Cyrl]
		//DISALLOW:0x2DEC, // (◌ⷬ) COMBINING CYRILLIC LETTER ER [Cyrl]=>[Cyrl]
		//DISALLOW:0x1DEE, // (◌ᷮ) COMBINING LATIN SMALL LETTER P [Zinh]=>[ALL]
	],
	[
		// "Ћ" <Same>
		'40B', // CYRILLIC CAPITAL LETTER TSHE [Cyrl]=>[Cyrl]
		//IDNA:0x40B, // (Ћ) CYRILLIC CAPITAL LETTER TSHE [Cyrl]=>[Cyrl]
		//IDNA:0x104CD, // (𐓍) OSAGE CAPITAL LETTER DHA [Osge]=>[Osge]
	],
	[
		// "Ӿ" <Same>
		'4FE', // CYRILLIC CAPITAL LETTER HA WITH STROKE [Cyrl]=>[Cyrl]
		//IDNA:0x4FE, // (Ӿ) CYRILLIC CAPITAL LETTER HA WITH STROKE [Cyrl]=>[Cyrl]
		//DISALLOW:0x1D202, // (𝈂) GREEK VOCAL NOTATION SYMBOL-3 [Grek]=>[Grek]
	],
	[
		// "Ѡ" <Same>
		'460', // CYRILLIC CAPITAL LETTER OMEGA [Cyrl]=>[Cyrl]
		//IDNA:0x460, // (Ѡ) CYRILLIC CAPITAL LETTER OMEGA [Cyrl]=>[Cyrl]
		//DISALLOW:0x1D222, // (𝈢) GREEK INSTRUMENTAL NOTATION SYMBOL-8 [Grek]=>[Grek]
		0x13C7, // (Ꮗ) CHEROKEE LETTER QUE [Cher]=>[Cher]
		0x15EF, // (ᗯ) CANADIAN SYLLABICS CARRIER GU [Cans]=>[Cans]
	],
	[
		// "Ѡ҆҇" <Same>
		'460 486 487', // CYRILLIC CAPITAL LETTER OMEGA + COMBINING CYRILLIC PSILI PNEUMATA + COMBINING CYRILLIC POKRYTIE [Cyrl,Zinh]=>[Cyrl]
		//IDNA:0x47C, // (Ѽ) CYRILLIC CAPITAL LETTER OMEGA WITH TITLO [Cyrl]=>[Cyrl]
	],
	[
		// "Ѡ·" <Same>
		'460 B7', // CYRILLIC CAPITAL LETTER OMEGA + MIDDLE DOT [Cyrl,Zyyy]=>[Cyrl]
		0x18ED, // (ᣭ) CANADIAN SYLLABICS CARRIER GWU [Cans]=>[Cans]
	],
	[
		// "Ꙍ" <Same>
		'A64C', // CYRILLIC CAPITAL LETTER BROAD OMEGA [Cyrl]=>[Cyrl]
		//IDNA:0xA64C, // (Ꙍ) CYRILLIC CAPITAL LETTER BROAD OMEGA [Cyrl]=>[Cyrl]
		//IDNA:0xA7B6, // (Ꞷ) LATIN CAPITAL LETTER OMEGA [Latn]=>[Latn]
	],
	[
		// "ҷ" <Same>
		'4B7', // CYRILLIC SMALL LETTER CHE WITH DESCENDER [Cyrl]=>[Cyrl]
		0x4B7, // (ҷ) CYRILLIC SMALL LETTER CHE WITH DESCENDER [Cyrl]=>[Cyrl]
		0x4CC, // (ӌ) CYRILLIC SMALL LETTER KHAKASSIAN CHE [Cyrl]=>[Cyrl]
	],
	[
		// "Ҷ" <Same>
		'4B6', // CYRILLIC CAPITAL LETTER CHE WITH DESCENDER [Cyrl]=>[Cyrl]
		//IDNA:0x4B6, // (Ҷ) CYRILLIC CAPITAL LETTER CHE WITH DESCENDER [Cyrl]=>[Cyrl]
		//IDNA:0x4CB, // (Ӌ) CYRILLIC CAPITAL LETTER KHAKASSIAN CHE [Cyrl]=>[Cyrl]
	],
	[
		// "Ҽ̨" <Same>
		'4BC 328', // CYRILLIC CAPITAL LETTER ABKHASIAN CHE + COMBINING OGONEK [Cyrl,Zinh]=>[Cyrl]
		//IDNA:0x4BE, // (Ҿ) CYRILLIC CAPITAL LETTER ABKHASIAN CHE WITH DESCENDER [Cyrl]=>[Cyrl]
	],
	[
		// "ш" <Same>
		'448', // CYRILLIC SMALL LETTER SHA [Cyrl]=>[Cyrl]
		0x448, // (ш) CYRILLIC SMALL LETTER SHA [Cyrl]=>[Cyrl]
		0x2CBD, // (ⲽ) COPTIC SMALL LETTER CRYPTOGRAMMIC NI [Copt]=>[Copt]
	],
	[
		// "Ш" <Same>
		'428', // CYRILLIC CAPITAL LETTER SHA [Cyrl]=>[Cyrl]
		//IDNA:0x428, // (Ш) CYRILLIC CAPITAL LETTER SHA [Cyrl]=>[Cyrl]
		//IDNA:0x2CBC, // (Ⲽ) COPTIC CAPITAL LETTER CRYPTOGRAMMIC NI [Copt]=>[Copt]
	],
	[
		// "Ъl" <Same>
		'42A 6C', // CYRILLIC CAPITAL LETTER HARD SIGN + LATIN SMALL LETTER L [Cyrl,Latn]=>[]
		//IDNA:0xA650, // (Ꙑ) CYRILLIC CAPITAL LETTER YERU WITH BACK YER [Cyrl]=>[Cyrl]
	],
	[
		// "Э" <Same>
		'42D', // CYRILLIC CAPITAL LETTER E [Cyrl]=>[Cyrl]
		//IDNA:0x42D, // (Э) CYRILLIC CAPITAL LETTER E [Cyrl]=>[Cyrl]
		//DISALLOW:0x2108, // (℈) SCRUPLE [Zyyy]=>[ALL]
	],
	[
		// "Ꙙ" <Same>
		'A658', // CYRILLIC CAPITAL LETTER CLOSED LITTLE YUS [Cyrl]=>[Cyrl]
		//IDNA:0xA658, // (Ꙙ) CYRILLIC CAPITAL LETTER CLOSED LITTLE YUS [Cyrl]=>[Cyrl]
		//DISALLOW:0x1F701, // (🜁) ALCHEMICAL SYMBOL FOR AIR [Zyyy]=>[ALL]
		0x16F1C, // (𖼜) MIAO LETTER TLHYA [Plrd]=>[Plrd]
	],
	[
		// "ⰿ" <Same>
		'2C3F', // GLAGOLITIC SMALL LETTER MYSLITE [Glag]=>[Glag]
		0x2C3F, // (ⰿ) GLAGOLITIC SMALL LETTER MYSLITE [Glag]=>[Glag]
		0xA992, // (ꦒ) JAVANESE LETTER GA [Java]=>[Java]
	],
	[
		// "եւ" <Same>
		'565 582', // ARMENIAN SMALL LETTER ECH + ARMENIAN SMALL LETTER YIWN [Armn]=>[Armn]
		//IDNA:0x587, // (և) ARMENIAN SMALL LIGATURE ECH YIWN [Armn]=>[Armn]
	],
	[
		// "ձ" <Same>
		'571', // ARMENIAN SMALL LETTER JA [Armn]=>[Armn]
		0x571, // (ձ) ARMENIAN SMALL LETTER JA [Armn]=>[Armn]
		0x1294, // (ኔ) ETHIOPIC SYLLABLE NEE [Ethi]=>[Ethi]
	],
	[
		// "մե" <Same>
		'574 565', // ARMENIAN SMALL LETTER MEN + ARMENIAN SMALL LETTER ECH [Armn]=>[Armn]
		//IDNA:0xFB14, // (ﬔ) ARMENIAN SMALL LIGATURE MEN ECH [Armn]=>[Armn]
	],
	[
		// "մի" <Same>
		'574 56B', // ARMENIAN SMALL LETTER MEN + ARMENIAN SMALL LETTER INI [Armn]=>[Armn]
		//IDNA:0xFB15, // (ﬕ) ARMENIAN SMALL LIGATURE MEN INI [Armn]=>[Armn]
	],
	[
		// "մխ" <Same>
		'574 56D', // ARMENIAN SMALL LETTER MEN + ARMENIAN SMALL LETTER XEH [Armn]=>[Armn]
		//IDNA:0xFB17, // (ﬗ) ARMENIAN SMALL LIGATURE MEN XEH [Armn]=>[Armn]
	],
	[
		// "մն" <Same>
		'574 576', // ARMENIAN SMALL LETTER MEN + ARMENIAN SMALL LETTER NOW [Armn]=>[Armn]
		//IDNA:0xFB13, // (ﬓ) ARMENIAN SMALL LIGATURE MEN NOW [Armn]=>[Armn]
	],
	[
		// "Ո" <Same>
		'548', // ARMENIAN CAPITAL LETTER VO [Armn]=>[Armn]
		//IDNA:0x548, // (Ո) ARMENIAN CAPITAL LETTER VO [Armn]=>[Armn]
		//DISALLOW:0x2229, // (∩) INTERSECTION [Zyyy]=>[ALL]
		//DISALLOW:0x22C2, // (⋂) N-ARY INTERSECTION [Zyyy]=>[ALL]
		//DISALLOW:0x1D245, // (𝉅) GREEK MUSICAL LEIMMA [Grek]=>[Grek]
		0x1260, // (በ) ETHIOPIC SYLLABLE BA [Ethi]=>[Ethi]
		0x144E, // (ᑎ) CANADIAN SYLLABICS TI [Cans]=>[Cans]
		0xA4F5, // (ꓵ) LISU LETTER UE [Lisu]=>[Lisu]
	],
	[
		// "Ո·" <Same>
		'548 B7', // ARMENIAN CAPITAL LETTER VO + MIDDLE DOT [Armn,Zyyy]=>[Armn]
		0x145A, // (ᑚ) CANADIAN SYLLABICS WEST-CREE TWI [Cans]=>[Cans]
	],
	[
		// "Ո'" <Same>
		'548 27', // ARMENIAN CAPITAL LETTER VO + APOSTROPHE [Armn,Zyyy]=>[Armn]
		0x1468, // (ᑨ) CANADIAN SYLLABICS TTI [Cans]=>[Cans]
	],
	[
		// "վն" <Same>
		'57E 576', // ARMENIAN SMALL LETTER VEW + ARMENIAN SMALL LETTER NOW [Armn]=>[Armn]
		//IDNA:0xFB16, // (ﬖ) ARMENIAN SMALL LIGATURE VEW NOW [Armn]=>[Armn]
	],
	[
		// "Ք" <Same>
		'554', // ARMENIAN CAPITAL LETTER KEH [Armn]=>[Armn]
		//IDNA:0x554, // (Ք) ARMENIAN CAPITAL LETTER KEH [Armn]=>[Armn]
		0x20BD, // (₽) RUBLE SIGN [Zyyy]=>[ALL]
	],
	[
		// "ՙ" <Same>
		'559', // ARMENIAN MODIFIER LETTER LEFT HALF RING [Armn]=>[Armn]
		//DISALLOW:0x559, // (ՙ) ARMENIAN MODIFIER LETTER LEFT HALF RING [Armn]=>[Armn]
		//DISALLOW:0x2D3, // (˓) MODIFIER LETTER CENTRED LEFT HALF RING [Zyyy]=>[ALL]
		//DISALLOW:0x2BF, // (ʿ) MODIFIER LETTER LEFT HALF RING [Zyyy]=>[ALL]
	],
	[
		// "א" <Same>
		'5D0', // HEBREW LETTER ALEF [Hebr]=>[Hebr]
		0x5D0, // (א) HEBREW LETTER ALEF [Hebr]=>[Hebr]
		//IDNA:0x2135, // (ℵ) ALEF SYMBOL [Zyyy]=>[ALL]
		//IDNA:0xFB21, // (ﬡ) HEBREW LETTER WIDE ALEF [Hebr]=>[Hebr]
	],
	[
		// "אַ" <NF(false)>
		'FB2E', // HEBREW LETTER ALEF WITH PATAH [Hebr]=>[Hebr]
		//IDNA:0xFB2E, // (אַ) HEBREW LETTER ALEF WITH PATAH [Hebr]=>[Hebr]
		//IDNA:0xFB2F, // (אָ) HEBREW LETTER ALEF WITH QAMATS [Hebr]=>[Hebr]
		//IDNA:0xFB30, // (אּ) HEBREW LETTER ALEF WITH MAPIQ [Hebr]=>[Hebr]
	],
	[
		// "אל" <Same>
		'5D0 5DC', // HEBREW LETTER ALEF + HEBREW LETTER LAMED [Hebr]=>[Hebr]
		//IDNA:0xFB4F, // (ﭏ) HEBREW LIGATURE ALEF LAMED [Hebr]=>[Hebr]
	],
	[
		// "ב" <Same>
		'5D1', // HEBREW LETTER BET [Hebr]=>[Hebr]
		0x5D1, // (ב) HEBREW LETTER BET [Hebr]=>[Hebr]
		//IDNA:0x2136, // (ℶ) BET SYMBOL [Zyyy]=>[ALL]
	],
	[
		// "ג" <Same>
		'5D2', // HEBREW LETTER GIMEL [Hebr]=>[Hebr]
		0x5D2, // (ג) HEBREW LETTER GIMEL [Hebr]=>[Hebr]
		//IDNA:0x2137, // (ℷ) GIMEL SYMBOL [Zyyy]=>[ALL]
	],
	[
		// "ד" <Same>
		'5D3', // HEBREW LETTER DALET [Hebr]=>[Hebr]
		0x5D3, // (ד) HEBREW LETTER DALET [Hebr]=>[Hebr]
		//IDNA:0x2138, // (ℸ) DALET SYMBOL [Zyyy]=>[ALL]
		//IDNA:0xFB22, // (ﬢ) HEBREW LETTER WIDE DALET [Hebr]=>[Hebr]
	],
	[
		// "ה" <Same>
		'5D4', // HEBREW LETTER HE [Hebr]=>[Hebr]
		0x5D4, // (ה) HEBREW LETTER HE [Hebr]=>[Hebr]
		//IDNA:0xFB23, // (ﬣ) HEBREW LETTER WIDE HE [Hebr]=>[Hebr]
	],
	[
		// "יִ" <NF(false)>
		'FB1D', // HEBREW LETTER YOD WITH HIRIQ [Hebr]=>[Hebr]
		//IDNA:0xFB1D, // (יִ) HEBREW LETTER YOD WITH HIRIQ [Hebr]=>[Hebr]
		//IDNA:0xFB39, // (יּ) HEBREW LETTER YOD WITH DAGESH [Hebr]=>[Hebr]
	],
	[
		// "כ" <Same>
		'5DB', // HEBREW LETTER KAF [Hebr]=>[Hebr]
		0x5DB, // (כ) HEBREW LETTER KAF [Hebr]=>[Hebr]
		//IDNA:0xFB24, // (ﬤ) HEBREW LETTER WIDE KAF [Hebr]=>[Hebr]
	],
	[
		// "ל" <Same>
		'5DC', // HEBREW LETTER LAMED [Hebr]=>[Hebr]
		0x5DC, // (ל) HEBREW LETTER LAMED [Hebr]=>[Hebr]
		//IDNA:0xFB25, // (ﬥ) HEBREW LETTER WIDE LAMED [Hebr]=>[Hebr]
	],
	[
		// "ם" <Same>
		'5DD', // HEBREW LETTER FINAL MEM [Hebr]=>[Hebr]
		0x5DD, // (ם) HEBREW LETTER FINAL MEM [Hebr]=>[Hebr]
		//IDNA:0xFB26, // (ﬦ) HEBREW LETTER WIDE FINAL MEM [Hebr]=>[Hebr]
	],
	[
		// "ע" <Same>
		'5E2', // HEBREW LETTER AYIN [Hebr]=>[Hebr]
		0x5E2, // (ע) HEBREW LETTER AYIN [Hebr]=>[Hebr]
		//IDNA:0xFB20, // (ﬠ) HEBREW LETTER ALTERNATIVE AYIN [Hebr]=>[Hebr]
	],
	[
		// "ר" <Same>
		'5E8', // HEBREW LETTER RESH [Hebr]=>[Hebr]
		0x5E8, // (ר) HEBREW LETTER RESH [Hebr]=>[Hebr]
		//IDNA:0xFB27, // (ﬧ) HEBREW LETTER WIDE RESH [Hebr]=>[Hebr]
	],
	[
		// "שׁ" <NF(false)>
		'FB2A', // HEBREW LETTER SHIN WITH SHIN DOT [Hebr]=>[Hebr]
		//IDNA:0xFB2A, // (שׁ) HEBREW LETTER SHIN WITH SHIN DOT [Hebr]=>[Hebr]
		//IDNA:0xFB2B, // (שׂ) HEBREW LETTER SHIN WITH SIN DOT [Hebr]=>[Hebr]
		//IDNA:0xFB49, // (שּ) HEBREW LETTER SHIN WITH DAGESH [Hebr]=>[Hebr]
	],
	[
		// "שּׁ" <NF(false)>
		'FB2C', // HEBREW LETTER SHIN WITH DAGESH AND SHIN DOT [Hebr]=>[Hebr]
		//IDNA:0xFB2C, // (שּׁ) HEBREW LETTER SHIN WITH DAGESH AND SHIN DOT [Hebr]=>[Hebr]
		//IDNA:0xFB2D, // (שּׂ) HEBREW LETTER SHIN WITH DAGESH AND SIN DOT [Hebr]=>[Hebr]
	],
	[
		// "ת" <Same>
		'5EA', // HEBREW LETTER TAV [Hebr]=>[Hebr]
		0x5EA, // (ת) HEBREW LETTER TAV [Hebr]=>[Hebr]
		//IDNA:0xFB28, // (ﬨ) HEBREW LETTER WIDE TAV [Hebr]=>[Hebr]
	],
	[
		// "ء" <Same>
		'621', // ARABIC LETTER HAMZA [Arab]=>[Arab]
		0x621, // (ء) ARABIC LETTER HAMZA [Arab]=>[Arab]
		//IDNA:0xFE80, // (ﺀ) ARABIC LETTER HAMZA ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ء͈" <Same>
		'621 348', // ARABIC LETTER HAMZA + COMBINING DOUBLE VERTICAL LINE BELOW [Arab,Zinh]=>[Arab]
		//DISALLOW:0x6FD, // (۽) ARABIC SIGN SINDHI AMPERSAND [Arab]=>[Arab]
	],
	[
		// "آ" <NFC(true) NFD(false)>
		'622', // ARABIC LETTER ALEF WITH MADDA ABOVE [Arab]=>[Arab]
		0x622, // (آ) ARABIC LETTER ALEF WITH MADDA ABOVE [Arab]=>[Arab]
		//IDNA:0xFE82, // (ﺂ) ARABIC LETTER ALEF WITH MADDA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE81, // (ﺁ) ARABIC LETTER ALEF WITH MADDA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ٱ" <Same>
		'671', // ARABIC LETTER ALEF WASLA [Arab]=>[Arab]
		//DISALLOW:0x671, // (ٱ) ARABIC LETTER ALEF WASLA [Arab]=>[Arab]
		//IDNA:0xFB51, // (ﭑ) ARABIC LETTER ALEF WASLA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB50, // (ﭐ) ARABIC LETTER ALEF WASLA ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ب" <Same>
		'628', // ARABIC LETTER BEH [Arab]=>[Arab]
		0x628, // (ب) ARABIC LETTER BEH [Arab]=>[Arab]
		//IDNA:0x1EE01, // (𞸁) ARABIC MATHEMATICAL BEH [Arab]=>[Arab]
		//IDNA:0x1EE21, // (𞸡) ARABIC MATHEMATICAL INITIAL BEH [Arab]=>[Arab]
		//IDNA:0x1EE61, // (𞹡) ARABIC MATHEMATICAL STRETCHED BEH [Arab]=>[Arab]
		//IDNA:0x1EE81, // (𞺁) ARABIC MATHEMATICAL LOOPED BEH [Arab]=>[Arab]
		//IDNA:0x1EEA1, // (𞺡) ARABIC MATHEMATICAL DOUBLE-STRUCK BEH [Arab]=>[Arab]
		//IDNA:0xFE91, // (ﺑ) ARABIC LETTER BEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE92, // (ﺒ) ARABIC LETTER BEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE90, // (ﺐ) ARABIC LETTER BEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE8F, // (ﺏ) ARABIC LETTER BEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "بۛ" <Same>
		'628 6DB', // ARABIC LETTER BEH + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x751, // (ݑ) ARABIC LETTER BEH WITH DOT BELOW AND THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "بۢ" <Same>
		'628 6E2', // ARABIC LETTER BEH + ARABIC SMALL HIGH MEEM ISOLATED FORM [Arab]=>[Arab]
		0x8B6, // (ࢶ) ARABIC LETTER BEH WITH SMALL MEEM ABOVE [Arab]=>[Arab]
	],
	[
		// "بٔ" <Same>
		'628 654', // ARABIC LETTER BEH + ARABIC HAMZA ABOVE [Arab,Zinh]=>[Arab]
		0x8A1, // (ࢡ) ARABIC LETTER BEH WITH HAMZA ABOVE [Arab]=>[Arab]
	],
	[
		// "بo" <Same>
		'628 6F', // ARABIC LETTER BEH + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFCA0, // (ﲠ) ARABIC LIGATURE BEH WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE2, // (ﳢ) ARABIC LIGATURE BEH WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "بج" <Same>
		'628 62C', // ARABIC LETTER BEH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFC9C, // (ﲜ) ARABIC LIGATURE BEH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC05, // (ﰅ) ARABIC LIGATURE BEH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "بح" <Same>
		'628 62D', // ARABIC LETTER BEH + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFC9D, // (ﲝ) ARABIC LIGATURE BEH WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC06, // (ﰆ) ARABIC LIGATURE BEH WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "بحى" <Same>
		'628 62D 649', // ARABIC LETTER BEH + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDC2, // (ﷂ) ARABIC LIGATURE BEH WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "بخ" <Same>
		'628 62E', // ARABIC LETTER BEH + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFC9E, // (ﲞ) ARABIC LIGATURE BEH WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC07, // (ﰇ) ARABIC LIGATURE BEH WITH KHAH ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFCD2, // (ﳒ) ARABIC LIGATURE NOON WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC4B, // (ﱋ) ARABIC LIGATURE NOON WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "بخى" <Same>
		'628 62E 649', // ARABIC LETTER BEH + ARABIC LETTER KHAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD9E, // (ﶞ) ARABIC LIGATURE BEH WITH KHAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "بر" <Same>
		'628 631', // ARABIC LETTER BEH + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFC6A, // (ﱪ) ARABIC LIGATURE BEH WITH REH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "بز" <Same>
		'628 632', // ARABIC LETTER BEH + ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0xFC6B, // (ﱫ) ARABIC LIGATURE BEH WITH ZAIN FINAL FORM [Arab]=>[Arab]
	],
	[
		// "بم" <Same>
		'628 645', // ARABIC LETTER BEH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFC9F, // (ﲟ) ARABIC LIGATURE BEH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE1, // (ﳡ) ARABIC LIGATURE BEH WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC6C, // (ﱬ) ARABIC LIGATURE BEH WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC08, // (ﰈ) ARABIC LIGATURE BEH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "بن" <Same>
		'628 646', // ARABIC LETTER BEH + ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0xFC6D, // (ﱭ) ARABIC LIGATURE BEH WITH NOON FINAL FORM [Arab]=>[Arab]
	],
	[
		// "بى" <Same>
		'628 649', // ARABIC LETTER BEH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC6E, // (ﱮ) ARABIC LIGATURE BEH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC09, // (ﰉ) ARABIC LIGATURE BEH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC6F, // (ﱯ) ARABIC LIGATURE BEH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC0A, // (ﰊ) ARABIC LIGATURE BEH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ٻ" <Same>
		'67B', // ARABIC LETTER BEEH [Arab]=>[Arab]
		0x67B, // (ٻ) ARABIC LETTER BEEH [Arab]=>[Arab]
		//IDNA:0xFB54, // (ﭔ) ARABIC LETTER BEEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB55, // (ﭕ) ARABIC LETTER BEEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB53, // (ﭓ) ARABIC LETTER BEEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB52, // (ﭒ) ARABIC LETTER BEEH ISOLATED FORM [Arab]=>[Arab]
		0x6D0, // (ې) ARABIC LETTER E [Arab]=>[Arab]
		//IDNA:0xFBE6, // (ﯦ) ARABIC LETTER E INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBE7, // (ﯧ) ARABIC LETTER E MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBE5, // (ﯥ) ARABIC LETTER E FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBE4, // (ﯤ) ARABIC LETTER E ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڀ" <Same>
		'680', // ARABIC LETTER BEHEH [Arab]=>[Arab]
		0x680, // (ڀ) ARABIC LETTER BEHEH [Arab]=>[Arab]
		//IDNA:0xFB5C, // (ﭜ) ARABIC LETTER BEHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB5D, // (ﭝ) ARABIC LETTER BEHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB5B, // (ﭛ) ARABIC LETTER BEHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB5A, // (ﭚ) ARABIC LETTER BEHEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ݔ" <Same>
		'754', // ARABIC LETTER BEH WITH TWO DOTS BELOW AND DOT ABOVE [Arab]=>[Arab]
		0x754, // (ݔ) ARABIC LETTER BEH WITH TWO DOTS BELOW AND DOT ABOVE [Arab]=>[Arab]
		0x8A9, // (ࢩ) ARABIC LETTER YEH WITH TWO DOTS BELOW AND DOT ABOVE [Arab]=>[Arab]
		0x767, // (ݧ) ARABIC LETTER NOON WITH TWO DOTS BELOW [Arab]=>[Arab]
	],
	[
		// "ة" <Same>
		'629', // ARABIC LETTER TEH MARBUTA [Arab]=>[Arab]
		//DISALLOW:0x2365, // (⍥) APL FUNCTIONAL SYMBOL CIRCLE DIAERESIS [Zyyy]=>[ALL]
		valid(0xF6), // (ö) LATIN SMALL LETTER O WITH DIAERESIS [Latn]=>[Latn]
		//IDNA:0xFE94, // (ﺔ) ARABIC LETTER TEH MARBUTA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE93, // (ﺓ) ARABIC LETTER TEH MARBUTA ISOLATED FORM [Arab]=>[Arab]
		allow(0x629), // (ة) ARABIC LETTER TEH MARBUTA [Arab]=>[Arab] (20221110: decided by registrations)
		0x6C3, // (ۃ) ARABIC LETTER TEH MARBUTA GOAL [Arab]=>[Arab]
	],
	[
		// "ت" <Same>
		'62A', // ARABIC LETTER TEH [Arab]=>[Arab]
		0x62A, // (ت) ARABIC LETTER TEH [Arab]=>[Arab]
		//IDNA:0x1EE15, // (𞸕) ARABIC MATHEMATICAL TEH [Arab]=>[Arab]
		//IDNA:0x1EE35, // (𞸵) ARABIC MATHEMATICAL INITIAL TEH [Arab]=>[Arab]
		//IDNA:0x1EE75, // (𞹵) ARABIC MATHEMATICAL STRETCHED TEH [Arab]=>[Arab]
		//IDNA:0x1EE95, // (𞺕) ARABIC MATHEMATICAL LOOPED TEH [Arab]=>[Arab]
		//IDNA:0x1EEB5, // (𞺵) ARABIC MATHEMATICAL DOUBLE-STRUCK TEH [Arab]=>[Arab]
		//IDNA:0xFE97, // (ﺗ) ARABIC LETTER TEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE98, // (ﺘ) ARABIC LETTER TEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE96, // (ﺖ) ARABIC LETTER TEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE95, // (ﺕ) ARABIC LETTER TEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "تo" <Same>
		'62A 6F', // ARABIC LETTER TEH + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFCA5, // (ﲥ) ARABIC LIGATURE TEH WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE4, // (ﳤ) ARABIC LIGATURE TEH WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "تج" <Same>
		'62A 62C', // ARABIC LETTER TEH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCA1, // (ﲡ) ARABIC LIGATURE TEH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC0B, // (ﰋ) ARABIC LIGATURE TEH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "تجم" <Same>
		'62A 62C 645', // ARABIC LETTER TEH + ARABIC LETTER JEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD50, // (ﵐ) ARABIC LIGATURE TEH WITH JEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "تجى" <Same>
		'62A 62C 649', // ARABIC LETTER TEH + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA0, // (ﶠ) ARABIC LIGATURE TEH WITH JEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD9F, // (ﶟ) ARABIC LIGATURE TEH WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تح" <Same>
		'62A 62D', // ARABIC LETTER TEH + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCA2, // (ﲢ) ARABIC LIGATURE TEH WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC0C, // (ﰌ) ARABIC LIGATURE TEH WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "تحج" <Same>
		'62A 62D 62C', // ARABIC LETTER TEH + ARABIC LETTER HAH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD52, // (ﵒ) ARABIC LIGATURE TEH WITH HAH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD51, // (ﵑ) ARABIC LIGATURE TEH WITH HAH WITH JEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تحم" <Same>
		'62A 62D 645', // ARABIC LETTER TEH + ARABIC LETTER HAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD53, // (ﵓ) ARABIC LIGATURE TEH WITH HAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "تخ" <Same>
		'62A 62E', // ARABIC LETTER TEH + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCA3, // (ﲣ) ARABIC LIGATURE TEH WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC0D, // (ﰍ) ARABIC LIGATURE TEH WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "تخم" <Same>
		'62A 62E 645', // ARABIC LETTER TEH + ARABIC LETTER KHAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD54, // (ﵔ) ARABIC LIGATURE TEH WITH KHAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "تخى" <Same>
		'62A 62E 649', // ARABIC LETTER TEH + ARABIC LETTER KHAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA2, // (ﶢ) ARABIC LIGATURE TEH WITH KHAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDA1, // (ﶡ) ARABIC LIGATURE TEH WITH KHAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تر" <Same>
		'62A 631', // ARABIC LETTER TEH + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFC70, // (ﱰ) ARABIC LIGATURE TEH WITH REH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تز" <Same>
		'62A 632', // ARABIC LETTER TEH + ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0xFC71, // (ﱱ) ARABIC LIGATURE TEH WITH ZAIN FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تم" <Same>
		'62A 645', // ARABIC LETTER TEH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCA4, // (ﲤ) ARABIC LIGATURE TEH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE3, // (ﳣ) ARABIC LIGATURE TEH WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC72, // (ﱲ) ARABIC LIGATURE TEH WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC0E, // (ﰎ) ARABIC LIGATURE TEH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "تمج" <Same>
		'62A 645 62C', // ARABIC LETTER TEH + ARABIC LETTER MEEM + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD55, // (ﵕ) ARABIC LIGATURE TEH WITH MEEM WITH JEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "تمح" <Same>
		'62A 645 62D', // ARABIC LETTER TEH + ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD56, // (ﵖ) ARABIC LIGATURE TEH WITH MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "تمخ" <Same>
		'62A 645 62E', // ARABIC LETTER TEH + ARABIC LETTER MEEM + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFD57, // (ﵗ) ARABIC LIGATURE TEH WITH MEEM WITH KHAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "تمى" <Same>
		'62A 645 649', // ARABIC LETTER TEH + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA4, // (ﶤ) ARABIC LIGATURE TEH WITH MEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDA3, // (ﶣ) ARABIC LIGATURE TEH WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تن" <Same>
		'62A 646', // ARABIC LETTER TEH + ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0xFC73, // (ﱳ) ARABIC LIGATURE TEH WITH NOON FINAL FORM [Arab]=>[Arab]
	],
	[
		// "تى" <Same>
		'62A 649', // ARABIC LETTER TEH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC74, // (ﱴ) ARABIC LIGATURE TEH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC0F, // (ﰏ) ARABIC LIGATURE TEH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC75, // (ﱵ) ARABIC LIGATURE TEH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC10, // (ﰐ) ARABIC LIGATURE TEH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ٺ" <Same>
		'67A', // ARABIC LETTER TTEHEH [Arab]=>[Arab]
		0x67A, // (ٺ) ARABIC LETTER TTEHEH [Arab]=>[Arab]
		//IDNA:0xFB60, // (ﭠ) ARABIC LETTER TTEHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB61, // (ﭡ) ARABIC LETTER TTEHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB5F, // (ﭟ) ARABIC LETTER TTEHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB5E, // (ﭞ) ARABIC LETTER TTEHEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ٿ" <Same>
		'67F', // ARABIC LETTER TEHEH [Arab]=>[Arab]
		0x67F, // (ٿ) ARABIC LETTER TEHEH [Arab]=>[Arab]
		//IDNA:0xFB64, // (ﭤ) ARABIC LETTER TEHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB65, // (ﭥ) ARABIC LETTER TEHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB63, // (ﭣ) ARABIC LETTER TEHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB62, // (ﭢ) ARABIC LETTER TEHEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ج" <Same>
		'62C', // ARABIC LETTER JEEM [Arab]=>[Arab]
		0x62C, // (ج) ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0x1EE02, // (𞸂) ARABIC MATHEMATICAL JEEM [Arab]=>[Arab]
		//IDNA:0x1EE22, // (𞸢) ARABIC MATHEMATICAL INITIAL JEEM [Arab]=>[Arab]
		//IDNA:0x1EE42, // (𞹂) ARABIC MATHEMATICAL TAILED JEEM [Arab]=>[Arab]
		//IDNA:0x1EE62, // (𞹢) ARABIC MATHEMATICAL STRETCHED JEEM [Arab]=>[Arab]
		//IDNA:0x1EE82, // (𞺂) ARABIC MATHEMATICAL LOOPED JEEM [Arab]=>[Arab]
		//IDNA:0x1EEA2, // (𞺢) ARABIC MATHEMATICAL DOUBLE-STRUCK JEEM [Arab]=>[Arab]
		//IDNA:0xFE9F, // (ﺟ) ARABIC LETTER JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA0, // (ﺠ) ARABIC LETTER JEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE9E, // (ﺞ) ARABIC LETTER JEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE9D, // (ﺝ) ARABIC LETTER JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "جح" <Same>
		'62C 62D', // ARABIC LETTER JEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCA7, // (ﲧ) ARABIC LIGATURE JEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC15, // (ﰕ) ARABIC LIGATURE JEEM WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "جحى" <Same>
		'62C 62D 649', // ARABIC LETTER JEEM + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA6, // (ﶦ) ARABIC LIGATURE JEEM WITH HAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDBE, // (ﶾ) ARABIC LIGATURE JEEM WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "جل جلlلo" <Same>
		'62C 644 20 62C 644 6C 644 6F', // ARABIC LETTER JEEM + ARABIC LETTER LAM + SPACE + ARABIC LETTER JEEM + ARABIC LETTER LAM + LATIN SMALL LETTER L + ARABIC LETTER LAM + LATIN SMALL LETTER O [Arab,Zyyy,Latn]=>[]
		//IDNA:0xFDFB, // (ﷻ) ARABIC LIGATURE JALLAJALALOUHOU [Arab]=>[Arab]
	],
	[
		// "جم" <Same>
		'62C 645', // ARABIC LETTER JEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCA8, // (ﲨ) ARABIC LIGATURE JEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC16, // (ﰖ) ARABIC LIGATURE JEEM WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "جمح" <Same>
		'62C 645 62D', // ARABIC LETTER JEEM + ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD59, // (ﵙ) ARABIC LIGATURE JEEM WITH MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD58, // (ﵘ) ARABIC LIGATURE JEEM WITH MEEM WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "جمى" <Same>
		'62C 645 649', // ARABIC LETTER JEEM + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA7, // (ﶧ) ARABIC LIGATURE JEEM WITH MEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDA5, // (ﶥ) ARABIC LIGATURE JEEM WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "جى" <Same>
		'62C 649', // ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD1D, // (ﴝ) ARABIC LIGATURE JEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD01, // (ﴁ) ARABIC LIGATURE JEEM WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD1E, // (ﴞ) ARABIC LIGATURE JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD02, // (ﴂ) ARABIC LIGATURE JEEM WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڃ" <Same>
		'683', // ARABIC LETTER NYEH [Arab]=>[Arab]
		0x683, // (ڃ) ARABIC LETTER NYEH [Arab]=>[Arab]
		//IDNA:0xFB78, // (ﭸ) ARABIC LETTER NYEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB79, // (ﭹ) ARABIC LETTER NYEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB77, // (ﭷ) ARABIC LETTER NYEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB76, // (ﭶ) ARABIC LETTER NYEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڄ" <Same>
		'684', // ARABIC LETTER DYEH [Arab]=>[Arab]
		0x684, // (ڄ) ARABIC LETTER DYEH [Arab]=>[Arab]
		//IDNA:0xFB74, // (ﭴ) ARABIC LETTER DYEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB75, // (ﭵ) ARABIC LETTER DYEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB73, // (ﭳ) ARABIC LETTER DYEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB72, // (ﭲ) ARABIC LETTER DYEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "چ" <Same>
		'686', // ARABIC LETTER TCHEH [Arab]=>[Arab]
		0x686, // (چ) ARABIC LETTER TCHEH [Arab]=>[Arab]
		//IDNA:0xFB7C, // (ﭼ) ARABIC LETTER TCHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB7D, // (ﭽ) ARABIC LETTER TCHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB7B, // (ﭻ) ARABIC LETTER TCHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB7A, // (ﭺ) ARABIC LETTER TCHEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڇ" <Same>
		'687', // ARABIC LETTER TCHEHEH [Arab]=>[Arab]
		0x687, // (ڇ) ARABIC LETTER TCHEHEH [Arab]=>[Arab]
		//IDNA:0xFB80, // (ﮀ) ARABIC LETTER TCHEHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB81, // (ﮁ) ARABIC LETTER TCHEHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB7F, // (ﭿ) ARABIC LETTER TCHEHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB7E, // (ﭾ) ARABIC LETTER TCHEHEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ح" <Same>
		'62D', // ARABIC LETTER HAH [Arab]=>[Arab]
		0x62D, // (ح) ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0x1EE07, // (𞸇) ARABIC MATHEMATICAL HAH [Arab]=>[Arab]
		//IDNA:0x1EE27, // (𞸧) ARABIC MATHEMATICAL INITIAL HAH [Arab]=>[Arab]
		//IDNA:0x1EE47, // (𞹇) ARABIC MATHEMATICAL TAILED HAH [Arab]=>[Arab]
		//IDNA:0x1EE67, // (𞹧) ARABIC MATHEMATICAL STRETCHED HAH [Arab]=>[Arab]
		//IDNA:0x1EE87, // (𞺇) ARABIC MATHEMATICAL LOOPED HAH [Arab]=>[Arab]
		//IDNA:0x1EEA7, // (𞺧) ARABIC MATHEMATICAL DOUBLE-STRUCK HAH [Arab]=>[Arab]
		//IDNA:0xFEA3, // (ﺣ) ARABIC LETTER HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA4, // (ﺤ) ARABIC LETTER HAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA2, // (ﺢ) ARABIC LETTER HAH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA1, // (ﺡ) ARABIC LETTER HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "حۛ" <Same>
		'62D 6DB', // ARABIC LETTER HAH + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x685, // (څ) ARABIC LETTER HAH WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "حٔ" <Same>
		'62D 654', // ARABIC LETTER HAH + ARABIC HAMZA ABOVE [Arab,Zinh]=>[Arab]
		0x681, // (ځ) ARABIC LETTER HAH WITH HAMZA ABOVE [Arab]=>[Arab]
		0x772, // (ݲ) ARABIC LETTER HAH WITH SMALL ARABIC LETTER TAH ABOVE [Arab]=>[Arab]
	],
	[
		// "حج" <Same>
		'62D 62C', // ARABIC LETTER HAH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCA9, // (ﲩ) ARABIC LIGATURE HAH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC17, // (ﰗ) ARABIC LIGATURE HAH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "حجى" <Same>
		'62D 62C 649', // ARABIC LETTER HAH + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDBF, // (ﶿ) ARABIC LIGATURE HAH WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "حم" <Same>
		'62D 645', // ARABIC LETTER HAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCAA, // (ﲪ) ARABIC LIGATURE HAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC18, // (ﰘ) ARABIC LIGATURE HAH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "حمى" <Same>
		'62D 645 649', // ARABIC LETTER HAH + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD5B, // (ﵛ) ARABIC LIGATURE HAH WITH MEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD5A, // (ﵚ) ARABIC LIGATURE HAH WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "حى" <Same>
		'62D 649', // ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD1B, // (ﴛ) ARABIC LIGATURE HAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCFF, // (ﳿ) ARABIC LIGATURE HAH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD1C, // (ﴜ) ARABIC LIGATURE HAH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD00, // (ﴀ) ARABIC LIGATURE HAH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "خ" <Same>
		'62E', // ARABIC LETTER KHAH [Arab]=>[Arab]
		0x62E, // (خ) ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0x1EE17, // (𞸗) ARABIC MATHEMATICAL KHAH [Arab]=>[Arab]
		//IDNA:0x1EE37, // (𞸷) ARABIC MATHEMATICAL INITIAL KHAH [Arab]=>[Arab]
		//IDNA:0x1EE57, // (𞹗) ARABIC MATHEMATICAL TAILED KHAH [Arab]=>[Arab]
		//IDNA:0x1EE77, // (𞹷) ARABIC MATHEMATICAL STRETCHED KHAH [Arab]=>[Arab]
		//IDNA:0x1EE97, // (𞺗) ARABIC MATHEMATICAL LOOPED KHAH [Arab]=>[Arab]
		//IDNA:0x1EEB7, // (𞺷) ARABIC MATHEMATICAL DOUBLE-STRUCK KHAH [Arab]=>[Arab]
		//IDNA:0xFEA7, // (ﺧ) ARABIC LETTER KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA8, // (ﺨ) ARABIC LETTER KHAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA6, // (ﺦ) ARABIC LETTER KHAH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA5, // (ﺥ) ARABIC LETTER KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "خج" <Same>
		'62E 62C', // ARABIC LETTER KHAH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCAB, // (ﲫ) ARABIC LIGATURE KHAH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC19, // (ﰙ) ARABIC LIGATURE KHAH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "خح" <Same>
		'62E 62D', // ARABIC LETTER KHAH + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFC1A, // (ﰚ) ARABIC LIGATURE KHAH WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "خم" <Same>
		'62E 645', // ARABIC LETTER KHAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCAC, // (ﲬ) ARABIC LIGATURE KHAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC1B, // (ﰛ) ARABIC LIGATURE KHAH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "خى" <Same>
		'62E 649', // ARABIC LETTER KHAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD1F, // (ﴟ) ARABIC LIGATURE KHAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD03, // (ﴃ) ARABIC LIGATURE KHAH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD20, // (ﴠ) ARABIC LIGATURE KHAH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD04, // (ﴄ) ARABIC LIGATURE KHAH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "د" <Same>
		'62F', // ARABIC LETTER DAL [Arab]=>[Arab]
		0x62F, // (د) ARABIC LETTER DAL [Arab]=>[Arab]
		//DISALLOW:0x102E1, // (𐋡) COPTIC EPACT DIGIT ONE [Zyyy]=>[Arab Copt]
		//IDNA:0x1EE03, // (𞸃) ARABIC MATHEMATICAL DAL [Arab]=>[Arab]
		//IDNA:0x1EE83, // (𞺃) ARABIC MATHEMATICAL LOOPED DAL [Arab]=>[Arab]
		//IDNA:0x1EEA3, // (𞺣) ARABIC MATHEMATICAL DOUBLE-STRUCK DAL [Arab]=>[Arab]
		//IDNA:0xFEAA, // (ﺪ) ARABIC LETTER DAL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEA9, // (ﺩ) ARABIC LETTER DAL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "دؕ" <Same>
		'62F 615', // ARABIC LETTER DAL + ARABIC SMALL HIGH TAH [Arab]=>[Arab]
		0x688, // (ڈ) ARABIC LETTER DDAL [Arab]=>[Arab]
		//IDNA:0xFB89, // (ﮉ) ARABIC LETTER DDAL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB88, // (ﮈ) ARABIC LETTER DDAL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "دۛ" <Same>
		'62F 6DB', // ARABIC LETTER DAL + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		//DISALLOW:0x68E, // (ڎ) ARABIC LETTER DUL [Arab]=>[Arab]
		//IDNA:0xFB87, // (ﮇ) ARABIC LETTER DUL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB86, // (ﮆ) ARABIC LETTER DUL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "د̂" <Same>
		'62F 302', // ARABIC LETTER DAL + COMBINING CIRCUMFLEX ACCENT [Arab,Zinh]=>[Arab]
		//DISALLOW:0x6EE, // (ۮ) ARABIC LETTER DAL WITH INVERTED V [Arab]=>[Arab]
	],
	[
		// "د̤̣" <Same>
		'62F 324 323', // ARABIC LETTER DAL + COMBINING DIAERESIS BELOW + COMBINING DOT BELOW [Arab,Zinh]=>[Arab]
		//DISALLOW:0x8AE, // (ࢮ) ARABIC LETTER DAL WITH THREE DOTS BELOW [Arab]=>[Arab]
	],
	[
		// "ذ" <Same>
		'630', // ARABIC LETTER THAL [Arab]=>[Arab]
		0x630, // (ذ) ARABIC LETTER THAL [Arab]=>[Arab]
		//IDNA:0x1EE18, // (𞸘) ARABIC MATHEMATICAL THAL [Arab]=>[Arab]
		//IDNA:0x1EE98, // (𞺘) ARABIC MATHEMATICAL LOOPED THAL [Arab]=>[Arab]
		//IDNA:0x1EEB8, // (𞺸) ARABIC MATHEMATICAL DOUBLE-STRUCK THAL [Arab]=>[Arab]
		//IDNA:0xFEAC, // (ﺬ) ARABIC LETTER THAL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEAB, // (ﺫ) ARABIC LETTER THAL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ذٰ" <Same>
		'630 670', // ARABIC LETTER THAL + ARABIC LETTER SUPERSCRIPT ALEF [Arab,Zinh]=>[Arab]
		//IDNA:0xFC5B, // (ﱛ) ARABIC LIGATURE THAL WITH SUPERSCRIPT ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڊؕ" <Same>
		'68A 615', // ARABIC LETTER DAL WITH DOT BELOW + ARABIC SMALL HIGH TAH [Arab]=>[Arab]
		0x68B, // (ڋ) ARABIC LETTER DAL WITH DOT BELOW AND SMALL TAH [Arab]=>[Arab]
	],
	[
		// "ڌ" <Same>
		'68C', // ARABIC LETTER DAHAL [Arab]=>[Arab]
		0x68C, // (ڌ) ARABIC LETTER DAHAL [Arab]=>[Arab]
		//IDNA:0xFB85, // (ﮅ) ARABIC LETTER DAHAL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB84, // (ﮄ) ARABIC LETTER DAHAL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڍ" <Same>
		'68D', // ARABIC LETTER DDAHAL [Arab]=>[Arab]
		0x68D, // (ڍ) ARABIC LETTER DDAHAL [Arab]=>[Arab]
		//IDNA:0xFB83, // (ﮃ) ARABIC LETTER DDAHAL FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB82, // (ﮂ) ARABIC LETTER DDAHAL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ر" <Same>
		'631', // ARABIC LETTER REH [Arab]=>[Arab]
		0x631, // (ر) ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0x1EE13, // (𞸓) ARABIC MATHEMATICAL REH [Arab]=>[Arab]
		//IDNA:0x1EE93, // (𞺓) ARABIC MATHEMATICAL LOOPED REH [Arab]=>[Arab]
		//IDNA:0x1EEB3, // (𞺳) ARABIC MATHEMATICAL DOUBLE-STRUCK REH [Arab]=>[Arab]
		//IDNA:0xFEAE, // (ﺮ) ARABIC LETTER REH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEAD, // (ﺭ) ARABIC LETTER REH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "رؕ" <Same>
		'631 615', // ARABIC LETTER REH + ARABIC SMALL HIGH TAH [Arab]=>[Arab]
		0x691, // (ڑ) ARABIC LETTER RREH [Arab]=>[Arab]
		//IDNA:0xFB8D, // (ﮍ) ARABIC LETTER RREH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB8C, // (ﮌ) ARABIC LETTER RREH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "رۛ" <Same>
		'631 6DB', // ARABIC LETTER REH + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x698, // (ژ) ARABIC LETTER JEH [Arab]=>[Arab]
		//IDNA:0xFB8B, // (ﮋ) ARABIC LETTER JEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB8A, // (ﮊ) ARABIC LETTER JEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ر̆" <Same>
		'631 306', // ARABIC LETTER REH + COMBINING BREVE [Arab,Zinh]=>[Arab]
		0x692, // (ڒ) ARABIC LETTER REH WITH SMALL V [Arab]=>[Arab]
	],
	[
		// "ر̆̇" <Same>
		'631 306 307', // ARABIC LETTER REH + COMBINING BREVE + COMBINING DOT ABOVE [Arab,Zinh]=>[Arab]
		0x8B9, // (ࢹ) ARABIC LETTER REH WITH SMALL NOON ABOVE [Arab]=>[Arab]
	],
	[
		// "ر̂" <Same>
		'631 302', // ARABIC LETTER REH + COMBINING CIRCUMFLEX ACCENT [Arab,Zinh]=>[Arab]
		//DISALLOW:0x6EF, // (ۯ) ARABIC LETTER REH WITH INVERTED V [Arab]=>[Arab]
	],
	[
		// "رٔ" <Same>
		'631 654', // ARABIC LETTER REH + ARABIC HAMZA ABOVE [Arab,Zinh]=>[Arab]
		0x76C, // (ݬ) ARABIC LETTER REH WITH HAMZA ABOVE [Arab]=>[Arab]
	],
	[
		// "رٰ" <Same>
		'631 670', // ARABIC LETTER REH + ARABIC LETTER SUPERSCRIPT ALEF [Arab,Zinh]=>[Arab]
		//IDNA:0xFC5C, // (ﱜ) ARABIC LIGATURE REH WITH SUPERSCRIPT ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "رسول" <Same>
		'631 633 648 644', // ARABIC LETTER REH + ARABIC LETTER SEEN + ARABIC LETTER WAW + ARABIC LETTER LAM [Arab]=>[Arab]
		//IDNA:0xFDF6, // (ﷶ) ARABIC LIGATURE RASOUL ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "رىlل" <Same>
		'631 649 6C 644', // ARABIC LETTER REH + ARABIC LETTER ALEF MAKSURA + LATIN SMALL LETTER L + ARABIC LETTER LAM [Arab,Latn]=>[]
		//IDNA:0xFDFC, // (﷼) RIAL SIGN [Arab]=>[Arab]
	],
	[
		// "ز" <Same>
		'632', // ARABIC LETTER ZAIN [Arab]=>[Arab]
		0x632, // (ز) ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0x1EE06, // (𞸆) ARABIC MATHEMATICAL ZAIN [Arab]=>[Arab]
		//IDNA:0x1EE86, // (𞺆) ARABIC MATHEMATICAL LOOPED ZAIN [Arab]=>[Arab]
		//IDNA:0x1EEA6, // (𞺦) ARABIC MATHEMATICAL DOUBLE-STRUCK ZAIN [Arab]=>[Arab]
		//IDNA:0xFEB0, // (ﺰ) ARABIC LETTER ZAIN FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEAF, // (ﺯ) ARABIC LETTER ZAIN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ز̂" <Same>
		'632 302', // ARABIC LETTER ZAIN + COMBINING CIRCUMFLEX ACCENT [Arab,Zinh]=>[Arab]
		//DISALLOW:0x8B2, // (ࢲ) ARABIC LETTER ZAIN WITH INVERTED V ABOVE [Arab]=>[Arab]
	],
	[
		// "ڗؕ" <Same>
		'697 615', // ARABIC LETTER REH WITH TWO DOTS ABOVE + ARABIC SMALL HIGH TAH [Arab]=>[Arab]
		0x771, // (ݱ) ARABIC LETTER REH WITH SMALL ARABIC LETTER TAH AND TWO DOTS [Arab]=>[Arab]
	],
	[
		// "س" <Same>
		'633', // ARABIC LETTER SEEN [Arab]=>[Arab]
		0x633, // (س) ARABIC LETTER SEEN [Arab]=>[Arab]
		//IDNA:0x1EE0E, // (𞸎) ARABIC MATHEMATICAL SEEN [Arab]=>[Arab]
		//IDNA:0x1EE2E, // (𞸮) ARABIC MATHEMATICAL INITIAL SEEN [Arab]=>[Arab]
		//IDNA:0x1EE4E, // (𞹎) ARABIC MATHEMATICAL TAILED SEEN [Arab]=>[Arab]
		//IDNA:0x1EE6E, // (𞹮) ARABIC MATHEMATICAL STRETCHED SEEN [Arab]=>[Arab]
		//IDNA:0x1EE8E, // (𞺎) ARABIC MATHEMATICAL LOOPED SEEN [Arab]=>[Arab]
		//IDNA:0x1EEAE, // (𞺮) ARABIC MATHEMATICAL DOUBLE-STRUCK SEEN [Arab]=>[Arab]
		//IDNA:0xFEB3, // (ﺳ) ARABIC LETTER SEEN INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB4, // (ﺴ) ARABIC LETTER SEEN MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB2, // (ﺲ) ARABIC LETTER SEEN FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB1, // (ﺱ) ARABIC LETTER SEEN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛ" <Same>
		'633 6DB', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x634, // (ش) ARABIC LETTER SHEEN [Arab]=>[Arab]
		//IDNA:0x1EE14, // (𞸔) ARABIC MATHEMATICAL SHEEN [Arab]=>[Arab]
		//IDNA:0x1EE34, // (𞸴) ARABIC MATHEMATICAL INITIAL SHEEN [Arab]=>[Arab]
		//IDNA:0x1EE54, // (𞹔) ARABIC MATHEMATICAL TAILED SHEEN [Arab]=>[Arab]
		//IDNA:0x1EE74, // (𞹴) ARABIC MATHEMATICAL STRETCHED SHEEN [Arab]=>[Arab]
		//IDNA:0x1EE94, // (𞺔) ARABIC MATHEMATICAL LOOPED SHEEN [Arab]=>[Arab]
		//IDNA:0x1EEB4, // (𞺴) ARABIC MATHEMATICAL DOUBLE-STRUCK SHEEN [Arab]=>[Arab]
		//IDNA:0xFEB7, // (ﺷ) ARABIC LETTER SHEEN INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB8, // (ﺸ) ARABIC LETTER SHEEN MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB6, // (ﺶ) ARABIC LETTER SHEEN FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB5, // (ﺵ) ARABIC LETTER SHEEN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "س̂" <Same>
		'633 302', // ARABIC LETTER SEEN + COMBINING CIRCUMFLEX ACCENT [Arab,Zinh]=>[Arab]
		//DISALLOW:0x77E, // (ݾ) ARABIC LETTER SEEN WITH INVERTED V [Arab]=>[Arab]
	],
	[
		// "سo" <Same>
		'633 6F', // ARABIC LETTER SEEN + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFD31, // (ﴱ) ARABIC LIGATURE SEEN WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE8, // (ﳨ) ARABIC LIGATURE SEEN WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "سۛo" <Same>
		'633 6DB 6F', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFD32, // (ﴲ) ARABIC LIGATURE SHEEN WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCEA, // (ﳪ) ARABIC LIGATURE SHEEN WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "سج" <Same>
		'633 62C', // ARABIC LETTER SEEN + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCAD, // (ﲭ) ARABIC LIGATURE SEEN WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD34, // (ﴴ) ARABIC LIGATURE SEEN WITH JEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC1C, // (ﰜ) ARABIC LIGATURE SEEN WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛج" <Same>
		'633 6DB 62C', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD2D, // (ﴭ) ARABIC LIGATURE SHEEN WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD37, // (ﴷ) ARABIC LIGATURE SHEEN WITH JEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD25, // (ﴥ) ARABIC LIGATURE SHEEN WITH JEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD09, // (ﴉ) ARABIC LIGATURE SHEEN WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سجح" <Same>
		'633 62C 62D', // ARABIC LETTER SEEN + ARABIC LETTER JEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD5D, // (ﵝ) ARABIC LIGATURE SEEN WITH JEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "سجى" <Same>
		'633 62C 649', // ARABIC LETTER SEEN + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD5E, // (ﵞ) ARABIC LIGATURE SEEN WITH JEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سۛجى" <Same>
		'633 6DB 62C 649', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD69, // (ﵩ) ARABIC LIGATURE SHEEN WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سح" <Same>
		'633 62D', // ARABIC LETTER SEEN + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCAE, // (ﲮ) ARABIC LIGATURE SEEN WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD35, // (ﴵ) ARABIC LIGATURE SEEN WITH HAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC1D, // (ﰝ) ARABIC LIGATURE SEEN WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛح" <Same>
		'633 6DB 62D', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD2E, // (ﴮ) ARABIC LIGATURE SHEEN WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD38, // (ﴸ) ARABIC LIGATURE SHEEN WITH HAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD26, // (ﴦ) ARABIC LIGATURE SHEEN WITH HAH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD0A, // (ﴊ) ARABIC LIGATURE SHEEN WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سحج" <Same>
		'633 62D 62C', // ARABIC LETTER SEEN + ARABIC LETTER HAH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD5C, // (ﵜ) ARABIC LIGATURE SEEN WITH HAH WITH JEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "سۛحم" <Same>
		'633 6DB 62D 645', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER HAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD68, // (ﵨ) ARABIC LIGATURE SHEEN WITH HAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD67, // (ﵧ) ARABIC LIGATURE SHEEN WITH HAH WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سۛحى" <Same>
		'633 6DB 62D 649', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDAA, // (ﶪ) ARABIC LIGATURE SHEEN WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سخ" <Same>
		'633 62E', // ARABIC LETTER SEEN + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCAF, // (ﲯ) ARABIC LIGATURE SEEN WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD36, // (ﴶ) ARABIC LIGATURE SEEN WITH KHAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC1E, // (ﰞ) ARABIC LIGATURE SEEN WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛخ" <Same>
		'633 6DB 62E', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFD2F, // (ﴯ) ARABIC LIGATURE SHEEN WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD39, // (ﴹ) ARABIC LIGATURE SHEEN WITH KHAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD27, // (ﴧ) ARABIC LIGATURE SHEEN WITH KHAH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD0B, // (ﴋ) ARABIC LIGATURE SHEEN WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سخى" <Same>
		'633 62E 649', // ARABIC LETTER SEEN + ARABIC LETTER KHAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA8, // (ﶨ) ARABIC LIGATURE SEEN WITH KHAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDC6, // (ﷆ) ARABIC LIGATURE SEEN WITH KHAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سر" <Same>
		'633 631', // ARABIC LETTER SEEN + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFD2A, // (ﴪ) ARABIC LIGATURE SEEN WITH REH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD0E, // (ﴎ) ARABIC LIGATURE SEEN WITH REH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛر" <Same>
		'633 6DB 631', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFD29, // (ﴩ) ARABIC LIGATURE SHEEN WITH REH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD0D, // (ﴍ) ARABIC LIGATURE SHEEN WITH REH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سم" <Same>
		'633 645', // ARABIC LETTER SEEN + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCB0, // (ﲰ) ARABIC LIGATURE SEEN WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE7, // (ﳧ) ARABIC LIGATURE SEEN WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC1F, // (ﰟ) ARABIC LIGATURE SEEN WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛم" <Same>
		'633 6DB 645', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD30, // (ﴰ) ARABIC LIGATURE SHEEN WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE9, // (ﳩ) ARABIC LIGATURE SHEEN WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD28, // (ﴨ) ARABIC LIGATURE SHEEN WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD0C, // (ﴌ) ARABIC LIGATURE SHEEN WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سمج" <Same>
		'633 645 62C', // ARABIC LETTER SEEN + ARABIC LETTER MEEM + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD61, // (ﵡ) ARABIC LIGATURE SEEN WITH MEEM WITH JEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "سمح" <Same>
		'633 645 62D', // ARABIC LETTER SEEN + ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD60, // (ﵠ) ARABIC LIGATURE SEEN WITH MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD5F, // (ﵟ) ARABIC LIGATURE SEEN WITH MEEM WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سۛمخ" <Same>
		'633 6DB 645 62E', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER MEEM + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFD6B, // (ﵫ) ARABIC LIGATURE SHEEN WITH MEEM WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD6A, // (ﵪ) ARABIC LIGATURE SHEEN WITH MEEM WITH KHAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سمم" <Same>
		'633 645 645', // ARABIC LETTER SEEN + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD63, // (ﵣ) ARABIC LIGATURE SEEN WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD62, // (ﵢ) ARABIC LIGATURE SEEN WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سۛمم" <Same>
		'633 6DB 645 645', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD6D, // (ﵭ) ARABIC LIGATURE SHEEN WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD6C, // (ﵬ) ARABIC LIGATURE SHEEN WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "سى" <Same>
		'633 649', // ARABIC LETTER SEEN + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD17, // (ﴗ) ARABIC LIGATURE SEEN WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCFB, // (ﳻ) ARABIC LIGATURE SEEN WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD18, // (ﴘ) ARABIC LIGATURE SEEN WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCFC, // (ﳼ) ARABIC LIGATURE SEEN WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "سۛى" <Same>
		'633 6DB 649', // ARABIC LETTER SEEN + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD19, // (ﴙ) ARABIC LIGATURE SHEEN WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCFD, // (ﳽ) ARABIC LIGATURE SHEEN WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD1A, // (ﴚ) ARABIC LIGATURE SHEEN WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCFE, // (ﳾ) ARABIC LIGATURE SHEEN WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ص" <Same>
		'635', // ARABIC LETTER SAD [Arab]=>[Arab]
		0x635, // (ص) ARABIC LETTER SAD [Arab]=>[Arab]
		//DISALLOW:0x102F2, // (𐋲) COPTIC EPACT NUMBER NINETY [Zyyy]=>[Arab Copt]
		//IDNA:0x1EE11, // (𞸑) ARABIC MATHEMATICAL SAD [Arab]=>[Arab]
		//IDNA:0x1EE31, // (𞸱) ARABIC MATHEMATICAL INITIAL SAD [Arab]=>[Arab]
		//IDNA:0x1EE51, // (𞹑) ARABIC MATHEMATICAL TAILED SAD [Arab]=>[Arab]
		//IDNA:0x1EE71, // (𞹱) ARABIC MATHEMATICAL STRETCHED SAD [Arab]=>[Arab]
		//IDNA:0x1EE91, // (𞺑) ARABIC MATHEMATICAL LOOPED SAD [Arab]=>[Arab]
		//IDNA:0x1EEB1, // (𞺱) ARABIC MATHEMATICAL DOUBLE-STRUCK SAD [Arab]=>[Arab]
		//IDNA:0xFEBB, // (ﺻ) ARABIC LETTER SAD INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEBC, // (ﺼ) ARABIC LETTER SAD MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEBA, // (ﺺ) ARABIC LETTER SAD FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEB9, // (ﺹ) ARABIC LETTER SAD ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "صۛ" <Same>
		'635 6DB', // ARABIC LETTER SAD + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x69E, // (ڞ) ARABIC LETTER SAD WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "ص̤̣" <Same>
		'635 324 323', // ARABIC LETTER SAD + COMBINING DIAERESIS BELOW + COMBINING DOT BELOW [Arab,Zinh]=>[Arab]
		//DISALLOW:0x8AF, // (ࢯ) ARABIC LETTER SAD WITH THREE DOTS BELOW [Arab]=>[Arab]
	],
	[
		// "صح" <Same>
		'635 62D', // ARABIC LETTER SAD + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCB1, // (ﲱ) ARABIC LIGATURE SAD WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC20, // (ﰠ) ARABIC LIGATURE SAD WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "صحح" <Same>
		'635 62D 62D', // ARABIC LETTER SAD + ARABIC LETTER HAH + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD65, // (ﵥ) ARABIC LIGATURE SAD WITH HAH WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD64, // (ﵤ) ARABIC LIGATURE SAD WITH HAH WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "صحى" <Same>
		'635 62D 649', // ARABIC LETTER SAD + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDA9, // (ﶩ) ARABIC LIGATURE SAD WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "صخ" <Same>
		'635 62E', // ARABIC LETTER SAD + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCB2, // (ﲲ) ARABIC LIGATURE SAD WITH KHAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "صر" <Same>
		'635 631', // ARABIC LETTER SAD + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFD2B, // (ﴫ) ARABIC LIGATURE SAD WITH REH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD0F, // (ﴏ) ARABIC LIGATURE SAD WITH REH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "صلعم" <Same>
		'635 644 639 645', // ARABIC LETTER SAD + ARABIC LETTER LAM + ARABIC LETTER AIN + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDF5, // (ﷵ) ARABIC LIGATURE SALAM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "صلى" <Same>
		'635 644 649', // ARABIC LETTER SAD + ARABIC LETTER LAM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDF9, // (ﷹ) ARABIC LIGATURE SALLA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFDF0, // (ﷰ) ARABIC LIGATURE SALLA USED AS KORANIC STOP SIGN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "صلى lللo علىo وسلم" <Same>
		'635 644 649 20 6C 644 644 6F 20 639 644 649 6F 20 648 633 644 645', // ARABIC LETTER SAD + ARABIC LETTER LAM + ARABIC LETTER ALEF MAKSURA + SPACE + LATIN SMALL LETTER L + ARABIC LETTER LAM + ARABIC LETTER LAM + LATIN SMALL LETTER O + SPACE + ARABIC LETTER AIN + ARABIC LETTER LAM + ARABIC LETTER ALEF MAKSURA + LATIN SMALL LETTER O + SPACE + ARABIC LETTER WAW + ARABIC LETTER SEEN + ARABIC LETTER LAM + ARABIC LETTER MEEM [Arab,Zyyy,Latn]=>[]
		//IDNA:0xFDFA, // (ﷺ) ARABIC LIGATURE SALLALLAHOU ALAYHE WASALLAM [Arab]=>[Arab]
	],
	[
		// "صم" <Same>
		'635 645', // ARABIC LETTER SAD + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCB3, // (ﲳ) ARABIC LIGATURE SAD WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC21, // (ﰡ) ARABIC LIGATURE SAD WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "صمم" <Same>
		'635 645 645', // ARABIC LETTER SAD + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDC5, // (ﷅ) ARABIC LIGATURE SAD WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD66, // (ﵦ) ARABIC LIGATURE SAD WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "صى" <Same>
		'635 649', // ARABIC LETTER SAD + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD21, // (ﴡ) ARABIC LIGATURE SAD WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD05, // (ﴅ) ARABIC LIGATURE SAD WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD22, // (ﴢ) ARABIC LIGATURE SAD WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD06, // (ﴆ) ARABIC LIGATURE SAD WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ض" <Same>
		'636', // ARABIC LETTER DAD [Arab]=>[Arab]
		0x636, // (ض) ARABIC LETTER DAD [Arab]=>[Arab]
		//IDNA:0x1EE19, // (𞸙) ARABIC MATHEMATICAL DAD [Arab]=>[Arab]
		//IDNA:0x1EE39, // (𞸹) ARABIC MATHEMATICAL INITIAL DAD [Arab]=>[Arab]
		//IDNA:0x1EE59, // (𞹙) ARABIC MATHEMATICAL TAILED DAD [Arab]=>[Arab]
		//IDNA:0x1EE79, // (𞹹) ARABIC MATHEMATICAL STRETCHED DAD [Arab]=>[Arab]
		//IDNA:0x1EE99, // (𞺙) ARABIC MATHEMATICAL LOOPED DAD [Arab]=>[Arab]
		//IDNA:0x1EEB9, // (𞺹) ARABIC MATHEMATICAL DOUBLE-STRUCK DAD [Arab]=>[Arab]
		//IDNA:0xFEBF, // (ﺿ) ARABIC LETTER DAD INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC0, // (ﻀ) ARABIC LETTER DAD MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEBE, // (ﺾ) ARABIC LETTER DAD FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEBD, // (ﺽ) ARABIC LETTER DAD ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ضج" <Same>
		'636 62C', // ARABIC LETTER DAD + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCB4, // (ﲴ) ARABIC LIGATURE DAD WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC22, // (ﰢ) ARABIC LIGATURE DAD WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ضح" <Same>
		'636 62D', // ARABIC LETTER DAD + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCB5, // (ﲵ) ARABIC LIGATURE DAD WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC23, // (ﰣ) ARABIC LIGATURE DAD WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ضحى" <Same>
		'636 62D 649', // ARABIC LETTER DAD + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD6E, // (ﵮ) ARABIC LIGATURE DAD WITH HAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDAB, // (ﶫ) ARABIC LIGATURE DAD WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ضخ" <Same>
		'636 62E', // ARABIC LETTER DAD + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCB6, // (ﲶ) ARABIC LIGATURE DAD WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC24, // (ﰤ) ARABIC LIGATURE DAD WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ضخم" <Same>
		'636 62E 645', // ARABIC LETTER DAD + ARABIC LETTER KHAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD70, // (ﵰ) ARABIC LIGATURE DAD WITH KHAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD6F, // (ﵯ) ARABIC LIGATURE DAD WITH KHAH WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ضر" <Same>
		'636 631', // ARABIC LETTER DAD + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFD2C, // (ﴬ) ARABIC LIGATURE DAD WITH REH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD10, // (ﴐ) ARABIC LIGATURE DAD WITH REH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ضم" <Same>
		'636 645', // ARABIC LETTER DAD + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCB7, // (ﲷ) ARABIC LIGATURE DAD WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC25, // (ﰥ) ARABIC LIGATURE DAD WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ضى" <Same>
		'636 649', // ARABIC LETTER DAD + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD23, // (ﴣ) ARABIC LIGATURE DAD WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD07, // (ﴇ) ARABIC LIGATURE DAD WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD24, // (ﴤ) ARABIC LIGATURE DAD WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD08, // (ﴈ) ARABIC LIGATURE DAD WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ط" <Same>
		'637', // ARABIC LETTER TAH [Arab]=>[Arab]
		0x637, // (ط) ARABIC LETTER TAH [Arab]=>[Arab]
		//DISALLOW:0x102E8, // (𐋨) COPTIC EPACT DIGIT EIGHT [Zyyy]=>[Arab Copt]
		//IDNA:0x1EE08, // (𞸈) ARABIC MATHEMATICAL TAH [Arab]=>[Arab]
		//IDNA:0x1EE68, // (𞹨) ARABIC MATHEMATICAL STRETCHED TAH [Arab]=>[Arab]
		//IDNA:0x1EE88, // (𞺈) ARABIC MATHEMATICAL LOOPED TAH [Arab]=>[Arab]
		//IDNA:0x1EEA8, // (𞺨) ARABIC MATHEMATICAL DOUBLE-STRUCK TAH [Arab]=>[Arab]
		//IDNA:0xFEC3, // (ﻃ) ARABIC LETTER TAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC4, // (ﻄ) ARABIC LETTER TAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC2, // (ﻂ) ARABIC LETTER TAH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC1, // (ﻁ) ARABIC LETTER TAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "طۛ" <Same>
		'637 6DB', // ARABIC LETTER TAH + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x69F, // (ڟ) ARABIC LETTER TAH WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "طح" <Same>
		'637 62D', // ARABIC LETTER TAH + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCB8, // (ﲸ) ARABIC LIGATURE TAH WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC26, // (ﰦ) ARABIC LIGATURE TAH WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "طم" <Same>
		'637 645', // ARABIC LETTER TAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD33, // (ﴳ) ARABIC LIGATURE TAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD3A, // (ﴺ) ARABIC LIGATURE TAH WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC27, // (ﰧ) ARABIC LIGATURE TAH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "طمح" <Same>
		'637 645 62D', // ARABIC LETTER TAH + ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD72, // (ﵲ) ARABIC LIGATURE TAH WITH MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD71, // (ﵱ) ARABIC LIGATURE TAH WITH MEEM WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "طمم" <Same>
		'637 645 645', // ARABIC LETTER TAH + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD73, // (ﵳ) ARABIC LIGATURE TAH WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "طمى" <Same>
		'637 645 649', // ARABIC LETTER TAH + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD74, // (ﵴ) ARABIC LIGATURE TAH WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "طى" <Same>
		'637 649', // ARABIC LETTER TAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD11, // (ﴑ) ARABIC LIGATURE TAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF5, // (ﳵ) ARABIC LIGATURE TAH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD12, // (ﴒ) ARABIC LIGATURE TAH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF6, // (ﳶ) ARABIC LIGATURE TAH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ظ" <Same>
		'638', // ARABIC LETTER ZAH [Arab]=>[Arab]
		0x638, // (ظ) ARABIC LETTER ZAH [Arab]=>[Arab]
		//IDNA:0x1EE1A, // (𞸚) ARABIC MATHEMATICAL ZAH [Arab]=>[Arab]
		//IDNA:0x1EE7A, // (𞹺) ARABIC MATHEMATICAL STRETCHED ZAH [Arab]=>[Arab]
		//IDNA:0x1EE9A, // (𞺚) ARABIC MATHEMATICAL LOOPED ZAH [Arab]=>[Arab]
		//IDNA:0x1EEBA, // (𞺺) ARABIC MATHEMATICAL DOUBLE-STRUCK ZAH [Arab]=>[Arab]
		//IDNA:0xFEC7, // (ﻇ) ARABIC LETTER ZAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC8, // (ﻈ) ARABIC LETTER ZAH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC6, // (ﻆ) ARABIC LETTER ZAH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC5, // (ﻅ) ARABIC LETTER ZAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ظم" <Same>
		'638 645', // ARABIC LETTER ZAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCB9, // (ﲹ) ARABIC LIGATURE ZAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD3B, // (ﴻ) ARABIC LIGATURE ZAH WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC28, // (ﰨ) ARABIC LIGATURE ZAH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ع" <Same>
		'639', // ARABIC LETTER AIN [Arab]=>[Arab]
		allow(0x639), // (ع) ARABIC LETTER AIN [Arab]=>[Arab]
		0x60F, // (؏) ARABIC SIGN MISRA [Arab]=>[Arab]
		//IDNA:0x1EE0F, // (𞸏) ARABIC MATHEMATICAL AIN [Arab]=>[Arab]
		//IDNA:0x1EE2F, // (𞸯) ARABIC MATHEMATICAL INITIAL AIN [Arab]=>[Arab]
		//IDNA:0x1EE4F, // (𞹏) ARABIC MATHEMATICAL TAILED AIN [Arab]=>[Arab]
		//IDNA:0x1EE6F, // (𞹯) ARABIC MATHEMATICAL STRETCHED AIN [Arab]=>[Arab]
		//IDNA:0x1EE8F, // (𞺏) ARABIC MATHEMATICAL LOOPED AIN [Arab]=>[Arab]
		//IDNA:0x1EEAF, // (𞺯) ARABIC MATHEMATICAL DOUBLE-STRUCK AIN [Arab]=>[Arab]
		//IDNA:0xFECB, // (ﻋ) ARABIC LETTER AIN INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFECC, // (ﻌ) ARABIC LETTER AIN MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFECA, // (ﻊ) ARABIC LETTER AIN FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEC9, // (ﻉ) ARABIC LETTER AIN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "عج" <Same>
		'639 62C', // ARABIC LETTER AIN + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCBA, // (ﲺ) ARABIC LIGATURE AIN WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC29, // (ﰩ) ARABIC LIGATURE AIN WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "عجم" <Same>
		'639 62C 645', // ARABIC LETTER AIN + ARABIC LETTER JEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDC4, // (ﷄ) ARABIC LIGATURE AIN WITH JEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD75, // (ﵵ) ARABIC LIGATURE AIN WITH JEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "علىo" <Same>
		'639 644 649 6F', // ARABIC LETTER AIN + ARABIC LETTER LAM + ARABIC LETTER ALEF MAKSURA + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFDF7, // (ﷷ) ARABIC LIGATURE ALAYHE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "عم" <Same>
		'639 645', // ARABIC LETTER AIN + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCBB, // (ﲻ) ARABIC LIGATURE AIN WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC2A, // (ﰪ) ARABIC LIGATURE AIN WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "عمم" <Same>
		'639 645 645', // ARABIC LETTER AIN + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD77, // (ﵷ) ARABIC LIGATURE AIN WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD76, // (ﵶ) ARABIC LIGATURE AIN WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "عمى" <Same>
		'639 645 649', // ARABIC LETTER AIN + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD78, // (ﵸ) ARABIC LIGATURE AIN WITH MEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDB6, // (ﶶ) ARABIC LIGATURE AIN WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "عى" <Same>
		'639 649', // ARABIC LETTER AIN + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD13, // (ﴓ) ARABIC LIGATURE AIN WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF7, // (ﳷ) ARABIC LIGATURE AIN WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD14, // (ﴔ) ARABIC LIGATURE AIN WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF8, // (ﳸ) ARABIC LIGATURE AIN WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "غ" <Same>
		'63A', // ARABIC LETTER GHAIN [Arab]=>[Arab]
		0x63A, // (غ) ARABIC LETTER GHAIN [Arab]=>[Arab]
		//IDNA:0x1EE1B, // (𞸛) ARABIC MATHEMATICAL GHAIN [Arab]=>[Arab]
		//IDNA:0x1EE3B, // (𞸻) ARABIC MATHEMATICAL INITIAL GHAIN [Arab]=>[Arab]
		//IDNA:0x1EE5B, // (𞹛) ARABIC MATHEMATICAL TAILED GHAIN [Arab]=>[Arab]
		//IDNA:0x1EE7B, // (𞹻) ARABIC MATHEMATICAL STRETCHED GHAIN [Arab]=>[Arab]
		//IDNA:0x1EE9B, // (𞺛) ARABIC MATHEMATICAL LOOPED GHAIN [Arab]=>[Arab]
		//IDNA:0x1EEBB, // (𞺻) ARABIC MATHEMATICAL DOUBLE-STRUCK GHAIN [Arab]=>[Arab]
		//IDNA:0xFECF, // (ﻏ) ARABIC LETTER GHAIN INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFED0, // (ﻐ) ARABIC LETTER GHAIN MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFECE, // (ﻎ) ARABIC LETTER GHAIN FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFECD, // (ﻍ) ARABIC LETTER GHAIN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "غج" <Same>
		'63A 62C', // ARABIC LETTER GHAIN + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCBC, // (ﲼ) ARABIC LIGATURE GHAIN WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC2B, // (ﰫ) ARABIC LIGATURE GHAIN WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "غم" <Same>
		'63A 645', // ARABIC LETTER GHAIN + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCBD, // (ﲽ) ARABIC LIGATURE GHAIN WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC2C, // (ﰬ) ARABIC LIGATURE GHAIN WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "غمم" <Same>
		'63A 645 645', // ARABIC LETTER GHAIN + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD79, // (ﵹ) ARABIC LIGATURE GHAIN WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "غمى" <Same>
		'63A 645 649', // ARABIC LETTER GHAIN + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD7B, // (ﵻ) ARABIC LIGATURE GHAIN WITH MEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD7A, // (ﵺ) ARABIC LIGATURE GHAIN WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "غى" <Same>
		'63A 649', // ARABIC LETTER GHAIN + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD15, // (ﴕ) ARABIC LIGATURE GHAIN WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF9, // (ﳹ) ARABIC LIGATURE GHAIN WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFD16, // (ﴖ) ARABIC LIGATURE GHAIN WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFCFA, // (ﳺ) ARABIC LIGATURE GHAIN WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ف" <Same>
		'641', // ARABIC LETTER FEH [Arab]=>[Arab]
		allow(0x641), // (ف) ARABIC LETTER FEH [Arab]=>[Arab]
		//IDNA:0x1EE10, // (𞸐) ARABIC MATHEMATICAL FEH [Arab]=>[Arab]
		//IDNA:0x1EE30, // (𞸰) ARABIC MATHEMATICAL INITIAL FEH [Arab]=>[Arab]
		//IDNA:0x1EE70, // (𞹰) ARABIC MATHEMATICAL STRETCHED FEH [Arab]=>[Arab]
		//IDNA:0x1EE90, // (𞺐) ARABIC MATHEMATICAL LOOPED FEH [Arab]=>[Arab]
		//IDNA:0x1EEB0, // (𞺰) ARABIC MATHEMATICAL DOUBLE-STRUCK FEH [Arab]=>[Arab]
		//IDNA:0xFED3, // (ﻓ) ARABIC LETTER FEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFED4, // (ﻔ) ARABIC LETTER FEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFED2, // (ﻒ) ARABIC LETTER FEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFED1, // (ﻑ) ARABIC LETTER FEH ISOLATED FORM [Arab]=>[Arab]
		0x6A7, // (ڧ) ARABIC LETTER QAF WITH DOT ABOVE [Arab]=>[Arab]
	],
	[
		// "فج" <Same>
		'641 62C', // ARABIC LETTER FEH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCBE, // (ﲾ) ARABIC LIGATURE FEH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC2D, // (ﰭ) ARABIC LIGATURE FEH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "فح" <Same>
		'641 62D', // ARABIC LETTER FEH + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCBF, // (ﲿ) ARABIC LIGATURE FEH WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC2E, // (ﰮ) ARABIC LIGATURE FEH WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "فخ" <Same>
		'641 62E', // ARABIC LETTER FEH + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCC0, // (ﳀ) ARABIC LIGATURE FEH WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC2F, // (ﰯ) ARABIC LIGATURE FEH WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "فخم" <Same>
		'641 62E 645', // ARABIC LETTER FEH + ARABIC LETTER KHAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD7D, // (ﵽ) ARABIC LIGATURE FEH WITH KHAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD7C, // (ﵼ) ARABIC LIGATURE FEH WITH KHAH WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "فم" <Same>
		'641 645', // ARABIC LETTER FEH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCC1, // (ﳁ) ARABIC LIGATURE FEH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC30, // (ﰰ) ARABIC LIGATURE FEH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "فمى" <Same>
		'641 645 649', // ARABIC LETTER FEH + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDC1, // (ﷁ) ARABIC LIGATURE FEH WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "فى" <Same>
		'641 649', // ARABIC LETTER FEH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC7C, // (ﱼ) ARABIC LIGATURE FEH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC31, // (ﰱ) ARABIC LIGATURE FEH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC7D, // (ﱽ) ARABIC LIGATURE FEH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC32, // (ﰲ) ARABIC LIGATURE FEH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڡ" <Same>
		'6A1', // ARABIC LETTER DOTLESS FEH [Arab]=>[Arab]
		//DISALLOW:0x6A1, // (ڡ) ARABIC LETTER DOTLESS FEH [Arab]=>[Arab]
		//IDNA:0x1EE1E, // (𞸞) ARABIC MATHEMATICAL DOTLESS FEH [Arab]=>[Arab]
		//IDNA:0x1EE7E, // (𞹾) ARABIC MATHEMATICAL STRETCHED DOTLESS FEH [Arab]=>[Arab]
		0x8BB, // (ࢻ) ARABIC LETTER AFRICAN FEH [Arab]=>[Arab]
		//DISALLOW:0x66F, // (ٯ) ARABIC LETTER DOTLESS QAF [Arab]=>[Arab]
		//IDNA:0x1EE1F, // (𞸟) ARABIC MATHEMATICAL DOTLESS QAF [Arab]=>[Arab]
		//IDNA:0x1EE5F, // (𞹟) ARABIC MATHEMATICAL TAILED DOTLESS QAF [Arab]=>[Arab]
		0x8BC, // (ࢼ) ARABIC LETTER AFRICAN QAF [Arab]=>[Arab]
	],
	[
		// "ڡۛ" <Same>
		'6A1 6DB', // ARABIC LETTER DOTLESS FEH + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x6A4, // (ڤ) ARABIC LETTER VEH [Arab]=>[Arab]
		//IDNA:0xFB6C, // (ﭬ) ARABIC LETTER VEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB6D, // (ﭭ) ARABIC LETTER VEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB6B, // (ﭫ) ARABIC LETTER VEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB6A, // (ﭪ) ARABIC LETTER VEH ISOLATED FORM [Arab]=>[Arab]
		0x6A8, // (ڨ) ARABIC LETTER QAF WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "ڢۛ" <Same>
		'6A2 6DB', // ARABIC LETTER FEH WITH DOT MOVED BELOW + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x8A4, // (ࢤ) ARABIC LETTER FEH WITH DOT BELOW AND THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "ڦ" <Same>
		'6A6', // ARABIC LETTER PEHEH [Arab]=>[Arab]
		0x6A6, // (ڦ) ARABIC LETTER PEHEH [Arab]=>[Arab]
		//IDNA:0xFB70, // (ﭰ) ARABIC LETTER PEHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB71, // (ﭱ) ARABIC LETTER PEHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB6F, // (ﭯ) ARABIC LETTER PEHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB6E, // (ﭮ) ARABIC LETTER PEHEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ق" <Same>
		'642', // ARABIC LETTER QAF [Arab]=>[Arab]
		0x642, // (ق) ARABIC LETTER QAF [Arab]=>[Arab]
		//IDNA:0x1EE12, // (𞸒) ARABIC MATHEMATICAL QAF [Arab]=>[Arab]
		//IDNA:0x1EE32, // (𞸲) ARABIC MATHEMATICAL INITIAL QAF [Arab]=>[Arab]
		//IDNA:0x1EE52, // (𞹒) ARABIC MATHEMATICAL TAILED QAF [Arab]=>[Arab]
		//IDNA:0x1EE72, // (𞹲) ARABIC MATHEMATICAL STRETCHED QAF [Arab]=>[Arab]
		//IDNA:0x1EE92, // (𞺒) ARABIC MATHEMATICAL LOOPED QAF [Arab]=>[Arab]
		//IDNA:0x1EEB2, // (𞺲) ARABIC MATHEMATICAL DOUBLE-STRUCK QAF [Arab]=>[Arab]
		//IDNA:0xFED7, // (ﻗ) ARABIC LETTER QAF INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFED8, // (ﻘ) ARABIC LETTER QAF MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFED6, // (ﻖ) ARABIC LETTER QAF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFED5, // (ﻕ) ARABIC LETTER QAF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "قح" <Same>
		'642 62D', // ARABIC LETTER QAF + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCC2, // (ﳂ) ARABIC LIGATURE QAF WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC33, // (ﰳ) ARABIC LIGATURE QAF WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "قلى" <Same>
		'642 644 649', // ARABIC LETTER QAF + ARABIC LETTER LAM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDF1, // (ﷱ) ARABIC LIGATURE QALA USED AS KORANIC STOP SIGN ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "قم" <Same>
		'642 645', // ARABIC LETTER QAF + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCC3, // (ﳃ) ARABIC LIGATURE QAF WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC34, // (ﰴ) ARABIC LIGATURE QAF WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "قمح" <Same>
		'642 645 62D', // ARABIC LETTER QAF + ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFDB4, // (ﶴ) ARABIC LIGATURE QAF WITH MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD7E, // (ﵾ) ARABIC LIGATURE QAF WITH MEEM WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "قمم" <Same>
		'642 645 645', // ARABIC LETTER QAF + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD7F, // (ﵿ) ARABIC LIGATURE QAF WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "قمى" <Same>
		'642 645 649', // ARABIC LETTER QAF + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDB2, // (ﶲ) ARABIC LIGATURE QAF WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "قى" <Same>
		'642 649', // ARABIC LETTER QAF + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC7E, // (ﱾ) ARABIC LIGATURE QAF WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC35, // (ﰵ) ARABIC LIGATURE QAF WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC7F, // (ﱿ) ARABIC LIGATURE QAF WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC36, // (ﰶ) ARABIC LIGATURE QAF WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ك" <Same>
		'643', // ARABIC LETTER KAF [Arab]=>[Arab]
		allow(0x643), // (ك) ARABIC LETTER KAF [Arab]=>[Arab]
		//IDNA:0x1EE0A, // (𞸊) ARABIC MATHEMATICAL KAF [Arab]=>[Arab]
		//IDNA:0x1EE2A, // (𞸪) ARABIC MATHEMATICAL INITIAL KAF [Arab]=>[Arab]
		//IDNA:0x1EE6A, // (𞹪) ARABIC MATHEMATICAL STRETCHED KAF [Arab]=>[Arab]
		//IDNA:0xFEDB, // (ﻛ) ARABIC LETTER KAF INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEDC, // (ﻜ) ARABIC LETTER KAF MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEDA, // (ﻚ) ARABIC LETTER KAF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFED9, // (ﻙ) ARABIC LETTER KAF ISOLATED FORM [Arab]=>[Arab]
		allow(0x6A9), // (ک) ARABIC LETTER KEHEH [Arab]=>[Arab]
		//IDNA:0xFB90, // (ﮐ) ARABIC LETTER KEHEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB91, // (ﮑ) ARABIC LETTER KEHEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB8F, // (ﮏ) ARABIC LETTER KEHEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB8E, // (ﮎ) ARABIC LETTER KEHEH ISOLATED FORM [Arab]=>[Arab]
		0x6AA, // (ڪ) ARABIC LETTER SWASH KAF [Arab]=>[Arab]
	],
	[
		// "كۛ" <Same>
		'643 6DB', // ARABIC LETTER KAF + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x6AD, // (ڭ) ARABIC LETTER NG [Arab]=>[Arab]
		//IDNA:0xFBD5, // (ﯕ) ARABIC LETTER NG INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBD6, // (ﯖ) ARABIC LETTER NG MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBD4, // (ﯔ) ARABIC LETTER NG FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBD3, // (ﯓ) ARABIC LETTER NG ISOLATED FORM [Arab]=>[Arab]
		0x763, // (ݣ) ARABIC LETTER KEHEH WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "كl" <Same>
		'643 6C', // ARABIC LETTER KAF + LATIN SMALL LETTER L [Arab,Latn]=>[]
		//IDNA:0xFC80, // (ﲀ) ARABIC LIGATURE KAF WITH ALEF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC37, // (ﰷ) ARABIC LIGATURE KAF WITH ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "كج" <Same>
		'643 62C', // ARABIC LETTER KAF + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCC4, // (ﳄ) ARABIC LIGATURE KAF WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC38, // (ﰸ) ARABIC LIGATURE KAF WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "كح" <Same>
		'643 62D', // ARABIC LETTER KAF + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCC5, // (ﳅ) ARABIC LIGATURE KAF WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC39, // (ﰹ) ARABIC LIGATURE KAF WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "كخ" <Same>
		'643 62E', // ARABIC LETTER KAF + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCC6, // (ﳆ) ARABIC LIGATURE KAF WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC3A, // (ﰺ) ARABIC LIGATURE KAF WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "كل" <Same>
		'643 644', // ARABIC LETTER KAF + ARABIC LETTER LAM [Arab]=>[Arab]
		//IDNA:0xFCC7, // (ﳇ) ARABIC LIGATURE KAF WITH LAM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCEB, // (ﳫ) ARABIC LIGATURE KAF WITH LAM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC81, // (ﲁ) ARABIC LIGATURE KAF WITH LAM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC3B, // (ﰻ) ARABIC LIGATURE KAF WITH LAM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "كم" <Same>
		'643 645', // ARABIC LETTER KAF + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCC8, // (ﳈ) ARABIC LIGATURE KAF WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCEC, // (ﳬ) ARABIC LIGATURE KAF WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC82, // (ﲂ) ARABIC LIGATURE KAF WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC3C, // (ﰼ) ARABIC LIGATURE KAF WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "كمم" <Same>
		'643 645 645', // ARABIC LETTER KAF + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDC3, // (ﷃ) ARABIC LIGATURE KAF WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFDBB, // (ﶻ) ARABIC LIGATURE KAF WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "كمى" <Same>
		'643 645 649', // ARABIC LETTER KAF + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDB7, // (ﶷ) ARABIC LIGATURE KAF WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "كى" <Same>
		'643 649', // ARABIC LETTER KAF + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC83, // (ﲃ) ARABIC LIGATURE KAF WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC3D, // (ﰽ) ARABIC LIGATURE KAF WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC84, // (ﲄ) ARABIC LIGATURE KAF WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC3E, // (ﰾ) ARABIC LIGATURE KAF WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڬ" <Same>
		'6AC', // ARABIC LETTER KAF WITH DOT ABOVE [Arab]=>[Arab]
		0x6AC, // (ڬ) ARABIC LETTER KAF WITH DOT ABOVE [Arab]=>[Arab]
		0x762, // (ݢ) ARABIC LETTER KEHEH WITH DOT ABOVE [Arab]=>[Arab]
	],
	[
		// "گ" <Same>
		'6AF', // ARABIC LETTER GAF [Arab]=>[Arab]
		0x6AF, // (گ) ARABIC LETTER GAF [Arab]=>[Arab]
		//IDNA:0xFB94, // (ﮔ) ARABIC LETTER GAF INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB95, // (ﮕ) ARABIC LETTER GAF MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB93, // (ﮓ) ARABIC LETTER GAF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB92, // (ﮒ) ARABIC LETTER GAF ISOLATED FORM [Arab]=>[Arab]
		//DISALLOW:0x8B0, // (ࢰ) ARABIC LETTER GAF WITH INVERTED STROKE [Arab]=>[Arab]
	],
	[
		// "گۛ" <Same>
		'6AF 6DB', // ARABIC LETTER GAF + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x6B4, // (ڴ) ARABIC LETTER GAF WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "ڱ" <Same>
		'6B1', // ARABIC LETTER NGOEH [Arab]=>[Arab]
		0x6B1, // (ڱ) ARABIC LETTER NGOEH [Arab]=>[Arab]
		//IDNA:0xFB9C, // (ﮜ) ARABIC LETTER NGOEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB9D, // (ﮝ) ARABIC LETTER NGOEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB9B, // (ﮛ) ARABIC LETTER NGOEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB9A, // (ﮚ) ARABIC LETTER NGOEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ڳ" <Same>
		'6B3', // ARABIC LETTER GUEH [Arab]=>[Arab]
		0x6B3, // (ڳ) ARABIC LETTER GUEH [Arab]=>[Arab]
		//IDNA:0xFB98, // (ﮘ) ARABIC LETTER GUEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB99, // (ﮙ) ARABIC LETTER GUEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB97, // (ﮗ) ARABIC LETTER GUEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB96, // (ﮖ) ARABIC LETTER GUEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ل" <Same>
		'644', // ARABIC LETTER LAM [Arab]=>[Arab]
		0x644, // (ل) ARABIC LETTER LAM [Arab]=>[Arab]
		//IDNA:0x1EE0B, // (𞸋) ARABIC MATHEMATICAL LAM [Arab]=>[Arab]
		//IDNA:0x1EE2B, // (𞸫) ARABIC MATHEMATICAL INITIAL LAM [Arab]=>[Arab]
		//IDNA:0x1EE4B, // (𞹋) ARABIC MATHEMATICAL TAILED LAM [Arab]=>[Arab]
		//IDNA:0x1EE8B, // (𞺋) ARABIC MATHEMATICAL LOOPED LAM [Arab]=>[Arab]
		//IDNA:0x1EEAB, // (𞺫) ARABIC MATHEMATICAL DOUBLE-STRUCK LAM [Arab]=>[Arab]
		//IDNA:0xFEDF, // (ﻟ) ARABIC LETTER LAM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE0, // (ﻠ) ARABIC LETTER LAM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEDE, // (ﻞ) ARABIC LETTER LAM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEDD, // (ﻝ) ARABIC LETTER LAM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لۛ" <Same>
		'644 6DB', // ARABIC LETTER LAM + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x6B7, // (ڷ) ARABIC LETTER LAM WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "ل̆" <Same>
		'644 306', // ARABIC LETTER LAM + COMBINING BREVE [Arab,Zinh]=>[Arab]
		0x6B5, // (ڵ) ARABIC LETTER LAM WITH SMALL V [Arab]=>[Arab]
	],
	[
		// "لl" <Same>
		'644 6C', // ARABIC LETTER LAM + LATIN SMALL LETTER L [Arab,Latn]=>[]
		//IDNA:0xFEFC, // (ﻼ) ARABIC LIGATURE LAM WITH ALEF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEFB, // (ﻻ) ARABIC LIGATURE LAM WITH ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لlٕ" <Same>
		'644 6C 655', // ARABIC LETTER LAM + LATIN SMALL LETTER L + ARABIC HAMZA BELOW [Arab,Latn,Zinh]=>[]
		//IDNA:0xFEFA, // (ﻺ) ARABIC LIGATURE LAM WITH ALEF WITH HAMZA BELOW FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF9, // (ﻹ) ARABIC LIGATURE LAM WITH ALEF WITH HAMZA BELOW ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لlٴ" <Same>
		'644 6C 674', // ARABIC LETTER LAM + LATIN SMALL LETTER L + ARABIC LETTER HIGH HAMZA [Arab,Latn]=>[]
		//IDNA:0xFEF8, // (ﻸ) ARABIC LIGATURE LAM WITH ALEF WITH HAMZA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF7, // (ﻷ) ARABIC LIGATURE LAM WITH ALEF WITH HAMZA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لo" <Same>
		'644 6F', // ARABIC LETTER LAM + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFCCD, // (ﳍ) ARABIC LIGATURE LAM WITH HEH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "لآ" <NFC(true) NFD(false)>
		'644 622', // ARABIC LETTER LAM + ARABIC LETTER ALEF WITH MADDA ABOVE [Arab]=>[Arab]
		//IDNA:0xFEF6, // (ﻶ) ARABIC LIGATURE LAM WITH ALEF WITH MADDA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF5, // (ﻵ) ARABIC LIGATURE LAM WITH ALEF WITH MADDA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لج" <Same>
		'644 62C', // ARABIC LETTER LAM + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCC9, // (ﳉ) ARABIC LIGATURE LAM WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC3F, // (ﰿ) ARABIC LIGATURE LAM WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لجج" <Same>
		'644 62C 62C', // ARABIC LETTER LAM + ARABIC LETTER JEEM + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD83, // (ﶃ) ARABIC LIGATURE LAM WITH JEEM WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD84, // (ﶄ) ARABIC LIGATURE LAM WITH JEEM WITH JEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لجم" <Same>
		'644 62C 645', // ARABIC LETTER LAM + ARABIC LETTER JEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDBA, // (ﶺ) ARABIC LIGATURE LAM WITH JEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFDBC, // (ﶼ) ARABIC LIGATURE LAM WITH JEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لجى" <Same>
		'644 62C 649', // ARABIC LETTER LAM + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDAC, // (ﶬ) ARABIC LIGATURE LAM WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لح" <Same>
		'644 62D', // ARABIC LETTER LAM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCCA, // (ﳊ) ARABIC LIGATURE LAM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC40, // (ﱀ) ARABIC LIGATURE LAM WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لحم" <Same>
		'644 62D 645', // ARABIC LETTER LAM + ARABIC LETTER HAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDB5, // (ﶵ) ARABIC LIGATURE LAM WITH HAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD80, // (ﶀ) ARABIC LIGATURE LAM WITH HAH WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لحى" <Same>
		'644 62D 649', // ARABIC LETTER LAM + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD82, // (ﶂ) ARABIC LIGATURE LAM WITH HAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD81, // (ﶁ) ARABIC LIGATURE LAM WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لخ" <Same>
		'644 62E', // ARABIC LETTER LAM + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCCB, // (ﳋ) ARABIC LIGATURE LAM WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC41, // (ﱁ) ARABIC LIGATURE LAM WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لخم" <Same>
		'644 62E 645', // ARABIC LETTER LAM + ARABIC LETTER KHAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD86, // (ﶆ) ARABIC LIGATURE LAM WITH KHAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD85, // (ﶅ) ARABIC LIGATURE LAM WITH KHAH WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لم" <Same>
		'644 645', // ARABIC LETTER LAM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCCC, // (ﳌ) ARABIC LIGATURE LAM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCED, // (ﳭ) ARABIC LIGATURE LAM WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC85, // (ﲅ) ARABIC LIGATURE LAM WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC42, // (ﱂ) ARABIC LIGATURE LAM WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "لمح" <Same>
		'644 645 62D', // ARABIC LETTER LAM + ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD88, // (ﶈ) ARABIC LIGATURE LAM WITH MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD87, // (ﶇ) ARABIC LIGATURE LAM WITH MEEM WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لمى" <Same>
		'644 645 649', // ARABIC LETTER LAM + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDAD, // (ﶭ) ARABIC LIGATURE LAM WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "لى" <Same>
		'644 649', // ARABIC LETTER LAM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC86, // (ﲆ) ARABIC LIGATURE LAM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC43, // (ﱃ) ARABIC LIGATURE LAM WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC87, // (ﲇ) ARABIC LIGATURE LAM WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC44, // (ﱄ) ARABIC LIGATURE LAM WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "م" <Same>
		'645', // ARABIC LETTER MEEM [Arab]=>[Arab]
		0x645, // (م) ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0x1EE0C, // (𞸌) ARABIC MATHEMATICAL MEEM [Arab]=>[Arab]
		//IDNA:0x1EE2C, // (𞸬) ARABIC MATHEMATICAL INITIAL MEEM [Arab]=>[Arab]
		//IDNA:0x1EE6C, // (𞹬) ARABIC MATHEMATICAL STRETCHED MEEM [Arab]=>[Arab]
		//IDNA:0x1EE8C, // (𞺌) ARABIC MATHEMATICAL LOOPED MEEM [Arab]=>[Arab]
		//IDNA:0x1EEAC, // (𞺬) ARABIC MATHEMATICAL DOUBLE-STRUCK MEEM [Arab]=>[Arab]
		//IDNA:0xFEE3, // (ﻣ) ARABIC LETTER MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE4, // (ﻤ) ARABIC LETTER MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE2, // (ﻢ) ARABIC LETTER MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE1, // (ﻡ) ARABIC LETTER MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "مۛ" <Same>
		'645 6DB', // ARABIC LETTER MEEM + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x8A7, // (ࢧ) ARABIC LETTER MEEM WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "م͈" <Same>
		'645 348', // ARABIC LETTER MEEM + COMBINING DOUBLE VERTICAL LINE BELOW [Arab,Zinh]=>[Arab]
		0x6FE, // (۾) ARABIC SIGN SINDHI POSTPOSITION MEN [Arab]=>[Arab]
	],
	[
		// "مl" <Same>
		'645 6C', // ARABIC LETTER MEEM + LATIN SMALL LETTER L [Arab,Latn]=>[]
		//IDNA:0xFC88, // (ﲈ) ARABIC LIGATURE MEEM WITH ALEF FINAL FORM [Arab]=>[Arab]
	],
	[
		// "مج" <Same>
		'645 62C', // ARABIC LETTER MEEM + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCCE, // (ﳎ) ARABIC LIGATURE MEEM WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC45, // (ﱅ) ARABIC LIGATURE MEEM WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "مجح" <Same>
		'645 62C 62D', // ARABIC LETTER MEEM + ARABIC LETTER JEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFD8C, // (ﶌ) ARABIC LIGATURE MEEM WITH JEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "مجخ" <Same>
		'645 62C 62E', // ARABIC LETTER MEEM + ARABIC LETTER JEEM + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFD92, // (ﶒ) ARABIC LIGATURE MEEM WITH JEEM WITH KHAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "مجم" <Same>
		'645 62C 645', // ARABIC LETTER MEEM + ARABIC LETTER JEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD8D, // (ﶍ) ARABIC LIGATURE MEEM WITH JEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "مجى" <Same>
		'645 62C 649', // ARABIC LETTER MEEM + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDC0, // (ﷀ) ARABIC LIGATURE MEEM WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "مح" <Same>
		'645 62D', // ARABIC LETTER MEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCCF, // (ﳏ) ARABIC LIGATURE MEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC46, // (ﱆ) ARABIC LIGATURE MEEM WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "محج" <Same>
		'645 62D 62C', // ARABIC LETTER MEEM + ARABIC LETTER HAH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD89, // (ﶉ) ARABIC LIGATURE MEEM WITH HAH WITH JEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "محم" <Same>
		'645 62D 645', // ARABIC LETTER MEEM + ARABIC LETTER HAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD8A, // (ﶊ) ARABIC LIGATURE MEEM WITH HAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "محمد" <Same>
		'645 62D 645 62F', // ARABIC LETTER MEEM + ARABIC LETTER HAH + ARABIC LETTER MEEM + ARABIC LETTER DAL [Arab]=>[Arab]
		//IDNA:0xFDF4, // (ﷴ) ARABIC LIGATURE MOHAMMAD ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "محى" <Same>
		'645 62D 649', // ARABIC LETTER MEEM + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD8B, // (ﶋ) ARABIC LIGATURE MEEM WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "مخ" <Same>
		'645 62E', // ARABIC LETTER MEEM + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCD0, // (ﳐ) ARABIC LIGATURE MEEM WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC47, // (ﱇ) ARABIC LIGATURE MEEM WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "مخج" <Same>
		'645 62E 62C', // ARABIC LETTER MEEM + ARABIC LETTER KHAH + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFD8E, // (ﶎ) ARABIC LIGATURE MEEM WITH KHAH WITH JEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "مخم" <Same>
		'645 62E 645', // ARABIC LETTER MEEM + ARABIC LETTER KHAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD8F, // (ﶏ) ARABIC LIGATURE MEEM WITH KHAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "مخى" <Same>
		'645 62E 649', // ARABIC LETTER MEEM + ARABIC LETTER KHAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDB9, // (ﶹ) ARABIC LIGATURE MEEM WITH KHAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "مم" <Same>
		'645 645', // ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCD1, // (ﳑ) ARABIC LIGATURE MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC89, // (ﲉ) ARABIC LIGATURE MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC48, // (ﱈ) ARABIC LIGATURE MEEM WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ممى" <Same>
		'645 645 649', // ARABIC LETTER MEEM + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDB1, // (ﶱ) ARABIC LIGATURE MEEM WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "مى" <Same>
		'645 649', // ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC49, // (ﱉ) ARABIC LIGATURE MEEM WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC4A, // (ﱊ) ARABIC LIGATURE MEEM WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ن" <Same>
		'646', // ARABIC LETTER NOON [Arab]=>[Arab]
		0x646, // (ن) ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0x1EE0D, // (𞸍) ARABIC MATHEMATICAL NOON [Arab]=>[Arab]
		//IDNA:0x1EE2D, // (𞸭) ARABIC MATHEMATICAL INITIAL NOON [Arab]=>[Arab]
		//IDNA:0x1EE4D, // (𞹍) ARABIC MATHEMATICAL TAILED NOON [Arab]=>[Arab]
		//IDNA:0x1EE6D, // (𞹭) ARABIC MATHEMATICAL STRETCHED NOON [Arab]=>[Arab]
		//IDNA:0x1EE8D, // (𞺍) ARABIC MATHEMATICAL LOOPED NOON [Arab]=>[Arab]
		//IDNA:0x1EEAD, // (𞺭) ARABIC MATHEMATICAL DOUBLE-STRUCK NOON [Arab]=>[Arab]
		//IDNA:0xFEE7, // (ﻧ) ARABIC LETTER NOON INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE8, // (ﻨ) ARABIC LETTER NOON MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE6, // (ﻦ) ARABIC LETTER NOON FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEE5, // (ﻥ) ARABIC LETTER NOON ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "نؕ" <Same>
		'646 615', // ARABIC LETTER NOON + ARABIC SMALL HIGH TAH [Arab]=>[Arab]
		0x768, // (ݨ) ARABIC LETTER NOON WITH SMALL TAH [Arab]=>[Arab]
	],
	[
		// "ن̆" <Same>
		'646 306', // ARABIC LETTER NOON + COMBINING BREVE [Arab,Zinh]=>[Arab]
		0x769, // (ݩ) ARABIC LETTER NOON WITH SMALL V [Arab]=>[Arab]
	],
	[
		// "نo" <Same>
		'646 6F', // ARABIC LETTER NOON + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFCD6, // (ﳖ) ARABIC LIGATURE NOON WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCEF, // (ﳯ) ARABIC LIGATURE NOON WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "نجح" <Same>
		'646 62C 62D', // ARABIC LETTER NOON + ARABIC LETTER JEEM + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFDB8, // (ﶸ) ARABIC LIGATURE NOON WITH JEEM WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFDBD, // (ﶽ) ARABIC LIGATURE NOON WITH JEEM WITH HAH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نجم" <Same>
		'646 62C 645', // ARABIC LETTER NOON + ARABIC LETTER JEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD98, // (ﶘ) ARABIC LIGATURE NOON WITH JEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD97, // (ﶗ) ARABIC LIGATURE NOON WITH JEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نجى" <Same>
		'646 62C 649', // ARABIC LETTER NOON + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD99, // (ﶙ) ARABIC LIGATURE NOON WITH JEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDC7, // (ﷇ) ARABIC LIGATURE NOON WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نح" <Same>
		'646 62D', // ARABIC LETTER NOON + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCD3, // (ﳓ) ARABIC LIGATURE NOON WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC4C, // (ﱌ) ARABIC LIGATURE NOON WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "نحم" <Same>
		'646 62D 645', // ARABIC LETTER NOON + ARABIC LETTER HAH + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD95, // (ﶕ) ARABIC LIGATURE NOON WITH HAH WITH MEEM INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "نحى" <Same>
		'646 62D 649', // ARABIC LETTER NOON + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD96, // (ﶖ) ARABIC LIGATURE NOON WITH HAH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFDB3, // (ﶳ) ARABIC LIGATURE NOON WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نخ" <Same>
		'646 62E', // ARABIC LETTER NOON + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCD4, // (ﳔ) ARABIC LIGATURE NOON WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC4D, // (ﱍ) ARABIC LIGATURE NOON WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "نر" <Same>
		'646 631', // ARABIC LETTER NOON + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFC8A, // (ﲊ) ARABIC LIGATURE NOON WITH REH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نز" <Same>
		'646 632', // ARABIC LETTER NOON + ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0xFC8B, // (ﲋ) ARABIC LIGATURE NOON WITH ZAIN FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نم" <Same>
		'646 645', // ARABIC LETTER NOON + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCD5, // (ﳕ) ARABIC LIGATURE NOON WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCEE, // (ﳮ) ARABIC LIGATURE NOON WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC8C, // (ﲌ) ARABIC LIGATURE NOON WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC4E, // (ﱎ) ARABIC LIGATURE NOON WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "نمى" <Same>
		'646 645 649', // ARABIC LETTER NOON + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFD9B, // (ﶛ) ARABIC LIGATURE NOON WITH MEEM WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFD9A, // (ﶚ) ARABIC LIGATURE NOON WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نن" <Same>
		'646 646', // ARABIC LETTER NOON + ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0xFC8D, // (ﲍ) ARABIC LIGATURE NOON WITH NOON FINAL FORM [Arab]=>[Arab]
	],
	[
		// "نى" <Same>
		'646 649', // ARABIC LETTER NOON + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC8E, // (ﲎ) ARABIC LIGATURE NOON WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC4F, // (ﱏ) ARABIC LIGATURE NOON WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC8F, // (ﲏ) ARABIC LIGATURE NOON WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC50, // (ﱐ) ARABIC LIGATURE NOON WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ۀ" <NFC(true) NFD(false)>
		'6C0', // ARABIC LETTER HEH WITH YEH ABOVE [Arab]=>[Arab]
		0x6C0, // (ۀ) ARABIC LETTER HEH WITH YEH ABOVE [Arab]=>[Arab]
		0x6C2, // (ۂ) ARABIC LETTER HEH GOAL WITH HAMZA ABOVE [Arab]=>[Arab]
		//IDNA:0xFBA5, // (ﮥ) ARABIC LETTER HEH WITH YEH ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA4, // (ﮤ) ARABIC LETTER HEH WITH YEH ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "و" <Same>
		'648', // ARABIC LETTER WAW [Arab]=>[Arab]
		0x648, // (و) ARABIC LETTER WAW [Arab]=>[Arab]
		//DISALLOW:0x102E4, // (𐋤) COPTIC EPACT DIGIT FOUR [Zyyy]=>[Arab Copt]
		//IDNA:0x1EE05, // (𞸅) ARABIC MATHEMATICAL WAW [Arab]=>[Arab]
		//IDNA:0x1EE85, // (𞺅) ARABIC MATHEMATICAL LOOPED WAW [Arab]=>[Arab]
		//IDNA:0x1EEA5, // (𞺥) ARABIC MATHEMATICAL DOUBLE-STRUCK WAW [Arab]=>[Arab]
		//IDNA:0xFEEE, // (ﻮ) ARABIC LETTER WAW FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEED, // (ﻭ) ARABIC LETTER WAW ISOLATED FORM [Arab]=>[Arab]
		//DISALLOW:0x8B1, // (ࢱ) ARABIC LETTER STRAIGHT WAW [Arab]=>[Arab]
	],
	[
		// "وۛ" <Same>
		'648 6DB', // ARABIC LETTER WAW + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		0x6CB, // (ۋ) ARABIC LETTER VE [Arab]=>[Arab]
		//IDNA:0xFBDF, // (ﯟ) ARABIC LETTER VE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBDE, // (ﯞ) ARABIC LETTER VE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "و̓" <Same>
		'648 313', // ARABIC LETTER WAW + COMBINING COMMA ABOVE [Arab,Zinh]=>[Arab]
		0x6C7, // (ۇ) ARABIC LETTER U [Arab]=>[Arab]
		//IDNA:0xFBD8, // (ﯘ) ARABIC LETTER U FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBD7, // (ﯗ) ARABIC LETTER U ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "و̆" <Same>
		'648 306', // ARABIC LETTER WAW + COMBINING BREVE [Arab,Zinh]=>[Arab]
		0x6C6, // (ۆ) ARABIC LETTER OE [Arab]=>[Arab]
		//IDNA:0xFBDA, // (ﯚ) ARABIC LETTER OE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBD9, // (ﯙ) ARABIC LETTER OE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "و̂" <Same>
		'648 302', // ARABIC LETTER WAW + COMBINING CIRCUMFLEX ACCENT [Arab,Zinh]=>[Arab]
		0x6C9, // (ۉ) ARABIC LETTER KIRGHIZ YU [Arab]=>[Arab]
		//IDNA:0xFBE3, // (ﯣ) ARABIC LETTER KIRGHIZ YU FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBE2, // (ﯢ) ARABIC LETTER KIRGHIZ YU ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "وٰ" <Same>
		'648 670', // ARABIC LETTER WAW + ARABIC LETTER SUPERSCRIPT ALEF [Arab,Zinh]=>[Arab]
		0x6C8, // (ۈ) ARABIC LETTER YU [Arab]=>[Arab]
		//IDNA:0xFBDC, // (ﯜ) ARABIC LETTER YU FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBDB, // (ﯛ) ARABIC LETTER YU ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "وٴ" <Same>
		'648 674', // ARABIC LETTER WAW + ARABIC LETTER HIGH HAMZA [Arab]=>[Arab]
		//IDNA:0x676, // (ٶ) ARABIC LETTER HIGH HAMZA WAW [Arab]=>[Arab]
		0x624, // (ؤ) ARABIC LETTER WAW WITH HAMZA ABOVE [Arab]=>[Arab]
		//IDNA:0xFE86, // (ﺆ) ARABIC LETTER WAW WITH HAMZA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE85, // (ﺅ) ARABIC LETTER WAW WITH HAMZA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "و̓ٴ" <Same>
		'648 313 674', // ARABIC LETTER WAW + COMBINING COMMA ABOVE + ARABIC LETTER HIGH HAMZA [Arab,Zinh]=>[Arab]
		//IDNA:0x677, // (ٷ) ARABIC LETTER U WITH HAMZA ABOVE [Arab]=>[Arab]
		//IDNA:0xFBDD, // (ﯝ) ARABIC LETTER U WITH HAMZA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "وسلم" <Same>
		'648 633 644 645', // ARABIC LETTER WAW + ARABIC LETTER SEEN + ARABIC LETTER LAM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFDF8, // (ﷸ) ARABIC LIGATURE WASALLAM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ۅ" <Same>
		'6C5', // ARABIC LETTER KIRGHIZ OE [Arab]=>[Arab]
		0x6C5, // (ۅ) ARABIC LETTER KIRGHIZ OE [Arab]=>[Arab]
		//IDNA:0xFBE1, // (ﯡ) ARABIC LETTER KIRGHIZ OE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBE0, // (ﯠ) ARABIC LETTER KIRGHIZ OE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ى" <Same>
		'649', // ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		0x649, // (ى) ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//DISALLOW:0x66E, // (ٮ) ARABIC LETTER DOTLESS BEH [Arab]=>[Arab]
		//IDNA:0x1EE1C, // (𞸜) ARABIC MATHEMATICAL DOTLESS BEH [Arab]=>[Arab]
		//IDNA:0x1EE7C, // (𞹼) ARABIC MATHEMATICAL STRETCHED DOTLESS BEH [Arab]=>[Arab]
		0x6BA, // (ں) ARABIC LETTER NOON GHUNNA [Arab]=>[Arab]
		//IDNA:0x1EE1D, // (𞸝) ARABIC MATHEMATICAL DOTLESS NOON [Arab]=>[Arab]
		//IDNA:0x1EE5D, // (𞹝) ARABIC MATHEMATICAL TAILED DOTLESS NOON [Arab]=>[Arab]
		//IDNA:0xFB9F, // (ﮟ) ARABIC LETTER NOON GHUNNA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB9E, // (ﮞ) ARABIC LETTER NOON GHUNNA ISOLATED FORM [Arab]=>[Arab]
		0x8BD, // (ࢽ) ARABIC LETTER AFRICAN NOON [Arab]=>[Arab]
		//IDNA:0xFBE8, // (ﯨ) ARABIC LETTER UIGHUR KAZAKH KIRGHIZ ALEF MAKSURA INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBE9, // (ﯩ) ARABIC LETTER UIGHUR KAZAKH KIRGHIZ ALEF MAKSURA MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF0, // (ﻰ) ARABIC LETTER ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEEF, // (ﻯ) ARABIC LETTER ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		0x64A, // (ي) ARABIC LETTER YEH [Arab]=>[Arab]
		//IDNA:0x1EE09, // (𞸉) ARABIC MATHEMATICAL YEH [Arab]=>[Arab]
		//IDNA:0x1EE29, // (𞸩) ARABIC MATHEMATICAL INITIAL YEH [Arab]=>[Arab]
		//IDNA:0x1EE49, // (𞹉) ARABIC MATHEMATICAL TAILED YEH [Arab]=>[Arab]
		//IDNA:0x1EE69, // (𞹩) ARABIC MATHEMATICAL STRETCHED YEH [Arab]=>[Arab]
		//IDNA:0x1EE89, // (𞺉) ARABIC MATHEMATICAL LOOPED YEH [Arab]=>[Arab]
		//IDNA:0x1EEA9, // (𞺩) ARABIC MATHEMATICAL DOUBLE-STRUCK YEH [Arab]=>[Arab]
		//IDNA:0xFEF3, // (ﻳ) ARABIC LETTER YEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF4, // (ﻴ) ARABIC LETTER YEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF2, // (ﻲ) ARABIC LETTER YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFEF1, // (ﻱ) ARABIC LETTER YEH ISOLATED FORM [Arab]=>[Arab]
		0x6CC, // (ی) ARABIC LETTER FARSI YEH [Arab]=>[Arab]
		//IDNA:0xFBFE, // (ﯾ) ARABIC LETTER FARSI YEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBFF, // (ﯿ) ARABIC LETTER FARSI YEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBFD, // (ﯽ) ARABIC LETTER FARSI YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBFC, // (ﯼ) ARABIC LETTER FARSI YEH ISOLATED FORM [Arab]=>[Arab]
		0x6D2, // (ے) ARABIC LETTER YEH BARREE [Arab]=>[Arab]
		//IDNA:0xFBAF, // (ﮯ) ARABIC LETTER YEH BARREE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBAE, // (ﮮ) ARABIC LETTER YEH BARREE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىؕ" <Same>
		'649 615', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH TAH [Arab]=>[Arab]
		0x679, // (ٹ) ARABIC LETTER TTEH [Arab]=>[Arab]
		//IDNA:0xFB68, // (ﭨ) ARABIC LETTER TTEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB69, // (ﭩ) ARABIC LETTER TTEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB67, // (ﭧ) ARABIC LETTER TTEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB66, // (ﭦ) ARABIC LETTER TTEH ISOLATED FORM [Arab]=>[Arab]
		0x6BB, // (ڻ) ARABIC LETTER RNOON [Arab]=>[Arab]
		//IDNA:0xFBA2, // (ﮢ) ARABIC LETTER RNOON INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA3, // (ﮣ) ARABIC LETTER RNOON MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA1, // (ﮡ) ARABIC LETTER RNOON FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBA0, // (ﮠ) ARABIC LETTER RNOON ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىۛ" <Same>
		// 20221114: 62B (190) 67E (21) 6BD/6D1/63F (0)
		'649 6DB', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS [Arab]=>[Arab]
		allow(0x67E), // (پ) ARABIC LETTER PEH [Arab]=>[Arab]
		//IDNA:0xFB58, // (ﭘ) ARABIC LETTER PEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB59, // (ﭙ) ARABIC LETTER PEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFB57, // (ﭗ) ARABIC LETTER PEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFB56, // (ﭖ) ARABIC LETTER PEH ISOLATED FORM [Arab]=>[Arab]
		allow(0x62B), // (ث) ARABIC LETTER THEH [Arab]=>[Arab] 
		//IDNA:0x1EE16, // (𞸖) ARABIC MATHEMATICAL THEH [Arab]=>[Arab]
		//IDNA:0x1EE36, // (𞸶) ARABIC MATHEMATICAL INITIAL THEH [Arab]=>[Arab]
		//IDNA:0x1EE76, // (𞹶) ARABIC MATHEMATICAL STRETCHED THEH [Arab]=>[Arab]
		//IDNA:0x1EE96, // (𞺖) ARABIC MATHEMATICAL LOOPED THEH [Arab]=>[Arab]
		//IDNA:0x1EEB6, // (𞺶) ARABIC MATHEMATICAL DOUBLE-STRUCK THEH [Arab]=>[Arab]
		//IDNA:0xFE9B, // (ﺛ) ARABIC LETTER THEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE9C, // (ﺜ) ARABIC LETTER THEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE9A, // (ﺚ) ARABIC LETTER THEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE99, // (ﺙ) ARABIC LETTER THEH ISOLATED FORM [Arab]=>[Arab]
		0x6BD, // (ڽ) ARABIC LETTER NOON WITH THREE DOTS ABOVE [Arab]=>[Arab]
		0x6D1, // (ۑ) ARABIC LETTER YEH WITH THREE DOTS BELOW [Arab]=>[Arab]
		0x63F, // (ؿ) ARABIC LETTER FARSI YEH WITH THREE DOTS ABOVE [Arab]=>[Arab]
	],
	[
		// "ىۛۢ" <Same>
		'649 6DB 6E2', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC SMALL HIGH MEEM ISOLATED FORM [Arab]=>[Arab]
		0x8B7, // (ࢷ) ARABIC LETTER PEH WITH SMALL MEEM ABOVE [Arab]=>[Arab]
	],
	[
		// "ى̆" <Same>
		'649 306', // ARABIC LETTER ALEF MAKSURA + COMBINING BREVE [Arab,Zinh]=>[Arab]
		0x756, // (ݖ) ARABIC LETTER BEH WITH SMALL V [Arab]=>[Arab]
		0x6CE, // (ێ) ARABIC LETTER YEH WITH SMALL V [Arab]=>[Arab]
	],
	[
		// "ى̆̇" <Same>
		'649 306 307', // ARABIC LETTER ALEF MAKSURA + COMBINING BREVE + COMBINING DOT ABOVE [Arab,Zinh]=>[Arab]
		0x8BA, // (ࢺ) ARABIC LETTER YEH WITH TWO DOTS BELOW AND SMALL NOON ABOVE [Arab]=>[Arab]
	],
	[
		// "ى̂" <Same>
		'649 302', // ARABIC LETTER ALEF MAKSURA + COMBINING CIRCUMFLEX ACCENT [Arab,Zinh]=>[Arab]
		//DISALLOW:0x63D, // (ؽ) ARABIC LETTER FARSI YEH WITH INVERTED V [Arab]=>[Arab]
	],
	[
		// "ىٔ" <Same>
		'649 654', // ARABIC LETTER ALEF MAKSURA + ARABIC HAMZA ABOVE [Arab,Zinh]=>[Arab]
		0x8A8, // (ࢨ) ARABIC LETTER YEH WITH TWO DOTS BELOW AND HAMZA ABOVE [Arab]=>[Arab]
	],
	[
		// "ىٰ" <Same>
		'649 670', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER SUPERSCRIPT ALEF [Arab,Zinh]=>[Arab]
		//IDNA:0xFC90, // (ﲐ) ARABIC LIGATURE ALEF MAKSURA WITH SUPERSCRIPT ALEF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC5D, // (ﱝ) ARABIC LIGATURE ALEF MAKSURA WITH SUPERSCRIPT ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىo" <Same>
		'649 6F', // ARABIC LETTER ALEF MAKSURA + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFCDE, // (ﳞ) ARABIC LIGATURE YEH WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF1, // (ﳱ) ARABIC LIGATURE YEH WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "ىۛo" <Same>
		'649 6DB 6F', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFCE6, // (ﳦ) ARABIC LIGATURE THEH WITH HEH MEDIAL FORM [Arab]=>[Arab]
	],
	[
		// "ىٴ" <Same>
		'649 674', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA [Arab]=>[Arab]
		//IDNA:0x678, // (ٸ) ARABIC LETTER HIGH HAMZA YEH [Arab]=>[Arab]
		0x626, // (ئ) ARABIC LETTER YEH WITH HAMZA ABOVE [Arab]=>[Arab]
		//IDNA:0xFE8B, // (ﺋ) ARABIC LETTER YEH WITH HAMZA ABOVE INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE8C, // (ﺌ) ARABIC LETTER YEH WITH HAMZA ABOVE MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFE8A, // (ﺊ) ARABIC LETTER YEH WITH HAMZA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFE89, // (ﺉ) ARABIC LETTER YEH WITH HAMZA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴl" <Same>
		'649 674 6C', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + LATIN SMALL LETTER L [Arab,Latn]=>[]
		//IDNA:0xFBEB, // (ﯫ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH ALEF FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBEA, // (ﯪ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH ALEF ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴo" <Same>
		'649 674 6F', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + LATIN SMALL LETTER O [Arab,Latn]=>[]
		//IDNA:0xFC9B, // (ﲛ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH HEH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE0, // (ﳠ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH HEH MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBED, // (ﯭ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH AE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBEC, // (ﯬ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH AE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴٻ" <Same>
		'649 674 67B', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER BEEH [Arab]=>[Arab]
		//IDNA:0xFBF8, // (ﯸ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH E INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBF7, // (ﯷ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH E FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBF6, // (ﯶ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH E ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴج" <Same>
		'649 674 62C', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFC97, // (ﲗ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC00, // (ﰀ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴح" <Same>
		'649 674 62D', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFC98, // (ﲘ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC01, // (ﰁ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴخ" <Same>
		'649 674 62E', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFC99, // (ﲙ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH KHAH INITIAL FORM [Arab]=>[Arab]
	],
	[
		// "ىٴر" <Same>
		'649 674 631', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFC64, // (ﱤ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH REH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىٴز" <Same>
		'649 674 632', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0xFC65, // (ﱥ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH ZAIN FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىٴم" <Same>
		'649 674 645', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFC9A, // (ﲚ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCDF, // (ﳟ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC66, // (ﱦ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC02, // (ﰂ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴن" <Same>
		'649 674 646', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0xFC67, // (ﱧ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH NOON FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىٴو" <Same>
		'649 674 648', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER WAW [Arab]=>[Arab]
		//IDNA:0xFBEF, // (ﯯ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH WAW FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBEE, // (ﯮ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH WAW ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴو̓" <Same>
		'649 674 648 313', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER WAW + COMBINING COMMA ABOVE [Arab,Zinh]=>[Arab]
		//IDNA:0xFBF1, // (ﯱ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH U FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBF0, // (ﯰ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH U ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴو̆" <Same>
		'649 674 648 306', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER WAW + COMBINING BREVE [Arab,Zinh]=>[Arab]
		//IDNA:0xFBF3, // (ﯳ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH OE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBF2, // (ﯲ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH OE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴوٰ" <Same>
		'649 674 648 670', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER WAW + ARABIC LETTER SUPERSCRIPT ALEF [Arab,Zinh]=>[Arab]
		//IDNA:0xFBF5, // (ﯵ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH YU FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBF4, // (ﯴ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH YU ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىٴى" <Same>
		'649 674 649', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HIGH HAMZA + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFBFB, // (ﯻ) ARABIC LIGATURE UIGHUR KIRGHIZ YEH WITH HAMZA ABOVE WITH ALEF MAKSURA INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFBFA, // (ﯺ) ARABIC LIGATURE UIGHUR KIRGHIZ YEH WITH HAMZA ABOVE WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC68, // (ﱨ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBF9, // (ﯹ) ARABIC LIGATURE UIGHUR KIRGHIZ YEH WITH HAMZA ABOVE WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC03, // (ﰃ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC69, // (ﱩ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC04, // (ﰄ) ARABIC LIGATURE YEH WITH HAMZA ABOVE WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىج" <Same>
		'649 62C', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFCDA, // (ﳚ) ARABIC LIGATURE YEH WITH JEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC55, // (ﱕ) ARABIC LIGATURE YEH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىۛج" <Same>
		'649 6DB 62C', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER JEEM [Arab]=>[Arab]
		//IDNA:0xFC11, // (ﰑ) ARABIC LIGATURE THEH WITH JEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىجى" <Same>
		'649 62C 649', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER JEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDAF, // (ﶯ) ARABIC LIGATURE YEH WITH JEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىح" <Same>
		'649 62D', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HAH [Arab]=>[Arab]
		//IDNA:0xFCDB, // (ﳛ) ARABIC LIGATURE YEH WITH HAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC56, // (ﱖ) ARABIC LIGATURE YEH WITH HAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىحى" <Same>
		'649 62D 649', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER HAH + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDAE, // (ﶮ) ARABIC LIGATURE YEH WITH HAH WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىخ" <Same>
		'649 62E', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER KHAH [Arab]=>[Arab]
		//IDNA:0xFCDC, // (ﳜ) ARABIC LIGATURE YEH WITH KHAH INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC57, // (ﱗ) ARABIC LIGATURE YEH WITH KHAH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىر" <Same>
		'649 631', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFC91, // (ﲑ) ARABIC LIGATURE YEH WITH REH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىۛر" <Same>
		'649 6DB 631', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER REH [Arab]=>[Arab]
		//IDNA:0xFC76, // (ﱶ) ARABIC LIGATURE THEH WITH REH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىز" <Same>
		'649 632', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0xFC92, // (ﲒ) ARABIC LIGATURE YEH WITH ZAIN FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىۛز" <Same>
		'649 6DB 632', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER ZAIN [Arab]=>[Arab]
		//IDNA:0xFC77, // (ﱷ) ARABIC LIGATURE THEH WITH ZAIN FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىم" <Same>
		'649 645', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCDD, // (ﳝ) ARABIC LIGATURE YEH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCF0, // (ﳰ) ARABIC LIGATURE YEH WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC93, // (ﲓ) ARABIC LIGATURE YEH WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC58, // (ﱘ) ARABIC LIGATURE YEH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىۛم" <Same>
		'649 6DB 645', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFCA6, // (ﲦ) ARABIC LIGATURE THEH WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFCE5, // (ﳥ) ARABIC LIGATURE THEH WITH MEEM MEDIAL FORM [Arab]=>[Arab]
		//IDNA:0xFC78, // (ﱸ) ARABIC LIGATURE THEH WITH MEEM FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC12, // (ﰒ) ARABIC LIGATURE THEH WITH MEEM ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىمم" <Same>
		'649 645 645', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER MEEM + ARABIC LETTER MEEM [Arab]=>[Arab]
		//IDNA:0xFD9D, // (ﶝ) ARABIC LIGATURE YEH WITH MEEM WITH MEEM INITIAL FORM [Arab]=>[Arab]
		//IDNA:0xFD9C, // (ﶜ) ARABIC LIGATURE YEH WITH MEEM WITH MEEM FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىمى" <Same>
		'649 645 649', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER MEEM + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFDB0, // (ﶰ) ARABIC LIGATURE YEH WITH MEEM WITH YEH FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىن" <Same>
		'649 646', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0xFC94, // (ﲔ) ARABIC LIGATURE YEH WITH NOON FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىۛن" <Same>
		'649 6DB 646', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER NOON [Arab]=>[Arab]
		//IDNA:0xFC79, // (ﱹ) ARABIC LIGATURE THEH WITH NOON FINAL FORM [Arab]=>[Arab]
	],
	[
		// "ىى" <Same>
		'649 649', // ARABIC LETTER ALEF MAKSURA + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC95, // (ﲕ) ARABIC LIGATURE YEH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC59, // (ﱙ) ARABIC LIGATURE YEH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC96, // (ﲖ) ARABIC LIGATURE YEH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC5A, // (ﱚ) ARABIC LIGATURE YEH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ىۛى" <Same>
		'649 6DB 649', // ARABIC LETTER ALEF MAKSURA + ARABIC SMALL HIGH THREE DOTS + ARABIC LETTER ALEF MAKSURA [Arab]=>[Arab]
		//IDNA:0xFC7A, // (ﱺ) ARABIC LIGATURE THEH WITH ALEF MAKSURA FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC13, // (ﰓ) ARABIC LIGATURE THEH WITH ALEF MAKSURA ISOLATED FORM [Arab]=>[Arab]
		//IDNA:0xFC7B, // (ﱻ) ARABIC LIGATURE THEH WITH YEH FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFC14, // (ﰔ) ARABIC LIGATURE THEH WITH YEH ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ۓ" <NFC(true) NFD(false)>
		'6D3', // ARABIC LETTER YEH BARREE WITH HAMZA ABOVE [Arab]=>[Arab]
		0x6D3, // (ۓ) ARABIC LETTER YEH BARREE WITH HAMZA ABOVE [Arab]=>[Arab]
		//IDNA:0xFBB1, // (ﮱ) ARABIC LETTER YEH BARREE WITH HAMZA ABOVE FINAL FORM [Arab]=>[Arab]
		//IDNA:0xFBB0, // (ﮰ) ARABIC LETTER YEH BARREE WITH HAMZA ABOVE ISOLATED FORM [Arab]=>[Arab]
	],
	[
		// "ⵀ" <Same>
		'2D40', // TIFINAGH LETTER YAH [Tfng]=>[Tfng]
		0x2D40, // (ⵀ) TIFINAGH LETTER YAH [Tfng]=>[Tfng]
		0x102B8, // (𐊸) CARIAN LETTER SS [Cari]=>[Cari]
	],
	[
		// "ⵂ" <Same>
		'2D42', // TIFINAGH LETTER TUAREG YAH [Tfng]=>[Tfng]
		0x2D42, // (ⵂ) TIFINAGH LETTER TUAREG YAH [Tfng]=>[Tfng]
		//DISALLOW:0x205E, // (⁞) VERTICAL FOUR DOTS [Zyyy]=>[ALL]
		//DISALLOW:0x2E3D, // (⸽) VERTICAL SIX DOTS [Zyyy]=>[ALL]
		//DISALLOW:0x2999, // (⦙) DOTTED FENCE [Zyyy]=>[ALL]
	],
	[
		// "ⵗ" <Same>
		'2D57', // TIFINAGH LETTER TUAREG YAGH [Tfng]=>[Tfng]
		0x2D57, // (ⵗ) TIFINAGH LETTER TUAREG YAGH [Tfng]=>[Tfng]
		//IDNA:0xFE19, // (︙) PRESENTATION FORM FOR VERTICAL HORIZONTAL ELLIPSIS [Zyyy]=>[ALL]
		//DISALLOW:0x205D, // (⁝) TRICOLON [Zyyy]=>[ALL]
		//DISALLOW:0x22EE, // (⋮) VERTICAL ELLIPSIS [Zyyy]=>[ALL]
	],
	[
		// "ሆ" <Same>
		'1206', // ETHIOPIC SYLLABLE HO [Ethi]=>[Ethi]
		0x1206, // (ሆ) ETHIOPIC SYLLABLE HO [Ethi]=>[Ethi]
		//IDNA:0x544, // (Մ) ARMENIAN CAPITAL LETTER MEN [Armn]=>[Armn]
	],
	[
		// "ቡ" <Same>
		'1261', // ETHIOPIC SYLLABLE BU [Ethi]=>[Ethi]
		0x1261, // (ቡ) ETHIOPIC SYLLABLE BU [Ethi]=>[Ethi]
		//IDNA:0x54C, // (Ռ) ARMENIAN CAPITAL LETTER RA [Armn]=>[Armn]
	],
	[
		// "ኮ" <Same>
		'12AE', // ETHIOPIC SYLLABLE KO [Ethi]=>[Ethi]
		0x12AE, // (ኮ) ETHIOPIC SYLLABLE KO [Ethi]=>[Ethi]
		//IDNA:0x53B, // (Ի) ARMENIAN CAPITAL LETTER INI [Armn]=>[Armn]
	],
	[
		// "ጣ" <Same>
		'1323', // ETHIOPIC SYLLABLE THAA [Ethi]=>[Ethi]
		0x1323, // (ጣ) ETHIOPIC SYLLABLE THAA [Ethi]=>[Ethi]
		//IDNA:0x54A, // (Պ) ARMENIAN CAPITAL LETTER PEH [Armn]=>[Armn]
	],
	[
		// "अा" <Same>
		'905 93E', // DEVANAGARI LETTER A + DEVANAGARI VOWEL SIGN AA [Deva]=>[Deva]
		0x906, // (आ) DEVANAGARI LETTER AA [Deva]=>[Deva]
	],
	[
		// "अाॆ" <Same>
		'905 93E 946', // DEVANAGARI LETTER A + DEVANAGARI VOWEL SIGN AA + DEVANAGARI VOWEL SIGN SHORT E [Deva]=>[Deva]
		0x912, // (ऒ) DEVANAGARI LETTER SHORT O [Deva]=>[Deva]
	],
	[
		// "अाे" <Same>
		'905 93E 947', // DEVANAGARI LETTER A + DEVANAGARI VOWEL SIGN AA + DEVANAGARI VOWEL SIGN E [Deva]=>[Deva]
		0x913, // (ओ) DEVANAGARI LETTER O [Deva]=>[Deva]
	],
	[
		// "अाै" <Same>
		'905 93E 948', // DEVANAGARI LETTER A + DEVANAGARI VOWEL SIGN AA + DEVANAGARI VOWEL SIGN AI [Deva]=>[Deva]
		0x914, // (औ) DEVANAGARI LETTER AU [Deva]=>[Deva]
	],
	[
		// "अॆ" <Same>
		'905 946', // DEVANAGARI LETTER A + DEVANAGARI VOWEL SIGN SHORT E [Deva]=>[Deva]
		0x904, // (ऄ) DEVANAGARI LETTER SHORT A [Deva]=>[Deva]
	],
	[
		// "अॉ" <Same>
		'905 949', // DEVANAGARI LETTER A + DEVANAGARI VOWEL SIGN CANDRA O [Deva]=>[Deva]
		0x911, // (ऑ) DEVANAGARI LETTER CANDRA O [Deva]=>[Deva]
	],
	[
		// "एॅ" <Same>
		'90F 945', // DEVANAGARI LETTER E + DEVANAGARI VOWEL SIGN CANDRA E [Deva]=>[Deva]
		0x90D, // (ऍ) DEVANAGARI LETTER CANDRA E [Deva]=>[Deva]
	],
	[
		// "एॆ" <Same>
		'90F 946', // DEVANAGARI LETTER E + DEVANAGARI VOWEL SIGN SHORT E [Deva]=>[Deva]
		0x90E, // (ऎ) DEVANAGARI LETTER SHORT E [Deva]=>[Deva]
	],
	[
		// "एे" <Same>
		'90F 947', // DEVANAGARI LETTER E + DEVANAGARI VOWEL SIGN E [Deva]=>[Deva]
		0x910, // (ऐ) DEVANAGARI LETTER AI [Deva]=>[Deva]
	],
	[
		// "र्इ" <Same>
		'930 94D 907', // DEVANAGARI LETTER RA + DEVANAGARI SIGN VIRAMA + DEVANAGARI LETTER I [Deva]=>[Deva]
		0x908, // (ई) DEVANAGARI LETTER II [Deva]=>[Deva]
	],
	[
		// "ऽ" <Same>
		'93D', // DEVANAGARI SIGN AVAGRAHA [Deva]=>[Deva]
		0x93D, // (ऽ) DEVANAGARI SIGN AVAGRAHA [Deva]=>[Deva]
		0xABD, // (ઽ) GUJARATI SIGN AVAGRAHA [Gujr]=>[Gujr]
	],
	[
		// "ꣻ" <Same>
		'A8FB', // DEVANAGARI HEADSTROKE [Deva]=>[Deva]
		//DISALLOW:0xA8FB, // (ꣻ) DEVANAGARI HEADSTROKE [Deva]=>[Deva]
		0x111DC, // (𑇜) SHARADA HEADSTROKE [Shrd]=>[Shrd]
	],
	[
		// "◌ऺ" <Same>
		'93A', // DEVANAGARI VOWEL SIGN OE [Deva]=>[Deva]
		0x93A, // (◌ऺ) DEVANAGARI VOWEL SIGN OE [Deva]=>[Deva]
		0x111CB, // (◌𑇋) SHARADA VOWEL MODIFIER MARK [Shrd]=>[Shrd]
	],
	[
		// "◌ु" <Same>
		'941', // DEVANAGARI VOWEL SIGN U [Deva]=>[Deva]
		0x941, // (◌ु) DEVANAGARI VOWEL SIGN U [Deva]=>[Deva]
		0xAC1, // (◌ુ) GUJARATI VOWEL SIGN U [Gujr]=>[Gujr]
	],
	[
		// "◌ू" <Same>
		'942', // DEVANAGARI VOWEL SIGN UU [Deva]=>[Deva]
		0x942, // (◌ू) DEVANAGARI VOWEL SIGN UU [Deva]=>[Deva]
		0xAC2, // (◌ૂ) GUJARATI VOWEL SIGN UU [Gujr]=>[Gujr]
	],
	[
		// "◌ॆ" <Same>
		'946', // DEVANAGARI VOWEL SIGN SHORT E [Deva]=>[Deva]
		0x946, // (◌ॆ) DEVANAGARI VOWEL SIGN SHORT E [Deva]=>[Deva]
		0xA4B, // (◌ੋ) GURMUKHI VOWEL SIGN OO [Guru]=>[Guru]
	],
	[
		// "◌्" <Same>
		'94D', // DEVANAGARI SIGN VIRAMA [Deva]=>[Deva]
		0x94D, // (◌्) DEVANAGARI SIGN VIRAMA [Deva]=>[Deva]
		0xA4D, // (◌੍) GURMUKHI SIGN VIRAMA [Guru]=>[Guru]
		0xACD, // (◌્) GUJARATI SIGN VIRAMA [Gujr]=>[Gujr]
	],
	[
		// "অা" <Same>
		'985 9BE', // BENGALI LETTER A + BENGALI VOWEL SIGN AA [Beng]=>[Beng]
		0x986, // (আ) BENGALI LETTER AA [Beng]=>[Beng]
	],
	[
		// "ঋৃ" <Same>
		'98B 9C3', // BENGALI LETTER VOCALIC R + BENGALI VOWEL SIGN VOCALIC R [Beng]=>[Beng]
		0x9E0, // (ৠ) BENGALI LETTER VOCALIC RR [Beng]=>[Beng]
		0x9E1, // (ৡ) BENGALI LETTER VOCALIC LL [Beng]=>[Beng]
	],
	[
		// "ঘ" <Same>
		'998', // BENGALI LETTER GHA [Beng]=>[Beng]
		0x998, // (ঘ) BENGALI LETTER GHA [Beng]=>[Beng]
		0x11492, // (𑒒) TIRHUTA LETTER GHA [Tirh]=>[Tirh]
	],
	[
		// "চ" <Same>
		'99A', // BENGALI LETTER CA [Beng]=>[Beng]
		0x99A, // (চ) BENGALI LETTER CA [Beng]=>[Beng]
		0x11494, // (𑒔) TIRHUTA LETTER CA [Tirh]=>[Tirh]
	],
	[
		// "জ" <Same>
		'99C', // BENGALI LETTER JA [Beng]=>[Beng]
		0x99C, // (জ) BENGALI LETTER JA [Beng]=>[Beng]
		0x11496, // (𑒖) TIRHUTA LETTER JA [Tirh]=>[Tirh]
	],
	[
		// "ঞ" <Same>
		'99E', // BENGALI LETTER NYA [Beng]=>[Beng]
		0x99E, // (ঞ) BENGALI LETTER NYA [Beng]=>[Beng]
		0x11498, // (𑒘) TIRHUTA LETTER NYA [Tirh]=>[Tirh]
	],
	[
		// "ট" <Same>
		'99F', // BENGALI LETTER TTA [Beng]=>[Beng]
		0x99F, // (ট) BENGALI LETTER TTA [Beng]=>[Beng]
		0x11499, // (𑒙) TIRHUTA LETTER TTA [Tirh]=>[Tirh]
	],
	[
		// "ড" <Same>
		'9A1', // BENGALI LETTER DDA [Beng]=>[Beng]
		0x9A1, // (ড) BENGALI LETTER DDA [Beng]=>[Beng]
		0x1149B, // (𑒛) TIRHUTA LETTER DDA [Tirh]=>[Tirh]
	],
	[
		// "ণ" <Same>
		'9A3', // BENGALI LETTER NNA [Beng]=>[Beng]
		0x9A3, // (ণ) BENGALI LETTER NNA [Beng]=>[Beng]
		0x114AA, // (𑒪) TIRHUTA LETTER LA [Tirh]=>[Tirh]
	],
	[
		// "ত" <Same>
		'9A4', // BENGALI LETTER TA [Beng]=>[Beng]
		0x9A4, // (ত) BENGALI LETTER TA [Beng]=>[Beng]
		0x1149E, // (𑒞) TIRHUTA LETTER TA [Tirh]=>[Tirh]
	],
	[
		// "থ" <Same>
		'9A5', // BENGALI LETTER THA [Beng]=>[Beng]
		0x9A5, // (থ) BENGALI LETTER THA [Beng]=>[Beng]
		0x1149F, // (𑒟) TIRHUTA LETTER THA [Tirh]=>[Tirh]
	],
	[
		// "দ" <Same>
		'9A6', // BENGALI LETTER DA [Beng]=>[Beng]
		0x9A6, // (দ) BENGALI LETTER DA [Beng]=>[Beng]
		0x114A0, // (𑒠) TIRHUTA LETTER DA [Tirh]=>[Tirh]
	],
	[
		// "ধ" <Same>
		'9A7', // BENGALI LETTER DHA [Beng]=>[Beng]
		0x9A7, // (ধ) BENGALI LETTER DHA [Beng]=>[Beng]
		0x114A1, // (𑒡) TIRHUTA LETTER DHA [Tirh]=>[Tirh]
	],
	[
		// "ন" <Same>
		'9A8', // BENGALI LETTER NA [Beng]=>[Beng]
		0x9A8, // (ন) BENGALI LETTER NA [Beng]=>[Beng]
		0x114A2, // (𑒢) TIRHUTA LETTER NA [Tirh]=>[Tirh]
	],
	[
		// "প" <Same>
		'9AA', // BENGALI LETTER PA [Beng]=>[Beng]
		0x9AA, // (প) BENGALI LETTER PA [Beng]=>[Beng]
		0x114A3, // (𑒣) TIRHUTA LETTER PA [Tirh]=>[Tirh]
	],
	[
		// "ব" <Same>
		'9AC', // BENGALI LETTER BA [Beng]=>[Beng]
		0x9AC, // (ব) BENGALI LETTER BA [Beng]=>[Beng]
		0x114A9, // (𑒩) TIRHUTA LETTER RA [Tirh]=>[Tirh]
	],
	[
		// "ম" <Same>
		'9AE', // BENGALI LETTER MA [Beng]=>[Beng]
		0x9AE, // (ম) BENGALI LETTER MA [Beng]=>[Beng]
		0x114A7, // (𑒧) TIRHUTA LETTER MA [Tirh]=>[Tirh]
	],
	[
		// "য" <Same>
		'9AF', // BENGALI LETTER YA [Beng]=>[Beng]
		0x9AF, // (য) BENGALI LETTER YA [Beng]=>[Beng]
		0x114A8, // (𑒨) TIRHUTA LETTER YA [Tirh]=>[Tirh]
	],
	[
		// "র" <Same>
		'9B0', // BENGALI LETTER RA [Beng]=>[Beng]
		0x9B0, // (র) BENGALI LETTER RA [Beng]=>[Beng]
		0x114AB, // (𑒫) TIRHUTA LETTER VA [Tirh]=>[Tirh]
	],
	[
		// "ল" <Same>
		'9B2', // BENGALI LETTER LA [Beng]=>[Beng]
		0x9B2, // (ল) BENGALI LETTER LA [Beng]=>[Beng]
		0x1149D, // (𑒝) TIRHUTA LETTER NNA [Tirh]=>[Tirh]
	],
	[
		// "ষ" <Same>
		'9B7', // BENGALI LETTER SSA [Beng]=>[Beng]
		0x9B7, // (ষ) BENGALI LETTER SSA [Beng]=>[Beng]
		0x114AD, // (𑒭) TIRHUTA LETTER SSA [Tirh]=>[Tirh]
	],
	[
		// "স" <Same>
		'9B8', // BENGALI LETTER SA [Beng]=>[Beng]
		0x9B8, // (স) BENGALI LETTER SA [Beng]=>[Beng]
		0x114AE, // (𑒮) TIRHUTA LETTER SA [Tirh]=>[Tirh]
	],
	[
		// "ঽ" <Same>
		'9BD', // BENGALI SIGN AVAGRAHA [Beng]=>[Beng]
		0x9BD, // (ঽ) BENGALI SIGN AVAGRAHA [Beng]=>[Beng]
		0x114C4, // (𑓄) TIRHUTA SIGN AVAGRAHA [Tirh]=>[Tirh]
	],
	[
		// "◌া" <Same>
		'9BE', // BENGALI VOWEL SIGN AA [Beng]=>[Beng]
		0x9BE, // (◌া) BENGALI VOWEL SIGN AA [Beng]=>[Beng]
		0x114B0, // (◌𑒰) TIRHUTA VOWEL SIGN AA [Tirh]=>[Tirh]
	],
	[
		// "◌ি" <Same>
		'9BF', // BENGALI VOWEL SIGN I [Beng]=>[Beng]
		0x9BF, // (◌ি) BENGALI VOWEL SIGN I [Beng]=>[Beng]
		0x114B1, // (◌𑒱) TIRHUTA VOWEL SIGN I [Tirh]=>[Tirh]
	],
	[
		// "◌ে" <Same>
		'9C7', // BENGALI VOWEL SIGN E [Beng]=>[Beng]
		0x9C7, // (◌ে) BENGALI VOWEL SIGN E [Beng]=>[Beng]
		0x114B9, // (◌𑒹) TIRHUTA VOWEL SIGN E [Tirh]=>[Tirh]
	],
	[
		// "◌ো" <NFC(true) NFD(false)>
		'9CB', // BENGALI VOWEL SIGN O [Beng]=>[Beng]
		0x9CB, // (◌ো) BENGALI VOWEL SIGN O [Beng]=>[Beng]
		0x114BC, // (◌𑒼) TIRHUTA VOWEL SIGN O [Tirh]=>[Tirh]
	],
	[
		// "◌ৌ" <NFC(true) NFD(false)>
		'9CC', // BENGALI VOWEL SIGN AU [Beng]=>[Beng]
		0x9CC, // (◌ৌ) BENGALI VOWEL SIGN AU [Beng]=>[Beng]
		0x114BE, // (◌𑒾) TIRHUTA VOWEL SIGN AU [Tirh]=>[Tirh]
	],
	[
		// "◌্" <Same>
		'9CD', // BENGALI SIGN VIRAMA [Beng]=>[Beng]
		0x9CD, // (◌্) BENGALI SIGN VIRAMA [Beng]=>[Beng]
		0x114C2, // (◌𑓂) TIRHUTA SIGN VIRAMA [Tirh]=>[Tirh]
	],
	[
		// "◌ৗ" <Same>
		'9D7', // BENGALI AU LENGTH MARK [Beng]=>[Beng]
		0x9D7, // (◌ৗ) BENGALI AU LENGTH MARK [Beng]=>[Beng]
		0x114BD, // (◌𑒽) TIRHUTA VOWEL SIGN SHORT O [Tirh]=>[Tirh]
	],
	[
		// "ੳੁ" <Same>
		'A73 A41', // GURMUKHI URA + GURMUKHI VOWEL SIGN U [Guru]=>[Guru]
		0xA09, // (ਉ) GURMUKHI LETTER U [Guru]=>[Guru]
	],
	[
		// "ੳੂ" <Same>
		'A73 A42', // GURMUKHI URA + GURMUKHI VOWEL SIGN UU [Guru]=>[Guru]
		0xA0A, // (ਊ) GURMUKHI LETTER UU [Guru]=>[Guru]
	],
	[
		// "ਅਾ" <Same>
		'A05 A3E', // GURMUKHI LETTER A + GURMUKHI VOWEL SIGN AA [Guru]=>[Guru]
		0xA06, // (ਆ) GURMUKHI LETTER AA [Guru]=>[Guru]
	],
	[
		// "ਅੈ" <Same>
		'A05 A48', // GURMUKHI LETTER A + GURMUKHI VOWEL SIGN AI [Guru]=>[Guru]
		0xA10, // (ਐ) GURMUKHI LETTER AI [Guru]=>[Guru]
	],
	[
		// "ਅੌ" <Same>
		'A05 A4C', // GURMUKHI LETTER A + GURMUKHI VOWEL SIGN AU [Guru]=>[Guru]
		0xA14, // (ਔ) GURMUKHI LETTER AU [Guru]=>[Guru]
	],
	[
		// "ੲਿ" <Same>
		'A72 A3F', // GURMUKHI IRI + GURMUKHI VOWEL SIGN I [Guru]=>[Guru]
		0xA07, // (ਇ) GURMUKHI LETTER I [Guru]=>[Guru]
	],
	[
		// "ੲੀ" <Same>
		'A72 A40', // GURMUKHI IRI + GURMUKHI VOWEL SIGN II [Guru]=>[Guru]
		0xA08, // (ਈ) GURMUKHI LETTER II [Guru]=>[Guru]
	],
	[
		// "ੲੇ" <Same>
		'A72 A47', // GURMUKHI IRI + GURMUKHI VOWEL SIGN EE [Guru]=>[Guru]
		0xA0F, // (ਏ) GURMUKHI LETTER EE [Guru]=>[Guru]
	],
	[
		// "અા" <Same>
		'A85 ABE', // GUJARATI LETTER A + GUJARATI VOWEL SIGN AA [Gujr]=>[Gujr]
		0xA86, // (આ) GUJARATI LETTER AA [Gujr]=>[Gujr]
	],
	[
		// "અાૅ" <Same>
		'A85 ABE AC5', // GUJARATI LETTER A + GUJARATI VOWEL SIGN AA + GUJARATI VOWEL SIGN CANDRA E [Gujr]=>[Gujr]
		0xA91, // (ઑ) GUJARATI VOWEL CANDRA O [Gujr]=>[Gujr]
	],
	[
		// "અાે" <Same>
		'A85 ABE AC7', // GUJARATI LETTER A + GUJARATI VOWEL SIGN AA + GUJARATI VOWEL SIGN E [Gujr]=>[Gujr]
		0xA93, // (ઓ) GUJARATI LETTER O [Gujr]=>[Gujr]
	],
	[
		// "અાૈ" <Same>
		'A85 ABE AC8', // GUJARATI LETTER A + GUJARATI VOWEL SIGN AA + GUJARATI VOWEL SIGN AI [Gujr]=>[Gujr]
		0xA94, // (ઔ) GUJARATI LETTER AU [Gujr]=>[Gujr]
	],
	[
		// "અૅ" <Same>
		'A85 AC5', // GUJARATI LETTER A + GUJARATI VOWEL SIGN CANDRA E [Gujr]=>[Gujr]
		0xA8D, // (ઍ) GUJARATI VOWEL CANDRA E [Gujr]=>[Gujr]
	],
	[
		// "અે" <Same>
		'A85 AC7', // GUJARATI LETTER A + GUJARATI VOWEL SIGN E [Gujr]=>[Gujr]
		0xA8F, // (એ) GUJARATI LETTER E [Gujr]=>[Gujr]
	],
	[
		// "અૈ" <Same>
		'A85 AC8', // GUJARATI LETTER A + GUJARATI VOWEL SIGN AI [Gujr]=>[Gujr]
		0xA90, // (ઐ) GUJARATI LETTER AI [Gujr]=>[Gujr]
	],
	[
		// "ଅା" <Same>
		'B05 B3E', // ORIYA LETTER A + ORIYA VOWEL SIGN AA [Orya]=>[Orya]
		0xB06, // (ଆ) ORIYA LETTER AA [Orya]=>[Orya]
	],
	[
		// "அ" <Same>
		'B85', // TAMIL LETTER A [Taml]=>[Taml]
		0xB85, // (அ) TAMIL LETTER A [Taml]=>[Taml]
		0xBEE, // (௮) TAMIL DIGIT EIGHT [Taml]=>[Gran,Taml]
	],
	[
		// "ஈ" <Same>
		'B88', // TAMIL LETTER II [Taml]=>[Taml]
		0xB88, // (ஈ) TAMIL LETTER II [Taml]=>[Taml]
		0xBB0, // (ர) TAMIL LETTER RA [Taml]=>[Taml]
		0xBBE, // (◌ா) TAMIL VOWEL SIGN AA [Taml]=>[Taml]
	],
	[
		// "ஈு" <Same>
		'B88 BC1', // TAMIL LETTER II + TAMIL VOWEL SIGN U [Taml]=>[Taml]
		0xBEB, // (௫) TAMIL DIGIT FIVE [Taml]=>[Gran,Taml]
	],
	[
		// "உ" <Same>
		'B89', // TAMIL LETTER U [Taml]=>[Taml]
		// 20221114: dont look confusing
		valid(0xB89), // (உ) TAMIL LETTER U [Taml]=>[Taml]
		valid(0xBE8), // (௨) TAMIL DIGIT TWO [Taml]=>[Gran,Taml]
		valid(0xD09), // (ഉ) MALAYALAM LETTER U [Mlym]=>[Mlym]
	],
	[
		// "உள" <Same>
		'B89 BB3', // TAMIL LETTER U + TAMIL LETTER LLA [Taml]=>[Taml]
		0xB8A, // (ஊ) TAMIL LETTER UU [Taml]=>[Taml]
	],
	[
		// "உൗ" <Same>
		'B89 D57', // TAMIL LETTER U + MALAYALAM AU LENGTH MARK [Taml,Mlym]=>[]
		0xD0A, // (ഊ) MALAYALAM LETTER UU [Mlym]=>[Mlym]
	],
	[
		// "எ" <Same>
		'B8E', // TAMIL LETTER E [Taml]=>[Taml]
		0xB8E, // (எ) TAMIL LETTER E [Taml]=>[Taml]
		0xBED, // (௭) TAMIL DIGIT SEVEN [Taml]=>[Gran,Taml]
	],
	[
		// "எவ" <Same>
		'B8E BB5', // TAMIL LETTER E + TAMIL LETTER VA [Taml]=>[Taml]
		0xBF7, // (௷) TAMIL CREDIT SIGN [Taml]=>[Taml]
	],
	[
		// "ஐ" <Same>
		'B90', // TAMIL LETTER AI [Taml]=>[Taml]
		0xB90, // (ஐ) TAMIL LETTER AI [Taml]=>[Taml]
		0xB9C, // (ஜ) TAMIL LETTER JA [Taml]=>[Taml]
		0xD1C, // (ജ) MALAYALAM LETTER JA [Mlym]=>[Mlym]
	],
	[
		// "க" <Same>
		'B95', // TAMIL LETTER KA [Taml]=>[Taml]
		0xB95, // (க) TAMIL LETTER KA [Taml]=>[Taml]
		0xBE7, // (௧) TAMIL DIGIT ONE [Taml]=>[Gran,Taml]
	],
	[
		// "ச" <Same>
		'B9A', // TAMIL LETTER CA [Taml]=>[Taml]
		0xB9A, // (ச) TAMIL LETTER CA [Taml]=>[Taml]
		0xBEA, // (௪) TAMIL DIGIT FOUR [Taml]=>[Gran,Taml]
	],
	[
		// "சு" <Same>
		'B9A BC1', // TAMIL LETTER CA + TAMIL VOWEL SIGN U [Taml]=>[Taml]
		0xBEC, // (௬) TAMIL DIGIT SIX [Taml]=>[Gran,Taml]
	],
	[
		// "சூ" <Same>
		'B9A BC2', // TAMIL LETTER CA + TAMIL VOWEL SIGN UU [Taml]=>[Taml]
		0xBF2, // (௲) TAMIL NUMBER ONE THOUSAND [Taml]=>[Gran,Taml]
	],
	[
		// "டி" <Same>
		'B9F BBF', // TAMIL LETTER TTA + TAMIL VOWEL SIGN I [Taml]=>[Taml]
		0xD3A, // (ഺ) MALAYALAM LETTER TTTA [Mlym]=>[Mlym]
	],
	[
		// "ண" <Same>
		'BA3', // TAMIL LETTER NNA [Taml]=>[Taml]
		0xBA3, // (ண) TAMIL LETTER NNA [Taml]=>[Taml]
		0xD23, // (ണ) MALAYALAM LETTER NNA [Mlym]=>[Mlym]
	],
	[
		// "நீ" <Same>
		'BA8 BC0', // TAMIL LETTER NA + TAMIL VOWEL SIGN II [Taml]=>[Taml]
		0xBFA, // (௺) TAMIL NUMBER SIGN [Taml]=>[Taml]
	],
	[
		// "மீ" <Same>
		'BAE BC0', // TAMIL LETTER MA + TAMIL VOWEL SIGN II [Taml]=>[Taml]
		0xBF4, // (௴) TAMIL MONTH SIGN [Taml]=>[Taml]
	],
	[
		// "ய" <Same>
		'BAF', // TAMIL LETTER YA [Taml]=>[Taml]
		0xBAF, // (ய) TAMIL LETTER YA [Taml]=>[Taml]
		0xBF0, // (௰) TAMIL NUMBER TEN [Taml]=>[Gran,Taml]
	],
	[
		// "ழ" <Same>
		'BB4', // TAMIL LETTER LLLA [Taml]=>[Taml]
		0xBB4, // (ழ) TAMIL LETTER LLLA [Taml]=>[Taml]
		0xD34, // (ഴ) MALAYALAM LETTER LLLA [Mlym]=>[Mlym]
	],
	[
		// "ள" <Same>
		'BB3', // TAMIL LETTER LLA [Taml]=>[Taml]
		0xBB3, // (ள) TAMIL LETTER LLA [Taml]=>[Taml]
		0xBD7, // (◌ௗ) TAMIL AU LENGTH MARK [Taml]=>[Taml]
	],
	[
		// "ன" <Same>
		'BA9', // TAMIL LETTER NNNA [Taml]=>[Taml]
		0xBA9, // (ன) TAMIL LETTER NNNA [Taml]=>[Taml]
		0xBC8, // (◌ை) TAMIL VOWEL SIGN AI [Taml]=>[Taml]
	],
	[
		// "ஶ" <Same>
		'BB6', // TAMIL LETTER SHA [Taml]=>[Taml]
		0xBB6, // (ஶ) TAMIL LETTER SHA [Taml]=>[Taml]
		0xD36, // (ശ) MALAYALAM LETTER SHA [Mlym]=>[Mlym]
	],
	[
		// "ஷ" <Same>
		'BB7', // TAMIL LETTER SSA [Taml]=>[Taml]
		0xBB7, // (ஷ) TAMIL LETTER SSA [Taml]=>[Taml]
		0xBF8, // (௸) TAMIL AS ABOVE SIGN [Taml]=>[Taml]
	],
	[
		// "◌ி" <Same>
		'BBF', // TAMIL VOWEL SIGN I [Taml]=>[Taml]
		0xBBF, // (◌ி) TAMIL VOWEL SIGN I [Taml]=>[Taml]
		0xD3F, // (◌ി) MALAYALAM VOWEL SIGN I [Mlym]=>[Mlym]
		0xD40, // (◌ീ) MALAYALAM VOWEL SIGN II [Mlym]=>[Mlym]
	],
	[
		// "◌ெஈ" <Same>
		'BC6 B88', // TAMIL VOWEL SIGN E + TAMIL LETTER II [Taml]=>[Taml]
		0xBCA, // (◌ொ) TAMIL VOWEL SIGN O [Taml]=>[Taml]
	],
	[
		// "◌ெள" <Same>
		'BC6 BB3', // TAMIL VOWEL SIGN E + TAMIL LETTER LLA [Taml]=>[Taml]
		0xBCC, // (◌ௌ) TAMIL VOWEL SIGN AU [Taml]=>[Taml]
	],
	[
		// "◌ேஈ" <Same>
		'BC7 B88', // TAMIL VOWEL SIGN EE + TAMIL LETTER II [Taml]=>[Taml]
		0xBCB, // (◌ோ) TAMIL VOWEL SIGN OO [Taml]=>[Taml]
	],
	[
		// "అ" <Same>
		'C05', // TELUGU LETTER A [Telu]=>[Telu]
		0xC05, // (అ) TELUGU LETTER A [Telu]=>[Telu]
		0xC85, // (ಅ) KANNADA LETTER A [Knda]=>[Knda]
	],
	[
		// "ఆ" <Same>
		'C06', // TELUGU LETTER AA [Telu]=>[Telu]
		0xC06, // (ఆ) TELUGU LETTER AA [Telu]=>[Telu]
		0xC86, // (ಆ) KANNADA LETTER AA [Knda]=>[Knda]
	],
	[
		// "ఇ" <Same>
		'C07', // TELUGU LETTER I [Telu]=>[Telu]
		0xC07, // (ఇ) TELUGU LETTER I [Telu]=>[Telu]
		0xC87, // (ಇ) KANNADA LETTER I [Knda]=>[Knda]
	],
	[
		// "ఋా" <Same>
		'C0B C3E', // TELUGU LETTER VOCALIC R + TELUGU VOWEL SIGN AA [Telu]=>[Telu]
		0xC60, // (ౠ) TELUGU LETTER VOCALIC RR [Telu]=>[Telu]
	],
	[
		// "ఌా" <Same>
		'C0C C3E', // TELUGU LETTER VOCALIC L + TELUGU VOWEL SIGN AA [Telu]=>[Telu]
		0xC61, // (ౡ) TELUGU LETTER VOCALIC LL [Telu]=>[Telu]
	],
	[
		// "ఒ" <Same>
		'C12', // TELUGU LETTER O [Telu]=>[Telu]
		0xC12, // (ఒ) TELUGU LETTER O [Telu]=>[Telu]
		0xC92, // (ಒ) KANNADA LETTER O [Knda]=>[Knda]
	],
	[
		// "ఒౌ" <Same>
		'C12 C4C', // TELUGU LETTER O + TELUGU VOWEL SIGN AU [Telu]=>[Telu]
		0xC14, // (ఔ) TELUGU LETTER AU [Telu]=>[Telu]
		0xC94, // (ಔ) KANNADA LETTER AU [Knda]=>[Knda]
	],
	[
		// "ఒౕ" <Same>
		'C12 C55', // TELUGU LETTER O + TELUGU LENGTH MARK [Telu]=>[Telu]
		0xC13, // (ఓ) TELUGU LETTER OO [Telu]=>[Telu]
		0xC93, // (ಓ) KANNADA LETTER OO [Knda]=>[Knda]
	],
	[
		// "జ" <Same>
		'C1C', // TELUGU LETTER JA [Telu]=>[Telu]
		0xC1C, // (జ) TELUGU LETTER JA [Telu]=>[Telu]
		0xC9C, // (ಜ) KANNADA LETTER JA [Knda]=>[Knda]
	],
	[
		// "ఞ" <Same>
		'C1E', // TELUGU LETTER NYA [Telu]=>[Telu]
		0xC1E, // (ఞ) TELUGU LETTER NYA [Telu]=>[Telu]
		0xC9E, // (ಞ) KANNADA LETTER NYA [Knda]=>[Knda]
	],
	[
		// "డ̣" <Same>
		'C21 323', // TELUGU LETTER DDA + COMBINING DOT BELOW [Telu,Zinh]=>[Telu]
		0xC22, // (ఢ) TELUGU LETTER DDHA [Telu]=>[Telu]
	],
	[
		// "ణ" <Same>
		'C23', // TELUGU LETTER NNA [Telu]=>[Telu]
		0xC23, // (ణ) TELUGU LETTER NNA [Telu]=>[Telu]
		0xCA3, // (ಣ) KANNADA LETTER NNA [Knda]=>[Knda]
	],
	[
		// "ధּ" <Same>
		'C27 5BC', // TELUGU LETTER DHA + HEBREW POINT DAGESH OR MAPIQ [Telu,Hebr]=>[]
		0xC25, // (థ) TELUGU LETTER THA [Telu]=>[Telu]
	],
	[
		// "బ̣" <Same>
		'C2C 323', // TELUGU LETTER BA + COMBINING DOT BELOW [Telu,Zinh]=>[Telu]
		0xC2D, // (భ) TELUGU LETTER BHA [Telu]=>[Telu]
	],
	[
		// "య" <Same>
		'C2F', // TELUGU LETTER YA [Telu]=>[Telu]
		0xC2F, // (య) TELUGU LETTER YA [Telu]=>[Telu]
		0xCAF, // (ಯ) KANNADA LETTER YA [Knda]=>[Knda]
	],
	[
		// "రּ" <Same>
		'C30 5BC', // TELUGU LETTER RA + HEBREW POINT DAGESH OR MAPIQ [Telu,Hebr]=>[]
		0xC20, // (ఠ) TELUGU LETTER TTHA [Telu]=>[Telu]
	],
	[
		// "ఱ" <Same>
		'C31', // TELUGU LETTER RRA [Telu]=>[Telu]
		0xC31, // (ఱ) TELUGU LETTER RRA [Telu]=>[Telu]
		0xCB1, // (ಱ) KANNADA LETTER RRA [Knda]=>[Knda]
	],
	[
		// "ల" <Same>
		'C32', // TELUGU LETTER LA [Telu]=>[Telu]
		0xC32, // (ల) TELUGU LETTER LA [Telu]=>[Telu]
		0xCB2, // (ಲ) KANNADA LETTER LA [Knda]=>[Knda]
	],
	[
		// "వ̣" <Same>
		'C35 323', // TELUGU LETTER VA + COMBINING DOT BELOW [Telu,Zinh]=>[Telu]
		0xC37, // (ష) TELUGU LETTER SSA [Telu]=>[Telu]
	],
	[
		// "వా" <Same>
		'C35 C3E', // TELUGU LETTER VA + TELUGU VOWEL SIGN AA [Telu]=>[Telu]
		0xC39, // (హ) TELUGU LETTER HA [Telu]=>[Telu]
	],
	[
		// "వు" <Same>
		'C35 C41', // TELUGU LETTER VA + TELUGU VOWEL SIGN U [Telu]=>[Telu]
		0xC2E, // (మ) TELUGU LETTER MA [Telu]=>[Telu]
	],
	[
		// "◌ుా" <Same>
		'C41 C3E', // TELUGU VOWEL SIGN U + TELUGU VOWEL SIGN AA [Telu]=>[Telu]
		0xC42, // (◌ూ) TELUGU VOWEL SIGN UU [Telu]=>[Telu]
	],
	[
		// "◌ృా" <Same>
		'C43 C3E', // TELUGU VOWEL SIGN VOCALIC R + TELUGU VOWEL SIGN AA [Telu]=>[Telu]
		0xC44, // (◌ౄ) TELUGU VOWEL SIGN VOCALIC RR [Telu]=>[Telu]
	],
	[
		// "ಌಾ" <Same>
		'C8C CBE', // KANNADA LETTER VOCALIC L + KANNADA VOWEL SIGN AA [Knda]=>[Knda]
		0xCE1, // (ೡ) KANNADA LETTER VOCALIC LL [Knda]=>[Knda]
	],
	[
		// "ഇൗ" <Same>
		'D07 D57', // MALAYALAM LETTER I + MALAYALAM AU LENGTH MARK [Mlym]=>[Mlym]
		0xD08, // (ഈ) MALAYALAM LETTER II [Mlym]=>[Mlym]
	],
	[
		// "എെ" <Same>
		'D0E D46', // MALAYALAM LETTER E + MALAYALAM VOWEL SIGN E [Mlym]=>[Mlym]
		0xD10, // (ഐ) MALAYALAM LETTER AI [Mlym]=>[Mlym]
	],
	[
		// "ഒാ" <Same>
		'D12 D3E', // MALAYALAM LETTER O + MALAYALAM VOWEL SIGN AA [Mlym]=>[Mlym]
		0xD13, // (ഓ) MALAYALAM LETTER OO [Mlym]=>[Mlym]
	],
	[
		// "ഒൗ" <Same>
		'D12 D57', // MALAYALAM LETTER O + MALAYALAM AU LENGTH MARK [Mlym]=>[Mlym]
		0xD14, // (ഔ) MALAYALAM LETTER AU [Mlym]=>[Mlym]
	],
	[
		// "ഞ" <Same>
		'D1E', // MALAYALAM LETTER NYA [Mlym]=>[Mlym]
		0xD1E, // (ഞ) MALAYALAM LETTER NYA [Mlym]=>[Mlym]
		0xD61, // (ൡ) MALAYALAM LETTER VOCALIC LL [Mlym]=>[Mlym]
	],
	[
		// "ദ്ര" <Same>
		'D26 D4D D30', // MALAYALAM LETTER DA + MALAYALAM SIGN VIRAMA + MALAYALAM LETTER RA [Mlym]=>[Mlym]
		0xD6B, // (൫) MALAYALAM DIGIT FIVE [Mlym]=>[Mlym]
	],
	[
		// "നു" <Same>
		'D28 D41', // MALAYALAM LETTER NA + MALAYALAM VOWEL SIGN U [Mlym]=>[Mlym]
		0xD79, // (൹) MALAYALAM DATE MARK [Mlym]=>[Mlym]
		0xD0C, // (ഌ) MALAYALAM LETTER VOCALIC L [Mlym]=>[Mlym]
		0xD19, // (ങ) MALAYALAM LETTER NGA [Mlym]=>[Mlym]
	],
	[
		// "ന്" <Same>
		'D28 D4D', // MALAYALAM LETTER NA + MALAYALAM SIGN VIRAMA [Mlym]=>[Mlym]
		0xD6F, // (൯) MALAYALAM DIGIT NINE [Mlym]=>[Mlym]
		0xD7B, // (ൻ) MALAYALAM LETTER CHILLU N [Mlym]=>[Mlym]
	],
	[
		// "ന്ന" <Same>
		'D28 D4D D28', // MALAYALAM LETTER NA + MALAYALAM SIGN VIRAMA + MALAYALAM LETTER NA [Mlym]=>[Mlym]
		0xD6C, // (൬) MALAYALAM DIGIT SIX [Mlym]=>[Mlym]
	],
	[
		// "ന്മ" <Same>
		'D28 D4D D2E', // MALAYALAM LETTER NA + MALAYALAM SIGN VIRAMA + MALAYALAM LETTER MA [Mlym]=>[Mlym]
		0xD5A, // (൚) MALAYALAM FRACTION THREE EIGHTIETHS [Mlym]=>[Mlym]
	],
	[
		// "ര" <Same>
		'D30', // MALAYALAM LETTER RA [Mlym]=>[Mlym]
		0xD30, // (ര) MALAYALAM LETTER RA [Mlym]=>[Mlym]
		0xD31, // (റ) MALAYALAM LETTER RRA [Mlym]=>[Mlym]
	],
	[
		// "ര്" <Same>
		'D30 D4D', // MALAYALAM LETTER RA + MALAYALAM SIGN VIRAMA [Mlym]=>[Mlym]
		0xD6A, // (൪) MALAYALAM DIGIT FOUR [Mlym]=>[Mlym]
		0xD7C, // (ർ) MALAYALAM LETTER CHILLU RR [Mlym]=>[Mlym]
	],
	[
		// "വ്ര" <Same>
		'D35 D4D D30', // MALAYALAM LETTER VA + MALAYALAM SIGN VIRAMA + MALAYALAM LETTER RA [Mlym]=>[Mlym]
		0xD6E, // (൮) MALAYALAM DIGIT EIGHT [Mlym]=>[Mlym]
	],
	[
		// "ഹ്മ" <Same>
		'D39 D4D D2E', // MALAYALAM LETTER HA + MALAYALAM SIGN VIRAMA + MALAYALAM LETTER MA [Mlym]=>[Mlym]
		0xD76, // (൶) MALAYALAM FRACTION ONE SIXTEENTH [Mlym]=>[Mlym]
	],
	[
		// "◌ു" <Same>
		'D41', // MALAYALAM VOWEL SIGN U [Mlym]=>[Mlym]
		0xD41, // (◌ു) MALAYALAM VOWEL SIGN U [Mlym]=>[Mlym]
		0xD42, // (◌ൂ) MALAYALAM VOWEL SIGN UU [Mlym]=>[Mlym]
		0xD43, // (◌ൃ) MALAYALAM VOWEL SIGN VOCALIC R [Mlym]=>[Mlym]
	],
	[
		// "◌െെ" <Same>
		'D46 D46', // MALAYALAM VOWEL SIGN E + MALAYALAM VOWEL SIGN E [Mlym]=>[Mlym]
		0xD48, // (◌ൈ) MALAYALAM VOWEL SIGN AI [Mlym]=>[Mlym]
	],
	[
		// "ජ" <Same>
		'DA2', // SINHALA LETTER ALPAPRAANA JAYANNA [Sinh]=>[Sinh]
		0xDA2, // (ජ) SINHALA LETTER ALPAPRAANA JAYANNA [Sinh]=>[Sinh]
		0xDEA, // (෪) SINHALA LITH DIGIT FOUR [Sinh]=>[Sinh]
	],
	[
		// "ද" <Same>
		'DAF', // SINHALA LETTER ALPAPRAANA DAYANNA [Sinh]=>[Sinh]
		0xDAF, // (ද) SINHALA LETTER ALPAPRAANA DAYANNA [Sinh]=>[Sinh]
		0xDEB, // (෫) SINHALA LITH DIGIT FIVE [Sinh]=>[Sinh]
	],
	[
		// "𑐴𑑂𑐒" <Same>
		'11434 11442 11412', // NEWA LETTER HA + NEWA SIGN VIRAMA + NEWA LETTER NGA [Newa]=>[Newa]
		0x11413, // (𑐓) NEWA LETTER NGHA [Newa]=>[Newa]
	],
	[
		// "𑐴𑑂𑐘" <Same>
		'11434 11442 11418', // NEWA LETTER HA + NEWA SIGN VIRAMA + NEWA LETTER NYA [Newa]=>[Newa]
		0x11419, // (𑐙) NEWA LETTER NYHA [Newa]=>[Newa]
	],
	[
		// "𑐴𑑂𑐣" <Same>
		'11434 11442 11423', // NEWA LETTER HA + NEWA SIGN VIRAMA + NEWA LETTER NA [Newa]=>[Newa]
		0x11424, // (𑐤) NEWA LETTER NHA [Newa]=>[Newa]
	],
	[
		// "𑐴𑑂𑐩" <Same>
		'11434 11442 11429', // NEWA LETTER HA + NEWA SIGN VIRAMA + NEWA LETTER MA [Newa]=>[Newa]
		0x1142A, // (𑐪) NEWA LETTER MHA [Newa]=>[Newa]
	],
	[
		// "𑐴𑑂𑐬" <Same>
		'11434 11442 1142C', // NEWA LETTER HA + NEWA SIGN VIRAMA + NEWA LETTER RA [Newa]=>[Newa]
		0x1142D, // (𑐭) NEWA LETTER RHA [Newa]=>[Newa]
	],
	[
		// "𑐴𑑂𑐮" <Same>
		'11434 11442 1142E', // NEWA LETTER HA + NEWA SIGN VIRAMA + NEWA LETTER LA [Newa]=>[Newa]
		0x1142F, // (𑐯) NEWA LETTER LHA [Newa]=>[Newa]
	],
	[
		// "𑖂" <Same>
		'11582', // SIDDHAM LETTER I [Sidd]=>[Sidd]
		0x11582, // (𑖂) SIDDHAM LETTER I [Sidd]=>[Sidd]
		0x115D8, // (𑗘) SIDDHAM LETTER THREE-CIRCLE ALTERNATE I [Sidd]=>[Sidd]
		0x115D9, // (𑗙) SIDDHAM LETTER TWO-CIRCLE ALTERNATE I [Sidd]=>[Sidd]
	],
	[
		// "𑖃" <Same>
		'11583', // SIDDHAM LETTER II [Sidd]=>[Sidd]
		0x11583, // (𑖃) SIDDHAM LETTER II [Sidd]=>[Sidd]
		0x115DA, // (𑗚) SIDDHAM LETTER TWO-CIRCLE ALTERNATE II [Sidd]=>[Sidd]
	],
	[
		// "𑖄" <Same>
		'11584', // SIDDHAM LETTER U [Sidd]=>[Sidd]
		0x11584, // (𑖄) SIDDHAM LETTER U [Sidd]=>[Sidd]
		0x115DB, // (𑗛) SIDDHAM LETTER ALTERNATE U [Sidd]=>[Sidd]
	],
	[
		// "◌𑖲" <Same>
		'115B2', // SIDDHAM VOWEL SIGN U [Sidd]=>[Sidd]
		0x115B2, // (◌𑖲) SIDDHAM VOWEL SIGN U [Sidd]=>[Sidd]
		0x115DC, // (◌𑗜) SIDDHAM VOWEL SIGN ALTERNATE U [Sidd]=>[Sidd]
	],
	[
		// "◌𑖳" <Same>
		'115B3', // SIDDHAM VOWEL SIGN UU [Sidd]=>[Sidd]
		0x115B3, // (◌𑖳) SIDDHAM VOWEL SIGN UU [Sidd]=>[Sidd]
		0x115DD, // (◌𑗝) SIDDHAM VOWEL SIGN ALTERNATE UU [Sidd]=>[Sidd]
	],
	[
		// "ข" <Same>
		'E02', // THAI CHARACTER KHO KHAI [Thai]=>[Thai]
		0xE02, // (ข) THAI CHARACTER KHO KHAI [Thai]=>[Thai]
		0xE03, // (ฃ) THAI CHARACTER KHO KHUAT [Thai]=>[Thai]
	],
	[
		// "ค" <Same>
		'E04', // THAI CHARACTER KHO KHWAI [Thai]=>[Thai]
		0xE04, // (ค) THAI CHARACTER KHO KHWAI [Thai]=>[Thai]
		0xE14, // (ด) THAI CHARACTER DO DEK [Thai]=>[Thai]
		0xE15, // (ต) THAI CHARACTER TO TAO [Thai]=>[Thai]
	],
	[
		// "ฆ" <Same>
		'E06', // THAI CHARACTER KHO RAKHANG [Thai]=>[Thai]
		0xE06, // (ฆ) THAI CHARACTER KHO RAKHANG [Thai]=>[Thai]
		0xE21, // (ม) THAI CHARACTER MO MA [Thai]=>[Thai]
	],
	[
		// "จ" <Same>
		'E08', // THAI CHARACTER CHO CHAN [Thai]=>[Thai]
		0xE08, // (จ) THAI CHARACTER CHO CHAN [Thai]=>[Thai]
		0xE88, // (ຈ) LAO LETTER CO [Laoo]=>[Laoo]
	],
	[
		// "ช" <Same>
		'E0A', // THAI CHARACTER CHO CHANG [Thai]=>[Thai]
		0xE0A, // (ช) THAI CHARACTER CHO CHANG [Thai]=>[Thai]
		0xE0B, // (ซ) THAI CHARACTER SO SO [Thai]=>[Thai]
	],
	[
		// "ฎ" <Same>
		'E0E', // THAI CHARACTER DO CHADA [Thai]=>[Thai]
		0xE0E, // (ฎ) THAI CHARACTER DO CHADA [Thai]=>[Thai]
		0xE0F, // (ฏ) THAI CHARACTER TO PATAK [Thai]=>[Thai]
	],
	[
		// "ฑ" <Same>
		'E11', // THAI CHARACTER THO NANGMONTHO [Thai]=>[Thai]
		0xE11, // (ฑ) THAI CHARACTER THO NANGMONTHO [Thai]=>[Thai]
		0xE17, // (ท) THAI CHARACTER THO THAHAN [Thai]=>[Thai]
	],
	[
		// "บ" <Same>
		'E1A', // THAI CHARACTER BO BAIMAI [Thai]=>[Thai]
		0xE1A, // (บ) THAI CHARACTER BO BAIMAI [Thai]=>[Thai]
		0xE9A, // (ບ) LAO LETTER BO [Laoo]=>[Laoo]
	],
	[
		// "ป" <Same>
		'E1B', // THAI CHARACTER PO PLA [Thai]=>[Thai]
		0xE1B, // (ป) THAI CHARACTER PO PLA [Thai]=>[Thai]
		0xE9B, // (ປ) LAO LETTER PO [Laoo]=>[Laoo]
	],
	[
		// "ฝ" <Same>
		'E1D', // THAI CHARACTER FO FA [Thai]=>[Thai]
		0xE1D, // (ฝ) THAI CHARACTER FO FA [Thai]=>[Thai]
		0xE9D, // (ຝ) LAO LETTER FO TAM [Laoo]=>[Laoo]
	],
	[
		// "พ" <Same>
		'E1E', // THAI CHARACTER PHO PHAN [Thai]=>[Thai]
		0xE1E, // (พ) THAI CHARACTER PHO PHAN [Thai]=>[Thai]
		0xE9E, // (ພ) LAO LETTER PHO TAM [Laoo]=>[Laoo]
	],
	[
		// "ฟ" <Same>
		'E1F', // THAI CHARACTER FO FAN [Thai]=>[Thai]
		0xE1F, // (ฟ) THAI CHARACTER FO FAN [Thai]=>[Thai]
		0xE9F, // (ຟ) LAO LETTER FO SUNG [Laoo]=>[Laoo]
	],
	[
		// "ภ" <Same>
		'E20', // THAI CHARACTER PHO SAMPHAO [Thai]=>[Thai]
		0xE20, // (ภ) THAI CHARACTER PHO SAMPHAO [Thai]=>[Thai]
		0xE26, // (ฦ) THAI CHARACTER LU [Thai]=>[Thai]
	],
	[
		// "ย" <Same>
		'E22', // THAI CHARACTER YO YAK [Thai]=>[Thai]
		0xE22, // (ย) THAI CHARACTER YO YAK [Thai]=>[Thai]
		0xE8D, // (ຍ) LAO LETTER NYO [Laoo]=>[Laoo]
	],
	[
		// "ฯ" <Same>
		'E2F', // THAI CHARACTER PAIYANNOI [Thai]=>[Thai]
		0xE2F, // (ฯ) THAI CHARACTER PAIYANNOI [Thai]=>[Thai]
		//DISALLOW:0x17D4, // (។) KHMER SIGN KHAN [Khmr]=>[Khmr]
	],
	[
		// "า" <Same>
		'E32', // THAI CHARACTER SARA AA [Thai]=>[Thai]
		0xE32, // (า) THAI CHARACTER SARA AA [Thai]=>[Thai]
		0xE45, // (ๅ) THAI CHARACTER LAKKHANGYAO [Thai]=>[Thai]
	],
	[
		// "◌̊า" <Same>
		'30A E32', // COMBINING RING ABOVE + THAI CHARACTER SARA AA [Zinh,Thai]=>[Thai]
		//IDNA:0xE33, // (ำ) THAI CHARACTER SARA AM [Thai]=>[Thai]
	],
	[
		// "◌ิ" <Same>
		'E34', // THAI CHARACTER SARA I [Thai]=>[Thai]
		0xE34, // (◌ิ) THAI CHARACTER SARA I [Thai]=>[Thai]
		0x17B7, // (◌ិ) KHMER VOWEL SIGN I [Khmr]=>[Khmr]
	],
	[
		// "◌ี" <Same>
		'E35', // THAI CHARACTER SARA II [Thai]=>[Thai]
		0xE35, // (◌ี) THAI CHARACTER SARA II [Thai]=>[Thai]
		0x17B8, // (◌ី) KHMER VOWEL SIGN II [Khmr]=>[Khmr]
	],
	[
		// "◌ึ" <Same>
		'E36', // THAI CHARACTER SARA UE [Thai]=>[Thai]
		0xE36, // (◌ึ) THAI CHARACTER SARA UE [Thai]=>[Thai]
		0x17B9, // (◌ឹ) KHMER VOWEL SIGN Y [Khmr]=>[Khmr]
	],
	[
		// "◌ื" <Same>
		'E37', // THAI CHARACTER SARA UEE [Thai]=>[Thai]
		0xE37, // (◌ื) THAI CHARACTER SARA UEE [Thai]=>[Thai]
		0x17BA, // (◌ឺ) KHMER VOWEL SIGN YY [Khmr]=>[Khmr]
	],
	[
		// "◌ุ" <Same>
		'E38', // THAI CHARACTER SARA U [Thai]=>[Thai]
		0xE38, // (◌ุ) THAI CHARACTER SARA U [Thai]=>[Thai]
		0xEB8, // (◌ຸ) LAO VOWEL SIGN U [Laoo]=>[Laoo]
	],
	[
		// "◌ู" <Same>
		'E39', // THAI CHARACTER SARA UU [Thai]=>[Thai]
		0xE39, // (◌ู) THAI CHARACTER SARA UU [Thai]=>[Thai]
		0xEB9, // (◌ູ) LAO VOWEL SIGN UU [Laoo]=>[Laoo]
	],
	[
		// "เเ" <Same>
		'E40 E40', // THAI CHARACTER SARA E + THAI CHARACTER SARA E [Thai]=>[Thai]
		0xE41, // (แ) THAI CHARACTER SARA AE [Thai]=>[Thai]
	],
	[
		// "ຫນ" <Same>
		'EAB E99', // LAO LETTER HO SUNG + LAO LETTER NO [Laoo]=>[Laoo]
		//IDNA:0xEDC, // (ໜ) LAO HO NO [Laoo]=>[Laoo]
	],
	[
		// "ຫມ" <Same>
		'EAB EA1', // LAO LETTER HO SUNG + LAO LETTER MO [Laoo]=>[Laoo]
		//IDNA:0xEDD, // (ໝ) LAO HO MO [Laoo]=>[Laoo]
	],
	[
		// "◌̊າ" <Same>
		'30A EB2', // COMBINING RING ABOVE + LAO VOWEL SIGN AA [Zinh,Laoo]=>[Laoo]
		//IDNA:0xEB3, // (ຳ) LAO VOWEL SIGN AM [Laoo]=>[Laoo]
	],
	[
		// "འུྂཿ" <Same>
		'F60 F74 F82 F7F', // TIBETAN LETTER -A + TIBETAN VOWEL SIGN U + TIBETAN SIGN NYI ZLA NAA DA + TIBETAN SIGN RNAM BCAD [Tibt]=>[Tibt]
		0xF02, // (༂) TIBETAN MARK GTER YIG MGO -UM RNAM BCAD MA [Tibt]=>[Tibt]
	],
	[
		// "འུྂ༔" <Same>
		'F60 F74 F82 F14', // TIBETAN LETTER -A + TIBETAN VOWEL SIGN U + TIBETAN SIGN NYI ZLA NAA DA + TIBETAN MARK GTER TSHEG [Tibt]=>[Tibt]
		0xF03, // (༃) TIBETAN MARK GTER YIG MGO -UM GTER TSHEG MA [Tibt]=>[Tibt]
	],
	[
		// "ར" <Same>
		'F62', // TIBETAN LETTER RA [Tibt]=>[Tibt]
		0xF62, // (ར) TIBETAN LETTER RA [Tibt]=>[Tibt]
		0xF6A, // (ཪ) TIBETAN LETTER FIXED-FORM RA [Tibt]=>[Tibt]
	],
	[
		// "ཨོཾ" <Same>
		'F68 F7C F7E', // TIBETAN LETTER A + TIBETAN VOWEL SIGN O + TIBETAN SIGN RJES SU NGA RO [Tibt]=>[Tibt]
		0xF00, // (ༀ) TIBETAN SYLLABLE OM [Tibt]=>[Tibt]
	],
	[
		// "◌ྲཱྀ" <Same>
		'FB2 F71 F80', // TIBETAN SUBJOINED LETTER RA + TIBETAN VOWEL SIGN AA + TIBETAN VOWEL SIGN REVERSED I [Tibt]=>[Tibt]
		//IDNA:0xF77, // (◌ཷ) TIBETAN VOWEL SIGN VOCALIC RR [Tibt]=>[Tibt]
	],
	[
		// "◌ླཱྀ" <Same>
		'FB3 F71 F80', // TIBETAN SUBJOINED LETTER LA + TIBETAN VOWEL SIGN AA + TIBETAN VOWEL SIGN REVERSED I [Tibt]=>[Tibt]
		//IDNA:0xF79, // (◌ཹ) TIBETAN VOWEL SIGN VOCALIC LL [Tibt]=>[Tibt]
	],
	[
		// "◌𑲪" <Same>
		'11CAA', // MARCHEN SUBJOINED LETTER RA [Marc]=>[Marc]
		0x11CAA, // (◌𑲪) MARCHEN SUBJOINED LETTER RA [Marc]=>[Marc]
		0x11CB2, // (◌𑲲) MARCHEN VOWEL SIGN U [Marc]=>[Marc]
	],
	[
		// "ဂှ" <Same>
		'1002 103E', // MYANMAR LETTER GA + MYANMAR CONSONANT SIGN MEDIAL HA [Mymr]=>[Mymr]
		0x1081, // (ႁ) MYANMAR LETTER SHAN HA [Mymr]=>[Mymr]
	],
	[
		// "ဂာ" <Same>
		'1002 102C', // MYANMAR LETTER GA + MYANMAR VOWEL SIGN AA [Mymr]=>[Mymr]
		0x1000, // (က) MYANMAR LETTER KA [Mymr]=>[Mymr]
	],
	[
		// "ဃှ" <Same>
		'1003 103E', // MYANMAR LETTER GHA + MYANMAR CONSONANT SIGN MEDIAL HA [Mymr]=>[Mymr]
		0x1070, // (ၰ) MYANMAR LETTER EASTERN PWO KAREN GHWA [Mymr]=>[Mymr]
	],
	[
		// "ပှ" <Same>
		'1015 103E', // MYANMAR LETTER PA + MYANMAR CONSONANT SIGN MEDIAL HA [Mymr]=>[Mymr]
		0x1066, // (ၦ) MYANMAR LETTER WESTERN PWO KAREN PWA [Mymr]=>[Mymr]
	],
	[
		// "ပာ" <Same>
		'1015 102C', // MYANMAR LETTER PA + MYANMAR VOWEL SIGN AA [Mymr]=>[Mymr]
		0x101F, // (ဟ) MYANMAR LETTER HA [Mymr]=>[Mymr]
	],
	[
		// "ပာှ" <Same>
		'1015 102C 103E', // MYANMAR LETTER PA + MYANMAR VOWEL SIGN AA + MYANMAR CONSONANT SIGN MEDIAL HA [Mymr]=>[Mymr]
		0x106F, // (ၯ) MYANMAR LETTER EASTERN PWO KAREN YWA [Mymr]=>[Mymr]
	],
	[
		// "ၽှ" <Same>
		'107D 103E', // MYANMAR LETTER SHAN PHA + MYANMAR CONSONANT SIGN MEDIAL HA [Mymr]=>[Mymr]
		0x107E, // (ၾ) MYANMAR LETTER SHAN FA [Mymr]=>[Mymr]
	],
	[
		// "သြ" <Same>
		'101E 103C', // MYANMAR LETTER SA + MYANMAR CONSONANT SIGN MEDIAL RA [Mymr]=>[Mymr]
		0x1029, // (ဩ) MYANMAR LETTER O [Mymr]=>[Mymr]
	],
	[
		// "သြော်" <Same>
		'101E 103C 1031 102C 103A', // MYANMAR LETTER SA + MYANMAR CONSONANT SIGN MEDIAL RA + MYANMAR VOWEL SIGN E + MYANMAR VOWEL SIGN AA + MYANMAR SIGN ASAT [Mymr]=>[Mymr]
		0x102A, // (ဪ) MYANMAR LETTER AU [Mymr]=>[Mymr]
	],
	[
		// "◌ႃ̊" <Same>
		'1083 30A', // MYANMAR VOWEL SIGN SHAN AA + COMBINING RING ABOVE [Mymr,Zinh]=>[Mymr]
		0x109E, // (႞) MYANMAR SYMBOL SHAN ONE [Mymr]=>[Mymr]
	],
	[
		// "អ" <Same>
		'17A2', // KHMER LETTER QA [Khmr]=>[Khmr]
		0x17A2, // (អ) KHMER LETTER QA [Khmr]=>[Khmr]
		//DISALLOW:0x17A3, // (ឣ) KHMER INDEPENDENT VOWEL QAQ [Khmr]=>[Khmr]
	],
	/*[
		// "ᦞ" <Same>
		'199E', // NEW TAI LUE LETTER LOW VA [Talu]=>[Talu]
		0x199E, // (ᦞ) NEW TAI LUE LETTER LOW VA [Talu]=>[Talu]
		0x19D0, // (᧐) NEW TAI LUE DIGIT ZERO [Talu]=>[Talu]
	],
	[
		// "ᦱ" <Same>
		'19B1', // NEW TAI LUE VOWEL SIGN AA [Talu]=>[Talu]
		0x19B1, // (ᦱ) NEW TAI LUE VOWEL SIGN AA [Talu]=>[Talu]
		0x19D1, // (᧑) NEW TAI LUE DIGIT ONE [Talu]=>[Talu]
	],*/
	[
		// "ᩅ" <Same>
		'1A45', // TAI THAM LETTER WA [Lana]=>[Lana]
		0x1A45, // (ᩅ) TAI THAM LETTER WA [Lana]=>[Lana]
		0x1A80, // (᪀) TAI THAM HORA DIGIT ZERO [Lana]=>[Lana]
		0x1A90, // (᪐) TAI THAM THAM DIGIT ZERO [Lana]=>[Lana]
	],
	[
		// "ꨁ" <Same>
		'AA01', // CHAM LETTER I [Cham]=>[Cham]
		0xAA01, // (ꨁ) CHAM LETTER I [Cham]=>[Cham]
		0xAA53, // (꩓) CHAM DIGIT THREE [Cham]=>[Cham]
	],
	[
		// "ꨣ" <Same>
		'AA23', // CHAM LETTER RA [Cham]=>[Cham]
		0xAA23, // (ꨣ) CHAM LETTER RA [Cham]=>[Cham]
		0xAA56, // (꩖) CHAM DIGIT SIX [Cham]=>[Cham]
	],
	[
		// "ᬍ" <Same>
		'1B0D', // BALINESE LETTER LA LENGA [Bali]=>[Bali]
		0x1B0D, // (ᬍ) BALINESE LETTER LA LENGA [Bali]=>[Bali]
		0x1B52, // (᭒) BALINESE DIGIT TWO [Bali]=>[Bali]
	],
	[
		// "ᬑ" <Same>
		'1B11', // BALINESE LETTER OKARA [Bali]=>[Bali]
		0x1B11, // (ᬑ) BALINESE LETTER OKARA [Bali]=>[Bali]
		0x1B53, // (᭓) BALINESE DIGIT THREE [Bali]=>[Bali]
	],
	[
		// "ᬨ" <Same>
		'1B28', // BALINESE LETTER PA KAPAL [Bali]=>[Bali]
		0x1B28, // (ᬨ) BALINESE LETTER PA KAPAL [Bali]=>[Bali]
		0x1B58, // (᭘) BALINESE DIGIT EIGHT [Bali]=>[Bali]
	],
	[
		// "ꦝ" <Same>
		'A99D', // JAVANESE LETTER DDA [Java]=>[Java]
		0xA99D, // (ꦝ) JAVANESE LETTER DDA [Java]=>[Java]
		0xA9A3, // (ꦣ) JAVANESE LETTER DA MAHAPRANA [Java]=>[Java]
	],
	[
		// "ᡜ" <Same>
		'185C', // MONGOLIAN LETTER TODO DZA [Mong]=>[Mong]
		0x185C, // (ᡜ) MONGOLIAN LETTER TODO DZA [Mong]=>[Mong]
		0x1896, // (ᢖ) MONGOLIAN LETTER ALI GALI ZA [Mong]=>[Mong]
	],
	[
		// "ᠵ" <Same>
		'1835', // MONGOLIAN LETTER JA [Mong]=>[Mong]
		0x1835, // (ᠵ) MONGOLIAN LETTER JA [Mong]=>[Mong]
		0x1855, // (ᡕ) MONGOLIAN LETTER TODO YA [Mong]=>[Mong]
	],
	[
		// "Ꮿ" <Same>
		'13EF', // CHEROKEE LETTER YA [Cher]=>[Cher]
		0x13EF, // (Ꮿ) CHEROKEE LETTER YA [Cher]=>[Cher]
		0x1FF6, // (ῶ) GREEK SMALL LETTER OMEGA WITH PERISPOMENI [Grek]=>[Grek]
	],
	[
		// "ᐁ·" <Same>
		'1401 B7', // CANADIAN SYLLABICS E + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x140D, // (ᐍ) CANADIAN SYLLABICS WEST-CREE WE [Cans]=>[Cans]
	],
	[
		// "ᐁᐠ" <Same>
		'1401 1420', // CANADIAN SYLLABICS E + CANADIAN SYLLABICS FINAL GRAVE [Cans]=>[Cans]
		0x142B, // (ᐫ) CANADIAN SYLLABICS EN [Cans]=>[Cans]
	],
	[
		// "ᐄ·" <Same>
		'1404 B7', // CANADIAN SYLLABICS II + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1411, // (ᐑ) CANADIAN SYLLABICS WEST-CREE WII [Cans]=>[Cans]
	],
	[
		// "ᐅ·" <Same>
		'1405 B7', // CANADIAN SYLLABICS O + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1413, // (ᐓ) CANADIAN SYLLABICS WEST-CREE WO [Cans]=>[Cans]
	],
	[
		// "ᐅᐠ" <Same>
		'1405 1420', // CANADIAN SYLLABICS O + CANADIAN SYLLABICS FINAL GRAVE [Cans]=>[Cans]
		0x142D, // (ᐭ) CANADIAN SYLLABICS ON [Cans]=>[Cans]
	],
	[
		// "ᐆ·" <Same>
		'1406 B7', // CANADIAN SYLLABICS OO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1415, // (ᐕ) CANADIAN SYLLABICS WEST-CREE WOO [Cans]=>[Cans]
	],
	[
		// "ᐊ·" <Same>
		'140A B7', // CANADIAN SYLLABICS A + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1418, // (ᐘ) CANADIAN SYLLABICS WEST-CREE WA [Cans]=>[Cans]
	],
	[
		// "ᐊᐠ" <Same>
		'140A 1420', // CANADIAN SYLLABICS A + CANADIAN SYLLABICS FINAL GRAVE [Cans]=>[Cans]
		0x142E, // (ᐮ) CANADIAN SYLLABICS AN [Cans]=>[Cans]
	],
	[
		// "ᐋ·" <Same>
		'140B B7', // CANADIAN SYLLABICS AA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x141A, // (ᐚ) CANADIAN SYLLABICS WEST-CREE WAA [Cans]=>[Cans]
	],
	[
		// "ᐞᣟ" <Same>
		'141E 18DF', // CANADIAN SYLLABICS GLOTTAL STOP + CANADIAN SYLLABICS FINAL RAISED DOT [Cans]=>[Cans]
		0x18DD, // (ᣝ) CANADIAN SYLLABICS WESTERN W [Cans]=>[Cans]
	],
	[
		// "ᐡ" <Same>
		'1421', // CANADIAN SYLLABICS FINAL BOTTOM HALF RING [Cans]=>[Cans]
		0x1421, // (ᐡ) CANADIAN SYLLABICS FINAL BOTTOM HALF RING [Cans]=>[Cans]
		0x14D1, // (ᓑ) CANADIAN SYLLABICS CARRIER NG [Cans]=>[Cans]
	],
	[
		// "ᐩ" <Same>
		'1429', // CANADIAN SYLLABICS FINAL PLUS [Cans]=>[Cans]
		0x1429, // (ᐩ) CANADIAN SYLLABICS FINAL PLUS [Cans]=>[Cans]
		0x1540, // (ᕀ) CANADIAN SYLLABICS WEST-CREE Y [Cans]=>[Cans]
	],
	[
		// "ᐲ·" <Same>
		'1432 B7', // CANADIAN SYLLABICS PII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x143F, // (ᐿ) CANADIAN SYLLABICS WEST-CREE PWII [Cans]=>[Cans]
	],
	[
		// "ᐴ·" <Same>
		'1434 B7', // CANADIAN SYLLABICS POO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1443, // (ᑃ) CANADIAN SYLLABICS WEST-CREE PWOO [Cans]=>[Cans]
	],
	[
		// "ᐵ" <Same>
		'1435', // CANADIAN SYLLABICS Y-CREE POO [Cans]=>[Cans]
		0x1435, // (ᐵ) CANADIAN SYLLABICS Y-CREE POO [Cans]=>[Cans]
		//DISALLOW:0x2369, // (⍩) APL FUNCTIONAL SYMBOL GREATER-THAN DIAERESIS [Zyyy]=>[ALL]
	],
	[
		// "ᐹ·" <Same>
		'1439 B7', // CANADIAN SYLLABICS PAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1447, // (ᑇ) CANADIAN SYLLABICS WEST-CREE PWAA [Cans]=>[Cans]
	],
	[
		// "ᑏ·" <Same>
		'144F B7', // CANADIAN SYLLABICS TII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x145C, // (ᑜ) CANADIAN SYLLABICS WEST-CREE TWII [Cans]=>[Cans]
	],
	[
		// "ᑐ" <Same>
		'1450', // CANADIAN SYLLABICS TO [Cans]=>[Cans]
		0x1450, // (ᑐ) CANADIAN SYLLABICS TO [Cans]=>[Cans]
		//DISALLOW:0x2E27, // (⸧) RIGHT SIDEWAYS U BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x2283, // (⊃) SUPERSET OF [Zyyy]=>[ALL]
	],
	[
		// "ᑐ·" <Same>
		'1450 B7', // CANADIAN SYLLABICS TO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x145E, // (ᑞ) CANADIAN SYLLABICS WEST-CREE TWO [Cans]=>[Cans]
	],
	[
		// "ᑐ'" <Same>
		'1450 27', // CANADIAN SYLLABICS TO + APOSTROPHE [Cans,Zyyy]=>[Cans]
		0x1469, // (ᑩ) CANADIAN SYLLABICS TTO [Cans]=>[Cans]
	],
	[
		// "ᑐ/" <Same>
		'1450 2F', // CANADIAN SYLLABICS TO + SOLIDUS [Cans,Zyyy]=>[Cans]
		//DISALLOW:0x27C9, // (⟉) SUPERSET PRECEDING SOLIDUS [Zyyy]=>[ALL]
	],
	[
		// "ᑐᑕ" <Same>
		'1450 1455', // CANADIAN SYLLABICS TO + CANADIAN SYLLABICS TA [Cans]=>[Cans]
		//DISALLOW:0x2AD7, // (⫗) SUPERSET BESIDE SUBSET [Zyyy]=>[ALL]
	],
	[
		// "ᑑ·" <Same>
		'1451 B7', // CANADIAN SYLLABICS TOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1460, // (ᑠ) CANADIAN SYLLABICS WEST-CREE TWOO [Cans]=>[Cans]
	],
	[
		// "ᑕ" <Same>
		'1455', // CANADIAN SYLLABICS TA [Cans]=>[Cans]
		0x1455, // (ᑕ) CANADIAN SYLLABICS TA [Cans]=>[Cans]
		//DISALLOW:0x2E26, // (⸦) LEFT SIDEWAYS U BRACKET [Zyyy]=>[ALL]
		//DISALLOW:0x2282, // (⊂) SUBSET OF [Zyyy]=>[ALL]
	],
	[
		// "ᑕ·" <Same>
		'1455 B7', // CANADIAN SYLLABICS TA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1462, // (ᑢ) CANADIAN SYLLABICS WEST-CREE TWA [Cans]=>[Cans]
	],
	[
		// "ᑕ'" <Same>
		'1455 27', // CANADIAN SYLLABICS TA + APOSTROPHE [Cans,Zyyy]=>[Cans]
		0x146A, // (ᑪ) CANADIAN SYLLABICS TTA [Cans]=>[Cans]
	],
	[
		// "ᑖ·" <Same>
		'1456 B7', // CANADIAN SYLLABICS TAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1464, // (ᑤ) CANADIAN SYLLABICS WEST-CREE TWAA [Cans]=>[Cans]
	],
	[
		// "ᑫ·" <Same>
		'146B B7', // CANADIAN SYLLABICS KE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1475, // (ᑵ) CANADIAN SYLLABICS WEST-CREE KWE [Cans]=>[Cans]
	],
	[
		// "ᑫ'" <Same>
		'146B 27', // CANADIAN SYLLABICS KE + APOSTROPHE [Cans,Zyyy]=>[Cans]
		0x1485, // (ᒅ) CANADIAN SYLLABICS SOUTH-SLAVEY KEH [Cans]=>[Cans]
	],
	[
		// "ᑮ·" <Same>
		'146E B7', // CANADIAN SYLLABICS KII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1479, // (ᑹ) CANADIAN SYLLABICS WEST-CREE KWII [Cans]=>[Cans]
	],
	[
		// "ᑰ·" <Same>
		'1470 B7', // CANADIAN SYLLABICS KOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x147D, // (ᑽ) CANADIAN SYLLABICS WEST-CREE KWOO [Cans]=>[Cans]
	],
	[
		// "ᒉ" <Same>
		'1489', // CANADIAN SYLLABICS CE [Cans]=>[Cans]
		0x1489, // (ᒉ) CANADIAN SYLLABICS CE [Cans]=>[Cans]
		0x1603, // (ᘃ) CANADIAN SYLLABICS CARRIER NO [Cans]=>[Cans]
	],
	[
		// "ᒉ·" <Same>
		'1489 B7', // CANADIAN SYLLABICS CE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1493, // (ᒓ) CANADIAN SYLLABICS WEST-CREE CWE [Cans]=>[Cans]
	],
	[
		// "ᒋ·" <Same>
		'148B B7', // CANADIAN SYLLABICS CI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1495, // (ᒕ) CANADIAN SYLLABICS WEST-CREE CWI [Cans]=>[Cans]
	],
	[
		// "ᒌ·" <Same>
		'148C B7', // CANADIAN SYLLABICS CII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1497, // (ᒗ) CANADIAN SYLLABICS WEST-CREE CWII [Cans]=>[Cans]
	],
	[
		// "ᒎ·" <Same>
		'148E B7', // CANADIAN SYLLABICS COO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x149B, // (ᒛ) CANADIAN SYLLABICS WEST-CREE CWOO [Cans]=>[Cans]
	],
	[
		// "ᒐ" <Same>
		'1490', // CANADIAN SYLLABICS CA [Cans]=>[Cans]
		0x1490, // (ᒐ) CANADIAN SYLLABICS CA [Cans]=>[Cans]
		0x1602, // (ᘂ) CANADIAN SYLLABICS CARRIER NU [Cans]=>[Cans]
	],
	[
		// "ᒐ·" <Same>
		'1490 B7', // CANADIAN SYLLABICS CA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x149D, // (ᒝ) CANADIAN SYLLABICS WEST-CREE CWA [Cans]=>[Cans]
	],
	[
		// "ᒑ·" <Same>
		'1491 B7', // CANADIAN SYLLABICS CAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x149F, // (ᒟ) CANADIAN SYLLABICS WEST-CREE CWAA [Cans]=>[Cans]
	],
	[
		// "ᒣ·" <Same>
		'14A3 B7', // CANADIAN SYLLABICS ME + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14AD, // (ᒭ) CANADIAN SYLLABICS WEST-CREE MWE [Cans]=>[Cans]
	],
	[
		// "ᒦ·" <Same>
		'14A6 B7', // CANADIAN SYLLABICS MII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14B1, // (ᒱ) CANADIAN SYLLABICS WEST-CREE MWII [Cans]=>[Cans]
	],
	[
		// "ᒧ·" <Same>
		'14A7 B7', // CANADIAN SYLLABICS MO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14B3, // (ᒳ) CANADIAN SYLLABICS WEST-CREE MWO [Cans]=>[Cans]
	],
	[
		// "ᒨ·" <Same>
		'14A8 B7', // CANADIAN SYLLABICS MOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14B5, // (ᒵ) CANADIAN SYLLABICS WEST-CREE MWOO [Cans]=>[Cans]
	],
	[
		// "ᒫ·" <Same>
		'14AB B7', // CANADIAN SYLLABICS MAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14B9, // (ᒹ) CANADIAN SYLLABICS WEST-CREE MWAA [Cans]=>[Cans]
	],
	[
		// "ᓀ·" <Same>
		'14C0 B7', // CANADIAN SYLLABICS NE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14CA, // (ᓊ) CANADIAN SYLLABICS WEST-CREE NWE [Cans]=>[Cans]
	],
	[
		// "ᓂ·" <Same>
		'14C2 B7', // CANADIAN SYLLABICS NI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18C7, // (ᣇ) CANADIAN SYLLABICS OJIBWAY NWI [Cans]=>[Cans]
	],
	[
		// "ᓃ·" <Same>
		'14C3 B7', // CANADIAN SYLLABICS NII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18C9, // (ᣉ) CANADIAN SYLLABICS OJIBWAY NWII [Cans]=>[Cans]
	],
	[
		// "ᓄ·" <Same>
		'14C4 B7', // CANADIAN SYLLABICS NO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18CB, // (ᣋ) CANADIAN SYLLABICS OJIBWAY NWO [Cans]=>[Cans]
	],
	[
		// "ᓅ·" <Same>
		'14C5 B7', // CANADIAN SYLLABICS NOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18CD, // (ᣍ) CANADIAN SYLLABICS OJIBWAY NWOO [Cans]=>[Cans]
	],
	[
		// "ᓇ·" <Same>
		'14C7 B7', // CANADIAN SYLLABICS NA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14CC, // (ᓌ) CANADIAN SYLLABICS WEST-CREE NWA [Cans]=>[Cans]
	],
	[
		// "ᓈ·" <Same>
		'14C8 B7', // CANADIAN SYLLABICS NAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14CE, // (ᓎ) CANADIAN SYLLABICS WEST-CREE NWAA [Cans]=>[Cans]
	],
	[
		// "ᓓ" <Same>
		'14D3', // CANADIAN SYLLABICS LE [Cans]=>[Cans]
		0x14D3, // (ᓓ) CANADIAN SYLLABICS LE [Cans]=>[Cans]
		0x1604, // (ᘄ) CANADIAN SYLLABICS CARRIER NE [Cans]=>[Cans]
	],
	[
		// "ᓓ·" <Same>
		'14D3 B7', // CANADIAN SYLLABICS LE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14DD, // (ᓝ) CANADIAN SYLLABICS WEST-CREE LWE [Cans]=>[Cans]
	],
	[
		// "ᓕ·" <Same>
		'14D5 B7', // CANADIAN SYLLABICS LI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14DF, // (ᓟ) CANADIAN SYLLABICS WEST-CREE LWI [Cans]=>[Cans]
	],
	[
		// "ᓖ·" <Same>
		'14D6 B7', // CANADIAN SYLLABICS LII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14E1, // (ᓡ) CANADIAN SYLLABICS WEST-CREE LWII [Cans]=>[Cans]
	],
	[
		// "ᓗ·" <Same>
		'14D7 B7', // CANADIAN SYLLABICS LO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14E3, // (ᓣ) CANADIAN SYLLABICS WEST-CREE LWO [Cans]=>[Cans]
	],
	[
		// "ᓘ·" <Same>
		'14D8 B7', // CANADIAN SYLLABICS LOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14E5, // (ᓥ) CANADIAN SYLLABICS WEST-CREE LWOO [Cans]=>[Cans]
	],
	[
		// "ᓚ" <Same>
		'14DA', // CANADIAN SYLLABICS LA [Cans]=>[Cans]
		0x14DA, // (ᓚ) CANADIAN SYLLABICS LA [Cans]=>[Cans]
		0x1607, // (ᘇ) CANADIAN SYLLABICS CARRIER NA [Cans]=>[Cans]
	],
	[
		// "ᓚ·" <Same>
		'14DA B7', // CANADIAN SYLLABICS LA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14E7, // (ᓧ) CANADIAN SYLLABICS WEST-CREE LWA [Cans]=>[Cans]
	],
	[
		// "ᓛ·" <Same>
		'14DB B7', // CANADIAN SYLLABICS LAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14E9, // (ᓩ) CANADIAN SYLLABICS WEST-CREE LWAA [Cans]=>[Cans]
	],
	[
		// "ᓭ·" <Same>
		'14ED B7', // CANADIAN SYLLABICS SE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14F7, // (ᓷ) CANADIAN SYLLABICS WEST-CREE SWE [Cans]=>[Cans]
	],
	[
		// "ᓯ·" <Same>
		'14EF B7', // CANADIAN SYLLABICS SI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14F9, // (ᓹ) CANADIAN SYLLABICS WEST-CREE SWI [Cans]=>[Cans]
	],
	[
		// "ᓰ·" <Same>
		'14F0 B7', // CANADIAN SYLLABICS SII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14FB, // (ᓻ) CANADIAN SYLLABICS WEST-CREE SWII [Cans]=>[Cans]
	],
	[
		// "ᓱ·" <Same>
		'14F1 B7', // CANADIAN SYLLABICS SO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14FD, // (ᓽ) CANADIAN SYLLABICS WEST-CREE SWO [Cans]=>[Cans]
	],
	[
		// "ᓲ·" <Same>
		'14F2 B7', // CANADIAN SYLLABICS SOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x14FF, // (ᓿ) CANADIAN SYLLABICS WEST-CREE SWOO [Cans]=>[Cans]
	],
	[
		// "ᓴ·" <Same>
		'14F4 B7', // CANADIAN SYLLABICS SA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1501, // (ᔁ) CANADIAN SYLLABICS WEST-CREE SWA [Cans]=>[Cans]
	],
	[
		// "ᓵ·" <Same>
		'14F5 B7', // CANADIAN SYLLABICS SAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1503, // (ᔃ) CANADIAN SYLLABICS WEST-CREE SWAA [Cans]=>[Cans]
	],
	[
		// "ᔋ<" <Same>
		'150B 3C', // CANADIAN SYLLABICS NASKAPI S-W + LESS-THAN SIGN [Cans,Zyyy]=>[Cans]
		0x150C, // (ᔌ) CANADIAN SYLLABICS NASKAPI SPWA [Cans]=>[Cans]
	],
	[
		// "ᔋb" <Same>
		'150B 62', // CANADIAN SYLLABICS NASKAPI S-W + LATIN SMALL LETTER B [Cans,Latn]=>[]
		0x150E, // (ᔎ) CANADIAN SYLLABICS NASKAPI SKWA [Cans]=>[Cans]
	],
	[
		// "ᔋᑕ" <Same>
		'150B 1455', // CANADIAN SYLLABICS NASKAPI S-W + CANADIAN SYLLABICS TA [Cans]=>[Cans]
		0x150D, // (ᔍ) CANADIAN SYLLABICS NASKAPI STWA [Cans]=>[Cans]
	],
	[
		// "ᔋᒐ" <Same>
		'150B 1490', // CANADIAN SYLLABICS NASKAPI S-W + CANADIAN SYLLABICS CA [Cans]=>[Cans]
		0x150F, // (ᔏ) CANADIAN SYLLABICS NASKAPI SCWA [Cans]=>[Cans]
	],
	[
		// "ᔐ·" <Same>
		'1510 B7', // CANADIAN SYLLABICS SHE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1518, // (ᔘ) CANADIAN SYLLABICS WEST-CREE SHWE [Cans]=>[Cans]
	],
	[
		// "ᔑ·" <Same>
		'1511 B7', // CANADIAN SYLLABICS SHI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x151A, // (ᔚ) CANADIAN SYLLABICS WEST-CREE SHWI [Cans]=>[Cans]
	],
	[
		// "ᔒ·" <Same>
		'1512 B7', // CANADIAN SYLLABICS SHII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x151C, // (ᔜ) CANADIAN SYLLABICS WEST-CREE SHWII [Cans]=>[Cans]
	],
	[
		// "ᔓ·" <Same>
		'1513 B7', // CANADIAN SYLLABICS SHO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x151E, // (ᔞ) CANADIAN SYLLABICS WEST-CREE SHWO [Cans]=>[Cans]
	],
	[
		// "ᔔ·" <Same>
		'1514 B7', // CANADIAN SYLLABICS SHOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1520, // (ᔠ) CANADIAN SYLLABICS WEST-CREE SHWOO [Cans]=>[Cans]
	],
	[
		// "ᔕ·" <Same>
		'1515 B7', // CANADIAN SYLLABICS SHA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1522, // (ᔢ) CANADIAN SYLLABICS WEST-CREE SHWA [Cans]=>[Cans]
	],
	[
		// "ᔖ·" <Same>
		'1516 B7', // CANADIAN SYLLABICS SHAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1524, // (ᔤ) CANADIAN SYLLABICS WEST-CREE SHWAA [Cans]=>[Cans]
	],
	[
		// "ᔨ·" <Same>
		'1528 B7', // CANADIAN SYLLABICS YI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1532, // (ᔲ) CANADIAN SYLLABICS WEST-CREE YWI [Cans]=>[Cans]
	],
	[
		// "ᔩ·" <Same>
		'1529 B7', // CANADIAN SYLLABICS YII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1534, // (ᔴ) CANADIAN SYLLABICS WEST-CREE YWII [Cans]=>[Cans]
	],
	[
		// "ᔪ·" <Same>
		'152A B7', // CANADIAN SYLLABICS YO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1536, // (ᔶ) CANADIAN SYLLABICS WEST-CREE YWO [Cans]=>[Cans]
	],
	[
		// "ᔫ·" <Same>
		'152B B7', // CANADIAN SYLLABICS YOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1538, // (ᔸ) CANADIAN SYLLABICS WEST-CREE YWOO [Cans]=>[Cans]
	],
	[
		// "ᔭ·" <Same>
		'152D B7', // CANADIAN SYLLABICS YA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x153A, // (ᔺ) CANADIAN SYLLABICS WEST-CREE YWA [Cans]=>[Cans]
	],
	[
		// "ᔮ·" <Same>
		'152E B7', // CANADIAN SYLLABICS YAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x153C, // (ᔼ) CANADIAN SYLLABICS WEST-CREE YWAA [Cans]=>[Cans]
	],
	[
		// "ᕃ" <Same>
		'1543', // CANADIAN SYLLABICS R-CREE RE [Cans]=>[Cans]
		0x1543, // (ᕃ) CANADIAN SYLLABICS R-CREE RE [Cans]=>[Cans]
		0x1622, // (ᘢ) CANADIAN SYLLABICS CARRIER LU [Cans]=>[Cans]
	],
	[
		// "ᕃ·" <Same>
		'1543 B7', // CANADIAN SYLLABICS R-CREE RE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18E0, // (ᣠ) CANADIAN SYLLABICS R-CREE RWE [Cans]=>[Cans]
	],
	[
		// "ᕆ" <Same>
		'1546', // CANADIAN SYLLABICS RI [Cans]=>[Cans]
		0x1546, // (ᕆ) CANADIAN SYLLABICS RI [Cans]=>[Cans]
		0x1623, // (ᘣ) CANADIAN SYLLABICS CARRIER LO [Cans]=>[Cans]
	],
	[
		// "ᕊ" <Same>
		'154A', // CANADIAN SYLLABICS WEST-CREE LO [Cans]=>[Cans]
		0x154A, // (ᕊ) CANADIAN SYLLABICS WEST-CREE LO [Cans]=>[Cans]
		0x1624, // (ᘤ) CANADIAN SYLLABICS CARRIER LE [Cans]=>[Cans]
	],
	[
		// "ᕌ·" <Same>
		'154C B7', // CANADIAN SYLLABICS RAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x154F, // (ᕏ) CANADIAN SYLLABICS WEST-CREE RWAA [Cans]=>[Cans]
	],
	[
		// "ᕐb" <Same>
		'1550 62', // CANADIAN SYLLABICS R + LATIN SMALL LETTER B [Cans,Latn]=>[]
		0x1583, // (ᖃ) CANADIAN SYLLABICS QA [Cans]=>[Cans]
	],
	[
		// "ᕐḃ" <NFC(false) NFD(true)>
		'1550 62 307', // CANADIAN SYLLABICS R + LATIN SMALL LETTER B + COMBINING DOT ABOVE [Cans,Latn,Zinh]=>[]
		0x1584, // (ᖄ) CANADIAN SYLLABICS QAA [Cans]=>[Cans]
	],
	[
		// "ᕐd" <Same>
		'1550 64', // CANADIAN SYLLABICS R + LATIN SMALL LETTER D [Cans,Latn]=>[]
		0x1581, // (ᖁ) CANADIAN SYLLABICS QO [Cans]=>[Cans]
	],
	[
		// "ᕐP" <Same>
		'1550 50', // CANADIAN SYLLABICS R + LATIN CAPITAL LETTER P [Cans,Latn]=>[]
		0x157F, // (ᕿ) CANADIAN SYLLABICS QI [Cans]=>[Cans]
	],
	[
		// "ᕐᑫ" <Same>
		'1550 146B', // CANADIAN SYLLABICS R + CANADIAN SYLLABICS KE [Cans]=>[Cans]
		0x166F, // (ᙯ) CANADIAN SYLLABICS QAI [Cans]=>[Cans]
	],
	[
		// "ᕐᑬ" <Same>
		'1550 146C', // CANADIAN SYLLABICS R + CANADIAN SYLLABICS KAAI [Cans]=>[Cans]
		0x157E, // (ᕾ) CANADIAN SYLLABICS QAAI [Cans]=>[Cans]
	],
	[
		// "ᕐᑮ" <Same>
		'1550 146E', // CANADIAN SYLLABICS R + CANADIAN SYLLABICS KII [Cans]=>[Cans]
		0x1580, // (ᖀ) CANADIAN SYLLABICS QII [Cans]=>[Cans]
	],
	[
		// "ᕐᑰ" <Same>
		'1550 1470', // CANADIAN SYLLABICS R + CANADIAN SYLLABICS KOO [Cans]=>[Cans]
		0x1582, // (ᖂ) CANADIAN SYLLABICS QOO [Cans]=>[Cans]
	],
	[
		// "ᕐᒃ" <Same>
		'1550 1483', // CANADIAN SYLLABICS R + CANADIAN SYLLABICS K [Cans]=>[Cans]
		0x1585, // (ᖅ) CANADIAN SYLLABICS Q [Cans]=>[Cans]
	],
	[
		// "ᕚ·" <Same>
		'155A B7', // CANADIAN SYLLABICS FAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x155C, // (ᕜ) CANADIAN SYLLABICS WEST-CREE FWAA [Cans]=>[Cans]
	],
	[
		// "ᕞ·" <Same>
		'155E B7', // CANADIAN SYLLABICS THE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18E3, // (ᣣ) CANADIAN SYLLABICS THWE [Cans]=>[Cans]
	],
	[
		// "ᕦ·" <Same>
		'1566 B7', // CANADIAN SYLLABICS THA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18E4, // (ᣤ) CANADIAN SYLLABICS THWA [Cans]=>[Cans]
	],
	[
		// "ᕧ·" <Same>
		'1567 B7', // CANADIAN SYLLABICS THAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1569, // (ᕩ) CANADIAN SYLLABICS WEST-CREE THWAA [Cans]=>[Cans]
	],
	[
		// "ᕫ·" <Same>
		'156B B7', // CANADIAN SYLLABICS TTHE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18E5, // (ᣥ) CANADIAN SYLLABICS TTHWE [Cans]=>[Cans]
	],
	[
		// "ᖆ·" <Same>
		'1586 B7', // CANADIAN SYLLABICS TLHE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18E8, // (ᣨ) CANADIAN SYLLABICS TLHWE [Cans]=>[Cans]
	],
	[
		// "ᖕJ" <Same>
		'1595 4A', // CANADIAN SYLLABICS NG + LATIN CAPITAL LETTER J [Cans,Latn]=>[]
		0x1591, // (ᖑ) CANADIAN SYLLABICS NGO [Cans]=>[Cans]
	],
	[
		// "ᖕᒉ" <Same>
		'1595 1489', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS CE [Cans]=>[Cans]
		0x1670, // (ᙰ) CANADIAN SYLLABICS NGAI [Cans]=>[Cans]
	],
	[
		// "ᖕᒊ" <Same>
		'1595 148A', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS CAAI [Cans]=>[Cans]
		0x158E, // (ᖎ) CANADIAN SYLLABICS NGAAI [Cans]=>[Cans]
	],
	[
		// "ᖕᒋ" <Same>
		'1595 148B', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS CI [Cans]=>[Cans]
		0x158F, // (ᖏ) CANADIAN SYLLABICS NGI [Cans]=>[Cans]
	],
	[
		// "ᖕᒌ" <Same>
		'1595 148C', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS CII [Cans]=>[Cans]
		0x1590, // (ᖐ) CANADIAN SYLLABICS NGII [Cans]=>[Cans]
	],
	[
		// "ᖕᒎ" <Same>
		'1595 148E', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS COO [Cans]=>[Cans]
		0x1592, // (ᖒ) CANADIAN SYLLABICS NGOO [Cans]=>[Cans]
	],
	[
		// "ᖕᒐ" <Same>
		'1595 1490', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS CA [Cans]=>[Cans]
		0x1593, // (ᖓ) CANADIAN SYLLABICS NGA [Cans]=>[Cans]
	],
	[
		// "ᖕᒑ" <Same>
		'1595 1491', // CANADIAN SYLLABICS NG + CANADIAN SYLLABICS CAA [Cans]=>[Cans]
		0x1594, // (ᖔ) CANADIAN SYLLABICS NGAA [Cans]=>[Cans]
	],
	[
		// "ᖖJ" <Same>
		'1596 4A', // CANADIAN SYLLABICS NNG + LATIN CAPITAL LETTER J [Cans,Latn]=>[]
		0x1673, // (ᙳ) CANADIAN SYLLABICS NNGO [Cans]=>[Cans]
	],
	[
		// "ᖖᒋ" <Same>
		'1596 148B', // CANADIAN SYLLABICS NNG + CANADIAN SYLLABICS CI [Cans]=>[Cans]
		0x1671, // (ᙱ) CANADIAN SYLLABICS NNGI [Cans]=>[Cans]
	],
	[
		// "ᖖᒌ" <Same>
		'1596 148C', // CANADIAN SYLLABICS NNG + CANADIAN SYLLABICS CII [Cans]=>[Cans]
		0x1672, // (ᙲ) CANADIAN SYLLABICS NNGII [Cans]=>[Cans]
	],
	[
		// "ᖖᒎ" <Same>
		'1596 148E', // CANADIAN SYLLABICS NNG + CANADIAN SYLLABICS COO [Cans]=>[Cans]
		0x1674, // (ᙴ) CANADIAN SYLLABICS NNGOO [Cans]=>[Cans]
	],
	[
		// "ᖖᒐ" <Same>
		'1596 1490', // CANADIAN SYLLABICS NNG + CANADIAN SYLLABICS CA [Cans]=>[Cans]
		0x1675, // (ᙵ) CANADIAN SYLLABICS NNGA [Cans]=>[Cans]
	],
	[
		// "ᖖᒑ" <Same>
		'1596 1491', // CANADIAN SYLLABICS NNG + CANADIAN SYLLABICS CAA [Cans]=>[Cans]
		0x1676, // (ᙶ) CANADIAN SYLLABICS NNGAA [Cans]=>[Cans]
	],
	[
		// "ᖗ·" <Same>
		'1597 B7', // CANADIAN SYLLABICS SAYISI SHE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18EA, // (ᣪ) CANADIAN SYLLABICS SAYISI SHWE [Cans]=>[Cans]
	],
	[
		// "ᖧ·" <Same>
		'15A7 B7', // CANADIAN SYLLABICS TH-CREE THE + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1677, // (ᙷ) CANADIAN SYLLABICS WOODS-CREE THWEE [Cans]=>[Cans]
	],
	[
		// "ᖨ·" <Same>
		'15A8 B7', // CANADIAN SYLLABICS TH-CREE THI + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1678, // (ᙸ) CANADIAN SYLLABICS WOODS-CREE THWI [Cans]=>[Cans]
	],
	[
		// "ᖩ·" <Same>
		'15A9 B7', // CANADIAN SYLLABICS TH-CREE THII + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x1679, // (ᙹ) CANADIAN SYLLABICS WOODS-CREE THWII [Cans]=>[Cans]
	],
	[
		// "ᖪ·" <Same>
		'15AA B7', // CANADIAN SYLLABICS TH-CREE THO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x167A, // (ᙺ) CANADIAN SYLLABICS WOODS-CREE THWO [Cans]=>[Cans]
	],
	[
		// "ᖫ·" <Same>
		'15AB B7', // CANADIAN SYLLABICS TH-CREE THOO + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x167B, // (ᙻ) CANADIAN SYLLABICS WOODS-CREE THWOO [Cans]=>[Cans]
	],
	[
		// "ᖬ·" <Same>
		'15AC B7', // CANADIAN SYLLABICS TH-CREE THA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x167C, // (ᙼ) CANADIAN SYLLABICS WOODS-CREE THWA [Cans]=>[Cans]
	],
	[
		// "ᖭ·" <Same>
		'15AD B7', // CANADIAN SYLLABICS TH-CREE THAA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x167D, // (ᙽ) CANADIAN SYLLABICS WOODS-CREE THWAA [Cans]=>[Cans]
	],
	[
		// "ᗒ" <Same>
		'15D2', // CANADIAN SYLLABICS CARRIER WE [Cans]=>[Cans]
		0x15D2, // (ᗒ) CANADIAN SYLLABICS CARRIER WE [Cans]=>[Cans]
		//DISALLOW:0x2AAB, // (⪫) LARGER THAN [Zyyy]=>[ALL]
	],
	[
		// "ᗕ" <Same>
		'15D5', // CANADIAN SYLLABICS CARRIER WA [Cans]=>[Cans]
		0x15D5, // (ᗕ) CANADIAN SYLLABICS CARRIER WA [Cans]=>[Cans]
		//DISALLOW:0x2AAA, // (⪪) SMALLER THAN [Zyyy]=>[ALL]
	],
	[
		// "ᗡ" <Same>
		'15E1', // CANADIAN SYLLABICS CARRIER THA [Cans]=>[Cans]
		0x15E1, // (ᗡ) CANADIAN SYLLABICS CARRIER THA [Cans]=>[Cans]
		0xA4F7, // (ꓷ) LISU LETTER OE [Lisu]=>[Lisu]
	],
	[
		// "ᗴ·" <Same>
		'15F4 B7', // CANADIAN SYLLABICS CARRIER GA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18F0, // (ᣰ) CANADIAN SYLLABICS CARRIER GWA [Cans]=>[Cans]
	],
	[
		// "ᘛ·" <Same>
		'161B B7', // CANADIAN SYLLABICS CARRIER JA + MIDDLE DOT [Cans,Zyyy]=>[Cans]
		0x18F2, // (ᣲ) CANADIAN SYLLABICS CARRIER JWA [Cans]=>[Cans]
	],
	[
		// "ᙆ" <Same>
		'1646', // CANADIAN SYLLABICS CARRIER Z [Cans]=>[Cans]
		0x1646, // (ᙆ) CANADIAN SYLLABICS CARRIER Z [Cans]=>[Cans]
		//IDNA:0x1DBB, // (ᶻ) MODIFIER LETTER SMALL Z [Latn]=>[Latn]
	],
	[
		// "ᙠ" <Same>
		'1660', // CANADIAN SYLLABICS CARRIER TSA [Cans]=>[Cans]
		0x1660, // (ᙠ) CANADIAN SYLLABICS CARRIER TSA [Cans]=>[Cans]
		0xA4ED, // (ꓭ) LISU LETTER GHA [Lisu]=>[Lisu]
	],
	[
		// "ᣔ" <Same>
		'18D4', // CANADIAN SYLLABICS OJIBWAY P [Cans]=>[Cans]
		0x18D4, // (ᣔ) CANADIAN SYLLABICS OJIBWAY P [Cans]=>[Cans]
		//IDNA:0x1DBA, // (ᶺ) MODIFIER LETTER SMALL TURNED V [Latn]=>[Latn]
	],
	[
		// "ᣖ" <Same>
		'18D6', // CANADIAN SYLLABICS OJIBWAY K [Cans]=>[Cans]
		0x18D6, // (ᣖ) CANADIAN SYLLABICS OJIBWAY K [Cans]=>[Cans]
		//IDNA:0x1D3E, // (ᴾ) MODIFIER LETTER CAPITAL P [Latn]=>[Latn]
	],
	[
		// "ᣟᐞ" <Same>
		'18DF 141E', // CANADIAN SYLLABICS FINAL RAISED DOT + CANADIAN SYLLABICS GLOTTAL STOP [Cans]=>[Cans]
		0x18DC, // (ᣜ) CANADIAN SYLLABICS EASTERN W [Cans]=>[Cans]
	],
	[
		// "ᣳ" <Same>
		'18F3', // CANADIAN SYLLABICS BEAVER DENE L [Cans]=>[Cans]
		0x18F3, // (ᣳ) CANADIAN SYLLABICS BEAVER DENE L [Cans]=>[Cans]
		//IDNA:0x2E1, // (ˡ) MODIFIER LETTER SMALL L [Latn]=>[Latn]
	],
	[
		// "ᣴ" <Same>
		'18F4', // CANADIAN SYLLABICS BEAVER DENE R [Cans]=>[Cans]
		0x18F4, // (ᣴ) CANADIAN SYLLABICS BEAVER DENE R [Cans]=>[Cans]
		//IDNA:0x2B3, // (ʳ) MODIFIER LETTER SMALL R [Latn]=>[Latn]
	],
	[
		// "ᣵ" <Same>
		'18F5', // CANADIAN SYLLABICS CARRIER DENTAL S [Cans]=>[Cans]
		0x18F5, // (ᣵ) CANADIAN SYLLABICS CARRIER DENTAL S [Cans]=>[Cans]
		//IDNA:0x2E2, // (ˢ) MODIFIER LETTER SMALL S [Latn]=>[Latn]
		0x18DB, // (ᣛ) CANADIAN SYLLABICS OJIBWAY SH [Cans]=>[Cans]
	],
	[
		// "ᚹ" <Same>
		'16B9', // RUNIC LETTER WUNJO WYNN W [Runr]=>[Runr]
		0x16B9, // (ᚹ) RUNIC LETTER WUNJO WYNN W [Runr]=>[Runr]
		0xA6B0, // (ꚰ) BAMUM LETTER TAA [Bamu]=>[Bamu]
	],
	[
		// "ᚼ" <Same>
		'16BC', // RUNIC LETTER LONG-BRANCH-HAGALL H [Runr]=>[Runr]
		0x16BC, // (ᚼ) RUNIC LETTER LONG-BRANCH-HAGALL H [Runr]=>[Runr]
		0x16E1, // (ᛡ) RUNIC LETTER IOR [Runr]=>[Runr]
	],
	[
		// "ᚽ" <Same>
		'16BD', // RUNIC LETTER SHORT-TWIG-HAGALL H [Runr]=>[Runr]
		0x16BD, // (ᚽ) RUNIC LETTER SHORT-TWIG-HAGALL H [Runr]=>[Runr]
		//DISALLOW:0x237F, // (⍿) VERTICAL LINE WITH MIDDLE DOT [Zyyy]=>[ALL]
		0x16C2, // (ᛂ) RUNIC LETTER E [Runr]=>[Runr]
	],
	[
		// "ᛋ" <Same>
		'16CB', // RUNIC LETTER SIGEL LONG-BRANCH-SOL S [Runr]=>[Runr]
		0x16CB, // (ᛋ) RUNIC LETTER SIGEL LONG-BRANCH-SOL S [Runr]=>[Runr]
		//DISALLOW:0x1D23F, // (𝈿) GREEK INSTRUMENTAL NOTATION SYMBOL-52 [Grek]=>[Grek]
	],
	[
		// "ᛏ" <Same>
		'16CF', // RUNIC LETTER TIWAZ TIR TYR T [Runr]=>[Runr]
		0x16CF, // (ᛏ) RUNIC LETTER TIWAZ TIR TYR T [Runr]=>[Runr]
		0x2191, // (↑) UPWARDS ARROW [Zyyy]=>[ALL]
	],
	[
		// "ᛐ" <Same>
		'16D0', // RUNIC LETTER SHORT-TWIG-TYR T [Runr]=>[Runr]
		0x16D0, // (ᛐ) RUNIC LETTER SHORT-TWIG-TYR T [Runr]=>[Runr]
		//DISALLOW:0x21BF, // (↿) UPWARDS HARPOON WITH BARB LEFTWARDS [Zyyy]=>[ALL]
		0x10A61, // (𐩡) OLD SOUTH ARABIAN LETTER LAMEDH [Sarb]
	],
	[
		// "ᛐ⇂" <Same>
		'16D0 21C2', // RUNIC LETTER SHORT-TWIG-TYR T + DOWNWARDS HARPOON WITH BARB RIGHTWARDS [Runr,Zyyy]=>[Runr]
		//DISALLOW:0x296E, // (⥮) UPWARDS HARPOON WITH BARB LEFT BESIDE DOWNWARDS HARPOON WITH BARB RIGHT [Zyyy]=>[ALL]
	],
	[
		// "ᛐᛚ" <Same>
		'16D0 16DA', // RUNIC LETTER SHORT-TWIG-TYR T + RUNIC LETTER LAUKAZ LAGU LOGR L [Runr]=>[Runr]
		//DISALLOW:0x2963, // (⥣) UPWARDS HARPOON WITH BARB LEFT BESIDE UPWARDS HARPOON WITH BARB RIGHT [Zyyy]=>[ALL]
	],
	[
		// "ᛯ" <Same>
		'16EF', // RUNIC TVIMADUR SYMBOL [Runr]=>[Runr]
		0x16EF, // (ᛯ) RUNIC TVIMADUR SYMBOL [Runr]=>[Runr]
		0x2D63, // (ⵣ) TIFINAGH LETTER YAZ [Tfng]=>[Tfng]
	],
	[
		// "ᛚ" <Same>
		'16DA', // RUNIC LETTER LAUKAZ LAGU LOGR L [Runr]=>[Runr]
		0x16DA, // (ᛚ) RUNIC LETTER LAUKAZ LAGU LOGR L [Runr]=>[Runr]
		//DISALLOW:0x21BE, // (↾) UPWARDS HARPOON WITH BARB RIGHTWARDS [Zyyy]=>[ALL]
		//DISALLOW:0x2A21, // (⨡) Z NOTATION SCHEMA PROJECTION [Zyyy]=>[ALL]
	],
	[
		// "ᛜ" <Same>
		'16DC', // RUNIC LETTER INGWAZ [Runr]=>[Runr]
		0x16DC, // (ᛜ) RUNIC LETTER INGWAZ [Runr]=>[Runr]
		//DISALLOW:0x22C4, // (⋄) DIAMOND OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x25C7, // (◇) WHITE DIAMOND [Zyyy]=>[ALL]
		//DISALLOW:0x25CA, // (◊) LOZENGE [Zyyy]=>[ALL]
		0x2662, // (♢) WHITE DIAMOND SUIT [Zyyy]=>[ALL]
		//DISALLOW:0x1F754, // (🝔) ALCHEMICAL SYMBOL FOR SOAP [Zyyy]=>[ALL]
		//IDNA:0x118B7, // (𑢷) WARANG CITI CAPITAL LETTER BU [Wara]=>[Wara]
		0x10294, // (𐊔) LYCIAN LETTER KK [Lyci]=>[Lyci]
	],
	[
		// "ᛜ̲" <Same>
		'16DC 332', // RUNIC LETTER INGWAZ + COMBINING LOW LINE [Runr,Zinh]=>[Runr]
		//DISALLOW:0x235A, // (⍚) APL FUNCTIONAL SYMBOL DIAMOND UNDERBAR [Zyyy]=>[ALL]
	],
	[
		// "ᛞ" <Same>
		'16DE', // RUNIC LETTER DAGAZ DAEG D [Runr]=>[Runr]
		0x16DE, // (ᛞ) RUNIC LETTER DAGAZ DAEG D [Runr]=>[Runr]
		0x22C8, // (⋈) BOWTIE [Zyyy]=>[ALL]
		//DISALLOW:0x2A1D, // (⨝) JOIN [Zyyy]=>[ALL]
	],
	[
		// "ᛦ" <Same>
		'16E6', // RUNIC LETTER LONG-BRANCH-YR [Runr]=>[Runr]
		0x16E6, // (ᛦ) RUNIC LETTER LONG-BRANCH-YR [Runr]=>[Runr]
		//IDNA:0x104D0, // (𐓐) OSAGE CAPITAL LETTER KHA [Osge]=>[Osge]
	],
	[
		// "ᛨ" <Same>
		'16E8', // RUNIC LETTER ICELANDIC-YR [Runr]=>[Runr]
		0x16E8, // (ᛨ) RUNIC LETTER ICELANDIC-YR [Runr]=>[Runr]
		//DISALLOW:0x2195, // (↕) UP DOWN ARROW [Zyyy]=>[ALL]
	],
	[
		// "𐲂" <Same>
		'10C82', // OLD HUNGARIAN CAPITAL LETTER EB [Hung]=>[Hung]
		//IDNA:0x10C82, // (𐲂) OLD HUNGARIAN CAPITAL LETTER EB [Hung]=>[Hung]
		0x10CFC, // (𐳼) OLD HUNGARIAN NUMBER TEN [Hung]=>[Hung]
	],
	[
		// "𐲥" <Same>
		'10CA5', // OLD HUNGARIAN CAPITAL LETTER ESZ [Hung]=>[Hung]
		//IDNA:0x10CA5, // (𐲥) OLD HUNGARIAN CAPITAL LETTER ESZ [Hung]=>[Hung]
		0x10CFA, // (𐳺) OLD HUNGARIAN NUMBER ONE [Hung]=>[Hung]
	],
	[
		// "ᄀ" <Same>
		'1100', // HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1100, // (ᄀ) HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		//IDNA:0x3131, // (ㄱ) HANGUL LETTER KIYEOK [Hang]=>[Hang,Kore]
		0x11A8, // (ᆨ) HANGUL JONGSEONG KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄀ" <Same>
		'1100 1100', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1101, // (ᄁ) HANGUL CHOSEONG SSANGKIYEOK [Hang]=>[Hang,Kore]
		//IDNA:0x3132, // (ㄲ) HANGUL LETTER SSANGKIYEOK [Hang]=>[Hang,Kore]
		0x11A9, // (ᆩ) HANGUL JONGSEONG SSANGKIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄂ" <Same>
		'1100 1102', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x11FA, // (ᇺ) HANGUL JONGSEONG KIYEOK-NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄃ" <Same>
		'1100 1103', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x115A, // (ᅚ) HANGUL CHOSEONG KIYEOK-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄅ" <Same>
		'1100 1105', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x11C3, // (ᇃ) HANGUL JONGSEONG KIYEOK-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄇ" <Same>
		'1100 1107', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x11FB, // (ᇻ) HANGUL JONGSEONG KIYEOK-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄉ" <Same>
		'1100 1109', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x11AA, // (ᆪ) HANGUL JONGSEONG KIYEOK-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3133, // (ㄳ) HANGUL LETTER KIYEOK-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄉᄀ" <Same>
		'1100 1109 1100', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x11C4, // (ᇄ) HANGUL JONGSEONG KIYEOK-SIOS-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄎ" <Same>
		'1100 110E', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0x11FC, // (ᇼ) HANGUL JONGSEONG KIYEOK-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄏ" <Same>
		'1100 110F', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0x11FD, // (ᇽ) HANGUL JONGSEONG KIYEOK-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄀᄒ" <Same>
		'1100 1112', // HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x11FE, // (ᇾ) HANGUL JONGSEONG KIYEOK-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂ" <Same>
		'1102', // HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x1102, // (ᄂ) HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		//IDNA:0x3134, // (ㄴ) HANGUL LETTER NIEUN [Hang]=>[Hang,Kore]
		0x11AB, // (ᆫ) HANGUL JONGSEONG NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄀ" <Same>
		'1102 1100', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1113, // (ᄓ) HANGUL CHOSEONG NIEUN-KIYEOK [Hang]=>[Hang,Kore]
		0x11C5, // (ᇅ) HANGUL JONGSEONG NIEUN-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄂ" <Same>
		'1102 1102', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x1114, // (ᄔ) HANGUL CHOSEONG SSANGNIEUN [Hang]=>[Hang,Kore]
		//IDNA:0x3165, // (ㅥ) HANGUL LETTER SSANGNIEUN [Hang]=>[Hang,Kore]
		0x11FF, // (ᇿ) HANGUL JONGSEONG SSANGNIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄃ" <Same>
		'1102 1103', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x1115, // (ᄕ) HANGUL CHOSEONG NIEUN-TIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x3166, // (ㅦ) HANGUL LETTER NIEUN-TIKEUT [Hang]=>[Hang,Kore]
		0x11C6, // (ᇆ) HANGUL JONGSEONG NIEUN-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄅ" <Same>
		'1102 1105', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0xD7CB, // (ퟋ) HANGUL JONGSEONG NIEUN-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄇ" <Same>
		'1102 1107', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1116, // (ᄖ) HANGUL CHOSEONG NIEUN-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄉ" <Same>
		'1102 1109', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x115B, // (ᅛ) HANGUL CHOSEONG NIEUN-SIOS [Hang]=>[Hang,Kore]
		0x11C7, // (ᇇ) HANGUL JONGSEONG NIEUN-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3167, // (ㅧ) HANGUL LETTER NIEUN-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄌ" <Same>
		'1102 110C', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x115C, // (ᅜ) HANGUL CHOSEONG NIEUN-CIEUC [Hang]=>[Hang,Kore]
		0x11AC, // (ᆬ) HANGUL JONGSEONG NIEUN-CIEUC [Hang]=>[Hang,Kore]
		//IDNA:0x3135, // (ㄵ) HANGUL LETTER NIEUN-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄎ" <Same>
		'1102 110E', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0xD7CC, // (ퟌ) HANGUL JONGSEONG NIEUN-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄐ" <Same>
		'1102 1110', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0x11C9, // (ᇉ) HANGUL JONGSEONG NIEUN-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᄒ" <Same>
		'1102 1112', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x115D, // (ᅝ) HANGUL CHOSEONG NIEUN-HIEUH [Hang]=>[Hang,Kore]
		0x11AD, // (ᆭ) HANGUL JONGSEONG NIEUN-HIEUH [Hang]=>[Hang,Kore]
		//IDNA:0x3136, // (ㄶ) HANGUL LETTER NIEUN-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄂᅀ" <Same>
		'1102 1140', // HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		0x11C8, // (ᇈ) HANGUL JONGSEONG NIEUN-PANSIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3168, // (ㅨ) HANGUL LETTER NIEUN-PANSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃ" <Same>
		'1103', // HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x1103, // (ᄃ) HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x3137, // (ㄷ) HANGUL LETTER TIKEUT [Hang]=>[Hang,Kore]
		0x11AE, // (ᆮ) HANGUL JONGSEONG TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄀ" <Same>
		'1103 1100', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1117, // (ᄗ) HANGUL CHOSEONG TIKEUT-KIYEOK [Hang]=>[Hang,Kore]
		0x11CA, // (ᇊ) HANGUL JONGSEONG TIKEUT-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄃ" <Same>
		'1103 1103', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x1104, // (ᄄ) HANGUL CHOSEONG SSANGTIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x3138, // (ㄸ) HANGUL LETTER SSANGTIKEUT [Hang]=>[Hang,Kore]
		0xD7CD, // (ퟍ) HANGUL JONGSEONG SSANGTIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄃᄇ" <Same>
		'1103 1103 1107', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xD7CE, // (ퟎ) HANGUL JONGSEONG SSANGTIKEUT-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄅ" <Same>
		'1103 1105', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x115E, // (ᅞ) HANGUL CHOSEONG TIKEUT-RIEUL [Hang]=>[Hang,Kore]
		0x11CB, // (ᇋ) HANGUL JONGSEONG TIKEUT-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄆ" <Same>
		'1103 1106', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0xA960, // (ꥠ) HANGUL CHOSEONG TIKEUT-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄇ" <Same>
		'1103 1107', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xA961, // (ꥡ) HANGUL CHOSEONG TIKEUT-PIEUP [Hang]=>[Hang,Kore]
		0xD7CF, // (ퟏ) HANGUL JONGSEONG TIKEUT-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄉ" <Same>
		'1103 1109', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0xA962, // (ꥢ) HANGUL CHOSEONG TIKEUT-SIOS [Hang]=>[Hang,Kore]
		0xD7D0, // (ퟐ) HANGUL JONGSEONG TIKEUT-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄉᄀ" <Same>
		'1103 1109 1100', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0xD7D1, // (ퟑ) HANGUL JONGSEONG TIKEUT-SIOS-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄌ" <Same>
		'1103 110C', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0xA963, // (ꥣ) HANGUL CHOSEONG TIKEUT-CIEUC [Hang]=>[Hang,Kore]
		0xD7D2, // (ퟒ) HANGUL JONGSEONG TIKEUT-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄎ" <Same>
		'1103 110E', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0xD7D3, // (ퟓ) HANGUL JONGSEONG TIKEUT-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄃᄐ" <Same>
		'1103 1110', // HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0xD7D4, // (ퟔ) HANGUL JONGSEONG TIKEUT-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅ" <Same>
		'1105', // HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x1105, // (ᄅ) HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		//IDNA:0x3139, // (ㄹ) HANGUL LETTER RIEUL [Hang]=>[Hang,Kore]
		0x11AF, // (ᆯ) HANGUL JONGSEONG RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄀ" <Same>
		'1105 1100', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0xA964, // (ꥤ) HANGUL CHOSEONG RIEUL-KIYEOK [Hang]=>[Hang,Kore]
		0x11B0, // (ᆰ) HANGUL JONGSEONG RIEUL-KIYEOK [Hang]=>[Hang,Kore]
		//IDNA:0x313A, // (ㄺ) HANGUL LETTER RIEUL-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄀᄀ" <Same>
		'1105 1100 1100', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0xA965, // (ꥥ) HANGUL CHOSEONG RIEUL-SSANGKIYEOK [Hang]=>[Hang,Kore]
		0xD7D5, // (ퟕ) HANGUL JONGSEONG RIEUL-SSANGKIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄀᄉ" <Same>
		'1105 1100 1109', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x11CC, // (ᇌ) HANGUL JONGSEONG RIEUL-KIYEOK-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3169, // (ㅩ) HANGUL LETTER RIEUL-KIYEOK-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄀᄒ" <Same>
		'1105 1100 1112', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xD7D6, // (ퟖ) HANGUL JONGSEONG RIEUL-KIYEOK-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄂ" <Same>
		'1105 1102', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x1118, // (ᄘ) HANGUL CHOSEONG RIEUL-NIEUN [Hang]=>[Hang,Kore]
		0x11CD, // (ᇍ) HANGUL JONGSEONG RIEUL-NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄃ" <Same>
		'1105 1103', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0xA966, // (ꥦ) HANGUL CHOSEONG RIEUL-TIKEUT [Hang]=>[Hang,Kore]
		0x11CE, // (ᇎ) HANGUL JONGSEONG RIEUL-TIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x316A, // (ㅪ) HANGUL LETTER RIEUL-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄃᄃ" <Same>
		'1105 1103 1103', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0xA967, // (ꥧ) HANGUL CHOSEONG RIEUL-SSANGTIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄃᄒ" <Same>
		'1105 1103 1112', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG TIKEUT + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x11CF, // (ᇏ) HANGUL JONGSEONG RIEUL-TIKEUT-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄅ" <Same>
		'1105 1105', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x1119, // (ᄙ) HANGUL CHOSEONG SSANGRIEUL [Hang]=>[Hang,Kore]
		0x11D0, // (ᇐ) HANGUL JONGSEONG SSANGRIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄅᄏ" <Same>
		'1105 1105 110F', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0xD7D7, // (ퟗ) HANGUL JONGSEONG SSANGRIEUL-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄆ" <Same>
		'1105 1106', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0xA968, // (ꥨ) HANGUL CHOSEONG RIEUL-MIEUM [Hang]=>[Hang,Kore]
		0x11B1, // (ᆱ) HANGUL JONGSEONG RIEUL-MIEUM [Hang]=>[Hang,Kore]
		//IDNA:0x313B, // (ㄻ) HANGUL LETTER RIEUL-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄆᄀ" <Same>
		'1105 1106 1100', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x11D1, // (ᇑ) HANGUL JONGSEONG RIEUL-MIEUM-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄆᄉ" <Same>
		'1105 1106 1109', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x11D2, // (ᇒ) HANGUL JONGSEONG RIEUL-MIEUM-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄆᄒ" <Same>
		'1105 1106 1112', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xD7D8, // (ퟘ) HANGUL JONGSEONG RIEUL-MIEUM-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇ" <Same>
		'1105 1107', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xA969, // (ꥩ) HANGUL CHOSEONG RIEUL-PIEUP [Hang]=>[Hang,Kore]
		0x11B2, // (ᆲ) HANGUL JONGSEONG RIEUL-PIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x313C, // (ㄼ) HANGUL LETTER RIEUL-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇᄃ" <Same>
		'1105 1107 1103', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0xD7D9, // (ퟙ) HANGUL JONGSEONG RIEUL-PIEUP-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇᄇ" <Same>
		'1105 1107 1107', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xA96A, // (ꥪ) HANGUL CHOSEONG RIEUL-SSANGPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇᄉ" <Same>
		'1105 1107 1109', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x11D3, // (ᇓ) HANGUL JONGSEONG RIEUL-PIEUP-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x316B, // (ㅫ) HANGUL LETTER RIEUL-PIEUP-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇᄋ" <Same>
		'1105 1107 110B', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0xA96B, // (ꥫ) HANGUL CHOSEONG RIEUL-KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
		0x11D5, // (ᇕ) HANGUL JONGSEONG RIEUL-KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇᄑ" <Same>
		'1105 1107 1111', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0xD7DA, // (ퟚ) HANGUL JONGSEONG RIEUL-PIEUP-PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄇᄒ" <Same>
		'1105 1107 1112', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x11D4, // (ᇔ) HANGUL JONGSEONG RIEUL-PIEUP-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄉ" <Same>
		'1105 1109', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0xA96C, // (ꥬ) HANGUL CHOSEONG RIEUL-SIOS [Hang]=>[Hang,Kore]
		0x11B3, // (ᆳ) HANGUL JONGSEONG RIEUL-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x313D, // (ㄽ) HANGUL LETTER RIEUL-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄉᄉ" <Same>
		'1105 1109 1109', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x11D6, // (ᇖ) HANGUL JONGSEONG RIEUL-SSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄋ" <Same>
		'1105 110B', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x111B, // (ᄛ) HANGUL CHOSEONG KAPYEOUNRIEUL [Hang]=>[Hang,Kore]
		0xD7DD, // (ퟝ) HANGUL JONGSEONG KAPYEOUNRIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄌ" <Same>
		'1105 110C', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0xA96D, // (ꥭ) HANGUL CHOSEONG RIEUL-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄏ" <Same>
		'1105 110F', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0xA96E, // (ꥮ) HANGUL CHOSEONG RIEUL-KHIEUKH [Hang]=>[Hang,Kore]
		0x11D8, // (ᇘ) HANGUL JONGSEONG RIEUL-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄐ" <Same>
		'1105 1110', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0x11B4, // (ᆴ) HANGUL JONGSEONG RIEUL-THIEUTH [Hang]=>[Hang,Kore]
		//IDNA:0x313E, // (ㄾ) HANGUL LETTER RIEUL-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄑ" <Same>
		'1105 1111', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0x11B5, // (ᆵ) HANGUL JONGSEONG RIEUL-PHIEUPH [Hang]=>[Hang,Kore]
		//IDNA:0x313F, // (ㄿ) HANGUL LETTER RIEUL-PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᄒ" <Same>
		'1105 1112', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x111A, // (ᄚ) HANGUL CHOSEONG RIEUL-HIEUH [Hang]=>[Hang,Kore]
		//IDNA:0x3140, // (ㅀ) HANGUL LETTER RIEUL-HIEUH [Hang]=>[Hang,Kore]
		0x113B, // (ᄻ) HANGUL CHOSEONG SIOS-HIEUH [Hang]=>[Hang,Kore]
		0x11B6, // (ᆶ) HANGUL JONGSEONG RIEUL-HIEUH [Hang]=>[Hang,Kore]
		0xD7F2, // (ퟲ) HANGUL JONGSEONG SIOS-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᅀ" <Same>
		'1105 1140', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		0x11D7, // (ᇗ) HANGUL JONGSEONG RIEUL-PANSIOS [Hang]=>[Hang,Kore]
		//IDNA:0x316C, // (ㅬ) HANGUL LETTER RIEUL-PANSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᅌ" <Same>
		'1105 114C', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG YESIEUNG [Hang]=>[Hang,Kore]
		0xD7DB, // (ퟛ) HANGUL JONGSEONG RIEUL-YESIEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᅙ" <Same>
		'1105 1159', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG YEORINHIEUH [Hang]=>[Hang,Kore]
		0x11D9, // (ᇙ) HANGUL JONGSEONG RIEUL-YEORINHIEUH [Hang]=>[Hang,Kore]
		//IDNA:0x316D, // (ㅭ) HANGUL LETTER RIEUL-YEORINHIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄅᅙᄒ" <Same>
		'1105 1159 1112', // HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG YEORINHIEUH + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xD7DC, // (ퟜ) HANGUL JONGSEONG RIEUL-YEORINHIEUH-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆ" <Same>
		'1106', // HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0x1106, // (ᄆ) HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		//IDNA:0x3141, // (ㅁ) HANGUL LETTER MIEUM [Hang]=>[Hang,Kore]
		0x11B7, // (ᆷ) HANGUL JONGSEONG MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄀ" <Same>
		'1106 1100', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0xA96F, // (ꥯ) HANGUL CHOSEONG MIEUM-KIYEOK [Hang]=>[Hang,Kore]
		0x11DA, // (ᇚ) HANGUL JONGSEONG MIEUM-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄂ" <Same>
		'1106 1102', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0xD7DE, // (ퟞ) HANGUL JONGSEONG MIEUM-NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄂᄂ" <Same>
		'1106 1102 1102', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG NIEUN + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0xD7DF, // (ퟟ) HANGUL JONGSEONG MIEUM-SSANGNIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄃ" <Same>
		'1106 1103', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0xA970, // (ꥰ) HANGUL CHOSEONG MIEUM-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄅ" <Same>
		'1106 1105', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x11DB, // (ᇛ) HANGUL JONGSEONG MIEUM-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄆ" <Same>
		'1106 1106', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0xD7E0, // (ퟠ) HANGUL JONGSEONG SSANGMIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄇ" <Same>
		'1106 1107', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x111C, // (ᄜ) HANGUL CHOSEONG MIEUM-PIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x316E, // (ㅮ) HANGUL LETTER MIEUM-PIEUP [Hang]=>[Hang,Kore]
		0x11DC, // (ᇜ) HANGUL JONGSEONG MIEUM-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄇᄉ" <Same>
		'1106 1107 1109', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0xD7E1, // (ퟡ) HANGUL JONGSEONG MIEUM-PIEUP-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄉ" <Same>
		'1106 1109', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0xA971, // (ꥱ) HANGUL CHOSEONG MIEUM-SIOS [Hang]=>[Hang,Kore]
		0x11DD, // (ᇝ) HANGUL JONGSEONG MIEUM-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x316F, // (ㅯ) HANGUL LETTER MIEUM-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄉᄉ" <Same>
		'1106 1109 1109', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x11DE, // (ᇞ) HANGUL JONGSEONG MIEUM-SSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄋ" <Same>
		'1106 110B', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x111D, // (ᄝ) HANGUL CHOSEONG KAPYEOUNMIEUM [Hang]=>[Hang,Kore]
		//IDNA:0x3171, // (ㅱ) HANGUL LETTER KAPYEOUNMIEUM [Hang]=>[Hang,Kore]
		0x11E2, // (ᇢ) HANGUL JONGSEONG KAPYEOUNMIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄌ" <Same>
		'1106 110C', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0xD7E2, // (ퟢ) HANGUL JONGSEONG MIEUM-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄎ" <Same>
		'1106 110E', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0x11E0, // (ᇠ) HANGUL JONGSEONG MIEUM-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᄒ" <Same>
		'1106 1112', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x11E1, // (ᇡ) HANGUL JONGSEONG MIEUM-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄆᅀ" <Same>
		'1106 1140', // HANGUL CHOSEONG MIEUM + HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		0x11DF, // (ᇟ) HANGUL JONGSEONG MIEUM-PANSIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3170, // (ㅰ) HANGUL LETTER MIEUM-PANSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇ" <Same>
		'1107', // HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1107, // (ᄇ) HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x3142, // (ㅂ) HANGUL LETTER PIEUP [Hang]=>[Hang,Kore]
		0x11B8, // (ᆸ) HANGUL JONGSEONG PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄀ" <Same>
		'1107 1100', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x111E, // (ᄞ) HANGUL CHOSEONG PIEUP-KIYEOK [Hang]=>[Hang,Kore]
		//IDNA:0x3172, // (ㅲ) HANGUL LETTER PIEUP-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄂ" <Same>
		'1107 1102', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x111F, // (ᄟ) HANGUL CHOSEONG PIEUP-NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄃ" <Same>
		'1107 1103', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x1120, // (ᄠ) HANGUL CHOSEONG PIEUP-TIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x3173, // (ㅳ) HANGUL LETTER PIEUP-TIKEUT [Hang]=>[Hang,Kore]
		0xD7E3, // (ퟣ) HANGUL JONGSEONG PIEUP-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄅ" <Same>
		'1107 1105', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x11E3, // (ᇣ) HANGUL JONGSEONG PIEUP-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄅᄑ" <Same>
		'1107 1105 1111', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG RIEUL + HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0xD7E4, // (ퟤ) HANGUL JONGSEONG PIEUP-RIEUL-PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄆ" <Same>
		'1107 1106', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0xD7E5, // (ퟥ) HANGUL JONGSEONG PIEUP-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄇ" <Same>
		'1107 1107', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1108, // (ᄈ) HANGUL CHOSEONG SSANGPIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x3143, // (ㅃ) HANGUL LETTER SSANGPIEUP [Hang]=>[Hang,Kore]
		0xD7E6, // (ퟦ) HANGUL JONGSEONG SSANGPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄇᄋ" <Same>
		'1107 1107 110B', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x112C, // (ᄬ) HANGUL CHOSEONG KAPYEOUNSSANGPIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x3179, // (ㅹ) HANGUL LETTER KAPYEOUNSSANGPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉ" <Same>
		'1107 1109', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x1121, // (ᄡ) HANGUL CHOSEONG PIEUP-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3144, // (ㅄ) HANGUL LETTER PIEUP-SIOS [Hang]=>[Hang,Kore]
		0x11B9, // (ᆹ) HANGUL JONGSEONG PIEUP-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉᄀ" <Same>
		'1107 1109 1100', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1122, // (ᄢ) HANGUL CHOSEONG PIEUP-SIOS-KIYEOK [Hang]=>[Hang,Kore]
		//IDNA:0x3174, // (ㅴ) HANGUL LETTER PIEUP-SIOS-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉᄃ" <Same>
		'1107 1109 1103', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x1123, // (ᄣ) HANGUL CHOSEONG PIEUP-SIOS-TIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x3175, // (ㅵ) HANGUL LETTER PIEUP-SIOS-TIKEUT [Hang]=>[Hang,Kore]
		0xD7E7, // (ퟧ) HANGUL JONGSEONG PIEUP-SIOS-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉᄇ" <Same>
		'1107 1109 1107', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1124, // (ᄤ) HANGUL CHOSEONG PIEUP-SIOS-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉᄉ" <Same>
		'1107 1109 1109', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x1125, // (ᄥ) HANGUL CHOSEONG PIEUP-SSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉᄌ" <Same>
		'1107 1109 110C', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x1126, // (ᄦ) HANGUL CHOSEONG PIEUP-SIOS-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄉᄐ" <Same>
		'1107 1109 1110', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0xA972, // (ꥲ) HANGUL CHOSEONG PIEUP-SIOS-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄋ" <Same>
		'1107 110B', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x112B, // (ᄫ) HANGUL CHOSEONG KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x3178, // (ㅸ) HANGUL LETTER KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
		0x11E6, // (ᇦ) HANGUL JONGSEONG KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄌ" <Same>
		'1107 110C', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x1127, // (ᄧ) HANGUL CHOSEONG PIEUP-CIEUC [Hang]=>[Hang,Kore]
		//IDNA:0x3176, // (ㅶ) HANGUL LETTER PIEUP-CIEUC [Hang]=>[Hang,Kore]
		0xD7E8, // (ퟨ) HANGUL JONGSEONG PIEUP-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄎ" <Same>
		'1107 110E', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0x1128, // (ᄨ) HANGUL CHOSEONG PIEUP-CHIEUCH [Hang]=>[Hang,Kore]
		0xD7E9, // (ퟩ) HANGUL JONGSEONG PIEUP-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄏ" <Same>
		'1107 110F', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0xA973, // (ꥳ) HANGUL CHOSEONG PIEUP-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄐ" <Same>
		'1107 1110', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0x1129, // (ᄩ) HANGUL CHOSEONG PIEUP-THIEUTH [Hang]=>[Hang,Kore]
		//IDNA:0x3177, // (ㅷ) HANGUL LETTER PIEUP-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄑ" <Same>
		'1107 1111', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0x112A, // (ᄪ) HANGUL CHOSEONG PIEUP-PHIEUPH [Hang]=>[Hang,Kore]
		0x11E4, // (ᇤ) HANGUL JONGSEONG PIEUP-PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄇᄒ" <Same>
		'1107 1112', // HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xA974, // (ꥴ) HANGUL CHOSEONG PIEUP-HIEUH [Hang]=>[Hang,Kore]
		0x11E5, // (ᇥ) HANGUL JONGSEONG PIEUP-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉ" <Same>
		'1109', // HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x1109, // (ᄉ) HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3145, // (ㅅ) HANGUL LETTER SIOS [Hang]=>[Hang,Kore]
		0x11BA, // (ᆺ) HANGUL JONGSEONG SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄀ" <Same>
		'1109 1100', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x112D, // (ᄭ) HANGUL CHOSEONG SIOS-KIYEOK [Hang]=>[Hang,Kore]
		//IDNA:0x317A, // (ㅺ) HANGUL LETTER SIOS-KIYEOK [Hang]=>[Hang,Kore]
		0x11E7, // (ᇧ) HANGUL JONGSEONG SIOS-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄂ" <Same>
		'1109 1102', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x112E, // (ᄮ) HANGUL CHOSEONG SIOS-NIEUN [Hang]=>[Hang,Kore]
		//IDNA:0x317B, // (ㅻ) HANGUL LETTER SIOS-NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄃ" <Same>
		'1109 1103', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x112F, // (ᄯ) HANGUL CHOSEONG SIOS-TIKEUT [Hang]=>[Hang,Kore]
		//IDNA:0x317C, // (ㅼ) HANGUL LETTER SIOS-TIKEUT [Hang]=>[Hang,Kore]
		0x11E8, // (ᇨ) HANGUL JONGSEONG SIOS-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄅ" <Same>
		'1109 1105', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x1130, // (ᄰ) HANGUL CHOSEONG SIOS-RIEUL [Hang]=>[Hang,Kore]
		0x11E9, // (ᇩ) HANGUL JONGSEONG SIOS-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄆ" <Same>
		'1109 1106', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0x1131, // (ᄱ) HANGUL CHOSEONG SIOS-MIEUM [Hang]=>[Hang,Kore]
		0xD7EA, // (ퟪ) HANGUL JONGSEONG SIOS-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄇ" <Same>
		'1109 1107', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1132, // (ᄲ) HANGUL CHOSEONG SIOS-PIEUP [Hang]=>[Hang,Kore]
		//IDNA:0x317D, // (ㅽ) HANGUL LETTER SIOS-PIEUP [Hang]=>[Hang,Kore]
		0x11EA, // (ᇪ) HANGUL JONGSEONG SIOS-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄇᄀ" <Same>
		'1109 1107 1100', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1133, // (ᄳ) HANGUL CHOSEONG SIOS-PIEUP-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄇᄋ" <Same>
		'1109 1107 110B', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0xD7EB, // (ퟫ) HANGUL JONGSEONG SIOS-KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄉ" <Same>
		'1109 1109', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x110A, // (ᄊ) HANGUL CHOSEONG SSANGSIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3146, // (ㅆ) HANGUL LETTER SSANGSIOS [Hang]=>[Hang,Kore]
		0x11BB, // (ᆻ) HANGUL JONGSEONG SSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄉᄀ" <Same>
		'1109 1109 1100', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0xD7EC, // (ퟬ) HANGUL JONGSEONG SSANGSIOS-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄉᄃ" <Same>
		'1109 1109 1103', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0xD7ED, // (ퟭ) HANGUL JONGSEONG SSANGSIOS-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄉᄇ" <Same>
		'1109 1109 1107', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xA975, // (ꥵ) HANGUL CHOSEONG SSANGSIOS-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄉᄉ" <Same>
		'1109 1109 1109', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x1134, // (ᄴ) HANGUL CHOSEONG SIOS-SSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄋ" <Same>
		'1109 110B', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x1135, // (ᄵ) HANGUL CHOSEONG SIOS-IEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄌ" <Same>
		'1109 110C', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x1136, // (ᄶ) HANGUL CHOSEONG SIOS-CIEUC [Hang]=>[Hang,Kore]
		//IDNA:0x317E, // (ㅾ) HANGUL LETTER SIOS-CIEUC [Hang]=>[Hang,Kore]
		0xD7EF, // (ퟯ) HANGUL JONGSEONG SIOS-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄎ" <Same>
		'1109 110E', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0x1137, // (ᄷ) HANGUL CHOSEONG SIOS-CHIEUCH [Hang]=>[Hang,Kore]
		0xD7F0, // (ퟰ) HANGUL JONGSEONG SIOS-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄏ" <Same>
		'1109 110F', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0x1138, // (ᄸ) HANGUL CHOSEONG SIOS-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄐ" <Same>
		'1109 1110', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0x1139, // (ᄹ) HANGUL CHOSEONG SIOS-THIEUTH [Hang]=>[Hang,Kore]
		0xD7F1, // (ퟱ) HANGUL JONGSEONG SIOS-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᄑ" <Same>
		'1109 1111', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0x113A, // (ᄺ) HANGUL CHOSEONG SIOS-PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄉᅀ" <Same>
		'1109 1140', // HANGUL CHOSEONG SIOS + HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		0xD7EE, // (ퟮ) HANGUL JONGSEONG SIOS-PANSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋ" <Same>
		'110B', // HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x110B, // (ᄋ) HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		//IDNA:0x3147, // (ㅇ) HANGUL LETTER IEUNG [Hang]=>[Hang,Kore]
		0x11BC, // (ᆼ) HANGUL JONGSEONG IEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄀ" <Same>
		'110B 1100', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x1141, // (ᅁ) HANGUL CHOSEONG IEUNG-KIYEOK [Hang]=>[Hang,Kore]
		0x11EC, // (ᇬ) HANGUL JONGSEONG IEUNG-KIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄀᄀ" <Same>
		'110B 1100 1100', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG KIYEOK + HANGUL CHOSEONG KIYEOK [Hang]=>[Hang,Kore]
		0x11ED, // (ᇭ) HANGUL JONGSEONG IEUNG-SSANGKIYEOK [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄃ" <Same>
		'110B 1103', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG TIKEUT [Hang]=>[Hang,Kore]
		0x1142, // (ᅂ) HANGUL CHOSEONG IEUNG-TIKEUT [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄅ" <Same>
		'110B 1105', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0xA976, // (ꥶ) HANGUL CHOSEONG IEUNG-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄆ" <Same>
		'110B 1106', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0x1143, // (ᅃ) HANGUL CHOSEONG IEUNG-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄇ" <Same>
		'110B 1107', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1144, // (ᅄ) HANGUL CHOSEONG IEUNG-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄉ" <Same>
		'110B 1109', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0x1145, // (ᅅ) HANGUL CHOSEONG IEUNG-SIOS [Hang]=>[Hang,Kore]
		0x11F1, // (ᇱ) HANGUL JONGSEONG YESIEUNG-SIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3182, // (ㆂ) HANGUL LETTER YESIEUNG-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄋ" <Same>
		'110B 110B', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x1147, // (ᅇ) HANGUL CHOSEONG SSANGIEUNG [Hang]=>[Hang,Kore]
		//IDNA:0x3180, // (ㆀ) HANGUL LETTER SSANGIEUNG [Hang]=>[Hang,Kore]
		0x11EE, // (ᇮ) HANGUL JONGSEONG SSANGIEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄌ" <Same>
		'110B 110C', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x1148, // (ᅈ) HANGUL CHOSEONG IEUNG-CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄎ" <Same>
		'110B 110E', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0x1149, // (ᅉ) HANGUL CHOSEONG IEUNG-CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄏ" <Same>
		'110B 110F', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0x11EF, // (ᇯ) HANGUL JONGSEONG IEUNG-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄐ" <Same>
		'110B 1110', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0x114A, // (ᅊ) HANGUL CHOSEONG IEUNG-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄑ" <Same>
		'110B 1111', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0x114B, // (ᅋ) HANGUL CHOSEONG IEUNG-PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᄒ" <Same>
		'110B 1112', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xA977, // (ꥷ) HANGUL CHOSEONG IEUNG-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄋᅀ" <Same>
		'110B 1140', // HANGUL CHOSEONG IEUNG + HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		0x1146, // (ᅆ) HANGUL CHOSEONG IEUNG-PANSIOS [Hang]=>[Hang,Kore]
		0x11F2, // (ᇲ) HANGUL JONGSEONG YESIEUNG-PANSIOS [Hang]=>[Hang,Kore]
		//IDNA:0x3183, // (ㆃ) HANGUL LETTER YESIEUNG-PANSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄌ" <Same>
		'110C', // HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x110C, // (ᄌ) HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		//IDNA:0x3148, // (ㅈ) HANGUL LETTER CIEUC [Hang]=>[Hang,Kore]
		0x11BD, // (ᆽ) HANGUL JONGSEONG CIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄌᄇ" <Same>
		'110C 1107', // HANGUL CHOSEONG CIEUC + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xD7F7, // (ퟷ) HANGUL JONGSEONG CIEUC-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄌᄇᄇ" <Same>
		'110C 1107 1107', // HANGUL CHOSEONG CIEUC + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xD7F8, // (ퟸ) HANGUL JONGSEONG CIEUC-SSANGPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄌᄋ" <Same>
		'110C 110B', // HANGUL CHOSEONG CIEUC + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x114D, // (ᅍ) HANGUL CHOSEONG CIEUC-IEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "ᄌᄌ" <Same>
		'110C 110C', // HANGUL CHOSEONG CIEUC + HANGUL CHOSEONG CIEUC [Hang]=>[Hang,Kore]
		0x110D, // (ᄍ) HANGUL CHOSEONG SSANGCIEUC [Hang]=>[Hang,Kore]
		//IDNA:0x3149, // (ㅉ) HANGUL LETTER SSANGCIEUC [Hang]=>[Hang,Kore]
		0xD7F9, // (ퟹ) HANGUL JONGSEONG SSANGCIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᄌᄌᄒ" <Same>
		'110C 110C 1112', // HANGUL CHOSEONG CIEUC + HANGUL CHOSEONG CIEUC + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xA978, // (ꥸ) HANGUL CHOSEONG SSANGCIEUC-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄎ" <Same>
		'110E', // HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		0x110E, // (ᄎ) HANGUL CHOSEONG CHIEUCH [Hang]=>[Hang,Kore]
		//IDNA:0x314A, // (ㅊ) HANGUL LETTER CHIEUCH [Hang]=>[Hang,Kore]
		0x11BE, // (ᆾ) HANGUL JONGSEONG CHIEUCH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄎᄏ" <Same>
		'110E 110F', // HANGUL CHOSEONG CHIEUCH + HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0x1152, // (ᅒ) HANGUL CHOSEONG CHIEUCH-KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄎᄒ" <Same>
		'110E 1112', // HANGUL CHOSEONG CHIEUCH + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x1153, // (ᅓ) HANGUL CHOSEONG CHIEUCH-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄏ" <Same>
		'110F', // HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		0x110F, // (ᄏ) HANGUL CHOSEONG KHIEUKH [Hang]=>[Hang,Kore]
		//IDNA:0x314B, // (ㅋ) HANGUL LETTER KHIEUKH [Hang]=>[Hang,Kore]
		0x11BF, // (ᆿ) HANGUL JONGSEONG KHIEUKH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄐ" <Same>
		'1110', // HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0x1110, // (ᄐ) HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		//IDNA:0x314C, // (ㅌ) HANGUL LETTER THIEUTH [Hang]=>[Hang,Kore]
		0x11C0, // (ᇀ) HANGUL JONGSEONG THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄐᄐ" <Same>
		'1110 1110', // HANGUL CHOSEONG THIEUTH + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0xA979, // (ꥹ) HANGUL CHOSEONG SSANGTHIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄑ" <Same>
		'1111', // HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		0x1111, // (ᄑ) HANGUL CHOSEONG PHIEUPH [Hang]=>[Hang,Kore]
		//IDNA:0x314D, // (ㅍ) HANGUL LETTER PHIEUPH [Hang]=>[Hang,Kore]
		0x11C1, // (ᇁ) HANGUL JONGSEONG PHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄑᄇ" <Same>
		'1111 1107', // HANGUL CHOSEONG PHIEUPH + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x1156, // (ᅖ) HANGUL CHOSEONG PHIEUPH-PIEUP [Hang]=>[Hang,Kore]
		0x11F3, // (ᇳ) HANGUL JONGSEONG PHIEUPH-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄑᄉ" <Same>
		'1111 1109', // HANGUL CHOSEONG PHIEUPH + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0xD7FA, // (ퟺ) HANGUL JONGSEONG PHIEUPH-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄑᄋ" <Same>
		'1111 110B', // HANGUL CHOSEONG PHIEUPH + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0x1157, // (ᅗ) HANGUL CHOSEONG KAPYEOUNPHIEUPH [Hang]=>[Hang,Kore]
		//IDNA:0x3184, // (ㆄ) HANGUL LETTER KAPYEOUNPHIEUPH [Hang]=>[Hang,Kore]
		0x11F4, // (ᇴ) HANGUL JONGSEONG KAPYEOUNPHIEUPH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄑᄐ" <Same>
		'1111 1110', // HANGUL CHOSEONG PHIEUPH + HANGUL CHOSEONG THIEUTH [Hang]=>[Hang,Kore]
		0xD7FB, // (ퟻ) HANGUL JONGSEONG PHIEUPH-THIEUTH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄑᄒ" <Same>
		'1111 1112', // HANGUL CHOSEONG PHIEUPH + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xA97A, // (ꥺ) HANGUL CHOSEONG PHIEUPH-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒ" <Same>
		'1112', // HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x1112, // (ᄒ) HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		//IDNA:0x314E, // (ㅎ) HANGUL LETTER HIEUH [Hang]=>[Hang,Kore]
		0x11C2, // (ᇂ) HANGUL JONGSEONG HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒᄂ" <Same>
		'1112 1102', // HANGUL CHOSEONG HIEUH + HANGUL CHOSEONG NIEUN [Hang]=>[Hang,Kore]
		0x11F5, // (ᇵ) HANGUL JONGSEONG HIEUH-NIEUN [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒᄅ" <Same>
		'1112 1105', // HANGUL CHOSEONG HIEUH + HANGUL CHOSEONG RIEUL [Hang]=>[Hang,Kore]
		0x11F6, // (ᇶ) HANGUL JONGSEONG HIEUH-RIEUL [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒᄆ" <Same>
		'1112 1106', // HANGUL CHOSEONG HIEUH + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0x11F7, // (ᇷ) HANGUL JONGSEONG HIEUH-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒᄇ" <Same>
		'1112 1107', // HANGUL CHOSEONG HIEUH + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0x11F8, // (ᇸ) HANGUL JONGSEONG HIEUH-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒᄉ" <Same>
		'1112 1109', // HANGUL CHOSEONG HIEUH + HANGUL CHOSEONG SIOS [Hang]=>[Hang,Kore]
		0xA97B, // (ꥻ) HANGUL CHOSEONG HIEUH-SIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄒᄒ" <Same>
		'1112 1112', // HANGUL CHOSEONG HIEUH + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0x1158, // (ᅘ) HANGUL CHOSEONG SSANGHIEUH [Hang]=>[Hang,Kore]
		//IDNA:0x3185, // (ㆅ) HANGUL LETTER SSANGHIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᄼᄼ" <Same>
		'113C 113C', // HANGUL CHOSEONG CHITUEUMSIOS + HANGUL CHOSEONG CHITUEUMSIOS [Hang]=>[Hang,Kore]
		0x113D, // (ᄽ) HANGUL CHOSEONG CHITUEUMSSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᄾᄾ" <Same>
		'113E 113E', // HANGUL CHOSEONG CEONGCHIEUMSIOS + HANGUL CHOSEONG CEONGCHIEUMSIOS [Hang]=>[Hang,Kore]
		0x113F, // (ᄿ) HANGUL CHOSEONG CEONGCHIEUMSSANGSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᅀ" <Same>
		'1140', // HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		0x1140, // (ᅀ) HANGUL CHOSEONG PANSIOS [Hang]=>[Hang,Kore]
		//IDNA:0x317F, // (ㅿ) HANGUL LETTER PANSIOS [Hang]=>[Hang,Kore]
		0x11EB, // (ᇫ) HANGUL JONGSEONG PANSIOS [Hang]=>[Hang,Kore]
	],
	[
		// "ᅀᄇ" <Same>
		'1140 1107', // HANGUL CHOSEONG PANSIOS + HANGUL CHOSEONG PIEUP [Hang]=>[Hang,Kore]
		0xD7F3, // (ퟳ) HANGUL JONGSEONG PANSIOS-PIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᅀᄇᄋ" <Same>
		'1140 1107 110B', // HANGUL CHOSEONG PANSIOS + HANGUL CHOSEONG PIEUP + HANGUL CHOSEONG IEUNG [Hang]=>[Hang,Kore]
		0xD7F4, // (ퟴ) HANGUL JONGSEONG PANSIOS-KAPYEOUNPIEUP [Hang]=>[Hang,Kore]
	],
	[
		// "ᅌ" <Same>
		'114C', // HANGUL CHOSEONG YESIEUNG [Hang]=>[Hang,Kore]
		0x114C, // (ᅌ) HANGUL CHOSEONG YESIEUNG [Hang]=>[Hang,Kore]
		//IDNA:0x3181, // (ㆁ) HANGUL LETTER YESIEUNG [Hang]=>[Hang,Kore]
		0x11F0, // (ᇰ) HANGUL JONGSEONG YESIEUNG [Hang]=>[Hang,Kore]
	],
	[
		// "ᅌᄆ" <Same>
		'114C 1106', // HANGUL CHOSEONG YESIEUNG + HANGUL CHOSEONG MIEUM [Hang]=>[Hang,Kore]
		0xD7F5, // (ퟵ) HANGUL JONGSEONG YESIEUNG-MIEUM [Hang]=>[Hang,Kore]
	],
	[
		// "ᅌᄒ" <Same>
		'114C 1112', // HANGUL CHOSEONG YESIEUNG + HANGUL CHOSEONG HIEUH [Hang]=>[Hang,Kore]
		0xD7F6, // (ퟶ) HANGUL JONGSEONG YESIEUNG-HIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᅎᅎ" <Same>
		'114E 114E', // HANGUL CHOSEONG CHITUEUMCIEUC + HANGUL CHOSEONG CHITUEUMCIEUC [Hang]=>[Hang,Kore]
		0x114F, // (ᅏ) HANGUL CHOSEONG CHITUEUMSSANGCIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᅐᅐ" <Same>
		'1150 1150', // HANGUL CHOSEONG CEONGCHIEUMCIEUC + HANGUL CHOSEONG CEONGCHIEUMCIEUC [Hang]=>[Hang,Kore]
		0x1151, // (ᅑ) HANGUL CHOSEONG CEONGCHIEUMSSANGCIEUC [Hang]=>[Hang,Kore]
	],
	[
		// "ᅙ" <Same>
		'1159', // HANGUL CHOSEONG YEORINHIEUH [Hang]=>[Hang,Kore]
		0x1159, // (ᅙ) HANGUL CHOSEONG YEORINHIEUH [Hang]=>[Hang,Kore]
		//IDNA:0x3186, // (ㆆ) HANGUL LETTER YEORINHIEUH [Hang]=>[Hang,Kore]
		0x11F9, // (ᇹ) HANGUL JONGSEONG YEORINHIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᅙᅙ" <Same>
		'1159 1159', // HANGUL CHOSEONG YEORINHIEUH + HANGUL CHOSEONG YEORINHIEUH [Hang]=>[Hang,Kore]
		0xA97C, // (ꥼ) HANGUL CHOSEONG SSANGYEORINHIEUH [Hang]=>[Hang,Kore]
	],
	[
		// "ᅠ" <Same>
		'1160', // HANGUL JUNGSEONG FILLER [Hang]=>[Hang,Kore]
		//IDNA:0x1160, // (ᅠ) HANGUL JUNGSEONG FILLER [Hang]=>[Hang,Kore]
		//IDNA:0x3164, // (ㅤ) HANGUL FILLER [Hang]=>[Hang,Kore]
	],
	[
		// "ᅡ" <Same>
		'1161', // HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		0x1161, // (ᅡ) HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		//IDNA:0x314F, // (ㅏ) HANGUL LETTER A [Hang]=>[Hang,Kore]
	],
	[
		// "ᅡー" <Same>
		'1161 30FC', // HANGUL JUNGSEONG A + KATAKANA-HIRAGANA PROLONGED SOUND MARK [Hang,Zyyy]=>[]
		0x11A3, // (ᆣ) HANGUL JUNGSEONG A-EU [Hang]=>[Hang,Kore]
	],
	[
		// "ᅡᅩ" <Same>
		'1161 1169', // HANGUL JUNGSEONG A + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x1176, // (ᅶ) HANGUL JUNGSEONG A-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅡᅮ" <Same>
		'1161 116E', // HANGUL JUNGSEONG A + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x1177, // (ᅷ) HANGUL JUNGSEONG A-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅡ丨" <Same>
		'1161 4E28', // HANGUL JUNGSEONG A + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1162, // (ᅢ) HANGUL JUNGSEONG AE [Hang]=>[Hang,Kore]
		//IDNA:0x3150, // (ㅐ) HANGUL LETTER AE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅣ" <Same>
		'1163', // HANGUL JUNGSEONG YA [Hang]=>[Hang,Kore]
		0x1163, // (ᅣ) HANGUL JUNGSEONG YA [Hang]=>[Hang,Kore]
		//IDNA:0x3151, // (ㅑ) HANGUL LETTER YA [Hang]=>[Hang,Kore]
	],
	[
		// "ᅣᅩ" <Same>
		'1163 1169', // HANGUL JUNGSEONG YA + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x1178, // (ᅸ) HANGUL JUNGSEONG YA-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅣᅭ" <Same>
		'1163 116D', // HANGUL JUNGSEONG YA + HANGUL JUNGSEONG YO [Hang]=>[Hang,Kore]
		0x1179, // (ᅹ) HANGUL JUNGSEONG YA-YO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅣᅮ" <Same>
		'1163 116E', // HANGUL JUNGSEONG YA + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x11A4, // (ᆤ) HANGUL JUNGSEONG YA-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅣ丨" <Same>
		'1163 4E28', // HANGUL JUNGSEONG YA + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1164, // (ᅤ) HANGUL JUNGSEONG YAE [Hang]=>[Hang,Kore]
		//IDNA:0x3152, // (ㅒ) HANGUL LETTER YAE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅥ" <Same>
		'1165', // HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		0x1165, // (ᅥ) HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		//IDNA:0x3153, // (ㅓ) HANGUL LETTER EO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅥー" <Same>
		'1165 30FC', // HANGUL JUNGSEONG EO + KATAKANA-HIRAGANA PROLONGED SOUND MARK [Hang,Zyyy]=>[]
		0x117C, // (ᅼ) HANGUL JUNGSEONG EO-EU [Hang]=>[Hang,Kore]
	],
	[
		// "ᅥᅩ" <Same>
		'1165 1169', // HANGUL JUNGSEONG EO + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x117A, // (ᅺ) HANGUL JUNGSEONG EO-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅥᅮ" <Same>
		'1165 116E', // HANGUL JUNGSEONG EO + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x117B, // (ᅻ) HANGUL JUNGSEONG EO-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅥ丨" <Same>
		'1165 4E28', // HANGUL JUNGSEONG EO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1166, // (ᅦ) HANGUL JUNGSEONG E [Hang]=>[Hang,Kore]
		//IDNA:0x3154, // (ㅔ) HANGUL LETTER E [Hang]=>[Hang,Kore]
	],
	[
		// "ᅧ" <Same>
		'1167', // HANGUL JUNGSEONG YEO [Hang]=>[Hang,Kore]
		0x1167, // (ᅧ) HANGUL JUNGSEONG YEO [Hang]=>[Hang,Kore]
		//IDNA:0x3155, // (ㅕ) HANGUL LETTER YEO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅧᅣ" <Same>
		'1167 1163', // HANGUL JUNGSEONG YEO + HANGUL JUNGSEONG YA [Hang]=>[Hang,Kore]
		0x11A5, // (ᆥ) HANGUL JUNGSEONG YEO-YA [Hang]=>[Hang,Kore]
	],
	[
		// "ᅧᅩ" <Same>
		'1167 1169', // HANGUL JUNGSEONG YEO + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x117D, // (ᅽ) HANGUL JUNGSEONG YEO-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅧᅮ" <Same>
		'1167 116E', // HANGUL JUNGSEONG YEO + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x117E, // (ᅾ) HANGUL JUNGSEONG YEO-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅧ丨" <Same>
		'1167 4E28', // HANGUL JUNGSEONG YEO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1168, // (ᅨ) HANGUL JUNGSEONG YE [Hang]=>[Hang,Kore]
		//IDNA:0x3156, // (ㅖ) HANGUL LETTER YE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩ" <Same>
		'1169', // HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x1169, // (ᅩ) HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		//IDNA:0x3157, // (ㅗ) HANGUL LETTER O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅡ" <Same>
		'1169 1161', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		0x116A, // (ᅪ) HANGUL JUNGSEONG WA [Hang]=>[Hang,Kore]
		//IDNA:0x3158, // (ㅘ) HANGUL LETTER WA [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅡ丨" <Same>
		'1169 1161 4E28', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG A + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x116B, // (ᅫ) HANGUL JUNGSEONG WAE [Hang]=>[Hang,Kore]
		//IDNA:0x3159, // (ㅙ) HANGUL LETTER WAE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅣ" <Same>
		'1169 1163', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG YA [Hang]=>[Hang,Kore]
		0x11A6, // (ᆦ) HANGUL JUNGSEONG O-YA [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅣ丨" <Same>
		'1169 1163 4E28', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG YA + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x11A7, // (ᆧ) HANGUL JUNGSEONG O-YAE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅥ" <Same>
		'1169 1165', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		0x117F, // (ᅿ) HANGUL JUNGSEONG O-EO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅥ丨" <Same>
		'1169 1165 4E28', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG EO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1180, // (ᆀ) HANGUL JUNGSEONG O-E [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅧ" <Same>
		'1169 1167', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG YEO [Hang]=>[Hang,Kore]
		0xD7B0, // (ힰ) HANGUL JUNGSEONG O-YEO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅧ丨" <Same>
		'1169 1167 4E28', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG YEO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1181, // (ᆁ) HANGUL JUNGSEONG O-YE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅩ" <Same>
		'1169 1169', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x1182, // (ᆂ) HANGUL JUNGSEONG O-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅩ丨" <Same>
		'1169 1169 4E28', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG O + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0xD7B1, // (ힱ) HANGUL JUNGSEONG O-O-I [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩᅮ" <Same>
		'1169 116E', // HANGUL JUNGSEONG O + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x1183, // (ᆃ) HANGUL JUNGSEONG O-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅩ丨" <Same>
		'1169 4E28', // HANGUL JUNGSEONG O + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x116C, // (ᅬ) HANGUL JUNGSEONG OE [Hang]=>[Hang,Kore]
		//IDNA:0x315A, // (ㅚ) HANGUL LETTER OE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭ" <Same>
		'116D', // HANGUL JUNGSEONG YO [Hang]=>[Hang,Kore]
		0x116D, // (ᅭ) HANGUL JUNGSEONG YO [Hang]=>[Hang,Kore]
		//IDNA:0x315B, // (ㅛ) HANGUL LETTER YO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭᅡ" <Same>
		'116D 1161', // HANGUL JUNGSEONG YO + HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		0xD7B2, // (ힲ) HANGUL JUNGSEONG YO-A [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭᅡ丨" <Same>
		'116D 1161 4E28', // HANGUL JUNGSEONG YO + HANGUL JUNGSEONG A + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0xD7B3, // (ힳ) HANGUL JUNGSEONG YO-AE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭᅣ" <Same>
		'116D 1163', // HANGUL JUNGSEONG YO + HANGUL JUNGSEONG YA [Hang]=>[Hang,Kore]
		0x1184, // (ᆄ) HANGUL JUNGSEONG YO-YA [Hang]=>[Hang,Kore]
		//IDNA:0x3187, // (ㆇ) HANGUL LETTER YO-YA [Hang]=>[Hang,Kore]
		0x1186, // (ᆆ) HANGUL JUNGSEONG YO-YEO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭᅣ丨" <Same>
		'116D 1163 4E28', // HANGUL JUNGSEONG YO + HANGUL JUNGSEONG YA + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1185, // (ᆅ) HANGUL JUNGSEONG YO-YAE [Hang]=>[Hang,Kore]
		//IDNA:0x3188, // (ㆈ) HANGUL LETTER YO-YAE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭᅥ" <Same>
		'116D 1165', // HANGUL JUNGSEONG YO + HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		0xD7B4, // (ힴ) HANGUL JUNGSEONG YO-EO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭᅩ" <Same>
		'116D 1169', // HANGUL JUNGSEONG YO + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0x1187, // (ᆇ) HANGUL JUNGSEONG YO-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅭ丨" <Same>
		'116D 4E28', // HANGUL JUNGSEONG YO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1188, // (ᆈ) HANGUL JUNGSEONG YO-I [Hang]=>[Hang,Kore]
		//IDNA:0x3189, // (ㆉ) HANGUL LETTER YO-I [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮ" <Same>
		'116E', // HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x116E, // (ᅮ) HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		//IDNA:0x315C, // (ㅜ) HANGUL LETTER U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅡ" <Same>
		'116E 1161', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		0x1189, // (ᆉ) HANGUL JUNGSEONG U-A [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅡ丨" <Same>
		'116E 1161 4E28', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG A + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x118A, // (ᆊ) HANGUL JUNGSEONG U-AE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅥ" <Same>
		'116E 1165', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		0x116F, // (ᅯ) HANGUL JUNGSEONG WEO [Hang]=>[Hang,Kore]
		//IDNA:0x315D, // (ㅝ) HANGUL LETTER WEO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅥー" <Same>
		'116E 1165 30FC', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG EO + KATAKANA-HIRAGANA PROLONGED SOUND MARK [Hang,Zyyy]=>[]
		0x118B, // (ᆋ) HANGUL JUNGSEONG U-EO-EU [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅥ丨" <Same>
		'116E 1165 4E28', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG EO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1170, // (ᅰ) HANGUL JUNGSEONG WE [Hang]=>[Hang,Kore]
		//IDNA:0x315E, // (ㅞ) HANGUL LETTER WE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅧ" <Same>
		'116E 1167', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG YEO [Hang]=>[Hang,Kore]
		0xD7B5, // (ힵ) HANGUL JUNGSEONG U-YEO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅧ丨" <Same>
		'116E 1167 4E28', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG YEO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x118C, // (ᆌ) HANGUL JUNGSEONG U-YE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮᅮ" <Same>
		'116E 116E', // HANGUL JUNGSEONG U + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x118D, // (ᆍ) HANGUL JUNGSEONG U-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮ丨" <Same>
		'116E 4E28', // HANGUL JUNGSEONG U + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1171, // (ᅱ) HANGUL JUNGSEONG WI [Hang]=>[Hang,Kore]
		//IDNA:0x315F, // (ㅟ) HANGUL LETTER WI [Hang]=>[Hang,Kore]
	],
	[
		// "ᅮ丨丨" <Same>
		'116E 4E28 4E28', // HANGUL JUNGSEONG U + CJK Ideograph-4E28 <41/20992> + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0xD7B6, // (ힶ) HANGUL JUNGSEONG U-I-I [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲ" <Same>
		'1172', // HANGUL JUNGSEONG YU [Hang]=>[Hang,Kore]
		0x1172, // (ᅲ) HANGUL JUNGSEONG YU [Hang]=>[Hang,Kore]
		//IDNA:0x3160, // (ㅠ) HANGUL LETTER YU [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅡ" <Same>
		'1172 1161', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		0x118E, // (ᆎ) HANGUL JUNGSEONG YU-A [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅡ丨" <Same>
		'1172 1161 4E28', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG A + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0xD7B7, // (ힷ) HANGUL JUNGSEONG YU-AE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅥ" <Same>
		'1172 1165', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		0x118F, // (ᆏ) HANGUL JUNGSEONG YU-EO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅥ丨" <Same>
		'1172 1165 4E28', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG EO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1190, // (ᆐ) HANGUL JUNGSEONG YU-E [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅧ" <Same>
		'1172 1167', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG YEO [Hang]=>[Hang,Kore]
		0x1191, // (ᆑ) HANGUL JUNGSEONG YU-YEO [Hang]=>[Hang,Kore]
		//IDNA:0x318A, // (ㆊ) HANGUL LETTER YU-YEO [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅧ丨" <Same>
		'1172 1167 4E28', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG YEO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1192, // (ᆒ) HANGUL JUNGSEONG YU-YE [Hang]=>[Hang,Kore]
		//IDNA:0x318B, // (ㆋ) HANGUL LETTER YU-YE [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅩ" <Same>
		'1172 1169', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG O [Hang]=>[Hang,Kore]
		0xD7B8, // (ힸ) HANGUL JUNGSEONG YU-O [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲᅮ" <Same>
		'1172 116E', // HANGUL JUNGSEONG YU + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x1193, // (ᆓ) HANGUL JUNGSEONG YU-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᅲ丨" <Same>
		'1172 4E28', // HANGUL JUNGSEONG YU + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x1194, // (ᆔ) HANGUL JUNGSEONG YU-I [Hang]=>[Hang,Kore]
		//IDNA:0x318C, // (ㆌ) HANGUL LETTER YU-I [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞ" <Same>
		'119E', // HANGUL JUNGSEONG ARAEA [Hang]=>[Hang,Kore]
		0x119E, // (ᆞ) HANGUL JUNGSEONG ARAEA [Hang]=>[Hang,Kore]
		//IDNA:0x318D, // (ㆍ) HANGUL LETTER ARAEA [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞᅡ" <Same>
		'119E 1161', // HANGUL JUNGSEONG ARAEA + HANGUL JUNGSEONG A [Hang]=>[Hang,Kore]
		0xD7C5, // (ퟅ) HANGUL JUNGSEONG ARAEA-A [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞᅥ" <Same>
		'119E 1165', // HANGUL JUNGSEONG ARAEA + HANGUL JUNGSEONG EO [Hang]=>[Hang,Kore]
		0x119F, // (ᆟ) HANGUL JUNGSEONG ARAEA-EO [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞᅥ丨" <Same>
		'119E 1165 4E28', // HANGUL JUNGSEONG ARAEA + HANGUL JUNGSEONG EO + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0xD7C6, // (ퟆ) HANGUL JUNGSEONG ARAEA-E [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞᅮ" <Same>
		'119E 116E', // HANGUL JUNGSEONG ARAEA + HANGUL JUNGSEONG U [Hang]=>[Hang,Kore]
		0x11A0, // (ᆠ) HANGUL JUNGSEONG ARAEA-U [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞᆞ" <Same>
		'119E 119E', // HANGUL JUNGSEONG ARAEA + HANGUL JUNGSEONG ARAEA [Hang]=>[Hang,Kore]
		0x11A2, // (ᆢ) HANGUL JUNGSEONG SSANGARAEA [Hang]=>[Hang,Kore]
	],
	[
		// "ᆞ丨" <Same>
		'119E 4E28', // HANGUL JUNGSEONG ARAEA + CJK Ideograph-4E28 <41/20992> [Hang,Hani]=>[Kore]
		0x11A1, // (ᆡ) HANGUL JUNGSEONG ARAEA-I [Hang]=>[Hang,Kore]
		//IDNA:0x318E, // (ㆎ) HANGUL LETTER ARAEAE [Hang]=>[Hang,Kore]
	],
	[
		// "へ" <Same>
		'3078', // HIRAGANA LETTER HE [Hira]=>[Hira,Jpan]
		0x3078, // (へ) HIRAGANA LETTER HE [Hira]=>[Hira,Jpan]
		0x30D8, // (ヘ) KATAKANA LETTER HE [Kana]=>[Kana,Jpan]
	],
	[
		// "〼" <Same>
		'303C', // MASU MARK [Zyyy]=>[Hani,Hira,Kana,Hanb,Jpan,Kore]
		//DISALLOW:0x303C, // (〼) MASU MARK [Zyyy]=>[Hani,Hira,Kana,Hanb,Jpan,Kore]
		//DISALLOW:0x2341, // (⍁) APL FUNCTIONAL SYMBOL QUAD SLASH [Zyyy]=>[ALL]
		//DISALLOW:0x29C4, // (⧄) SQUARED RISING DIAGONAL SLASH [Zyyy]=>[ALL]
	],
	[
		// "ꁊ" <Same>
		'A04A', // YI SYLLABLE PUT [Yiii]=>[Yiii]
		0xA04A, // (ꁊ) YI SYLLABLE PUT [Yiii]=>[Yiii]
		0xA49E, // (꒞) YI RADICAL PUT [Yiii]=>[Yiii]
	],
	[
		// "ꁐ" <Same>
		'A050', // YI SYLLABLE PYT [Yiii]=>[Yiii]
		0xA050, // (ꁐ) YI SYLLABLE PYT [Yiii]=>[Yiii]
		0xA4AC, // (꒬) YI RADICAL PYT [Yiii]=>[Yiii]
	],
	[
		// "ꃀ" <Same>
		'A0C0', // YI SYLLABLE MOP [Yiii]=>[Yiii]
		0xA0C0, // (ꃀ) YI SYLLABLE MOP [Yiii]=>[Yiii]
		0xA49C, // (꒜) YI RADICAL MOP [Yiii]=>[Yiii]
	],
	[
		// "ꄲ" <Same>
		'A132', // YI SYLLABLE TU [Yiii]=>[Yiii]
		0xA132, // (ꄲ) YI SYLLABLE TU [Yiii]=>[Yiii]
		0xA4A8, // (꒨) YI RADICAL TU [Yiii]=>[Yiii]
	],
	[
		// "ꉙ" <Same>
		'A259', // YI SYLLABLE HXOP [Yiii]=>[Yiii]
		0xA259, // (ꉙ) YI SYLLABLE HXOP [Yiii]=>[Yiii]
		0xA4BF, // (꒿) YI RADICAL HXOP [Yiii]=>[Yiii]
	],
	[
		// "ꊱ" <Same>
		'A2B1', // YI SYLLABLE CIP [Yiii]=>[Yiii]
		0xA2B1, // (ꊱ) YI SYLLABLE CIP [Yiii]=>[Yiii]
		0xA4BE, // (꒾) YI RADICAL CIP [Yiii]=>[Yiii]
	],
	[
		// "ꋍ" <Same>
		'A2CD', // YI SYLLABLE CYP [Yiii]=>[Yiii]
		0xA2CD, // (ꋍ) YI SYLLABLE CYP [Yiii]=>[Yiii]
		0xA494, // (꒔) YI RADICAL CYP [Yiii]=>[Yiii]
	],
	[
		// "ꎫ" <Same>
		'A3AB', // YI SYLLABLE SHAT [Yiii]=>[Yiii]
		0xA3AB, // (ꎫ) YI SYLLABLE SHAT [Yiii]=>[Yiii]
		0xA4C0, // (꓀) YI RADICAL SHAT [Yiii]=>[Yiii]
	],
	[
		// "ꎵ" <Same>
		'A3B5', // YI SYLLABLE SHOP [Yiii]=>[Yiii]
		0xA3B5, // (ꎵ) YI SYLLABLE SHOP [Yiii]=>[Yiii]
		0xA4C2, // (꓂) YI RADICAL SHOP [Yiii]=>[Yiii]
	],
	[
		// "ꎿ" <Same>
		'A3BF', // YI SYLLABLE SHUR [Yiii]=>[Yiii]
		0xA3BF, // (ꎿ) YI SYLLABLE SHUR [Yiii]=>[Yiii]
		0xA4BA, // (꒺) YI RADICAL SHUR [Yiii]=>[Yiii]
	],
	[
		// "ꏂ" <Same>
		'A3C2', // YI SYLLABLE SHY [Yiii]=>[Yiii]
		0xA3C2, // (ꏂ) YI SYLLABLE SHY [Yiii]=>[Yiii]
		0xA4B0, // (꒰) YI RADICAL SHY [Yiii]=>[Yiii]
	],
	[
		// "ꑘ" <Same>
		'A458', // YI SYLLABLE NYOP [Yiii]=>[Yiii]
		0xA458, // (ꑘ) YI SYLLABLE NYOP [Yiii]=>[Yiii]
		0xA4A7, // (꒧) YI RADICAL NYOP [Yiii]=>[Yiii]
	],
	[
		// "ꓕ" <Same>
		'A4D5', // LISU LETTER THA [Lisu]=>[Lisu]
		0xA4D5, // (ꓕ) LISU LETTER THA [Lisu]=>[Lisu]
		//DISALLOW:0x22A5, // (⊥) UP TACK [Zyyy]=>[ALL]
		//DISALLOW:0x27C2, // (⟂) PERPENDICULAR [Zyyy]=>[ALL]
		//DISALLOW:0x1D21C, // (𝈜) GREEK VOCAL NOTATION SYMBOL-54 [Grek]=>[Grek]
		//IDNA:0xA7B1, // (Ʇ) LATIN CAPITAL LETTER TURNED T [Latn]=>[Latn]
	],
	[
		// "ꓤ" <Same>
		'A4E4', // LISU LETTER ZA [Lisu]=>[Lisu]
		0xA4E4, // (ꓤ) LISU LETTER ZA [Lisu]=>[Lisu]
		//IDNA:0xA79E, // (Ꞟ) LATIN CAPITAL LETTER VOLAPUK UE [Latn]=>[Latn]
	],
	[
		// "ꓨ" <Same>
		'A4E8', // LISU LETTER HHA [Lisu]=>[Lisu]
		0xA4E8, // (ꓨ) LISU LETTER HHA [Lisu]=>[Lisu]
		//DISALLOW:0x2141, // (⅁) TURNED SANS-SERIF CAPITAL G [Zyyy]=>[ALL]
	],
	[
		// "ꓶ" <Same>
		'A4F6', // LISU LETTER UH [Lisu]=>[Lisu]
		0xA4F6, // (ꓶ) LISU LETTER UH [Lisu]=>[Lisu]
		//DISALLOW:0x2142, // (⅂) TURNED SANS-SERIF CAPITAL L [Zyyy]=>[ALL]
		//DISALLOW:0x1D215, // (𝈕) GREEK VOCAL NOTATION SYMBOL-22 [Grek]=>[Grek]
		//DISALLOW:0x1D22B, // (𝈫) GREEK INSTRUMENTAL NOTATION SYMBOL-24 [Grek]=>[Grek]
		0x16F26, // (𖼦) MIAO LETTER HA [Plrd]=>[Plrd]
		//IDNA:0x10411, // (𐐑) DESERET CAPITAL LETTER PEE [Dsrt]=>[Dsrt]
	],
	[
		// "𖼀" <Same>
		'16F00', // MIAO LETTER PA [Plrd]=>[Plrd]
		0x16F00, // (𖼀) MIAO LETTER PA [Plrd]=>[Plrd]
		//DISALLOW:0x2143, // (⅃) REVERSED SANS-SERIF CAPITAL L [Zyyy]=>[ALL]
	],
	[
		// "𑫥𑫯" <Same>
		'11AE5 11AEF', // PAU CIN HAU RISING TONE LONG + PAU CIN HAU MID-LEVEL TONE [Pauc]=>[Pauc]
		0x11AE6, // (𑫦) PAU CIN HAU RISING TONE [Pauc]=>[Pauc]
	],
	[
		// "𑫥𑫥" <Same>
		'11AE5 11AE5', // PAU CIN HAU RISING TONE LONG + PAU CIN HAU RISING TONE LONG [Pauc]=>[Pauc]
		0x11AE8, // (𑫨) PAU CIN HAU RISING TONE LONG FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫥𑫥𑫯" <Same>
		'11AE5 11AE5 11AEF', // PAU CIN HAU RISING TONE LONG + PAU CIN HAU RISING TONE LONG + PAU CIN HAU MID-LEVEL TONE [Pauc]=>[Pauc]
		0x11AE9, // (𑫩) PAU CIN HAU RISING TONE FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫥𑫥𑫰" <Same>
		'11AE5 11AE5 11AF0', // PAU CIN HAU RISING TONE LONG + PAU CIN HAU RISING TONE LONG + PAU CIN HAU GLOTTAL STOP VARIANT [Pauc]=>[Pauc]
		0x11AEA, // (𑫪) PAU CIN HAU SANDHI GLOTTAL STOP FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫥𑫰" <Same>
		'11AE5 11AF0', // PAU CIN HAU RISING TONE LONG + PAU CIN HAU GLOTTAL STOP VARIANT [Pauc]=>[Pauc]
		0x11AE7, // (𑫧) PAU CIN HAU SANDHI GLOTTAL STOP [Pauc]=>[Pauc]
	],
	[
		// "𑫳𑫯" <Same>
		'11AF3 11AEF', // PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU MID-LEVEL TONE [Pauc]=>[Pauc]
		0x11AF4, // (𑫴) PAU CIN HAU LOW-FALLING TONE [Pauc]=>[Pauc]
	],
	[
		// "𑫳𑫳" <Same>
		'11AF3 11AF3', // PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU LOW-FALLING TONE LONG [Pauc]=>[Pauc]
		0x11AF6, // (𑫶) PAU CIN HAU LOW-FALLING TONE LONG FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫳𑫳𑫯" <Same>
		'11AF3 11AF3 11AEF', // PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU MID-LEVEL TONE [Pauc]=>[Pauc]
		0x11AF7, // (𑫷) PAU CIN HAU LOW-FALLING TONE FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫳𑫳𑫰" <Same>
		'11AF3 11AF3 11AF0', // PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU GLOTTAL STOP VARIANT [Pauc]=>[Pauc]
		0x11AF8, // (𑫸) PAU CIN HAU GLOTTAL STOP FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫳𑫰" <Same>
		'11AF3 11AF0', // PAU CIN HAU LOW-FALLING TONE LONG + PAU CIN HAU GLOTTAL STOP VARIANT [Pauc]=>[Pauc]
		0x11AF5, // (𑫵) PAU CIN HAU GLOTTAL STOP [Pauc]=>[Pauc]
	],
	[
		// "𑫫𑫯" <Same>
		'11AEB 11AEF', // PAU CIN HAU SANDHI TONE LONG + PAU CIN HAU MID-LEVEL TONE [Pauc]=>[Pauc]
		0x11AEC, // (𑫬) PAU CIN HAU SANDHI TONE [Pauc]=>[Pauc]
	],
	[
		// "𑫫𑫫" <Same>
		'11AEB 11AEB', // PAU CIN HAU SANDHI TONE LONG + PAU CIN HAU SANDHI TONE LONG [Pauc]=>[Pauc]
		0x11AED, // (𑫭) PAU CIN HAU SANDHI TONE LONG FINAL [Pauc]=>[Pauc]
	],
	[
		// "𑫫𑫫𑫯" <Same>
		'11AEB 11AEB 11AEF', // PAU CIN HAU SANDHI TONE LONG + PAU CIN HAU SANDHI TONE LONG + PAU CIN HAU MID-LEVEL TONE [Pauc]=>[Pauc]
		0x11AEE, // (𑫮) PAU CIN HAU SANDHI TONE FINAL [Pauc]=>[Pauc]
	],
	[
		// "𐊨" <Same>
		'102A8', // CARIAN LETTER Q [Cari]=>[Cari]
		0x102A8, // (𐊨) CARIAN LETTER Q [Cari]=>[Cari]
		//DISALLOW:0x2295, // (⊕) CIRCLED PLUS [Zyyy]=>[ALL]
		//DISALLOW:0x2A01, // (⨁) N-ARY CIRCLED PLUS OPERATOR [Zyyy]=>[ALL]
		//DISALLOW:0x1F728, // (🜨) ALCHEMICAL SYMBOL FOR VERDIGRIS [Zyyy]=>[ALL]
		//IDNA:0xA69A, // (Ꚛ) CYRILLIC CAPITAL LETTER CROSSED O [Cyrl]=>[Cyrl]
	],
	[
		// "𐊼" <Same>
		'102BC', // CARIAN LETTER K [Cari]=>[Cari]
		0x102BC, // (𐊼) CARIAN LETTER K [Cari]=>[Cari]
		0x25BD, // (▽) WHITE DOWN-POINTING TRIANGLE [Zyyy]=>[ALL]
		//DISALLOW:0x1D214, // (𝈔) GREEK VOCAL NOTATION SYMBOL-21 [Grek]=>[Grek]
		//DISALLOW:0x1F704, // (🜄) ALCHEMICAL SYMBOL FOR WATER [Zyyy]=>[ALL]
	],
	[
		// "𐋀" <Same>
		'102C0', // CARIAN LETTER G [Cari]=>[Cari]
		0x102C0, // (𐋀) CARIAN LETTER G [Cari]=>[Cari]
		//DISALLOW:0x29D6, // (⧖) WHITE HOURGLASS [Zyyy]=>[ALL]
	],
	[
		// "𐐺" <Same>
		'1043A', // DESERET SMALL LETTER BEE [Dsrt]=>[Dsrt]
		0x1043A, // (𐐺) DESERET SMALL LETTER BEE [Dsrt]=>[Dsrt]
		//DISALLOW:0xA79B, // (ꞛ) LATIN SMALL LETTER VOLAPUK AE [Latn]=>[Latn]
	],
	[
		// "𐐒" <Same>
		'10412', // DESERET CAPITAL LETTER BEE [Dsrt]=>[Dsrt]
		//IDNA:0x10412, // (𐐒) DESERET CAPITAL LETTER BEE [Dsrt]=>[Dsrt]
		//IDNA:0xA79A, // (Ꞛ) LATIN CAPITAL LETTER VOLAPUK AE [Latn]=>[Latn]
	],
	[
		// "𐒆" <Same>
		'10486', // OSMANYA LETTER DEEL [Osma]=>[Osma]
		0x10486, // (𐒆) OSMANYA LETTER DEEL [Osma]=>[Osma]
		0x104A0, // (𐒠) OSMANYA DIGIT ZERO [Osma]=>[Osma]
	],
	[
		// "𐎂" <Same>
		'10382', // UGARITIC LETTER GAMLA [Ugar]=>[Ugar]
		0x10382, // (𐎂) UGARITIC LETTER GAMLA [Ugar]=>[Ugar]
		0x103D1, // (𐏑) OLD PERSIAN NUMBER ONE [Xpeo]=>[Xpeo]
	],
	[
		// "𐎓" <Same>
		'10393', // UGARITIC LETTER AIN [Ugar]=>[Ugar]
		0x10393, // (𐎓) UGARITIC LETTER AIN [Ugar]=>[Ugar]
		0x103D3, // (𐏓) OLD PERSIAN NUMBER TEN [Xpeo]=>[Xpeo]
	],
	[
		// "𐎚" <Same>
		'1039A', // UGARITIC LETTER TO [Ugar]=>[Ugar]
		0x1039A, // (𐎚) UGARITIC LETTER TO [Ugar]=>[Ugar]
		0x12038, // (𒀸) CUNEIFORM SIGN ASH [Xsux]=>[Xsux]
	],
	[
		// "𐦞" <Same>
		'1099E', // MEROITIC HIEROGLYPHIC SYMBOL VIDJ [Mero]=>[Mero]
		0x1099E, // (𐦞) MEROITIC HIEROGLYPHIC SYMBOL VIDJ [Mero]=>[Mero]
		0x2625, // (☥) ANKH [Zyyy]=>[ALL]
		0x132F9, // (𓋹) EGYPTIAN HIEROGLYPH S034 [Egyp]=>[Egyp]
	],
	[
		// "卄" <Same>
		'5344', // CJK Ideograph-5344 <1349/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5344, // (卄) CJK Ideograph-5344 <1349/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3039, // (〹) HANGZHOU NUMERAL TWENTY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "不" <Same>
		'4E0D', // CJK Ideograph-4E0D <14/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E0D, // (不) CJK Ideograph-4E0D <14/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF967, // (不) CJK COMPATIBILITY IDEOGRAPH-F967 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "丽" <Same>
		'4E3D', // CJK Ideograph-4E3D <62/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E3D, // (丽) CJK Ideograph-4E3D <62/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F800, // (丽) CJK COMPATIBILITY IDEOGRAPH-2F800 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "並" <Same>
		'4E26', // CJK Ideograph-4E26 <39/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E26, // (並) CJK Ideograph-4E26 <39/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA70, // (並) CJK COMPATIBILITY IDEOGRAPH-FA70 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "丨" <Same>
		'4E28', // CJK Ideograph-4E28 <41/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E28, // (丨) CJK Ideograph-4E28 <41/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0x239C, // (⎜) LEFT PARENTHESIS EXTENSION [Zyyy]=>[ALL]
		//DISALLOW:0x239F, // (⎟) RIGHT PARENTHESIS EXTENSION [Zyyy]=>[ALL]
		//DISALLOW:0x23A2, // (⎢) LEFT SQUARE BRACKET EXTENSION [Zyyy]=>[ALL]
		//DISALLOW:0x23A5, // (⎥) RIGHT SQUARE BRACKET EXTENSION [Zyyy]=>[ALL]
		//DISALLOW:0x23AA, // (⎪) CURLY BRACKET EXTENSION [Zyyy]=>[ALL]
		//DISALLOW:0x23AE, // (⎮) INTEGRAL EXTENSION [Zyyy]=>[ALL]
		//DISALLOW:0x31D1, // (㇑) CJK STROKE S [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		0x1175, // (ᅵ) HANGUL JUNGSEONG I [Hang]=>[Hang,Kore]
		//IDNA:0x3163, // (ㅣ) HANGUL LETTER I [Hang]=>[Hang,Kore]
		//IDNA:0x2F01, // (⼁) KANGXI RADICAL LINE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "丨ー" <Same>
		'4E28 30FC', // CJK Ideograph-4E28 <41/20992> + KATAKANA-HIRAGANA PROLONGED SOUND MARK [Hani,Zyyy]=>[Jpan]
		0x119C, // (ᆜ) HANGUL JUNGSEONG I-EU [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅡ" <Same>
		'4E28 1161', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG A [Hani,Hang]=>[Kore]
		0x1198, // (ᆘ) HANGUL JUNGSEONG I-A [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅣ" <Same>
		'4E28 1163', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YA [Hani,Hang]=>[Kore]
		0x1199, // (ᆙ) HANGUL JUNGSEONG I-YA [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅣᅩ" <Same>
		'4E28 1163 1169', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YA + HANGUL JUNGSEONG O [Hani,Hang]=>[Kore]
		0xD7BD, // (ힽ) HANGUL JUNGSEONG I-YA-O [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅣ丨" <Same>
		'4E28 1163 4E28', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YA + CJK Ideograph-4E28 <41/20992> [Hani,Hang]=>[Kore]
		0xD7BE, // (ힾ) HANGUL JUNGSEONG I-YAE [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅧ" <Same>
		'4E28 1167', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YEO [Hani,Hang]=>[Kore]
		0xD7BF, // (ힿ) HANGUL JUNGSEONG I-YEO [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅧ丨" <Same>
		'4E28 1167 4E28', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YEO + CJK Ideograph-4E28 <41/20992> [Hani,Hang]=>[Kore]
		0xD7C0, // (ퟀ) HANGUL JUNGSEONG I-YE [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅩ" <Same>
		'4E28 1169', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG O [Hani,Hang]=>[Kore]
		0x119A, // (ᆚ) HANGUL JUNGSEONG I-O [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅩ丨" <Same>
		'4E28 1169 4E28', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG O + CJK Ideograph-4E28 <41/20992> [Hani,Hang]=>[Kore]
		0xD7C1, // (ퟁ) HANGUL JUNGSEONG I-O-I [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅭ" <Same>
		'4E28 116D', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YO [Hani,Hang]=>[Kore]
		0xD7C2, // (ퟂ) HANGUL JUNGSEONG I-YO [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅮ" <Same>
		'4E28 116E', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG U [Hani,Hang]=>[Kore]
		0x119B, // (ᆛ) HANGUL JUNGSEONG I-U [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᅲ" <Same>
		'4E28 1172', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG YU [Hani,Hang]=>[Kore]
		0xD7C3, // (ퟃ) HANGUL JUNGSEONG I-YU [Hang]=>[Hang,Kore]
	],
	[
		// "丨ᆞ" <Same>
		'4E28 119E', // CJK Ideograph-4E28 <41/20992> + HANGUL JUNGSEONG ARAEA [Hani,Hang]=>[Kore]
		0x119D, // (ᆝ) HANGUL JUNGSEONG I-ARAEA [Hang]=>[Hang,Kore]
	],
	[
		// "丨丨" <Same>
		'4E28 4E28', // CJK Ideograph-4E28 <41/20992> + CJK Ideograph-4E28 <41/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0xD7C4, // (ퟄ) HANGUL JUNGSEONG I-I [Hang]=>[Hang,Kore]
	],
	[
		// "串" <Same>
		'4E32', // CJK Ideograph-4E32 <51/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E32, // (串) CJK Ideograph-4E32 <51/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF905, // (串) CJK COMPATIBILITY IDEOGRAPH-F905 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "丸" <Same>
		'4E38', // CJK Ideograph-4E38 <57/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E38, // (丸) CJK Ideograph-4E38 <57/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F801, // (丸) CJK COMPATIBILITY IDEOGRAPH-2F801 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "丹" <Same>
		'4E39', // CJK Ideograph-4E39 <58/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E39, // (丹) CJK Ideograph-4E39 <58/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF95E, // (丹) CJK COMPATIBILITY IDEOGRAPH-F95E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "乁" <Same>
		'4E41', // CJK Ideograph-4E41 <66/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E41, // (乁) CJK Ideograph-4E41 <66/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F802, // (乁) CJK COMPATIBILITY IDEOGRAPH-2F802 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "乙" <Same>
		'4E59', // CJK Ideograph-4E59 <90/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E59, // (乙) CJK Ideograph-4E59 <90/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0x31E0, // (㇠) CJK STROKE HXWG [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F04, // (⼄) KANGXI RADICAL SECOND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "乚" <Same>
		'4E5A', // CJK Ideograph-4E5A <91/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E5A, // (乚) CJK Ideograph-4E5A <91/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0x31DF, // (㇟) CJK STROKE SWG [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		0x2E83, // (⺃) CJK RADICAL SECOND TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "乛" <Same>
		'4E5B', // CJK Ideograph-4E5B <92/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E5B, // (乛) CJK Ideograph-4E5B <92/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0x31D6, // (㇖) CJK STROKE HG [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		0x2E82, // (⺂) CJK RADICAL SECOND ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "亀" <Same>
		'4E80', // CJK Ideograph-4E80 <129/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E80, // (亀) CJK Ideograph-4E80 <129/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EF2, // (⻲) CJK RADICAL J-SIMPLIFIED TURTLE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "亂" <Same>
		'4E82', // CJK Ideograph-4E82 <131/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E82, // (亂) CJK Ideograph-4E82 <131/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF91B, // (亂) CJK COMPATIBILITY IDEOGRAPH-F91B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "亅" <Same>
		'4E85', // CJK Ideograph-4E85 <134/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E85, // (亅) CJK Ideograph-4E85 <134/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0x31DA, // (㇚) CJK STROKE SG [Zyyy]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F05, // (⼅) KANGXI RADICAL HOOK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "了" <Same>
		'4E86', // CJK Ideograph-4E86 <135/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E86, // (了) CJK Ideograph-4E86 <135/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9BA, // (了) CJK COMPATIBILITY IDEOGRAPH-F9BA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "二" <Same>
		'4E8C', // CJK Ideograph-4E8C <141/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		valid(0x4E8C), // (二) CJK Ideograph-4E8C <141/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		valid(0x30CB), // (ニ) KATAKANA LETTER NI [Kana]=>[Kana,Jpan]
		//IDNA:0x2F06, // (⼆) KANGXI RADICAL TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠄢" <Same>
		'20122', // CJK Ideograph Extension B-20122 <291/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x20122, // (𠄢) CJK Ideograph Extension B-20122 <291/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F803, // (𠄢) CJK COMPATIBILITY IDEOGRAPH-2F803 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "亠" <Same>
		'4EA0', // CJK Ideograph-4EA0 <161/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4EA0, // (亠) CJK Ideograph-4EA0 <161/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F07, // (⼇) KANGXI RADICAL LID [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "亮" <Same>
		'4EAE', // CJK Ideograph-4EAE <175/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4EAE, // (亮) CJK Ideograph-4EAE <175/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF977, // (亮) CJK COMPATIBILITY IDEOGRAPH-F977 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "人" <Same>
		'4EBA', // CJK Ideograph-4EBA <187/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4EBA, // (人) CJK Ideograph-4EBA <187/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F08, // (⼈) KANGXI RADICAL MAN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "亻" <Same>
		'4EBB', // CJK Ideograph-4EBB <188/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4EBB, // (亻) CJK Ideograph-4EBB <188/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x30A4, // (イ) KATAKANA LETTER I [Kana]=>[Kana,Jpan]
		0x2E85, // (⺅) CJK RADICAL PERSON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "什" <Same>
		'4EC0', // CJK Ideograph-4EC0 <193/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4EC0, // (什) CJK Ideograph-4EC0 <193/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9FD, // (什) CJK COMPATIBILITY IDEOGRAPH-F9FD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "仌" <Same>
		'4ECC', // CJK Ideograph-4ECC <205/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4ECC, // (仌) CJK Ideograph-4ECC <205/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F819, // (仌) CJK COMPATIBILITY IDEOGRAPH-2F819 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "令" <Same>
		'4EE4', // CJK Ideograph-4EE4 <229/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4EE4, // (令) CJK Ideograph-4EE4 <229/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A8, // (令) CJK COMPATIBILITY IDEOGRAPH-F9A8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "你" <Same>
		'4F60', // CJK Ideograph-4F60 <353/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4F60, // (你) CJK Ideograph-4F60 <353/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F804, // (你) CJK COMPATIBILITY IDEOGRAPH-2F804 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "併" <Same>
		'4F75', // CJK Ideograph-4F75 <374/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4F75, // (併) CJK Ideograph-4F75 <374/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5002, // (倂) CJK Ideograph-5002 <515/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F807, // (倂) CJK COMPATIBILITY IDEOGRAPH-2F807 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "侀" <Same>
		'4F80', // CJK Ideograph-4F80 <385/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4F80, // (侀) CJK Ideograph-4F80 <385/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA73, // (侀) CJK COMPATIBILITY IDEOGRAPH-FA73 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "來" <Same>
		'4F86', // CJK Ideograph-4F86 <391/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4F86, // (來) CJK Ideograph-4F86 <391/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF92D, // (來) CJK COMPATIBILITY IDEOGRAPH-F92D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "例" <Same>
		'4F8B', // CJK Ideograph-4F8B <396/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4F8B, // (例) CJK Ideograph-4F8B <396/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B5, // (例) CJK COMPATIBILITY IDEOGRAPH-F9B5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "侮" <Same>
		'4FAE', // CJK Ideograph-4FAE <431/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4FAE, // (侮) CJK Ideograph-4FAE <431/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA30, // (侮) CJK COMPATIBILITY IDEOGRAPH-FA30 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F805, // (侮) CJK COMPATIBILITY IDEOGRAPH-2F805 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "侻" <Same>
		'4FBB', // CJK Ideograph-4FBB <444/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4FBB, // (侻) CJK Ideograph-4FBB <444/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F806, // (侻) CJK COMPATIBILITY IDEOGRAPH-2F806 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "便" <Same>
		'4FBF', // CJK Ideograph-4FBF <448/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4FBF, // (便) CJK Ideograph-4FBF <448/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF965, // (便) CJK COMPATIBILITY IDEOGRAPH-F965 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "値" <Same>
		'5024', // CJK Ideograph-5024 <549/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5024, // (値) CJK Ideograph-5024 <549/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x503C, // (值) CJK Ideograph-503C <573/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "倫" <Same>
		'502B', // CJK Ideograph-502B <556/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x502B, // (倫) CJK Ideograph-502B <556/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D4, // (倫) CJK COMPATIBILITY IDEOGRAPH-F9D4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "偺" <Same>
		'507A', // CJK Ideograph-507A <635/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x507A, // (偺) CJK Ideograph-507A <635/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F808, // (偺) CJK COMPATIBILITY IDEOGRAPH-2F808 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "備" <Same>
		'5099', // CJK Ideograph-5099 <666/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5099, // (備) CJK Ideograph-5099 <666/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F809, // (備) CJK COMPATIBILITY IDEOGRAPH-2F809 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "像" <Same>
		'50CF', // CJK Ideograph-50CF <720/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x50CF, // (像) CJK Ideograph-50CF <720/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80B, // (像) CJK COMPATIBILITY IDEOGRAPH-2F80B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "僚" <Same>
		'50DA', // CJK Ideograph-50DA <731/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x50DA, // (僚) CJK Ideograph-50DA <731/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9BB, // (僚) CJK COMPATIBILITY IDEOGRAPH-F9BB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "僧" <Same>
		'50E7', // CJK Ideograph-50E7 <744/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x50E7, // (僧) CJK Ideograph-50E7 <744/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA31, // (僧) CJK COMPATIBILITY IDEOGRAPH-FA31 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80A, // (僧) CJK COMPATIBILITY IDEOGRAPH-2F80A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㒞" <Same>
		'349E', // CJK Ideograph Extension A-349E <159/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x349E, // (㒞) CJK Ideograph Extension A-349E <159/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80C, // (㒞) CJK COMPATIBILITY IDEOGRAPH-2F80C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "儿" <Same>
		'513F', // CJK Ideograph-513F [832/20992] [Han]=>[Han]
		0x513F, // (儿) CJK Ideograph-513F [832/20992] [Han]=>[Han]
		0x3126, // (ㄦ) BOPOMOFO LETTER ER [Bopomofo]=>[Bopomofo] (16.0.0)
		//IDNA:0x2F09, // (⼉) KANGXI RADICAL LEGS [Han]=>[Han]
	],
	[
		// "兀" <Same>
		'5140', // CJK Ideograph-5140 <833/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5140, // (兀) CJK Ideograph-5140 <833/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA0C, // (兀) CJK COMPATIBILITY IDEOGRAPH-FA0C [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E8E, // (⺎) CJK RADICAL LAME ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "充" <Same>
		'5145', // CJK Ideograph-5145 <838/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5145, // (充) CJK Ideograph-5145 <838/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA74, // (充) CJK COMPATIBILITY IDEOGRAPH-FA74 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "免" <Same>
		'514D', // CJK Ideograph-514D <846/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x514D, // (免) CJK Ideograph-514D <846/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA32, // (免) CJK COMPATIBILITY IDEOGRAPH-FA32 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80E, // (免) CJK COMPATIBILITY IDEOGRAPH-2F80E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "兔" <Same>
		'5154', // CJK Ideograph-5154 <853/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5154, // (兔) CJK Ideograph-5154 <853/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80F, // (兔) CJK COMPATIBILITY IDEOGRAPH-2F80F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "兤" <Same>
		'5164', // CJK Ideograph-5164 <869/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5164, // (兤) CJK Ideograph-5164 <869/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F810, // (兤) CJK COMPATIBILITY IDEOGRAPH-2F810 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "入" <Same>
		'5165', // CJK Ideograph-5165 <870/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5165, // (入) CJK Ideograph-5165 <870/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F0A, // (⼊) KANGXI RADICAL ENTER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "內" <Same>
		'5167', // CJK Ideograph-5167 <872/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5167, // (內) CJK Ideograph-5167 <872/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F814, // (內) CJK COMPATIBILITY IDEOGRAPH-2F814 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "全" <Same>
		'5168', // CJK Ideograph-5168 <873/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5168, // (全) CJK Ideograph-5168 <873/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA72, // (全) CJK COMPATIBILITY IDEOGRAPH-FA72 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "兩" <Same>
		'5169', // CJK Ideograph-5169 <874/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5169, // (兩) CJK Ideograph-5169 <874/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF978, // (兩) CJK COMPATIBILITY IDEOGRAPH-F978 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "八" <Same>
		'516B', // CJK Ideograph-516B <876/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		valid(0x516B), // (八) CJK Ideograph-516B <876/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		valid(0x30CF), // (ハ) KATAKANA LETTER HA [Kana]=>[Kana,Jpan]
		//IDNA:0x2F0B, // (⼋) KANGXI RADICAL EIGHT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "六" <Same>
		'516D', // CJK Ideograph-516D <878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x516D, // (六) CJK Ideograph-516D <878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D1, // (六) CJK COMPATIBILITY IDEOGRAPH-F9D1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "具" <Same>
		'5177', // CJK Ideograph-5177 <888/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5177, // (具) CJK Ideograph-5177 <888/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F811, // (具) CJK COMPATIBILITY IDEOGRAPH-2F811 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠔜" <Same>
		'2051C', // CJK Ideograph Extension B-2051C <1309/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2051C, // (𠔜) CJK Ideograph Extension B-2051C <1309/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F812, // (𠔜) CJK COMPATIBILITY IDEOGRAPH-2F812 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠔥" <Same>
		'20525', // CJK Ideograph Extension B-20525 <1318/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x20525, // (𠔥) CJK Ideograph Extension B-20525 <1318/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91B, // (𠔥) CJK COMPATIBILITY IDEOGRAPH-2F91B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冀" <Same>
		'5180', // CJK Ideograph-5180 <897/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5180, // (冀) CJK Ideograph-5180 <897/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA75, // (冀) CJK COMPATIBILITY IDEOGRAPH-FA75 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㒹" <Same>
		'34B9', // CJK Ideograph Extension A-34B9 <186/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x34B9, // (㒹) CJK Ideograph Extension A-34B9 <186/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F813, // (㒹) CJK COMPATIBILITY IDEOGRAPH-2F813 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冂" <Same>
		'5182', // CJK Ideograph-5182 <899/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5182, // (冂) CJK Ideograph-5182 <899/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F0C, // (⼌) KANGXI RADICAL DOWN BOX [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "再" <Same>
		'518D', // CJK Ideograph-518D <910/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x518D, // (再) CJK Ideograph-518D <910/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F815, // (再) CJK COMPATIBILITY IDEOGRAPH-2F815 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠕋" <Same>
		'2054B', // CJK Ideograph Extension B-2054B <1356/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2054B, // (𠕋) CJK Ideograph Extension B-2054B <1356/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F816, // (𠕋) CJK COMPATIBILITY IDEOGRAPH-2F816 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冒" <Same>
		'5192', // CJK Ideograph-5192 <915/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5192, // (冒) CJK Ideograph-5192 <915/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D2, // (冒) CJK COMPATIBILITY IDEOGRAPH-2F8D2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冕" <Same>
		'5195', // CJK Ideograph-5195 <918/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5195, // (冕) CJK Ideograph-5195 <918/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D3, // (冕) CJK COMPATIBILITY IDEOGRAPH-2F8D3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㒻" <Same>
		'34BB', // CJK Ideograph Extension A-34BB <188/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x34BB, // (㒻) CJK Ideograph Extension A-34BB <188/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9CA, // (㒻) CJK COMPATIBILITY IDEOGRAPH-2F9CA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "最" <Same>
		'6700', // CJK Ideograph-6700 <6401/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6700, // (最) CJK Ideograph-6700 <6401/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D4, // (最) CJK COMPATIBILITY IDEOGRAPH-2F8D4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冖" <Same>
		'5196', // CJK Ideograph-5196 <919/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5196, // (冖) CJK Ideograph-5196 <919/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F0D, // (⼍) KANGXI RADICAL COVER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冗" <Same>
		'5197', // CJK Ideograph-5197 <920/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5197, // (冗) CJK Ideograph-5197 <920/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F817, // (冗) CJK COMPATIBILITY IDEOGRAPH-2F817 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冤" <Same>
		'51A4', // CJK Ideograph-51A4 <933/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51A4, // (冤) CJK Ideograph-51A4 <933/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F818, // (冤) CJK COMPATIBILITY IDEOGRAPH-2F818 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冫" <Same>
		'51AB', // CJK Ideograph-51AB <940/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51AB, // (冫) CJK Ideograph-51AB <940/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F0E, // (⼎) KANGXI RADICAL ICE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冬" <Same>
		'51AC', // CJK Ideograph-51AC <941/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51AC, // (冬) CJK Ideograph-51AC <941/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81A, // (冬) CJK COMPATIBILITY IDEOGRAPH-2F81A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "况" <Same>
		'51B5', // CJK Ideograph-51B5 <950/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51B5, // (况) CJK Ideograph-51B5 <950/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA71, // (况) CJK COMPATIBILITY IDEOGRAPH-FA71 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81B, // (况) CJK COMPATIBILITY IDEOGRAPH-2F81B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "冷" <Same>
		'51B7', // CJK Ideograph-51B7 <952/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51B7, // (冷) CJK Ideograph-51B7 <952/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF92E, // (冷) CJK COMPATIBILITY IDEOGRAPH-F92E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "凉" <Same>
		'51C9', // CJK Ideograph-51C9 <970/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51C9, // (凉) CJK Ideograph-51C9 <970/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF979, // (凉) CJK COMPATIBILITY IDEOGRAPH-F979 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "凌" <Same>
		'51CC', // CJK Ideograph-51CC <973/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51CC, // (凌) CJK Ideograph-51CC <973/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF955, // (凌) CJK COMPATIBILITY IDEOGRAPH-F955 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "凜" <Same>
		'51DC', // CJK Ideograph-51DC <989/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51DC, // (凜) CJK Ideograph-51DC <989/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF954, // (凜) CJK COMPATIBILITY IDEOGRAPH-F954 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "凞" <Same>
		'51DE', // CJK Ideograph-51DE <991/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51DE, // (凞) CJK Ideograph-51DE <991/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA15, // (凞) CJK COMPATIBILITY IDEOGRAPH-FA15 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "几" <Same>
		'51E0', // CJK Ideograph-51E0 <993/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51E0, // (几) CJK Ideograph-51E0 <993/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F0F, // (⼏) KANGXI RADICAL TABLE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠘺" <Same>
		'2063A', // CJK Ideograph Extension B-2063A <1595/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2063A, // (𠘺) CJK Ideograph Extension B-2063A <1595/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80D, // (𠘺) CJK COMPATIBILITY IDEOGRAPH-2F80D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "凵" <Same>
		'51F5', // CJK Ideograph-51F5 <1014/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x51F5, // (凵) CJK Ideograph-51F5 <1014/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81D, // (凵) CJK COMPATIBILITY IDEOGRAPH-2F81D [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F10, // (⼐) KANGXI RADICAL OPEN BOX [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "刀" <Same>
		'5200', // CJK Ideograph-5200 <1025/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5200, // (刀) CJK Ideograph-5200 <1025/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F11, // (⼑) KANGXI RADICAL KNIFE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "刂" <Same>
		'5202', // CJK Ideograph-5202 <1027/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5202, // (刂) CJK Ideograph-5202 <1027/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E89, // (⺉) CJK RADICAL KNIFE TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "刃" <Same>
		'5203', // CJK Ideograph-5203 <1028/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5203, // (刃) CJK Ideograph-5203 <1028/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81E, // (刃) CJK COMPATIBILITY IDEOGRAPH-2F81E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "切" <Same>
		'5207', // CJK Ideograph-5207 <1032/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5207, // (切) CJK Ideograph-5207 <1032/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA00, // (切) CJK COMPATIBILITY IDEOGRAPH-FA00 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F850, // (切) CJK COMPATIBILITY IDEOGRAPH-2F850 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "列" <Same>
		'5217', // CJK Ideograph-5217 <1048/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5217, // (列) CJK Ideograph-5217 <1048/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF99C, // (列) CJK COMPATIBILITY IDEOGRAPH-F99C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "利" <Same>
		'5229', // CJK Ideograph-5229 <1066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5229, // (利) CJK Ideograph-5229 <1066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9DD, // (利) CJK COMPATIBILITY IDEOGRAPH-F9DD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㓟" <Same>
		'34DF', // CJK Ideograph Extension A-34DF <224/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x34DF, // (㓟) CJK Ideograph Extension A-34DF <224/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81F, // (㓟) CJK COMPATIBILITY IDEOGRAPH-2F81F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "刺" <Same>
		'523A', // CJK Ideograph-523A <1083/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x523A, // (刺) CJK Ideograph-523A <1083/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9FF, // (刺) CJK COMPATIBILITY IDEOGRAPH-F9FF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "刻" <Same>
		'523B', // CJK Ideograph-523B <1084/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x523B, // (刻) CJK Ideograph-523B <1084/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F820, // (刻) CJK COMPATIBILITY IDEOGRAPH-2F820 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "剆" <Same>
		'5246', // CJK Ideograph-5246 <1095/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5246, // (剆) CJK Ideograph-5246 <1095/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F821, // (剆) CJK COMPATIBILITY IDEOGRAPH-2F821 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "割" <Same>
		'5272', // CJK Ideograph-5272 <1139/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5272, // (割) CJK Ideograph-5272 <1139/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F822, // (割) CJK COMPATIBILITY IDEOGRAPH-2F822 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "剷" <Same>
		'5277', // CJK Ideograph-5277 <1144/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5277, // (剷) CJK Ideograph-5277 <1144/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F823, // (剷) CJK COMPATIBILITY IDEOGRAPH-2F823 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "劉" <Same>
		'5289', // CJK Ideograph-5289 <1162/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5289, // (劉) CJK Ideograph-5289 <1162/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C7, // (劉) CJK COMPATIBILITY IDEOGRAPH-F9C7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠠄" <Same>
		'20804', // CJK Ideograph Extension B-20804 <2053/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x20804, // (𠠄) CJK Ideograph Extension B-20804 <2053/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D9, // (𠠄) CJK COMPATIBILITY IDEOGRAPH-2F9D9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "力" <Same>
		'529B', // CJK Ideograph-529B <1180/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x529B, // (力) CJK Ideograph-529B <1180/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x30AB, // (カ) KATAKANA LETTER KA [Kana]=>[Kana,Jpan]
		//IDNA:0xF98A, // (力) CJK COMPATIBILITY IDEOGRAPH-F98A [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F12, // (⼒) KANGXI RADICAL POWER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "劣" <Same>
		'52A3', // CJK Ideograph-52A3 <1188/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52A3, // (劣) CJK Ideograph-52A3 <1188/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF99D, // (劣) CJK COMPATIBILITY IDEOGRAPH-F99D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㔕" <Same>
		'3515', // CJK Ideograph Extension A-3515 <278/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3515, // (㔕) CJK Ideograph Extension A-3515 <278/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F824, // (㔕) CJK COMPATIBILITY IDEOGRAPH-2F824 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "劳" <Same>
		'52B3', // CJK Ideograph-52B3 <1204/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52B3, // (劳) CJK Ideograph-52B3 <1204/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F992, // (劳) CJK COMPATIBILITY IDEOGRAPH-2F992 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勇" <Same>
		'52C7', // CJK Ideograph-52C7 <1224/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52C7, // (勇) CJK Ideograph-52C7 <1224/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA76, // (勇) CJK COMPATIBILITY IDEOGRAPH-FA76 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F825, // (勇) CJK COMPATIBILITY IDEOGRAPH-2F825 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勉" <Same>
		'52C9', // CJK Ideograph-52C9 <1226/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52C9, // (勉) CJK Ideograph-52C9 <1226/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA33, // (勉) CJK COMPATIBILITY IDEOGRAPH-FA33 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F826, // (勉) CJK COMPATIBILITY IDEOGRAPH-2F826 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勒" <Same>
		'52D2', // CJK Ideograph-52D2 <1235/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52D2, // (勒) CJK Ideograph-52D2 <1235/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF952, // (勒) CJK COMPATIBILITY IDEOGRAPH-F952 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勞" <Same>
		'52DE', // CJK Ideograph-52DE <1247/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52DE, // (勞) CJK Ideograph-52DE <1247/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF92F, // (勞) CJK COMPATIBILITY IDEOGRAPH-F92F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勤" <Same>
		'52E4', // CJK Ideograph-52E4 <1253/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52E4, // (勤) CJK Ideograph-52E4 <1253/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA34, // (勤) CJK COMPATIBILITY IDEOGRAPH-FA34 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F827, // (勤) CJK COMPATIBILITY IDEOGRAPH-2F827 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勵" <Same>
		'52F5', // CJK Ideograph-52F5 <1270/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52F5, // (勵) CJK Ideograph-52F5 <1270/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF97F, // (勵) CJK COMPATIBILITY IDEOGRAPH-F97F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勹" <Same>
		'52F9', // CJK Ideograph-52F9 <1274/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52F9, // (勹) CJK Ideograph-52F9 <1274/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F13, // (⼓) KANGXI RADICAL WRAP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "勺" <Same>
		'52FA', // CJK Ideograph-52FA <1275/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x52FA, // (勺) CJK Ideograph-52FA <1275/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA77, // (勺) CJK COMPATIBILITY IDEOGRAPH-FA77 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F828, // (勺) CJK COMPATIBILITY IDEOGRAPH-2F828 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "包" <Same>
		'5305', // CJK Ideograph-5305 <1286/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5305, // (包) CJK Ideograph-5305 <1286/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F829, // (包) CJK COMPATIBILITY IDEOGRAPH-2F829 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "匆" <Same>
		'5306', // CJK Ideograph-5306 <1287/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5306, // (匆) CJK Ideograph-5306 <1287/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82A, // (匆) CJK COMPATIBILITY IDEOGRAPH-2F82A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠣞" <Same>
		'208DE', // CJK Ideograph Extension B-208DE <2271/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x208DE, // (𠣞) CJK Ideograph Extension B-208DE <2271/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9DD, // (𠣞) CJK COMPATIBILITY IDEOGRAPH-2F9DD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "匕" <Same>
		'5315', // CJK Ideograph-5315 <1302/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5315, // (匕) CJK Ideograph-5315 <1302/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F14, // (⼔) KANGXI RADICAL SPOON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "北" <Same>
		'5317', // CJK Ideograph-5317 <1304/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5317, // (北) CJK Ideograph-5317 <1304/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF963, // (北) CJK COMPATIBILITY IDEOGRAPH-F963 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82B, // (北) CJK COMPATIBILITY IDEOGRAPH-2F82B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "匚" <Same>
		'531A', // CJK Ideograph-531A <1307/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x531A, // (匚) CJK Ideograph-531A <1307/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F15, // (⼕) KANGXI RADICAL RIGHT OPEN BOX [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "匸" <Same>
		'5338', // CJK Ideograph-5338 <1337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5338, // (匸) CJK Ideograph-5338 <1337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F16, // (⼖) KANGXI RADICAL HIDING ENCLOSURE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "匿" <Same>
		'533F', // CJK Ideograph-533F <1344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x533F, // (匿) CJK Ideograph-533F <1344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9EB, // (匿) CJK COMPATIBILITY IDEOGRAPH-F9EB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "十" <Same>
		'5341', // CJK Ideograph-5341 <1346/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5341, // (十) CJK Ideograph-5341 <1346/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F17, // (⼗) KANGXI RADICAL TEN [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x3038, // (〸) HANGZHOU NUMERAL TEN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卅" <Same>
		'5345', // CJK Ideograph-5345 <1350/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5345, // (卅) CJK Ideograph-5345 <1350/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x303A, // (〺) HANGZHOU NUMERAL THIRTY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卉" <Same>
		'5349', // CJK Ideograph-5349 <1354/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5349, // (卉) CJK Ideograph-5349 <1354/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82C, // (卉) CJK COMPATIBILITY IDEOGRAPH-2F82C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卍" <Same>
		'534D', // CJK Ideograph-534D <1358/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x534D, // (卍) CJK Ideograph-534D <1358/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0xFD6, // (࿖) LEFT-FACING SVASTI SIGN [Zyyy]=>[ALL]
	],
	[
		// "卐" <Same>
		'5350', // CJK Ideograph-5350 <1361/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5350, // (卐) CJK Ideograph-5350 <1361/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//DISALLOW:0xFD5, // (࿕) RIGHT-FACING SVASTI SIGN [Zyyy]=>[ALL]
	],
	[
		// "卑" <Same>
		'5351', // CJK Ideograph-5351 <1362/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5351, // (卑) CJK Ideograph-5351 <1362/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA35, // (卑) CJK COMPATIBILITY IDEOGRAPH-FA35 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82D, // (卑) CJK COMPATIBILITY IDEOGRAPH-2F82D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "博" <Same>
		'535A', // CJK Ideograph-535A <1371/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x535A, // (博) CJK Ideograph-535A <1371/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82E, // (博) CJK COMPATIBILITY IDEOGRAPH-2F82E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卜" <Same>
		'535C', // CJK Ideograph-535C <1373/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x535C, // (卜) CJK Ideograph-535C <1373/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x30C8, // (ト) KATAKANA LETTER TO [Kana]=>[Kana,Jpan]
		//IDNA:0x2F18, // (⼘) KANGXI RADICAL DIVINATION [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卩" <Same>
		'5369', // CJK Ideograph-5369 <1386/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5369, // (卩) CJK Ideograph-5369 <1386/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F19, // (⼙) KANGXI RADICAL SEAL [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㔾" <Same>
		'353E', // CJK Ideograph Extension A-353E <319/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x353E, // (㔾) CJK Ideograph Extension A-353E <319/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E8B, // (⺋) CJK RADICAL SEAL [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "即" <Same>
		'5373', // CJK Ideograph-5373 <1396/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5373, // (即) CJK Ideograph-5373 <1396/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82F, // (即) CJK COMPATIBILITY IDEOGRAPH-2F82F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卵" <Same>
		'5375', // CJK Ideograph-5375 <1398/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5375, // (卵) CJK Ideograph-5375 <1398/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF91C, // (卵) CJK COMPATIBILITY IDEOGRAPH-F91C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卽" <Same>
		'537D', // CJK Ideograph-537D <1406/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x537D, // (卽) CJK Ideograph-537D <1406/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F830, // (卽) CJK COMPATIBILITY IDEOGRAPH-2F830 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "卿" <Same>
		'537F', // CJK Ideograph-537F <1408/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x537F, // (卿) CJK Ideograph-537F <1408/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F831, // (卿) CJK COMPATIBILITY IDEOGRAPH-2F831 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F832, // (卿) CJK COMPATIBILITY IDEOGRAPH-2F832 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F833, // (卿) CJK COMPATIBILITY IDEOGRAPH-2F833 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "厂" <Same>
		'5382', // CJK Ideograph-5382 <1411/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5382, // (厂) CJK Ideograph-5382 <1411/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F1A, // (⼚) KANGXI RADICAL CLIFF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠨬" <Same>
		'20A2C', // CJK Ideograph Extension B-20A2C <2605/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x20A2C, // (𠨬) CJK Ideograph Extension B-20A2C <2605/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F834, // (𠨬) CJK COMPATIBILITY IDEOGRAPH-2F834 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "厶" <Same>
		'53B6', // CJK Ideograph-53B6 <1463/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53B6, // (厶) CJK Ideograph-53B6 <1463/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F1B, // (⼛) KANGXI RADICAL PRIVATE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "參" <Same>
		'53C3', // CJK Ideograph-53C3 <1476/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53C3, // (參) CJK Ideograph-53C3 <1476/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF96B, // (參) CJK COMPATIBILITY IDEOGRAPH-F96B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "又" <Same>
		'53C8', // CJK Ideograph-53C8 <1481/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53C8, // (又) CJK Ideograph-53C8 <1481/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F1C, // (⼜) KANGXI RADICAL AGAIN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "及" <Same>
		'53CA', // CJK Ideograph-53CA <1483/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53CA, // (及) CJK Ideograph-53CA <1483/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F836, // (及) CJK COMPATIBILITY IDEOGRAPH-2F836 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "叟" <Same>
		'53DF', // CJK Ideograph-53DF <1504/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53DF, // (叟) CJK Ideograph-53DF <1504/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F837, // (叟) CJK COMPATIBILITY IDEOGRAPH-2F837 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𠭣" <Same>
		'20B63', // CJK Ideograph Extension B-20B63 <2916/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x20B63, // (𠭣) CJK Ideograph Extension B-20B63 <2916/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F838, // (𠭣) CJK COMPATIBILITY IDEOGRAPH-2F838 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "口" <Same>
		'53E3', // CJK Ideograph-53E3 <1508/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53E3, // (口) CJK Ideograph-53E3 <1508/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x30ED, // (ロ) KATAKANA LETTER RO [Kana]=>[Kana,Jpan]
		//IDNA:0x2F1D, // (⼝) KANGXI RADICAL MOUTH [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x56D7, // (囗) CJK Ideograph-56D7 <2264/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F1E, // (⼞) KANGXI RADICAL ENCLOSURE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "句" <Same>
		'53E5', // CJK Ideograph-53E5 <1510/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53E5, // (句) CJK Ideograph-53E5 <1510/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF906, // (句) CJK COMPATIBILITY IDEOGRAPH-F906 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "叫" <Same>
		'53EB', // CJK Ideograph-53EB <1516/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53EB, // (叫) CJK Ideograph-53EB <1516/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F839, // (叫) CJK COMPATIBILITY IDEOGRAPH-2F839 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "叱" <Same>
		'53F1', // CJK Ideograph-53F1 <1522/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x53F1, // (叱) CJK Ideograph-53F1 <1522/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83A, // (叱) CJK COMPATIBILITY IDEOGRAPH-2F83A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "吆" <Same>
		'5406', // CJK Ideograph-5406 <1543/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5406, // (吆) CJK Ideograph-5406 <1543/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83B, // (吆) CJK COMPATIBILITY IDEOGRAPH-2F83B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "吏" <Same>
		'540F', // CJK Ideograph-540F <1552/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x540F, // (吏) CJK Ideograph-540F <1552/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9DE, // (吏) CJK COMPATIBILITY IDEOGRAPH-F9DE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "吝" <Same>
		'541D', // CJK Ideograph-541D <1566/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x541D, // (吝) CJK Ideograph-541D <1566/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9ED, // (吝) CJK COMPATIBILITY IDEOGRAPH-F9ED [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "吸" <Same>
		'5438', // CJK Ideograph-5438 <1593/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5438, // (吸) CJK Ideograph-5438 <1593/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83D, // (吸) CJK COMPATIBILITY IDEOGRAPH-2F83D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "呂" <Same>
		'5442', // CJK Ideograph-5442 <1603/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5442, // (呂) CJK Ideograph-5442 <1603/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF980, // (呂) CJK COMPATIBILITY IDEOGRAPH-F980 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "呈" <Same>
		'5448', // CJK Ideograph-5448 <1609/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5448, // (呈) CJK Ideograph-5448 <1609/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83E, // (呈) CJK COMPATIBILITY IDEOGRAPH-2F83E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "周" <Same>
		'5468', // CJK Ideograph-5468 <1641/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5468, // (周) CJK Ideograph-5468 <1641/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83F, // (周) CJK COMPATIBILITY IDEOGRAPH-2F83F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "咞" <Same>
		'549E', // CJK Ideograph-549E <1695/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x549E, // (咞) CJK Ideograph-549E <1695/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83C, // (咞) CJK COMPATIBILITY IDEOGRAPH-2F83C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "咢" <Same>
		'54A2', // CJK Ideograph-54A2 <1699/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x54A2, // (咢) CJK Ideograph-54A2 <1699/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F840, // (咢) CJK COMPATIBILITY IDEOGRAPH-2F840 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "咽" <Same>
		'54BD', // CJK Ideograph-54BD <1726/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x54BD, // (咽) CJK Ideograph-54BD <1726/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF99E, // (咽) CJK COMPATIBILITY IDEOGRAPH-F99E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㖈" <Same>
		'3588', // CJK Ideograph Extension A-3588 <393/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3588, // (㖈) CJK Ideograph Extension A-3588 <393/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x439B, // (䎛) CJK Ideograph Extension A-439B <3996/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "哶" <Same>
		'54F6', // CJK Ideograph-54F6 <1783/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x54F6, // (哶) CJK Ideograph-54F6 <1783/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F841, // (哶) CJK COMPATIBILITY IDEOGRAPH-2F841 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "唐" <Same>
		'5510', // CJK Ideograph-5510 <1809/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5510, // (唐) CJK Ideograph-5510 <1809/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F842, // (唐) CJK COMPATIBILITY IDEOGRAPH-2F842 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "啓" <Same>
		'5553', // CJK Ideograph-5553 <1876/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5553, // (啓) CJK Ideograph-5553 <1876/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F843, // (啓) CJK COMPATIBILITY IDEOGRAPH-2F843 [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x555F, // (啟) CJK Ideograph-555F <1888/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "啕" <Same>
		'5555', // CJK Ideograph-5555 <1878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5555, // (啕) CJK Ideograph-5555 <1878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA79, // (啕) CJK COMPATIBILITY IDEOGRAPH-FA79 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "啣" <Same>
		'5563', // CJK Ideograph-5563 <1892/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5563, // (啣) CJK Ideograph-5563 <1892/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F844, // (啣) CJK COMPATIBILITY IDEOGRAPH-2F844 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "善" <Same>
		'5584', // CJK Ideograph-5584 <1925/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5584, // (善) CJK Ideograph-5584 <1925/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F845, // (善) CJK COMPATIBILITY IDEOGRAPH-2F845 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F846, // (善) CJK COMPATIBILITY IDEOGRAPH-2F846 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "喇" <Same>
		'5587', // CJK Ideograph-5587 <1928/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5587, // (喇) CJK Ideograph-5587 <1928/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF90B, // (喇) CJK COMPATIBILITY IDEOGRAPH-F90B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "喙" <Same>
		'5599', // CJK Ideograph-5599 <1946/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5599, // (喙) CJK Ideograph-5599 <1946/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA7A, // (喙) CJK COMPATIBILITY IDEOGRAPH-FA7A [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F847, // (喙) CJK COMPATIBILITY IDEOGRAPH-2F847 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "喝" <Same>
		'559D', // CJK Ideograph-559D <1950/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x559D, // (喝) CJK Ideograph-559D <1950/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA36, // (喝) CJK COMPATIBILITY IDEOGRAPH-FA36 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA78, // (喝) CJK COMPATIBILITY IDEOGRAPH-FA78 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "喫" <Same>
		'55AB', // CJK Ideograph-55AB <1964/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x55AB, // (喫) CJK Ideograph-55AB <1964/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F848, // (喫) CJK COMPATIBILITY IDEOGRAPH-2F848 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "喳" <Same>
		'55B3', // CJK Ideograph-55B3 <1972/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x55B3, // (喳) CJK Ideograph-55B3 <1972/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F849, // (喳) CJK COMPATIBILITY IDEOGRAPH-2F849 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嗀" <Same>
		'55C0', // CJK Ideograph-55C0 <1985/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x55C0, // (嗀) CJK Ideograph-55C0 <1985/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA0D, // (嗀) CJK COMPATIBILITY IDEOGRAPH-FA0D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嗂" <Same>
		'55C2', // CJK Ideograph-55C2 <1987/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x55C2, // (嗂) CJK Ideograph-55C2 <1987/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84A, // (嗂) CJK COMPATIBILITY IDEOGRAPH-2F84A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嗢" <Same>
		'55E2', // CJK Ideograph-55E2 <2019/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x55E2, // (嗢) CJK Ideograph-55E2 <2019/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA7B, // (嗢) CJK COMPATIBILITY IDEOGRAPH-FA7B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嘆" <Same>
		'5606', // CJK Ideograph-5606 <2055/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5606, // (嘆) CJK Ideograph-5606 <2055/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA37, // (嘆) CJK COMPATIBILITY IDEOGRAPH-FA37 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84C, // (嘆) CJK COMPATIBILITY IDEOGRAPH-2F84C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "噑" <Same>
		'5651', // CJK Ideograph-5651 <2130/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5651, // (噑) CJK Ideograph-5651 <2130/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84E, // (噑) CJK COMPATIBILITY IDEOGRAPH-2F84E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "噴" <Same>
		'5674', // CJK Ideograph-5674 <2165/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5674, // (噴) CJK Ideograph-5674 <2165/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84F, // (噴) CJK COMPATIBILITY IDEOGRAPH-2F84F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "器" <Same>
		'5668', // CJK Ideograph-5668 <2153/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5668, // (器) CJK Ideograph-5668 <2153/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA38, // (器) CJK COMPATIBILITY IDEOGRAPH-FA38 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "囹" <Same>
		'56F9', // CJK Ideograph-56F9 <2298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x56F9, // (囹) CJK Ideograph-56F9 <2298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A9, // (囹) CJK COMPATIBILITY IDEOGRAPH-F9A9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "圖" <Same>
		'5716', // CJK Ideograph-5716 <2327/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5716, // (圖) CJK Ideograph-5716 <2327/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84B, // (圖) CJK COMPATIBILITY IDEOGRAPH-2F84B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "圗" <Same>
		'5717', // CJK Ideograph-5717 <2328/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5717, // (圗) CJK Ideograph-5717 <2328/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84D, // (圗) CJK COMPATIBILITY IDEOGRAPH-2F84D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "土" <Same>
		'571F', // CJK Ideograph-571F <2336/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x571F, // (土) CJK Ideograph-571F <2336/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F1F, // (⼟) KANGXI RADICAL EARTH [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58EB, // (士) CJK Ideograph-58EB <2796/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F20, // (⼠) KANGXI RADICAL SCHOLAR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "型" <Same>
		'578B', // CJK Ideograph-578B <2444/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x578B, // (型) CJK Ideograph-578B <2444/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F855, // (型) CJK COMPATIBILITY IDEOGRAPH-2F855 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "城" <Same>
		'57CE', // CJK Ideograph-57CE <2511/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x57CE, // (城) CJK Ideograph-57CE <2511/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F852, // (城) CJK COMPATIBILITY IDEOGRAPH-2F852 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㘽" <Same>
		'363D', // CJK Ideograph Extension A-363D <574/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x363D, // (㘽) CJK Ideograph Extension A-363D <574/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x39B3, // (㦳) CJK Ideograph Extension A-39B3 <1460/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "埴" <Same>
		'57F4', // CJK Ideograph-57F4 <2549/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x57F4, // (埴) CJK Ideograph-57F4 <2549/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F853, // (埴) CJK COMPATIBILITY IDEOGRAPH-2F853 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "堍" <Same>
		'580D', // CJK Ideograph-580D <2574/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x580D, // (堍) CJK Ideograph-580D <2574/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F854, // (堍) CJK COMPATIBILITY IDEOGRAPH-2F854 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "報" <Same>
		'5831', // CJK Ideograph-5831 <2610/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5831, // (報) CJK Ideograph-5831 <2610/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F857, // (報) CJK COMPATIBILITY IDEOGRAPH-2F857 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "堲" <Same>
		'5832', // CJK Ideograph-5832 <2611/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5832, // (堲) CJK Ideograph-5832 <2611/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F856, // (堲) CJK COMPATIBILITY IDEOGRAPH-2F856 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "塀" <Same>
		'5840', // CJK Ideograph-5840 <2625/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5840, // (塀) CJK Ideograph-5840 <2625/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA39, // (塀) CJK COMPATIBILITY IDEOGRAPH-FA39 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "塚" <Same>
		'585A', // CJK Ideograph-585A <2651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x585A, // (塚) CJK Ideograph-585A <2651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA10, // (塚) CJK COMPATIBILITY IDEOGRAPH-FA10 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA7C, // (塚) CJK COMPATIBILITY IDEOGRAPH-FA7C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "塞" <Same>
		'585E', // CJK Ideograph-585E <2655/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x585E, // (塞) CJK Ideograph-585E <2655/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF96C, // (塞) CJK COMPATIBILITY IDEOGRAPH-F96C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "塡" <Same>
		'5861', // CJK Ideograph-5861 <2658/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5861, // (塡) CJK Ideograph-5861 <2658/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x586B, // (填) CJK Ideograph-586B <2668/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "墫" <Same>
		'58AB', // CJK Ideograph-58AB <2732/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58AB, // (墫) CJK Ideograph-58AB <2732/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58FF, // (壿) CJK Ideograph-58FF <2816/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "墬" <Same>
		'58AC', // CJK Ideograph-58AC <2733/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58AC, // (墬) CJK Ideograph-58AC <2733/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F858, // (墬) CJK COMPATIBILITY IDEOGRAPH-2F858 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "墳" <Same>
		'58B3', // CJK Ideograph-58B3 <2740/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58B3, // (墳) CJK Ideograph-58B3 <2740/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA7D, // (墳) CJK COMPATIBILITY IDEOGRAPH-FA7D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "壘" <Same>
		'58D8', // CJK Ideograph-58D8 <2777/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58D8, // (壘) CJK Ideograph-58D8 <2777/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF94A, // (壘) CJK COMPATIBILITY IDEOGRAPH-F94A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "壟" <Same>
		'58DF', // CJK Ideograph-58DF <2784/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58DF, // (壟) CJK Ideograph-58DF <2784/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF942, // (壟) CJK COMPATIBILITY IDEOGRAPH-F942 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡓤" <Same>
		'214E4', // CJK Ideograph Extension B-214E4 <5349/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x214E4, // (𡓤) CJK Ideograph Extension B-214E4 <5349/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F859, // (𡓤) CJK COMPATIBILITY IDEOGRAPH-2F859 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "壮" <Same>
		'58EE', // CJK Ideograph-58EE <2799/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58EE, // (壮) CJK Ideograph-58EE <2799/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F851, // (壮) CJK COMPATIBILITY IDEOGRAPH-2F851 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "売" <Same>
		'58F2', // CJK Ideograph-58F2 <2803/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58F2, // (売) CJK Ideograph-58F2 <2803/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85A, // (売) CJK COMPATIBILITY IDEOGRAPH-2F85A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "壷" <Same>
		'58F7', // CJK Ideograph-58F7 <2808/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58F7, // (壷) CJK Ideograph-58F7 <2808/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85B, // (壷) CJK COMPATIBILITY IDEOGRAPH-2F85B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "夂" <Same>
		'5902', // CJK Ideograph-5902 <2819/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5902, // (夂) CJK Ideograph-5902 <2819/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F21, // (⼡) KANGXI RADICAL GO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "夆" <Same>
		'5906', // CJK Ideograph-5906 <2823/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5906, // (夆) CJK Ideograph-5906 <2823/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85C, // (夆) CJK COMPATIBILITY IDEOGRAPH-2F85C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "夊" <Same>
		'590A', // CJK Ideograph-590A <2827/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x590A, // (夊) CJK Ideograph-590A <2827/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F22, // (⼢) KANGXI RADICAL GO SLOWLY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "夕" <Same>
		'5915', // CJK Ideograph-5915 <2838/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5915, // (夕) CJK Ideograph-5915 <2838/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x30BF, // (タ) KATAKANA LETTER TA [Kana]=>[Kana,Jpan]
		//IDNA:0x2F23, // (⼣) KANGXI RADICAL EVENING [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "多" <Same>
		'591A', // CJK Ideograph-591A <2843/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x591A, // (多) CJK Ideograph-591A <2843/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85D, // (多) CJK COMPATIBILITY IDEOGRAPH-2F85D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "夢" <Same>
		'5922', // CJK Ideograph-5922 <2851/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5922, // (夢) CJK Ideograph-5922 <2851/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85E, // (夢) CJK COMPATIBILITY IDEOGRAPH-2F85E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "大" <Same>
		'5927', // CJK Ideograph-5927 <2856/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5927, // (大) CJK Ideograph-5927 <2856/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F24, // (⼤) KANGXI RADICAL BIG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "奄" <Same>
		'5944', // CJK Ideograph-5944 <2885/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5944, // (奄) CJK Ideograph-5944 <2885/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA7E, // (奄) CJK COMPATIBILITY IDEOGRAPH-FA7E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "奈" <Same>
		'5948', // CJK Ideograph-5948 <2889/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5948, // (奈) CJK Ideograph-5948 <2889/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF90C, // (奈) CJK COMPATIBILITY IDEOGRAPH-F90C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "奔" <Same>
		'5954', // CJK Ideograph-5954 <2901/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5954, // (奔) CJK Ideograph-5954 <2901/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA7F, // (奔) CJK COMPATIBILITY IDEOGRAPH-FA7F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "契" <Same>
		'5951', // CJK Ideograph-5951 <2898/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5951, // (契) CJK Ideograph-5951 <2898/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF909, // (契) CJK COMPATIBILITY IDEOGRAPH-F909 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "奢" <Same>
		'5962', // CJK Ideograph-5962 <2915/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5962, // (奢) CJK Ideograph-5962 <2915/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85F, // (奢) CJK COMPATIBILITY IDEOGRAPH-2F85F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "女" <Same>
		'5973', // CJK Ideograph-5973 <2932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5973, // (女) CJK Ideograph-5973 <2932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF981, // (女) CJK COMPATIBILITY IDEOGRAPH-F981 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F25, // (⼥) KANGXI RADICAL WOMAN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡚨" <Same>
		'216A8', // CJK Ideograph Extension B-216A8 <5801/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x216A8, // (𡚨) CJK Ideograph Extension B-216A8 <5801/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F860, // (𡚨) CJK COMPATIBILITY IDEOGRAPH-2F860 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡛪" <Same>
		'216EA', // CJK Ideograph Extension B-216EA <5867/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x216EA, // (𡛪) CJK Ideograph Extension B-216EA <5867/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F861, // (𡛪) CJK COMPATIBILITY IDEOGRAPH-2F861 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "姘" <Same>
		'59D8', // CJK Ideograph-59D8 <3033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x59D8, // (姘) CJK Ideograph-59D8 <3033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F865, // (姘) CJK COMPATIBILITY IDEOGRAPH-2F865 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "姬" <Same>
		'59EC', // CJK Ideograph-59EC <3053/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x59EC, // (姬) CJK Ideograph-59EC <3053/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F862, // (姬) CJK COMPATIBILITY IDEOGRAPH-2F862 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "娛" <Same>
		'5A1B', // CJK Ideograph-5A1B <3100/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5A1B, // (娛) CJK Ideograph-5A1B <3100/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F863, // (娛) CJK COMPATIBILITY IDEOGRAPH-2F863 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "娧" <Same>
		'5A27', // CJK Ideograph-5A27 <3112/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5A27, // (娧) CJK Ideograph-5A27 <3112/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F864, // (娧) CJK COMPATIBILITY IDEOGRAPH-2F864 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "婢" <Same>
		'5A62', // CJK Ideograph-5A62 <3171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5A62, // (婢) CJK Ideograph-5A62 <3171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA80, // (婢) CJK COMPATIBILITY IDEOGRAPH-FA80 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "婦" <Same>
		'5A66', // CJK Ideograph-5A66 <3175/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5A66, // (婦) CJK Ideograph-5A66 <3175/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F866, // (婦) CJK COMPATIBILITY IDEOGRAPH-2F866 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "媯" <Same>
		'5AAF', // CJK Ideograph-5AAF <3248/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5AAF, // (媯) CJK Ideograph-5AAF <3248/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B00, // (嬀) CJK Ideograph-5B00 <3329/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㛮" <Same>
		'36EE', // CJK Ideograph Extension A-36EE <751/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x36EE, // (㛮) CJK Ideograph Extension A-36EE <751/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F867, // (㛮) CJK COMPATIBILITY IDEOGRAPH-2F867 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㛼" <Same>
		'36FC', // CJK Ideograph Extension A-36FC <765/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x36FC, // (㛼) CJK Ideograph Extension A-36FC <765/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F868, // (㛼) CJK COMPATIBILITY IDEOGRAPH-2F868 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "媵" <Same>
		'5AB5', // CJK Ideograph-5AB5 <3254/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5AB5, // (媵) CJK Ideograph-5AB5 <3254/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F986, // (媵) CJK COMPATIBILITY IDEOGRAPH-2F986 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嬈" <Same>
		'5B08', // CJK Ideograph-5B08 <3337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B08, // (嬈) CJK Ideograph-5B08 <3337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F869, // (嬈) CJK COMPATIBILITY IDEOGRAPH-2F869 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嬨" <Same>
		'5B28', // CJK Ideograph-5B28 <3369/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B28, // (嬨) CJK Ideograph-5B28 <3369/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA81, // (嬨) CJK COMPATIBILITY IDEOGRAPH-FA81 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嬾" <Same>
		'5B3E', // CJK Ideograph-5B3E <3391/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B3E, // (嬾) CJK Ideograph-5B3E <3391/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86A, // (嬾) CJK COMPATIBILITY IDEOGRAPH-2F86A [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86B, // (嬾) CJK COMPATIBILITY IDEOGRAPH-2F86B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "子" <Same>
		'5B50', // CJK Ideograph-5B50 <3409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B50, // (子) CJK Ideograph-5B50 <3409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F26, // (⼦) KANGXI RADICAL CHILD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "宀" <Same>
		'5B80', // CJK Ideograph-5B80 <3457/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B80, // (宀) CJK Ideograph-5B80 <3457/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F27, // (⼧) KANGXI RADICAL ROOF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "宅" <Same>
		'5B85', // CJK Ideograph-5B85 <3462/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5B85, // (宅) CJK Ideograph-5B85 <3462/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA04, // (宅) CJK COMPATIBILITY IDEOGRAPH-FA04 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡧈" <Same>
		'219C8', // CJK Ideograph Extension B-219C8 <6601/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x219C8, // (𡧈) CJK Ideograph Extension B-219C8 <6601/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86C, // (𡧈) CJK COMPATIBILITY IDEOGRAPH-2F86C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寃" <Same>
		'5BC3', // CJK Ideograph-5BC3 <3524/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BC3, // (寃) CJK Ideograph-5BC3 <3524/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86D, // (寃) CJK COMPATIBILITY IDEOGRAPH-2F86D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寘" <Same>
		'5BD8', // CJK Ideograph-5BD8 <3545/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BD8, // (寘) CJK Ideograph-5BD8 <3545/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86E, // (寘) CJK COMPATIBILITY IDEOGRAPH-2F86E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寧" <Same>
		'5BE7', // CJK Ideograph-5BE7 <3560/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BE7, // (寧) CJK Ideograph-5BE7 <3560/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF95F, // (寧) CJK COMPATIBILITY IDEOGRAPH-F95F [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9AA, // (寧) CJK COMPATIBILITY IDEOGRAPH-F9AA [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86F, // (寧) CJK COMPATIBILITY IDEOGRAPH-2F86F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寮" <Same>
		'5BEE', // CJK Ideograph-5BEE <3567/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BEE, // (寮) CJK Ideograph-5BEE <3567/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9BC, // (寮) CJK COMPATIBILITY IDEOGRAPH-F9BC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寳" <Same>
		'5BF3', // CJK Ideograph-5BF3 <3572/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BF3, // (寳) CJK Ideograph-5BF3 <3572/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F870, // (寳) CJK COMPATIBILITY IDEOGRAPH-2F870 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡬘" <Same>
		'21B18', // CJK Ideograph Extension B-21B18 <6937/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x21B18, // (𡬘) CJK Ideograph Extension B-21B18 <6937/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F871, // (𡬘) CJK COMPATIBILITY IDEOGRAPH-2F871 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寸" <Same>
		'5BF8', // CJK Ideograph-5BF8 <3577/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BF8, // (寸) CJK Ideograph-5BF8 <3577/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F28, // (⼨) KANGXI RADICAL INCH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "寿" <Same>
		'5BFF', // CJK Ideograph-5BFF <3584/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5BFF, // (寿) CJK Ideograph-5BFF <3584/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F872, // (寿) CJK COMPATIBILITY IDEOGRAPH-2F872 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "将" <Same>
		'5C06', // CJK Ideograph-5C06 <3591/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C06, // (将) CJK Ideograph-5C06 <3591/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F873, // (将) CJK COMPATIBILITY IDEOGRAPH-2F873 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "小" <Same>
		'5C0F', // CJK Ideograph-5C0F <3600/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C0F, // (小) CJK Ideograph-5C0F <3600/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F29, // (⼩) KANGXI RADICAL SMALL [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "尢" <Same>
		'5C22', // CJK Ideograph-5C22 <3619/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C22, // (尢) CJK Ideograph-5C22 <3619/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F875, // (尢) CJK COMPATIBILITY IDEOGRAPH-2F875 [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E90, // (⺐) CJK RADICAL LAME THREE [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F2A, // (⼪) KANGXI RADICAL LAME [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "尣" <Same>
		'5C23', // CJK Ideograph-5C23 <3620/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C23, // (尣) CJK Ideograph-5C23 <3620/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E8F, // (⺏) CJK RADICAL LAME TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㞁" <Same>
		'3781', // CJK Ideograph Extension A-3781 <898/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3781, // (㞁) CJK Ideograph Extension A-3781 <898/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F876, // (㞁) CJK COMPATIBILITY IDEOGRAPH-2F876 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "尸" <Same>
		'5C38', // CJK Ideograph-5C38 <3641/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C38, // (尸) CJK Ideograph-5C38 <3641/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F2B, // (⼫) KANGXI RADICAL CORPSE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "尿" <Same>
		'5C3F', // CJK Ideograph-5C3F <3648/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C3F, // (尿) CJK Ideograph-5C3F <3648/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9BD, // (尿) CJK COMPATIBILITY IDEOGRAPH-F9BD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "屠" <Same>
		'5C60', // CJK Ideograph-5C60 <3681/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C60, // (屠) CJK Ideograph-5C60 <3681/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F877, // (屠) CJK COMPATIBILITY IDEOGRAPH-2F877 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "屢" <Same>
		'5C62', // CJK Ideograph-5C62 <3683/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C62, // (屢) CJK Ideograph-5C62 <3683/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF94B, // (屢) CJK COMPATIBILITY IDEOGRAPH-F94B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "層" <Same>
		'5C64', // CJK Ideograph-5C64 <3685/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C64, // (層) CJK Ideograph-5C64 <3685/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA3B, // (層) CJK COMPATIBILITY IDEOGRAPH-FA3B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "履" <Same>
		'5C65', // CJK Ideograph-5C65 <3686/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C65, // (履) CJK Ideograph-5C65 <3686/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9DF, // (履) CJK COMPATIBILITY IDEOGRAPH-F9DF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "屮" <Same>
		'5C6E', // CJK Ideograph-5C6E <3695/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C6E, // (屮) CJK Ideograph-5C6E <3695/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA3C, // (屮) CJK COMPATIBILITY IDEOGRAPH-FA3C [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F878, // (屮) CJK COMPATIBILITY IDEOGRAPH-2F878 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F2C, // (⼬) KANGXI RADICAL SPROUT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡴋" <Same>
		'21D0B', // CJK Ideograph Extension B-21D0B <7436/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x21D0B, // (𡴋) CJK Ideograph Extension B-21D0B <7436/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F8, // (𡴋) CJK COMPATIBILITY IDEOGRAPH-2F8F8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "山" <Same>
		'5C71', // CJK Ideograph-5C71 <3698/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C71, // (山) CJK Ideograph-5C71 <3698/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F2D, // (⼭) KANGXI RADICAL MOUNTAIN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "峀" <Same>
		'5CC0', // CJK Ideograph-5CC0 <3777/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5CC0, // (峀) CJK Ideograph-5CC0 <3777/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F879, // (峀) CJK COMPATIBILITY IDEOGRAPH-2F879 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "岍" <Same>
		'5C8D', // CJK Ideograph-5C8D <3726/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5C8D, // (岍) CJK Ideograph-5C8D <3726/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87A, // (岍) CJK COMPATIBILITY IDEOGRAPH-2F87A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡷤" <Same>
		'21DE4', // CJK Ideograph Extension B-21DE4 <7653/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x21DE4, // (𡷤) CJK Ideograph Extension B-21DE4 <7653/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87B, // (𡷤) CJK COMPATIBILITY IDEOGRAPH-2F87B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𡷦" <Same>
		'21DE6', // CJK Ideograph Extension B-21DE6 <7655/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x21DE6, // (𡷦) CJK Ideograph Extension B-21DE6 <7655/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87D, // (𡷦) CJK COMPATIBILITY IDEOGRAPH-2F87D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "崙" <Same>
		'5D19', // CJK Ideograph-5D19 <3866/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5D19, // (崙) CJK Ideograph-5D19 <3866/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D5, // (崙) CJK COMPATIBILITY IDEOGRAPH-F9D5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嵃" <Same>
		'5D43', // CJK Ideograph-5D43 <3908/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5D43, // (嵃) CJK Ideograph-5D43 <3908/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87C, // (嵃) CJK COMPATIBILITY IDEOGRAPH-2F87C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嵐" <Same>
		'5D50', // CJK Ideograph-5D50 <3921/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5D50, // (嵐) CJK Ideograph-5D50 <3921/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF921, // (嵐) CJK COMPATIBILITY IDEOGRAPH-F921 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嵫" <Same>
		'5D6B', // CJK Ideograph-5D6B <3948/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5D6B, // (嵫) CJK Ideograph-5D6B <3948/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87F, // (嵫) CJK COMPATIBILITY IDEOGRAPH-2F87F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嵮" <Same>
		'5D6E', // CJK Ideograph-5D6E <3951/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5D6E, // (嵮) CJK Ideograph-5D6E <3951/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87E, // (嵮) CJK COMPATIBILITY IDEOGRAPH-2F87E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嵼" <Same>
		'5D7C', // CJK Ideograph-5D7C <3965/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5D7C, // (嵼) CJK Ideograph-5D7C <3965/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F880, // (嵼) CJK COMPATIBILITY IDEOGRAPH-2F880 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嶲" <Same>
		'5DB2', // CJK Ideograph-5DB2 <4019/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DB2, // (嶲) CJK Ideograph-5DB2 <4019/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F4, // (嶲) CJK COMPATIBILITY IDEOGRAPH-2F9F4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "嶺" <Same>
		'5DBA', // CJK Ideograph-5DBA <4027/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DBA, // (嶺) CJK Ideograph-5DBA <4027/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9AB, // (嶺) CJK COMPATIBILITY IDEOGRAPH-F9AB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "巛" <Same>
		'5DDB', // CJK Ideograph-5DDB <4060/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DDB, // (巛) CJK Ideograph-5DDB <4060/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F2E, // (⼮) KANGXI RADICAL RIVER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "巢" <Same>
		'5DE2', // CJK Ideograph-5DE2 <4067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DE2, // (巢) CJK Ideograph-5DE2 <4067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F882, // (巢) CJK COMPATIBILITY IDEOGRAPH-2F882 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "工" <Same>
		'5DE5', // CJK Ideograph-5DE5 <4070/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DE5, // (工) CJK Ideograph-5DE5 <4070/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x30A8, // (エ) KATAKANA LETTER E [Kana]=>[Kana,Jpan]
		//IDNA:0x2F2F, // (⼯) KANGXI RADICAL WORK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "己" <Same>
		'5DF1', // CJK Ideograph-5DF1 <4082/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DF1, // (己) CJK Ideograph-5DF1 <4082/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F30, // (⼰) KANGXI RADICAL ONESELF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "巳" <Same>
		'5DF3', // CJK Ideograph-5DF3 <4084/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DF3, // (巳) CJK Ideograph-5DF3 <4084/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E92, // (⺒) CJK RADICAL SNAKE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㠯" <Same>
		'382F', // CJK Ideograph Extension A-382F <1072/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x382F, // (㠯) CJK Ideograph Extension A-382F <1072/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F883, // (㠯) CJK COMPATIBILITY IDEOGRAPH-2F883 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "巽" <Same>
		'5DFD', // CJK Ideograph-5DFD <4094/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DFD, // (巽) CJK Ideograph-5DFD <4094/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F884, // (巽) CJK COMPATIBILITY IDEOGRAPH-2F884 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "巾" <Same>
		'5DFE', // CJK Ideograph-5DFE <4095/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DFE, // (巾) CJK Ideograph-5DFE <4095/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F31, // (⼱) KANGXI RADICAL TURBAN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "帡" <Same>
		'5E21', // CJK Ideograph-5E21 <4130/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E21, // (帡) CJK Ideograph-5E21 <4130/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E32, // (帲) CJK Ideograph-5E32 <4147/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "帨" <Same>
		'5E28', // CJK Ideograph-5E28 <4137/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E28, // (帨) CJK Ideograph-5E28 <4137/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F885, // (帨) CJK COMPATIBILITY IDEOGRAPH-2F885 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "帽" <Same>
		'5E3D', // CJK Ideograph-5E3D <4158/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E3D, // (帽) CJK Ideograph-5E3D <4158/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F886, // (帽) CJK COMPATIBILITY IDEOGRAPH-2F886 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "幩" <Same>
		'5E69', // CJK Ideograph-5E69 <4202/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E69, // (幩) CJK Ideograph-5E69 <4202/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F887, // (幩) CJK COMPATIBILITY IDEOGRAPH-2F887 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㡢" <Same>
		'3862', // CJK Ideograph Extension A-3862 <1123/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3862, // (㡢) CJK Ideograph Extension A-3862 <1123/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F888, // (㡢) CJK COMPATIBILITY IDEOGRAPH-2F888 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢆃" <Same>
		'22183', // CJK Ideograph Extension B-22183 <8580/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x22183, // (𢆃) CJK Ideograph Extension B-22183 <8580/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F889, // (𢆃) CJK COMPATIBILITY IDEOGRAPH-2F889 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "干" <Same>
		'5E72', // CJK Ideograph-5E72 <4211/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E72, // (干) CJK Ideograph-5E72 <4211/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F32, // (⼲) KANGXI RADICAL DRY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "年" <Same>
		'5E74', // CJK Ideograph-5E74 <4213/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E74, // (年) CJK Ideograph-5E74 <4213/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF98E, // (年) CJK COMPATIBILITY IDEOGRAPH-F98E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢆟" <Same>
		'2219F', // CJK Ideograph Extension B-2219F <8608/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2219F, // (𢆟) CJK Ideograph Extension B-2219F <8608/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F939, // (𢆟) CJK COMPATIBILITY IDEOGRAPH-2F939 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "幺" <Same>
		'5E7A', // CJK Ideograph-5E7A <4219/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E7A, // (幺) CJK Ideograph-5E7A <4219/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E93, // (⺓) CJK RADICAL THREAD [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F33, // (⼳) KANGXI RADICAL SHORT THREAD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "广" <Same>
		'5E7F', // CJK Ideograph-5E7F <4224/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E7F, // (广) CJK Ideograph-5E7F <4224/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F34, // (⼴) KANGXI RADICAL DOTTED CLIFF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "度" <Same>
		'5EA6', // CJK Ideograph-5EA6 <4263/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EA6, // (度) CJK Ideograph-5EA6 <4263/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA01, // (度) CJK COMPATIBILITY IDEOGRAPH-FA01 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㡼" <Same>
		'387C', // CJK Ideograph Extension A-387C <1149/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x387C, // (㡼) CJK Ideograph Extension A-387C <1149/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88A, // (㡼) CJK COMPATIBILITY IDEOGRAPH-2F88A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "庰" <Same>
		'5EB0', // CJK Ideograph-5EB0 <4273/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EB0, // (庰) CJK Ideograph-5EB0 <4273/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88B, // (庰) CJK COMPATIBILITY IDEOGRAPH-2F88B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "庳" <Same>
		'5EB3', // CJK Ideograph-5EB3 <4276/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EB3, // (庳) CJK Ideograph-5EB3 <4276/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88C, // (庳) CJK COMPATIBILITY IDEOGRAPH-2F88C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "庶" <Same>
		'5EB6', // CJK Ideograph-5EB6 <4279/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EB6, // (庶) CJK Ideograph-5EB6 <4279/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88D, // (庶) CJK COMPATIBILITY IDEOGRAPH-2F88D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廊" <Same>
		'5ECA', // CJK Ideograph-5ECA <4299/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5ECA, // (廊) CJK Ideograph-5ECA <4299/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF928, // (廊) CJK COMPATIBILITY IDEOGRAPH-F928 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88E, // (廊) CJK COMPATIBILITY IDEOGRAPH-2F88E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廉" <Same>
		'5EC9', // CJK Ideograph-5EC9 <4298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EC9, // (廉) CJK Ideograph-5EC9 <4298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A2, // (廉) CJK COMPATIBILITY IDEOGRAPH-F9A2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廒" <Same>
		'5ED2', // CJK Ideograph-5ED2 <4307/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5ED2, // (廒) CJK Ideograph-5ED2 <4307/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA82, // (廒) CJK COMPATIBILITY IDEOGRAPH-FA82 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廓" <Same>
		'5ED3', // CJK Ideograph-5ED3 <4308/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5ED3, // (廓) CJK Ideograph-5ED3 <4308/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA0B, // (廓) CJK COMPATIBILITY IDEOGRAPH-FA0B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廙" <Same>
		'5ED9', // CJK Ideograph-5ED9 <4314/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5ED9, // (廙) CJK Ideograph-5ED9 <4314/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA83, // (廙) CJK COMPATIBILITY IDEOGRAPH-FA83 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廬" <Same>
		'5EEC', // CJK Ideograph-5EEC <4333/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EEC, // (廬) CJK Ideograph-5EEC <4333/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF982, // (廬) CJK COMPATIBILITY IDEOGRAPH-F982 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廴" <Same>
		'5EF4', // CJK Ideograph-5EF4 <4341/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EF4, // (廴) CJK Ideograph-5EF4 <4341/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F35, // (⼵) KANGXI RADICAL LONG STRIDE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "廾" <Same>
		'5EFE', // CJK Ideograph-5EFE <4351/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5EFE, // (廾) CJK Ideograph-5EFE <4351/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F890, // (廾) CJK COMPATIBILITY IDEOGRAPH-2F890 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F36, // (⼶) KANGXI RADICAL TWO HANDS [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢌱" <Same>
		'22331', // CJK Ideograph Extension B-22331 <9010/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x22331, // (𢌱) CJK Ideograph Extension B-22331 <9010/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F891, // (𢌱) CJK COMPATIBILITY IDEOGRAPH-2F891 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F892, // (𢌱) CJK COMPATIBILITY IDEOGRAPH-2F892 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "弄" <Same>
		'5F04', // CJK Ideograph-5F04 <4357/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F04, // (弄) CJK Ideograph-5F04 <4357/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF943, // (弄) CJK COMPATIBILITY IDEOGRAPH-F943 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "弋" <Same>
		'5F0B', // CJK Ideograph-5F0B <4364/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F0B, // (弋) CJK Ideograph-5F0B <4364/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F37, // (⼷) KANGXI RADICAL SHOOT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "弓" <Same>
		'5F13', // CJK Ideograph-5F13 <4372/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F13, // (弓) CJK Ideograph-5F13 <4372/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F38, // (⼸) KANGXI RADICAL BOW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "弢" <Same>
		'5F22', // CJK Ideograph-5F22 <4387/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F22, // (弢) CJK Ideograph-5F22 <4387/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F894, // (弢) CJK COMPATIBILITY IDEOGRAPH-2F894 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F895, // (弢) CJK COMPATIBILITY IDEOGRAPH-2F895 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "彐" <Same>
		'5F50', // CJK Ideograph-5F50 <4433/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F50, // (彐) CJK Ideograph-5F50 <4433/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F39, // (⼹) KANGXI RADICAL SNOUT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "彑" <Same>
		'5F51', // CJK Ideograph-5F51 <4434/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F51, // (彑) CJK Ideograph-5F51 <4434/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E94, // (⺔) CJK RADICAL SNOUT ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "当" <Same>
		'5F53', // CJK Ideograph-5F53 <4436/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F53, // (当) CJK Ideograph-5F53 <4436/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F874, // (当) CJK COMPATIBILITY IDEOGRAPH-2F874 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㣇" <Same>
		'38C7', // CJK Ideograph Extension A-38C7 <1224/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x38C7, // (㣇) CJK Ideograph Extension A-38C7 <1224/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F896, // (㣇) CJK COMPATIBILITY IDEOGRAPH-2F896 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "彡" <Same>
		'5F61', // CJK Ideograph-5F61 <4450/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F61, // (彡) CJK Ideograph-5F61 <4450/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F3A, // (⼺) KANGXI RADICAL BRISTLE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "形" <Same>
		'5F62', // CJK Ideograph-5F62 <4451/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F62, // (形) CJK Ideograph-5F62 <4451/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F899, // (形) CJK COMPATIBILITY IDEOGRAPH-2F899 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "彩" <Same>
		'5F69', // CJK Ideograph-5F69 <4458/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F69, // (彩) CJK Ideograph-5F69 <4458/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA84, // (彩) CJK COMPATIBILITY IDEOGRAPH-FA84 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "彫" <Same>
		'5F6B', // CJK Ideograph-5F6B <4460/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F6B, // (彫) CJK Ideograph-5F6B <4460/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89A, // (彫) CJK COMPATIBILITY IDEOGRAPH-2F89A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "彳" <Same>
		'5F73', // CJK Ideograph-5F73 <4468/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F73, // (彳) CJK Ideograph-5F73 <4468/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F3B, // (⼻) KANGXI RADICAL STEP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "律" <Same>
		'5F8B', // CJK Ideograph-5F8B <4492/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F8B, // (律) CJK Ideograph-5F8B <4492/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D8, // (律) CJK COMPATIBILITY IDEOGRAPH-F9D8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㣣" <Same>
		'38E3', // CJK Ideograph Extension A-38E3 <1252/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x38E3, // (㣣) CJK Ideograph Extension A-38E3 <1252/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89B, // (㣣) CJK COMPATIBILITY IDEOGRAPH-2F89B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "徚" <Same>
		'5F9A', // CJK Ideograph-5F9A <4507/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5F9A, // (徚) CJK Ideograph-5F9A <4507/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89C, // (徚) CJK COMPATIBILITY IDEOGRAPH-2F89C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "復" <Same>
		'5FA9', // CJK Ideograph-5FA9 <4522/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FA9, // (復) CJK Ideograph-5FA9 <4522/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF966, // (復) CJK COMPATIBILITY IDEOGRAPH-F966 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "徭" <Same>
		'5FAD', // CJK Ideograph-5FAD <4526/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FAD, // (徭) CJK Ideograph-5FAD <4526/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA85, // (徭) CJK COMPATIBILITY IDEOGRAPH-FA85 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "心" <Same>
		'5FC3', // CJK Ideograph-5FC3 <4548/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FC3, // (心) CJK Ideograph-5FC3 <4548/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F3C, // (⼼) KANGXI RADICAL HEART [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "忄" <Same>
		'5FC4', // CJK Ideograph-5FC4 <4549/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FC4, // (忄) CJK Ideograph-5FC4 <4549/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E96, // (⺖) CJK RADICAL HEART ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㣺" <Same>
		'38FA', // CJK Ideograph Extension A-38FA <1275/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x38FA, // (㣺) CJK Ideograph Extension A-38FA <1275/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E97, // (⺗) CJK RADICAL HEART TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "忍" <Same>
		'5FCD', // CJK Ideograph-5FCD <4558/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FCD, // (忍) CJK Ideograph-5FCD <4558/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89D, // (忍) CJK COMPATIBILITY IDEOGRAPH-2F89D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "志" <Same>
		'5FD7', // CJK Ideograph-5FD7 <4568/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FD7, // (志) CJK Ideograph-5FD7 <4568/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89E, // (志) CJK COMPATIBILITY IDEOGRAPH-2F89E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "念" <Same>
		'5FF5', // CJK Ideograph-5FF5 <4598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FF5, // (念) CJK Ideograph-5FF5 <4598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A3, // (念) CJK COMPATIBILITY IDEOGRAPH-F9A3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "忹" <Same>
		'5FF9', // CJK Ideograph-5FF9 <4602/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5FF9, // (忹) CJK Ideograph-5FF9 <4602/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89F, // (忹) CJK COMPATIBILITY IDEOGRAPH-2F89F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "怒" <Same>
		'6012', // CJK Ideograph-6012 <4627/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6012, // (怒) CJK Ideograph-6012 <4627/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF960, // (怒) CJK COMPATIBILITY IDEOGRAPH-F960 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "怜" <Same>
		'601C', // CJK Ideograph-601C <4637/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x601C, // (怜) CJK Ideograph-601C <4637/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9AC, // (怜) CJK COMPATIBILITY IDEOGRAPH-F9AC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "恵" <Same>
		'6075', // CJK Ideograph-6075 <4726/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6075, // (恵) CJK Ideograph-6075 <4726/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA6B, // (恵) CJK COMPATIBILITY IDEOGRAPH-FA6B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㤜" <Same>
		'391C', // CJK Ideograph Extension A-391C <1309/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x391C, // (㤜) CJK Ideograph Extension A-391C <1309/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A2, // (㤜) CJK COMPATIBILITY IDEOGRAPH-2F8A2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㤺" <Same>
		'393A', // CJK Ideograph Extension A-393A <1339/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x393A, // (㤺) CJK Ideograph Extension A-393A <1339/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A1, // (㤺) CJK COMPATIBILITY IDEOGRAPH-2F8A1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "悁" <Same>
		'6081', // CJK Ideograph-6081 <4738/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6081, // (悁) CJK Ideograph-6081 <4738/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A0, // (悁) CJK COMPATIBILITY IDEOGRAPH-2F8A0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "悔" <Same>
		'6094', // CJK Ideograph-6094 <4757/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6094, // (悔) CJK Ideograph-6094 <4757/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA3D, // (悔) CJK COMPATIBILITY IDEOGRAPH-FA3D [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A3, // (悔) CJK COMPATIBILITY IDEOGRAPH-2F8A3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "惇" <Same>
		'60C7', // CJK Ideograph-60C7 <4808/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x60C7, // (惇) CJK Ideograph-60C7 <4808/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A5, // (惇) CJK COMPATIBILITY IDEOGRAPH-2F8A5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "惘" <Same>
		'60D8', // CJK Ideograph-60D8 <4825/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x60D8, // (惘) CJK Ideograph-60D8 <4825/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA86, // (惘) CJK COMPATIBILITY IDEOGRAPH-FA86 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "惡" <Same>
		'60E1', // CJK Ideograph-60E1 <4834/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x60E1, // (惡) CJK Ideograph-60E1 <4834/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B9, // (惡) CJK COMPATIBILITY IDEOGRAPH-F9B9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢛔" <Same>
		'226D4', // CJK Ideograph Extension B-226D4 <9941/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x226D4, // (𢛔) CJK Ideograph Extension B-226D4 <9941/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A4, // (𢛔) CJK COMPATIBILITY IDEOGRAPH-2F8A4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "愈" <Same>
		'6108', // CJK Ideograph-6108 <4873/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6108, // (愈) CJK Ideograph-6108 <4873/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA88, // (愈) CJK COMPATIBILITY IDEOGRAPH-FA88 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慨" <Same>
		'6168', // CJK Ideograph-6168 <4969/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6168, // (慨) CJK Ideograph-6168 <4969/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA3E, // (慨) CJK COMPATIBILITY IDEOGRAPH-FA3E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慄" <Same>
		'6144', // CJK Ideograph-6144 <4933/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6144, // (慄) CJK Ideograph-6144 <4933/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D9, // (慄) CJK COMPATIBILITY IDEOGRAPH-F9D9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慈" <Same>
		'6148', // CJK Ideograph-6148 <4937/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6148, // (慈) CJK Ideograph-6148 <4937/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A6, // (慈) CJK COMPATIBILITY IDEOGRAPH-2F8A6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慌" <Same>
		'614C', // CJK Ideograph-614C <4941/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x614C, // (慌) CJK Ideograph-614C <4941/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A7, // (慌) CJK COMPATIBILITY IDEOGRAPH-2F8A7 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A9, // (慌) CJK COMPATIBILITY IDEOGRAPH-2F8A9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慎" <Same>
		'614E', // CJK Ideograph-614E <4943/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x614E, // (慎) CJK Ideograph-614E <4943/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA87, // (慎) CJK COMPATIBILITY IDEOGRAPH-FA87 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A8, // (慎) CJK COMPATIBILITY IDEOGRAPH-2F8A8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慠" <Same>
		'6160', // CJK Ideograph-6160 <4961/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6160, // (慠) CJK Ideograph-6160 <4961/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA8A, // (慠) CJK COMPATIBILITY IDEOGRAPH-FA8A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "慺" <Same>
		'617A', // CJK Ideograph-617A <4987/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x617A, // (慺) CJK Ideograph-617A <4987/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8AA, // (慺) CJK COMPATIBILITY IDEOGRAPH-2F8AA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "憎" <Same>
		'618E', // CJK Ideograph-618E <5007/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x618E, // (憎) CJK Ideograph-618E <5007/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA3F, // (憎) CJK COMPATIBILITY IDEOGRAPH-FA3F [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA89, // (憎) CJK COMPATIBILITY IDEOGRAPH-FA89 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8AB, // (憎) CJK COMPATIBILITY IDEOGRAPH-2F8AB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "憐" <Same>
		'6190', // CJK Ideograph-6190 <5009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6190, // (憐) CJK Ideograph-6190 <5009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF98F, // (憐) CJK COMPATIBILITY IDEOGRAPH-F98F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "憤" <Same>
		'61A4', // CJK Ideograph-61A4 <5029/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x61A4, // (憤) CJK Ideograph-61A4 <5029/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8AD, // (憤) CJK COMPATIBILITY IDEOGRAPH-2F8AD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "憯" <Same>
		'61AF', // CJK Ideograph-61AF <5040/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x61AF, // (憯) CJK Ideograph-61AF <5040/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8AE, // (憯) CJK COMPATIBILITY IDEOGRAPH-2F8AE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "憲" <Same>
		'61B2', // CJK Ideograph-61B2 <5043/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x61B2, // (憲) CJK Ideograph-61B2 <5043/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8AC, // (憲) CJK COMPATIBILITY IDEOGRAPH-2F8AC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢡄" <Same>
		'22844', // CJK Ideograph Extension B-22844 <10309/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x22844, // (𢡄) CJK Ideograph Extension B-22844 <10309/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD0, // (𢡄) CJK COMPATIBILITY IDEOGRAPH-FAD0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢡊" <Same>
		'2284A', // CJK Ideograph Extension B-2284A <10315/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2284A, // (𢡊) CJK Ideograph Extension B-2284A <10315/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFACF, // (𢡊) CJK COMPATIBILITY IDEOGRAPH-FACF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "懞" <Same>
		'61DE', // CJK Ideograph-61DE <5087/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x61DE, // (懞) CJK Ideograph-61DE <5087/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8AF, // (懞) CJK COMPATIBILITY IDEOGRAPH-2F8AF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "懲" <Same>
		'61F2', // CJK Ideograph-61F2 <5107/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x61F2, // (懲) CJK Ideograph-61F2 <5107/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA40, // (懲) CJK COMPATIBILITY IDEOGRAPH-FA40 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA8B, // (懲) CJK COMPATIBILITY IDEOGRAPH-FA8B [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B0, // (懲) CJK COMPATIBILITY IDEOGRAPH-2F8B0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "懶" <Same>
		'61F6', // CJK Ideograph-61F6 <5111/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x61F6, // (懶) CJK Ideograph-61F6 <5111/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF90D, // (懶) CJK COMPATIBILITY IDEOGRAPH-F90D [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B1, // (懶) CJK COMPATIBILITY IDEOGRAPH-2F8B1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "戀" <Same>
		'6200', // CJK Ideograph-6200 <5121/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6200, // (戀) CJK Ideograph-6200 <5121/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF990, // (戀) CJK COMPATIBILITY IDEOGRAPH-F990 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "戈" <Same>
		'6208', // CJK Ideograph-6208 <5129/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6208, // (戈) CJK Ideograph-6208 <5129/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F3D, // (⼽) KANGXI RADICAL HALBERD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "成" <Same>
		'6210', // CJK Ideograph-6210 <5137/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6210, // (成) CJK Ideograph-6210 <5137/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B2, // (成) CJK COMPATIBILITY IDEOGRAPH-2F8B2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "戛" <Same>
		'621B', // CJK Ideograph-621B <5148/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x621B, // (戛) CJK Ideograph-621B <5148/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B3, // (戛) CJK COMPATIBILITY IDEOGRAPH-2F8B3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "戮" <Same>
		'622E', // CJK Ideograph-622E <5167/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x622E, // (戮) CJK Ideograph-622E <5167/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D2, // (戮) CJK COMPATIBILITY IDEOGRAPH-F9D2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "戴" <Same>
		'6234', // CJK Ideograph-6234 <5173/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6234, // (戴) CJK Ideograph-6234 <5173/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA8C, // (戴) CJK COMPATIBILITY IDEOGRAPH-FA8C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "戶" <Same>
		'6236', // CJK Ideograph-6236 <5175/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6236, // (戶) CJK Ideograph-6236 <5175/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F3E, // (⼾) KANGXI RADICAL DOOR [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6238, // (戸) CJK Ideograph-6238 <5177/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "手" <Same>
		'624B', // CJK Ideograph-624B <5196/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x624B, // (手) CJK Ideograph-624B <5196/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F3F, // (⼿) KANGXI RADICAL HAND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "扌" <Same>
		'624C', // CJK Ideograph-624C <5197/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x624C, // (扌) CJK Ideograph-624C <5197/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E98, // (⺘) CJK RADICAL HAND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "扝" <Same>
		'625D', // CJK Ideograph-625D <5214/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x625D, // (扝) CJK Ideograph-625D <5214/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B4, // (扝) CJK COMPATIBILITY IDEOGRAPH-2F8B4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "抱" <Same>
		'62B1', // CJK Ideograph-62B1 <5298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62B1, // (抱) CJK Ideograph-62B1 <5298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B5, // (抱) CJK COMPATIBILITY IDEOGRAPH-2F8B5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "拉" <Same>
		'62C9', // CJK Ideograph-62C9 <5322/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62C9, // (拉) CJK Ideograph-62C9 <5322/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF925, // (拉) CJK COMPATIBILITY IDEOGRAPH-F925 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "拏" <Same>
		'62CF', // CJK Ideograph-62CF <5328/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62CF, // (拏) CJK Ideograph-62CF <5328/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF95B, // (拏) CJK COMPATIBILITY IDEOGRAPH-F95B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "拓" <Same>
		'62D3', // CJK Ideograph-62D3 <5332/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62D3, // (拓) CJK Ideograph-62D3 <5332/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA02, // (拓) CJK COMPATIBILITY IDEOGRAPH-FA02 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "拔" <Same>
		'62D4', // CJK Ideograph-62D4 <5333/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62D4, // (拔) CJK Ideograph-62D4 <5333/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B6, // (拔) CJK COMPATIBILITY IDEOGRAPH-2F8B6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "拼" <Same>
		'62FC', // CJK Ideograph-62FC <5373/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62FC, // (拼) CJK Ideograph-62FC <5373/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8BA, // (拼) CJK COMPATIBILITY IDEOGRAPH-2F8BA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "拾" <Same>
		'62FE', // CJK Ideograph-62FE <5375/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x62FE, // (拾) CJK Ideograph-62FE <5375/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF973, // (拾) CJK COMPATIBILITY IDEOGRAPH-F973 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢬌" <Same>
		'22B0C', // CJK Ideograph Extension B-22B0C <11021/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x22B0C, // (𢬌) CJK Ideograph Extension B-22B0C <11021/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B8, // (𢬌) CJK COMPATIBILITY IDEOGRAPH-2F8B8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "挽" <Same>
		'633D', // CJK Ideograph-633D <5438/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x633D, // (挽) CJK Ideograph-633D <5438/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B9, // (挽) CJK COMPATIBILITY IDEOGRAPH-2F8B9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "捐" <Same>
		'6350', // CJK Ideograph-6350 <5457/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6350, // (捐) CJK Ideograph-6350 <5457/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B7, // (捐) CJK COMPATIBILITY IDEOGRAPH-2F8B7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "捨" <Same>
		'6368', // CJK Ideograph-6368 <5481/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6368, // (捨) CJK Ideograph-6368 <5481/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8BB, // (捨) CJK COMPATIBILITY IDEOGRAPH-2F8BB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "捻" <Same>
		'637B', // CJK Ideograph-637B <5500/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x637B, // (捻) CJK Ideograph-637B <5500/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A4, // (捻) CJK COMPATIBILITY IDEOGRAPH-F9A4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "掃" <Same>
		'6383', // CJK Ideograph-6383 <5508/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6383, // (掃) CJK Ideograph-6383 <5508/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8BC, // (掃) CJK COMPATIBILITY IDEOGRAPH-2F8BC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "掠" <Same>
		'63A0', // CJK Ideograph-63A0 <5537/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x63A0, // (掠) CJK Ideograph-63A0 <5537/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF975, // (掠) CJK COMPATIBILITY IDEOGRAPH-F975 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "掩" <Same>
		'63A9', // CJK Ideograph-63A9 <5546/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x63A9, // (掩) CJK Ideograph-63A9 <5546/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C1, // (掩) CJK COMPATIBILITY IDEOGRAPH-2F8C1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "揄" <Same>
		'63C4', // CJK Ideograph-63C4 <5573/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x63C4, // (揄) CJK Ideograph-63C4 <5573/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA8D, // (揄) CJK COMPATIBILITY IDEOGRAPH-FA8D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "揤" <Same>
		'63E4', // CJK Ideograph-63E4 <5605/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x63E4, // (揤) CJK Ideograph-63E4 <5605/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8BD, // (揤) CJK COMPATIBILITY IDEOGRAPH-2F8BD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "摒" <Same>
		'6452', // CJK Ideograph-6452 <5715/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6452, // (摒) CJK Ideograph-6452 <5715/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA8F, // (摒) CJK COMPATIBILITY IDEOGRAPH-FA8F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𢯱" <Same>
		'22BF1', // CJK Ideograph Extension B-22BF1 <11250/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x22BF1, // (𢯱) CJK Ideograph Extension B-22BF1 <11250/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8BE, // (𢯱) CJK COMPATIBILITY IDEOGRAPH-2F8BE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "搜" <Same>
		'641C', // CJK Ideograph-641C <5661/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x641C, // (搜) CJK Ideograph-641C <5661/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA8E, // (搜) CJK COMPATIBILITY IDEOGRAPH-FA8E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "搢" <Same>
		'6422', // CJK Ideograph-6422 <5667/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6422, // (搢) CJK Ideograph-6422 <5667/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8BF, // (搢) CJK COMPATIBILITY IDEOGRAPH-2F8BF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "揅" <Same>
		'63C5', // CJK Ideograph-63C5 <5574/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x63C5, // (揅) CJK Ideograph-63C5 <5574/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C0, // (揅) CJK COMPATIBILITY IDEOGRAPH-2F8C0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "摩" <Same>
		'6469', // CJK Ideograph-6469 <5738/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6469, // (摩) CJK Ideograph-6469 <5738/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C3, // (摩) CJK COMPATIBILITY IDEOGRAPH-2F8C3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "摷" <Same>
		'6477', // CJK Ideograph-6477 <5752/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6477, // (摷) CJK Ideograph-6477 <5752/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C6, // (摷) CJK COMPATIBILITY IDEOGRAPH-2F8C6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "摾" <Same>
		'647E', // CJK Ideograph-647E <5759/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x647E, // (摾) CJK Ideograph-647E <5759/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C4, // (摾) CJK COMPATIBILITY IDEOGRAPH-2F8C4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㨮" <Same>
		'3A2E', // CJK Ideograph Extension A-3A2E <1583/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3A2E, // (㨮) CJK Ideograph Extension A-3A2E <1583/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C2, // (㨮) CJK COMPATIBILITY IDEOGRAPH-2F8C2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㩁" <Same>
		'3A41', // CJK Ideograph Extension A-3A41 <1602/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3A41, // (㩁) CJK Ideograph Extension A-3A41 <1602/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6409, // (搉) CJK Ideograph-6409 <5642/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "撚" <Same>
		'649A', // CJK Ideograph-649A <5787/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x649A, // (撚) CJK Ideograph-649A <5787/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF991, // (撚) CJK COMPATIBILITY IDEOGRAPH-F991 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "撝" <Same>
		'649D', // CJK Ideograph-649D <5790/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x649D, // (撝) CJK Ideograph-649D <5790/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C5, // (撝) CJK COMPATIBILITY IDEOGRAPH-2F8C5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "擄" <Same>
		'64C4', // CJK Ideograph-64C4 <5829/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x64C4, // (擄) CJK Ideograph-64C4 <5829/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF930, // (擄) CJK COMPATIBILITY IDEOGRAPH-F930 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㩬" <Same>
		'3A6C', // CJK Ideograph Extension A-3A6C <1645/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3A6C, // (㩬) CJK Ideograph Extension A-3A6C <1645/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C7, // (㩬) CJK COMPATIBILITY IDEOGRAPH-2F8C7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "支" <Same>
		'652F', // CJK Ideograph-652F <5936/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x652F, // (支) CJK Ideograph-652F <5936/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F40, // (⽀) KANGXI RADICAL BRANCH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "攴" <Same>
		'6534', // CJK Ideograph-6534 <5941/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6534, // (攴) CJK Ideograph-6534 <5941/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F41, // (⽁) KANGXI RADICAL RAP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "攵" <Same>
		'6535', // CJK Ideograph-6535 <5942/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6535, // (攵) CJK Ideograph-6535 <5942/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E99, // (⺙) CJK RADICAL RAP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "敏" <Same>
		'654F', // CJK Ideograph-654F <5968/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x654F, // (敏) CJK Ideograph-654F <5968/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA41, // (敏) CJK COMPATIBILITY IDEOGRAPH-FA41 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C8, // (敏) CJK COMPATIBILITY IDEOGRAPH-2F8C8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "敖" <Same>
		'6556', // CJK Ideograph-6556 <5975/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6556, // (敖) CJK Ideograph-6556 <5975/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA90, // (敖) CJK COMPATIBILITY IDEOGRAPH-FA90 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "敬" <Same>
		'656C', // CJK Ideograph-656C <5997/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x656C, // (敬) CJK Ideograph-656C <5997/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C9, // (敬) CJK COMPATIBILITY IDEOGRAPH-2F8C9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "數" <Same>
		'6578', // CJK Ideograph-6578 <6009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6578, // (數) CJK Ideograph-6578 <6009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF969, // (數) CJK COMPATIBILITY IDEOGRAPH-F969 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣀊" <Same>
		'2300A', // CJK Ideograph Extension B-2300A <12299/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2300A, // (𣀊) CJK Ideograph Extension B-2300A <12299/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8CA, // (𣀊) CJK COMPATIBILITY IDEOGRAPH-2F8CA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "文" <Same>
		'6587', // CJK Ideograph-6587 <6024/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6587, // (文) CJK Ideograph-6587 <6024/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F42, // (⽂) KANGXI RADICAL SCRIPT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "斉" <Same>
		'6589', // CJK Ideograph-6589 <6026/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6589, // (斉) CJK Ideograph-6589 <6026/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EEB, // (⻫) CJK RADICAL J-SIMPLIFIED EVEN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "斗" <Same>
		'6597', // CJK Ideograph-6597 <6040/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6597, // (斗) CJK Ideograph-6597 <6040/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F43, // (⽃) KANGXI RADICAL DIPPER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "料" <Same>
		'6599', // CJK Ideograph-6599 <6042/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6599, // (料) CJK Ideograph-6599 <6042/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9BE, // (料) CJK COMPATIBILITY IDEOGRAPH-F9BE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "斤" <Same>
		'65A4', // CJK Ideograph-65A4 <6053/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65A4, // (斤) CJK Ideograph-65A4 <6053/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F44, // (⽄) KANGXI RADICAL AXE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "方" <Same>
		'65B9', // CJK Ideograph-65B9 <6074/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65B9, // (方) CJK Ideograph-65B9 <6074/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F45, // (⽅) KANGXI RADICAL SQUARE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "旅" <Same>
		'65C5', // CJK Ideograph-65C5 <6086/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65C5, // (旅) CJK Ideograph-65C5 <6086/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF983, // (旅) CJK COMPATIBILITY IDEOGRAPH-F983 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "无" <Same>
		'65E0', // CJK Ideograph-65E0 <6113/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65E0, // (无) CJK Ideograph-65E0 <6113/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F46, // (⽆) KANGXI RADICAL NOT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "旡" <Same>
		'65E1', // CJK Ideograph-65E1 <6114/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65E1, // (旡) CJK Ideograph-65E1 <6114/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E9B, // (⺛) CJK RADICAL CHOKE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "既" <Same>
		'65E2', // CJK Ideograph-65E2 <6115/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65E2, // (既) CJK Ideograph-65E2 <6115/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA42, // (既) CJK COMPATIBILITY IDEOGRAPH-FA42 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "旣" <Same>
		'65E3', // CJK Ideograph-65E3 <6116/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65E3, // (旣) CJK Ideograph-65E3 <6116/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8CB, // (旣) CJK COMPATIBILITY IDEOGRAPH-2F8CB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "日" <Same>
		'65E5', // CJK Ideograph-65E5 <6118/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x65E5, // (日) CJK Ideograph-65E5 <6118/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F47, // (⽇) KANGXI RADICAL SUN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "易" <Same>
		'6613', // CJK Ideograph-6613 <6164/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6613, // (易) CJK Ideograph-6613 <6164/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E0, // (易) CJK COMPATIBILITY IDEOGRAPH-F9E0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㫚" <Same>
		'3ADA', // CJK Ideograph Extension A-3ADA <1755/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3ADA, // (㫚) CJK Ideograph Extension A-3ADA <1755/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x66F6, // (曶) CJK Ideograph-66F6 <6391/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㫤" <Same>
		'3AE4', // CJK Ideograph Extension A-3AE4 <1765/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3AE4, // (㫤) CJK Ideograph Extension A-3AE4 <1765/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D1, // (㫤) CJK COMPATIBILITY IDEOGRAPH-2F8D1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "晉" <Same>
		'6649', // CJK Ideograph-6649 <6218/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6649, // (晉) CJK Ideograph-6649 <6218/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8CD, // (晉) CJK COMPATIBILITY IDEOGRAPH-2F8CD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "晚" <Same>
		'665A', // CJK Ideograph-665A <6235/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x665A, // (晚) CJK Ideograph-665A <6235/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6669, // (晩) CJK Ideograph-6669 <6250/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "晴" <Same>
		'6674', // CJK Ideograph-6674 <6261/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6674, // (晴) CJK Ideograph-6674 <6261/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA12, // (晴) CJK COMPATIBILITY IDEOGRAPH-FA12 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA91, // (晴) CJK COMPATIBILITY IDEOGRAPH-FA91 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "暑" <Same>
		'6691', // CJK Ideograph-6691 <6290/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6691, // (暑) CJK Ideograph-6691 <6290/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA43, // (暑) CJK COMPATIBILITY IDEOGRAPH-FA43 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8CF, // (暑) CJK COMPATIBILITY IDEOGRAPH-2F8CF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "暈" <Same>
		'6688', // CJK Ideograph-6688 <6281/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6688, // (暈) CJK Ideograph-6688 <6281/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C5, // (暈) CJK COMPATIBILITY IDEOGRAPH-F9C5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㬈" <Same>
		'3B08', // CJK Ideograph Extension A-3B08 <1801/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B08, // (㬈) CJK Ideograph Extension A-3B08 <1801/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D0, // (㬈) CJK COMPATIBILITY IDEOGRAPH-2F8D0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "暜" <Same>
		'669C', // CJK Ideograph-669C <6301/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x669C, // (暜) CJK Ideograph-669C <6301/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D5, // (暜) CJK COMPATIBILITY IDEOGRAPH-2F8D5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "暴" <Same>
		'66B4', // CJK Ideograph-66B4 <6325/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x66B4, // (暴) CJK Ideograph-66B4 <6325/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA06, // (暴) CJK COMPATIBILITY IDEOGRAPH-FA06 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "曆" <Same>
		'66C6', // CJK Ideograph-66C6 <6343/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x66C6, // (曆) CJK Ideograph-66C6 <6343/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF98B, // (曆) CJK COMPATIBILITY IDEOGRAPH-F98B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㬙" <Same>
		'3B19', // CJK Ideograph Extension A-3B19 <1818/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B19, // (㬙) CJK Ideograph Extension A-3B19 <1818/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8CE, // (㬙) CJK COMPATIBILITY IDEOGRAPH-2F8CE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣊸" <Same>
		'232B8', // CJK Ideograph Extension B-232B8 <12985/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x232B8, // (𣊸) CJK Ideograph Extension B-232B8 <12985/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F897, // (𣊸) CJK COMPATIBILITY IDEOGRAPH-2F897 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "曰" <Same>
		'66F0', // CJK Ideograph-66F0 <6385/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x66F0, // (曰) CJK Ideograph-66F0 <6385/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F48, // (⽈) KANGXI RADICAL SAY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "更" <Same>
		'66F4', // CJK Ideograph-66F4 <6389/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x66F4, // (更) CJK Ideograph-66F4 <6389/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF901, // (更) CJK COMPATIBILITY IDEOGRAPH-F901 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "書" <Same>
		'66F8', // CJK Ideograph-66F8 <6393/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x66F8, // (書) CJK Ideograph-66F8 <6393/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8CC, // (書) CJK COMPATIBILITY IDEOGRAPH-2F8CC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "月" <Same>
		'6708', // CJK Ideograph-6708 <6409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6708, // (月) CJK Ideograph-6708 <6409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F49, // (⽉) KANGXI RADICAL MOON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣍟" <Same>
		'2335F', // CJK Ideograph Extension B-2335F <13152/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2335F, // (𣍟) CJK Ideograph Extension B-2335F <13152/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F980, // (𣍟) CJK COMPATIBILITY IDEOGRAPH-2F980 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朌" <Same>
		'670C', // CJK Ideograph-670C <6413/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x670C, // (朌) CJK Ideograph-670C <6413/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80A6, // (肦) CJK Ideograph-80A6 <12967/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朏" <Same>
		'670F', // CJK Ideograph-670F <6416/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x670F, // (朏) CJK Ideograph-670F <6416/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80D0, // (胐) CJK Ideograph-80D0 <13009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朐" <Same>
		'6710', // CJK Ideograph-6710 <6417/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6710, // (朐) CJK Ideograph-6710 <6417/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80CA, // (胊) CJK Ideograph-80CA <13003/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朓" <Same>
		'6713', // CJK Ideograph-6713 <6420/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6713, // (朓) CJK Ideograph-6713 <6420/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8101, // (脁) CJK Ideograph-8101 <13058/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㬵" <Same>
		'3B35', // CJK Ideograph Extension A-3B35 <1846/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B35, // (㬵) CJK Ideograph Extension A-3B35 <1846/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80F6, // (胶) CJK Ideograph-80F6 <13047/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朗" <Same>
		'6717', // CJK Ideograph-6717 <6424/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6717, // (朗) CJK Ideograph-6717 <6424/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF929, // (朗) CJK COMPATIBILITY IDEOGRAPH-F929 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA92, // (朗) CJK COMPATIBILITY IDEOGRAPH-FA92 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D8, // (朗) CJK COMPATIBILITY IDEOGRAPH-2F8D8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朘" <Same>
		'6718', // CJK Ideograph-6718 <6425/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6718, // (朘) CJK Ideograph-6718 <6425/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8127, // (脧) CJK Ideograph-8127 <13096/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "望" <Same>
		'671B', // CJK Ideograph-671B <6428/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x671B, // (望) CJK Ideograph-671B <6428/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA93, // (望) CJK COMPATIBILITY IDEOGRAPH-FA93 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D9, // (望) CJK COMPATIBILITY IDEOGRAPH-2F8D9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㬺" <Same>
		'3B3A', // CJK Ideograph Extension A-3B3A <1851/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B3A, // (㬺) CJK Ideograph Extension A-3B3A <1851/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5E50, // (幐) CJK Ideograph-5E50 <4177/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㬻" <Same>
		'3B3B', // CJK Ideograph Extension A-3B3B <1852/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B3B, // (㬻) CJK Ideograph Extension A-3B3B <1852/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4420, // (䐠) CJK Ideograph Extension A-4420 <4129/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣎓" <Same>
		'23393', // CJK Ideograph Extension B-23393 <13204/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23393, // (𣎓) CJK Ideograph Extension B-23393 <13204/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F989, // (𣎓) CJK COMPATIBILITY IDEOGRAPH-2F989 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朣" <Same>
		'6723', // CJK Ideograph-6723 <6436/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6723, // (朣) CJK Ideograph-6723 <6436/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81A7, // (膧) CJK Ideograph-81A7 <13224/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣎜" <Same>
		'2339C', // CJK Ideograph Extension B-2339C <13213/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2339C, // (𣎜) CJK Ideograph Extension B-2339C <13213/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98A, // (𣎜) CJK COMPATIBILITY IDEOGRAPH-2F98A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "木" <Same>
		'6728', // CJK Ideograph-6728 <6441/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6728, // (木) CJK Ideograph-6728 <6441/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F4A, // (⽊) KANGXI RADICAL TREE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "李" <Same>
		'674E', // CJK Ideograph-674E <6479/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x674E, // (李) CJK Ideograph-674E <6479/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E1, // (李) CJK COMPATIBILITY IDEOGRAPH-F9E1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "杓" <Same>
		'6753', // CJK Ideograph-6753 <6484/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6753, // (杓) CJK Ideograph-6753 <6484/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8DC, // (杓) CJK COMPATIBILITY IDEOGRAPH-2F8DC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "杖" <Same>
		'6756', // CJK Ideograph-6756 <6487/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6756, // (杖) CJK Ideograph-6756 <6487/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA94, // (杖) CJK COMPATIBILITY IDEOGRAPH-FA94 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "杞" <Same>
		'675E', // CJK Ideograph-675E <6495/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x675E, // (杞) CJK Ideograph-675E <6495/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8DB, // (杞) CJK COMPATIBILITY IDEOGRAPH-2F8DB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣏃" <Same>
		'233C3', // CJK Ideograph Extension B-233C3 <13252/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x233C3, // (𣏃) CJK Ideograph Extension B-233C3 <13252/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8DD, // (𣏃) CJK COMPATIBILITY IDEOGRAPH-2F8DD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "杮" <Same>
		'676E', // CJK Ideograph-676E <6511/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x676E, // (杮) CJK Ideograph-676E <6511/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x67FF, // (柿) CJK Ideograph-67FF <6656/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "杻" <Same>
		'677B', // CJK Ideograph-677B <6524/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x677B, // (杻) CJK Ideograph-677B <6524/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C8, // (杻) CJK COMPATIBILITY IDEOGRAPH-F9C8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "枅" <Same>
		'6785', // CJK Ideograph-6785 <6534/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6785, // (枅) CJK Ideograph-6785 <6534/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E0, // (枅) CJK COMPATIBILITY IDEOGRAPH-2F8E0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "林" <Same>
		'6797', // CJK Ideograph-6797 <6552/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6797, // (林) CJK Ideograph-6797 <6552/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F4, // (林) CJK COMPATIBILITY IDEOGRAPH-F9F4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㭉" <Same>
		'3B49', // CJK Ideograph Extension A-3B49 <1866/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B49, // (㭉) CJK Ideograph Extension A-3B49 <1866/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8DE, // (㭉) CJK COMPATIBILITY IDEOGRAPH-2F8DE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣏕" <Same>
		'233D5', // CJK Ideograph Extension B-233D5 <13270/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x233D5, // (𣏕) CJK Ideograph Extension B-233D5 <13270/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD1, // (𣏕) CJK COMPATIBILITY IDEOGRAPH-FAD1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "柳" <Same>
		'67F3', // CJK Ideograph-67F3 <6644/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x67F3, // (柳) CJK Ideograph-67F3 <6644/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C9, // (柳) CJK COMPATIBILITY IDEOGRAPH-F9C9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "柺" <Same>
		'67FA', // CJK Ideograph-67FA <6651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x67FA, // (柺) CJK Ideograph-67FA <6651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8DF, // (柺) CJK COMPATIBILITY IDEOGRAPH-2F8DF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "栗" <Same>
		'6817', // CJK Ideograph-6817 <6680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6817, // (栗) CJK Ideograph-6817 <6680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9DA, // (栗) CJK COMPATIBILITY IDEOGRAPH-F9DA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "栟" <Same>
		'681F', // CJK Ideograph-681F <6688/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x681F, // (栟) CJK Ideograph-681F <6688/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E5, // (栟) CJK COMPATIBILITY IDEOGRAPH-2F8E5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "桒" <Same>
		'6852', // CJK Ideograph-6852 <6739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6852, // (桒) CJK Ideograph-6852 <6739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E1, // (桒) CJK COMPATIBILITY IDEOGRAPH-2F8E1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣑭" <Same>
		'2346D', // CJK Ideograph Extension B-2346D <13422/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2346D, // (𣑭) CJK Ideograph Extension B-2346D <13422/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E3, // (𣑭) CJK COMPATIBILITY IDEOGRAPH-2F8E3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "梁" <Same>
		'6881', // CJK Ideograph-6881 <6786/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6881, // (梁) CJK Ideograph-6881 <6786/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF97A, // (梁) CJK COMPATIBILITY IDEOGRAPH-F97A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "梅" <Same>
		'6885', // CJK Ideograph-6885 <6790/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6885, // (梅) CJK Ideograph-6885 <6790/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA44, // (梅) CJK COMPATIBILITY IDEOGRAPH-FA44 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E2, // (梅) CJK COMPATIBILITY IDEOGRAPH-2F8E2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "梎" <Same>
		'688E', // CJK Ideograph-688E <6799/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x688E, // (梎) CJK Ideograph-688E <6799/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E4, // (梎) CJK COMPATIBILITY IDEOGRAPH-2F8E4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "梨" <Same>
		'68A8', // CJK Ideograph-68A8 <6825/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x68A8, // (梨) CJK Ideograph-68A8 <6825/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E2, // (梨) CJK COMPATIBILITY IDEOGRAPH-F9E2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "椔" <Same>
		'6914', // CJK Ideograph-6914 <6933/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6914, // (椔) CJK Ideograph-6914 <6933/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E6, // (椔) CJK COMPATIBILITY IDEOGRAPH-2F8E6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "楂" <Same>
		'6942', // CJK Ideograph-6942 <6979/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6942, // (楂) CJK Ideograph-6942 <6979/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E8, // (楂) CJK COMPATIBILITY IDEOGRAPH-2F8E8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㮝" <Same>
		'3B9D', // CJK Ideograph Extension A-3B9D <1950/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3B9D, // (㮝) CJK Ideograph Extension A-3B9D <1950/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD2, // (㮝) CJK COMPATIBILITY IDEOGRAPH-FAD2 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E7, // (㮝) CJK COMPATIBILITY IDEOGRAPH-2F8E7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㮣" <Same>
		'3BA3', // CJK Ideograph Extension A-3BA3 <1956/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3BA3, // (㮣) CJK Ideograph Extension A-3BA3 <1956/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x69E9, // (槩) CJK Ideograph-69E9 <7146/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "榝" <Same>
		'699D', // CJK Ideograph-699D <7070/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x699D, // (榝) CJK Ideograph-699D <7070/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6A27, // (樧) CJK Ideograph-6A27 <7208/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "榣" <Same>
		'69A3', // CJK Ideograph-69A3 <7076/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x69A3, // (榣) CJK Ideograph-69A3 <7076/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E9, // (榣) CJK COMPATIBILITY IDEOGRAPH-2F8E9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "槪" <Same>
		'69EA', // CJK Ideograph-69EA <7147/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x69EA, // (槪) CJK Ideograph-69EA <7147/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8EA, // (槪) CJK COMPATIBILITY IDEOGRAPH-2F8EA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "樂" <Same>
		'6A02', // CJK Ideograph-6A02 <7171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6A02, // (樂) CJK Ideograph-6A02 <7171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF914, // (樂) CJK COMPATIBILITY IDEOGRAPH-F914 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF95C, // (樂) CJK COMPATIBILITY IDEOGRAPH-F95C [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9BF, // (樂) CJK COMPATIBILITY IDEOGRAPH-F9BF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "樓" <Same>
		'6A13', // CJK Ideograph-6A13 <7188/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6A13, // (樓) CJK Ideograph-6A13 <7188/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF94C, // (樓) CJK COMPATIBILITY IDEOGRAPH-F94C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣚣" <Same>
		'236A3', // CJK Ideograph Extension B-236A3 <13988/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x236A3, // (𣚣) CJK Ideograph Extension B-236A3 <13988/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8EC, // (𣚣) CJK COMPATIBILITY IDEOGRAPH-2F8EC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "檨" <Same>
		'6AA8', // CJK Ideograph-6AA8 <7337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6AA8, // (檨) CJK Ideograph-6AA8 <7337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8EB, // (檨) CJK COMPATIBILITY IDEOGRAPH-2F8EB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "櫓" <Same>
		'6AD3', // CJK Ideograph-6AD3 <7380/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6AD3, // (櫓) CJK Ideograph-6AD3 <7380/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF931, // (櫓) CJK COMPATIBILITY IDEOGRAPH-F931 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "櫛" <Same>
		'6ADB', // CJK Ideograph-6ADB <7388/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6ADB, // (櫛) CJK Ideograph-6ADB <7388/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8ED, // (櫛) CJK COMPATIBILITY IDEOGRAPH-2F8ED [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "欄" <Same>
		'6B04', // CJK Ideograph-6B04 <7429/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B04, // (欄) CJK Ideograph-6B04 <7429/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF91D, // (欄) CJK COMPATIBILITY IDEOGRAPH-F91D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㰘" <Same>
		'3C18', // CJK Ideograph Extension A-3C18 <2073/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3C18, // (㰘) CJK Ideograph Extension A-3C18 <2073/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8EE, // (㰘) CJK COMPATIBILITY IDEOGRAPH-2F8EE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "欠" <Same>
		'6B20', // CJK Ideograph-6B20 <7457/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B20, // (欠) CJK Ideograph-6B20 <7457/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F4B, // (⽋) KANGXI RADICAL LACK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "次" <Same>
		'6B21', // CJK Ideograph-6B21 <7458/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B21, // (次) CJK Ideograph-6B21 <7458/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8EF, // (次) CJK COMPATIBILITY IDEOGRAPH-2F8EF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣢧" <Same>
		'238A7', // CJK Ideograph Extension B-238A7 <14504/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x238A7, // (𣢧) CJK Ideograph Extension B-238A7 <14504/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F0, // (𣢧) CJK COMPATIBILITY IDEOGRAPH-2F8F0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "歔" <Same>
		'6B54', // CJK Ideograph-6B54 <7509/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B54, // (歔) CJK Ideograph-6B54 <7509/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F1, // (歔) CJK COMPATIBILITY IDEOGRAPH-2F8F1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㱎" <Same>
		'3C4E', // CJK Ideograph Extension A-3C4E <2127/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3C4E, // (㱎) CJK Ideograph Extension A-3C4E <2127/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F2, // (㱎) CJK COMPATIBILITY IDEOGRAPH-2F8F2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "止" <Same>
		'6B62', // CJK Ideograph-6B62 <7523/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B62, // (止) CJK Ideograph-6B62 <7523/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F4C, // (⽌) KANGXI RADICAL STOP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "歯" <Same>
		'6B6F', // CJK Ideograph-6B6F <7536/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B6F, // (歯) CJK Ideograph-6B6F <7536/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EED, // (⻭) CJK RADICAL J-SIMPLIFIED TOOTH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "歲" <Same>
		'6B72', // CJK Ideograph-6B72 <7539/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B72, // (歲) CJK Ideograph-6B72 <7539/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F3, // (歲) CJK COMPATIBILITY IDEOGRAPH-2F8F3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "歷" <Same>
		'6B77', // CJK Ideograph-6B77 <7544/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B77, // (歷) CJK Ideograph-6B77 <7544/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF98C, // (歷) CJK COMPATIBILITY IDEOGRAPH-F98C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "歹" <Same>
		'6B79', // CJK Ideograph-6B79 <7546/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B79, // (歹) CJK Ideograph-6B79 <7546/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA95, // (歹) CJK COMPATIBILITY IDEOGRAPH-FA95 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F4D, // (⽍) KANGXI RADICAL DEATH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "歺" <Same>
		'6B7A', // CJK Ideograph-6B7A <7547/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B7A, // (歺) CJK Ideograph-6B7A <7547/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2E9E, // (⺞) CJK RADICAL DEATH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "殟" <Same>
		'6B9F', // CJK Ideograph-6B9F <7584/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6B9F, // (殟) CJK Ideograph-6B9F <7584/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F4, // (殟) CJK COMPATIBILITY IDEOGRAPH-2F8F4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "殮" <Same>
		'6BAE', // CJK Ideograph-6BAE <7599/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BAE, // (殮) CJK Ideograph-6BAE <7599/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A5, // (殮) CJK COMPATIBILITY IDEOGRAPH-F9A5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "殳" <Same>
		'6BB3', // CJK Ideograph-6BB3 <7604/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BB3, // (殳) CJK Ideograph-6BB3 <7604/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F4E, // (⽎) KANGXI RADICAL WEAPON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "殺" <Same>
		'6BBA', // CJK Ideograph-6BBA <7611/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BBA, // (殺) CJK Ideograph-6BBA <7611/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF970, // (殺) CJK COMPATIBILITY IDEOGRAPH-F970 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA96, // (殺) CJK COMPATIBILITY IDEOGRAPH-FA96 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F5, // (殺) CJK COMPATIBILITY IDEOGRAPH-2F8F5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "殻" <Same>
		'6BBB', // CJK Ideograph-6BBB <7612/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BBB, // (殻) CJK Ideograph-6BBB <7612/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F6, // (殻) CJK COMPATIBILITY IDEOGRAPH-2F8F6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣪍" <Same>
		'23A8D', // CJK Ideograph Extension B-23A8D <14990/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23A8D, // (𣪍) CJK Ideograph Extension B-23A8D <14990/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F7, // (𣪍) CJK COMPATIBILITY IDEOGRAPH-2F8F7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "毋" <Same>
		'6BCB', // CJK Ideograph-6BCB <7628/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BCB, // (毋) CJK Ideograph-6BCB <7628/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F4F, // (⽏) KANGXI RADICAL DO NOT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "母" <Same>
		'6BCD', // CJK Ideograph-6BCD <7630/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BCD, // (母) CJK Ideograph-6BCD <7630/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2E9F, // (⺟) CJK RADICAL MOTHER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣫺" <Same>
		'23AFA', // CJK Ideograph Extension B-23AFA <15099/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23AFA, // (𣫺) CJK Ideograph Extension B-23AFA <15099/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F9, // (𣫺) CJK COMPATIBILITY IDEOGRAPH-2F8F9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "比" <Same>
		'6BD4', // CJK Ideograph-6BD4 <7637/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BD4, // (比) CJK Ideograph-6BD4 <7637/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F50, // (⽐) KANGXI RADICAL COMPARE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "毛" <Same>
		'6BDB', // CJK Ideograph-6BDB <7644/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6BDB, // (毛) CJK Ideograph-6BDB <7644/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F51, // (⽑) KANGXI RADICAL FUR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "氏" <Same>
		'6C0F', // CJK Ideograph-6C0F <7696/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C0F, // (氏) CJK Ideograph-6C0F <7696/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F52, // (⽒) KANGXI RADICAL CLAN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "民" <Same>
		'6C11', // CJK Ideograph-6C11 <7698/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C11, // (民) CJK Ideograph-6C11 <7698/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA0, // (⺠) CJK RADICAL CIVILIAN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "气" <Same>
		'6C14', // CJK Ideograph-6C14 <7701/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C14, // (气) CJK Ideograph-6C14 <7701/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F53, // (⽓) KANGXI RADICAL STEAM [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "水" <Same>
		'6C34', // CJK Ideograph-6C34 <7733/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C34, // (水) CJK Ideograph-6C34 <7733/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F54, // (⽔) KANGXI RADICAL WATER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "氵" <Same>
		'6C35', // CJK Ideograph-6C35 <7734/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C35, // (氵) CJK Ideograph-6C35 <7734/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA1, // (⺡) CJK RADICAL WATER ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "氺" <Same>
		'6C3A', // CJK Ideograph-6C3A <7739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C3A, // (氺) CJK Ideograph-6C3A <7739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA2, // (⺢) CJK RADICAL WATER TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "汎" <Same>
		'6C4E', // CJK Ideograph-6C4E <7759/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C4E, // (汎) CJK Ideograph-6C4E <7759/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8FA, // (汎) CJK COMPATIBILITY IDEOGRAPH-2F8FA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "汧" <Same>
		'6C67', // CJK Ideograph-6C67 <7784/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C67, // (汧) CJK Ideograph-6C67 <7784/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8FE, // (汧) CJK COMPATIBILITY IDEOGRAPH-2F8FE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "沈" <Same>
		'6C88', // CJK Ideograph-6C88 <7817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6C88, // (沈) CJK Ideograph-6C88 <7817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF972, // (沈) CJK COMPATIBILITY IDEOGRAPH-F972 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "沿" <Same>
		'6CBF', // CJK Ideograph-6CBF <7872/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6CBF, // (沿) CJK Ideograph-6CBF <7872/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8FC, // (沿) CJK COMPATIBILITY IDEOGRAPH-2F8FC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "泌" <Same>
		'6CCC', // CJK Ideograph-6CCC <7885/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6CCC, // (泌) CJK Ideograph-6CCC <7885/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF968, // (泌) CJK COMPATIBILITY IDEOGRAPH-F968 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "泍" <Same>
		'6CCD', // CJK Ideograph-6CCD <7886/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6CCD, // (泍) CJK Ideograph-6CCD <7886/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8FD, // (泍) CJK COMPATIBILITY IDEOGRAPH-2F8FD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "泥" <Same>
		'6CE5', // CJK Ideograph-6CE5 <7910/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6CE5, // (泥) CJK Ideograph-6CE5 <7910/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E3, // (泥) CJK COMPATIBILITY IDEOGRAPH-F9E3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣲼" <Same>
		'23CBC', // CJK Ideograph Extension B-23CBC <15549/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23CBC, // (𣲼) CJK Ideograph Extension B-23CBC <15549/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8FB, // (𣲼) CJK COMPATIBILITY IDEOGRAPH-2F8FB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "洛" <Same>
		'6D1B', // CJK Ideograph-6D1B <7964/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D1B, // (洛) CJK Ideograph-6D1B <7964/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF915, // (洛) CJK COMPATIBILITY IDEOGRAPH-F915 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "洞" <Same>
		'6D1E', // CJK Ideograph-6D1E <7967/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D1E, // (洞) CJK Ideograph-6D1E <7967/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA05, // (洞) CJK COMPATIBILITY IDEOGRAPH-FA05 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "洴" <Same>
		'6D34', // CJK Ideograph-6D34 <7989/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D34, // (洴) CJK Ideograph-6D34 <7989/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F907, // (洴) CJK COMPATIBILITY IDEOGRAPH-2F907 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "派" <Same>
		'6D3E', // CJK Ideograph-6D3E <7999/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D3E, // (派) CJK Ideograph-6D3E <7999/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F900, // (派) CJK COMPATIBILITY IDEOGRAPH-2F900 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "流" <Same>
		'6D41', // CJK Ideograph-6D41 <8002/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D41, // (流) CJK Ideograph-6D41 <8002/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9CA, // (流) CJK COMPATIBILITY IDEOGRAPH-F9CA [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA97, // (流) CJK COMPATIBILITY IDEOGRAPH-FA97 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F902, // (流) CJK COMPATIBILITY IDEOGRAPH-2F902 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "洖" <Same>
		'6D16', // CJK Ideograph-6D16 <7959/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D16, // (洖) CJK Ideograph-6D16 <7959/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8FF, // (洖) CJK COMPATIBILITY IDEOGRAPH-2F8FF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "浩" <Same>
		'6D69', // CJK Ideograph-6D69 <8042/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D69, // (浩) CJK Ideograph-6D69 <8042/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F903, // (浩) CJK COMPATIBILITY IDEOGRAPH-2F903 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "浪" <Same>
		'6D6A', // CJK Ideograph-6D6A <8043/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D6A, // (浪) CJK Ideograph-6D6A <8043/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF92A, // (浪) CJK COMPATIBILITY IDEOGRAPH-F92A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "海" <Same>
		'6D77', // CJK Ideograph-6D77 <8056/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D77, // (海) CJK Ideograph-6D77 <8056/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA45, // (海) CJK COMPATIBILITY IDEOGRAPH-FA45 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F901, // (海) CJK COMPATIBILITY IDEOGRAPH-2F901 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "浸" <Same>
		'6D78', // CJK Ideograph-6D78 <8057/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D78, // (浸) CJK Ideograph-6D78 <8057/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F904, // (浸) CJK COMPATIBILITY IDEOGRAPH-2F904 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "涅" <Same>
		'6D85', // CJK Ideograph-6D85 <8070/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6D85, // (涅) CJK Ideograph-6D85 <8070/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F905, // (涅) CJK COMPATIBILITY IDEOGRAPH-2F905 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣴞" <Same>
		'23D1E', // CJK Ideograph Extension B-23D1E <15647/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23D1E, // (𣴞) CJK Ideograph Extension B-23D1E <15647/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F906, // (𣴞) CJK COMPATIBILITY IDEOGRAPH-2F906 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "淋" <Same>
		'6DCB', // CJK Ideograph-6DCB <8140/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6DCB, // (淋) CJK Ideograph-6DCB <8140/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F5, // (淋) CJK COMPATIBILITY IDEOGRAPH-F9F5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "淚" <Same>
		'6DDA', // CJK Ideograph-6DDA <8155/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6DDA, // (淚) CJK Ideograph-6DDA <8155/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF94D, // (淚) CJK COMPATIBILITY IDEOGRAPH-F94D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "淪" <Same>
		'6DEA', // CJK Ideograph-6DEA <8171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6DEA, // (淪) CJK Ideograph-6DEA <8171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D6, // (淪) CJK COMPATIBILITY IDEOGRAPH-F9D6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "淹" <Same>
		'6DF9', // CJK Ideograph-6DF9 <8186/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6DF9, // (淹) CJK Ideograph-6DF9 <8186/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90E, // (淹) CJK COMPATIBILITY IDEOGRAPH-2F90E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "渚" <Same>
		'6E1A', // CJK Ideograph-6E1A <8219/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6E1A, // (渚) CJK Ideograph-6E1A <8219/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA46, // (渚) CJK COMPATIBILITY IDEOGRAPH-FA46 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "港" <Same>
		'6E2F', // CJK Ideograph-6E2F <8240/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6E2F, // (港) CJK Ideograph-6E2F <8240/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F908, // (港) CJK COMPATIBILITY IDEOGRAPH-2F908 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "湮" <Same>
		'6E6E', // CJK Ideograph-6E6E <8303/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6E6E, // (湮) CJK Ideograph-6E6E <8303/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F909, // (湮) CJK COMPATIBILITY IDEOGRAPH-2F909 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "溈" <Same>
		'6E88', // CJK Ideograph-6E88 <8329/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6E88, // (溈) CJK Ideograph-6E88 <8329/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6F59, // (潙) CJK Ideograph-6F59 <8538/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "滋" <Same>
		'6ECB', // CJK Ideograph-6ECB <8396/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6ECB, // (滋) CJK Ideograph-6ECB <8396/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA99, // (滋) CJK COMPATIBILITY IDEOGRAPH-FA99 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90B, // (滋) CJK COMPATIBILITY IDEOGRAPH-2F90B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "溜" <Same>
		'6E9C', // CJK Ideograph-6E9C <8349/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6E9C, // (溜) CJK Ideograph-6E9C <8349/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9CB, // (溜) CJK COMPATIBILITY IDEOGRAPH-F9CB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "溺" <Same>
		'6EBA', // CJK Ideograph-6EBA <8379/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6EBA, // (溺) CJK Ideograph-6EBA <8379/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9EC, // (溺) CJK COMPATIBILITY IDEOGRAPH-F9EC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "滇" <Same>
		'6EC7', // CJK Ideograph-6EC7 <8392/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6EC7, // (滇) CJK Ideograph-6EC7 <8392/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90C, // (滇) CJK COMPATIBILITY IDEOGRAPH-2F90C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "滑" <Same>
		'6ED1', // CJK Ideograph-6ED1 <8402/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6ED1, // (滑) CJK Ideograph-6ED1 <8402/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF904, // (滑) CJK COMPATIBILITY IDEOGRAPH-F904 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "滛" <Same>
		'6EDB', // CJK Ideograph-6EDB <8412/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6EDB, // (滛) CJK Ideograph-6EDB <8412/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA98, // (滛) CJK COMPATIBILITY IDEOGRAPH-FA98 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㴳" <Same>
		'3D33', // CJK Ideograph Extension A-3D33 <2356/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3D33, // (㴳) CJK Ideograph Extension A-3D33 <2356/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90A, // (㴳) CJK COMPATIBILITY IDEOGRAPH-2F90A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "漏" <Same>
		'6F0F', // CJK Ideograph-6F0F <8464/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6F0F, // (漏) CJK Ideograph-6F0F <8464/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF94E, // (漏) CJK COMPATIBILITY IDEOGRAPH-F94E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "漢" <Same>
		'6F22', // CJK Ideograph-6F22 <8483/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6F22, // (漢) CJK Ideograph-6F22 <8483/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA47, // (漢) CJK COMPATIBILITY IDEOGRAPH-FA47 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA9A, // (漢) CJK COMPATIBILITY IDEOGRAPH-FA9A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "漣" <Same>
		'6F23', // CJK Ideograph-6F23 <8484/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6F23, // (漣) CJK Ideograph-6F23 <8484/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF992, // (漣) CJK COMPATIBILITY IDEOGRAPH-F992 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣻑" <Same>
		'23ED1', // CJK Ideograph Extension B-23ED1 <16082/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23ED1, // (𣻑) CJK Ideograph Extension B-23ED1 <16082/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90D, // (𣻑) CJK COMPATIBILITY IDEOGRAPH-2F90D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "潮" <Same>
		'6F6E', // CJK Ideograph-6F6E <8559/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6F6E, // (潮) CJK Ideograph-6F6E <8559/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90F, // (潮) CJK COMPATIBILITY IDEOGRAPH-2F90F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣽞" <Same>
		'23F5E', // CJK Ideograph Extension B-23F5E <16223/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23F5E, // (𣽞) CJK Ideograph Extension B-23F5E <16223/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F910, // (𣽞) CJK COMPATIBILITY IDEOGRAPH-2F910 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𣾎" <Same>
		'23F8E', // CJK Ideograph Extension B-23F8E <16271/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x23F8E, // (𣾎) CJK Ideograph Extension B-23F8E <16271/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F911, // (𣾎) CJK COMPATIBILITY IDEOGRAPH-2F911 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "濆" <Same>
		'6FC6', // CJK Ideograph-6FC6 <8647/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6FC6, // (濆) CJK Ideograph-6FC6 <8647/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F912, // (濆) CJK COMPATIBILITY IDEOGRAPH-2F912 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "濫" <Same>
		'6FEB', // CJK Ideograph-6FEB <8684/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6FEB, // (濫) CJK Ideograph-6FEB <8684/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF922, // (濫) CJK COMPATIBILITY IDEOGRAPH-F922 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "濾" <Same>
		'6FFE', // CJK Ideograph-6FFE <8703/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6FFE, // (濾) CJK Ideograph-6FFE <8703/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF984, // (濾) CJK COMPATIBILITY IDEOGRAPH-F984 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瀛" <Same>
		'701B', // CJK Ideograph-701B <8732/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x701B, // (瀛) CJK Ideograph-701B <8732/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F915, // (瀛) CJK COMPATIBILITY IDEOGRAPH-2F915 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瀞" <Same>
		'701E', // CJK Ideograph-701E <8735/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x701E, // (瀞) CJK Ideograph-701E <8735/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA9B, // (瀞) CJK COMPATIBILITY IDEOGRAPH-FA9B [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F914, // (瀞) CJK COMPATIBILITY IDEOGRAPH-2F914 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瀹" <Same>
		'7039', // CJK Ideograph-7039 <8762/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7039, // (瀹) CJK Ideograph-7039 <8762/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F913, // (瀹) CJK COMPATIBILITY IDEOGRAPH-2F913 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "灊" <Same>
		'704A', // CJK Ideograph-704A <8779/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x704A, // (灊) CJK Ideograph-704A <8779/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F917, // (灊) CJK COMPATIBILITY IDEOGRAPH-2F917 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㶖" <Same>
		'3D96', // CJK Ideograph Extension A-3D96 <2455/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3D96, // (㶖) CJK Ideograph Extension A-3D96 <2455/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F916, // (㶖) CJK COMPATIBILITY IDEOGRAPH-2F916 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "火" <Same>
		'706B', // CJK Ideograph-706B <8812/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x706B, // (火) CJK Ideograph-706B <8812/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F55, // (⽕) KANGXI RADICAL FIRE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "灬" <Same>
		'706C', // CJK Ideograph-706C <8813/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x706C, // (灬) CJK Ideograph-706C <8813/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA3, // (⺣) CJK RADICAL FIRE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "灰" <Same>
		'7070', // CJK Ideograph-7070 <8817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7070, // (灰) CJK Ideograph-7070 <8817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F835, // (灰) CJK COMPATIBILITY IDEOGRAPH-2F835 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "灷" <Same>
		'7077', // CJK Ideograph-7077 <8824/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7077, // (灷) CJK Ideograph-7077 <8824/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F919, // (灷) CJK COMPATIBILITY IDEOGRAPH-2F919 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "災" <Same>
		'707D', // CJK Ideograph-707D <8830/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x707D, // (災) CJK Ideograph-707D <8830/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F918, // (災) CJK COMPATIBILITY IDEOGRAPH-2F918 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "炙" <Same>
		'7099', // CJK Ideograph-7099 <8858/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7099, // (炙) CJK Ideograph-7099 <8858/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9FB, // (炙) CJK COMPATIBILITY IDEOGRAPH-F9FB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "炭" <Same>
		'70AD', // CJK Ideograph-70AD <8878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x70AD, // (炭) CJK Ideograph-70AD <8878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91A, // (炭) CJK COMPATIBILITY IDEOGRAPH-2F91A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "烈" <Same>
		'70C8', // CJK Ideograph-70C8 <8905/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x70C8, // (烈) CJK Ideograph-70C8 <8905/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF99F, // (烈) CJK COMPATIBILITY IDEOGRAPH-F99F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "烙" <Same>
		'70D9', // CJK Ideograph-70D9 <8922/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x70D9, // (烙) CJK Ideograph-70D9 <8922/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF916, // (烙) CJK COMPATIBILITY IDEOGRAPH-F916 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "煮" <Same>
		'716E', // CJK Ideograph-716E <9071/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x716E, // (煮) CJK Ideograph-716E <9071/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA48, // (煮) CJK COMPATIBILITY IDEOGRAPH-FA48 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA9C, // (煮) CJK COMPATIBILITY IDEOGRAPH-FA9C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤉣" <Same>
		'24263', // CJK Ideograph Extension B-24263 <16996/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24263, // (𤉣) CJK Ideograph Extension B-24263 <16996/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91D, // (𤉣) CJK COMPATIBILITY IDEOGRAPH-2F91D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "煅" <Same>
		'7145', // CJK Ideograph-7145 <9030/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7145, // (煅) CJK Ideograph-7145 <9030/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91C, // (煅) CJK COMPATIBILITY IDEOGRAPH-2F91C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "煉" <Same>
		'7149', // CJK Ideograph-7149 <9034/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7149, // (煉) CJK Ideograph-7149 <9034/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF993, // (煉) CJK COMPATIBILITY IDEOGRAPH-F993 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤋮" <Same>
		'242EE', // CJK Ideograph Extension B-242EE <17135/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x242EE, // (𤋮) CJK Ideograph Extension B-242EE <17135/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA6C, // (𤋮) CJK COMPATIBILITY IDEOGRAPH-FA6C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "熜" <Same>
		'719C', // CJK Ideograph-719C <9117/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x719C, // (熜) CJK Ideograph-719C <9117/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91E, // (熜) CJK COMPATIBILITY IDEOGRAPH-2F91E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "燎" <Same>
		'71CE', // CJK Ideograph-71CE <9167/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x71CE, // (燎) CJK Ideograph-71CE <9167/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C0, // (燎) CJK COMPATIBILITY IDEOGRAPH-F9C0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "燐" <Same>
		'71D0', // CJK Ideograph-71D0 <9169/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x71D0, // (燐) CJK Ideograph-71D0 <9169/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9EE, // (燐) CJK COMPATIBILITY IDEOGRAPH-F9EE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤎫" <Same>
		'243AB', // CJK Ideograph Extension B-243AB <17324/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x243AB, // (𤎫) CJK Ideograph Extension B-243AB <17324/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91F, // (𤎫) CJK COMPATIBILITY IDEOGRAPH-2F91F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爐" <Same>
		'7210', // CJK Ideograph-7210 <9233/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7210, // (爐) CJK Ideograph-7210 <9233/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF932, // (爐) CJK COMPATIBILITY IDEOGRAPH-F932 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爛" <Same>
		'721B', // CJK Ideograph-721B <9244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x721B, // (爛) CJK Ideograph-721B <9244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF91E, // (爛) CJK COMPATIBILITY IDEOGRAPH-F91E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爨" <Same>
		'7228', // CJK Ideograph-7228 <9257/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7228, // (爨) CJK Ideograph-7228 <9257/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F920, // (爨) CJK COMPATIBILITY IDEOGRAPH-2F920 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爪" <Same>
		'722A', // CJK Ideograph-722A <9259/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x722A, // (爪) CJK Ideograph-722A <9259/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F56, // (⽖) KANGXI RADICAL CLAW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爫" <Same>
		'722B', // CJK Ideograph-722B <9260/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x722B, // (爫) CJK Ideograph-722B <9260/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA49, // (爫) CJK COMPATIBILITY IDEOGRAPH-FA49 [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA4, // (⺤) CJK RADICAL PAW ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爵" <Same>
		'7235', // CJK Ideograph-7235 <9270/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7235, // (爵) CJK Ideograph-7235 <9270/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA9E, // (爵) CJK COMPATIBILITY IDEOGRAPH-FA9E [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F921, // (爵) CJK COMPATIBILITY IDEOGRAPH-2F921 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "父" <Same>
		'7236', // CJK Ideograph-7236 <9271/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7236, // (父) CJK Ideograph-7236 <9271/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F57, // (⽗) KANGXI RADICAL FATHER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爻" <Same>
		'723B', // CJK Ideograph-723B <9276/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x723B, // (爻) CJK Ideograph-723B <9276/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F58, // (⽘) KANGXI RADICAL DOUBLE X [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "丬" <Same>
		'4E2C', // CJK Ideograph-4E2C <45/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4E2C, // (丬) CJK Ideograph-4E2C <45/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA6, // (⺦) CJK RADICAL SIMPLIFIED HALF TREE TRUNK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "爿" <Same>
		'723F', // CJK Ideograph-723F <9280/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x723F, // (爿) CJK Ideograph-723F <9280/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F59, // (⽙) KANGXI RADICAL HALF TREE TRUNK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "片" <Same>
		'7247', // CJK Ideograph-7247 <9288/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7247, // (片) CJK Ideograph-7247 <9288/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F5A, // (⽚) KANGXI RADICAL SLICE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "牐" <Same>
		'7250', // CJK Ideograph-7250 <9297/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7250, // (牐) CJK Ideograph-7250 <9297/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F922, // (牐) CJK COMPATIBILITY IDEOGRAPH-2F922 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "牙" <Same>
		'7259', // CJK Ideograph-7259 <9306/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7259, // (牙) CJK Ideograph-7259 <9306/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F5B, // (⽛) KANGXI RADICAL FANG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤘈" <Same>
		'24608', // CJK Ideograph Extension B-24608 <17929/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24608, // (𤘈) CJK Ideograph Extension B-24608 <17929/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F923, // (𤘈) CJK COMPATIBILITY IDEOGRAPH-2F923 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "牛" <Same>
		'725B', // CJK Ideograph-725B <9308/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x725B, // (牛) CJK Ideograph-725B <9308/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F5C, // (⽜) KANGXI RADICAL COW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "牢" <Same>
		'7262', // CJK Ideograph-7262 <9315/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7262, // (牢) CJK Ideograph-7262 <9315/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF946, // (牢) CJK COMPATIBILITY IDEOGRAPH-F946 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "犀" <Same>
		'7280', // CJK Ideograph-7280 <9345/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7280, // (犀) CJK Ideograph-7280 <9345/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F924, // (犀) CJK COMPATIBILITY IDEOGRAPH-2F924 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "犕" <Same>
		'7295', // CJK Ideograph-7295 <9366/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7295, // (犕) CJK Ideograph-7295 <9366/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F925, // (犕) CJK COMPATIBILITY IDEOGRAPH-2F925 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "犬" <Same>
		'72AC', // CJK Ideograph-72AC <9389/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x72AC, // (犬) CJK Ideograph-72AC <9389/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F5D, // (⽝) KANGXI RADICAL DOG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "犭" <Same>
		'72AD', // CJK Ideograph-72AD <9390/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x72AD, // (犭) CJK Ideograph-72AD <9390/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EA8, // (⺨) CJK RADICAL DOG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "犯" <Same>
		'72AF', // CJK Ideograph-72AF <9392/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x72AF, // (犯) CJK Ideograph-72AF <9392/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA9F, // (犯) CJK COMPATIBILITY IDEOGRAPH-FA9F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "狀" <Same>
		'72C0', // CJK Ideograph-72C0 <9409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x72C0, // (狀) CJK Ideograph-72C0 <9409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9FA, // (狀) CJK COMPATIBILITY IDEOGRAPH-F9FA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤜵" <Same>
		'24735', // CJK Ideograph Extension B-24735 <18230/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24735, // (𤜵) CJK Ideograph Extension B-24735 <18230/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F926, // (𤜵) CJK COMPATIBILITY IDEOGRAPH-2F926 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "狼" <Same>
		'72FC', // CJK Ideograph-72FC <9469/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x72FC, // (狼) CJK Ideograph-72FC <9469/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF92B, // (狼) CJK COMPATIBILITY IDEOGRAPH-F92B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "猪" <Same>
		'732A', // CJK Ideograph-732A <9515/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x732A, // (猪) CJK Ideograph-732A <9515/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA16, // (猪) CJK COMPATIBILITY IDEOGRAPH-FA16 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA0, // (猪) CJK COMPATIBILITY IDEOGRAPH-FAA0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤠔" <Same>
		'24814', // CJK Ideograph Extension B-24814 <18453/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24814, // (𤠔) CJK Ideograph Extension B-24814 <18453/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F927, // (𤠔) CJK COMPATIBILITY IDEOGRAPH-2F927 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "獵" <Same>
		'7375', // CJK Ideograph-7375 <9590/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7375, // (獵) CJK Ideograph-7375 <9590/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A7, // (獵) CJK COMPATIBILITY IDEOGRAPH-F9A7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "獺" <Same>
		'737A', // CJK Ideograph-737A <9595/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x737A, // (獺) CJK Ideograph-737A <9595/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F928, // (獺) CJK COMPATIBILITY IDEOGRAPH-2F928 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "玄" <Same>
		'7384', // CJK Ideograph-7384 <9605/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7384, // (玄) CJK Ideograph-7384 <9605/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F5E, // (⽞) KANGXI RADICAL PROFOUND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "率" <Same>
		'7387', // CJK Ideograph-7387 <9608/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7387, // (率) CJK Ideograph-7387 <9608/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF961, // (率) CJK COMPATIBILITY IDEOGRAPH-F961 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9DB, // (率) CJK COMPATIBILITY IDEOGRAPH-F9DB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "玉" <Same>
		'7389', // CJK Ideograph-7389 <9610/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7389, // (玉) CJK Ideograph-7389 <9610/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F5F, // (⽟) KANGXI RADICAL JADE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "王" <Same>
		'738B', // CJK Ideograph-738B <9612/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x738B, // (王) CJK Ideograph-738B <9612/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F929, // (王) CJK COMPATIBILITY IDEOGRAPH-2F929 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㺬" <Same>
		'3EAC', // CJK Ideograph Extension A-3EAC <2733/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3EAC, // (㺬) CJK Ideograph Extension A-3EAC <2733/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92A, // (㺬) CJK COMPATIBILITY IDEOGRAPH-2F92A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "玥" <Same>
		'73A5', // CJK Ideograph-73A5 <9638/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x73A5, // (玥) CJK Ideograph-73A5 <9638/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92B, // (玥) CJK COMPATIBILITY IDEOGRAPH-2F92B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "玲" <Same>
		'73B2', // CJK Ideograph-73B2 <9651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x73B2, // (玲) CJK Ideograph-73B2 <9651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9AD, // (玲) CJK COMPATIBILITY IDEOGRAPH-F9AD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㺸" <Same>
		'3EB8', // CJK Ideograph Extension A-3EB8 <2745/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3EB8, // (㺸) CJK Ideograph Extension A-3EB8 <2745/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92C, // (㺸) CJK COMPATIBILITY IDEOGRAPH-2F92C [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92D, // (㺸) CJK COMPATIBILITY IDEOGRAPH-2F92D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "珞" <Same>
		'73DE', // CJK Ideograph-73DE <9695/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x73DE, // (珞) CJK Ideograph-73DE <9695/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF917, // (珞) CJK COMPATIBILITY IDEOGRAPH-F917 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "琉" <Same>
		'7409', // CJK Ideograph-7409 <9738/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7409, // (琉) CJK Ideograph-7409 <9738/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9CC, // (琉) CJK COMPATIBILITY IDEOGRAPH-F9CC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "理" <Same>
		'7406', // CJK Ideograph-7406 <9735/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7406, // (理) CJK Ideograph-7406 <9735/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E4, // (理) CJK COMPATIBILITY IDEOGRAPH-F9E4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "琢" <Same>
		'7422', // CJK Ideograph-7422 <9763/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7422, // (琢) CJK Ideograph-7422 <9763/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA4A, // (琢) CJK COMPATIBILITY IDEOGRAPH-FA4A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瑇" <Same>
		'7447', // CJK Ideograph-7447 <9800/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7447, // (瑇) CJK Ideograph-7447 <9800/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92E, // (瑇) CJK COMPATIBILITY IDEOGRAPH-2F92E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瑜" <Same>
		'745C', // CJK Ideograph-745C <9821/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x745C, // (瑜) CJK Ideograph-745C <9821/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92F, // (瑜) CJK COMPATIBILITY IDEOGRAPH-2F92F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瑩" <Same>
		'7469', // CJK Ideograph-7469 <9834/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7469, // (瑩) CJK Ideograph-7469 <9834/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9AE, // (瑩) CJK COMPATIBILITY IDEOGRAPH-F9AE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瑱" <Same>
		'7471', // CJK Ideograph-7471 <9842/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7471, // (瑱) CJK Ideograph-7471 <9842/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA1, // (瑱) CJK COMPATIBILITY IDEOGRAPH-FAA1 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F930, // (瑱) CJK COMPATIBILITY IDEOGRAPH-2F930 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "璅" <Same>
		'7485', // CJK Ideograph-7485 <9862/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7485, // (璅) CJK Ideograph-7485 <9862/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F931, // (璅) CJK COMPATIBILITY IDEOGRAPH-2F931 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "璉" <Same>
		'7489', // CJK Ideograph-7489 <9866/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7489, // (璉) CJK Ideograph-7489 <9866/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF994, // (璉) CJK COMPATIBILITY IDEOGRAPH-F994 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "璘" <Same>
		'7498', // CJK Ideograph-7498 <9881/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7498, // (璘) CJK Ideograph-7498 <9881/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9EF, // (璘) CJK COMPATIBILITY IDEOGRAPH-F9EF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瓊" <Same>
		'74CA', // CJK Ideograph-74CA <9931/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x74CA, // (瓊) CJK Ideograph-74CA <9931/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F932, // (瓊) CJK COMPATIBILITY IDEOGRAPH-2F932 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瓜" <Same>
		'74DC', // CJK Ideograph-74DC <9949/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x74DC, // (瓜) CJK Ideograph-74DC <9949/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F60, // (⽠) KANGXI RADICAL MELON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瓦" <Same>
		'74E6', // CJK Ideograph-74E6 <9959/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x74E6, // (瓦) CJK Ideograph-74E6 <9959/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F61, // (⽡) KANGXI RADICAL TILE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㼛" <Same>
		'3F1B', // CJK Ideograph Extension A-3F1B <2844/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3F1B, // (㼛) CJK Ideograph Extension A-3F1B <2844/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F933, // (㼛) CJK COMPATIBILITY IDEOGRAPH-2F933 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "甆" <Same>
		'7506', // CJK Ideograph-7506 <9991/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7506, // (甆) CJK Ideograph-7506 <9991/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA2, // (甆) CJK COMPATIBILITY IDEOGRAPH-FAA2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "甘" <Same>
		'7518', // CJK Ideograph-7518 <10009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7518, // (甘) CJK Ideograph-7518 <10009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F62, // (⽢) KANGXI RADICAL SWEET [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "生" <Same>
		'751F', // CJK Ideograph-751F <10016/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x751F, // (生) CJK Ideograph-751F <10016/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F63, // (⽣) KANGXI RADICAL LIFE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "甤" <Same>
		'7524', // CJK Ideograph-7524 <10021/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7524, // (甤) CJK Ideograph-7524 <10021/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F934, // (甤) CJK COMPATIBILITY IDEOGRAPH-2F934 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "用" <Same>
		'7528', // CJK Ideograph-7528 <10025/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7528, // (用) CJK Ideograph-7528 <10025/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F64, // (⽤) KANGXI RADICAL USE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "田" <Same>
		'7530', // CJK Ideograph-7530 <10033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7530, // (田) CJK Ideograph-7530 <10033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F65, // (⽥) KANGXI RADICAL FIELD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "画" <Same>
		'753B', // CJK Ideograph-753B <10044/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x753B, // (画) CJK Ideograph-753B <10044/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA3, // (画) CJK COMPATIBILITY IDEOGRAPH-FAA3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "甾" <Same>
		'753E', // CJK Ideograph-753E <10047/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x753E, // (甾) CJK Ideograph-753E <10047/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F936, // (甾) CJK COMPATIBILITY IDEOGRAPH-2F936 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤰶" <Same>
		'24C36', // CJK Ideograph Extension B-24C36 <19511/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24C36, // (𤰶) CJK Ideograph Extension B-24C36 <19511/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F935, // (𤰶) CJK COMPATIBILITY IDEOGRAPH-2F935 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "留" <Same>
		'7559', // CJK Ideograph-7559 <10074/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7559, // (留) CJK Ideograph-7559 <10074/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9CD, // (留) CJK COMPATIBILITY IDEOGRAPH-F9CD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "略" <Same>
		'7565', // CJK Ideograph-7565 <10086/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7565, // (略) CJK Ideograph-7565 <10086/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF976, // (略) CJK COMPATIBILITY IDEOGRAPH-F976 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "異" <Same>
		'7570', // CJK Ideograph-7570 <10097/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7570, // (異) CJK Ideograph-7570 <10097/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF962, // (異) CJK COMPATIBILITY IDEOGRAPH-F962 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F938, // (異) CJK COMPATIBILITY IDEOGRAPH-2F938 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤲒" <Same>
		'24C92', // CJK Ideograph Extension B-24C92 <19603/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24C92, // (𤲒) CJK Ideograph Extension B-24C92 <19603/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F937, // (𤲒) CJK COMPATIBILITY IDEOGRAPH-2F937 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "疋" <Same>
		'758B', // CJK Ideograph-758B <10124/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x758B, // (疋) CJK Ideograph-758B <10124/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F66, // (⽦) KANGXI RADICAL BOLT OF CLOTH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "疒" <Same>
		'7592', // CJK Ideograph-7592 <10131/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7592, // (疒) CJK Ideograph-7592 <10131/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F67, // (⽧) KANGXI RADICAL SICKNESS [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "痢" <Same>
		'75E2', // CJK Ideograph-75E2 <10211/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x75E2, // (痢) CJK Ideograph-75E2 <10211/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E5, // (痢) CJK COMPATIBILITY IDEOGRAPH-F9E5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瘐" <Same>
		'7610', // CJK Ideograph-7610 <10257/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7610, // (瘐) CJK Ideograph-7610 <10257/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93A, // (瘐) CJK COMPATIBILITY IDEOGRAPH-2F93A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瘟" <Same>
		'761F', // CJK Ideograph-761F <10272/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x761F, // (瘟) CJK Ideograph-761F <10272/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA5, // (瘟) CJK COMPATIBILITY IDEOGRAPH-FAA5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瘝" <Same>
		'761D', // CJK Ideograph-761D <10270/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x761D, // (瘝) CJK Ideograph-761D <10270/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA4, // (瘝) CJK COMPATIBILITY IDEOGRAPH-FAA4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "療" <Same>
		'7642', // CJK Ideograph-7642 <10307/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7642, // (療) CJK Ideograph-7642 <10307/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C1, // (療) CJK COMPATIBILITY IDEOGRAPH-F9C1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "癩" <Same>
		'7669', // CJK Ideograph-7669 <10346/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7669, // (癩) CJK Ideograph-7669 <10346/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF90E, // (癩) CJK COMPATIBILITY IDEOGRAPH-F90E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "癶" <Same>
		'7676', // CJK Ideograph-7676 <10359/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7676, // (癶) CJK Ideograph-7676 <10359/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F68, // (⽨) KANGXI RADICAL DOTTED TENT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "白" <Same>
		'767D', // CJK Ideograph-767D <10366/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x767D, // (白) CJK Ideograph-767D <10366/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F69, // (⽩) KANGXI RADICAL WHITE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤾡" <Same>
		'24FA1', // CJK Ideograph Extension B-24FA1 <20386/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24FA1, // (𤾡) CJK Ideograph Extension B-24FA1 <20386/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93B, // (𤾡) CJK COMPATIBILITY IDEOGRAPH-2F93B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𤾸" <Same>
		'24FB8', // CJK Ideograph Extension B-24FB8 <20409/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x24FB8, // (𤾸) CJK Ideograph Extension B-24FB8 <20409/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93C, // (𤾸) CJK COMPATIBILITY IDEOGRAPH-2F93C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "皮" <Same>
		'76AE', // CJK Ideograph-76AE <10415/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76AE, // (皮) CJK Ideograph-76AE <10415/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F6A, // (⽪) KANGXI RADICAL SKIN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "皿" <Same>
		'76BF', // CJK Ideograph-76BF <10432/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76BF, // (皿) CJK Ideograph-76BF <10432/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F6B, // (⽫) KANGXI RADICAL DISH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥁄" <Same>
		'25044', // CJK Ideograph Extension B-25044 <20549/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25044, // (𥁄) CJK Ideograph Extension B-25044 <20549/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93D, // (𥁄) CJK COMPATIBILITY IDEOGRAPH-2F93D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "㿼" <Same>
		'3FFC', // CJK Ideograph Extension A-3FFC <3069/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x3FFC, // (㿼) CJK Ideograph Extension A-3FFC <3069/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93E, // (㿼) CJK COMPATIBILITY IDEOGRAPH-2F93E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "益" <Same>
		'76CA', // CJK Ideograph-76CA <10443/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76CA, // (益) CJK Ideograph-76CA <10443/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA17, // (益) CJK COMPATIBILITY IDEOGRAPH-FA17 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA6, // (益) CJK COMPATIBILITY IDEOGRAPH-FAA6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "盛" <Same>
		'76DB', // CJK Ideograph-76DB <10460/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76DB, // (盛) CJK Ideograph-76DB <10460/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA7, // (盛) CJK COMPATIBILITY IDEOGRAPH-FAA7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "盧" <Same>
		'76E7', // CJK Ideograph-76E7 <10472/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76E7, // (盧) CJK Ideograph-76E7 <10472/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF933, // (盧) CJK COMPATIBILITY IDEOGRAPH-F933 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䀈" <Same>
		'4008', // CJK Ideograph Extension A-4008 <3081/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4008, // (䀈) CJK Ideograph Extension A-4008 <3081/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93F, // (䀈) CJK COMPATIBILITY IDEOGRAPH-2F93F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "目" <Same>
		'76EE', // CJK Ideograph-76EE <10479/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76EE, // (目) CJK Ideograph-76EE <10479/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F6C, // (⽬) KANGXI RADICAL EYE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "直" <Same>
		'76F4', // CJK Ideograph-76F4 <10485/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x76F4, // (直) CJK Ideograph-76F4 <10485/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA8, // (直) CJK COMPATIBILITY IDEOGRAPH-FAA8 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F940, // (直) CJK COMPATIBILITY IDEOGRAPH-2F940 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥃲" <Same>
		'250F2', // CJK Ideograph Extension B-250F2 <20723/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x250F2, // (𥃲) CJK Ideograph Extension B-250F2 <20723/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F942, // (𥃲) CJK COMPATIBILITY IDEOGRAPH-2F942 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥃳" <Same>
		'250F3', // CJK Ideograph Extension B-250F3 <20724/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x250F3, // (𥃳) CJK Ideograph Extension B-250F3 <20724/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F941, // (𥃳) CJK COMPATIBILITY IDEOGRAPH-2F941 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "省" <Same>
		'7701', // CJK Ideograph-7701 <10498/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7701, // (省) CJK Ideograph-7701 <10498/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF96D, // (省) CJK COMPATIBILITY IDEOGRAPH-F96D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䀘" <Same>
		'4018', // CJK Ideograph Extension A-4018 <3097/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4018, // (䀘) CJK Ideograph Extension A-4018 <3097/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD3, // (䀘) CJK COMPATIBILITY IDEOGRAPH-FAD3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥄙" <Same>
		'25119', // CJK Ideograph Extension B-25119 <20762/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25119, // (𥄙) CJK Ideograph Extension B-25119 <20762/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F943, // (𥄙) CJK COMPATIBILITY IDEOGRAPH-2F943 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "眞" <Same>
		'771E', // CJK Ideograph-771E <10527/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x771E, // (眞) CJK Ideograph-771E <10527/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F945, // (眞) CJK COMPATIBILITY IDEOGRAPH-2F945 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "真" <Same>
		'771F', // CJK Ideograph-771F <10528/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x771F, // (真) CJK Ideograph-771F <10528/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F946, // (真) CJK COMPATIBILITY IDEOGRAPH-2F946 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F947, // (真) CJK COMPATIBILITY IDEOGRAPH-2F947 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥄳" <Same>
		'25133', // CJK Ideograph Extension B-25133 <20788/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25133, // (𥄳) CJK Ideograph Extension B-25133 <20788/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F944, // (𥄳) CJK COMPATIBILITY IDEOGRAPH-2F944 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "着" <Same>
		'7740', // CJK Ideograph-7740 <10561/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7740, // (着) CJK Ideograph-7740 <10561/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAAA, // (着) CJK COMPATIBILITY IDEOGRAPH-FAAA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "睊" <Same>
		'774A', // CJK Ideograph-774A <10571/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x774A, // (睊) CJK Ideograph-774A <10571/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAA9, // (睊) CJK COMPATIBILITY IDEOGRAPH-FAA9 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F948, // (睊) CJK COMPATIBILITY IDEOGRAPH-2F948 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䀹" <Same>
		'4039', // CJK Ideograph Extension A-4039 <3130/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4039, // (䀹) CJK Ideograph Extension A-4039 <3130/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9FC3, // (鿃) CJK Ideograph-9FC3 <20932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD4, // (䀹) CJK COMPATIBILITY IDEOGRAPH-FAD4 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F949, // (䀹) CJK COMPATIBILITY IDEOGRAPH-2F949 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䀿" <Same>
		'403F', // CJK Ideograph Extension A-403F <3136/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x403F, // (䀿) CJK Ideograph Extension A-403F <3136/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6663, // (晣) CJK Ideograph-6663 <6244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䁆" <Same>
		'4046', // CJK Ideograph Extension A-4046 <3143/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4046, // (䁆) CJK Ideograph Extension A-4046 <3143/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94B, // (䁆) CJK COMPATIBILITY IDEOGRAPH-2F94B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瞋" <Same>
		'778B', // CJK Ideograph-778B <10636/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x778B, // (瞋) CJK Ideograph-778B <10636/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94A, // (瞋) CJK COMPATIBILITY IDEOGRAPH-2F94A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥉉" <Same>
		'25249', // CJK Ideograph Extension B-25249 <21066/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25249, // (𥉉) CJK Ideograph Extension B-25249 <21066/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD5, // (𥉉) CJK COMPATIBILITY IDEOGRAPH-FAD5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "瞧" <Same>
		'77A7', // CJK Ideograph-77A7 <10664/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x77A7, // (瞧) CJK Ideograph-77A7 <10664/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA9D, // (瞧) CJK COMPATIBILITY IDEOGRAPH-FA9D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "矛" <Same>
		'77DB', // CJK Ideograph-77DB <10716/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x77DB, // (矛) CJK Ideograph-77DB <10716/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F6D, // (⽭) KANGXI RADICAL SPEAR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "矢" <Same>
		'77E2', // CJK Ideograph-77E2 <10723/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x77E2, // (矢) CJK Ideograph-77E2 <10723/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F6E, // (⽮) KANGXI RADICAL ARROW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "石" <Same>
		'77F3', // CJK Ideograph-77F3 <10740/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x77F3, // (石) CJK Ideograph-77F3 <10740/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F6F, // (⽯) KANGXI RADICAL STONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䂖" <Same>
		'4096', // CJK Ideograph Extension A-4096 <3223/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4096, // (䂖) CJK Ideograph Extension A-4096 <3223/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94C, // (䂖) CJK COMPATIBILITY IDEOGRAPH-2F94C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥐝" <Same>
		'2541D', // CJK Ideograph Extension B-2541D <21534/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2541D, // (𥐝) CJK Ideograph Extension B-2541D <21534/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94D, // (𥐝) CJK COMPATIBILITY IDEOGRAPH-2F94D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "研" <Same>
		'7814', // CJK Ideograph-7814 <10773/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7814, // (研) CJK Ideograph-7814 <10773/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x784F, // (硏) CJK Ideograph-784F <10832/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "硎" <Same>
		'784E', // CJK Ideograph-784E <10831/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x784E, // (硎) CJK Ideograph-784E <10831/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94E, // (硎) CJK COMPATIBILITY IDEOGRAPH-2F94E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "硫" <Same>
		'786B', // CJK Ideograph-786B <10860/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x786B, // (硫) CJK Ideograph-786B <10860/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9CE, // (硫) CJK COMPATIBILITY IDEOGRAPH-F9CE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "碌" <Same>
		'788C', // CJK Ideograph-788C <10893/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x788C, // (碌) CJK Ideograph-788C <10893/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF93B, // (碌) CJK COMPATIBILITY IDEOGRAPH-F93B [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94F, // (碌) CJK COMPATIBILITY IDEOGRAPH-2F94F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "碑" <Same>
		'7891', // CJK Ideograph-7891 <10898/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7891, // (碑) CJK Ideograph-7891 <10898/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA4B, // (碑) CJK COMPATIBILITY IDEOGRAPH-FA4B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "磊" <Same>
		'78CA', // CJK Ideograph-78CA <10955/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x78CA, // (磊) CJK Ideograph-78CA <10955/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF947, // (磊) CJK COMPATIBILITY IDEOGRAPH-F947 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "磌" <Same>
		'78CC', // CJK Ideograph-78CC <10957/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x78CC, // (磌) CJK Ideograph-78CC <10957/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAAB, // (磌) CJK COMPATIBILITY IDEOGRAPH-FAAB [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F950, // (磌) CJK COMPATIBILITY IDEOGRAPH-2F950 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "磻" <Same>
		'78FB', // CJK Ideograph-78FB <11004/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x78FB, // (磻) CJK Ideograph-78FB <11004/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF964, // (磻) CJK COMPATIBILITY IDEOGRAPH-F964 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䃣" <Same>
		'40E3', // CJK Ideograph Extension A-40E3 <3300/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x40E3, // (䃣) CJK Ideograph Extension A-40E3 <3300/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F951, // (䃣) CJK COMPATIBILITY IDEOGRAPH-2F951 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "礪" <Same>
		'792A', // CJK Ideograph-792A <11051/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x792A, // (礪) CJK Ideograph-792A <11051/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF985, // (礪) CJK COMPATIBILITY IDEOGRAPH-F985 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "示" <Same>
		'793A', // CJK Ideograph-793A <11067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x793A, // (示) CJK Ideograph-793A <11067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F70, // (⽰) KANGXI RADICAL SPIRIT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "礻" <Same>
		'793B', // CJK Ideograph-793B <11068/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x793B, // (礻) CJK Ideograph-793B <11068/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EAD, // (⺭) CJK RADICAL SPIRIT TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "礼" <Same>
		'793C', // CJK Ideograph-793C <11069/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x793C, // (礼) CJK Ideograph-793C <11069/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA18, // (礼) CJK COMPATIBILITY IDEOGRAPH-FA18 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "社" <Same>
		'793E', // CJK Ideograph-793E <11071/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x793E, // (社) CJK Ideograph-793E <11071/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA4C, // (社) CJK COMPATIBILITY IDEOGRAPH-FA4C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祈" <Same>
		'7948', // CJK Ideograph-7948 <11081/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7948, // (祈) CJK Ideograph-7948 <11081/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA4E, // (祈) CJK COMPATIBILITY IDEOGRAPH-FA4E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祉" <Same>
		'7949', // CJK Ideograph-7949 <11082/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7949, // (祉) CJK Ideograph-7949 <11082/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA4D, // (祉) CJK COMPATIBILITY IDEOGRAPH-FA4D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥘦" <Same>
		'25626', // CJK Ideograph Extension B-25626 <22055/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25626, // (𥘦) CJK Ideograph Extension B-25626 <22055/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F952, // (𥘦) CJK COMPATIBILITY IDEOGRAPH-2F952 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祐" <Same>
		'7950', // CJK Ideograph-7950 <11089/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7950, // (祐) CJK Ideograph-7950 <11089/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA4F, // (祐) CJK COMPATIBILITY IDEOGRAPH-FA4F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祖" <Same>
		'7956', // CJK Ideograph-7956 <11095/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7956, // (祖) CJK Ideograph-7956 <11095/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA50, // (祖) CJK COMPATIBILITY IDEOGRAPH-FA50 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F953, // (祖) CJK COMPATIBILITY IDEOGRAPH-2F953 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祝" <Same>
		'795D', // CJK Ideograph-795D <11102/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x795D, // (祝) CJK Ideograph-795D <11102/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA51, // (祝) CJK COMPATIBILITY IDEOGRAPH-FA51 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "神" <Same>
		'795E', // CJK Ideograph-795E <11103/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x795E, // (神) CJK Ideograph-795E <11103/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA19, // (神) CJK COMPATIBILITY IDEOGRAPH-FA19 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祥" <Same>
		'7965', // CJK Ideograph-7965 <11110/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7965, // (祥) CJK Ideograph-7965 <11110/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA1A, // (祥) CJK COMPATIBILITY IDEOGRAPH-FA1A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "視" <Same>
		'8996', // CJK Ideograph-8996 <15255/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8996, // (視) CJK Ideograph-8996 <15255/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA61, // (視) CJK COMPATIBILITY IDEOGRAPH-FA61 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB8, // (視) CJK COMPATIBILITY IDEOGRAPH-FAB8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "祿" <Same>
		'797F', // CJK Ideograph-797F <11136/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x797F, // (祿) CJK Ideograph-797F <11136/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF93C, // (祿) CJK COMPATIBILITY IDEOGRAPH-F93C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥚚" <Same>
		'2569A', // CJK Ideograph Extension B-2569A <22171/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2569A, // (𥚚) CJK Ideograph Extension B-2569A <22171/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F954, // (𥚚) CJK COMPATIBILITY IDEOGRAPH-2F954 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "禍" <Same>
		'798D', // CJK Ideograph-798D <11150/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x798D, // (禍) CJK Ideograph-798D <11150/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA52, // (禍) CJK COMPATIBILITY IDEOGRAPH-FA52 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "禎" <Same>
		'798E', // CJK Ideograph-798E <11151/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x798E, // (禎) CJK Ideograph-798E <11151/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA53, // (禎) CJK COMPATIBILITY IDEOGRAPH-FA53 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "福" <Same>
		'798F', // CJK Ideograph-798F <11152/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x798F, // (福) CJK Ideograph-798F <11152/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA1B, // (福) CJK COMPATIBILITY IDEOGRAPH-FA1B [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F956, // (福) CJK COMPATIBILITY IDEOGRAPH-2F956 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥛅" <Same>
		'256C5', // CJK Ideograph Extension B-256C5 <22214/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x256C5, // (𥛅) CJK Ideograph Extension B-256C5 <22214/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F955, // (𥛅) CJK COMPATIBILITY IDEOGRAPH-2F955 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "禮" <Same>
		'79AE', // CJK Ideograph-79AE <11183/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x79AE, // (禮) CJK Ideograph-79AE <11183/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B6, // (禮) CJK COMPATIBILITY IDEOGRAPH-F9B6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "禸" <Same>
		'79B8', // CJK Ideograph-79B8 <11193/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x79B8, // (禸) CJK Ideograph-79B8 <11193/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F71, // (⽱) KANGXI RADICAL TRACK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "禾" <Same>
		'79BE', // CJK Ideograph-79BE <11199/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x79BE, // (禾) CJK Ideograph-79BE <11199/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F72, // (⽲) KANGXI RADICAL GRAIN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "秊" <Same>
		'79CA', // CJK Ideograph-79CA <11211/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x79CA, // (秊) CJK Ideograph-79CA <11211/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF995, // (秊) CJK COMPATIBILITY IDEOGRAPH-F995 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䄯" <Same>
		'412F', // CJK Ideograph Extension A-412F <3376/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x412F, // (䄯) CJK Ideograph Extension A-412F <3376/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F958, // (䄯) CJK COMPATIBILITY IDEOGRAPH-2F958 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "秫" <Same>
		'79EB', // CJK Ideograph-79EB <11244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x79EB, // (秫) CJK Ideograph-79EB <11244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F957, // (秫) CJK COMPATIBILITY IDEOGRAPH-2F957 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "稜" <Same>
		'7A1C', // CJK Ideograph-7A1C <11293/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7A1C, // (稜) CJK Ideograph-7A1C <11293/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF956, // (稜) CJK COMPATIBILITY IDEOGRAPH-F956 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "穊" <Same>
		'7A4A', // CJK Ideograph-7A4A <11339/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7A4A, // (穊) CJK Ideograph-7A4A <11339/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95A, // (穊) CJK COMPATIBILITY IDEOGRAPH-2F95A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "穀" <Same>
		'7A40', // CJK Ideograph-7A40 <11329/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7A40, // (穀) CJK Ideograph-7A40 <11329/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA54, // (穀) CJK COMPATIBILITY IDEOGRAPH-FA54 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F959, // (穀) CJK COMPATIBILITY IDEOGRAPH-2F959 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "穏" <Same>
		'7A4F', // CJK Ideograph-7A4F <11344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7A4F, // (穏) CJK Ideograph-7A4F <11344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95B, // (穏) CJK COMPATIBILITY IDEOGRAPH-2F95B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "穴" <Same>
		'7A74', // CJK Ideograph-7A74 <11381/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7A74, // (穴) CJK Ideograph-7A74 <11381/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F73, // (⽳) KANGXI RADICAL CAVE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "突" <Same>
		'7A81', // CJK Ideograph-7A81 <11394/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7A81, // (突) CJK Ideograph-7A81 <11394/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA55, // (突) CJK COMPATIBILITY IDEOGRAPH-FA55 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥥼" <Same>
		'2597C', // CJK Ideograph Extension B-2597C <22909/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2597C, // (𥥼) CJK Ideograph Extension B-2597C <22909/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95C, // (𥥼) CJK COMPATIBILITY IDEOGRAPH-2F95C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "窱" <Same>
		'7AB1', // CJK Ideograph-7AB1 <11442/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7AB1, // (窱) CJK Ideograph-7AB1 <11442/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAAC, // (窱) CJK COMPATIBILITY IDEOGRAPH-FAAC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "立" <Same>
		'7ACB', // CJK Ideograph-7ACB <11468/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7ACB, // (立) CJK Ideograph-7ACB <11468/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F7, // (立) CJK COMPATIBILITY IDEOGRAPH-F9F7 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F74, // (⽴) KANGXI RADICAL STAND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "竜" <Same>
		'7ADC', // CJK Ideograph-7ADC <11485/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7ADC, // (竜) CJK Ideograph-7ADC <11485/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EEF, // (⻯) CJK RADICAL J-SIMPLIFIED DRAGON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥪧" <Same>
		'25AA7', // CJK Ideograph Extension B-25AA7 <23208/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25AA7, // (𥪧) CJK Ideograph Extension B-25AA7 <23208/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95D, // (𥪧) CJK COMPATIBILITY IDEOGRAPH-2F95D [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95E, // (𥪧) CJK COMPATIBILITY IDEOGRAPH-2F95E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "竮" <Same>
		'7AEE', // CJK Ideograph-7AEE <11503/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7AEE, // (竮) CJK Ideograph-7AEE <11503/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95F, // (竮) CJK COMPATIBILITY IDEOGRAPH-2F95F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "竹" <Same>
		'7AF9', // CJK Ideograph-7AF9 <11514/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7AF9, // (竹) CJK Ideograph-7AF9 <11514/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F75, // (⽵) KANGXI RADICAL BAMBOO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "笠" <Same>
		'7B20', // CJK Ideograph-7B20 <11553/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7B20, // (笠) CJK Ideograph-7B20 <11553/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F8, // (笠) CJK COMPATIBILITY IDEOGRAPH-F9F8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "節" <Same>
		'7BC0', // CJK Ideograph-7BC0 <11713/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7BC0, // (節) CJK Ideograph-7BC0 <11713/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA56, // (節) CJK COMPATIBILITY IDEOGRAPH-FA56 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAAD, // (節) CJK COMPATIBILITY IDEOGRAPH-FAAD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䈂" <Same>
		'4202', // CJK Ideograph Extension A-4202 <3587/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4202, // (䈂) CJK Ideograph Extension A-4202 <3587/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F960, // (䈂) CJK COMPATIBILITY IDEOGRAPH-2F960 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥮫" <Same>
		'25BAB', // CJK Ideograph Extension B-25BAB <23468/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25BAB, // (𥮫) CJK Ideograph Extension B-25BAB <23468/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F961, // (𥮫) CJK COMPATIBILITY IDEOGRAPH-2F961 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "篆" <Same>
		'7BC6', // CJK Ideograph-7BC6 <11719/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7BC6, // (篆) CJK Ideograph-7BC6 <11719/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F962, // (篆) CJK COMPATIBILITY IDEOGRAPH-2F962 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䈧" <Same>
		'4227', // CJK Ideograph Extension A-4227 <3624/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4227, // (䈧) CJK Ideograph Extension A-4227 <3624/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F964, // (䈧) CJK COMPATIBILITY IDEOGRAPH-2F964 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "築" <Same>
		'7BC9', // CJK Ideograph-7BC9 <11722/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7BC9, // (築) CJK Ideograph-7BC9 <11722/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F963, // (築) CJK COMPATIBILITY IDEOGRAPH-2F963 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥲀" <Same>
		'25C80', // CJK Ideograph Extension B-25C80 <23681/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25C80, // (𥲀) CJK Ideograph Extension B-25C80 <23681/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F965, // (𥲀) CJK COMPATIBILITY IDEOGRAPH-2F965 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥳐" <Same>
		'25CD0', // CJK Ideograph Extension B-25CD0 <23761/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25CD0, // (𥳐) CJK Ideograph Extension B-25CD0 <23761/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD6, // (𥳐) CJK COMPATIBILITY IDEOGRAPH-FAD6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "簾" <Same>
		'7C3E', // CJK Ideograph-7C3E <11839/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7C3E, // (簾) CJK Ideograph-7C3E <11839/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A6, // (簾) CJK COMPATIBILITY IDEOGRAPH-F9A6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "籠" <Same>
		'7C60', // CJK Ideograph-7C60 <11873/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7C60, // (籠) CJK Ideograph-7C60 <11873/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF944, // (籠) CJK COMPATIBILITY IDEOGRAPH-F944 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "米" <Same>
		'7C73', // CJK Ideograph-7C73 <11892/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7C73, // (米) CJK Ideograph-7C73 <11892/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F76, // (⽶) KANGXI RADICAL RICE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "类" <Same>
		'7C7B', // CJK Ideograph-7C7B <11900/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7C7B, // (类) CJK Ideograph-7C7B <11900/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAAE, // (类) CJK COMPATIBILITY IDEOGRAPH-FAAE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "粒" <Same>
		'7C92', // CJK Ideograph-7C92 <11923/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7C92, // (粒) CJK Ideograph-7C92 <11923/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F9, // (粒) CJK COMPATIBILITY IDEOGRAPH-F9F9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "精" <Same>
		'7CBE', // CJK Ideograph-7CBE <11967/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CBE, // (精) CJK Ideograph-7CBE <11967/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA1D, // (精) CJK COMPATIBILITY IDEOGRAPH-FA1D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糒" <Same>
		'7CD2', // CJK Ideograph-7CD2 <11987/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CD2, // (糒) CJK Ideograph-7CD2 <11987/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F966, // (糒) CJK COMPATIBILITY IDEOGRAPH-2F966 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糖" <Same>
		'7CD6', // CJK Ideograph-7CD6 <11991/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CD6, // (糖) CJK Ideograph-7CD6 <11991/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA03, // (糖) CJK COMPATIBILITY IDEOGRAPH-FA03 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糨" <Same>
		'7CE8', // CJK Ideograph-7CE8 <12009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CE8, // (糨) CJK Ideograph-7CE8 <12009/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F968, // (糨) CJK COMPATIBILITY IDEOGRAPH-2F968 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䊠" <Same>
		'42A0', // CJK Ideograph Extension A-42A0 <3745/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x42A0, // (䊠) CJK Ideograph Extension A-42A0 <3745/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F967, // (䊠) CJK COMPATIBILITY IDEOGRAPH-2F967 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糣" <Same>
		'7CE3', // CJK Ideograph-7CE3 <12004/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CE3, // (糣) CJK Ideograph-7CE3 <12004/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F969, // (糣) CJK COMPATIBILITY IDEOGRAPH-2F969 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糧" <Same>
		'7CE7', // CJK Ideograph-7CE7 <12008/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CE7, // (糧) CJK Ideograph-7CE7 <12008/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF97B, // (糧) CJK COMPATIBILITY IDEOGRAPH-F97B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糸" <Same>
		'7CF8', // CJK Ideograph-7CF8 <12025/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CF8, // (糸) CJK Ideograph-7CF8 <12025/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F77, // (⽷) KANGXI RADICAL SILK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "糹" <Same>
		'7CF9', // CJK Ideograph-7CF9 <12026/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7CF9, // (糹) CJK Ideograph-7CF9 <12026/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EAF, // (⺯) CJK RADICAL SILK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𥾆" <Same>
		'25F86', // CJK Ideograph Extension B-25F86 <24455/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x25F86, // (𥾆) CJK Ideograph Extension B-25F86 <24455/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96B, // (𥾆) CJK COMPATIBILITY IDEOGRAPH-2F96B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "紀" <Same>
		'7D00', // CJK Ideograph-7D00 <12033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D00, // (紀) CJK Ideograph-7D00 <12033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96A, // (紀) CJK COMPATIBILITY IDEOGRAPH-2F96A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "紐" <Same>
		'7D10', // CJK Ideograph-7D10 <12049/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D10, // (紐) CJK Ideograph-7D10 <12049/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9CF, // (紐) CJK COMPATIBILITY IDEOGRAPH-F9CF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "索" <Same>
		'7D22', // CJK Ideograph-7D22 <12067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D22, // (索) CJK Ideograph-7D22 <12067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF96A, // (索) CJK COMPATIBILITY IDEOGRAPH-F96A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "累" <Same>
		'7D2F', // CJK Ideograph-7D2F <12080/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D2F, // (累) CJK Ideograph-7D2F <12080/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF94F, // (累) CJK COMPATIBILITY IDEOGRAPH-F94F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "絕" <Same>
		'7D55', // CJK Ideograph-7D55 <12118/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D55, // (絕) CJK Ideograph-7D55 <12118/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D76, // (絶) CJK Ideograph-7D76 <12151/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "絣" <Same>
		'7D63', // CJK Ideograph-7D63 <12132/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D63, // (絣) CJK Ideograph-7D63 <12132/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96C, // (絣) CJK COMPATIBILITY IDEOGRAPH-2F96C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "絛" <Same>
		'7D5B', // CJK Ideograph-7D5B <12124/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7D5B, // (絛) CJK Ideograph-7D5B <12124/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAAF, // (絛) CJK COMPATIBILITY IDEOGRAPH-FAAF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "綠" <Same>
		'7DA0', // CJK Ideograph-7DA0 <12193/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7DA0, // (綠) CJK Ideograph-7DA0 <12193/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF93D, // (綠) CJK COMPATIBILITY IDEOGRAPH-F93D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "綾" <Same>
		'7DBE', // CJK Ideograph-7DBE <12223/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7DBE, // (綾) CJK Ideograph-7DBE <12223/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF957, // (綾) CJK COMPATIBILITY IDEOGRAPH-F957 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "緇" <Same>
		'7DC7', // CJK Ideograph-7DC7 <12232/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7DC7, // (緇) CJK Ideograph-7DC7 <12232/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96E, // (緇) CJK COMPATIBILITY IDEOGRAPH-2F96E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "練" <Same>
		'7DF4', // CJK Ideograph-7DF4 <12277/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7DF4, // (練) CJK Ideograph-7DF4 <12277/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF996, // (練) CJK COMPATIBILITY IDEOGRAPH-F996 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA57, // (練) CJK COMPATIBILITY IDEOGRAPH-FA57 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB0, // (練) CJK COMPATIBILITY IDEOGRAPH-FAB0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "縂" <Same>
		'7E02', // CJK Ideograph-7E02 <12291/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7E02, // (縂) CJK Ideograph-7E02 <12291/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96F, // (縂) CJK COMPATIBILITY IDEOGRAPH-2F96F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䌁" <Same>
		'4301', // CJK Ideograph Extension A-4301 <3842/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4301, // (䌁) CJK Ideograph Extension A-4301 <3842/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96D, // (䌁) CJK COMPATIBILITY IDEOGRAPH-2F96D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "縉" <Same>
		'7E09', // CJK Ideograph-7E09 <12298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7E09, // (縉) CJK Ideograph-7E09 <12298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA58, // (縉) CJK COMPATIBILITY IDEOGRAPH-FA58 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "縷" <Same>
		'7E37', // CJK Ideograph-7E37 <12344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7E37, // (縷) CJK Ideograph-7E37 <12344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF950, // (縷) CJK COMPATIBILITY IDEOGRAPH-F950 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "繁" <Same>
		'7E41', // CJK Ideograph-7E41 <12354/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7E41, // (繁) CJK Ideograph-7E41 <12354/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA59, // (繁) CJK COMPATIBILITY IDEOGRAPH-FA59 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "繅" <Same>
		'7E45', // CJK Ideograph-7E45 <12358/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7E45, // (繅) CJK Ideograph-7E45 <12358/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F970, // (繅) CJK COMPATIBILITY IDEOGRAPH-2F970 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦇚" <Same>
		'261DA', // CJK Ideograph Extension B-261DA <25051/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x261DA, // (𦇚) CJK Ideograph Extension B-261DA <25051/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F898, // (𦇚) CJK COMPATIBILITY IDEOGRAPH-2F898 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䌴" <Same>
		'4334', // CJK Ideograph Extension A-4334 <3893/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4334, // (䌴) CJK Ideograph Extension A-4334 <3893/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F971, // (䌴) CJK COMPATIBILITY IDEOGRAPH-2F971 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "缶" <Same>
		'7F36', // CJK Ideograph-7F36 <12599/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F36, // (缶) CJK Ideograph-7F36 <12599/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F78, // (⽸) KANGXI RADICAL JAR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦈨" <Same>
		'26228', // CJK Ideograph Extension B-26228 <25129/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26228, // (𦈨) CJK Ideograph Extension B-26228 <25129/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F972, // (𦈨) CJK COMPATIBILITY IDEOGRAPH-2F972 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "缾" <Same>
		'7F3E', // CJK Ideograph-7F3E <12607/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F3E, // (缾) CJK Ideograph-7F3E <12607/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB1, // (缾) CJK COMPATIBILITY IDEOGRAPH-FAB1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦉇" <Same>
		'26247', // CJK Ideograph Extension B-26247 <25160/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26247, // (𦉇) CJK Ideograph Extension B-26247 <25160/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F973, // (𦉇) CJK COMPATIBILITY IDEOGRAPH-2F973 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "网" <Same>
		'7F51', // CJK Ideograph-7F51 <12626/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F51, // (网) CJK Ideograph-7F51 <12626/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F79, // (⽹) KANGXI RADICAL NET [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "罒" <Same>
		'7F52', // CJK Ideograph-7F52 <12627/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F52, // (罒) CJK Ideograph-7F52 <12627/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EAB, // (⺫) CJK RADICAL EYE [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EB2, // (⺲) CJK RADICAL NET TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "罓" <Same>
		'7F53', // CJK Ideograph-7F53 <12628/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F53, // (罓) CJK Ideograph-7F53 <12628/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EB1, // (⺱) CJK RADICAL NET ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䍙" <Same>
		'4359', // CJK Ideograph Extension A-4359 <3930/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4359, // (䍙) CJK Ideograph Extension A-4359 <3930/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F974, // (䍙) CJK COMPATIBILITY IDEOGRAPH-2F974 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "署" <Same>
		'7F72', // CJK Ideograph-7F72 <12659/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F72, // (署) CJK Ideograph-7F72 <12659/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA5A, // (署) CJK COMPATIBILITY IDEOGRAPH-FA5A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦋙" <Same>
		'262D9', // CJK Ideograph Extension B-262D9 <25306/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x262D9, // (𦋙) CJK Ideograph Extension B-262D9 <25306/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F975, // (𦋙) CJK COMPATIBILITY IDEOGRAPH-2F975 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "罹" <Same>
		'7F79', // CJK Ideograph-7F79 <12666/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F79, // (罹) CJK Ideograph-7F79 <12666/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E6, // (罹) CJK COMPATIBILITY IDEOGRAPH-F9E6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "罺" <Same>
		'7F7A', // CJK Ideograph-7F7A <12667/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F7A, // (罺) CJK Ideograph-7F7A <12667/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F976, // (罺) CJK COMPATIBILITY IDEOGRAPH-2F976 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "羅" <Same>
		'7F85', // CJK Ideograph-7F85 <12678/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F85, // (羅) CJK Ideograph-7F85 <12678/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF90F, // (羅) CJK COMPATIBILITY IDEOGRAPH-F90F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦌾" <Same>
		'2633E', // CJK Ideograph Extension B-2633E <25407/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2633E, // (𦌾) CJK Ideograph Extension B-2633E <25407/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F977, // (𦌾) CJK COMPATIBILITY IDEOGRAPH-2F977 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "羊" <Same>
		'7F8A', // CJK Ideograph-7F8A <12683/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F8A, // (羊) CJK Ideograph-7F8A <12683/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F7A, // (⽺) KANGXI RADICAL SHEEP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "羕" <Same>
		'7F95', // CJK Ideograph-7F95 <12694/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F95, // (羕) CJK Ideograph-7F95 <12694/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F978, // (羕) CJK COMPATIBILITY IDEOGRAPH-2F978 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "羚" <Same>
		'7F9A', // CJK Ideograph-7F9A <12699/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7F9A, // (羚) CJK Ideograph-7F9A <12699/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9AF, // (羚) CJK COMPATIBILITY IDEOGRAPH-F9AF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "羽" <Same>
		'7FBD', // CJK Ideograph-7FBD <12734/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7FBD, // (羽) CJK Ideograph-7FBD <12734/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA1E, // (羽) CJK COMPATIBILITY IDEOGRAPH-FA1E [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F7B, // (⽻) KANGXI RADICAL FEATHER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "翺" <Same>
		'7FFA', // CJK Ideograph-7FFA <12795/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x7FFA, // (翺) CJK Ideograph-7FFA <12795/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F979, // (翺) CJK COMPATIBILITY IDEOGRAPH-2F979 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "老" <Same>
		'8001', // CJK Ideograph-8001 <12802/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8001, // (老) CJK Ideograph-8001 <12802/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF934, // (老) CJK COMPATIBILITY IDEOGRAPH-F934 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F7C, // (⽼) KANGXI RADICAL OLD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "耂" <Same>
		'8002', // CJK Ideograph-8002 <12803/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8002, // (耂) CJK Ideograph-8002 <12803/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EB9, // (⺹) CJK RADICAL OLD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "者" <Same>
		'8005', // CJK Ideograph-8005 <12806/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8005, // (者) CJK Ideograph-8005 <12806/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA5B, // (者) CJK COMPATIBILITY IDEOGRAPH-FA5B [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB2, // (者) CJK COMPATIBILITY IDEOGRAPH-FAB2 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97A, // (者) CJK COMPATIBILITY IDEOGRAPH-2F97A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "而" <Same>
		'800C', // CJK Ideograph-800C <12813/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x800C, // (而) CJK Ideograph-800C <12813/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F7D, // (⽽) KANGXI RADICAL AND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦓚" <Same>
		'264DA', // CJK Ideograph Extension B-264DA <25819/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x264DA, // (𦓚) CJK Ideograph Extension B-264DA <25819/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97B, // (𦓚) CJK COMPATIBILITY IDEOGRAPH-2F97B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "耒" <Same>
		'8012', // CJK Ideograph-8012 <12819/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8012, // (耒) CJK Ideograph-8012 <12819/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F7E, // (⽾) KANGXI RADICAL PLOW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦔣" <Same>
		'26523', // CJK Ideograph Extension B-26523 <25892/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26523, // (𦔣) CJK Ideograph Extension B-26523 <25892/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97C, // (𦔣) CJK COMPATIBILITY IDEOGRAPH-2F97C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "耳" <Same>
		'8033', // CJK Ideograph-8033 <12852/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8033, // (耳) CJK Ideograph-8033 <12852/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F7F, // (⽿) KANGXI RADICAL EAR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "聆" <Same>
		'8046', // CJK Ideograph-8046 <12871/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8046, // (聆) CJK Ideograph-8046 <12871/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B0, // (聆) CJK COMPATIBILITY IDEOGRAPH-F9B0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "聠" <Same>
		'8060', // CJK Ideograph-8060 <12897/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8060, // (聠) CJK Ideograph-8060 <12897/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97D, // (聠) CJK COMPATIBILITY IDEOGRAPH-2F97D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦖨" <Same>
		'265A8', // CJK Ideograph Extension B-265A8 <26025/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x265A8, // (𦖨) CJK Ideograph Extension B-265A8 <26025/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97E, // (𦖨) CJK COMPATIBILITY IDEOGRAPH-2F97E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "聯" <Same>
		'806F', // CJK Ideograph-806F <12912/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x806F, // (聯) CJK Ideograph-806F <12912/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF997, // (聯) CJK COMPATIBILITY IDEOGRAPH-F997 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "聰" <Same>
		'8070', // CJK Ideograph-8070 <12913/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8070, // (聰) CJK Ideograph-8070 <12913/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97F, // (聰) CJK COMPATIBILITY IDEOGRAPH-2F97F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "聾" <Same>
		'807E', // CJK Ideograph-807E <12927/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x807E, // (聾) CJK Ideograph-807E <12927/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF945, // (聾) CJK COMPATIBILITY IDEOGRAPH-F945 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "聿" <Same>
		'807F', // CJK Ideograph-807F <12928/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x807F, // (聿) CJK Ideograph-807F <12928/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F80, // (⾀) KANGXI RADICAL BRUSH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "肀" <Same>
		'8080', // CJK Ideograph-8080 <12929/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8080, // (肀) CJK Ideograph-8080 <12929/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EBA, // (⺺) CJK RADICAL BRUSH ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "肉" <Same>
		'8089', // CJK Ideograph-8089 <12938/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8089, // (肉) CJK Ideograph-8089 <12938/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81, // (⾁) KANGXI RADICAL MEAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "肋" <Same>
		'808B', // CJK Ideograph-808B <12940/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x808B, // (肋) CJK Ideograph-808B <12940/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF953, // (肋) CJK COMPATIBILITY IDEOGRAPH-F953 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "肭" <Same>
		'80AD', // CJK Ideograph-80AD <12974/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80AD, // (肭) CJK Ideograph-80AD <12974/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D6, // (肭) CJK COMPATIBILITY IDEOGRAPH-2F8D6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "育" <Same>
		'80B2', // CJK Ideograph-80B2 <12979/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80B2, // (育) CJK Ideograph-80B2 <12979/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F982, // (育) CJK COMPATIBILITY IDEOGRAPH-2F982 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䏕" <Same>
		'43D5', // CJK Ideograph Extension A-43D5 <4054/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x43D5, // (䏕) CJK Ideograph Extension A-43D5 <4054/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F981, // (䏕) CJK COMPATIBILITY IDEOGRAPH-2F981 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䏙" <Same>
		'43D9', // CJK Ideograph Extension A-43D9 <4058/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x43D9, // (䏙) CJK Ideograph Extension A-43D9 <4058/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D7, // (䏙) CJK COMPATIBILITY IDEOGRAPH-2F8D7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "胼" <Same>
		'80FC', // CJK Ideograph-80FC <13053/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x80FC, // (胼) CJK Ideograph-80FC <13053/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8141, // (腁) CJK Ideograph-8141 <13122/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "脃" <Same>
		'8103', // CJK Ideograph-8103 <13060/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8103, // (脃) CJK Ideograph-8103 <13060/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F983, // (脃) CJK COMPATIBILITY IDEOGRAPH-2F983 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "脾" <Same>
		'813E', // CJK Ideograph-813E <13119/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x813E, // (脾) CJK Ideograph-813E <13119/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F985, // (脾) CJK COMPATIBILITY IDEOGRAPH-2F985 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䐋" <Same>
		'440B', // CJK Ideograph Extension A-440B <4108/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x440B, // (䐋) CJK Ideograph Extension A-440B <4108/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F984, // (䐋) CJK COMPATIBILITY IDEOGRAPH-2F984 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "朡" <Same>
		'6721', // CJK Ideograph-6721 <6434/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6721, // (朡) CJK Ideograph-6721 <6434/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8DA, // (朡) CJK COMPATIBILITY IDEOGRAPH-2F8DA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦞧" <Same>
		'267A7', // CJK Ideograph Extension B-267A7 <26536/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x267A7, // (𦞧) CJK Ideograph Extension B-267A7 <26536/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F987, // (𦞧) CJK COMPATIBILITY IDEOGRAPH-2F987 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦞵" <Same>
		'267B5', // CJK Ideograph Extension B-267B5 <26550/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x267B5, // (𦞵) CJK Ideograph Extension B-267B5 <26550/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F988, // (𦞵) CJK COMPATIBILITY IDEOGRAPH-2F988 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䑃" <Same>
		'4443', // CJK Ideograph Extension A-4443 <4164/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4443, // (䑃) CJK Ideograph Extension A-4443 <4164/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x6726, // (朦) CJK Ideograph-6726 <6439/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "臘" <Same>
		'81D8', // CJK Ideograph-81D8 <13273/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81D8, // (臘) CJK Ideograph-81D8 <13273/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF926, // (臘) CJK COMPATIBILITY IDEOGRAPH-F926 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "臣" <Same>
		'81E3', // CJK Ideograph-81E3 <13284/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81E3, // (臣) CJK Ideograph-81E3 <13284/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F82, // (⾂) KANGXI RADICAL MINISTER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "臨" <Same>
		'81E8', // CJK Ideograph-81E8 <13289/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81E8, // (臨) CJK Ideograph-81E8 <13289/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F6, // (臨) CJK COMPATIBILITY IDEOGRAPH-F9F6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "自" <Same>
		'81EA', // CJK Ideograph-81EA <13291/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81EA, // (自) CJK Ideograph-81EA <13291/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F83, // (⾃) KANGXI RADICAL SELF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "臭" <Same>
		'81ED', // CJK Ideograph-81ED <13294/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81ED, // (臭) CJK Ideograph-81ED <13294/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA5C, // (臭) CJK COMPATIBILITY IDEOGRAPH-FA5C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "至" <Same>
		'81F3', // CJK Ideograph-81F3 <13300/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81F3, // (至) CJK Ideograph-81F3 <13300/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F84, // (⾄) KANGXI RADICAL ARRIVE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "臼" <Same>
		'81FC', // CJK Ideograph-81FC <13309/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x81FC, // (臼) CJK Ideograph-81FC <13309/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F85, // (⾅) KANGXI RADICAL MORTAR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "舁" <Same>
		'8201', // CJK Ideograph-8201 <13314/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8201, // (舁) CJK Ideograph-8201 <13314/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F893, // (舁) CJK COMPATIBILITY IDEOGRAPH-2F893 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98B, // (舁) CJK COMPATIBILITY IDEOGRAPH-2F98B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "舄" <Same>
		'8204', // CJK Ideograph-8204 <13317/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8204, // (舄) CJK Ideograph-8204 <13317/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98C, // (舄) CJK COMPATIBILITY IDEOGRAPH-2F98C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "舌" <Same>
		'820C', // CJK Ideograph-820C <13325/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x820C, // (舌) CJK Ideograph-820C <13325/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F86, // (⾆) KANGXI RADICAL TONGUE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "舘" <Same>
		'8218', // CJK Ideograph-8218 <13337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8218, // (舘) CJK Ideograph-8218 <13337/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA6D, // (舘) CJK COMPATIBILITY IDEOGRAPH-FA6D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "舛" <Same>
		'821B', // CJK Ideograph-821B <13340/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x821B, // (舛) CJK Ideograph-821B <13340/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F87, // (⾇) KANGXI RADICAL OPPOSE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "舟" <Same>
		'821F', // CJK Ideograph-821F <13344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x821F, // (舟) CJK Ideograph-821F <13344/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88, // (⾈) KANGXI RADICAL BOAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䑫" <Same>
		'446B', // CJK Ideograph Extension A-446B <4204/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x446B, // (䑫) CJK Ideograph Extension A-446B <4204/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98E, // (䑫) CJK COMPATIBILITY IDEOGRAPH-2F98E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "艮" <Same>
		'826E', // CJK Ideograph-826E <13423/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x826E, // (艮) CJK Ideograph-826E <13423/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F89, // (⾉) KANGXI RADICAL STOPPING [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "良" <Same>
		'826F', // CJK Ideograph-826F <13424/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x826F, // (良) CJK Ideograph-826F <13424/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF97C, // (良) CJK COMPATIBILITY IDEOGRAPH-F97C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "色" <Same>
		'8272', // CJK Ideograph-8272 <13427/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8272, // (色) CJK Ideograph-8272 <13427/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8A, // (⾊) KANGXI RADICAL COLOR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "艸" <Same>
		'8278', // CJK Ideograph-8278 <13433/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8278, // (艸) CJK Ideograph-8278 <13433/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8B, // (⾋) KANGXI RADICAL GRASS [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "艹" <Same>
		'8279', // CJK Ideograph-8279 <13434/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8279, // (艹) CJK Ideograph-8279 <13434/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA5D, // (艹) CJK COMPATIBILITY IDEOGRAPH-FA5D [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA5E, // (艹) CJK COMPATIBILITY IDEOGRAPH-FA5E [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EBE, // (⺾) CJK RADICAL GRASS ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EBF, // (⺿) CJK RADICAL GRASS TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC0, // (⻀) CJK RADICAL GRASS THREE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "芋" <Same>
		'828B', // CJK Ideograph-828B <13452/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x828B, // (芋) CJK Ideograph-828B <13452/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F990, // (芋) CJK COMPATIBILITY IDEOGRAPH-2F990 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "芑" <Same>
		'8291', // CJK Ideograph-8291 <13458/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8291, // (芑) CJK Ideograph-8291 <13458/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98F, // (芑) CJK COMPATIBILITY IDEOGRAPH-2F98F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "芝" <Same>
		'829D', // CJK Ideograph-829D <13470/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x829D, // (芝) CJK Ideograph-829D <13470/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F991, // (芝) CJK COMPATIBILITY IDEOGRAPH-2F991 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "花" <Same>
		'82B1', // CJK Ideograph-82B1 <13490/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x82B1, // (花) CJK Ideograph-82B1 <13490/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F993, // (花) CJK COMPATIBILITY IDEOGRAPH-2F993 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "芳" <Same>
		'82B3', // CJK Ideograph-82B3 <13492/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x82B3, // (芳) CJK Ideograph-82B3 <13492/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F994, // (芳) CJK COMPATIBILITY IDEOGRAPH-2F994 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "芽" <Same>
		'82BD', // CJK Ideograph-82BD <13502/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x82BD, // (芽) CJK Ideograph-82BD <13502/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F995, // (芽) CJK COMPATIBILITY IDEOGRAPH-2F995 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "若" <Same>
		'82E5', // CJK Ideograph-82E5 <13542/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x82E5, // (若) CJK Ideograph-82E5 <13542/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF974, // (若) CJK COMPATIBILITY IDEOGRAPH-F974 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F998, // (若) CJK COMPATIBILITY IDEOGRAPH-2F998 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "苦" <Same>
		'82E6', // CJK Ideograph-82E6 <13543/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x82E6, // (苦) CJK Ideograph-82E6 <13543/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F996, // (苦) CJK COMPATIBILITY IDEOGRAPH-2F996 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦬼" <Same>
		'26B3C', // CJK Ideograph Extension B-26B3C <27453/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26B3C, // (𦬼) CJK Ideograph Extension B-26B3C <27453/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F997, // (𦬼) CJK COMPATIBILITY IDEOGRAPH-2F997 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "茶" <Same>
		'8336', // CJK Ideograph-8336 <13623/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8336, // (茶) CJK Ideograph-8336 <13623/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9FE, // (茶) CJK COMPATIBILITY IDEOGRAPH-F9FE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "荒" <Same>
		'8352', // CJK Ideograph-8352 <13651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8352, // (荒) CJK Ideograph-8352 <13651/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB3, // (荒) CJK COMPATIBILITY IDEOGRAPH-FAB3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "荣" <Same>
		'8363', // CJK Ideograph-8363 <13668/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8363, // (荣) CJK Ideograph-8363 <13668/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99A, // (荣) CJK COMPATIBILITY IDEOGRAPH-2F99A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "茝" <Same>
		'831D', // CJK Ideograph-831D <13598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x831D, // (茝) CJK Ideograph-831D <13598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F999, // (茝) CJK COMPATIBILITY IDEOGRAPH-2F999 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "茣" <Same>
		'8323', // CJK Ideograph-8323 <13604/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8323, // (茣) CJK Ideograph-8323 <13604/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99C, // (茣) CJK COMPATIBILITY IDEOGRAPH-2F99C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "莽" <Same>
		'83BD', // CJK Ideograph-83BD <13758/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83BD, // (莽) CJK Ideograph-83BD <13758/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99D, // (莽) CJK COMPATIBILITY IDEOGRAPH-2F99D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "荓" <Same>
		'8353', // CJK Ideograph-8353 <13652/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8353, // (荓) CJK Ideograph-8353 <13652/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A0, // (荓) CJK COMPATIBILITY IDEOGRAPH-2F9A0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "菉" <Same>
		'83C9', // CJK Ideograph-83C9 <13770/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83C9, // (菉) CJK Ideograph-83C9 <13770/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF93E, // (菉) CJK COMPATIBILITY IDEOGRAPH-F93E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "菊" <Same>
		'83CA', // CJK Ideograph-83CA <13771/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83CA, // (菊) CJK Ideograph-83CA <13771/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A1, // (菊) CJK COMPATIBILITY IDEOGRAPH-2F9A1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "菌" <Same>
		'83CC', // CJK Ideograph-83CC <13773/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83CC, // (菌) CJK Ideograph-83CC <13773/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A2, // (菌) CJK COMPATIBILITY IDEOGRAPH-2F9A2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "菜" <Same>
		'83DC', // CJK Ideograph-83DC <13789/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83DC, // (菜) CJK Ideograph-83DC <13789/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A3, // (菜) CJK COMPATIBILITY IDEOGRAPH-2F9A3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "菧" <Same>
		'83E7', // CJK Ideograph-83E7 <13800/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83E7, // (菧) CJK Ideograph-83E7 <13800/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99E, // (菧) CJK COMPATIBILITY IDEOGRAPH-2F99E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "華" <Same>
		'83EF', // CJK Ideograph-83EF <13808/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83EF, // (華) CJK Ideograph-83EF <13808/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB4, // (華) CJK COMPATIBILITY IDEOGRAPH-FAB4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "菱" <Same>
		'83F1', // CJK Ideograph-83F1 <13810/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83F1, // (菱) CJK Ideograph-83F1 <13810/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF958, // (菱) CJK COMPATIBILITY IDEOGRAPH-F958 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "著" <Same>
		'8457', // CJK Ideograph-8457 <13912/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8457, // (著) CJK Ideograph-8457 <13912/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA5F, // (著) CJK COMPATIBILITY IDEOGRAPH-FA5F [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99F, // (著) CJK COMPATIBILITY IDEOGRAPH-2F99F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦰶" <Same>
		'26C36', // CJK Ideograph Extension B-26C36 <27703/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26C36, // (𦰶) CJK Ideograph Extension B-26C36 <27703/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A4, // (𦰶) CJK COMPATIBILITY IDEOGRAPH-2F9A4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "莭" <Same>
		'83AD', // CJK Ideograph-83AD <13742/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x83AD, // (莭) CJK Ideograph-83AD <13742/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99B, // (莭) CJK COMPATIBILITY IDEOGRAPH-2F99B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "落" <Same>
		'843D', // CJK Ideograph-843D <13886/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x843D, // (落) CJK Ideograph-843D <13886/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF918, // (落) CJK COMPATIBILITY IDEOGRAPH-F918 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "葉" <Same>
		'8449', // CJK Ideograph-8449 <13898/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8449, // (葉) CJK Ideograph-8449 <13898/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF96E, // (葉) CJK COMPATIBILITY IDEOGRAPH-F96E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蒍" <Same>
		'848D', // CJK Ideograph-848D <13966/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x848D, // (蒍) CJK Ideograph-848D <13966/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x853F, // (蔿) CJK Ideograph-853F <14144/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦳕" <Same>
		'26CD5', // CJK Ideograph Extension B-26CD5 <27862/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26CD5, // (𦳕) CJK Ideograph Extension B-26CD5 <27862/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A6, // (𦳕) CJK COMPATIBILITY IDEOGRAPH-2F9A6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦵫" <Same>
		'26D6B', // CJK Ideograph Extension B-26D6B <28012/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26D6B, // (𦵫) CJK Ideograph Extension B-26D6B <28012/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A5, // (𦵫) CJK COMPATIBILITY IDEOGRAPH-2F9A5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蓮" <Same>
		'84EE', // CJK Ideograph-84EE <14063/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x84EE, // (蓮) CJK Ideograph-84EE <14063/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF999, // (蓮) CJK COMPATIBILITY IDEOGRAPH-F999 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蓱" <Same>
		'84F1', // CJK Ideograph-84F1 <14066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x84F1, // (蓱) CJK Ideograph-84F1 <14066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A8, // (蓱) CJK COMPATIBILITY IDEOGRAPH-2F9A8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蓳" <Same>
		'84F3', // CJK Ideograph-84F3 <14068/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x84F3, // (蓳) CJK Ideograph-84F3 <14068/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A9, // (蓳) CJK COMPATIBILITY IDEOGRAPH-2F9A9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蓼" <Same>
		'84FC', // CJK Ideograph-84FC <14077/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x84FC, // (蓼) CJK Ideograph-84FC <14077/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C2, // (蓼) CJK COMPATIBILITY IDEOGRAPH-F9C2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蔖" <Same>
		'8516', // CJK Ideograph-8516 <14103/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8516, // (蔖) CJK Ideograph-8516 <14103/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9AA, // (蔖) CJK COMPATIBILITY IDEOGRAPH-2F9AA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䔫" <Same>
		'452B', // CJK Ideograph Extension A-452B <4396/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x452B, // (䔫) CJK Ideograph Extension A-452B <4396/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A7, // (䔫) CJK COMPATIBILITY IDEOGRAPH-2F9A7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蕤" <Same>
		'8564', // CJK Ideograph-8564 <14181/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8564, // (蕤) CJK Ideograph-8564 <14181/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9AC, // (蕤) CJK COMPATIBILITY IDEOGRAPH-2F9AC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦼬" <Same>
		'26F2C', // CJK Ideograph Extension B-26F2C <28461/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26F2C, // (𦼬) CJK Ideograph Extension B-26F2C <28461/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9AD, // (𦼬) CJK COMPATIBILITY IDEOGRAPH-2F9AD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "藍" <Same>
		'85CD', // CJK Ideograph-85CD <14286/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x85CD, // (藍) CJK Ideograph-85CD <14286/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF923, // (藍) CJK COMPATIBILITY IDEOGRAPH-F923 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䕝" <Same>
		'455D', // CJK Ideograph Extension A-455D <4446/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x455D, // (䕝) CJK Ideograph Extension A-455D <4446/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9AE, // (䕝) CJK COMPATIBILITY IDEOGRAPH-2F9AE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𦾱" <Same>
		'26FB1', // CJK Ideograph Extension B-26FB1 <28594/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x26FB1, // (𦾱) CJK Ideograph Extension B-26FB1 <28594/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B0, // (𦾱) CJK COMPATIBILITY IDEOGRAPH-2F9B0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䕡" <Same>
		'4561', // CJK Ideograph Extension A-4561 <4450/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4561, // (䕡) CJK Ideograph Extension A-4561 <4450/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9AF, // (䕡) CJK COMPATIBILITY IDEOGRAPH-2F9AF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "藺" <Same>
		'85FA', // CJK Ideograph-85FA <14331/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x85FA, // (藺) CJK Ideograph-85FA <14331/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F0, // (藺) CJK COMPATIBILITY IDEOGRAPH-F9F0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蘆" <Same>
		'8606', // CJK Ideograph-8606 <14343/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8606, // (蘆) CJK Ideograph-8606 <14343/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF935, // (蘆) CJK COMPATIBILITY IDEOGRAPH-F935 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䕫" <Same>
		'456B', // CJK Ideograph Extension A-456B <4460/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x456B, // (䕫) CJK Ideograph Extension A-456B <4460/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B2, // (䕫) CJK COMPATIBILITY IDEOGRAPH-2F9B2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蘒" <Same>
		'8612', // CJK Ideograph-8612 <14355/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8612, // (蘒) CJK Ideograph-8612 <14355/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA20, // (蘒) CJK COMPATIBILITY IDEOGRAPH-FA20 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蘭" <Same>
		'862D', // CJK Ideograph-862D <14382/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x862D, // (蘭) CJK Ideograph-862D <14382/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF91F, // (蘭) CJK COMPATIBILITY IDEOGRAPH-F91F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧃒" <Same>
		'270D2', // CJK Ideograph Extension B-270D2 <28883/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x270D2, // (𧃒) CJK Ideograph Extension B-270D2 <28883/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B1, // (𧃒) CJK COMPATIBILITY IDEOGRAPH-2F9B1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蘷" <Same>
		'8637', // CJK Ideograph-8637 <14392/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8637, // (蘷) CJK Ideograph-8637 <14392/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8641, // (虁) CJK Ideograph-8641 <14402/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蘿" <Same>
		'863F', // CJK Ideograph-863F <14400/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x863F, // (蘿) CJK Ideograph-863F <14400/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF910, // (蘿) CJK COMPATIBILITY IDEOGRAPH-F910 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虍" <Same>
		'864D', // CJK Ideograph-864D <14414/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x864D, // (虍) CJK Ideograph-864D <14414/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8C, // (⾌) KANGXI RADICAL TIGER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虎" <Same>
		'864E', // CJK Ideograph-864E <14415/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x864E, // (虎) CJK Ideograph-864E <14415/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC1, // (⻁) CJK RADICAL TIGER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虐" <Same>
		'8650', // CJK Ideograph-8650 <14417/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8650, // (虐) CJK Ideograph-8650 <14417/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B3, // (虐) CJK COMPATIBILITY IDEOGRAPH-2F9B3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虜" <Same>
		'865C', // CJK Ideograph-865C <14429/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x865C, // (虜) CJK Ideograph-865C <14429/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF936, // (虜) CJK COMPATIBILITY IDEOGRAPH-F936 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B4, // (虜) CJK COMPATIBILITY IDEOGRAPH-2F9B4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虧" <Same>
		'8667', // CJK Ideograph-8667 <14440/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8667, // (虧) CJK Ideograph-8667 <14440/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B5, // (虧) CJK COMPATIBILITY IDEOGRAPH-2F9B5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虩" <Same>
		'8669', // CJK Ideograph-8669 <14442/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8669, // (虩) CJK Ideograph-8669 <14442/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B6, // (虩) CJK COMPATIBILITY IDEOGRAPH-2F9B6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "虫" <Same>
		'866B', // CJK Ideograph-866B <14444/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x866B, // (虫) CJK Ideograph-866B <14444/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8D, // (⾍) KANGXI RADICAL INSECT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蚩" <Same>
		'86A9', // CJK Ideograph-86A9 <14506/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x86A9, // (蚩) CJK Ideograph-86A9 <14506/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B7, // (蚩) CJK COMPATIBILITY IDEOGRAPH-2F9B7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蚈" <Same>
		'8688', // CJK Ideograph-8688 <14473/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8688, // (蚈) CJK Ideograph-8688 <14473/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B8, // (蚈) CJK COMPATIBILITY IDEOGRAPH-2F9B8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蛢" <Same>
		'86E2', // CJK Ideograph-86E2 <14563/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x86E2, // (蛢) CJK Ideograph-86E2 <14563/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9BA, // (蛢) CJK COMPATIBILITY IDEOGRAPH-2F9BA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蜎" <Same>
		'870E', // CJK Ideograph-870E <14607/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x870E, // (蜎) CJK Ideograph-870E <14607/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B9, // (蜎) CJK COMPATIBILITY IDEOGRAPH-2F9B9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蜨" <Same>
		'8728', // CJK Ideograph-8728 <14633/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8728, // (蜨) CJK Ideograph-8728 <14633/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9BC, // (蜨) CJK COMPATIBILITY IDEOGRAPH-2F9BC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蝫" <Same>
		'876B', // CJK Ideograph-876B <14700/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x876B, // (蝫) CJK Ideograph-876B <14700/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9BD, // (蝫) CJK COMPATIBILITY IDEOGRAPH-2F9BD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蟡" <Same>
		'87E1', // CJK Ideograph-87E1 <14818/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x87E1, // (蟡) CJK Ideograph-87E1 <14818/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C0, // (蟡) CJK COMPATIBILITY IDEOGRAPH-2F9C0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蝹" <Same>
		'8779', // CJK Ideograph-8779 <14714/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8779, // (蝹) CJK Ideograph-8779 <14714/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB5, // (蝹) CJK COMPATIBILITY IDEOGRAPH-FAB5 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9BB, // (蝹) CJK COMPATIBILITY IDEOGRAPH-2F9BB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "螆" <Same>
		'8786', // CJK Ideograph-8786 <14727/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8786, // (螆) CJK Ideograph-8786 <14727/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9BE, // (螆) CJK COMPATIBILITY IDEOGRAPH-2F9BE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䗗" <Same>
		'45D7', // CJK Ideograph Extension A-45D7 <4568/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x45D7, // (䗗) CJK Ideograph Extension A-45D7 <4568/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9BF, // (䗗) CJK COMPATIBILITY IDEOGRAPH-2F9BF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧏊" <Same>
		'273CA', // CJK Ideograph Extension B-273CA <29643/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x273CA, // (𧏊) CJK Ideograph Extension B-273CA <29643/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9AB, // (𧏊) CJK COMPATIBILITY IDEOGRAPH-2F9AB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "螺" <Same>
		'87BA', // CJK Ideograph-87BA <14779/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x87BA, // (螺) CJK Ideograph-87BA <14779/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF911, // (螺) CJK COMPATIBILITY IDEOGRAPH-F911 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蠁" <Same>
		'8801', // CJK Ideograph-8801 <14850/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8801, // (蠁) CJK Ideograph-8801 <14850/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C1, // (蠁) CJK COMPATIBILITY IDEOGRAPH-2F9C1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䗹" <Same>
		'45F9', // CJK Ideograph Extension A-45F9 <4602/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x45F9, // (䗹) CJK Ideograph Extension A-45F9 <4602/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C2, // (䗹) CJK COMPATIBILITY IDEOGRAPH-2F9C2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "蠟" <Same>
		'881F', // CJK Ideograph-881F <14880/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x881F, // (蠟) CJK Ideograph-881F <14880/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF927, // (蠟) CJK COMPATIBILITY IDEOGRAPH-F927 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "血" <Same>
		'8840', // CJK Ideograph-8840 <14913/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8840, // (血) CJK Ideograph-8840 <14913/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8E, // (⾎) KANGXI RADICAL BLOOD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "行" <Same>
		'884C', // CJK Ideograph-884C <14925/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x884C, // (行) CJK Ideograph-884C <14925/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA08, // (行) CJK COMPATIBILITY IDEOGRAPH-FA08 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F8F, // (⾏) KANGXI RADICAL WALK ENCLOSURE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "衠" <Same>
		'8860', // CJK Ideograph-8860 <14945/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8860, // (衠) CJK Ideograph-8860 <14945/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C3, // (衠) CJK COMPATIBILITY IDEOGRAPH-2F9C3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "衣" <Same>
		'8863', // CJK Ideograph-8863 <14948/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8863, // (衣) CJK Ideograph-8863 <14948/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C4, // (衣) CJK COMPATIBILITY IDEOGRAPH-2F9C4 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F90, // (⾐) KANGXI RADICAL CLOTHES [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "衤" <Same>
		'8864', // CJK Ideograph-8864 <14949/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8864, // (衤) CJK Ideograph-8864 <14949/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC2, // (⻂) CJK RADICAL CLOTHES [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裂" <Same>
		'88C2', // CJK Ideograph-88C2 <15043/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88C2, // (裂) CJK Ideograph-88C2 <15043/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A0, // (裂) CJK COMPATIBILITY IDEOGRAPH-F9A0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧙧" <Same>
		'27667', // CJK Ideograph Extension B-27667 <30312/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x27667, // (𧙧) CJK Ideograph Extension B-27667 <30312/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C5, // (𧙧) CJK COMPATIBILITY IDEOGRAPH-2F9C5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裏" <Same>
		'88CF', // CJK Ideograph-88CF <15056/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88CF, // (裏) CJK Ideograph-88CF <15056/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E7, // (裏) CJK COMPATIBILITY IDEOGRAPH-F9E7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裗" <Same>
		'88D7', // CJK Ideograph-88D7 <15064/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88D7, // (裗) CJK Ideograph-88D7 <15064/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C6, // (裗) CJK COMPATIBILITY IDEOGRAPH-2F9C6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裞" <Same>
		'88DE', // CJK Ideograph-88DE <15071/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88DE, // (裞) CJK Ideograph-88DE <15071/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C7, // (裞) CJK COMPATIBILITY IDEOGRAPH-2F9C7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裡" <Same>
		'88E1', // CJK Ideograph-88E1 <15074/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88E1, // (裡) CJK Ideograph-88E1 <15074/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E8, // (裡) CJK COMPATIBILITY IDEOGRAPH-F9E8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裸" <Same>
		'88F8', // CJK Ideograph-88F8 <15097/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88F8, // (裸) CJK Ideograph-88F8 <15097/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF912, // (裸) CJK COMPATIBILITY IDEOGRAPH-F912 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "裺" <Same>
		'88FA', // CJK Ideograph-88FA <15099/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x88FA, // (裺) CJK Ideograph-88FA <15099/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C9, // (裺) CJK COMPATIBILITY IDEOGRAPH-2F9C9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䘵" <Same>
		'4635', // CJK Ideograph Extension A-4635 <4662/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4635, // (䘵) CJK Ideograph Extension A-4635 <4662/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C8, // (䘵) CJK COMPATIBILITY IDEOGRAPH-2F9C8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "褐" <Same>
		'8910', // CJK Ideograph-8910 <15121/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8910, // (褐) CJK Ideograph-8910 <15121/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA60, // (褐) CJK COMPATIBILITY IDEOGRAPH-FA60 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "襁" <Same>
		'8941', // CJK Ideograph-8941 <15170/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8941, // (襁) CJK Ideograph-8941 <15170/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB6, // (襁) CJK COMPATIBILITY IDEOGRAPH-FAB6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "襤" <Same>
		'8964', // CJK Ideograph-8964 <15205/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8964, // (襤) CJK Ideograph-8964 <15205/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF924, // (襤) CJK COMPATIBILITY IDEOGRAPH-F924 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "襾" <Same>
		'897E', // CJK Ideograph-897E <15231/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x897E, // (襾) CJK Ideograph-897E <15231/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F91, // (⾑) KANGXI RADICAL WEST [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "西" <Same>
		'897F', // CJK Ideograph-897F <15232/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x897F, // (西) CJK Ideograph-897F <15232/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC4, // (⻄) CJK RADICAL WEST TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "覀" <Same>
		'8980', // CJK Ideograph-8980 <15233/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8980, // (覀) CJK Ideograph-8980 <15233/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC3, // (⻃) CJK RADICAL WEST ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "覆" <Same>
		'8986', // CJK Ideograph-8986 <15239/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8986, // (覆) CJK Ideograph-8986 <15239/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB7, // (覆) CJK COMPATIBILITY IDEOGRAPH-FAB7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "見" <Same>
		'898B', // CJK Ideograph-898B <15244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x898B, // (見) CJK Ideograph-898B <15244/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA0A, // (見) CJK COMPATIBILITY IDEOGRAPH-FA0A [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F92, // (⾒) KANGXI RADICAL SEE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧢮" <Same>
		'278AE', // CJK Ideograph Extension B-278AE <30895/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x278AE, // (𧢮) CJK Ideograph Extension B-278AE <30895/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9CB, // (𧢮) CJK COMPATIBILITY IDEOGRAPH-2F9CB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "见" <Same>
		'89C1', // CJK Ideograph-89C1 <15298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x89C1, // (见) CJK Ideograph-89C1 <15298/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC5, // (⻅) CJK RADICAL C-SIMPLIFIED SEE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "角" <Same>
		'89D2', // CJK Ideograph-89D2 <15315/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x89D2, // (角) CJK Ideograph-89D2 <15315/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F93, // (⾓) KANGXI RADICAL HORN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "言" <Same>
		'8A00', // CJK Ideograph-8A00 <15361/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8A00, // (言) CJK Ideograph-8A00 <15361/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F94, // (⾔) KANGXI RADICAL SPEECH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧥦" <Same>
		'27966', // CJK Ideograph Extension B-27966 <31079/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x27966, // (𧥦) CJK Ideograph Extension B-27966 <31079/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9CC, // (𧥦) CJK COMPATIBILITY IDEOGRAPH-2F9CC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "訮" <Same>
		'8A2E', // CJK Ideograph-8A2E <15407/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8A2E, // (訮) CJK Ideograph-8A2E <15407/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8A7D, // (詽) CJK Ideograph-8A7D <15486/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䚶" <Same>
		'46B6', // CJK Ideograph Extension A-46B6 <4791/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x46B6, // (䚶) CJK Ideograph Extension A-46B6 <4791/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8A1E, // (訞) CJK Ideograph-8A1E <15391/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䚾" <Same>
		'46BE', // CJK Ideograph Extension A-46BE <4799/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x46BE, // (䚾) CJK Ideograph Extension A-46BE <4799/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9CD, // (䚾) CJK COMPATIBILITY IDEOGRAPH-2F9CD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䛇" <Same>
		'46C7', // CJK Ideograph Extension A-46C7 <4808/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x46C7, // (䛇) CJK Ideograph Extension A-46C7 <4808/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9CE, // (䛇) CJK COMPATIBILITY IDEOGRAPH-2F9CE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "誠" <Same>
		'8AA0', // CJK Ideograph-8AA0 <15521/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AA0, // (誠) CJK Ideograph-8AA0 <15521/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9CF, // (誠) CJK COMPATIBILITY IDEOGRAPH-2F9CF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "說" <Same>
		'8AAA', // CJK Ideograph-8AAA <15531/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AAA, // (說) CJK Ideograph-8AAA <15531/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF96F, // (說) CJK COMPATIBILITY IDEOGRAPH-F96F [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9A1, // (說) CJK COMPATIBILITY IDEOGRAPH-F9A1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "調" <Same>
		'8ABF', // CJK Ideograph-8ABF <15552/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8ABF, // (調) CJK Ideograph-8ABF <15552/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAB9, // (調) CJK COMPATIBILITY IDEOGRAPH-FAB9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "請" <Same>
		'8ACB', // CJK Ideograph-8ACB <15564/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8ACB, // (請) CJK Ideograph-8ACB <15564/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFABB, // (請) CJK COMPATIBILITY IDEOGRAPH-FABB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "諒" <Same>
		'8AD2', // CJK Ideograph-8AD2 <15571/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AD2, // (諒) CJK Ideograph-8AD2 <15571/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF97D, // (諒) CJK COMPATIBILITY IDEOGRAPH-F97D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "論" <Same>
		'8AD6', // CJK Ideograph-8AD6 <15575/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AD6, // (論) CJK Ideograph-8AD6 <15575/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF941, // (論) CJK COMPATIBILITY IDEOGRAPH-F941 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "諭" <Same>
		'8AED', // CJK Ideograph-8AED <15598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AED, // (諭) CJK Ideograph-8AED <15598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFABE, // (諭) CJK COMPATIBILITY IDEOGRAPH-FABE [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D0, // (諭) CJK COMPATIBILITY IDEOGRAPH-2F9D0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "諸" <Same>
		'8AF8', // CJK Ideograph-8AF8 <15609/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AF8, // (諸) CJK Ideograph-8AF8 <15609/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA22, // (諸) CJK COMPATIBILITY IDEOGRAPH-FA22 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFABA, // (諸) CJK COMPATIBILITY IDEOGRAPH-FABA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "諾" <Same>
		'8AFE', // CJK Ideograph-8AFE <15615/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8AFE, // (諾) CJK Ideograph-8AFE <15615/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF95D, // (諾) CJK COMPATIBILITY IDEOGRAPH-F95D [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFABD, // (諾) CJK COMPATIBILITY IDEOGRAPH-FABD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "謁" <Same>
		'8B01', // CJK Ideograph-8B01 <15618/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B01, // (謁) CJK Ideograph-8B01 <15618/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA62, // (謁) CJK COMPATIBILITY IDEOGRAPH-FA62 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFABC, // (謁) CJK COMPATIBILITY IDEOGRAPH-FABC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "謹" <Same>
		'8B39', // CJK Ideograph-8B39 <15674/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B39, // (謹) CJK Ideograph-8B39 <15674/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA63, // (謹) CJK COMPATIBILITY IDEOGRAPH-FA63 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFABF, // (謹) CJK COMPATIBILITY IDEOGRAPH-FABF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "識" <Same>
		'8B58', // CJK Ideograph-8B58 <15705/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B58, // (識) CJK Ideograph-8B58 <15705/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9FC, // (識) CJK COMPATIBILITY IDEOGRAPH-F9FC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "讀" <Same>
		'8B80', // CJK Ideograph-8B80 <15745/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B80, // (讀) CJK Ideograph-8B80 <15745/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF95A, // (讀) CJK COMPATIBILITY IDEOGRAPH-F95A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "讆" <Same>
		'8B86', // CJK Ideograph-8B86 <15751/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B86, // (讆) CJK Ideograph-8B86 <15751/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B8F, // (讏) CJK Ideograph-8B8F <15760/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "變" <Same>
		'8B8A', // CJK Ideograph-8B8A <15755/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8B8A, // (變) CJK Ideograph-8B8A <15755/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC0, // (變) CJK COMPATIBILITY IDEOGRAPH-FAC0 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D1, // (變) CJK COMPATIBILITY IDEOGRAPH-2F9D1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "讠" <Same>
		'8BA0', // CJK Ideograph-8BA0 <15777/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8BA0, // (讠) CJK Ideograph-8BA0 <15777/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC8, // (⻈) CJK RADICAL C-SIMPLIFIED SPEECH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "谷" <Same>
		'8C37', // CJK Ideograph-8C37 <15928/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C37, // (谷) CJK Ideograph-8C37 <15928/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F95, // (⾕) KANGXI RADICAL VALLEY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "豆" <Same>
		'8C46', // CJK Ideograph-8C46 <15943/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C46, // (豆) CJK Ideograph-8C46 <15943/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F96, // (⾖) KANGXI RADICAL BEAN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "豈" <Same>
		'8C48', // CJK Ideograph-8C48 <15945/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C48, // (豈) CJK Ideograph-8C48 <15945/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF900, // (豈) CJK COMPATIBILITY IDEOGRAPH-F900 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "豕" <Same>
		'8C55', // CJK Ideograph-8C55 <15958/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C55, // (豕) CJK Ideograph-8C55 <15958/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D2, // (豕) CJK COMPATIBILITY IDEOGRAPH-2F9D2 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F97, // (⾗) KANGXI RADICAL PIG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "豜" <Same>
		'8C5C', // CJK Ideograph-8C5C <15965/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C5C, // (豜) CJK Ideograph-8C5C <15965/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C63, // (豣) CJK Ideograph-8C63 <15972/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "豸" <Same>
		'8C78', // CJK Ideograph-8C78 <15993/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C78, // (豸) CJK Ideograph-8C78 <15993/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98, // (⾘) KANGXI RADICAL BADGER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧲨" <Same>
		'27CA8', // CJK Ideograph Extension B-27CA8 <31913/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x27CA8, // (𧲨) CJK Ideograph Extension B-27CA8 <31913/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D3, // (𧲨) CJK COMPATIBILITY IDEOGRAPH-2F9D3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "貝" <Same>
		'8C9D', // CJK Ideograph-8C9D <16030/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8C9D, // (貝) CJK Ideograph-8C9D <16030/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F99, // (⾙) KANGXI RADICAL SHELL [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "貫" <Same>
		'8CAB', // CJK Ideograph-8CAB <16044/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8CAB, // (貫) CJK Ideograph-8CAB <16044/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D4, // (貫) CJK COMPATIBILITY IDEOGRAPH-2F9D4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "賁" <Same>
		'8CC1', // CJK Ideograph-8CC1 <16066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8CC1, // (賁) CJK Ideograph-8CC1 <16066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D5, // (賁) CJK COMPATIBILITY IDEOGRAPH-2F9D5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "賂" <Same>
		'8CC2', // CJK Ideograph-8CC2 <16067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8CC2, // (賂) CJK Ideograph-8CC2 <16067/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF948, // (賂) CJK COMPATIBILITY IDEOGRAPH-F948 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "賈" <Same>
		'8CC8', // CJK Ideograph-8CC8 <16073/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8CC8, // (賈) CJK Ideograph-8CC8 <16073/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF903, // (賈) CJK COMPATIBILITY IDEOGRAPH-F903 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "賓" <Same>
		'8CD3', // CJK Ideograph-8CD3 <16084/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8CD3, // (賓) CJK Ideograph-8CD3 <16084/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA64, // (賓) CJK COMPATIBILITY IDEOGRAPH-FA64 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "贈" <Same>
		'8D08', // CJK Ideograph-8D08 <16137/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D08, // (贈) CJK Ideograph-8D08 <16137/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA65, // (贈) CJK COMPATIBILITY IDEOGRAPH-FA65 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC1, // (贈) CJK COMPATIBILITY IDEOGRAPH-FAC1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "贛" <Same>
		'8D1B', // CJK Ideograph-8D1B <16156/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D1B, // (贛) CJK Ideograph-8D1B <16156/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D6, // (贛) CJK COMPATIBILITY IDEOGRAPH-2F9D6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "贝" <Same>
		'8D1D', // CJK Ideograph-8D1D <16158/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D1D, // (贝) CJK Ideograph-8D1D <16158/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EC9, // (⻉) CJK RADICAL C-SIMPLIFIED SHELL [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "赤" <Same>
		'8D64', // CJK Ideograph-8D64 <16229/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D64, // (赤) CJK Ideograph-8D64 <16229/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9A, // (⾚) KANGXI RADICAL RED [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "走" <Same>
		'8D70', // CJK Ideograph-8D70 <16241/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D70, // (走) CJK Ideograph-8D70 <16241/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9B, // (⾛) KANGXI RADICAL RUN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "起" <Same>
		'8D77', // CJK Ideograph-8D77 <16248/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D77, // (起) CJK Ideograph-8D77 <16248/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D7, // (起) CJK COMPATIBILITY IDEOGRAPH-2F9D7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "赿" <Same>
		'8D7F', // CJK Ideograph-8D7F <16256/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D7F, // (赿) CJK Ideograph-8D7F <16256/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8D86, // (趆) CJK Ideograph-8D86 <16263/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧻓" <Same>
		'27ED3', // CJK Ideograph Extension B-27ED3 <32468/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x27ED3, // (𧻓) CJK Ideograph Extension B-27ED3 <32468/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD7, // (𧻓) CJK COMPATIBILITY IDEOGRAPH-FAD7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𧼯" <Same>
		'27F2F', // CJK Ideograph Extension B-27F2F <32560/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x27F2F, // (𧼯) CJK Ideograph Extension B-27F2F <32560/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D8, // (𧼯) CJK COMPATIBILITY IDEOGRAPH-2F9D8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "足" <Same>
		'8DB3', // CJK Ideograph-8DB3 <16308/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DB3, // (足) CJK Ideograph-8DB3 <16308/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9C, // (⾜) KANGXI RADICAL FOOT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "跋" <Same>
		'8DCB', // CJK Ideograph-8DCB <16332/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DCB, // (跋) CJK Ideograph-8DCB <16332/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9DA, // (跋) CJK COMPATIBILITY IDEOGRAPH-2F9DA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "趼" <Same>
		'8DBC', // CJK Ideograph-8DBC <16317/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DBC, // (趼) CJK Ideograph-8DBC <16317/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9DB, // (趼) CJK COMPATIBILITY IDEOGRAPH-2F9DB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "跥" <Same>
		'8DE5', // CJK Ideograph-8DE5 <16358/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DE5, // (跥) CJK Ideograph-8DE5 <16358/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DFA, // (跺) CJK Ideograph-8DFA <16379/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "路" <Same>
		'8DEF', // CJK Ideograph-8DEF <16368/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DEF, // (路) CJK Ideograph-8DEF <16368/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF937, // (路) CJK COMPATIBILITY IDEOGRAPH-F937 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "跰" <Same>
		'8DF0', // CJK Ideograph-8DF0 <16369/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8DF0, // (跰) CJK Ideograph-8DF0 <16369/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9DC, // (跰) CJK COMPATIBILITY IDEOGRAPH-2F9DC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "躗" <Same>
		'8E97', // CJK Ideograph-8E97 <16536/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8E97, // (躗) CJK Ideograph-8E97 <16536/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8E9B, // (躛) CJK Ideograph-8E9B <16540/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "身" <Same>
		'8EAB', // CJK Ideograph-8EAB <16556/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8EAB, // (身) CJK Ideograph-8EAB <16556/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9D, // (⾝) KANGXI RADICAL BODY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "車" <Same>
		'8ECA', // CJK Ideograph-8ECA <16587/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8ECA, // (車) CJK Ideograph-8ECA <16587/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF902, // (車) CJK COMPATIBILITY IDEOGRAPH-F902 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E, // (⾞) KANGXI RADICAL CART [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "軔" <Same>
		'8ED4', // CJK Ideograph-8ED4 <16597/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8ED4, // (軔) CJK Ideograph-8ED4 <16597/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9DE, // (軔) CJK COMPATIBILITY IDEOGRAPH-2F9DE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "軿" <Same>
		'8EFF', // CJK Ideograph-8EFF <16640/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8EFF, // (軿) CJK Ideograph-8EFF <16640/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F27, // (輧) CJK Ideograph-8F27 <16680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "輦" <Same>
		'8F26', // CJK Ideograph-8F26 <16679/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F26, // (輦) CJK Ideograph-8F26 <16679/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF998, // (輦) CJK COMPATIBILITY IDEOGRAPH-F998 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "輪" <Same>
		'8F2A', // CJK Ideograph-8F2A <16683/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F2A, // (輪) CJK Ideograph-8F2A <16683/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D7, // (輪) CJK COMPATIBILITY IDEOGRAPH-F9D7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "輸" <Same>
		'8F38', // CJK Ideograph-8F38 <16697/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F38, // (輸) CJK Ideograph-8F38 <16697/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC2, // (輸) CJK COMPATIBILITY IDEOGRAPH-FAC2 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9DF, // (輸) CJK COMPATIBILITY IDEOGRAPH-2F9DF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "輻" <Same>
		'8F3B', // CJK Ideograph-8F3B <16700/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F3B, // (輻) CJK Ideograph-8F3B <16700/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA07, // (輻) CJK COMPATIBILITY IDEOGRAPH-FA07 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "轢" <Same>
		'8F62', // CJK Ideograph-8F62 <16739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F62, // (轢) CJK Ideograph-8F62 <16739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF98D, // (轢) CJK COMPATIBILITY IDEOGRAPH-F98D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "车" <Same>
		'8F66', // CJK Ideograph-8F66 <16743/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F66, // (车) CJK Ideograph-8F66 <16743/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ECB, // (⻋) CJK RADICAL C-SIMPLIFIED CART [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "辛" <Same>
		'8F9B', // CJK Ideograph-8F9B <16796/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F9B, // (辛) CJK Ideograph-8F9B <16796/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F, // (⾟) KANGXI RADICAL BITTER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "辞" <Same>
		'8F9E', // CJK Ideograph-8F9E <16799/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8F9E, // (辞) CJK Ideograph-8F9E <16799/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F98D, // (辞) CJK COMPATIBILITY IDEOGRAPH-2F98D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "辰" <Same>
		'8FB0', // CJK Ideograph-8FB0 <16817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8FB0, // (辰) CJK Ideograph-8FB0 <16817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF971, // (辰) CJK COMPATIBILITY IDEOGRAPH-F971 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0, // (⾠) KANGXI RADICAL MORNING [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "辵" <Same>
		'8FB5', // CJK Ideograph-8FB5 <16822/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8FB5, // (辵) CJK Ideograph-8FB5 <16822/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA1, // (⾡) KANGXI RADICAL WALK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "辶" <Same>
		'8FB6', // CJK Ideograph-8FB6 <16823/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x8FB6, // (辶) CJK Ideograph-8FB6 <16823/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA66, // (辶) CJK COMPATIBILITY IDEOGRAPH-FA66 [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ECC, // (⻌) CJK RADICAL SIMPLIFIED WALK [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ECD, // (⻍) CJK RADICAL WALK ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "巡" <Same>
		'5DE1', // CJK Ideograph-5DE1 <4066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x5DE1, // (巡) CJK Ideograph-5DE1 <4066/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F881, // (巡) CJK COMPATIBILITY IDEOGRAPH-2F881 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "連" <Same>
		'9023', // CJK Ideograph-9023 <16932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9023, // (連) CJK Ideograph-9023 <16932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF99A, // (連) CJK COMPATIBILITY IDEOGRAPH-F99A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "逸" <Same>
		'9038', // CJK Ideograph-9038 <16953/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9038, // (逸) CJK Ideograph-9038 <16953/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA25, // (逸) CJK COMPATIBILITY IDEOGRAPH-FA25 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA67, // (逸) CJK COMPATIBILITY IDEOGRAPH-FA67 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "遲" <Same>
		'9072', // CJK Ideograph-9072 <17011/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9072, // (遲) CJK Ideograph-9072 <17011/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC3, // (遲) CJK COMPATIBILITY IDEOGRAPH-FAC3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "遼" <Same>
		'907C', // CJK Ideograph-907C <17021/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x907C, // (遼) CJK Ideograph-907C <17021/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C3, // (遼) CJK COMPATIBILITY IDEOGRAPH-F9C3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𨗒" <Same>
		'285D2', // CJK Ideograph Extension B-285D2 <34259/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x285D2, // (𨗒) CJK Ideograph Extension B-285D2 <34259/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E0, // (𨗒) CJK COMPATIBILITY IDEOGRAPH-2F9E0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𨗭" <Same>
		'285ED', // CJK Ideograph Extension B-285ED <34286/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x285ED, // (𨗭) CJK Ideograph Extension B-285ED <34286/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E1, // (𨗭) CJK COMPATIBILITY IDEOGRAPH-2F9E1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "邏" <Same>
		'908F', // CJK Ideograph-908F <17040/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x908F, // (邏) CJK Ideograph-908F <17040/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF913, // (邏) CJK COMPATIBILITY IDEOGRAPH-F913 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "邑" <Same>
		'9091', // CJK Ideograph-9091 <17042/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9091, // (邑) CJK Ideograph-9091 <17042/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA2, // (⾢) KANGXI RADICAL CITY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "邔" <Same>
		'9094', // CJK Ideograph-9094 <17045/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9094, // (邔) CJK Ideograph-9094 <17045/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E2, // (邔) CJK COMPATIBILITY IDEOGRAPH-2F9E2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "郎" <Same>
		'90CE', // CJK Ideograph-90CE <17103/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x90CE, // (郎) CJK Ideograph-90CE <17103/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF92C, // (郎) CJK COMPATIBILITY IDEOGRAPH-F92C [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x90DE, // (郞) CJK Ideograph-90DE <17119/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA2E, // (郞) CJK COMPATIBILITY IDEOGRAPH-FA2E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "郱" <Same>
		'90F1', // CJK Ideograph-90F1 <17138/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x90F1, // (郱) CJK Ideograph-90F1 <17138/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E3, // (郱) CJK COMPATIBILITY IDEOGRAPH-2F9E3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "都" <Same>
		'90FD', // CJK Ideograph-90FD <17150/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x90FD, // (都) CJK Ideograph-90FD <17150/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA26, // (都) CJK COMPATIBILITY IDEOGRAPH-FA26 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𨜮" <Same>
		'2872E', // CJK Ideograph Extension B-2872E <34607/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2872E, // (𨜮) CJK Ideograph Extension B-2872E <34607/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E5, // (𨜮) CJK COMPATIBILITY IDEOGRAPH-2F9E5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鄑" <Same>
		'9111', // CJK Ideograph-9111 <17170/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9111, // (鄑) CJK Ideograph-9111 <17170/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E4, // (鄑) CJK COMPATIBILITY IDEOGRAPH-2F9E4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鄛" <Same>
		'911B', // CJK Ideograph-911B <17180/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x911B, // (鄛) CJK Ideograph-911B <17180/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E6, // (鄛) CJK COMPATIBILITY IDEOGRAPH-2F9E6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "酉" <Same>
		'9149', // CJK Ideograph-9149 <17226/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9149, // (酉) CJK Ideograph-9149 <17226/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA3, // (⾣) KANGXI RADICAL WINE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "酪" <Same>
		'916A', // CJK Ideograph-916A <17259/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x916A, // (酪) CJK Ideograph-916A <17259/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF919, // (酪) CJK COMPATIBILITY IDEOGRAPH-F919 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "醙" <Same>
		'9199', // CJK Ideograph-9199 <17306/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9199, // (醙) CJK Ideograph-9199 <17306/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC4, // (醙) CJK COMPATIBILITY IDEOGRAPH-FAC4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "醴" <Same>
		'91B4', // CJK Ideograph-91B4 <17333/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x91B4, // (醴) CJK Ideograph-91B4 <17333/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B7, // (醴) CJK COMPATIBILITY IDEOGRAPH-F9B7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "釆" <Same>
		'91C6', // CJK Ideograph-91C6 <17351/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x91C6, // (釆) CJK Ideograph-91C6 <17351/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA4, // (⾤) KANGXI RADICAL DISTINGUISH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "里" <Same>
		'91CC', // CJK Ideograph-91CC <17357/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x91CC, // (里) CJK Ideograph-91CC <17357/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9E9, // (里) CJK COMPATIBILITY IDEOGRAPH-F9E9 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA5, // (⾥) KANGXI RADICAL VILLAGE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "量" <Same>
		'91CF', // CJK Ideograph-91CF <17360/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x91CF, // (量) CJK Ideograph-91CF <17360/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF97E, // (量) CJK COMPATIBILITY IDEOGRAPH-F97E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "金" <Same>
		'91D1', // CJK Ideograph-91D1 <17362/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x91D1, // (金) CJK Ideograph-91D1 <17362/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF90A, // (金) CJK COMPATIBILITY IDEOGRAPH-F90A [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA6, // (⾦) KANGXI RADICAL GOLD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鈴" <Same>
		'9234', // CJK Ideograph-9234 <17461/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9234, // (鈴) CJK Ideograph-9234 <17461/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B1, // (鈴) CJK COMPATIBILITY IDEOGRAPH-F9B1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鈸" <Same>
		'9238', // CJK Ideograph-9238 <17465/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9238, // (鈸) CJK Ideograph-9238 <17465/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E7, // (鈸) CJK COMPATIBILITY IDEOGRAPH-2F9E7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鉶" <Same>
		'9276', // CJK Ideograph-9276 <17527/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9276, // (鉶) CJK Ideograph-9276 <17527/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC5, // (鉶) CJK COMPATIBILITY IDEOGRAPH-FAC5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鋗" <Same>
		'92D7', // CJK Ideograph-92D7 <17624/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x92D7, // (鋗) CJK Ideograph-92D7 <17624/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E8, // (鋗) CJK COMPATIBILITY IDEOGRAPH-2F9E8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鋘" <Same>
		'92D8', // CJK Ideograph-92D8 <17625/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x92D8, // (鋘) CJK Ideograph-92D8 <17625/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9E9, // (鋘) CJK COMPATIBILITY IDEOGRAPH-2F9E9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鉼" <Same>
		'927C', // CJK Ideograph-927C <17533/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x927C, // (鉼) CJK Ideograph-927C <17533/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9EA, // (鉼) CJK COMPATIBILITY IDEOGRAPH-2F9EA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "錄" <Same>
		'9304', // CJK Ideograph-9304 <17669/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9304, // (錄) CJK Ideograph-9304 <17669/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF93F, // (錄) CJK COMPATIBILITY IDEOGRAPH-F93F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鍊" <Same>
		'934A', // CJK Ideograph-934A <17739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x934A, // (鍊) CJK Ideograph-934A <17739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF99B, // (鍊) CJK COMPATIBILITY IDEOGRAPH-F99B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鎭" <Same>
		'93AD', // CJK Ideograph-93AD <17838/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x93AD, // (鎭) CJK Ideograph-93AD <17838/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x93AE, // (鎮) CJK Ideograph-93AE <17839/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鏹" <Same>
		'93F9', // CJK Ideograph-93F9 <17914/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x93F9, // (鏹) CJK Ideograph-93F9 <17914/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9EB, // (鏹) CJK COMPATIBILITY IDEOGRAPH-2F9EB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鐕" <Same>
		'9415', // CJK Ideograph-9415 <17942/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9415, // (鐕) CJK Ideograph-9415 <17942/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9EC, // (鐕) CJK COMPATIBILITY IDEOGRAPH-2F9EC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𨯺" <Same>
		'28BFA', // CJK Ideograph Extension B-28BFA <35835/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x28BFA, // (𨯺) CJK Ideograph Extension B-28BFA <35835/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9ED, // (𨯺) CJK COMPATIBILITY IDEOGRAPH-2F9ED [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "钅" <Same>
		'9485', // CJK Ideograph-9485 <18054/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9485, // (钅) CJK Ideograph-9485 <18054/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED0, // (⻐) CJK RADICAL C-SIMPLIFIED GOLD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "長" <Same>
		'9577', // CJK Ideograph-9577 <18296/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9577, // (長) CJK Ideograph-9577 <18296/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED1, // (⻑) CJK RADICAL LONG ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA7, // (⾧) KANGXI RADICAL LONG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "镸" <Same>
		'9578', // CJK Ideograph-9578 <18297/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9578, // (镸) CJK Ideograph-9578 <18297/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED2, // (⻒) CJK RADICAL LONG TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "长" <Same>
		'957F', // CJK Ideograph-957F <18304/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x957F, // (长) CJK Ideograph-957F <18304/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED3, // (⻓) CJK RADICAL C-SIMPLIFIED LONG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "門" <Same>
		'9580', // CJK Ideograph-9580 <18305/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9580, // (門) CJK Ideograph-9580 <18305/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA8, // (⾨) KANGXI RADICAL GATE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "開" <Same>
		'958B', // CJK Ideograph-958B <18316/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x958B, // (開) CJK Ideograph-958B <18316/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9EE, // (開) CJK COMPATIBILITY IDEOGRAPH-2F9EE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䦕" <Same>
		'4995', // CJK Ideograph Extension A-4995 <5526/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4995, // (䦕) CJK Ideograph Extension A-4995 <5526/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9EF, // (䦕) CJK COMPATIBILITY IDEOGRAPH-2F9EF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "閭" <Same>
		'95AD', // CJK Ideograph-95AD <18350/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x95AD, // (閭) CJK Ideograph-95AD <18350/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF986, // (閭) CJK COMPATIBILITY IDEOGRAPH-F986 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "閷" <Same>
		'95B7', // CJK Ideograph-95B7 <18360/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x95B7, // (閷) CJK Ideograph-95B7 <18360/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F0, // (閷) CJK COMPATIBILITY IDEOGRAPH-2F9F0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𨵷" <Same>
		'28D77', // CJK Ideograph Extension B-28D77 <36216/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x28D77, // (𨵷) CJK Ideograph Extension B-28D77 <36216/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F1, // (𨵷) CJK COMPATIBILITY IDEOGRAPH-2F9F1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "门" <Same>
		'95E8', // CJK Ideograph-95E8 <18409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x95E8, // (门) CJK Ideograph-95E8 <18409/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED4, // (⻔) CJK RADICAL C-SIMPLIFIED GATE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "阜" <Same>
		'961C', // CJK Ideograph-961C <18461/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x961C, // (阜) CJK Ideograph-961C <18461/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA9, // (⾩) KANGXI RADICAL MOUND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "阝" <Same>
		'961D', // CJK Ideograph-961D <18462/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x961D, // (阝) CJK Ideograph-961D <18462/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ECF, // (⻏) CJK RADICAL CITY [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED6, // (⻖) CJK RADICAL MOUND TWO [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "阮" <Same>
		'962E', // CJK Ideograph-962E <18479/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x962E, // (阮) CJK Ideograph-962E <18479/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C6, // (阮) CJK COMPATIBILITY IDEOGRAPH-F9C6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "陋" <Same>
		'964B', // CJK Ideograph-964B <18508/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x964B, // (陋) CJK Ideograph-964B <18508/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF951, // (陋) CJK COMPATIBILITY IDEOGRAPH-F951 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "降" <Same>
		'964D', // CJK Ideograph-964D <18510/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x964D, // (降) CJK Ideograph-964D <18510/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA09, // (降) CJK COMPATIBILITY IDEOGRAPH-FA09 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "陵" <Same>
		'9675', // CJK Ideograph-9675 <18550/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9675, // (陵) CJK Ideograph-9675 <18550/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF959, // (陵) CJK COMPATIBILITY IDEOGRAPH-F959 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "陸" <Same>
		'9678', // CJK Ideograph-9678 <18553/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9678, // (陸) CJK Ideograph-9678 <18553/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D3, // (陸) CJK COMPATIBILITY IDEOGRAPH-F9D3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "陼" <Same>
		'967C', // CJK Ideograph-967C <18557/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x967C, // (陼) CJK Ideograph-967C <18557/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC6, // (陼) CJK COMPATIBILITY IDEOGRAPH-FAC6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "隆" <Same>
		'9686', // CJK Ideograph-9686 <18567/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9686, // (隆) CJK Ideograph-9686 <18567/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9DC, // (隆) CJK COMPATIBILITY IDEOGRAPH-F9DC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "隣" <Same>
		'96A3', // CJK Ideograph-96A3 <18596/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96A3, // (隣) CJK Ideograph-96A3 <18596/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F1, // (隣) CJK COMPATIBILITY IDEOGRAPH-F9F1 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䧦" <Same>
		'49E6', // CJK Ideograph Extension A-49E6 <5607/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x49E6, // (䧦) CJK Ideograph Extension A-49E6 <5607/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F2, // (䧦) CJK COMPATIBILITY IDEOGRAPH-2F9F2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "隶" <Same>
		'96B6', // CJK Ideograph-96B6 <18615/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96B6, // (隶) CJK Ideograph-96B6 <18615/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FAA, // (⾪) KANGXI RADICAL SLAVE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "隷" <Same>
		'96B7', // CJK Ideograph-96B7 <18616/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96B7, // (隷) CJK Ideograph-96B7 <18616/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA2F, // (隷) CJK COMPATIBILITY IDEOGRAPH-FA2F [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96B8, // (隸) CJK Ideograph-96B8 <18617/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B8, // (隸) CJK COMPATIBILITY IDEOGRAPH-F9B8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "隹" <Same>
		'96B9', // CJK Ideograph-96B9 <18618/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96B9, // (隹) CJK Ideograph-96B9 <18618/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FAB, // (⾫) KANGXI RADICAL SHORT TAILED BIRD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "雃" <Same>
		'96C3', // CJK Ideograph-96C3 <18628/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96C3, // (雃) CJK Ideograph-96C3 <18628/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F3, // (雃) CJK COMPATIBILITY IDEOGRAPH-2F9F3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "離" <Same>
		'96E2', // CJK Ideograph-96E2 <18659/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96E2, // (離) CJK Ideograph-96E2 <18659/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9EA, // (離) CJK COMPATIBILITY IDEOGRAPH-F9EA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "難" <Same>
		'96E3', // CJK Ideograph-96E3 <18660/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96E3, // (難) CJK Ideograph-96E3 <18660/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA68, // (難) CJK COMPATIBILITY IDEOGRAPH-FA68 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC7, // (難) CJK COMPATIBILITY IDEOGRAPH-FAC7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "雨" <Same>
		'96E8', // CJK Ideograph-96E8 <18665/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96E8, // (雨) CJK Ideograph-96E8 <18665/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FAC, // (⾬) KANGXI RADICAL RAIN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "零" <Same>
		'96F6', // CJK Ideograph-96F6 <18679/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96F6, // (零) CJK Ideograph-96F6 <18679/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B2, // (零) CJK COMPATIBILITY IDEOGRAPH-F9B2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "雷" <Same>
		'96F7', // CJK Ideograph-96F7 <18680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x96F7, // (雷) CJK Ideograph-96F7 <18680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF949, // (雷) CJK COMPATIBILITY IDEOGRAPH-F949 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "霣" <Same>
		'9723', // CJK Ideograph-9723 <18724/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9723, // (霣) CJK Ideograph-9723 <18724/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F5, // (霣) CJK COMPATIBILITY IDEOGRAPH-2F9F5 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩅅" <Same>
		'29145', // CJK Ideograph Extension B-29145 <37190/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x29145, // (𩅅) CJK Ideograph Extension B-29145 <37190/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F6, // (𩅅) CJK COMPATIBILITY IDEOGRAPH-2F9F6 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "露" <Same>
		'9732', // CJK Ideograph-9732 <18739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9732, // (露) CJK Ideograph-9732 <18739/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF938, // (露) CJK COMPATIBILITY IDEOGRAPH-F938 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "靈" <Same>
		'9748', // CJK Ideograph-9748 <18761/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9748, // (靈) CJK Ideograph-9748 <18761/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B3, // (靈) CJK COMPATIBILITY IDEOGRAPH-F9B3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "靑" <Same>
		'9751', // CJK Ideograph-9751 <18770/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9751, // (靑) CJK Ideograph-9751 <18770/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FAD, // (⾭) KANGXI RADICAL BLUE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "青" <Same>
		'9752', // CJK Ideograph-9752 <18771/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9752, // (青) CJK Ideograph-9752 <18771/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED8, // (⻘) CJK RADICAL BLUE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "靖" <Same>
		'9756', // CJK Ideograph-9756 <18775/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9756, // (靖) CJK Ideograph-9756 <18775/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA1C, // (靖) CJK COMPATIBILITY IDEOGRAPH-FA1C [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC8, // (靖) CJK COMPATIBILITY IDEOGRAPH-FAC8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩇟" <Same>
		'291DF', // CJK Ideograph Extension B-291DF <37344/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x291DF, // (𩇟) CJK Ideograph Extension B-291DF <37344/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F81C, // (𩇟) CJK COMPATIBILITY IDEOGRAPH-2F81C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "非" <Same>
		'975E', // CJK Ideograph-975E <18783/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x975E, // (非) CJK Ideograph-975E <18783/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FAE, // (⾮) KANGXI RADICAL WRONG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "面" <Same>
		'9762', // CJK Ideograph-9762 <18787/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9762, // (面) CJK Ideograph-9762 <18787/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FAF, // (⾯) KANGXI RADICAL FACE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩈚" <Same>
		'2921A', // CJK Ideograph Extension B-2921A <37403/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2921A, // (𩈚) CJK Ideograph Extension B-2921A <37403/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F7, // (𩈚) CJK COMPATIBILITY IDEOGRAPH-2F9F7 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "革" <Same>
		'9769', // CJK Ideograph-9769 <18794/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9769, // (革) CJK Ideograph-9769 <18794/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB0, // (⾰) KANGXI RADICAL LEATHER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䩮" <Same>
		'4A6E', // CJK Ideograph Extension A-4A6E <5743/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4A6E, // (䩮) CJK Ideograph Extension A-4A6E <5743/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F8, // (䩮) CJK COMPATIBILITY IDEOGRAPH-2F9F8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䩶" <Same>
		'4A76', // CJK Ideograph Extension A-4A76 <5751/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4A76, // (䩶) CJK Ideograph Extension A-4A76 <5751/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9F9, // (䩶) CJK COMPATIBILITY IDEOGRAPH-2F9F9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "韋" <Same>
		'97CB', // CJK Ideograph-97CB <18892/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97CB, // (韋) CJK Ideograph-97CB <18892/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB1, // (⾱) KANGXI RADICAL TANNED LEATHER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "韛" <Same>
		'97DB', // CJK Ideograph-97DB <18908/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97DB, // (韛) CJK Ideograph-97DB <18908/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAC9, // (韛) CJK COMPATIBILITY IDEOGRAPH-FAC9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "韠" <Same>
		'97E0', // CJK Ideograph-97E0 <18913/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97E0, // (韠) CJK Ideograph-97E0 <18913/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9FA, // (韠) CJK COMPATIBILITY IDEOGRAPH-2F9FA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "韦" <Same>
		'97E6', // CJK Ideograph-97E6 <18919/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97E6, // (韦) CJK Ideograph-97E6 <18919/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2ED9, // (⻙) CJK RADICAL C-SIMPLIFIED TANNED LEATHER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "韭" <Same>
		'97ED', // CJK Ideograph-97ED <18926/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97ED, // (韭) CJK Ideograph-97ED <18926/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB2, // (⾲) KANGXI RADICAL LEEK [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩐊" <Same>
		'2940A', // CJK Ideograph Extension B-2940A <37899/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2940A, // (𩐊) CJK Ideograph Extension B-2940A <37899/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9FB, // (𩐊) CJK COMPATIBILITY IDEOGRAPH-2F9FB [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "音" <Same>
		'97F3', // CJK Ideograph-97F3 <18932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97F3, // (音) CJK Ideograph-97F3 <18932/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB3, // (⾳) KANGXI RADICAL SOUND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "響" <Same>
		'97FF', // CJK Ideograph-97FF <18944/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x97FF, // (響) CJK Ideograph-97FF <18944/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA69, // (響) CJK COMPATIBILITY IDEOGRAPH-FA69 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFACA, // (響) CJK COMPATIBILITY IDEOGRAPH-FACA [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "頁" <Same>
		'9801', // CJK Ideograph-9801 <18946/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9801, // (頁) CJK Ideograph-9801 <18946/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB4, // (⾴) KANGXI RADICAL LEAF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䪲" <Same>
		'4AB2', // CJK Ideograph Extension A-4AB2 <5811/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4AB2, // (䪲) CJK Ideograph Extension A-4AB2 <5811/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9FC, // (䪲) CJK COMPATIBILITY IDEOGRAPH-2F9FC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "頋" <Same>
		'980B', // CJK Ideograph-980B <18956/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x980B, // (頋) CJK Ideograph-980B <18956/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFACB, // (頋) CJK COMPATIBILITY IDEOGRAPH-FACB [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9FE, // (頋) CJK COMPATIBILITY IDEOGRAPH-2F9FE [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9FF, // (頋) CJK COMPATIBILITY IDEOGRAPH-2F9FF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "領" <Same>
		'9818', // CJK Ideograph-9818 <18969/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9818, // (領) CJK Ideograph-9818 <18969/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9B4, // (領) CJK COMPATIBILITY IDEOGRAPH-F9B4 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "頩" <Same>
		'9829', // CJK Ideograph-9829 <18986/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9829, // (頩) CJK Ideograph-9829 <18986/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA00, // (頩) CJK COMPATIBILITY IDEOGRAPH-2FA00 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩒖" <Same>
		'29496', // CJK Ideograph Extension B-29496 <38039/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x29496, // (𩒖) CJK Ideograph Extension B-29496 <38039/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F9FD, // (𩒖) CJK COMPATIBILITY IDEOGRAPH-2F9FD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "頻" <Same>
		'983B', // CJK Ideograph-983B <19004/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x983B, // (頻) CJK Ideograph-983B <19004/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA6A, // (頻) CJK COMPATIBILITY IDEOGRAPH-FA6A [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFACC, // (頻) CJK COMPATIBILITY IDEOGRAPH-FACC [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "類" <Same>
		'985E', // CJK Ideograph-985E <19039/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x985E, // (類) CJK Ideograph-985E <19039/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9D0, // (類) CJK COMPATIBILITY IDEOGRAPH-F9D0 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "页" <Same>
		'9875', // CJK Ideograph-9875 <19062/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9875, // (页) CJK Ideograph-9875 <19062/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EDA, // (⻚) CJK RADICAL C-SIMPLIFIED LEAF [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "風" <Same>
		'98A8', // CJK Ideograph-98A8 <19113/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98A8, // (風) CJK Ideograph-98A8 <19113/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB5, // (⾵) KANGXI RADICAL WIND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩖶" <Same>
		'295B6', // CJK Ideograph Extension B-295B6 <38327/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x295B6, // (𩖶) CJK Ideograph Extension B-295B6 <38327/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA01, // (𩖶) CJK COMPATIBILITY IDEOGRAPH-2FA01 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "风" <Same>
		'98CE', // CJK Ideograph-98CE <19151/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98CE, // (风) CJK Ideograph-98CE <19151/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EDB, // (⻛) CJK RADICAL C-SIMPLIFIED WIND [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "飛" <Same>
		'98DB', // CJK Ideograph-98DB <19164/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98DB, // (飛) CJK Ideograph-98DB <19164/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB6, // (⾶) KANGXI RADICAL FLY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "飞" <Same>
		'98DE', // CJK Ideograph-98DE <19167/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98DE, // (飞) CJK Ideograph-98DE <19167/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EDC, // (⻜) CJK RADICAL C-SIMPLIFIED FLY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "食" <Same>
		'98DF', // CJK Ideograph-98DF <19168/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98DF, // (食) CJK Ideograph-98DF <19168/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EDD, // (⻝) CJK RADICAL EAT ONE [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB7, // (⾷) KANGXI RADICAL EAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "飠" <Same>
		'98E0', // CJK Ideograph-98E0 <19169/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98E0, // (飠) CJK Ideograph-98E0 <19169/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EDF, // (⻟) CJK RADICAL EAT THREE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "飢" <Same>
		'98E2', // CJK Ideograph-98E2 <19171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98E2, // (飢) CJK Ideograph-98E2 <19171/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA02, // (飢) CJK COMPATIBILITY IDEOGRAPH-2FA02 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "飯" <Same>
		'98EF', // CJK Ideograph-98EF <19184/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98EF, // (飯) CJK Ideograph-98EF <19184/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA2A, // (飯) CJK COMPATIBILITY IDEOGRAPH-FA2A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "飼" <Same>
		'98FC', // CJK Ideograph-98FC <19197/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x98FC, // (飼) CJK Ideograph-98FC <19197/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA2B, // (飼) CJK COMPATIBILITY IDEOGRAPH-FA2B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䬳" <Same>
		'4B33', // CJK Ideograph Extension A-4B33 <5940/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4B33, // (䬳) CJK Ideograph Extension A-4B33 <5940/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA03, // (䬳) CJK COMPATIBILITY IDEOGRAPH-2FA03 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "館" <Same>
		'9928', // CJK Ideograph-9928 <19241/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9928, // (館) CJK Ideograph-9928 <19241/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA2C, // (館) CJK COMPATIBILITY IDEOGRAPH-FA2C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "餩" <Same>
		'9929', // CJK Ideograph-9929 <19242/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9929, // (餩) CJK Ideograph-9929 <19242/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA04, // (餩) CJK COMPATIBILITY IDEOGRAPH-2FA04 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "饣" <Same>
		'9963', // CJK Ideograph-9963 <19300/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9963, // (饣) CJK Ideograph-9963 <19300/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EE0, // (⻠) CJK RADICAL C-SIMPLIFIED EAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "首" <Same>
		'9996', // CJK Ideograph-9996 <19351/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9996, // (首) CJK Ideograph-9996 <19351/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB8, // (⾸) KANGXI RADICAL HEAD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "香" <Same>
		'9999', // CJK Ideograph-9999 <19354/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9999, // (香) CJK Ideograph-9999 <19354/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FB9, // (⾹) KANGXI RADICAL FRAGRANT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "馧" <Same>
		'99A7', // CJK Ideograph-99A7 <19368/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x99A7, // (馧) CJK Ideograph-99A7 <19368/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA05, // (馧) CJK COMPATIBILITY IDEOGRAPH-2FA05 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "馬" <Same>
		'99AC', // CJK Ideograph-99AC <19373/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x99AC, // (馬) CJK Ideograph-99AC <19373/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FBA, // (⾺) KANGXI RADICAL HORSE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "駂" <Same>
		'99C2', // CJK Ideograph-99C2 <19395/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x99C2, // (駂) CJK Ideograph-99C2 <19395/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA06, // (駂) CJK COMPATIBILITY IDEOGRAPH-2FA06 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "駱" <Same>
		'99F1', // CJK Ideograph-99F1 <19442/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x99F1, // (駱) CJK Ideograph-99F1 <19442/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF91A, // (駱) CJK COMPATIBILITY IDEOGRAPH-F91A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "駾" <Same>
		'99FE', // CJK Ideograph-99FE <19455/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x99FE, // (駾) CJK Ideograph-99FE <19455/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA07, // (駾) CJK COMPATIBILITY IDEOGRAPH-2FA07 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "驪" <Same>
		'9A6A', // CJK Ideograph-9A6A <19563/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9A6A, // (驪) CJK Ideograph-9A6A <19563/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF987, // (驪) CJK COMPATIBILITY IDEOGRAPH-F987 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "马" <Same>
		'9A6C', // CJK Ideograph-9A6C <19565/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9A6C, // (马) CJK Ideograph-9A6C <19565/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EE2, // (⻢) CJK RADICAL C-SIMPLIFIED HORSE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "骨" <Same>
		'9AA8', // CJK Ideograph-9AA8 <19625/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9AA8, // (骨) CJK Ideograph-9AA8 <19625/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FBB, // (⾻) KANGXI RADICAL BONE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䯎" <Same>
		'4BCE', // CJK Ideograph Extension A-4BCE <6095/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4BCE, // (䯎) CJK Ideograph Extension A-4BCE <6095/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA08, // (䯎) CJK COMPATIBILITY IDEOGRAPH-2FA08 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "高" <Same>
		'9AD8', // CJK Ideograph-9AD8 <19673/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9AD8, // (高) CJK Ideograph-9AD8 <19673/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FBC, // (⾼) KANGXI RADICAL TALL [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "髟" <Same>
		'9ADF', // CJK Ideograph-9ADF <19680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9ADF, // (髟) CJK Ideograph-9ADF <19680/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FBD, // (⾽) KANGXI RADICAL HAIR [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𩬰" <Same>
		'29B30', // CJK Ideograph Extension B-29B30 <39729/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x29B30, // (𩬰) CJK Ideograph Extension B-29B30 <39729/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA09, // (𩬰) CJK COMPATIBILITY IDEOGRAPH-2FA09 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鬒" <Same>
		'9B12', // CJK Ideograph-9B12 <19731/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B12, // (鬒) CJK Ideograph-9B12 <19731/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFACD, // (鬒) CJK COMPATIBILITY IDEOGRAPH-FACD [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0A, // (鬒) CJK COMPATIBILITY IDEOGRAPH-2FA0A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鬥" <Same>
		'9B25', // CJK Ideograph-9B25 <19750/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B25, // (鬥) CJK Ideograph-9B25 <19750/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FBE, // (⾾) KANGXI RADICAL FIGHT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鬯" <Same>
		'9B2F', // CJK Ideograph-9B2F <19760/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B2F, // (鬯) CJK Ideograph-9B2F <19760/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FBF, // (⾿) KANGXI RADICAL SACRIFICIAL WINE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鬲" <Same>
		'9B32', // CJK Ideograph-9B32 <19763/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B32, // (鬲) CJK Ideograph-9B32 <19763/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC0, // (⿀) KANGXI RADICAL CAULDRON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鬼" <Same>
		'9B3C', // CJK Ideograph-9B3C <19773/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B3C, // (鬼) CJK Ideograph-9B3C <19773/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC1, // (⿁) KANGXI RADICAL GHOST [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EE4, // (⻤) CJK RADICAL GHOST [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "魚" <Same>
		'9B5A', // CJK Ideograph-9B5A <19803/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B5A, // (魚) CJK Ideograph-9B5A <19803/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC2, // (⿂) KANGXI RADICAL FISH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "魯" <Same>
		'9B6F', // CJK Ideograph-9B6F <19824/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9B6F, // (魯) CJK Ideograph-9B6F <19824/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF939, // (魯) CJK COMPATIBILITY IDEOGRAPH-F939 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鱀" <Same>
		'9C40', // CJK Ideograph-9C40 <20033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9C40, // (鱀) CJK Ideograph-9C40 <20033/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0B, // (鱀) CJK COMPATIBILITY IDEOGRAPH-2FA0B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鱗" <Same>
		'9C57', // CJK Ideograph-9C57 <20056/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9C57, // (鱗) CJK Ideograph-9C57 <20056/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F2, // (鱗) CJK COMPATIBILITY IDEOGRAPH-F9F2 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鱼" <Same>
		'9C7C', // CJK Ideograph-9C7C <20093/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9C7C, // (鱼) CJK Ideograph-9C7C <20093/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EE5, // (⻥) CJK RADICAL C-SIMPLIFIED FISH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鳥" <Same>
		'9CE5', // CJK Ideograph-9CE5 <20198/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9CE5, // (鳥) CJK Ideograph-9CE5 <20198/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC3, // (⿃) KANGXI RADICAL BIRD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鳽" <Same>
		'9CFD', // CJK Ideograph-9CFD <20222/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9CFD, // (鳽) CJK Ideograph-9CFD <20222/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0C, // (鳽) CJK COMPATIBILITY IDEOGRAPH-2FA0C [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䳎" <Same>
		'4CCE', // CJK Ideograph Extension A-4CCE <6351/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4CCE, // (䳎) CJK Ideograph Extension A-4CCE <6351/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0D, // (䳎) CJK COMPATIBILITY IDEOGRAPH-2FA0D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鵧" <Same>
		'9D67', // CJK Ideograph-9D67 <20328/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9D67, // (鵧) CJK Ideograph-9D67 <20328/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0F, // (鵧) CJK COMPATIBILITY IDEOGRAPH-2FA0F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䳭" <Same>
		'4CED', // CJK Ideograph Extension A-4CED <6382/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4CED, // (䳭) CJK Ideograph Extension A-4CED <6382/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA0E, // (䳭) CJK COMPATIBILITY IDEOGRAPH-2FA0E [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𪃎" <Same>
		'2A0CE', // CJK Ideograph Extension B-2A0CE <41167/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2A0CE, // (𪃎) CJK Ideograph Extension B-2A0CE <41167/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA10, // (𪃎) CJK COMPATIBILITY IDEOGRAPH-2FA10 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鶴" <Same>
		'9DB4', // CJK Ideograph-9DB4 <20405/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9DB4, // (鶴) CJK Ideograph-9DB4 <20405/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA2D, // (鶴) CJK COMPATIBILITY IDEOGRAPH-FA2D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𪄅" <Same>
		'2A105', // CJK Ideograph Extension B-2A105 <41222/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2A105, // (𪄅) CJK Ideograph Extension B-2A105 <41222/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA12, // (𪄅) CJK COMPATIBILITY IDEOGRAPH-2FA12 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䳸" <Same>
		'4CF8', // CJK Ideograph Extension A-4CF8 <6393/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4CF8, // (䳸) CJK Ideograph Extension A-4CF8 <6393/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA11, // (䳸) CJK COMPATIBILITY IDEOGRAPH-2FA11 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鷺" <Same>
		'9DFA', // CJK Ideograph-9DFA <20475/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9DFA, // (鷺) CJK Ideograph-9DFA <20475/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF93A, // (鷺) CJK COMPATIBILITY IDEOGRAPH-F93A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𪈎" <Same>
		'2A20E', // CJK Ideograph Extension B-2A20E <41487/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2A20E, // (𪈎) CJK Ideograph Extension B-2A20E <41487/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA13, // (𪈎) CJK COMPATIBILITY IDEOGRAPH-2FA13 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鸞" <Same>
		'9E1E', // CJK Ideograph-9E1E <20511/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E1E, // (鸞) CJK Ideograph-9E1E <20511/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF920, // (鸞) CJK COMPATIBILITY IDEOGRAPH-F920 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鹂" <Same>
		'9E42', // CJK Ideograph-9E42 <20547/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E42, // (鹂) CJK Ideograph-9E42 <20547/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E43, // (鹃) CJK Ideograph-9E43 <20548/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鹵" <Same>
		'9E75', // CJK Ideograph-9E75 <20598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E75, // (鹵) CJK Ideograph-9E75 <20598/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC4, // (⿄) KANGXI RADICAL SALT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鹿" <Same>
		'9E7F', // CJK Ideograph-9E7F <20608/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E7F, // (鹿) CJK Ideograph-9E7F <20608/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF940, // (鹿) CJK COMPATIBILITY IDEOGRAPH-F940 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC5, // (⿅) KANGXI RADICAL DEER [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𪊑" <Same>
		'2A291', // CJK Ideograph Extension B-2A291 <41618/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2A291, // (𪊑) CJK Ideograph Extension B-2A291 <41618/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA14, // (𪊑) CJK COMPATIBILITY IDEOGRAPH-2FA14 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "麗" <Same>
		'9E97', // CJK Ideograph-9E97 <20632/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E97, // (麗) CJK Ideograph-9E97 <20632/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF988, // (麗) CJK COMPATIBILITY IDEOGRAPH-F988 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "麟" <Same>
		'9E9F', // CJK Ideograph-9E9F <20640/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9E9F, // (麟) CJK Ideograph-9E9F <20640/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9F3, // (麟) CJK COMPATIBILITY IDEOGRAPH-F9F3 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "麥" <Same>
		'9EA5', // CJK Ideograph-9EA5 <20646/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EA5, // (麥) CJK Ideograph-9EA5 <20646/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC6, // (⿆) KANGXI RADICAL WHEAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "麦" <Same>
		'9EA6', // CJK Ideograph-9EA6 <20647/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EA6, // (麦) CJK Ideograph-9EA6 <20647/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EE8, // (⻨) CJK RADICAL SIMPLIFIED WHEAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "麻" <Same>
		'9EBB', // CJK Ideograph-9EBB <20668/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EBB, // (麻) CJK Ideograph-9EBB <20668/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA15, // (麻) CJK COMPATIBILITY IDEOGRAPH-2FA15 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC7, // (⿇) KANGXI RADICAL HEMP [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𪎒" <Same>
		'2A392', // CJK Ideograph Extension B-2A392 <41875/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2A392, // (𪎒) CJK Ideograph Extension B-2A392 <41875/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2F88F, // (𪎒) CJK COMPATIBILITY IDEOGRAPH-2F88F [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黃" <Same>
		'9EC3', // CJK Ideograph-9EC3 <20676/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EC3, // (黃) CJK Ideograph-9EC3 <20676/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC8, // (⿈) KANGXI RADICAL YELLOW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黄" <Same>
		'9EC4', // CJK Ideograph-9EC4 <20677/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EC4, // (黄) CJK Ideograph-9EC4 <20677/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EE9, // (⻩) CJK RADICAL SIMPLIFIED YELLOW [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黍" <Same>
		'9ECD', // CJK Ideograph-9ECD <20686/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9ECD, // (黍) CJK Ideograph-9ECD <20686/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FC9, // (⿉) KANGXI RADICAL MILLET [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黎" <Same>
		'9ECE', // CJK Ideograph-9ECE <20687/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9ECE, // (黎) CJK Ideograph-9ECE <20687/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF989, // (黎) CJK COMPATIBILITY IDEOGRAPH-F989 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "䵖" <Same>
		'4D56', // CJK Ideograph Extension A-4D56 <6487/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x4D56, // (䵖) CJK Ideograph Extension A-4D56 <6487/6592> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA16, // (䵖) CJK COMPATIBILITY IDEOGRAPH-2FA16 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黑" <Same>
		'9ED1', // CJK Ideograph-9ED1 <20690/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9ED1, // (黑) CJK Ideograph-9ED1 <20690/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FCA, // (⿊) KANGXI RADICAL BLACK [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9ED2, // (黒) CJK Ideograph-9ED2 <20691/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "墨" <Same>
		'58A8', // CJK Ideograph-58A8 <2729/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x58A8, // (墨) CJK Ideograph-58A8 <2729/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFA3A, // (墨) CJK COMPATIBILITY IDEOGRAPH-FA3A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黹" <Same>
		'9EF9', // CJK Ideograph-9EF9 <20730/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EF9, // (黹) CJK Ideograph-9EF9 <20730/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA17, // (黹) CJK COMPATIBILITY IDEOGRAPH-2FA17 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FCB, // (⿋) KANGXI RADICAL EMBROIDERY [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黽" <Same>
		'9EFD', // CJK Ideograph-9EFD <20734/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EFD, // (黽) CJK Ideograph-9EFD <20734/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FCC, // (⿌) KANGXI RADICAL FROG [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼅" <Same>
		'9F05', // CJK Ideograph-9F05 <20742/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F05, // (鼅) CJK Ideograph-9F05 <20742/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA19, // (鼅) CJK COMPATIBILITY IDEOGRAPH-2FA19 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "黾" <Same>
		'9EFE', // CJK Ideograph-9EFE <20735/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9EFE, // (黾) CJK Ideograph-9EFE <20735/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA18, // (黾) CJK COMPATIBILITY IDEOGRAPH-2FA18 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼎" <Same>
		'9F0E', // CJK Ideograph-9F0E <20751/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F0E, // (鼎) CJK Ideograph-9F0E <20751/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FCD, // (⿍) KANGXI RADICAL TRIPOD [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼏" <Same>
		'9F0F', // CJK Ideograph-9F0F <20752/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F0F, // (鼏) CJK Ideograph-9F0F <20752/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA1A, // (鼏) CJK COMPATIBILITY IDEOGRAPH-2FA1A [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼓" <Same>
		'9F13', // CJK Ideograph-9F13 <20756/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F13, // (鼓) CJK Ideograph-9F13 <20756/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FCE, // (⿎) KANGXI RADICAL DRUM [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼖" <Same>
		'9F16', // CJK Ideograph-9F16 <20759/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F16, // (鼖) CJK Ideograph-9F16 <20759/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA1B, // (鼖) CJK COMPATIBILITY IDEOGRAPH-2FA1B [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼠" <Same>
		'9F20', // CJK Ideograph-9F20 <20769/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F20, // (鼠) CJK Ideograph-9F20 <20769/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FCF, // (⿏) KANGXI RADICAL RAT [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "鼻" <Same>
		'9F3B', // CJK Ideograph-9F3B <20796/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F3B, // (鼻) CJK Ideograph-9F3B <20796/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA1C, // (鼻) CJK COMPATIBILITY IDEOGRAPH-2FA1C [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FD0, // (⿐) KANGXI RADICAL NOSE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "齃" <Same>
		'9F43', // CJK Ideograph-9F43 <20804/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F43, // (齃) CJK Ideograph-9F43 <20804/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD8, // (齃) CJK COMPATIBILITY IDEOGRAPH-FAD8 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "齊" <Same>
		'9F4A', // CJK Ideograph-9F4A <20811/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F4A, // (齊) CJK Ideograph-9F4A <20811/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FD1, // (⿑) KANGXI RADICAL EVEN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "齐" <Same>
		'9F50', // CJK Ideograph-9F50 <20817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F50, // (齐) CJK Ideograph-9F50 <20817/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EEC, // (⻬) CJK RADICAL C-SIMPLIFIED EVEN [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "齒" <Same>
		'9F52', // CJK Ideograph-9F52 <20819/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F52, // (齒) CJK Ideograph-9F52 <20819/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FD2, // (⿒) KANGXI RADICAL TOOTH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "𪘀" <Same>
		'2A600', // CJK Ideograph Extension B-2A600 <42497/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2A600, // (𪘀) CJK Ideograph Extension B-2A600 <42497/42720> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FA1D, // (𪘀) CJK COMPATIBILITY IDEOGRAPH-2FA1D [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "齿" <Same>
		'9F7F', // CJK Ideograph-9F7F <20864/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F7F, // (齿) CJK Ideograph-9F7F <20864/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EEE, // (⻮) CJK RADICAL C-SIMPLIFIED TOOTH [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "龍" <Same>
		'9F8D', // CJK Ideograph-9F8D <20878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F8D, // (龍) CJK Ideograph-9F8D <20878/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF9C4, // (龍) CJK COMPATIBILITY IDEOGRAPH-F9C4 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FD3, // (⿓) KANGXI RADICAL DRAGON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "龎" <Same>
		'9F8E', // CJK Ideograph-9F8E <20879/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F8E, // (龎) CJK Ideograph-9F8E <20879/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFAD9, // (龎) CJK COMPATIBILITY IDEOGRAPH-FAD9 [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "龙" <Same>
		'9F99', // CJK Ideograph-9F99 <20890/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F99, // (龙) CJK Ideograph-9F99 <20890/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x2EF0, // (⻰) CJK RADICAL C-SIMPLIFIED DRAGON [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "龜" <Same>
		'9F9C', // CJK Ideograph-9F9C <20893/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F9C, // (龜) CJK Ideograph-9F9C <20893/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF907, // (龜) CJK COMPATIBILITY IDEOGRAPH-F907 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xF908, // (龜) CJK COMPATIBILITY IDEOGRAPH-F908 [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0xFACE, // (龜) CJK COMPATIBILITY IDEOGRAPH-FACE [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FD4, // (⿔) KANGXI RADICAL TURTLE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "龟" <Same>
		'9F9F', // CJK Ideograph-9F9F <20896/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9F9F, // (龟) CJK Ideograph-9F9F <20896/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2EF3, // (⻳) CJK RADICAL C-SIMPLIFIED TURTLE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	[
		// "龠" <Same>
		'9FA0', // CJK Ideograph-9FA0 <20897/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		0x9FA0, // (龠) CJK Ideograph-9FA0 <20897/20992> [Hani]=>[Hani,Hanb,Jpan,Kore]
		//IDNA:0x2FD5, // (⿕) KANGXI RADICAL FLUTE [Hani]=>[Hani,Hanb,Jpan,Kore]
	],
	// 16.0.0
	// additions inserted above
	// not included: OUTLINED LATIN
	[
		// "◌᜕" <Same>
		'1715', // TAGALOG SIGN PAMUDPOD [Tagalog]=>[Tagalog]
		0x1715, // (◌᜕) TAGALOG SIGN PAMUDPOD [Tagalog]=>[Tagalog]
		0x1734, // (◌᜴) HANUNOO SIGN PAMUDPOD [Hanunoo]=>[Hanunoo]
	],
	[
		// "Ʌ̸" <Same>
		'245 338', // LATIN CAPITAL LETTER TURNED V + COMBINING LONG SOLIDUS OVERLAY [Latin,Inherited]=>[]
		//IDNA:0xA7DC, // (Ƛ) LATIN CAPITAL LETTER LAMBDA WITH STROKE [Latin]=>[Latin]
	],
] satisfies ConfuseGroup[];
