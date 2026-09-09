---
category: Components
title: Descriptions
subtitle: 描述列表
description: react-ui Descriptions 描述列表组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要成组展示只读详情字段（如详情页、审计信息、对象摘要）时使用。与轻量的 [DataList](/components/data-list) 相比，`Descriptions` 支持 `columns` 多列布局与 `span` 跨列，更适合管理端详情区。

## 代码演示 {#examples}

### 基础用法

`columns` 控制每行列数（一个「列」= 一组标签 + 内容），`span` 让某项占据多列：

<code src="./demo/usage.tsx"></code>

### 边框模式

设置 `bordered` 显示单元格边框，标签列带底色；`labelWidth` 统一标签列宽：

<code src="./demo/bordered.tsx"></code>

### 垂直布局

设置 `layout="vertical"` 后标签堆叠在内容上方：

<code src="./demo/vertical.tsx"></code>

## API {#api}

### DescriptionsProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 每行列数 | `number` | `3` |
| bordered | 显示单元格边框 | `boolean` | `false` |
| layout | 布局方向 | `'horizontal' \\| 'vertical'` | `'horizontal'` |
| labelWidth | 标签列宽度 | `string \\| number` | - |
| horizontalSpacing | 水平内边距 | `UISpacing \\| number \\| string` | `'sm'` |
| verticalSpacing | 垂直内边距 | `UISpacing \\| number \\| string` | `'sm'` |

### Descriptions.Item

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签 | `React.ReactNode` | 必填 |
| span | 占据的列数 | `number` | `1` |
| children | 内容 | `React.ReactNode` | - |

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
