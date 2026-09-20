#!/usr/bin/env node
/**
 * 校验工作区各包 exports 映射指向的文件真实存在，并禁止"只解析到类型、没有运行时"的通配符导出。
 *
 * 背景：@xiaoye-react/ui 曾导出 "./es/*": "./es/*"，而 es/ 下每个组件目录只有 .d.ts
 * （产物是单个 es/index.js），于是 `import x from '@xiaoye-react/ui/es/components/Button/Button'`
 * 能通过 TypeScript 解析、构建期不报错，直到运行时才 404。收紧成显式子路径后，
 * 由本脚本守住这条不变量，防止通配符再被加回来。
 *
 * 运行：node scripts/validate-package-exports.mjs [@xiaoye-react/ui ...]
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REPO = path.resolve(import.meta.dirname, '..');
const PACKAGES_GLOBS = ['packages', path.join('packages', '@xiaoye-react')];

function listPackageDirs() {
  const dirs = [];
  for (const rel of PACKAGES_GLOBS) {
    const base = path.join(REPO, rel);
    if (!existsSync(base)) continue;
    for (const entry of readdirSync(base)) {
      const pkgDir = path.join(base, entry);
      if (entry.startsWith('@') && statSync(pkgDir).isDirectory()) {
        for (const nested of readdirSync(pkgDir)) dirs.push(path.join(pkgDir, nested));
        continue;
      }
      dirs.push(pkgDir);
    }
  }
  return dirs.filter((d) => existsSync(path.join(d, 'package.json')));
}

/** 展开 exports 里的条件对象，收集所有字符串目标 */
function collectTargets(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) collectTargets(v, out);
  return out;
}

function checkPackage(pkgDir) {
  const pkg = JSON.parse(readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));
  if (!pkg.exports) return [];
  const problems = [];

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
