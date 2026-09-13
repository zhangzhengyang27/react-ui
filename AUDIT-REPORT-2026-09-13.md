# 组件库 Bug 与优化排查报告（2026-09-13）

> **修复进度（2026-09-13）**：
> ① 第一批 12 个 P0 已全部修复并通过测试（ui 526 项、form 409 项、schedule 1348 项、notifications 47 项；类型检查通过）。另同步修正了上一轮遗留的 Select/MultiSelect 清除按钮中文 aria-label 与测试断言不一致的问题。
> ② 第二批（hooks 源头 + a11y 断链 + 性能热点）已完成：use-uncontrolled setter 稳定化、use-mask 光标恢复与 IME 守卫、use-effect-event/use-callback-ref 改 useInsertionEffect；InputBase aria-describedby 断链、Tabs tab/panel aria 关联、Popover/HoverCard targetId 挂载覆盖（顺带修复 HoverCardTarget 丢弃 child 事件处理器）；TreeSelect 勾选态 O(n²)、DataTable 全选判定 O(n×m)、schedule Week/Month/DayView 布局管线未 memo。验证：ui 526、hooks 110、schedule 1224、form 409、dates 1433 全部通过，ui/hooks tsc 通过。
> ③ 第三批（主题/样式一致性 + RTL）已完成：Paper/Card 暗色模式变量选择器写反；Card.bg/Chip.color/Checkbox.iconColor 统一走 getThemeColor；Box hiddenFrom/visibleFrom 在 global.css 补齐默认断点规则；Grid grow 改为 flex 布局实现（flex-grow 对 grid item 无效）；ScrollArea 横向滚动条与 Splitter 接入 useDirection（RTL 拖拽/滚轮/方向键语义修正）。验证：ui 526 全部通过，tsc 通过。
> ④ 第四批（性能尾巴）已完成：Combobox 选项 index 改为 context 级 Map 查表（渲染 O(n²)→O(n)）；dates Month 网格 dates/dateInTabOrder memo；schedule dragover 浅比较 bail-out + dragContextValue memo + isDropTarget 弃用 JSON.stringify 改浅比较。验证：ui 526、dates 1433、schedule 1348 全部通过。
> ⑤ 第五批（P1 交互长尾）已完成：Menu 悬停定时器过期闭包双触发（open/close 改读 openedRef）；ScheduleEvent onDragEnd 双触发（drop 后的 dragend 守卫 + 卸载兜底分离）；schedule 三个拖拽 hook 补 pointercancel（触摸中断不再卡死 body userSelect）；Autocomplete/NativeSelect 补 invalid 透传（aria-invalid 与错误样式对齐 Select）；MultiSelect 不再吞掉消费者 onKeyDown。验证：ui 526、schedule 1348 全部通过，tsc 通过。
> ⑥ 第六批（数据完整性小修）已完成：Upload addFiles 改基于最新 filesRef 提交 + submitPending 读 ref（并发 drop/删除不再丢文件）；CodeHighlightTabs 空数组不再把 activeTab 钳到 -1；shiki-adapter 语言缺失时同步降级为纯文本（不再渲染期崩溃）；ConfirmModal 默认中文文案兜底；DropzoneFullScreen 计数器钳非负（非文件拖拽不再打成负数致遮罩闪烁）；MIME_TYPES.rar 改 application/vnd.rar；use-clipboard 成功时清除残留 error；Carousel 键盘处理补 withKeyboardEvents 依赖 + 输入框/可编辑区域守卫。验证：dropzone 61、modals 7、code-highlight 70、carousel 45、hooks 110 全部通过。
> ⑦ 第七批（浮层/弹层类）已完成：Modal/Dialog 补 returnFocus:true 默认值（与 Drawer/ModalRoot/Popover 对齐）；Drawer 用户 transitionProps 与方向过渡合并（与 DrawerRoot 一致，不再丢失 slide-*）；Portal 共享节点上无属性实例跳过属性同步（不再抹掉先前实例的 className/style/id）；use-collapse/use-horizontal-collapse 修复 duration=0 卡死（0ms 无 transitionend，直接落终态）+ transitionend 丢失超时兜底（隐藏容器内展开不再永久收起）；Modal+Popover 嵌套 Escape 双关修复（use-modal 改 closest 查找 stop-propagation 标记 + PopoverDropdown/PopoverTarget 打开期间标记 + Popover 补 window 级 Escape 关闭）。验证：ui 526、hooks 110 全部通过，tsc 通过。
> ⑧ 第八批（数据展示与边界）已完成：DataTable 展开行纳入虚拟测量（主行+展开行合成高度上报 resizeItem，收起时恢复）；GridCol span/offset 收敛（不再产生隐式列溢出与非法 span 0）；Pagination NaN 防御（usePagination 归一化 + 组件级 !(total>0) 守卫）+ First/Previous 按 startValue/endValue 判禁用；Highlight 正则补 gi 标志与大小写判定对齐；Table 空 body 保留 caption/head；Breadcrumbs 不再覆盖子项内联样式；Accordion 泛型组件接 React 19 props ref；Stepper 内容面板改用独立 stepContent 样式（不再复用 flex 行布局的 stepBody）。验证：ui 526 全部通过，tsc 通过（hooks 重建后）。
> ⑨ 第九批（小修快清）已完成：use-focus-trap/scope-tab 拦截 body 漂移的 Tab（点击 Modal 非焦点区后 Tab 不再逃逸到背景页，仅拦 body/documentElement 保住多陷阱互不干扰）；toTimeString 把 hours=24 钳到 23:59:59（修复 endTime '24:00' 生成 Safari/Firefox 解析不了的 "24:00:00"，覆盖 get-day-time-intervals 与两个 resize hook）；ScheduleHeader 删除调试遗留 --test 变量；demo 重复 lines 键去重；demo ConfiguratorSizeControl 非刻度值回落 md 不再崩溃；tiptap sink/lift 文案互换修正（sink=加深，对齐 IndentIncrease 图标）；HeaderControls 未传 githubLink 不再渲染无 href 死链接。**核实后不修**：「无位移把手点击置 justResized 吞点击」——两条测试显式编码了该行为（把手点击不算事件点击），以测试意图为准。验证：ui 526、schedule 1348、hooks 110 全部通过。
> ⑩ 第十批（a11y 收尾）已完成：Menu.Sub 键盘支持（Sub.Target 的 ArrowRight/Enter/Space 打开子菜单并聚焦第一项、ArrowLeft 关闭、Escape 只关子菜单；Sub.Item 点击切换子菜单而不再关闭整个父菜单；Trigger 补 data-sub-menu-item）；Popover window Escape 监听补 defaultPrevented 守卫（配合内层 preventDefault 协调）；Tabs 无激活值时把 tablist 第一个未禁用 tab 设为可聚焦（roving tabindex 不再整体失效）；use-scroller 拖拽后 click 抑制改为 document 捕获层一次性监听（容器外释放不再残留监听吞掉后续点击）。验证：ui 526、hooks 110 全部通过，tsc 通过。
> ⑪ 第十一批（剩余 P1 + 性能尾巴）已完成：TreeSelect 异步数据首次非空时补一次初始展开（defaultExpandAll/defaultExpandedValues 不再被挂载时空数据吞掉）；ComboboxPopover 内嵌搜索框接入 onTargetKeyDown（ArrowUp/Down/Enter/Escape/Home/End 键盘导航，searchable 模式不再只能鼠标选择）；MultiSelect 选中值查找 flatData.find→Map 索引；ui Carousel onSlideChange 走 ref（embla select 监听不再随内联回调每次父渲染 off/on）；CodeHighlight 同步高亮按 code/language/colorScheme memo（父级重渲染不再重跑 CPU 高亮）；SpotlightActionsList 注册 effect 补 listId/store 依赖（动态改 id 后键盘选择不再失灵）。验证：ui 526、code-highlight 70、spotlight 25 全部通过，tsc 通过。
> ⑫ 第十二批（按用户决策：小修部分）已完成：
> - Group 组级 disabled/size（明确缺陷直接修）：RadioGroup/SwitchGroup/ChipGroup 的 context 补传 disabled/size 并在 Radio/Switch/Chip/RadioCard 消费兜底（自身 prop 优先）；三个子组件 defaultProps 不再写死 size/disabled（否则组级永远无法生效）；同步修复 Switch 组内 input 缺 name/value（表单提交丢数据）、Switch/Chip 组路径提前 return 丢自身 onChange、三个 Group 带 label 时 .root 双挂 InputWrapper（对齐 CheckboxGroup）。
> - Rating fractions（决策：实现半星）：按指针在星内的水平位置计算分数（fractions=2 即半星，fractions=1 退化为整星），mousemove 实时预览，键盘保持整星步进。
> - MaskInput（决策：实现死参数）：补焦点态，alwaysShowMask=true 或（showMaskOnFocus 且聚焦）时显示占位掩码，空值未聚焦显示空；消费者 onFocus/onBlur 合并透传；测试更新为文档语义并补 2 个新用例。
> - List listStyleType（决策：实现）：root 挂 --list-style-type 变量，生效时 .item 切回 list-item 显示原生 marker 并隐藏自绘标记。
> - Textarea/JsonInput minRows/maxRows（决策：实现）：field-sizing: content（渐进增强）+ 行高×行数的 min/max-height；rows 回退为 minRows；新 fieldSizing 样式名。
> - useSplitter 拖拽路径 stale closure：核实为 B2-1 setter 稳定化已顺带覆盖（setCurrentSizes 稳定且经 onChangeRef 转发最新回调），无需改动。
> 验证：ui 528（含 2 个新用例）全部通过，tsc 通过。
> ⑬ 第十三批（按用户决策：大件部分）已完成：
> - expandRecurringEvents RRuleSet + tzid（决策：完整方案）：tzid 取运行时时区（naive 事件时间即该时区墙钟），dtstart/exdate 按 rrule tzid 模式以「墙钟分量的 UTC-naive Date」构造，exdate 走 RRuleSet；结果读 UTC 分量还原墙钟串（tzid=本地时 rezone 为恒等映射，用 dayjs(instant) 会把偏移重复加回）。全链路无时区偏移参与运算，跨 DST 墙钟不再漂移、exdate/override 的 recurrenceId 精确匹配；补跨美国 DST 边界的墙钟保持回归测试。
> - schedule 视图级 memo（决策：做）：WeekView slots useMemo；handleTimeSlotClick/handleSlotKeyDown/handleFirstSlotArrowUp/handleDaySlotsDragOver/handleDaySlotsDrop 全部 useCallback 稳定化；常量 firstSlotIndex 提升为模块级 FIRST_SLOT_INDEX；WeekViewDay 内抽出 WeekViewTimeSlot（React.memo + 自定义比较器忽略 getStyles/getTimeSlotProps 的每渲染新身份）。拖拽期间 dragover 触发的重渲染中，未变化的槽位单元格（绝大多数）直接跳过协调。
> 验证：schedule 1349（含 1 个新用例）全部通过。
> ⑭ 第十四批（schedule 视图组 P1）已完成：MonthView 事件预过滤 || 误用改标准区间相交（此前恒真、过滤完全失效，范围外重复 id 也会误触发崩溃）；DayView 多日事件续接日纳入——去掉 background 限制，普通事件续接日裁剪到视图日后进入常规定位（getDayPosition 以事件自身起始日为锚，不裁剪会错位）；MobileMonthView/YearView 过滤改为事件区间与显示月/年相交（跨日事件续接日不再缺失）；ResourcesWeekView 只对普通事件写 assignedIds（多日 background 事件不再只在开始日渲染）；ResourcesMonthView"今天"按钮经 ref 调最新 scrollToDay（跨月点击滚动失效修复）；MobileMonthView firstDayPosition 改为渲染期重算（对齐 MonthView，月份切换后 roving tabindex 不再落在隐藏单元格）。验证：schedule 1349 全部通过。

