---
category: Dates
title: DateTimePicker
subtitle: 日期时间选择器
description: react-ui DateTimePicker 文档。
---


## DatePicker 属性

`DateTimePicker` 支持大部分 [DatePicker](/docs/dates/date-picker/) 的 props。
请阅读 [DatePicker](/docs/dates/date-picker/) 文档以了解本页未列出的所有组件功能。

## 用法

<code src="./date-time-picker/demo/usage.tsx"></code>

## 范围

设置 `type="range"` 以选择日期和时间范围。在范围模式下，
会渲染开始时间和结束时间两个输入，下方显示范围摘要：

<code src="./date-time-picker/demo/range.tsx"></code>

## 带秒

<code src="./date-time-picker/demo/withSeconds.tsx"></code>

## 预设

使用 `presets` prop 添加自定义日期预设。预设显示在日历旁边：

<code src="./date-time-picker/demo/presets.tsx"></code>

## TimePicker 属性

你可以通过 `timePickerProps` prop 将 props 传递给底层的 [TimePicker](/docs/dates/time-picker/) 组件。
示例：启用下拉框并设置时间选择器为 `12h` 格式：

<code src="./date-time-picker/demo/timePickerProps.tsx"></code>

## 值格式

使用 `valueFormat` prop 更改值标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)：


`valueFormat` 也可以接受一个函数，该函数接收 `YYYY-MM-DD HH:mm:ss` 格式的值字符串，
并返回自定义格式化后的值。当日志格式逻辑无法用 dayjs 格式字符串表达时使用：

<code src="./date-time-picker/demo/format.tsx"></code>

<code src="./date-time-picker/demo/formatFunction.tsx"></code>

## 禁用状态

<code src="./date-time-picker/demo/disabled.tsx"></code>

## Input 属性

<code src="./date-time-picker/demo/configurator.tsx"></code>

## 可清除

设置 `clearable` prop 在右侧区域显示清除按钮。注意如果设置了 `rightSection` prop，清除按钮将不会显示。

<code src="./date-time-picker/demo/clearable.tsx"></code>

<code src="./date-time-picker/demo/clearSectionMode.tsx"></code>

## 在模态框中打开选择器

默认情况下，选择器在 [Popover](/components/popover/) 中渲染。
你可以通过设置 `dropdownType="modal"` 将其更改为 [Modal](/components/modal/)：

<code src="./date-time-picker/demo/modal.tsx"></code>

<InputFeatures component="DateTimePicker" element="button"></InputFeatures>

<ClearSectionMode></ClearSectionMode>

<GetElementRef component="DateTimePicker" refType="button" package="@react-ui/ui"></GetElementRef>

<InputAccessibility component="DateTimePicker" packageName="@react-ui/ui"></InputAccessibility>
