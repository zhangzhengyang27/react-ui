// 全站内链 vs 路由表比对：扫描 docs/**/*.md 与 .dumi/pages 的内部链接，报告路由表中不存在的目标
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const data = JSON.parse(fs.readFileSync('.dumi/tmp/appData.json', 'utf8'));
const rawRoutes = Object.values(data.routes || {});
const flat = [];
(function walk(list) {
  for (const r of list) {
    if (r.path) flat.push(r.path);
    if (r.children) walk(r.children);
  }
})(rawRoutes);
// appData 路由 path 不带前导斜杠（如 components/button），统一去掉再比
const routeSet = new Set(flat.map((p) => p.replace(/^\/+/, '').replace(/\/+$/, '')).filter(Boolean));

// appData.json 是 dev 元数据，dumi build（mako）不更新它，页面增删后会滞后；
// 并入 dist 预渲染页面得到的路由（构建后最新），两者取并集作为有效路由集
const distDir = path.join(root, 'dist');
if (fs.existsSync(distDir)) {
  (function walkDist(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walkDist(p);
      else if (e.name === 'index.html') {
        const rel = path
          .relative(distDir, p)
          .split(path.sep)
          .join('/')
          .replace(/\/index\.html$/, '');
        if (rel && rel !== '~demos' && !rel.startsWith('~demos/')) routeSet.add(rel);
      }
    }
  })(distDir);
}

// 剔除 fenced code block，避免把示例代码里的 URL 当成页面链接
function stripCodeFences(text) {
  return text.replace(/^```[\s\S]*?^```/gm, '');
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.name.endsWith('.md')) yield p;
  }
}

const mdDirs = ['docs', path.join('.dumi', 'pages')];
const mdFiles = mdDirs.flatMap((d) => (fs.existsSync(d) ? [...walk(d)] : []));

// md frontmatter 与行内的站内链接：[text](/path) 或 <a href="/path">，排除图片
const linkRe = /\[[^\]]*\]\((\/[^)\s]*)(?:\s+"[^"]*")?\)/g;
const hrefRe = /href="(\/[^"]*)"/g;

const dead = [];
const normalize = (p) => p.replace(/\/+$/, '') || '/';

for (const file of mdFiles) {
  const text = stripCodeFences(fs.readFileSync(file, 'utf8'));
  const matches = [];
  let m;
  while ((m = linkRe.exec(text))) matches.push(m[1]);
  while ((m = hrefRe.exec(text))) matches.push(m[1]);
  for (const link of new Set(matches)) {
    const clean = link.split('#')[0].split('?')[0].replace(/^\/+|\/+$/g, '');
    if (!clean) continue;
    if (/\.(png|jpe?g|svg|gif|webp|ico|json|txt)$/.test(clean)) continue;
    if (!routeSet.has(clean)) {
      dead.push({ file: path.relative(root, file), link });
    }
  }
}

console.log(`routes: ${routeSet.size}, md files: ${mdFiles.length}`);
if (dead.length === 0) {
  console.log('全部内链均命中路由表 ✓');
} else {
  console.log(`死链 ${dead.length} 处:`);
  for (const d of dead) console.log(`  ${d.file} -> ${d.link}`);
}
