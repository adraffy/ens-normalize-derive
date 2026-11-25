import type {CodePoint} from '../src/utils.ts';

//import {parse_cp_range} from '../utils.js';
export default [

	// ignored by idna
	// `node derive/names.js idna-ignored`
	// Computed: 2022-12-14T03:25:25.950Z
	// Version: Unicode(15.0.0) CLDR(42)
	/*
	0xAD, // (­) SOFT HYPHEN
	0x34F, // (◌͏) COMBINING GRAPHEME JOINER
	0x180B, // (◌᠋) MONGOLIAN FREE VARIATION SELECTOR ONE
	0x180C, // (◌᠌) MONGOLIAN FREE VARIATION SELECTOR TWO
	0x180D, // (◌᠍) MONGOLIAN FREE VARIATION SELECTOR THREE
	0x180F, // (◌᠏) MONGOLIAN FREE VARIATION SELECTOR FOUR
	0x200B, // (�) ZERO WIDTH SPACE
	0x2060, // (⁠) WORD JOINER
	0x2064, // (⁤) INVISIBLE PLUS
	0xFEFF, // (﻿) ZERO WIDTH NO-BREAK SPACE
	0x1BCA0, // (𛲠) SHORTHAND FORMAT LETTER OVERLAP
	0x1BCA1, // (𛲡) SHORTHAND FORMAT CONTINUING OVERLAP
	0x1BCA2, // (𛲢) SHORTHAND FORMAT DOWN STEP
	0x1BCA3, // (𛲣) SHORTHAND FORMAT UP STEP
	...parse_cp_range('FE00..FE0F'), // (◌︀) VARIATION SELECTOR-1 .. (◌️) VARIATION SELECTOR-16	
	...parse_cp_range('E0100..E01EF'), // (◌󠄀) VARIATION SELECTOR-17 .. (◌󠇯) VARIATION SELECTOR-256
	*/
	
	// 20221213: 
	// there are no additional ignored characters
	// this file is currently a placeholder for future additions

] satisfies CodePoint[];
