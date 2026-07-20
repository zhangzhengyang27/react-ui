---
category: Components
title: BubbleChart
subtitle: 气泡图
description: react-ui BubbleChart 气泡图组件。
group:
  title: 图表
  order: 8
---

## 何时使用 {#when-to-use}

BubbleChart 用于展示三维数据关系，通过气泡的位置和大小反映数据特征。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 更改颜色

可像其他组件一样从 [主题](/docs/theming/theme-object) 中引用颜色，例如 `blue`、`red.5`、`orange.7` 等。任何有效的 CSS 颜色值也同样受支持。

<code src="./demo/color.tsx"></code>

### 根据颜色方案改变区域颜色

可在 `color` 属性中使用 CSS 变量。要定义随颜色方案变化的 CSS 变量，可使用 [light/dark mixins](/docs/styles/postcss-preset/#dark-and-light-mixins) 或 [light-dark 函数](/docs/styles/postcss-preset/#light-dark-function)。例如，一个区域在浅色模式下为深橙色，在深色模式下为柠檬色：

<code src="./demo/colorSchemeColor.tsx"></code>

### 移除提示框

要移除提示框，设置 `withTooltip={false}`。这同时也会移除光标线，并禁用图表的交互。

<code src="./demo/noTooltip.tsx"></code>

### 数值格式化

要格式化提示框中的数值，使用 `valueFormat` 属性。它接受一个函数，该函数接收数值参数并返回格式化后的值：

<code src="./demo/valueFormatter.tsx"></code>

### 网格和文本颜色

使用 `--chart-grid-color` 和 `--chart-text-color` 来更改网格线和图表内文本的颜色。配合 [CSS 模块](/docs/styles/css-modules/)，可根据颜色方案改变颜色：


若应用只使用一种颜色方案，可直接使用 `gridColor` 和 `textColor` 属性，而不必使用 CSS 变量：

```tsx
import { BubbleChart } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  return (
    <BubbleChart
      gridColor="gray.5"
      textColor="gray.9"
      h={60}
      data={data}
      range={[16, 225]}
      label="销售额/小时"
      color="lime.6"
      dataKey={{ x: 'hour', y: 'index', z: 'value' }}
    />
  );
}
```

<code src="./demo/gridColor.tsx"></code>

## API {#api}

### BubbleChartProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组 | `Record<string, any>[]` | `[]` |
| dataKey | Y 轴数据键 | `string` | `'value'` |
| xAxisKey | X 轴数据键 | `string` | `'x'` |
| zAxisKey | Z 轴（大小）数据键 | `string` | `'z'` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| withXAxis | 是否显示 X 轴 | `boolean` | `true` |
| withYAxis | 是否显示 Y 轴 | `boolean` | `true` |
| size | 图表尺寸 | `number | { width: number; height: number }` | `320` |
| color | 主题色 | `UIColor` | `'blue'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
