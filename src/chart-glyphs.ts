// Reference glyphs cropped from the Unicode code charts (https://www.unicode.org/charts/), for review pages.
// Fonts rarely cover a new Unicode version, but every chart does.
//
// A chart's grid page prints each codepoint (eg. "10ED9", small type) under its cell, so a cell is the
// rectangle above its label, one column pitch wide and one row pitch tall. Pitches are measured from the
// labels on the page. CJK charts use a different layout (and may omit characters): no glyph for those.

import {readFileSync} from 'node:fs';
import {type CodePoint, hexCp} from './utils.ts';

// a cell when the page has a single column or row (measured on the standard 18.0 grid)
const DEFAULT_PITCH_X = 31.6;
const DEFAULT_PITCH_Y = 39.6;
const SCALE = 4; // 4x the PDF size: ~120px cells, sharp at 2x

interface TextItem {
	str: string;
	transform: number[];
	width: number;
	height: number;
}

/** cp => PNG data URI, for the cps that the chart shows */
export async function chartGlyphs(file: URL | string, cps: readonly CodePoint[]): Promise<Map<CodePoint, string>> {
	// pdf.js renders with @napi-rs/canvas (its optional dependency) outside the browser
	const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
	const doc = await pdfjs.getDocument({data: new Uint8Array(readFileSync(file)), verbosity: 0}).promise;
	const need = new Map(cps.map((cp) => [hexCp(cp).padStart(4, '0'), cp]));
	const glyphs = new Map<CodePoint, string>();
	try {
		for (let p = 1; p <= doc.numPages && need.size; p++) {
			const page = await doc.getPage(p);
			const items = (await page.getTextContent()).items as TextItem[];
			const labels = items.filter((x) => x.height < 9 && /^[0-9A-F]{4,6}$/.test(x.str));
			const found = labels.filter((x) => need.has(x.str));
			if (!found.length) continue;
			const px = pitch(labels.map((x) => x.transform[4]! + x.width / 2)) ?? DEFAULT_PITCH_X;
			const py = pitch(labels.map((x) => x.transform[5]!)) ?? DEFAULT_PITCH_Y;
			const viewport = page.getViewport({scale: SCALE});
			const {canvasFactory} = doc as unknown as {canvasFactory: CanvasFactory};
			const full = canvasFactory.create(viewport.width, viewport.height);
			await page.render({canvasContext: full.context, viewport} as never).promise;
			for (const x of found) {
				const cp = need.get(x.str)!;
				need.delete(x.str);
				const cx = x.transform[4]! + x.width / 2;
				const y = x.transform[5]!;
				// above the label, inside the cell borders
				const [x0, y0, x1, y1] = viewport.convertToViewportRectangle([cx - px / 2 + 1, y + x.height + 0.5, cx + px / 2 - 1, y + py - 2]);
				const left = Math.min(x0, x1);
				const top = Math.min(y0, y1);
				const w = Math.round(Math.abs(x1 - x0));
				const h = Math.round(Math.abs(y1 - y0));
				const cell = canvasFactory.create(w, h);
				cell.context.drawImage(full.canvas, left, top, w, h, 0, 0, w, h);
				glyphs.set(cp, `data:image/png;base64,${cell.canvas.toBuffer('image/png').toString('base64')}`);
			}
		}
	} finally {
		await doc.destroy();
	}
	return glyphs;
}

interface CanvasFactory {
	create(
		w: number,
		h: number,
	): {
		canvas: {toBuffer(type: 'image/png'): Buffer};
		context: {
			drawImage(src: unknown, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
		};
	};
}

/** smallest gap between distinct positions (undefined for a single position) */
function pitch(v: number[]): number | undefined {
	const u = [...new Set(v.map((x) => Math.round(x * 10) / 10))].sort((a, b) => a - b);
	const gaps = u
		.slice(1)
		.map((x, i) => x - u[i]!)
		.filter((d) => d > 3);
	return gaps.length ? Math.min(...gaps) : undefined;
}
