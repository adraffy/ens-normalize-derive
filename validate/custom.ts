import type {TestCase} from '../src/tests.ts';

// Hand-written tests. Each one must pass, or `bun run make-tests` fails.
// {name} = valid as-is, {name, norm} = valid after normalization, {name, error: true} = invalid
// from ens-normalize.js/validate/custom-tests.json (1.11.1), then extended for Unicode 18
export default [
	{name: '', comment: 'Empty'},
	{name: ' ', error: true, comment: 'Empty: Whitespace'},
	{name: '\u{FE0F}', error: true, comment: 'Empty: Ignorable'},

	{name: '.', error: true, comment: 'Null Labels'},
	{name: '.eth', error: true, comment: 'Null 2LD'},
	{name: 'eth.', error: true, comment: 'Null TLD'},
	{name: '...eth', error: true, comment: 'Multiple Null Labels'},

	{name: '．', error: true, comment: 'Disallowed Stop: FF0E'},
	{name: '。', error: true, comment: 'Disallowed Stop: 3002'},
	{name: '｡', error: true, comment: 'Disallowed Stop: FF61'},

	{name: 'vitalik.eth', comment: 'Trivial Name'},
	{name: '123.eth', comment: 'Trivial Digit Name'},
	{name: 'abcdefghijklmnopqrstuvwxyz-0123456789', comment: 'DNS Name'},
	{name: 'bRAnTlY.eTh', norm: 'brantly.eth', comment: 'Mixed-case'},
	{name: 'BRANTLYMILLEGAN.COM', norm: 'brantlymillegan.com', comment: 'Uppercase'},
	{name: 'brantly.cash', comment: 'Custom domain'},
	{name: 'nowzad.loopring.eth', comment: 'Subdomain'},

	{name: 'öbb.at', comment: 'IDNATestV2'},
	{name: 'Öbb.at', norm: 'öbb.at', comment: 'IDNATestV2'},
	{name: '◌̈bb.at', error: true, comment: 'IDNATestV2'},

	{name: 'ß', comment: 'IDNA deviation'},
	{name: 'ς', comment: 'IDNA deviation'},

	{name: 'Ⅷ', norm: 'viii', comment: 'Mapping: roman numeral'},

	{name: 'Ⓜ', norm: 'm', comment: 'Mapping: circled'},
	{name: 'Ⓜ\u{FE0F}', norm: 'm', comment: 'Mapping: demoji'},
	{name: '⓫⓬⓭⓮⓯⓰⓱⓲⓳⓴⓿', error: true, comment: 'negative circled (11-20,0)'},
	{name: '⓵⓶⓷⓸⓹⓺⓻⓼⓽⓾', error: true, comment: 'double circled (1-10)'},
	{name: '➊➋➌➍➎➏➐➑➒➓', error: true, comment: 'negative circled san-serif (1-10)'},
	{name: '❶❷❸❹❺❻❼❽❾❿', error: true, comment: 'negative circled (1-10)'},
	{name: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', norm: 'abcdefghijklmnopqrstuvwxyz', comment: 'circled (A-Z)'},
	{name: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ', norm: 'abcdefghijklmnopqrstuvwxyz', comment: 'circled (a-z)'},
	{name: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩', error: true, comment: 'negative circled san-serif (A-Z)'},
	{name: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉', comment: 'negative squared (A-Z)'},

	{name: ' ', error: true, comment: 'Whitespace'},
	{name: 'te st', error: true, comment: 'Whitespace: inner'},
	{name: ' test', error: true, comment: 'Whitespace: leading'},
	{name: 'test ', error: true, comment: 'Whitespace: trailing'},
	{name: 'test\u{200D}', error: true, comment: 'ZWJ: trailing'},
	{name: '\u{200D}test', error: true, comment: 'ZWJ: leading'},

	{name: "'a", error: true, comment: 'Apostrophe: leading'},
	{name: 'a’', error: true, comment: 'Apostrophe: leading'},
	{name: "a'’a", error: true, comment: 'Apostrophe: adjacent'},
	{name: "a'a’a", norm: 'a’a’a', comment: 'Apostrophe'},

	{name: 'l·l', error: true, comment: 'ContextO: middle dot'},
	{name: 'a·b', error: true, comment: 'ContextO: invalid middle dot'},

	{name: '\u{FE0E}\u{FE0F}a', norm: 'a', comment: 'Ignored: emoji-styling'},

	{
		name: '0\u{FE0F}⃣1\u{FE0F}⃣2\u{FE0F}⃣3\u{FE0F}⃣4\u{FE0F}⃣5\u{FE0F}⃣6\u{FE0F}⃣7\u{FE0F}⃣8\u{FE0F}⃣9\u{FE0F}⃣',
		norm: '0⃣1⃣2⃣3⃣4⃣5⃣6⃣7⃣8⃣9⃣',
		comment: 'Emoji: Keycaps',
	},
	{name: '#\u{FE0F}⃣*\u{FE0F}⃣', norm: '#⃣*⃣', comment: 'Emoji: Revived Keycaps'},

	{name: '_a', comment: 'Leading Underscore'},
	{name: '_____a', comment: 'Leading Underscore'},
	{name: 'a_b', error: true, comment: 'Non-leading Underscore'},

	{name: '$¢£¤¥₡₦₩₪₫€₭₮₱₲₴₵₸₹₺₼₽₾⃀₿ξ.؋', comment: 'Currency symbols'},

	{name: '̃', error: true, comment: 'Leading CM'},
	{name: '.̃.', error: true, comment: 'Leading CM'},
	{name: '💩̃', error: true, comment: 'Emoji + CM'},

	{name: 'àáâãāäåăąćĉčçèéêẽēëěęğìíîïǐǹńñòóôõöǒōšśşùúûüǔūýỳžźż', comment: 'Exemplars: Latn'},
	{name: 'άέήίϊΐϋόύΰώ', comment: 'Exemplars: Grek'},
	{name: 'ѓёӣйїќўӯ', comment: 'Exemplars: Cyrl'},
	{name: 'ガギグゲゴザジズゼゾダヂヅデドバパビピブプベペボポヴヷヸヹヺヾ', comment: 'Exemplars: Kata'},
	{name: 'がぎぐげござじずぜぞだぢづでどばぱびぴぶぷべぺぼぽゔゞ', comment: 'Exemplars: Hira'},

	{name: 'àáâãāäåăǖ', error: true, comment: 'Whitelisted CM: disallowed char'},
	{name: 'àáâãã̃āäåă', error: true, comment: 'Whitelisted CM: illegal mixture'},

	{name: 'آٍٍ', error: true, comment: 'NSM: repeated w/NFD expansion'},
	{name: 'آٍٍٍ', error: true, comment: 'NSM: repeated w/NFD expansion'},
	{name: 'ऩऀऀ', error: true, comment: 'NSM: repeated w/NFD expansion'},

	{name: 'إؐؑؒ', comment: 'NSM: at max'},
	{name: 'إؐؑؒؓ', error: true, comment: 'NSM: too many (5/4)'},
	{name: 'إؐؑؒؓؔ', error: true, comment: 'NSM: too many (6/4)'},

	{name: '🇦', error: true, comment: 'Single regional indicator'},
	{name: '🇦🇦', error: true, comment: 'Double regional indicator: invalid flag sequence'},
	{name: '🇺🇸', comment: 'Double regional indicator: valid flag sequence'},

	{name: 'xn--ls8h', error: true, comment: 'Punycode Literal'},
	{name: 'te--st', error: true, comment: 'CheckHyphens, Section 4.1 Rule #2 (ASCII)'},
	{name: 'xn--💩', comment: 'CheckHyphens, Section 4.1 Rule #2 (Unicode)'},
	{name: 'test-', comment: 'CheckHyphens, Section 4.1 Rule #3A (Ignored)'},
	{name: '-test', comment: 'CheckHyphens, Section 4.1 Rule #3B (Ignored)'},
	{name: 't-e--s---t', comment: 'Hyphen: multiple'},
	{name: 'hyphens-‐‑‒–—―⁃−⎯⏤﹘', norm: 'hyphens------------', comment: 'Hyphens'},

	{name: '💩', comment: 'Emoji: unstyled'},
	{name: '💩\u{FE0F}', norm: '💩', comment: 'Emoji: emoji-styled'},
	{name: '💩\u{FE0E}', norm: '💩', comment: 'Emoji: text-styled'},
	{name: '💩💩\u{FE0E}💩\u{FE0F}', norm: '💩💩💩', comment: 'Emoji: All Styles'},
	{name: '💩\u{200D}💩', error: true, comment: 'Poop Joiner'},

	{name: '👩\u{FE0E}🏽\u{200D}⚕\u{FE0F}', error: true, comment: 'Text-styled Modifier Sequence in ZWJ Sequence'},
	{name: '🏳\u{FE0E}\u{200D}🌈', error: true, comment: 'Text-styled Emoji in ZWJ Sequence'},

	{name: '🌈rainbow', comment: 'Emoji + Text'},
	{name: 'rainbow🌈', comment: 'Text + Emoji'},

	{name: '🏴\u{E0077}\u{E0074}\u{E0066}\u{E007F}', error: true, comment: 'Invalid Emoji Tag Sequence'},

	{name: '۰۱۲۳۸۹', norm: '٠١٢٣٨٩', comment: 'Arabic Mapping'},

	{name: 'тӕ', comment: 'confuse'},
	{name: 'ᎫᏦᎥ', error: true, comment: 'confuse'},
	{name: 'ꓖꓳꓓ', error: true, comment: 'confuse'},
	{name: '0x𐱅𐰇𐰼𐰰', error: true, comment: 'confuse'},
	{name: 'аррӏе', error: true, comment: 'confuse'},
	{name: 'ଠ୦୨ଁ', error: true, comment: 'confuse'},
	{name: '0nephi⳩', error: true, comment: 'confuse'},
	{name: 'ѐ', error: true, comment: 'confuse'},
	{name: '0x', comment: 'confuse'},
	{name: '0х', error: true, comment: 'confuse'},
	{name: '½', norm: '1⁄2', comment: 'confuse'},
	{name: '黑', comment: 'confuse'},
	{name: '黑a8', comment: 'confuse'},
	{name: 'ー一a', comment: 'confuse'},
	// === Unicode 18 (2026) ===

	// Bopomofo is Limited Use (UAX-31 17.0): single-script only, no mixing with Han
	{name: 'ㄅㄆㄇ', comment: 'Restricted: pure Bopomofo'},
	{name: 'ㄅ一', error: true, comment: 'Restricted: Bopomofo + Han'},
	{name: '一ㄅ', error: true, comment: 'Restricted: Han + Bopomofo'},
	{name: '乃卂ㄚ匚', error: true, comment: 'Restricted: faux-Latin Han + Bopomofo'},

	// fenced: HEBREW PUNCTUATION MAQAF
	{name: 'א־ב', comment: 'Fenced: maqaf'},
	{name: '־א', error: true, comment: 'Fenced: leading maqaf'},
	{name: 'א־', error: true, comment: 'Fenced: trailing maqaf'},
	{name: 'א־־ב', error: true, comment: 'Fenced: adjacent maqaf'},
	{name: '\u{30FB}a', error: true, comment: 'Fenced: leading middle dot'},
	{name: 'a\u{2044}b', comment: 'Fenced: fraction slash'},

	// accented Latin that is NOT whitelisted: registered uses are mostly ASCII spoofs (rules/cm.ts)
	{name: 'ėth', error: true, comment: 'Not whitelisted: e with dot above (spoof of eth)'},
	{name: 'ďegen', error: true, comment: 'Not whitelisted: d with caron (renders like d’, and ’ is valid)'},
	{name: 'biťcoin', error: true, comment: 'Not whitelisted: t with caron (renders like t’)'},
	{name: 'ľudmila', error: true, comment: 'Not whitelisted: l with caron (renders like l’)'},
	{name: 'fīrst', error: true, comment: 'Not whitelisted: i with macron'},
	{name: 'nįck', error: true, comment: 'Not whitelisted: i with ogonek'},
	{name: 'crÿpto', error: true, comment: 'Not whitelisted: y with diaeresis'},
	{name: 'crypțo', error: true, comment: 'Not whitelisted: t with comma below'},
	{name: 'iași', error: true, comment: 'Not whitelisted: s with comma below'},
	{name: 'třump', error: true, comment: 'Not whitelisted: r with caron'},
	{name: 'plzeň', error: true, comment: 'Not whitelisted: n with caron'},
	{name: 'gergő', error: true, comment: 'Not whitelisted: o with double acute'},
	{name: 'művészet', error: true, comment: 'Not whitelisted: u with double acute'},
	{name: 'lietuvių', error: true, comment: 'Not whitelisted: u with ogonek'},
	{name: 'ş', comment: 'Whitelisted: s with cedilla'},
	{name: 'ţ', error: true, comment: 'Not whitelisted: t with cedilla'},
	{name: 'ǎ', error: true, comment: 'A with caron: breve ă instead'},
	{name: 'ı', error: true, comment: 'Dotless i: confusable with i'},

	// Latin-like spoof letters
	{name: 'ᴀ', error: true, comment: 'Small capital'},
	{name: 'ǝ', error: true, comment: 'Turned letter'},
	{name: 'a\u{307}', error: true, comment: 'Non-whitelisted CM: composes to ȧ'},

	// new 18.0 characters are disallowed until reviewed (rules/disallow/unreviewed.ts)
	{name: '\u{20C3}', error: true, comment: 'Unreviewed 18.0: UAE DIRHAM SIGN'},
	{name: '𐻉', error: true, comment: 'Unreviewed 18.0: Arabic Extended-C'},
	{name: '𛅨', error: true, comment: 'Unreviewed 18.0: small archaic kana'},
	{name: '⹠', error: true, comment: 'Unreviewed 18.0: new punctuation'},
	{name: '🫝', comment: 'Emoji: 17.0'},

	// unused symbol blocks (2026)
	{name: '🜀', error: true, comment: 'Disallowed: Alchemical Symbols'},
	{name: '\u{1CF00}', error: true, comment: 'Disallowed: Znamenny Musical Notation'},
	{name: 'ҥ', error: true, comment: 'Disallowed: Cyrillic ligature'},
	{name: 'ӕ', error: true, comment: 'Whole-script confusable: Cyrillic ӕ alone looks Latin'},
	{name: '♔', comment: 'Chess piece (used by registrations)'},

	// Latin diacritics leaking into non-whitelisted groups through Script_Extensions (rules/scripts.ts)
	{name: 'א\u{307}', error: true, comment: 'Script_Extensions: Hebrew + COMBINING DOT ABOVE'},
	{name: 'א\u{308}', error: true, comment: 'Script_Extensions: Hebrew + COMBINING DIAERESIS'},
	{name: 'ก\u{303}', error: true, comment: 'Script_Extensions: Thai + COMBINING TILDE'},
	{name: 'ա\u{308}', error: true, comment: 'Script_Extensions: Armenian + COMBINING DIAERESIS'},
	{name: 'ஃ', comment: 'Script_Extensions: TAMIL SIGN VISARGA in Tamil'},
	{name: 'కஃ', error: true, comment: 'Script_Extensions: TAMIL SIGN VISARGA not in Telugu (18.0 change pinned)'},

	// confusables synced with Unicode 18 (rules/confuse.ts): registered names stay valid
	{name: 'бот', comment: 'Confusable: Cyrillic word vs new Coptic lookalikes'},
	{name: 'сша', comment: 'Confusable: Unicode 18 moved ш into the w set (restored)'},
	{name: 'ㅇㅇㅇ', norm: 'ᄋᄋᄋ', comment: 'Confusable: Hangul ieung vs o'},
	{name: 'ㄐㄐㄐ', comment: 'Confusable: Bopomofo ㄐ vs Han 丩 (split)'},
	{name: 'оо', error: true, comment: 'Confusable: Cyrillic oo is still whole-script confusable with Latin'},
	{name: 'ꓳ', error: true, comment: 'Confusable: Lisu o-lookalike alone'},
	{name: '三丅卄', error: true, comment: 'Confusable: faux-Latin 丅 (T) is disallowed'},
	{name: '丫丫123', comment: 'Confusable: 丫 stays valid (real Chinese, registered)'},
] satisfies TestCase[];
