// Types for the hand-maintained rule files in /rules, and a loader that bundles them.

import type {Rule} from './select.ts';
import type {CodePoint} from './utils.ts';

export const CONFUSE_TYPE_ALLOW = 'allow';
export const CONFUSE_TYPE_VALID = 'primary';
export type ConfuseType = typeof CONFUSE_TYPE_ALLOW | typeof CONFUSE_TYPE_VALID;
export interface ConfuseDef {
	cp: CodePoint;
	type?: ConfuseType;
}
/** [target hex, member, member, ...] */
export type ConfuseGroup = [target: string, ...members: (CodePoint | ConfuseDef)[]];

export interface ScriptGroupConfig {
	name: string;
	/** scripts that identify this group (each script may only be tested once) */
	test: string[];
	/** additional scripts allowed in this group */
	rest?: string[];
	/** additional characters allowed in this group (strings are exploded) */
	extra?: (string | CodePoint)[];
	/** true = only whitelisted combining mark sequences (see rules/cm.ts) */
	cm?: boolean;
}

export interface EmojiWhitelistEntry {
	hex: string;
	name: string;
}

export interface Rules {
	charsValid: CodePoint[];
	charsIgnored: CodePoint[];
	charsMapped: [CodePoint, CodePoint[]][];
	charsDisallowed: Rule[];
	charsEscape: Rule[];
	charsFenced: [CodePoint, string?][];
	groupOrder: string[];
	cmWhitelist: string[];
	confuseGroups: ConfuseGroup[];
	confuseDefaultAllow: boolean;
	emojiDemoted: CodePoint[];
	emojiDisabled: CodePoint[];
	emojiSeqWhitelist: EmojiWhitelistEntry[];
	emojiSeqBlacklist: (string | CodePoint)[];
	nsmMax: number;
	scriptGroups: ScriptGroupConfig[];
	scriptExtensions: [CodePoint, string[]][];
	disallowedScripts: string[];
	restrictedScripts: string[];
}

export async function loadRules(): Promise<Rules> {
	const [valid, ignored, mapped, disallowed, escape, fenced, order, cm, confuse, emoji, scripts] = await Promise.all([
		import('../rules/chars-valid.ts'),
		import('../rules/chars-ignored.ts'),
		import('../rules/chars-mapped.ts'),
		import('../rules/chars-disallow.ts'),
		import('../rules/chars-escape.ts'),
		import('../rules/chars-fenced.ts'),
		import('../rules/group-order.ts'),
		import('../rules/cm.ts'),
		import('../rules/confuse.ts'),
		import('../rules/emoji.ts'),
		import('../rules/scripts.ts'),
	]);
	return {
		charsValid: valid.default,
		charsIgnored: ignored.default,
		charsMapped: mapped.default,
		// TEMP: wrap the legacy codepoint list until rules/disallow/ exists
		charsDisallowed: [{cps: disallowed.default, reason: "legacy chars-disallow"}],
		charsEscape: escape.default,
		charsFenced: fenced.default,
		groupOrder: order.default,
		cmWhitelist: cm.CM_WHITELIST,
		confuseGroups: confuse.CONFUSE_GROUPS,
		confuseDefaultAllow: confuse.CONFUSE_DEFAULT_ALLOW,
		emojiDemoted: emoji.EMOJI_DEMOTED,
		emojiDisabled: emoji.EMOJI_DISABLED,
		emojiSeqWhitelist: emoji.EMOJI_SEQ_WHITELIST,
		emojiSeqBlacklist: emoji.EMOJI_SEQ_BLACKLIST,
		nsmMax: scripts.NSM_MAX,
		scriptGroups: scripts.SCRIPT_GROUPS,
		scriptExtensions: scripts.SCRIPT_EXTENSIONS,
		disallowedScripts: scripts.DISALLOWED_SCRIPTS,
		restrictedScripts: scripts.RESTRICTED_SCRIPTS,
	};
}
