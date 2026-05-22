const fs = require('fs');
const ts = require('typescript');

const filesToTranspile = [
  { src: 'data.ts', dest: 'scratch/data.cjs' },
  { src: 'blueprintData.ts', dest: 'scratch/blueprintData.cjs' },
  { src: 'components/translationDictionary.ts', dest: 'scratch/translationDictionary.cjs' }
];

filesToTranspile.forEach(file => {
  const tsContent = fs.readFileSync(file.src, 'utf8');
  const jsContent = ts.transpileModule(tsContent, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  }).outputText;
  fs.writeFileSync(file.dest, jsContent);
  console.log(`Transpiled ${file.src} to ${file.dest} successfully.`);
});
