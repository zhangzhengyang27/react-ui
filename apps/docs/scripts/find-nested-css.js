// 检测含原生 CSS 嵌套（规则块内再嵌规则块，非 @media 等 at-rule）的文件，mako 解析器不支持。
const fs = require('node:fs');
const path = require('node:path');

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

// 括号配对 + at-rule 感知的嵌套检测
function hasNesting(css) {
  const tokens = css.match(/[{}]|[^}{]+/g) || [];
  // stack 元素: { isAtRule: bool } —— 记录每块是否由 at-rule 引入
  const stack = [];
  let lastText = '';
  for (const t of tokens) {
    if (t === '{') {
      const newIsAtRule = lastText.trim().startsWith('@');
      // 若已处于一个"规则块"内，又开了新块 -> 嵌套（at-rule 块内开规则块是合法的，不算）
      if (stack.length > 0 && stack[stack.length - 1].isAtRule === false) {
        return true;
      }
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
const hits = [];
for (const f of files) {
  const css = fs.readFileSync(f, 'utf-8');
  if (hasNesting(css)) hits.push(f);
}
console.log(`扫描 ${files.length} 个 css 文件，疑似嵌套 ${hits.length} 个：`);
hits.forEach((h) => console.log('  ' + path.relative(process.cwd(), h)));
