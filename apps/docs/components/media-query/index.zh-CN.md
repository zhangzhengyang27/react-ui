---
category: Components
title: MediaQuery
subtitle: 媒体查询
description: react-ui MediaQuery 媒体查询组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要根据 CSS 媒体查询条件响应式地渲染不同的 React 子树时使用。

## 代码演示 {#examples}

### 基础用法

MediaQuery 的基础示例。

<code src="./demo/basic.tsx"></code>

## API {#api}

### MediaQueryProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| query | 媒体查询字符串 | `string` | — |
| children | 满足条件时渲染的子元素 | `ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
