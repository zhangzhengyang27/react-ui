#!/usr/bin/env node
/**
 * 文档代码块导入校验（pnpm docs:lint）
 *
 * 校验 apps/docs/docs/ 递归目录下 md 文件的代码块中 @xiaoye-react/* 的导入是否与各包真实导出一致：
 *  1. 命名导入的符号必须存在于目标包（不在时给出建议包）
 *  2. 样式副作用导入的子路径必须存在于目标包 package.json exports
 *     （ui 包是 style.css，子包是 styles.css——历史上曾大面积写错）
 *  3. <InstallScript packages="..."> 中的包必须是真实存在的工作区包
 *  4. apps/docs/demos 与 components 里出现的 @xiaoye-react/* 包名必须真实存在——
 *     特别是 demo 的 `const code = \`...\`` 展示字符串，它不参与编译，写错只在用户复制后才炸
 *
 * 发现违规时以非零码退出。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MONO_ROOT = path.resolve(DOCS_ROOT, '../..');
const PACKAGES_DIR = path.join(MONO_ROOT, 'packages');
const SCOPED_DIR = path.join(PACKAGES_DIR, '@xiaoye-react');

// ---------- 工作区包发现 ----------
function listWorkspacePackages() {
  const names = new Set();
  for (const dir of [PACKAGES_DIR, SCOPED_DIR]) {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      if (d.isDirectory() && fs.existsSync(path.join(dir, d.name, 'package.json'))) {
        names.add(d.name);
      }
    }
  }
  return [...names];
}

const WORKSPACE_PACKAGES = listWorkspacePackages();

// ---------- 导出符号构建（递归解析 export * 链） ----------
function resolveTarget(base, spec) {
  const p = path.resolve(base, spec);
  for (const cand of [p, p + '.ts', p + '.tsx', path.join(p, 'index.ts'), path.join(p, 'index.tsx')]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

function parseExports(entry, depth = 0, seen = new Set()) {
  const names = new Set();
  let file = null;
  for (const cand of [entry, entry + '.ts', entry + '.tsx', path.join(entry, 'index.ts')]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      file = cand;
      break;
    }
  }
  if (!file || seen.has(file) || depth > 6) return names;
  seen.add(file);
  const src = fs.readFileSync(file, 'utf8');
  const base = path.dirname(file);
  for (const re of [/export\s*\{([^}]+)\}/g, /export\s+type\s*\{([^}]+)\}/g]) {
    for (const m of src.matchAll(re)) {
      for (let name of m[1].split(',')) {
        name = name.trim();
        if (!name || name.startsWith('//')) continue;
        name = name.includes(' as ') ? name.split(' as ').pop().trim() : name;
        if (name) names.add(name);
      }
    }
  }
  for (const m of src.matchAll(/export\s+(?:type\s+|interface\s+|class\s+|enum\s+|const\s+|function\s+|let\s+|var\s+)?(\w+)/g)) {
    names.add(m[1]);
  }
  for (const m of src.matchAll(/export\s+(?:type\s+)?\*\s+from\s+'(\.[^']+)'/g)) {
    const target = resolveTarget(base, m[1]);
    if (target) {
      for (const name of parseExports(target, depth + 1, seen)) {
        names.add(name);
      }
    }
  }
  return names;
}

const pkgExports = {};
const pkgSubpaths = {};
for (const pkg of WORKSPACE_PACKAGES) {
  const dir = fs.existsSync(path.join(SCOPED_DIR, pkg)) ? path.join(SCOPED_DIR, pkg) : path.join(PACKAGES_DIR, pkg);
  const idx = path.join(dir, 'src', 'index');
  pkgExports[pkg] = parseExports(idx);
  try {
    const json = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    pkgSubpaths[pkg] = Object.keys(json.exports ?? {});
  } catch {
    pkgSubpaths[pkg] = [];
  }
}

// ---------- md 收集与校验 ----------
function listMd(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.md')) out.push(full);
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

const FENCE = /```[a-z]*\n([\s\S]*?)```/g;
const NAMED_IMPORT = /import\s+(type\s+)?\{([^}]+)\}\s+from\s+'(@xiaoye-react\/[\w-]+)';/g;

const errors = [];

function symbolOwner(base, excludePkg) {
  for (const [pkg, names] of Object.entries(pkgExports)) {
    if (pkg !== excludePkg && names.has(base)) return pkg;
  }
  return null;
}

function checkImport(filePath, typePrefix, symbols, pkgName) {
  const known = pkgExports[pkgName];
  if (!known) return; // 非工作区包（如 @xiaoye-react/demo 的别名）跳过
  const kept = [];
  const wrong = [];
  for (const sym of symbols) {
    const base = sym.replace(/^type\s+/, '').split(' as ')[0].trim();
    if (!base) continue;
    if (known.has(base)) {
      kept.push(sym);
    } else {
      const owner = symbolOwner(base, pkgName);
      wrong.push({ sym, base, owner });
    }
  }
  if (wrong.length === 0) return kept;
  const lines = [`    import { ${symbols.join(', ')} } from '@xiaoye-react/${pkgName}';`];
  for (const { sym, base, owner } of wrong) {
    lines.push(`      ✗ '${base}' 不是 @xiaoye-react/${pkgName} 的导出${owner ? `（实际在 @xiaoye-react/${owner}）` : '（未在任何工作区包中找到）'}`);
  }
  errors.push({ file: filePath, message: lines.join('\n') });
  return kept; // 供后续改写建议（当前仅报告）
}

function checkStyleSubpath(filePath, spec) {
  // spec 形如 @xiaoye-react/ui/styles.css
  const m = spec.match(/^@xiaoye-react\/([\w-]+)\/(.+)$/);
  if (!m) return;
  const [, pkg, subpath] = m;
  const subpaths = pkgSubpaths[pkg];
  if (!subpaths) return; // 非工作区包跳过
  const ok =
    subpaths.includes(`./${subpath}`) ||
    subpaths.some((k) => k.endsWith('*') && subpath.startsWith(k.slice(1, -1)));
  if (!ok) {
    const suggestion = subpaths.find((k) => k !== '.' && k.endsWith('.css')) ?? './style.css';
    errors.push({
      file: filePath,
      message: `    '@xiaoye-react/${pkg}/${subpath}' 不在包 exports 中（可用：${subpaths.filter((k) => k.endsWith('.css')).join(', ') || '无'}）\n      建议：'@xiaoye-react/${pkg}/${suggestion.replace('./', '')}'`,
    });
  }
}

for (const file of listMd(path.join(DOCS_ROOT, 'docs'))) {
  const src = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DOCS_ROOT, file);

  for (const fence of src.matchAll(FENCE)) {
    const block = fence[1];
    for (const im of block.matchAll(NAMED_IMPORT)) {
      const [, typePrefix, raw, pkgName] = im;
      const symbols = raw
        .split('\n')
        .flatMap((line) => line.split(','))
        .map((s) => s.trim().replace(/,\s*$/, '').replace(/\/\/.*$/, '').trim())
        .filter(Boolean);
      const pkgShort = pkgName.replace('@xiaoye-react/', '');
      const result = checkImport(rel, typePrefix, symbols, pkgShort);
      void result;
    }
    // 样式副作用导入
    for (const sm of block.matchAll(/import\s+'(@xiaoye-react\/[\w-]+\/[\w.]+(?:\.css))';/g)) {
      checkStyleSubpath(rel, sm[1]);
    }
  }

  // 全文级别的 styles.css 子路径检查（含非代码块位置）
  for (const m of src.matchAll(/@xiaoye-react\/(ui)\/styles\.css/g)) {
    errors.push({
      file: rel,
      message: `    '@xiaoye-react/ui/styles.css' 不在包 exports 中（可用：./style.css）\n      建议：'@xiaoye-react/ui/style.css'`,
    });
  }

  // InstallScript 包存在性
  for (const m of src.matchAll(/<InstallScript\s+packages="([^"]+)"/g)) {
    for (const pkg of m[1].split(/\s+/).filter(Boolean)) {
      const short = pkg.replace('@xiaoye-react/', '');
      if (pkg.startsWith('@xiaoye-react/') && !WORKSPACE_PACKAGES.includes(short)) {
        errors.push({ file: rel, message: `    InstallScript 引用了不存在的工作区包：${pkg}` });
      }
    }
  }
}

// ---------- demo 的 code 字符串：包名必须真实存在 ----------
// 文件头那句"demo 由构建流程编译"对 `const code = \`...\`` 不成立：
// 展示用的源码是模板字符串，tsc/vite 都不会看它，所以包名写错了只在用户复制后才炸。
// 实测：Upload.demo.usage.tsx 的展示码一直写着 from '@xiaoye-react/dropzone'（该包早已并入 ui），
// 而同一文件第 1 行的真实 import 是对的——两边本来就各写各的。
function listFiles(dir, test) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules' || e.name === 'dist' || e.name.startsWith('.')) continue;
        walk(full);
      } else if (test(e.name)) out.push(full);
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

// demo 不在 workspace 包里了（真身是 .dumi/theme/builtins/DemoEngine，dumi 按目录约定注册 builtin），
// 靠三处别名解析：.dumirc.ts 的 alias、tsconfig.json 的 paths、e2e/harness 的 alias。
// 它不是"不存在的包"，所以这条规则要放行——规则的目标是抓 dropzone/dates/form 那种
// 早已合并进 ui、却还写在展示码里的包名。
const ALIAS_RESOLVED_PACKAGES = new Set(['demo']);
const KNOWN_PACKAGES = new Set([...WORKSPACE_PACKAGES, 'ui', 'hooks', ...ALIAS_RESOLVED_PACKAGES]);

for (const file of [
  ...listFiles(path.join(DOCS_ROOT, 'demos'), (n) => /\.(tsx|ts)$/.test(n)),
  ...listFiles(path.join(DOCS_ROOT, 'components'), (n) => /\.(tsx|md)$/.test(n)),
  ...listFiles(path.join(DOCS_ROOT, 'docs'), (n) => n.endsWith('.md')),
]) {
  const rel = path.relative(DOCS_ROOT, file);
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/from\s+'@xiaoye-react\/([\w-]+)'/g)) {
    if (!KNOWN_PACKAGES.has(m[1])) {
      errors.push({
        file: rel,
        message: `    import 自不存在的包 '@xiaoye-react/${m[1]}'（工作区只有：${[...WORKSPACE_PACKAGES].join(', ')}）`
      });
    }
  }
  // 副作用导入（import '@xiaoye-react/x/style.css'）同样要认包
  for (const m of src.matchAll(/import\s+'@xiaoye-react\/([\w-]+)\//g)) {
    if (!KNOWN_PACKAGES.has(m[1])) {
      errors.push({ file: rel, message: `    从不存在的工作区包 '@xiaoye-react/${m[1]}' 导入了样式文件` });
    }
  }
}

// ---------- 输出 ----------
if (errors.length === 0) {
  console.log(`docs:lint 通过——校验了 ${WORKSPACE_PACKAGES.length} 个工作区包的导出清单，未发现违规导入。`);
  process.exit(0);
}

console.error(`docs:lint 发现 ${errors.length} 处违规导入：\n`);
for (const e of errors) {
  console.error(`  ${e.file}`);
  console.error(e.message);
  console.error('');
}
process.exit(1);
