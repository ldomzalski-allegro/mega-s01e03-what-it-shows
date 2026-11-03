<script lang="ts">
 import reports from '#lib/data/reports-4471.json';
 import {uniqueById, groupByCause, type Report} from '#lib/kb/causes';
 import {tenantOf} from '#lib/kb/locales';
 const rows = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
 const groups = groupByCause(rows, tenantOf);
 const months = [...new Set(rows.map(r => r.receivedAt.slice(0,7)))].sort();
 const batch = rows.filter(r => r.mergedAt?.startsWith('2026-07-02'));
</script>
<p>Export rows: {reports.length}. Unique reports in #4471: {rows.length}. Repeated export rows removed: {reports.length - rows.length}. Unplaced reports: {groups.find(g=>g.cause==='unplaced')?.reports.length ?? 0}.</p>
<table><thead><tr><th>Received month</th><th>Reports</th></tr></thead><tbody>{#each months as month}<tr><td>{month}</td><td>{rows.filter(r=>r.receivedAt.startsWith(month)).length}</td></tr>{/each}</tbody></table>
<p>{batch.length} reports were merged on 2 July 2026. This is a triage batch, not the start of the incident: receipt dates begin in April. The export ends on 4 October; it does not prove that reports stopped afterwards.</p>
<h3>Intake tags are not root causes</h3>
<p>The intake tag is a browser-based guess. Use the tenant's locale and booking form with the channel, through <code>causeOf</code>. Do not group by subject or browser locale.</p>
<table><thead><tr><th>Cause</th><th>Reports</th><th>Initially tagged parser</th><th>Initially tagged hint</th></tr></thead><tbody>{#each groups as g}<tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.taggedAs.parser ?? 0}</td><td>{g.taggedAs.hint ?? 0}</td></tr>{/each}</tbody></table>
