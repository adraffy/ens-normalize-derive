// What needs review for the current Unicode version?
//
// usage:
//   bun run review           # pending characters (disallowed only because nobody reviewed them)
//   bun run review --all     # also list new characters handled by other rules, and new emoji
//   bun run review --html    # also write .cache/review.html: glyphs, context, lookalikes, registered labels, checkboxes
//
// Derives twice: with and without rules/disallow/unreviewed.ts. The difference is exactly what
// allowing would enable. To allow a character, paste its line into REVIEWED in that file.

import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {parseArgs} from 'node:util';
import unreviewed, {AGE, REVIEWED} from '../rules/disallow/unreviewed.ts';
import {chartGlyphs} from '../src/chart-glyphs.ts';
import {type DeriveOutput, derive} from '../src/derive.ts';
import {describer} from '../src/describe.ts';
import {loadLabels} from '../src/labels.ts';
import {type ReviewBlock, type ReviewChar, renderReviewHTML} from '../src/review-html.ts';
import {loadRules} from '../src/rules.ts';
import {resolveRules} from '../src/select.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, groupBy, hexCp, sortedCps} from '../src/utils.ts';

const {values: opts} = parseArgs({
	options: {
		all: {type: 'boolean', default: false},
		html: {type: 'boolean', default: false},
	},
});

const rules = await loadRules();
const unicode = UnicodeSpec.fromRelease('current');
const d = describer(unicode, resolveRules(unicode, rules.charsEscape).cps);
const version = unicode.unicodeVersion.version;
if (!version.startsWith(`${AGE}.`)) {
	console.log(`*** rules/disallow/unreviewed.ts AGE is ${AGE} but the current Unicode is ${version}: bump it`);
}

const base = derive({unicode, rules, skipNFTests: true});
const open = derive({
	unicode: UnicodeSpec.fromRelease('current'),
	rules: {...rules, charsDisallowed: rules.charsDisallowed.filter((r) => !unreviewed.includes(r as never))},
	skipNFTests: true,
});

function validGroups(out: DeriveOutput): Map<CodePoint, string[]> {
	const map = new Map<CodePoint, string[]>();
	for (const g of out.spec.groups) {
		for (const cp of [...g.primary, ...g.secondary]) {
			const v = map.get(cp) ?? [];
			v.push(g.restricted ? `Restricted[${g.name}]` : g.name);
			map.set(cp, v);
		}
	}
	return map;
}
const validBase = validGroups(base);
const validOpen = validGroups(open);
const CACHE = new URL('../.cache/', import.meta.url);

// a typical letter per script, for showing marks and letters in context
const SAMPLE_BASE: Record<string, CodePoint> = {
	Latn: 0x61, // a
	Grek: 0x3b1, // α
	Cyrl: 0x430, // а
	Arab: 0x628, // ب
	Hebr: 0x5d1, // ב
	Deva: 0x915, // क
	Beng: 0x995, // ক
	Orya: 0xb15, // କ
	Hira: 0x304b, // か
	Kana: 0x30ab, // カ
	Hani: 0x4e2d, // 中
	Hang: 0xd55c, // 한
};
const line = (cp: CodePoint, groups?: string[]) => `\t${d.comment(cp)}${groups ? ` [${groups.join(', ')}]` : ''}`;

// ************************************************************
// reports: behavior defined by text (rules/reports.ts)

const reports: {tr: string; rev: string; prior?: string; status: string; url: string}[] = [];

