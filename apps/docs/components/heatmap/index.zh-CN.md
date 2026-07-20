---
category: Components
title: Heatmap
subtitle: 热力图
description: react-ui Heatmap 热力图组件。
group:
  title: 图表
  order: 9
---

## 何时使用 {#when-to-use}

Heatmap 以日历形式展示数据密度，常用于展示活动频率、访问量等随时间变化的数据。

## 代码演示 {#examples}

### 用法

`Heatmap` 用于以表格形式展示数据，其中每一列代表一周。唯一必需的属性是 `data`——一个键为 `YYYY-MM-DD` 格式日期、值为数字的对象。

`startDate` 和 `endDate` 属性为可选，用于定义热图范围。如果未设置，热图会显示最近一年的数据。

<code src="./demo/usage.tsx"></code>

### 数据格式

`Heatmap` 期望的数据格式如下：

```tsx
export const data = {
  '2025-02-14': 2,
  '2025-02-11': 3,
  '2025-02-06': 4,
  '2025-02-05': 1,
  '2025-02-03': 2,
  '2025-02-01': 2,
  '2025-01-31': 4,
  '2025-01-30': 2,
  // ...
};
```

### 带提示框

设置 `withTooltip` 和 `getTooltipLabel` 属性，以在悬停 `Heatmap` 单元格时显示提示框。`getTooltipLabel` 会接收日期和值，并返回要在提示框中显示的字符串。

<code src="./demo/tooltip.tsx"></code>

### 更改颜色

可以使用 `colors` 属性更改 `Heatmap` 的颜色。它应为任意有效 CSS 颜色值（hex、rgba、CSS 变量等）的数组。默认情况下，`Heatmap` 使用 4 种颜色表示热度级别，但可传入任意数量的颜色。

<code src="./demo/colors.tsx"></code>

### 根据颜色方案改变颜色

如需根据颜色方案改变颜色，应在 `.css` 文件中定义这些颜色：


注意，在这种情况下，如果不传递 `colors` 属性，只能使用 4 种颜色。如果需要更多颜色，应手动传递给组件：

```tsx
import { Heatmap } from '@react-ui/ui';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      classNames={classes}
      colors={[
        'var(--heatmap-level-1)',
        'var(--heatmap-level-2)',
        'var(--heatmap-level-3)',
        'var(--heatmap-level-4)',
        'var(--heatmap-level-5)',
        'var(--heatmap-level-6)',
      ]}
    />
  );
}
```

<code src="./demo/cssColors.tsx"></code>

### 数值范围

默认情况下，`Heatmap` 会根据数据值计算范围，例如对于以下数据，范围将是 `[1, 4]`：


基于该范围，`Heatmap` 为每个矩形计算颜色：1 为最低热度级别，4 为最高热度级别。要手动指定范围，请使用 `domain` 属性。当数据未覆盖可能的完整取值范围时，这非常有用。例如，传递给热图的数据子集取值范围为 1 到 4，但实际范围为 1 到 10。此时，可将 `[1, 10]` 传给 `domain` 属性：

```tsx
const data = {
  '2025-02-14': 2,
  '2025-02-11': 3,
  '2025-02-06': 4,
  '2025-02-05': 1,
};
```

```tsx
import { Heatmap } from '@react-ui/ui';

const data = {
  '2025-02-14': 2,
  '2025-02-11': 3,
  '2025-02-06': 4,
  '2025-02-05': 1,
};

function Demo() {
  return <Heatmap data={data} domain={[1, 10]} />;
}
```

### 星期和月份标签

设置 `withMonthLabels` 和 `withWeekdayLabels` 属性以显示图表标签：

<code src="./demo/labels.tsx"></code>

### 更改标签文本

要更改标签，使用 `weekdayLabels` 和 `monthLabels` 属性。`weekdayLabels` 必须是一个包含 7 个字符串的数组，从周日开始依次排列星期名称。`monthLabels` 必须是一个包含 12 个字符串的数组，从一月开始依次排列月份名称。

<code src="./demo/labelsText.tsx"></code>

### 矩形大小、间距和圆角

<code src="./demo/rectSize.tsx"></code>

### 向矩形传递属性

使用 `getRectProps` 为每个矩形传递属性。例如，可用于为每个矩形添加 onClick 事件处理函数：

<code src="./demo/getRectProps.tsx"></code>

### 隐藏外部日期

<code src="./demo/withOutsideDates.tsx"></code>

### 每周第一天

默认每周第一天为周一；可使用 `firstDayOfWeek` 属性更改：

<code src="./demo/firstDayOfWeek.tsx"></code>

### 图例

设置 `withLegend` 以在热图下方显示颜色图例。使用 `legendLabels` 属性自定义标签（默认：`['Less', 'More']`）：

<code src="./demo/legend.tsx"></code>

### 按月份拆分

使用 `splitMonths` 可通过间隔列视觉上分隔月份，并在每列中仅显示属于当前月份的天数。启用 `splitMonths` 后，月份标签会向右偏移一列，且少于两周的月份不会显示标签。

<code src="./demo/splitMonths.tsx"></code>

## API {#api}

### HeatmapProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据对象，键为 YYYY-MM-DD 日期，值为数字 | `Record<string, number>` | `{}` |
| startDate | 起始日期 | `Date | string` | — |
| endDate | 结束日期 | `Date | string` | — |
| size | 图表尺寸 | `number | { width: number; height: number }` | — |
| color | 主题色 | `UIColor` | `'blue'` |
| withTooltip | 是否显示提示框 | `boolean` | `true` |
| spacing | 单元格间距 | `number` | `3` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
