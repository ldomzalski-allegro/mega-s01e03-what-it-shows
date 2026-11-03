> CLOSED / SUPERSEDED: This issue is no longer a separate delivery problem. All five listed ids are included in issue #1 by the supplied desk causeOf model, with a diagnostic footnote. Current active accounting is 379 parser + 33 hint = 412 unique reports. The historical investigation below does not add another group or assert an established cause.

## Scope

**5 unique reports**, previously merged into support ticket #4471 and included in the parser ticket. They are now excluded from issue #1 and counted only here. The bodies describe temporal anomalies rather than month/day swaps. This is a separate problem investigation, not a verified common root cause.

## Evidence: all five reports

### R-41202 — kettle.books, email, received 2026-04-02T10:41:00+02:00

> Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.

### R-41209 — alder.physio, app, received 2026-04-06T15:18:00+02:00

> Every booking in June is one day off. Only June. Why only June.

### R-41236 — nine.lanterns, app, received 2026-04-20T11:52:00+02:00

> The invite arrived before I made the booking. I would like to know how.

### R-41344 — pale.harbour, email, received 2026-06-12T09:58:00+01:00

> Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.

### R-41620 — lantern.row, email, received 2026-10-04T21:49:00+02:00

> Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.

## Why this is separate

The exported `causeOf` classifies by tenant locale, form and channel; it never reads the body. All five therefore land in its parser group, but a classifier assignment is not proof of a month/day bug. Neither a parser fix nor a format-hint fix is shown to resolve these symptoms.

The Lisbon/Toronto report suggests a timezone rendering hypothesis, but it does not establish the cause. The June-only shift and invite-before-booking report may have different explanations. Do not claim that daylight saving or timezone handling is proven, or that all five necessarily share one cause. Split this investigation further if reproduction establishes separate problems.

## Expected behavior

Dates displayed for each viewer must match the meeting's intended local date and timezone. Creation and delivery ordering must be explainable from event and invite timestamps.

## Investigation and acceptance criteria

- For each report, obtain intended calendar date, stored instant/date-only value, tenant timezone, viewer timezone, raw invite including TZID, booking creation time, and send/delivery timestamps.
- Reproduce one-day display shifts for the reported date and for viewers in Lisbon and Toronto, including midnight and relevant offset transitions.
- Check what “only June” means and whether any date-only value is being converted as an instant; these are hypotheses, not diagnoses.
- Investigate invite-before-booking independently, using event creation, retry and delivery logs. Do not explain it with month/day swaps without evidence.
- Establish the root cause(s), split tickets where warranted, then add targeted regression tests and a fix. No fix has been implemented or confirmed.

## Accounting and source

374 parser + 33 booking-v3 hint + 5 temporal anomalies = 412 unique reports from 427 exported rows. Evidence membership: `evidence/time-anomaly-report-ids.txt`. The explicit exception list comes from `src/lib/data/desk-notes.json`; revised triage logic is `src/lib/kb/problems.ts`. Run `npm run audit` to assert that the groups are disjoint and cover all reports.

Signed decision: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`; rendered page: `build/kb/decisions/0002-dedupe-by-cause.html`. Snapshot exported 4 October 2026; this is not the live queue.
