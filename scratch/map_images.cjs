
const fs = require('fs');

const materialsFiles = fs.readdirSync('public/images/materials');
const lootFiles = fs.readdirSync('public/images/loot');
const modsFiles = fs.readdirSync('public/images/mods');

const allFiles = {
    materials: materialsFiles,
    loot: lootFiles,
    mods: modsFiles
};

function findImage(name) {
    const cleanName = name.replace(/\s+/g, '_').toLowerCase();
    for (const [dir, files] of Object.entries(allFiles)) {
        const match = files.find(f => f.toLowerCase().startsWith(cleanName));
        if (match) return `/images/${dir}/${match}`;
    }
    return null;
}

let content = fs.readFileSync('data.ts', 'utf8');

// Update MATERIALS_DATA
content = content.replace(/name:\s*'([^']*)',[\s\S]*?imageUrl:\s*'([^']*)'/g, (match, name, url) => {
    const local = findImage(name);
    if (local) {
        return match.replace(url, local);
    }
    // If not found locally, keep as is (might be external)
    return match;
});

// Update LOOT_DATA materialImageUrl
content = content.replace(/material:\s*'([^']*)',[\s\S]*?materialImageUrl:\s*'([^']*)'/g, (match, name, url) => {
    const local = findImage(name);
    if (local) {
        return match.replace(url, local);
    }
    return match;
});

// Also check for sources
content = content.replace(/name:\s*'([^']*)',[\s\S]*?imageUrl:\s*'([^']*)'/g, (match, name, url) => {
    const local = findImage(name);
    if (local) {
        return match.replace(url, local);
    }
    return match;
});

fs.writeFileSync('data_final.ts', content);
console.log('Done mapping images.');
