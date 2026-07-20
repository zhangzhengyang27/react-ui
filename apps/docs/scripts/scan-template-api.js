// 扫描模板化 API 表格（占位属性表）
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const baseDir = path.resolve(__dirname, '..');

// 两种模板：
// 模板 A（input 类）：
//   | value | 当前值（受控） | `string` | — |
//   | defaultValue | 默认值（非受控） | `string` | — |
//   | onChange | 值变化回调 | `(event) => void` | — |
//   | placeholder | 占位提示 | `string` | — |
//   | disabled | 是否禁用 | `boolean` | `false` |
//   | error | 错误信息 | `ReactNode` | — |
//
// 模板 B（通用类）：
//   | size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — |
//   | color | 主题色 | `UIColor` | — |
//   | variant | 视觉变体 | `string` | — |
//   | radius | 圆角 | `UIRadius` | — |
//   | className | 自定义类名 | `string` | — |
//   | style | 自定义样式 | `CSSProperties` | — |

const templateAPattern = /\| value \| 当前值（受控）/;
const templateBPattern = /\| size \| 尺寸 \| `'xs' \\?\| 'sm' \\?\| 'md' \\?\| 'lg' \\?\| 'xl'` \| — \|/;

const files = glob.sync('{components,docs}/**/index.zh-CN.md', { cwd: baseDir, absolute: true });
const templateAFiles = [];
const templateBFiles = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(baseDir, file);
  // 提取 title
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (templateAPattern.test(content)) {
    templateAFiles.push({ file: relPath, title });
  } else if (templateBPattern.test(content)) {
    templateBFiles.push({ file: relPath, title });
  }
});

console.log(`\n=== 模板 A（input 类，6 行 value/defaultValue/onChange/placeholder/disabled/error）===`);
console.log(`共 ${templateAFiles.length} 个：\n`);
templateAFiles.forEach(f => console.log(`  ${f.title.padEnd(20)}  ${f.file}`));

console.log(`\n=== 模板 B（通用类，6 行 size/color/variant/radius/className/style）===`);
console.log(`共 ${templateBFiles.length} 个：\n`);
templateBFiles.forEach(f => console.log(`  ${f.title.padEnd(20)}  ${f.file}`));

console.log(`\n总计: ${templateAFiles.length + templateBFiles.length} 个模板 API 表格`);
