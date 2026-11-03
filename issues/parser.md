## Scope

**374 unique reports** merged into support ticket #4471. Cause: `parser`. Seen 2026-04-01 through 2026-10-04; 11 tenants.

## Root cause

The shared parser reads dates month first for day-first tenants. App/email reports and booking-v2 form reports therefore swap month and day. booking-v3 tenants are also affected through app/email; do not select by tenant form alone.

Classification uses `uniqueById`, tenant locale and form, and report channel through `causeOf` in `src/lib/kb/causes.ts`. Intake tags are not verified causes. Of these 374 reports, 351 were tagged parser and 23 hint. The exported classifier's 379 parser reports included five desk-noted temporal anomalies; those five are explicitly excluded from this ticket because their bodies do not establish month/day swaps. See issue #3.

## Reproduction evidence

Report R-41200, tenant `harbour.dental`, channel `app`:

> Our 7 April reminder went out on 4 July. Is this a joke. It is not April Fools where we are.

## Expected

The date saved and shown matches the date the person intended in the tenant's convention. Hints and parsing agree.

## Proposed fix and verification

Make shared parsing tenant-locale-aware or use an unambiguous representation. Test 07/04 as 7 April for en-GB and 4 July for en-US, the inverse pair, invalid dates, and app/email paths. Verify all affected day-first tenants. This ticket covers month/day swaps only, not the five temporal anomalies. Do not include those five when verifying coverage of this fix.

## Accounting and source

427 export rows reduce to 412 unique report ids: 374 parser + 33 hint + 5 temporal anomalies. The five anomalies are tracked separately in issue #3, without asserting a shared root cause. Each id belongs to one group. Full membership: `evidence/parser-report-ids.txt`. Snapshot exported 4 October 2026; counts are not live. Rendered decision: `build/kb/decisions/0002-dedupe-by-cause.html`; source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`. Run `npm run audit` to reproduce. No product fix has been implemented.
