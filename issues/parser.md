## Scope and counting basis

**379 unique reports** merged into support ticket #4471, assigned to `parser` by the supplied desk cause model. Deduplicate by id, look up tenant locale and form, then call causeOf with the report channel. Do not group by original intakeTag or subject.

## Problem and evidence

The shared parser reads month first for day-first tenants. R-41200, Harbour Dental, app: 7 April became 4 July. This group includes booking-v2 form reports and app/email reports, including those from booking-v3 tenants. The channel and tenant context, not form version alone, determine this cause.

## Proposed remedy and tests

Respect the tenant date convention or use an unambiguous representation. Test ambiguous pairs in both directions, invalid dates, affected app/email and booking-v2 paths and a month-first control. No service fix has been implemented.

## Diagnostic caveats

The five desk-noted descriptions (R-41202, R-41209, R-41236, R-41344, R-41620) are counted here and footnoted, following the supplied CauseTable and readAs logic. Their unusual descriptions need investigation; no independently verified timezone or third cause is asserted. Issue #3 is closed and contributes no additional count.

Of these reports, 356 carry intakeTag parser and 23 carry intakeTag hint. Those labels are retained for provenance, not used as ticket counts.

## Accounting and reproducibility

379 parser + 33 hint = 412 unique reports from 427 exported rows. Complete membership: evidence/parser-report-ids.txt. Run npm run audit to recompute from the unchanged source reports and tenant configurations. The earlier 371/41 delivery used intake labels and was rejected by the course: right problems, intake's numbers rather than the desk's view.

Signed source: src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx. Rendered page: build/kb/decisions/0002-dedupe-by-cause.html. Export snapshot: 4 October 2026, not a live feed.
