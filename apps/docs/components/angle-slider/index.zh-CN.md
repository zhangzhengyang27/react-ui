---
category: Components
title: AngleSlider
subtitle: 角度滑块
description: react-ui AngleSlider 角度滑块组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户以拖拽圆形手柄的方式选择一个角度值（0-360 度）时使用，常见于渐变方向、变换等场景。

## 代码演示 {#examples}

### 用法

使用 `AngleSlider` 组件选择 0 到 360 之间的角度值：

<code src="./demo/usage.tsx"></code>

### 受控模式

`AngleSlider` 的值是 0 到 360 之间的数字。

```tsx
import { useState } from 'react';
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState(180);
  return <AngleSlider value={value} onChange={setValue} />;
}
```

### AngleSlider 与非受控表单

`AngleSlider` 可用于非受控表单。
设置 `name` 属性以在表单提交时将滑块值包含在 `FormData` 对象中。
要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

用于非受控表单的属性：
- `name` – 传递给隐藏 input 的 name 属性
- `hiddenInputProps` – 传递给隐藏 input 的附加属性

非受控 `AngleSlider` 与 `FormData` 的示例：

```tsx
import { AngleSlider } from '@react-ui/ui';

export function WithFormData() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Checkbox group value:', formData.get('angle'));
      }}
    >
      <AngleSlider name="angle" defaultValue={120} />
      <button type="submit">提交</button>
    </form>
  );
}
```

### formatLabel

使用 `formatLabel` 属性更改角度标签格式。
它接受一个函数，该函数接收角度值并返回一个 React 节点：

<code src="./demo/formatLabel.tsx"></code>

### 刻度

设置 `marks` 属性以在滑块上显示刻度。
刻度是一个对象，包含值（必需，0 到 360 之间的数字）和标签（可选，React 节点）。
要限制仅选择刻度值，请设置 `restrictToMarks` 属性：

<code src="./demo/marks.tsx"></code>

### onChangeEnd

`onChangeEnd` 回调在用户停止拖动滑块或使用键盘更改其值时触发。
可将其用作防抖回调以防止频繁更新。

<code src="./demo/onChangeEnd.tsx"></code>

### 禁用

`disabled` 属性禁用组件并阻止用户交互：

<code src="./demo/disabled.tsx"></code>

### 可访问性

要使组件对屏幕阅读器可访问，请设置 `aria-label` 属性：


组件聚焦时的键盘交互：

<KeyboardEventsTable data={[ { key: 'ArrowDown', description: '按步长减小值' }, { key: 'ArrowLeft', description: '按步长减小值' }, { key: 'ArrowUp', description: '按步长增加值' }, { key: 'ArrowRight', description: '按步长增加值' }, { key: 'Home', description: '将值设置为 0' }, { key: 'End', description: '将值设置为 359' }, ]}></KeyboardEventsTable>

```tsx
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  return <AngleSlider aria-label="渐变角度" />;
}
```



## API {#api}

### AngleSliderProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 角度值（0-360，受控） | `number` | `0` |
| defaultValue | 默认角度值 | `number` | `0` |
| onChange | 角度变化回调 | `(value: number) => void` | — |
| step | 步长 | `number` | `1` |
| size | 圆形手柄尺寸 | `number` | `60` |
| withLabel | 是否显示当前角度 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
