import fs from 'node:fs';
import path from 'node:path';

export type HourPoint = { hour: number; citations: number };
export type DayPoint = { day: string; avg_citations: number };
export type Violation = { violation_desc: string; expanded_label: string; citations: number };

// These checked-in aggregate extracts deliberately contain no quoted/multiline fields.
function readCsv(name: string, expectedColumns: string[]): Record<string,string>[] {
 const file = fs.readFileSync(path.join(process.cwd(), 'data', name), 'utf8').trim();
 const [head, ...lines] = file.split(/\r?\n/);
 const cols = head.split(',');
 if (cols.join(',') !== expectedColumns.join(',')) throw new Error(`Unexpected columns in ${name}`);
 return lines.map((line, index) => {
  const values = line.split(',');
  if (values.length !== cols.length || values.some(v => !v.trim() || v.includes('"'))) throw new Error(`Invalid row ${index + 2} in ${name}`);
  return Object.fromEntries(cols.map((col, i) => [col, values[i]]));
 });
}
function count(value: string): number {
 if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) throw new Error(`Invalid nonnegative integer: ${value}`);
 return Number(value);
}
export function getData() {
 const hourly: HourPoint[] = readCsv('hourly_2025.csv', ['hour','citations']).map(d=>({hour:count(d.hour),citations:count(d.citations)}));
 const weekday: DayPoint[] = readCsv('weekday_2025.csv', ['day','avg_citations']).map(d=>({day:d.day,avg_citations:count(d.avg_citations)}));
 const violations: Violation[] = readCsv('violations_2025.csv', ['violation_desc','expanded_label','citations']).map(d=>({violation_desc:d.violation_desc,expanded_label:d.expanded_label,citations:count(d.citations)}));
 if (hourly.length !== 24 || hourly.some((d,i)=>d.hour !== i)) throw new Error('Expected each hour from 0 through 23 exactly once');
 if (weekday.map(d=>d.day).join(',') !== 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday') throw new Error('Expected seven ordered weekdays');
 if (violations.length !== 10 || new Set(violations.map(d=>d.violation_desc)).size !== 10 || !violations.some(d=>d.violation_desc === 'STR CLEAN')) throw new Error('Invalid top ten categories');
 if (violations.some((d,i)=>i>0 && d.citations > violations[i-1].citations)) throw new Error('Categories must be ordered by count');
 const total=hourly.reduce((a,b)=>a+b.citations,0);
 const top10=violations.reduce((a,b)=>a+b.citations,0);
 if (!total || top10 > total) throw new Error('Invalid aggregate totals');
 return {hourly,weekday,violations,total,top10};
}
