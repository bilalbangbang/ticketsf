// Read-only comparison: never silently overwrite a published historical snapshot.
import fs from 'node:fs';
let failed=false;
for(const kind of ['hourly','daily','violations']){
 const saved=JSON.parse(fs.readFileSync(`data/provenance/source-${kind}.json`,'utf8'));
 const response=await fetch(saved.url,{signal:AbortSignal.timeout(90000)});
 if(!response.ok)throw new Error(`${kind}: HTTP ${response.status}`);
 const current=await response.json();
 const matches=JSON.stringify(current)===JSON.stringify(saved.data);
 console.log(`${kind}: ${matches?'matches saved snapshot':'SOURCE CHANGED: review before updating'}`);
 failed ||= !matches;
}
if(failed)process.exitCode=1;
