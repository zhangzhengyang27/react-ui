// 校验：<code src> 目标存在性 + demo-registry 指向的 demo 文件存在性
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.name.endsWith('.md')) yield p;
  }
}

// 1) <code src="..."> 目标
const srcRe = /<code\s+src="([^"]+)"/g;
let missingSrc = 0;
for (const file of [...walk('docs'), ...walk('components')]) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = srcRe.exec(text))) {
    const target = path.resolve(path.dirname(file), m[1]);
    if (!fs.existsSync(target)) {
      console.log(`missing <code src> ${file} -> ${m[1]}`);
      missingSrc++;
    }
  }
}
console.log(`<code src> 检查完成，缺失 ${missingSrc} 处`);

// 2) demos/ 目录完整性：无重复 id（小写化后），排除 index 入口
const demosDir = path.join(root, 'demos');
if (fs.existsSync(demosDir)) {
  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(tsx|ts)$/.test(entry.name) && !/^index\.(tsx|ts)$/.test(entry.name)) files.push(p);
    }
  })(demosDir);
  const seen = new Map();
  let dupes = 0;
  for (const f of files) {
    const id = path.relative(demosDir, f).replace(/\.(tsx|ts)$/, '').replace(/\\/g, '/').toLowerCase();
    if (seen.has(id)) {
      console.log(`重复 demo id: ${id} -> ${seen.get(id)} 与 ${path.relative(root, f)}`);
      dupes++;
    } else {
      seen.set(id, path.relative(root, f));
    }
  }
  console.log(`demos/ 共 ${files.length} 个 demo 文件，重复 id ${dupes} 个`);
} else {
  console.log('demos/ 目录不存在');
}
