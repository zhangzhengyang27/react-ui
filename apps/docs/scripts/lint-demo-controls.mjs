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
import { Project } from 'ts-morph';

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

/**
 * 按"组件家族"分组的成员名：`packages/ui/src/components/Input/**` 全部算进 `Input`，
 * 复合组件（Input.Wrapper / Input.Label）的属性自然也在一起。
 *
 * 为什么要按家族而不是一份全局名单：全局名单里只要有任何一个组件声明过 `gap`，
 * `Grid` 的控制项 `gap` 就查不出来——实测 Grid.gap / Switch.description / Switch.error /
 * Tabs.List.justify 四个假控制项就是这么躲过检查的（它们的名字都在别的组件上真实存在）。
 *
 * 成员名交给 ts-morph 展平，不用正则抠源码：`extends`/`Pick<PopoverProps, 'arrowPosition' | …>`
 * 这类继承正则看不见，Menu.demo.positionConfigurator 的 arrowPosition 就是这么被误报的。
 */
const COMPONENT_ROOTS = [
  path.join(UI_SRC, 'components'),
  path.join(UI_SRC, 'dates', 'components'),
  ...readdirSync(path.join(REPO, 'packages/@xiaoye-react')).flatMap(pkg => {
    const dir = path.join(REPO, 'packages/@xiaoye-react', pkg, 'src');
    return existsSync(dir) ? [dir] : [];
  })
];

/** 路径里 components/<Family>/ 的那一段；没有 components 目录时退到 src/ 下的第一段。
 *  只有 ui 的 core/ 算"每个组件都能用"的共享名单——把其它包的 src 也并进共享名单，
 *  等于让 pro 里某个组件的 `gap` 给 Switch 的控制项放行（反向验证时实测到的）。 */
function familyOf(filePath) {
  const segs = filePath.split(/[\\/]/);
  const i = segs.lastIndexOf('components');
  if (i >= 0 && i + 1 < segs.length) return segs[i + 1].replace(/\.tsx?$/, '');
  const j = segs.lastIndexOf('src');
  if (j >= 0 && j + 1 < segs.length && !filePath.includes('/src/core/')) {
    return segs[j + 1].replace(/\.tsx?$/, '');
  }
  return null;
}

const typeProject = new Project({
  tsConfigFilePath: path.join(REPO, 'packages/ui/tsconfig.json'),
  skipAddingFilesFromTsConfig: true
});
for (const root of COMPONENT_ROOTS) {
  if (existsSync(root)) typeProject.addSourceFilesAtPaths(path.join(root, '**/*.{ts,tsx}'));
}

/** 家族名 -> 展平后的成员名集合 */
const dirMembers = new Map();
const sharedMembers = new Set();
for (const sourceFile of typeProject.getSourceFiles()) {
  const filePath = sourceFile.getFilePath();
  if (/\.test\.tsx?$/.test(filePath)) continue;
  const family = familyOf(filePath);
  const set = family ? dirMembers.get(family) || new Set() : sharedMembers;
  for (const decl of [...sourceFile.getInterfaces(), ...sourceFile.getTypeAliases()]) {
    try {
      for (const prop of decl.getType().getProperties()) set.add(prop.getName());
    } catch {
      /* 需要类型参数才能展平的泛型声明：该名字交给全局名单兜底 */
    }
  }
  if (family) dirMembers.set(family, set);
}

/** demo 里 `prop: 'x'` 形式的控制项 */
function collectControlProps() {
  const hits = [];
  for (const file of walk(DEMOS)) {
    if (!file.endsWith('.tsx')) continue;
    const source = readFileSync(file, 'utf8');
    if (!source.includes('controls')) continue;
    for (const m of source.matchAll(/\bprop:\s*['"]([A-Za-z_$][\w$]*)['"]/g)) {
      hits.push({ prop: m[1], file: path.relative(REPO, file), family: path.basename(path.dirname(file)) });
    }
  }
  return hits;
}

const known = buildUniverse();
const unknown = new Map();
const familyUnknown = new Map();
const noFamily = new Set();
let strict = 0;

for (const { prop, file, family } of collectControlProps()) {
  if (/^(data|aria)-/.test(prop) || /^on[A-Z]/.test(prop)) continue;
  if (!known.has(prop)) {
    if (!unknown.has(prop)) unknown.set(prop, []);
    unknown.get(prop).push(file);
    continue;
  }
  // 名字在库里存在：再核对它是不是"这个 demo 所配置的那个组件"的属性
  const members = dirMembers.get(family);
  if (!members) {
    noFamily.add(family);
    continue;
  }
  strict++;
  if (!members.has(prop) && !sharedMembers.has(prop)) {
    if (!familyUnknown.has(family)) familyUnknown.set(family, []);
    familyUnknown.get(family).push({ prop, file });
  }
}

const chalk = await import('chalk').then((m) => m.default);
const total = collectControlProps().length;

if (unknown.size === 0 && familyUnknown.size === 0) {
  console.log(
    `docs:controls-lint 通过——${total} 个控制项引用的 prop 名都能在 packages/ui 或 @types/react 中找到` +
      `（其中 ${strict} 个还按组件家族核对了归属）`
  );
  if (process.env.CONTROLS_LINT_DEBUG) {
    console.log(`未匹配到组件目录的 demo 分组：${[...noFamily].join(', ') || '无'}`);
  }
  process.exit(0);
}

if (strict === 0) {
  console.log(chalk.red('一个控制项都没能按组件家族核对——名单构建失效，拒绝以"全绿"通过'));
}

for (const [family, items] of [...familyUnknown.entries()].sort()) {
  console.log(chalk.red(`${family} 的 demo 上有 ${items.length} 个不属于该组件的控制项 prop：`));
  for (const { prop, file } of items) console.log(`  ✗ ${family} 上没有 \`${prop}\` —— ${file}`);
}

console.log(chalk.red(`发现 ${unknown.size} 个库里不存在的控制项 prop（会顺着 rest-spread 落到 DOM）：`));
for (const [prop, files] of [...unknown.entries()].sort()) {
  console.log(`  ✗ ${prop}`);
  for (const f of files.slice(0, 6)) console.log(`      ${f}`);
  if (files.length > 6) console.log(`      …另 ${files.length - 6} 处`);
}
console.log(chalk.gray('\n处理：改成该组件真实存在的 prop，或删掉该控制项并同步页面文档。'));
process.exit(1);
