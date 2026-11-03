# S01E03 delivery

Public repository: https://github.com/ldomzalski-allegro/mega-s01e03-what-it-shows

- Parser: issue #1, 374 unique reports.
- booking-v3 format hint: issue #2, 33 unique reports.
- Temporal anomalies requiring diagnosis: issue #3, 5 unique reports. This is a separate investigation, not a confirmed common root cause.
- Signed source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`
- Desk-facing rendered HTML: `build/kb/decisions/0002-dedupe-by-cause.html`
- Desk reference: DR-VTX9-Z9ZK, derived by the supplied RenderStamp component from the frontmatter signature.
- Reproduce: Node 24, `npm ci`, `npm run audit`, `npm run build`, `npm run preview`.
- Open `/kb/decisions/0002-dedupe-by-cause` in the preview server. HTML imports CSS and JS assets under `build/_app`; serve the whole build, not an isolated HTML file.

The supplied export files and accepted decision 0001 are preserved. Added: build scaffolding, computed evidence and explicit body-conflict triage components, signed decision 0002, report-id membership files, issue bodies, audit script and built pages. The original cause classifier still computes 379 parser / 33 hint; revised tickets remove the five desk-noted temporal anomalies from parser. 374 + 33 + 5 = 412 unique reports with no overlap. No application bug fix is claimed. No live support feed is included in the export. New reports require a new snapshot and a review.
