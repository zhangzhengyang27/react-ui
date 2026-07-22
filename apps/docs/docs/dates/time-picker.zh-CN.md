---
category: Dates
title: TimePicker
subtitle: 时间选择器
description: react-ui TimePicker 文档。
---


## 用法

`TimePicker` 组件是 [TimeInput](/docs/dates/time-input) 的替代方案，提供更多功能。
它支持 24 小时和 12 小时格式、带小时/分钟/秒的下拉框等。

<code src="./time-picker/demo/usage.tsx"></code>

## 受控

`TimePicker` 组件的值是 `hh:mm:ss` 或 `hh:mm` 24 小时制字符串（例如 `18:34:55`）。
空字符串表示无值。`onChange` 仅在输入值有效时调用。
输入值在以下情况被视为有效：

- 所有输入为空。此时 `onChange` 被调用并传入空字符串。
- 所有输入已填写。例如，如果设置了 `withSeconds` prop，用户输入 `12:34:56`，`onChange` 将返回 `12:34:56`；但如果用户输入 `12:34`，则不会调用 `onChange`，因为秒值缺失。

```tsx
import { useState } from 'react';
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  return <TimePicker value={value} onChange={setValue} />;
}
```

## 带秒

设置 `withSeconds` prop 以启用秒输入。注意使用此 prop 时，
必须填满所有输入才会调用 `onChange`——无法只输入小时和分钟。

<code src="./time-picker/demo/withSeconds.tsx"></code>

## Duration 类型

设置 `type="duration"` 以允许输入超过 24 小时的时长。
此模式下，小时字段没有上限，输入宽度会根据输入值动态调整。
`format` prop 被忽略（始终为 24 小时制），下拉框被禁用。

<code src="./time-picker/demo/duration.tsx"></code>

## 最小小时位数

使用 `minHoursDigits` prop 设置小时输入显示的最少位数。
此 prop 仅在设置 `type="duration"` 时生效。默认最小值为 `2`。

<code src="./time-picker/demo/minHoursDigits.tsx"></code>

## 12 小时制

设置 `format="12h"` 以使用 12 小时制。注意只有在所有输入（包括 am/pm）都填满时才会调用 `onChange`。

<code src="./time-picker/demo/format12h.tsx"></code>

## 更改 am/pm 标签

要更改 am/pm 标签，请使用 `amPmLabels` prop。以下示例将标签更改为印地语：

<code src="./time-picker/demo/amPmLabels.tsx"></code>

## 最小和最大值

设置 `min` 和 `max` prop 以限制可选时间范围：

<code src="./time-picker/demo/minMax.tsx"></code>

## 带下拉框

设置 `withDropdown` prop 以显示包含小时、分钟、秒和 am/pm 选择的下拉框。
默认情况下，当任意输入获得焦点时显示下拉框。

<code src="./time-picker/demo/withDropdown.tsx"></code>

## 小时/分钟/秒步长

使用 `hoursStep`、`minutesStep` 和 `secondsStep` prop 控制每个输入的步长。
这些 prop 用于控制按上下方向键时输入增减的数值，并在下拉框中生成相应的值范围。

<code src="./time-picker/demo/steps.tsx"></code>

## 控制下拉框打开状态

使用 `popoverProps` 将 props 传递给底层的 [Popover](/components/popover) 组件：

<code src="./time-picker/demo/controlledDropdown.tsx"></code>

## 时间预设

你可以使用 `presets` prop 定义时间预设。预设显示在下拉框中，点击即可选择。
预设的时间值应为 `hh:mm:ss` 或 `hh:mm` 24 小时制格式。预设的显示值基于 `format`、`amPmLabels` 和 `withSeconds` prop 生成。

<code src="./time-picker/demo/presets.tsx"></code>

## 时间预设分组

要对预设进行分组，请使用包含 `label` 和 `values` 键的对象数组：

<code src="./time-picker/demo/presetsGroups.tsx"></code>

