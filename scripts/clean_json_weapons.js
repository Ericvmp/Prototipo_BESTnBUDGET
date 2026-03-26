import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

// Strip JSON formatted builds that inject_data generated:
content = content.replace(/,"bestBuild":\[\]/g, '');
content = content.replace(/,"budgetBuild":\[\]/g, '');

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('Successfully stripped JSON formatted builds.');
