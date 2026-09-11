---
category: Components
title: Overview
subtitle: 组件总览
description: react-ui 组件库总览，140+ 组件，覆盖表单、数据展示、反馈、导航等场景。
showImport: false
group:
  title: 开始
  order: 0
---

## 介绍 {#introduction}

react-ui 是一套基于 React 的现代化组件库，采用 Mantine 风格的 API 设计，
内置 140+ 组件，全面覆盖表单、数据展示、反馈、导航、布局等场景。
所有组件均使用 TypeScript 编写，支持完整的类型推导与主题定制。

## 安装 {#install}

<InstallScript packages="@xiaoye-react/ui"></InstallScript>

## 使用 {#usage}

所有组件均从 `@xiaoye-react/ui` 命名空间导入，必须包裹在 `UIProvider` 内使用：

```tsx
import { UIProvider, Button } from '@xiaoye-react/ui';

function App() {
  return (
    <UIProvider>
      <Button variant="filled">Hello react-ui</Button>
    </UIProvider>
  );
}
```

## 组件分类 {#categories}

以下分类与侧边栏导航一致，共 140+ 组件。

### 通用 {#general}

最基础的文本与按钮元素。

- [Button 按钮](/components/button) — 触发即时操作，支持 7 种 variant 与渐变
- [Text 文本](/components/text) — 通用文本组件
- [Title 标题](/components/title) — 标题层级 h1-h6
- [Typography 排版](/components/typography) — 排版容器
- [Blockquote 引用](/components/blockquote) — 引用块
- [Code 代码](/components/code) — 行内代码块
- [Kbd 键盘按键](/components/kbd) — 展示键盘快捷键
- [Mark 标记](/components/mark) — 文本高亮

### 布局 {#layout}

用于组织页面结构与间距。

- [Container 容器](/components/container) — 居中并限制最大宽度的容器
- [Grid 栅格](/components/grid) — 24 栅格布局系统
- [Flex 弹性布局](/components/flex) — 简化的 flexbox 包装器
- [Stack 堆叠](/components/stack) — 垂直/水平堆叠子元素
- [Group 分组](/components/group) — 横向排列子元素并自动处理间距
- [SimpleGrid 简易栅格](/components/simple-grid) — 按尺寸自动响应的栅格
- [AppShell 应用外壳](/components/app-shell) — 应用整体布局骨架
- [Paper 纸张](/components/paper) — 带阴影/边框的内容容器
- [Center 居中](/components/center) — 内容居中容器
- [Box 盒模型](/components/box) — 基础样式容器
- [AspectRatio 宽高比](/components/aspect-ratio) — 固定宽高比的容器
- [Divider 分割线](/components/divider) — 水平/垂直分割线，支持文字标签
- [Space 间距](/components/space) — 垂直/水平占位间距
- [ScrollArea 滚动区域](/components/scroll-area) — 自定义滚动条
- [Splitter 分割面板](/components/splitter) — 可拖拽分割的面板布局

### 导航 {#navigation}

页面与内容导航。

- [Menu 菜单](/components/menu) — 下拉/上下文菜单
- [Tabs 标签页](/components/tabs) — 选项卡切换
- [Pagination 分页](/components/pagination) — 分页控件
- [Breadcrumbs 面包屑](/components/breadcrumbs) — 路径导航
- [Anchor 锚点](/components/anchor) — 内容锚点导航
- [NavLink 导航链接](/components/nav-link) — 带激活态的链接
- [Menubar 菜单栏](/components/menubar) — 横向菜单栏
- [Stepper 步骤条](/components/stepper) — 步骤指示器
- [Tree 树形控件](/components/tree) — 树形数据展示与选择
- [TableOfContents 目录](/components/table-of-contents) — 文档目录
- [Affix 固钉](/components/affix) — 固定在视口的元素
- [Burger 汉堡按钮](/components/burger) — 移动端菜单切换按钮

### 数据录入 {#data-input}

完整的表单输入控件，配合 [Form 模块](/docs/form/package) 可构建复杂表单。

