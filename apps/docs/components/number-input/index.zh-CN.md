---
category: Components
title: NumberInput
subtitle: 数字输入
description: react-ui NumberInput 数字输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户输入数字，支持步进按钮、范围限制、按住加速时使用。

## 代码演示 {#examples}

### 用法

`NumberInput` 是库内自行实现的数值输入（不依赖 react-number-format），支持 `min`/`max`/`step` 步进、
`prefix`/`suffix`、`thousandSeparator` 千位分隔与 `hideControls` 隐藏增减控件。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框右侧。
可使用 `loadingPosition` 属性将其位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控

```tsx
import { useState } from 'react';
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | number>('');
  return <NumberInput value={value} onChange={setValue} />;
}
```

### 非受控

`NumberInput` 可以像原生 `input[type="number"]` 一样用于非受控表单。
设置 `name` 属性以在表单提交时将数字输入值包含在 `FormData` 对象中。
要控制非受控表单中的初始值，请使用 `defaultValue` 属性。

非受控 `NumberInput` 与 `FormData` 的用法示例：

```tsx
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Number input value:', formData.get('quantity'));
      }}
    >
      <NumberInput
        label="输入数量"
        name="quantity"
        defaultValue="1"
        min="1"
        max="100"
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### onChange

`onChange` 接收当前值：能转成数字时是 `number`，其余情况（空输入、只有负号、结尾是小数点等）回退为 `string`，
以便输入框保留用户的中间输入状态。表单处理直接用 `onChange` 即可：

```tsx
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      prefix="$"
      thousandSeparator=","
      // 输入 $1,234 时收到 1234
      onChange={value => console.log('value:', value)}
    />
  );
}
```

### min 和 max

设置 `min` 和 `max` 属性以限制输入值：

<code src="./demo/minMax.tsx"></code>

### 前缀和后缀

设置 `prefix` 和 `suffix` 属性以在给定字符串添加到输入值的开始或结尾：

<code src="./demo/prefixSuffix.tsx"></code>

### 千位分隔符

设置 `thousandSeparator` 属性以使用字符分隔千位。可使用 `thousandsGroupStyle` 控制分组逻辑，它接受：`thousand`、`lakh`、`wan`、`none` 值。

<code src="./demo/thousandsSeparator.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 增减控件

默认情况下，右侧区域被递增和递减按钮占据。
要隐藏它们，请设置 `hideControls` 属性。也可使用 `rightSection` 属性在右侧区域渲染任何内容
以替换默认控件。

<code src="./demo/rightSection.tsx"></code>

### 自定义增减控件

可使用带有 `increment` 和 `decrement` 函数的 ref 来创建自定义控件：

<code src="./demo/handlers.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="NumberInput" element="input"></InputFeatures>

<InputSections component="NumberInput"></InputSections>

<StylesApiSelectors component="NumberInput"></StylesApiSelectors>

<GetElementRef component="NumberInput" refType="input"></GetElementRef>

<InputAccessibility component="NumberInput"></InputAccessibility>



## API {#api}

### NumberInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前数值（受控） | `number \| string` | — |
| defaultValue | 默认数值 | `number \| string` | — |
| onChange | 数值变化回调 | `(value: number \| string) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| min | 最小值 | `number` | — |
| max | 最大值 | `number` | — |
| step | 步长 | `number` | `1` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
