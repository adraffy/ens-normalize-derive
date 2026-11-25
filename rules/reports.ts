// Unicode reports whose *text* defines behavior this spec relies on, and the revision that was
// last read for changes. Derive warns (and `bun run review` links the Modifications section)
// when the downloaded data corresponds to a newer revision.
//
// 20261125: reviewed for Unicode 18.0.0
//   tr15 58: reissued, no changes
//   tr24 41: explanatory changes only
//   tr31 45: Jurchen, Proto-Cuneiform, Seal added to Excluded (rules/scripts.ts)
//   tr39 34: augmented script set adds Hntl (Hani/Latn), src/ucd.ts updated (not used by derive);
//            "nonspacing mark" = Mn + Me (as derive already does); joining-control context (n/a: ZWJ/ZWNJ disallowed)
//   tr46 36: reissued, no changes
//   tr51 31: revised presentation-selector guidance (n/a: emoji are normalized without FE0F)
export const REVIEWED_REPORTS: Record<string, number> = {
	tr15: 58, // UAX-15 Normalization Forms
	tr24: 41, // UAX-24 Script Property
	tr31: 45, // UAX-31 Identifiers (Recommended / Limited Use / Excluded scripts)
	tr39: 34, // UTS-39 Security Mechanisms (augmented script sets, optional detection)
	tr46: 36, // UTS-46 IDNA Compatibility Processing
	tr51: 31, // UTS-51 Emoji
};
