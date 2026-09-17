# 全量组件审查问题清单(第二轮 · 2026-09-17)

> 上一轮(2026-09-13)199 项已全部修复;本轮为全覆盖逐文件复审。
> 范围:~1405 文件 / ~12.5 万行,14 个批次(B01-B14),详见 TRACKER.md。
> 主线抽样复核:15 条跨 10 批,通过率 100%(每条核到 file:line 真实代码)。
> 上轮 199 项修复回归核对结论:**全部在位,无一被冲掉**(各批报告附回归核对表;
> 但 B02-4 HoverCardTarget ref 覆盖、B05-2 Rating 半星提交路径属上轮修复自身引入/重构丢失的新缺陷,单独立案)。

**总计:194 条:P0 × 1、P1 × 40、P2 × 153**

## 上轮 199 项修复回归核对结论(验收标准 3)

各批审查 agent 对命中的上轮修复逐条核对了源码现状(明细见 raw/B01-B14.md 各「回归核对」章节),结论:

1. **无一条修复被后续提交冲掉**——⑦批浮层/Portal/Escape、⑰批 Stack 接线与 hooks ref 化、⑬批 RRule tzid 墙钟、⑮批 dates/form、⑱批 P2 清尾等全部在位。
2. **4 组「上轮报告称已修、仓库实际未落地/未同步」**(相关文件 2026-07 后无提交,或修复只落了主副本):
   - B04-2 PinInput 删除中间位、B04-9 Saturation aria、B04-10 FileButton resetRef、B04-11 NumberInput 浮点步进(上轮报告行 208/209/214 声称已修);
   - B05-3 Slider thumb 命中、B05-8 RangeSlider onChangeEnd、B05-9 name/thumbLabel、B05-10 AngleSlider 越界(上轮 §3.4 声称已修);
   - B13b-1 独立 carousel 包未同步 ui 包的 onSlideChange ref 修复(⑪批只修了 ui 副本);
   - B10-1 useUncontrolledDates 形状映射只实现两个方向(⑱批修复不完整)。
3. **2 条上轮修复自身引入的新缺陷**:B02-4 HoverCardTarget(⑦批事件处理器合并引入 ref 覆盖)、B02-1 ModalStack P0(⑰批新接线自带无限循环)。

## 索引