- 范围：`packages/ui`（125 组件）、`@xiaoye-react/form`、`pro`、`dates`、`schedule`、`hooks`、`spotlight/notifications/modals/nprogress/store/emotion/carousel/dropzone/tiptap/code-highlight/header/demo` 等全部源码（不含 test/story），约 10 万行。
- 方法：18 路只读深度排查（未修改任何文件），每条结论附真实 file:line 与代码证据；关键 P0 已人工复核/沙箱模拟复现（MaskInput 乱序、form 重复提交、setPath 崩溃、Rating 清零、NumberInput 步进、Schedule 双触发均核实成立）。
- 结论规模：**P0 × 12、P1 × 69、P2 × 118，合计 199 条**。

严重度定义：P0=明确 bug/崩溃/内存泄漏/数据破坏；P1=特定场景功能错误或明显性能问题；P2=值得做的优化。

---

## 一、P0（12 条，建议立即修复）

| # | 组件 | 问题 | 位置 |
|---|------|------|------|
| 1 | MaskInput | 光标恢复算法忽略字面量，连续键入字符乱序（`000-000` 输入 123456 得到 `123-654`），静默数据损坏 | `packages/ui/src/components/MaskInput/MaskInput.tsx:373-384` |
| 2 | NumberInput | 步进按钮继承 Input 右侧 section `pointer-events:none`，鼠标/触摸完全点不动（测试 fireEvent.click 绕过命中测试所以没发现） | `NumberInput.tsx:322-331`、根因 `Input.tsx:166` + `Input.module.css:275,290` |
| 3 | FileInput | clearable 清除按钮同样点不动，且点击穿透到底层 button 会误开文件选择框 | `FileInput.tsx:184-185`(经 :209 作 rightSection) |
| 4 | Rating | `clearable` 开启时鼠标点击任何星都清零——click 前 mouseenter 已把 hover 值灌进 `roundedValue`，`nextValue === roundedValue` 恒真 | `Rating.tsx:130,137` |
| 5 | Tooltip.Floating | 光标跟随定位把「相对目标的偏移」当「文档绝对坐标」用，目标不在视口原点或有滚动时 tooltip 完全错位 | `Tooltip/TooltipFloating.tsx:143-144,150,185-186` |
| 6 | Drawer | DrawerContent 内联定义 `Scroll` 组件（默认分支每次渲染都是新组件类型），内容子树整体重挂载：输入框焦点丢失、非受控表单值/滚动位置重置 | `Drawer/DrawerContent.tsx:28-31` |
| 7 | RadioCard | 在 `Radio.Group` 内完全失效——不读 RadioGroupContext，点击永远不更新组状态（文档化用法静默坏） | `Radio/RadioCard.tsx:72` |
| 8 | form/use-form | 异步校验期间二次提交时 `handleSubmit` 执行两次（重复提交/数据破坏），代际比对被每次提交覆写 | `packages/@xiaoye-react/form/src/use-form.ts:360`(配 221-225,386-394) |
| 9 | form/setPath | 嵌套路径中间段不存在时抛 TypeError 崩溃：`setFieldValue('user.name', v)` 而 values 无 `user` 键即崩，经 setFieldValue/resetField 等公共 API 均可触发 | `form/src/paths/set-path.ts:18-28` |
| 10 | Schedule | 每次切换视图 `onViewChange` 触发两次（`useUncontrolled` 内部 onChange + `handleViewChange` 显式调用） | `schedule/src/components/Schedule/Schedule.tsx:280-284,296-299` |
| 11 | Schedule | 结束时间恰为次日 00:00:00 的事件（`22:00→00:00`）被 `isEventInTimeRange` 算成 0 分钟，从 Day/Week 视图整体过滤消失 | `schedule/src/utils/is-event-in-time-range/is-event-in-time-range.ts:38-40` |
| 12 | Notifications | 挂载时两个 effect 各调度一个 autoClose timer（幽灵 timer 取消不掉），`pauseResetOnHover` 悬停暂停自动关闭完全失效 | `notifications/src/NotificationContainer.tsx:301-314` |

