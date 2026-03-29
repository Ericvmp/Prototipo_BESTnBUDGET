const fs = require('fs');

try {
    const dataJson = JSON.parse(fs.readFileSync('audit_results.json', 'utf8'));
    let dataTs = fs.readFileSync('data.ts', 'utf8');

    function formatReqs(arr) {
        if (!arr || arr.length === 0) return '[]';
        const items = arr.map(a => {
            const ingInfo = dataJson[a.name];
            const sz = ingInfo && ingInfo.stackSize ? ingInfo.stackSize : 1;
            return `{ name: '${a.name.replace(/'/g, "\\'")}', stackSize: ${sz}, quantity: ${a.quantity} }`;
        });
        return `[ ${items.join(', ')} ]`;
    }

    function formatWeaponTiers(arr) {
        if (!arr || arr.length === 0) return '[]';
        const items = arr.map(a => {
            const ingInfo = dataJson[a.name];
            const sz = ingInfo && ingInfo.stackSize ? ingInfo.stackSize : 1;
            return `{ name: '${a.name.replace(/'/g, "\\'")}', stackSize: ${sz}, quantity: ${a.quantity} }`;
        });
        return `[ { tier: '1', materials: [ ${items.join(', ')} ] } ]`;
    }

    function replaceArrayField(text, fieldName, newStr) {
        let regex = new RegExp(fieldName + ':\\s*');
        let match = regex.exec(text);
        if (!match) return { text, replaced: false };
        
        let startIdx = match.index + match[0].length;
        
        if (text.substring(startIdx, startIdx + 9) === 'undefined') {
            let nextComma = text.indexOf(',', startIdx);
            return { text: text.substring(0, match.index) + fieldName + ': ' + newStr + (nextComma !== -1 ? text.substring(nextComma) : text.substring(startIdx + 9)), replaced: true };
        }
        
        let openIdx = text.indexOf('[', startIdx);
        if (openIdx !== -1 && !text.substring(startIdx, openIdx).includes('}')) {
            let count = 0;
            let endIdx = -1;
            for (let i = openIdx; i < text.length; i++) {
                if (text[i] === '[') count++;
                else if (text[i] === ']') {
                    count--;
                    if (count === 0) {
                        endIdx = i;
                        break;
                    }
                }
            }
            if (endIdx !== -1) {
                let postEnd = endIdx + 1;
                while (postEnd < text.length && /\\s/.test(text[postEnd])) postEnd++;
                if (text[postEnd] === ',') postEnd++;
                return { text: text.substring(0, match.index) + fieldName + ': ' + newStr + ',' + text.substring(postEnd), replaced: true };
            }
        }
        return { text, replaced: false };
    }

    let modifiedCount = 0;

    for (const [name, info] of Object.entries(dataJson)) {
        const regexStr = `(id:\\s*['"][a-zA-Z0-9_\\-]+['"],\\s*name:\\s*['"]${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"],)`;
        const blockRegex = new RegExp(regexStr);
        const match = blockRegex.exec(dataTs);
        
        if (!match) continue; 
        
        let startIndex = match.index;
        let nextIdMatch = dataTs.substring(startIndex + match[0].length).match(/((?:id:\s*['"])|(?:export const)|(?:\];))/);
        let endIndex = nextIdMatch ? startIndex + match[0].length + nextIdMatch.index : dataTs.length;
        
        let block = dataTs.substring(startIndex, endIndex);
        const isWeaponBlock = block.includes('upgradeInfo:') || block.includes('repairInfo:');
        
        // Stack Size Update
        if (info.stackSize >= 1) {
            if (!block.includes('stackSize:')) {
                block = block.replace(/name:.*\n?/, `$& stackSize: ${info.stackSize},`);
            }
        }

        // Recycle Info Update
        if (info.recycling && info.recycling.length >= 0) {
            let replacerRecycleStr = isWeaponBlock ? formatWeaponTiers(info.recycling) : formatReqs(info.recycling);
            let res = replaceArrayField(block, 'recycleInfo', replacerRecycleStr);
            if (res.replaced) {
                block = res.text;
            } else {
                block = block.replace(/name:.*\n?/, `$& recycleInfo: ${replacerRecycleStr},`);
            }
        }

        // Salvage Info Update
        if (info.salvaging && info.salvaging.length >= 0) {
            let replacerSalvageStr = formatReqs(info.salvaging);
            if (!isWeaponBlock) {
                let res = replaceArrayField(block, 'salvageInfo', replacerSalvageStr);
                if (res.replaced) {
                    block = res.text;
                } else {
                    block = block.replace(/name:.*\n?/, `$& salvageInfo: ${replacerSalvageStr},`);
                }
            }
        }

        // Crafting Info Update
        if (info.crafting && info.crafting.length >= 0) {
            let replacerCraftStr = formatReqs(info.crafting);
            let res = replaceArrayField(block, 'requirements', replacerCraftStr);
            if (res.replaced) {
                block = res.text;
            }
        }

        dataTs = dataTs.substring(0, startIndex) + block + dataTs.substring(endIndex);
        modifiedCount++;
    }

    fs.writeFileSync('data.ts', dataTs, 'utf8');
    console.log(`Successfully updated recipes and requirements for ${modifiedCount} items using AST-like parser in data.ts!`);
} catch(e) {
    console.error("Error executing patch script:", e);
}
