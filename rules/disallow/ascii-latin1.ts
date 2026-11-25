import type {Rule} from '../../src/select.ts';

// disallowed: ASCII (STD3) and Latin-1
// {block, except}: the whole block is disallowed except the listed characters (new characters are disallowed too)
// {block, cps}: only the listed characters are disallowed (block is checked)
export default [
	// 00..7F Basic Latin: 61/128 denied
	{block: 'Basic Latin', cps: [
		// conventions: / * remove invisibles / * see "HANGUL FILLER" / * remove punctuation / * remove vocalization annotations / * remove rotations / * remove box and drawing characters / * choose heavy variants if available / * collapse similar items to one if possible / * see "CHECKMARK" / undecided: / - left-right mirrors / 20240912: in 16.0.0, UTS-46 was changed slightly: / > The handling of UseSTD3ASCIIRules has been simplified. Conditional data involving disallowed_STD3_* / > Status values has been replaced with simple checking for a subset of ASCII characters in the Validity Criteria. / > This simplifies the data format and data lookup, makes standard UseSTD3ASCIIRules=true handling consistent / > with custom UseSTD3ASCIIRules, and avoids unnecessarily disallowing certain labels that contain / > disallowed_STD3_mapped characters but which do not contain non-LDH ASCII characters when the mappings are applied. / see: https://github.com/adraffy/ens-norm-uts46.js/blob/1dea5023f46ce092ff19628a10845ddfcbda8d54/src/uts46.js#L149 / essentially, all ASCII characters are valid, and they get constrained *AFTER* nfc / however, for the characters that ENSIP-15 allows, this is functionally equivalent to the prior approach / make.js maintains this property (see: Assert Invariants) / 20240910: this was "disallowed_STD3_valid"
		0x00, // ({00}) NULL
		0x01, // ({01}) START OF HEADING
		0x02, // ({02}) START OF TEXT
		0x03, // ({03}) END OF TEXT
		0x04, // ({04}) END OF TRANSMISSION
		0x05, // ({05}) ENQUIRY
		0x06, // ({06}) ACKNOWLEDGE
		0x07, // ({07}) BELL
		0x08, // ({08}) BACKSPACE
		0x09, // ({09}) CHARACTER TABULATION
		0x0A, // ({0A}) LINE FEED (LF)
		0x0B, // ({0B}) LINE TABULATION
		0x0C, // ({0C}) FORM FEED (FF)
		0x0D, // ({0D}) CARRIAGE RETURN (CR)
		0x0E, // ({0E}) SHIFT OUT
		0x0F, // ({0F}) SHIFT IN
		0x10, // ({10}) DATA LINK ESCAPE
		0x11, // ({11}) DEVICE CONTROL ONE
		0x12, // ({12}) DEVICE CONTROL TWO
		0x13, // ({13}) DEVICE CONTROL THREE
		0x14, // ({14}) DEVICE CONTROL FOUR
		0x15, // ({15}) NEGATIVE ACKNOWLEDGE
		0x16, // ({16}) SYNCHRONOUS IDLE
		0x17, // ({17}) END OF TRANSMISSION BLOCK
		0x18, // ({18}) CANCEL
		0x19, // ({19}) END OF MEDIUM
		0x1A, // ({1A}) SUBSTITUTE
		0x1B, // ({1B}) ESCAPE
		0x1C, // ({1C}) INFORMATION SEPARATOR FOUR
		0x1D, // ({1D}) INFORMATION SEPARATOR THREE
		0x1E, // ({1E}) INFORMATION SEPARATOR TWO
		0x1F, // ({1F}) INFORMATION SEPARATOR ONE
		0x20, // ( ) SPACE
		0x21, // (!) EXCLAMATION MARK
		0x22, // (") QUOTATION MARK
		0x23, // (#) NUMBER SIGN
		0x25, // (%) PERCENT SIGN
		0x26, // (&) AMPERSAND
		0x28, // (() LEFT PARENTHESIS
		0x29, // ()) RIGHT PARENTHESIS
		0x2A, // (*) ASTERISK
		0x2B, // (+) PLUS SIGN
		0x2C, // (,) COMMA
		0x2F, // (/) SOLIDUS
		0x3A, // (:) COLON
		0x3B, // (;) SEMICOLON
		0x3C, // (<) LESS-THAN SIGN
		0x3D, // (=) EQUALS SIGN
		0x3E, // (>) GREATER-THAN SIGN
		0x3F, // (?) QUESTION MARK
		0x40, // (@) COMMERCIAL AT
		0x5B, // ([) LEFT SQUARE BRACKET
		0x5C, // (\) REVERSE SOLIDUS
		0x5D, // (]) RIGHT SQUARE BRACKET
		0x5E, // (^) CIRCUMFLEX ACCENT
		0x60, // (`) GRAVE ACCENT
		0x7B, // ({) LEFT CURLY BRACKET
		0x7C, // (|) VERTICAL LINE
		0x7D, // (}) RIGHT CURLY BRACKET
		0x7E, // (~) TILDE
		0x7F, // ({7F}) DELETE
	]},
	// 80..FF Latin-1 Supplement: 16/94 denied
	{block: 'Latin-1 Supplement', cps: [
		// exclaim/question mark
		0xA1, // (¡) INVERTED EXCLAMATION MARK
		0xBF, // (¿) INVERTED QUESTION MARK
		// sectioning
		0xA7, // (§) SECTION SIGN
		0xB6, // (¶) PILCROW SIGN
		// 20230804: iceland uses this / https://en.wikipedia.org/wiki/Thorn_(letter) / node tools/reg-count.js DE === 0
		0xFE, // (þ) LATIN SMALL LETTER THORN
		0xF0, // (ð) LATIN SMALL LETTER ETH
		// superscript
		0xBA, // (º) MASCULINE ORDINAL INDICATOR
		0xAA, // (ª) FEMININE ORDINAL INDICATOR
		// superscript digits
		0xB9, // (¹) SUPERSCRIPT ONE
		// middle dot
		0xB7, // (·) MIDDLE DOT
		// quotation
		0xAB, // («) LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
		0xBB, // (») RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
		// bad plus
		0xB1, // (±) PLUS-MINUS SIGN
		0xD7, // (×) MULTIPLICATION SIGN
		0xF7, // (÷) DIVISION SIGN
		// vertical bars
		0xA6, // (¦) BROKEN BAR
	]},
] satisfies Rule[];
