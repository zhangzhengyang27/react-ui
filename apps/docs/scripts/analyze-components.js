#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const UI_INDEX = path.resolve(__dirname, '../../../packages/ui/src/components/index.ts');
const COMPONENTS_ROOT = path.resolve(__dirname, '../components');

function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function parseComponents() {
  const content = fs.readFileSync(UI_INDEX, 'utf8');
  const names = [];
  const regex = /export \* from ['"]\.\/([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }
  return names;
}

function main() {
  const reactUiComponents = parseComponents();
  const reactUiSet = new Set(reactUiComponents);
  const reactUiKebabMap = new Map(reactUiComponents.map((n) => [toKebab(n), n]));

  const entries = fs.readdirSync(COMPONENTS_ROOT, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const reactUiDocDirs = [];
  const antdOnlyDirs = [];
  const overlappingDirs = [];
  const utilityDirs = [];
  const missingDocs = [];

  for (const dir of dirs) {
    const hasMd = fs.existsSync(path.join(COMPONENTS_ROOT, dir, 'index.zh-CN.md'));
    const hasSource = fs.existsSync(path.join(COMPONENTS_ROOT, dir, 'index.tsx'))
      || fs.existsSync(path.join(COMPONENTS_ROOT, dir, 'index.ts'));

    if (dir === '_util' || dir === 'style' || dir === 'locale') {
      utilityDirs.push({ dir, hasMd, hasSource });
      continue;
    }

    if (reactUiKebabMap.has(dir)) {
      const componentName = reactUiKebabMap.get(dir);
      if (hasMd) {
        // Check if this is a generated react-ui doc or antd doc
        const mdContent = fs.readFileSync(path.join(COMPONENTS_ROOT, dir, 'index.zh-CN.md'), 'utf8');
        const isReactUiDoc = mdContent.includes('react-ui');
        if (isReactUiDoc) {
          reactUiDocDirs.push({ dir, componentName });
        } else {
          overlappingDirs.push({ dir, componentName, reason: 'has antd docs' });
        }
      } else {
        overlappingDirs.push({ dir, componentName, reason: 'no docs' });
      }
    } else {
      antdOnlyDirs.push({ dir, hasMd, hasSource });
    }
  }

  for (const name of reactUiComponents) {
    const kebab = toKebab(name);
    if (!fs.existsSync(path.join(COMPONENTS_ROOT, kebab, 'index.zh-CN.md'))) {
      missingDocs.push({ name, kebab });
    }
  }

  console.log('=== React-UI components count:', reactUiComponents.length);
  console.log('\n=== React-UI docs (generated or manual):', reactUiDocDirs.length);
  reactUiDocDirs.slice(0, 20).forEach((d) => console.log('  -', d.dir, `(${d.componentName})`));
  if (reactUiDocDirs.length > 20) console.log('  ... and', reactUiDocDirs.length - 20, 'more');

  console.log('\n=== Overlapping (needs react-ui docs):', overlappingDirs.length);
  overlappingDirs.forEach((d) => console.log('  -', d.dir, `(${d.componentName}) - ${d.reason}`));

  console.log('\n=== Antd-only directories (should delete):', antdOnlyDirs.length);
  antdOnlyDirs.forEach((d) => console.log('  -', d.dir, d.hasMd ? '[has md]' : '', d.hasSource ? '[has source]' : ''));

  console.log('\n=== Utility directories (keep for now):', utilityDirs.length);
  utilityDirs.forEach((d) => console.log('  -', d.dir));

  console.log('\n=== Missing react-ui docs:', missingDocs.length);
  missingDocs.forEach((d) => console.log('  -', d.name, `-> ${d.kebab}`));
}

main();
