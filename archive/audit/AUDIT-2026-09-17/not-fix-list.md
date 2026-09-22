# 核实后不修 / 待用户裁决项(2026-09-17 第二轮)

> 与上轮原则一致:测试显式编码的行为 > 审查者直觉;争议项在此列出待裁决,不入正式问题清单。
> 本轮各批「待裁决/待核实」汇总如下(下列为证据链尚不完备或需产品决策的条目;194 条正式清单 findings.md 已随过程产物清理移除，需要时从 git 历史取回)。

## 待裁决/待核实

1. 【待核实】use-matches.ts:43-46 —— hooks 数量取决于 `Object.keys(theme.breakpoints)`.length。运行时切换到断点数量不同的主题(UIThemeProvider inherit={false} 动态换主题)会改变 hooks 数量触发 React 规则错误。代码注释(41-42 行)声明按"主题 memo 化、断点键序稳定"假设接受此限制;是否需要防御取决于是否支持运行时换断点集的主题。
2. 【待核实】units-converters/px.ts:1-10 + utils/get-breakpoint-value/get-breakpoint-value.ts:6-12 —— `getTransformedScaledValue` 的 `split('*')[0]` 假设 `calc(值 * var(--ui-scale))` 乘数在前;若主题断点手写成 `calc(var(--ui-scale) * 2rem)`,返回原字符串导致 `px()` 走 `includes('var')` 分支返回字符串,`getBreakpointValue` 的 `as number` 断言失真、getSortedBreakpoints 排序 NaN。库内 rem() 只生成乘数在前的形态,仅手写主题可触发,拿不准是否值得防御。
3. 【待裁决】B01-2 的语义前提:嵌套受控 UIProvider 覆盖 colorScheme 是否为受支持场景?若官方语义即"全局唯一",B01-2 降级为"内层不应写属性+dev 告警"的健壮性问题。未发现任何测试编码嵌套 colorScheme 行为(grep 全库测试无相关断言)。

---

## 待裁决

(无——本批未发现"实现与测试意图冲突"的情形;B02-2 的挂载顺序语义无测试锁定,已在问题单回归关联中说明。)

---

## 待核实 / 待跨批次

1. [B02-8 相关] Combobox 系 Escape 双关的根因主文件(Combobox.tsx / ComboboxDropdown.tsx / ComboboxTarget 等)不在 B02 清单内,本批只核实了 ComboboxPopover 侧表面与 data-ui-stop-propagation 全仓分布(grep 证实 Combobox 族零标记);建议负责 Combobox 目录的批次复核并统一修复,避免两批重复改动。
2. [B02-1 验证方式说明] 无限循环结论来自同构模式的独立运行时复现(react@19.2.7,53 次 addModal 后 Maximum update depth exceeded),未在仓库内新增测试文件(只读约束);修复后建议在 Modal/Drawer 各补一条 Stack 渲染测试以锁定。

---

---

## 待裁决

(无——本批未发现"实现与测试意图冲突"项;MultiSelect.test.tsx / TagsInput.test.tsx 均未编码 B03-1/B03-2 所述点击行为,不存在测试背书。)

---

## 待核实

- B03-16:ghost setTimeout(0) 移除在 Firefox/Safari 的拖拽影像表现(jsdom 无法验证,需实机)。

---

## 待裁决

(无——本轮未发现「实现与测试显式意图冲突」需要以测试为准裁决的条目。)

---

## 待核实