---

## 二、P1（69 条，按主题分组）

### 2.1 输入与 Combobox 系（8）
- **InputBase** 无条件内嵌 `Input.Wrapper`，内层 Provider 的 `describedBy: undefined` 覆盖外层，所有输入组件 error/description 的 `aria-describedby` 永远关联不上 — `InputBase/InputBase.tsx:56-60`（链路 `InputWrapper.tsx:275-286`、`Input.tsx:266`）
- **MaskInput** `alwaysShowMask`/`showMaskOnFocus` 是死参数，空值未聚焦也恒显示占位掩码 — `MaskInput.tsx:261-262,330-333`
- **NumberInput** 受控+min/max：键入中间态被 clamp 回流后 effect 直接改写 localText 打断输入（输入 `1` 被 clamp 成 10，续输 `2` 变 `102`）— `NumberInput.tsx:224-228,282`
- **PinInput** 删除中间位时 `chars.join('')` 丢弃空串，后续字符整体前移值被破坏 — `PinInput.tsx:181-184`
- **Combobox** 每个选项渲染时对注册表 `findIndex`，整表 O(n²)，千级选项明显卡顿 — `Combobox/ComboboxOption.tsx:37`
- **ComboboxPopover** searchable 模式下拉内搜索框无任何键盘导航（ArrowUp/Down/Enter/Escape 全失效）— `ComboboxPopover/ComboboxPopover.tsx:489-495`
- **TreeSelect** checkbox 模式每个可见选项渲染各做一次全树遍历（isNodeChecked/isNodeIndeterminate），每次渲染 O(n²)，千级节点卡顿 — `TreeSelect/TreeSelect.tsx:658-667` + `Tree/is-node-checked/is-node-checked.ts:13`
- **TreeSelect** `defaultExpandAll`/`defaultExpandedValues`/`initialSearchValue` 在异步加载数据时被静默忽略（useState 只在挂载读一次 defaultValue）— `TreeSelect.tsx:291-294`

### 2.2 Tree / Cascader / 多选（4）
- **Tree** 父组件持有 `tree` 且 data 每次渲染重建（如 `rows.filter(...)`）时，initialize 按引用判重失效 → 无限更新循环直至 "Maximum update depth exceeded" — `Tree/use-tree.ts:195-201`、`Tree.tsx:175`
- **Cascader** 多选模式每点一个下拉项，面板先被输入框 onBlur 关闭，「选中后保持打开」失效（面板项 button 未做 mousedown preventDefault）— `Cascader/Cascader.tsx:612-618,470-481`
- **Tree** `expandAllNodes` 对每个节点做一次 O(n) 的 `findTreeNode`，整体 O(n²)，数千节点冻结主线程 — `use-tree.ts:291-299`
- **TagsInput** 粘贴批量分割只用第一个命中的分隔符，`splitChars={[',',';']}` 时 `a,b;c` 得到 `a`、`b;c` 两个 tag — `TagsInput/TagsInput.tsx:220-232`

### 2.3 选择组与导航（10）
- **Switch** 组内组件自身 onChange 永不触发（组路径提前 return）— `Switch/Switch.tsx:144`
- **Switch** 组内 input 无 name/value，SwitchGroup 的 name 与表单提交完全失效 — `Switch.tsx:182`
- **Chip** 组内 Chip 自身 onChange 永不触发（死 API）— `Chip/Chip.tsx:136`
- **RadioGroup/SwitchGroup/ChipGroup** 组级 `disabled`/`size` 是死代码，context 未传递（对照 CheckboxGroup 已正确实现）— `Radio/RadioGroup.tsx:105`、`SwitchGroup.tsx:114`、`ChipGroup.tsx:129`
- **RadioGroup/SwitchGroup/ChipGroup** 带 label 时 `.root` 类同时挂到 InputWrapper 与内层 div，样式错乱（CheckboxGroup 已修，此处未同步）— `RadioGroup.tsx:117`
- **Tabs** 未设置 value/defaultValue 时所有 tab `tabIndex=-1`，Tab 键无法进入标签列表 — `Tabs/TabsTab.tsx:64`
- **Tabs** tab 与 panel 无 aria-controls/id/aria-labelledby 关联，读屏语义断裂 — `TabsTab.tsx:62`、`TabsPanel.tsx:43`
- **RadioCard** 之外的姊妹问题：**Pagination** startValue>1 时 First/Previous 永不禁用（判断硬编码 `active === 1`）— `Pagination/PaginationEdges.tsx:40`
- **Chip** `color` 传任意 CSS 颜色值时生成非法 `var(--ui-color-#ff0000-filled)` — `Chip.tsx:78`
- **TimelineItem** 脱离 Timeline 单独使用以裸 TypeError 崩溃（无安全上下文兜底）— `Timeline/TimelineItem.tsx:92`

