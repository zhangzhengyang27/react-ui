---
category: Dates
title: TimeInput
subtitle: 时间输入
description: react-ui TimeInput 文档。
---


## 用法

<code src="./time-input/demo/configurator.tsx"></code>

## TimePicker 组件

`TimeInput` 组件基于原生 `input[type="time"]` 元素，不支持选择时间格式或自定义时间下拉框等高级功能。如果需要更多功能，请改用 [TimePicker](/docs/dates/time-picker) 组件。

`TimeInput` 特性/限制：

- 原生 `input[type="time"]` 元素
- 在移动设备上使用原生浏览器时间选择控件
- 时间格式取决于用户 locale
- 仅支持原生的小时/分钟/秒下拉框，在 Firefox 中不可用
- 移动端 Safari 不支持选择秒

## 受控

```tsx
import { useState } from 'react';
import { TimeInput } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <TimeInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

## 显示浏览器选择器

你可以通过调用 input 元素的 `showPicker` 方法来显示浏览器选择器。
注意某些浏览器（桌面 Safari）不支持此功能，调用后不会有任何效果。

<code src="./time-input/demo/picker.tsx"></code>

## 带秒

<code src="./time-input/demo/withSeconds.tsx"></code>

## 带图标

<code src="./time-input/demo/icon.tsx"></code>

## 禁用状态

<code src="./time-input/demo/disabled.tsx"></code>

<InputFeatures component="TimeInput" element="input"></InputFeatures>

<GetElementRef component="TimeInput" refType="input" package="@react-ui/ui"></GetElementRef>

<InputAccessibility component="TimeInput" packageName="@react-ui/ui"></InputAccessibility>