| 单号 | 级别 | 组件 | 标题 |
|---|---|---|---|
| B02-1 | P0 | ModalStack/DrawerStack | Stack 内渲染 Modal/Drawer 触发无限 effect 循环,抛 "Maximum update depth exceeded" |
| B01-1 | P1 | UIProvider | stylesTransform/getStyleNonce 无入口,context 恒为 undefined → Box `sx` 全库死参数、emotion 集成死接线 |
| B01-2 | P1 | UIProvider | 嵌套受控 Provider 的 colorScheme 首挂被外层 effect 覆盖,局部色彩方案无法生效 |
| B02-2 | P1 | ModalStack/DrawerStack | zIndex 按挂载顺序而非打开顺序分配,乱序打开层叠颠倒 |
| B02-3 | P1 | useModalsStack/ModalStack | stackId 死参数泄漏到 DOM;context.stack/currentId 存 useId 自动 id,消费者无法比对 |
| B02-4 | P1 | HoverCardTarget | React 19 下 child 自带 ref 时合并 ref 被 getReferenceProps(childProps) 覆盖,floating reference 接线丢失 |
| B02-5 | P1 | Popover/HoverCard | StylesApi(classNames/styles/vars/unstyled/radius/shadow)全部死参数,getStyles 创建后从未接线 |
| B02-6 | P1 | ModalBase | 消费者 __vars 被 JSX 内联 __vars 整体覆盖丢弃,Spotlight scrollable/maxHeight 死参数 |
| B02-7 | P1 | Menu.Sub | 子菜单下拉(Portal)内容 mousedown/keydown 命中父 Menu 的 click-outside,closeOnItemClick=false 或子菜单内非关闭型交互被整单误关 |
| B02-8 | P1 | ComboboxPopover/Combobox 系 | 缺 data-ui-stop-propagation 接线,Modal 内 Escape 双关(浮层与 Modal 一起关闭) |
| B03-1 | P1 | MultiSelect | searchable 模式点击输入框本体误关已展开的下拉(与 Select 行为相反) |
| B03-2 | P1 | TagsInput | 点击输入框本体误关建议下拉(同 B03-1 模式) |
| B03-3 | P1 | Cascader | 键盘无法从输入框进入面板,选项键盘不可达(仅鼠标可选中) |
| B04-1 | P1 | Input | `_rightSection` 恒为 JSX 元素,右侧 section 恒渲染、`data-with-right-section` 恒真,所有输入组件右侧恒预留 ~34px 空白 |
| B04-2 | P1 | PinInput | 删除中间位时空串 `join('')` 塌陷,后续字符整体前移、onChange 值丢位 |
| B04-3 | P1 | MaskInput | handleChange 无 IME 合成守卫,组合期间直接改写 DOM value 会截断输入法 |
| B04-4 | P1 | use-move(被 ColorPicker Saturation/ColorSlider 使用) | 无 touchcancel/pointercancel,触摸拖拽被系统中断后 user-select:none 与 document 监听残留 |
| B04-5 | P1 | PinInput | 暗色模式白底浅字:输入格背景 fallback `--ui-color-white`(#fff)不随主题切换,文本用暗色系浅色 |
| B05-1 | P1 | Pagination | `color`/`autoContrast` 完全失效:varsResolver 写 `--pagination-active-*`,CSS 读 `--pagination-control-*`,变量名对不上 |
| B05-2 | P1 | Rating | `fractions` 半星只剩 hover 预览:点击与键盘均提交整星,分数值永远无法选中;`clearable` 对分数值失效 |
| B05-3 | P1 | Slider | 可见 thumb(z-index:1)叠在透明 input 之上且无 `pointer-events:none`,按住手柄拖拽/点击静默失效 |
| B05-4 | P1 | CheckboxCard | 不消费 CheckboxGroup 的 `disabled`:禁用组内的 Checkbox.Card 仍可点击勾选 |
| B06-1 | P1 | Tabs | 无初始激活值时激活非首个 tab 后,首个 tab 残留 DOM tabIndex=0,roving tabindex 出现双入口 |
| B07-1 | P1 | Splitter | 触摸屏无法拖拽分栏,且触摸中断后残留 document mousemove 监听导致"无按键拖动" |
| B08-1 | P1 | CloseButton | 暗色模式选择器写法永不匹配,暗色样式整体失效 |
| B08-2 | P1 | Notifications | `notification` 样式槽完全未接线,堆叠通知零间距 |
| B08-3 | P1 | Notification | color 传任意 CSS 颜色时插值成非法 CSS 变量,色条/图标颜色失效 |
| B09-1 | P1 | TimePicker | 粘贴含非数字成分的时间串产生 `NaN:NaN:NaN` 值(数据损坏) |
| B09-2 | P1 | TimePicker | min/max 失焦钳制在 withSeconds=false 时输出带秒格式,onChange 值契约漂移 |
| B10-1 | P1 | useUncontrolledDates | type 切换形状映射缺「切回 default」分支,multiple 分支不滤 null(⑱批修复不完整) |
| B10-2 | P1 | useUncontrolledDates | 渲染期调用 `_setValue` 连带触发 onChange 副作用 |
| B11-1 | P1 | 全 schedule/dates 组件 | `Factory` 类型导入断链,ui 包 tsc 全线报错(47×TS2459 + 1×TS2303 及级联) |
| B12-1 | P1 | expandRecurringEvents | rrule between 边界与候选时刻编码不一致,非 UTC 时区下范围边界处的事件实例被静默丢弃 |
| B12-2 | P1 | getStartOfWeek | 非法日期输入死循环冻结页面(兄弟函数 getEndOfWeek 有守卫,此处漏了) |
| B13a-1 | P1 | form/validate-values | 数组值的 formRootRule 根规则每次校验被执行两次 |
| B13a-2 | P1 | form/use-form + use-form-validating | 提交级 abort 中止字段异步校验后,该字段的 validating 标志永久残留为 true |
| B13a-3 | P1 | form/use-form | 内联 onValuesChange 时 reset/initialize/列表操作调用过期闭包 |
| B13a-4 | P1 | hooks/use-debounced-value | leading 模式下冷却窗口内连续变更导致旧值回写(乱序回退) |
| B13a-5 | P1 | hooks/use-debounced-state | leading 选项只在首次调用生效,静默期后的新调用不再立即触发 |
| B13a-6 | P1 | hooks/use-scroll-spy | 消费方传内联 getDepth/getValue 时渲染无限循环 【待核实】 |
| B13b-1 | P1 | Carousel(@xiaoye-react/carousel) | ⑪批修复未同步:onSlideChange 挂载误报 + select 监听反复 off/on + getEmblaApi 重复调用 |
| B01-3 | P2 | UIProvider | clearColorScheme 嵌套时重置为 'light' 而非父级 scheme,整站属性被劫持为 light |
| B01-4 | P2 | ColorSchemeScript/useUIColorScheme | localStorage 键只读不写,色彩方案持久化链路断裂 |
| B01-5 | P2 | ThemeProvider/global.css | 回退 CSS 变量与运行时 defaultCssVariablesResolver 输出不一致(SSR 首屏/水合前跳变) |
| B01-6 | P2 | factory | polymorphicFactory 的 withProps 产物丢失 classes/varsResolver 静态属性 |
| B01-7 | P2 | merge-ui-theme | isValidPrimaryShade 对 undefined/null shade 抛裸 TypeError,而非既定错误信息 |
| B02-10 | P2 | MenuDropdown | 焦点在下拉容器上时 ArrowUp 与 ArrowDown 都聚焦第一项,应分别为末项/首项 |
| B02-11 | P2 | Popover/HoverCard | FloatingArrow 背景硬编码 var(--ui-color-body),自定义下拉背景时箭头颜色不跟随;模块内 .arrow 规则成死代码 |
| B02-12 | P2 | useModalsStack | closeAll 引用每次渲染变化(initialState 每渲染新建);modals 数组后期变化不进 state |
| B02-13 | P2 | SpotlightSearch | {...others} 后显式覆盖 onCompositionStart/onCompositionEnd,消费者合成事件处理器丢失 |
| B02-14 | P2 | Menu 四个 Item 组件 | itemRef 创建后从未读取(死引用) |
| B02-9 | P2 | PopoverContextMenu/MenuContextMenu | 条件 throw 位于 hooks 之前,违反 Rules of Hooks(同类组件已约定 throw 后置) |
| B03-10 | P2 | TreeSelect | 勾选交互路径残留 O(n²)/O(n×m):逐值全树 findTreeNode + 逐叶 includes |
| B03-11 | P2 | TreeSelect | type/autoComplete 解构后丢弃,DOM 属性透传断链 |
| B03-12 | P2 | Cascader | --cascader-search-width 变量从未定义,搜索列表宽度规则失效 |
| B03-13 | P2 | Cascader | 面板/搜索项禁用态只有 data-disabled,键盘仍可聚焦、读屏不感知 |
| B03-14 | P2 | Cascader | 面板键盘导航与 CSS 未接入 RTL(ArrowLeft/Right 语义、物理方向属性) |
| B03-15 | P2 | TreeSelectOption | role="option" 元素上挂 aria-expanded,ARIA 角色不支持该状态 |
| B03-16 | P2 | use-pills-reorder | 拖拽 ghost 以 setTimeout(0) 移除,部分浏览器拖拽影像可能退化为默认 —— 待核实 |
| B03-4 | P2 | Combobox/Select 家族 | 下拉打开时不滚动到选中项,activeIndex 恒为第一项 |
| B03-5 | P2 | TagsInput | 粘贴切分正则未转义 '-',分隔符含非边缘 '-' 时形成字符区间误切 |
| B03-6 | P2 | TagsInput | 清除全部/胶囊移除按钮缺 mousedown preventDefault,操作后焦点丢到 body |
| B03-7 | P2 | MultiSelect | 胶囊移除按钮缺 mousedown preventDefault,移除后焦点丢到 body |
| B03-8 | P2 | MultiSelect | withPillsReorder 与 renderPill 组合时重排能力静默失效(死参数组合) |
| B03-9 | P2 | Combobox/MultiSelect | selectedValues.includes 逐选项线性查找,大列表 O(n×m) |
| B04-10 | P2 | FileButton | `assignRef(resetRef, reset)` 在渲染期执行(render 期副作用) |
| B04-11 | P2 | NumberInput | 步进用裸浮点加法,step=0.1 连续递增出现 0.30000000000000004 |
| B04-12 | P2 | NumberInput | 步进按钮 hover 在暗色模式下近白底浅灰图标,对比度不足 |
| B04-13 | P2 | 多组件 | JSDoc 注释写成 `//**`(行注释),API 文档/IntelliSense 全部丢失 |
| B04-14 | P2 | NumberInput | label 不支持必填星号,与 TextInput/PasswordInput 不一致 |
| B04-6 | P2 | InputClearButton | `style` 合并被后置的 `{...others}` 整体覆盖,防御性 `pointerEvents:'all'` 与背景丢失 |
| B04-7 | P2 | JsonInput | 传 minRows/maxRows(autosize)时输入内容丢失等宽字体 |
| B04-8 | P2 | PasswordInput | 可见性切换按钮 `tabIndex={-1}`,键盘与屏幕阅读器用户不可达 |
| B04-9 | P2 | Saturation | `role="slider"` 无 aria-valuemin/aria-valuemax,aria-valuenow 用 0-1 浮点无语义 |
| B05-10 | P2 | AngleSlider | step 不整除 360 时值越界(364),`low` 分支不可达;键盘路径同样越界;Home/End 未 preventDefault |
| B05-11 | P2 | Switch/SegmentedControl/Slider/RangeSlider | 键盘焦点指示器缺失:交互 input 透明或零尺寸,且无任何 :focus-visible 样式 |
| B05-12 | P2 | Slider/RangeSlider | 未接入 useDirection:RTL 下原生 input 语义反转而视觉 bar/thumb 不反转,RangeSlider 把 useMode 方向硬编码 'ltr' |
| B05-13 | P2 | SegmentedControl | radio 未默认生成 name:浏览器无法把各 item 识别为同组,方向键切换失效,只能逐个 Tab |
| B05-14 | P2 | SegmentedControl | `controlActive` stylesName 声明但从未渲染:无 indicator 元素,样式 API 断链 |
| B05-15 | P2 | Pagination | `layout='responsive'` 未实现:文档称「CSS 容器查询切换页码与紧凑标签」,实际无任何容器查询/布局 CSS,两种内容恒同时渲染 |
| B05-16 | P2 | Pagination | 导出的 `getPaginationItems` 与组件实际渲染算法(usePagination)分叉:同输入产出不同区间 |
| B05-17 | P2 | Pagination | siblings/boundaries 未做 NaN/非整数归一化:NaN 时渲染 [1,'dots',N] 碎片 |
| B05-18 | P2 | Pagination | size 文档 @default 'md' 与实际默认 sm 不符:.root 缺基础 `--pagination-control-size` 声明 |
| B05-19 | P2 | ChipGroup | `name` 是死参数:文档「Name attribute passed to all chips」,但 Chip 是 button 无 input,解构后从未使用 |
| B05-20 | P2 | RadioIndicator | styles API 全部断链:className/style/classNames/styles/vars 解构后丢弃,size/color 未解构泄漏到 DOM span |
| B05-21 | P2 | Radio | iconColor 未走 getThemeColor:与 Checkbox/CheckboxIndicator 不一致,主题键生成非法 CSS 值致选中圆点消失 |
| B05-22 | P2 | RadioGroup | 根节点无 `role="radiogroup"`:RadioCard(role="radio")组合下无法建立分组语义 |
| B05-23 | P2 | RangeSlider/AngleSlider/Slider | 拖拽中断路径缺 pointercancel/touchcancel:触摸被系统取消后拖拽状态卡死、onChangeEnd 丢失 |
| B05-5 | P2 | Rating | filled 星层显式 `className`/`style` 覆盖 `getStyles('starSymbol')`,starSymbol 的 classNames/styles API 失效 |
| B05-6 | P2 | Rating | 同一组件 aria-label 中英混用:组标签硬编码中文「评分」,星形 radio 为英文「N star」 |
| B05-7 | P2 | CheckboxGroup/RadioGroup/SwitchGroup/ChipGroup/PaginationRoot | context value 内联对象每渲染新身份(ChipGroup 还含每渲染新建的函数) |
| B05-8 | P2 | RangeSlider | 键盘操作不触发 onChangeEnd,只在 blur 时补发,与 Slider(keyup 即发)语义不一致 |
| B05-9 | P2 | RangeSlider | 缺 name/thumbLabel:无法参与表单提交,thumb 无可配置可访问名 |
| B06-10 | P2 | RingProgress/SemiCircleProgress | NaN 值无防御,且缺少 progressbar 语义(role/aria 全缺) |
| B06-11 | P2 | Indicator | 定位变量使用物理 left/right,RTL 下 start/end 语义反转 |
| B06-12 | P2 | Tabs | 水平方向键未按 RTL 反转;vertical 变体使用物理 border-right/margin-right |
| B06-13 | P2 | TabsList | cloneElement 以 index 覆盖子元素 key,动态增删/重排 tab 时后续 tab 全量 remount |
| B06-14 | P2 | Marquee | 重复组未对辅助技术隐藏,内容被读屏朗读 repeat(默认 4)遍 |
| B06-15 | P2 | Marquee/Skeleton | 无限动画未接入 prefers-reduced-motion |
| B06-16 | P2 | RollingNumber | withLiveRegion 只变更 aria-label,读屏普遍不播报 live region 的 label 变更 |
| B06-17 | P2 | Descriptions | 垂直布局专用的 `.value > div:first-child` 样式未限定 layout,horizontal 下污染消费者 div 内容 |
| B06-18 | P2 | Watermark | 瓦片宽度用 sans-serif 实测,而 SVG `<text>` 未设 font-family,测量与渲染字体不一致(待核实) |
| B06-2 | P2 | Collapse | duration=0(reduced motion 或显式 0)早退分支丢弃 onTransitionEnd/onTransitionStart 回调 |
| B06-3 | P2 | Tree | filterTreeData 对"节点自身命中"的子节点保留规则前后不一致 |
| B06-4 | P2 | Tree | data 数组身份不稳定时 initialize 每次重置状态并重复触发 onChange |
| B06-5 | P2 | Tree | expandOnSpace(默认 true)与 checkOnSpace 同时开启时 Space 一次触发"展开+勾选"双动作 |
| B06-6 | P2 | Tree | is-node-indeterminate 模块零引用死代码 |
| B06-7 | P2 | Highlight | Styles API 完全未接线:classNames/styles/unstyled/attributes 为死参数 |
| B06-8 | P2 | Stepper | 移除 tablist 角色后遗留 aria-orientation 挂在无 role 的 div 上 |
| B06-9 | P2 | Stepper | 暗色模式下步骤图标硬编码白底、分隔线/边框静态灰,未随 scheme 翻转 |
| B07-10 | P2 | Container | strategy='grid' 时 fluid prop 完全无效 |
| B07-11 | P2 | Scroller | 控制按钮渐变方向硬编码,RTL 下淡出方向反向 |
| B07-12 | P2 | AppShell | navbar/aside 收起动画被 grid 轨道瞬时塌陷吞掉,过渡声明实际无效 |
| B07-13 | P2 | Divider/Kbd | 默认边框色用固定浅灰阶,暗色模式过亮(与上轮 Paper/Card 暗色修复不一致) |
| B07-14 | P2 | OverflowList | maxVisibleItems/gap 变化不触发重测,可见数停留在旧布局 |
| B07-2 | P2 | ScrollArea | thumb/轨道颜色硬编码黑色与浅灰,暗色模式不适配 |
| B07-3 | P2 | ScrollArea | corner 的 [data-hovered] 是永远不可达的死状态 |
| B07-4 | P2 | ScrollArea.Autosize | 内联 onOverflowChange 导致 ResizeObserver 每次父渲染 disconnect/re-observe |
| B07-5 | P2 | Grid | GridCol offset 未钳位,offset ≥ columns 时仍产生隐式列横向溢出 |
| B07-6 | P2 | Grid | grow 模式下响应式 cols 静默失效(columns 只取 base 值) |
| B07-7 | P2 | Image | fallbackSrc 加载失败不回退 fallback 节点,且 fallbackSrc 的 img 不透传 onLoad/onError |
| B07-8 | P2 | BackgroundImage | url() 未加引号,含空格/括号的 src 生成非法 CSS |
| B07-9 | P2 | NavLink | 嵌套展开按钮缺 aria-expanded |
| B08-10 | P2 | Carousel | 键盘处理挂 capture 且不检查 defaultPrevented/交互控件,slide 内方向键控件被连带翻页 |
| B08-11 | P2 | Carousel | 指示器 tab 语义不完整、region 无可访问名称 |
| B08-12 | P2 | Pill | 移除按钮 aria-hidden + tabIndex=-1,独立使用时键盘无法移除 |
| B08-13 | P2 | Loader | type 未注册时静默渲染空白节点 |
| B08-14 | P2 | Loader | 类型声明与实现不符(ref=SVGSVGElement / ElementProps<'svg'>,实际渲染 span/div) |
| B08-15 | P2 | Upload | maxFiles 槽位按入口快照计算,await 期间并发变更可超额 |
| B08-16 | P2 | Upload | 声明的 stylesName `fileError` 未接线(死样式槽) |
| B08-17 | P2 | Portal | 除 className/style/id 外的 div props 静默丢弃 |
| B08-18 | P2 | ActionIconGroup | useProps 双调用 |
| B08-19 | P2 | ActionIconGroupSection | color prop 泄漏到 DOM |
| B08-20 | P2 | CodeHighlightTabs | 文件按钮 key 用 fileName(可缺省、可重复) |
| B08-21 | P2 | CodeHighlightTabs | 文件切换按钮无 tablist/tab/aria-selected 语义 |
| B08-22 | P2 | CodeHighlight/Pill | 文档默认值与实现不符 |
| B08-23 | P2 | Notification/TableOfContents/TypographyStylesProvider | RTL 物理属性未用逻辑属性 |
| B08-4 | P2 | Button/ActionIcon | loading 态缺少 aria-busy,读屏无"忙"状态 |
| B08-5 | P2 | Button/ActionIcon | polymorphic anchor 模式下 disabled/loading 不拦截点击 |
| B08-6 | P2 | Button/CloseButton | hover 样式无 `(hover: hover)` 媒体守卫,触摸设备粘滞高亮 |
| B08-7 | P2 | Notification/Carousel | 默认 aria-label / 状态文案中英混杂 |
| B08-8 | P2 | Notifications | limit prop 运行时变化不触发重排,已显示列表不收敛 |
| B08-9 | P2 | Notifications | store 字段(position/priority/__sequence/自定义字段)透传泄漏到 DOM |
| B09-10 | P2 | InlineDateTimePicker | allowDeselect 接线为死参数(点击已选日期无法反选) |
| B09-11 | P2 | DatePicker | 预设选择后的层级恢复未经 clampLevel |
| B09-12 | P2 | DateTimePicker | dropdownType="modal" 时 Escape/遮罩关闭不触发 onDropdownClose、不做收尾钳制(popover 路径才有) |
| B09-13 | P2 | TimePicker | 下拉时间控件/预设列表 tabIndex=-1,键盘完全不可达 |
| B09-3 | P2 | Calendar | 键盘导航 effect 依赖每渲染新建的 handler,document 监听逐渲染重挂 |
| B09-4 | P2 | DatePicker | `type` prop 未解构,泄漏为日历根节点 DOM 属性 |
| B09-5 | P2 | InlineDateTimePicker | currentLevel 未过 clampLevel 且不随受控 level/defaultLevel 纠偏,时间面板可能永不渲染 |
| B09-6 | P2 | InlineDateTimePicker | 清空时间输入不同步合成值,提交时旧时间复活 |
| B09-7 | P2 | TimeControlsList | step<=0 时渲染期死循环(页面冻结) |
| B09-8 | P2 | AmPmInput | input 模式接受任意自由文本,am/pm 语义静默失效 |
| B09-9 | P2 | DateInput | allowDeselect=false + clearable=true 时清空输入框仍会把值置 null(与 prop 语义不符) |
| B10-3 | P2 | toDateString / defaultDateFormatter | `''` 原样透传导致受控 `value=""` 显示 "Invalid Date" |
| B10-4 | P2 | assignTime | '24:00' 跨天滚动与 NaN 无防御;null 日期静默取「今天」且未经 min/max 钳制 |
| B11-2 | P2 | YearView | withOutsideDays=false 时方向键遇占位格中断(⑱批同型修复未同步) |
| B11-3 | P2 | MobileMonthView | 事件列表「All day」硬编码英文,绕过 labels.allDay 覆盖 |
| B11-4 | P2 | MobileMonthView | aria-selected 挂在无 role 的 button 上,ARIA 语义无效 |
| B11-5 | P2 | ViewSelect / MonthYearSelect | 无激活值时 roving tabindex 整体失效(月份列表无兜底) |
| B11-6 | P2 | YearView / MobileMonthView / AgendaView | 事件展开管线未 memo,渲染期全量重算 rrule 展开 |
| B12-3 | P2 | useDragDropHandlers | 已知预存 tsc 错误:泛型 T 不能赋给 DropContext 的 DropTarget(已复核成立,包级 tsc 目前红) |
| B12-4 | P2 | DropTarget 类型双份定义 + useDragState 的 dropTarget 切片成死状态 | DropTarget 类型双份定义 + useDragState 的 dropTarget 切片成死状态 |
| B12-5 | P2 | sortEvents | Array.prototype.toSorted(ES2023)与 tsconfig target ES2015 相悖,旧浏览器运行时崩溃 |
| B12-6 | P2 | toDateString | 返回值格式与 DateStringValue 文档(YYYY-MM-DD)不符,且与同类型兄弟工具不一致 |
| B12-7 | P2 | useEventResize / useHorizontalEventResize | resize effect 依赖仅 [isResizing],拖拽中改 startTime/endTime/intervalMinutes 使用过期闭包 |
| B13a-10 | P2 | form/paths | setPath 每次键入对整表值做 klona 深克隆;getSplittedPath 不支持点号转义 |
| B13a-11 | P2 | form/stories | ReorderWithErrors 的 map 返回无 key 的 Fragment;Dirty story 列表用 index 作 key |
| B13a-12 | P2 | hooks/use-counter | options 参数类型误标为 UseCounterHandlers,TS 下无法合法传入 min/max |
| B13a-13 | P2 | hooks/use-mask | tokens 默认值 `{}` 每渲染新身份,击穿 slots memo 导致 input 监听每渲染重挂 |
| B13a-14 | P2 | hooks/use-input-state | getInputOnChange 对 file 输入仍存 fakepath 字符串,与 form 版 ⑮ 修复不一致 |
| B13a-15 | P2 | hooks/use-hotkeys | 未过滤 IME 合成期的 keydown |
| B13a-16 | P2 | hooks/use-fetch | url 为函数时返回的 promise 不受 abort 控制 |
| B13a-17 | P2 | hooks/use-mutation-observer | useMutationObserverTarget 的 target 为内联函数时每渲染 disconnect/重建 observer |
| B13a-7 | P2 | form/actions | 表单未传 name 时仍向 window 绑定 17 个 `ui-form:undefined:*` 监听 |
| B13a-8 | P2 | form/use-form | 同步抛异常的规则使 onSubmit 中 submitting 卡死 true |
| B13a-9 | P2 | form/use-form | getInputNode 对含引号的 path 生成非法选择器直接抛错 |
| B13b-2 | P2 | SearchFilter | setFieldValue 基于渲染闭包展开 currentValues,同一事件批次内连续更新会丢字段 |
| B13b-3 | P2 | Notifications | limit/position 同步 effect 依赖缺 store |
| B13b-4 | P2 | notifications 包入口 | NotificationPosition 类型未导出 |
| B13b-5 | P2 | Carousel(@xiaoye-react/carousel) | aria-label 全英文,与仓库中文 aria-label 方向不一致 |
| B13b-6 | P2 | demo | CodeDemo.module.css 整文件死代码 |
| B13b-7 | P2 | demo | package.json exports 声明的 ./styles.css、./styles.layer.css 文件不存在 |
| B14-1 | P2 | Tree(TreeNode/FlatTreeNode) | 键盘方向键硬编码不随 dir 翻转,而 CSS 已用逻辑属性,RTL 下视觉与键盘语义相反 |
| B14-10 | P2 | docs components/ | 12 个死 demo 文件导入不存在的具名导出(d05846a0「缺失导出」同类,当前未被任何 md 引用) |
| B14-11 | P2 | TimePicker | `CloseButtonProps` 从 Drawer 模块顶层导入,实际是 Drawer 命名空间成员(B11-1 同病不同灶,ui 包 tsc 红的又一独立根因) |
| B14-2 | P2 | Carousel(ui 包副本) | embla 未传 direction、方向键不接 useDirection;@xiaoye-react/carousel 同名实现已接,两副本行为分叉 |
| B14-3 | P2 | Menu/Menubar | 子菜单打开键与横向导航键硬编码,RTL 不翻转(与 Popover 定位自动翻转相互矛盾) |
| B14-4 | P2 | List | 嵌套缩进、原生 marker 与图标间距全物理属性,无 RTL 分支 |
| B14-5 | P2 | DataTable/Table/Descriptions/Stepper/Checkbox/Radio | 表格与文本 text-align:left、分隔边框、required 星号边距等物理属性补漏(无 RTL 适配) |
| B14-6 | P2 | Chip | 默认背景变量 `--ui-color-default-bg` 全库未定义,未选中态(filled 默认 variant)背景恒透明 |
| B14-7 | P2 | Tabs | `--ui-primary-color-outline` 未定义(--ui-primary-color-* 家族无 outline 成员),--tabs-bd 链式失效、分隔边框色回落 currentColor |
| B14-8 | P2 | DataTable/Transfer/Cascader/Upload | `--ui-default-radius` 拼写错误(应为 `--ui-radius-default`),自定义 defaultRadius 主题对这 6 处静默失效 |
| B14-9 | P2 | docs demos | a6d8f6f9 图片自托管迁移漏网:5 个 demo 共 32 处外链图片仍在(unsplash/icons8) |

---

# 问题明细

### [B02-1] P0 · ModalStack/DrawerStack · Stack 内渲染 Modal/Drawer 触发无限 effect 循环,抛 "Maximum update depth exceeded"

位置:packages/ui/src/components/Modal/ModalStack.tsx:27-34、packages/ui/src/components/Modal/Modal.tsx:152-160、packages/ui/src/components/Drawer/DrawerStack.tsx:27-34、packages/ui/src/components/Drawer/Drawer.tsx:197-205

证据(ModalStack.tsx):
```tsx
addModal: (id: string, zIndex: number | string) => {
    setStack((current) => [...new Set([...current, id])])   // id 已存在时仍返回新数组身份
    ...
},
```
(Modal.tsx)
```tsx
useEffect(() => {
    if (!stackCtx) { return undefined }
    stackCtx.addModal(autoId, zIndex!)
    return () => stackCtx.removeModal(autoId)
}, [stackCtx, autoId])   // stackCtx 是 Provider 内联 value,每次渲染新身份
```
循环链:Modal 挂载 effect 调 addModal → setStack 永远返回新数组身份(即使内容不变)→ ModalStack 重渲染 → context value 为内联字面量(新对象)→ Modal 作为 consumer 重渲染 → effect 依赖 stackCtx 变化 → cleanup(removeModal)+ setup(addModal)再次 setState → 无限循环。React 19 在 50 次嵌套更新后抛 "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect..."。
**已用仓库 react@19.2.7 + jsdom 以同构模式复现:53 次 addModal 调用后抛错。** 文档 demo(packages/@xiaoye-react/docs-demos/src/demos/core/Modal/Modal.demo.stack.tsx、Drawer.demo.stack.tsx)在运行时即命中此错误(构建期不暴露,运行时控制台报错 + 白耗 50 轮渲染;React 19 默认 onUncaughtError 保留已提交 UI,故文档站"看起来能用"而未被察觉)。ui 包 529 项测试无一渲染 Stack,未拦截。

建议:三处配合修——(1) addModal 改 `setStack(current => current.includes(id) ? current : [...current, id])`(身份稳定,重复注册不再触发渲染);(2) removeModal 同理在结果与 current 等长时返回原引用;(3) context value 用 useMemo 包裹(函数句柄 useCallback),避免 Stack 父级渲染击穿全部 consumer 的 effect 依赖。修后补 Stack 渲染回归测试。

回归关联:上轮第⑰批新接线自身引入(非冲掉旧修复)。

---

[B01-1] P1 · UIProvider · stylesTransform/getStyleNonce 无入口,context 恒为 undefined → Box `sx` 全库死参数、emotion 集成死接线
位置:packages/ui/src/core/UIProvider/UIProvider.tsx:96-123(具体 103、108 行)、13-32(UIProviderProps);packages/ui/src/core/UIProvider/UI.context.ts:50、69;packages/ui/src/core/Box/Box.tsx:89-90;packages/ui/src/emotion/Emotion.story.tsx:94
证据:
```ts
// UIProvider.tsx:96-110 —— value 硬编码,且 UIProviderProps(13-32 行)根本没有这两个 prop
const value: UIContextValue = useMemo(
    () => ({
        ...
        getStyleNonce: () => undefined,      // 103 行:恒 undefined,无 prop 可覆盖
        ...
        stylesTransform: undefined,          // 108 行:恒 undefined,无 prop 可覆盖
    }), ...)
```
```tsx
// Box.tsx:89-90 —— sx 唯一消费路径依赖 context.stylesTransform?.sx
const useSxTransform = useUISxTransform()
const transformedSx = useSxTransform?.()?.(styleProps.sx)   // 恒 undefined,sx 内容被静默丢弃
```
```tsx
// emotion/Emotion.story.tsx:94 —— 传了一个 UIProvider 不认识的 prop,被静默忽略
<UIProvider stylesTransform={emotionTransform}>
```
说明:UIContext.Provider 全库只有 UIProvider.tsx:150 这一处写入(grep 证实),`UIStylesTransform`/`getStyleNonce` 在 UIContextValue 中声明(9-19、50、69 行)、`useStyles` 的 `withStylesTransform` 分支(styles-api/use-styles/use-transformed-styles.ts:21-38)与 Box `sx` 均为其消费者,但没有任何 Provider 入口能设置它们。后果:①`<Box sx={...}>` 按类型合法但样式永不生效(死参数);②emotion 包的 `emotionTransform` 与 EmotionSxTransform/EmotionStylesTransform 两个 story 演示的用法完全无效;③CSP 场景无法注入 style nonce(InlineStyles/UICssVariables/use-ui-color-scheme 都在消费恒为 undefined 的 nonce)。
建议:UIProviderProps 增加 `stylesTransform?: UIStylesTransform` 与 `getStyleNonce?: () => string | undefined`,解构后进 value 与 memo 依赖;或提供独立 context 注入组件。若 sx/emotion 集成短期内不打算支持,应从 Box 类型中移除 sx 并删除 emotionTransform 死代码,避免"看起来支持"的假 API。
回归关联:无(新发现)。

---

---

[B01-2] P1 · UIProvider · 嵌套受控 Provider 的 colorScheme 首挂被外层 effect 覆盖,局部色彩方案无法生效
位置:packages/ui/src/core/UIProvider/UIProvider.tsx:127-147
证据:
```ts
// 127-147 行:每个 UIProvider 实例都无条件写同一个全局属性
useEffect(() => {
    ...
    root.setAttribute('data-ui-color-scheme', resolveColorScheme(colorScheme))
    ...
}, [colorScheme, getRootElement])
```
说明:`data-ui-color-scheme` 写在 `document.documentElement`(全局唯一)。嵌套场景 `<UIProvider colorScheme="light"><UIProvider colorScheme="dark">…</UIProvider></UIProvider>` 中,React 挂载期 passive effects 自底向上执行:内层先写 `dark`,外层后写 `light` 并最终胜出——内层受控的 `dark` 在首挂即被抹掉,而内层 context 对其子树仍报告 `dark`(JS 逻辑与 CSS 变量实际取值分裂)。文件内 60-62 行注释明确表述过"避免嵌套 Provider 劫持整站主题"的意图,未受控嵌套(继承)已处理,受控嵌套仍是半成品(内层也写属性但注定被覆盖)。
建议:约定只有根 Provider 写属性——内层实例(可检测 `parentContext !== null`)跳过写属性与 matchMedia 订阅;或按"子层优先"用标志位仲裁。若产品语义本就是"colorScheme 全局唯一、嵌套不支持覆盖",也应让内层不写属性并在 dev 下告警,而不是产生确定性的错误终态。
回归关联:无(新发现)。语义确认:嵌套受控覆盖是否受支持需裁决(见「待裁决/待核实」)。

---

---

### [B02-2] P1 · ModalStack/DrawerStack · zIndex 按挂载顺序而非打开顺序分配,乱序打开层叠颠倒

位置:packages/ui/src/components/Modal/Modal.tsx:152-160(注册不看 opened)、packages/ui/src/components/Modal/ModalStack.tsx:36(getZIndex 用 stack.indexOf);Drawer.tsx:197-205、DrawerStack.tsx:36 同构

证据(Modal.tsx):
```tsx
useEffect(() => {
    if (!stackCtx) { return undefined }
    stackCtx.addModal(autoId, zIndex!)   // 挂载即注册,与 opened 无关
    return () => stackCtx.removeModal(autoId)
}, [stackCtx, autoId])
```
(ModalStack.tsx)
```tsx
getZIndex: (id: string) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
```
useModalsStack 的标准用法是多个 Modal 常驻挂载(按 JSX 顺序得 index),打开顺序任意:先打开 JSX 中靠后的 modal-b 再打开 modal-a 时,后打开的 modal-a 的 zIndex = calc(max+0+1) 反而低于 modal-b(max+1+1),视觉上后打开的被压在下面;Esc 仲裁(use-modal 的 modalStack)按 opened push/pop 是打开序,z-index 却是挂载序,两者不一致。

建议:注册/注销按 opened 门控(`if (!opened) return undefined; addModal; return () => removeModal`,依赖加 opened),使 stack 顺序=打开顺序(与 use-modal 的 Escape 栈语义一致);或维护 openAt 时间戳排序。

回归关联:上轮第⑰批决策"按挂载顺序递增分配"——实现与决策文本一致,但决策效果与 useModalsStack 的任意顺序打开用例冲突,属决策自身缺陷(无测试锁定该语义,故进正式问题单而非待裁决)。

---

### [B02-3] P1 · useModalsStack/ModalStack · stackId 死参数泄漏到 DOM;context.stack/currentId 存 useId 自动 id,消费者无法比对

位置:packages/ui/src/components/Modal/use-modals-stack.ts:36-43、packages/ui/src/components/Modal/Modal.tsx:121-162、packages/ui/src/components/Modal/ModalStack.tsx:36-38

证据(use-modals-stack.ts):
```tsx
const register = useCallback(
    (modal: T) => ({
        opened: state[modal],
        onClose: () => close(modal),
        stackId: modal        // 返回给消费者
    }),
    [state, close]
)
```
文档用法 `{...stack.register('delete-page')}` 把 stackId 一并展开进 `<Modal>`;Modal 的解构清单不含 stackId(grep 全仓库无消费点)→ 落入 `...others` → ModalBase → Box → DOM 渲染出 `stackid="delete-page"` 属性,React 19 dev 下同时报 "React does not recognize the `stackId` prop" 告警。另外 ModalStack context 的 `stack`/`currentId` 存的是 useId 生成的自动 id(Modal.tsx:150 `autoId = useId(id)`),消费者拿用户侧 stack id 永远比对不上,`currentId` 是死接口。

建议:Modal/Drawer 解构剔除 stackId(不透传 DOM),或真正接线(以 stackId 作为注册键);currentId 返回值对齐用户 id 体系。

回归关联:上轮第⑰批新接线引入。

---

### [B02-4] P1 · HoverCardTarget · React 19 下 child 自带 ref 时合并 ref 被 getReferenceProps(childProps) 覆盖,floating reference 接线丢失

位置:packages/ui/src/components/HoverCard/HoverCardTarget/HoverCardTarget.tsx:45-55

证据:
```tsx
return cloneElement(child, {
    'aria-haspopup': 'dialog',
    ...
    ref: targetRef,                              // 51 行:useMergedRef(ctx.reference, ref, childProps.ref)
    className: [childProps.className].filter(Boolean).join(' '),
    ...ctx.getReferenceProps?.(childProps)       // 54 行:childProps 含 ref,展开在 ref 之后,覆盖 51 行
})
```
floating-ui mergeProps(node_modules/@floating-ui/react/dist/floating-ui.react.mjs:3140)对非 `on*` 键后展开的 userProps 胜出:`getReferenceProps(childProps)` 返回值带 `ref: childProps.ref`,对象字面量后键覆盖前键,最终 ref 只剩 child 自带 ref,`ctx.reference`(setReference)与外层 ref 全部丢失 → useFloating 注册不到 reference → useHover 绑不上 mouseenter(悬停打不开)、x/y 恒 0。**已用仓库 react@19.2.7 运行时验证:该模式下 ctx.reference 回调 0 次触发,仅 child 自身 ref 执行。** 同类缺陷 e983938c 刚在 Tooltip 修过(Tooltip.tsx:337-345 的正确写法是 ref 放在 userProps 对象内部、展开 childProps 之后);HoverCard 这里是⑦批"保留 child 事件处理器"修复引入的回归,且方向写反。

建议:对齐 Tooltip 写法——`ctx.getReferenceProps({ ...childProps, ref: targetRef, className })` 单对象传入(或把 ref 键移到 spread 之后)。

回归关联:上轮第⑦批 HoverCardTarget 事件处理器修复引入;e983938c 同类(Tooltip 侧完好)。

---

### [B02-5] P1 · Popover/HoverCard · StylesApi(classNames/styles/vars/unstyled/radius/shadow)全部死参数,getStyles 创建后从未接线

位置:packages/ui/src/components/Popover/Popover.tsx:151-156(radius/shadow 声明)、199-209(useStyles 创建)、309-348(context value 与渲染均未消费);packages/ui/src/components/HoverCard/HoverCard.tsx:157-167、202-235;packages/ui/src/components/Popover/PopoverDropdown/PopoverDropdown.tsx:64、packages/ui/src/components/HoverCard/HoverCardDropdown/HoverCardDropdown.tsx:42

证据(Popover.tsx):
```tsx
const getStyles = useStyles<PopoverFactory>({ name: 'Popover', ..., varsResolver })
// ...此后整个文件再无 getStyles 引用(grep 证实);
// context value(Popover.context.ts PopoverContextValue)不含 getStyles;
// 渲染仅 <div {...others}>{children}</div>
```
(PopoverDropdown.tsx:64)
```tsx
className={['ui-Popover-dropdown', className].filter(Boolean).join(' ')}   // 硬编码静态类,不走 styles api
```
后果:`<Popover radius="lg" shadow="xl" classNames={{dropdown:...}} styles={{dropdown:...}} vars={...} unstyled>` 全部无效——varsResolver 产出(–popover-radius/–popover-shadow)经 getStyle 只在 getStyles 调用时生效,从未调用,CSS 只剩 fallback;HoverCard 同构。PopoverProps/HoverCardProps 均 extends StylesApiProps 并声明 radius/shadow 文档,属"实现与类型/文档不符"。Menu 能用是因为它走自己的 Menu context getStyles(MenuDropdown.tsx:60),不经 Popover。

建议:对齐 Menu 模式——把 getStyles(或 resolvedClassNames/resolvedStyles)放进 PopoverContextValue,PopoverDropdown/HoverCardDropdown 的 dropdown 与 arrow(FloatingArrow 处)改 `ctx.getStyles('dropdown'/'arrow', { className, style })`;wrapper div 挂 `getStyles('root')` 或删掉死声明。

回归关联:无(新发现,历史遗留)。

---

### [B02-6] P1 · ModalBase · 消费者 __vars 被 JSX 内联 __vars 整体覆盖丢弃,Spotlight scrollable/maxHeight 死参数

位置:packages/ui/src/components/ModalBase/ModalBase.tsx:187-195;受影响:packages/ui/src/components/Spotlight/SpotlightRoot.tsx:215、Spotlight/Spotlight.module.css:7-11(以及一切向 Modal/Drawer/Dialog 传 __vars 的消费方)

证据(ModalBase.tsx):
```tsx
<Box
    ref={ref}
    {...others}              // 消费者的 __vars(Spotlight 的 --spotlight-max-height)在这里
    id={_id}
    __vars={{                // 硬编码在 spread 之后,整体替换消费者 __vars
        '--mb-z-index': (zIndex || getDefaultZIndex('modal')).toString(),
        '--mb-shadow': getShadow(shadow),
        '--mb-padding': getSpacing(padding)
    }}
>
```
上游 Mantine ModalBase 解构 `__vars` 并写 `__vars={{ ...__vars, '--mb-z-index': ... }}` 合并(已核 upstream 源码);本仓库未解构、未合并。SpotlightRoot 传的 `__vars={{ '--spotlight-max-height': scrollable ? rem(maxHeight) : undefined }}` 到不了 DOM → `.content { max-height: var(--spotlight-max-height) }`(Spotlight.module.css:10)因变量未定义计算为 invalid → max-height:none,`scrollable` + `maxHeight`(文档 @default 400)两个 prop 完全失效,内容不被钳制(仅 .actionsList 自身 calc(100vh - 15rem) 兜底)。

建议:ModalBase 解构 __vars 并合并:`__vars={{ ...__vars, '--mb-z-index': ..., '--mb-shadow': ..., '--mb-padding': ... }}`。

回归关联:无(新发现)。

---

### [B02-7] P1 · Menu.Sub · 子菜单下拉(Portal)内容 mousedown/keydown 命中父 Menu 的 click-outside,closeOnItemClick=false 或子菜单内非关闭型交互被整单误关

位置:packages/ui/src/components/Menu/MenuSubDropdown.tsx:46-73(经 Popover.Dropdown → Portal 共享节点)、packages/ui/src/components/Popover/Popover.tsx:267-269(父 Menu 的 clickOutsideNodes 不含子下拉)、packages/hooks/src/use-click-outside/use-click-outside.ts:32-46(composedPath 判定)

证据(Popover.tsx):
```tsx
const clickOutsideNodes = useMemo(() => [targetNode, dropdownNode], [targetNode, dropdownNode])
useClickOutside(handleOutsideClick, clickOutsideEvents, clickOutsideNodes)
```
Menu 的 clickOutsideEvents 默认含 `['mousedown', 'touchstart', 'keydown']`(Menu.tsx:121)。Menu.Sub 的下拉经 PopoverDropdown → OptionalPortal(withinPortal 默认 true)挂到 body 级共享 Portal 节点,与父 Menu 下拉是兄弟节点:在子下拉内 mousedown(点任何 Menu.Item / MenuSearch 输入框)或 keydown(MenuSearch 打字)时,composedPath 不含父 dropdownNode/targetNode → 父 Menu 的 onClose 触发,整个菜单连同子菜单一起关闭。后果:`closeOnItemClick={false}` 对子菜单项不生效(仍被 outside-click 关闭);子下拉内放 MenuSearch/CheckboxGroup 等非关闭交互完全不可用(首个 mousedown/keydown 即关闭)。MenuSub 自身 Popover 硬编码 closeOnClickOutside(122 行)不背锅,问题在父层节点集合不含子层浮层。

建议:Popover 的 click-outside 判定改为"点击位于任意已打开后代浮层内也不触发"(如向 context 暴露 registerDescendantDropdown,或将子下拉 ref 上报父 Popover);最低成本方案:MenuDropdown 检测 `[data-menu-dropdown]` 族-shared 容器(shared portal 节点内所有 data-menu-dropdown 互不视为外点)。

回归关联:无(新发现;⑩批 Menu.Sub 键盘修复只覆盖键盘切换,未覆盖外点判定)。

---

### [B02-8] P1 · ComboboxPopover/Combobox 系 · 缺 data-ui-stop-propagation 接线,Modal 内 Escape 双关(浮层与 Modal 一起关闭)

位置:packages/ui/src/components/ComboboxPopover/ComboboxPopover.tsx:240-261(DropdownSearchInput 无标记);根因同批文件:packages/ui/src/components/Combobox/ComboboxDropdown.tsx(整个元素无标记、无自有 Escape 处理)、ComboboxPopoverTarget.tsx:40-63(target 无标记)

证据(grep 全组件目录,data-ui-stop-propagation 仅存在于 Menu/Menubar/Popover/ModalBase 四族):
```tsx
// ComboboxDropdown.tsx —— 无 data-ui-stop-propagation、无 onKeyDown Escape
<Box ref={mergedRef} id={ctx.dropdownId} role="listbox" ... >
```
Escape 协调链(⑦批)依赖 `event.target.closest('[data-ui-stop-propagation="true"]')`(use-modal.ts:42,window 捕获阶段,先于任何元素级 handler 与 preventDefault 执行)。Combobox 系(Select/Autocomplete/ComboboxPopover 等)的 target 与 dropdown 均无标记:Modal 内打开这类下拉按 Escape,Combobox 的 onTargetKeyDown(Combobox.tsx:316-320)preventDefault 并关下拉,但 Modal 捕获监听此前已判定 shouldTrigger=true → Modal 同时关闭。Popover/Menu 已修的同类问题在 Combobox 系是漏网。

建议:ComboboxDropdown 与 Combobox 消费侧 target(ComboboxPopoverTarget/ComboboxTarget)打开期间挂 `data-ui-stop-propagation`,与 PopoverTarget/PopoverDropdown 对齐。**注:根因主文件在 Combobox 目录(属其他批次范围),建议与该批次合并处理;本条以 B02 内可见的 ComboboxPopover 表面立案,标待跨批次核实协同。**

回归关联:上轮第⑦批 Escape 协调链覆盖不全(新发现缺口,非冲掉)。

---

[B03-1] P1 · MultiSelect · searchable 模式点击输入框本体误关已展开的下拉(与 Select 行为相反)
位置:packages/ui/src/components/MultiSelect/MultiSelect.tsx:487-495(辅证 packages/ui/src/components/Combobox/ComboboxTarget.tsx:31-32,45-50)
证据:Combobox.Target 的子元素是 MultiSelectTarget(div),`isTextInput = childProps.component === 'input' || child.type === 'input' || child.type === 'textarea'` 判 false → `ignoreClick=false` → 点击冒泡到 wrapper 时执行 `ctx.onTargetClick()`(toggle)。输入框是 MultiSelectTarget 的后代,点击输入框(定位光标/继续编辑搜索词)同样冒泡触发 toggle,把已展开的下拉关掉:
```tsx
// ComboboxTarget.tsx
const isTextInput = childProps.component === 'input' || child.type === 'input' || child.type === 'textarea'
const ignoreClick = isTextInput && childProps.readOnly !== true
...
onClick: (event) => {
    if (!ctx.disabled && !ignoreClick) {
        ctx.onTargetClick()   // toggle:opened 时点击输入框 → 关闭
    }
```
对照 Select.tsx:364-377:searchable 时 InputBase(component="input",readOnly=false)是 Target 直接子元素 → ignoreClick=true,点击输入框不会关下拉,由 onMouseDown(Select.tsx:395-403,仅 `!opened` 时打开)负责打开。searchable MultiSelect 无此豁免。MultiSelect.test.tsx 只编码"click 打开",未编码"click 输入框关闭",该行为无测试保护。
建议:searchable 时对输入框区域点击不 toggle(如 MultiSelectTarget onClick 检查 event.target 是否 input/textarea 内则只聚焦不 toggle),或对齐 Select 的 ignoreClick 语义。
回归关联:无(新发现)。

---

[B03-2] P1 · TagsInput · 点击输入框本体误关建议下拉(同 B03-1 模式)
位置:packages/ui/src/components/TagsInput/TagsInput.tsx:314-322(辅证 ComboboxTarget.tsx:31-50)
证据:TagsInput 无 searchable 开关,输入框永远可编辑(输入 tag 是核心交互)。点击输入框冒泡到 TagsInputTarget(ComboboxTarget 判 isTextInput=false → toggle)直接关闭下拉,用户输入过程中点击调整光标即丢掉建议列表:
```tsx
<Combobox.Target>
    <TagsInputTarget className={classes.wrapper} onClick={...focus input...}>
        ...
        <InputBase ... component="input" value={searchValue} onChange={...setOpened(true)...} />
```
建议:同 B03-1,输入框命中区域不参与 toggle(或 toggle 仅绑定在 pills 区/chevron 区)。
回归关联:无(新发现)。

---

[B03-3] P1 · Cascader · 键盘无法从输入框进入面板,选项键盘不可达(仅鼠标可选中)
位置:packages/ui/src/components/Cascader/Cascader.tsx:475-497,500-550,422-461
证据:面板项是原生 `<button role="option">`,不经过 Combobox.Option 注册,Combobox 选项注册表为空 → `Combobox.tsx:309` Enter 分支 `options[activeIndex]` 恒 undefined(打开态 Enter 无动作),`aria-activedescendant`(ComboboxTarget.tsx:42-43)指向不存在的 id。面板自身的 `handlePanelKeyDown`(447-459,ArrowUp/Down/Left/Right)只有当面板按钮已聚焦才生效,而组件没有任何"输入框 → 面板"的焦点移交逻辑;下拉挂在 body 末尾的 Portal,Tab 也无法按视觉顺序到达:
```tsx
const handlePanelKeyDown = (event, node, parentPath, levelIndex, itemIndex) => {
    // 仅在面板 button 已聚焦时被调用
    if (event.key === 'ArrowDown') { const next = columnItems[itemIndex + 1]; ... }
```
结果:键盘用户只能打开/关闭面板(ArrowDown/Escape),无法选择任何节点(单选/多选/搜索模式皆然)。对照 TreeSelect(TreeSelectOption 走 Combobox.Option 注册,键盘可选)。
建议:打开面板后将首列首项聚焦(ArrowDown 从输入框进入面板);或面板项接入 Combobox.Option 注册表复用 ctx 键盘导航。
回归关联:无(新发现)。

---

[B04-1] P1 · Input · `_rightSection` 恒为 JSX 元素,右侧 section 恒渲染、`data-with-right-section` 恒真,所有输入组件右侧恒预留 ~34px 空白
位置:packages/ui/src/components/Input/Input.tsx:284-293、311、361-372
证据:
```tsx
// 以 JSX 而非普通函数方式调用,使其成为独立组件边界……
const _rightSection: React.ReactNode = (
    <InputClearSection __clearable={__clearable} ... />
)
...
mod={[{ ...,'data-with-right-section': !!_rightSection, ... }, mod]}
...
{_rightSection && (
    <div data-position="right" {...getStyles('section', ...)}>{_rightSection}</div>
)}
```
JSX 元素是对象,恒 truthy。即使 `rightSection`/`__clearable`/`__defaultRightSection` 全空(InputClearSection 返回 undefined),`!!_rightSection` 仍恒为 true,右侧 section div 恒渲染。配合 Input.module.css:73-74 的 `&[data-with-right-section] { --input-padding-inline-end: var(--input-right-section-size); }`(`--input-right-section-size` 默认 = height − 2px,sm 档 34px,见 :32),所有不含右侧内容的输入框(TextInput/Textarea/JsonInput/PasswordInput(visibilityToggle=false)/NumberInput(hideControls)/FileInput(无 clearable)等)右侧文字可用宽度恒少 34px。
git 佐证:`git log -L 281,296` 显示 9347c9fd(2026-07-21)把原先的函数调用 `InputClearSection({...})`(返回真实 ReactNode,可为 undefined)改为 JSX 包装,truthiness 语义在此被改变。
建议:`InputClearSection` 返回结果不可在外层判空的情况下,外层改用条件变量(如先计算 `hasRightSection = !!(rightSection || (loading && loadingPosition === 'right') || (__clearable && __clearSection) || __defaultRightSection)`)驱动 mod 与 section div 渲染;或恢复「计算 ReactNode 再判断」的旧结构,把 hooks 边界顾虑留在 InputClearSection 内部不使用 hooks 的现状下。
回归关联:非上轮 199 项条目,系 2026-07-21 修复批次引入的更早回归,上轮未发现(新发现)。

---

[B04-2] P1 · PinInput · 删除中间位时空串 `join('')` 塌陷,后续字符整体前移、onChange 值丢位
位置:packages/ui/src/components/PinInput/PinInput.tsx:179-185(setInputValue)
证据:
```tsx
const setInputValue = (index: number, nextValue: string) => {
    const currentValues = valuesRef.current
    const chars = Array.from({ length: length! }, (_, i) => currentValues[i] || EMPTY_VALUE)
    chars[index] = nextValue
    const nextValues = chars.join('')   // 空串不占位,空洞丢失
    updateValue(nextValues)
}
```
length=4、values='1234' 时删除第 2 位:chars=['1','','3','4'],join 得 '134'(长度 3)。渲染 `values[index]` → index1 显示 '3'、index2 显示 '4'、index3 空,后续位整体左移;onChange('134') 位置信息丢失。此后在第 3 格输入 '5' 得 ['1','2','5','4'] → '1254',用户认知位序与实际错位。内部状态用 string 而非 string[] 存储,天然不支持空洞。
建议:内部 values 改为定长 string[](每格一字符,空为 ''),渲染/onChange(onComplete 前 join)时再拼 string;Backspace/Delete/单格输入均按位写入数组。
回归关联:上轮 P1(line 80,`PinInput.tsx:181-184`)完全同一条——仓库中该文件自 2026-07-22(cc682245)后无任何提交,上轮报告声称已完成的修复并未落地到本仓库(修复被冲掉/未提交)。测试 PinInput.test.tsx 亦无中间位删除用例。

---

[B04-3] P1 · MaskInput · handleChange 无 IME 合成守卫,组合期间直接改写 DOM value 会截断输入法
位置:packages/ui/src/components/MaskInput/MaskInput.tsx:368-421(handleChange)
证据:
```tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value
    ...
    if (inputRef.current) {
        const selectionStart = inputRef.current.selectionStart ?? inputValue.length
        inputRef.current.value = newDisplay      // 组合期间强写 value = 取消/打断 IME
        ...
        inputRef.current.setSelectionRange(nextCursor, nextCursor)
    }
```
React 的 onChange 基于 input 事件,IME 组合期间每敲一个拼音字母都会触发。含字母 token 的掩码(如 `*`/`L`/`a`)下,组合文本逐字符被掩码吞掉并强写 `newDisplay`,组合框被打断,中文输入法基本不可用;纯数字掩码下,组合中间态(含字母)也会触发 `inputRef.current.value = newDisplay` 改写,导致组合异常提交。上轮第②批修的「use-mask 光标恢复与 IME 守卫」落在 hooks(use-move 同目录的 use-mask.ts:154-156、215-254 有完整 compositionstart/end 守卫),但 MaskInput 组件是独立实现、根本不 import use-mask,守卫没有覆盖组件本体。
建议:参考 use-mask.ts 的做法,在组件内用 `composingRef` + 原生 compositionstart/compositionend 监听(或在 handleChange 里判 `event.nativeEvent.isComposing`),组合期间跳过格式化与 DOM 改写,compositionend 后统一应用掩码。
回归关联:上轮第②批 use-mask IME 守卫(已落地于 hooks)未覆盖组件本体——MaskInput 与 use-mask 双实现脱节。

---

[B04-4] P1 · use-move(被 ColorPicker Saturation/ColorSlider 使用) · 无 touchcancel/pointercancel,触摸拖拽被系统中断后 user-select:none 与 document 监听残留
位置:packages/hooks/src/use-move/use-move.ts:71-83(bindEvents 只绑 mousemove/mouseup/touchmove/touchend)
证据:
```ts
const bindEvents = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopScrubbing)
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', stopScrubbing)   // 无 touchcancel/pointercancel
}
```
触摸拖拽饱和度/色相/透明度滑轨时来电、系统手势打断会派发 touchcancel(而非 touchend):stopScrubbing 不执行 → `isSliding` 残留 true、document 上 touchmove/touchend 监听残留、`node.style.userSelect = 'none'`(:57)永久保留,直到下一次任意触摸的 touchend 触发 stopScrubbing 才自愈。ColorPicker 的 Saturation.tsx:39-52、ColorSlider.tsx:108-121 均经此 hook,同批的 Slider/RangeSlider 等也受影响。
建议:bindEvents 增加 `document.addEventListener('touchcancel', stopScrubbing)`(可顺带补 pointercancel);stopScrubbing 逻辑本身幂等,直接复用即可。
回归关联:上轮⑤批(schedule 三 hook 补 pointercancel)、⑯批(use-floating-window 补 touchcancel)同类修复遗漏了 use-move(新发现)。

---

[B04-5] P1 · PinInput · 暗色模式白底浅字:输入格背景 fallback `--ui-color-white`(#fff)不随主题切换,文本用暗色系浅色
位置:packages/ui/src/components/PinInput/PinInput.module.css:22-25;对照 core/ThemeProvider/global.css:105(`--ui-color-white: #fff` 仅 :root 定义)、:372(`:root[data-ui-color-scheme='dark'] { --ui-color-text: var(--ui-color-dark-0) }`,dark-0 = #c9c9c9)
证据:
```css
.input {
    ...
    border: 1px solid var(--input-bd, var(--ui-color-gray-4));      /* #ced4da 浅边框 */
    background-color: var(--input-bg, var(--ui-color-white));        /* 恒 #fff */
    color: var(--ui-color-text);                                     /* 暗色下 #c9c9c9 */
```
PinInput 的格子不经过 Input 的 `.wrapper`(该组件自绘 input),`--input-bd`/`--input-bg` 变量无来源,恒走 fallback。暗色模式下格子为纯白底 + #c9c9c9 浅灰字 + #ced4da 浅边框,输入内容对比度 ≈1.6:1 几乎不可见,与库内其他输入(暗底 `--ui-color-dark-6`)完全冲突。
建议:按 `[data-ui-color-scheme]` 提供 dark 分支(对齐 Input.module.css:119-137 的做法),或将格子改为复用 Input 组件体系;至少将 color 改为 `var(--ui-color-text)` 之外的成对 token。
回归关联:无(新发现)。

### P2(9 条)

---

[B05-1] P1 · Pagination · `color`/`autoContrast` 完全失效:varsResolver 写 `--pagination-active-*`,CSS 读 `--pagination-control-*`,变量名对不上
位置:packages/ui/src/components/Pagination/PaginationRoot.tsx:114-117(写入);packages/ui/src/components/Pagination/Pagination.module.css:37-40(读取)
证据:
```tsx
// PaginationRoot.tsx:114-117 —— varsResolver 写入的变量名
'--pagination-active-bg': color ? getThemeColor(color, theme) : undefined,
'--pagination-active-color': getAutoContrastValue(autoContrast, theme)
    ? getContrastColor({ color, theme, autoContrast })
    : undefined
```
```css
/* Pagination.module.css:37-40 —— CSS 实际消费的变量名 */
.control:where([data-active]) {
    background-color: var(--pagination-control-bg, var(--ui-primary-color-filled));
    color: var(--pagination-control-color, var(--ui-color-white));
}
```
全仓 grep 证实:`--pagination-active-bg/color` 只有 PaginationRoot.tsx 一处写入、无人读取;`--pagination-control-bg/color` 只有 CSS 一处读取、无人写入。因此 `<Pagination color="red">` 与 `autoContrast` 对激活页样式零影响,激活页恒为主题主色(`CssVariables` 类型里声明的 `--pagination-active-bg`(PaginationRoot.tsx:32-33)也从未生效)。
建议:二选一对齐——CSS 侧改为读 `--pagination-active-bg/--pagination-active-color`,或 varsResolver/类型改为写 `--pagination-control-bg/--pagination-control-color`;补一条传 `color` 的渲染测试(现有 Pagination.test.tsx 无 color 用例)。
回归关联:无(新发现;非上轮 199 项条目。上轮 Pagination 条目仅 NaN 防御与 Edges 禁用,均已落地)。

---

[B05-2] P1 · Rating · `fractions` 半星只剩 hover 预览:点击与键盘均提交整星,分数值永远无法选中;`clearable` 对分数值失效
位置:packages/ui/src/components/Rating/Rating.tsx:149-155、157-164、171-182、219-220
证据:
```tsx
// getValueFromPointer 仅剩 hover 一个消费者(handleHover),提交路径无人调用:
const handleHover = (index, event) => {           // 157
    const next = getValueFromPointer(index, event) // 预览半星 ✓
    ...
}
const handleRadioChange = (starValue: number) => { // 171
    if (readOnly) return
    updateValue(starValue)                         // radio value = index+1,恒整星
}
const handleRadioClick = (starValue: number) => {   // 177
    if (clearable && baseValue === starValue) {     // baseValue=1.5 时 1.5===2 恒 false
        updateValue(0)                              // 分数值永远清不了零
    }
}
```
input 接线(219-220):`onChange={() => handleRadioChange(starValue)}`、`onClick={() => handleRadioClick(starValue)}`,label 上只有 onMouseEnter/onMouseMove(208-209)。git 证据:`26a70e5d`(⑫批)的 `handleClick(index, event)` 用 `getValueFromPointer(index, event)` 提交分数;`0dc20d71`(⑰批 radio 重构)把它整体替换为整星 change + 清零 click——半星提交路径在重构中丢失。现在的实际行为:fractions=2 时 hover 显示 1.5 星预览,点击提交 2(视觉与提交值不一致);`defaultValue={1.5}` + clearable 时点击当前勾选星(Math.ceil(1.5)=2)什么也不发生。isChecked(Rating.tsx:200)用 `Math.ceil(baseValue)`,表单提交的也是 ceil 后的整星。
建议:label 或 input 的 click 路径恢复用 `getValueFromPointer` 计算提交值(radio change 仍可承载键盘整星);`handleRadioClick` 的清零判定改为 `Math.ceil(baseValue) === starValue` 或直接比较 `baseValue === starValue` 前先做同网格取整;补 fractions=2 的点击提交用例与 clearable 分数用例(现有单测/e2e 均只覆盖整星)。
回归关联:上轮⑫批「Rating fractions 实现半星」(决策项)被⑰批 radio 重构冲掉一半(提交路径没了,预览还在);⑲批 e2e 只锁定整星 clearable,未发现。⑰/⑲ 的其余成果(role=radiogroup、roving tabindex、name、pointer-events:none、整星 clearable)均保持。

---

[B05-3] P1 · Slider · 可见 thumb(z-index:1)叠在透明 input 之上且无 `pointer-events:none`,按住手柄拖拽/点击静默失效
位置:packages/ui/src/components/Slider/Slider.module.css:42-56(.thumb,z-index:1 在 55)、104-112(.input,无提升)
证据:
```css
.thumb {
    position: absolute;
    ...
    z-index: 1;          /* 55:thumb 提升至 input(z:auto)之上 */
}
.input {
    position: absolute;
    inset: 0;
    opacity: 0;          /* 承载全部指针交互的原生 input,被 thumb 盖住 */
    ...
}
```
Slider.tsx:325-367 的结构:track(含 bar/thumb/marks)与 input 为兄弟节点,input 靠自身接收 mousedown 启动原生拖拽。.thumb 有 z-index:1 且未设 pointer-events:none,命中测试优先于 input——按在手柄圆点上时 mousedown 落在装饰 div 上,input 收不到事件,无法聚焦也无法拖动;只有点手柄以外的轨道区域才有效。对照:Rating.module.css:37 为星形容器补了 `pointer-events:none`(⑲批),Slider 未同步。git 佐证:`Slider.module.css` 自 35dd6302(2026-07-16)后无任何提交,行号与上轮报告引用(css:55,104-112)完全一致。
建议:.thumb(与 .mark/.markLabel)加 `pointer-events: none`;补真实浏览器 e2e(按手柄拖动改变 value)。
回归关联:上轮 P1(§2.5「Slider 可见 thumb 悬叠…拖动静默失效」)未落地——修复未提交到本仓库(与 B04 批 PinInput 情形相同)。⑲批「pointer-events 类实测不复现」结论明确限定于 Input 右侧 section,不适用于此。

---

[B05-4] P1 · CheckboxCard · 不消费 CheckboxGroup 的 `disabled`:禁用组内的 Checkbox.Card 仍可点击勾选
位置:packages/ui/src/components/Checkbox/CheckboxCard.tsx:103-109(ctx 仅用于取值)、127-145(handleClick 无组禁用守卫)
证据:
```tsx
const ctx = useCheckboxGroupContext()            // 103
const _checked = ... ctx.value.includes(value)   // 109:只消费了 value
...
onClick={(event) => {
    onClick?.(event)
    if (missingGroupValue) { ... return }
    if (ctx && value !== undefined) {            // 138:组路径未检查 ctx.disabled
        const nextValue = !_value ? [...ctx.value, value] : ...
        ctx.onChange(nextValue)                  // 禁用组内点击仍改组状态
    }
    setValue(!_value)
}}
```
CheckboxGroup 的 context 明确携带 disabled(CheckboxGroup.context.ts:9;CheckboxGroup.tsx:105),Checkbox.tsx:179 也以 `disabled ?? group?.disabled` 兜底,但 CheckboxCard 从不读取 `ctx.disabled`,自身 props 亦未声明 disabled 透传给组语义。文档化组合 `<Checkbox.Group disabled><Checkbox.Card value="x"/></Checkbox.Group>` 中 Card 保持可交互,与组内普通 Checkbox 行为矛盾。同类组件 RadioCard.tsx:75 已正确做 `disabled ?? groupCtx?.disabled`(⑫批修复),CheckboxCard 漏网。
建议:对齐 RadioCard——`const resolvedDisabled = disabled ?? ctx?.disabled`(props 声明 disabled),handleClick 入口 `if (resolvedDisabled) return`,并挂 `disabled`/aria-disabled。
回归关联:上轮⑫批「Group 组级 disabled/size」修复覆盖 Radio/Switch/Chip/RadioCard,CheckboxCard 因 CheckboxGroup context 本就有 disabled 而被排除在修复清单外——同类缺陷(修复范围遗漏,非被冲掉)。

### P2(19 条)

---

### [B06-1] P1 · Tabs · 无初始激活值时激活非首个 tab 后,首个 tab 残留 DOM tabIndex=0,roving tabindex 出现双入口

位置:packages/ui/src/components/Tabs/TabsTab.tsx:68-77、88

证据:
```tsx
useIsomorphicEffect(() => {
    const node = tabRef.current
    if (!node || ctx.activeValue !== undefined) {
        return
    }
    const first = node.closest('[role="tablist"]')?.querySelector<HTMLButtonElement>('[role="tab"]:not([disabled])')
    node.tabIndex = first === node ? 0 : -1      // 命令式直写 DOM
}, ...)
...
tabIndex={isActive ? 0 : -1}                     // 声明式 prop
```
无 value/defaultValue 时,首个 tab 的 DOM tabIndex 被命令式置 0,而 React 上次渲染的 prop 仍是 -1。此后用户点击/方向键激活第二个 tab:activeValue 变为 '2',tab#2 的 prop 由 -1→0,React 写入;tab#1 的 prop 仍为 -1(与上次渲染相同),React 跳过 DOM 写入,命令式写入的 0 残留。结果:tablist 内有两个 tabIndex=0 的 tab,Tab 键先进入未激活的 tab#1,再进入 tab#2,破坏 roving tabindex 单入口约定(键盘用户与读屏先落在非激活 tab 上)。现有测试全部传 `defaultValue`(`Tabs.test.tsx:11,31,79,97,117,133`),未覆盖该路径,无测试意图冲突。

建议:激活值产生后做一次纠偏——effect 里去掉 `activeValue !== undefined` 早退,改为 `node.tabIndex = ctx.activeValue === undefined ? (first === node ? 0 : -1) : (isActive ? 0 : -1)`;或在 effect 中检测到 activeValue 从 undefined 变为有值时把所有命令式改过的 tabIndex 重置。

回归关联:上轮第⑩批修复的副作用(修复本体保留,行为上引入新缺陷)。

---

---

[B07-1] P1 · Splitter · 触摸屏无法拖拽分栏,且触摸中断后残留 document mousemove 监听导致"无按键拖动"
位置:packages/ui/src/components/Splitter/SplitterResizer/SplitterResizer.tsx:56-75、162-180;packages/ui/src/components/Splitter/Splitter.module.css:18-33
证据:
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        ...
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }
拖拽全程只使用 mouse 事件(无 Pointer Events、无 touchstart/touchmove 处理),.resizer CSS 也没有 `touch-action: none`:
    .resizer {
        flex: 0 0 auto;
        width: 4px;
        ...
        cursor: col-resize;
    }
触屏上 touchstart 合成一次 mousedown 后,touchmove 一旦被浏览器判定为滚动手势即终止合成鼠标事件流,mouseup 永远不会派发:① 没有触摸拖拽能力,页面改为滚动;② `startStateRef` 保持非空、`dragListenersRef` 的 mousemove/mouseup 监听残留在 document 上(仅靠卸载 cleanup 或下一次 mousedown 清理),之后任何 mousemove(外接鼠标移动、下次触摸的合成事件)都会在未按住按键的状态下持续改写 sizes,分栏"自己跟着指针走"。任务清单点名的 pointercancel 中断恢复在本实现中不存在(mouse 事件模型下无对应事件)。
建议:改用 Pointer Events(pointerdown/pointermove/pointerup/pointercancel + setPointerCapture),并给 .resizer 加 `touch-action: none`;或至少补 touch-action 与 touch 事件的等效处理,在监听挂载处加"按键未按下即忽略/自动撤销"的守卫。
回归关联:无(新发现)。上轮③批只修了 RTL 方向与 useDirection 接线,未触及事件模型。
```

```

---

[B08-1] P1 · CloseButton · 暗色模式选择器写法永不匹配,暗色样式整体失效
位置:components/CloseButton/CloseButton.module.css:27-29、41-43
证据:
```css
.root:where([data-ui-color-scheme='dark']) {
    color: var(--ui-color-dark-1);
}
...
.root--subtle:where(:not([data-disabled], :disabled)):where([data-ui-color-scheme='dark']):hover {
    background-color: var(--ui-color-dark-6);
}
```
`data-ui-color-scheme` 只由 UIProvider 写在 `<html>` 上(UIProvider.tsx:132 `root.setAttribute`),Paper/Card 修复时的注释也明确「data-ui-color-scheme 只会设在 <html> 上,必须用祖先选择器匹配」。上述两个选择器是自匹配形式(`.root[data-ui-color-scheme='dark']`),按钮自身永远不带该属性 → 永不命中。后果:暗色下 X 图标保持 `--ui-color-gray-7`(#495057,未按 scheme 重定义,深色背景上对比度差);subtle hover 背景仍是浅色 `--ui-color-gray-0`(#f8f9fa,暗色下刺眼)。同文件无任何祖先形式选择器,而 ActionIcon.module.css:78-84 用的是正确的 `:where(...) &` 形式,可对照。
建议:改为 `:where([data-ui-color-scheme='dark']) & { ... }` 祖先形式(两处)。
回归关联:上轮第③批同类问题(Paper/Card 暗色选择器写反/写错),CloseButton 属漏网,非冲掉。

---

[B08-2] P1 · Notifications · `notification` 样式槽完全未接线,堆叠通知零间距
位置:components/Notifications/Notifications.tsx:150-160;components/Notifications/NotificationContainer.tsx:7-24
证据:Notifications 渲染时把样式摊给容器组件:
```tsx
<NotificationContainer
    key={notification.id}
    data={notification}
    ...
    {...getStyles('notification')}
/>
```
而 NotificationContainer 只解构自己声明的 props,其余全部丢弃:
```tsx
export function NotificationContainer({ data, store, autoClose, onHoverStart, onHoverEnd, paused }: NotificationContainerProps) {
    const { autoClose: notificationAutoClose, message, allowClose, onOpen, ...notificationProps } = data;
```
`getStyles('notification')` 产出的 className/style 从未到达 DOM。两个后果:(1) 文档化的 stylesNames `notification`(Notifications.tsx:22)上消费者的 `classNames.notification`/`styles.notification` 静默无效;(2) 内置间距类从未生效——Notifications.module.css:40-44 的 `.notification + .notification { margin-top: var(--ui-spacing-md); }` 依赖该 class 挂载,而 Notification.module.css 的 `.root` 无任何 margin → 多条通知堆叠时垂直方向完全贴合。ui 侧 Notifications.test.tsx 未断言任何 className,测试未编码该断链(已核)。
建议:NotificationContainer 增加 `className/style` 透传(合并进 `<Notification>`),或在 Notifications 内直接把 getStyles('notification') 的 className 并入 Notification 的 className。
回归关联:无(新发现;上轮 ①批修的是 timer 链,同一对文件的另一处问题)。

---

[B08-3] P1 · Notification · color 传任意 CSS 颜色时插值成非法 CSS 变量,色条/图标颜色失效
位置:components/Notification/Notification.tsx:66-74
证据:
```ts
const resolvedColor = color || theme.primaryColor
return {
    root: {
        '--notification-color': resolvedColor ? `var(--ui-color-${resolvedColor}-filled)` : undefined,
```
props 文档写明「主题颜色的键或任意有效的 CSS 颜色」(Notification.tsx:36),且 `UIColor` 类型含 `(string & {})`(theme.types.ts:269-293)。传 `color="#ff0000"` 时生成 `var(--ui-color-#ff0000-filled)`,变量不存在 → `--notification-color` 计算为 invalid,`::before` 色条(Notification.module.css:29)与左侧图标(线 40)颜色回落失效(色条透明)。同目录 Alert/Button/ActionIcon 均走 `theme.variantColorResolver`(可处理任意颜色),唯独 Notification 硬拼变量名。
建议:改用 `getThemeColor`/variantColorResolver 解析,或仅对主题键拼变量、其余原样透传。
回归关联:无(新发现)。

---

---

### [B09-1] P1 · TimePicker · 粘贴含非数字成分的时间串产生 `NaN:NaN:NaN` 值(数据损坏)

位置:packages/ui/src/dates/components/TimePicker/use-time-picker.ts:188-203;根因 TimePicker/utils/get-time-string/get-time-string.ts:51-61、clamp-time.ts:3-9

证据:
```ts
// use-time-picker.ts onPaste —— pasteSplit 默认 getParsedTime,不做数字校验
const parsedTime = (pasteSplit || getParsedTime)({ time: pastedValue, format, amPmLabels });
const timeString = getTimeString({ ...parsedTime, format, withSeconds, amPmLabels });
if (timeString.valid) {
  const clamped = clampTime(timeString.value, min || '00:00:00', max || defaultMax);
  onChange?.(clamped.timeString);
```
```ts
// get-time-string.ts —— 只判 null,不判 NaN;splitTimeString('ab:cd') → {hours:NaN, minutes:NaN}
if (hours === null || minutes === null) {
  return { valid: false, value: '' };
}
if (format === '24h') {
  const value = `${padTime(hours)}:${padTime(minutes)}...`;
  return { valid: true, value };   // hours/minutes 为 NaN 时仍 valid:'NaN:NaN'
```
粘贴 `ab:cd`、`1:x` 等带冒号的非数字文本:`.split(':').map(Number)` 得 NaN → getTimeString 判定 valid → clampTime 中 `Math.min(NaN, 86399)`/`Math.max(0, NaN)` 均为 NaN → secondsToTime(NaN) 输出 `NaN:NaN:NaN` → `onChange('NaN:NaN:NaN')`,且 setHours(NaN)/setMinutes(NaN) 使输入框显示 "NaN"(SpinInput 的 `padTime(NaN)`→`'NaN'`)。已用 node 实测确认 `Math.max(0, Math.min(NaN, 86399)) === NaN`。测试(TimePicker.test.tsx:272-283)只覆盖合法粘贴 `'13:34:00'`。

建议:onPaste 与 getTimeString 增加 `Number.isFinite` 校验(hours/minutes/seconds 任一非有限数即 invalid,onPaste 直接忽略);或 clampTime 对 NaN 入参返回原值/空。

回归关联:无(新发现)。

---

### [B09-2] P1 · TimePicker · min/max 失焦钳制在 withSeconds=false 时输出带秒格式,onChange 值契约漂移

位置:packages/ui/src/dates/components/TimePicker/TimePicker.tsx:375-381;根因 TimePicker/utils/clamp-time/clamp-time.ts:8-9(`secondsToTime` 恒输出 `HH:mm:ss`)

证据:
```tsx
// TimePicker.tsx handleBlur
if (timeString.valid && (min || max)) {
  const clamped = clampTime(timeString.value, min, max);
  if (clamped.timeString !== timeString.value) {
    controller.setTimeString(clamped.timeString);   // → onChange('10:30:00')
  }
}
```
```ts
// clamp-time.ts → secondsToTime 恒带秒
return {
  timeString: `${padTime(hours)}:${padTime(minutes)}:${padTime(secs)}`,
```
withSeconds=false 时所有正常路径(getTimeString/handleTimeChange/presets)输出 `HH:mm`,唯独失焦钳制路径经 setTimeString 发出 `HH:mm:ss`(如 min="10:30"、输入 09:00 失焦 → onChange('10:30:00')),use-time-picker.ts:196 的 onPaste 钳制同样恒带秒。此时隐藏 input(controller.hiddenInputValue,TimePicker.tsx:577-583)与显示值仍是 `10:30`,与上报值不一致;按 `HH:mm` 严格解析的消费方直接坏。现有钳制测试(TimePicker.test.tsx:333 起)全部 withSeconds=true,未编码此行为。story `MinMax`(TimePicker.story.tsx:162-193)正是 withSeconds=false 场景。

建议:clampTime 增加带 withSeconds 的格式化分支,或钳制后按 withSeconds 重走 getTimeString 再 onChange。

回归关联:无(新发现)。

---

[B10-1] P1 · useUncontrolledDates · type 切换形状映射缺「切回 default」分支,multiple 分支不滤 null(⑱批修复不完整)
位置:packages/ui/src/dates/hooks/use-uncontrolled-dates/use-uncontrolled-dates.ts:46-54
证据:

```ts
// 切换 type 时把旧形状的 defaultValue 映射成新形状(default→[v,v]/[v],
// range/multiple→取首个),否则字符串 defaultValue 灌入 range/multiple
// 后续 _value.some 等 Array 方法直接崩溃
let convertedDefaultValue = defaultValue;
if (defaultValue !== undefined) {
  if (type === 'range') {
    const raw = Array.isArray(defaultValue) ? defaultValue : [defaultValue, null];
    convertedDefaultValue = [raw[0] ?? null, raw[1] ?? null];
  } else if (type === 'multiple') {
    convertedDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }
}
```

注释声明「range/multiple→取首个」,但代码只有 `type === 'range'` / `type === 'multiple'` 两个目标分支:切到 `'default'` 时 `convertedDefaultValue` 保持旧形状数组原样灌入。后果链(逐环已核):
1. range→default(defaultValue 仍为 `['2026-01-01','2026-01-05']`):`_finalValue` 为数组 → get-formatted-date.ts:24 `date === null ? '' : formatDate(date)` → `dayjs(数组)` 解析为 Invalid Date → 输入框显示字面量 `Invalid Date`;
2. use-dates-state.ts:156 `dayjs(_value).isSame(date, level)` 对 invalid 恒 false,default 模式选中态/反选(allowDeselect)完全失效,直到用户重新点选才自愈;
3. range `[start, null]` → multiple:`convertedDefaultValue = [start, null]` null 未滤 → get-formatted-date.ts:28 `.map(formatDate).join(', ')` 输出 `"2026-01-01, Invalid Date"`。

测试盲区:use-uncontrolled-dates.test.ts:118-150「resets the value when changing the type in uncontrolled use」每次切回 default 时 defaultValue 同步移除(hookDefaults 里为 undefined),数组 defaultValue 切 default 的形态无覆盖。
建议:补 `type === 'default'` 分支(`Array.isArray(defaultValue) ? defaultValue.find((v) => v != null) ?? null : defaultValue`);multiple 分支改为 `Array.isArray(defaultValue) ? defaultValue.filter((v) => v != null) : [defaultValue]`;补两条切回 default / 带 null 元素的用例。
回归关联:上轮第⑱批相关——修复本体未冲掉,但只实现了两个方向,与其自身注释声明的语义不符,属修复不完整(新发现)。

---

---

[B10-2] P1 · useUncontrolledDates · 渲染期调用 `_setValue` 连带触发 onChange 副作用
位置:packages/ui/src/dates/hooks/use-uncontrolled-dates/use-uncontrolled-dates.ts:59
证据:

```ts
      _finalValue =
        convertedDefaultValue !== undefined ? convertedDefaultValue : getEmptyValue(type);
      _finalValue = convertDatesValue(_finalValue, withTime);
      _setValue(_finalValue);   // ← 组件体内(渲染期)调用
```

`_setValue` 即 packages/hooks/src/use-uncontrolled/use-uncontrolled.ts:102-110 的 handleChange,非受控路径(value === undefined,由外层 if 保证)会:

```ts
        setUncontrolledValue(val)
        onChangeRef.current?.(val, ...payload)
```

对自身组件的 `setUncontrolledValue` 在渲染期调用是 React 认可的派生态模式(storedType 已先行更新,无死循环);但在渲染期调用外部回调 `onChange` 是明确违规:消费者 onChange 内 setState 父组件(最常见的 `onChange={setV}` 用法)会触发 React 开发态报错 "Cannot update a component (`X`) while rendering a different component (`Y`)";StrictMode 双渲染下 onChange 同值双触发(若回调有副作用如请求/埋点则双执行)。现有测试(renderHook + `onChange: () => {}`)不触及父组件更新,故全绿。
建议:渲染期只保留 setState(或改为 useState 惰性初始化 + storedType 比较派生),`onChange` 通知移入 useEffect(值幂等,双触发天然去重);或整个 type 切换处理移入 effect 并对首帧做形状派生兜底。
回归关联:上轮第⑱批相关——该渲染期调用即⑱批修复引入的代码路径(⑱之前不存在),修复未被冲掉,但实现方式带 React 语义违规(新发现)。

---

---

### [B11-1] P1 · 全 schedule/dates 组件 · `Factory` 类型导入断链,ui 包 tsc 全线报错(47×TS2459 + 1×TS2303 及级联)

位置:`packages/ui/src/schedule/components/AgendaView/AgendaView.tsx:14`(根因);`WeekView.tsx:14`、`YearView.tsx:12`、`Schedule.tsx:8`、`DayView.tsx:14`、`MonthView.tsx:14`、`MobileMonthView.tsx:16`、`ResourcesDayView.tsx:13`、`ResourcesWeekView.tsx:13`、`ResourcesMonthView.tsx:14`、`ResourcesSchedule.tsx:7`、`ScheduleEvent.tsx:11`、`MoreEvents.tsx:10`、`CurrentTimeIndicator.tsx:11`、`ScheduleHeader.tsx:7`、`HeaderControl.tsx:12`、`MonthYearSelect.tsx:12`、`ViewSelect.tsx:10`(共 18 处 schedule 内);另波及 `src/dates/components/**` 29 处从 `../../../schedule/components/AgendaView/AgendaView` 导入 `Factory`

证据:
```ts
// AgendaView.tsx:14 —— 从自身模块导入 Factory,但本模块从未导出名为 Factory 的成员
import { Factory } from './AgendaView';
```
任务书提到的「WeekView.tsx:14 与 YearView.tsx:12 TS2459」已核实为真,且实际范围远不止两处。实测 `tsc --noEmit`(ui 包)输出:
```
src/schedule/components/AgendaView/AgendaView.tsx(14,10): error TS2303: Circular definition of import alias 'Factory'.
src/schedule/components/WeekView/WeekView.tsx(14,10): error TS2459: Module '"../AgendaView/AgendaView"' declares 'Factory' locally, but it is not exported.
... 共 47 条 TS2459(schedule 18 + dates 29)
```
`Factory` 的规范出处是 `packages/ui/src/core/factory/create-factory.ts:9`(`export type Factory<Payload extends FactoryPayload> = Payload`)。git 追溯:该断链由 2026-09-15 提交 `f89dac7e`("dates/schedule/form/emotion/colors-generator 并入主包")引入——包合并时把 schedule 包内原本的 `Factory` 导入路径统一错误改写为 `../AgendaView/AgendaView`,而 AgendaView 没有 re-export。由于 Factory 解析失败,下游 `*Factory`/`StylesApiProps<*Factory>` 全部退化为 any,级联产生约 80 条 TS7006(如 `DayView.tsx:567`、`MonthView.tsx:656`、`MoreEvents.tsx:123/132` 的回调参数隐式 any),ui 包 `tsc --noEmit` 合计 128 条 schedule 相关错误。因仅为类型位置使用,Vite/esbuild 构建与运行时不受影响,但类型检查/CI 已被整体打破——上轮验收时「ui tsc 通过」,这是修复之后新引入的回归。

建议:二选一——(a) 18+29 处导入统一改回规范出处 `core/factory/create-factory`(推荐,消除 dates→schedule 的横向类型依赖);(b) 在 AgendaView.tsx 加 `export type { Factory } from '../../../core/factory/create-factory';` 作 re-export 兜底。

回归关联:新发现(2026-09-15 包合并引入,晚于上轮全部修复;非上轮修复被冲掉,而是合并脚本引入的新断链)。

---

### [B12-1] P1 · expandRecurringEvents · rrule between 边界与候选时刻编码不一致,非 UTC 时区下范围边界处的事件实例被静默丢弃

位置:`packages/ui/src/schedule/utils/expand-recurring-events/expand-recurring-events.ts:110-118`(根因配合 `:28-32`)

证据:

```ts
function naiveToUTCNaive(value: dayjs.Dayjs): Date {          // L28:墙钟分量编码为 UTC
  return new Date(Date.UTC(value.year(), ...));
}
...
const searchStart = rangeStart.subtract(Math.max(0, durationMs), 'millisecond').toDate();  // L110:真实本地时刻
const results = set.between(searchStart, rangeEnd.toDate(), true);                          // L111
```

dtstart/exdate 走 `naiveToUTCNaive`(墙钟分量当 UTC);rrule 2.8.1 在 `tzid === 运行时时区` 时 rezone 为恒等映射(`node_modules/rrule/dist/esm/dateutil.js:153-160 dateInTimeZone`,同 tz 两次格式化差值恒 0),因此 `between` 内部参与比较的**候选值仍是「墙钟编码为 UTC」的时刻**;而 `searchStart/rangeEnd.toDate()` 是**真实本地时刻**,两者相差一个时区偏移。`iterresult.js:33-42` 直接拿 minDate/maxDate 与候选值比大小,导致过滤窗口整体偏移 |UTC offset|:

- 东八区(UTC+8):上限等效 `墙钟 ≤ rangeEnd墙钟 − 8h` → **范围最后一天约 16:00 之后的实例在 rrule 层就被丢弃**(L244 的 overlapsRange 复滤只能删多的、救不回少的);
- 西五区(UTC−5):下限等效 `墙钟 ≥ rangeStart墙钟 + 5h` → **范围首日 05:00 之前的实例被丢弃**。

实证(仓库 rrule 2.8.1,TZ 切换,复刻 L94-118 全链路):

- `TZ=Asia/Shanghai`,FREQ=DAILY 23:30 事件,范围 `2026-03-02 00:00:00 → 2026-03-08 23:59:59`:between 原始输出仅 `03-02 … 03-07` 6 条,`2026-03-08 23:30` 缺失(09:00 事件则正常,因其 < 15:59 截断线)。
- `TZ=America/New_York`,FREQ=DAILY 02:00 事件,同范围:输出为 `03-03 … 03-09`,`2026-03-02 02:00` 缺失(03-09 越界泄漏项会被 L244 复滤删掉,首日缺失无法恢复)。

次生影响:窗口向一侧加宽 |offset| 后先 `slice(0, expansionLimit)`(L117)再复滤,触碰 expansionLimit 时越界泄漏项会挤占限额,可能把真实在范围内的实例挤掉。

建议:把边界转成与候选值相同的编码再传入——`set.between(naiveToUTCNaive(searchStart_wall), naiveToUTCNaive(rangeEnd_wall), true)`(或等价地 `Date.UTC(年,月,日,时,分,秒)` 构造);跨时区补两条边界时刻回归测试(现有 DST 测试只断言 09:00 中段墙钟,且仅在运行时区本身跨 DST 时才有检出力)。

回归关联:上轮第⑬批「RRule tzid 墙钟方案」**未被冲掉**(dtstart/exdate 墙钟构造、UTC 分量还原、exdate/override 匹配均在),但该方案残留此边界编码缺陷,属⑬批修复不完整的新发现。

---

### [B12-2] P1 · getStartOfWeek · 非法日期输入死循环冻结页面(兄弟函数 getEndOfWeek 有守卫,此处漏了)

位置:`packages/ui/src/schedule/utils/get-start-of-week/get-start-of-week.ts:12-14`

证据:

```ts
let value = dayjs(date);
while (value.day() !== firstDayOfWeek) {   // dayjs('')/dayjs(null) → .day() === NaN,NaN !== firstDayOfWeek 恒真
  value = value.subtract(1, 'day');        // invalid 上 subtract 仍 invalid,day() 恒 NaN → 死循环
}
```

对照同目录 `get-end-of-week.ts:7-9` 有 `if (!value.isValid()) return value;` 守卫,证明本处属遗漏。实测 `dayjs('').isValid() === false`、`.day() === NaN`、`subtract` 后仍 NaN(见审查记录)。下游全部中招:`getWeekDays`(get-week-days.ts:29)、`nextWeek/previousWeek`(next-week.ts:7 / previous-week.ts:7)、`isWithinWeek`(is-within-week.ts:12)、`getMonthDays`(get-month-days.ts:24,进而 getMonthRange);而 MonthView.tsx:348/433、WeekView.tsx:564/1069/1070 把 `month`/`date` prop 原样传入、无兜底(仓库内 dates 包同类入口均有 getDefaultClampedDate 钳制,schedule 侧没有)。消费方传 `date=""`(表单未填态)或 null 即整页卡死。

建议:与 getEndOfWeek 对齐,进入循环前 `if (!value.isValid()) return value;`(或返回 null 由调用方兜底);顺带审视 schedule 视图入口对 date/month 的钳制。

回归关联:无(新发现;⑮/⑱批在 dates 包修过同类「空值直灌日历」问题,schedule 侧漏网)。

---

[B13a-1] P1 · form/validate-values · 数组值的 formRootRule 根规则每次校验被执行两次
位置:packages/ui/src/form/validate/validate-values.ts:48-97
证据:
```ts
if (typeof rule === 'object' && Array.isArray(value)) {
  arrayValidation = true;
  for (let index = 0; ...) { ... }
  if (formRootRule in rule) {                       // 第一次执行(L64-71)
    const rootResult = (rule as any)[formRootRule](value, values, rulePath, signal);
    ...
  }
}

if (typeof rule === 'object' && typeof value === 'object' && value !== null) {  // 数组也是 object,同样进入
  if (!arrayValidation) { ... }                     // 递归有守卫
  if (formRootRule in rule) {                       // 第二次执行(L89-96),无 !arrayValidation 守卫
    const rootResult = (rule as any)[formRootRule](value, values, rulePath, signal);
    ...
  }
}
```
数组同时满足两个 if 的类型判断:第一个分支执行一次 formRootRule,第二个分支里 `!arrayValidation` 只挡住了递归、没挡住 formRootRule,根规则被调用两次。同步规则结果幂等难以察觉;异步根规则(如向服务器查重复)会双发请求,副作用翻倍,asyncTasks 中出现两条同 rulePath 记录。`validate-values.test.ts:225-245` 只断言结果不断言调用次数,未编码双执行意图。
建议:删除第一个分支中的 formRootRule 块(L64-71),或给第二个分支的 formRootRule 加 `!arrayValidation` 守卫,二选一(推荐前者,与 mantine 上游结构一致)。
回归关联:新发现(⑮批给 validate-values 加 signal 时引入的结构,非冲掉既有修复)。

---

[B13a-2] P1 · form/use-form + use-form-validating · 提交级 abort 中止字段异步校验后,该字段的 validating 标志永久残留为 true
位置:packages/ui/src/form/hooks/use-form-validating/use-form-validating.ts:50-53;packages/ui/src/form/use-form.ts:152-156、277-281
证据:
```ts
// use-form.ts(debouncedValidateField / validateField 共用模式)
const cleanup = () => {
  if (!signal.aborted) {                       // 被 abort 的校验跳过复位
    $validating.setFieldValidating(path, false);
  }
};
// use-form-validating.ts
const abortFieldValidations = useCallback(() => {
  Object.values(abortControllers.current).forEach((c) => c.abort());
  abortControllers.current = {};               // 只 abort 控制器,不清 validatingFields
}, []);
```
字段异步校验在途 → 用户提交 → `validate()` 调 `abortFieldValidations()`(⑮批修复)→ promise settle 后 cleanup 因 `signal.aborted` 跳过 `setFieldValidating(path, false)` → `validatingFields[path]` 永远为 true → `form.validating` 恒 true、`form.isValidating(path)` 恒 true。以 `isValidating` 禁用提交按钮的消费方会永久禁用(直到 reset() 或该字段再次走完一次完整校验)。`sync-async-validation.test.ts` 无 abort 后 validating 复位断言。
建议:`abortFieldValidations()` 在 abort 的同时把 `validatingRef.current` 清空并 `setValidatingFields({})`(或按被中止的 path 逐个置 false),使「中止」同时收尾「在途」标志。
回归关联:⑮批修复未被冲掉(use-form.ts:225 仍在),但该修复引入了此残留缺口,属修复副作用。

---

[B13a-3] P1 · form/use-form · 内联 onValuesChange 时 reset/initialize/列表操作调用过期闭包
位置:packages/ui/src/form/use-form.ts:90-97(reset deps `[]`)、108-115(initialize)、412-415(onReset deps `[]`);packages/ui/src/form/hooks/use-form-list/use-form-list.ts:23-64(四操作 deps `[]`);根因 packages/ui/src/form/hooks/use-form-values/use-form-values.ts:86-88(setValues deps `[onValuesChange]`)
证据:
```ts
// use-form-values.ts
), [onValuesChange]);          // setValues 身份随 onValuesChange 变化
// use-form.ts
const reset: Reset = useCallback(() => {
  $values.resetValues();       // ← 捕获首帧 $values,resetValues → 首帧 setValues → 首帧 onValuesChange
  ...
}, []);                        // ← 空依赖,永不刷新
// use-form-list.ts
const reorderListItem = useCallback((path, payload) => {
  ...
  $values.setValues({ values: reorderPath(...), updateState: true });  // 同样是首帧 setValues
}, []);
```
消费方传内联 `onValuesChange`(每渲染新引用)且该回调闭包引用了会变的 props/state 时,`form.reset()` / `form.initialize()` / `form.onReset` / `reorderListItem/removeListItem/insertListItem/replaceListItem` 触发的 onValuesChange 永远是首帧版本(setFieldValue/setValues 因 deps 含 onValuesChange 不受影响)。
建议:`reset`/`onReset`/`initialize`/列表四操作的 deps 补上 `$values.resetValues`/`$values.setValues`(或将 onValuesChange 在 use-form-values 内改走 ref,使 setValues 稳定,一劳永逸)。
回归关联:无(新发现,mantine 同源问题)。

---

[B13a-4] P1 · hooks/use-debounced-value · leading 模式下冷却窗口内连续变更导致旧值回写(乱序回退)
位置:packages/hooks/src/use-debounced-value/use-debounced-value.ts:43-59
证据:
```ts
if (!cooldownRef.current && options.leading) {
  cooldownRef.current = true;
  setValue(value);
  timeoutRef.current = window.setTimeout(() => {   // 直接覆盖 timeoutRef,未清掉旧定时器
    cooldownRef.current = false;
  }, wait);
} else {
  cancel();                                        // cancel 会把 cooldownRef.current 置 false
  timeoutRef.current = window.setTimeout(() => {
    cooldownRef.current = false;
    setValue(value);                               // 旧值 C 的尾随定时器
  }, wait);
}
```
时序:B 变更走 leading 立即生效(T1 冷却);窗口内 C 变更 → else 分支 `cancel()` 清掉 T1 并把 cooldown 置 false、武装 T2(setValue(C));随后 D 变更 → cooldown 已是 false 又走 leading 立即生效且不清 T2 → T2 到期后 `setValue(C)` 把值回退到旧值 C。同时冷却语义被 cancel 破坏(D 的 leading 本不应立即触发)。现有测试(`use-debounced-value.test.ts:62-70`)只覆盖单次变更,未编码此场景。
建议:leading 分支先用 clearTimeoutRef() 清理挂起定时器再武装新定时器;并把「冷却重置」与「尾随值」拆成两个 ref/定时器,或在 cancel 中不重置 cooldown 而由冷却定时器自己复位。
回归关联:无(新发现)。

---

[B13a-5] P1 · hooks/use-debounced-state · leading 选项只在首次调用生效,静默期后的新调用不再立即触发
位置:packages/hooks/src/use-debounced-state/use-debounced-state.ts:32-46
证据:
```ts
if (leadingRef.current && options.leading) {
  setValue(newValue);            // 前导立即执行
} else {
  timeoutRef.current = window.setTimeout(() => {
    leadingRef.current = true;   // 只有尾随触发才会把 leading 重新武装
    setValue(newValue);
  }, wait);
}
leadingRef.current = false;      // 前导执行后没有任何定时器把它置回 true
```
前导执行后 `leadingRef=false` 且不武装任何定时器;若之后静默远超 wait 再来一次调用,仍走 else(trailing)分支,leading 语义丢失(对照 use-debounced-value 的冷却定时器实现,那里是正确的)。该文件无对应测试。
建议:前导执行后同样武装 `setTimeout(() => { leadingRef.current = true }, wait)` 冷却定时器,冷却结束即恢复下一次前导资格。
回归关联:无(新发现)。

---

[B13a-6] P1 · hooks/use-scroll-spy · 消费方传内联 getDepth/getValue 时渲染无限循环 【待核实】
位置:packages/hooks/src/use-scroll-spy/use-scroll-spy.ts:120-138
证据:
```ts
const initialize = useCallback(() => {
  const headings = getHeadingsData(Array.from(document.querySelectorAll(selector)), getDepth, getValue);
  ...
  setData(headings);             // 每次都是新数组引用,必然触发重渲染
}, [selector, getDepth, getValue, offset]);   // 内联 getDepth/getValue → initialize 每渲染新身份

useEffect(() => {
  initialize();
  ...
}, [scrollHost, selector, offset, initialize, handleScroll]);   // initialize 变 → effect 每渲染重跑
```
调用方传内联 `getValue={(el) => ...}` 时:渲染 → initialize 新身份 → effect 重跑 → initialize() → `setData(新数组)` → 再渲染 → 循环,React 将报 Maximum update depth exceeded。默认参数(模块级稳定函数)不受影响。该 hook 目录下无测试佐证;与 mantine 上游同构,不排除上游同样有此问题。待核实点:未在 jsdom 实跑复现,纯代码路径推演(推演链路完整)。
建议:effect 内对 `setData` 前做内容比较(如 id/depth/value 逐项相等则跳过),或把 getDepth/getValue 经 ref 转发使 initialize 稳定。
回归关联:无(新发现)。

### P2(11 条)

---

[B13b-1] P1 · Carousel(@xiaoye-react/carousel)· ⑪批修复未同步:onSlideChange 挂载误报 + select 监听反复 off/on + getEmblaApi 重复调用
位置:packages/@xiaoye-react/carousel/src/Carousel.tsx:243-250、304-317
证据:
```tsx
const handleSelect = useCallback(() => {
    if (!embla) { return; }
    const slide = embla.selectedScrollSnap();
    setSelected(slide);
    slide !== selected && onSlideChange?.(slide);
}, [embla, setSelected, onSlideChange, selected]);   // ← 依赖 selected / onSlideChange

useEffect(() => {
    if (embla) {
      getEmblaApi?.(embla);
      handleSelect();
      ...
      embla.on('select', handleSelect);
      return () => { embla.off('select', handleSelect); };
    }
}, [embla, emblaOptions?.slidesToScroll, handleSelect]);
```
三个后果:① `initialSlide > 0` 时挂载 effect 直接调 `handleSelect()`,`slide(=initialSlide) !== selected(0)` 成立 → **挂载即误报一次 onSlideChange**;② 每次换帧 `setSelected` → handleSelect 新身份 → effect 重跑 → 监听 off/on 且 `getEmblaApi` 被再次调用(消费者若在回调里做副作用/存 state 会被反复触发);③ 消费者传内联 `onSlideChange` 时每次父渲染同样触发 ②。ui 包同名组件已在上轮⑪批修复(`packages/ui/src/components/Carousel/Carousel.tsx:183-209`:`initializedRef` 防挂载误报 + `onSlideChangeRef`/`selectedRef` 使 handleSelect 依赖仅 `[embla]`),该修复未同步到本独立包。
建议:照搬 ui 包实现——`onSlideChangeRef`、`selectedRef`、`initializedRef` 三件套;顺手把 ui 包新增的 `slidesChanged` 监听(slide 异步增删时 slidesCount 同步,ui 包 Carousel.tsx:254-260)一并同步。
回归关联:上轮⑪批相关。修复本体在 ui 包未被冲掉,但独立 carousel 包漏同步,属遗留未覆盖,非新引入。

---

[B01-3] P2 · UIProvider · clearColorScheme 嵌套时重置为 'light' 而非父级 scheme,整站属性被劫持为 light
位置:packages/ui/src/core/UIProvider/UIProvider.tsx:85-89(对照 63-74)
证据:
```ts
// 85-89 行:清除时无条件回落 'light'
const clearColorScheme = useCallback(() => {
    if (!controlledColorScheme) {
        setInternalColorScheme('light')
    }
}, [controlledColorScheme])
```
说明:嵌套未受控 Provider 的初始值已按 63-66 行继承父级(`parentContext?.colorScheme ?? 'light'`),70-74 行还会跟随父层变化同步;但 `clearColorScheme` 却写死 'light'。外层 dark、内层未受控时,在内层子树调用 `useUIColorScheme().clearColorScheme()` 会把内层置为 'light',其 effect 随即把全局 `data-ui-color-scheme` 写为 light——整站被翻成浅色,与外层 Provider 声明的 dark 冲突,且 70-74 行的同步 effect 不因 internal 变化重跑,不会自动纠正。
建议:`setInternalColorScheme(parentContext?.colorScheme ?? 'light')`,并把 parentContext 纳入 useCallback 依赖。
回归关联:无(新发现)。

---

---

[B01-4] P2 · ColorSchemeScript/useUIColorScheme · localStorage 键只读不写,色彩方案持久化链路断裂
位置:packages/ui/src/core/UIProvider/ColorSchemeScript/ColorSchemeScript.tsx:16-26;packages/ui/src/core/UIProvider/use-ui-color-scheme/use-ui-color-scheme.ts:44-55
证据:
```ts
// ColorSchemeScript.tsx:17-18 —— 启动脚本读取 localStorage
var _colorScheme = window.localStorage.getItem("ui-color-scheme-value");
```
```ts
// use-ui-color-scheme.ts:44-50 —— setColorScheme 只更新 context 状态,从不写 localStorage
const setColorScheme = useCallback(
    (value: UIColorScheme) => {
        setCtxColorScheme(value);
        scheduleTransitionCleanup();
    }, ...)
```
说明:全库 grep `ui-color-scheme-value` 仅 ColorSchemeScript 一处(只读);`useUIColorScheme().setColorScheme/clearColorScheme` 均不持久化。结果:SSR 首屏脚本读取一个永远无人写入的键,`defaultColorScheme` 兜底生效,用户上次选择在刷新后丢失——除非消费方自行手写同名 localStorage,而这一点无任何文档/类型提示。
建议:在 `setColorScheme/clearColorScheme` 内同步写入/移除 `localStorageKey`(可从 context 取 key,与 MantineProvider 的 forceColorScheme 语义对齐);或至少在 ColorSchemeScript 的 JSDoc 标明"此键需应用自行写入"。
回归关联:无(新发现)。

---

---

[B01-5] P2 · ThemeProvider/global.css · 回退 CSS 变量与运行时 defaultCssVariablesResolver 输出不一致(SSR 首屏/水合前跳变)
位置:packages/ui/src/core/ThemeProvider/global.css:337-356、347、368-394、441-443、496-521、569-571;packages/ui/src/core/UIProvider/UICssVariables/default-css-variables-resolver.ts:48-85、55、60、63-65;packages/ui/src/core/UIProvider/UICssVariables/get-css-color-variables.ts:26-73
证据(逐项对照,左 global.css / 右运行时 resolver):
```css
/* global.css:571(light) */
--ui-color-blue-light-color: var(--ui-color-blue-6);
/* global.css:443(dark) */
--ui-color-blue-light-color: var(--ui-color-blue-3);
```
```ts
// get-css-color-variables.ts:34(light)/ 67(dark)
[`--ui-color-${name}-light-color`]: `var(--ui-color-${name}-${9})`,   // light:9 ≠ 6
[`--ui-color-${name}-light-color`]: `var(--ui-color-${name}-0)`,     // dark:0 ≠ 3
```
```css
/* global.css:441-442(dark) */
--ui-color-blue-light: rgba(34, 139, 230, 0.15);
--ui-color-blue-light-hover: rgba(34, 139, 230, 0.2);
```
```ts
// get-css-color-variables.ts:65-66(dark) —— 不透明深色 vs 回退的半透明浅染,视觉差异明显
[`--ui-color-${name}-light`]: darken(theme.colors[color][9], 0.5),
[`--ui-color-${name}-light-hover`]: darken(theme.colors[color][9], 0.3),
```
```css
/* global.css:347(:root light 回退) */
--ui-color-default-color: var(--ui-color-gray-9);
```
```ts
// default-css-variables-resolver.ts:60
'--ui-color-default-color': 'var(--ui-color-black)',
```
另:`--ui-color-light/light-hover` light 侧(global.css:569-570 rgba(X-6,.1/.12) vs get-css-color-variables.ts:32-33 `var(X-1)/var(X-2)`)同样不一致;且回退的 :root light 块(337-356)与 dark 块(368-394)均缺 `--ui-color-success` 与 `--ui-color-disabled/-disabled-color/-disabled-border`(运行时 resolver 55、63-65 行有产出),水合前这些组件变量无值。
说明:UICssVariables 注入的 `<style>` 与 global.css 的 scheme 块同特异性,注入后覆盖回退;因此回退值只在 SSR 首屏/水合前/禁 JS 时可见——上述变量在水合瞬间发生可感知跳变(light-variant 文本色 6→9/3→0、暗色 light-variant 背景半透明→不透明深色、default 前景灰→黑)。
建议:以运行时 resolver 输出为准重生成 global.css 回退块(可写脚本从 DEFAULT_THEME 产出),补齐 success/disabled* 变量;两处单一来源,避免再次漂移。
回归关联:上轮第③批曾补齐 global.css 的 hiddenFrom/visibleFrom 回退——本条是同类问题的其余变量,未被上轮覆盖,亦非回归。

---

---

[B01-6] P2 · factory · polymorphicFactory 的 withProps 产物丢失 classes/varsResolver 静态属性
位置:packages/ui/src/core/factory/polymorphic-factory.tsx:76-81(对照 packages/ui/src/core/factory/factory.tsx:222-229、191-201)
证据:
```ts
// polymorphic-factory.tsx:76-81 —— 只复制 extend 与 displayName
Component.withProps = (fixedProps: any) => {
    const Extended = forwardRef((props, ref) => <Component {...fixedProps} {...props} ref={ref as any} />) as any
    Extended.extend = Component.extend
    Extended.displayName = `WithProps(${Component.displayName})`
    return Extended
}
```
```ts
// factory.tsx:225-226 —— 非 polymorphic 版本额外复制了 classes/varsResolver
Extended.classes = Component.classes
Extended.varsResolver = Component.varsResolver
```
说明:使用 polymorphicFactory 的组件是带静态属性的:Paper.tsx:85 `Paper.classes = classes`、Kbd.tsx:77 `Kbd.classes = classes`(grep 证实)。`Paper.withProps({ shadow: 'sm' })` 返回的 Extended 上 `.classes`/`.varsResolver` 为 undefined,而 `Button.withProps(...)`(factory 版)保留——同一 API 两种工厂行为不一致,依赖 `.classes` 做样式探测/测试选择器的消费者在多态组件上会失效。
建议:polymorphicFactory 的 withProps 补 `Extended.classes = Component.classes; Extended.varsResolver = Component.varsResolver`(顺带可补 `Extended.withProps = Component.withProps` 与 getWithProps 对齐)。
回归关联:无(新发现)。

---

---

[B01-7] P2 · merge-ui-theme · isValidPrimaryShade 对 undefined/null shade 抛裸 TypeError,而非既定错误信息
位置:packages/ui/src/core/UIProvider/merge-ui-theme/merge-ui-theme.ts:32-38(触发链 52-56;deep-merge.ts:53-56 会透传显式 undefined)
证据:
```ts
function isValidPrimaryShade(shade: number) {
    if (shade < 0 || shade > 9) {          // undefined/null 与 0 比较均为 false,拦不住
        return false
    }
    return parseInt(shade.toString(), 10) === shade   // shade=undefined → TypeError: Cannot read properties of undefined
}
```
```ts
// 52-56 行:primaryShade 为对象时直接取 .dark/.light 传入,无存在性检查
if (typeof theme.primaryShade === 'object') {
    if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) {
```
说明:类型上 `UIThemeOverride = PartialDeep<UITheme>` 允许 `primaryShade: { dark: undefined }` 这类显式 undefined(PartialDeep 不剔除);deepMerge 会把显式 undefined 覆盖进结果(deep-merge.ts:53-56 非 plainObject 分支直接赋值),随后 validateUITheme 内 `shade.toString()` 抛裸 TypeError——与 24-25 行精心准备的 INVALID_PRIMARY_SHADE_ERROR 意图相悖,用户拿到的是不可读的崩溃。默认路径(缺省 key 由 DEFAULT_THEME 补齐)不受影响,故仅 P2。
建议:`isValidPrimaryShade` 开头加 `if (typeof shade !== 'number' || Number.isNaN(shade)) return false`。
回归关联:无(新发现)。注:同目录 `__audit-verify__.test.ts` 覆盖的是 deepMerge primitive→object 等旧修复,本条不在其覆盖内。

---

---

### [B02-10] P2 · MenuDropdown · 焦点在下拉容器上时 ArrowUp 与 ArrowDown 都聚焦第一项,应分别为末项/首项

位置:packages/ui/src/components/Menu/MenuDropdown.tsx:26-36

证据:
```tsx
if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
    wrapperRef.current
        ?.querySelectorAll<HTMLButtonElement>('[data-menu-item]:not([data-disabled])')[0]
        ?.focus()          // 两个键都取 [0]
}
```
ARIA APG menu 模式:ArrowDown→第一项,ArrowUp→最后一项。当前 ArrowUp 也落到第一项,长菜单键盘逆向进入需多按 N-1 次(MenubarTarget 自己的 handleKeyDown:144-149 是 ArrowDown→first / ArrowUp→last 的正确实现,同仓库口径不一致)。

建议:按 key 分支取 items[0] / items[items.length - 1]。

回归关联:无(新发现)。

---

### [B02-11] P2 · Popover/HoverCard · FloatingArrow 背景硬编码 var(--ui-color-body),自定义下拉背景时箭头颜色不跟随;模块内 .arrow 规则成死代码

位置:packages/ui/src/components/Popover/PopoverDropdown/PopoverDropdown.tsx:89-90、packages/ui/src/components/HoverCard/HoverCardDropdown/HoverCardDropdown.tsx:67-68;死规则:Popover.module.css:9-11、HoverCard.module.css:9-11

证据(PopoverDropdown.tsx):
```tsx
<FloatingArrow
    ...
    className="ui-Popover-arrow"
    style={{ backgroundColor: 'var(--ui-color-body)' }}   // 内联写死,优先级最高
/>
```
消费方以 overlayProps/styles 设深色下拉背景时(或暗色定制主题变量不同名),箭头仍是 body 底色,视觉脱节;module.css 里 `.arrow` 规则(同名变量)因内联覆盖永不生效。

建议:去掉内联 backgroundColor,改由 `.arrow` 类规则或 `var(--popover-arrow-bg, var(--ui-color-body))` 之类的可覆盖变量承接(与 B02-5 的 styles api 接线一并处理)。

回归关联:无(新发现)。

---

### [B02-12] P2 · useModalsStack · closeAll 引用每次渲染变化(initialState 每渲染新建);modals 数组后期变化不进 state

位置:packages/ui/src/components/Modal/use-modals-stack.ts:12-18、34

证据:
```tsx
const initialState = modals.reduce((acc, modal) => ({ ...acc, [modal]: false }), {} as Record<T, boolean>)  // 每次渲染新对象
const [state, setState] = useState(initialState)
...
const closeAll = useCallback(() => setState(initialState), [initialState])  // 依赖新对象 → closeAll 身份每渲染变
```
closeAll 被内联传给按钮 onClick 时无功能问题,但作为 stable API(与 open/close/toggle 的 [] 依赖并列)语义不一致;且 modals 数组首帧后增删 key 时 closeAll 重置回首帧形状、新 key 丢失(undefined)。渲染期 O(n) reduce 每帧重跑属小成本。

建议:initialState 用 useMemo([modals-key]) 或惰性 `useState(() => build(modals))` + closeAll 用 `setState(current => Object.fromEntries(Object.keys(current).map(k => [k, false])))`。

回归关联:无(新发现)。

---

### [B02-13] P2 · SpotlightSearch · {...others} 后显式覆盖 onCompositionStart/onCompositionEnd,消费者合成事件处理器丢失

位置:packages/ui/src/components/Spotlight/SpotlightSearch.tsx:64-78

证据:
```tsx
<Input
    {...others}                                              // 消费者的 onCompositionStart/End 在此
    ...
    onCompositionStart={() => setIsComposing(true)}          // 后置覆盖,消费者回调不被链式调用
    onCompositionEnd={() => setIsComposing(false)}
/>
```
组件未解构这两个 props,消费方传 onCompositionEnd(常见:拼音确认回调)被静默丢弃;同文件 onKeyDown/onChange 均正确链式调用了消费者回调,口径不一致。

建议:解构消费者 onCompositionStart/onCompositionEnd 并在 setIsComposing 前后链式调用。

回归关联:无(新发现)。

---

### [B02-14] P2 · Menu 四个 Item 组件 · itemRef 创建后从未读取(死引用)

位置:packages/ui/src/components/Menu/MenuItem.tsx:72、MenuCheckboxItem.tsx:83、MenuRadioItem.tsx:79、MenuSubItem.tsx:78

证据(MenuItem.tsx):
```tsx
const itemRef = useRef<HTMLButtonElement>(null)   // 仅在 useMergedRef(itemRef, ref) 中挂载,无任何读取点
```
四个组件一致;键盘导航实际走 DOM 查询(createScopedKeydownHandler 的 siblingSelector),不经 ref。无功能危害,但误导后续维护者以为有 ref 依赖。

建议:删除未用的 itemRef,useMergedRef(ref) 单参;或真正接线到键盘导航以省去 DOM 查询。

回归关联:无(新发现)。

---

---

### [B02-9] P2 · PopoverContextMenu/MenuContextMenu · 条件 throw 位于 hooks 之前,违反 Rules of Hooks(同类组件已约定 throw 后置)

位置:packages/ui/src/components/Popover/PopoverContextMenu.tsx:23-30、packages/ui/src/components/Menu/MenuContextMenu.tsx:28-40

证据(PopoverContextMenu.tsx):
```tsx
const child = getSingleElementChild(children) as React.ReactElement<any>
if (!child) {
    throw new Error(...)          // 先 throw
}
const ctx = usePopoverContext()   // 后 hook:child 由有效变无效时 hook 数量变化
```
同仓库 PopoverTarget.tsx:41-49、MenuTarget.tsx:25-28、HoverCardTarget.tsx:40-43 均按注释"throw 必须在全部 hooks 之后"实现;两个 ContextMenu 未同步。children 从元素变 null 时,渲染在 hook 中途抛错,React 额外产生 hook 数不匹配告警,错误信息被噪音覆盖。

建议:把 child 校验 throw 移到全部 hooks 之后(对齐 PopoverTarget 模式)。

回归关联:上轮⑦批确立的约定未覆盖到这两个文件。

---

[B03-10] P2 · TreeSelect · 勾选交互路径残留 O(n²)/O(n×m):逐值全树 findTreeNode + 逐叶 includes
位置:packages/ui/src/components/TreeSelect/get-checked-values-by-strategy.ts:8-16(辅证 ../Tree/get-children-nodes-values/get-children-nodes-values.ts:25,34-39、../Tree/get-all-checked-nodes/get-all-checked-nodes.ts:40,消费点 TreeSelect.tsx:359,370)
证据:
```ts
export function expandToLeafChecked(value: string[], data: TreeNodeData[]): string[] {
    const leaves = new Set<string>()
    for (const v of value) {
        for (const leaf of getChildrenNodesValues(v, data)) { // 每次内部 findTreeNode 全树扫描
```
getChildrenNodesValues 对每个带子节点的 child 再次 `findTreeNode(child.value, data)` 全树扫描(链式树退化为 O(n²));getAllCheckedNodes 对每个叶子 `checkedState.includes(...)` O(n×m)。checkbox 模式每次勾选都重跑 internalChecked → expandToLeafChecked → checkedNodesMap(memo 依赖每次变化),第②批只消掉了渲染期逐选项重算,交互路径热点仍在。
建议:getChildrenNodesValues 改为从已找到的 node 直接递归(不再 findTreeNode);checkedState 先转 Set。
回归关联:上轮第②批相关(该批修复未被冲掉,此处为其未覆盖的同类热点)。

---

[B03-11] P2 · TreeSelect · type/autoComplete 解构后丢弃,DOM 属性透传断链
位置:packages/ui/src/components/TreeSelect/TreeSelect.tsx:460-463
证据:
```ts
const {
    styleProps,
    rest: { type, autoComplete, ...rest },
} = extractStyleProps(others)
```
grep 全文件,`type`/`autoComplete` 解构后没有任何使用(多选分支 rest 展开到 PillsInput.Field:811、单选分支到 InputBase:885,均已剔除这两项)。消费者传 `autoComplete="off"`(ElementProps<'input'> 合法 prop)被静默吞掉,浏览器自动填充干扰无解。
建议:透传到两个分支的输入元素(若担心与 data-type 冲突,至少 autoComplete 应透传)。
回归关联:无(新发现)。

---

[B03-12] P2 · Cascader · --cascader-search-width 变量从未定义,搜索列表宽度规则失效
位置:packages/ui/src/components/Cascader/Cascader.module.css:74-75(辅证 Cascader.tsx:552-557)
证据:
```css
.searchList {
    width: var(--cascader-search-width);
```
全仓库 grep 仅此一处引用,无定义、无 fallback;Cascader.tsx 的 panelStyle 只定义 `--cascader-column-width`/`--cascader-dropdown-height`。该声明 invalid at computed-value time,searchList 宽度退化为 auto(当前块级布局下碰巧等于满宽,规则实际是死的)。
建议:改用 `var(--cascader-column-width)` 或删除该行;补 fallback。
回归关联:无(新发现)。

---

[B03-13] P2 · Cascader · 面板/搜索项禁用态只有 data-disabled,键盘仍可聚焦、读屏不感知
位置:packages/ui/src/components/Cascader/Cascader.tsx:474-488,513-524
证据:
```tsx
<button type="button" role="option" aria-selected={isSelected}
    data-disabled={node.disabled ? 'true' : undefined}
    onMouseDown={...} onClick={() => handleColumnItemClick(node, parentPath)}>
```
禁用项按钮未设 `disabled`/`aria-disabled`,仅靠 CSS opacity/pointer 样式;键盘可 Tab/Enter 到达(click 内部 if(node.disabled) return 兜底不生效但可聚焦),读屏不播报禁用。对照 ComboboxOption.tsx:58 渲染 `aria-disabled={disabled}`。
建议:补 `aria-disabled={node.disabled}`(保持 button 可聚焦以便 roving tabindex 时跳过逻辑一致),ArrowUp/Down 跳过禁用项或视觉明确。
回归关联:无(新发现)。

---

[B03-14] P2 · Cascader · 面板键盘导航与 CSS 未接入 RTL(ArrowLeft/Right 语义、物理方向属性)
位置:packages/ui/src/components/Cascader/Cascader.tsx:447-459(辅证 Cascader.module.css:10,31,93)
证据:
```ts
} else if (event.key === 'ArrowRight') {
    if (!isCascaderLeaf(node, !!loadData)) { ... handleColumnItemClick(node, parentPath) }
} else if (event.key === 'ArrowLeft') {
    if (levelIndex > 0) { ... }
```
ArrowRight 恒为"进入下一级",未按 dir 反转(对照 use-pills-reorder.ts:252-253 已用 getComputedStyle(direction) 处理);CSS `border-right`(列分隔线)、`text-align: left`(columnItem/searchItem)为物理方向,RTL 下分隔线错边、文本错齐(应 border-inline-end / text-align: start)。
建议:键盘经 useDirection 或 computed direction 反转;CSS 改逻辑属性。
回归关联:无(新发现)。

---

[B03-15] P2 · TreeSelectOption · role="option" 元素上挂 aria-expanded,ARIA 角色不支持该状态
位置:packages/ui/src/components/TreeSelect/TreeSelectOption.tsx:125
证据:
```tsx
<Combobox.Option
    value={node.value}
    ...
    aria-expanded={hasChildren ? expanded : undefined}
```
 ComboboxOption 渲染为 `role="option"`,ARIA 1.2 中 option 角色支持的状态为 aria-checked/aria-disabled/aria-selected/aria-posinset/aria-setsize,不含 aria-expanded;读屏行为未定义(多数忽略)。展开语义已由 expandIcon 的 role="button" + aria-label 表达。
建议:移除 option 上的 aria-expanded(如需保留请挂到内部展开按钮上)。
回归关联:上轮第⑱批相关(该批给 TreeNode 补 aria-expanded 时顺带加到了 TreeSelectOption,方向正确落点欠妥)。

---

[B03-16] P2 · use-pills-reorder · 拖拽 ghost 以 setTimeout(0) 移除,部分浏览器拖拽影像可能退化为默认 —— 待核实
位置:packages/ui/src/components/Combobox/use-pills-reorder/use-pills-reorder.ts:169-172
证据:
```ts
document.body.appendChild(ghost);
event.dataTransfer.setDragImage(ghost, event.clientX - rect.left, event.clientY - rect.top);
setTimeout(() => ghost.parentNode?.removeChild(ghost), 0);
```
Chrome 在 dragstart 处理结束后快照 drag image,timeout(0) 通常来得及;Firefox/Safari 对"元素在下一次任务前被移除"更敏感,可能回退为默认元素影像(无法在 jsdom 验证,标注待核实,建议实机确认)。稳妥做法是 dragend 时移除 ghost(onDragEnd 已有清理入口)。
建议:ghost 移除挂到 onDragEnd;若实测无异常可关闭。
回归关联:无(新发现)。

---

---

[B03-4] P2 · Combobox/Select 家族 · 下拉打开时不滚动到选中项,activeIndex 恒为第一项
位置:packages/ui/src/components/Combobox/Combobox.tsx:255-263(消费方 Select.tsx:424-438 / MultiSelect.tsx:578-599 / Autocomplete.tsx:253-261 / TreeSelect.tsx:722-738 均无 scrollIntoView,grep 证实)
证据:打开/选项集变化时 activeIndex 一律重置为第一个可用项,没有按当前 value 定位并 scrollIntoView 的逻辑:
```ts
const firstEnabled = options.findIndex(option => !option.disabled)
setActiveIndex(firstEnabled)
```
长列表(max-height 300px)中已选中项在下拉打开时不可见、aria-activedescendant 指向第一项而非当前值;Select 第二次打开也不回到上次选中位置。use-combobox.ts:240-269 的 `updateSelectedOptionIndex('selected', { scrollIntoView: true })` 能力存在但 Select/MultiSelect/Autocomplete 均未接。
建议:打开时若 selectedValues[0] 在注册表中,设 activeIndex 为该项并对齐选项 DOM 节点 scrollIntoView({block:'nearest'})。
回归关联:无(新发现)。

---

[B03-5] P2 · TagsInput · 粘贴切分正则未转义 '-',分隔符含非边缘 '-' 时形成字符区间误切
位置:packages/ui/src/components/TagsInput/TagsInput.tsx:225-227
证据:
```ts
const splitRegex = new RegExp(
    `[${delimiters.map(char => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')}]`
)
```
转义集合不含 `-`。字符类内 `-` 处于非首位非末位时是区间符号:splitChars={[',', '-', ';']} → `[,-;]`,把 `,` 到 `;` 之间全部字符(`,` `-` `.` `/` `0-9` `:` `;`)当分隔符,粘贴 "v1.2" / "2026" 这类文本会被按数字切碎。'-' 在首/末位(`['-', ',']`、[',', '-'])时恰好无害,问题只在中间位出现。
建议:字符类内把 `-` 一并转义(或统一 `\-` 排到末位)。回归关联:上轮第⑱批相关(该批引入的切分实现,未被冲掉,属实现内遗漏)。

---

[B03-6] P2 · TagsInput · 清除全部/胶囊移除按钮缺 mousedown preventDefault,操作后焦点丢到 body
位置:packages/ui/src/components/TagsInput/TagsInput.tsx:284(clear-all)、270-274(pill 移除)
证据:
```tsx
{shouldShowClear ? <CloseButton size="xs" onClick={handleClear} aria-label="Clear all" /> : null}
...
<CloseButton size="xs" aria-label={`移除 ${tagValue}`} onClick={(event) => handleRemove(event, index)} />
```
mousedown 使焦点移到按钮,点击后按钮随值变化/胶囊卸载而卸载,焦点落到 body:后续 Backspace 删 tag、继续输入全部失效,须重新点击输入框。Select.tsx:324 / MultiSelect.tsx:446 / Autocomplete.tsx:181 的同类按钮都已加 `onMouseDown={e => e.preventDefault()}`(第⑱批为 Autocomplete 修过同一问题:"按钮随即卸载会把焦点丢到 body"),TagsInput 两处漏网。
建议:两处 CloseButton 补 onMouseDown preventDefault(并在移除后 inputRef.current?.focus())。
回归关联:上轮第⑱批相关(同类修复未覆盖 TagsInput)。

---

[B03-7] P2 · MultiSelect · 胶囊移除按钮缺 mousedown preventDefault,移除后焦点丢到 body
位置:packages/ui/src/components/MultiSelect/MultiSelect.tsx:425-431
证据:
```tsx
rightSection={
    <CloseButton size="xs" aria-label={`移除 ${displayLabel}`}
        onClick={(event) => handleRemove(event, selectedValue)} />
}
```
同 B03-6:点击移除后该胶囊卸载,焦点丢 body,Backspace/键盘重排失焦。(下拉本身因 Combobox onTargetBlur 的 relatedTarget-in-targetRoot 守卫不会被误关,丢的是焦点本身。)注:renderPill 消费者路径的 onRemove 同样无此防护。
建议:补 onMouseDown preventDefault + 移除后 inputRef.current?.focus()。
回归关联:上轮第⑱批相关(同类修复未覆盖此处)。

---

[B03-8] P2 · MultiSelect · withPillsReorder 与 renderPill 组合时重排能力静默失效(死参数组合)
位置:packages/ui/src/components/MultiSelect/MultiSelect.tsx:405-417
证据:`pillsReorder.getPillProps(index)` 只在默认 Badge 分支展开(line 432),renderPill 分支渲染的 `<span key={selectedValue}>` 不携带 draggable/onKeyDown 等 props:
```tsx
if (renderPill) {
    return (
        <span key={selectedValue}>
            {renderPill({ option, value, label, onRemove, disabled })}
        </span>
    )
}
...
<Badge ... {...pillsReorder.getPillProps(index)}>
```
同时开启 withPillsReorder + renderPill 时拖拽/Alt+方向键全部无效,无告警。
建议:renderPill 分支透传重排 props(改签名为注入 pillProps),或 dev 环境 warn 该组合不支持。
回归关联:无(新发现)。

---

[B03-9] P2 · Combobox/MultiSelect · selectedValues.includes 逐选项线性查找,大列表 O(n×m)
位置:packages/ui/src/components/Combobox/ComboboxOption.tsx:41(辅证 MultiSelect.tsx:335,648)
证据:
```tsx
const selectedValues = ... // string[]
const selected = ctx.selectedValues.includes(value)   // 每个选项每次渲染 O(m)
```
MultiSelect 已选 m 个、渲染 n 个选项时渲染期 O(n×m);`MultiSelect.tsx:648` renderOptions 内 `selectedValues.includes(item.value)` 同样线性。第④批已把 index 查表化,选中态判定仍是数组扫描。
建议:Combobox context 增发 `selectedValuesSet: Set<string>`(与数组同 memo),选项与 renderOptions 查 Set;MultiSelect filteredData 的 hidePickedOptions 过滤同理。
回归关联:上轮第④批相关(方向一致的未尽尾巴,未被冲掉)。

---

[B04-10] P2 · FileButton · `assignRef(resetRef, reset)` 在渲染期执行(render 期副作用)
位置:packages/ui/src/components/FileButton/FileButton.tsx:64
证据:
```tsx
const reset = () => {
    if (inputRef.current) { inputRef.current.value = '' }
}
assignRef(resetRef, reset)
```
每次渲染都执行;并发渲染被丢弃的渲染也会写 ref,且卸载时不清理(残留已卸载组件的 reset 闭包)。reset 闭包只依赖 inputRef,当前无功能错误,但属 React 并发语义下的反模式。
建议:移入 `useEffect(() => { assignRef(resetRef, reset); return () => assignRef(resetRef, null) }, [resetRef])`(对齐 MaskInput.tsx:352-366 的正确写法)。
回归关联:上轮 3.3 节 line 209(FileButton resetRef 渲染期 assignRef)已报,仓库未落地。

---

[B04-11] P2 · NumberInput · 步进用裸浮点加法,step=0.1 连续递增出现 0.30000000000000004
位置:packages/ui/src/components/NumberInput/NumberInput.tsx:247-255
证据:
```tsx
const increment = () => {
    const base = currentNumber ?? lastValidNumberRef.current ?? 0
    updateValue(base + (step ?? 1))
}
const decrement = () => {
    const base = currentNumber ?? lastValidNumberRef.current ?? 0
    updateValue(base - (step ?? 1))
}
```
step=0.1 时 0.1+0.1=0.2、再 +0.1 = 0.30000000000000004,`parseRawValue(String(...))` 原样入 localText 与 onChange,输入框与回调都携带浮点尾渣。
建议:按 step 小数位数做十进制整数化计算(如 `Math.round((base + step) * 10 ** d) / 10 ** d`),或复用 hooks 的精度工具。
回归关联:上轮 3.3 节 line 208 已报,仓库未落地。

---

[B04-12] P2 · NumberInput · 步进按钮 hover 在暗色模式下近白底浅灰图标,对比度不足
位置:packages/ui/src/components/NumberInput/NumberInput.module.css:49-52;对照 global.css:188(`--ui-color-gray-0: #f8f9fa`)、:178/372(dark-0 #c9c9c9)
证据:
```css
.control:where(:not(:disabled, [data-disabled]):hover) {
    background-color: var(--ui-color-gray-0);   /* 恒 #f8f9fa,不随暗色翻转 */
    color: var(--ui-color-text);                /* 暗色下 #c9c9c9 */
}
```
暗色主题 hover 时背景 #f8f9fa(近白)、图标 var(--ui-color-text)=#c9c9c9(浅灰),对比度约 1.5:1,箭头几乎不可见;亮块在暗色输入框内也突兀。
建议:hover 背景改暗色友好 token(如 `var(--ui-color-dark-filled-hover)` 或 scheme 分支)。
回归关联:无(新发现)。

---

[B04-13] P2 · 多组件 · JSDoc 注释写成 `//**`(行注释),API 文档/IntelliSense 全部丢失
位置:packages/ui/src/components/TextInput/TextInput.tsx:15-24、JsonInput/JsonInput.tsx:28-66、PinInput/PinInput.tsx:30-37、NumberInput/NumberInput.tsx:29-68、MaskInput/MaskInput.tsx:84-115、ColorInput/ColorInput.tsx:55-62、ColorPicker/ColorPicker.types.ts:58
证据(示例 TextInput.tsx:15-16):
```tsx
//** 渲染在输入框上方的标签 */
label?: React.ReactNode
```
`//** ... */` 不是合法 JSDoc 块(`/**` 才是),docgen/IDE 均不识别;同文件内其余 prop 用 `/** */`,风格混杂。
建议:批量改为 `/** ... */`。
回归关联:无(新发现;checklist 第 10 条 API 一致性)。

---

[B04-14] P2 · NumberInput · label 不支持必填星号,与 TextInput/PasswordInput 不一致
位置:packages/ui/src/components/NumberInput/NumberInput.tsx:352-353(InputWrapper 调用未接 required/withAsterisk;props 类型也未暴露 withAsterisk)
证据:
```tsx
return (
    <InputWrapper {...getStyles('root')} label={label} description={description} error={error} inputId={inputId}>
```
对照 PasswordInput.tsx:185 的 `required={withAsterisk}`(上轮 line 206 的修复只落了 PasswordInput 一半)。NumberInput 传 label + required 时星号不出现(required 经 ElementProps 只透传到 input 的 aria/属性)。
建议:InputWrapper 调用补 `required={required}` 并暴露 `withAsterisk`(对齐 TextInput)。
回归关联:上轮 3.3 节 line 206(PasswordInput/NumberInput required 星号)部分落地——PasswordInput 已修,NumberInput 未落地。

---

[B04-6] P2 · InputClearButton · `style` 合并被后置的 `{...others}` 整体覆盖,防御性 `pointerEvents:'all'` 与背景丢失
位置:packages/ui/src/components/Input/InputClearButton/InputClearButton.tsx:44-45
证据:
```tsx
<CloseButton
    variant={variant || 'transparent'}
    size={size || ctx?.size || 'sm'}
    ...
    style={{ pointerEvents: 'all', background: 'var(--input-bg)', ...others.style }}
    {...others}     // others.style 再次覆盖整个 style,合并结果被丢弃
    ref={ref}
/>
```
JSX 后展开的 prop 覆盖先声明的 prop:消费者传 `style` 时,最终 style 就是 `others.style` 原样,`pointerEvents:'all'` 与 `background` 兜底全部丢失(e2e 虽证实 section 命中在 Chromium 下不受影响,但该内联防御与上轮 ⑲ 批保留的 CSS 加固意图被此写法抵消)。
建议:`{...others}` 提前,`style={{ pointerEvents: 'all', background: 'var(--input-bg)', ...others.style }}` 放最后。
回归关联:上轮第①批P0(FileInput 清除按钮命中)的防御链边角(新发现)。

---

[B04-7] P2 · JsonInput · 传 minRows/maxRows(autosize)时输入内容丢失等宽字体
位置:packages/ui/src/components/JsonInput/JsonInput.tsx:176 + JsonInput.module.css:2-12;对照 Input/Input.module.css:180(`.input { font-family: var(--input-font-family, var(--ui-font-family)); }` 显式覆盖继承)
证据:
```tsx
...getStyles(autosize ? 'fieldSizing' : 'root', { classNames, styles }),
```
```css
.root { font-family: var(--ui-font-family-monospace, ...); }
.fieldSizing { field-sizing: content; ... }   /* 无 font-family */
```
非 autosize 时 input 元素挂 `.root`(monospace 生效);autosize 时只挂 `.fieldSizing`,而 `.input` 自身的 `font-family` 声明会覆盖从 wrapper div 继承的 monospace——结果传 minRows/maxRows 的 JsonInput 内容回退为正文字体,与不传时不一致。
建议:把 `font-family` 声明复制进 `.fieldSizing`,或 autosize 时同时挂 `.root` 与 `.fieldSizing` 两个样式名(Textarea 不受影响,其 .root 只有 width)。
回归关联:上轮⑫批「Textarea/JsonInput minRows/maxRows」实现(已落地)的边角遗漏。

---

[B04-8] P2 · PasswordInput · 可见性切换按钮 `tabIndex={-1}`,键盘与屏幕阅读器用户不可达
位置:packages/ui/src/components/PasswordInput/PasswordInput.tsx:171
证据:
```tsx
<ActionIcon
    ...
    aria-label={reveal ? 'Hide password' : 'Show password'}
    tabIndex={-1}
    {...visibilityToggleButtonProps}
```
按钮有 aria-label 却被移出 Tab 序:纯键盘用户无法切换密码可见性(除非消费方在 visibilityToggleButtonProps 里自传 tabIndex)。库内同类按钮(InputClearButton、FileInput 清除按钮)均保持默认可达。
建议:去掉 `tabIndex={-1}`(如需避免 Tab 停留可留文档说明,由消费方决定)。
回归关联:无(新发现;上轮 checklist 第 5/6 条交互完整性与键盘可达性)。

---

[B04-9] P2 · Saturation · `role="slider"` 无 aria-valuemin/aria-valuemax,aria-valuenow 用 0-1 浮点无语义
位置:packages/ui/src/components/ColorPicker/Saturation/Saturation.tsx:94-98
证据:
```tsx
role="slider"
aria-label={saturationLabel}
aria-valuenow={position.x}
aria-valuetext={convertHsvaTo('rgba', value)}
tabIndex={focusable ? 0 : -1}
```
同目录 ColorSlider.tsx:157-159 已补 `aria-valuenow={value}`、`aria-valuemax={maxValue}`、`aria-valuemin={0}`;Saturation 漏网:无 min/max(读屏读作 0-100 百分比基准缺失),valuenow 是 0.x 的裸浮点(饱和度),与 valuetext 的 rgba 不对应维度。二维饱和度面板用 role=slider 本身也只能表达一维。
建议:补 `aria-valuemin={0}` / `aria-valuemax={100}` / `aria-valuenow={Math.round(position.x * 100)}`;长期考虑 role 用法(如两个独立 slider 或 group)。
回归关联:上轮 3.4 节 line 214(ColorPicker/Saturation aria-valuenow 0-1 且无 valuemax)已报,仓库未落地。

---

[B05-10] P2 · AngleSlider · step 不整除 360 时值越界(364),`low` 分支不可达;键盘路径同样越界;Home/End 未 preventDefault
位置:packages/hooks/src/use-radial-move/use-radial-move.ts:29-37(根因,hooks 包文件);packages/ui/src/components/AngleSlider/AngleSlider.tsx:162-181(键盘同样调用,174-181 Home/End 无 preventDefault)
证据:
```ts
const clamped = clamp(degree, 0, 360)
const high = Math.ceil(clamped / step)
const low = Math.round(clamped / step)
return toFixed(
  high >= clamped / step ? (high * step === 360 ? 0 : high * step) : low * step,  // high>=x 恒真(ceil(x)>=x),low*step 为死分支
  getDigitsAfterDot(step)
)
```
step=7、拖到 358°:high=ceil(51.14)=52 → 52*7=364 ≠ 360 → 返回 364,超出 [0,360];键盘 ArrowRight 于 357° 时 `normalizeRadialValue(_value + step, step)`(AngleSlider.tsx:171)同样得 364,aria-valuenow=364 > aria-valuemax=359,标签显示「364」。文件历史显示该 hook 2026-09-12 后未再改动,上轮引用行号一致。
建议:`high*step > 360` 时回落 `low*step`(或归零);顺带给 Home/End 分支补 `event.preventDefault()` 防页面滚动。
回归关联:上轮 P2(§3.4「AngleSlider step 不整除 360 时值越界」)未落地。注意根因文件属 hooks 包,若 hooks 批次另行覆盖请合并处理。

---

[B05-11] P2 · Switch/SegmentedControl/Slider/RangeSlider · 键盘焦点指示器缺失:交互 input 透明或零尺寸,且无任何 :focus-visible 样式
位置:packages/ui/src/components/Switch/Switch.module.css:58-64(.input width/height 0,全文件无 focus 规则);packages/ui/src/components/SegmentedControl/SegmentedControl.module.css:59-67(.input opacity 0,无 focus 规则);packages/ui/src/components/Slider/Slider.module.css:104-112;packages/ui/src/components/RangeSlider/RangeSlider.module.css:103-112
证据:
```css
/* Switch.module.css:58-64 */
.input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
}
/* 文件内无 .input:focus-visible / :focus-within 任何规则 */
```
opacity:0/零尺寸元素的 outline 一并不可见,四个组件 Tab 聚焦时无任何视觉反馈(键盘可用性/WCAG 2.4.7)。对照组内已修好的范例:Rating.module.css:62-65(`.star:has(.input:focus-visible)` 外描边)、Checkbox.module.css:44-47、Radio.module.css:43-46、AngleSlider.module.css:11-14(:focus-within)。
建议:统一加 `:has(:focus-visible)`(或 :focus-within)描边规则,落在 .track/.thumb/.control 等可见元素上。
回归关联:无(新发现;⑰批 Rating 重构已示范该模式,其余组件未同步)。

---

[B05-12] P2 · Slider/RangeSlider · 未接入 useDirection:RTL 下原生 input 语义反转而视觉 bar/thumb 不反转,RangeSlider 把 useMode 方向硬编码 'ltr'
位置:packages/ui/src/components/RangeSlider/RangeSlider.tsx:316-328(`useMove(handleMove, {...}, 'ltr')`);packages/ui/src/components/Slider/Slider.tsx:301-313(物理 left/right);另注:packages/ui/src/components/Switch/Switch.module.css:85-98(thumb 物理 left + translateX,RTL 不翻转)
证据:
```tsx
const { ref: moveRef } = useMove(
    handleMove,
    { onScrubStart..., onScrubEnd... },
    'ltr'   // 327:方向硬编码,useMove 本身支持 'rtl'(use-move.ts:63)
)
```
useMove 已实现 dir 分支(use-move.ts:62-65 `dir === 'ltr' ? _x : 1 - _x`),但 RangeSlider 未把容器方向传入;Slider 依赖原生 range input,dir=rtl 时浏览器把 min/max 反转,而 bar(`left:0,width:p%`)与 thumb(`left:p%`)仍按 LTR 映射——RTL 下 bar 从错误一侧增长。第③批已为 ScrollArea/Splitter 接 useDirection(Tooltip/Popover 亦用),滑块系被排除。Switch 的 thumb 用物理属性,RTL 下开关方向不翻转(轻度,常规约定问题)。
建议:Slider/RangeSlider 用 useDirection 读容器 dir,视觉映射与 useMove dir 参数统一取反;Switch thumb 改 inset-inline 逻辑属性或按 dir 翻转 translateX。
回归关联:无(新发现;第③批 RTL 修复范围遗漏)。

---

[B05-13] P2 · SegmentedControl · radio 未默认生成 name:浏览器无法把各 item 识别为同组,方向键切换失效,只能逐个 Tab
位置:packages/ui/src/components/SegmentedControl/SegmentedControl.tsx:166-174
证据:
```tsx
<input
    type="radio"
    name={name}        // 168:不传 name 时为 undefined → 无 name 属性
    ...
/>
```
无 name 的 radio 各自成组:←/→ 不能在 item 间移动勾选,每个 item 都进 Tab 序。role="radiogroup"(151)下这是典型键盘可达性缺口;同库 Rating 已默认 `name || useId()`(Rating.tsx:138,214)。
建议:`name={name ?? React.useId()}`(或复用 hooks 的 useId),保证浏览器原生 roving 生效。
回归关联:无(新发现)。

---

[B05-14] P2 · SegmentedControl · `controlActive` stylesName 声明但从未渲染:无 indicator 元素,样式 API 断链
位置:packages/ui/src/components/SegmentedControl/SegmentedControl.tsx:19(stylesNames 含 'controlActive')、146-179(渲染中无 getStyles('controlActive'))
证据:
```ts
export type SegmentedControlStylesNames = 'root' | 'control' | 'controlActive' | 'input' | 'label'
```
渲染只有 control/input/label 三个选择器;激活态靠 `.control[data-active]` 背景切换(SegmentedControl.module.css:48-52),没有滑动 indicator 元素(transitionDuration/--sc-transition-duration 只作用于背景色渐变)。消费者传 `classNames={{ controlActive: ... }}`/`styles={{ controlActive: ... }}` 静默无效。
建议:要么渲染 indicator(参照常见 segmented 实现:绝对定位滑块 + transform 过渡,controlActive 挂到滑块),要么从 stylesNames 类型移除 controlActive 并在文档删除 indicator 语义;transitionDuration 文档补充「作用于背景色过渡」。
回归关联:无(新发现)。

---

[B05-15] P2 · Pagination · `layout='responsive'` 未实现:文档称「CSS 容器查询切换页码与紧凑标签」,实际无任何容器查询/布局 CSS,两种内容恒同时渲染
位置:packages/ui/src/components/Pagination/PaginationRoot.tsx:92-93(文档);packages/ui/src/components/Pagination/Pagination.tsx:135-148(两块内容都渲染);packages/ui/src/components/Pagination/Pagination.module.css(全文件无 @container/[data-layout] 规则)
证据:
```tsx
/** Determines how the pagination is displayed, `'responsive'` uses CSS container queries to switch between pages and a compact label @default 'default' */
layout?: 'default' | 'responsive'
...
const isResponsive = layout === 'responsive'
const pagesContent = withPages ? (
    isResponsive ? (
        <>
            <PaginationItemsGroup>...</PaginationItemsGroup>
            <PaginationLabel formatLabel={formatLabel} />   // 页码列表与标签同时上 DOM
        </>
    ) : ...
```
全仓 @container 仅存在于 schedule 组件;Pagination.module.css 只有 root/control/dots/items/label 基础规则。responsive 模式 = default 模式 + 一个额外常驻标签。
建议:补 `.root[data-layout='responsive']` 的 container-type 与窄容器下 .items 隐藏/.label 显示的 @container 规则(或暂从文档/类型移除该值)。
回归关联:无(新发现,死参数类)。

---

[B05-16] P2 · Pagination · 导出的 `getPaginationItems` 与组件实际渲染算法(usePagination)分叉:同输入产出不同区间
位置:packages/ui/src/components/Pagination/Pagination.tsx:216-251(导出实现);packages/hooks/src/use-pagination/use-pagination.ts:104-141(组件实际);分歧实证 Pagination.test.tsx:90-107
证据:
```ts
// Pagination.tsx:235(左溢出分支)
const leftItemCount = siblings * 2 + boundaries + 3   // → total=20,active=2,s=1,b=1 得 [1..6,'dots',20](测试 100 行锁定)
// use-pagination.ts:117(同名分支)
const leftItemCount = siblings * 2 + boundaries + 2   // → 同输入组件实际渲染 [1..5,'dots',20]
```
两处 totalValueNumbers 边界、leftSiblingIndex 下限(boundaries+2 vs startValue+boundaries-1)、右溢出 item 数(+3 vs +1)均不同;导出工具还完全不支持 startValue。公开 API(已从 index.ts 导出)与组件渲染结果不一致。
建议:删掉 Pagination.tsx 内的复制品,由 usePagination 的 range 计算导出统一实现(或反向),保持单一事实源;同步更新 4 个 utility 断言。
回归关联:无(新发现;⑧批 NaN 防御改的是 usePagination,未触及此分叉)。

---

[B05-17] P2 · Pagination · siblings/boundaries 未做 NaN/非整数归一化:NaN 时渲染 [1,'dots',N] 碎片
位置:packages/ui/src/components/Pagination/PaginationRoot.tsx:165-174(原样透传);packages/hooks/src/use-pagination/use-pagination.ts:104-114(无守卫)
证据:
```ts
const paginationRange = useMemo((): (number | 'dots')[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;  // siblings=NaN → NaN
    if (totalPageNumbers >= _total) { ... }                       // NaN >= n 恒 false,直落下方
    const leftSiblingIndex = Math.max(activePage - siblings, ...) // Math.max(NaN,x)=NaN
```
⑧批归一化只覆盖 total/startValue(74-76 行),siblings/boundaries 原样进入:传 NaN 时 range 退化为 `[startValue,'dots',endValue]`,页码几乎全部消失且回调正常发页面号,静默坏 UI。
建议:对 siblings/boundaries 补 `Number.isFinite ? Math.max(Math.trunc(x), 0) : 1` 同类归一化。
回归关联:上轮⑧批「Pagination NaN 防御」修复保持,但防御范围遗漏 siblings/boundaries(部分覆盖,非被冲掉;根因文件属 hooks 包)。

---

[B05-18] P2 · Pagination · size 文档 @default 'md' 与实际默认 sm 不符:.root 缺基础 `--pagination-control-size` 声明
位置:packages/ui/src/components/Pagination/PaginationRoot.tsx:41-42(文档)、103-106(defaultProps 无 size);packages/ui/src/components/Pagination/Pagination.module.css:1-11、17-18
证据:
```ts
/** `height` and `min-width` of controls @default 'md' */
size?: UISize | ...
```
```css
/* .root 只定义了 xs..xl 档位,没有 --pagination-control-size: var(--pagination-control-size-md) 基础声明 */
.control {
    min-width: var(--pagination-control-size, var(--pagination-control-size-sm)); /* 17:落 sm=26px */
```
同目录其余组件均声明基础变量(如 Slider.module.css:13-14 `--slider-thumb-size: var(--slider-thumb-size-md)`);不传 size 时实际 26px(sm),文档承诺 md(32px)。
建议:.root 补 `--pagination-control-size: var(--pagination-control-size-md)`(或把文档默认改 'sm'),`--pagination-control-fz` 同理核查(getFontSize(undefined)=undefined,靠 .control 的 --ui-font-size-sm 兜底)。
回归关联:无(新发现)。

---

[B05-19] P2 · ChipGroup · `name` 是死参数:文档「Name attribute passed to all chips」,但 Chip 是 button 无 input,解构后从未使用
位置:packages/ui/src/components/Chip/ChipGroup.tsx:51-52(文档)、89(解构)、128-135(未进 context、未渲染)
证据:
```ts
/** Name attribute passed to all chips */
name?: string
...
const { ..., name, disabled, children, ...others } = props   // 89:name 取出
...
value={{ isChipSelected, onChange: handleChange, multiple, disabled, size }}  // 130:无 name
```
Chip.tsx 渲染 `<button>`(Chip.tsx:156-165),不存在可挂 name 的表单控件;name 既不进 context 也不上 DOM。
建议:从 ChipGroupProps 删除 name(及文档),或按需给 Chip 加 hidden input 承载表单值(与 Switch ⑫批修法对齐)。
回归关联:无(新发现,死参数)。

---

[B05-20] P2 · RadioIndicator · styles API 全部断链:className/style/classNames/styles/vars 解构后丢弃,size/color 未解构泄漏到 DOM span
位置:packages/ui/src/components/Radio/RadioIndicator.tsx:41-53
证据:
```tsx
const { classNames, className, style, styles, unstyled, vars, checked, disabled, mod, ...others } = props
...
return (
    <Box component="span" ref={ref} {...others} mod={[{ checked, disabled }, mod]} data-radio-indicator />
)
```
useStyles/getStyles 从未调用(对照 CheckboxIndicator.tsx:128-141 完整接线);`className="x"` 被静默丢弃。`size`/`color` 声明于 props(27-30)但未解构,落入 others 后作为未知属性渲染到 span(React 会发出 unknown-prop 警告,DOM 上出现无效的 size/color 属性)。RadioIndicator.classes 指向的 Radio.module.css 中也无 .indicator 规则——组件完全依赖消费者自定义样式。
建议:接线 useStyles(classNames/styles/vars/className/style 生效);size/color 要么实现(--radio-size/--radio-color 变量)要么从类型移除,至少解构掉防 DOM 泄漏。
回归关联:无(新发现)。

---

[B05-21] P2 · Radio · iconColor 未走 getThemeColor:与 Checkbox/CheckboxIndicator 不一致,主题键生成非法 CSS 值致选中圆点消失
位置:packages/ui/src/components/Radio/Radio.tsx:90-96
证据:
```tsx
const varsResolver = createVarsResolver<RadioFactory>((theme, { size, color, iconColor }) => ({
    root: {
        ...
        '--radio-icon-color': iconColor          // 94:原样透传
    }
}))
```
Checkbox.tsx:108 已修为 `getThemeColor(iconColor, theme)`(③批,注释「与 CheckboxIndicator 行为对齐」),Radio 漏改。iconColor='red.5'(主题键)时 `--radio-icon-color: red.5` 非法 → .icon 的 background-color(Radio.module.css:73)无效 → 选中态圆点不可见;Checkbox 同值则正常。
建议:`'--radio-icon-color': iconColor ? getThemeColor(iconColor, theme) : undefined`,与 Checkbox 完全对齐。
回归关联:上轮③批「Checkbox iconColor 统一走 getThemeColor」修复保持,但 Radio 的同型问题未在修复清单内(范围遗漏,非被冲掉)。

---

[B05-22] P2 · RadioGroup · 根节点无 `role="radiogroup"`:RadioCard(role="radio")组合下无法建立分组语义
位置:packages/ui/src/components/Radio/RadioGroup.tsx:104-111
证据:
```tsx
const content = (
    <RadioGroupContext.Provider value={{...}}>
        <div ref={ref} {...getStyles('root')} {...others}>   // 108:普通 div,无 role
            {children}
        </div>
    </RadioGroupContext.Provider>
)
```
原生 Radio 场景可靠同名 input 分组,影响有限;但 `<Radio.Group><Radio.Card/></Radio.Group>` 时,组内是若干 `role="radio"` 按钮(RadioCard.tsx:118)挂在无 radiogroup 角色的 div 下,读屏器无法感知分组关系(同库 Rating.tsx:189 已示范 `role="radiogroup"`)。另外 CheckboxCard.tsx:125 的 `role="checkbox"` 单独使用无此需求,不在此列。
建议:Radio.Group 根 div 加 `role="radiogroup"`(或经 InputWrapper 的 fieldset/legend 语义);RadioCard 补 aria-posinset/setsize 可后续考虑。
回归关联:无(新发现)。

---

[B05-23] P2 · RangeSlider/AngleSlider/Slider · 拖拽中断路径缺 pointercancel/touchcancel:触摸被系统取消后拖拽状态卡死、onChangeEnd 丢失
位置:packages/hooks/src/use-move/use-move.ts:71-83(仅 mousemove/mouseup/touchmove/touchend;根因,hooks 包文件);packages/hooks/src/use-radial-move/use-radial-move.ts(beginTracking/endTracking 同样四事件);packages/ui/src/components/Slider/Slider.tsx:364-365(仅 onMouseUp/onTouchEnd)
证据:
```ts
const bindEvents = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopScrubbing)
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', stopScrubbing)   // 无 touchcancel/pointercancel
}
```
触摸拖拽被浏览器接管(滚动意图/系统手势)时触发 touchcancel 而非 touchend:useMove 的 isSliding 卡 true、document 监听残留、node 的 userSelect:none 残留(第⑤批已为 schedule 三个拖拽 hook 补 pointercancel,useMove/useRadialMove 未在名单);Slider 原生 input 路径同样缺 onTouchCancel,中断手势的 onChangeEnd 永不发出。
建议:两个 hooks 补 touchcancel(与 pointercancel 若可用)→ stopScrubbing/endTracking;Slider 补 onTouchCancel={handleChangeEnd}。
回归关联:上轮⑤批 pointercancel 修复仅覆盖 schedule 拖拽 hooks,未覆盖 use-move/use-radial-move(范围遗漏,非被冲掉;根因文件属 hooks 包,若 hooks 批次覆盖请合并)。

---

[B05-5] P2 · Rating · filled 星层显式 `className`/`style` 覆盖 `getStyles('starSymbol')`,starSymbol 的 classNames/styles API 失效
位置:packages/ui/src/components/Rating/Rating.tsx:224、227-233
证据:
```tsx
<span {...getStyles('starSymbol')} style={{ color: 'var(--ui-color-default-border)' }}>  // 224:style 覆盖消费者 styles.starSymbol
...
<span
    {...getStyles('starSymbol')}
    className={`${classes.starSymbol} ${classes.starFilled}`}  // 229:覆盖 getStyles 的 className
    style={{ clipPath: ..., opacity: ... }}                     // 230-233:覆盖 style
```
getStyles 返回 `{ className, style }`(core/styles-api/use-styles/use-styles.ts:33-37),JSX 中后写的属性覆盖展开值:filled 层把消费者 `classNames.starSymbol`、根 className 全部丢掉(只剩模块类),两层都把 `styles.starSymbol` 丢掉;224 行的内联 color 与 CSS .starSymbol:35 完全重复,属可删的覆盖源。同模式(仅 style 覆盖、className 保留)还存在于 Slider.tsx:326(bar)、328-330(thumb)、344-345(mark)与 RangeSlider.tsx:429-435(bar)、402-407(thumb)——这些选择器的 `styles={{ bar: ... }}` 静默失效,但 `classNames` 仍有效。
建议:把组件定位样式并入 getStyles 的 style 合并(`style={{ ...getStyles('starSymbol').style, clipPath }}` 或 useStyles 的 style 函数),className 用 cx 合并;Rating 224 行内联 color 直接删除(CSS 已有)。
回归关联:无(新发现)。

---

[B05-6] P2 · Rating · 同一组件 aria-label 中英混用:组标签硬编码中文「评分」,星形 radio 为英文「N star」
位置:packages/ui/src/components/Rating/Rating.tsx:190、218
证据:
```tsx
role="radiogroup"
aria-label="评分"                          // 190:中文
...
aria-label={`${starValue} star`}           // 218:英文(且 1 star 无复数处理)
```
读屏器在同一组内播报两种语言;对照组内 Checkbox/Radio/Switch 均无 aria-label 硬编码。(`{...others}` 在 191 之后展开,消费者可覆盖组标签,但默认值混用。)
建议:统一为一种语言(库内 Select/MultiSelect 清除按钮为中文,建议「评分」+「${starValue} 星」),或提供 aria-label prop 并文档化默认值。
回归关联:无(新发现;⑰批重构引入)。

---

[B05-7] P2 · CheckboxGroup/RadioGroup/SwitchGroup/ChipGroup/PaginationRoot · context value 内联对象每渲染新身份(ChipGroup 还含每渲染新建的函数)
位置:packages/ui/src/components/Checkbox/CheckboxGroup.tsx:105;packages/ui/src/components/Radio/RadioGroup.tsx:105-107;packages/ui/src/components/Switch/SwitchGroup.tsx:114-116;packages/ui/src/components/Chip/ChipGroup.tsx:129-131;packages/ui/src/components/Pagination/PaginationRoot.tsx:194-210
证据:
```tsx
<CheckboxGroupContext.Provider value={{ value: selectedValues, onChange: setSelectedValues, name, disabled, size }}>
```
```tsx
<ChipGroupContext.Provider value={{ isChipSelected, onChange: handleChange, multiple, disabled, size }}>
```
ChipGroup 的 isChipSelected/handleChange(ChipGroup.tsx:115-124)是渲染期重建的闭包,context 身份必然变化;其余四处也均为内联对象。对未 memo 的子组件无额外成本,但任何 React.memo 包裹的子组件(大列表场景常规优化)会因 context 身份变化全量失效,违反 checklist 第 7 条「context value 身份稳定」。
建议:统一 `useMemo(() => ({ ... }), [deps])`(ChipGroup 先用 useCallback 稳定 isChipSelected/handleChange;setSelectedValues 已在第②批 use-uncontrolled setter 稳定化中稳定)。
回归关联:无(新发现)。

---

[B05-8] P2 · RangeSlider · 键盘操作不触发 onChangeEnd,只在 blur 时补发,与 Slider(keyup 即发)语义不一致
位置:packages/ui/src/components/RangeSlider/RangeSlider.tsx:338-367(keydown 无 onChangeEnd)、369-385(blur 补发)
证据:
```tsx
// 369-385:唯一补发点是 blur
const handleInputBlur = () => {
    setFocused(-1)
    ...
    if (focusValue && (focusValue[0] !== currentValue[0] || ...)) {
        onChangeEnd?.(currentValue)
    }
}
```
Slider.tsx:274-289 在 keyup 即发 onChangeEnd;RangeSlider 键盘调整后若焦点不离开(继续停在 thumb 上),onChangeEnd 永不触发。文件自 2026-07-22 后无提交,行号与上轮引用(RangeSlider.tsx:338-367,378-385)一致。
建议:对齐 Slider——keydown 分支中值变化时补发 onChangeEnd(blur 补发保留以覆盖拖拽后失焦)。
回归关联:上轮 P2(§3.4「RangeSlider 键盘操作不触发 onChangeEnd(仅 blur)」)未落地(⑱批声称 P2 清尾但该文件未被触及)。

---

[B05-9] P2 · RangeSlider · 缺 name/thumbLabel:无法参与表单提交,thumb 无可配置可访问名
位置:packages/ui/src/components/RangeSlider/RangeSlider.tsx:31-100(props 未声明)、453-482(两个隐藏 input 无 name、aria-label 硬编码)
证据:
```tsx
<input
    type="range"
    ...
    aria-label="Minimum slider value"   // 460:硬编码,无 thumbLabel 类 prop 可覆盖(可经 others 覆盖但未文档化)
    ...
/>
```
Slider 有 `name`(Slider.tsx:77,359)与 `thumbLabel`(80);AngleSlider 也有 hidden input name(AngleSlider.tsx:39,245)。RangeSlider 的 range input 均无 name,表单序列化丢值。
建议:补 `name?: string`(渲染两个 `<input type="hidden" name={`${name}[0|1]`}>` 或给 range input 挂 name)与 `thumbLabel?: [string, string] | string`;同步类型与文档。
回归关联:上轮 P2(§3.4「RangeSlider 缺 Slider 的 name/thumbLabel API」)未落地(该文件无相关提交)。

---

### [B06-10] P2 · RingProgress/SemiCircleProgress · NaN 值无防御,且缺少 progressbar 语义(role/aria 全缺)

位置:packages/ui/src/components/RingProgress/RingProgress.tsx:116-131、133-159;packages/ui/src/components/SemiCircleProgress/SemiCircleProgress.tsx:148

证据:
```ts
const total = sections.reduce((acc, section) => acc + Math.max(0, section.value), 0)   // Math.max(0, NaN) === NaN
...
const sweep = sectionValue / normalizedTotal                                            // NaN
const d = describeArc(currentAngle, endAngle, radius)                                   // path "M NaN NaN ..."
```
```ts
const semiCirclePercentage = clamp(value, 0, 100) * (circumference / 100)               // clamp(NaN,0,100) === NaN → strokeDashoffset="NaN"
```
NaN 输入时 RingProgress 产出含 NaN 的 path(SVG 静默不渲染,Semi 的 dashoffset 同理失效),不崩溃但显示空环,与 `Progress.tsx:139` 的 `clamp(value || 0)` 防御不一致。另外两个组件的根元素均无 `role="progressbar"`/`aria-valuenow`(Progress 与 ProgressRoot 均有),读屏拿不到进度值。

建议:入口统一 `Number.isFinite` 归一(NaN→0);根元素补 `role="progressbar"` + 钳制后的 `aria-valuenow`/`aria-valuemin=0`/`aria-valuemax=100`(Ring 可用归一化后的总百分比)。

回归关联:上轮第⑯批 Progress aria 钳制相关(Progress 本体在;Ring/Semi 一直未覆盖)。

---

---

### [B06-11] P2 · Indicator · 定位变量使用物理 left/right,RTL 下 start/end 语义反转

位置:packages/ui/src/components/Indicator/get-position-variables/get-position-variables.ts:40-53;Indicator.module.css:26-31

证据:
```ts
if (placement === 'start') {
    variables['--indicator-left'] = _offsetX
    ...
if (placement === 'end') {
    variables['--indicator-right'] = _offsetX
```
CSS 侧同为物理 `top/left/right/bottom`。`dir="rtl"` 时 `'top-end'` 仍渲染在物理右上角,而逻辑 end 应为左侧。库内已有 `useDirection` 基建(上轮第③批 ScrollArea/Splitter 接入),Indicator 未接。

建议:改用逻辑属性(`inset-inline-start/end`),或经 useDirection 在 rtl 下交换 start/end 与 translate 方向。

回归关联:无(新发现)。

---

---

### [B06-12] P2 · Tabs · 水平方向键未按 RTL 反转;vertical 变体使用物理 border-right/margin-right

位置:packages/ui/src/components/Tabs/TabsList.tsx:63-69;packages/ui/src/components/Tabs/Tabs.module.css:92-107

证据:
```ts
const isHorizontal = ctx.orientation === 'horizontal'
switch (event.key) {
    case isHorizontal ? 'ArrowRight' : 'ArrowDown':
```
ARIA APG tabs 模式要求 RTL 下水平箭头语义互换;此处 ArrowRight 恒为"下一个"。同文件未引入 useDirection。CSS 侧:
```css
.root:where([data-orientation='vertical'][data-variant='default']) .list {
    border-right: 1px solid ...;
```
vertical 列表边框/负 margin 全为物理右向,RTL 下应翻到左侧。

建议:Tabs 引入 useDirection,rtl 时交换 ArrowLeft/Right 分支;vertical 边框改 `border-inline-end`/`margin-inline-end`。

回归关联:无(新发现)。

---

---

### [B06-13] P2 · TabsList · cloneElement 以 index 覆盖子元素 key,动态增删/重排 tab 时后续 tab 全量 remount

位置:packages/ui/src/components/Tabs/TabsList.tsx:42-47

证据:
```ts
const tabs = Children.toArray(children).map((child, index) => {
    if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<any>, { key: index })
    }
    return child
})
```
消费者为 Tabs.Tab 提供的 key 被 index 强制覆盖:删除中间一个 tab 后,其后所有 tab 的 key 平移 → React 卸载重挂 → 焦点丢失、tab 内部状态(如动画)重置;顺序重排同理。TabsTab 本身无状态所以不丢数据,但键盘操作中焦点会被打到 body。

建议:`cloneElement(child, { key: child.key ?? index, ... })` 保留消费者 key,仅在缺失时回退 index。

回归关联:无(新发现)。

---

---

### [B06-14] P2 · Marquee · 重复组未对辅助技术隐藏,内容被读屏朗读 repeat(默认 4)遍

位置:packages/ui/src/components/Marquee/Marquee.tsx:98-104

证据:
```tsx
const repeatedChildren = Array(repeat)
    .fill(0)
    .map((_, index) => (
        <div key={index} {...getStyles('group')}>
            {children}
        </div>
    ))
```
所有 group 均可进入无障碍树,同一内容重复朗读 4 次(repeat 越多越糟)。

建议:`index > 0 && aria-hidden="true"`(或仅在第一组保留语义),首组也建议加 `aria-label` 概述。

回归关联:无(新发现)。

---

---

### [B06-15] P2 · Marquee/Skeleton · 无限动画未接入 prefers-reduced-motion

位置:packages/ui/src/components/Marquee/Marquee.module.css:92-97;packages/ui/src/components/Skeleton/Skeleton.module.css:20-27

证据:
```css
.content {
  ...
  animation-duration: var(--marquee-duration, 40000ms);
  animation-iteration-count: infinite;      /* 无任何 reduced-motion 出口 */
```
```css
.root:where([data-animate])::after {
    ...
    animation: skeleton-shimmer 1.5s infinite;
```
库内已有出口约定:Spoiler 内容挂 `data-reduce-motion`(Spoiler.tsx:145)由 `global.css:38` 的 `[data-reduce-motion]` 全局抑制;Collapse 走 `useReducedMotion`。这两个持续动画组件既不挂该属性也无媒体查询,前庭障碍用户无法摆脱常驻动画。

建议:CSS 内补 `@media (prefers-reduced-motion: reduce) { animation: none; }`,或根元素接 `useReducedMotion` 挂 `data-reduce-motion`。

回归关联:无(新发现)。

---

---

### [B06-16] P2 · RollingNumber · withLiveRegion 只变更 aria-label,读屏普遍不播报 live region 的 label 变更

位置:packages/ui/src/components/RollingNumber/RollingNumber.tsx:133-141

证据:
```tsx
role={withLiveRegion ? 'status' : 'img'}
aria-label={accessibleValue}
```
开启 withLiveRegion 后,数值变化只改 `aria-label`,内容节点全部 aria-hidden(`DigitColumn.tsx:46`、char span `aria-hidden="true"`)。live region 的播报基于文本内容(DOM text)变更,NVDA/JAWS 对 aria-label 变更基本不播报,该 prop 实际难以生效。

建议:withLiveRegion 时追加视觉隐藏文本(`<span class="visually-hidden">{accessibleValue}</span>`)+ `aria-live="polite"`,aria-label 仅作静态描述。

回归关联:无(新发现)。

---

---

### [B06-17] P2 · Descriptions · 垂直布局专用的 `.value > div:first-child` 样式未限定 layout,horizontal 下污染消费者 div 内容

位置:packages/ui/src/components/Descriptions/Descriptions.module.css:38-43;Descriptions.tsx:186-196

证据:
```css
.root:not([data-bordered]) .value > div:first-child {
    font-weight: var(--ui-font-weight-bold);
    color: var(--ui-color-dimmed);
    font-size: var(--ui-font-size-xs);
    margin-bottom: calc(var(--ui-spacing-xs) / 2);
}
```
该规则本意是给 vertical 布局中 `<td class=value>` 内首个 div(即标签 div,`renderValue` vertical 分支先渲染 `renderLabel` 再渲染内容 div)加"标签"样式。但 horizontal 布局下 `.value` td 的子节点就是消费者内容本身(`{item.children}`):消费者把内容包在 `<div>` 里时,该 div 会被误加粗、置灰、缩字号并加下边距。

建议:选择器限定为 `.root:where([data-layout='vertical']):not([data-bordered]) .value > div:first-child`,或给 vertical 标签 div 单独样式名。

回归关联:无(新发现)。

---

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

### [B06-2] P2 · Collapse · duration=0(reduced motion 或显式 0)早退分支丢弃 onTransitionEnd/onTransitionStart 回调

位置:packages/ui/src/components/Collapse/Collapse.tsx:79-104

证据:
```tsx
const collapse = hook({
    expanded,
    transitionDuration: duration,
    ...
    onTransitionEnd,
    onTransitionStart,
    keepMounted: false
})

if (duration === 0) {
    if (keepMounted === true && env !== 'test') {
        return (<Activity mode={...}><Box {...others} style={style} ...>
```
duration=0 时直接返回,不进入 useCollapse,消费者传入的 `onTransitionEnd`/`onTransitionStart` 被解构后静默丢弃,永不触发。文档注释只说 "Set to 0 to disable animation",依赖该回调做"展开完成后再加载内容"的消费者在 reduced-motion 用户(`theme.respectReducedMotion` 将 duration 置 0)与显式 duration=0 下逻辑失效。hooks 层第⑦批的 finalizeTransition 兜底也因此被绕过。

建议:duration===0 分支中在 effect/useIsomorphicEffect 里同步调用一次 `onTransitionStart?.(); onTransitionEnd?.()`(或至少在 expanded 变化时调用 onTransitionEnd),保持回调契约与 hooks 层一致。

回归关联:上轮第⑦批相关(修复本体在 hooks 层未被冲掉;组件层早退路径为边界遗漏)。

---

---

### [B06-3] P2 · Tree · filterTreeData 对"节点自身命中"的子节点保留规则前后不一致

位置:packages/ui/src/components/Tree/filter-tree-data/filter-tree-data.ts:28-31

证据:
```ts
if (nodeMatches || filteredChildren.length > 0) {
    result.push(
        filteredChildren.length > 0 ? { ...node, children: filteredChildren } : { ...node }
    )
}
```
同一查询下两种矛盾行为:节点命中且部分子节点命中 → 只保留命中的子节点;节点命中但无子节点命中 → `{ ...node }` 保留**全部原始子节点**(含不匹配者)。例:查询 "a",父 "abc" 命中、子 ["ax","zzz"]:有 "ax" 命中时 "zzz" 被过滤掉;把 "ax" 改名 "qq" 后 "zzz" 反而显示。搜索结果集不可预测。若意图是"节点命中即展示整棵子树",case B 也应保留全部;若意图是"始终只保留命中链",case A 的 `{...node}` 应改为 `children: filteredChildren`。

建议:统一语义(推荐 `children: filteredChildren` 恒定,与 Mantine 行为一致)。
注:该差异也可能是"命中节点展示子树"的有意设计,语义需产品确认(不确定点:设计意图)。

回归关联:无(新发现)。

---

---

### [B06-4] P2 · Tree · data 数组身份不稳定时 initialize 每次重置状态并重复触发 onChange

位置:packages/ui/src/components/Tree/use-tree.ts:193-204;packages/ui/src/components/Tree/Tree.tsx:170-175

证据:
```ts
const initialize = useCallback((_data: TreeNodeData[]) => {
    if (initializedDataRef.current === _data) { return }   // 仅按引用判重
    initializedDataRef.current = _data
    setExpandedState(getInitialTreeExpandedState(expandedStateRef.current, _data, selectedStateRef.current))
    setCheckedState(getInitialCheckedState(checkedStateRef.current, _data, checkStrictly))
    ...
```
Tree 的 effect 依赖 `[data, tree]`。消费方每渲染传内联 `data={[...]}` 时(常见误用,无 useMemo),每次父渲染都触发 initialize:生成全新 expanded/checked 对象 → 内部额外 setState 一轮;受控模式下 `onExpandedStateChange`/`onCheckedStateChange` 以"值相同但身份不同"的对象被连续调用,若消费者在回调里 setState 则形成渲染循环。判重只看引用,无浅比较。

建议:initialize 内对生成结果与当前值做浅比较(逐 key 比 boolean / 数组逐项比)后再 set,避免同值新身份提交;文档强调 data 需稳定引用。

回归关联:无(新发现;第⑰批 use-selection 内联浅比较同类思路可参考)。

---

---

### [B06-5] P2 · Tree · expandOnSpace(默认 true)与 checkOnSpace 同时开启时 Space 一次触发"展开+勾选"双动作

位置:packages/ui/src/components/Tree/TreeNode.tsx:185-199;FlatTreeNode.tsx:118-134 同构

证据:
```ts
if (event.nativeEvent.code === 'Space') {
    if (expandOnSpace) {
        event.stopPropagation()
        event.preventDefault()
        controller.toggleExpanded(node.value)
    }

    if (checkOnSpace) {
        event.stopPropagation()
        event.preventDefault()
        controller.isNodeChecked(node.value) ? controller.uncheckNode(node.value) : controller.checkNode(node.value)
    }
}
```
`expandOnSpace` 默认 true(defaultProps),消费者只想让 Space 勾选而只设 `checkOnSpace` 时,每次 Space 同时切换展开态与勾选态。两个 prop 语义互斥却未互斥实现(逃生口是手动传 `expandOnSpace={false}`,但类型与文档均未提示)。

建议:checkOnSpace 为 true 时跳过 expandOnSpace 分支(勾选语义优先),或在类型/文档中注明互斥。

回归关联:无(新发现)。

---

---

### [B06-6] P2 · Tree · is-node-indeterminate 模块零引用死代码

位置:packages/ui/src/components/Tree/is-node-indeterminate/is-node-indeterminate.ts:1-15

证据:全仓 grep(`is-node-indeterminate`)除自身外无任何 import;`Tree/index.ts` 也不导出它(对比:`is-node-checked` 被 `packages/ui/src/components/TreeSelect/get-checked-values-by-strategy.ts:4` 引用)。且该实现每次调用全树 `getAllCheckedNodes` 后 `some()` 查找,若被按节点调用即 O(n²)。

建议:删除该文件,或在 use-tree 的 cached map 基础上重写后再导出。

回归关联:上轮第②/⑱批 Tree 性能修复相关(热路径已走 `use-tree.ts:416-431` 的 checkedNodesMap,此文件为遗留死代码,修复未被冲掉)。

---

---

### [B06-7] P2 · Highlight · Styles API 完全未接线:classNames/styles/unstyled/attributes 为死参数

位置:packages/ui/src/components/Highlight/Highlight.tsx:55-74

证据:
```tsx
export const Highlight = polymorphicFactory<HighlightFactory>((_props, _ref) => {
    const props = useProps('Highlight', defaultProps, _props)
    const { classNames, className, style, styles, unstyled, children, highlight, color, attributes, ...others } = props
    ...
    return (
        <Box ref={_ref} component="span" className={className} style={style} {...others}>
```
组件声明了 `StylesApiProps`(classNames/styles/unstyled/attributes)与 `HighlightStylesNames = 'root' | 'highlight'`,但从不调用 useStyles/getStyles:四个样式 prop 解构后直接丢弃,`highlight` 样式名从未使用;高亮段样式只能靠 Mark 内部默认。与 Mark(已完整接线 useStyles)不一致。

建议:接入 `useStyles<HighlightFactory>` 并把 `getStyles('root')`/`getStyles('highlight')`(传给 Mark 的 className)挂上。

回归关联:无(新发现)。

---

---

### [B06-8] P2 · Stepper · 移除 tablist 角色后遗留 aria-orientation 挂在无 role 的 div 上

位置:packages/ui/src/components/Stepper/Stepper.tsx:186

证据:
```tsx
<Box
    ref={ref}
    {...getStyles('root')}
    mod={[{ orientation }, mod]}
    {...others}
    aria-orientation={orientation}
>
```
`aria-orientation` 仅在 tablist/scrollbar/listbox/separator 等支持 orientation 的 role 上生效;第⑱批移除了 tablist/tab 角色后该属性成为无效 ARIA(a11y 校验器告警,读屏忽略)。

建议:删除 `aria-orientation={orientation}`(视觉方向已由 `data-orientation` 样式承载)。

回归关联:上轮第⑱批相关(修复未冲掉,清理不彻底)。

---

---

### [B06-9] P2 · Stepper · 暗色模式下步骤图标硬编码白底、分隔线/边框静态灰,未随 scheme 翻转

位置:packages/ui/src/components/Stepper/Stepper.module.css:83-84、11;Stepper.tsx:95

证据:
```css
.stepIcon {
    ...
    border: 2px solid var(--ui-color-gray-4);
    background-color: var(--ui-color-white);
```
`--ui-color-white`/`--ui-color-gray-3/4` 为静态字面量(`default-css-variables-resolver.ts:31` 起,不随 `dark` 块翻转)。暗色下未激活步骤图标是纯白圆 + 近黑文字、分隔线为浅灰,与周围暗色面板冲突(库内其他组件用 `--ui-color-body`/`--ui-color-default-border` 或 scheme 作用域变量,如 Accordion `.item` 的 light/dark 双写)。功能上可读(白底黑字),属主题一致性缺陷。

建议:`background-color` 改 `var(--ui-color-body)`、border 改 `var(--ui-color-default-border)`、分隔线沿用 `--stepper-separator-color` 默认值改 `var(--ui-color-default-border)`。

回归关联:无(新发现)。

---

---

[B07-10] P2 · Container · strategy='grid' 时 fluid prop 完全无效
位置:packages/ui/src/components/Container/Container.tsx:26-27、43-47、70;packages/ui/src/components/Container/Container.module.css:19-27
证据:
    /** If set, the container takes 100% width of its parent and size prop is ignored @default false */
    fluid?: boolean
    ...
    &:where([data-strategy='grid']) {
        display: grid;
        grid-template-columns: 1fr min(100%, var(--container-size)) 1fr;
        margin-inline: auto;
        & > * { grid-column: 2; }
    }
grid 分支没有 [data-fluid] 处理(只有 block 分支有 max-width: 100%),fluid + strategy='grid' 组合下容器仍被 --container-size 限宽,与文档 "takes 100% width ... size prop is ignored" 矛盾(死参数场景)。
建议:grid 分支补 `&:where([data-fluid]) { grid-template-columns: 1fr min(100%, 100%) 1fr }`(或直接 min(100%, 1fr));或类型层面二选一。
回归关联:无(新发现)。
```

```

---

[B07-11] P2 · Scroller · 控制按钮渐变方向硬编码,RTL 下淡出方向反向
位置:packages/ui/src/components/Scroller/Scroller.module.css:58-71
证据:
    &:where([data-position='start']) {
        inset-inline-start: 0;
        background: linear-gradient(to right, var(--scroller-background-color) 40%, transparent);
        justify-content: flex-start;
    }
    &:where([data-position='end']) {
        inset-inline-end: 0;
        background: linear-gradient(to left, var(--scroller-background-color) 40%, transparent);
    }
定位用了逻辑属性(inset-inline-start/end,RTL 时 start 控件位于右侧),但渐变方向固定物理方向:RTL 下 start 控件在右侧,其渐变仍从左往右淡出,遮罩浓侧朝向内容区、透明侧朝向边缘,与 LTR 下的遮罩语义相反,滚动内容在边缘不被遮挡、中部却被蒙灰。
建议:用逻辑方向渐变(CSS `to logical` 尚不可用,可按 [dir='rtl'] 翻转两处 linear-gradient 方向),或改用 mask + logical padding。
回归关联:无(新发现;③批 RTL 批次未覆盖 Scroller)。
```

```

---

[B07-12] P2 · AppShell · navbar/aside 收起动画被 grid 轨道瞬时塌陷吞掉,过渡声明实际无效
位置:packages/ui/src/components/AppShell/AppShell.module.css:3-9、16-36;packages/ui/src/components/AppShell/AppShell.tsx:73-77
证据:
    .root {
        display: grid;
        grid-template:
            ...
            / var(--app-shell-navbar-width, 0px) 1fr var(--app-shell-aside-width, 0px);
    }
    .navbar {
        grid-area: navbar;
        width: var(--app-shell-navbar-width, 0px);
        overflow: hidden;
        transition: width 0.2s ease;
    }
collapsed 切换时 varsResolver 直接把 --app-shell-navbar-width 置 0px:root 的 grid 轨道宽度无过渡、当帧塌为 0,子元素 width 的 0.2s transition 在 0 宽轨道 + overflow hidden 下不可见。结果是收起瞬时消失、展开却能看到 width 动画,行为不对称;声明的 transition 一半场景是死代码。
建议:collapse 过渡改在轨道层面实现(如轨道用固定宽度 + 需要动画时改用绝对定位滑出),或去掉 width transition 保持瞬时一致,并在文档注明。
回归关联:无(新发现;AppShell 上轮无修复条目,responsive/持久化/getLayout 等 API 在本实现中不存在,无对应宣称)。
```

```

---

[B07-13] P2 · Divider/Kbd · 默认边框色用固定浅灰阶,暗色模式过亮(与上轮 Paper/Card 暗色修复不一致)
位置:packages/ui/src/components/Divider/Divider.module.css:9;packages/ui/src/components/Kbd/Kbd.module.css:20-21
证据:
    /* Divider.module.css */
    --divider-color: var(--ui-color-gray-3);      /* #dee2e6,暗色不反转 */
    /* Kbd.module.css */
    background-color: var(--ui-color-body);       /* 暗色反转,OK */
    border: 1px solid var(--ui-color-gray-4);     /* #ced4da,暗色不反转 */
global.css 的灰阶变量只有 :root 一处定义(global.css:188-192),[data-ui-color-scheme='dark'] 块(:root[data-ui-color-scheme='dark'],global.css:368 起)只重定义语义 token。暗色下 Divider 分割线、Kbd 边框呈亮浅灰,与暗色 UI 冲突;Card/Paper 已在上轮③批用 `[data-ui-color-scheme='dark'] &` 覆盖(--card-bd/--paper-border-color → dark-4),Divider/Kbd 未跟进同类处理。
建议:与 Card/Paper 对齐,补 `[data-ui-color-scheme='dark'] &` 覆盖(Divider → dark-4,Kbd 边框 → dark-3/dark-4),或改用语义 token。
回归关联:上轮第③批(Paper/Card 暗色变量)相关——该修复未被冲掉,同类问题在 Divider/Kbd 仍存在。
```

```

---

[B07-14] P2 · OverflowList · maxVisibleItems/gap 变化不触发重测,可见数停留在旧布局
位置:packages/ui/src/components/OverflowList/OverflowList.tsx:146-150、168-175
证据:
    useIsomorphicEffect(() => {
        setPhase('measuring')
        setVisibleCount(data.length)
        setSubtractCount(0)
    }, [dataKey, maxRows, collapseFrom])
    ...
    useIsomorphicEffect(() => {
        if (phase === 'normal') { setPhase('measuring'); setSubtractCount(0) }
    }, [dimensions?.width, dimensions?.height])
重测触发只有三处:dataKey(内容)、maxRows/collapseFrom、容器尺寸。maxVisibleItems 动态变化(如配置面板调整)既不在依赖里也不影响 dataKey;gap 变化只改 CSS 变量、容器尺寸往往不变(ResizeObserver 不触发),两者都不会重跑测量,finalVisibleCount/overflow 指示器与实际可容纳数量脱节,直到下一次 resize 或 data 变化。
建议:把 maxVisibleItems、gap(getSpacing(gap) 的解析值)纳入首个 effect 依赖。
回归关联:无(新发现)。
```

---

---

[B07-2] P2 · ScrollArea · thumb/轨道颜色硬编码黑色与浅灰,暗色模式不适配
位置:packages/ui/src/components/ScrollArea/ScrollArea.module.css:51-56、78-98
证据:
    &:hover {
        background-color: var(--ui-color-gray-0, #f5f5f5);
        & > .thumb { background-color: rgba(0, 0, 0, 0.5); }
    }
    .thumb {
        ...
        background-color: rgba(0, 0, 0, 0.4);
    }
`--ui-color-gray-0` 在 global.css:188 固定为 #f8f9fa 且暗色块(:root[data-ui-color-scheme='dark'],global.css:368 起)不重定义灰阶;thumb 恒为 40%/50% 黑。暗色模式下未 hover 时黑色 thumb 在深色内容上对比极弱,hover 时轨道突然出现亮白条,与暗色主题冲突(上轮③批同类问题只修了 Paper/Card)。
建议:thumb/轨道颜色走可主题化变量(如 --ui-color-dark-*/语义 token),并在 [data-ui-color-scheme='dark'] 下提供覆盖。
回归关联:无(新发现;③批 Paper/Card 暗色修复未覆盖 ScrollArea)。
```

```

---

[B07-3] P2 · ScrollArea · corner 的 [data-hovered] 是永远不可达的死状态
位置:packages/ui/src/components/ScrollArea/ScrollArea.module.css:109-111;packages/ui/src/components/ScrollArea/ScrollArea.tsx:265
证据:
    .corner {
        ...
        opacity: 0;
        &:where([data-hovered]) { opacity: 1; }
        &:where([data-hidden]) { display: none; }
    }
组件侧只输出:
    <ScrollAreaCorner {...getStyles('corner')} data-hidden={type === 'never' || undefined} />
全库无任何代码给 corner 写 data-hovered(已 grep 确认),corner 因此恒为 opacity:0,只有占位作用;hover 显形的样式意图从未接线。
建议:删除 [data-hovered] 规则或实现 hover 状态输出(如在 ScrollAreaCorner 上接 onMouseEnter),二者取一。
回归关联:无(新发现)。
```

```

---

[B07-4] P2 · ScrollArea.Autosize · 内联 onOverflowChange 导致 ResizeObserver 每次父渲染 disconnect/re-observe
位置:packages/ui/src/components/ScrollArea/ScrollArea.tsx:311-350
证据:
    const handleOverflowCheck = useCallback(() => { ... }, [onOverflowChange])
    useEffect(() => {
        ...
        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(rAF)
            rAF = window.requestAnimationFrame(handleOverflowCheck)
        })
        resizeObserver.observe(viewportObserverElement)
        return () => { window.cancelAnimationFrame(rAF); resizeObserver.unobserve(viewportObserverElement) }
    }, [viewportObserverElement, onOverflowChange, handleOverflowChange])
消费者传内联箭头函数时 onOverflowChange 每次父渲染都是新引用,handleOverflowCheck 随之重建,effect 重跑:观察器反复拆除重建并丢掉一次 resize 通知窗口。库内其余异步回调已普遍走 ref 转发(如 Scrollbar.tsx:48-56 的 handleWheelScrollRef 模式),此处未对齐。
建议:回调经 ref 转发(useEffectEvent 模式),effect 依赖收敛为 [viewportObserverElement]。
回归关联:无(新发现)。
```

```

---

[B07-5] P2 · Grid · GridCol offset 未钳位,offset ≥ columns 时仍产生隐式列横向溢出
位置:packages/ui/src/components/Grid/GridCol.tsx:59-62
证据:
    // span 收敛到 [1, columns]：超出会创建隐式列导致横向溢出；
    // offset+span 超界时裁掉 span（span 0 会让整条 grid-column 声明非法被丢弃）
    const clampedSpan = Math.max(1, Math.min(resolvedSpan, columns - (offset ?? 0)))
    resolvedStyle.gridColumn = offset
        ? `${offset + 1} / span ${clampedSpan}`
        : `span ${clampedSpan}`
span 侧收敛了,但 offset 本身没有钳位:cols=12、offset=12 时输出 `grid-column: 13 / span 1`,仍然创建隐式列横向溢出;offset=-1 时输出 `0 / span 1`(起始行为 0,整条声明非法被浏览器丢弃,列落到自动位置);offset=-2 时 `-1 / span 1` 从尾部数,语义反转。上轮⑧批只收敛了 span,offset 是同类漏洞的另一半。
建议:offset 钳位到 [0, columns - 1](或至少 clamp(0, columns - resolvedSpan)),负值按 0 处理。
回归关联:上轮第⑧批(GridCol span 收敛)相关——该修复未被冲掉,但只覆盖 span,offset 侧遗漏。
```

```

---

[B07-6] P2 · Grid · grow 模式下响应式 cols 静默失效(columns 只取 base 值)
位置:packages/ui/src/components/Grid/Grid.tsx:70、74-75;packages/ui/src/components/Grid/GridCol.tsx:46-55
证据:
    const columns = typeof cols === 'number' ? cols : (cols as any)?.base ?? 12
    ...
    <GridContextProvider value={{ columns, grow: !!grow }}>
GridCol grow 分支:
    const unit = `(100% - ${Math.max(columns - 1, 0)} * var(--grid-column-gap, 0px)) / ${columns}`
    resolvedStyle.flexBasis = `calc(${unit} * ${resolvedSpan})`
grow 模式布局完全由 JS 侧的 columns(仅 base 值)计算,断点变化的 --grid-cols(CSS 变量,非 grow 模式生效)不参与。`cols={{ base: 12, sm: 6 }}` + grow 时,sm 下 flexBasis 仍按 12 列求值,flex-wrap 按 12 列宽换行、flex-grow 再拉伸,8 个子元素会挤成一行而非预期的 6+2 两行;非 grow 模式则正常响应。
建议:grow 模式禁用响应式 cols(dev 告警)或文档标注不兼容;更好的做法是把断点列数也生成为 CSS 变量、basis 用 `calc((100% - (var(--grid-cols) - 1) * gap) / var(--grid-cols) * span)` 表达。
回归关联:上轮第③批(Grid grow 改 flex)相关——修复未被冲掉,但引入/暴露了与响应式 cols 的组合限制。
```

```

---

[B07-7] P2 · Image · fallbackSrc 加载失败不回退 fallback 节点,且 fallbackSrc 的 img 不透传 onLoad/onError
位置:packages/ui/src/components/Image/Image.tsx:145-150
证据:
    {showFallback ? (
        fallbackSrc ? (
            <img {...getStyles('image')} src={fallbackSrc} alt={alt} onError={() => setError(true)} />
        ) : (
            <div {...getStyles('fallback')}>{fallback}</div>
        )
    ) : ( ... )}
fallbackSrc 与 fallback 同传时:fallbackSrc 自身加载失败(网络 404、占位图缺失)后 error 已为 true、分支不再变化,页面停留在一个 broken <img>,fallback ReactNode 永远不会被使用,也没有二级回退;同时该 img 的 onLoad/onError 消费者回调被吞(文档声明 "Called when image is loaded/fails to load"),onError 只内部 setError。
建议:fallbackSrc 的 onError 链式切到 fallback 节点渲染;并透传 onLoad/onError。
回归关联:无(新发现;src 变化重置错误态的实现是完好的)。
```

```

---

[B07-8] P2 · BackgroundImage · url() 未加引号,含空格/括号的 src 生成非法 CSS
位置:packages/ui/src/components/BackgroundImage/BackgroundImage.tsx:69
证据:
    <Box
        ref={ref}
        variant={variant}
        {...getStyles('root', { style: { backgroundImage: `url(${src})` } })}
未加引号包裹:src="my image.png" 生成 `background-image: url(my image.png)`,url() 内裸空格使声明失效,背景不渲染;含 `)`、引号等字符同理。
建议:`url("${src.replace(/"/g, '\\"')}")` 或 encodeURI 后加引号。
回归关联:无(新发现)。
```

```

---

[B07-9] P2 · NavLink · 嵌套展开按钮缺 aria-expanded
位置:packages/ui/src/components/NavLink/NavLink.tsx:155-173
证据:
    <UnstyledButton
        {...getStyles('root')}
        ref={ref}
        disabled={disabled}
        mod={[{ active, disabled, opened: _opened, 'with-children': hasChildren }, mod]}
        data-active={active || undefined}
        data-disabled={disabled || undefined}
        data-opened={_opened || undefined}
        onClick={handleClick}
        {...others}
    >
hasChildren 时按钮实际控制子列表显隐({hasChildren && _opened && <div .../>}),但只有 data-opened 属性,没有 aria-expanded(也没有 aria-controls),读屏用户无法获知展开状态;checklist 第 6 条"aria 属性真实生效"不满足。
建议:hasChildren 时输出 aria-expanded={_opened}(可选补 aria-controls 指向 children 容器 id)。
回归关联:无(新发现)。
```

```

---

[B08-10] P2 · Carousel · 键盘处理挂 capture 且不检查 defaultPrevented/交互控件,slide 内方向键控件被连带翻页
位置:components/Carousel/Carousel.tsx:297、221-248
证据:
```tsx
<Box ... onKeyDownCapture={handleKeydown} ...>
```
capture 阶段先于任何内部组件运行;守卫仅排除 INPUT/TEXTAREA/SELECT/isContentEditable(226-234)。slide 内放置 Slider、Menu、Tree 等以方向键操作的控件时,按 ArrowLeft/Right 会同时触发轮播翻页(preventDefault 不阻止后续 JS 处理器,只是抢了默认行为)。测试仅 `fireEvent.keyDown(root)`(Carousel.test.tsx:122-144),直接派发到 root,capture/bubble 均命中,未编码 capture 语义。
建议:改冒泡阶段(对齐 Mantine)或在守卫中补充 `[role=slider]` 等交互角色、检查 `event.defaultPrevented`。
回归关联:上轮第⑥批加的守卫仍在,本条是其覆盖面问题(非冲掉)。

---

[B08-11] P2 · Carousel · 指示器 tab 语义不完整、region 无可访问名称
位置:components/Carousel/Carousel.tsx:274-284、288-292、343-351
证据:指示器 `role="tab"` + `aria-selected`(277-279)但无 `aria-controls`/对应 tabpanel(slide 是 role="group",CarouselSlide.tsx:39-40),tab 模式残缺;全部指示器都可 Tab 聚焦(无 roving tabindex)。根元素 `role="region" aria-roledescription="carousel"`(291-292)但无 aria-label —— aria-roledescription 要求元素自身有可访问名称,否则读屏播报不完整。
建议:指示器补 aria-controls(以 slide id 关联)或退回普通按钮 + aria-current;region 补 aria-label。
回归关联:无(新发现)。

---

[B08-12] P2 · Pill · 移除按钮 aria-hidden + tabIndex=-1,独立使用时键盘无法移除
位置:components/Pill/Pill.tsx:132-154(136-137)
证据:
```tsx
<CloseButton ... tabIndex={-1} aria-hidden ... onClick={...onRemove...} />
```
在 PillsInput/MultiSelect 体系内有 Backspace 兜底;但 Pill 单独使用(`withRemoveButton onRemove`)时,移除操作对键盘与读屏完全不可达、不可感知。
建议:PillsInput 上下文内维持现状,独立场景(无 field 上下文)取消 aria-hidden 并允许可聚焦;或至少文档标注限制。
回归关联:无(新发现)。

---

[B08-13] P2 · Loader · type 未注册时静默渲染空白节点
位置:components/Loader/Loader.tsx:120;components/Loader/Loader.types.ts:5
证据:`UILoadersRecord` 的键含 `(string & {})`,`UILoader = keyof UILoadersRecord` → `type="custom"` 类型合法;运行时 `loaders['custom']` 为 undefined,`<Box component={undefined}>` 渲染空 div,无任何告警。按钮 loading 等场景会出现"加载图标消失"的静默故障。
建议:`loaders[type]` 不存在时回落 defaultLoaders.oval 并 dev 告警。
回归关联:无(新发现)。

---

[B08-14] P2 · Loader · 类型声明与实现不符(ref=SVGSVGElement / ElementProps<'svg'>,实际渲染 span/div)
位置:components/Loader/Loader.tsx:30、48-49、112-121;loaders/Oval.tsx:5-7
证据:`LoaderProps extends ElementProps<'svg', 'display'|'opacity'>`、`ref: SVGSVGElement`(48-49),但三个内置 loader 全是 `<span>`(Oval.tsx:6),children 分支渲染 Box(div)。svg 专属 props(如 strokeWidth)传给 span 无效,消费方对 ref 做 SVG 断言会错。
建议:类型改为 HTMLElement + ElementProps<'div'>,或把内置 loader 改回 svg 实现。
回归关联:无(新发现)。

---

[B08-15] P2 · Upload · maxFiles 槽位按入口快照计算,await 期间并发变更可超额
位置:components/Dropzone/Upload/Upload.tsx:253-267
证据:
```ts
const addFiles = async (incoming: FileWithPath[]) => {
    const current = filesRef.current;
    const remainingSlots = maxFiles != null ? Math.max(0, maxFiles - current.length) : Infinity;
    ...
    const result = await beforeUpload(item.file);   // ← 等待期间列表可变
    ...
    commit([...filesRef.current, ...withValidation]);
```
⑥批已修"提交基于最新 filesRef"(292 行),但 `remainingSlots` 仍取自入口快照:两次并发 drop(或 beforeUpload 等待期间再 drop)各自按旧长度计槽,合并后可超 maxFiles。
建议:槽位判定挪到 commit 前(按 `filesRef.current.length + withValidation.length` 逐个收口)。
回归关联:上轮第⑥批相关(该修复未覆盖此残留,非冲掉)。

---

[B08-16] P2 · Upload · 声明的 stylesName `fileError` 未接线(死样式槽)
位置:components/Dropzone/Upload/Upload.tsx:55、359-364;components/Dropzone/Upload/Upload.module.css:36-38
证据:`UploadStylesNames` 声明 `'fileError'`,CSS 定义了 `.fileError { color: var(--ui-color-red-7,...) }`;但组件从不调用 `getStyles('fileError')` —— 错误文案直接拼在 fileSize 的 Text 里(361-363),错误文字颜色走 dimmed 而非红色,消费者 `classNames.fileError` 无效。
建议:错误信息改用 `getStyles('fileError')` 渲染独立节点。
回归关联:无(新发现)。

---

[B08-17] P2 · Portal · 除 className/style/id 外的 div props 静默丢弃
位置:components/Portal/Portal.tsx:7、11-22、59-84
证据:
```ts
type PortalNodeAttrs = Pick<React.ComponentProps<'div'>, 'className' | 'style' | 'id'>
```
`BasePortalProps extends React.ComponentProps<'div'>` 允许传 `aria-*`/`data-*`/事件等,但 `createPortalNode`/`syncPortalNodeAttrs` 只应用三个属性,其余既不落到容器节点也不落到 children,无告警(checklist #10 死参数)。
建议:文档标注仅支持三属性,或把 data-*/aria-* 一并同步到容器节点。
回归关联:无(新发现;⑦批修复本身完好)。

---

[B08-18] P2 · ActionIconGroup · useProps 双调用
位置:components/ActionIcon/ActionIconGroup/ActionIconGroup.tsx:55-69
证据:
```tsx
const props = useProps('ActionIconGroup', defaultProps, _props)
const {
    className, style, ...
} = useProps('ActionIconGroup', defaultProps, _props)   // ← 第二次调用
```
同一 props 连续调用两次 useProps(内部含 useUITheme + 两次对象合并),第二次结果才被解构使用;每渲染多一次 context 读取与两层对象 churn,纯浪费且易误导维护者。
建议:删除第一次调用,直接解构。
回归关联:无(新发现)。

---

[B08-19] P2 · ActionIconGroupSection · color prop 泄漏到 DOM
位置:components/ActionIcon/ActionIconGroupSection/ActionIconGroupSection.tsx:110-123、140
证据:解构列表 `{ className, style, classNames, styles, unstyled, vars, variant, gradient, radius, autoContrast, attributes, ...others }` 漏掉 `color`;varsResolver 确实消费 `props.color`(85-102)生成样式,但 `color` 同时留在 `others` 中被 `<Box {...others}>` 渲染成 `<div color="blue">` 无效属性。对照 ActionIcon.tsx:141 自己解构了 color,无此泄漏。
建议:解构中加入 `color`。
回归关联:无(新发现)。

---

[B08-20] P2 · CodeHighlightTabs · 文件按钮 key 用 fileName(可缺省、可重复)
位置:components/CodeHighlight/CodeHighlightTabs/CodeHighlightTabs.tsx:148-151
证据:
```tsx
const files = code.map((node, index) => (
    <UnstyledButton {...getStyles('file')} key={node.fileName} ...
```
`fileName?: string`(CodeHighlightTabs.tsx:27)可选:未传时 key=undefined(React 回落索引并告警),两个同名文件时 key 冲突导致状态错位。
建议:`key={node.fileName ?? index}`(或 fileName+index)。
回归关联:无(新发现)。

---

[B08-21] P2 · CodeHighlightTabs · 文件切换按钮无 tablist/tab/aria-selected 语义
位置:components/CodeHighlight/CodeHighlightTabs/CodeHighlightTabs.tsx:148-165
证据:文件条是纯 UnstyledButton + `mod={{ active: index === value }}`(视觉高亮),无 `role="tablist"/tab`、无 `aria-selected`/`aria-current`;读屏无法感知当前激活文件。代码区也没有联动标注。
建议:外层 role=tablist、按钮 role=tab + aria-selected,或至少加 aria-current。
回归关联:无(新发现)。

---

[B08-22] P2 · CodeHighlight/Pill · 文档默认值与实现不符
位置:components/CodeHighlight/CodeHighlight/CodeHighlight.tsx:63-67、87-91、141-145;CodeHighlight/CopyCodeButton/CopyCodeButton.tsx:13-14;components/Pill/Pill.tsx:48;components/Pill/Pill.module.css:23
证据:接口注释 `@default 'Copy'`/`'Copied'`/`'Expand code'`/`'Collapse code'`(63-91),实际默认是中文 `'展开代码'/'收起代码'`(CodeHighlight defaultProps:143-144;CopyCodeButton 默认 `'复制'/'已复制'`)。Pill `radius` 注释 `@default 'xl'`(Pill.tsx:48),但组件无 radius 默认值,CSS 回落是 `--pill-radius, 1000rem`(Pill.module.css:23,全圆角)。
建议:修正注释或补 defaultProps,使 @default 与行为一致。
回归关联:无(新发现)。

---

[B08-23] P2 · Notification/TableOfContents/TypographyStylesProvider · RTL 物理属性未用逻辑属性
位置:components/Notification/Notification.module.css:22-31;components/TableOfContents/TableOfContents.module.css:12;components/TypographyStylesProvider/TypographyStylesProvider.module.css:85-88、110-115
证据:
```css
/* Notification.module.css ::before 色条,inset-inline-start 已逻辑化,圆角没有 */
border-radius: 4px 0 0 4px;          /* RTL 下色条在右侧,圆角应翻转 */
/* TableOfContents.module.css */
padding-left: max(calc(var(--depth-offset) * var(--toc-depth-offset)), 0.8em);  /* 应 padding-inline-start */
/* TypographyStylesProvider.module.css */
padding-left: var(--ui-spacing-lg);       /* ul/ol */
border-left: 4px solid ...;               /* blockquote */
```
RTL 布局下缩进/引用线方向与 LTR 相同,视觉反了。仓库其它组件(如 Button .section margin-inline-*)已是逻辑属性写法。
建议:改 padding-inline-start / border-inline-start;色条圆角按书写方向或用 border-start-start-radius 系列。
回归关联:无(新发现)。

---

---

[B08-4] P2 · Button/ActionIcon · loading 态缺少 aria-busy,读屏无"忙"状态
位置:components/Button/Button.tsx:186-217;components/ActionIcon/ActionIcon.tsx:169-193
证据:Button 只设了 `disabled={disabled || loading}` 与 `mod={{ ..., loading }}`(Button.tsx:191-202),ActionIcon 同(ActionIcon.tsx:176-178);两个组件都没有 `aria-busy={loading}`。loader 覆盖层自身 `aria-hidden`(Button.tsx:208)。读屏用户只能听到按钮"不可用",听不到"加载中",提交类按钮的 loading 反馈对 AT 不可感知。
建议:根元素补 `aria-busy={loading}`。
回归关联:无(新发现)。

---

[B08-5] P2 · Button/ActionIcon · polymorphic anchor 模式下 disabled/loading 不拦截点击
位置:components/Button/Button.tsx:191;components/ActionIcon/ActionIcon.tsx:176;components/UnstyledButton/UnstyledButton.tsx:77-85
证据:`disabled` 直接透传给 Box 渲染为 `<a disabled>`;锚元素不是可禁用元素,`disabled` 属性不阻止导航/点击,`:disabled` CSS 也不匹配(视觉上靠 data-loading 兜住了,交互没兜住)。`<Button component="a" href="/x" loading>` 在加载期间仍可点击跳转。UnstyledButton 也没有 onClick 守卫(仅 `type={component === 'button' ? 'button' : undefined}` 一处特殊处理)。
建议:非 button 组件时改为 onClick 里 `disabled/loading → preventDefault + return`,并保留 data-disabled 视觉。
回归关联:无(新发现)。

---

[B08-6] P2 · Button/CloseButton · hover 样式无 `(hover: hover)` 媒体守卫,触摸设备粘滞高亮
位置:components/Button/Button.module.css:100-103;components/CloseButton/CloseButton.module.css:37-43
证据:
```css
/* Button.module.css */
&:hover:where(:not([data-loading], :disabled, [data-disabled])) { ... }
```
ActionIcon.module.css:35-47 对同样的 hover 用了 `@media (hover: hover)` / `(hover: none)` 双守卫(还包括 active 态),Button 与 CloseButton-subtle 没有包媒体查询:触屏上点按后 hover 态粘滞不消失。
建议:对齐 ActionIcon 的媒体守卫写法。
回归关联:无(新发现)。

---

[B08-7] P2 · Notification/Carousel · 默认 aria-label / 状态文案中英混杂
位置:components/Notification/Notification.tsx:123;components/Carousel/Carousel.tsx:278、299-301、306、321
证据:`aria-label="Close notification"`(Notification)与 Alert 的 `'关闭'`(⑯批,Alert.tsx:158)语言不一致;Carousel 的 `Go to slide ${index+1}`、`Previous slide`、`Next slide`、`Slide x of y` 全英文,而 CodeHighlight 的 CopyCodeButton 默认 `'复制'/'已复制'`(CopyCodeButton.tsx:13-14)、ExpandCodeButton `'展开代码'/'收起代码'` 全中文。checklist #6(aria-label 中英一致性)。
建议:统一默认语言(与 Alert/CodeHighlight 对齐为中文),或提供 i18n 通道。
回归关联:上轮第⑯批只统一了 Alert,其余组件未跟进(非冲掉,属未完成面)。

---

[B08-8] P2 · Notifications · limit prop 运行时变化不触发重排,已显示列表不收敛
位置:components/Notifications/Notifications.tsx:129-136;components/Notifications/notifications.store.ts:125-146
证据:effect 只把 limit 写进 store:
```ts
store?.setState({ ...store.getState(), limit: limit ?? 5, defaultPosition: position })
```
而显示/入队的重排只发生在 `updateNotificationsState`(show/hide/update/cleanQueue 调用路径,store:139)。运行时把 `<Notifications limit={2}>` 从 5 改成 2,已显示的 5 条不会收拢,直到下一次 show/hide 才收敛。另:`?? 5` 为死代码(useProps 已应用 defaultProps.limit=5)。
建议:limit 变化时调用一次 `getDistributedNotifications` 重排(notifications.updateState 即可)。
回归关联:无(新发现)。

---

[B08-9] P2 · Notifications · store 字段(position/priority/__sequence/自定义字段)透传泄漏到 DOM
位置:components/Notifications/NotificationContainer.tsx:24、80-85;components/Notifications/notifications.store.ts:12-35
证据:`NotificationData extends Omit<NotificationProps,'onClose'>, Record<string, any>` 且带 `position`/`priority` 字段;容器只剔除 `autoClose/message/allowClose/onOpen`:
```tsx
const { autoClose: notificationAutoClose, message, allowClose, onOpen, ...notificationProps } = data;
...
<Notification {...notificationProps} message={message} ... />
```
Notification 组件解构后再把 `...others` 摊到 Box(Notification.tsx:112)→ `position="top-left"`、`priority`、内部标记 `__sequence` 及消费者任意自定义字段都会渲染成 DOM 属性(无效属性 + 内部状态外泄)。`__sequence` 还会被 `updateNotificationsState` 原地写回(store:132-137),随 spread 一路下漏。
建议:容器侧显式剔除 `id/position/priority/__sequence`;或 Notification 侧白名单透传。
回归关联:无(新发现)。

---

### [B09-10] P2 · InlineDateTimePicker · allowDeselect 接线为死参数(点击已选日期无法反选)

位置:packages/ui/src/dates/components/InlineDateTimePicker/InlineDateTimePicker.tsx:210-217、169-172(calendarProps 透传)

证据:
```ts
const handleDefaultDateChange = (date: DateValue) => {
  if (date) {                                  // ← null 分支被丢弃
    setValue(assignTime(clampDate(minDate, maxDate, date), startTimeValue || defaultTimeValue || ''));
  }
  startTimePickerRef.current?.focus();
};
```
InlineDateTimePickerProps 经 DatePickerBaseProps→PickerBaseProps 接受 `allowDeselect`,pickCalendarProps 也把它下传 DatePicker(其 useDatesState 会在点击已选日期时回调 onChange(null));但 handleDefaultDateChange 的 `if (date)` 把 null 丢弃 → 反选永不生效(时间组合下 _value 保持旧日期)。要么显式声明不支持,要么处理 null(连同时间输入一起清空)。

建议:声明不支持时从 props 类型 Omit 并在 pickCalendarProps 剥离;支持时 null 分支 `setValue(null)` + 重置时间状态。

回归关联:无(新发现)。

---

### [B09-11] P2 · DatePicker · 预设选择后的层级恢复未经 clampLevel

位置:packages/ui/src/dates/components/DatePicker/DatePicker.tsx:223-232

证据:
```ts
const handlePresetSelect = (val) => {
  const _val = Array.isArray(val) ? val[0] : val;
  if (_val !== undefined) {
    setDateRef.current?.(_val);
    setLevelRef.current?.('month');            // ← 未 clamp
```
DatePicker 支持 `minLevel`(CalendarSettings);当 `minLevel="year"` 且带 presets 时,点预设会经 `__setLevelRef` 把 Calendar 拉回 month 层,绕过 minLevel 限制(日历头部按钮本身被 hasNextLevel 隐藏,此为唯一旁路)。MonthPicker/YearPicker 同名逻辑分别硬编码 'year'/'decade'(与各自 minLevel 一致)无此问题。

建议:`setLevelRef.current?.(clampLevel('month', minLevel, maxLevel))`。

回归关联:上轮第⑱批相关(clampLevel 工具为该批引入;头部/快捷键路径已接,预设路径漏网)。

---

### [B09-12] P2 · DateTimePicker · dropdownType="modal" 时 Escape/遮罩关闭不触发 onDropdownClose、不做收尾钳制(popover 路径才有)

位置:packages/ui/src/dates/components/PickerInputBase/PickerInputBase.tsx:143-155(Modal onClose=handleClose)、163-172(Popover onClose=onDropdownClose);DateTimePicker.tsx:252-262

证据:
```tsx
{dropdownType === 'modal' && !readOnly && (
  <Modal opened={dropdownOpened} onClose={handleClose} ...>      // 只清理+关闭
...
<Popover
  onClose={onDropdownClose}                                     // popover 路径回调消费者
  onChange={(_opened) => { if (!_opened) { popoverProps?.onClose?.(); handleClose(); } }}
```
DateTimePicker 把 `onDropdownClose={handlePopoverDropdownClose}`(钳制 + 消费者回调)只接到 Popover 的 onClose 上;Modal 分支 Escape/点击遮罩走 PickerInputBase.handleClose(仅清未完成区间 + close),既不调 handleDropdownClose 的 clampValueToRange,也不触发消费者传入的 onDropdownClose —— 同一 prop 两种 dropdownType 行为不一致(消费者在 modal 下无法感知关闭,收尾钳制丢失)。

建议:Modal onClose 也走统一的关闭管线(handleClose + onDropdownClose + 钳制),或文档明示差异。

回归关联:上轮第⑮批相关(双 onChange 修复重构了该关闭管线;popover 路径语义正确,modal 分支为遗漏面)。

---

### [B09-13] P2 · TimePicker · 下拉时间控件/预设列表 tabIndex=-1,键盘完全不可达

位置:packages/ui/src/dates/components/TimePicker/TimeControlsList/TimeControl.tsx:15-25、TimePresets/TimePresetControl.tsx:26-33

证据:
```tsx
<UnstyledButton
  mod={{ active }}
  onClick={() => onSelect(value)}
  onMouseDown={(event) => event.preventDefault()}
  data-value={value}
  tabIndex={-1}                       // 无任何方向键/roving 处理
```
withDropdown 打开的下拉(控件列表与 presets)全部 tabIndex=-1 且无键盘导航逻辑:键盘用户聚焦输入框触发下拉后,只能继续用 spin 输入,列表功能纯鼠标。TimeControlsList 也未做 roving tabindex/aria-activedescendant。

建议:列表容器加 role="listbox"(或 grid)+ 方向键移动 active 项,或至少给 preset 按钮恢复 tabIndex=0。

回归关联:无(新发现)。

---

---

### [B09-3] P2 · Calendar · 键盘导航 effect 依赖每渲染新建的 handler,document 监听逐渲染重挂

位置:packages/ui/src/dates/components/Calendar/Calendar.tsx:312-352(定义)、406-414(依赖数组)

证据:
```ts
const handleNextYear = () => {          // 普通函数,每次渲染新身份
  const nextDate = shiftDate(_columnsToScroll, 'year').format('YYYY-MM-DD');
  ...
};
useEffect(() => {
  ...
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [
  enableKeyboardNavigation, isStatic, _level,
  handleNextYear, handlePreviousYear, handleNextDecade, handlePreviousDecade,  // ← 每渲染都变
]);
```
handleNextYear 等 4 个函数未 useCallback 却进了依赖数组 → Calendar 每次渲染(含 range 悬停等高频父级更新)都对 document 做 remove+add。正确性无碍(监听始终最新),纯性能损耗。

建议:4 个 handler 用 useCallback 包住(依赖 currentDate/_columnsToScroll/onNext* 回调),或把 handler 收进 ref。

回归关联:上轮第⑱批相关(`y` 快捷键修复新增了该 effect;修复本身未冲掉,此为本批新发现)。

---

### [B09-4] P2 · DatePicker · `type` prop 未解构,泄漏为日历根节点 DOM 属性

位置:packages/ui/src/dates/components/DatePicker/DatePicker.tsx:117-140(解构漏 type)、247(presets 分支 Box);传播链 DatePickerInput.tsx:132、Calendar.tsx:254/422

证据:
```ts
const {
  allowDeselect, allowSingleDateInRange, value, defaultValue, onChange, ...
  // 无 type 解构;defaultProps 又注入 type: 'default'(DatePicker.tsx:102-107)
  ...rest
} = props;
...
<Box {...getStyles('datePickerRoot')} size={size} {...others}>   // others 含 type
```
DatePickerInput 显式传 `type={type}`,DatePicker 与 Calendar 均不解构 `type`,Box 只剥离 variant/size(core/Box/Box.tsx:66-79),最终渲染 `<div data-calendar type="default">`——非标准 DOM 属性泄漏(无 React 告警,静默脏 DOM;无 presets 时经 Calendar 的 others 同样落地)。

建议:DatePicker 解构 `type` 并显式传给 useDatesState(已是 `others.type as any` 使用);或在 Calendar 解构丢弃。

回归关联:无(新发现)。

---

### [B09-5] P2 · InlineDateTimePicker · currentLevel 未过 clampLevel 且不随受控 level/defaultLevel 纠偏,时间面板可能永不渲染

位置:packages/ui/src/dates/components/InlineDateTimePicker/InlineDateTimePicker.tsx:204、370、410

证据:
```ts
const [currentLevel, setCurrentLevel] = useState(level || defaultLevel || 'month');
...
{currentLevel === 'month' && !isRange && (   // 时间输入区可见性由此 state 决定
```
Calendar 侧 `level`/`defaultLevel` 均经 clampLevel(Calendar.tsx:263-268),但本组件 currentLevel 初值取原始 prop:如 `defaultLevel="year"` + `maxLevel="month"`(Calendar 实际显示 month 层)时 currentLevel 停在 'year',时间面板被隐藏且无人纠正(onLevelChange 仅用户操作时触发);受控 `level` prop 后续程序化变化也不同步。

建议:初值与同步都走 `clampLevel(level || defaultLevel || 'month', 'month', maxLevel)`,并对受控 level 用 effect 对齐。

回归关联:无(新发现)。

---

### [B09-6] P2 · InlineDateTimePicker · 清空时间输入不同步合成值,提交时旧时间复活

位置:packages/ui/src/dates/components/InlineDateTimePicker/InlineDateTimePicker.tsx:252-266(开始时间)、268-276(结束时间)

证据:
```ts
const handleStartTimeChange = (timeString: string) => {
  timePickerProps?.onChange?.(timeString);
  setStartTimeValue(timeString);
  if (timeString) {                      // ← 空串只改本地显示,不动 _value
    ...setValue(assignTime(_value, timeString));
  }
};
```
用户在 TimePicker 里 Backspace 清空字段(SpinInput 触发 onChange('')),或点 clear 按钮(controller.clear() → onChange(''))后:startTimeValue=''、_value 保留旧时间;useDidUpdate(314-321)依赖 _value 不触发 → 时间框显示空、DateTimePicker 顶部 formattedValue 仍显示带时间的完整值,点提交(handleSubmitOrEnter → clampValueToRange 直接用 _value)把旧时间原样上报——用户以为清空了时间,提交值仍带时间。

建议:空串分支同时 `setValue` 去掉时间部分(或至少同步为日期 00:00:00 并刷新 formattedValue),使显示/提交一致。

回归关联:无(新发现;该 if 守卫结构与上游 mantine 同构,但 mantine 无本仓库的 clear 按钮接线,此处真实可达)。

---

### [B09-7] P2 · TimeControlsList · step<=0 时渲染期死循环(页面冻结)

位置:packages/ui/src/dates/components/TimePicker/TimeControlsList/TimeControlsList.tsx:27-33、54

证据:
```ts
function getValuesRange(min: number, max: number, step: number) {
  const range = [];
  for (let i = min; i <= max; i += step) {   // step=0/负数 → 永不退出
    range.push(i);
  }
  return range;
}
...
const range = getValuesRange(min, max, step);  // 渲染期同步执行
```
`hoursStep`/`minutesStep`/`secondsStep` 为消费者自由数值 prop(文档默认 1,无下限约束),传 0 或负数即同步死循环,整页冻结且无法恢复。同族 getTimeRange(get-time-range.ts:15)对 interval='00:00:00' 同样死循环(TimeGrid/TimePicker story 均 export 该工具)。

建议:getValuesRange 入口 `step = Math.max(1, Math.floor(step))` 防御;getTimeRange 对 intervalInSeconds<=0 返回 [startTime]。

回归关联:无(新发现)。

---

### [B09-8] P2 · AmPmInput · input 模式接受任意自由文本,am/pm 语义静默失效

位置:packages/ui/src/dates/components/TimePicker/AmPmInput/AmPmInput.tsx:72-91

证据:
```ts
if (inputType === 'input') {
  return (
    <input
      value={displayValue}
      onChange={(event) => !readOnly && onChange(event.target.value || null)}  // 任意字符串
```
`withDropdown && format="12h"` 时 am/pm 用自由文本 input(仅 select 模式受 option 约束)。键入 'Q' → setAmPm('Q') → getTimeString 的 convertTo24HourFormat(get-time-string.ts:23-27)对既非 pm 又非 am 的值不调整小时 → 按 AM 语义输出 valid 时间并 onChange;界面显示 'Q' 但值语义是 AM,PM 选择静默丢失。

建议:input 模式 onChange 里把输入值归一到 labels.am/labels.pm(取首字符 a/p 匹配),不匹配时回退旧值。

回归关联:无(新发现)。

---

### [B09-9] P2 · DateInput · allowDeselect=false + clearable=true 时清空输入框仍会把值置 null(与 prop 语义不符)

位置:packages/ui/src/dates/components/DateInput/DateInput.tsx:180、212-226

证据:
```ts
const _allowDeselect = allowDeselect !== undefined ? allowDeselect : clearable;  // 已归一
...
const handleInputChange = (event) => {
  const val = event.currentTarget.value;
  setInputValue(val);
  setDropdownOpened(true);
  if (val.trim() === '' && (allowDeselect || clearable)) {   // ← 用原始 prop,绕过 _allowDeselect
    setValue(null);
```
显式 `allowDeselect={false}`(语义:禁止反选)叠加 `clearable`(为了清除按钮)时,把输入框内容删空仍触发 setValue(null);而日历点选路径(_getDayProps,257 行)正确走 `_allowDeselect`。同一 prop 两条路径行为不一致。

建议:217 行条件改用 `_allowDeselect`(= `allowDeselect ?? clearable`),与点选路径对齐。

回归关联:无(新发现;该写法系上游 mantine 同构代码,但与本仓库 _allowDeselect 归一化意图冲突)。

---

[B10-3] P2 · toDateString / defaultDateFormatter · `''` 原样透传导致受控 `value=""` 显示 "Invalid Date"
位置:packages/ui/src/dates/utils/to-date-string/to-date-string.ts:15;packages/ui/src/dates/utils/get-formatted-date/get-formatted-date.ts:24
证据:

```ts
// to-date-string.ts:14-16
  return (
    value == null || value === '' ? value : dayjs(value).format('YYYY-MM-DD')
  ) as ExactOptionalReturn<T, DateStringValue>;

// get-formatted-date.ts:23-24
  if (type === 'default') {
    return date === null ? '' : formatDate(date as DateStringValue);
```

`''` 被刻意原样返回(不归一为 null),而 formatter 只识别 `null` 为空。链条:受控 `value=""`(类型上合法,`DateStringValue = string`)→ convertDatesValue 透传 `''` → `'' !== undefined` 判为受控 → `_value = ''` → `formatDate('')` → `dayjs('')` 为 Invalid → 输入框显示 "Invalid Date"(空串语义应是空)。`use-dates-input.ts:73` 的 `shouldClear`(`_value !== null`)也把 `''` 误判为有值。
建议:toDateString/toDateTimeString 将 `''` 归一为 `null`(与 finalValue 空态一致),或在 defaultDateFormatter/useDatesInput 层把 `''` 视为空。
回归关联:无(新发现)。待核实点:`''` 是否被库契约视为合法入参(类型合法、语义存疑,若判定为非法入参可降级为防御性加固)。

---

---

[B10-4] P2 · assignTime · '24:00' 跨天滚动与 NaN 无防御;null 日期静默取「今天」且未经 min/max 钳制
位置:packages/ui/src/dates/utils/assign-time/assign-time.ts:8、14-19;主要影响调用点 packages/ui/src/dates/components/InlineDateTimePicker/InlineDateTimePicker.tsx:213/222/225/263(defaultTimeValue 为消费者 prop,该组件属其他批次)
证据:

```ts
  let date = dateValue ? dayjs(dateValue) : dayjs();          // null → 今天(now)

  const [hours, minutes, seconds = 0] = timeString.split(':').map(Number);

  date = date.set('hour', hours);   // hours=24 → dayjs 滚动到次日 00:00(跨天)
```

1. `defaultTimeValue` 是消费者直传字符串(InlineDateTimePicker.tsx:213 `startTimeValue || defaultTimeValue || ''`),传 `'24:00'` 时 `set('hour', 24)` 把日期滚到**次日** 00:00——与上轮⑨批在 schedule toTimeString 修过的问题同型(那边把 hours=24 钳到 23:59:59),dates 侧未对齐;
2. 非数字分量(如消费者传 `'9:h30'`)→ NaN → `set` 产生 Invalid Date → `'Invalid Date'` 字符串直接进入 value 并显示,无任何守卫;
3. `dateValue == null` 时静默取 `dayjs()`(今天):InlineDateTimePicker.tsx:263 `setValue(assignTime(_value as DateStringValue | null, timeString))` 在未选日期先输时间时,值悄悄变成「今天 + 所输时间」,且该路径不经 clampDate,可产生早于 minDate/晚于 maxDate 的越界值(选日期路径 213/222/225 均有 clampDate,唯独此路径没有)。
建议:hours 钳 0-23(或对齐⑨语义 24→23:59:59)、分钟/秒钳 0-59、NaN/Infinity 守卫(fallback 0 或保持原值);assignTime 对 null 日期的「取今天」行为至少在调用点补 clampDate(minDate, maxDate)。
回归关联:上轮第⑨批相关(schedule toTimeString 的 hours=24 钳制未推广到 dates 侧同型函数;非冲掉,属遗漏对齐)。

---

---

### [B11-2] P2 · YearView · withOutsideDays=false 时方向键遇占位格中断(⑱批同型修复未同步)

位置:`packages/ui/src/schedule/components/YearView/handle-year-view-key-down.ts:213-220`;关联 `YearViewMonth.tsx:146-148`

证据:
```ts
const controlToFocus =
  controlsRef.current?.[nextPosition.monthIndex]?.[nextPosition.weekIndex]?.[nextPosition.dayIndex];

if (!controlToFocus) {
  return;   // ← 占位格不注册 ref(undefined)直接 return,导航中断
}
```
YearViewMonth 对 outside 且 `!withOutsideDays` 的日期渲染无 ref 的占位 div(`YearViewMonth.tsx:146-148`:`return <div {...getStyles('yearViewDay')} data-day-placeholder key={date} />;`),`daysRef` 中对应槽位为 undefined。⑱批已为 MonthView 修复同型问题(`handle-month-view-key-down.ts:149-157` 把 `!controlToFocus` 并入跳过递归的条件),YearView 的 3D 版本仍保留旧行为:跨月方向键走到占位格即停,后续月份不可达。默认配置(withOutsideDays=true)下 outside 按钮有 ref 且被 `data-outside` 检查跳过,不受影响;仅显式 `withOutsideDays=false` 时触发。

建议:对齐 MonthView 修复——把 `if (!controlToFocus)` 的提前 return 改为并入「跳过并继续递归」分支(与 disabled/data-hidden/data-outside/data-day-placeholder 同路)。

回归关联:上轮第⑱批相关(MonthView 侧已修,YearView 为该批漏网,非新冲掉)。

---

### [B11-3] P2 · MobileMonthView · 事件列表「All day」硬编码英文,绕过 labels.allDay 覆盖

位置:`packages/ui/src/schedule/components/MobileMonthView/MobileMonthView.tsx:444`

证据:
```tsx
<Text {...getStyles('mobileMonthViewEventTime')}>
  {isAllDay ? 'All day' : `${startTime} – ${endTime}`}
</Text>
```
同文件及 AgendaView(`AgendaView.tsx:195`)均走 `getLabel('allDay', labels)`,labels 体系里存在 `allDay: 'All day'` 键(`schedule/labels.ts`)。此处硬编码使 i18n 覆盖(labels.allDay)在移动月视图事件列表失效。同文件邻近的周序号 `aria-label={`Week ${weekNumber}`}`(MonthView.tsx:711、MobileMonthView.tsx:395、YearViewMonth.tsx:217)亦为英文硬拼且 labels 无对应键,属同类 i18n 缺口(需先补 label key)。

建议:`{isAllDay ? getLabel('allDay', labels) : ...}`;周序号 aria-label 增加 `weekNumber` 类 label key 后统一走 getLabel。

回归关联:无(新发现;⑱批「MobileMonthView 全天判定复用 isAllDayEvent」修复本身保留,此处是显示文案未跟上)。

---

### [B11-4] P2 · MobileMonthView · aria-selected 挂在无 role 的 button 上,ARIA 语义无效

位置:`packages/ui/src/schedule/components/MobileMonthView/MobileMonthView.tsx:351`

证据:
```tsx
<UnstyledButton
  aria-label={ariaLabel}
  aria-selected={isSelected || undefined}
```
UnstyledButton 渲染为原生 `<button>`(role=button),`aria-selected` 对 button 角色不是受支持属性,屏幕阅读器不会播报选中态。日历网格场景的惯用做法是外层 `role="grid"`/cell `role="gridcell"`(此时 aria-selected 合法),或改用 `aria-pressed`/`aria-current="date"`。选中样式本身另有 `mod selected` 支持,不依赖该属性。

建议:日期单元格加 `aria-current={isSelected ? 'date' : undefined}`,或将网格改造为 grid/gridcell 语义后保留 aria-selected。

回归关联:无(新发现)。

---

### [B11-5] P2 · ViewSelect / MonthYearSelect · 无激活值时 roving tabindex 整体失效(月份列表无兜底)

位置:`packages/ui/src/schedule/components/ScheduleHeader/ViewSelect/ViewSelect.tsx:157-158`;`MonthYearSelect.tsx:199`

证据:
```tsx
// ViewSelect.tsx:157-158 —— value 为可选 prop,未传时 isSelected 全为 false
aria-selected={isSelected}
tabIndex={isSelected ? 0 : -1}
```
```tsx
// MonthYearSelect.tsx:199 —— 月份列表,monthValue 未传时全 -1
tabIndex={month.month === monthValue ? 0 : -1}
```
ViewSelect 是仅受控组件(无 defaultValue),直接使用 `<ScheduleHeader.ViewSelect onChange={...}/>` 而漏传 value 时,全部 tab `tabIndex=-1` 且无 `aria-selected="true"` 项,Tab 键无法进入 tablist,方向键导航(roving)失去起点。MonthYearSelect 的年份列表有兜底(`MonthYearSelect.tsx:168`:`tabIndex={hasActiveYear ? ... : index === 0 ? 0 : -1}`),月份列表却没有——同文件内的不一致佐证这是遗漏而非设计。库内调用(ScheduleHeaderBase)总是传值,不影响主链路。

建议:对齐 ⑩批 Tabs 的处理——无激活值时把第一个未禁用项设为 tabIndex 0(ViewSelect 与 MonthYearSelect 月份列表各补一处)。

回归关联:上轮第⑩批同类问题(Tabs 侧已修,ViewSelect/MonthYearSelect 为漏网,非新冲掉)。

---

### [B11-6] P2 · YearView / MobileMonthView / AgendaView · 事件展开管线未 memo,渲染期全量重算 rrule 展开

位置:`packages/ui/src/schedule/components/YearView/YearView.tsx:198-205`(另 `getFirstDayIndex` 每渲染 12 次 getMonthDays,`YearView.tsx:210-228` 被months map 每渲染调用);`MobileMonthView/MobileMonthView.tsx:262-269`;`AgendaView/AgendaView.tsx:152-163`

证据:
```tsx
// MobileMonthView.tsx:262-269 —— 组件内 _selectedDate state,每次点选日期触发重渲染即全量重跑
const expandedEvents = expandRecurringEvents({
  events,
  rangeStart: dayjs(date).startOf('month').toDate(),
  rangeEnd: dayjs(date).endOf('month').toDate(),
  expansionLimit: recurrenceExpansionLimit,
});
const groupedEvents = getMobileMonthViewEvents({ date, events: expandedEvents });
```
②批已为 Week/Month/DayView 建立「expandRecurringEvents + 布局 useMemo」模式(`WeekView.tsx:573-599` 等),YearView(全年范围展开,上限 2000 实例)、MobileMonthView(点选任意日期即重渲染重算)、AgendaView(打开 agenda 后父级每次渲染重算)三处仍是裸调用。MobileMonthView 触发最频繁:交互(点日期)→ setState → 重跑展开 + 分组。YearView 无内部 state,但每次父渲染还附带 12× getFirstDayIndex 的 getMonthDays 重建。

建议:对齐 ②批模式,三处套 useMemo(依赖 events/date/recurrenceExpansionLimit);YearView 的 `getFirstDayIndex(month)` 结果可随 months 数组一并 useMemo。

回归关联:上轮第②批相关(②批修复保留;此三处为该批范围外的一致性缺口,非新冲掉)。

---

---

### [B12-3] P2 · useDragDropHandlers · 已知预存 tsc 错误:泛型 T 不能赋给 DropContext 的 DropTarget(已复核成立,包级 tsc 目前红)

位置:`packages/ui/src/schedule/hooks/use-drag-drop-handlers.ts:230-249`(报错点 230,错误主体 235/238-239)

证据(实跑 `tsc --noEmit` 于 packages/ui,tsconfig 为仓库自带):

```text
src/schedule/hooks/use-drag-drop-handlers.ts(230,9): error TS2322: ... is not assignable to type 'DragContextValue'.
  Types of property 'dropTarget' are incompatible.
    Type 'T | null' is not assignable to type 'DropTarget | null | undefined'.
      Type 'T' is not assignable to type 'DropTarget'.
```

`dropTarget` 是 hook 本地 `useState<T | null>`(L113),塞进 `DragContextValue`(dropTarget?: DropTarget | null,DragContext.tsx:15);`setDropTarget` 分支用 `target as T` 强转(L239)掩盖了反向不匹配。MonthView/WeekView allDay 以 `useDragDropHandlers<string>` 调用,string 与 DropTarget 结构完全不兼容,错误真实成立。运行时暂无实害:全仓 `DragContext` 消费方只有 ScheduleEvent.tsx:150 读 onDragStart/onDragEnd/draggedEventId,无人读 ctx.dropTarget/setDropTarget(仅 WeekView.tsx:1215 透传)。

建议:约束泛型 `useDragDropHandlers<T extends DropTarget>`(各视图 T 本就是 DropTargetSlot/DropTargetCell/string,string 那两处需换 DropTarget 子集),或将 DragContextValue.dropTarget/setDropTarget 放宽为 unknown/泛型参数,消除 `as T`。

回归关联:上轮第⑱批「DragContext dropTarget 接通真实状态」修复仍在(L227-249 读本地 dropTarget,未被冲掉);tsc 错误是该批接线时引入的预存类型债,当时即已知。

---

### [B12-4] P2 · DropTarget 类型双份定义 + useDragState 的 dropTarget 切片成死状态

位置:`packages/ui/src/schedule/types.ts:219-228` 与 `packages/ui/src/schedule/hooks/use-drag-state.ts:4-13`(重复);`use-drag-state.ts:26、69-81`(死状态/死 API)

证据:两处 `interface DropTarget { date; time?; slotIndex? }` 结构逐字段相同、各自导出;⑱批接线后 `useDragState` 的 `state.dropTarget` 再无任何写入方(全仓 `dragState.setDropTarget`/`clearDropTarget` 零调用,WeekView.tsx:1215 走的是 dragContextValue 那份),`setDropTarget/clearDropTarget` 成为经 hooks/index.ts:2 对外导出的死 API,`DragState.dropTarget` 恒 null。双份定义正是 B12-3 类型摩擦的温床。

建议:types.ts 单一来源(use-drag-state 改为 re-export),删除 useDragState 中的 dropTarget 字段与两个 setter(或注释说明保留原因)。

回归关联:上轮第⑱批接线后的遗留清理项。

---

### [B12-5] P2 · sortEvents · Array.prototype.toSorted(ES2023)与 tsconfig target ES2015 相悖,旧浏览器运行时崩溃

位置:`packages/ui/src/schedule/utils/sort-events/sort-events.ts:6`

证据:

```ts
return events.toSorted((a, b) => { ... });
```

`toSorted` 需 Chrome 110+/Safari 16.4+/Firefox 115+/Node 20+;tsconfig target ES2015 表明预期支持更旧环境,旧引擎上事件排序直接 `TypeError: events.toSorted is not a function`(整视图崩)。schedule 包内仅此一处使用该 API。

建议:改 `[...events].sort(...)`(不原地排序的语义不变)。

回归关联:无(新发现)。

---

### [B12-6] P2 · toDateString · 返回值格式与 DateStringValue 文档(YYYY-MM-DD)不符,且与同类型兄弟工具不一致

位置:`packages/ui/src/schedule/utils/to-date-string/to-date-string.ts:4-6`;对照 `types.ts:31-32`

证据:

```ts
/** Date value used by all UI components, format: `YYYY-MM-DD` */   // types.ts:31
export function toDateString(date: AnyDateValue): DateStringValue {
  return dayjs(date).format('YYYY-MM-DD 00:00:00');                  // 实际返回 19 字符
}
```

同返回类型下 `getStartOfWeek/getEndOfWeek` 返回 10 字符、`toDateString/getMonthDays/getMonthRange` 返回 19 字符。内部消费方(dayjs 再解析、Map key 同源比较)不受影响,但作为 `utils/index.ts` 对外导出的公共 API,消费方拿它与自己手写的 `DateStringValue('2026-01-15')` 做相等比较/长度切片时会静默不匹配。

建议:统一为 `YYYY-MM-DD`(改内部三处消费方跟随),或在 DateStringValue/函数 JSDoc 明示含时间后缀。

回归关联:无(新发现,API 一致性)。

---

### [B12-7] P2 · useEventResize / useHorizontalEventResize · resize effect 依赖仅 [isResizing],拖拽中改 startTime/endTime/intervalMinutes 使用过期闭包

位置:`packages/ui/src/schedule/hooks/use-event-resize.ts:217-227`;`packages/ui/src/schedule/hooks/use-horizontal-event-resize.ts:233-244`

证据(两 hook 同构):

```ts
document.addEventListener('pointermove', handlePointerMove);   // handlePointerMove 捕获 snapPercent/
...                                                            // percentToDateTime/minHeightPercent
return () => { ... };
}, [isResizing]);                                              // 依赖不含上述回调
```

`snapPercent/percentToDateTime/minHeightPercent` 是依赖 `startTime/endTime/intervalMinutes` 的 useCallback;resize 进行中这些 props 变化(如响应式布局切换 interval、受控 startTime 联动)不会重建监听,pointerup 提交的 newStart/newEnd 按旧网格吸附。`stableOnEventResize` 走 useEffectEvent 无此问题。触发窗口短(拖拽期间)、后果为单次提交值偏差,定 P2。

建议:监听器内经 ref 读取上述回调(或把三个派生值收进 useEffectEvent/ ref),保持依赖仅 [isResizing] 不引起拖拽中重绑。

回归关联:上轮第⑤批 pointercancel 修复不受影响(仍在,见下)。

---

---

[B13a-10] P2 · form/paths · setPath 每次键入对整表值做 klona 深克隆;getSplittedPath 不支持点号转义
位置:packages/ui/src/form/paths/set-path.ts:11;packages/ui/src/form/paths/get-splitted-path.ts:1-7
证据:
```ts
const cloned: any = klona(values);      // 每次	setFieldValue 全量深克隆
...
return path.split('.');                 // 字段名本身含点会被拆段,getPath/setPath 路径错位
```
大表单高频输入时 O(整表值) 克隆是稳定热点;点号无转义语法(`a\.b` 会被拆成 `a\b` 两段)。中间段缺失的容器创建修复在位(L18-20),数字键经 split 天然支持。
建议:克隆可只克隆路径上的祖先链(copy-on-write);点号转义属破坏性 API 变更,建议至少在文档标注限制。
回归关联:无(mantine 同源,属上游既有限制)。

---

[B13a-11] P2 · form/stories · ReorderWithErrors 的 map 返回无 key 的 Fragment;Dirty story 列表用 index 作 key
位置:packages/ui/src/form/stories/Form.usage.story.tsx:253-282;packages/ui/src/form/stories/Form.dirty.story.tsx:30-38
证据:
```tsx
// Form.usage.story.tsx
const fields = form.getValues().sortable.map((element, i) => (
  <>                                   // Fragment 自身无 key,Group 的 key 不参与列表对账
    <Group key={element.key}>
// Form.dirty.story.tsx
{form.values.formArray.map((_item, index) => (
  <Group key={index}>                  // 删除中间项时 index key 与数据错位
```
前者触发 React key 告警;后者删除中间行时行状态随 index 平移(受控输入下表现正确但演示了错误模式,与同目录 Form.lists.story 的 `key={item.key}` 正确用法不一致)。
建议:`<Fragment key={element.key}>`;dirty story 给数组项补 key 字段。
回归关联:无。

---

[B13a-12] P2 · hooks/use-counter · options 参数类型误标为 UseCounterHandlers,TS 下无法合法传入 min/max
位置:packages/hooks/src/use-counter/use-counter.ts:33-34
证据:
```ts
export function useCounter(initialValue = 0, options?: UseCounterHandlers): ... {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options }
```
实现读取的是 `min`/`max`(UseCounterOptions),签名却声明 `UseCounterHandlers`(increment/decrement/set/reset)。TS 调用方传 `{ min: 0, max: 10 }` 直接编译报错,只能 as 断言绕过;`index.ts:16` 导出的正是 `UseCounterOptions`,证明意图类型。
建议:签名改为 `options?: UseCounterOptions`。
回归关联:无。

---

[B13a-13] P2 · hooks/use-mask · tokens 默认值 `{}` 每渲染新身份,击穿 slots memo 导致 input 监听每渲染重挂
位置:packages/hooks/src/use-mask/use-mask.ts:148、151、215-254
证据:
```ts
const { mask, placeholderChar = '_', tokens = {} } = options   // 不传 tokens 时每渲染新 {}
const slots = useMemo(() => parseMask(mask, { ...DEFAULT_TOKENS, ...tokens }), [mask, tokens])
// tokens 引用不稳 → slots 每渲染重算 → updateValue 新身份 → refCallback 新身份 → React 每渲染重挂 ref、重绑 3 个监听
```
L149-151 的注释明确说明 memo 就是为了避免「每渲染卸载重挂 ref、重绑 input 监听」,但默认参数 `{}` 恰好让最常见的"不传 tokens"路径命中这个问题(每次键入 setMaskedValue → 重渲染 → 重挂)。
建议:模块级 `const EMPTY_TOKENS = {}`,默认值取它;或 deps 改用 `tokens` 的序列化键。
回归关联:②批 use-mask 光标/IME 修复未被冲掉(composingRef 与 produced 光标映射均在),此为其外的新问题。

---

[B13a-14] P2 · hooks/use-input-state · getInputOnChange 对 file 输入仍存 fakepath 字符串,与 form 版 ⑮ 修复不一致
位置:packages/hooks/src/use-input-state/use-input-state.ts:12-19
证据:
```ts
if (currentTarget.type === 'checkbox') {
  setValue((currentTarget as HTMLInputElement).checked as unknown as T);
} else {
  setValue((currentTarget as HTMLInputElement).value as unknown as T);   // type=file 时 .value 是 "C:\fakepath\..."
}
```
packages/ui/src/form/get-input-on-change.ts:14-17 已在 ⑮ 批修复为存 `currentTarget.files`(FileList),本 hooks 包的同名工具未同步,file 场景两包行为分叉。
建议:补 `type === 'file'` 分支存 FileList,与 form 版对齐。
回归关联:⑮批修复本身未被冲掉(form 版在位);此条为修复未覆盖到的平行实现。

---

[B13a-15] P2 · hooks/use-hotkeys · 未过滤 IME 合成期的 keydown
位置:packages/hooks/src/use-hotkeys/use-hotkeys.ts:27-40
证据:
```ts
const handleKeydown = useEffectEvent((event: KeyboardEvent) => {
  hotkeys.forEach(([hotkey, handler, options = ...]) => {
    if (getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) &&
        shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)) {
```
无 `event.isComposing / keyCode === 229` 守卫。默认 tagsToIgnore 挡住了 INPUT/TEXTAREA,但 `triggerOnContentEditable` 场景(富文本编辑器快捷键)在输入法合成期间按到的组合键仍会触发 handler。
建议:handleKeydown 顶部加 `if ((event as any).isComposing || event.keyCode === 229) return;`。
回归关联:无(mantine 同源)。

---

[B13a-16] P2 · hooks/use-fetch · url 为函数时返回的 promise 不受 abort 控制
位置:packages/hooks/src/use-fetch/use-fetch.ts:61-63、91-93
证据:
```ts
const request = typeof currentUrl === 'function'
  ? (currentUrl as () => Promise<T>)()                       // 不接 signal
  : fetch(currentUrl, { ...currentOptions, signal: controller.current.signal })
```
函数型 url 的请求无法被 `abort()`/卸载清理中止,resolve 后仍会 setData(组件已卸载或已被新请求取代时写脏数据;竞代也只有 refetch 手动 abort 一层)。
建议:函数型也透传 signal(签名改 `(signal) => Promise<T>`),或文档标注函数型不支持中止。
回归关联:无。

---

[B13a-17] P2 · hooks/use-mutation-observer · useMutationObserverTarget 的 target 为内联函数时每渲染 disconnect/重建 observer
位置:packages/hooks/src/use-mutation-observer/use-mutation-observer.ts:50-69
证据:
```ts
useEffect(() => {
  ...
  const targetElement = typeof target === 'function' ? target() : target;
  ...
}, [target]);      // 内联 () => ref.current → 每渲染重跑
```
callback/options 已按 ⑰ 批走 ref,但 target 函数本身仍以身份进 deps;消费方传内联 getter 时 observer 每渲染重建(ref 变体 useMutationObserver 无此问题)。
建议:target 为函数时同样 ref 化(仅当 target 引用变化才重求值),或文档要求传稳定引用。
回归关联:⑰批修复未被冲掉(callback/options ref 在位);此为同文件残留点。

---

---

[B13a-7] P2 · form/actions · 表单未传 name 时仍向 window 绑定 17 个 `ui-form:undefined:*` 监听
位置:packages/ui/src/form/actions/actions.ts:129-185(结合 111-118)
证据:
```ts
useFormEvent(`ui-form:${name}:set-field-value`, ...)   // name=undefined → 'ui-form:undefined:set-field-value'(真值)
...
const listener = (event: any) => handlerRef.current(event);
if (eventKey) { window.addEventListener(eventKey, listener); ... }   // 真值即绑定
```
`useFormEvent` 只判 eventKey 真值,而模板串拼出的是非空字符串,17 个死监听(事件永不派发)挂在 window 上直到卸载。
建议:`useFormActions` 在 name 为空时直接短路(name && validateFormName 后用同一个布尔守卫包住 17 个 useFormEvent 不可行——hook 不能条件调用;可让 useFormEvent 接收完整前缀仅在 name 存在时生成 key,即 `name ? \`ui-form:${name}:xxx\` : undefined`)。
回归关联:无。

---

[B13a-8] P2 · form/use-form · 同步抛异常的规则使 onSubmit 中 submitting 卡死 true
位置:packages/ui/src/form/validate/validate-values.ts:39-46;packages/ui/src/form/use-form.ts:352-361、400-406
证据:
```ts
// validate-values.ts:同步规则无 try/catch(async 的走 allSettled 有兜底)
if (typeof rule === 'function') {
  const result = rule(value, values, rulePath, signal);   // throw 直接冒泡
// use-form.ts:onSubmit
setSubmitting(true);
pendingSubmitValidationRef.current = true;
const result = validate();        // 同步 throw → 异常逃出事件处理器,setSubmitting(false) 永不执行
```
validate-field-value.ts:59-62 对字段级同步 throw 有 catch,但 validate-values.ts 的规则表路径没有;函数型 validate(use-form.ts:251)同样裸调。
建议:validateRulesRecord 的同步规则调用包 try/catch,`errors[rulePath] = resolveValidationError(err)`;onSubmit 的同步路径再兜一层 finally 复位 submitting。
回归关联:无。

---

[B13a-9] P2 · form/use-form · getInputNode 对含引号的 path 生成非法选择器直接抛错
位置:packages/ui/src/form/use-form.ts:449-450
证据:
```ts
const getInputNode: GetInputNode<Values> = (path) =>
  document.querySelector(`[data-path="${getDataPath(name, path)}"]`);
```
path 形如 `a"b`(字段名含引号)时属性选择器语法非法,querySelector 抛 SyntaxError。
建议:改用 `document.querySelector('[data-path]')` 全量遍历 + `el.dataset.path === getDataPath(name, path)` 比对,或对值做 CSS.escape。
回归关联:无(mantine 同源)。

---

[B13b-2] P2 · SearchFilter · setFieldValue 基于渲染闭包展开 currentValues,同一事件批次内连续更新会丢字段
位置:packages/@xiaoye-react/pro/src/search-filter/SearchFilter.tsx:172-174
证据:
```tsx
const setFieldValue = (name: string, value: any) => {
    setCurrentValues({ ...currentValues, [name]: value })
}
```
`setCurrentValues` 来自 `useUncontrolled`,其 setter 只接受值不接受函数式更新(packages/hooks/src/use-uncontrolled/use-uncontrolled.ts:`handleChange(val: T, ...payload)` 直接 `setUncontrolledValue(val)`)。若自定义 `render` 字段在一个事件里对两个字段各调一次 onChange(如联动控件),第二次调用闭包里的 `currentValues` 仍是旧渲染值,第一个字段的更新被覆盖丢失。
建议:组件内维护 `valuesRef` 镜像最新值,`setFieldValue` 基于 ref 展开;或给 useUncontrolled 增加函数式更新支持。
回归关联:无(新发现)。②批 use-uncontrolled setter 稳定化不覆盖此点。

---

[B13b-3] P2 · Notifications · limit/position 同步 effect 依赖缺 store
位置:packages/@xiaoye-react/notifications/src/Notifications.tsx:181-187
证据:
```tsx
useEffect(() => {
    store?.updateState((current) => ({
      ...current,
      limit: limit || 5,
      defaultPosition: position,
    }));
}, [limit, position]);
```
`store` 在 effect 内使用但不在依赖数组。消费者运行时切换 `store` prop(多实例场景,prop 文档明确支持自定义 store)时,limit/position 不会同步到新 store。另注:静默 `updateState` 后不触发再分配,已显示的旧通知会保留到下一次 show/hide 才收敛(与上游 Mantine 行为一致,不算 bug)。
建议:依赖补 `store`。
回归关联:无(新发现)。

---

[B13b-4] P2 · notifications 包入口 · NotificationPosition 类型未导出
位置:packages/@xiaoye-react/notifications/src/index.ts:7-11
证据:
```ts
export type {
  NotificationData,
  NotificationsState,
  NotificationsStore,
} from './notifications.store';
```
`NotificationPosition` 在 notifications.store.ts:5-11 定义、组件内部大量使用,但入口未导出。消费者给自定义 store / `notifications.show({ position })` 做类型标注时只能走深路径导入。同文件导出的 `NotificationsProps` 里 position 字段引用了该类型,类型层面造成"可见但不可引用"。
建议:index.ts 的 type export 列表补 `NotificationPosition`。
回归关联:无(新发现)。

---

[B13b-5] P2 · Carousel(@xiaoye-react/carousel)· aria-label 全英文,与仓库中文 aria-label 方向不一致
位置:packages/@xiaoye-react/carousel/src/Carousel.tsx:380、417、450;CarouselSlide/CarouselSlide.tsx:39
证据:
```tsx
aria-label={`Go to slide ${index + 1}`}   // Carousel.tsx:380
aria-label="Previous slide"               // Carousel.tsx:417
aria-label="Carousel slide"               // CarouselSlide.tsx:39
```
本库自研/修复过的组件 aria-label 已统一中文(如 DataTable「选择此行」、Pagination「每页条数」、⑮批 Select 清除按钮改中文),carousel 独立包(及 ui 包同名组件)仍是 Mantine 原版英文。屏幕阅读器用户在同库组件间会听到中英混杂。
建议:与 ui 包 Carousel 一并统一为中文(「上一张幻灯片」「跳转到第 N 张」等),两处同步改避免再次分叉。
回归关联:无(新发现;属仓库全局混用状态的局部体现,ui 包 Carousel 同病,本批次文件清单内只覆盖独立包)。

---

[B13b-6] P2 · demo · CodeDemo.module.css 整文件死代码
位置:packages/@xiaoye-react/demo/src/CodeDemo/CodeDemo.module.css:1-31
证据:`CodeDemo.tsx` 全文不 import 任何 CSS module;批量扫描确认 `CodeDemo.module.css` 是 demo/src 下唯一无 tsx/ts 引用的 module.css(脚本核过:`grep -rq` 全 src 无引用)。`.toggleBar`/`.toggleButton` 两个类悬空。
建议:删除该文件;若 toggleBar 是未完成功能则补接线。
回归关联:无(新发现)。

---

[B13b-7] P2 · demo · package.json exports 声明的 ./styles.css、./styles.layer.css 文件不存在
位置:packages/@xiaoye-react/demo/package.json:23-26(不在批次文件清单内,随「demo 导出完整性」核查发现)
证据:
```json
"exports": {
    ".": { "types": "./src/index.ts", "import": "./src/index.ts", "require": "./src/index.ts" },
    "./styles.css": "./styles.css",
    "./styles.layer.css": "./styles.layer.css"
}
```
`ls packages/@xiaoye-react/demo/` 下无 styles.css / styles.layer.css,package 也没有生成它们的 scripts 字段。当前仓库无人 import 这两个子路径(全仓 grep 无命中),属潜伏问题:任何按导出映射引用 `@xiaoye-react/demo/styles.css` 的消费者(上游 @mantinex/demo 的标准用法)会直接解析失败。
建议:补构建脚本生成聚合 CSS,或删除这两条 exports 映射。
回归关联:无(新发现)。

---

### [B14-1] P2 · Tree(TreeNode/FlatTreeNode) · 键盘方向键硬编码不随 dir 翻转,而 CSS 已用逻辑属性,RTL 下视觉与键盘语义相反

位置:packages/ui/src/components/Tree/TreeNode.tsx:132-151;packages/ui/src/components/Tree/FlatTreeNode.tsx:61、81;packages/ui/src/components/Tree/Tree.module.css:35、105、134

证据(TreeNode.tsx):
```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.code === 'ArrowRight') {   // L132:恒为「展开/进入」
        ...
        controller.expand(node.value)
    }
    if (event.nativeEvent.code === 'ArrowLeft') {    // L143:恒为「收起/返回」
```
Tree.module.css 的缩进与连线已全部使用逻辑属性(`padding-inline-start`、`border-inline-start`),`dir="rtl"` 时缩进/连线翻到右侧、子树视觉方向反转;但 ArrowRight 仍展开、ArrowLeft 仍收起,与 WAI-ARIA APG tree 模式「RTL 下左右箭头互换」的要求相反,视觉与键盘语义割裂。同文件未引入 useDirection(库内 Popover/Tooltip/Splitter/ViewSelect 等已接)。建议:两处 keydown 读 useDirection,rtl 时交换分支。

---

### [B14-10] P2 · docs components/ · 12 个死 demo 文件导入不存在的具名导出(d05846a0「缺失导出」同类,当前未被任何 md 引用)

位置:apps/docs/components/{button/demo/dataAttributes.tsx、button/demo/variantColorsResolver.tsx、checkbox/demo/cursorType.tsx、checkbox/demo/rowSelection.tsx、color-input/demo/swatchesConfigurator.tsx、focus-trap/demo/initialFocusTrap.tsx、loader/demo/customLoader.tsx、package/demo/basic.tsx、pills-input/demo/searchableMultiselect.tsx、scroller/demo/scroller.tsx、tabs/demo/tabs.tsx、transition/demo/transitions.tsx}

证据(tsc 实测,示例):
```
components/button/demo/dataAttributes.tsx(1,10): error TS2305:
  Module '"../../../demos/core/Button"' has no exported member 'dataAttributes'.
components/package/demo/basic.tsx(2,10): error TS2305:
  Module '"@xiaoye-react/ui"' has no exported member 'Package'.
```
已逐个核验:12 个文件均未被同目录 index.zh-CN.md 的 `<code src>` 引用(不进 dumi 路由,无运行时崩溃),属迁移遗留死文件;但其中 `Package` 这类从 @xiaoye-react/ui 导入不存在组件的写法一旦被复制/启用即渲染期崩溃(openCreate 同类),且持续污染 docs 包 tsc。建议删除或修复导入。同类低危:demos/core/Checkbox/Checkbox.demo.icon.tsx:3(`CheckboxIconComponent`)、demos/core/NumberInput/NumberInput.demo.handlers.tsx:2(`NumberInputHandlers`)引用的类型名在 @xiaoye-react/ui 无此导出(实际为 `CheckboxIconProps` 等)——仅类型位置使用,esbuild 剥离后运行时安全,但文档示例代码教用户导入不存在的符号,建议一并改名。

---

### [B14-11] P2 · TimePicker · `CloseButtonProps` 从 Drawer 模块顶层导入,实际是 Drawer 命名空间成员(B11-1 同病不同灶,ui 包 tsc 红的又一独立根因)

位置:packages/ui/src/dates/components/TimePicker/TimePicker.tsx:3;packages/ui/src/components/Drawer/Drawer.tsx:266

证据:
```ts
// TimePicker.tsx:3
import { CloseButtonProps } from '../../../components/Drawer/Drawer';
// Drawer.tsx:266(命名空间成员,非顶层导出)
export namespace Drawer { export type CloseButtonProps = DrawerCloseButtonProps }
```
tsc 实测(apps/docs 视角,paths 直指源码):`error TS2305: Module '"../../../components/Drawer/Drawer"' has no exported member 'CloseButtonProps'`。该绑定仅在类型位置使用(L136 `clearButtonProps?: CloseButtonProps & ...`),esbuild 构建不受影响,但与 B11-1 的 Factory 断链同属「ui 包 tsc 整体红」的独立病灶,且 B11-1 的 18+29 处清单未包含此处(B11-1 修复方案 (a) 改回归出处处不会覆盖它)。建议改为 `import type { DrawerCloseButtonProps } from '.../DrawerCloseButton'` 或 `Drawer.CloseButtonProps`。

### 扫描过但确认安全的样本

- apps/docs tsc 的 1499 行输出中,除上述缺失导出外,其余为 `*.module.css` 声明缺失(TS2307,约千余行,dumi 构建期自处理)与 props 类型宽松(TS2322/2353,如 NativeSelect placeholder、NavLink href 等经 `{...others}` 透传运行时可用的项)——按「不逐行审 demo」约定不展开、不立项。
- nas-console 无源码可审:目录仅含 dist(构建产物)与 node_modules。
- `components/*/index.zh-CN.md` 引用的全部 demo 文件存在;demos barrel 的具名导出消费(UIDemo 包装)与 d05846a0 修复模式一致。

---

---

### [B14-2] P2 · Carousel(ui 包副本) · embla 未传 direction、方向键不接 useDirection;@xiaoye-react/carousel 同名实现已接,两副本行为分叉

位置:packages/ui/src/components/Carousel/Carousel.tsx:169-179(缺 direction 选项)、:239-245(ArrowLeft/Right);对照 packages/@xiaoye-react/carousel/src/Carousel.tsx:225-230

证据(ui 副本,经 components/index.ts:18 `export * from './Carousel'` 从 @xiaoye-react/ui 导出,是文档站实际使用的副本):
```ts
const [emblaRef, embla] = useEmblaCarousel({
    axis: orientation === 'horizontal' ? 'x' : 'y',
    startIndex: initialSlide,
    ...                               // 无 direction 选项
})
```
```tsx
if (event.key === (isHorizontal ? 'ArrowRight' : 'ArrowDown')) { ... handleNext() }
if (event.key === (isHorizontal ? 'ArrowLeft' : 'ArrowUp')) { ... handlePrevious() }
```
@xiaoye-react/carousel 副本已 `const { dir } = useDirection()` 并传 `direction: orientation === 'horizontal' ? dir : undefined`(Carousel.tsx:225-230)。ui 副本 RTL 下轮播滚动方向/拖拽与 next/prev 语义不翻转。建议:对齐 @xiaoye 副本(embla options 增 direction + 方向键按 dir 交换),或合并两副本消除分叉。

---

### [B14-3] P2 · Menu/Menubar · 子菜单打开键与横向导航键硬编码,RTL 不翻转(与 Popover 定位自动翻转相互矛盾)

位置:packages/ui/src/components/Menu/MenuSubTarget.tsx:77;packages/ui/src/components/Menubar/MenubarTarget/MenubarTarget.tsx:135-136;packages/ui/src/components/Menubar/MenubarDropdown/MenubarDropdown.tsx:53

证据(MenuSubTarget.tsx:75-77):
```tsx
// ARIA 菜单:ArrowRight/Enter/Space 打开子菜单并把焦点移入第一项
if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
```
证据(MenubarTarget.tsx:135-136):
```tsx
const forwardKey = 'ArrowRight'
const backKey = 'ArrowLeft'
```
MenuSub 的子菜单经 Popover 渲染,而 Popover 内部用 `getFloatingPosition(dir, position)`(Popover.tsx:240-242)会随 dir 把子菜单翻到左侧弹出——RTL 下出现「子菜单向左弹、ArrowRight 打开」的键位与视觉相反;Menubar 横向 roving 同理不互换。建议:三处读 useDirection,rtl 时交换键位。

---

### [B14-4] P2 · List · 嵌套缩进、原生 marker 与图标间距全物理属性,无 RTL 分支

位置:packages/ui/src/components/List/List.module.css:9-21、41

证据:
```css
&:where([data-with-padding]) { padding-left: var(--list-fz); }
&:where([data-native-markers]) .item { display: list-item; margin-left: var(--list-fz); }
...
.itemIcon { ... margin-right: var(--ui-spacing-xs); ... }
```
列表是典型 start/end 方向语义组件(marker/图标在起始侧);文件内无任何 `[dir='rtl']` 分支(对照 Input.module.css:157、UnstyledButton.module.css:14 均有)。`dir="rtl"` 时缩进/marker 间距仍在左侧、图标仍贴右。建议:改 `padding-inline-start`/`margin-inline-start`/`margin-inline-end`。

---

### [B14-5] P2 · DataTable/Table/Descriptions/Stepper/Checkbox/Radio · 表格与文本 text-align:left、分隔边框、required 星号边距等物理属性补漏(无 RTL 适配)

位置:packages/ui/src/components/DataTable/DataTable.module.css:23、30、221-226、250;packages/ui/src/components/Table/Table.module.css:27-37、53;packages/ui/src/components/Descriptions/Descriptions.module.css:27、34;packages/ui/src/components/Stepper/Stepper.module.css:30、71;packages/ui/src/components/Checkbox/Checkbox.module.css:110;packages/ui/src/components/Radio/Radio.module.css:101

证据(DataTable.module.css):
```css
.th { ... text-align: left; ... }        /* L23;L30 .td 同 */
.th[data-sticky] { border-right: 1px solid ...; border-left: 1px solid ...; }  /* L221-226 */
```
证据(Checkbox.module.css:110 / Radio.module.css:101):
```css
.required { margin-left: calc(var(--ui-spacing-xs) / 2); ... }
```
RTL 下:表格/描述/步骤标签强制左对齐(应为 `text-align: start`),Table/DataTable 垂直分隔线物理左/右不翻转,required 星号恒贴 label 左侧(应 `margin-inline-start`)。与 B08-23(TOC/Typography 物理属性)同类,均为各组件批次漏掉的 RTL 轴;建议统一改逻辑属性。注:DataTable.module.css 曾列入 B06「已审无问题」清单,系 B06 未覆盖 RTL 轴,本条为专项补漏。

### 扫描过但确认安全的样本

- **已接 useDirection(12 文件核过)**:Popover、Tooltip、HoverCard、ScrollArea(Visible/X)、SplitterResizer、@xiaoye-react/carousel、MobileMonthView、HeaderControl、ViewSelect、DirectionProvider 本体。
- **CSS 含 `[dir='rtl']` 分支(核过生效)**:Input.module.css:157-162、UnstyledButton.module.css:14-16、MiniCalendar.module.css:91-99、global.css:84、SearchControl.module.css:19、DemoArea.module.css:40。
- **物理属性属 API 设计(位置 prop 本身即物理命名),不立项**:Affix(position top-left…)、Indicator position(B06-11 已按 start/end 立项的是语义命名部分)、Timeline data-align='left'/'right'、EmptyState data-align、Notifications position(top-left…)、Input leftSection/rightSection、Drawer/Modal position。
- **刻意固定方向**:TimePicker 字段 dir="ltr"、CodeHighlight/CodeHighlightTabs dir="ltr"(代码区)。
- **schedule 系**:整体未声明 RTL 支持,WeekView/DayView 时间槽 `text-align: right` 等物理属性与资源网格方向键问题已由 B12-T1 统一「待裁决」,本批不另立;B09 已核 dates 19 个 CSS 无 RTL 问题。
- **低危不登记**:Combobox use-pills-reorder / MultiSelect 的 Alt+左右键胶囊重排未接 dir(RTL 下重排方向与视觉相反,使用面窄,记录备查)。
- FloatingIndicator/Tooltip 的 `left: 0` 为 transform 定位基座(floating-ui 侧已按 dir 换算);AngleSlider 为表盘控件无行文方向语义。

---

---

### [B14-6] P2 · Chip · 默认背景变量 `--ui-color-default-bg` 全库未定义,未选中态(filled 默认 variant)背景恒透明

位置:packages/ui/src/components/Chip/Chip.module.css:20

证据:
```css
.root {
    ...
    border: 1px solid transparent;
    background-color: var(--ui-color-default-bg);   /* L20:无 fallback */
```
全仓库(packages/ + apps/)无任何 `--ui-color-default-bg:` 定义:global.css 只定义 `--ui-color-default`(global.css:345/377,值 white/dark-6),resolver 与 get-css-color-variables 亦无该键。未定义 var 无 fallback → 该声明 invalid at computed-value time → `background-color` 回落 initial(transparent)。结果:默认 variant 的未选中 Chip 在明暗两套主题下都没有背景(仅剩文字),与变量命名意图(默认底色,参照 `--ui-color-default` = white/dark-6)不符。建议:改为 `var(--ui-color-default)` 或补齐变量定义。

---

### [B14-7] P2 · Tabs · `--ui-primary-color-outline` 未定义(--ui-primary-color-* 家族无 outline 成员),--tabs-bd 链式失效、分隔边框色回落 currentColor

位置:packages/ui/src/components/Tabs/Tabs.module.css:4-5、115、126

证据:
```css
.root {
    ...
    --tabs-bd: 1px solid var(--ui-primary-color-outline);   /* L5 */
```
```css
border-color: var(--tabs-bd);        /* L115 */
border-bottom-color: var(--tabs-bd); /* L126 */
```
`--ui-primary-color-*` 命名空间在 resolver(default-css-variables-resolver.ts:42-46、50、69、97:filled/filled-hover/light/light-hover/light-color/contrast/0-9)与 global.css(116-130)中均无 `outline` 成员;outline 变体只存在于 `--ui-color-{name}-outline` 命名空间(get-css-color-variables.ts:35、68)。全库无 `--ui-primary-color-outline:` 定义 → `--tabs-bd` 为 guaranteed-invalid → L115/126 的边框色声明失效,分隔边框渲染为 currentColor(文字色)而非主题 outline 色。建议:改 `var(--ui-color-primary-outline)` 或在 resolver 补 `--ui-primary-color-outline`。注:L115/126 的物理方向问题已由 B06-12 登记,本条为不同根因(变量未定义)。

---

### [B14-8] P2 · DataTable/Transfer/Cascader/Upload · `--ui-default-radius` 拼写错误(应为 `--ui-radius-default`),自定义 defaultRadius 主题对这 6 处静默失效

位置:packages/ui/src/components/DataTable/DataTable.module.css:124、163;packages/ui/src/components/Transfer/Transfer.module.css:17;packages/ui/src/components/Cascader/Cascader.module.css:26、90;packages/ui/src/components/Dropzone/Upload/Upload.module.css:16

证据(DataTable.module.css:124,其余 5 处同型):
```css
border-radius: var(--ui-default-radius, calc(0.25rem * var(--ui-scale)));
```
规范名是 `--ui-radius-default`(default-css-variables-resolver.ts:39 `'--ui-radius-default': defaultRadius`;global.css:115;global.css:649/665 的 popover/hovercard 均用对名)。`--ui-default-radius` 全库无定义,因此这 6 处永远走 fallback `calc(0.25rem * scale)`:默认主题下数值巧合等于默认半径(0.25rem)看不出问题,但消费方自定义 `theme.defaultRadius`(如 'lg')时这 6 处不跟随,圆角不一致。建议:统一改 `var(--ui-radius-default)`。

### 扫描过但确认安全的样本

- **暗色选择器方向**:全部 45 个含 `[data-ui-color-scheme='dark']` 块的文件逐块目检(Accordion/ActionIcon/AngleSlider/Card/Carousel×2/CheckboxCard/CheckboxIndicator/CodeHighlight/ColorPicker/ColorSwatch/Dropzone/Input/Menu/Menubar/Paper/Pill/SemiCircleProgress/Spotlight/Tree/Typography + header 5 文件 + demo 2 文件 + dates 9 文件 + schedule 9 文件):dark 块均取 `--ui-color-dark-N` 暗值、light 块取 gray/white 亮值,无一写反(CloseButton 自匹配为 B08-1 已知)。
- **模板键定义核对有效**:`--ui-color-primary-light-hover`/`-light-color`(Combobox.module.css:28-29 引用)由 get-css-color-variables.ts:33-34/66-67 的计算键产出(name='primary'),运行时有值;`--ui-color-disabled-border`(CheckboxIndicator.module.css:58)resolver:65/84 有值,仅 global.css 回退缺失 = B01-5 已登记类;`--ui-heading-text-wrap`(Typography.module.css:12)resolver:38 有定义且有 fallback。
- **硬编码色核过无暗色问题**:Skeleton shimmer 白色渐变(基色 `--ui-color-default-border` 随主题)、Progress 条纹白 25%(叠在 primary 色条上)、Button/ActionIcon 载入光晕(ActionIcon 已有明暗分叉;Button 白 15% 叠彩色按钮两态通用)、Overlay 黑 60% 遮罩、ColorSwatch/ColorPicker 描边阴影——均为两主题通用效果。
- Blockquote 的 `rgba(0,0,0,0.03)` 仅为水合前 CSS 回退,varsResolver 恒输出 `--bq-bg`(Blockquote.tsx:60-72,color 缺省回落 primaryColor),归入 B01-5 回退类,不另立。
- 组件域变量(577 个引用)中无 CSS/TS 字面定义的存活项,经抽样归因均为 varsResolver 运行时经模板键产出(与 B05-1 已核对的 Pagination 模式同源),未再发现新的「resolver 与 CSS 名字对不上」实例。

---

---

### [B14-9] P2 · docs demos · a6d8f6f9 图片自托管迁移漏网:5 个 demo 共 32 处外链图片仍在(unsplash/icons8)

位置:apps/docs/demos/carousel/Carousel.demo.cards.tsx:44-74、133-163(12 处 images.unsplash.com);apps/docs/demos/core/Card/Card.demo.link.tsx:18、47(2 处 unsplash);apps/docs/demos/spotlight/Spotlight.demo.customAction.tsx:15-34、87-106(8 处 img.icons8.com);apps/docs/demos/core/Accordion/Accordion.demo.label.tsx(6 处 icons8);apps/docs/demos/hooks/use-favicon/use-favicon.demo.usage.tsx(4 处外链)

证据(Carousel.demo.cards.tsx:44):
```ts
'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&...',
```
a6d8f6f9 的立项理由是「外链图 404/ORB 拦截 + raw.githubusercontent 国内网络不稳」,迁移了 57 处引用但漏掉以上文件;同类症状(国内网络下 demo 图片空白/布局塌陷)仍会复现。use-favicon 若属刻意演示外链 favicon 可保留并在文档标注,其余建议按同一方案自托管到 public/demo。

---

