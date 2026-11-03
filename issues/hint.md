## Scope and counting basis

**41 unique reports** originally labelled `hint` in `meta.intakeTag`, all merged into support ticket #4471. Membership is based only on the original intake label after deduplication by id. It is not the result of `causeOf` and is not a claim that every report has a reproduced common cause.

## Problem represented by this label

The export describes a date-format hint bug: booking-v3 prints MM/DD/YYYY for day-first tenants while the form reads input in the tenant convention. Proposed remedy: align the hint, accepted input format and saved date. Verify with booking-v3 form reproductions and controls for other entry paths.

## Classification caveats

The original hint label appears on 18 reports computed as hint and 23 computed as parser by the supplied causeOf model. Therefore this intake bucket is not restricted to booking-v3 form reports; do not claim that every member has a reproduced form-hint cause. Verify tenant, channel and configuration before fixing or reclassifying a report.

## Evidence and acceptance

Complete membership and source bodies are in `src/lib/data/reports-4471.json`; the 41 deduplicated ids for this ticket are in `evidence/hint-report-ids.txt`. Run `npm run audit` to reproduce the grouping. Before claiming a fix, reproduce the relevant mechanism, resolve classification discrepancies and verify intended versus stored dates. No product fix has been implemented.

## Accounting and KB page

371 parser-tagged + 41 hint-tagged = 412 unique reports from 427 exported rows. The original source labels are unchanged. Computed-cause counts 379/33 are shown separately for comparison, not used for current issue membership. This replaces the previous 374/33/5 publication.

Signed source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`. Rendered page: `build/kb/decisions/0002-dedupe-by-cause.html`. Export date: 4 October 2026, not a live queue.
