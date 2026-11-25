import type {Rule} from '../src/select.ts';

// characters that should be escaped for display ({XX} instead of the raw character)
// this is also what the derive log uses to print characters safely
//
// 20261125: replaced the hand-maintained list (4273 entries, incl. src/unprintables.js) with properties.
// The old list was a subset of these rules except 2800, and was missing 32 format characters
// (Egyptian hieroglyph format controls 13430..1343F, interlinear annotation FFF9..FFFB,
// Arabic/Syriac/Kaithi prepended concatenation marks).
export default [
	{
		reason: 'controls, format, separators, spaces (except SPACE)',
		gc: ['Cc', 'Cf', 'Zs', 'Zl', 'Zp'],
		except: [
			0x20, // ( ) SPACE
		],
	},
	{
		// variation selectors, fillers, tags, invisible operators, and reserved ranges
		// note: includes unassigned codepoints (eg. E01F0..E0FFF)
		reason: 'default ignorable',
		prop: 'Default_Ignorable_Code_Point',
		except: {gc: ['Cc', 'Cf', 'Zs', 'Zl', 'Zp']}, // already selected above
	},
	{
		reason: 'blank but not whitespace',
		cps: [
			0x2800, // (⠀) BRAILLE PATTERN BLANK
		],
	},
] satisfies Rule[];
