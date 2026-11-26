// HTML page for `bun run review --html`: the pending characters with glyphs, context, lookalikes and
// registered labels, plus checkboxes that build the lines to paste into REVIEWED.
// Self-contained (no network), so it works from file://.

export interface ReviewChar {
	hex: string;
	/** safe display: a leading mark gets a dotted circle */
	display: string;
	name: string;
	/** general category */
	gc: string;
	/** "Latn" or "Zyyy => Arab,Syrc" */
	scripts: string;
	/** groups it would join if allowed */
	groups: string[];
	cm: boolean;
	/** canonical decomposition, as a description */
	nfd?: string;
	/** the character in context (eg. on a base letter) */
	sample?: string;
	/** confusables.txt: the prototype and the other characters with that prototype */
	confusable?: {proto: string; protoValid: boolean; others: {display: string; hex: string; name: string; valid: boolean}[]};
	/** registered labels containing it (raw, before normalization) */
	labels?: {count: number; examples: string[]};
	/** the line for REVIEWED */
	line: string;
}

export interface ReviewBlock {
	name: string;
	/** first codepoint of the block (hex), for the chart link */
	start: string;
	chars: ReviewChar[];
	/** characters left out of `chars` (large blocks) */
	more?: number;
	/** local copy of the code chart, relative to the page */
	chart?: string;
}

export interface ReviewMapping {
	char: ReviewChar;
	/** what it maps to, as a description */
	target: string;
	targetDisplay: string;
}

export interface ReviewData {
	version: string;
	age: string;
	reports: {tr: string; rev: string; prior?: string; status: string; url: string}[];
	pending: ReviewBlock[];
	mappings: ReviewMapping[];
	/** code charts for the mapping sources' blocks */
	mappingCharts: ReviewBlock[];
	summary: [string, number, string?][];
	/** new characters decided by other rules, read only */
	other: {title: string; note: string; blocks: ReviewBlock[]}[];
	emoji: {form: string; name: string}[];
}

const ESC: Record<string, string> = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]!);

const chartUrl = (start: string) => `https://www.unicode.org/charts/PDF/U${start.padStart(4, '0')}.pdf`;

function tags(c: ReviewChar): string {
	const v = [`<span class="tag">${esc(c.gc)}</span>`, `<span class="tag">${esc(c.scripts)}</span>`];
	if (c.cm) v.push(`<span class="tag warn">combining mark</span>`);
	for (const g of c.groups) v.push(`<span class="tag group">${esc(g)}</span>`);
	return v.join('');
}

function card(c: ReviewChar, block: string): string {
	const rows: string[] = [];
	if (c.nfd) rows.push(`<div class="row"><b>NFD</b> ${esc(c.nfd)}</div>`);
	if (c.confusable) {
		const MAX = 16;
		const others = c.confusable.others
			.slice(0, MAX)
			.map(
				(o) =>
					`<span class="look${o.valid ? ' valid' : ''}" title="${esc(`${o.hex} ${o.name}${o.valid ? ' (valid)' : ''}`)}">${esc(o.display)}</span>`,
			);
		rows.push(
			`<div class="row"><b>Looks like</b> <span class="look proto${c.confusable.protoValid ? ' valid' : ''}" title="confusables.txt prototype${c.confusable.protoValid ? ' (valid)' : ''}">${esc(c.confusable.proto)}</span>${others.join('')}${c.confusable.others.length > MAX ? `<span class="count"> +${c.confusable.others.length - MAX} more</span>` : ''}</div>`,
		);
	}
	if (c.labels) {
		const ex = c.labels.examples.map((x) => `<span class="label">${esc(x)}</span>`).join('');
		rows.push(`<div class="row"><b>Registered</b> ${c.labels.count.toLocaleString()} label${c.labels.count === 1 ? '' : 's'} ${ex}</div>`);
	}
	return `<label class="card" data-hex="${c.hex}" data-block="${esc(block)}" data-line="${esc(c.line)}">
<input type="checkbox" class="pick">
<div class="glyphs"><div class="glyph">${esc(c.display)}</div>${c.sample ? `<div class="sample" title="in context">${esc(c.sample)}</div>` : ''}</div>
<div class="info"><div class="name"><code>${c.hex}</code> ${esc(c.name)}</div><div class="tags">${tags(c)}</div>${rows.join('')}</div>
</label>`;
}

