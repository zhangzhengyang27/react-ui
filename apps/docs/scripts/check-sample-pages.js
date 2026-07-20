#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const COMPONENTS_ROOT = path.resolve(__dirname, '../components');
const HOST = process.env.DOCS_HOST || 'http://localhost:8002';
const SAMPLES = process.env.SAMPLES ? process.env.SAMPLES.split(',') : null;

async function main() {
  const dirs = fs
    .readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(COMPONENTS_ROOT, e.name, 'index.zh-CN.md')))
    .map((e) => e.name)
    .filter((d) => (SAMPLES ? SAMPLES.includes(d) : true))
    .sort();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  const networkFailures = [];

  page.on('pageerror', (err) => errors.push({ type: 'pageerror', message: err.message }));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push({ type: 'console.error', text: msg.text() }); });
  page.on('response', (res) => { if (res.status() >= 400) networkFailures.push({ url: res.url(), status: res.status() }); });

  for (const dir of dirs) {
    const url = `${HOST}/components/${dir}`;
    errors.length = 0;
    networkFailures.length = 0;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
      await page.reload({ waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForSelector('article h1', { timeout: 10000 });
      const title = await page.$eval('article h1', (el) => el.textContent).catch(() => '');
      const hasDemo = await page
        .waitForSelector('.code-box-demo', { timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      const status = errors.length ? 'WARN' : 'OK';
      console.log(`${dir}: ${status} | title="${title.trim()}" | demo=${hasDemo} | errors=${errors.length}`);
      if (errors.length) errors.forEach((e) => console.log('   ', e.type, e.message || e.text));
      if (networkFailures.length) networkFailures.forEach((e) => console.log('   NET', e.status, e.url));
    } catch (e) {
      console.log(`${dir}: FAIL | ${e.message}`);
    }
  }

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
