---
category: Components
title: FloatingWindow
subtitle: 浮动窗口
description: react-ui FloatingWindow 浮动窗口组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要创建一个可拖拽、自由浮动的窗口容器时使用。

## 代码演示 {#examples}

### 用法

`FloatingWindow` 创建一个可拖动的固定定位元素：

<code src="./demo/usage.tsx"></code>

### 限制在视口内

使用 `constrainToViewport` 属性将元素移动限制在视口边界内。
若不设置 `constrainToViewport` 属性，元素可被拖出视口：

<code src="./demo/constrainToViewport.tsx"></code>

### 限制偏移

使用 `constrainOffset` 属性设置限制元素时与视口边缘的偏移：

<code src="./demo/constrainOffset.tsx"></code>

### 拖动把手选择器

`dragHandleSelector` 属性允许指定一个元素（或一组元素）的选择器，该元素应用于拖动浮动窗口。
如果未指定，则整个根元素用作拖动目标。

`excludeDragHandleSelector` 属性从拖动事件中排除 `dragHandleSelector` 内的元素。
在以下示例中，关闭按钮被排除在拖动事件之外：

<code src="./demo/dragHandleSelector.tsx"></code>

### enabled 属性

使用 `enabled` 选项启用或禁用拖动：

<code src="./demo/enabled.tsx"></code>

### 设置位置

调用 `setPosition` 函数以编程方式设置元素位置。
此函数接受一个具有 `top`、`left`、`right` 和 `bottom` 属性的对象，
应只指定其中两个（例如，`top` 和 `left`、`bottom` 和 `right`）。

<code src="./demo/setPosition.tsx"></code>

### 锁定轴

使用 `axis` 选项将移动限制到指定轴：

<code src="./demo/axis.tsx"></code>



## API {#api}

### FloatingWindowProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialPosition | 初始位置 | `{ x: number; y: number }` | `{ x: 100, y: 100 }` |
| title | 标题 | `ReactNode` | — |
| draggable | 是否可拖拽 | `boolean` | `true` |
| onClose | 关闭回调 | `() => void` | — |
| zIndex | 层级 | `number` | `1000` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