## 时间预设范围

如果你需要生成一段时间值，请使用从 `@xiaoye-react/ui` 包导出的 `getTimeRange` 函数。
该函数接受开始时间、结束时间和 `hh:mm:ss` 格式的间隔。

<code src="./time-picker/demo/presetsRange.tsx"></code>

## 选择预设后关闭下拉框

设置 `closeDropdownOnPresetSelect` prop，从预设列表中选择值后关闭下拉框：

<code src="./time-picker/demo/closeDropdownOnPresetSelect.tsx"></code>

## 下拉框位置

默认情况下，如果输入下方有足够空间，下拉框显示在输入下方；否则显示在上方。
你可以通过设置 `position` 和 `middlewares` prop 来更改此行为，这些 prop 会传递给底层的 [Popover](/components/popover) 组件。

下拉框始终显示在输入上方的示例：

<code src="./time-picker/demo/dropdownPosition.tsx"></code>

## 下拉框宽度

要更改下拉框宽度，请在 `comboboxProps` 中设置 `width` prop。默认情况下，
下拉框宽度会根据内容自动调整。以下示例将下拉框宽度设置为与输入等宽：

<code src="./time-picker/demo/dropdownWidth.tsx"></code>

## 粘贴事件

默认情况下，`TimePicker` 仅处理 24 小时制时间（例如 `17:33:43` 或 `19:22`）的粘贴事件。
使用 `pasteSplit` prop 可以创建自定义粘贴时间解析器：

<code src="./time-picker/demo/pasteSplit.tsx"></code>

## 可清除

设置 `clearable` prop 在输入右侧区域显示清除按钮。
只要任意字段有值，清除按钮就会显示。

<code src="./time-picker/demo/clearable.tsx"></code>

<code src="./time-picker/demo/clearSectionMode.tsx"></code>

## 禁用状态

<code src="./time-picker/demo/disabled.tsx"></code>

## 只读

<code src="./time-picker/demo/readOnly.tsx"></code>

## Input 属性

<code src="./time-picker/demo/configurator.tsx"></code>

## 获取内部输入的 ref

使用 `hoursRef`、`minutesRef`、`secondsRef` 和 `amPmRef` prop 获取内部输入的 ref：

```tsx
import { useRef } from 'react';
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const amPmRef = useRef<HTMLSelectElement>(null);

  return (
    <TimePicker
      hoursRef={hoursRef}
      minutesRef={minutesRef}
      secondsRef={secondsRef}
      amPmRef={amPmRef}
    />
  );
}
```

## onFocus 和 onBlur 事件

`onFocus` 和 `onBlur` 事件分别会在第一个输入获得焦点和最后一个输入失去焦点时调用：

```tsx
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TimePicker
      onFocus={() => console.log('Focused')}
      onBlur={() => console.log('Blurred')}
    />
  );
}
```

## 无障碍

使用相应的 prop 为小时、分钟、秒和 am/pm 输入以及清除按钮设置 aria 标签：


键盘交互：

<KeyboardEventsTable data={[ { key: 'ArrowDown', description: '按步长减小当前值', }, { key: 'ArrowUp', description: '按步长增大当前值', }, { key: 'Home', description: '将当前值设为最小可能值', }, { key: 'End', description: '将当前值设为最大可能值', }, { key: 'Backspace', description: '清除当前值' }, { key: 'ArrowRight', description: '将焦点移动到下一个输入', }, { key: 'ArrowLeft', description: '将焦点移动到上一个输入', }, ]}></KeyboardEventsTable>

```tsx
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TimePicker
      hoursInputLabel="小时"
      minutesInputLabel="分钟"
      secondsInputLabel="秒"
      amPmInputLabel="上午/下午"
      clearButtonProps={{ 'aria-label': '清除时间' }}
    />
  );
}
```

<ClearSectionMode></ClearSectionMode>

<InputFeatures component="TimePicker" element="div"></InputFeatures>
