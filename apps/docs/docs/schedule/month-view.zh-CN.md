---
category: Schedule
title: MonthView
subtitle: 月视图
description: react-ui MonthView 文档。
---


## 用法

MonthView 以日历月网格形式展示事件。它在每个日期单元格中显示事件徽章，并支持拖拽。

<code src="./month-view/demo/usage.tsx"></code>

## 周数

设置 `withWeekNumbers` 以在第一列显示周数。

<code src="./month-view/demo/withWeekNumbers.tsx"></code>

## 隐藏工作日

设置 `withWeekDays={false}` 以隐藏工作日名称行。

<code src="./month-view/demo/withoutWeekDays.tsx"></code>

## 隐藏周末

设置 `withWeekendDays={false}` 以隐藏周末日期。网格会收缩至剩余列，
跨越隐藏日期的事件会被裁剪到可见日期范围内。哪些天被视为周末由 `weekendDays`
prop（或 [DatesProvider](/docs/dates/getting-started/#datesprovider)）控制，默认为 `[0, 6]`。

<code src="./month-view/demo/withoutWeekendDays.tsx"></code>

## 每周第一天

设置 `firstDayOfWeek` 以控制每周从哪一天开始。

<code src="./month-view/demo/firstDayOfWeek.tsx"></code>

## 工作日格式

使用 `weekdayFormat` prop 自定义工作日名称显示。

<code src="./month-view/demo/weekdayFormat.tsx"></code>

## 固定周数

设置 `consistentWeeks={false}` 以仅显示包含当前月份日期的周。

<code src="./month-view/demo/consistentWeeks.tsx"></code>

## 高亮今天

设置 `highlightToday={false}` 以禁用当前日期的高亮。

<code src="./month-view/demo/highlightToday.tsx"></code>

## 隐藏外部日期

设置 `withOutsideDays={false}` 以隐藏相邻月份的日期。

<code src="./month-view/demo/withoutOutsideDays.tsx"></code>

## 圆角

使用 `radius` prop 自定义事件的边框半径。

<code src="./month-view/demo/radius.tsx"></code>

## 无标题

设置 `withHeader={false}` 以隐藏标题控件。

<code src="./month-view/demo/withoutHeader.tsx"></code>

## 自定义标题

你可以使用 `ScheduleHeader` 复合组件结合你自己的控件构建自定义标题。
在视图上设置 `withHeader={false}` 并在外部组合标题。

<code src="./month-view/demo/customHeader.tsx"></code>

## 每天最大事件数

使用 `maxEventsPerDay` prop 控制每天显示多少事件后才会出现 "+more"
指示器。该值会被限制在 1 到 10 之间。日期单元格高度会自动调整。

<code src="./month-view/demo/maxEventsPerDay.tsx"></code>

## 更多事件

当某天事件较多时，组件会显示 "More events" 指示器。

<code src="./month-view/demo/manyEvents.tsx"></code>

## 拖拽

启用拖拽以在日期之间移动事件。

<code src="./month-view/demo/dragDrop.tsx"></code>

## 外部拖拽

使用 `onExternalEventDrop` 允许从组件外部拖动项目到调度组件中。外部项目必须在其 `onDragStart` 期间在 `dataTransfer` 中设置数据。
回调接收 `DataTransfer` 对象和放下目标日期时间。

<code src="./month-view/demo/externalDragDrop.tsx"></code>

## 双向拖拽

将 `onExternalEventDrop` 与 `withEventsDragAndDrop` 结合使用以启用双向拖拽。从侧边栏拖动的项目会从列表中移除并添加到调度组件中。从调度组件拖回侧边栏的事件会从调度组件中移除。事件被拖动时，调度组件会在 `dataTransfer` 中设置 `application/json` 和 `{ eventId }`，侧边栏放置区读取该数据以识别事件。

<code src="./month-view/demo/bidirectionalDragDrop.tsx"></code>

## 完全自定义事件

使用 `renderEvent` prop 完全自定义事件渲染。该函数接收事件数据作为第一个参数，以及所有将传递给事件根元素的 props（包括 children）作为第二个参数，允许你将事件包装在自定义组件中，如 HoverCard、Tooltip 或自定义包装器。

<code src="./month-view/demo/renderEvent.tsx"></code>

## 定时事件

使用 `renderEvent` 以视觉方式区分全天事件和定时事件。全天事件渲染为常规彩色条，而定时事件显示为带开始时间和标题的彩色圆点。

<code src="./month-view/demo/timedEvents.tsx"></code>

## 重复事件

MonthView 会自动为可见月份展开重复事件。
完整文档请参阅 [重复事件指南](/docs/schedule/recurring-events)。

<code src="./month-view/demo/recurringEvents.tsx"></code>

## 背景事件

将事件的 `display` 设置为 `"background"` 可将其渲染为全宽、半透明、非交互的块，位于常规事件后方。背景事件在月视图中跨越日期单元格的整个高度。

<code src="./month-view/demo/backgroundEvents.tsx"></code>

## 议程视图

设置 `withAgenda` prop 以在标题中显示 "Agenda" 按钮。点击后，会打开一个 `AgendaView`，以列表形式显示当前月份的事件。

<code src="./month-view/demo/withAgenda.tsx"></code>

## 静态模式

设置 `mode="static"` 以禁用所有交互。

<code src="./month-view/demo/staticMode.tsx"></code>

## 本地化

使用 `locale` prop 设置日期格式化的 dayjs locale。
结合 `labels` prop 以翻译所有 UI 文本。

<code src="./month-view/demo/localization.tsx"></code>

## 创建和更新事件

设置 `withDragSlotSelect` prop 以允许用户跨日期单元格拖动选择日期范围。
拖动结束时，`onSlotDragEnd` 回调会被调用并传入范围的开始和结束日期。
结合 `onDayClick` 和 `onEventClick` 回调，这可以实现完整的事件创建和编辑体验。

<code src="./month-view/demo/eventForm.tsx"></code>

## 响应式样式

MonthView 使用 [@container queries](https://caniuse.com/css-container-queries) 实现响应式样式。
组件会根据容器宽度自动调整布局，在小屏幕上隐藏标签并减少内边距。所有现代浏览器都支持容器查询。

## 无障碍

### 焦点管理

在 MonthView 组件中，焦点管理旨在提供高效的键盘导航体验：

- 月份视图中只有第一天包含在 tab 顺序中（`tabIndex={0}`）
- 所有其他日期的 `tabIndex={-1}`，只能通过方向键导航到达
- 当 `withOutsideDays` 为 `true` 时，相邻月份的日期可以使用方向键导航
- 禁用日期在键盘导航中会被跳过

这种方法减少了在日历中导航时的 tab 停靠点数量，使键盘用户能够更快地浏览视图，同时仍然允许通过方向键完整访问所有日期。

### 键盘交互

请注意，以下事件仅在焦点位于日期控件上时触发。

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一个非禁用日期', }, { key: 'ArrowLeft', description: '聚焦上一个非禁用日期', }, { key: 'ArrowDown', description: '聚焦下周的同一天', }, { key: 'ArrowUp', description: '聚焦上周的同一天', }, ]}></KeyboardEventsTable>

### 日期标签

每个日期按钮都有一个 `aria-label` 属性，格式为 "Month Day, Year"（例如 "November 15, 2025"）。这为屏幕阅读器用户提供了完整的日期信息。
