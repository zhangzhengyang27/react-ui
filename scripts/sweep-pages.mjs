import { chromium } from 'playwright';
const base = process.argv[2] || 'https://xiaoye-react.zhangzhengyang.com';
const paths = process.argv.slice(3);
const browser = await chromium.launch();
const bad = [];
for (const p of paths) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message.slice(0, 120)));
  try {
    await page.goto(base + p, { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(2200);
    const n = await page.evaluate(() => document.getElementById('root')?.children.length ?? -1);
    if (n === 0) bad.push({ p, rootChildren: n, errs: errs.slice(0, 2) });
  } catch (e) {
    bad.push({ p, error: String(e).slice(0, 120) });
  }
  await page.close();
}
await browser.close();
console.log(bad.length ? JSON.stringify(bad, null, 1) : `全部 ${paths.length} 页渲染正常 ✓`);