1. [B04-T1] ColorInput 下拉打开后按 Escape 不关闭:Popover `opened` 完全受控于内部 state,但未向 Popover 传 `onClose`(ColorInput.tsx:293-304),若 Popover 的 Escape 处理依赖 onClose 回调则 Esc 无效、只能 blur 关闭。与上游 Mantine 同构的可能性大(需读 Popover 实现确认 Escape 是否走 onClose;本批次不含 Popover 文件,未展开)。
2. [B04-T2] MaskInput `separate` 模式下仍执行 `inputRef.current.value = newDisplay`(此时两者相同,Chrome 对同值赋值不重置光标,MaskInput.tsx:379-384)。理论上无害,但 Safari/Firefox 对 `input.value` 同值赋值的光标行为未逐一验证;不确定点:极旧浏览器是否会把光标跳到末尾。
3. [B04-T3] PinInput 粘贴全非法文本会清空已输入内容(handlePaste 过滤后 `updateValue('')`,PinInput.tsx:229-244)。Mantine 的粘贴语义是否保留原值未对照确认,可能是上游同款行为;列出仅供裁决是否要改。

---

## 待核实(2 条)

1. **B05-3 Slider thumb 命中拦截的真实浏览器表现**:静态 CSS 分析(z-index:1 + 无 pointer-events:none + input 无提升)表明手柄区域命中落在装饰 thumb 上,但⑲批曾出现「CSS 链推断过虑、Chromium 实测 auto」的先例(Input section 案例);Slider 无 e2e 覆盖,建议真实浏览器按手柄拖动验证后再定终稿。代码层面 z-index:1 悬叠是事实,修复(thumb pointer-events:none)无风险。
2. **Rating readOnly 时表单不提交值**:readOnly 经 `disabled={readOnly}` 实现(Rating.tsx:217),disabled radio 不参与表单提交——受控/默认值在 readOnly 下随表单丢失。这是 disabled vs readonly 的语义取舍,是否改用 aria-readonly + tabindex=-1 方案需产品裁决,不计入正式问题单。

---

## 待裁决(0 条)

无(本批未发现「实现与测试显式意图冲突」;getPaginationItems 分叉按 API 一致性列入 B05-16,Rating fractions 按⑫批已决策行为的回归列入 B05-2)。

---

### [B06-18] P2 · Watermark · 瓦片宽度用 sans-serif 实测,而 SVG `<text>` 未设 font-family,测量与渲染字体不一致(待核实)

位置:packages/ui/src/components/Watermark/Watermark.tsx:76、101

证据:
```ts
ctx.font = `${fontSize}px sans-serif`                 // 测量字体
...
`<text ... font-size="${fontSize}" fill="${color}" transform="rotate(...)">`   // 无 font-family
```
data-URL 的 SVG 不继承页面字体,`<text>` 未声明 font-family 时按浏览器初始字体(多为 serif 系)渲染;canvas 以 sans-serif 实测。serif/CJK 衬线字形普遍更宽时实测偏窄,长文本仍可能在瓦片内被裁切(第⑯批修复的残缺形态,程度被 `+ gap[0]` 余量缓解)。不确定性:各浏览器默认字体不同,实际偏差需实测确认,故标「待核实」。

建议:SVG `<text>` 显式 `font-family="sans-serif"`(与测量一致),或测量时同步指定。

回归关联:上轮第⑯批相关(修复本体在;此为其残余边界)。

---

---

## 三、待裁决

无(本批未发现"实现与测试意图冲突"的情形;Tabs 现有测试均传 defaultValue,未编码 B06-1 场景)。

---

## 四、待核实

1. **B06-18 Watermark 测量/渲染字体不一致**:代码事实成立(canvas 用 sans-serif、SVG text 无 font-family),但"是否仍会裁切"取决于浏览器默认字体与文本字形,建议实机渲染确认。
2. **B06-3 filterTreeData 语义**(附于问题单内):两种分支行为矛盾是客观事实,是否属有意"命中即展示子树"设计需产品裁决。

---

---

## 待核实

