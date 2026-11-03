## Scope and counting basis

**33 unique reports** merged into support ticket #4471, assigned to `hint` by the supplied desk cause model. Deduplicate by id, look up tenant locale and form, then call causeOf with the report channel. Do not group by original intakeTag or subject.

## Problem and evidence

booking-v3 shows MM/DD/YYYY to day-first tenants while its form interprets input in the tenant convention. Following the instruction can swap the intended date. R-41230, Copper Studio, form, reports 1 June instead of 6 January. The affected form tenants are Alder Physio, Copper Studio and Pale Harbour. App/email reports from these same tenants do not belong to this hint cause.

## Proposed remedy and tests

Generate the format hint and input convention from the same locale. Verify intended and saved dates in the booking-v3 form; use booking-v2 and app/email controls. A shared-parser fix alone does not fix a misleading form instruction. No service fix has been implemented.

## Provenance

Of these reports, 18 carry intakeTag hint and 15 carry intakeTag parser. Those labels are retained for provenance, not used as ticket counts.

## Accounting and reproducibility

379 parser + 33 hint = 412 unique reports from 427 exported rows. Complete membership: evidence/hint-report-ids.txt. Run npm run audit to recompute from the unchanged source reports and tenant configurations. The earlier 371/41 delivery used intake labels and was rejected by the course: right problems, intake's numbers rather than the desk's view.

Signed source: src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx. Rendered page: build/kb/decisions/0002-dedupe-by-cause.html. Export snapshot: 4 October 2026, not a live feed.