const chartLink = (b: ReviewBlock) => `<a href="${esc(b.chart ?? chartUrl(b.start))}" target="_blank" rel="noreferrer">chart</a>`;

// the official glyphs: fonts rarely cover a new Unicode version yet
const chartView = (b: ReviewBlock) =>
	b.chart
		? `<details class="chart"><summary>Code chart: ${esc(b.name)}</summary><object data="${esc(b.chart)}#page=2&navpanes=0&view=FitH" type="application/pdf"><a href="${esc(b.chart)}">${esc(b.chart)}</a></object></details>`
		: '';

function tile(c: ReviewChar): string {
	return `<span class="tile" title="${esc(`${c.hex} ${c.name}`)}">${esc(c.display)}</span>`;
}

export function renderReviewHTML(data: ReviewData): string {
	const total = data.pending.reduce((n, b) => n + b.chars.length, 0);
	const pending = data.pending
		.map(
			(b) => `<section class="block" data-block="${esc(b.name)}">
<h3><label><input type="checkbox" class="pick-block"> ${esc(b.name)}</label> <span class="count">${b.chars.length}</span> ${chartLink(b)}</h3>
${chartView(b)}
<div class="cards">${b.chars.map((c) => card(c, b.name)).join('\n')}</div>
</section>`,
		)
		.join('\n');
	const mappings = data.mappings.length
		? `<section class="block" data-block="Mappings">
<h2>Mappings enabled by allowing the source <span class="count">${data.mappings.length}</span></h2>
<p class="note">The source is new in ${esc(data.age)} and maps to characters that are already valid. Allowing the source makes it normalize to the target.</p>
${data.mappingCharts.map(chartView).join('\n')}
<div class="cards">${data.mappings
				.map((m) => card({...m.char, sample: `→ ${m.targetDisplay}`, nfd: m.char.nfd ? `${m.char.nfd}` : undefined}, 'Mappings'))
				.join('\n')}</div>
</section>`
		: '';
	const other = data.other
		.filter((o) => o.blocks.length)
		.map(
			(
				o,
			) => `<details><summary>${esc(o.title)} <span class="count">${o.blocks.reduce((n, b) => n + b.chars.length + (b.more ?? 0), 0).toLocaleString()}</span></summary>
<p class="note">${esc(o.note)}</p>
${o.blocks
	.map(
		(b) =>
			`<div class="tiles"><div class="tiles-head">${esc(b.name)} <span class="count">${b.chars.length + (b.more ?? 0)}</span> ${chartLink(b)}</div>${b.chars.map(tile).join('')}${b.more ? `<span class="note"> and ${b.more.toLocaleString()} more</span>` : ''}</div>`,
	)
	.join('\n')}
</details>`,
		)
		.join('\n');
	const emoji = data.emoji.length
		? `<details><summary>New emoji <span class="count">${data.emoji.length}</span></summary><div class="tiles">${data.emoji
				.map((e) => `<span class="tile" title="${esc(e.name)}">${esc(e.form)}</span>`)
				.join('')}</div></details>`
		: '';
	const reports = data.reports
		.map(
			(r) =>
				`<tr><td><a href="${esc(r.url)}" target="_blank" rel="noreferrer">${esc(r.tr)}-${esc(r.rev)}</a></td><td>${r.prior ? `was ${esc(r.prior)}` : ''}</td><td class="${r.status === 'reviewed' ? 'ok' : 'bad'}">${esc(r.status)}</td></tr>`,
		)
		.join('');
	const summary = data.summary
		.map(([k, n, note]) => `<tr><td>${esc(k)}</td><td class="num">${n.toLocaleString()}</td><td class="note">${esc(note ?? '')}</td></tr>`)
		.join('');

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Unicode ${esc(data.age)} Review</title>
<style>
:root {
	--bg: #fafaf9; --fg: #1c1917; --muted: #78716c; --line: #e7e5e4; --card: #fff;
	--accent: #2563eb; --accent-bg: #eff6ff; --warn: #b45309; --warn-bg: #fef3c7; --ok: #15803d; --bad: #b91c1c;
	--glyph-font: system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) {
	:root {
		--bg: #1c1917; --fg: #f5f5f4; --muted: #a8a29e; --line: #44403c; --card: #292524;
		--accent: #60a5fa; --accent-bg: #1e3a5f; --warn: #fbbf24; --warn-bg: #422006; --ok: #4ade80; --bad: #f87171;
	}
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); font: 14px/1.45 system-ui, sans-serif; }
main { max-width: 1200px; margin: 0 auto; padding: 0 16px 120px; }
h1 { font-size: 22px; margin: 24px 0 4px; }
h2 { font-size: 18px; margin: 32px 0 8px; }
h3 { font-size: 15px; margin: 24px 0 8px; display: flex; gap: 8px; align-items: center; }
a { color: var(--accent); }
code { font: 12px ui-monospace, monospace; }
.note { color: var(--muted); margin: 4px 0 12px; }
.count { color: var(--muted); font-weight: normal; font-size: 13px; }
table { border-collapse: collapse; margin: 8px 0; }
td { padding: 2px 12px 2px 0; vertical-align: top; }
td.num { text-align: right; font-variant-numeric: tabular-nums; }
.ok { color: var(--ok); } .bad { color: var(--bad); font-weight: 600; }
.top { display: flex; flex-wrap: wrap; gap: 32px; }
.bar { position: sticky; top: 0; z-index: 2; background: var(--bg); border-bottom: 1px solid var(--line); padding: 8px 0; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.bar button, .bar select { font: inherit; padding: 4px 10px; border: 1px solid var(--line); border-radius: 6px; background: var(--card); color: var(--fg); cursor: pointer; }
.bar button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 8px; }
.card { display: flex; gap: 12px; padding: 10px; background: var(--card); border: 1px solid var(--line); border-radius: 8px; cursor: pointer; min-width: 0; }
.card:has(.pick:checked) { border-color: var(--accent); background: var(--accent-bg); }
.pick { margin-top: 4px; flex: none; }
.glyphs { flex: none; width: 88px; text-align: center; }
.glyph { font: 48px/1.3 var(--glyph-font); }
.sample { font: 22px/1.3 var(--glyph-font); color: var(--muted); white-space: nowrap; overflow: hidden; }
.info { min-width: 0; flex: 1; }
.name { font-weight: 600; overflow-wrap: anywhere; }
.tags { margin: 4px 0; display: flex; flex-wrap: wrap; gap: 4px; }
.tag { font-size: 11px; padding: 1px 6px; border-radius: 4px; border: 1px solid var(--line); color: var(--muted); }
.tag.warn { color: var(--warn); background: var(--warn-bg); border-color: transparent; }
.tag.group { color: var(--fg); }
.row { font-size: 13px; margin-top: 2px; overflow-wrap: anywhere; }
.row b { color: var(--muted); font-weight: 500; margin-right: 4px; }
.look { font: 20px var(--glyph-font); padding: 0 4px; border-radius: 4px; }
.look.proto { outline: 1px dashed var(--muted); }
.look.valid { background: var(--warn-bg); color: var(--warn); }
.label { display: inline-block; margin: 0 4px 0 0; padding: 0 4px; border: 1px solid var(--line); border-radius: 4px; font-family: var(--glyph-font); }
details { margin: 12px 0; }
summary { cursor: pointer; font-weight: 600; font-size: 15px; }
.tiles { margin: 8px 0; }
.tiles-head { font-size: 13px; margin: 8px 0 4px; }
.tile { display: inline-block; min-width: 40px; text-align: center; font: 26px/1.5 var(--glyph-font); border: 1px solid var(--line); border-radius: 4px; margin: 0 4px 4px 0; background: var(--card); }
details.chart { margin: 0 0 8px; }
details.chart summary { font-size: 13px; font-weight: normal; color: var(--muted); }
details.chart object { display: block; width: 100%; height: 70vh; margin-top: 6px; border: 1px solid var(--line); border-radius: 6px; background: #fff; }
textarea { width: 100%; height: 200px; font: 12px ui-monospace, monospace; background: var(--card); color: var(--fg); border: 1px solid var(--line); border-radius: 6px; padding: 8px; }
#out { display: none; } #out.show { display: block; }
</style>
</head>
<body>
<main>
<h1>Unicode ${esc(data.age)} review</h1>
<p class="note">Unicode ${esc(data.version)}. Generated by <code>bun run review --html</code>. Tick the characters to allow, copy the lines into <code>REVIEWED</code> in <code>rules/disallow/unreviewed.ts</code>, then run <code>bun run derive</code>. Glyphs use your fonts, which rarely cover a new Unicode version yet: open <b>Code chart</b> above each block for the official glyphs.</p>
<div class="top">
<div><h2>Summary</h2><table>${summary}</table></div>
<div><h2>Reports</h2><table>${reports}</table></div>
</div>
<div class="bar">
<b><span id="n">0</span> / ${total + data.mappings.length} selected</b>
<button class="primary" id="copy">Copy lines</button>
<button id="toggle">Show lines</button>
<button id="clear">Clear</button>
<label>Font <select id="font">
<option value="system-ui, sans-serif">Sans</option>
<option value="ui-serif, serif">Serif</option>
<option value="ui-monospace, monospace">Mono</option>
</select></label>
<span class="note" id="msg"></span>
</div>
<div id="out"><textarea id="lines" readonly></textarea></div>
<h2>Pending review <span class="count">${total}</span></h2>
<p class="note">New in ${esc(data.age)}, in scripts that unrestricted groups use, and disallowed only because nobody has reviewed them. Unticked characters stay disallowed. <span class="look valid">x</span> marks a lookalike that is already valid.</p>
${pending || '<p>Nothing pending.</p>'}
${mappings}
<h2>Decided by other rules</h2>
${other}
${emoji}
</main>
<script>
const KEY = 'review-${esc(data.version)}';
const cards = [...document.querySelectorAll('.card')];
const store = {
	get() { try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { return new Set(); } },
	set(v) { try { localStorage.setItem(KEY, JSON.stringify([...v])); } catch {} },
};
const picked = store.get();
for (const c of cards) c.querySelector('.pick').checked = picked.has(c.dataset.hex);
function lines() {
	const out = [];
	let block;
	for (const c of cards) {
		if (!c.querySelector('.pick').checked) continue;
		if (c.dataset.block !== block) out.push('\\t// ' + (block = c.dataset.block));
		out.push('\\t' + c.dataset.line);
	}
	return out.join('\\n');
}
function update() {
	const v = new Set(cards.filter((c) => c.querySelector('.pick').checked).map((c) => c.dataset.hex));
	store.set(v);
	document.getElementById('n').textContent = v.size;
	document.getElementById('lines').value = lines();
	for (const s of document.querySelectorAll('section.block')) {
		const box = s.querySelector('.pick-block');
		if (!box) continue;
		const picks = [...s.querySelectorAll('.pick')];
		const n = picks.filter((p) => p.checked).length;
		box.checked = n === picks.length;
		box.indeterminate = n > 0 && n < picks.length;
	}
}
document.addEventListener('change', (e) => {
	const t = e.target;
	if (t.classList.contains('pick-block')) {
		for (const p of t.closest('section').querySelectorAll('.pick')) p.checked = t.checked;
	}
	if (t.classList.contains('pick') || t.classList.contains('pick-block')) update();
});
document.getElementById('font').addEventListener('change', (e) => document.documentElement.style.setProperty('--glyph-font', e.target.value));
document.getElementById('toggle').addEventListener('click', (e) => {
	const show = document.getElementById('out').classList.toggle('show');
	e.target.textContent = show ? 'Hide lines' : 'Show lines';
});
document.getElementById('clear').addEventListener('click', () => {
	for (const c of cards) c.querySelector('.pick').checked = false;
	update();
});
document.getElementById('copy').addEventListener('click', async () => {
	const msg = document.getElementById('msg');
	const text = lines();
	if (!text) { msg.textContent = 'Nothing selected.'; return; }
	try { await navigator.clipboard.writeText(text); msg.textContent = 'Copied.'; }
	catch { document.getElementById('out').classList.add('show'); document.getElementById('lines').select(); msg.textContent = 'Select and copy the text below.'; }
});
update();
</script>
</body>
</html>
`;
}
