---
category: X
title: Extensions
subtitle: 扩展
description: react-ui Extensions 文档。
---


## 官方扩展

官方扩展由 ReactUI 维护者构建。这些扩展的包名具有 `@react-ui/` 作用域，
例如 `@react-ui/dates` 或 `@react-ui/charts`。

官方扩展列表：

- [@react-ui/dates](/docs/dates/getting-started) – 日期和时间选择器、日历以及其他日期相关组件
- [@react-ui/charts](/docs/charts/getting-started) – 基于 recharts 的图表和数据可视化组件
- [@react-ui/notifications](/docs/x/notifications) – 通知系统
- [@react-ui/code-highlight](/docs/x/code-highlight) – ReactUI 网站上使用的代码高亮组件
- [@react-ui/spotlight](/docs/x/spotlight) – 控制中心（`Ctrl + K` 搜索栏），可用于搜索
- [@react-ui/carousel](/docs/x/carousel) – 基于 embla-carousel 的轮播组件
- [@react-ui/dropzone](/docs/x/dropzone) – 基于 react-dropzone 的拖拽文件上传组件
- [@react-ui/modals](/docs/x/modals) – 弹窗管理器
- [@react-ui/tiptap](/docs/x/tiptap) – 基于 tiptap 的富文本编辑器
- [@react-ui/nprogress](/docs/x/nprogress) – 导航进度组件

## 社区扩展

社区扩展由社区成员构建和维护。它们独立于核心 ReactUI 包和扩展进行更新。

社区扩展列表：

- [BlockNote](https://www.blocknotejs.org/) – 块级富文本编辑器
- [ContextMenu](https://icflorescu.github.io/ui-contextmenu/) – 右键菜单组件
- [DataTable](https://icflorescu.github.io/ui-datatable/) – 无依赖的数据表格组件
- [UIReactTable](https://v2.ui-react-table.com/) – 基于 TanStack table 的数据表格组件
- [Audio](https://gfazioli.github.io/ui-audio/) – 音频播放器，支持波形可视化和实时频谱分析，基于 Web Audio API
- [BorderAnimate](https://gfazioli.github.io/ui-border-animate/) – 边框动画样式（光束、发光等）
- [Book](https://gfazioli.github.io/ui-book/) – 逼真的 iBooks 风格书籍，支持可拖拽翻页——可从边缘任意位置抓取翻页，支持平面 DOM 折叠或真实 3D WebGL 卷曲效果
- [Clock](https://gfazioli.github.io/ui-clock/) – 模拟时钟组件
- [Compare](https://gfazioli.github.io/ui-compare/) – 图片对比滑块组件
- [DepthSelect](https://gfazioli.github.io/ui-depth-select/) – 受 macOS Time Machine 启发的 3D 堆叠选择组件
- [Flip](https://gfazioli.github.io/ui-flip/) – 翻转动画组件
- [JsonTree](https://gfazioli.github.io/ui-json-tree/) – 支持语法高亮的交互式 JSON 树查看器
- [Led](https://gfazioli.github.io/ui-led/) – 用于状态反馈的 LED 指示器组件
- [LensSelect](https://gfazioli.github.io/ui-lens-select/) – 鱼眼/放大镜选择组件，支持计数模式和 macOS Dock 效果
- [ListViewTable](https://gfazioli.github.io/ui-list-view-table/) – Finder 风格的列表视图表格，支持列拖拽和重设大小
- [Marquee](https://gfazioli.github.io/ui-marquee/) – 跑马灯组件
- [Mask](https://gfazioli.github.io/ui-mask/) – 光标跟随的聚光灯遮罩组件
- [Onboarding](https://gfazioli.github.io/ui-onboarding-tour/) – 引导/教程组件
- [Parallax](https://gfazioli.github.io/ui-parallax/) – 视差组件
- [Picker](https://gfazioli.github.io/ui-picker/) – 用于颜色、日期、表情等的动画选择器
- [QrCode](https://gfazioli.github.io/ui-qr-code/) – 可自定义的二维码组件
- [Reflection](https://gfazioli.github.io/ui-reflection/) – 反射效果组件
- [RingsProgress](https://gfazioli.github.io/ui-rings-progress/) – 环形进度指示器组件
- [Scene](https://gfazioli.github.io/ui-scene/) – 装饰性背景组件，支持渐变、圆点、发光和噪点
- [SelectStepper](https://gfazioli.github.io/ui-select-stepper/) – 选项循环步进器组件
- [Spinner](https://gfazioli.github.io/ui-spinner/) – 基于 SVG 的加载动画组件，支持多种动画变体
- [SplitPane](https://gfazioli.github.io/ui-split-pane/) – 可调整大小的分割面板组件
- [TextAnimate](https://gfazioli.github.io/ui-text-animate/) – 文本动画组件
- [Video](https://gfazioli.github.io/ui-video/) – 原生 ReactUI 视频播放器，支持复合 API、headless useVideo hook、画中画、实时时间线拖动以及用于 hero 区域的 asBackground 模式
- [Window](https://gfazioli.github.io/ui-window/) – 支持拖拽和调整大小的窗口组件
- [ReactUI Form Builder](https://pradip-v2.github.io/ui-form-builder/) – 表单构建器和查看器组件
- [ReactUI Choropleth Map](https://maetes.github.io/ui-choropleth/) – 用于 GeoJson 的等值区域地图组件
- [Lightbox](https://rilrom.github.io/ui-bites/lightbox/) – 基于 @react-ui/ui 的全屏图片灯箱

## 创建你自己的扩展

欢迎创建你自己的扩展并与社区分享，以上列表中展示。
要提交新的扩展以在此页面展示：

- 在 npm 上创建并发布扩展。你可以为包选择任意名称，例如 `reactui-oklch-color-picker` 或 `@xiaoye/reactui-emoji-picker`。
- 如果你不确定如何开始开发扩展，可以使用[扩展模板](https://github.com/xiaoye/react-ui-extension-template)。它提供了完整的开发环境，包括测试、文档和示例。
- 向 [ReactUI 仓库](https://github.com/xiaoye/react-ui) 提交一个 pull request，附上扩展链接和简短描述，以便在此页面展示。