{
	const prior = UnicodeSpec.fromRelease('prior').readReportRevisions();
	const current = unicode.readReportRevisions();
	console.log(`==== Reports (text-defined behavior) ====`);
	for (const [tr, reviewed] of Object.entries(rules.reviewedReports)) {
		const rev = current[tr];
		const status = rev === undefined ? 'missing (re-download)' : rev > reviewed ? `UNREVIEWED (reviewed ${reviewed})` : 'reviewed';
		const changed = prior[tr] !== undefined && rev !== undefined && prior[tr] !== rev ? ` (was ${prior[tr]})` : '';
		const url = `https://www.unicode.org/reports/${tr}/${tr}-${rev}.html#Modifications`;
		console.log(`\t${tr}-${rev ?? '?'}${changed}: ${status}  ${url}`);
		reports.push({tr, rev: String(rev ?? '?'), prior: changed && String(prior[tr]), status, url});
	}
	console.log();
}

// ************************************************************
// pending

const pending = sortedCps([...validOpen.keys()].filter((cp) => !validBase.has(cp)));
console.log(`==== Pending review: ${pending.length} new in ${AGE}, disallowed only because unreviewed ====`);
for (const [block, cps] of groupBy(pending, (cp) => unicode.requireChar(cp).block.name)) {
	console.log(`\t// ${block}`);
	for (const cp of cps) {
		const extra: string[] = [];
		const nfd = unicode.requireChar(cp).decomp;
		if (unicode.cm.has(cp)) extra.push('CM');
		if (nfd) extra.push(`NFD ${nfd.map(hexCp).join(' ')}`);
		console.log(`${line(cp, validOpen.get(cp))}${extra.length ? ` {${extra.join(', ')}}` : ''}`);
	}
}

// mappings that would be enabled (eg. a new capital => its new lowercase)
const mappedBase = new Map(base.spec.mapped);
const mappedPending = open.spec.mapped.filter(([x]) => !mappedBase.has(x));
if (mappedPending.length) {
	console.log(`\n==== Mappings enabled by allowing them: ${mappedPending.length} ====`);
	for (const [x, ys] of mappedPending) console.log(`\t${d.mapped(x, ys)}`);
}

// ************************************************************
// summary of everything new

const fresh = [...unicode.charMap.values()].filter((c) => c.age === AGE).map((c) => c.cp);
const reviewed = REVIEWED.filter((cp) => validBase.has(cp));
const restricted = fresh.filter((cp) => validBase.get(cp)?.every((g) => g.startsWith('Restricted')));
const validOther = fresh.filter((cp) => validBase.has(cp) && !restricted.includes(cp) && !REVIEWED.includes(cp));
const disallowed = fresh.filter((cp) => !validBase.has(cp) && !validOpen.has(cp));

console.log(`\n==== Summary: ${fresh.length} characters new in ${AGE} ====`);
console.log(`  pending review                ${pending.length}`);
console.log(`  reviewed + allowed            ${reviewed.length}`);
console.log(`  valid in restricted groups    ${restricted.length}  (new scripts, see rules/scripts.ts)`);
console.log(`  valid otherwise               ${validOther.length}`);
console.log(`  disallowed by other rules     ${disallowed.length}  (block policy, emoji, IDNA)`);
const byScript = groupBy(restricted, (cp) => unicode.requireChar(cp).script.abbr);
for (const [s, cps] of byScript) console.log(`    Restricted[${s}]: ${cps.length}`);

const newEmoji = base.emojiInfo.filter((x) => x.version === AGE && x.type !== 'Disabled');
console.log(`  new emoji                     ${newEmoji.length}`);

if (opts.all) {
	if (validOther.length) {
		console.log(`\n==== Valid without review (check these) ====`);
		for (const cp of validOther) console.log(line(cp, validBase.get(cp)));
	}
	console.log(`\n==== Disallowed by other rules ====`);
	for (const [block, cps] of groupBy(disallowed, (cp) => unicode.requireChar(cp).block.name)) {
		console.log(`\t// ${block} (${cps.length})`);
		for (const cp of cps) console.log(line(cp));
	}
	console.log(`\n==== New emoji ====`);
	for (const x of newEmoji) console.log(`\t${x.form} ${x.name}`);
}

if (opts.html) await writeHTML();

