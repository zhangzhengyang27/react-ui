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

将文本作为 children 传递，并使用 `highlight` 属性指定要高亮的子字符串。默认情况下匹配是**不区分大小写**和**不区分重音符号**的，并且会高亮匹配子字符串的所有出现位置。使用 `caseInsensitive` 和 `accentInsensitive` 属性选择退出。

<code src="./demo/usage.tsx"></code>

### 区分大小写匹配

设置 `caseInsensitive={false}` 以仅匹配与高亮术语大小写相同的子字符串：

<code src="./demo/caseInsensitive.tsx"></code>

### 区分重音符号匹配

设置 `accentInsensitive={false}` 以要求文本中的重音字符与高亮术语完全匹配：

<code src="./demo/accentInsensitive.tsx"></code>

### 高亮多个子字符串

要高亮多个子字符串，请提供一个值数组。当提供多个子字符串时，较长的匹配优先以避免部分重叠。

<code src="./demo/multiple.tsx"></code>

### 每个术语自定义颜色

可通过提供包含 `text` 和 `color` 属性的对象数组，为不同的高亮术语分配不同颜色：

<code src="./demo/colors.tsx"></code>

### 整词匹配

使用 `wholeWord` 属性仅匹配完整单词。启用后，'the' 不会匹配 'there' 或 'theme'：

<code src="./demo/wholeword.tsx"></code>

### 更改高亮样式

可以使用 `highlightStyles` 属性覆盖默认 [Mark](/components/mark/) 样式，它接受样式对象或接收主题作为参数并返回样式的函数：

<code src="./demo/styles.tsx"></code>

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
| highlightComponent | 自定义高亮渲染组件 | `React.ElementType` | `Mark` |

除上表所列属性外，Highlight 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
