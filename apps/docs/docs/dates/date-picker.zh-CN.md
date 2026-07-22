---
category: Dates
title: DatePicker
subtitle: 日期选择器
description: react-ui DatePicker 文档。
---


## 用法

<code src="./date-picker/demo/usage.tsx"></code>

## 允许取消选择

设置 `allowDeselect` 以允许用户通过点击当前选中的日期来取消选择它。
当 `type` prop 为 `range` 或 `multiple` 时，`allowDeselect` 被忽略。当日期被取消选择时，`onChange` 会传入 `null`。

<code src="./date-picker/demo/deselect.tsx"></code>

## 多个日期

设置 `type="multiple"` 以允许用户选择多个日期：

<code src="./date-picker/demo/multiple.tsx"></code>

## 日期范围

设置 `type="range"` 以允许用户选择日期范围：

<code src="./date-picker/demo/range.tsx"></code>

## 范围内的单个日期

默认情况下，不允许将单个日期选择为范围——当用户第二次点击同一日期时，它会被取消选择。
要更改此行为，请设置 `allowSingleDateInRange` prop。当 `type` prop 不是 `range` 时，`allowSingleDateInRange` 会被忽略。

<code src="./date-picker/demo/singleRange.tsx"></code>

## 预设

使用 `presets` prop 添加自定义日期预设。预设显示在日历旁边：


要在 `type="range"` 时使用 `presets`，请将值定义为两个日期的元组：

<code src="./date-picker/demo/presets.tsx"></code>

<code src="./date-picker/demo/presetsRange.tsx"></code>

## 默认日期

使用 `defaultDate` prop 设置用于确定最初应显示哪一年的日期值。
例如，要显示 `2015 年 2 月`，请设置 `defaultDate={new Date(2015, 1)}`。如果未指定值，
则 `defaultDate` 将使用 `new Date()`。提供的日期对象中的日、分和秒被忽略，仅使用年和月数据——
你可以指定任何日期值。

注意，如果你设置了 `date` prop，则 `defaultDate` 值将被忽略。

<code src="./date-picker/demo/defaultDate.tsx"></code>

## 受控日期

设置 `date` 和 `onDateChange` props 以使当前显示的月、年和十年受控。
通过这样做，你可以自定义日期选择体验。例如，当用户选择范围中的第一个日期时，
你可以给当前日期值加一个月：

<code src="./date-picker/demo/controlledDate.tsx"></code>

## 默认级别

设置 `defaultLevel` prop 以配置最初显示的级别：

<code src="./date-picker/demo/defaultLevel.tsx"></code>

## 隐藏外部日期

设置 `hideOutsideDates` prop 以移除所有不属于当前月的日期：

<code src="./date-picker/demo/hideOutsideDates.tsx"></code>

## 显示周数

设置 `withWeekNumbers` prop 以显示周数：

<code src="./date-picker/demo/withWeekNumbers.tsx"></code>

## 每周第一天

设置 `firstDayOfWeek` prop 以配置每周第一天。该 prop 接受 0 到 6 之间的数字，
其中 0 是星期日，6 是星期六。默认值为 1 – 星期一。你也可以使用 [DatesProvider](/docs/dates/getting-started/) 为所有组件配置此选项。

<code src="./date-picker/demo/firstDayOfWeek.tsx"></code>

## 隐藏工作日

设置 `hideWeekdays` prop 以隐藏工作日名称：

<code src="./date-picker/demo/hideWeekdays.tsx"></code>

## 周末日期

使用 `weekendDays` prop 配置周末日期。该 prop 接受 0 到 6 之间的数字数组，
其中 0 是星期日，6 是星期六。默认值为 `[0, 6]` – 星期六和星期日。你也可以使用 [DatesProvider](/docs/dates/getting-started/) 为所有组件配置此选项。

<code src="./date-picker/demo/weekendDays.tsx"></code>

## 自定义日期渲染函数

