---
category: Components
title: Sparkline
subtitle: 迷你走势图
description: react-ui Sparkline 迷你走势图组件。
group:
  title: 图表
  order: 16
---

## 何时使用 {#when-to-use}

Sparkline 是 AreaChart 的简化版本，用于在较小空间内展示单组数据的趋势变化。

## 代码演示 {#examples}

### 用法

`Sparkline` 是 [AreaChart](/components/area-chart) 的简化版本，可用于在较小空间内展示单组数据。

<code src="./demo/usage.tsx"></code>

### 根据颜色方案改变区域颜色

可在 `color` 属性中使用 CSS 变量。要定义随颜色方案变化的 CSS 变量，可使用 [light/dark mixins](/docs/styles/postcss-preset/#dark-and-light-mixins)
或 [light-dark 函数](/docs/styles/postcss-preset/#light-dark-function)。例如，一个区域在浅色模式下为深橙色，在深色模式下为柠檬色：

<code src="./demo/colorSchemeColor.tsx"></code>

### 趋势颜色

使用 `trendColors` 属性替代 `color`，根据趋势改变图表颜色。该属性接受一个包含 `positive`、`negative` 和 `neutral` 的对象：

- `positive` - 正值趋势颜色（`data` 数组中首个值小于最后一个值）
- `negative` - 负值趋势颜色（`data` 数组中首个值大于最后一个值）
- `neutral` - 中性趋势颜色（首尾两个值相等）

`neutral` 为可选；若未提供，颜色将与 `positive` 相同。

<code src="./demo/trendColors.tsx"></code>

## API {#api}

### SparklineProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组 | `number[]` | `[]` |
| size | 图表尺寸 | number \| { width: number; height: number } | `120` |
| color | 主题色 | `UIColor` | `'blue'` |
| withTooltip | 是否显示提示框 | `boolean` | `false` |
| strokeWidth | 线条宽度 | `number` | `2` |
| fillOpacity | 填充透明度 | `number` | `0.6` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
