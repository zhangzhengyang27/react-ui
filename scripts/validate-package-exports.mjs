#!/usr/bin/env node
/**
 * 校验工作区各包 exports 映射指向的文件真实存在，并禁止"只解析到类型、没有运行时"的通配符导出。
 *
 * 背景：@xiaoye-react/ui 曾导出 "./es/*": "./es/*"，当时 es/ 下每个组件目录只有 .d.ts
 * （产物是单个 es/index.js），于是 `import x from '@xiaoye-react/ui/es/components/Button/Button'`
 * 能通过 TypeScript 解析、构建期不报错，直到运行时才 404。
 *
 * 2026-09-21 起 ui 改为 preserveModules 输出，组件目录下运行时文件已经存在，
 * 那条通配符对 ui 不再等于必坏——但它仍然把包的内部结构变成公开 API
 * （改个文件位置就是 breaking change），所以照旧只允许显式子路径。
 * 收紧后由本脚本守住这条不变量，防止通配符被随手加回来。
 *
 * 运行：node scripts/validate-package-exports.mjs [@xiaoye-react/ui ...]
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REPO = path.resolve(import.meta.dirname, '..');

function listPackageDirs() {
  const dirs = new Set();
  const scan = (base) => {
    if (!existsSync(base)) return;
    for (const entry of readdirSync(base)) {
      const pkgDir = path.join(base, entry);
      // @scope 目录本身没有 package.json，进去逐个收；不要再单独列一遍作用域，
      // 否则同一批包会被扫两遍（此前打印"24 个包"实际只有 13 个）
      if (entry.startsWith('@') && statSync(pkgDir).isDirectory()) {
        for (const nested of readdirSync(pkgDir)) dirs.add(path.join(pkgDir, nested));
        continue;
      }
      dirs.add(pkgDir);
    }
  };
  scan(path.join(REPO, 'packages'));
  scan(path.join(REPO, 'apps'));
  return [...dirs].filter((d) => existsSync(path.join(d, 'package.json')));
}

/** 展开 exports 里的条件对象，收集所有字符串目标 */
function collectTargets(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) collectTargets(v, out);
  return out;
}

function checkPackage(pkgDir) {
  const pkg = JSON.parse(readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  const problems = [];

  // main / module / types：只有 exports 时才让位给 exports，但字段本身不能指向空气
  for (const field of ['main', 'module', 'types']) {
    const target = pkg[field];
    if (typeof target === 'string' && !target.includes('*') && !existsSync(path.resolve(pkgDir, target))) {
      problems.push(`${pkg.name}: ${field} 指向不存在的 ${target}`);
    }
  }

  // sideEffects:false 会豁免整包的副作用；带 CSS 导出的包必须显式放行 *.css
  const cssExports = Object.values(pkg.exports ?? {}).some((s) =>
    collectTargets(s).some((t) => t.endsWith('.css'))
  );
  if (cssExports && pkg.sideEffects === false) {
    problems.push(
      `${pkg.name}: 导出了 CSS 却声明 sideEffects:false——打包器可能连带跳过消费者的 \`import '${pkg.name}/...css'\`，应改为 ["*.css"]`
    );
  }

  if (!pkg.exports) return problems;

  for (const [subpath, spec] of Object.entries(pkg.exports)) {
    for (const target of collectTargets(spec)) {
      if (target.includes('*')) {
        const dir = path.resolve(pkgDir, target.replace(/\/[^/]*\*.*$/, '') || '.');
        const orphans = existsSync(dir)
          ? readdirSync(dir, { recursive: true })
              .map(String)
              .filter((f) => f.endsWith('.d.ts') && !existsSync(path.join(dir, f.replace(/\.d\.ts$/, '.js'))))
          : [];
        problems.push(
          `${pkg.name}: 通配符导出 "${subpath}" -> "${target}" 会解析到 ${orphans.length} 个只有类型没有运行时的文件` +
            `（例如 ${orphans[0] ? `${subpath.includes('*') ? subpath.split('/')[1] : ''}/…${path.basename(orphans[0])}` : 'n/a'}）` +
            '——消费者 import 能通过类型检查却在运行时失败'
        );
        continue;
      }
      const abs = path.resolve(pkgDir, target);
      if (!existsSync(abs)) problems.push(`${pkg.name}: 导出 "${subpath}" 指向不存在的 ${target}`);
    }
  }
  return problems;
}

const only = process.argv.slice(2);
const dirs = listPackageDirs().filter((d) => {
  if (only.length === 0) return true;
  const name = JSON.parse(readFileSync(path.join(d, 'package.json'), 'utf8')).name;
  return only.includes(name);
});

const problems = dirs.flatMap(checkPackage);

if (problems.length === 0) {
  console.log(`exports 校验通过——${dirs.length} 个包的导出目标全部真实存在且无类型-only 通配符`);
  process.exit(0);
}

console.log(`发现 ${problems.length} 个 exports 问题：`);
for (const p of problems) console.log(`  ✗ ${p}`);
process.exit(1);
