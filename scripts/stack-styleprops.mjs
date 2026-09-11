import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push(e.stack.slice(0, 900)));
await page.goto('https://xiaoye-react.zhangzhengyang.com/docs/styles/style-props', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(4000);
console.log(errs.join('\n---\n') || 'no pageerror');
await browser.close();
