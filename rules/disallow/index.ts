import type {Rule} from '../../src/select.ts';
import asciiLatin1 from './ascii-latin1.ts';
import cjk from './cjk.ts';
import cyrillic from './cyrillic.ts';
import greek from './greek.ts';
import latin from './latin.ts';
import marks from './marks.ts';
import mathArrows from './math-arrows.ts';
import music from './music.ts';
import numbers from './numbers.ts';
import phonetic from './phonetic.ts';
import punctuation from './punctuation.ts';
import scripts from './scripts.ts';
import symbols from './symbols.ts';
import unreviewed from './unreviewed.ts';

export default [
	...asciiLatin1,
	...cjk,
	...cyrillic,
	...greek,
	...latin,
	...marks,
	...mathArrows,
	...music,
	...numbers,
	...phonetic,
	...punctuation,
	...scripts,
	...symbols,
	...unreviewed,
] satisfies Rule[];
