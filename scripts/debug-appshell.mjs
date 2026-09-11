import { chromium } from 'playwright';
const url = process.argv[2] || 'https://xiaoye-react.zhangzhengyang.com/components/app-shell';
const browser = await chromium.launch();
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push(('pageerror: ' + e.stack).slice(0, 600)));
page.on('console', m => { if (m.type() === 'error') errs.push(('console: ' + m.text()).slice(0, 400)); });
page.on('requestfailed', r => errs.push(('reqfail: ' + r.url().slice(-90) + ' ' + (r.failure()?.errorText || '')).slice(0, 300)));
page.on('response', r => { if (r.status() >= 400) errs.push(('http' + r.status() + ': ' + r.url().slice(-90)).slice(0, 300)); });
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(6000);
const info = await page.evaluate(() => ({
  rootChildren: document.getElementById('root')?.children.length,
  bodyLen: document.body.innerText.length,
  title: document.title,
}));
console.log(JSON.stringify({ url, info, errs: errs.slice(0, 10) }, null, 1));
await browser.close();