你可以使用 `renderDay` prop 自定义日期渲染。例如，它可以用于为
某些日期添加 [Indicator](/components/indicator/)。

<code src="./date-picker/demo/renderDay.tsx"></code>

## 最小和最大日期

设置 `minDate` 和 `maxDate` props 以定义最小和最大日期。如果上一页/下一页不可用，
则相应的控件将被禁用。

<code src="./date-picker/demo/minMax.tsx"></code>

## 更改标题控件顺序

使用 `headerControlsOrder` prop 更改标题控件的顺序。该 prop 接受一个
`'next' | 'previous' | 'level'` 数组。注意，每个控件在数组中只能使用一次。

<code src="./date-picker/demo/headerControlsOrder.tsx"></code>

## 向日、年和月控件添加 props

你可以使用 `getYearControlProps`、`getMonthControlProps` 和 `getDayProps` 函数向日、月和日控件添加 props。所有函数都接受一个日期作为单个参数，
从函数返回的 props 将被添加到年/月/日控件上。例如，它可以用于禁用特定
控件或添加样式：

<code src="./date-picker/demo/controlProps.tsx"></code>

## 排除日期

要禁用特定日期，请使用 `excludeDate` prop。
它接受一个以日期为参数并返回布尔值的函数——如果返回 `true`，该日期将被禁用。
禁用所有非星期五日期的示例：

<code src="./date-picker/demo/excludeDate.tsx"></code>

## 列数

设置 `numberOfColumns` prop 以定义并排渲染的选择器数量：

<code src="./date-picker/demo/numberOfColumns.tsx"></code>

## 最大级别

<code src="./date-picker/demo/maxLevel.tsx"></code>

## 全宽

设置 `fullWidth` prop 使日期选择器拉伸以填充其父容器宽度的 100%：

<code src="./date-picker/demo/fullWidth.tsx"></code>

## 尺寸

<code src="./date-picker/demo/sizeConfigurator.tsx"></code>

## 更改年和月控件格式

使用 `yearsListFormat` 和 `monthsListFormat` props 更改年/月控件的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./date-picker/demo/listFormat.tsx"></code>

## 更改标签格式

使用 `decadeLabelFormat`、`yearLabelFormat` 和 `monthLabelFormat` props 更改十年/年标签的 [dayjs 格式](https://day.js.org/docs/en/display/format)：

<code src="./date-picker/demo/labelFormat.tsx"></code>

## 本地化

通常最好在 [DatesProvider](/docs/dates/getting-started/) 中指定 `@xiaoye-react/ui` 包的 locale，
但你也可以按组件覆盖 locale：

<code src="./date-picker/demo/locale.tsx"></code>

## 无障碍

### Aria 标签

设置 `ariaLabels` prop 以为下一页/上一页控件指定 `aria-label` 属性：


### 年/月控件 aria-label

使用 `getYearControlProps`/`getMonthControlProps`/`getDayProps` 自定义 `aria-label` 属性：


### 键盘交互

注意，以下事件仅在焦点位于日期控件上时触发。

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '聚焦下一个非禁用日期', }, { key: 'ArrowLeft', description: '聚焦上一个非禁用日期', }, { key: 'ArrowDown', description: '聚焦同一列中的下一个非禁用日期', }, { key: 'ArrowUp', description: '聚焦同一列中的上一个非禁用日期', }, ]}></KeyboardEventsTable>

```tsx
import { DatePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DatePicker
      ariaLabels={{
        nextDecade: '下一个十年',
        previousDecade: '上一个十年',
        nextYear: '下一年',
        previousYear: '上一年',
        nextMonth: '下一个月',
        previousMonth: '上一个月',
        yearLevelControl: '切换到十年视图',
        monthLevelControl: '切换到年视图',
      }}
    />
  );
}
```

```tsx
import { DatePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DatePicker
      getDayProps={(date) => ({
        'aria-label': `选择日期 ${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`,
      })}
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
