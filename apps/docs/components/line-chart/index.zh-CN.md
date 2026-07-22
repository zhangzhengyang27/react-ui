---
category: Components
title: LineChart
subtitle: 折线图
description: react-ui LineChart 折线图组件。
group:
  title: 图表
  order: 2
---

## 何时使用 {#when-to-use}

需要展示数据随时间或连续变量的变化趋势时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 渐变类型

设置 `type="gradient"` 以渲染带渐变填充的折线图。要自定义渐变颜色，使用 `gradientStops` 属性。它接受一个对象数组，每个对象包含 `offset` 和 `color` 属性。`offset` 是 0 到 100 之间的数字，用于定义颜色在渐变中的位置；`color` 是对 `theme.colors` 的引用或任意有效的 CSS 颜色。

<code src="./demo/gradient.tsx"></code>

### 图例

要显示图表图例，设置 `withLegend` 属性。当悬停在图例中的某一项时，图表中对应的数据系列会高亮显示。

<code src="./demo/legend.tsx"></code>

### 图例位置

可通过 `legendProps` 属性向 recharts 的 [Legend](https://recharts.org/en-US/api/Legend) 组件传递属性。例如，设置 `legendProps={{ verticalAlign: 'bottom', height: 50 }}` 可将图例渲染在图表底部，并设置其高度为 50px。

<code src="./demo/legendPosition.tsx"></code>

### 系列标签

默认情况下，使用系列对象的 `name` 作为标签。要更改标签，请在 `series` 对象中设置 `label` 属性：

<code src="./demo/seriesLabels.tsx"></code>

### 连接空值

使用 `connectNulls` 属性指定是否跨空值连接数据点。默认情况下，`connectNulls` 为 `true`。

<code src="./demo/connectNulls.tsx"></code>

### 数据点标签

要在数据点上显示标签，设置 `withPointLabels`：

<code src="./demo/pointLabels.tsx"></code>

### X 轴和 Y 轴属性

使用 `xAxisProps` 和 `yAxisProps` 向 recharts 的 [XAxis](https://recharts.org/en-US/api/XAxis) 和 [YAxis](https://recharts.org/en-US/api/YAxis) 组件传递属性。例如，可以使用这些属性来更改坐标轴方向：

<code src="./demo/axisProps.tsx"></code>

### 坐标轴标签

使用 `xAxisLabel` 和 `yAxisLabel` 属性显示坐标轴标签：

<code src="./demo/axisLabels.tsx"></code>

### X 轴偏移

使用 `xAxisProps` 设置图表两端与 X 轴之间的间距：

<code src="./demo/xAxisOffset.tsx"></code>

### Y 轴刻度

使用 `yAxisProps` 更改 Y 轴的取值范围。例如，若已知数据始终在 0 到 100 之间，可将 domain 设置为 `[0, 100]`：

<code src="./demo/yScale.tsx"></code>

### 右侧 Y 轴

要在图表右侧显示额外的 Y 轴，设置 `withRightYAxis` 属性。可通过 `rightYAxisProps` 属性向 recharts 的 [YAxis](https://recharts.org/en-US/api/YAxis) 组件传递属性，并通过 `rightYAxisLabel` 属性为右侧 Y 轴设置标签。需在 `series` 对象中设置 `yAxisId`，将数据系列绑定到右侧 Y 轴。

<code src="./demo/rightYAxis.tsx"></code>

### 数值格式化

要格式化提示框和坐标轴刻度中的数值，使用 `valueFormat` 属性。它接受一个函数，该函数接收数值参数并返回格式化后的值：

<code src="./demo/valueFormatter.tsx"></code>

### 为每条线设置曲线类型

可在 `series` 数组中为每条线设置独立的曲线类型。若未为某条线设置曲线类型，该系列将回退到 `curveType` 属性；若未设置 `curveType`，则默认为 `monotone`。

<code src="./demo/curveType.tsx"></code>

### 线条颜色

可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 根据颜色方案改变线条颜色

可在 `color` 属性中使用 CSS 变量。要定义随颜色方案变化的 CSS 变量，可使用 [light/dark mixins](/docs/styles/postcss-preset/#dark-and-light-mixins) 或 [light-dark 函数](/docs/styles/postcss-preset/#light-dark-function)。例如，一条线在浅色模式下为深橙色，在深色模式下为柠檬色：

<code src="./demo/colorSchemeColor.tsx"></code>

### 虚线数组

设置 `strokeDasharray` 属性以控制网格线和光标线的虚线样式。该值表示交替的虚线和间隙长度。例如，`strokeDasharray="10 5"` 会渲染出 10px 虚线和 5px 间隙的虚线。

<code src="./demo/strokeDasharray.tsx"></code>

### 网格和文本颜色

使用 `--chart-grid-color` 和 `--chart-text-color` 来更改网格线和图表内文本的颜色。配合 [CSS 模块](/docs/styles/css-modules/)，可根据颜色方案改变颜色：


若应用只使用一种颜色方案，可直接使用 `gridColor` 和 `textColor` 属性，而不必使用 CSS 变量：

```tsx
import { LineChart } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      gridColor="gray.5"
      textColor="gray.9"
      series={[
        { name: '苹果', color: 'indigo.6' },
        { name: '橙子', color: 'blue.6' },
        { name: '西红柿', color: 'teal.6' },
      ]}
    />
  );
}
```

<code src="./demo/gridColor.tsx"></code>

### 提示框动画

默认情况下，提示框动画处于禁用状态。要启用，请将 `tooltipAnimationDuration` 属性设置为动画持续毫秒数，以动画方式改变提示框位置。

<code src="./demo/tooltipAnimation.tsx"></code>

### 单位

设置 `unit` 属性，在 Y 轴刻度和提示框数值旁渲染单位标签：

<code src="./demo/unit.tsx"></code>

### 自定义提示框

使用 `tooltipProps.content` 向 recharts 的 [Tooltip](https://recharts.org/en-US/api/Tooltip) 组件传入自定义提示框渲染器。注意，必须使用 `getFilteredChartTooltipPayload` 函数过滤 recharts 的 payload，以移除仅用于样式的空值。

<code src="./demo/customTooltip.tsx"></code>

### 移除提示框

要移除提示框，设置 `withTooltip={false}`。这同时也会移除光标线，并禁用图表的交互。

<code src="./demo/noTooltip.tsx"></code>

### 自定义圆点

使用 `dotProps` 向 recharts 的普通状态圆点传递属性，使用 `activeDotProps` 向激活状态（光标位于当前系列上时）的圆点传递属性。

<code src="./demo/dotProps.tsx"></code>

### 描边宽度

使用 `strokeWidth` 属性控制所有线条的描边宽度：

<code src="./demo/strokeWidth.tsx"></code>

### 同步多个 LineChart

可通过 `lineChartProps` 属性向 recharts 的 [LineChart](https://recharts.org/en-US/api/LineChart) 组件传递属性。例如，设置 `lineChartProps={{ syncId: 'any-id' }}` 会同步多个具有相同 `syncId` 属性的 `LineChart` 组件的提示框。

<code src="./demo/sync.tsx"></code>

### 垂直方向

设置 `orientation="vertical"` 以渲染垂直折线图：

<code src="./demo/vertical.tsx"></code>

### 虚线

在 `series` 中设置 `strokeDasharray` 属性，可将线条样式改为虚线：

<code src="./demo/lineDasharray.tsx"></code>

### 参考线

使用 `referenceLines` 属性渲染参考线。参考线始终渲染在图表后方。

<code src="./demo/referenceLines.tsx"></code>

### 参考区域

使用 recharts 的 `ReferenceArea` 组件显示参考区域：

<code src="./demo/referenceArea.tsx"></code>



## API {#api}

### LineChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组 | `any[]` | `[]` |
| dataKey | 横轴字段名 | `string` | `'date'` |
| series | 数据系列配置 | `Series[]` | `[]` |
| color | 主题色 | `UIColor` | `'blue'` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withLegend | 是否显示图例 | `boolean` | `false` |
| withDots | 是否显示数据点 | `boolean` | `true` |
| curveType | 折线类型 | `'linear' \| 'natural' \| 'monotone'` | `'monotone'` |
| h | 高度 | `number \| string` | `300` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
