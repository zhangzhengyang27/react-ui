---
category: Components
title: RadialBarChart
subtitle: 径向柱状图
description: react-ui RadialBarChart 径向柱状图组件。
group:
  title: 图表
  order: 11
---

## 何时使用 {#when-to-use}

RadialBarChart 以圆形方式展示多组数据，适合展示进度、占比类数据。

## 代码演示 {#examples}

### 用法

`RadialBarChart` 基于 [RadialBarChart recharts 组件](https://recharts.org/en-US/api/RadialBarChart)：

<code src="./demo/usage.tsx"></code>

### 更改颜色

可在 `data` 的 `color` 属性中引用主题颜色或使用任意有效的 CSS 颜色：

<code src="./demo/color.tsx"></code>

### 图例

要显示图例，设置 `withLegend` 属性：

<code src="./demo/legend.tsx"></code>

### 标签

要显示标签，设置 `withLabels` 属性：

<code src="./demo/labels.tsx"></code>

### 隐藏提示框

要隐藏提示框，设置 `withTooltip={false}` 属性：

<code src="./demo/noTooltip.tsx"></code>

## API {#api}

### RadialBarChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组 | `RadialBarChartData[]` | `[]` |
| dataKey | 数据键 | `string` | `'value'` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withLegend | 是否显示图例 | `boolean` | `false` |
| withLabels | 是否显示标签 | `boolean` | `false` |
| size | 图表尺寸 | `number | { width: number; height: number }` | `320` |
| color | 主题色 | `UIColor` | — |
| startAngle | 起始角度 | `number` | `90` |
| endAngle | 结束角度 | `number` | `-270` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
