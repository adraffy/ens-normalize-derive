// Builds output/tests.json: ENSIP-15 validation tests for the current spec.
//
// usage:
//   bun run make-tests            # write output/tests.json
//   bun run make-tests --check    # exit 1 if output/tests.json is stale
//
// Outcomes come from the reference implementation (src/ensip15.ts) on output/, so the file can be
// built before any library is. Libraries (ens-normalize.js, ens-normalize.ts, ...) then check
// themselves against it. Deterministic: same spec + rules => same file.
//
// Sections:
//   require   must hold, or this script fails: custom tests, emoji, disallowed chars, disabled emoji
//   expect    should hold, mismatches are printed for review: mapped/valid rules, fences, CM, properties
//   record    whatever the spec does: groups, mixtures, wholes, IdnaTestV2, registrations, random names
//   changes   every registered label whose outcome differs from the baseline release

import {readFileSync, writeFileSync} from 'node:fs';
import {parseArgs} from 'node:util';
import {type ENSIP15, loadENSIP15} from '../src/ensip15.ts';
import {ensIdnaRules} from '../src/idna.ts';
import {BASELINE_VERSION, loadLabels} from '../src/labels.ts';
import {loadRules} from '../src/rules.ts';
import {resolveRules} from '../src/select.ts';
import {checkTest, makeTest, type TestCase} from '../src/tests.ts';
import {UnicodeSpec} from '../src/ucd.ts';
import {type CodePoint, getOrInsert, hexCp, mulberry32} from '../src/utils.ts';
import CUSTOM from '../validate/custom.ts';

const {values: opts} = parseArgs({options: {check: {type: 'boolean', default: false}}});

const OUTPUT = new URL('../output/', import.meta.url);
const SEED = 0x2ec4373f;
const PER_GROUP = 8; // random single chars per group
const PER_TYPE = 200; // registered labels sampled per label type
const SAMPLE = 5000; // registered labels sampled per outcome (valid / norm / error)

const ref = await loadENSIP15(OUTPUT);
const base = await loadENSIP15(new URL(`../baseline/${BASELINE_VERSION}/`, import.meta.url));
const unicode = UnicodeSpec.fromRelease('current');
const rules = await loadRules();
const rng = mulberry32(SEED);
const str = (...cps: CodePoint[]) => String.fromCodePoint(...cps);
const pick = <T>(v: readonly T[]) => v[Math.floor(rng() * v.length)]!;
function sample<T>(v: readonly T[], n: number): T[] {
	if (v.length <= n) return v.slice();
	const a = v.slice();
	for (let i = 0; i < n; i++) {
		const j = i + Math.floor(rng() * (a.length - i));
		[a[i], a[j]] = [a[j]!, a[i]!];
	}
	return a.slice(0, n);
}

const tests: TestCase[] = [];
const seen = new Set<string>();
const problems: string[] = [];
const review: string[] = [];
const counts: [string, number][] = [];

function section(title: string, names: Iterable<string>, mode: 'require-pass' | 'require-fail' | 'expect-pass' | 'expect-fail' | 'record') {
	let n = 0;
	for (const name of names) {
		if (seen.has(name)) continue;
		seen.add(name);
		const t = makeTest(ref, name);
		tests.push(t);
		n++;
		const fail = (why: string) => `${title}: ${JSON.stringify(name)} [${[...name].map((c) => hexCp(c.codePointAt(0)!)).join(' ')}] ${why}`;
		if (mode === 'require-pass' && t.error) problems.push(fail(t.comment!));
		if (mode === 'require-fail' && !t.error) problems.push(fail('is valid'));
		if (mode === 'expect-pass' && t.error) review.push(fail(t.comment!));
		if (mode === 'expect-fail' && !t.error) review.push(fail(`is valid${t.norm !== undefined ? ` => ${JSON.stringify(t.norm)}` : ''}`));
	}
	counts.push([title, n]);
}

// ************************************************************
// require

for (const t of CUSTOM) {
	const why = checkTest(ref, t);
	if (why) problems.push(`custom: ${JSON.stringify(t.name)} (${t.comment}): ${why}`);
	if (seen.has(t.name)) continue;
	seen.add(t.name);
	tests.push(t);
}
counts.push(['custom', CUSTOM.length]);

// every emoji, with every combination of optional FE0F
section(
	'emoji',
	ref.emoji.flatMap((cps) => {
		// FE0F is optional: every subset of them
		let forms: CodePoint[][] = [[]];
		for (const cp of cps) {
			const next = forms.map((v) => [...v, cp]);
			forms = cp === 0xfe0f ? forms.concat(next) : next;
		}
		return forms.map((v) => str(...v));
	}),
	'require-pass',
);

