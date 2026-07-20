---
category: Components
title: TextInput
subtitle: 文本输入
description: 用于接收单行文本输入的基础表单组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要标准的单行文本输入框时使用。TextInput 是 Input 组件的基础封装，适用于表单构建场景。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性可显示加载指示器。默认情况下，加载器显示在输入框右侧；通过 `loadingPosition` 属性可将其位置更改为 `'left'` 或 `'right'`。该状态常用于 API 调用、搜索或验证等异步操作。

<code src="./demo/loading.tsx"></code>

### 受控

```tsx
import { useState } from 'react';
import { TextInput } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

### 非受控

TextInput 可像原生 `input[type="text"]` 一样用于非受控表单。设置 `name` 属性后，表单提交时该值将包含在 `FormData` 对象中；通过 `defaultValue` 属性可设置非受控表单中的初始值。

```tsx
import { TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Text input value:', formData.get('name'));
      }}
    >
      <TextInput label="姓名" name="name" />
      <button type="submit">提交</button>
    </form>
  );
}
```

<code src="./demo/sections.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="TextInput" element="input"></InputFeatures>

<InputSections component="TextInput"></InputSections>

<StylesApiSelectors component="TextInput"></StylesApiSelectors>

<GetElementRef component="TextInput" refType="input"></GetElementRef>

<InputAccessibility component="TextInput"></InputAccessibility>

## API {#api}

### TextInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值（非受控） | `string` | — |
| onChange | 值变化回调 | `(event: ChangeEvent<HTMLInputElement>) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| leftSection | 左侧内容 | `ReactNode` | — |
| rightSection | 右侧内容 | `ReactNode` | — |
| variant | 视觉变体 | `'default' \| 'filled' \| 'unstyled'` | `'default'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| withErrorStyles | 是否在错误状态下应用错误样式 | `boolean` | `true` |

除上表所列属性外，TextInput 还支持所有原生 `<input>` 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