- [Input 输入框](/components/input) — 文本输入基础组件
- [TextInput 文本输入](/components/text-input) — 带 label 的输入框
- [NumberInput 数字输入](/components/number-input) — 支持步进与格式化
- [PasswordInput 密码输入](/components/password-input) — 含显隐切换
- [Textarea 多行文本](/components/textarea) — 多行文本输入
- [Checkbox 复选框](/components/checkbox) — 复选框与复选框组
- [Radio 单选框](/components/radio) — 单选框与单选组
- [Switch 开关](/components/switch) — 切换开关
- [Select 选择器](/components/select) — 下拉选择
- [Combobox 组合框](/components/combobox) — 可搜索/可创建的下拉
- [MultiSelect 多选](/components/multi-select) — 多项下拉选择
- [Autocomplete 自动完成](/components/autocomplete) — 带自动补全的输入
- [Slider 滑块](/components/slider) — 数值滑块
- [RangeSlider 范围滑块](/components/range-slider) — 双滑块范围选择
- [Rating 评分](/components/rating) — 星级评分
- [PinInput 验证码输入](/components/pin-input) — 分格验证码输入
- [TagsInput 标签输入](/components/tags-input) — 动态标签输入
- [ColorInput 颜色输入](/components/color-input) — 颜色选择输入框
- [ColorPicker 颜色选择器](/components/color-picker) — 完整颜色选择面板
- [ColorSwatch 色板](/components/color-swatch) — 颜色色块展示
- [Cascader 级联选择](/components/cascader) — 多级联动选项选择，支持懒加载与搜索
- [Transfer 穿梭框](/components/transfer) — 两组数据之间双向选择，支持搜索与全选
- [FileInput 文件输入](/components/file-input) — 文件选择输入
- [JsonInput JSON 输入](/components/json-input) — JSON 格式文本输入
- [MaskInput 掩码输入](/components/mask-input) — 带格式掩码的输入
- [NativeSelect 原生选择器](/components/native-select) — 原生 select 封装
- [PillsInput 胶囊输入](/components/pills-input) — 胶囊样式输入
- [SegmentedControl 分段控制](/components/segmented-control) — 分段选择器
- [Chip 芯片](/components/chip) — 可选中的标签
- [AlphaSlider 透明度滑块](/components/alpha-slider) — 透明度选择
- [AngleSlider 角度滑块](/components/angle-slider) — 角度选择
- [HueSlider 色相滑块](/components/hue-slider) — 色相选择

### 数据展示 {#data-display}

展示各类数据与信息。

- [Table 表格](/components/table) — 展示型表格，支持自定义行列结构
- [DataTable 数据表格](/components/data-table) — 面向管理端的数据表格，支持排序/行选择/分页/虚拟滚动/列设置
- [Descriptions 描述列表](/components/descriptions) — 成组展示只读详情字段，支持多列布局与跨列
- [List 列表](/components/list) — 有序/无序列表
- [Card 卡片](/components/card) — 通用内容卡片
- [Avatar 头像](/components/avatar) — 用户头像与头像组
- [Badge 徽标](/components/badge) — 数字/状态徽标
- [Image 图片](/components/image) — 带占位与 fallback 的图片
- [Timeline 时间轴](/components/timeline) — 时间线展示
- [TreeSelect 树选择](/components/tree-select) — 树形选择器
- [Indicator 指示器](/components/indicator) — 角标指示器
- [Carousel 轮播](/components/carousel) — 轮播组件
- [DataList 数据列表](/components/data-list) — dl/dt/dd 语义的数据列表
- [BackgroundImage 背景图片](/components/background-image) — 背景图片容器
- [Marquee 跑马灯](/components/marquee) — 滚动文字
- [NumberFormatter 数字格式化](/components/number-formatter) — 数字格式化展示
- [OverflowList 溢出列表](/components/overflow-list) — 溢出项自动折叠
- [Pill 胶囊](/components/pill) — 胶囊样式标签
- [RollingNumber 滚动数字](/components/rolling-number) — 数字滚动动画

### 反馈 {#feedback}

操作反馈与状态提示。