```
[B07-T1] Splitter 键盘方向与 WAI-ARIA APG Window Splitter 模式相反
位置:packages/ui/src/components/Splitter/SplitterResizer/SplitterResizer.tsx:139-160
证据:horizontal 分栏(把手为竖直条)绑定 ArrowLeft/ArrowRight,vertical 分栏绑定 ArrowUp/ArrowDown;ARIA APG 的 window splitter 模式规定竖直把手(面板左右排列)用 Up/Down 调整、水平把手用 Left/Right。当前实现语义自洽("正向键使 index 侧增大",注释明确)且 aria-orientation 也按把手自身方向取值,与 VS Code 等桌面软件一致,但与 APG 教科书模式相反。
不确定点:项目是否以 APG 为键盘规范基准(测试未覆盖键位选择)。若以 APG 为准,建议同时支持两组方向键(ArrowLeft/Right 与 Up/Down 映射到同一 delta)以两端兼容。
```

```
[B07-T2] Text truncate='start' 的 direction:rtl hack 在 RTL 文档中截断侧反转
位置:packages/ui/src/components/Text/Text.module.css:11-20
证据:
    &:where([data-truncate]) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    &:where([data-truncate='start']) { direction: rtl; text-align: end; }
该 hack 依赖 LTR 环境:direction:rtl 使 ellipsis 落在行的 inline end(视觉左),实现"从头截断、显示尾部"。当文档本身为 RTL 时,容器 direction 已是 rtl,hack 不再反转任何东西,ellipsis 仍落在视觉左端(= RTL 的 inline end),截掉的是尾部——与 truncate='start'(应截视觉右端 start)语义相反,RTL 页面中显示的是被截断的前缀而非后缀。
不确定点:RTL + truncate='start' 的期望视觉行为未在测试/文档中显式编码;若团队认定该组合以拉丁语义为准则现状可接受。建议 RTL 时反向应用 direction:ltr,并用真实浏览器核对两侧 ellipsis 位置。
```

---

---

## 待核实(1 条)

[B08-T1] 待核实 · Portal · 共享节点上多个"带属性"实例互相覆盖,卸载不恢复
位置:components/Portal/Portal.tsx:70-81、129-137
不确定点:`reuseTargetNode=true`(默认)时所有 Portal 实例共用一个 body 节点;⑦批修复只让"无属性实例"跳过同步,但两个**都带** className/style 的实例先后挂载时,后者的 `syncPortalNodeAttrs` 会整体重置前者写入的属性(整体覆盖式同步),先卸载也不恢复——Modal/Popover 同时传 className 给 Portal 的实际使用面未核实(需要确认库内各浮层组件是否真的向 Portal 传 className/style)。若确有场景,建议共享节点上按实例维护属性集合或属性实例强制独立节点。
回归关联:上轮第⑦批修复未被冲掉(127-137 行守卫在),本条是其未覆盖的剩余面。

---

## 待裁决

无(本批未发现"实现与测试意图冲突"的情形)。

---

---

## 待核实(不计入正式问题单)

### [B09-T1] Month/YearsList/MonthsList · tab-order 计算含 `dayjs()` 当前时刻,SSR 跨日/跨时区可能产生 tabIndex 属性级水合差异

位置:packages/ui/src/dates/components/Month/get-date-in-tab-order/get-date-in-tab-order.ts:44、YearsList/get-year-in-tab-order/get-year-in-tab-order.ts:32、MonthsList/get-month-in-tab-order/get-month-in-tab-order.ts:32;消费点 Month.tsx:298(tabIndex)

证据:
```ts
const currentDate = enabledDates.find((date) => dayjs().isSame(date, 'date'));
```
Day 的 `data-today` 已加 suppressHydrationWarning(⑱ 批),但同源的时间依赖还决定每个 Day/PickerControl 的 `tabIndex={__preventFocus || !isDateInTabOrder ? -1 : 0}`。服务器与客户端时钟跨日(或部署在 UTC 而用户在 UTC+8 的午夜前后)时,tabIndex 服务端/客户端不一致。不确定点:当前 React 版本对属性级 hydration mismatch 的具体告警/静默 patch 策略,以及该库实际 SSR 场景占比——若确认有 SSR 用例,建议对 Month 表格根加 suppressHydrationWarning 或将 tab-order 判定挪到 effect 后重渲染。

