import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getData } from '../lib/data.ts';
const data = getData();
const source = kind => JSON.parse(fs.readFileSync(`data/provenance/source-${kind}.json`, 'utf8')).data;
test('every hourly CSV value matches the saved DataSF response', () => {
 assert.deepEqual(data.hourly, source('hourly').map(d=>({hour:Number(d.hour),citations:Number(d.citations)})));
});
test('all top-ten codes and counts match the API, including the corrected meter row', () => {
 assert.deepEqual(data.violations.map(({violation_desc,citations})=>({violation_desc,citations})), source('violations').map(d=>({violation_desc:d.violation_desc,citations:Number(d.citations)})));
 assert.equal(data.top10, 1086034);
});
test('daily totals and all calendar-day averages reconcile', () => {
 const rows = source('daily');
 const daily = new Map(rows.map(d=>[d.day.slice(0,10),Number(d.citations)]));
 assert.equal(daily.size, rows.length);
 assert.equal(rows.reduce((s,d)=>s+Number(d.citations),0),data.total);
 const totals=Array(7).fill(0),counts=Array(7).fill(0);
 for(let date=new Date('2025-01-01T00:00:00Z');date.getUTCFullYear()===2025;date.setUTCDate(date.getUTCDate()+1)){
  const day=(date.getUTCDay()+6)%7;
  totals[day]+=daily.get(date.toISOString().slice(0,10))??0;counts[day]++;
 }
 assert.deepEqual(counts,[52,52,53,52,52,52,52]);
 assert.deepEqual(data.weekday.map(d=>d.avg_citations),totals.map((n,i)=>Math.round(n/counts[i])));
 assert.equal(data.total,1358015);
});
test('snapshot-derived headline figures agree', () => {
 assert.equal(data.hourly.reduce((a,b)=>a.citations>b.citations?a:b).hour,12);
 assert.equal(data.weekday.reduce((a,b)=>a.avg_citations>b.avg_citations?a:b).day,'Tuesday');
 assert.equal((data.violations.find(d=>d.violation_desc==='STR CLEAN').citations/data.total*100).toFixed(1),'39.1');
});
