// Downloads the Unicode data files into data/unicode/<version>/ exactly as published.
//
// usage:
//   bun scripts/download-unicode.ts             # latest release
//   bun scripts/download-unicode.ts 16.0.0      # specific release(s)
//   bun scripts/download-unicode.ts draft       # the beta in /Public/draft/ (saved under its version)
//   --force                                     # write version.json even if nothing changed
//
// version.json records the download date; it is only bumped when a file changes.

import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {fetchScriptKinds} from '../src/script-kinds.ts';
import {DATA_DIR} from '../src/ucd.ts';
import {parseVersion, type Version, versionString} from '../src/utils.ts';

// each entry is a list of candidate locations (first that exists wins)
// 20250910: unicode 17+ moved the {emoji, idna, security} directories inside the spec directory
const FILES: string[][] = [
	// UCD
	['{SPEC}/ucd/UnicodeData.txt'],
	['{SPEC}/ucd/PropList.txt'],
	['{SPEC}/ucd/DerivedCoreProperties.txt'],
	['{SPEC}/ucd/Scripts.txt'],
	['{SPEC}/ucd/ScriptExtensions.txt'],
	['{SPEC}/ucd/PropertyValueAliases.txt'],
	['{SPEC}/ucd/Blocks.txt'],
	['{SPEC}/ucd/DerivedAge.txt'],
	// NF
	['{SPEC}/ucd/CompositionExclusions.txt'],
	['{SPEC}/ucd/DerivedNormalizationProps.txt'],
	['{SPEC}/ucd/NormalizationTest.txt'],
	// IDNA
	['{SPEC}/idna/IdnaMappingTable.txt', '{IDNA}/IdnaMappingTable.txt'],
	['{SPEC}/idna/IdnaTestV2.txt', '{IDNA}/IdnaTestV2.txt', '{IDNA}/IdnaTest.txt'],
	// Emoji
	['{SPEC}/ucd/emoji/emoji-data.txt', '{EMOJI}/emoji-data.txt'],
	['{SPEC}/emoji/emoji-sequences.txt', '{EMOJI}/emoji-sequences.txt'],
	['{SPEC}/emoji/emoji-zwj-sequences.txt', '{EMOJI}/emoji-zwj-sequences.txt'],
	['{SPEC}/emoji/emoji-test.txt', '{EMOJI}/emoji-test.txt'],
	// Security
	['{SPEC}/security/confusables.txt', '{SECURITY}/confusables.txt'],
	['{SPEC}/security/IdentifierStatus.txt', '{SECURITY}/IdentifierStatus.txt'],
	['{SPEC}/security/IdentifierType.txt', '{SECURITY}/IdentifierType.txt'],
	['{SPEC}/security/intentional.txt', '{SECURITY}/intentional.txt'],
];

const BASE = 'https://www.unicode.org/Public';

function resolveUrl(source: string, {major, minor, patch}: Version, draft: boolean): URL {
	const v3 = `${major}.${minor}.${patch}`;
	const bases: Record<string, string> = draft
		? {SPEC: `${BASE}/draft`, IDNA: `${BASE}/draft/idna`, EMOJI: `${BASE}/draft/emoji`, SECURITY: `${BASE}/draft/security`}
		: {SPEC: `${BASE}/${v3}`, IDNA: `${BASE}/idna/${v3}`, EMOJI: `${BASE}/emoji/${major}.${minor}`, SECURITY: `${BASE}/security/${v3}`};
	return new URL(source.replace(/\{([A-Z]+)\}/g, (_, key) => bases[key] ?? `{${key}}`));
}

async function fetchBytes(url: URL): Promise<Uint8Array> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.bytes();
}

async function latestVersion(draft: boolean): Promise<Version> {
	const text = await fetchBytes(new URL(`${BASE}/${draft ? 'draft' : 'UCD/latest'}/ReadMe.txt`)).then((x) => new TextDecoder().decode(x));
	const match = text.match(/Version (\d+\.\d+\.\d+)/);
	if (!match) throw new Error(`Unable to determine ${draft ? 'draft' : 'latest'} Unicode version`);
	return parseVersion(match[1]!);
}

async function download(version: Version, draft: boolean, force: boolean) {
	const v3 = versionString(version);
	const dir = new URL(`unicode/${v3}/`, DATA_DIR);
	mkdirSync(dir, {recursive: true});
	console.log(`Downloading ${v3}${draft ? ' (draft)' : ''} => ${dir.pathname}`);
	// only modified files bump version.json (adding a new file to the download list is not a data change)
	let changed = 0;
	const failures: string[] = [];
	function write(name: string, bytes: Uint8Array, desc: string) {
		const file = new URL(name, dir);
		let old: Buffer | undefined;
		try {
			old = readFileSync(file);
		} catch {}
		const same = old !== undefined && Buffer.compare(old, bytes) === 0;
		if (!same) {
			if (old) changed++;
			writeFileSync(file, bytes);
		}
		console.log(`${same ? 'SAME' : old ? 'CHG!' : 'NEW!'} ${desc}`);
	}
	await Promise.all(
		FILES.map(async (sources) => {
			const urls = sources.map((s) => resolveUrl(s, version, draft));
			try {
				const [i, bytes] = await Promise.any(urls.map(async (url, i) => [i, await fetchBytes(url)] as const));
				write(urls[i]!.pathname.split('/').pop()!, bytes, `<${urls[i]}>`);
			} catch {
				failures.push(...urls.map((x) => x.href));
			}
		}),
	);
	try {
		const kinds = await fetchScriptKinds(v3, draft);
		write('script-kinds.json', new TextEncoder().encode(JSON.stringify(kinds)), `<${kinds.report_url}>`);
	} catch (err) {
		failures.push(`script-kinds: ${(err as Error).message}`);
	}
	if (failures.length) {
		for (const x of failures) console.log(`FAIL ${x}`);
		if (!force) throw new Error(`incomplete download: ${failures.length} failures`);
	}
	console.log(`Changes: ${changed}`);
	const versionFile = new URL('version.json', dir);
	let exists = true;
	try {
		readFileSync(versionFile);
	} catch {
		exists = false;
	}
	if (force || changed || !exists) {
		writeFileSync(versionFile, JSON.stringify({version: v3, ...version, ...(draft && {draft: true}), date: new Date()}));
		console.log(`Wrote: ${versionFile.pathname}`);
	}
}

const argv = process.argv.slice(2);
const force = argv.includes('--force');
const draft = argv.includes('draft');
const versions = argv.filter((x) => !x.startsWith('--') && x !== 'draft').map(parseVersion);
if (!versions.length) versions.push(await latestVersion(draft));
for (const v of versions) await download(v, draft, force);
