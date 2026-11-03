# S01E03 delivery — original intakeTag grouping

Public repository: https://github.com/ldomzalski-allegro/mega-s01e03-what-it-shows

- Issue #1: 371 unique reports originally tagged parser.
- Issue #2: 41 unique reports originally tagged hint.
- Issue #3: closed, superseded investigation; its five ids already belong to #1.
- Current membership is original meta.intakeTag only, deduplicated by id. No source labels were changed.
- The supplied causeOf model independently gives 379 parser / 33 hint. This discrepancy is disclosed on the page; original intake labels are not presented as verified diagnoses.
- Source: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`
- Rendered page: `build/kb/decisions/0002-dedupe-by-cause.html`
- Desk reference: DR-VTX9-Z9ZK, generated from the frontmatter signature by RenderStamp.
- Reproduce with Node 24: `npm ci`, `npm run audit`, `npm run build`, `npm run preview`.
- Serve the entire build with its assets and open `/kb/decisions/0002-dedupe-by-cause`.

All original export files are preserved. The prior three-bucket helper and investigation list are retained as historical, superseded material only; the active page and audit use groupByIntakeTag. No service bug fix or independent reproduction of every report is claimed. Counts reflect the 4 October 2026 snapshot, not a live feed.
