---
category: Components
title: FileInput
subtitle: 文件输入
description: react-ui FileInput 文件输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户选择一个或多个文件，并显示文件名/预览时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。
可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

当 `multiple` 为 `false` 时：


当 `multiple` 为 `true` 时：

```tsx
import { useState } from 'react';
import { FileInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<File | null>(null);
  return <FileInput value={value} onChange={setValue} />;
}
```

```tsx
import { useState } from 'react';
import { FileInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<File[]>([]);
  return <FileInput multiple value={value} onChange={setValue} />;
}
```

### 非受控模式

`FileInput` 可以像原生 `input[type="file"]` 一样用于非受控表单。
设置 `name` 属性以在表单提交时将文件输入值包含在 `FormData` 对象中。
要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `FileInput` 与 `FormData` 的示例用法：

```tsx
import { FileInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const files = formData.getAll('file');
        console.log('File input value:', files);
      }}
    >
      <FileInput label="上传你的文件" name="file" />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 多选

设置 `multiple` 以允许用户选择多个文件：

<code src="./demo/multiple.tsx"></code>

### 接受文件类型

设置 `accept` 属性以将文件选择限制为特定的 mime 类型：

<code src="./demo/accept.tsx"></code>

### 可清除

设置 `clearable` 属性以在选择文件时在输入框的右侧区域显示清除按钮。
请注意，若定义了自定义右侧区域，则不会渲染清除按钮。

<code src="./demo/clearable.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

<code src="./demo/sections.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### FileInputProps 类型

`FileInputProps` 类型是一个泛型接口，接受单个类型参数：
`multiple` 值。

```tsx
import type { FileInputProps } from '@xiaoye-react/ui';

type SingleInputProps = FileInputProps<false>;
type MultipleInputProps = FileInputProps<true>;
```

<InputFeatures component="FileInput" element="input"></InputFeatures>

<ClearSectionMode></ClearSectionMode>

<InputSections component="FileInput"></InputSections>

<StylesApiSelectors component="FileInput"></StylesApiSelectors>

<GetElementRef component="FileInput" refType="button"></GetElementRef>

<InputAccessibility component="FileInput"></InputAccessibility>



## API {#api}

### FileInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前文件（受控） | `File \| File[] \| null` | — |
| defaultValue | 默认文件 | `File \| File[]` | — |
| onChange | 文件变化回调 | `(files) => void` | — |
| accept | 允许的文件类型 | `string` | — |
| multiple | 是否允许多选 | `boolean` | `false` |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| clearable | 是否可清空 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
