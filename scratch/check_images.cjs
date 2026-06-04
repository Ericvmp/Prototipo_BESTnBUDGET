const fs = require('fs');
const path = require('path');

const dir = path.join('public', 'images', 'items');
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  console.log("=== Matches in public/images/items ===");
  files.forEach(f => {
    if (f.toLowerCase().includes('smoke') || f.toLowerCase().includes('barrel')) {
      console.log(f);
    }
  });
} else {
  console.log("Directory public/images/items does not exist");
}