### 2.4 浮层：Popover/Menu/Tooltip（5）
- **Popover/HoverCard** 挂载时父组件 targetId 重置 effect 覆盖 Target 子元素自带 id，aria-labelledby 与 returnFocus 指向失效 — `Popover/Popover.tsx:220-222`（HoverCard.tsx:193-195 同）
- **Modal/Dialog + Popover 嵌套** Escape 同时关闭弹窗和内层 Popover（window 捕获监听 + Popover 未注册模态栈）— `ModalBase/use-modal.ts:36-50`
- **HoverCard.Target** `getReferenceProps()` 无参调用排在最后，子元素自身 onFocus/onBlur/onKeyDown 被静默丢弃 — `HoverCard/HoverCardTarget.tsx:45-53`
- **Menu** hover 延迟关闭定时器捕获过期 `_opened`，菜单已关闭后仍重复触发 onClose/onOpen — `Menu/Menu.tsx:160-165,216-220`
- **Menu.Sub** 子菜单完全无法键盘操作（仅鼠标 hover），Target 缺 role=menuitem/aria-haspopup/aria-expanded — `Menu/MenuSubTarget.tsx:29-42`

### 2.5 浮层：Modal/Portal/动画（4）
- **Portal** 共享 portal 节点上 className/style/id 互相覆盖（默认 reuseTargetNode=true，后挂载实例抹掉先挂载实例属性且不恢复）— `Portal/Portal.tsx:12-13,124-129`
- **Modal** 默认不归还焦点（Drawer/ModalRoot 默认 `returnFocus:true`，Modal 漏配），关闭后焦点留 body — `Modal/Modal.tsx:90-103`
- **Collapse** transitionend 无超时兜底，在隐藏容器内展开后永久卡在收起高度 — `hooks/use-collapse/use-collapse.ts:126-149`
- **Slider** 可见 thumb（z-index:1）悬叠在透明原生 input 之上且未设 `pointer-events:none`，抓住手柄拖动静默失效 — `Slider/Slider.module.css:55,104-112`

### 2.6 数据展示（4）
- **DataTable** 降序排序把「null 垫底」翻转成「null 置顶」（direction 乘在整个比较值上）— `DataTable/sort.ts:9,34-36`
- **DataTable** 行内交互元素键盘激活被行级 onKeyDown 吞掉/误触 onRowClick（展开按钮 Enter 失效）— `DataTable/DataTable.tsx:628-631`
- **DataTable** 虚拟滚动+renderExpanded：展开行高度未纳入虚拟测量，滚动定位错乱 — `DataTable.tsx:597,715-745`
- **DataTable** 全选/半选判定 `includes` O(n×m)，万级数据全选后每次渲染近 O(n²) 卡顿 — `DataTable.tsx:408-415`

### 2.7 滚动与排版（4）
- **ScrollArea** RTL 下水平滚动条位置/拖拽/滚轮全错（utils 有完整 RTL 分支但 `dir` 参数从未传入）— `ScrollArea/ScrollAreaScrollbar/ScrollAreaScrollbarVisible.tsx:33,71`
- **Splitter** RTL 下拖拽方向反转 — `Splitter/SplitterResizer.tsx:80-84`
- **Scroller** 拖拽释放于容器外后残留 capture click 监听器吞掉下一次正常点击 — `hooks/use-scroller/use-scroller.ts:158-165`
- **TableOfContents** 标题从 DOM 移除后每次滚动抛 TypeError（`getElementById(...)!` 为 null）— `hooks/use-scroll-spy/use-scroll-spy.ts:17,114`

### 2.8 core 与布局（6）
- **Box** `hiddenFrom`/`visibleFrom` 生成的类名全库无任何 CSS 定义，响应式隐藏完全无效 — `core/Box/Box.tsx:110-111`
- **Paper** 暗色模式边框变量选择器写反：`.root:where([data-ui-color-scheme='dark'])` 只会匹配元素自身，永不命中，暗色下始终用浅色边框 — `Paper/Paper.module.css:15`
- **Card** 同样的选择器错误 — `Card/Card.module.css:22`
- **Grid** `grow` 完全无效（grid 容器子项上 `flex-grow` 被忽略）— `Grid/Grid.tsx:80` + `Grid.module.css:8-9`
- **UIProvider** 挂载时无条件覆写 `data-ui-color-scheme`，ColorSchemeScript 的 localStorage/系统偏好首帧方案被清掉；且全库无任何写 localStorage 逻辑，「记住用户选择」链路整体断裂 — `core/UIProvider/UIProvider.tsx:64-66,132`
- **Card** `bg` prop 文档声明支持主题键但未走 `getThemeColor`，`bg="red.6"` 生成非法 CSS 值背景变透明 — `Card/Card.tsx:67`

### 2.9 form / pro（4）
- **SearchFilter** 点击「查询」`onClick={() => handleSubmit()}` 不传 event，preventDefault 未执行，按钮默认行为再触发 form onSubmit → `onSearch` 每次点击执行两次 — `pro/src/search-filter/SearchFilter.tsx:254`
- **form/getInputOnChange** file 输入存的是 `"C:\fakepath\x.png"` 字符串而非 FileList — `form/src/get-input-on-change/get-input-on-change.ts:11-15`
- **ProTable** `request`/`onRequestError` 引用不稳定（内联函数）时无限请求循环 — `pro/src/pro-table/ProTable.tsx:148-181`
- **form/use-form** 提交级校验不中止在途字段级异步校验，过期结果污染提交后的错误状态（错误「复活」或真实错误被清）— `use-form.ts:141-150`

### 2.10 dates（3）
- **Calendar** 未传 date/defaultDate 时兜底显示月份钳制条件写反（`isAfter` 应为 `isBefore`），`minDate` 在过去时日历直接打开在 minDate 月份 — `dates/src/components/Calendar/Calendar.tsx:301-305`
- **DateTimePicker** 区间未选完时点击外部/Esc 关闭下拉，`onChange([null, null])` 连续触发两次 — `dates/src/components/PickerInputBase/PickerInputBase.tsx:141-148` + `DateTimePicker.tsx:224-228`
- **InlineDateTimePicker** `type="multiple"` 下第一次点选即把数组值破坏成字符串（clampDate 对数组取 toDateTimeString），下一帧 `.some` 崩溃 — `dates/src/components/InlineDateTimePicker/InlineDateTimePicker.tsx:239-244` + `utils/clamp-date/clamp-date.ts:22`

