---
category: Dates
title: YearPickerInput
subtitle: 年份选择输入
description: react-ui YearPickerInput 文档。
---


## YearPicker 属性

`YearPickerInput` 支持大部分 [YearPicker](/docs/dates/year-picker/) 的 props。
请阅读 [YearPicker](/docs/dates/year-picker/) 文档以了解本页未列出的所有组件功能。

## 用法

<code src="./year-picker-input/demo/usage.tsx"></code>

## 多个日期

设置 `type="multiple"` 以允许用户选择多个日期：

<code src="./year-picker-input/demo/multiple.tsx"></code>

## 日期范围

设置 `type="range"` 以允许用户选择日期范围：

<code src="./year-picker-input/demo/range.tsx"></code>

## 预设

使用 `presets` prop 添加自定义年份预设。预设显示在日历旁边：


要在 `type="range"` 时使用 `presets`，请将值定义为两个日期的元组：

<code src="./year-picker-input/demo/presets.tsx"></code>

<code src="./year-picker-input/demo/presetsRange.tsx"></code>

## 在模态框中打开选择器

默认情况下，[YearPicker](/docs/dates/year-picker/) 在 [Popover](/components/popover/) 中渲染。
你可以通过设置 `dropdownType="modal"` 将其更改为 [Modal](/components/modal/)：

<code src="./year-picker-input/demo/modal.tsx"></code>

## 值格式

使用 `valueFormat` prop 更改值标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./year-picker-input/demo/valueFormat.tsx"></code>

## 值格式化器

`valueFormatter` 是 `valueFormat` prop 的更强大的替代方案。
它允许使用自定义函数格式化值标签。
该函数对所有组件类型（`default`、`multiple` 和 `range`）都相同——你需要在函数内部执行额外的检查来处理不同类型。

将自定义格式化函数与 `type="multiple"` 一起使用的示例：

<code src="./year-picker-input/demo/valueFormatter.tsx"></code>

## 可清除

设置 `clearable` prop 在右侧区域显示清除按钮。注意如果设置了 `rightSection` prop，清除按钮将不会显示。

<code src="./year-picker-input/demo/clearable.tsx"></code>

<code src="./year-picker-input/demo/clearSectionMode.tsx"></code>

## 禁用状态

<code src="./year-picker-input/demo/disabled.tsx"></code>

## 最小和最大日期

`minDate` 和 `maxDate` prop 定义了可选的最小和最大日期。
你可以将 `minDate` 和 `maxDate` 指定为 `Date` 对象：

<code src="./year-picker-input/demo/minMax.tsx"></code>

## 控制 props

`getYearControlProps` prop 允许根据日期向控制组件传递 props。
它可用于禁用特定日期或自定义样式/className。

<code src="./year-picker-input/demo/controlProps.tsx"></code>

## 年份标签格式

`yearsListFormat` prop 允许更改年份列表中年份标签的格式。
它接受 [dayjs 格式字符串](https://day.js.org/docs/en/display/format)。

<code src="./year-picker-input/demo/yearsListFormat.tsx"></code>

## 十年标签格式

`decadeLabelFormat` prop 允许更改标题中十年标签的格式。
它接受 [dayjs 格式字符串](https://day.js.org/docs/en/display/format)。

<code src="./year-picker-input/demo/decadeLabelFormat.tsx"></code>

## Input 属性

<code src="./year-picker-input/demo/configurator.tsx"></code>

## 带图标

<code src="./year-picker-input/demo/icon.tsx"></code>

<ClearSectionMode></ClearSectionMode>

<InputFeatures component="MonthPickerInput" element="button"></InputFeatures>

<GetElementRef component="YearPickerInput" refType="button" package="@xiaoye-react/ui"></GetElementRef>

<InputAccessibility component="YearPickerInput" packageName="@xiaoye-react/ui"></InputAccessibility>
