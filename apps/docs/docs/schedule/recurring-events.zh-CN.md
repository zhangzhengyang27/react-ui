---
category: Schedule
title: RecurringEvents
subtitle: 重复事件
description: react-ui RecurringEvents 文档。
---

## 重复事件

`@xiaoye-react/schedule` 支持通过 [RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545)
重复规则实现重复事件（由 [rrule](https://github.com/jkbrzt/rrule) 库提供支持）。

共有三种事件形态：

1. **Series event** – 具有包含 `rrule` 字符串的 `recurrence` 字段
2. **Override event** – 具有 `recurringEventId` + `recurrenceId`，用于替换某个生成的单次出现
3. **One-off event** – 不包含任何重复字段（常规事件）

## 系列事件

Series event 通过 `recurrence.rrule` 定义重复规则。你可以可选地添加
`recurrence.exdate` 来排除特定出现，以及 `recurrence.dtstart` 来设置显式的系列开始日期（默认为 `start`）。

常见的 rrule 模式：

- `FREQ=DAILY;COUNT=10` – 每天，共 10 次
- `FREQ=WEEKLY;BYDAY=MO,WE,FR` – 每周一、三、五
- `FREQ=MONTHLY;BYMONTHDAY=15` – 每月 15 日
- `FREQ=YEARLY;COUNT=5` – 每年一次，共 5 次

```tsx
const event = {
  id: 'weekly-series',
  title: 'Weekly planning',
  start: '2024-01-15 10:00:00',
  end: '2024-01-15 11:00:00',
  color: 'blue',
  recurrence: {
    rrule: 'FREQ=WEEKLY;BYDAY=MO,WE;COUNT=16',
    exdate: ['2024-01-17 10:00:00'],
  },
};
```

## 覆盖事件

Override event 用于替换系列中的某个单次生成出现。
使用 `recurringEventId` 指向系列，使用 `recurrenceId` 标识要替换哪次出现（格式为与原始开始时间匹配的 `YYYY-MM-DD HH:mm:ss`）：

```tsx
const override = {
  id: 'weekly-series-override',
  title: 'Weekly planning (moved)',
  start: '2024-01-17 16:00:00',
  end: '2024-01-17 17:00:00',
  color: 'grape',
  recurringEventId: 'weekly-series',
  recurrenceId: '2024-01-17 10:00:00',
};
```

## 渲染工作原理

每个视图仅为其可见日期范围展开重复事件：

1. 解析 `rrule` 字符串并生成范围内的出现开始时间
2. 移除与 `exdate` 条目匹配的出现
3. 用 override event 替换匹配的出现
4. 与一次性事件合并并渲染

生成的实例包含一个 `recurringInstance` 元数据对象，其中包含：

- `isRecurringInstance` – 对于生成的事件始终为 `true`
- `recurringEventId` – 父系列 id
- `recurrenceId` – 出现标识符
- `originalStart` / `originalEnd` – 在任何 override 之前的出现日期

## expandRecurringEvents 工具函数

你可以直接使用 `expandRecurringEvents` 工具函数进行自定义逻辑：

```tsx
import { expandRecurringEvents } from '@xiaoye-react/schedule';

const expanded = expandRecurringEvents({
  events,
  rangeStart: '2024-01-15 00:00:00',
  rangeEnd: '2024-01-21 23:59:59',
  expansionLimit: 2000, // 可选，默认 2000
});
```

## recurrenceExpansionLimit prop

所有视图都接受 `recurrenceExpansionLimit` prop（默认 `2000`），用于限制每个重复系列生成的实例数量。这可以防止无界重复规则（例如没有 `COUNT` 或 `UNTIL` 的 `FREQ=DAILY`）导致的性能问题。
注意该限制独立应用于每个系列，因此包含多个无界系列的调度组件最多可能生成 `limit × 系列数量` 个总实例。

## Schedule 示例

<code src="./recurring-events/demo/recurringEvents.tsx"></code>

## DayView 示例

## WeekView 示例

## MonthView 示例

## YearView 示例
