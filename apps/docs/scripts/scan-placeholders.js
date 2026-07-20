// 扫描所有 placeholder "何时使用" 章节
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const baseDir = path.resolve(__dirname, '..');

// 匹配占位符模式：
// ## 何时使用 {#when-to-use}
//
// react-ui 的 XxxYyy 组件，用于 XxxYyy 场景。
const placeholderPattern = /## 何时使用 \{#when-to-use\}\s*\n\s*react-ui 的 (.+?) 组件，用于 .+? 场景。/;

const files = glob.sync('{components,docs}/**/index.zh-CN.md', { cwd: baseDir, absolute: true });
const placeholders = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(placeholderPattern);
  if (match) {
    const relPath = path.relative(baseDir, file);
    placeholders.push({ file: relPath, title: match[1] });
  }
});

console.log(`找到 ${placeholders.length} 个占位"何时使用"章节：\n`);
placeholders.forEach(p => console.log(`  ${p.title.padEnd(20)}  ${p.file}`));
