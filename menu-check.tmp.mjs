import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', e => errs.push(e.message.slice(0, 100)));
await page.goto('http://localhost:8007/colors-generator', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
await page.waitForTimeout(4000);
const r = await page.evaluate(() => ({
  len: document.body.innerHTML.length,
  cgItems: [...document.querySelectorAll('[class*="menuItem"]')].filter(e => e.textContent.trim() === 'Colors Generator').length,
}));
console.log('COLORS_GEN:', JSON.stringify(r), errs.length ? 'ERR:' + errs[0].slice(0, 90) : '');
await page.screenshot({ path: '/tmp/colors-gen-fixed.png' });
await browser.close();
