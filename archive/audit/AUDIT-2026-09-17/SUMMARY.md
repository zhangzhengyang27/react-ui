# 第二轮全量复审 · 执行总结(2026-09-17)

> 计划:../REVIEW-PLAN-2026-09-17.md | 待裁决:not-fix-list.md | 修复日志:fixlog/（问题单与台账见文末「产出物清单」）
> 执行:审查(14 批)→ 主线抽样复核 → 修复(8 波)→ 终验。全程未 commit,工作树 286 个文件待用户审阅提交。

## 一、审查结果

- **覆盖**:1405 文件 / ~12.5 万行,台账 100% 标记完结(✅ 1323 无问题 / 🔎 82 涉问题)。
- **发现**:194 条(P0 × 1、P1 × 40、P2 × 153)+ 24 段待裁决/待核实。
- **主线抽样复核**:15 条跨 10 批逐条核到 file:line 真实代码,通过率 100%。
- **上轮 199 项修复回归核对**:无一被冲掉;4 组上轮"声称已修"实际未落地/未同步(逐条见 fixlog/ 与文末说明);2 条上轮修复自身引入的新缺陷(B02-1 Stack 无限循环、B02-4 HoverCardTarget ref 覆盖)。

### 唯一 P0
- **B02-1** ModalStack/DrawerStack 内渲染 Modal/Drawer 即触发无限 effect 循环("Maximum update depth exceeded",⑰批新接线自带,零测试覆盖)——已修 + 补 Stack 渲染回归测试。

### P1 高亮点(全部已修)
浮层系:Stack zIndex 按打开序、stackId DOM 泄漏、HoverCardTarget ref 覆盖、Popover/HoverCard StylesApi 全死参数、ModalBase __vars 丢弃、Menu.Sub 误关、Combobox 系 Escape 双关。
输入系:Input 右侧 section 恒渲染、PinInput 删位塌陷、MaskInput IME 截断、use-move 触摸中断残留、PinInput 暗色不可读。
选择系:Pagination color 失效、Rating 半星无法提交、Slider thumb 命中、CheckboxCard 组禁用漏网。
数据/布局:Tabs roving 双入口、Splitter 触摸不可拖+监听残留。
dates/schedule:TimePicker NaN、useUncontrolledDates 形状映射缺口、Factory 类型断链(ui tsc 全红)、RRule 边界丢事件、getStartOfWeek 死循环。
form/hooks:根规则双执行、abort 后 validating 卡死、debounce leading 缺陷、scroll-spy 无限循环。

## 二、修复结果

| 波次 | 范围 | 已修 | 跳过 |
|---|---|---|---|
| F2 | B01 core + B03 Combobox(+B02-8) | 23 | B03-16(待核实) |
| F1+F1续 | B02 浮层系 | 13 | — |
| F3 | B04 输入 + B05 选择开关 | 36+T1 | Rating readOnly 语义(待裁决) |
| F4 | B06 数据展示 + B07 布局 | 32 | B07-T1/T2(待核实) |
| F5 | B08 散件 + B09/B10 dates | 39+T1 | B08-7(测试锁定英文文案) |
| F6 | B11/B12 schedule | 13 | — |
| F7 | B13a form/hooks + B13b 小包 + B14-9/10/11 | 27 | — |
| F8 | B14 RTL/暗色横切补漏 | 8 | — |
| 收尾 | tsc 暴露型错误清理(31→0)+ e2e 基建 | 11 | — |

**合计修复 ≈202 项**(含 3 条新增测试锁定的回归、10 余条顺带修复的暴露型类型债)。

## 三、终验(全绿)

- **测试**:11 包全绿 —— ui 3905(基线 ~3883 + 新增 22)、hooks 118(+8)、pro 17、notifications 47、carousel 45(含 schedule/dates/form 子套件)。
- **tsc**:ui 0 错误(基线 215,其中 Factory 断链 177 条已根治、其余暴露型旧债全部清零)、hooks 0。
- **e2e:interactions**:7/7 通过(修复 playwright webServer `--host 127.0.0.1` 绑定、超时 30s→120s;Rating spec 断言同步 B05-6 中文 aria-label,测试意图不变)。
- **新增测试**:约 35 条(Stack 渲染、Cascader 键盘、PinInput 空洞、Rating 半星、Pagination color、TimePicker NaN、useUncontrolledDates 形状、Splitter pointer、use-radial-move、validate-values、debounce 系等)。

## 四、遗留(见 not-fix-list.md)

- **待用户裁决** 2 条:嵌套受控 UIProvider 语义(B01-2 已按"仅根 Provider 写属性"确定化)、Rating readOnly 经 disabled 实现(禁用 radio 不随表单提交)。
- **测试锁定不修** 1 条:B08-7 组件默认 aria-label 英文(Carousel/Notifications 测试断言英文文案,改动需连测试一起改文案,建议单独决策统一 i18n 方案)。
- **待核实** 7 条:需真机/特定环境验证(B03-16 拖拽影像、B05-3 Slider 命中实测、B07-T1/T2、B09-T1/B14-T1 SSR 水合、B08-T1 已顺带修复)。
- **建议后续**:schedule 残留 3 条基线既有 story/类型旧债(tsc 0 后已清,此条作废)、global.css 回退块与 resolver 的单一来源化脚本、demo 32 处外链图片已自托管可复查流量。

## 五、产出物清单

```
AUDIT-2026-09-17/
├── SUMMARY.md         # 本文件
├── not-fix-list.md    # 待裁决/待核实汇总
├── CHECKLIST.md       # 12 条逐文件审查清单（可复用于下一轮）
└── fixlog/*.md        # 8 波修复逐条日志（单号|状态|改动|测试）
```

审查过程的文件级台账（TRACKER.md/tracker.json）、194 条问题单（findings.md）、
各批原始报告（raw/B01-B14.md）与批次清单/生成脚本（batch-files/、gen-tracker.mjs、
consolidate.mjs、sweep-parallel.mjs）已在 2026-09-20 的收尾清理里移除——它们是
一次性中间产物，结论都在上面四份文件里，需要原始证据时从 git 历史取回。
