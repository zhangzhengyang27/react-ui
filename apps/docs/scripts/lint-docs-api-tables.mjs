#!/usr/bin/env node
/**
 * 校验文档页 API 表里每一行的属性名，真的出现在对应组件 props 类型的成员里。
 *
 * 为什么需要：API 表是 markdown，tsc 不读它；demo 类型门禁只覆盖代码；挂载 sweep 只能
 * 抓到"被 demo 实际传过"的假 prop。于是 "Switch 表里写着 description/error" 这类纯文档
 * 假行三层守卫全看不见——表里写什么全凭作者记忆。
 *
 * 为什么用 ts-morph 而不是正则：接口成员散落在 extends/Omit/Pick/ElementProps<>'
 * 与泛型参数之间，正则版实测把 874 张表判成"无法解析"直接跳过，等于一个不检查任何东西
 * 却报绿的校验器。这里交给类型检查器把成员链展平。
 *
 * 运行：node apps/docs/scripts/lint-docs-api-tables.mjs
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Project } from 'ts-morph';

const REPO = path.resolve(import.meta.dirname, '../../..');
const UI_SRC = path.join(REPO, 'packages/ui/src');
const PAGES = path.join(REPO, 'apps/docs/components');
const REACT_TYPES = path.join(REPO, 'node_modules/@types/react/index.d.ts');

function walkMd(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== 'node_modules' && !entry.startsWith('.')) walkMd(full, out);
    } else if (entry.endsWith('.md')) out.push(full);
  }
  return out;
}

/** @types/react 里的 DOM/Aria 属性名，作为声明在 React 类型上的成员兜底 */
function domAttributeNames() {
  const set = new Set();
  if (!existsSync(REACT_TYPES)) return set;
  const src = readFileSync(REACT_TYPES, 'utf8');
  for (const m of src.matchAll(/^\s{2,}(['"]?)([A-Za-z0-9_$]+)\1\s*\??\s*:/gm)) set.add(m[2]);
  return set;
}

const project = new Project({
  tsConfigFilePath: path.join(REPO, 'packages/ui/tsconfig.json'),
  skipAddingFilesFromTsConfig: true
});
project.addSourceFilesAtPaths(path.join(UI_SRC, '**/*.{ts,tsx}'));

/** 名字 -> 展平后的成员集合；同名接口（各包重名）取并集，宁可漏报不误报 */
const membersByName = new Map();
for (const file of project.getSourceFiles()) {
  for (const iface of file.getInterfaces()) {
    const name = iface.getName();
    if (!name) continue;
    const set = membersByName.get(name) || new Set();
    try {
      for (const prop of iface.getType().getProperties()) set.add(prop.getName());
    } catch {
      /* 泛型接口需要类型参数才能展平：跳过该名字，交给兜底逻辑 */
    }
    membersByName.set(name, set);
  }
  for (const alias of file.getTypeAliases()) {
    const name = alias.getName();
    const set = membersByName.get(name) || new Set();
    try {
      for (const prop of alias.getType().getProperties()) set.add(prop.getName());
    } catch {
      /* 同上 */
    }
    membersByName.set(name, set);
  }
}

/** 从 md 里抽出 `### XxxProps` / `### XxxOptions` 小节下的表格首列 */
function tableRows(markdown) {
  const rows = [];
  let section = null;
  for (const line of markdown.split('\n')) {
    const heading = line.match(/^#{2,4}\s+([A-Za-z0-9_$.]+)\s*(\{[^}]*\})?$/);
    if (heading) {
      section = /Props|Options|Parameters/.test(heading[1]) ? heading[1] : null;
      continue;
    }
    if (!section) continue;
    const cell = line.match(/^\|\s*`?([A-Za-z][A-Za-z0-9_$]*)`?\s*\|/);
    if (cell && !['属性', 'Property', 'name'].includes(cell[1])) rows.push({ section, prop: cell[1] });
  }
  return rows;
}

const domProps = domAttributeNames();
// 多态工厂在运行时给每个组件注入这两个 prop，它们不在手写的 interface 里，
// 由 factory()/PolymorphicFactory 的 ComponentProps 包装补上
const FACTORY_INJECTED = new Set(['component', 'renderRoot', 'className', 'style', 'key', 'ref']);
const problems = [];
const skipped = [];
let checked = 0;

for (const page of walkMd(PAGES)) {
  for (const { section, prop } of tableRows(readFileSync(page, 'utf8'))) {
    const members = membersByName.get(section);
    if (!members) {
      if (!skipped.includes(section)) skipped.push(section);
      continue;
    }
    checked++;
    if (members.has(prop) || domProps.has(prop) || FACTORY_INJECTED.has(prop)) continue;
    problems.push(`${path.relative(REPO, page)}: ${section} 表里的 \`${prop}\` 不在该类型的成员里`);
  }
}

const chalk = await import('chalk').then((m) => m.default);

console.log(
  `api-tables：逐行核对 ${checked} 条，跳过 ${skipped.length} 个展平不出成员的接口` +
    (skipped.length ? `（${skipped.slice(0, 8).join(', ')}）` : '')
);

if (checked === 0) {
  console.log(chalk.red('一条都没核对——校验器自身失效了，拒绝以"全绿"通过'));
  process.exit(1);
}

if (problems.length === 0) {
  console.log('文档 API 表的每一行都能在组件类型里找到');
  process.exit(0);
}
console.log(chalk.red(`发现 ${problems.length} 行文档 API 假属性：`));
for (const p of [...new Set(problems)]) console.log(`  ✗ ${p}`);
process.exit(1);
