// 为 docs 补齐 charts 类目的骨架。
// 背景：packages/@react-ui/charts 的组件未被 generate-component-docs.js
// （仅扫描 packages/ui）覆盖，因此 9 个 chart 组件缺 index.zh-CN.md 骨架。
// 另：getting-started 是图表入门指南（文档，非组件），单独生成 doc 页。
//
// 用法：node scripts/bootstrap-charts.js

const fs = require('node:fs');
const path = require('node:path');
const { parseMdx, emitDocMode } = require('./migrate-lib');

const DOCS_ROOT = path.join(__dirname, '..');
const COMPONENTS_ROOT = path.join(DOCS_ROOT, 'components');
const WEBSITE_CHARTS = path.join(__dirname, '..', '..', 'website', 'src', 'pages', 'charts');

// kebab -> { Pascal, 中文名 }
const CHARTS = {
  'bars-list': ['BarsList', '条形列表'],
  'bubble-chart': ['BubbleChart', '气泡图'],
  'composite-chart': ['CompositeChart', '组合图'],
  'funnel-chart': ['FunnelChart', '漏斗图'],
  heatmap: ['Heatmap', '热力图'],
  'radial-bar-chart': ['RadialBarChart', '径向柱状图'],
  'sankey-chart': ['SankeyChart', '桑基图'],
  sparkline: ['Sparkline', '迷你走势图'],
  treemap: ['TreeMap', '矩形树图'],
};

function createChartSkeleton(kebab, [pascal, cn]) {
  const dir = path.join(COMPONENTS_ROOT, kebab);
  fs.mkdirSync(path.join(dir, 'demo'), { recursive: true });
  const indexPath = path.join(dir, 'index.zh-CN.md');
  if (fs.existsSync(indexPath)) {
    console.log(`[skip] ${kebab}: 骨架已存在`);
    return;
  }
  const fm = `---
category: Components
title: ${pascal}
subtitle: ${cn}
description: react-ui ${pascal} ${cn}组件。
group:
  title: 图表
  order: 8
---

## 代码演示 {#examples}
`;
  fs.writeFileSync(indexPath, fm, 'utf-8');
  console.log(`[ok] ${kebab}: 骨架已创建 (${pascal} / ${cn})`);
}

function createGettingStartedDoc() {
  const src = path.join(WEBSITE_CHARTS, 'getting-started.mdx');
  if (!fs.existsSync(src)) { console.error('[error] getting-started.mdx 不存在'); return; }
  const content = fs.readFileSync(src, 'utf-8');
  const sections = parseMdx(content, new Set());
  const targetDir = path.join(DOCS_ROOT, 'docs', 'charts');
  fs.mkdirSync(targetDir, { recursive: true });
  const indexPath = path.join(targetDir, 'getting-started.zh-CN.md');
  const res = emitDocMode({
    indexPath,
    name: 'getting-started',
    pascal: 'GettingStarted',
    category: 'Charts',
    sections,
    generatedDemos: [],
    helpersAtEnd: [],
    frontmatter: () => `---\ncategory: Charts\ntitle: 图表入门\nsubtitle: 图表入门\ndescription: react-ui 图表组件入门指南。\n---\n`,
    demoRel: '',
  });
  console.log(res.migrated ? '[ok] getting-started: doc 页已生成' : `[error] getting-started: ${res.reason}`);
}

Object.entries(CHARTS).forEach(([kebab, meta]) => createChartSkeleton(kebab, meta));
createGettingStartedDoc();
