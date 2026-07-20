---
category: Schedule
title: WeekView
subtitle: 周视图
description: react-ui WeekView 文档。
---


## 用法

WeekView 显示整周的事件，按时间槽排列。它支持全天事件、重叠事件、拖拽、自定义时间范围等。

<code src="./week-view/demo/usage.tsx"></code>

## 受控日期

使用 `date` 和 `onDateChange` prop 从外部控制 WeekView 显示的日期。

<code src="./week-view/demo/controlledDate.tsx"></code>

## 时间范围

使用 `startTime` 和 `endTime` prop 设置可见时间范围。时间应为 `HH:mm:ss` 格式。

<code src="./week-view/demo/timeRange.tsx"></code>

## 初始滚动时间

使用 `startScrollTime` prop 将初始滚动位置设置到特定时间。
值应为 `HH:mm:ss` 格式。当你希望视图打开时显示特定时间（例如工作时间开始）而不是午夜时，这很有用。

<code src="./week-view/demo/startScrollTime.tsx"></code>

## 间隔分钟数

`intervalMinutes` prop 控制时间槽的粒度。默认值为 `60` 分钟。

<code src="./week-view/demo/intervalMinutes.tsx"></code>

## 亚小时网格线

默认情况下，`WeekView` 为每个时间槽显示一条网格线。当 `intervalMinutes` 小于 `60` 时，设置 `withSubHourGridLines={false}` 以每小时只显示一条网格线，同时保留较小间隔用于创建和调整事件。这有助于实现类似 Google Calendar 的布局：事件吸附到 15 或 30 分钟增量，但网格保持每小时的简洁线条。

<code src="./week-view/demo/subHourGridLines.tsx"></code>

## 每周第一天

设置 `firstDayOfWeek` 以控制每周从哪一天开始。0 是星期日，1 是星期一（默认），依此类推。

<code src="./week-view/demo/firstDayOfWeek.tsx"></code>

## 工作日格式

使用 `weekdayFormat` prop 自定义工作日名称显示。它接受 dayjs 格式字符串。

<code src="./week-view/demo/weekdayFormat.tsx"></code>

## 隐藏周末

设置 `withWeekendDays={false}` 以隐藏星期六和星期日列。

<code src="./week-view/demo/withoutWeekendDays.tsx"></code>

## 高亮今天

设置 `highlightToday` 以在视觉上区分今天的列：

<code src="./week-view/demo/highlightToday.tsx"></code>

## 隐藏周数

设置 `withWeekNumber={false}` 以隐藏左上角的周数。

<code src="./week-view/demo/withoutWeekNumber.tsx"></code>

## 当前时间指示器

设置 `withCurrentTimeIndicator` 以在今天的列上显示一条指示当前时间的线。

<code src="./week-view/demo/currentTimeIndicator.tsx"></code>

## 强制当前时间指示器

设置 `forceCurrentTimeIndicator` 以即使在查看不同周时，也在相同的星期几上显示当前时间指示器。这有助于让用户感知当前时间相对于其日程的位置。

<code src="./week-view/demo/forceCurrentTimeIndicator.tsx"></code>

## 不同时区的当前时间指示器

`@react-ui/schedule` 使用时区无关的 `YYYY-MM-DD HH:mm:ss` 字符串，并且不执行任何时区转换。默认情况下，当前时间指示器根据用户本地时间定位。

