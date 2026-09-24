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
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Project } from 'ts-morph';

const REPO = path.resolve(import.meta.dirname, '../../..');
const UI_SRC = path.join(REPO, 'packages/ui/src');
const PAGES = path.join(REPO, 'apps/docs/components');

function walkMd(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== 'node_modules' && !entry.startsWith('.')) walkMd(full, out);
    } else if (entry.endsWith('.md')) out.push(full);
  }
  return out;
}

/**
 * React 的"任何元素都能写"的属性名：AriaAttributes / DOMAttributes / HTMLAttributes
 * 三个接口的成员并集。
 *
 * 必须由类型检查器给，不能用正则抠 d.ts：上一版用 `body.indexOf('\n}')` 找接口结尾，
 * 在 @types/react 里一路找到 78KB 之外，把 785 个名字（含 value/data/multiple/
 * placeholder/speed/selected）全洗成了"合法"，886 行核对里凡是叫得上名的 prop 都过了——
 * 实测 `### ComboboxProps` 表里的 value/data/multiple/placeholder 四行假属性被判绿。
 */
function globalReactAttributes() {
  const probe = project.createSourceFile(
    '__docs_api_globals_probe.ts',
    [
      "import type { AriaAttributes, DOMAttributes, HTMLAttributes } from 'react';",
      'export type __GlobalAttrs = AriaAttributes & DOMAttributes<HTMLElement> & HTMLAttributes<HTMLElement>;'
    ].join('\n'),
    { overwrite: true }
  );
  const alias = probe.getTypeAliasOrThrow('__GlobalAttrs');
  return new Set(alias.getType().getProperties().map(p => p.getName()));
}

const project = new Project({
  tsConfigFilePath: path.join(REPO, 'packages/ui/tsconfig.json'),
  skipAddingFilesFromTsConfig: true
});
// 跨包 extends（如 FloatingWindowProps extends hooks 的 UseFloatingWindowOptions）依赖
// node_modules 里 hooks 的构建产物类型解析；本项目没有 paths 映射，调用方须先 build:packages
project.addSourceFilesAtPaths(path.join(UI_SRC, '**/*.{ts,tsx}'));

/** 名字 -> 展平后的成员集合；同名接口（各包重名）取并集，宁可漏报不误报 */
const membersByName = new Map();
/** props 类型名 -> 多态工厂的 defaultComponent 标签：公开 props 还要并上该标签的原生属性 */
const defaultComponentByProps = new Map();
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

    // PolymorphicFactory<{ props: InputProps, defaultComponent: 'input' }>：
    // 消费者写 <Input value placeholder> 能过 tsc，靠的是工厂补的默认元素属性，
    // 而 interface InputProps 本身没有这些成员——不并进来就会误判成文档假行
    if (!/Factory$/.test(name)) continue;
    const payload = alias.getTypeNode()?.getText() || '';
    const propsName = payload.match(/\bprops:\s*([A-Za-z0-9_$.]+)/)?.[1];
    const tag = payload.match(/\bdefaultComponent:\s*['"]([a-zA-Z][\w-]*)['"]/)?.[1];
    if (propsName && tag) defaultComponentByProps.set(propsName.split('.').pop(), tag);
  }
}

/** ComponentProps<'tag'> 的成员，按标签惰性求值 */
const componentPropsCache = new Map();
function nativeAttributes(tag) {
  if (componentPropsCache.has(tag)) return componentPropsCache.get(tag);
  const probe = project.createSourceFile(
    `__docs_api_native_${tag.replace(/[^a-z0-9-]/gi, '_')}.ts`,
    `import type { ComponentProps } from 'react';\nexport type __Native = ComponentProps<'${tag}'>;`,
    { overwrite: true }
  );
  let set = new Set();
  try {
    set = new Set(probe.getTypeAliasOrThrow('__Native').getType().getProperties().map(p => p.getName()));
  } catch {
    /* 标签不在 IntrinsicElements 里：不并入任何原生属性 */
  }
  componentPropsCache.set(tag, set);
  return set;
}

/** 从 md 里抽出 `### XxxProps` / `### Xxx.Panel` 小节下的表格首列 */
function tableRows(markdown) {
  const rows = [];
  let candidates = null;
  for (const line of markdown.split('\n')) {
    const heading = line.match(/^#{2,4}\s+(.+?)\s*(\{[^}]*\})?$/);
    if (heading) {
      // 小节标题可能是 `### ComboboxProps`、`### Splitter.Panel / Splitter.Pane`
      // 甚至只写 `### Panel`：为它列出多个候选类型名，解析不出就整表跳过（不误报）
      const words = heading[1].match(/[A-Za-z][A-Za-z0-9_$.]*/g) || [];
      candidates = words
        .filter((w) => /Props|Options|Parameters/.test(w) || /^[A-Z]/.test(w))
        .flatMap((w) => {
          const parts = w.split('.');
          const last = parts[parts.length - 1];
          const first = parts[0];
          // 复合小节名（`### Splitter.Panel`、`### Checkbox.Group`）优先配复合类型名，
          // 否则 Panel 的行会被拿去和 SplitterProps 比，把真实成员判成假行
          return [w, `${first}${last}Props`, `${w}Props`, `${first}Props`];
        });
      continue;
    }
    if (!candidates) continue;
    const cell = line.match(/^\|\s*`?([A-Za-z][A-Za-z0-9_$]*)`?\s*\|/);
    if (cell && !['属性', 'Property', 'name'].includes(cell[1])) rows.push({ candidates, prop: cell[1] });
  }
  return rows;
}

const globals = globalReactAttributes();
// 多态工厂在运行时给每个组件注入这些 prop，它们不在手写的 interface 里，
// 由 factory()/PolymorphicFactory 的 ComponentProps 包装补上
const FACTORY_INJECTED = new Set(['component', 'renderRoot', 'className', 'style', 'key', 'ref']);
const problems = [];
const skipped = [];
let checked = 0;

for (const page of walkMd(PAGES)) {
  for (const { candidates, prop } of tableRows(readFileSync(page, 'utf8'))) {
    const hit = candidates.find(c => membersByName.has(c));
    const members = hit ? membersByName.get(hit) : undefined;
    if (!members) {
      if (!skipped.includes(candidates[0])) skipped.push(candidates[0]);
      continue;
    }
    checked++;
    const tag = defaultComponentByProps.get(hit);
    // globals 兜住 ElementProps<> 泛型袋展不开的情况；名字不在其中的
    // speed/name/selected/withSpacing 之类仍会被判成假行
    if (
      members.has(prop) ||
      (tag && nativeAttributes(tag).has(prop)) ||
      globals.has(prop) ||
      FACTORY_INJECTED.has(prop)
    ) {
      continue;
    }
    problems.push(`${path.relative(REPO, page)}: ${hit} 表里的 \`${prop}\` 不在该类型的成员里`);
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
