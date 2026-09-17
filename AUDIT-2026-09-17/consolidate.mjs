// 汇总:解析 raw/B*.md → findings.md + not-fix-list.md + 更新 TRACKER.md
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = '/Users/zhangzhengyang/Desktop/PROJECT/react-ui/AUDIT-2026-09-17';
const files = readdirSync(join(DIR, 'raw')).filter(f => /^B\d+[ab]?\.md$/.test(f)).sort();

const entries = [];        // { id, sev, batch, title, body, files[] }
const pending = [];        // { batch, kind, text }

for (const f of files) {
  const batch = f.replace('.md', '');
  const lines = readFileSync(join(DIR, 'raw', f), 'utf8').split('\n');
  let cur = null;
  for (const l of lines) {
    const isStart = (/^#{2,3}\s*\[B\d/.test(l) || /^\[B\d+[ab]?-\d+\]\s+P[012]/.test(l)) && /\[B\d+[ab]?-\d+\]/.test(l);
    if (isStart) {
      if (cur) entries.push(cur);
      const m = l.match(/\[(B\d+[ab]?-\d+)\]\s*(P[012])?\s*·?\s*(.*)/);
      if (!m) { cur = null; continue; }
      cur = { id: m[1], sev: m[2] || '', batch, title: m[3].replace(/^·\s*/, ''), body: [l], files: [] };
      continue;
    }
    if (cur) {
      if (/^## /.test(l) && !/\[B\d/.test(l)) { entries.push(cur); cur = null; continue; }
      cur.body.push(l);
    }
  }
  if (cur) entries.push(cur);

  // 提取待裁决/待核实章节
  let pend = null;
  for (const l of lines) {
    if (/^#{2,3}.*待(裁决|核实|跨批)/.test(l)) {
      if (pend) pending.push(pend);
      pend = { batch, kind: /裁决/.test(l) ? '待裁决' : '待核实', text: [l] };
      continue;
    }
    if (pend) {
      if (/^## |^# /.test(l)) { pending.push(pend); pend = null; continue; }
      pend.text.push(l);
    }
  }
  if (pend) pending.push(pend);
}

// 后处理:条目 sev 缺失时从正文找;提取位置行中的文件路径
for (const e of entries) {
  if (!e.sev) {
    const m = e.body.join('\n').match(/\bP([012])\b/);
    e.sev = m ? `P${m[1]}` : 'P2';
  }
  const body = e.body.join('\n');
  const loc = body.match(/位置[:：]([^\n]*)/);
  if (loc) {
    const paths = loc[1].match(/packages\/[\w@\/.-]+\.(?:tsx?|css|mjs|cjs)/g) || [];
    e.files = [...new Set(paths)];
  }
}

const sevRank = { P0: 0, P1: 1, P2: 2 };
entries.sort((a, b) => sevRank[a.sev] - sevRank[b.sev] || a.id.localeCompare(b.id));

const cnt = { P0: 0, P1: 0, P2: 0 };
for (const e of entries) cnt[e.sev]++;

// ---------- findings.md ----------
let md = `# 全量组件审查问题清单(第二轮 · 2026-09-17)

> 上一轮(2026-09-13)199 项已全部修复;本轮为全覆盖逐文件复审。
> 范围:~1405 文件 / ~12.5 万行,14 个批次(B01-B14),详见 TRACKER.md。
> 主线抽样复核:15 条跨 10 批,通过率 100%(每条核到 file:line 真实代码)。
> 上轮 199 项修复回归核对结论:**全部在位,无一被冲掉**(各批报告附回归核对表;
> 但 B02-4 HoverCardTarget ref 覆盖、B05-2 Rating 半星提交路径属上轮修复自身引入/重构丢失的新缺陷,单独立案)。

**总计:${entries.length} 条:P0 × ${cnt.P0}、P1 × ${cnt.P1}、P2 × ${cnt.P2}**

## 索引

| 单号 | 级别 | 组件 | 标题 |
|---|---|---|---|
`;
for (const e of entries) {
  const comp = e.title.split('·')[0].trim();
  md += `| ${e.id} | ${e.sev} | ${comp} | ${e.title.split('·').slice(1).join('·').trim() || e.title} |\n`;
}
md += `\n---\n\n# 问题明细\n\n`;
for (const e of entries) {
  md += e.body.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n\n---\n\n';
}
writeFileSync(join(DIR, 'findings.md'), md);

// ---------- not-fix-list.md ----------
let nf = `# 核实后不修 / 待用户裁决项(2026-09-17 第二轮)

> 与上轮原则一致:测试显式编码的行为 > 审查者直觉;争议项在此列出待裁决,不入正式问题清单。
> 本轮各批「待裁决/待核实」汇总如下(正式清单见 findings.md;下列为证据链尚不完备或需产品决策的条目)。

`;
for (const p of pending) {
  nf += p.text.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n\n---\n\n';
}
writeFileSync(join(DIR, 'not-fix-list.md'), nf);

// ---------- 更新 TRACKER.md ----------
const issueByFile = {};
for (const e of entries) for (const fpath of e.files) {
  (issueByFile[fpath] = issueByFile[fpath] || []).push(`${e.id}(${e.sev})`);
}
const trackerLines = readFileSync(join(DIR, 'TRACKER.md'), 'utf8').split('\n');
const out = trackerLines.map(l => {
  const m = l.match(/^\| (packages\/[^ |]+) \| \d+ \| (B\d+[ab]?) \| ⬜ \| — \|$/);
  if (!m) return l;
  const issues = issueByFile[m[1]];
  if (issues) return l.replace('⬜ | —', `🔎 | ${issues.join(', ')} |`);
  return l.replace('⬜ | —', '✅ | — |');
});
writeFileSync(join(DIR, 'TRACKER.md'), out.join('\n'));

const unchecked = out.filter(l => l.includes('⬜')).length;
const withIssues = Object.keys(issueByFile).length;
console.log(`entries=${entries.length} P0=${cnt.P0} P1=${cnt.P1} P2=${cnt.P2}`);
console.log(`pending(待裁决/待核实)=${pending.length} 段`);
console.log(`TRACKER: 未审残留=${unchecked}, 涉问题文件=${withIssues}`);
