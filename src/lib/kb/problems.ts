// Historical, superseded grouping from the previous delivery. Not used by the current page or audit.
import { causeOf, uniqueById, type Report, type Tenant } from './causes.ts';

export type Problem = 'parser' | 'hint' | 'time-anomaly' | 'unplaced';

// This is an explicit triage exception, not a change to the exported cause model.
// The desk-noted reports do not establish a month/day swap or a common timezone
// cause. Keep their observed problem separate until engineering investigates it.
export function groupByProblem(
  reports: Report[],
  tenantOf: (report: Report) => Tenant | undefined,
  exceptionIds: readonly string[],
) {
  const exceptions = new Set(exceptionIds);
  const groups = new Map<Problem, Report[]>();
  for (const report of uniqueById(reports)) {
    const problem: Problem = exceptions.has(report.id)
      ? 'time-anomaly'
      : causeOf(report, tenantOf(report)) ?? 'unplaced';
    const group = groups.get(problem) ?? [];
    group.push(report);
    groups.set(problem, group);
  }
  return [...groups].map(([problem, reports]) => ({ problem, reports }));
}