if (pending.length) {
	console.log(`\nTo allow: paste lines into REVIEWED in rules/disallow/unreviewed.ts, then \`bun run derive\`.`);
}

// ************************************************************
// html

async function writeHTML() {
	const valid = (cp: CodePoint) => validBase.has(cp);
	// confusables.txt: cp => [prototype, others]
	const confusable = new Map<CodePoint, [CodePoint[], CodePoint[]]>();
	for (const [proto, cps] of unicode.readConfusables()) for (const cp of cps) confusable.set(cp, [proto, cps]);

	// registered labels (raw) containing each character of interest
	const watch = new Set([...pending, ...mappedPending.map(([x]) => x)]);
	const labels = new Map<CodePoint, {count: number; examples: string[]}>();
	for (const label of await loadLabels()) {
		for (const cp of new Set(Array.from(label, (c) => c.codePointAt(0)!))) {
			if (!watch.has(cp)) continue;
			const v = labels.get(cp) ?? {count: 0, examples: []};
			v.count++;
			if (v.examples.length < 8) v.examples.push(label);
			labels.set(cp, v);
		}
	}

	const reviewChar = (cp: CodePoint, groups: string[] = [], full = true): ReviewChar => {
		const char = unicode.requireChar(cp);
		const c: ReviewChar = {
			hex: hexCp(cp),
			display: d.str([cp]),
			name: char.getName(),
			gc: char.gc,
			scripts: d.scripts(cp),
			groups,
			cm: unicode.cm.has(cp),
			line: d.comment(cp),
		};
		if (!full) return c;
		if (char.decomp) c.nfd = d.seq(char.decomp);
		c.sample = sample(cp);
		const conf = confusable.get(cp);
		if (conf) {
			const [proto, cps] = conf;
			c.confusable = {
				proto: d.str(proto),
				protoValid: proto.every(valid),
				others: cps.filter((x) => x !== cp).map((x) => ({display: d.str([x]), hex: hexCp(x), name: unicode.getName(x), valid: valid(x)})),
			};
		}
		c.labels = labels.get(cp) ?? {count: 0, examples: []};
		return c;
	};
	const blocks = (cps: CodePoint[], fn: (cp: CodePoint) => ReviewChar): ReviewBlock[] =>
		[...groupBy(cps, (cp) => unicode.requireChar(cp).block)].map(([b, v]) => ({name: b.name, start: hexCp(b.cp0), chars: v.map(fn)}));
	// code charts (official glyphs), cached next to the page
	// and each character's glyph cropped from it
	const withCharts = async (v: ReviewBlock[]) => {
		for (const b of v) {
			b.chart = await downloadChart(b.start);
			if (!b.chart) continue;
			const glyphs = await chartGlyphs(
				new URL(b.chart, CACHE),
				b.chars.map((c) => parseInt(c.hex, 16)),
			);
			for (const c of b.chars) {
				c.glyph = glyphs.get(parseInt(c.hex, 16));
				if (c.glyph) c.sample = undefined; // fonts can't show it in context yet
			}
		}
		return v;
	};
	const mapped = new Map(mappedPending.map(([x, ys]) => [x, {char: reviewChar(x), target: d.seq(ys), targetDisplay: d.str(ys)}]));

	const emojiImages = await emojiSamples();
	const html = renderReviewHTML({
		version,
		age: AGE,
		reports,
		pending: await withCharts(blocks(pending, (cp) => reviewChar(cp, validOpen.get(cp)))),
		mappings: [...mapped.values()],
		// the same chars, so they get glyphs too
		mappingCharts: await withCharts(blocks([...mapped.keys()], (cp) => mapped.get(cp)!.char)),
		summary: [
			[`new in ${AGE}`, fresh.length],
			['pending review', pending.length],
			['reviewed and allowed', reviewed.length],
			['valid in restricted groups', restricted.length, 'new scripts, see rules/scripts.ts'],
			['valid otherwise', validOther.length],
			['disallowed by other rules', disallowed.length, 'block rules, emoji, IDNA'],
			['new emoji', newEmoji.length],
		],
		other: [
			{
				title: 'Valid without review',
				note: 'New characters that are valid in an unrestricted group without being in REVIEWED. Check these.',
				blocks: blocks(validOther, (cp) => reviewChar(cp, validBase.get(cp), false)),
			},
			{
				title: 'Disallowed by other rules',
				note: 'Block rules in rules/disallow/, emoji parts and IDNA. Hover a tile for its name.',
				blocks: blocks(disallowed, (cp) => reviewChar(cp, [], false)),
			},
			{
				title: 'Valid in restricted groups',
				note: "New scripts and additions to restricted scripts. Restricted groups can't mix with anything.",
				blocks: blocks(restricted, (cp) => reviewChar(cp, validBase.get(cp), false)).map((b) => ({
					...b,
					chars: b.chars.slice(0, 64),
					more: Math.max(0, b.chars.length - 64),
				})),
			},
		],
		emoji: newEmoji.map((x) => {
			const form = String(x.form ?? '');
			// skin tone variants aren't pictured: use the base emoji's
			const image = emojiImages.get(form) ?? emojiImages.get(form.replace(/[\u{1F3FB}-\u{1F3FF}\u{FE0F}]/gu, ''));
			return {form, name: String(x.name), image};
		}),
	});
	const file = new URL('review.html', CACHE);
	writeFileSync(file, html);
	console.log(`\nWrote: ${file.pathname}`);
}

