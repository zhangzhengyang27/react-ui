---
category: Components
title: ScrollArea
subtitle: 滚动区域
description: react-ui ScrollArea 滚动区域组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要自定义滚动条样式，保持跨浏览器一致的滚动体验时使用。

## 代码演示 {#examples}

### 用法

`ScrollArea` 组件支持以下属性：

- `type` 定义滚动条行为：
  - `hover` – 悬停时显示滚动条
  - `scroll` – 滚动时显示滚动条
  - `auto` – 类似于 `overflow: auto` – 内容溢出时始终显示滚动条
  - `always` – 与 `auto` 相同，但无论内容是否溢出，滚动条始终可见
  - `never` – 滚动条始终隐藏
- `offsetScrollbars` – 添加内边距以偏移滚动条，具有以下选项：
  - `true` – 添加内边距以同时偏移两个滚动条
  - `x` – 仅添加内边距以偏移水平滚动条
  - `y` – 仅添加内边距以偏移垂直滚动条
  - `present` – 仅在滚动条可见时添加内边距
- `scrollbarSize` – 滚动条尺寸，控制滚动条和 thumb 的宽度/高度
- `scrollHideDelay` – 隐藏滚动条的延迟时间（毫秒），仅在 type 为 `hover` 或 `scroll` 时适用
- `overscrollBehavior` – 控制视口的 [overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)

<code src="./demo/usage.tsx"></code>

### 水平滚动条

<code src="./demo/horizontal.tsx"></code>

### 禁用水平滚动条

要禁用水平滚动条，请设置 `scrollbars="y"` 属性：

<code src="./demo/scrollbars.tsx"></code>

### 订阅滚动位置变化

设置 `onScrollPositionChange` 函数以订阅滚动位置变化。
每次用户滚动时，它会以 x 和 y 坐标被调用：

<code src="./demo/scrollPosition.tsx"></code>

### 滚动边界回调

`ScrollArea` 组件支持在滚动到达边界时触发的回调：

<code src="./demo/boundaries.tsx"></code>

### 滚动到指定位置

要以编程方式滚动到任意位置，
请使用 `viewportRef` 属性获取视口元素 ref 并调用 `scrollTo` 方法：

<code src="./demo/scrollTo.tsx"></code>

### 初始滚动位置

使用 `startScrollPosition` 属性设置组件挂载时的初始滚动位置。
与使用 `viewportRef` 和 `useEffect` 不同，这种方式可避免内容在位置 (0, 0) 处闪烁：

<code src="./demo/startScrollPosition.tsx"></code>

### 样式 API

<code src="./demo/stylesApi.tsx"></code>

### 将元素滚动到视图中

<code src="./demo/scrollIntoView.tsx"></code>

### ScrollArea.Autosize

`ScrollArea.Autosize` 组件允许在达到给定最大高度时创建可滚动容器。
它还支持检测垂直溢出何时发生的回调：

- onOverflowChange – 当内容超过最大高度时触发，使容器可滚动或不可滚动

<code src="./demo/maxHeight.tsx"></code>

### ScrollArea.Autosize 与 Popover 一起使用

<code src="./demo/autosizePopover.tsx"></code>



## API {#api}

### ScrollAreaProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 滚动条类型 | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'hover'` |
| scrollbarSize | 滚动条尺寸 | `number` | `10` |
| scrollHideDelay | 隐藏延迟（ms） | `number` | `1000` |
| offsetScrollbars | 是否让滚动条占位 | `boolean` | `false` |
| onScrollPositionChange | 滚动位置变化回调 | `({ x, y }) => void` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
