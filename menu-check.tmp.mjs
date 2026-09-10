import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:8003/colors-generator', { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('NAV:', e.message.slice(0, 60)));
await page.waitForFunction(() => document.body.innerHTML.length > 5000, null, { timeout: 60000, polling: 1000 }).catch(() => {});
await page.waitForTimeout(2000);
const r = await page.evaluate(() => {
  const selects = document.querySelectorAll('select').length;
  const menus = document.querySelectorAll('[role="menu"], [class*="Menu"]').length;
  // 找完全相同的兄弟区块
  const texts = [...document.querySelectorAll('h1,h2,h3,h4')].map(h => h.textContent.trim());
  const dup = texts.filter((t, i) => texts.indexOf(t) !== i);
  return { len: document.body.innerHTML.length, selects, menus, headings: texts.slice(0, 12), dup };
});
console.log('PAGE:', JSON.stringify(r, null, 1));
await page.screenshot({ path: '/tmp/colors-gen.png', fullPage: false });
await browser.close();
