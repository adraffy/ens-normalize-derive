// What needs review for the current Unicode version?
//
// usage:
//   bun run review           # pending characters (disallowed only because nobody reviewed them)
//   bun run review --all     # also list new characters handled by other rules, and new emoji
//
// Derives twice: with and without rules/disallow/unreviewed.ts. The difference is exactly what
// allowing would enable. To allow a character, paste its line into REVIEWED in that file.

import {parseArgs} from 'node:util';
import unreviewed, {AGE, REVIEWED} from '../rules/disallow/unreviewed.ts';
import {type DeriveOutput, derive} from '../src/derive.ts';
import {describer} from '../src/describe.ts';
import {loadRules} from '../src/rules.ts';
import {resolveRules} from '../src/select.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, groupBy, hexCp, sortedCps} from '../src/utils.ts';

const {values: opts} = parseArgs({options: {all: {type: 'boolean', default: false}}});

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
const line = (cp: CodePoint, groups?: string[]) => `\t${d.comment(cp)}${groups ? ` [${groups.join(', ')}]` : ''}`;

// ************************************************************
// reports: behavior defined by text (rules/reports.ts)

{
	const prior = UnicodeSpec.fromRelease('prior').readReportRevisions();
	const current = unicode.readReportRevisions();
	console.log(`==== Reports (text-defined behavior) ====`);
	for (const [tr, reviewed] of Object.entries(rules.reviewedReports)) {
		const rev = current[tr];
		const status = rev === undefined ? 'missing (re-download)' : rev > reviewed ? `UNREVIEWED (reviewed ${reviewed})` : 'reviewed';
		const changed = prior[tr] !== undefined && rev !== undefined && prior[tr] !== rev ? ` (was ${prior[tr]})` : '';
		console.log(`\t${tr}-${rev ?? '?'}${changed}: ${status}  https://www.unicode.org/reports/${tr}/${tr}-${rev}.html#Modifications`);
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

if (pending.length) {
	console.log(`\nTo allow: paste lines into REVIEWED in rules/disallow/unreviewed.ts, then \`bun run derive\`.`);
}
