import type {CodePoint} from '../../src/utils.ts';
import type {Rule} from '../../src/select.ts';
import {SCRIPT_GROUPS} from '../scripts.ts';

// characters new in the current Unicode version that nobody has reviewed yet
//
// New characters in any script used by an unrestricted group (Latin, Arabic, Han, Common, ...)
// are disallowed until someone allows them. New scripts are handled by rules/scripts.ts instead
// (usually as restricted groups).
// Unreviewed characters can't break registrations: they weren't normalizable before.
//
// review:  `bun run review` lists what's pending and prints lines to paste into REVIEWED
//          `bun run review --html` does the same as a page with glyphs and code charts
// upgrade: bump AGE and empty REVIEWED

export const AGE = '18.0';

// reviewed and allowed (paste from `bun run review`)
export const REVIEWED: CodePoint[] = [
	// Currency Symbols
	0x20C3, // (⃃) UAE DIRHAM SIGN (Arabic only, see rules/scripts.ts)
];

const GROUP_SCRIPTS = [...new Set(['Zinh', ...SCRIPT_GROUPS.flatMap((g) => [...g.test, ...(g.rest ?? [])])])].sort();

export default [
	{
		reason: `new in ${AGE}: unreviewed`,
		age: AGE,
		script: GROUP_SCRIPTS,
		except: REVIEWED,
	},
] satisfies Rule[];
