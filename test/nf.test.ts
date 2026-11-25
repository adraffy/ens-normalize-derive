import {expect, test} from 'bun:test';
import {createNF, nfDataFromUnicode} from '../src/nf.ts';
import {UnicodeSpec} from '../src/ucd.ts';

const unicode = UnicodeSpec.fromRelease('current');
const nf = createNF(nfDataFromUnicode(unicode));

test('NormalizationTest.txt', () => {
	expect(nf.runTests(unicode.readNFTests())).toEqual([]);
});

test('random round-trips', () => {
	nf.runRandomTests(1000);
});

test('hangul', () => {
	expect(nf.nfd([0xac01])).toEqual([0x1100, 0x1161, 0x11a8]);
	expect(nf.nfc([0x1100, 0x1161, 0x11a8])).toEqual([0xac01]);
});

test('innerParts', () => {
	// 1E09 (ḉ) = c + cedilla + acute, ç (E7) is an intermediate
	expect(nf.innerParts(0x1e09)).toContain(0xe7);
});
