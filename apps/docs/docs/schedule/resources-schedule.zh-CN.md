---
category: Schedule
title: ResourcesSchedule
subtitle: 资源调度
description: react-ui ResourcesSchedule 文档。
---


## 用法

`ResourcesSchedule` 是一个包装组件，它将 `ResourcesDayView`、`ResourcesWeekView` 和 `ResourcesMonthView`
组合成一个支持视图切换的单一组件。它管理当前视图和日期状态，并自动将通用 props 传递给三个视图。

<code src="./resources-schedule/demo/usage.tsx"></code>

## 受控状态

你可以使用 `date`/`onDateChange` 和 `view`/`onViewChange` prop 控制当前日期和视图层级。

<code src="./resources-schedule/demo/controlled.tsx"></code>

## 拖拽

使用 `withEventsDragAndDrop` prop 在所有视图中启用拖拽。

<code src="./resources-schedule/demo/dragDrop.tsx"></code>

## 周视图

设置 `defaultView="week"` 以默认在周视图中打开调度组件。

<code src="./resources-schedule/demo/weekView.tsx"></code>

## 视图特定 props

使用 `dayViewProps`、`weekViewProps` 和 `monthViewProps` 向每个视图传递特定 props。

<code src="./resources-schedule/demo/viewProps.tsx"></code>

## 事件表单

点击时间槽、日期单元格或现有事件以打开事件表单。该表单在日、周、月视图中均可使用，并支持自动视图切换。

<code src="./resources-schedule/demo/eventForm.tsx"></code>

## 外部拖拽

你可以使用 `onExternalEventDrop` prop 将外部项目拖放到调度组件上。回调接收目标资源的 `resourceId`。

<code src="./resources-schedule/demo/externalDragDrop.tsx"></code>

## 事件调整大小

使用 `withEventResize` prop 启用事件调整大小。事件调整大小在日视图和周视图中可用，可以通过拖动事件的左边缘或右边缘来调整大小。在周视图中，调整大小被限制在事件所在的那一天。

<code src="./resources-schedule/demo/eventResize.tsx"></code>

## 静态模式

设置 `mode="static"` 以禁用所有三个视图中的所有交互。

<code src="./resources-schedule/demo/staticMode.tsx"></code>
