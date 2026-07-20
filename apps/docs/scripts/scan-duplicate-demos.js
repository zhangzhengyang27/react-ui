// Scan all index.zh-CN.md for duplicate <code src> references
const fs = require('node:fs');
const path = require('node:path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components');

const components = fs.readdirSync(COMPONENTS_DIR).filter((name) => {
  return fs.statSync(path.join(COMPONENTS_DIR, name)).isDirectory();
});

const duplicates = [];

components.forEach((name) => {
  const indexFile = path.join(COMPONENTS_DIR, name, 'index.zh-CN.md');
  if (!fs.existsSync(indexFile)) return;

  const content = fs.readFileSync(indexFile, 'utf-8');
  const lines = content.split('\n');

  const seen = new Map(); // demoSrc -> lineNumbers
  lines.forEach((line, idx) => {
    const match = line.match(/<code\s+src="([^"]+)"/);
    if (match) {
      const src = match[1];
      if (!seen.has(src)) {
        seen.set(src, []);
      }
      seen.get(src).push(idx + 1);
    }
  });

  seen.forEach((lineNumbers, src) => {
    if (lineNumbers.length > 1) {
      duplicates.push({
        component: name,
        src,
        lines: lineNumbers,
      });
    }
  });
});

console.log(`Found ${duplicates.length} duplicate demo references:\n`);
duplicates.forEach((d) => {
  console.log(`  ${d.component}: ${d.src} (lines: ${d.lines.join(', ')})`);
});
