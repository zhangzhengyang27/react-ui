---
category: X
title: Charts
subtitle: 图表
description: react-ui Charts 文档。
---

## 安装

`@xiaoye-react/charts` 基于 [recharts](https://recharts.org) 封装，安装时会自动带入：

<InstallScript packages="@xiaoye-react/charts"></InstallScript>

所有图表颜色走主题 token（如 `'indigo.6'`），深浅色模式下网格、轴、提示浮层的配色自动跟随。

## AreaChart

面积图：`data` 为对象数组，`dataKey` 指定 x 轴字段，`series[].name` 对应 y 轴字段。

<code src="./charts/demo/usage.tsx"></code>

## LineChart

折线图，`withDots` 显示端点圆点。

<code src="./charts/demo/line.tsx"></code>

## BarChart

柱状图，`stacked` 开启堆叠模式。

<code src="./charts/demo/bar.tsx"></code>

## DonutChart

环形图，数据为 `{ name, value, color }` 数组，`innerRadius` 控制内圈占比。

<code src="./charts/demo/donut.tsx"></code>

## Sparkline

迷你走势图：无轴无提示，用于卡片瓦片等小空间。手写 SVG 实现（单调三次插值平滑），`withAreaFill` 填充面积。

<code src="./charts/demo/sparkline.tsx"></code>

## API

### 通用属性（AreaChart / LineChart / BarChart）

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `data` | `Record<string, any>[]` | 数据源 |
| `dataKey` | `string` | x 轴（分类）字段名 |
| `series` | `{ name: string; color: string }[]` | y 轴字段 + 主题颜色 token |
| `h` | `number \| string` | 图表高度，默认 `280` |
| `curveType` | `'monotone' \| 'linear' \| 'natural' \| 'step'` 等 | 曲线类型，默认 `'monotone'` |
| `withDots` | `boolean` | 端点圆点，默认 `false` |
| `withLegend` | `boolean` | 图例，默认 `false` |
| `withXAxis` / `withYAxis` | `boolean` | 是否显示坐标轴，默认 `true` |
| `unit` | `string` | 提示浮层数值后缀 |
| `formatter` | `(value) => string` | 提示浮层数值格式化 |

### DonutChart

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `data` | `{ name: string; value: number; color: string }[]` | 数据源 |
| `innerRadius` | `number` | 内圈半径百分比，默认 `60` |
| `paddingAngle` | `number` | 扇区间隔角度，默认 `0` |

### Sparkline

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `data` | `number[]` | 数值序列 |
| `color` | `string` | 颜色 token，默认主题主色 |
| `strokeWidth` | `number` | 描边宽度（非缩放），默认 `2` |
| `withAreaFill` | `boolean` | 是否填充面积，默认 `false` |
| `curveType` | `'linear' \| 'monotone'` | 默认 `'monotone'` |
