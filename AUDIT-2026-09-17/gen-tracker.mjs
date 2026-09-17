// 生成审查台账:枚举必审文件 → 按批次分配 → 写 TRACKER.md
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = '/Users/zhangzhengyang/Desktop/PROJECT/react-ui';

function walk(dir, acc = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return acc; }
  for (const e of entries) {
    const p = join(dir, e);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) {
      if (['node_modules', 'dist', 'coverage', 'docs-demos', '.turbo'].includes(e)) continue;
      walk(p, acc);
    } else if (/\.(ts|tsx|cjs|mjs|js|jsx|css)$/.test(e)) {
      if (/\.(test|spec|stories)\.[jt]sx?$/.test(e)) continue;
      if (/\.d\.ts$/.test(e)) continue;
      acc.push(p);
    }
  }
  return acc;
}

function lineCount(p) {
  try { return readFileSync(p, 'utf8').split('\n').length; } catch { return 0; }
}

// ---- 批次分配规则 ----
const B02 = ['Modal','ModalBase','Modals','Dialog','Drawer','Popover','ComboboxPopover','HoverCard','Tooltip','Menu','Menubar','Spotlight','FloatingWindow','Overlay','LoadingOverlay','Affix','DialogBase'];
const B03 = ['Combobox','Select','MultiSelect','Autocomplete','TagsInput','TreeSelect','Cascader','NativeSelect','PillsInput','Transfer','OptionsList','ScrollArea'===''?null:''].filter(Boolean).filter(x=>x!=='');
const B04 = ['Input','InputBase','TextInput','Textarea','JsonInput','NumberInput','PasswordInput','MaskInput','PinInput','FileInput','FileButton','ColorInput','ColorPicker'];
const B05 = ['Checkbox','Radio','Switch','Chip','Slider','RangeSlider','AngleSlider','Rating','SegmentedControl','Pagination'];
const B06 = ['Table','DataTable','Tree','Accordion','Collapse','Tabs','Stepper','Timeline','List','Descriptions','DataList','Progress','RingProgress','SemiCircleProgress','Indicator','Skeleton','Spoiler','Watermark','Marquee','RollingNumber','NumberFormatter','Highlight','Mark','Counter'];
const B07 = ['Grid','SimpleGrid','Flex','Stack','Group','Space','Center','Container','AppShell','Burger','NavLink','Anchor','Breadcrumbs','Card','Paper','Image','AspectRatio','BackgroundImage','Avatar','Badge','ThemeIcon','Typography','Text','Title','Code','Kbd','Blockquote','Divider','Fieldset','EmptyState','VisuallyHidden','Scroller','ScrollArea','OverflowList','Splitter','MediaQuery','FloatingIndicator'];

function componentBatch(comp) {
  if (B02.includes(comp)) return 'B02';
  if (B03.includes(comp)) return 'B03';
  if (B04.includes(comp)) return 'B04';
  if (B05.includes(comp)) return 'B05';
  if (B06.includes(comp)) return 'B06';
  if (B07.includes(comp)) return 'B07';
  return 'B08';
}

// dates 拆分:B09 = components(Calendar 系 + Pickers);B10 = hooks + utils + types + index
function datesBatch(rel) {
  if (rel.startsWith('components/')) return 'B09';
  return 'B10';
}

// schedule 拆分:B11 = components 视图;B12 = hooks/utils/其余
function scheduleBatch(rel) {
  if (rel.startsWith('components/')) return 'B11';
  return 'B12';
}

const rows = [];

function add(files, batchFn) {
  for (const f of files) {
    const rel = relative(ROOT, f);
    rows.push({ rel, lines: lineCount(f), batch: batchFn(f) });
  }
}

// ui/core → B01
add(walk(join(ROOT, 'packages/ui/src/core')), () => 'B01');
// ui/components
{
  const comps = readdirSync(join(ROOT, 'packages/ui/src/components')).filter(d => {
    try { return statSync(join(ROOT, 'packages/ui/src/components', d)).isDirectory(); } catch { return false; }
  });
  for (const c of comps) {
    add(walk(join(ROOT, 'packages/ui/src/components', c)), () => componentBatch(c));
  }
  // components 根下的散文件(如 index.ts)
  for (const f of walk(join(ROOT, 'packages/ui/src/components'))) {
    const rel = relative(join(ROOT, 'packages/ui/src/components'), f);
    if (!rel.includes('/')) rows.push({ rel: relative(ROOT, f), lines: lineCount(f), batch: 'B08' });
  }
}
// ui/dates
add(walk(join(ROOT, 'packages/ui/src/dates')), (f) => datesBatch(relative(join(ROOT, 'packages/ui/src/dates'), f)));
// ui/schedule
add(walk(join(ROOT, 'packages/ui/src/schedule')), (f) => scheduleBatch(relative(join(ROOT, 'packages/ui/src/schedule'), f)));
// ui/form → B13
add(walk(join(ROOT, 'packages/ui/src/form')), () => 'B13');
// ui/emotion + colors-generator → B13
add(walk(join(ROOT, 'packages/ui/src/emotion')), () => 'B13');
add(walk(join(ROOT, 'packages/ui/src/colors-generator')), () => 'B13');
// hooks → B13
add(walk(join(ROOT, 'packages/hooks/src')), () => 'B13');
// pro → B13
add(walk(join(ROOT, 'packages/@xiaoye-react/pro/src')), () => 'B13');
// 独立小包 → B13
for (const pkg of ['carousel','header','notifications','store','demo']) {
  add(walk(join(ROOT, `packages/@xiaoye-react/${pkg}/src`)), () => 'B13');
}

rows.sort((a, b) => a.rel.localeCompare(b.rel));

const byBatch = {};
for (const r of rows) {
  byBatch[r.batch] = byBatch[r.batch] || { files: 0, lines: 0 };
  byBatch[r.batch].files++; byBatch[r.batch].lines += r.lines;
}

mkdirSync(join(ROOT, 'AUDIT-2026-09-17'), { recursive: true });

let md = `# 审查台账(2026-09-17 第二轮全量复审)\n\n> 状态:⬜ 未审 | ✅ 已审(无问题) | 🔎 已审(问题单号见 findings.md)\n> 总计:${rows.length} 文件,${rows.reduce((s, r) => s + r.lines, 0)} 行\n\n| 批次汇总 | 文件数 | 行数 |\n|---|---|---|\n`;
for (const b of Object.keys(byBatch).sort()) md += `| ${b} | ${byBatch[b].files} | ${byBatch[b].lines} |\n`;
md += `\n| 路径 | 行数 | 批次 | 状态 | 问题单号 |\n|---|---|---|---|---|\n`;
for (const r of rows) md += `| ${r.rel} | ${r.lines} | ${r.batch} | ⬜ | — |\n`;
writeFileSync(join(ROOT, 'AUDIT-2026-09-17/TRACKER.md'), md);
// 机器可读副本,便于后续更新状态
writeFileSync(join(ROOT, 'AUDIT-2026-09-17/tracker.json'), JSON.stringify(rows.map(r => ({ ...r, status: 'todo', issues: [] })), null, 0));
console.log(`total ${rows.length} files, ${rows.reduce((s, r) => s + r.lines, 0)} lines`);
for (const b of Object.keys(byBatch).sort()) console.log(`${b}: ${byBatch[b].files} files / ${byBatch[b].lines} lines`);
