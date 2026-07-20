---
category: Components
title: Mark
subtitle: 标记
description: react-ui Mark 标记组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要在内联文本中突出高亮一段文字（类似 `<mark>` 标签）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

## API {#api}

### MarkProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 高亮文字 | `ReactNode` | — |
| color | 主题色 | `UIColor` | `'yellow'` |

除上表所列属性外，Mark 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
