// 批量修复 docs/ 下 markdown 中的链接路径：
// 将 `](/theming/...)`, `](/hooks/...)`, `](/form/...)`, `](/charts/...)`,
// `](/styles/...)`, `](/guides/...)`, `](/dates/...)`, `](/x/...)`, `](/schedule/...)` 等
// 加上 `/docs` 前缀，避免 404。
//
// 跳过：/components/*、/docs/*、外部链接、纯锚点 #、相对路径
//
// 使用：node scripts/fix-docs-links.js
//
// 规则：dumi 的 docDirs = ['docs']，所以 markdown 中的 `/theming/xxx` 实际访问应改为 `/docs/theming/xxx`。

const fs = require('node:fs');
const path = require('node:path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const COMPONENTS_DIR = path.join(__dirname, '..', 'components');

// 需要加 /docs 前缀的顶级目录（与 docs/ 下子目录一致）
const TOP_LEVEL_DIRS = new Set([
  'theming',
  'hooks',
  'form',
  'charts',
  'styles',
  'guides',
  'dates',
  'x',
  'schedule',
  'react',
]);

/**
 * 处理单行文本：将 `](/xxx/...)` 中的内部链接加上 /docs 前缀
 */
function fixLine(line) {
  // 匹配 markdown 链接 `](path)` 中的 path
  return line.replace(/\]\(([^)]+)\)/g, (full, url) => {
    // 跳过外部链接和锚点
    if (/^(https?:|mailto:|tel:|#)/.test(url)) {
      return full;
    }

    // 解析 path 和 hash
    const match = url.match(/^(\/?)([a-zA-Z0-9_-]+)(\/[^#]*)?(\?.*)?(#.*)?$/);
    if (!match) {
      return full;
    }

    const [, leadingSlash, topDir, rest, query, hash] = match;
    // 只处理顶级目录在白名单内、且原本以 / 开头（绝对路径）的情况
    if (leadingSlash !== '/' || !TOP_LEVEL_DIRS.has(topDir)) {
      return full;
    }

    // 已经是 /docs/ 开头的不处理
    if (url.startsWith('/docs/')) {
      return full;
    }

    const newPath = `/docs/${topDir}${rest || ''}${query || ''}${hash || ''}`;
    return `](${newPath})`;
  });
}

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function main() {
  const files = [...walk(DOCS_DIR), ...walk(COMPONENTS_DIR)];
  let totalFixed = 0;
  let totalFiles = 0;

  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    const lines = src.split('\n');
    let fileChanged = false;
    let fileFixCount = 0;

    const newLines = lines.map((line) => {
      const newLine = fixLine(line);
      if (newLine !== line) {
        fileChanged = true;
        // 统计替换次数（粗略：原行和 newLine 中 ]( 的差值）
        fileFixCount += (newLine.match(/\]\(/g) || []).length - (line.match(/\]\(/g) || []).length;
        return newLine;
      }
      return line;
    });

    if (fileChanged) {
      fs.writeFileSync(file, newLines.join('\n'));
      totalFiles++;
      totalFixed += Math.abs(fileFixCount) || 1;
      console.log(`✓ ${path.relative(DOCS_DIR, file)}`);
    }
  }

  console.log(`\n完成：修改 ${totalFiles} 个文件`);
}

main();
