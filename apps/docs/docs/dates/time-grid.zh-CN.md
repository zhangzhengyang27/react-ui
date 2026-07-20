---
category: Dates
title: TimeGrid
subtitle: 时间网格
description: react-ui TimeGrid 文档。
---


## 用法

使用 `TimeGrid` 组件，通过预定义的时间槽让用户选择时间：

<code src="./time-grid/demo/usage.tsx"></code>

## 受控

```tsx
import { useState } from 'react';
import { TimeGrid } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string | null>('10:00');
  return <TimeGrid value={value} onChange={setValue} data={['10:00', '12: 00']} />;
}
```

## data prop

`data` prop 接受 24 小时制的时间值数组。值必须唯一。
要生成时间范围，请使用从 `@react-ui/ui` 包导出的 `getTimeRange` 函数：

```tsx
import { TimeGrid, getTimeRange } from '@react-ui/ui';

function WithArray() {
  return <TimeGrid data={['10:00', '12:00']} />
}

function WithRange() {
  // 本示例生成从 10:00 到 14:00、步长为 1 小时的时间范围：
  // ['10:00', '11:00', '12:00', '13:00', '14:00']
  return <TimeGrid data={getTimeRange({ from: '10:00', to: '14:00', step: '01:00' })} />
}
```

## 最小和最大时间

设置 `minTime` 和 `maxTime` prop 来限制可选时间范围。
两个 prop 都接受 24 小时制时间值：

<code src="./time-grid/demo/minMax.tsx"></code>

## 禁用特定控件

你可以通过向 `disableTime` prop 提供一组禁用值来禁用特定时间：

<code src="./time-grid/demo/disableTime.tsx"></code>

## 允许取消选择

设置 `allowDeselect` prop，允许用户点击已选中控件来取消选择时间：

<code src="./time-grid/demo/allowDeselect.tsx"></code>

## 更改 AM/PM 标签

<code src="./time-grid/demo/amPmLabels.tsx"></code>

## 禁用状态

设置 `disabled` prop 以禁用所有控件：

<code src="./time-grid/demo/disabled.tsx"></code>
