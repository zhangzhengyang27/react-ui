---
category: Components
title: BarsList
subtitle: 条形列表
description: react-ui BarsList 条形列表组件。
group:
  title: 图表
  order: 14
---

## 何时使用 {#when-to-use}

BarsList 是一种简化版的柱状图，用于在较小空间内展示多组数据的对比关系。

## 代码演示 {#examples}

### 用法

`BarsList` 组件展示一组带名称和数值的条形。唯一必需的属性是 `data`——一个包含 `name` 和 `value` 属性的对象数组。

<code src="./demo/usage.tsx"></code>

### 数据格式

`BarsList` 期望的数据格式如下：

```tsx
export const data = [
  { name: 'React', value: 950000 },
  { name: 'Vue', value: 320000 },
  { name: 'Angular', value: 580000 },
  { name: 'Svelte', value: 145000 },
];
```

### 数值格式化

使用 `valueFormatter` 属性格式化条形旁显示的数值。该函数接收数值并返回字符串。

<code src="./demo/valueFormatter.tsx"></code>

### 标签

使用 `barsLabel` 和 `valueLabel` 属性在条形和数值上方显示列标题：

<code src="./demo/labels.tsx"></code>

### 条形间距

使用 `barGap` 属性控制条形之间的间距：

<code src="./demo/barGap.tsx"></code>

### 最小条形尺寸

使用 `minBarSize` 属性设置条形的最小宽度：

<code src="./demo/minBarSize.tsx"></code>

### 条形高度

使用 `barHeight` 属性控制条形的高度：

<code src="./demo/barHeight.tsx"></code>

### 条形颜色

使用 `barColor` 和 `barTextColor` 属性为所有条形设置默认背景和文本颜色：

<code src="./demo/barColor.tsx"></code>

### 自动对比度

设置 `autoContrast` 属性以根据背景色自动调整文本颜色：

<code src="./demo/autoContrast.tsx"></code>

### 自定义颜色

每个条形都可以通过数据中的 `color` 属性设置自己的颜色：

<code src="./demo/customColors.tsx"></code>

### 获取条形属性

使用 `getBarProps` 为每个条形元素传递额外属性。例如，可用于添加自定义样式或事件处理函数：

<code src="./demo/getBarProps.tsx"></code>

### 自定义条形渲染

使用 `renderBar` 完全自定义每个条形的渲染方式：

<code src="./demo/renderBar.tsx"></code>

## API {#api}

### BarsListProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据数组 | `DonutChartCellData[]` | — |
| withLabels | 是否显示标签 | `boolean` | `false` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| size | 图表尺寸 | `number | { width: number; height: number }` | `240` |
| color | 主题色 | `UIColor` | — |
| labelsColor | 标签颜色 | `UIColor` | — |
| labelsPosition | 标签位置 | `'left' | 'right'` | `'right'` |
| strokeWidth | 描边宽度 | `number` | `0` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
