# 全量组件审查计划(第二轮 · 2026-09-17)

> 目标:**每一个源码文件逐个过一遍**,找 bug 与可优化点,产出文件级覆盖台账 + 问题清单。
> 与上一轮(2026-09-13)的关系:上一轮 199 项(P0×12 / P1×69 / P2×118)已全部修复;本轮是**全覆盖复审**——上轮按问题线索横向扫描,本轮按文件纵向逐个过,重点捞上轮漏网的 + 上轮修复引入的回归 + 上轮声明"不修"的边界复核。

---

## 一、范围与规模

### 必审源码(逐文件,建立台账)

| 模块 | 位置 | 文件数 | 行数 | 备注 |
|---|---|---|---|---|
| ui/components | `packages/ui/src/components/*` | 558 | ~51,300 | 129 个组件目录 |
| ui/core | `packages/ui/src/core/*` | 135 | ~6,400 | Box/factory/Portal/Transition/styles-api 等 |
| ui/schedule | `packages/ui/src/schedule/*` | 140 | ~21,800 | 最大单模块,拆 2 批 |
| ui/dates | `packages/ui/src/dates/*` | 155 | ~12,700 | Calendar 系 |
| ui/form | `packages/ui/src/form/*` | 61 | ~3,900 | use-form 系 |
| ui/emotion + colors-generator | `packages/ui/src/{emotion,colors-generator}` | 13 | ~560 | |
| hooks | `packages/hooks/src/*` | 99 | ~9,500 | 86 个 hook |
| pro | `packages/@xiaoye-react/pro/src` | 8 | ~750 | ProTable/PageContainer/SearchFilter |
| 独立小包 | `@xiaoye-react/{carousel,header,notifications,store,demo}` | ~60 | — | carousel 7 / header 11 / notifications 8 / store 2 / demo 32 |
| **合计** | | **~1,450** | **~107,000** | |

### 顺带审(不逐行,按专项扫)

- `apps/docs`、`apps/nas-console`:demo 代码只查「与组件 API 不一致、引用已废弃导出、上一轮修过的 demo 崩溃点回归」。
- `scripts/`、`e2e/`、构建配置:只查影响发布产物正确性的部分(入口、exports、sideEffects、types 路径)。

### 排除

- `*.test.*`、`*.stories.*`、`docs-demos`(2123 文件)、`node_modules`、构建产物。
- 测试文件不逐行审,但**测试与实现的意图冲突**按上轮原则处理:以测试编码的行为为准,争议记入「不修清单」待用户裁决。

---

## 二、审查维度(每文件逐项过,12 条 checklist)

1. **正确性**:逻辑错误、边界条件(空/null/0/负数/NaN/超长/单元素)、off-by-one、除零。
2. **React 语义**:stale closure、effect 依赖缺失/多余、async 竞态与过期响应、key 不稳定、ref 时序、SSR 安全(useLayoutEffect/window 访问)、水合告警。
3. **资源泄漏**:定时器、事件监听、Observer(Resize/Mutation/Intersection)、RAF、body 样式锁(userSelect/overflow)在卸载与中断路径上的清理;pointercancel/touchcancel。
4. **受控/非受控**:useUncontrolled 接线、value/onChange/defaultValue 一致性、受控切换不崩。
5. **交互完整性**:键盘导航(roving tabindex)、焦点管理(focus trap/return)、IME 合成事件、指针命中(pointer-events 链)、触摸滚动、拖拽中断恢复。
6. **a11y**:aria 属性真实生效(不挂死值/不恒 false)、role 正确性、aria-label 中英一致性、键盘可达性、可见性判定(checkVisibility)。
7. **性能**:O(n²) 查找(改 Map/索引)、渲染期重计算未 memo、内联对象/数组进依赖数组导致监听重建、JSON.stringify 比较、context value 身份稳定。
8. **主题/样式**:暗色模式变量选择器方向、CSS 变量拼写与 fallback、getThemeColor 透传、断点排序、RTL(dir/useDirection 接入)。
9. **类型安全**:any 滥用、泛型断链、as 强转掩盖的真实错误、DOM props 透传泄漏(data-* 之外的非法属性)。
10. **API 一致性**:实现与 .types.ts 注释/文档不符、死参数(声明了但没接线)、默认值缺失或与 @default 不符。
11. **浮层系专项**:z-index 层叠、Escape 关闭的嵌套协调、Portal 属性同步、autoUpdate 接线、anchor 漂移。
12. **上一轮修复回归**:凡触及上轮 199 项修复涉及文件的,先读修复 diff,确认新代码没把修复冲掉。

