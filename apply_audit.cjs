const fs = require('fs');

const typesPath = 'types.ts';
let typesContent = fs.readFileSync(typesPath, 'utf8');

const interfaces = ['Material', 'Weapon', 'Modification', 'Throwable', 'Augment', 'LootCategory'];
interfaces.forEach(iface => {
    // Find the end of the interface, } and insert stackSize?: number;\n}
    const regex = new RegExp(`export interface ${iface} {(.*?)\\n}`, 's');
    const parts = typesContent.split(`export interface ${iface} {`);
    if(parts.length > 1) {
       for(let i=1; i<parts.length; i++) {
           if(parts[i-1].trim().endsWith('export interface') || parts[i-1].match(/export interface/)) {
               continue;
           }
           let inner = parts[i];
           let closeIndex = inner.indexOf('}');
           if(closeIndex !== -1 && !inner.substring(0, closeIndex).includes('stackSize?: number;')) {
               let before = inner.substring(0, closeIndex);
               let after = inner.substring(closeIndex);
               parts[i] = before + '  stackSize?: number;\n' + after;
           }
       }
       typesContent = parts.join(`export interface ${iface} {`);
    }
});

// For weapons, they are WeaponTierInfo[], so recycleInfo etc. are there.
fs.writeFileSync(typesPath, typesContent);


const dataPath = 'data.ts';
let data = fs.readFileSync(dataPath, 'utf8');
const results = JSON.parse(fs.readFileSync('audit_results.json', 'utf8'));

for (const [name, info] of Object.entries(results)) {
    if (!info.stackSize) info.stackSize = 1;

    // We look for name: 'NAME', name: "NAME"
    const regexStr = `name:\\s*['"]${name.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}['"],`;
    const regex = new RegExp(regexStr, 'g');
    
    data = data.replace(regex, (match) => {
        return `${match} stackSize: ${info.stackSize},`;
    });
}

fs.writeFileSync(dataPath, data);
console.log('Successfully added stackSize to data.ts and types.ts');
