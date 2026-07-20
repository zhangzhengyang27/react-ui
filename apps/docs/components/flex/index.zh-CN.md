---
category: Components
title: Flex
subtitle: 弹性布局
description: react-ui Flex 弹性布局组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要使用 flex 弹性布局快速对齐和分配子元素空间时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 响应式属性

`Flex` 组件的属性可像其他 [style props](/docs/styles/style-props/) 一样具有响应式值：

<code src="./demo/responsive.tsx"></code>

<FlexboxGapSupport component="Flex"></FlexboxGapSupport>

## API {#api}

### FlexProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 子元素间距 | `UISpacing` | — |
| justify | 主轴对齐 | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around'` | `'flex-start'` |
| align | 交叉轴对齐 | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch'` | `'stretch'` |
| wrap | 是否换行 | `'wrap' \| 'nowrap' \| 'wrap-reverse'` | `'nowrap'` |
| direction | 主轴方向 | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` |

除上表所列属性外，Flex 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
