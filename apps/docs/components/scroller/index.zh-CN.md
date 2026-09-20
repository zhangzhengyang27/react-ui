---
category: Components
title: Scroller
subtitle: 滚动器
description: react-ui Scroller 滚动器组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要让一个区域支持横向或纵向的滚动，并暴露统一的滚动 API 时使用。

## 代码演示 {#examples}

### 用法

`Scroller` 是一个水平滚动容器，当内容溢出容器时会显示导航控件（chevron 按钮）。它支持通过触控板、Shift + 鼠标滚轮或触摸手势进行原生滚动。

<code src="./demo/usage.tsx"></code>

### 鼠标拖动滚动

设置 `draggable` 属性以启用通过鼠标点击拖动进行滚动：

<code src="./demo/draggable.tsx"></code>

### 滚动量

使用 `scrollAmount` 属性控制点击导航按钮时容器滚动的像素数。默认值为 `200`。

<code src="./demo/scrollAmount.tsx"></code>

### 控件尺寸

使用 `controlSize` 属性更改导航按钮的尺寸。它接受任何有效的 ReactUI 尺寸值（`xs`、`sm`、`md`、`lg`、`xl`）或数字（转换为像素）。

<code src="./demo/controlSize.tsx"></code>

### 自定义图标

使用 `startControlIcon` 和 `endControlIcon` 属性用自定义图标替换默认的 chevron 图标：

<code src="./demo/customIcons.tsx"></code>



## API {#api}

### ScrollerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 滚动方向 | `'horizontal' \| 'vertical' \| 'both'` | `'horizontal'` |
| speed | 滚动速度 | `number` | `1` |
| draggable | 是否允许用鼠标拖动内容滚动 | `boolean` | `true` |
| align | 对齐方式 | `'start' \| 'center' \| 'end'` | `'start'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
