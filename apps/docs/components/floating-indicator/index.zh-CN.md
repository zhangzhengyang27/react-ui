---
category: Components
title: FloatingIndicator
subtitle: 浮动指示器
description: react-ui FloatingIndicator 浮动指示器组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要在两个元素之间显示一个浮动指示器（如拖拽排序时的占位提示）时使用。

## 代码演示 {#examples}

### 用法

`FloatingIndicator` 用于高亮显示一组元素中的活动元素。
它可用于创建自定义分段控件、选项卡和其他类似组件。

`FloatingIndicator` 在 `target` 元素上方渲染一个元素。为了计算位置，需要
传递一个 `parent` 元素。**父元素必须具有 `position: relative` CSS 属性**——
这对正确定位至关重要。如果未提供 `target` 或 `parent`，组件将返回 `null` 且不渲染任何内容。

默认情况下，`FloatingIndicator` 没有任何可见样式。可使用 `className` 属性
或 [Styles API](/docs/styles/styles-api) 来应用样式。请注意，indicator 的 `transform`、`width`
和 `height` 样式直接通过 JavaScript 设置以实现平滑的位置过渡——这些
无法通过 Styles API 覆盖。

<code src="./demo/segmented.tsx"></code>

### 多行

`FloatingIndicator` 可用于高亮显示多行组中的活动元素：

<code src="./demo/direction.tsx"></code>

### 示例：Tabs

<code src="./demo/tabs.tsx"></code>



## API {#api}

### FloatingIndicatorProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 跟随的目标元素 ref | `Ref<HTMLElement>` | — |
| parent | 容器元素 ref | `Ref<HTMLElement>` | — |
| transitionDuration | 过渡时长（ms） | `number` | `150` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