### 2.11 schedule（10）
- **ScheduleEvent** 正常拖拽结束时 `ctx.onDragEnd` 调用两次（handleDragEnd + effect cleanup），`onEventDragEnd` 每次拖拽触发 2 次 — `ScheduleEvent/ScheduleEvent.tsx:183-201`
- **expandRecurringEvents** rrule 以 UTC-naive 计算，DST 切换后周期事件漂移 1 小时且 exdate/override 的 recurrenceId 失配 — `schedule/src/utils/expand-recurring-events/expand-recurring-events.ts:73-79`
- **缩放/框选 hooks**（use-event-resize / use-horizontal-event-resize / use-slot-drag-select）缺 `pointercancel` 处理，触摸中断后卡在拖拽态、body userSelect 残留 — `schedule/src/hooks/use-event-resize.ts:206-207`（共 3 处）
- **MonthView** 事件预过滤条件误用 `||` 恒真，过滤完全失效；范围外的重复/非法事件同样触发 validateEvent 崩溃 — `MonthView/get-month-view-events/get-month-view-events.ts:41-42`
- **ResourcesWeekView** 多日 background 事件只渲染在开始日（assignedIds 短路了跨日分支）— `ResourcesWeekView/get-resources-week-view-events.ts:107-117`
- **DayView** 多日 timed 事件在后续天完全消失（`spansIntoDay` 多了 `display === 'background'` 限制，与 ResourcesDayView/WeekView 不一致）— `DayView/get-day-view-events/get-day-view-events.ts:40-44`
- **MobileMonthView / YearView** 起始日在显示月/年之外的跨日事件整段缺失（只按 start 过滤）— `MobileMonthView/get-mobile-month-view-events.ts:53`、`YearView/get-year-view-events/get-year-view-events.ts:49`
- **ResourcesMonthView** 头部「今天」按钮 rAF 闭包持有过期 scrollToDay，跨月跳转不滚动 — `ResourcesMonthView.tsx:1009-1014`
- **MobileMonthView** `firstDayPosition` 是跨渲染残留 ref，月份切换后 roving tabindex 指向隐藏/错误单元格（withOutsideDays=false 时整个网格不可 Tab）— `MobileMonthView.tsx:307-313`
- **WeekView/MonthView/DayView** 事件布局管线（expandRecurringEvents + 布局）完全未 memo，拖拽期间每次 dragover/pointermove 全量重算重渲染（Resources 系列已用 useMemo，实现不一致）— `WeekView.tsx:560-578`、`MonthView.tsx:360-373`、`DayView.tsx:488-501`

### 2.12 hooks（4）
- **use-splitter** 拖拽路径 `onSizeChange` 固化为首帧闭包（ref 回调缓存 + useUncontrolled setter 未 memo），内联回调读到过期 props/state — `hooks/src/use-splitter/use-splitter.ts:1048-1049,1002-1003`
- **use-scroll-into-view** `cancel()` 不重置 startTime，取消后再次滚动瞬间跳到底 — `hooks/src/use-scroll-into-view/use-scroll-into-view.ts:73-79`
- **use-floating-window** 未监听 touchcancel、卸载中不恢复 body 样式，系统中断触摸后拖拽态与 `userSelect:none` 永久卡死 — `hooks/src/use-floating-window/use-floating-window.ts:241-242,227-228`
- **use-mask** 每次输入整体重写 input.value 且不恢复光标位置，中间编辑时光标强制跳末尾 — `hooks/src/use-mask/use-mask.ts:165-167`

### 2.13 附属包（6）
- **notifications/Carousel** `withKeyboardEvents` 未列入 handleKeydown 依赖，运行时切换无效 — `carousel/src/Carousel.tsx:264,286`
- **Carousel** `onKeyDownCapture` 在捕获阶段吞掉 slide 内输入框的方向键/Home/End，文本编辑被破坏 — `Carousel.tsx:265-284,392`
- **DropzoneFullScreen** dragenter 有 Files 守卫而 dragleave 无条件递减，计数器可变负并永久失步，遮罩闪烁 — `dropzone/src/DropzoneFullScreen.tsx:100-113`
- **Upload** `addFiles` 在 `beforeUpload` await 期间用过期 `current` 快照提交，并发修改被静默丢弃（文件丢失/已删复活）— `dropzone/src/Upload/Upload.tsx:256,278,292`
- **ConfirmModal** 默认 labels 为空字符串，未配 labels 时确认/取消按钮无任何文字 — `modals/src/ConfirmModal.tsx:22,51,55`
- **Watermark** 水印瓦片宽度固定为 `gap[0]`，长文本被 SVG 裁切，平铺出残缺水印 — `ui/src/components/Watermark/Watermark.tsx:73-83`

### 2.14 编辑器与代码（2）
- **CodeHighlightTabs** code 为空数组时 activeTab 被置 -1 且永不恢复，异步加载后代码区永久空白 — `code-highlight/src/CodeHighlightTabs/CodeHighlightTabs.tsx:138-142`
- **shiki-adapter** 语言不在 bundle 时同步抛 `ShikiError`（已实测），无 try/catch，整个子树渲染崩溃 — `code-highlight/src/CodeHighlightProvider/adapters/shiki-adapter.ts:50-53`

---

## 三、P2（118 条，紧凑列表）

### 3.1 Combobox 系（11）
- MultiSelect 末尾胶囊 ArrowRight 的 findSearchInput 只在胶囊容器内查找，永远找不到输入框，焦点死路 — `Combobox/use-pills-reorder/use-pills-reorder.ts:285-287`
- Combobox contextValue 的 useMemo 被 useUncontrolled 每帧新 setter 击穿 — `Combobox/Combobox.tsx:365,389`（横切根因见 §4.2）
- Autocomplete `selectedValues={[selectedValue]}` 内联数组击穿 memo — `Autocomplete/Autocomplete.tsx:201`
- Autocomplete 清除按钮未阻止 mousedown 默认行为，点击后焦点丢失到 body — `Autocomplete.tsx:176-177`
- Autocomplete/NativeSelect 未向输入元素传 `invalid`，缺 aria-invalid 与错误样式（Select/MultiSelect 有）— `NativeSelect.tsx:196-207`、`Autocomplete.tsx:261-269`
- MultiSelect 消费者 onKeyDown 被内部 handler 覆盖静默丢弃 — `MultiSelect.tsx:497,534-538`
- ComboboxPopover `withScrollArea` 文档 @default true 实际 defaultProps 未包含 — `ComboboxPopover.tsx:157,224-230`
- MultiSelect 下拉打开时点击胶囊被误关 — `MultiSelect.tsx:483-490` + `ComboboxTarget.tsx:31-32`
- Transfer 搜索丢弃 label 非字符串的条目（搜索时不可见不可迁移）— `Transfer/Transfer.tsx:157-159`
- MultiSelect 渲染胶囊对每个选中值 flatData.find，O(选中×选项) — `MultiSelect.tsx:396-397`
- ComboboxPopover/Autocomplete 选项 key 用裸 value，重复 value 冲突（Select 已用 value-index）— `ComboboxPopover.tsx:304,321`、`Autocomplete.tsx:280`

