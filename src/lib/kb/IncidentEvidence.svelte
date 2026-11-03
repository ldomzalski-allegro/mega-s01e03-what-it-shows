<script lang="ts">
 import reports from '#lib/data/reports-4471.json';
 import engineering from '#lib/data/engineering-update.json';
 import {uniqueById, groupByCause, type Report} from '#lib/kb/causes';
 import {tenantOf} from '#lib/kb/locales';
 const rows = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
 const groups = groupByCause(rows, tenantOf);
 const months = [...new Set(rows.map(r => r.receivedAt.slice(0,7)))].sort();
 const batch = rows.filter(r => r.mergedAt?.startsWith('2026-07-02'));
</script>
<h3>Current ticket membership: the desk's computed causes</h3>
<p>Deduplicate by report id, then use tenant locale, booking-form version and channel through the supplied <code>causeOf</code>. Original <code>meta.intakeTag</code> labels are kept for provenance, not used to count tickets.</p>
<table>
 <thead><tr><th>Desk cause</th><th>Unique reports</th><th>Ticket</th><th>Engineering outcome</th></tr></thead>
 <tbody>{#each groups as g}
  <tr><td>{g.cause}</td><td>{g.reports.length}</td><td>
   {#if g.cause === 'parser' || g.cause === 'hint'}
    <a href={`https://github.com/ldomzalski-allegro/mega-s01e03-what-it-shows/issues/${g.cause === 'parser' ? 1 : 2}`}>#{g.cause === 'parser' ? 1 : 2}</a>
   {:else}Needs investigation{/if}
  </td><td>{g.cause === 'parser' || g.cause === 'hint' ? engineering.outcomes[g.cause].status : 'Needs review'}</td></tr>
 {/each}</tbody>
</table>
<p>All five desk-noted descriptions are counted in parser and footnoted under it, as in the supplied desk view. Issue #3 is closed and contributes no additional reports.</p>
<p>The course engineering update closes #4471 on {engineering.closedOn}: parser is fixed; the hint is not fixed because booking-v3 was retired. Closing both reports does not mean both bugs were repaired.</p>
<p>Export rows: {reports.length}. Unique reports in #4471: {rows.length}. Repeated export rows removed: {reports.length - rows.length}. Unplaced reports: {groups.find(g=>g.cause==='unplaced')?.reports.length ?? 0}.</p>
<table><thead><tr><th>Received month</th><th>Reports</th></tr></thead><tbody>{#each months as month}<tr><td>{month}</td><td>{rows.filter(r=>r.receivedAt.startsWith(month)).length}</td></tr>{/each}</tbody></table>
<p>{batch.length} reports were merged on 2 July 2026. This is a triage batch, not the start of the incident: receipt dates begin in April. The export ends on 4 October; it does not prove that reports stopped afterwards.</p>
<h3>Why intake labels give different counts</h3>
<p>The intake tag is a browser-based guess. The exported <code>causeOf</code> uses tenant locale, form and channel, but never reads the body. The comparison below shows why original intake labels (371/41) differ from the computed cause groups (379/33). Fifteen parser-tagged reports compute to hint, and twenty-three hint-tagged reports compute to parser. Read conflicting evidence before merging.</p>
<table><thead><tr><th>Cause</th><th>Reports</th><th>Initially tagged parser</th><th>Initially tagged hint</th></tr></thead><tbody>{#each groups as g}<tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{g.taggedAs.parser ?? 0}</td><td>{g.taggedAs.hint ?? 0}</td></tr>{/each}</tbody></table>
