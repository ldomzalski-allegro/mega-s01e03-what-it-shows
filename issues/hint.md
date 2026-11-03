## Scope

**33 unique reports** merged into support ticket #4471. Cause: `hint`. Seen 2026-04-17 through 2026-09-22; 3 tenants.

## Root cause

booking-v3 displays MM/DD/YYYY while its form reads the date using the day-first tenant convention. Following the hint gives a swapped date. This affects the form channel at Alder Physio, Copper Studio and Pale Harbour and needs a separate fix from the shared parser.

Classification uses `uniqueById`, tenant locale and form, and report channel through `causeOf` in `src/lib/kb/causes.ts`. Intake tags are not verified causes: {'parser': 15, 'hint': 18}.

## Reproduction evidence

Report R-41230, tenant `copper.studio`, channel `form`:

> My client came on 1 June instead of 6 January. We sorted it out.

## Expected

The date saved and shown matches the date the person intended in the tenant's convention. Hints and parsing agree.

## Proposed fix and verification

Derive the hint from the same locale convention used by the form. Test ambiguous dates in booking-v3 for de-DE, es-ES and pt-PT; verify saved dates, not just text. Control: booking-v2 and app/email do not belong to this hint issue. Fixing the shared parser alone is not sufficient.

## Accounting and source

427 export rows reduce to 412 unique report ids: 379 parser + 33 hint. Each id belongs to one group. Full membership: `evidence/hint-report-ids.txt`. Snapshot exported 4 October 2026; counts are not live. Rendered decision: `build/kb/decisions/0002-dedupe-by-cause.html`; source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`. Run `npm run audit` to reproduce. No product fix has been implemented.
