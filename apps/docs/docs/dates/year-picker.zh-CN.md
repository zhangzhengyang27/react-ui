---
category: Dates
title: YearPicker
subtitle: 年份选择器
description: react-ui YearPicker 文档。
---


## 用法

<code src="./year-picker/demo/usage.tsx"></code>

## 允许取消选择

设置 `allowDeselect` 以允许用户通过点击当前选中的日期来取消选择。
当 `type` prop 为 `range` 或 `multiple` 时，`allowDeselect` 被忽略。取消选择日期时，`onChange` 会被调用并传入 `null`。

<code src="./year-picker/demo/deselect.tsx"></code>

## 多个日期

设置 `type="multiple"` 以允许用户选择多个日期：

<code src="./year-picker/demo/multiple.tsx"></code>

## 日期范围

设置 `type="range"` 以允许用户选择日期范围：

<code src="./year-picker/demo/range.tsx"></code>

## 范围内的单个日期

默认情况下，不允许将单个日期选为范围——当用户第二次点击同一日期时，它会被取消选择。
要更改此行为，请设置 `allowSingleDateInRange` prop。当 `type` prop 不是 `range` 时，`allowSingleDateInRange` 被忽略。

<code src="./year-picker/demo/singleRange.tsx"></code>

## 预设

使用 `presets` prop 添加自定义年份预设。预设显示在日历旁边：


要在 `type="range"` 时使用 `presets`，请将值定义为两个日期的元组：

<code src="./year-picker/demo/presets.tsx"></code>

<code src="./year-picker/demo/presetsRange.tsx"></code>

## 默认日期

使用 `defaultDate` prop 设置用于确定最初显示哪个十年的日期值。
例如，要显示 `2040 – 2049` 十年，请设置 `defaultDate={new Date(2040, 1)}`。如果未指定值，
则 `defaultDate` 将使用 `new Date()`。提供的日期对象中的月、日、分和秒会被忽略，仅使用年份——你可以指定任意日期值。

注意，如果设置了 `date` prop，则 `defaultDate` 值将被忽略。

<code src="./year-picker/demo/defaultDate.tsx"></code>

## 受控日期

设置 `date` 和 `onDateChange` prop 以使当前显示的十年受控。
通过这种方式，你可以自定义日期选择体验。例如，当用户选择范围中的第一个日期时，
你可以将当前日期值增加 20 年：

<code src="./year-picker/demo/controlledDate.tsx"></code>

## 最小和最大日期

设置 `minDate` 和 `maxDate` prop 以定义最小和最大日期。如果上一页/下一页不可用，
则相应的控件将被禁用。

<code src="./year-picker/demo/minMax.tsx"></code>

## 为年份控制添加 props

你可以使用 `getYearControlProps` 函数为年份控件添加 props。它接受一个年份日期作为唯一参数，
函数返回的 props 将被添加到年份控件。例如，可用于禁用特定控件或添加样式：

<code src="./year-picker/demo/controlProps.tsx"></code>

## 列数

设置 `numberOfColumns` prop 以定义并排渲染的选择器数量：

<code src="./year-picker/demo/numberOfColumns.tsx"></code>

## 全宽

设置 `fullWidth` prop 使年份选择器拉伸以填充其父容器 100% 的宽度：

<code src="./year-picker/demo/fullWidth.tsx"></code>

## 尺寸

<code src="./year-picker/demo/sizeConfigurator.tsx"></code>

## 更改年份控件格式

使用 `yearsListFormat` 更改年份控件的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./year-picker/demo/yearsListFormat.tsx"></code>

## 更改十年标签格式

使用 `decadeLabelFormat` 更改十年标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./year-picker/demo/decadeLabelFormat.tsx"></code>

## 无障碍

### Aria 标签

设置 `ariaLabels` prop 以为上一页/下一页控件指定 `aria-label` 属性：


### 年份控件 aria-label

使用 `getYearControlProps` 自定义 `aria-label` 属性：


### 键盘交互

注意，以下事件仅在焦点位于年份控件上时触发。

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一个非禁用年份', }, { key: 'ArrowLeft', description: '聚焦上一个非禁用年份', }, { key: 'ArrowDown', description: '聚焦同一列中的下一个非禁用年份', }, { key: 'ArrowUp', description: '聚焦同一列中的上一个非禁用年份', }, ]}></KeyboardEventsTable>

```tsx
import { YearPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <YearPicker
      ariaLabels={{
        nextDecade: 'Next decade',
        previousDecade: 'Previous decade',
      }}
    />
  );
}
```

```tsx
import { YearPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <YearPicker
      getYearControlProps={(date) => ({
        'aria-label': `选择年份 ${date.getFullYear()}`,
      })}
    />
  );
}
```
