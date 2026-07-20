const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8004/components/button', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  // reload once to warm cache
  await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const allButtons = Array.from(document.querySelectorAll('button')).map((b) => b.innerText).slice(0, 20);
    const article = document.querySelector('article');
    const all = Array.from((article || document.body).querySelectorAll('*'));
    const demoLike = all
      .filter((el) => /demo|preview|code|example/i.test(el.className))
      .map((el) => ({ tag: el.tagName, class: el.className.slice(0, 120) }))
      .slice(0, 30);
    return { articleTextLen: article?.innerText.length || 0, allButtons, demoLike };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
