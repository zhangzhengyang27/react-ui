---
category: Components
title: BarChart
subtitle: 柱状图
description: react-ui BarChart 柱状图组件。
group:
  title: 图表
  order: 3
---

## 何时使用 {#when-to-use}

需要在不同类别之间对比数值大小，使用柱状条形展示离散数据时使用。

## 代码演示 {#examples}

### 用法

在不使用 `type` 属性的情况下使用 `BarChart` 组件，可渲染常规柱状图。在常规柱状图中，每个数据系列独立绘制，互不交互。

<code src="./demo/usage.tsx"></code>

### 堆叠柱状图

设置 `type="stacked"` 以渲染堆叠柱状图。在此类型中，堆叠沿垂直轴应用，既能看到总体趋势，也能看到每个系列对总数的贡献。

<code src="./demo/stacked.tsx"></code>

### 混合堆叠柱状图

可通过在 series 对象中设置 `stackId` 属性来控制系列的堆叠方式：

<code src="./demo/mixedStack.tsx"></code>

### 百分比柱状图

设置 `type="percent"` 以渲染百分比柱状图。在此类型中，Y 轴刻度始终归一化为 100%，便于比较各系列在百分比方面的贡献。

<code src="./demo/percent.tsx"></code>

### 瀑布柱状图

设置 `type="waterfall"` 以渲染瀑布柱状图。此图表类型展示初始值如何受到后续正值或负值的影响，每个柱子从上一个柱子结束的位置开始。使用数据中的 `color` 属性为每个柱子单独着色。注意，该柱子的系列颜色会被覆盖。使用数据中的 `standalone` 属性可将柱子从流程中解耦。

<code src="./demo/waterfall.tsx"></code>

### SVG 图案作为柱体填充

可使用 SVG 图案作为柱体填充。为此，将 series 对象中的 `fill` 属性设置为图表 `children` 中 `defs` 区域定义的 SVG 图案的 URL。

使用对角条纹和交叉线图案作为柱体填充的示例：

<code src="./demo/stripes.tsx"></code>

### 根据数值设置柱体颜色

使用 `getBarColor` 属性根据数值分配颜色。`getBarColor` 函数接收两个参数：数值和系列对象。它应返回一个颜色字符串（主题颜色引用或任意有效的 CSS 颜色值）。

注意，`getBarColor` 返回的颜色不会影响图例和提示框的颜色。

<code src="./demo/getBarColor.tsx"></code>

### 图例

要显示图表图例，设置 `withLegend` 属性。当悬停在图例中的某一项时，图表中对应的数据系列会高亮显示。

<code src="./demo/legend.tsx"></code>

### 图例位置

可通过 `legendProps` 属性向 recharts 的 [Legend](https://recharts.org/en-US/api/Legend) 组件传递属性。例如，设置 `legendProps={{ verticalAlign: 'bottom', height: 50 }}` 会将图例渲染在图表底部，并设置其高度为 50px。

<code src="./demo/legendPosition.tsx"></code>

### 系列标签

默认情况下，使用系列对象的 `name` 作为标签。要更改标签，请在 `series` 对象中设置 `label` 属性：

<code src="./demo/seriesLabels.tsx"></code>

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

使用 `yAxisProps` 更改 Y 轴的取值范围。例如，若数据始终在 0 到 150 之间，可将 domain 设置为 `[0, 150]`：

<code src="./demo/yScale.tsx"></code>

### 数值格式化

要格式化提示框和坐标轴刻度中的数值，使用 `valueFormat` 属性。它接受一个函数，该函数接收数值参数并返回格式化后的值：

<code src="./demo/valueFormatter.tsx"></code>

### 区域颜色

可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 柱体属性

可通过 `barProps` 属性向 recharts 的 [Bar](https://recharts.org/en-US/api/Bar) 组件传递属性。`barProps` 接受一个属性对象，或一个接收系列数据并返回属性对象的函数。

<code src="./demo/barProps.tsx"></code>

### 最小柱体尺寸

使用 `minBarSize` 属性设置柱体的最小尺寸（单位：px）：

<code src="./demo/minBarSize.tsx"></code>

### 根据颜色方案改变柱体颜色

可在 `color` 属性中使用 CSS 变量。要定义随颜色方案变化的 CSS 变量，可使用 [light/dark mixins](/docs/styles/postcss-preset/#dark-and-light-mixins) 或 [light-dark 函数](/docs/styles/postcss-preset/#light-dark-function)。例如，一个柱体在浅色模式下为深橙色，在深色模式下为柠檬色：

<code src="./demo/colorSchemeColor.tsx"></code>

### 虚线数组

设置 `strokeDasharray` 属性以控制网格线和光标线的虚线样式。该值表示交替的虚线和间隙长度。例如，`strokeDasharray="10 5"` 会渲染出 10px 虚线和 5px 间隙的虚线。

<code src="./demo/strokeDasharray.tsx"></code>

### 网格和文本颜色

使用 `--chart-grid-color` 和 `--chart-text-color` 来更改网格线和图表内文本的颜色。配合 [CSS 模块](/docs/styles/css-modules/)，可根据颜色方案改变颜色：


若应用只使用一种颜色方案，可直接使用 `gridColor` 和 `textColor` 属性，而不必使用 CSS 变量：

```tsx
import { BarChart } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="date"
      type="stacked"
      gridColor="gray.5"
      textColor="gray.9"
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
        { name: 'Tablets', color: 'teal.6' },
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

### 同步多个 BarChart

可通过 `barChartProps` 属性向 recharts 的 [BarChart](https://recharts.org/en-US/api/BarChart) 组件传递属性。例如，设置 `barChartProps={{ syncId: 'any-id' }}` 会同步多个具有相同 `syncId` 属性的 `BarChart` 组件的提示框。

<code src="./demo/sync.tsx"></code>

### 垂直方向

设置 `orientation="vertical"` 以渲染垂直柱状图：

<code src="./demo/vertical.tsx"></code>

### 参考线

使用 `referenceLines` 属性渲染参考线。参考线始终渲染在图表后方。

<code src="./demo/referenceLines.tsx"></code>

### 参考区域

使用 recharts 的 `ReferenceArea` 组件显示参考区域：

<code src="./demo/referenceArea.tsx"></code>

### 柱体数值标签

要在每个柱体上方显示数值，设置 `withBarValueLabel`：

<code src="./demo/barValueLabel.tsx"></code>

### 柱体数值标签属性

可通过 `valueLabelProps` 属性向 recharts 的 [LabelList](https://recharts.org/en-US/api/LabelList) 组件传递属性。`valueLabelProps` 接受一个属性对象，或一个接收系列数据并返回属性对象的函数。

<code src="./demo/valueLabelProps.tsx"></code>

### 柱体叠加

<code src="./demo/overlay.tsx"></code>



## API {#api}

### BarChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组 | `any[]` | `[]` |
| dataKey | 横轴字段名 | `string` | `'name'` |
| series | 数据系列配置 | `Series[]` | `[]` |
| color | 主题色 | `UIColor` | `'blue'` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withLegend | 是否显示图例 | `boolean` | `false` |
| withBarValueLabel | 是否在柱条上显示数值 | `boolean` | `false` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| h | 高度 | `number \| string` | `300` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
