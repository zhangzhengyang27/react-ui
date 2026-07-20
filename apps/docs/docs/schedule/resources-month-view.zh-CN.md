---
category: Schedule
title: ResourcesMonthView
subtitle: 资源月视图
description: react-ui ResourcesMonthView 文档。
---


## 用法

ResourcesMonthView 显示一个月网格，每个日期单元格包含资源通道。
事件显示在其资源的通道内，便于查看整个月的资源利用情况。

<code src="./resources-month-view/demo/usage.tsx"></code>

## 静态模式

设置 `mode="static"` 以禁用所有交互。

<code src="./resources-month-view/demo/staticMode.tsx"></code>

## 拖拽

使用 `withEventsDragAndDrop` prop 启用拖拽。`onEventDrop` 回调接收目标资源的 `resourceId`，允许你更新事件的资源分配。

<code src="./resources-month-view/demo/dragDrop.tsx"></code>

## 事件表单

点击日期单元格创建新事件，或点击现有事件编辑它。使用 `withDragSlotSelect`
和 `onSlotDragEnd` 允许通过跨日期单元格拖动来创建。`onSlotDragEnd` 回调包含拖动开始所在资源的 `resourceId`。

<code src="./resources-month-view/demo/eventForm.tsx"></code>

## 自定义事件渲染

使用 `renderEvent` prop 自定义事件渲染方式。以下示例使用 `HoverCard` 在悬停时显示事件详情。

<code src="./resources-month-view/demo/renderEvent.tsx"></code>

## 自定义资源标签

使用 `renderResourceLabel` prop 自定义行标题中资源标签的渲染方式。

<code src="./resources-month-view/demo/renderResourceLabel.tsx"></code>

## 资源分组

使用 `groups` prop 将资源分组到带标签的标题下。分组标签显示在资源标签左侧的列中，跨其资源垂直延伸。
使用 `renderGroupLabel` 自定义分组标签渲染，使用 `groupLabelWidth` 控制分组列宽度。

<code src="./resources-month-view/demo/resourceGroups.tsx"></code>

## 本地化

设置 `locale` prop 以更改语言。使用 `labels` prop 覆盖内置标签。

<code src="./resources-month-view/demo/localization.tsx"></code>

## 重复事件

ResourcesMonthView 会自动为可见月份展开重复事件。
详情请参见 [重复事件指南](/docs/schedule/recurring-events)。

<code src="./resources-month-view/demo/recurringEvents.tsx"></code>

## 每个单元格最大事件数

使用 `maxEventsPerTimeSlot` prop 限制每个单元格中可见的事件数量。
当事件超过限制时，会显示 "+more" 指示器。

<code src="./resources-month-view/demo/maxEventsPerTimeSlot.tsx"></code>

## 日期宽度和行高

使用 `dayWidth` 和 `rowHeight` prop 自定义日期列和资源行的尺寸。

<code src="./resources-month-view/demo/dayWidth.tsx"></code>

## 初始滚动日期

使用 `startScrollDate` prop 在初始渲染时滚动到特定日期。当月份包含很多天时，这很有用，例如让视图从今天开始显示。

<code src="./resources-month-view/demo/startScrollDate.tsx"></code>

## 隐藏周末

设置 `withWeekendDays={false}` 以从月网格中隐藏周末日期列。

<code src="./resources-month-view/demo/withoutWeekendDays.tsx"></code>

## 更多事件指示器

当日期单元格中的事件数量超过 `maxEventsPerTimeSlot` 时，会显示 "+X more" 指示器。
点击指示器可查看该天的所有事件。

<code src="./resources-month-view/demo/moreEvents.tsx"></code>

## 更多事件 props

使用 `moreEventsProps` 自定义更多事件下拉框，例如使用模态框代替 popover。

<code src="./resources-month-view/demo/moreEventsProps.tsx"></code>

## 自定义标题

设置 `withHeader={false}` 以隐藏默认标题，并使用 `ScheduleHeader` 构建带有导航控件的自定义标题。

<code src="./resources-month-view/demo/customHeader.tsx"></code>

## 圆角

<code src="./resources-month-view/demo/radius.tsx"></code>

## 滚动区域 props

使用 `scrollAreaProps` 自定义滚动区域行为。

<code src="./resources-month-view/demo/scrollAreaProps.tsx"></code>