### 3.2 Tree 系（8）
- Tree expandAllNodes 已列 P1 之外的：Cascader 搜索每叶做全树 findTreeNodePath，每次键入 O(n²) — `Cascader/cascader-utils.ts:50-53`
- Cascader loadData 失败成为 unhandled rejection 且无错误态 — `Cascader.tsx:294-299`
- TreeSelect 多选点 Pill 移除按钮误关下拉并清空搜索词（onBlur 无 relatedTarget 守卫）— `TreeSelect.tsx:791-797`
- Cascader 搜索结果项恒 `aria-selected={false}` — `Cascader.tsx:504`
- Tree initialize 闭包捕获过期 onChange — `use-tree.ts:193-204`
- TreeNode 缺 `aria-expanded`（FlatTreeNode 有）— `TreeNode.tsx:230-241`
- TreeSelect useUncontrolled defaultValue 异步失效（同 §2.1 已列）— 见 §2.1
- （Tree 系余项并入上文，无重复计数） — 见 §2.2

### 3.3 输入类（4）
- PasswordInput/NumberInput `required` 不显示标签星号（与 TextInput 不一致）— `PasswordInput.tsx:185`、`NumberInput.tsx:353`
- Textarea/JsonInput `minRows`/`maxRows` 死参数 — `Textarea.tsx:30`、`JsonInput.tsx:111-113`
- NumberInput step 小数时裸加法浮点误差（0.2+0.1 显示 0.30000000000000004）— `NumberInput.tsx:247-255`
- FileButton `resetRef` 渲染期 assignRef（render 期副作用）— `FileButton.tsx:64`

### 3.4 滑块/颜色/评分（7）
- AngleSlider step 不整除 360 时值越界（step=7 可得 364）— `hooks/use-radial-move/use-radial-move.ts:29-37`
- RangeSlider 键盘操作不触发 onChangeEnd（仅 blur），与 Slider 语义不一致 — `RangeSlider.tsx:338-367,378-385`
- ColorPicker/Saturation aria-valuenow 用 0-1 且无 valuemax — `ColorPicker/Saturation/Saturation.tsx:96`
- Rating `fractions` 对交互完全无效（永远只能选整星）— `Rating.tsx:145-150`
- Rating role="slider" 内嵌可聚焦 button，ARIA 违规 — `Rating.tsx:197,212-219`
- ColorPicker parsers hsl 正则未锚定且亮度组缺 `%`，接受非法颜色 — `ColorPicker/converters/parsers.ts:121`
- RangeSlider 缺 Slider 的 name/thumbLabel API — `RangeSlider.tsx:460,475`

### 3.5 浮层（7）
- Dialog 默认不启用 returnFocus（与 Popover/ModalRoot 不一致）— `Dialog/Dialog.tsx:64-78`
- Menubar.Menu 无依赖 layout effect 每次渲染全量 querySelectorAll — `Menubar/MenubarMenu/MenubarMenu.tsx:18-21`
- Drawer 用户 transitionProps 整体覆盖方向过渡（与 DrawerRoot 合并行为不一致）— `Drawer/Drawer.tsx:203-204`
- ModalStack/DrawerStack 堆叠上下文（addModal/getZIndex）无任何消费者，API 形同虚设 — `Modal/ModalStack.tsx:24-42`
- FloatingWindow 拖拽中卸载 body userSelect 残留（与 §2.12 touchcancel 问题互补）— `hooks/use-floating-window/use-floating-window.ts:227-228,290-292`
- FloatingWindow effect 依赖缺 excludeDragHandleSelector — `use-floating-window.ts:293-306`
- FocusTrap activeElement 落在陷阱外（body）时 Tab 可逃逸到背景页 — `hooks/use-focus-trap/scope-tab.ts:11-19`

### 3.6 选择/导航（9）
- Stepper 内容面板复用 stepBody（flex 行布局）样式名 — `Stepper/Stepper.tsx:189`
- Stepper 声明 role=tablist/tab 却无方向键导航且默认全 disabled — `Stepper/StepperStep.tsx:150`
- Pagination NaN total 未被 `total <= 0` 拦截，渲染坏分页且回调 NaN — `Pagination/Pagination.tsx:130`
- Chip `color` 见 §2.3；TimelineItem 见 §2.3（不重复计数）
- Breadcrumbs cloneElement 注入的空 `style` 键覆盖子元素内联样式 — `Breadcrumbs/Breadcrumbs.tsx:83`
- Accordion 未走 factory/forwardRef，声明的 ref 被静默丢弃 — `Accordion/Accordion.tsx:137`
- Checkbox iconColor 未做 getThemeColor（CheckboxIndicator 有）— `Checkbox/Checkbox.tsx:107`
- Pagination edges 见 §2.3 — 已列
- （余项并入上文）

### 3.7 数据展示（5）
- DataTable 函数型 accessor 的 sortable 列静默失效且回传函数 — `DataTable.tsx:376-380`、`sort.ts:29`
- DataTable sticky-header 与固定列 z-index 冲突（表头固定列被表体盖住）— `DataTable.module.css:202-207`
- Highlight 大小写比较 toLowerCase 但正则无 i 标志，逻辑自相矛盾 — `Highlight/Highlight.tsx:40,45`
- List `listStyleType` 死属性 — `List/List.tsx:42-43,89`
- Table 空 body 时整表（含表头 caption）不渲染 — `Table/Table.tsx:177-179`

### 3.8 滚动/排版（7）
- ScrollArea 竖向滚动条 bottom 误用 `--sa-corner-width`（应为 corner-height）— `ScrollArea.module.css:65`
- ScrollAreaAutosize `attributes` prop 被丢弃并泄漏到 DOM — `ScrollArea/ScrollArea.tsx:276-298,352`
- TableOfContents `minDepthToOffset={0}` 被 `|| 1` 吞掉 — `TableOfContents.tsx:171`
- Splitter 拖拽边界硬编码 5%/95% 与 aria 0-100 不符，无 min/max API — `SplitterResizer.tsx:83-84,161-162`
- use-scroll-spy scroll 回调无 rAF 节流，热路径 N 次 getBoundingClientRect — `hooks/use-scroll-spy/use-scroll-spy.ts:111-118`
- use-scroller 每次 scroll 事件 getComputedStyle 读 direction — `hooks/use-scroller/use-scroller.ts:55`
- FloatingIndicator 仅观察尺寸变化，位置型变化（父容器滚动）不更新 — `FloatingIndicator/use-floating-indicator.ts:117-124`

