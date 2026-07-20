---
category: Dates
title: DateInput
subtitle: 日期输入
description: react-ui DateInput 文档。
---


## DatePicker 属性

`DateInput` 支持大多数 [DatePicker](/docs/dates/date-picker/) props。
阅读 [DatePicker](/docs/dates/date-picker/) 文档以了解本页未列出的所有组件功能。

## 用法

<code src="./date-input/demo/usage.tsx"></code>

## 预设

使用 `presets` prop 添加自定义日期预设。预设显示在日历旁边：

<code src="./date-input/demo/presets.tsx"></code>

## 值格式

使用 `valueFormat` prop 更改值标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)。
要使用某些自定义格式，你需要启用 [custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format) 插件：


使用 DateInput 和自定义格式的示例：

```tsx
// 在应用根文件中执行一次
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
```

<code src="./date-input/demo/format.tsx"></code>

## 带时间

如果你的 `valueFormat` 包含时间（例如 `YYYY-MM-DD HH:mm`），请设置 `withTime` prop
以保留值的时间部分。没有 `withTime` 时，时间部分将被丢弃，并
始终默认为 `00:00`。使用 `withTime` 时，你还需要提供自定义的 `dateParser`，
返回日期时间字符串：

<code src="./date-input/demo/time.tsx"></code>

## 日期解析器

使用 `dateParser` prop 替换默认的日期解析器。解析器函数接收用户输入（字符串）
并必须返回一个 `Date` 对象：

<code src="./date-input/demo/parser.tsx"></code>

## 允许清除

设置 `clearable` prop 以允许从输入框中移除值。如果用户在下拉菜单中选择相同日期或清除输入值，输入框将被清除：

<code src="./date-input/demo/clearable.tsx"></code>

<code src="./date-input/demo/clearSectionMode.tsx"></code>

## 最小和最大日期

设置 `minDate` 和 `maxDate` props 以定义最小和最大日期。如果输入的日期晚于 `maxDate`
或早于 `minDate`，它将被视为无效，输入值将恢复为
最后已知的有效日期值。

<code src="./date-input/demo/minMax.tsx"></code>

## 禁用状态

<code src="./date-input/demo/disabled.tsx"></code>

## Input 属性

<code src="./date-input/demo/configurator.tsx"></code>

<ClearSectionMode></ClearSectionMode>

<InputFeatures component="DateInput" element="input"></InputFeatures>

<GetElementRef component="DateInput" refType="input" package="@react-ui/ui"></GetElementRef>

<InputAccessibility component="DateInput" packageName="@react-ui/ui"></InputAccessibility>
