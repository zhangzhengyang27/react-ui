---
category: Components
title: ScatterChart
subtitle: 散点图
description: react-ui ScatterChart 散点图组件。
group:
  title: 图表
  order: 7
---

## 何时使用 {#when-to-use}

需要展示两组数值之间的相关关系，通过点的分布观察趋势与离群点时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 多系列

<code src="./demo/multipleSeries.tsx"></code>

### 图例

要显示图表图例，设置 `withLegend` 属性。当悬停在图例中的某一项时，图表中对应的数据系列会高亮显示。

<code src="./demo/legend.tsx"></code>

### 图例位置

可通过 `legendProps` 属性向 recharts 的 [Legend](https://recharts.org/en-US/api/Legend) 组件传递属性。例如，设置 `legendProps={{ verticalAlign: 'bottom', height: 50 }}` 会将图例渲染在图表底部，并设置其高度为 50px。

<code src="./demo/legendPosition.tsx"></code>

### X 轴和 Y 轴属性

使用 `xAxisProps` 和 `yAxisProps` 向 recharts 的 [XAxis](https://recharts.org/en-US/api/XAxis) 和 [YAxis](https://recharts.org/en-US/api/YAxis) 组件传递属性。例如，可以使用这些属性来更改坐标轴方向：

<code src="./demo/axisProps.tsx"></code>

### 数值格式化

要格式化提示框和坐标轴刻度中的数值，使用 `valueFormat` 属性。它接受一个函数，该函数接收数值参数并返回格式化后的值，或返回一个包含 `x` 和 `y` 键的对象以分别格式化 x 和 y 值：

<code src="./demo/valueFormatter.tsx"></code>

### 数据点标签

将 `pointLabels` 属性设置为 `x` 或 `y`，以在对应坐标轴的数据点上显示标签：

<code src="./demo/pointLabels.tsx"></code>

### 网格和文本颜色

使用 `--chart-grid-color` 和 `--chart-text-color` 来更改网格线和图表内文本的颜色。配合 [CSS 模块](/docs/styles/css-modules/)，可根据颜色方案改变颜色：


若应用只使用一种颜色方案，可直接使用 `gridColor` 和 `textColor` 属性，而不必使用 CSS 变量：

```tsx
import { ScatterChart } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: 'age', y: 'BMI' }}
      gridColor="gray.5"
      textColor="gray.9"
    />
  );
}
```

<code src="./demo/gridColor.tsx"></code>

### 虚线数组

设置 `strokeDasharray` 属性以控制网格线和光标线的虚线样式。该值表示交替的虚线和间隙长度。例如，`strokeDasharray="10 5"` 会渲染出 10px 虚线和 5px 间隙的虚线。

<code src="./demo/strokeDasharray.tsx"></code>

### 单位

设置 `unit` 属性，在坐标轴刻度和提示框数值旁渲染单位标签：

<code src="./demo/units.tsx"></code>

### 提示框标签

要自定义提示框中显示的标签，使用 `labels` 属性：

<code src="./demo/labels.tsx"></code>

### 自定义提示框

使用 `tooltipProps.content` 向 recharts 的 [Tooltip](https://recharts.org/en-US/api/Tooltip) 组件传入自定义提示框渲染器：

<code src="./demo/customTooltip.tsx"></code>

### 移除提示框

要移除提示框，设置 `withTooltip={false}`。这同时也会移除光标线，并禁用图表的交互。

<code src="./demo/noTooltip.tsx"></code>

### 提示框动画

默认情况下，提示框动画处于禁用状态。要启用，请将 `tooltipAnimationDuration` 属性设置为动画持续毫秒数，以动画方式改变提示框位置。

<code src="./demo/tooltipAnimation.tsx"></code>

### 自定义圆点

可通过向 recharts 的 [Scatter](https://recharts.org/en-US/api/Scatter) 组件传递属性，使用任意形状作为圆点：

<code src="./demo/dotSize.tsx"></code>

### 参考线

使用 `referenceLines` 属性渲染参考线。参考线始终渲染在图表后方。

<code src="./demo/referenceLines.tsx"></code>



## API {#api}

### ScatterChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 散点数据 | `ScatterChartSeries[]` | `[]` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withLegend | 是否显示图例 | `boolean` | `false` |
| xAxisLabel | 横轴标题 | `string` | — |
| yAxisLabel | 纵轴标题 | `string` | — |
| unit | 单位 | `string` | — |
| h | 高度 | `number \| string` | `300` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