### 3.9 core/布局（4）
- Grid/SimpleGrid 变量媒体查询未按断点数值排序，自定义乱序断点时级联错乱（getSortedBreakpoints 存在但未用）— `Grid/GridVariables.tsx:25-53`、`SimpleGridVariables.tsx:49-73`
- GridCol span 未按 cols 收敛（span=15 溢出），offset=columns 时生成非法 `span 0` — `Grid/GridCol.tsx:42`
- UIProvider 嵌套 Provider 卸载后不恢复 html 的 data-ui-color-scheme — `UIProvider.tsx:127-147`
- DirectionProvider 初始读取 effect deps 缺 detectDirection — `DirectionProvider.tsx:58-65`

### 3.10 反馈/杂项（5）
- Carousel onSlideChange 内联回调导致 embla 监听每渲染解绑重绑 — `Carousel/Carousel.tsx:204,254-261`（ui 包 Carousel 组件）
- Progress aria-valuenow 未钳制（150/NaN 原样输出）— `Progress/Progress.tsx:130,138`
- Alert 关闭按钮无默认 aria-label — `Alert/Alert.tsx:157`
- CopyButton/useClipboard 剪贴板失败静默吞掉，children 拿不到 error — `CopyButton/CopyButton.tsx:22-23`、`hooks/use-clipboard/use-clipboard.ts:44-51`
- Watermark gap/offset 内联数组每次渲染重建 SVG data URL — `Watermark.tsx:146-147`

### 3.11 form/pro（6）
- clear-list-state 用 `includes` 子串误匹配，误删同名前缀字段状态（`users` 误删 `myusers.0.name`）— `form/src/lists/clear-list-state.ts:11`
- use-form setFieldValue 闭包捕获过期配置（deps 缺 validateInputOnChange 等）— `form/src/use-form.ts:203`
- reset() 不通知 watch 订阅者（与 setValues/initialize 不一致）— `use-form.ts:90-97`
- use-form-list 非受控列表操作不 bump formKey，DOM 显示与值脱节 — `form/src/hooks/use-form-list/use-form-list.ts:23-64`
- ProTable 重置后查询区与表格筛选状态脱节（onReset 未接线）— `pro/src/pro-table/ProTable.tsx:204-213`
- ProTable 渲染期 assignRef 写外部 ref — `ProTable.tsx:198-200`

### 3.12 dates（6）
- Calendar 快捷键 `y` 绕过 maxLevel — `Calendar.tsx:392-397`
- getEndOfWeek 的 firstDayOfWeek 未归一化，越界值（8/-1）导致 while 死循环挂死 — `Month/get-end-of-week/get-end-of-week.ts:11-14`
- useUncontrolledDates 运行时切 type 时把旧形状 defaultValue 灌入新类型状态 — `hooks/use-uncontrolled-dates/use-uncontrolled-dates.ts:39-45`
- Day 每格渲染期 `new Date()`，SSR 时区差导致 data-today hydration 不匹配 — `Day/Day.tsx:128`
- MiniCalendar 未受控时渲染期 `dayjs()`，SSR 水合不一致且跨天不刷新 — `MiniCalendar/MiniCalendar.tsx:154`
- Month 日历网格每次渲染全量重建（无 useMemo），range 悬停时鼠标每掠过一格全网格重算 — `Month/Month.tsx:207-221,229-303`

### 3.13 schedule 核心（6）
- handleDragOver 每次都 setDropTarget 新对象，拖拽期间整树高频重渲染（且与 §2.11 布局未 memo 叠加放大）— `schedule/src/hooks/use-drag-drop-handlers.ts:139`
- DragContext 的 dropTarget/setDropTarget 是死 API（context 里恒 null）— `use-drag-drop-handlers.ts:217`
- responsive 布局同时挂载桌面与移动两套视图，事件计算翻倍 — `Schedule.tsx:380-383`
- 仅点击缩放把手（无位移）也置 justResized 吞掉点击 — `schedule/src/hooks/use-event-resize.ts:198-203`
- `endTime='24:00'` 支持但字符串生成端输出非法 `"24:00:00"`（Safari/Firefox Invalid Date）— `use-event-resize.ts:75-77` 等 3 处
- ScheduleHeader 遗留调试 CSS 变量 `--test` — `ScheduleHeader/ScheduleHeader.tsx:63-67`

### 3.14 schedule 视图（4）
- WeekView all-day 槽 static 模式未禁用 tabIndex/键盘（weekday 标签有守卫）— `WeekView.tsx:933-934`
- 事件结束时间秒级判定跨视图不一致（周/日程忽略秒，月视图包含）— `WeekView/get-week-view-events/get-event-end-date.ts:7`
- MobileMonthView 全天判定 `00:00→00:00` 与 isAllDayEvent 不一致 — `MobileMonthView.tsx:419`
- MonthView withOutsideDays=false 时方向键遇占位格中断，跳过逻辑不可达 — `MonthView/handle-month-view-key-down.ts:149-151`

### 3.15 hooks（14）
- use-mask IME 组合输入无 isComposing 守卫，组合被实时重写打断 — `use-mask.ts:172-183`
- use-mask slots/updateValue/refCallback 每渲染重建，监听器每渲染重绑 — `use-mask.ts:150,169,190`
- use-splitter pointermove/up 未过滤 pointerId，多指触控第二触点驱动拖拽 — `use-splitter.ts:1006-1010`
- use-effect-event/use-callback-ref ref 在 passive effect 更新，事件存在读到旧回调的窗口（应 useInsertionEffect）— `use-effect-event.ts:10-12`、`use-callback-ref.ts:6-8`
- use-uncontrolled 非受控 setter 每帧新引用（横切根因见 §4.2）— `use-uncontrolled.ts:94-97`
- use-collapse/use-horizontal-collapse duration=0 时 transitionend 永不触发，state 卡死 — `use-collapse.ts:93,115,147-167`
- use-long-press 触摸设备鼠标仿真事件导致 onStart/onCancel 重复误触发 — `use-long-press.ts:131-146`
- use-merged-ref React 19 清理路径跳过未返回 cleanup 的函数 ref，卸载收不到 null — `use-merged-ref.ts:39-47`
- use-clipboard 复制成功不清除上次 error — `use-clipboard.ts:47-48`
- use-scroll-spy getDepth/getValue 身份进 deps，内联回调引发死循环 — `use-scroll-spy.ts:131,133-138`
- use-event-listener/use-mutation-observer/use-intersection options 对象进 deps，内联对象每渲染重绑/重建 — `use-event-listener.ts:36` 等
- use-local-storage serialize/deserialize 闭包固化首帧 — `use-local-storage/create-storage.ts:129,91`
- use-selection resetSelectionOnDataChange 配合内联 data 每渲染清空选择 — `use-selection.ts:43-47`
- use-focus-trap visible() 只查内联 display，CSS 类隐藏元素被判可聚焦 — `use-focus-trap/tabbable.ts:8-10,22-33`

