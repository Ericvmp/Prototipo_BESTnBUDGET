const { BLUEPRINTS_DATA } = require('../blueprintData');
const { itemTranslations } = require('../components/translationDictionary');

// Helper to translate names
const translate = (name) => {
    let base = name;
    let isBlueprint = false;
    if (name.toLowerCase().endsWith(' blueprint')) {
        isBlueprint = true;
        base = name.slice(0, -10).trim();
    }
    const getTranslation = (n) => {
        if (itemTranslations[n]?.name) return itemTranslations[n].name;
        const romanRegex = /^(.*?)\s+(I|II|III|IV|V)$/i;
        const match = n.match(romanRegex);
        if (match) {
            const baseW = match[1];
            const roman = match[2];
            if (itemTranslations[baseW]?.name) {
                return `${itemTranslations[baseW].name} ${roman.toUpperCase()}`;
            }
        }
        return n;
    };
    const trans = getTranslation(base);
    return isBlueprint ? `${trans} (Projeto)` : trans;
};

console.log("Blueprints Grid Layout (10 columns):");
console.log("====================================");

for (let i = 0; i < BLUEPRINTS_DATA.length; i++) {
    const row = Math.floor(i / 10) + 1;
    const col = (i % 10) + 1;
    const bp = BLUEPRINTS_DATA[i];
    const ptName = translate(bp.name);
    console.log(`Row ${row} Col ${col} (Index ${i}): ${bp.name} -> PT: ${ptName}`);
}
