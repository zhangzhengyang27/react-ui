// 扫描 md 正文（排除代码围栏与行内代码——本站 codeBlockMode: passive，围栏内仅展示；
// 行内代码里的泛型如 `DataTableColumn<T>[]` 不是 JSX，一并排除）
// 中使用的 JSX 大写组件是否为 dumi builtin；未导入的裸标识符会在运行时抛
// ReferenceError 导致整页空白（app-shell 页面事故根因）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const builtins = new Set(fs.readdirSync(path.join(docsRoot, '.dumi', 'theme', 'builtins')));
const allowed = new Set([
  ...builtins,
  'Link', 'NavLink', 'Outlet', 'Navigate',
  'Demo', 'DumiDemo', 'DumiDemoGrid', 'DumiPreview', 'FormattedMessage',
]);

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.md')) yield p;
  }
}

let bad = 0;
for (const dir of ['components', 'docs']) {
  for (const file of walk(path.join(docsRoot, dir))) {
    const s = fs.readFileSync(file, 'utf8');
    const body = s
        .replace(/^---[\s\S]*?---/, '')
        .replace(/^(?:> ?)?```[\s\S]*?^(?:> ?)?```/gm, '')
        .replace(/`[^`\n]*`/g, '');
    const used = new Set();
    for (const m of body.matchAll(/<([A-Z][A-Za-z0-9]*)[\s/>]/g)) used.add(m[1]);
    const missing = [...used].filter(u => !allowed.has(u));
    if (missing.length) {
      console.log(`${path.relative(docsRoot, file)} -> 裸 JSX 组件: ${missing.join(', ')}`);
      bad++;
    }
  }
}
console.log(bad === 0 ? '全部 md 正文 JSX 组件均为 dumi builtin ✓' : `共 ${bad} 个文件存在裸 JSX 组件（运行时会整页崩溃）`);
