// 用 postcss-nesting 把原生 CSS 嵌套展平为扁平选择器（mako 解析器不支持嵌套）。
const fs = require('node:fs');
const path = require('node:path');

const postcss = require('postcss');
const nesting = require('postcss-nested');

const ROOTS = [
  path.join(__dirname, '..', 'demos'),
  path.join(__dirname, '..', '.dumi'),
  path.resolve(__dirname, '../../packages/@xiaoye-react'),
  path.resolve(__dirname, '../../packages/ui'),
  path.resolve(__dirname, '../../packages/hooks'),
];

function walk(dir, out) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    if (e.name === 'node_modules') continue;
    if (e.name.startsWith('.') && e.name !== '.dumi') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.css')) out.push(p);
  }
}

function hasNesting(css) {
  const tokens = css.match(/[{}]|[^}{]+/g) || [];
  const stack = [];
  let lastText = '';
  for (const t of tokens) {
    if (t === '{') {
      const newIsAtRule = lastText.trim().startsWith('@');
      if (stack.length > 0 && stack[stack.length - 1].isAtRule === false) return true;
      stack.push({ isAtRule: newIsAtRule });
      lastText = '';
    } else if (t === '}') {
      if (stack.length) stack.pop();
    } else {
      lastText = t;
    }
  }
  return false;
}

const files = [];
ROOTS.forEach((r) => walk(r, files));
const targets = files.filter((f) => hasNesting(fs.readFileSync(f, 'utf-8')));

let done = 0, skip = 0;
for (const f of targets) {
  const css = fs.readFileSync(f, 'utf-8');
  try {
    const result = postcss([nesting()]).process(css, { from: f, syntax: undefined });
    const out = result.css;
    if (out !== css) {
      fs.writeFileSync(f, out, 'utf-8');
      done++;
    } else {
      skip++;
    }
  } catch (e) {
    console.error(`[FAIL] ${path.relative(process.cwd(), f)}: ${e.message}`);
  }
}
console.log(`展平完成：处理 ${done} 个，无变化 ${skip} 个，共 ${targets.length} 个嵌套文件。`);
