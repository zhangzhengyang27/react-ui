---
category: Components
title: Marquee
subtitle: 跑马灯
description: react-ui Marquee 跑马灯组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要让内容在水平或垂直方向上自动循环滚动（如公告、跑马灯）时使用。

## 代码演示 {#examples}

### 用法

`Marquee` 组件为其子元素创建连续滚动动画。
它常用于展示 logo、用户评价或任何重复内容。

<code src="./demo/usage.tsx"></code>

### 悬停暂停

设置 `pauseOnHover` 属性，当用户悬停在组件上时暂停动画：

<code src="./demo/pauseOnHover.tsx"></code>

### 垂直方向

设置 `orientation="vertical"` 以垂直滚动内容。注意，需为容器设置
固定高度才能垂直滚动：

<code src="./demo/vertical.tsx"></code>

### 多行

可组合多个不同方向的 `Marquee` 组件来创建
更复杂的布局：

<code src="./demo/multipleRows.tsx"></code>

### 边缘淡出

默认情况下，`Marquee` 在边缘显示渐变淡出以创建平滑过渡效果。
可使用以下属性自定义淡出效果：

- `fadeEdges`——启用/禁用淡出渐变（默认：`true`）
- `fadeEdgeColor`——淡出渐变的颜色（默认：`var(--ui-color-body)`）
- `fadeEdgeSize`——淡出区域的大小（默认：`5%`）

<code src="./demo/fadeEdges.tsx"></code>

### 自定义

使用以下属性自定义 marquee 行为：

- `reverse`——反转动画方向
- `pauseOnHover`——悬停时暂停动画
- `orientation`——滚动方向，`horizontal`（默认）或 `vertical`
- `repeat`——为实现无缝滚动而重复子元素的次数（默认：4）
- `duration`——动画持续时间，单位为 ms（默认：40000）
- `gap`——重复子元素之间的间距，`theme.spacing` 的键或任何有效的 CSS 值

<code src="./demo/configurator.tsx"></code>



## API {#api}

### MarqueeProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 滚动内容 | `ReactNode` | — |
| speed | 滚动速度（px/s） | `number` | `50` |
| direction | 方向 | `'left' \| 'right'` | `'left'` |
| pauseOnHover | 鼠标悬停暂停 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
