const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const failed = [];
  page.on('response', (r) => { if (r.status() >= 400) failed.push({ status: r.status(), url: r.url() }); });
  await page.goto('http://localhost:8004/components/avatar', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  const textLen = await page.evaluate(() => document.querySelector('article')?.innerText.length || 0);
  const hasDemo = await page.$('.code-box-demo').then((el) => !!el).catch(() => false);
  console.log({ textLen, hasDemo, failed });
  await browser.close();
})();
