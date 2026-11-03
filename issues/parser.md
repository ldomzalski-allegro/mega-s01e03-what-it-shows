## Scope and counting basis

**371 unique reports** originally labelled `parser` in `meta.intakeTag`, all merged into support ticket #4471. Membership is based only on the original intake label after deduplication by id. It is not the result of `causeOf` and is not a claim that every report has a reproduced common cause.

## Problem represented by this label

The shared parser described in the export reads dates month first for day-first tenants. R-41200 reports 7 April becoming 4 July. Proposed remedy: align parsing with the tenant convention or use an unambiguous representation; test ambiguous dates, invalid dates and the affected entry paths.

## Classification caveats

The original parser label appears on 356 reports computed as parser and 15 computed as hint by the supplied causeOf model. All five desk-noted atypical descriptions are included here; issue #3 is closed and does not contribute another count. Their descriptions are not proof of a shared timezone or invite-order cause. Investigate them without silently removing or double-counting them.

## Evidence and acceptance

Complete membership and source bodies are in `src/lib/data/reports-4471.json`; the 371 deduplicated ids for this ticket are in `evidence/parser-report-ids.txt`. Run `npm run audit` to reproduce the grouping. Before claiming a fix, reproduce the relevant mechanism, resolve classification discrepancies and verify intended versus stored dates. No product fix has been implemented.

## Accounting and KB page

371 parser-tagged + 41 hint-tagged = 412 unique reports from 427 exported rows. The original source labels are unchanged. Computed-cause counts 379/33 are shown separately for comparison, not used for current issue membership. This replaces the previous 374/33/5 publication.

Signed source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`. Rendered page: `build/kb/decisions/0002-dedupe-by-cause.html`. Export date: 4 October 2026, not a live queue.
