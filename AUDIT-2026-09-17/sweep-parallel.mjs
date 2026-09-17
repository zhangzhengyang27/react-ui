// 并行无头渲染巡检:单 context 共享 HTTP 缓存(同库 SPA chunk 全站复用),10 page workers
// 用法: node sweep-parallel.mjs <base> <pathsFile>
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const base = (process.argv[2] || 'https://xiaoye-react.zhangzhengyang.com').replace(/\/$/, '');
const paths = readFileSync(process.argv[3] || '/tmp/sweep-paths.txt', 'utf8').split('\n').filter(Boolean);
const CONCURRENCY = 10;
const bad = [];
let done = 0;

const browser = await chromium.launch();
const context = await browser.newContext();
const queue = [...paths];

async function worker(page, id) {
  while (queue.length) {
    const p = queue.shift();
    const errs = [];
    const onErr = e => errs.push(e.message.slice(0, 120));
    page.on('pageerror', onErr);
    try {
      await page.goto(`${base}/${p.replace(/^\/+/, '')}`, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(2000);
      const n = await page.evaluate(() => document.getElementById('root')?.children.length ?? -1);
      if (n === 0) bad.push({ p, rootChildren: n, errs: errs.slice(0, 2) });
    } catch (e) {
      bad.push({ p, error: String(e).slice(0, 120) });
    }
    page.off('pageerror', onErr);
    done++;
    if (done % 200 === 0) console.error(`progress ${done}/${paths.length}, bad=${bad.length}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, async (_, i) => {
  const page = await context.newPage();
  await worker(page, i);
}));
await browser.close();
console.log(bad.length ? `FAIL ${bad.length}/${paths.length}:\n` + JSON.stringify(bad, null, 1) : `全部 ${paths.length} 页渲染正常 ✓`);
