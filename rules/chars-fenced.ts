import type {CodePoint} from '../src/utils.ts';

// characters that can't be first/last/touching
// eg. can't be a fence post: X---X---X
// format: [cp, name] (name is used in error messages)
export default [
	[
		0x2019, // (’) RIGHT SINGLE QUOTATION MARK
		'apostrophe'
	], 
	[
		0x2044, // (⁄) FRACTION SLASH
		'fraction slash'
	], 
	[
		0x30FB, // (・) KATAKANA MIDDLE DOT
		'middle dot',
	],
	[
		// 20261125: a hyphen; 1 registration, none at the start/end/doubled
		0x5BE, // (־) HEBREW PUNCTUATION MAQAF
		'maqaf',
	],
] satisfies [CodePoint, string][];