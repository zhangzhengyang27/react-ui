---
category: Components
title: RadarChart
subtitle: 雷达图
description: react-ui RadarChart 雷达图组件。
group:
  title: 图表
  order: 6
---

## 何时使用 {#when-to-use}

需要在多个维度上对比若干对象的整体表现（如能力评估）时使用。

## 代码演示 {#examples}

### 用法

`RadarChart` 基于 recharts 的 [RadarChart](https://recharts.org/en-US/api/RadarChart) 组件：

<code src="./demo/usage.tsx"></code>

### 多系列

可在同一个雷达图上显示多个系列：

<code src="./demo/multiple.tsx"></code>

### 更改颜色

可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 隐藏/显示图表部分

<code src="./demo/parts.tsx"></code>

### 带提示框和圆点

<code src="./demo/tooltip.tsx"></code>

### Recharts 属性

要向底层 recharts 组件传递属性，请使用以下属性：

- `radarChartProps` 向 [RadarChart](https://recharts.org/en-US/api/RadarChart) 组件传递属性
- `polarGridProps` 向 [PolarGrid](https://recharts.org/en-US/api/PolarGrid) 组件传递属性
- `polarAngleAxisProps` 向 [PolarAngleAxis](https://recharts.org/en-US/api/PolarAngleAxis) 组件传递属性
- `polarRadiusAxisProps` 向 [PolarRadiusAxis](https://recharts.org/en-US/api/PolarRadiusAxis) 组件传递属性

向 [PolarRadiusAxis](https://recharts.org/en-US/api/PolarRadiusAxis) 组件传递属性的示例：

<code src="./demo/rechartsProps.tsx"></code>

### 图例

设置 `withLegend` 属性以显示图例：

<code src="./demo/legend.tsx"></code>



## API {#api}

### RadarChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 雷达图数据 | `RadarChartSeries[]` | `[]` |
| dataKey | 维度字段名 | `string` | — |
| series | 数据系列 | `Series[]` | `[]` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withLegend | 是否显示图例 | `boolean` | `false` |
| withPolarGrid | 是否显示极坐标网格 | `boolean` | `true` |
| withPolarAngleAxis | 是否显示角度轴 | `boolean` | `true` |
| withPolarRadiusAxis | 是否显示半径轴 | `boolean` | `true` |
| h | 高度 | `number \| string` | `300` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
