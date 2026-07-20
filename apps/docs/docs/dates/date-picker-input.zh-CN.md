---
category: Dates
title: DatePickerInput
subtitle: 日期选择输入
description: react-ui DatePickerInput 文档。
---


## DatePicker 属性

`DatePickerInput` 支持大多数 [DatePicker](/docs/dates/date-picker/) props。
阅读 [DatePicker](/docs/dates/date-picker/) 文档以了解本页未列出的所有组件功能。

## 用法

<code src="./date-picker-input/demo/usage.tsx"></code>

## 多个日期

设置 `type="multiple"` 以允许用户选择多个日期：

<code src="./date-picker-input/demo/multiple.tsx"></code>

## 日期范围

设置 `type="range"` 以允许用户选择日期范围：

<code src="./date-picker-input/demo/range.tsx"></code>

## 预设

使用 `presets` prop 添加自定义日期预设。预设显示在日历旁边：


要在 `type="range"` 时使用 `presets`，请将值定义为两个日期的元组：

<code src="./date-picker-input/demo/presets.tsx"></code>

<code src="./date-picker-input/demo/presetsRange.tsx"></code>

## 在模态框中打开选择器

默认情况下，[DatePicker](/docs/dates/date-picker/) 在 [Popover](/components/popover/) 中渲染。
你可以通过设置 `dropdownType="modal"` 将其更改为 [Modal](/components/modal/)：

<code src="./date-picker-input/demo/modal.tsx"></code>

## 值格式

使用 `valueFormat` prop 更改值标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./date-picker-input/demo/valueFormat.tsx"></code>

## 值格式化器

`valueFormatter` 是 `valueFormat` prop 的更强大的替代方案。
它允许使用自定义函数格式化值标签。
该函数对所有组件类型（`default`、`multiple` 和 `range`）都相同——你需要在函数内部执行额外的检查来处理不同类型。

将自定义格式化函数与 `type="multiple"` 一起使用的示例：

<code src="./date-picker-input/demo/valueFormatter.tsx"></code>

## 可清除

设置 `clearable` prop 以在右侧区域显示清除按钮。注意，如果你设置了 `rightSection`
prop，清除按钮将不会显示。

<code src="./date-picker-input/demo/clearable.tsx"></code>

<code src="./date-picker-input/demo/clearSectionMode.tsx"></code>

## 禁用状态

<code src="./date-picker-input/demo/disabled.tsx"></code>

## 最小和最大日期

`minDate` 和 `maxDate` props 定义可以选择的最小和最大日期。
你可以将 `minDate` 和 `maxDate` 指定为 `Date` 对象：

<code src="./date-picker-input/demo/minMax.tsx"></code>

## 默认级别

`defaultLevel` prop 允许设置选择器的初始级别。
允许的值有 `month`、`year` 和 `decade`。

<code src="./date-picker-input/demo/defaultLevel.tsx"></code>

## 最大级别

`maxLevel` prop 允许设置通过点击标题中的标签可以到达的最大级别。

<code src="./date-picker-input/demo/maxLevel.tsx"></code>

## 控件 props

`getDayProps`、`getYearControlProps` 和 `getMonthControlProps` props 允许根据日期向控件组件传递 props。
它对于禁用特定日期或自定义样式/className 很有用。

<code src="./date-picker-input/demo/controlProps.tsx"></code>

## 排除日期

`excludeDate` prop 允许禁用特定日期。
它接受一个接收日期并返回 `true`（如果该日期应被禁用）的函数。
在以下示例中，所有周末都被禁用：

<code src="./date-picker-input/demo/excludeDate.tsx"></code>

## 隐藏外部日期

`hideOutsideDates` prop 允许隐藏不属于当前月的日期。

<code src="./date-picker-input/demo/hideOutsideDates.tsx"></code>

## 隐藏工作日

`hideWeekdays` prop 允许隐藏工作日名称。

<code src="./date-picker-input/demo/hideWeekdays.tsx"></code>

## 周末日期

`weekendDays` prop 允许更改哪些天被视为周末。
它接受一个工作日索引数组（0-6）。0 是星期日，6 是星期六。
默认使用 `[0, 6]`。

<code src="./date-picker-input/demo/weekendDays.tsx"></code>

## 每周第一天

`firstDayOfWeek` prop 允许更改每周第一天。
它接受一个工作日索引（0-6）。0 是星期日，6 是星期六。
默认使用 `1`（星期一）。

<code src="./date-picker-input/demo/firstDayOfWeek.tsx"></code>

## 标签格式

`decadeLabelFormat`、`yearLabelFormat` 和 `monthLabelFormat` props 允许更改标题中标签的格式。
这些 props 接受一个 [dayjs 格式字符串](https://day.js.org/docs/en/display/format)。

<code src="./date-picker-input/demo/labelFormat.tsx"></code>

## 列表格式

`monthsListFormat` 和 `yearsListFormat` props 允许更改列表中月和年标签的格式。
这些 props 接受一个 [dayjs 格式字符串](https://day.js.org/docs/en/display/format)。

<code src="./date-picker-input/demo/listFormat.tsx"></code>

## 带周数

`withWeekNumbers` prop 允许显示周数。

<code src="./date-picker-input/demo/withWeekNumbers.tsx"></code>

## 自定义日期渲染

`renderDay` prop 允许自定义日期控件。它对于向日控件添加指示器或其他元素很有用。

<code src="./date-picker-input/demo/renderDay.tsx"></code>

## 标题控件顺序

`headerControlsOrder` prop 允许更改标题中控件的顺序。
它接受一个字符串数组：`level`、`previous` 和 `next`。
控件的样式可以用 `styles` prop 自定义。

<code src="./date-picker-input/demo/headerControlsOrder.tsx"></code>

## Input 属性

<code src="./date-picker-input/demo/configurator.tsx"></code>

## 带图标

<code src="./date-picker-input/demo/icon.tsx"></code>

<ClearSectionMode></ClearSectionMode>

<InputFeatures component="DatePickerInput" element="button"></InputFeatures>

<GetElementRef component="DatePickerInput" refType="button" package="@react-ui/ui"></GetElementRef>

<InputAccessibility component="DatePickerInput" packageName="@react-ui/ui"></InputAccessibility>
