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

`NumberInput` 基于 [react-number-format](https://www.npmjs.com/package/react-number-format)。
它支持原始包中 `NumericFormat` 组件的大部分属性。

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

### BigInt 值

`NumberInput` 也支持 `bigint` 值。BigInt 模式从 `value` 或 `defaultValue` 推断：

- `value`/`defaultValue` 可以是 `bigint | string`
- `onChange` 接收 `bigint | string`
- `min`、`max`、`step` 和 `startValue` 支持 `bigint`
- BigInt 模式仅支持整数（`allowDecimal`/小数格式化属性不会启用小数解析）

`string` 仍用作中间状态的回退（例如 `''` 或 `'-'`）。

<code src="./demo/bigInt.tsx"></code>

### onChange 与 onValueChange

`NumberInput` 提供两个回调属性来处理值变化：

- **`onChange`**: 接收简化值（默认模式下为 `number | string`，BigInt 模式下为 `bigint | string`）。这是大多数用例推荐的回调。当可能时值为数字/bigint，在边缘情况下为字符串（空输入、极大数字、末尾小数、中间 BigInt 输入状态）。

- **`onValueChange`**: 接收来自 `react-number-format` 的完整负载，包括：
  - `floatValue`: 数值（或 `undefined`）
  - `formattedValue`: 格式化字符串值（带前缀/后缀/分隔符）
  - `value`: 原始未格式化字符串值
  - 有关变化来源的附加元数据

当需要访问格式化值或有关变化的元数据时（例如，它来自用户输入、增减按钮还是程序化更改），请使用 `onValueChange`。对于简单的表单处理，`onChange` 已足够。

```tsx
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      prefix="$"
      thousandSeparator=","
      // onChange 接收：1234
      onChange={(value) => console.log('Simple value:', value)}
      // onValueChange 接收：{ floatValue: 1234, formattedValue: '$1,234', value: '1234' }
      onValueChange={(payload) => console.log('Full payload:', payload)}
    />
  );
}
```

### min 和 max

设置 `min` 和 `max` 属性以限制输入值：

<code src="./demo/minMax.tsx"></code>

### 限制行为

默认情况下，值在输入框失焦时被限制。若设置 `clampBehavior="strict"`，则将无法输入超出 min/max 范围的值。注意，如果 min/max 范围很紧，例如 `min={10}` 和 `max={20}`，此选项可能会导致问题。若需完全禁用值限制，请设置 `clampBehavior="none"`。

<code src="./demo/strictClamp.tsx"></code>

### 边界回调

使用 `onMinReached` 和 `onMaxReached` 在值达到 `min` 或 `max` 边界时调用函数。
当用户尝试使用控件或键盘箭头递增超过 `max` 或递减低于 `min` 时，会触发这些回调。

```tsx
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      min={0}
      max={100}
      onMinReached={() => console.log('Minimum value reached')}
      onMaxReached={() => console.log('Maximum value reached')}
    />
  );
}
```

### 聚焦时全选

设置 `selectAllOnFocus` 以在字段获得焦点时自动选择整个输入值。
这在希望用户替换值而非编辑时非常有用：

```tsx
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return <NumberInput selectAllOnFocus defaultValue={100} />;
}
```

### 前缀和后缀

设置 `prefix` 和 `suffix` 属性以在给定字符串添加到输入值的开始或结尾：

<code src="./demo/prefixSuffix.tsx"></code>

### 负数

默认情况下允许负数。设置 `allowNegative={false}` 以仅允许正数。

<code src="./demo/allowNegative.tsx"></code>

### 小数

默认情况下允许小数。设置 `allowDecimal={false}` 以仅允许整数。

<code src="./demo/allowDecimal.tsx"></code>

### 小数位数

`decimalScale` 控制允许的小数位数：

<code src="./demo/decimalScale.tsx"></code>

### 固定小数位数

设置 `fixedDecimalScale` 以始终显示固定的小数位数：

<code src="./demo/fixedDecimalScale.tsx"></code>

### 小数分隔符

设置 `decimalSeparator` 以更改小数分隔符字符：

<code src="./demo/decimalSeparator.tsx"></code>

### 千位分隔符

设置 `thousandSeparator` 属性以使用字符分隔千位。可使用 `thousandsGroupStyle` 控制分组逻辑，它接受：`thousand`、`lakh`、`wan`、`none` 值。

<code src="./demo/thousandsSeparator.tsx"></code>

### 失焦时去除前导零

默认情况下，输入框失去焦点时会去除前导零（例如，`00100` 变为 `100`）。
可通过设置 `trimLeadingZeroesOnBlur={false}` 禁用此行为：

<code src="./demo/trimLeadingZeroes.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 增减控件

默认情况下，右侧区域被递增和递减按钮占据。
要隐藏它们，请设置 `hideControls` 属性。也可使用 `rightSection` 属性在右侧区域渲染任何内容
以替换默认控件。

<code src="./demo/rightSection.tsx"></code>

### 按住时增减

设置 `stepHoldDelay` 和 `stepHoldInterval` 属性以定义点击并按住递增/递减控件时的行为：

<code src="./demo/hold.tsx"></code>

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
| fixedDecimalScale | 是否固定小数位数 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
