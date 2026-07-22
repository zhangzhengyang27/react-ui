---
category: Components
title: ColorInput
subtitle: 颜色输入
description: react-ui ColorInput 颜色输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户输入或选择颜色值（支持 hex、rgb、hsl）时使用，常用于主题自定义场景。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。
可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { ColorInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  return <ColorInput value={value} onChange={setValue} />;
}
```

### 格式

该组件支持 hex、hexa、rgb、rgba、hsl 和 hsla 颜色格式。
仅对 hexa、rgba 和 hsla 格式显示更改不透明度的滑块：

<code src="./demo/formatsConfigurator.tsx"></code>

### 保留无效输入

默认情况下，`ColorInput` 会在失焦时恢复为最后一个已知有效值。
要更改此行为并保留无效值，请设置 `fixOnBlur={false}`：

<code src="./demo/fixOnBlur.tsx"></code>

### onChangeEnd

`onChangeEnd` 在用户停止拖动滑块或更改输入值时调用。
当需要仅在用户完成与组件交互时才更新颜色时非常有用：

<code src="./demo/onChangeEnd.tsx"></code>

### 禁用自由输入

要禁用自由输入，请设置 `disallowInput` 属性：

<code src="./demo/disallowInput.tsx"></code>

### 使用色板

可添加任意数量的预定义颜色色板：


默认情况下，每行显示 7 个色板。可使用 `swatchesPerRow` 属性更改此设置，
与 [ColorPicker](/components/color-picker/) 组件相同：


如需将颜色选择限制为某些颜色——禁用颜色选择器、禁止自由输入
并隐藏取色器：

<code src="./demo/swatches.tsx"></code>

<code src="./demo/swatchesOnly.tsx"></code>

### 点击颜色色板时关闭下拉框

要在点击某个颜色色板时关闭下拉框，请设置 `closeOnColorSwatchClick` 属性：

<code src="./demo/closeOnColorSwatchClick.tsx"></code>

### 隐藏下拉框

要隐藏下拉框，请设置 `withPicker={false}`：

<code src="./demo/withPicker.tsx"></code>

### 取色器

默认情况下，如果 [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)
可用，取色器图标将显示在输入框的右侧区域。
要禁用它，请设置 `withEyeDropper={false}`：

<code src="./demo/noEyeDropper.tsx"></code>

### 修改取色器图标

可使用 `eyeDropperIcon` 属性将取色器图标替换为任何 React 节点：



请注意，默认情况下 `ColorPicker` 在左侧区域有颜色预览，在右侧区域有取色器按钮。
可使用 `leftSection` 和 `rightSection` 属性将这些元素替换为任何 React 节点：

<code src="./demo/eyeDropperIcon.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

### 只读

<code src="./demo/readOnly.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="ColorInput" element="input"></InputFeatures>

<InputSections component="ColorInput"></InputSections>

<StylesApiSelectors component="ColorInput"></StylesApiSelectors>

<GetElementRef component="ColorInput" refType="input"></GetElementRef>

<InputAccessibility component="ColorInput"></InputAccessibility>



## API {#api}

### ColorInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前颜色值（受控） | `string` | — |
| defaultValue | 默认颜色值（非受控） | `string` | — |
| onChange | 颜色变化回调 | `(value: string) => void` | — |
| format | 颜色值格式 | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| placeholder | 占位提示 | `string` | — |
| withPicker | 是否显示内置色板 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
