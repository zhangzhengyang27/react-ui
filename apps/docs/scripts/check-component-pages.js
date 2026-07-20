#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const COMPONENTS_ROOT = path.resolve(__dirname, '../components');
const HOST = process.env.DOCS_HOST || 'http://localhost:8002';

async function main() {
  const dirs = fs
    .readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(COMPONENTS_ROOT, e.name, 'index.zh-CN.md')))
    .map((e) => e.name)
    .sort();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const errors = [];
  const failed = [];
  const networkFailures = [];

  page.on('pageerror', (err) => {
    errors.push({ type: 'pageerror', message: err.message });
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push({ type: 'console.error', text: msg.text() });
    }
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      networkFailures.push({ url: res.url(), status: res.status() });
    }
  });

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const url = `${HOST}/components/${dir}`;
    errors.length = 0;
    networkFailures.length = 0;
    try {
      // 首次访问用于预热 lazy chunk，避免 mako 初次构建未完成导致 demo 未渲染
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
      await page.reload({ waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForSelector('article h1', { timeout: 10000 });
      const title = await page.$eval('article h1', (el) => el.textContent).catch(() => '');
      const hasDemo = await page
        .waitForSelector('.code-box-demo', { timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      const status = failed.includes(dir) ? 'FAIL' : errors.length ? 'WARN' : 'OK';
      console.log(`[${i + 1}/${dirs.length}] ${dir}: ${status} | title="${title.trim()}" | demo=${hasDemo} | errors=${errors.length}`);
      if (errors.length) {
        errors.forEach((e) => console.log('    ', e.type, e.message || e.text));
      }
      if (networkFailures.length) {
        networkFailures.forEach((e) => console.log('    NET', e.status, e.url));
      }
    } catch (e) {
      failed.push(dir);
      console.log(`[${i + 1}/${dirs.length}] ${dir}: FAIL | ${e.message}`);
    }
  }

  await browser.close();

  console.log(`\nDone. ${dirs.length - failed.length}/${dirs.length} pages rendered successfully.`);
  if (failed.length) {
    console.log('Failed pages:', failed.join(', '));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
