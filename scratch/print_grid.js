import fs from 'fs';

// Read blueprintData.ts
const blueprintFile = fs.readFileSync('./blueprintData.ts', 'utf8');
const blueprints = [];
const bpRegex = /\{\s*id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*image:\s*[^}]*\}/g;
let match;
while ((match = bpRegex.exec(blueprintFile)) !== null) {
    blueprints.push({ id: match[1], name: match[2] });
}

// Read translationDictionary.ts to extract itemTranslations
const translationFile = fs.readFileSync('./components/translationDictionary.ts', 'utf8');
const translations = {};
const transRegex = /"([^"]+)"\s*:\s*\{\s*name\s*:\s*"([^"]+)"/g;
while ((match = transRegex.exec(translationFile)) !== null) {
    translations[match[1]] = match[2];
}

// Helper to translate names
const translate = (name) => {
    let base = name;
    let isBlueprint = false;
    if (name.toLowerCase().endsWith(' blueprint')) {
        isBlueprint = true;
        base = name.slice(0, -10).trim();
    }
    const getTranslation = (n) => {
        if (translations[n]) return translations[n];
        const romanRegex = /^(.*?)\s+(I|II|III|IV|V)$/i;
        const romanMatch = n.match(romanRegex);
        if (romanMatch) {
            const baseW = romanMatch[1];
            const roman = romanMatch[2];
            if (translations[baseW]) {
                return `${translations[baseW]} ${roman.toUpperCase()}`;
            }
        }
        return n;
    };
    const trans = getTranslation(base);
    return isBlueprint ? `${trans} (Projeto)` : trans;
};

console.log(`Loaded ${blueprints.length} blueprints.`);
console.log("Blueprints Grid Layout (10 columns):");
console.log("====================================");

for (let i = 0; i < blueprints.length; i++) {
    const row = Math.floor(i / 10) + 1;
    const col = (i % 10) + 1;
    const bp = blueprints[i];
    const ptName = translate(bp.name);
    console.log(`Row ${row} Col ${col} (Index ${i}): ${bp.name} -> PT: ${ptName}`);
}
