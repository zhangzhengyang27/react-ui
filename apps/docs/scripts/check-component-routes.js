#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const http = require('http');

const COMPONENTS_ROOT = path.resolve(__dirname, '../components');
const HOST = 'localhost';
const PORT = process.env.DOCS_PORT || 8002;

function main() {
  const dirs = fs
    .readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(COMPONENTS_ROOT, e.name, 'index.zh-CN.md')))
    .map((e) => e.name);

  console.log(`Checking ${dirs.length} component routes...`);

  let checked = 0;
  let failed = [];

  const check = (dir) =>
    new Promise((resolve) => {
      const req = http.get(
        {
          hostname: HOST,
          port: PORT,
          path: `/components/${dir}`,
          headers: { Accept: 'text/html' },
        },
        (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          const notFound = res.statusCode === 404 || body.includes('Not Found');
          if (notFound) {
            failed.push({ dir, status: res.statusCode });
          }
          checked++;
          if (checked % 20 === 0) {
            console.log(`  ${checked}/${dirs.length} checked`);
          }
          resolve();
        });
      });
      req.on('error', (err) => {
        failed.push({ dir, error: err.message });
        checked++;
        resolve();
      });
      req.setTimeout(10000, () => {
        failed.push({ dir, error: 'timeout' });
        checked++;
        req.destroy();
        resolve();
      });
    });

  dirs.reduce((p, dir) => p.then(() => check(dir)), Promise.resolve()).then(() => {
    console.log(`\nDone. ${dirs.length - failed.length}/${dirs.length} routes OK.`);
    if (failed.length) {
      console.log(`Failed (${failed.length}):`);
      failed.forEach((f) => console.log('  -', f.dir, f.status || f.error));
      process.exit(1);
    }
  });
}

main();
