---
category: Components
title: RangeSlider
subtitle: 范围滑块
description: react-ui RangeSlider 范围滑块组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户通过两个手柄选择一个数值范围（如价格区间）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return <RangeSlider value={value} onChange={setValue} />;
}
```

### 非受控模式

`RangeSlider` 可以像原生 input 元素一样用于非受控表单。
设置 `name` 属性以在表单提交时将范围滑块值包含在 `FormData` 对象中。
要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `RangeSlider` 与 `FormData` 的示例用法：

```tsx
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Range slider value:', formData.get('range'));
      }}
    >
      <RangeSlider
        name="range"
        defaultValue={[20, 80]}
        min={0}
        max={100}
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 禁用

<code src="./demo/disabled.tsx"></code>

### 控制标签

要更改标签的行为和外观，请设置以下属性：

- `label` – 格式化函数，接收值作为参数，设置为 null 可禁用标签，默认为 `f => f`
- `labelAlwaysOn` – 如果为 true，标签将始终显示；默认情况下仅在用户拖动时可见

<code src="./demo/label.tsx"></code>

### 最小值、最大值和步长

<code src="./demo/step.tsx"></code>

### 小数值

要将 `RangeSlider` 用于小数值，请设置 `min`、`max` 和 `step` 属性：

<code src="./demo/decimal.tsx"></code>

### minRange

使用 `minRange` 属性控制 `RangeSlider` 中 `from` 和 `to` 值之间的最小范围。
默认值为 `10`。这确保两个滑块之间必须至少相隔指定距离：

<code src="./demo/minRange.tsx"></code>

### maxRange

使用 `maxRange` 属性控制 `from` 和 `to` 值之间的最大范围。
这限制了可选范围的最大宽度。默认情况下，`maxRange` 设置为 `Infinity`：

<code src="./demo/maxRange.tsx"></code>

### pushOnOverlap

`pushOnOverlap` 属性控制当两个滑块重叠时是否应该互相推动。
默认情况下，`pushOnOverlap` 为 `true`。若希望禁用此行为，请将其设置为 `false`。

`pushOnOverlap={false}` 的示例：

<code src="./demo/pushOnOverlap.tsx"></code>

### 刻度

通过将 `marks` 属性设置为对象数组，可以在滑块上添加任意数量的刻度：


注意，刻度值是相对于滑块值而不是宽度而言的：

```tsx
const marks = [
  { value: 20 }, // -> 在滑块轨道上显示刻度
  { value: 40, label: '40%' }, // -> 在滑块轨道下方添加刻度标签
];
```

<code src="./demo/marks.tsx"></code>

### 限制选择到刻度

设置 `restrictToMarks` 属性以将滑块值限制为仅刻度值。注意，在这种情况下
`step` 属性会被忽略：

<code src="./demo/restrictToMarks.tsx"></code>

### 反转

可使用 `inverted` 属性反转轨道：

<code src="./demo/inverted.tsx"></code>

### 可访问性

`RangeSlider` 组件默认可访问：

- 滑块可聚焦
- 当用户使用鼠标与滑块交互时，焦点会移动到滑块轨道；当用户按方向键时，焦点会移动到滑块
- 可以使用方向键按步长增减值

要为屏幕阅读器标记组件，请为滑块添加标签：


当使用 `scale` 或显示的值被格式化时（例如货币或百分比），请设置 `thumbValueText`
以为屏幕阅读器提供人类可读的值。它会作为 `aria-valuetext` 渲染在两个滑块上。
当传入函数时，它会接收相应滑块的映射值：

```tsx
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <RangeSlider
      thumbFromLabel="第一个滑块"
      thumbToLabel="第二个滑块"
    />
  );
}
```

```tsx
import { RangeSlider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <RangeSlider
      scale={(v) => v * 10}
      thumbValueText={(value) => `${value}%`}
    />
  );
}
```



## API {#api}

### RangeSliderProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前范围（受控） | `[number, number]` | — |
| defaultValue | 默认范围 | `[number, number]` | — |
| onChange | 范围变化回调 | `(value: [number, number]) => void` | — |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| minRange | 两个手柄最小间距 | `number` | — |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
