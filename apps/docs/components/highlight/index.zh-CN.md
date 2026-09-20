---
category: Components
title: Highlight
subtitle: 高亮
description: react-ui Highlight 高亮组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要在长文本中高亮显示指定的关键词（如搜索结果）时使用。

## 代码演示 {#examples}

### 用法

使用 Highlight 组件通过 HTML `<mark>` 元素高亮文本中的子字符串。

将文本作为 children 传递，并使用 `highlight` 属性指定要高亮的子字符串。匹配**不区分大小写**，并且会高亮匹配子字符串的所有出现位置。

<code src="./demo/usage.tsx"></code>

### Text 属性

Highlight 基于 [Text](/components/text/) 组件——除 `color` 外所有 Text 属性都可用。使用 `color` 属性更改高亮背景颜色，而不是文本颜色。

<code src="./demo/props.tsx"></code>

## API {#api}

### HighlightProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| highlight | 要高亮的字符串或数组 | `string \| string[]` | — |
| children | 文本内容 | `string` | — |
| color | 主题色 | `UIColor` | — |

除上表所列属性外，Highlight 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
