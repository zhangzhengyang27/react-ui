---
category: Components
title: Code
subtitle: 代码
description: react-ui Code 代码组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要在内联文本中展示代码片段，以区别于普通文字时使用。

## 代码演示 {#examples}

### 用法

默认情况下，Code 组件渲染一个行内 `code` HTML 元素：

<code src="./demo/usage.tsx"></code>

### 块级代码

要在 `pre` 元素中渲染代码，请将 `block` 属性传递给 Code 组件：

<code src="./demo/block.tsx"></code>

### 自定义颜色

默认情况下，代码颜色为灰色。可将其更改为任意有效的 CSS 颜色或 [theme.colors](/docs/theming/colors) 中的一种：

<code src="./demo/colors.tsx"></code>

## API {#api}

### CodeProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 代码内容 | `ReactNode` | — |
| color | 主题色 | `UIColor` | `'gray'` |
| block | 是否以块级显示 | `boolean` | `false` |

除上表所列属性外，Code 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
