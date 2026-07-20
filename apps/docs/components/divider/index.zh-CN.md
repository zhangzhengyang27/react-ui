---
category: Components
title: Divider
subtitle: 分割线
description: react-ui Divider 分割线组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要在垂直或水平方向上分隔不同内容区块，提升可读性时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 变体

<code src="./demo/variants.tsx"></code>

### 带标签

<code src="./demo/labels.tsx"></code>

### 尺寸

<code src="./demo/sizes.tsx"></code>

### 垂直方向

<code src="./demo/orientation.tsx"></code>

## API {#api}

### DividerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| color | 颜色 | `UIColor` | `'gray'` |
| size | 粗细 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'xs'` |
| label | 标签内容 | `ReactNode` | — |
| labelPosition | 标签位置 | `'left' \| 'center' \| 'right'` | `'left'` |
| variant | 视觉变体 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |

除上表所列属性外，Divider 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
