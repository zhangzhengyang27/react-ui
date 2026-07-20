#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const COMPONENTS_ROOT = path.resolve(__dirname, '../components');

// HTML / 内置标签，不需要导入
const HTML_TAGS = new Set([
  'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo','blockquote','body','br','button','canvas','caption','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','math','menu','meta','meter','nav','noscript','object','ol','optgroup','option','output','p','picture','pre','progress','q','rp','rt','ruby','s','samp','script','search','section','select','slot','small','source','span','strong','style','sub','summary','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','u','ul','var','video','wbr',
  // 常见的低ercase html 属性/关键字
  'htmlFor','key','ref','dangerouslySetInnerHTML','style','className','onClick','onChange','onFocus','onBlur','onMouseEnter','onMouseLeave','onSubmit'
]);

function extractJsxTags(source) {
  const tags = new Set();
  // 匹配 <ComponentName 或 <Component.Name 或 </ComponentName>
  const regex = /<\/?([A-Z][a-zA-Z0-9]*)(?:\.[A-Z][a-zA-Z0-9]*)?/g;
  let m;
  while ((m = regex.exec(source)) !== null) {
    tags.add(m[1]);
  }
  return tags;
}

function extractImports(source) {
  const imports = new Set();
  const regex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]@react-ui\/ui['"]/g;
  let m;
  while ((m = regex.exec(source)) !== null) {
    m[1].split(',').forEach((name) => imports.add(name.trim().split(/\s+as\s+/)[0]));
  }
  return imports;
}

function main() {
  const dirs = fs
    .readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name !== '_util')
    .map((e) => e.name)
    .sort();

  let issues = 0;
  for (const dir of dirs) {
    const demoPath = path.join(COMPONENTS_ROOT, dir, 'demo', 'basic.tsx');
    if (!fs.existsSync(demoPath)) continue;
    const source = fs.readFileSync(demoPath, 'utf8');
    const tags = extractJsxTags(source);
    const imports = extractImports(source);
    const missing = [...tags].filter((t) => t !== 'DemoWrap' && !HTML_TAGS.has(t) && !imports.has(t));
    if (missing.length) {
      issues++;
      console.log(`${dir}: missing imports [${missing.join(', ')}]`);
    }
  }
  console.log(`\nDone. ${issues} demos have missing imports.`);
}

main();
