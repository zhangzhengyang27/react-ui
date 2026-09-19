---
category: Components
title: Slider
subtitle: 滑块
description: react-ui Slider 滑块组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户通过拖拽手柄在一个范围内选择数值时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(40);
  return <Slider value={value} onChange={setValue} />;
}
```

### 非受控模式

`Slider` 可以像原生 input 元素一样用于非受控表单。
设置 `name` 属性以在表单提交时将滑块值包含在 `FormData` 对象中。
要在非受控模式中设置初始值，请使用 `defaultValue` 属性。

非受控 `Slider` 与 `FormData` 的示例用法：

```tsx
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Slider value:', formData.get('volume'));
      }}
    >
      <Slider name="volume" defaultValue={40} min={0} max={100} />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 禁用

<code src="./demo/disabled.tsx"></code>

### onChangeEnd

`onChangeEnd` 回调在用户停止拖动滑块或使用键盘更改值时调用。
可将其用作防抖回调，以避免过于频繁的更新。

<code src="./demo/changeEnd.tsx"></code>

### 控制标签

要更改标签的行为和外观，请设置以下属性：

- `label` – 格式化函数，接收值作为参数，设置为 null 可禁用标签，默认为 `f => f`
- `labelAlwaysOn` – 如果为 true，标签将始终显示；默认情况下仅在用户拖动时可见

<code src="./demo/label.tsx"></code>

### 最小值、最大值和步长

<code src="./demo/step.tsx"></code>

### 可选范围

默认情况下，`min` 和 `max` 属性同时定义视觉范围（轨道显示）和
可选范围（可能的取值）。`domain` 属性允许独立控制可选范围。
当希望显示更宽的轨道（用于提供上下文）但将实际选择限制在子集内时，这非常有用。

在下面的示例中，轨道显示从 0 到 100（`min`/`max`），但滑块只能拖动到 20 到 80 之间（`domain`）：

<code src="./demo/domain.tsx"></code>

### 小数值

要将 `Slider` 用于小数值，请设置 `min`、`max` 和 `step` 属性：

<code src="./demo/decimal.tsx"></code>

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

### 滑块大小

<code src="./demo/thumbSize.tsx"></code>

### 滑块子元素

<code src="./demo/thumbChildren.tsx"></code>

### 刻度映射

可使用 `scale` 属性以不同的刻度表示值。

在下面的示例中，值 `x` 表示 `2^x`。将 `x` 增加 1，所表示的值就增加 2 的 `x` 次方。

<code src="./demo/scale.tsx"></code>

### 起始点

使用 `startPointValue` 属性更改填充条的原点。
设置后，条从给定值延伸到当前值——
低于起始点的值向左延伸，高于起始点的值向右延伸。
设置 `inverted` 时此属性会被忽略。

<code src="./demo/startPoint.tsx"></code>

### 反转

可使用 `inverted` 属性反转轨道：




使用 [Styles API](/docs/styles/styles-api/) 更改 `Slider` 样式的示例：

<code src="./demo/inverted.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<code src="./demo/customize.tsx"></code>

### 垂直滑块

设置 `orientation="vertical"` 以垂直渲染滑块。在垂直方向下，
最小值在底部，最大值在顶部。

<code src="./demo/vertical.tsx"></code>

### 隐藏刻度
### 构建自定义滑块

如果 `Slider` 组件无法满足需求，可以使用 [use-move](/docs/hooks/use-move/) Hook 构建自定义滑块：

<code src="./demo/customSlider.tsx"></code>

### 可访问性

`Slider` 组件默认可访问：

- 滑块可聚焦
- 当用户使用鼠标与滑块交互时，焦点会移动到滑块轨道；当用户按方向键时，焦点会移动到滑块
- 可以使用方向键按步长增减值

要为屏幕阅读器标记组件，请为滑块添加标签：


当使用 `scale` 或显示的值被格式化时（例如货币或百分比），请设置 `thumbValueText`
以为屏幕阅读器提供人类可读的值。它会作为 `aria-valuetext` 渲染在滑块上。
当传入函数时，它会接收映射后的值：

```tsx
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return <Slider thumbLabel="Thumb aria-label" />;
}
```

```tsx
import { Slider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Slider
      scale={(v) => v * 10}
      thumbValueText={(value) => `$${value}`}
    />
  );
}
```

<StylesApiSelectors component="Slider"></StylesApiSelectors>



## API {#api}

### SliderProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `number` | — |
| defaultValue | 默认值 | `number` | `0` |
| onChange | 值变化回调 | `(value: number) => void` | — |
| onChangeEnd | 拖拽结束回调 | `(value: number) => void` | — |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 是否禁用 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
