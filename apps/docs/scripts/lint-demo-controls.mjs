#!/usr/bin/env node
/**
 * 校验 demo 的 configurator 控制项引用的 prop 名在库里真实存在。
 *
 * 为什么需要它：configurator demo 的组件签名是 `function Wrapper(props: any)`，
 * 把控件值整体 {...props} 展开进组件，tsc 对这一层完全失明；挂载 sweep 虽然能靠
 * React 的 "does not recognize the prop" 抓到，但那个告警按 (prop, tag) 全进程只
 * 报一次，第二个及以后传同名 prop 的 demo 会一直隐身。这里做一次静态全集比对，
 * 覆盖到每一个 demo。
 *
 * 运行：node apps/docs/scripts/lint-demo-controls.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REPO = path.resolve(import.meta.dirname, '../../..');
const UI_SRC = path.join(REPO, 'packages/ui/src');
const DEMOS = path.join(REPO, 'apps/docs/demos');
const REACT_TYPES = path.join(REPO, 'node_modules/@types/react/index.d.ts');

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** interface/type 成员名：`name?:`、`name:`、`'data-x':`、`onX?:` */
function memberNames(source) {
  const names = new Set();
  for (const m of source.matchAll(/^\s{2,}(['"]?[A-Za-z_$][\w$]*['"]?)\s*\??\s*:/gm)) {
    names.add(m[1].replace(/['"]/g, ''));
  }
  return names;
}

function buildUniverse() {
  const known = new Set();
  for (const file of walk(UI_SRC)) {
    if (!/\.(ts|tsx)$/.test(file) || file.endsWith('.test.tsx') || file.endsWith('.test.ts')) continue;
    for (const name of memberNames(readFileSync(file, 'utf8'))) known.add(name);
  }
  // 原生 DOM/Aria 属性名来自 @types/react，不写在业务代码里
  if (existsSync(REACT_TYPES)) {
    for (const name of memberNames(readFileSync(REACT_TYPES, 'utf8'))) known.add(name);
  }
  return known;
}

/** demo 里 `prop: 'x'` 形式的控制项 */
function collectControlProps() {
  const hits = [];
  for (const file of walk(DEMOS)) {
    if (!file.endsWith('.tsx')) continue;
    const source = readFileSync(file, 'utf8');
    if (!source.includes('controls')) continue;
    for (const m of source.matchAll(/\bprop:\s*['"]([A-Za-z_$][\w$]*)['"]/g)) {
      hits.push({ prop: m[1], file: path.relative(REPO, file) });
    }
  }
  return hits;
}

const known = buildUniverse();
const unknown = new Map();

for (const { prop, file } of collectControlProps()) {
  if (known.has(prop) || /^(data|aria)-/.test(prop) || /^on[A-Z]/.test(prop)) continue;
  if (!unknown.has(prop)) unknown.set(prop, []);
  unknown.get(prop).push(file);
}

const chalk = await import('chalk').then((m) => m.default);

if (unknown.size === 0) {
  console.log(
    `docs:controls-lint 通过——${collectControlProps().length} 个控制项引用的 prop 名都能在 packages/ui 或 @types/react 中找到`
  );
  process.exit(0);
}

console.log(chalk.red(`发现 ${unknown.size} 个库里不存在的控制项 prop（会顺着 rest-spread 落到 DOM）：`));
for (const [prop, files] of [...unknown.entries()].sort()) {
  console.log(`  ✗ ${prop}`);
  for (const f of files.slice(0, 6)) console.log(`      ${f}`);
  if (files.length > 6) console.log(`      …另 ${files.length - 6} 处`);
}
console.log(chalk.gray('\n处理：改成库里真实存在的 prop，或删掉该控制项并同步页面文档。'));
process.exit(1);
