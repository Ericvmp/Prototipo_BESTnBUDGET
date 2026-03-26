import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

const bestRegex = /[ \t]*bestBuild:\s*\[[^\]]*\],?\s*\n?/g;
const budgetRegex = /[ \t]*budgetBuild:\s*\[[^\]]*\],?\s*\n?/g;

content = content.replace(bestRegex, '');
content = content.replace(budgetRegex, '');

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('Successfully stripped bestBuild and budgetBuild from data.ts');
