---
category: Components
title: Stack
subtitle: 堆叠
description: react-ui Stack 堆叠组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要在垂直或水平方向上堆叠一组子元素，并统一间距时使用。

## 代码演示 {#examples}

### 用法

`Stack` 是一个垂直 flex 容器。若需水平 flex 容器，请改用 [Group](/components/group) 组件；若需完全控制 flex 容器属性，请使用 [Flex](/components/flex) 组件。

<code src="./demo/configurator.tsx"></code>

<FlexboxGapSupport component="Stack"></FlexboxGapSupport>

## API {#api}

### StackProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 子元素间距 | `UISpacing` | `'md'` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'space-between'` | `'start'` |

除上表所列属性外，Stack 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
