---
category: Schedule
title: AgendaView
subtitle: 议程视图
description: react-ui AgendaView 文档。
---


## 用法

`AgendaView` 渲染指定时间段内的事件垂直列表。事件按日期分组，按时间顺序排列，并为每组显示日期标题。

<code src="./agenda-view/demo/usage.tsx"></code>

## 全天和多天事件

定时事件显示其时间范围，全天事件显示 "All day" 标签，多天事件会出现在它们跨越的每个日期上。

<code src="./agenda-view/demo/allDayAndMultiday.tsx"></code>

## 日期格式

使用 `headerFormat` 控制标题中的范围标签，使用 `dateHeaderFormat` 控制每个日期组的标题。
两者都接受 [dayjs 格式字符串](https://day.js.org/docs/en/display/format) 或回调函数。

<code src="./agenda-view/demo/dateFormats.tsx"></code>

## 自定义事件渲染

使用 `renderEvent` 完全自定义每行事件的渲染方式。回调接收事件数据和你应该展开到包装元素上的默认根 props。

<code src="./agenda-view/demo/renderEvent.tsx"></code>

## 事件点击

使用 `onEventClick` 处理事件交互。以下示例在点击事件时打开一个显示事件详情的模态框。

<code src="./agenda-view/demo/eventClick.tsx"></code>

## 本地化

设置 `locale` 以翻译日期标题，并传递 `labels` 以覆盖 "All day" 和 "No events" 等内置字符串。

<code src="./agenda-view/demo/localization.tsx"></code>

## 静态模式

设置 `mode="static"` 以禁用所有事件交互。在静态模式下，事件不可点击。

<code src="./agenda-view/demo/staticMode.tsx"></code>
