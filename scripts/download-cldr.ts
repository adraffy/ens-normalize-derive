// Downloads CLDR region + annotation files into data/cldr/<version>/ and extracts:
//   regions.json      valid emoji flag regions
//   short-names.json  emoji/character short names ("tts" annotations)
//
// usage:
//   bun scripts/download-cldr.ts          # latest GitHub release
//   bun scripts/download-cldr.ts 48.2     # specific release(s)
//
// note: CLDR is versioned separately from Unicode!
// TODO: consider cldr-json (https://github.com/unicode-org/cldr-json) instead of scraping XML

import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {DATA_DIR} from '../src/ucd.ts';

async function latestVersion(): Promise<string> {
	const prefix = 'release-';
	const res = await fetch('https://api.github.com/repos/unicode-org/cldr/releases');
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const releases = (await res.json()) as {name: string; prerelease: boolean; draft: boolean}[];
	const names = releases
		.filter((x) => !x.prerelease && !x.draft && x.name.startsWith(prefix) && !/(beta|alpha)/i.test(x.name))
		.map((x) => x.name.slice(prefix.length).replaceAll('-', '.'));
	// don't assume the API order
	names.sort((a, b) => {
		const [x, y] = [a, b].map((s) => s.split('.').map(Number));
		for (let i = 0; i < Math.max(x!.length, y!.length); i++) {
			const c = (x![i] ?? 0) - (y![i] ?? 0);
			if (c) return -c;
		}
		return 0;
	});
	if (!names.length) throw new Error('expected a CLDR release');
	return names[0]!;
}

export function parseRegions(xml: string): string[] {
	// A sequence of two Regional Indicator characters, where the corresponding ASCII characters
	// are valid region sequences as specified by Unicode region subtags in [CLDR],
	// with idStatus = “regular”, “deprecated”, or “macroregion”.
	xml = xml.replace(/<!--.*?-->/gs, '');
	const regions: string[] = [];
	for (const match of xml.matchAll(/idStatus=(.)(.*?)\1[^>]*>(.*?)<\/id>/gs)) {
		switch (match[2]) {
			case 'regular':
			// case 'deprecated': // 20220922: these dont have platform support
			case 'macroregion': break;
			default: continue;
		}
		for (const s of match[3]!.split(/\s+/)) {
			const m = s.trim().match(/^([A-Z]{2})(?:~([A-Z]))?$/);
			if (!m) continue;
			const [, start, end] = m;
			if (end) {
				for (let i = start!.charCodeAt(1); i <= end.charCodeAt(0); i++) {
					regions.push(start![0] + String.fromCharCode(i));
				}
			} else {
				regions.push(start!);
			}
		}
	}
	return regions.sort();
}

export function parseShortNames(xml: string): Record<string, string> {
	// https://www.unicode.org/reports/tr35/tr35-general.html#Annotations
	// <annotation cp="🏻" type="tts">light skin tone</annotation>
	// warning: all cp values have U+FE0F removed
	const map: Record<string, string> = {};
	for (const m of xml.matchAll(/<annotation cp="([^"]+)" type="tts">([^<]+)/g)) {
		map[m[1]!] = m[2]!;
	}
	return map;
}

async function download(version: string) {
	const dir = new URL(`cldr/${version}/`, DATA_DIR);
	mkdirSync(dir, {recursive: true});
	const base = `https://raw.githubusercontent.com/unicode-org/cldr/release-${version.replaceAll('.', '-')}`;
	const LANG = 'en';
	const files = [
		{url: `${base}/common/validity/region.xml`, name: 'region.xml'},
		{url: `${base}/common/annotations/${LANG}.xml`, name: `annotations-${LANG}.xml`},
	];
	console.log(`Downloading CLDR ${version} => ${dir.pathname}`);
	let changed = 0;
	for (const {url, name} of files) {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
		const bytes = await res.bytes();
		const file = new URL(name, dir);
		let same = false;
		try {
			same = Buffer.compare(readFileSync(file), bytes) === 0;
		} catch {}
		if (!same) {
			changed++;
			writeFileSync(file, bytes);
		}
		console.log(`${same ? 'SAME' : 'NEW!'} <${url}>`);
	}
	console.log(`Changes: ${changed}`);
	if (changed) {
		const read = (name: string) => readFileSync(new URL(name, dir), 'utf8');
		const write = (name: string, json: unknown) => writeFileSync(new URL(name, dir), JSON.stringify(json, null, '\t'));
		const regions = parseRegions(read('region.xml'));
		const names = parseShortNames(read(`annotations-${LANG}.xml`));
		write('regions.json', regions);
		write('short-names.json', names);
		write('version.json', {version, url: base, date: new Date()});
		console.log(`Found ${regions.length} regions, ${Object.keys(names).length} short names`);
	}
}

if (import.meta.main) {
	const versions = process.argv.slice(2);
	if (!versions.length) versions.push(await latestVersion());
	for (const v of versions) await download(v);
}