要在不同时区显示指示器，请使用 `getCurrentTime` prop。它是一个返回当前时间的函数，并在每次 tick 时被调用，因此指示器会自动持续更新。在以下示例中，当前时间使用 [dayjs timezone 插件](https://day.js.org/docs/en/plugin/timezone) 转换为所选时区——切换时区以查看指示器和时间气泡移动到相应的日期和位置：

<code src="./week-view/demo/timezone.tsx"></code>

## 无全天槽

设置 `withAllDaySlots={false}` 以隐藏顶部的全天事件区域。

<code src="./week-view/demo/withoutAllDaySlots.tsx"></code>

## 全天事件

全天事件显示在周视图顶部的单独区域中。跨越午夜或覆盖全天的事件会自动放置在此区域中。

<code src="./week-view/demo/allDayEvents.tsx"></code>

## 无标题

设置 `withHeader={false}` 以隐藏标题控件。

<code src="./week-view/demo/withoutHeader.tsx"></code>

## 视图变化回调

使用 `onViewChange` 回调，当用户从标题下拉菜单选择不同视图时获得通知。

<code src="./week-view/demo/viewChange.tsx"></code>

## 自定义标题

你可以使用 `ScheduleHeader` 复合组件结合你自己的控件构建自定义标题。
在视图上设置 `withHeader={false}` 并在外部组合标题。

<code src="./week-view/demo/customHeader.tsx"></code>

## 周标签格式

使用 `weekLabelFormat` prop 自定义标题中的周范围显示。

<code src="./week-view/demo/weekLabelFormat.tsx"></code>

## 槽标签格式

`slotLabelFormat` prop 控制时间标签的格式。

<code src="./week-view/demo/slotLabelFormat.tsx"></code>

## 槽高度

使用 `slotHeight` 和 `allDaySlotHeight` prop 自定义时间槽和全天区域的高度。

<code src="./week-view/demo/slotHeight.tsx"></code>

## 圆角

使用 `radius` prop 自定义事件的边框半径。

<code src="./week-view/demo/radius.tsx"></code>

## 工作时间

使用 `highlightBusinessHours` 和 `businessHours` prop 在视觉上区分工作时间。

<code src="./week-view/demo/businessHours.tsx"></code>

## 每日工作时间

向 `businessHours` 传递一个对象，以单独配置每周每一天的范围。
键是日期编号（`0` – 星期日，`6` – 星期六）。对象中缺失或设置为 `null` 的日期被标记为完全在工作时间之外：

<code src="./week-view/demo/businessHoursPerDay.tsx"></code>

## 自定义时间槽 props

使用 `getTimeSlotProps` 根据时间范围向单个时间槽添加自定义 props。
该函数接收 `{ start, end }` 日期时间字符串，格式为 `YYYY-MM-DD HH:mm:ss`，
并应返回一个要展开到槽元素上的 props 对象，或 `undefined`。

这对于在不同于默认 9:00–17:00 的自定义范围上设置 `data-business-hours`，或向特定槽附加自定义事件处理程序很有用。
`getTimeSlotProps` 返回的事件处理程序（如 `onClick`）与内部处理程序（`onTimeSlotClick`）组合——两者都会触发，不会互相覆盖。

<code src="./week-view/demo/getTimeSlotProps.tsx"></code>

## 重叠事件

当多个事件在时间上重叠时，它们会自动并排定位。

<code src="./week-view/demo/overlappingEvents.tsx"></code>

## 拖拽

通过设置 `withDragDrop` prop 启用拖拽。事件可以拖动到不同的日期和时间。

<code src="./week-view/demo/dragDrop.tsx"></code>

## 限制可拖动事件

使用 `canDragEvent` 回调控制哪些事件可以被拖动。
返回 `false` 的事件将不可拖动。

<code src="./week-view/demo/canDragEvent.tsx"></code>

## 外部拖拽

使用 `onExternalEventDrop` 允许从组件外部拖动项目到调度组件中。外部项目必须在其 `onDragStart` 期间在 `dataTransfer` 中设置数据。
回调接收 `DataTransfer` 对象和放下目标日期时间。

<code src="./week-view/demo/externalDragDrop.tsx"></code>

## 双向拖拽

将 `onExternalEventDrop` 与 `withEventsDragAndDrop` 结合使用以启用双向拖拽。从侧边栏拖动的项目会从列表中移除并添加到调度组件中。从调度组件拖回侧边栏的事件会从调度组件中移除。事件被拖动时，调度组件会在 `dataTransfer` 中设置 `application/json` 和 `{ eventId }`，侧边栏放置区读取该数据以识别事件。

<code src="./week-view/demo/bidirectionalDragDrop.tsx"></code>

## 事件调整大小

通过设置 `withEventResize` prop 启用事件调整大小。用户可以拖动事件的顶部或底部边缘来调整开始或结束时间。使用 `onEventResize` 回调处理调整大小。使用 `canResizeEvent` 控制哪些事件可以调整大小。

<code src="./week-view/demo/eventResize.tsx"></code>

## 限制可调整大小事件

使用 `canResizeEvent` 回调控制哪些事件可以被调整大小。
返回 `false` 的事件不会显示调整大小手柄。

<code src="./week-view/demo/canResizeEvent.tsx"></code>

## 完全自定义事件

使用 `renderEvent` prop 完全自定义事件渲染。该函数接收事件数据作为第一个参数，以及所有将传递给事件根元素的 props（包括 children）作为第二个参数，允许你将事件包装在自定义组件中，如 HoverCard、Tooltip 或自定义包装器。

<code src="./week-view/demo/renderEvent.tsx"></code>

## 自定义事件内容

使用 `renderEventBody` prop 自定义事件内部内容而不替换事件包装器。这对于添加图标、额外文本或自定义布局很有用。

<code src="./week-view/demo/renderEventBody.tsx"></code>

## 重复事件

WeekView 会自动为可见周展开重复事件。
完整文档请参阅 [重复事件指南](/docs/schedule/recurring-events)。

<code src="./week-view/demo/recurringEvents.tsx"></code>

## 背景事件

将事件的 `display` 设置为 `"background"` 可将其渲染为全宽、半透明、非交互的块，位于常规事件后方。背景事件适用于标记不可用时间、午餐休息、专注时间或其他被阻止的时段。

<code src="./week-view/demo/backgroundEvents.tsx"></code>

## 自定义背景事件样式并阻止拖拽

使用 Styles API 自定义背景事件外观，并防止将常规事件拖放到被阻止的时间范围内。此示例使用对角红线表示整周的午餐休息，并拒绝与背景事件重叠的拖放。

<code src="./week-view/demo/backgroundEventsCustomStyle.tsx"></code>

## 议程视图

设置 `withAgenda` prop 以在标题中显示 "Agenda" 按钮。点击后，会打开一个 `AgendaView`，以列表形式显示当前周的事件。

<code src="./week-view/demo/withAgenda.tsx"></code>

## 静态模式

设置 `mode="static"` 以禁用所有交互。

<code src="./week-view/demo/staticMode.tsx"></code>

## 本地化

使用 `locale` prop 设置日期格式化的 dayjs locale。
结合 `labels` prop 以翻译所有 UI 文本。

<code src="./week-view/demo/localization.tsx"></code>

## 创建和更新事件

设置 `withDragSlotSelect` prop 以允许用户跨时间槽拖动选择时间范围。
拖动结束时，`onSlotDragEnd` 回调会被调用并传入范围的开始和结束日期。
拖动被限制在单日列内。结合 `onTimeSlotClick`、`onAllDaySlotClick` 和 `onEventClick` 回调，这可以实现完整的事件创建和编辑体验。

<code src="./week-view/demo/eventForm.tsx"></code>

## 响应式样式

WeekView 使用 [@container queries](https://caniuse.com/css-container-queries) 实现响应式样式。
组件会根据容器宽度自动调整布局，在小屏幕上隐藏标签并减少内边距。所有现代浏览器都支持容器查询。

## 无障碍

### 焦点管理

在 WeekView 组件中，焦点管理旨在提供高效的键盘导航体验：

- 工作日行、全天槽行和时间槽网格各自的第一个元素都在 tab 顺序中（`tabIndex={0}`）
- 所有其他元素的 `tabIndex={-1}`，只能通过方向键导航到达
- 这种方法减少了在调度组件中导航时的 tab 停靠点数量

### 键盘交互

工作日行：

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一个工作日', }, { key: 'ArrowLeft', description: '聚焦上一个工作日', }, ]}></KeyboardEventsTable>

全天槽（启用时）：

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一个全天槽', }, { key: 'ArrowLeft', description: '聚焦上一个全天槽', }, { key: 'ArrowDown', description: '聚焦同一天第一个时间槽', }, ]}></KeyboardEventsTable>

时间槽：

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一天的同一时间槽', }, { key: 'ArrowLeft', description: '聚焦上一天的同一时间槽', }, { key: 'ArrowDown', description: '聚焦同一天下一个时间槽', }, { key: 'ArrowUp', description: '聚焦上一个时间槽（如果在第一个时间槽且全天槽启用，则聚焦全天槽）', }, ]}></KeyboardEventsTable>

### 槽标签

每个时间槽按钮都有一个 `aria-label` 属性，包含完整的槽信息，包括日期和时间范围（例如 "Time slot 2025-11-03 08:00:00 - 09:00:00"）。全天槽的标签如 "All day 2025-11-03"，工作日按钮的标签如 "Weekday 2025-11-03"。这为屏幕阅读器用户提供了每个元素的完整上下文。