---

## 待裁决

无(本批未发现实现与测试意图冲突的条目;TimePicker 粘贴/钳制相关测试均只覆盖合法与 withSeconds=true 路径,不与新问题单冲突)。

---

---

## 待裁决

无。(注:B10-3 内嵌一个契约级待核实点,已在问题单中标注,不影响成立性——链条本身可复现验证。)

---

## 待核实(不进正式问题单)

1. **ResourcesMonthView 本地 `isMultiDayEvent` 与 utils 版本语义不一致**(`ResourcesMonthView.tsx:300-302`):本地版不做「结束恰为 00:00 视作前一日」归一(utils `is-multiday-event.ts:9-12` 做),导致 `Mon 22:00 → Tue 00:00` 这类事件在此视图走「分段条」渲染路径而非「单日单元格」路径。核对渲染两路径输出(位置/尺寸/clip 模板)后认为视觉等价(day 桶按 `eventEnd.isAfter(dayStart)` 仍只落入周一,分段退化为单日条),未见用户可见差异;但与 ResourcesWeekView 显式复用 `isMultidayEvent`(`get-resources-week-view-events.ts:103-104`)不一致,建议统一时顺带确认。不确定点:分段与单元格两路径的 CSS(`resourcesMonthViewAllDayEvent` 相关样式)是否在极端高度下有细微差异,未逐像素验证。

---

## 待核实(不进正式问题单)

1. **handleResourcesGridKeyDown 的 RTL 方向语义**(`utils/handle-resources-grid-key-down/handle-resources-grid-key-down.ts:54-66`):ArrowRight 恒映射 slotIndex+1、ArrowLeft 恒 −1,无方向参数;ResourcesDayView/ResourcesWeekView 自身也未接 useDirection。若资源网格未来要求支持 RTL(CSS 逻辑属性翻转视觉顺序),方向键会与视觉相反;当前组件整体未声明 RTL 支持,不确定是否属预期范围,待产品/维护者裁决。
2. **useSlotDragSelect 的指针卫生**(`hooks/use-slot-drag-select.ts:26-35`):`handleSlotPointerDown` 未过滤 `e.button`(右键/中键按下也会开启框选)、未校验 `isPrimary`(多指触控第二指会重置选区起点)。实际后果轻微(右键拖选提交一次 onDragEnd;contextmenu 照常弹出),且视图层可能自有守卫,拿不准是否按问题立案。

---

## 待裁决

无(未发现「实现与测试意图冲突」需要以测试为准裁决的条目;B13a-6 为待核实而非待裁决,现有测试未覆盖该场景)。

---

## 待裁决

无。(审查中核对过的两处「实现与上游参考一致性」均按参考实现处理,未进问题单:@xiaoye-react/carousel 的 Transition nodeRef 内联对象写法、colors-generator 对无彩色输入的固有行为,均与上游 Mantine/embla 参考实现逐字一致。)

---

## 待核实

无。

---

---

### 待核实

**[B14-T1] MonthYearSelect / Schedule / ResourcesSchedule · 渲染期 `new Date()` 决定年份列表与默认锚点日,跨日/跨年/跨时区可能属性级水合差异(与 B09-T1 同类,schedule 侧补漏)**

位置:packages/ui/src/schedule/components/ScheduleHeader/MonthYearSelect/MonthYearSelect.tsx:149;packages/ui/src/schedule/components/Schedule/Schedule.tsx:309;packages/ui/src/schedule/components/ResourcesSchedule/ResourcesSchedule.tsx:281