---

## 三、执行方法

```
第 0 步  基线验证:跑全量 11 包测试 + ui/hooks tsc,确认绿色起点
第 1 步  生成台账:脚本枚举全部必审文件(路径+行数),生成 AUDIT-2026-09-17/TRACKER.md,
         每行一个文件,状态机:未审 → 已审(无问题)/ 已审(问题单号)
第 2 步  分批审查(14 批,见下):每批 = 并行只读排查(按组件分包派发)→ 主线逐条复核
         (每条问题必须核到 file:line 的真实代码,拒收推测)→ 写入问题清单
第 3 步  专项横切扫描(第 14 批):SSR/RTL/暗色变量/泄漏 四个维度全库 grep + 抽样核读
第 4 步  汇总报告:按 P0/P1/P2 分级,附证据与修复建议,交用户决策
第 5 步  修复(另行分批,不在本计划内展开):修一批验一批,最后全量 11 包测试 + e2e:interactions
```

**原则(沿用上轮)**:
- 只读审查阶段不改任何文件;问题与修复分离,避免边审边改引入新乱。
- 每条问题附真实 `file:line` + 代码证据;无法确证的记「待核实」不入正式清单。
- 测试显式编码的行为 > 审查者的直觉判断;冲突项进「核实后不修/待裁决」清单。

---

## 四、批次划分(14 批)

> 顺序原则:地基先行(core → 浮层 → 表单 → 数据 → 布局 → 大模块 → hooks → 小包 → 横切)。
> 复杂组件(浮层/Combobox/schedule)问题密度历史上最高,排前并给足复核时间。

| 批次 | 范围 | 规模 | 重点提示 |
|---|---|---|---|
| B01 | `ui/core` 全部(Box/factory/Portal/Transition/FocusTrap/FloatingIndicator/Provider 系/styles-api/store/utils) | 135 文件 | 全库地基,Transition/Portal 缺陷会放大到所有浮层组件 |
| B02 | 浮层弹层系:Modal、ModalBase、Modals、Dialog、Drawer、Popover、ComboboxPopover、HoverCard、Tooltip、Menu、Menubar、Spotlight、FloatingWindow、Overlay、LoadingOverlay、Affix | ~130 文件 | Escape 嵌套、Stack 接线(上轮第⑰批新修,重点回归)、Portal 属性同步 |
| B03 | Combobox 家族:Combobox、Select、MultiSelect、Autocomplete、TagsInput、TreeSelect、Cascader、NativeSelect、PillsInput、Transfer | ~90 文件 | 选项索引性能(上轮改过 Map,查回归)、键盘导航、搜索过滤 O(n) |
| B04 | 输入控件:Input、InputBase、TextInput、Textarea、JsonInput、NumberInput、PasswordInput、MaskInput、PinInput、FileInput、FileButton、ColorInput、ColorPicker | ~80 文件 | IME、光标恢复、pointer-events 命中(e2e 盲区)、受控步进 |
| B05 | 选择/开关:Checkbox、Radio、Switch、Chip、Slider、RangeSlider、AngleSlider、Rating、SegmentedControl、Pagination | ~70 文件 | Rating radio 重构(第⑰批)回归、Slider 键盘/RTL、组级 disabled/size(第⑫批)回归 |
| B06 | 数据展示:Table、DataTable、Tree、Accordion、Collapse、Tabs、Stepper、Timeline、List、Descriptions、DataList、Progress、RingProgress、SemiCircleProgress、Indicator、Skeleton、Spoiler、Watermark、Marquee、RollingNumber、NumberFormatter、Highlight、Mark、Counter 系 | ~110 文件 | DataTable 虚拟测量+展开行(第⑧⑯批)、Tree 遍历性能(第⑱批)、Watermark 瓦片 |
| B07 | 布局与导航:Grid、SimpleGrid、Flex、Stack、Group、Space、Center、Container、AppShell、Burger、NavLink、Anchor、Breadcrumbs、Card、Paper、Image、AspectRatio、BackgroundImage、Avatar、Badge、ThemeIcon、Typography 系、Text、Title、Code、Kbd、Blockquote、Divider、Fieldset、EmptyState、VisuallyHidden、Scroller、ScrollArea、OverflowList、Splitter、MediaQuery、FloatingIndicator | ~100 文件 | Grid 断点排序(第⑱批)、ScrollArea RTL(第③批)、Splitter aria 钳位 |
| B08 | 其余散件:ActionIcon、Button、CloseButton、UnstyledButton、Alert、Notification、Notifications、Carousel、CodeHighlight、ColorSwatch、CopyButton、Dropzone、FileButton 余项、FloatingWindow 余项、Transition 余项、Tree 余项等 B02-B07 未覆盖组件 | 补漏批 | 目标:**components 目录 129 个组件全部出现在 B02-B08 某一批的清单里,台账逐个打钩** |
| B09 | `ui/dates` 之一:Calendar、Day/Month/Year 层、DatePicker/DateTimePicker/TimeInput 系 | ~80 文件 | 钳制逻辑(第⑮⑱批多修)、DST、SSR 水合(data-today) |
| B10 | `ui/dates` 之二:hooks + utils + MiniCalendar/MonthPicker/YearPicker/Calendar 余项 | ~75 文件 | useUncontrolledDates type 切换(第⑱批)、时区工具 |
| B11 | `ui/schedule` 之一:视图渲染(Week/Month/Day/Year/Mobile/Resources 系) | ~80 文件 | 视图级 memo(第⑬批)、事件过滤区间相交(第⑭批)回归 |
| B12 | `ui/schedule` 之二:拖拽 hooks、重复事件/RRule、utils、labels | ~60 文件 | 拖拽中断恢复(第⑤批)、DST 墙钟(第⑬批)、DragContext 死 API(第⑱批) |
| B13 | `ui/form`(use-form 全家)+ `hooks` 包 86 个 hook + `pro` + 独立小包(carousel/header/notifications/store/demo/emotion/colors-generator) | ~260 文件 | form 异步校验 abort(第⑮批)、hooks 防御性 ref 化(第⑰⑱批)回归;小包量小合并过 |
| B14 | 横切专项 + 收尾:① SSR 全扫(useLayoutEffect/window/Date.now 渲染期);② RTL 全扫(getDirection 未接清单);③ 暗色变量全扫(选择器方向/拼写);④ 泄漏全扫(addEventListener/addObserver/setTimeout 配对清理);⑤ apps/demo 抽查;⑥ 上轮 199 项修复清单逐条回归核对;⑦ 台账清零检查(所有文件必须标记完结) | 全库 | grep 命中样本必须人工核读,不凭 grep 结论定性 |

