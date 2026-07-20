---
category: Dates
title: InlineDateTimePicker
subtitle: 内联日期时间选择器
description: react-ui InlineDateTimePicker 文档。
---


## DatePicker 属性

`InlineDateTimePicker` 支持大部分 [DatePicker](/docs/dates/date-picker/) 的 props。
请阅读 [DatePicker](/docs/dates/date-picker/) 文档以了解本页未列出的所有组件功能。

## 用法

`InlineDateTimePicker` 以内联方式渲染日历和时间选择器，不带下拉框。
它结合了 [DatePicker](/docs/dates/date-picker/) 和 [TimePicker](/docs/dates/time-picker/) 组件：

<code src="./inline-date-time-picker/demo/usage.tsx"></code>

## 带秒

设置 `withSeconds` prop，在时间选择器中显示秒输入：

<code src="./inline-date-time-picker/demo/withSeconds.tsx"></code>

## 范围

设置 `type="range"` 以选择日期和时间范围。在范围模式下，
两个时间输入并排显示，时间输入下方显示范围摘要：

<code src="./inline-date-time-picker/demo/range.tsx"></code>

## 受控范围

<code src="./inline-date-time-picker/demo/rangeControlled.tsx"></code>

## 值格式

使用 `valueFormat` prop 更改范围预览的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./inline-date-time-picker/demo/format.tsx"></code>