/** the block's code chart from unicode.org, as a path relative to the page (undefined if unavailable) */
async function downloadChart(start: string): Promise<string | undefined> {
	const name = `charts/U${start.padStart(4, '0')}.pdf`;
	const file = new URL(name, CACHE);
	if (!existsSync(file)) {
		const url = `https://www.unicode.org/Public/${version}/charts/PDF/U${start.padStart(4, '0')}.pdf`;
		const res = await fetch(url);
		if (!res.ok) {
			console.log(`*** chart: HTTP ${res.status} ${url}`);
			return;
		}
		mkdirSync(new URL('.', file), {recursive: true});
		writeFileSync(file, await res.bytes());
	}
	return name;
}

/** new emoji => sample image (PNG data URI), from unicode.org's "emoji released" chart for AGE */
async function emojiSamples(): Promise<Map<string, string>> {
	const file = new URL(`emoji-released-${AGE}.html`, CACHE);
	if (!existsSync(file)) {
		const url = `https://www.unicode.org/emoji/charts-${AGE}/emoji-released.html`;
		const res = await fetch(url);
		if (!res.ok) {
			console.log(`*** emoji samples: HTTP ${res.status} ${url}`);
			return new Map();
		}
		writeFileSync(file, await res.bytes());
	}
	// <img alt='&#x1F6D9;' class='imga' src='data:image/png;base64,...'>
	const map = new Map<string, string>();
	for (const [, alt, src] of readFileSync(file, 'utf8').matchAll(/<img alt='([^']*)' class='imga' src='(data:image\/png;base64,[^']*)'/g)) {
		const form = alt!.replace(/&#x([0-9A-F]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/\u{FE0F}/gu, '');
		map.set(form, src!);
	}
	return map;
}

// the character in context: a mark on a typical base letter, a letter between two of them
function sample(cp: CodePoint): string | undefined {
	const char = unicode.requireChar(cp);
	const script = [char.script, ...char.getExtended()].find((s) => !['Zyyy', 'Zinh'].includes(s.abbr))?.abbr;
	const base = String.fromCodePoint(SAMPLE_BASE[script ?? ''] ?? 0x61);
	const c = String.fromCodePoint(cp);
	if (char.gc.startsWith('M')) return `${base}${c}`;
	if (char.gc.startsWith('L')) return `${base}${c}${base}`;
	if (char.gc === 'Sc') return `${c}100`;
	return undefined;
}
