---
category: Dates
title: MonthPicker
subtitle: 月份选择器
description: react-ui MonthPicker 文档。
---


## 用法

<code src="./month-picker/demo/usage.tsx"></code>

## 允许取消选择

设置 `allowDeselect` 以允许用户通过点击当前选中的日期来取消选择。
当 `type` prop 为 `range` 或 `multiple` 时，`allowDeselect` 被忽略。取消选择日期时，`onChange` 会被调用并传入 `null`。

<code src="./month-picker/demo/deselect.tsx"></code>

## 多个日期

设置 `type="multiple"` 以允许用户选择多个日期：

<code src="./month-picker/demo/multiple.tsx"></code>

## 日期范围

设置 `type="range"` 以允许用户选择日期范围：

<code src="./month-picker/demo/range.tsx"></code>

## 范围内的单个日期

默认情况下，不允许将单个日期选为范围——当用户第二次点击同一日期时，它会被取消选择。
要更改此行为，请设置 `allowSingleDateInRange` prop。当 `type` prop 不是 `range` 时，`allowSingleDateInRange` 被忽略。

<code src="./month-picker/demo/singleRange.tsx"></code>

## 预设

使用 `presets` prop 添加自定义月份预设。预设显示在日历旁边：


要在 `type="range"` 时使用 `presets`，请将值定义为两个日期的元组：

<code src="./month-picker/demo/presets.tsx"></code>

<code src="./month-picker/demo/presetsRange.tsx"></code>

## 默认日期

使用 `defaultDate` prop 设置用于确定最初显示哪一年的日期值。
例如，要显示 `2015` 年，请设置 `defaultDate={new Date(2015, 1)}`。如果未指定值，
则 `defaultDate` 将使用 `new Date()`。提供的日期对象中的月、日、分和秒会被忽略，仅使用年份——你可以指定任意日期值。

注意，如果设置了 `date` prop，则 `defaultDate` 值将被忽略。

<code src="./month-picker/demo/defaultDate.tsx"></code>

## 受控日期

设置 `date` 和 `onDateChange` prop 以使当前显示的年份和十年受控。
通过这种方式，你可以自定义日期选择体验。例如，当用户选择范围中的第一个日期时，
你可以将当前日期值增加一年：

<code src="./month-picker/demo/controlledDate.tsx"></code>

## 最小和最大日期

设置 `minDate` 和 `maxDate` prop 以定义最小和最大日期。如果上一页/下一页不可用，
则相应的控件将被禁用。

<code src="./month-picker/demo/minMax.tsx"></code>

## 为年份和月份控制添加 props

你可以使用 `getYearControlProps` 和 `getMonthControlProps` 函数为年份和月份控件添加 props。两个函数都接受一个日期作为唯一参数，
函数返回的 props 将被添加到年份/月份控件。例如，可用于禁用特定控件或添加样式：

<code src="./month-picker/demo/controlProps.tsx"></code>

## 列数

设置 `numberOfColumns` prop 以定义并排渲染的选择器数量：

<code src="./month-picker/demo/numberOfColumns.tsx"></code>

## 最大层级

要禁止用户进入十年层级，请设置 `maxLevel="year"`：

<code src="./month-picker/demo/maxLevel.tsx"></code>

## 全宽

设置 `fullWidth` prop 使月份选择器拉伸以填充其父容器 100% 的宽度：

<code src="./month-picker/demo/fullWidth.tsx"></code>

## 尺寸

<code src="./month-picker/demo/sizeConfigurator.tsx"></code>

## 更改年份和月份控件格式

使用 `yearsListFormat` 和 `monthsListFormat` prop 更改年份/月份控件的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./month-picker/demo/listFormat.tsx"></code>

## 更改标签格式

使用 `decadeLabelFormat` 和 `yearLabelFormat` 更改十年/年份标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./month-picker/demo/labelFormat.tsx"></code>

## 本地化

通常最好在 [DatesProvider](/docs/dates/getting-started/) 中指定 `@xiaoye-react/ui` 包的 locale，
但你也可以按组件覆盖 locale：

<code src="./month-picker/demo/locale.tsx"></code>

## 无障碍

### Aria 标签

设置 `ariaLabels` prop 以为上一页/下一页控件指定 `aria-label` 属性：


### 年份/月份控件 aria-label

使用 `getYearControlProps`/`getMonthControlProps` 自定义 `aria-label` 属性：


### 键盘交互

注意，以下事件仅在焦点位于月份控件上时触发。

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一个非禁用月份', }, { key: 'ArrowLeft', description: '聚焦上一个非禁用月份', }, { key: 'ArrowDown', description: '聚焦同一列中的下一个非禁用月份', }, { key: 'ArrowUp', description: '聚焦同一列中的上一个非禁用月份', }, ]}></KeyboardEventsTable>

```tsx
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MonthPicker
      ariaLabels={{
        nextDecade: 'Next decade',
        previousDecade: 'Previous decade',
        nextYear: 'Next year',
        previousYear: 'Previous year',
        yearLevelControl: 'Change to decade view',
      }}
    />
  );
}
```

```tsx
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MonthPicker
      getYearControlProps={(date) => ({
        'aria-label': `选择年份 ${date.getFullYear()}`,
      })}
      getMonthControlProps={(date) => ({
        'aria-label': `选择月份 ${date.getFullYear()}/${date.getMonth()}`,
      })}
    />
  );
}
```
