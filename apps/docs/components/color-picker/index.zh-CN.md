---
category: Components
title: ColorPicker
subtitle: 颜色选择器
description: react-ui ColorPicker 颜色选择器组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要为用户提供完整的颜色选择面板，包含色板、透明度、滑块时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 受控模式

`ColorPicker` 的值必须是字符串；不支持其他类型。
`onChange` 函数以字符串值作为唯一参数调用。

```tsx
import { useState } from 'react';
import { ColorPicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('#ffffff');
  return <ColorPicker value={value} onChange={setValue} />;
}
```

### 非受控模式

`ColorPicker` 可以像原生 `input` 元素一样用于非受控表单。
设置 `name` 属性以在表单提交时将颜色选择器值包含在 `FormData` 对象中。
要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `ColorPicker` 与 `FormData` 的示例用法：

```tsx
import { ColorPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Color value:', formData.get('color'));
      }}
    >
      <ColorPicker
        name="color"
        defaultValue="#FF0000"
        format="hex"
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 颜色格式

`ColorPicker` 支持 hex、hexa、rgb、rgba、hsl 和 hsla 颜色格式。
仅对 hexa、rgba 和 hsla 格式显示更改不透明度的滑块和颜色预览：

<code src="./demo/formatsConfigurator.tsx"></code>

### 使用色板

可使用 `swatches` 属性添加预定义颜色色板：


默认情况下，`ColorPicker` 每行显示 7 个色板。可使用 `swatchesPerRow` 属性配置它：


要仅显示色板而不显示选择器，请设置 `withPicker={false}` 和 `fullWidth` 属性：

<code src="./demo/swatches.tsx"></code>

<code src="./demo/swatchesConfigurator.tsx"></code>

<code src="./demo/swatchesOnly.tsx"></code>

### 尺寸

`ColorPicker` 有 5 个预定义尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`：

<code src="./demo/sizeConfigurator.tsx"></code>

### fullWidth

设置 `fullWidth` 属性使组件拉伸至父元素宽度的 100%。在这种情况下，选择器不会
具有固定宽度，但仍可使用 `size` 属性控制滑块的大小。

<code src="./demo/fullWidth.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

ColorPicker 组件默认具备可访问性：

- 饱和度、色相和 alpha 滑块可获得焦点
- 当使用鼠标与滑块交互时，焦点会移动到滑块
- 所有值都可以使用方向键更改

要使组件对屏幕阅读器可访问，请设置 `saturationLabel`、`hueLabel` 和 `alphaLabel`：

```tsx
import { ColorPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ColorPicker
      saturationLabel="Saturation"
      hueLabel="Hue"
      alphaLabel="Alpha"
    />
  );
}
```

<StylesApiSelectors component="ColorPicker"></StylesApiSelectors>



## API {#api}

### ColorPickerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前颜色（受控） | `string` | — |
| defaultValue | 默认颜色 | `string` | — |
| onChange | 颜色变化回调 | `(value: string) => void` | — |
| onChangeEnd | 拖拽结束回调 | `(value: string) => void` | — |
| format | 输出格式 | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` |
| swatches | 预设色板 | `string[]` | — |
| swatchesPerRow | 每行色块数 | `number` | `10` |
| withPicker | 是否显示色板 | `boolean` | `true` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