- [Alert 警告提示](/components/alert) — 静态警告/通知
- [Modal 对话框](/components/modal) — 模态对话框
- [Drawer 抽屉](/components/drawer) — 侧边抽屉
- [Dialog 对话框](/components/dialog) — 不可点击遮罩的对话框
- [Notification 通知提醒](/components/notification) — 全局通知提醒
- [Notifications 通知中心](/components/notifications) — 通知系统
- [Loader 加载器](/components/loader) — 加载动画
- [LoadingOverlay 加载遮罩](/components/loading-overlay) — 内容区加载遮罩
- [Progress 进度条](/components/progress) — 线性进度条
- [RingProgress 环形进度](/components/ring-progress) — 环形进度条
- [SemiCircleProgress 半圆进度](/components/semi-circle-progress) — 半圆进度条
- [Skeleton 骨架屏](/components/skeleton) — 内容占位骨架
- [EmptyState 空状态](/components/empty-state) — 空状态展示
- [Collapse 折叠面板](/components/collapse) — 内容折叠/展开
- [Accordion 手风琴](/components/accordion) — 手风琴折叠
- [Spoiler 展开折叠](/components/spoiler) — 隐藏/显示内容
- [Tooltip 文字提示](/components/tooltip) — 鼠标悬浮提示
- [Popover 气泡卡片](/components/popover) — 内容更丰富的悬浮卡片
- [HoverCard 悬浮卡片](/components/hover-card) — 类社交卡片式悬浮
- [ModalBase 模态框基础](/components/modal-base) — 自定义模态框基础组件

### 工具 {#utils}

实用工具组件。

- [Portal 传送门](/components/portal) — 将子节点渲染到 DOM 树的其他位置
- [VisuallyHidden 视觉隐藏](/components/visually-hidden) — 视觉隐藏但屏幕阅读器可读

### 其他 {#others}

辅助与特殊用途组件。

- [ActionIcon 动作图标](/components/action-icon) — 仅包含图标的方形按钮
- [CloseButton 关闭按钮](/components/close-button) — 关闭/取消操作的图标按钮
- [CopyButton 复制按钮](/components/copy-button) — 复制到剪贴板的按钮
- [UnstyledButton 无样式按钮](/components/unstyled-button) — 移除所有默认样式的按钮
- [ThemeIcon 主题图标](/components/theme-icon) — 自带主题色背景的图标容器
- [Highlight 高亮](/components/highlight) — 关键字高亮
- [Overlay 遮罩层](/components/overlay) — 通用遮罩层
- [FocusTrap 焦点陷阱](/components/focus-trap) — 锁定焦点在指定区域
- [MediaQuery 媒体查询](/components/media-query) — 基于断点的条件渲染
- [Transition 过渡](/components/transition) — 进入/离开动画
- [Fieldset 字段集](/components/fieldset) — 表单字段分组
- [FileButton 文件按钮](/components/file-button) — 文件选择按钮
- [FloatingIndicator 浮动指示器](/components/floating-indicator) — 浮动指示器
- [FloatingWindow 浮动窗口](/components/floating-window) — 可拖拽浮动窗口
- [Package 包裹容器](/components/package) — 通用包裹容器
- [Scroller 滚动器](/components/scroller) — 滚动控制
- [TypographyStylesProvider 排版样式提供者](/components/typography-styles-provider) — 排版样式上下文

## 主题与样式 {#theming}

react-ui 提供完整的主题系统能力，详见：

- [主题对象](/docs/theming/theme-object) — 自定义颜色、字体、半径等
- [UIProvider](/docs/theming/ui-provider) — 全局 Provider 配置
- [Styles API](/docs/styles/styles-api) — 通过 classNames/style 修改内部样式
- [CSS 变量](/docs/styles/css-variables) — 通过 CSS 变量定制样式
- [色彩系统](/docs/theming/colors) — 颜色与自动对比度

## 下一步 {#next-steps}

- [快速开始](/docs/react/getting-started) — 在项目中集成 react-ui
- [Hooks 工具集](/docs/hooks/package) — 83+ 实用 Hooks
- [Form 表单模块](/docs/form/package) — 复杂表单解决方案
- [Dates 日期](/docs/dates/getting-started) — 日期时间组件
- [Schedule 日程](/docs/schedule/getting-started) — 日程视图组件
