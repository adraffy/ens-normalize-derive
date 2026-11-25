import type {Rule} from '../../src/select.ts';

// characters new in the current Unicode version that nobody has reviewed yet
//
// Common/Inherited characters join every group that includes Zyyy/Zinh (Latin, Han, Japanese, Korean,
// Cyrillic, Greek), so new symbols are disallowed until someone decides otherwise.
// Unreviewed characters can't break registrations: they weren't normalizable before.
//
// upgrade: bump `age`, keep whatever was reviewed and allowed in `except`
// review:  output/log.txt "Review: New in X" lists new characters that ended up valid
export default [
	{
		reason: 'new in 18.0: unreviewed Common/Inherited',
		age: '18.0',
		script: ['Zyyy', 'Zinh'],
	},
] satisfies Rule[];
