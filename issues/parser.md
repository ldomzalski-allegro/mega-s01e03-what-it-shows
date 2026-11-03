## Scope

**379 unique reports** merged into support ticket #4471. Cause: `parser`. Seen 2026-04-01 through 2026-10-04; 11 tenants.

## Root cause

The shared parser reads dates month first for day-first tenants. App/email reports and booking-v2 form reports therefore swap month and day. booking-v3 tenants are also affected through app/email; do not select by tenant form alone.

Classification uses `uniqueById`, tenant locale and form, and report channel through `causeOf` in `src/lib/kb/causes.ts`. Intake tags are not verified causes: {'parser': 356, 'hint': 23}.

## Reproduction evidence

Report R-41200, tenant `harbour.dental`, channel `app`:

> Our 7 April reminder went out on 4 July. Is this a joke. It is not April Fools where we are.

## Expected

The date saved and shown matches the date the person intended in the tenant's convention. Hints and parsing agree.

## Proposed fix and verification

Make shared parsing tenant-locale-aware or use an unambiguous representation. Test 07/04 as 7 April for en-GB and 4 July for en-US, the inverse pair, invalid dates, and app/email paths. Verify all affected day-first tenants. Five one-day descriptions remain classified here; investigate them without assuming a separate timezone cause.

## Accounting and source

427 export rows reduce to 412 unique report ids: 379 parser + 33 hint. Each id belongs to one group. Full membership: `evidence/parser-report-ids.txt`. Snapshot exported 4 October 2026; counts are not live. Rendered decision: `build/kb/decisions/0002-dedupe-by-cause.html`; source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`. Run `npm run audit` to reproduce. No product fix has been implemented.
