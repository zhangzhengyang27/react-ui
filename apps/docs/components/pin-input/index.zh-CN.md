---
category: Components
title: PinInput
subtitle: 验证码输入
description: react-ui PinInput 验证码输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户输入一串固定长度的验证码或 PIN（如短信验证码）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { PinInput } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState('');
  return <PinInput value={value} onChange={setValue} />;
}
```

### 非受控模式

`PinInput` 可以像原生 input 元素一样用于非受控表单。设置 `name` 属性以在表单提交时将 PIN 输入值包含在 `FormData` 对象中。要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `PinInput` 与 `FormData` 的示例用法：

```tsx
import { PinInput } from '@react-ui/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('PIN value:', formData.get('pin'));
      }}
    >
      <PinInput
        name="pin"
        length={4}
        oneTimeCode
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 正则类型

可使用正则表达式验证用户输入。不匹配给定表达式的字符将被忽略。例如，要创建一个只接受 `0` 到 `3` 数字的 `PinInput`，请设置 `type={/^[0-3]+/}`：

<code src="./demo/regexp.tsx"></code>

### 一次性验证码

某些操作系统会暴露最后接收到的短信验证码，供键盘等应用使用。如果当前表单输入请求此验证码，键盘会自适应并提供该验证码作为键盘建议。`oneTimeCode` 属性会使输入框设置 `autocomplete="one-time-code"`，从而允许使用该功能。

```tsx
import { PinInput } from '@react-ui/ui';

function OneTimeCodeInput() {
  return <PinInput oneTimeCode />;
}
```

### 成功状态

<code src="./demo/success.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

输入框没有关联标签。请设置 `aria-label` 使屏幕阅读器可以识别该组件：

```tsx
import { PinInput } from '@react-ui/ui';

function Accessibility() {
  return <PinInput aria-label="一次性验证码" />;
}
```

<StylesApiSelectors component="PinInput"></StylesApiSelectors>



## API {#api}

### PinInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前 PIN（受控） | `string` | — |
| defaultValue | 默认 PIN | `string` | — |
| onChange | PIN 变化回调 | `(value: string) => void` | — |
| length | PIN 长度 | `number` | `4` |
| type | 输入类型 | `'text' \| 'number' \| 'alphanumeric'` | `'text'` |
| mask | 是否掩码显示 | `boolean` | `false` |
| placeholder | 占位符 | `string` | `'○'` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| onComplete | 全部填满时回调 | `(value: string) => void` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
