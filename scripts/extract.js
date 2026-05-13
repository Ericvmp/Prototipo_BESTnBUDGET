import fs from 'fs';

const html = fs.readFileSync('arctracker2.html', 'utf8');
const nextData = html.match(/self\.__next_f\.push\((.*?)\)/g);

let fullText = '';
if (nextData) {
  for (const entry of nextData) {
    try {
      // entry is self.__next_f.push([1, "something"])
      const arrayStr = entry.substring('self.__next_f.push('.length, entry.length - 1);
      const parsed = JSON.parse(arrayStr);
      if (typeof parsed[1] === 'string') {
        fullText += parsed[1];
      }
    } catch (e) {}
  }
}

fs.writeFileSync('arctracker_extracted.txt', fullText);
console.log('Extracted to arctracker_extracted.txt');
