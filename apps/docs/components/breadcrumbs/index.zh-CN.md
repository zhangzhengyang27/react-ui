---
category: Components
title: Breadcrumbs
subtitle: 面包屑
description: react-ui Breadcrumbs 面包屑组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要展示当前页面在层级结构中的位置路径，方便用户返回上级时使用。

## 代码演示 {#examples}

### 用法

`Breadcrumbs` 组件接受任意数量的 React 节点作为子元素，并在它们之间添加指定的分隔符（默认为 `/`）：

<code src="./demo/usage.tsx"></code>

## API {#api}

### BreadcrumbsProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 面包屑项 | `ReactNode` | — |
| separator | 分隔符 | `ReactNode` | `'/'` |
| separatorMargin | 分隔符外边距 | `number \| string` | — |

除上表所列属性外，Breadcrumbs 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
