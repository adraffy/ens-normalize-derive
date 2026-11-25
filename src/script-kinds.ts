// UAX-31 script classifications (Excluded / Recommended / Limited Use).
// These tables only exist in the HTML report, versioned alongside the spec.
// https://www.unicode.org/reports/tr31/#Table_Recommended_Scripts

export interface ScriptKinds {
	limited_use: string[];
	excluded: string[];
	recommended: string[];
	report_url: string;
}

async function fetchText(url: string): Promise<string> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
	return res.text();
}

function findTable(html: string, name: string): string[] {
	let pos = html.indexOf(`name="${name}"`);
	if (pos === -1) pos = html.indexOf(`id="${name}"`);
	if (pos === -1) throw new Error(`Unable to find table "${name}"`);
	pos = html.indexOf('<table', pos);
	if (pos === -1) throw new Error(`Unable to find <table> "${name}"`);
	const end = html.indexOf('</table>', pos);
	if (end === -1) throw new Error(`Unable to find </table> "${name}"`);
	return [...html.slice(pos, end).matchAll(/\{script=([a-z]+)\}/gi)].map((m) => m[1]!).sort();
}

export async function fetchScriptKinds(version: string, draft = false): Promise<ScriptKinds> {
	// the version page links to the matching tr31 revision, eg. tr31-41.html
	// while in beta, the report is "proposed.html"
	let reportName: string;
	if (draft) {
		reportName = 'proposed';
	} else {
		const html = await fetchText(`https://www.unicode.org/versions/Unicode${version}/`);
		if (/<h1>.*?Draft.*?<\/h1>/im.test(html)) {
			reportName = 'proposed';
		} else {
			const revision = Math.max(0, ...[...html.matchAll(/\/tr31\/tr31-(\d+)\.html/g)].map((m) => parseInt(m[1]!, 10)));
			if (!revision) throw new Error(`Unable to determine tr31 revision for ${version}`);
			reportName = `tr31-${revision}`;
		}
	}
	const report_url = `https://www.unicode.org/reports/tr31/${reportName}.html`;
	const html = await fetchText(report_url);
	return {
		limited_use: findTable(html, 'Table_Limited_Use_Scripts'),
		excluded: findTable(html, 'Table_Candidate_Characters_for_Exclusion_from_Identifiers'),
		recommended: findTable(html, 'Table_Recommended_Scripts'),
		// note: `Aspirational_Use_Scripts` was merged into Limited Use in Unicode 10
		report_url,
	};
}

/** {tr39: 34, ...}: the report revisions listed on the version page */
export async function fetchReportRevisions(version: string): Promise<Record<string, number>> {
	const html = await fetchText(`https://www.unicode.org/versions/Unicode${version}/`);
	const out: Record<string, number> = {};
	for (const m of html.matchAll(/\/reports\/(tr\d+)\/tr\d+-(\d+)\.html/g)) {
		out[m[1]!] = Math.max(out[m[1]!] ?? 0, parseInt(m[2]!, 10));
	}
	if (!Object.keys(out).length) throw new Error(`no report revisions found for ${version}`);
	return Object.fromEntries(Object.entries(out).sort((a, b) => parseInt(a[0].slice(2), 10) - parseInt(b[0].slice(2), 10)));
}
