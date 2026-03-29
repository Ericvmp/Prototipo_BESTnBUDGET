import fs from 'fs';

function fixFiles() {
  // Fix data.ts
  let dataContent = fs.readFileSync('data.ts', 'utf8');

  // Fix known broken image URLs by reverting them to "Advanced"
  dataContent = dataContent.replace(/Advanc\._/g, 'Advanced_');
  dataContent = dataContent.replace(/Advanc\.-/g, 'advanced-');

  // Replace Advanc. with Adv globally for display names
  dataContent = dataContent.replace(/Advanc\. /g, 'Adv ');
  dataContent = dataContent.replace(/Advanc\./g, 'Adv');

  fs.writeFileSync('data.ts', dataContent);
  console.log('Fixed data.ts');

  // Fix utils.ts (for lowercase matching)
  let utilsContent = fs.readFileSync('utils.ts', 'utf8');
  utilsContent = utilsContent.replace(/advanc\. /g, 'adv ');
  fs.writeFileSync('utils.ts', utilsContent);
  console.log('Fixed utils.ts');
  
  // Fix PlannerScreen if any hardcoded Advanc. 
  let plannerContent = fs.readFileSync('components/PlannerScreen.tsx', 'utf8');
  if(plannerContent.includes('Advanc.')) {
     plannerContent = plannerContent.replace(/Advanc\./g, 'Adv');
     fs.writeFileSync('components/PlannerScreen.tsx', plannerContent);
     console.log('Fixed PlannerScreen.tsx');
  }
}

fixFiles();
