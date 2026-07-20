---
category: Components
title: DataList
subtitle: 数据列表
description: react-ui DataList 数据列表组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要以"键-值"对的形式展示描述性数据（如商品详情、用户信息）时使用。

## 代码演示 {#examples}

### 用法

`DataList` 组件渲染一个描述列表（`dl`）元素，包含标签-值对，使用语义化的 `dt` 和 `dd` HTML 元素。

<code src="./demo/usage.tsx"></code>

### 使用分隔线

设置 `withDivider` 属性以在项之间添加边框：

<code src="./demo/divider.tsx"></code>

### 垂直方向

设置 `orientation="vertical"` 以在每个项内将标签堆叠在值上方：

<code src="./demo/vertical.tsx"></code>

## API {#api}

### DataListProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | DataList.Item 列表 | `ReactNode` | — |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` |
| spacing | 项间距 | `UISpacing` | `'lg'` |
| withDivider | 是否显示分隔线 | `boolean` | `false` |

除上表所列属性外，DataList 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
