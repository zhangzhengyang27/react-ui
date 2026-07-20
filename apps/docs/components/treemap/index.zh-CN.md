---
category: Components
title: TreeMap
subtitle: 矩形树图
description: react-ui TreeMap 矩形树图组件。
group:
  title: 图表
  order: 15
---

## 何时使用 {#when-to-use}

Treemap 以嵌套矩形展示层级数据，矩形面积与数据值成正比，适合展示分类占比关系。

## 代码演示 {#examples}

### 用法

`Treemap` 基于 [Treemap recharts 组件](https://recharts.org/en-US/api/Treemap)。它以一组嵌套矩形展示层级数据：

<code src="./demo/usage.tsx"></code>

### 嵌套数据

`Treemap` 支持嵌套数据——每个数据项可以包含 `children` 数组。父节点的 `color` 属性会应用于其所有子节点：

<code src="./demo/nestedDataDemo.tsx"></code>

### 节点颜色

可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 自动对比度

`Treemap` 支持 `autoContrast` 属性，可根据每个节点的背景色自动调整文本颜色，以确保标签清晰可读：

<code src="./demo/autoContrast.tsx"></code>

### 节点描边

使用 `strokeWidth` 属性控制每个节点周围描边的宽度。要更改描边颜色，使用 `strokeColor` 属性：

<code src="./demo/strokeColor.tsx"></code>

### 禁用提示框

要禁用提示框，设置 `withTooltip={false}`：

<code src="./demo/noTooltip.tsx"></code>

## API {#api}

### TreeMapProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 层级数据 | `TreemapData` | — |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| size | 图表尺寸 | `number | { width: number; height: number }` | `320` |
| color | 主题色 | `UIColor` | `'blue'` |
| strokeColor | 描边颜色 | `UIColor` | — |
| strokeWidth | 描边宽度 | `number` | `0` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