证据(MonthYearSelect.tsx):
```tsx
const today = new Date();                                   // L149:渲染期求值
const ctx = useDatesContext();
const _startYear = startYear ?? today.getFullYear() - 5;    // 年份列表内容随当前年份变化
const _endYear = endYear ?? today.getFullYear() + 5;
...
tabIndex={hasActiveYear ? (year === yearValue ? 0 : -1) : index === 0 ? 0 : -1}
```
`today` 直接决定渲染出的年份按钮集合(`getYearsList`)、各自 `aria-label` 与 `tabIndex`;Schedule/ResourcesSchedule 的 `defaultValue: defaultDate ?? new Date()` 在渲染期求值并作为整个视图网格的锚点日。SSR 时服务器与客户端时钟跨年(或部署 UTC 而用户 UTC+8 的午夜前后)时,年份列表/网格文本/roving tabIndex 服务端与客户端不一致,产生水合差异(React 19 会告警并客户端重渲染,不崩溃)。不确定点与 B09-T1 相同:该库 schedule 的实际 SSR 场景占比,以及 React 19 对此类属性级 mismatch 的最终策略。附带说明:`new Date()` 每次渲染都求值(仅首次被 useUncontrolled 采用),与 Calendar 的 ref 惰性方案(⑮⑱修复)不一致。建议:startYear/endYear 依赖与默认锚点日改 ref 惰性求值(effect 后渲染),或对受影响根节点 suppressHydrationWarning。

### 扫描过但确认安全的样本(证明扫过)

- **useLayoutEffect**:唯二直接使用者 Combobox.tsx:237(effect 体仅对内部选项注册表按 `compareDocumentPosition` 排序后 setState,水合后执行、无 DOM 属性级副作用,React 18+ SSR 期静默 no-op,安全)与 form/actions/actions.ts:32(自带 typeof window 守卫的 isomorphic 包装);Menubar.tsx:1 为死导入(仅 import 未调用);use-isomorphic-effect.ts 本身即 SSR 守卫包装。
- **hooks 全量核过均安全**:use-os(getOS 有 typeof window 守卫)、use-network(typeof navigator + effect)、use-viewport-size(初始 {0,0},effect 内取值)、use-media-query(getInitialValue 有 typeof window 守卫)、use-orientation(同)、use-local-storage/create-storage(try/catch + getInitialValueInEffect 默认 true)、use-id(基于 React 19 useReactId,SSR 稳定;random-id 工具无渲染期消费者)。
- **组件内 document/window 访问逐条核过均在 effect/事件回调/守卫内**:Popover.tsx:234-237(effect + typeof document)、Tooltip.tsx:215-224(effect)、ViewSelect.tsx:99(effect)、ScrollAreaScrollbarY.tsx:17(effect)、Watermark.tsx:70(measureTextWidth 有 typeof document 守卫)、DirectionProvider.tsx:47-71(回调/effect)、UIProvider.tsx:34-37(getSystemColorScheme 有 try/catch,SSR 落 'light')、ColorSchemeScript.tsx(仅生成脚本字符串)、Portal.tsx(B02 已核)。
- **Math.random()**:notifications.store.ts:58 randomId 仅在 `notification()` 事件 API 调用链内使用,非渲染期;hooks/utils/random-id 无库内消费者。
- **刻意 dir 固定不算问题**:TimePicker.tsx:447(时间字段 dir="ltr")、CodeHighlight.tsx:251/276(代码块 dir="ltr")。
- CurrentTimeIndicator SSR mounted 门控正常(B11 已核)。

---

---


---

## 用户裁决结果(2026-09-17 交互确认)

- **B08-7 aria-label 中英混杂**:裁决「统一中文+改测试」——已执行(ui Notification '关闭通知'、Carousel 四处中文、对应测试断言同步)。
- **Rating readOnly 语义**:裁决「实现真 readonly」——已执行(radio 保持启用随表单提交,指针经 [data-readonly] pointer-events 拦截、键盘经 onKeyDown 拦截、aria-readonly 标注;补表单提交用例)。
- **嵌套受控 UIProvider colorScheme**:裁决「仅根 Provider 写属性」——与已落地实现一致,裁决关闭。
