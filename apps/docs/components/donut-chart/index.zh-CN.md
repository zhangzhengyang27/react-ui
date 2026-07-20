---
category: Components
title: DonutChart
subtitle: 环形图
description: react-ui DonutChart 环形图组件。
group:
  title: 图表
  order: 5
---

## 何时使用 {#when-to-use}

需要以环形展示各分类占比，并在中心显示汇总数值或附加信息时使用。

## 代码演示 {#examples}

### 用法

`DonutChart` 基于 [PieChart recharts 组件](https://recharts.org/en-US/api/PieChart)：

<code src="./demo/usage.tsx"></code>

### 图例

要显示图例，设置 `withLegend` 属性。图例会展示每个分段的名称和颜色。悬停在图例项上可高亮对应分段：


可通过 `legendProps` 属性向 recharts 的 `Legend` 组件传递属性。例如，设置 `legendProps={{ verticalAlign: 'top' }}` 可将图例显示在图表上方。

<code src="./demo/legend.tsx"></code>

### 分段标签

设置 `withLabels` 属性以在每个分段旁显示标签：

<code src="./demo/withLabels.tsx"></code>

### 尺寸和粗细

设置 `size` 属性以控制图表的宽度和高度。注意，如果设置了 `withLabels` 属性，图表高度会自动增加 80px 以为标签留出空间。可通过 `h` [样式属性](/docs/styles/style-props) 覆盖此行为。

<code src="./demo/size.tsx"></code>

### 分段间隙

使用 `paddingAngle` 属性控制分段之间的间隙：

<code src="./demo/paddingAngle.tsx"></code>

### 分段颜色

可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 提示框数据源

默认情况下，悬停在任意分段上时，提示框会显示所有分段的数据。要仅显示悬停分段的数据，设置 `tooltipDataSource="segment"`：

<code src="./demo/tooltipDataSource.tsx"></code>

### 无提示框

要移除提示框，设置 `withTooltip={false}`：

<code src="./demo/noTooltip.tsx"></code>

### 图表标签

要在图表中心显示标签，使用 `chartLabel` 属性。它接受字符串或数字：

<code src="./demo/chartLabel.tsx"></code>

### 起始和结束角度

使用 `startAngle` 和 `endAngle` 属性控制图表的起始和结束角度。例如，要展示半圆图表，设置 `startAngle={180}` 和 `endAngle={0}`：


请注意，即使设置了 `startAngle` 和 `endAngle` 属性，图表所占用的空间仍与完整圆形相同。

<code src="./demo/angle.tsx"></code>

### 分段描边

使用 `strokeWidth` 属性控制每个分段周围描边的宽度：


要更改描边颜色，使用 `strokeColor` 属性。可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。


默认情况下，分段描边颜色与 body 元素的背景色相同（`--ui-color-body` CSS 变量）。如需根据颜色方案改变描边颜色，可定义一个 CSS 变量并传递给 `strokeColor` 属性：

```tsx
import { DonutChart } from '@react-ui/ui';

function Demo() {
  return <DonutChart data={[]} strokeColor="red.5" />;
}
```

<code src="./demo/strokeWidth.tsx"></code>

<code src="./demo/strokeColor.tsx"></code>



## API {#api}

### DonutChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组（含 name/value/color） | `{ name: string; value: number; color?: UIColor }[]` | `[]` |
| size | 图表尺寸 | `number` | `160` |
| thickness | 圆环厚度 | `number` | `16` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withLabels | 是否显示标签 | `boolean` | `false` |
| withLabelsLine | 是否显示标签引线 | `boolean` | `false` |
| paddingAngle | 扇区间隔角度 | `number` | `0` |
| chartLabel | 中心文字 | `ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