---

## 五、产出物

```
AUDIT-2026-09-17/
├── TRACKER.md          # 文件级台账:~1450 行,每文件一行(路径|行数|批次|状态|问题单号)
├── findings.md         # 正式问题清单,格式见下
└── not-fix-list.md     # 核实后不修/待用户裁决项(附理由)
```

**问题单格式**(沿用上轮,便于对照):

```
[A2-3] P1 · Combobox · 选项过滤在 value 含正则元字符时崩溃
位置:packages/ui/src/components/Combobox/Combobox.tsx:123-130
证据:new RegExp(value) 未转义,value 输入 "(" 即 throw
建议:escapeRegExp 包裹 / 改 indexOf 匹配
回归关联:无(新发现)
```

严重度沿用上轮定义:P0=明确 bug/崩溃/泄漏/数据破坏;P1=特定场景功能错误或明显性能问题;P2=值得做的优化。

---

## 六、验收标准

1. TRACKER.md 中**必审范围 1450 个文件全部标记完结**,无「未审」残留。
2. findings.md 每条问题有可复核的 `file:line` 证据;抽样复核通过率 100%。
3. B14 完成上轮 199 项修复的逐条回归核对,输出「无回归」结论或回归问题单。
4. 报告交用户后,修复批次另行规划(建议沿用上轮模式:用户决策 → 小修/大件分批 → 每批跑对应包测试 + tsc → 最终全量 11 包测试 + `pnpm e2e:interactions`)。

## 七、工作量与执行顺序估计

- 总量 ~107k 行;按每文件平均 1-2 分钟审读 + 复核,并行分派,预计 **14 个工作批**:
  B01→B02→B03→B04→B05→B06→B07→B08→(B09+B10 可并行)→(B11+B12 可并行)→B13→B14。
- schedule(B11/B12,21.8k 行)与 dates(B09/B10,12.7k 行)是体量大头;B13 文件最多(260)但单文件小、上轮已多轮修复,风险低。
- 每批完成后即时更新 TRACKER 并汇总该批问题单,不等全部审完再交——用户可随时叫停或调整方向。