// characters that IDNA would accept but the rules disallow
const idna = ensIdnaRules(unicode);
const idnaLive = new Set([...idna.valid, ...idna.mapped.map(([x]) => x), ...idna.ignored]);
const disallowed = [...resolveRules(unicode, rules.charsDisallowed).cps].filter((cp) => idnaLive.has(cp)).sort((a, b) => a - b);
section(
	'disallowed',
	disallowed.map((cp) => str(cp)),
	'require-fail',
);
section(
	'emoji: disabled',
	rules.emojiDisabled.map((cp) => str(cp)),
	'require-fail',
);

// ************************************************************
// expect

section(
	'mapped',
	rules.charsMapped.map(([x, ys]) => (ys.some((cp) => ref.fenced.has(cp)) ? `a${str(x)}a` : str(x))), // fenced targets can't stand alone
	'expect-pass',
);
section(
	'valid',
	rules.charsValid.map((cp) => str(cp)),
	'expect-pass',
);
section(
	'emoji: demoted',
	rules.emojiDemoted.map((cp) => str(cp)),
	'expect-pass',
);
section('cm whitelist', rules.cmWhitelist, 'expect-pass');

// fences: X+F+X passes, F+X, X+F, X+F+F+X fail (X = a primary char of a group that has F)
{
	const pass: string[] = [];
	const fail: string[] = [];
	for (const [f] of rules.charsFenced) {
		const g = ref.groups.find((g) => g.primary.has(f) || g.secondary.has(f));
		const x = g && [...g.primary].find((cp) => !ref.cm.has(cp) && !ref.fenced.has(cp) && cp >= 0x61);
		if (!x) continue;
		pass.push(str(x, f, x));
		fail.push(str(f, x), str(x, f), str(x, f, f, x));
	}
	section('fenced', pass, 'expect-pass');
	section('fenced: placement', fail, 'expect-fail');
}

const props = unicode.readProps();
section(
	'properties: whitespace, noncharacters, terminals',
	['White_Space', 'Noncharacter_Code_Point', 'Pattern_White_Space', 'Sentence_Terminal'].flatMap((p) => props[p]!.map((cp) => str(cp))),
	'expect-fail',
);
section(
	'properties: variation selectors are ignored',
	props.Variation_Selector!.map((cp) => `a${str(cp)}`),
	'expect-pass',
);

// ************************************************************
// record

// per group: random single characters, and a mixture with the next group
{
	const singles: string[] = [];
	const mixtures: string[] = [];
	const unique = (g: (typeof ref.groups)[number]) =>
		[...g.primary].filter((cp) => !ref.cm.has(cp) && ref.groups.every((h) => h === g || !(h.primary.has(cp) || h.secondary.has(cp))));
	ref.groups.forEach((g, i) => {
		const own = unique(g);
		if (!own.length) return;
		for (const cp of sample(own, PER_GROUP)) singles.push(str(cp));
		const h = ref.groups[(i + 1) % ref.groups.length]!;
		const other = unique(h);
		if (other.length) mixtures.push(str(pick(own), pick(other)));
	});
	section('groups', singles, 'record');
	section('groups: mixtures', mixtures, 'record');
}

// whole-script confusables: confused characters on their own
{
	const spec = await Bun.file(new URL('spec.json', OUTPUT)).json();
	const names = (spec.wholes as {confused: CodePoint[]}[]).flatMap((w) => sample(w.confused, 3).map((cp) => str(cp)));
	section('wholes', names, 'record');
}

