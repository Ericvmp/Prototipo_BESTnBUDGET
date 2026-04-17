const fs = require('fs');

let content = fs.readFileSync('data.ts', 'utf8');

// The erroneous injection happened — we need to find and remove the orphaned entry
// The new weapons were inserted before the closing bracket of salvageInfo, 
// so we see:   ] (end of repairInfo)  \n  //Comment \n  { w-canto ... }
// Fix: find the badly inserted section and remove it then re-insert correctly

// First, validate the current structure by checking if ]; for WEAPONS_DATA is present
const throwablesIdx = content.indexOf('export const THROWABLES_DATA');
const weaponsEnd = content.lastIndexOf('];', throwablesIdx);

console.log('weapons end idx', weaponsEnd, 'context:', content.slice(weaponsEnd-50, weaponsEnd+5));
