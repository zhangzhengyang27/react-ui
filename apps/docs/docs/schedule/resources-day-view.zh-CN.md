---
category: Schedule
title: ResourcesDayView
subtitle: 资源日视图
description: react-ui ResourcesDayView 文档。
---


## 用法

ResourcesDayView 将资源显示为行，将时间槽显示为列。每行代表一个资源（例如会议室、人员、设备），并通过事件数据上的 `resourceId` 属性显示分配给该资源的事件。

<code src="./resources-day-view/demo/usage.tsx"></code>

## 全天事件

跨越全天的事件（从 `00:00:00` 开始，到次日 `00:00:00` 结束）渲染为全宽条。前台全天事件固定在资源行顶部，多个时堆叠；`display: 'background'` 的全天事件会给整行着色。

<code src="./resources-day-view/demo/allDayEvents.tsx"></code>

## 时间范围和间隔

使用 `startTime`、`endTime` 和 `intervalMinutes` prop 控制可见时间范围和时间槽粒度。

<code src="./resources-day-view/demo/timeRange.tsx"></code>

## 多小时间隔

`intervalMinutes` 接受能整除一小时的值（例如 `15` 或 `30`）或整小时数（例如 `120` 或 `240`）。多小时间隔会渲染更宽的列，每列跨越数小时，这对于紧凑地显示长时间范围很有用。

<code src="./resources-day-view/demo/multiHourIntervals.tsx"></code>

## 初始滚动时间

使用 `startScrollTime` prop 将初始水平滚动位置设置到特定时间。值应为 `HH:mm:ss` 格式。

<code src="./resources-day-view/demo/startScrollTime.tsx"></code>

## 槽宽和行高

使用 `slotWidth` 控制每个时间槽列的宽度，使用 `rowHeight` 控制每个资源行的高度。

<code src="./resources-day-view/demo/slotWidth.tsx"></code>

## 自定义资源标签

使用 `renderResourceLabel` prop 自定义左侧列中资源标签的渲染。

<code src="./resources-day-view/demo/renderResourceLabel.tsx"></code>

## 资源分组

使用 `groups` prop 将资源分组到带标签的标题下。分组标签显示在资源标签左侧的列中，跨其资源垂直延伸。
使用 `renderGroupLabel` 自定义分组标签渲染，使用 `groupLabelWidth` 控制分组列宽度。

<code src="./resources-day-view/demo/resourceGroups.tsx"></code>

## 自定义事件渲染

使用 `renderEvent` prop 完全自定义事件渲染。

<code src="./resources-day-view/demo/renderEvent.tsx"></code>

## 拖拽

使用 `withEventsDragAndDrop` prop 启用跨资源拖拽。`onEventDrop` 回调接收目标 `resourceId` 作为第五个参数，允许你更新事件的资源分配。

<code src="./resources-day-view/demo/dragDrop.tsx"></code>

## 外部拖拽

你可以使用 `onExternalEventDrop` prop 将外部项目拖放到调度组件上。

<code src="./resources-day-view/demo/externalDragDrop.tsx"></code>

## 双向拖拽

事件可以在调度组件内部和外部区域之间拖动。

<code src="./resources-day-view/demo/bidirectionalDragDrop.tsx"></code>

## 事件调整大小

使用 `withEventResize` prop 启用事件调整大小。事件可以通过拖动其左边缘或右边缘来调整大小。

<code src="./resources-day-view/demo/eventResize.tsx"></code>

## 事件表单

点击时间槽或拖动选择范围以创建新事件。点击现有事件以编辑它。

<code src="./resources-day-view/demo/eventForm.tsx"></code>

## 工作时间

使用 `highlightBusinessHours` prop 在视觉上区分工作时间和非工作时间，覆盖所有时间槽列。

<code src="./resources-day-view/demo/businessHours.tsx"></code>

## 当前时间指示器

使用 `withCurrentTimeIndicator` 在当前时间显示一条线。设置 `withCurrentTimeBubble={false}` 以隐藏时间气泡标签。

<code src="./resources-day-view/demo/currentTimeIndicator.tsx"></code>

## 事件权限

使用 `canDragEvent` 和 `canResizeEvent` 控制哪些事件可以被拖动或调整大小。
`payload.locked` 设置为 `true` 的事件无法移动或调整大小。

<code src="./resources-day-view/demo/permissions.tsx"></code>

## 重复事件

ResourcesDayView 会自动为可见日期展开重复事件。
详情请参见 [重复事件指南](/docs/schedule/recurring-events)。

<code src="./resources-day-view/demo/recurringEvents.tsx"></code>

## 每个时间槽最大事件数

使用 `maxEventsPerTimeSlot` prop 限制每个时间槽中可见的重叠事件数量。
当事件超过限制时，会显示 "+N more" 指示器。点击指示器会打开一个显示该组所有事件的 popover。使用 `moreEventsProps` 自定义 popover 行为。

<code src="./resources-day-view/demo/maxEventsPerTimeSlot.tsx"></code>

## 圆角

<code src="./resources-day-view/demo/radius.tsx"></code>

## 滚动区域 props

使用 `scrollAreaProps` 自定义滚动区域，例如增大滚动条大小和偏移滚动条。

<code src="./resources-day-view/demo/scrollAreaProps.tsx"></code>

## 本地化

使用 `locale` prop 更改日期格式化 locale，使用 `slotLabelFormat` 更改时间格式，
使用 `labels` 覆盖 UI 标签。

<code src="./resources-day-view/demo/localization.tsx"></code>

## 静态模式

设置 `mode="static"` 以禁用所有交互。事件和时间槽变为非交互式，适用于仅展示视图。

<code src="./resources-day-view/demo/staticMode.tsx"></code>