// UTS-46 conformance inputs (outcomes are ENSIP-15's, not UTS-46's)
{
	const names: string[] = [];
	const text = readFileSync(new URL('IdnaTestV2.txt', unicode.dataDir), 'utf8');
	for (const line of text.split('\n')) {
		const src = line.split('#')[0]!.split(';')[0]!.trim();
		if (!src) continue;
		names.push(
			src
				.replace(/\\u([0-9A-F]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
				.replace(/\\x\{([0-9A-F]+)\}/gi, (_, h) => str(parseInt(h, 16))),
		);
	}
	section('IdnaTestV2', names, 'record');
}

// registered labels: changes since the baseline, then a sample stratified by outcome and label type
{
	const labels = (await loadLabels()).filter((x) => !/^[0-9a-z]*$/.test(x)); // skip trivial
	const outcome = (r: ENSIP15, s: string) => {
		try {
			return r.normalize(s);
		} catch (err) {
			return `Error: ${(err as Error).message}`;
		}
	};
	const changed: string[] = [];
	const byOutcome: Record<string, string[]> = {valid: [], norm: [], error: []};
	const byType = new Map<string, string[]>();
	for (const label of labels) {
		const a = outcome(base, label);
		const b = outcome(ref, label);
		if (a !== b) changed.push(label);
		byOutcome[b.startsWith('Error: ') ? 'error' : b === label ? 'valid' : 'norm']!.push(label);
		if (!b.startsWith('Error: ')) {
			const type = ref
				.split(label)
				.map((x) => x.type)
				.join('.');
			getOrInsert(byType, type, () => []).push(label);
		}
	}
	section(`changes since ${BASELINE_VERSION}`, changed, 'record');
	section(
		'registered: by type',
		[...byType.values()].flatMap((v) => sample(v, PER_TYPE)),
		'record',
	);
	section(
		'registered: by outcome',
		Object.values(byOutcome).flatMap((v) => sample(v, SAMPLE)),
		'record',
	);
}

// random names: per group, weighted mix of valid / mapped / ignored / emoji, plus a broken copy
{
	const reverse = new Map<CodePoint, CodePoint[]>();
	for (const [x, ys] of ref.mapped) {
		for (const y of ys) {
			getOrInsert(reverse, y, () => []).push(x);
		}
	}
	const emoji = ref.emoji.map((v) => str(...v));
	const ignored = [...ref.ignored].map((cp) => str(cp));
	const inject = [...ref.groups.flatMap((g) => sample([...g.primary], 2)), 0x2e, 0x20, 0x00];
	const pass: string[] = [];
	const fail: string[] = [];
	for (const g of ref.groups) {
		const valid = [...g.primary, ...g.secondary].filter((cp) => !ref.cm.has(cp));
		const marks = [...g.primary, ...g.secondary].filter((cp) => ref.cm.has(cp));
		const mapped = [...new Set(valid.flatMap((cp) => reverse.get(cp) ?? []))];
		const dist: [number, string[]][] = (
			[
				[10, valid.map((cp) => str(cp))],
				[3, marks.map((cp) => str(cp))],
				[3, mapped.map((cp) => str(cp))],
				[1, ignored],
				[1, emoji],
			] as [number, string[]][]
		).filter(([, v]) => v.length);
		const total = dist.reduce((a, [w]) => a + w, 0);
		for (let len = 3; len <= 21; len += 3) {
			let s = '';
			while ([...s].length < len) {
				let r = rng() * total;
				let v = dist.at(-1)![1];
				for (const [w, x] of dist) {
					r -= w;
					if (r < 0) {
						v = x;
						break;
					}
				}
				s += pick(v);
			}
			pass.push(s);
			const cps = [...s];
			const at = Math.floor(rng() * (cps.length + 1));
			cps.splice(at, 0, str(pick(inject)));
			fail.push(cps.join(''));
		}
	}
	section('random', pass, 'record');
	section('random: injected', fail, 'record');
}

// ************************************************************
// write

const specBytes = readFileSync(new URL('spec.json', OUTPUT));
const nfBytes = readFileSync(new URL('nf.json', OUTPUT));
const sha256 = (b: Uint8Array) => new Bun.CryptoHasher('sha256').update(b).digest('hex');
const spec = JSON.parse(specBytes.toString());
const version = {name: 'version', unicode: spec.unicode, cldr: spec.cldr, spec_hash: sha256(specBytes), nf_hash: sha256(nfBytes)};
const json = JSON.stringify([version, ...tests], null, '\t');

for (const [title, n] of counts) console.log(`${String(n).padStart(7)}  ${title}`);
console.log(`${String(tests.length).padStart(7)}  total (${(json.length / 1e6).toFixed(1)} MB)`);
if (review.length) {
	console.log(`\nREVIEW (${review.length}): expected outcome differs`);
	for (const x of review.slice(0, 50)) console.log(`  ${x}`);
	if (review.length > 50) console.log(`  ... ${review.length - 50} more`);
}
if (problems.length) {
	console.log(`\nFAILED (${problems.length})`);
	for (const x of problems.slice(0, 50)) console.log(`  ${x}`);
	process.exit(1);
}

const file = new URL('tests.json', OUTPUT);
if (opts.check) {
	let old = '';
	try {
		old = readFileSync(file, 'utf8');
	} catch {}
	const same = old === json;
	console.log(same ? 'Same: tests.json' : 'DIFF: tests.json');
	process.exit(same ? 0 : 1);
}
writeFileSync(file, json);
console.log(`Wrote: tests.json`);
