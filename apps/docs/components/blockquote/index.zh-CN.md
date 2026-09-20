---
category: Components
title: Blockquote
subtitle: 引用
description: react-ui Blockquote 引用组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要引用外部文字内容并突出显示（如客户评价、名人名言）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 文本换行

使用 `textWrap` 属性控制 `text-wrap` CSS 属性：

<code src="./demo/textWrap.tsx"></code>



## API {#api}

### BlockquoteProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cite | 引用来源，可为文本或自定义节点 | `ReactNode` | — |
| color | 主题色 | `UIColor` | `'gray'` |
| icon | 引用图标 | `ReactNode` | — |
| radius | 圆角 | `UIRadius` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
