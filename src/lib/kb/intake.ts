import { uniqueById, type Report } from './causes.ts';

// Delivery grouping requested by the human: preserve the original intake label.
// This does not call causeOf or treat an intake label as a verified diagnosis.
export function groupByIntakeTag(reports: Report[]) {
  const groups = new Map<string, Report[]>();
  for (const report of uniqueById(reports)) {
    const tag = report.meta.intakeTag || 'unlabelled';
    const group = groups.get(tag) ?? [];
    group.push(report);
    groups.set(tag, group);
  }
  return [...groups].map(([tag, reports]) => ({ tag, reports }));
}
