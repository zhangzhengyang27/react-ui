---
category: Dates
title: MiniCalendar
subtitle: 迷你日历
description: react-ui MiniCalendar 文档。
---


## 用法

<code src="./mini-calendar/demo/usage.tsx"></code>

## 天数

使用 `numberOfDays` prop 控制同时显示多少天。默认值为 `7`。

<code src="./mini-calendar/demo/numberOfDays.tsx"></code>

## getDayProps

使用 `getDayProps` 为日期添加自定义 props，例如为周末设置样式：

<code src="./mini-calendar/demo/getDayProps.tsx"></code>

## 最小和最大日期

使用 `minDate` 和 `maxDate` prop 限制日期选择范围：

<code src="./mini-calendar/demo/minMax.tsx"></code>

## 本地化

你可以在组件级别通过 `locale` prop 更改本地化设置，也可以在全局通过 [DatesProvider](/docs/dates/getting-started) 进行设置。

<code src="./mini-calendar/demo/locale.tsx"></code>

## 无障碍

使用 `nextControlProps` 和 `previousControlProps` 为导航按钮添加 `aria-label` 和其他 props：

```tsx
import { MiniCalendar } from '@xiaoye-react/dates';

function Demo() {
  return (
    <MiniCalendar
      nextControlProps={{ 'aria-label': '下一个范围' }}
      previousControlProps={{ 'aria-label': '上一个范围' }}
    />
  );
}
```
