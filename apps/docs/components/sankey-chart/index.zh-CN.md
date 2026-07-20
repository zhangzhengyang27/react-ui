---
category: Components
title: SankeyChart
subtitle: 桑基图
description: react-ui SankeyChart 桑基图组件。
group:
  title: 图表
  order: 12
---

## 何时使用 {#when-to-use}

SankeyChart 用于可视化节点之间的流量关系，连线宽度与流量值成正比，常用于能源、资金流向分析。

## 代码演示 {#examples}

### 用法

`SankeyChart` 基于 [Sankey recharts 组件](https://recharts.org/en-US/api/Sankey)。它用于可视化节点之间的流量，每条连线的宽度与流量值成正比：

<code src="./demo/usage.tsx"></code>

### 节点颜色

可在数据的每个节点上设置 `color` 以控制单个节点颜色。颜色可引用 [主题](/docs/theming/theme-object) 值，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 自定义颜色

使用 `colors` 属性提供一组颜色，当单个节点未设置 `color` 时用于节点。颜色可以引用 [主题](/docs/theming/theme-object) 值。当节点数量多于颜色数量时，颜色会循环使用：

<code src="./demo/colors.tsx"></code>

### 节点宽度和间距

使用 `nodeWidth` 控制每个节点的宽度，使用 `nodePadding` 控制节点之间的间距：

<code src="./demo/nodeWidth.tsx"></code>

### 连线透明度

使用 `linkOpacity` 属性控制节点之间连线的透明度：

<code src="./demo/linkOpacity.tsx"></code>

### 禁用提示框

要禁用提示框，设置 `withTooltip={false}`：

<code src="./demo/noTooltip.tsx"></code>

## API {#api}

### SankeyChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据对象，包含 nodes 和 links | `{ nodes: SankeyNode[]; links: SankeyLink[] }` | — |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| size | 图表尺寸 | `number | { width: number; height: number }` | `320` |
| nodeColor | 节点颜色 | `UIColor` | — |
| nodePadding | 节点间距 | `number` | `16` |
| nodeWidth | 节点宽度 | `number` | `12` |
| linkColor | 连线颜色 | `UIColor` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
