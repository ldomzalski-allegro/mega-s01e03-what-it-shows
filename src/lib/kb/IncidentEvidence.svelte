<script lang="ts">
 import reports from '#lib/data/reports-4471.json';
 import notes from '#lib/data/desk-notes.json';
 import {uniqueById, groupByCause, type Report} from '#lib/kb/causes';
 import {groupByProblem} from '#lib/kb/problems';
 import {tenantOf} from '#lib/kb/locales';
 const rows = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
 const groups = groupByCause(rows, tenantOf);
 const problems = groupByProblem(rows, tenantOf, notes.oneDayMove);
 const months = [...new Set(rows.map(r => r.receivedAt.slice(0,7)))].sort();
 const batch = rows.filter(r => r.mergedAt?.startsWith('2026-07-02'));
</script>
<h3>Separate tickets, counted once</h3>
<table>
 <thead><tr><th>Observed problem</th><th>Reports</th><th>Ticket</th></tr></thead>
 <tbody>{#each problems as p}
  <tr><td>{p.problem}</td><td>{p.reports.length}</td><td>
   {#if p.problem !== 'unplaced'}
    <a href={`https://github.com/ldomzalski-allegro/mega-s01e03-what-it-shows/issues/${p.problem === 'parser' ? 1 : p.problem === 'hint' ? 2 : 3}`}>#{p.problem === 'parser' ? 1 : p.problem === 'hint' ? 2 : 3}</a>
   {:else}Needs investigation{/if}
  </td></tr>
 {/each}</tbody>
</table>
<p>The five desk-noted temporal anomalies have been removed from the parser ticket. Their separate investigation does not assert a confirmed timezone cause or that all five share one root cause.</p>
<p>Export rows: {reports.length}. Unique reports in #4471: {rows.length}. Repeated export rows removed: {reports.length - rows.length}. Unplaced reports: {groups.find(g=>g.cause==='unplaced')?.reports.length ?? 0}.</p>
<table><thead><tr><th>Received month</th><th>Reports</th></tr></thead><tbody>{#each months as month}<tr><td>{month}</td><td>{rows.filter(r=>r.receivedAt.startsWith(month)).length}</td></tr>{/each}</tbody></table>
<p>{batch.length} reports were merged on 2 July 2026. This is a triage batch, not the start of the incident: receipt dates begin in April. The export ends on 4 October; it does not prove that reports stopped afterwards.</p>
<h3>The original classifier is evidence, not a verified diagnosis</h3>
<p>The intake tag is a browser-based guess. The exported <code>causeOf</code> uses tenant locale, form and channel, but never reads the body. Its counts below include the five anomalous reports in parser. They explain the original classification, not the revised ticket counts. Read conflicting evidence before merging.</p>
<table><thead><tr><th>Cause</th><th>Reports</th><th>Initially tagged parser</th><th>Initially tagged hint</th></tr></thead><tbody>{#each groups as g}<tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.taggedAs.parser ?? 0}</td><td>{g.taggedAs.hint ?? 0}</td></tr>{/each}</tbody></table>
