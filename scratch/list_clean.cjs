const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function listItems() {
  await esbuild.build({
    entryPoints: ['data.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'scratch/data_compiled.cjs',
    format: 'cjs',
    logLevel: 'silent',
  });

  const data = require(path.resolve('scratch/data_compiled.cjs'));

  let result = '### MODS\\n';
  data.MODS_DATA.forEach(item => result += `- ${item.name}\\n`);

  result += '\\n### MATERIALS\\n';
  data.MATERIALS_DATA.forEach(item => result += `- ${item.name}\\n`);

  result += '\\n### TACTICALS (THROWABLES_DATA)\\n';
  data.THROWABLES_DATA.forEach(item => result += `- ${item.name}\\n`);
  
  fs.writeFileSync('scratch/list_output.txt', result);
  console.log(result);
}

listItems().catch(console.error);