### 3.16 附属包（7）
- ModalsProvider 事件对象字面量每渲染重挂全部 8 个 window 监听 — `modals/src/ModalsProvider.tsx:176-185`
- SpotlightRoot disabled 时不注销快捷键，重新启用后弹窗意外弹出 — `spotlight/src/SpotlightRoot.tsx:168,186-188`
- SpotlightActionsList 注册 effect 依赖 []，id 变更后键盘选择全部落空 — `spotlight/src/SpotlightActionsList.tsx:35-42`
- NotificationContainer scroll-dismiss 复位定时器引用过期闭包，全局暂停期间仍调度关闭 — `notifications/src/NotificationContainer.tsx:120-127,251-258`
- Upload submitPending 读渲染期 files 而非 filesRef，同 tick 提交遗漏新文件 — `Upload.tsx:248`
- MIME_TYPES.rar 用非标准 `application/x-rar`，.rar 拖放全被拒 — `dropzone/src/mime-types.ts:15`
- emotion/create-styles 每次渲染全量 serializeStyles 无 memo — `emotion/src/create-styles.ts:41-46`

### 3.17 编辑器/工具（8）
- CodeHighlightAdapterProvider loadContext 竞态且未处理 rejection（慢 promise 覆盖新 adapter）— `CodeHighlightProvider.tsx:48-52`
- demo/ConfiguratorSizeControl 对非 5 刻度值非空断言崩溃 — `demo/src/ConfiguratorDemo/controls/ConfiguratorSize.control.tsx:27`
- HeaderControls 可选 githubLink 用 `!` 断言，默认开启时渲染无 href 死链接 — `header/src/HeaderControls.tsx:39`
- tiptap labels TaskList sink/lift 文案写反（aria 误导）— `tiptap/src/labels.ts:178-179`
- demo/transformSelectData 对象字面量重复 `lines` 键，前值被覆盖 — `demo/src/ConfiguratorDemo/controls/transform-select-data.ts:49,103`
- CodeHighlight 每次渲染同步重跑 shiki 高亮无 memo，大文件阻塞主线程 — `CodeHighlight/CodeHighlight.tsx:223-227`
- tiptap Link Mod-k 走全局 window 事件，多编辑器同页互相干扰 — `tiptap/src/extensions/Link.ts:6`
- tiptap SourceCodeControl 两次 setContent 的 emitUpdate 不对称，受控 value 失同步 — `RichTextEditorSourceCodeControl.tsx:18-20`

---

## 四、横切模式（修复一处可连带消多个问题）

1. **Input 右侧 section `pointer-events:none` 继承**（P0 #2/#3 根因）：`Input.tsx` defaultProps `rightSectionPointerEvents:'none'`，`InputClearButton`（inline `pointerEvents:'all'`）和 `PasswordInput`（CSS `.visibilityToggle{pointer-events:auto}`）已各自修复，NumberInput/FileInput 漏了。建议在 Input 层面统一，并补真实浏览器 e2e 点击测试（`fireEvent.click` 绕过命中测试是这批 P0 漏网的原因，同因的还有 Rating P0）。
2. **use-uncontrolled setter 每帧新引用**：`handleUncontrolledChange` 无 useCallback，被 Combobox contextValue memo、use-splitter、Tree 等大量下游当成依赖，memo 全部作废/闭包固化。建议在 hooks 源头用 `useCallback` + `onChangeRef` 转发。
3. **选择组提前 return 丢 onChange + 组级 prop 死代码**：Radio/Switch/Chip 三个 Group 的 disabled/size 未进 context，子组件组路径提前 return 丢自身 onChange（CheckboxGroup 是正确范本）。
4. **主题色 prop 未走 getThemeColor**：Card.bg、Chip.color、Checkbox.iconColor；建议统一走 `getThemeColor(color, theme)`。
5. **暗色模式 CSS 变量选择器写反**：Paper、Card 用了 `.root:where([data-ui-color-scheme='dark'])`（永不命中），正确写法是祖先选择器 `[data-ui-color-scheme='dark'] &`（global.css 是对的）。
6. **RTL 未接线**：ScrollArea、Splitter 内部有 RTL 逻辑但 `useDirection()` 从未接入，库自带 DirectionProvider 却在这两个组件失效。
7. **过渡动画收尾无兜底**：Collapse/use-collapse（transitionend 丢失或 duration=0 卡死）、FloatingWindow/拖拽 hooks（userSelect 残留）。统一模式：加 setTimeout 兜底 + cleanup 恢复。
8. **default* 仅挂载读一次，异步数据下失效**：TreeSelect defaultExpandAll、UIProvider colorScheme、useUncontrolledDates 切 type。
9. **内联 props 破坏 memo/effect**：函数/数组/对象字面量进入依赖导致重绑、死循环或状态被清（ProTable request、use-selection data、use-event-listener options、Watermark gap、ModalsProvider 事件对象）。部分可在库内用 ref 化参数根治。
10. **指针交互缺 pointercancel/touchcancel**：schedule 三个拖拽 hook、use-floating-window、use-splitter（use-drag 有 pointerId 守卫是正确范本）。
11. **文档承诺但未实现的「死参数」**：hiddenFrom/visibleFrom、withScrollArea、alwaysShowMask/showMaskOnFocus、minRows/maxRows、listStyleType、Grid grow、Group disabled/size、ModalStack/DrawerStack、RangeSlider name、fractions。要么实现要么从类型/文档移除。
12. **测试盲区**：jsdom + fireEvent 无法暴露 pointer-events、mouseenter→click 组合、transitionend 时序三类问题（本次 12 个 P0 中 3 个属于此类）。建议补 Playwright 真实交互 e2e（仓库已有 e2e 目录）。

---

## 五、建议修复顺序

1. **第一批（P0 ×12）**：都是确定性 bug，改动小收益大。其中 #1/#2/#3/#4 同属「真实浏览器交互」类，可一起修并配 e2e。
2. **第二批（高杠杆 P1）**：hooks 源头三件套（use-uncontrolled setter 稳定化、use-mask 光标+IME、use-effect-event 改 useInsertionEffect）→ 连带修复 Combobox/use-splitter/use-hotkeys 等下游；性能三连（TreeSelect O(n²)、DataTable includes→Set、Month/Week/DayView 布局 useMemo）；a11y 断链（InputBase aria-describedby、Tabs aria、Popover targetId）。
3. **第三批（主题/样式一致性）**：Paper/Card 暗色选择器、getThemeColor 统一、Box hiddenFrom/visibleFrom 补 CSS、Grid grow、RTL 接线。
4. **第四批（P2 批量清理）**：死参数清单决断（实现或移除）、内联 props ref 化、CSS 小修（corner-height、z-index、Highlight i 标志）、调试遗留（--test、重复 lines 键、sink/lift 文案）。

> 审计为只读，未改动任何业务/组件代码；行号以当日工作区状态为准（当前分支 main 有 charts/nas-console 相关的未提交删除，与本报告无关）。
