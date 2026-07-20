---
category: Components
title: JsonInput
subtitle: JSON 输入
description: react-ui JsonInput JSON 输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户输入并编辑 JSON 文本，且自动校验语法正确性时使用。

## 代码演示 {#examples}

### 用法

`JsonInput` 基于 [Textarea](/components/textarea/) 组件。它内置 JSON 验证逻辑，并支持在失焦时格式化输入值：

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { JsonInput } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState('');
  return <JsonInput value={value} onChange={setValue} />;
}
```

### 非受控模式

`JsonInput` 可以像原生 `textarea` 元素一样用于非受控表单。设置 `name` 属性以在表单提交时将 JSON 输入值包含在 `FormData` 对象中。要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `JsonInput` 与 `FormData` 的示例用法：

```tsx
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('JSON input value:', formData.get('data'));
      }}
    >
      <JsonInput
        label="输入 JSON"
        name="data"
        defaultValue="{}"
        formatOnBlur
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 自定义序列化

可提供自定义的 `serialize` 和 `deserialize` 函数，以支持标准 JSON 以外的数据格式。当需要处理 `Date`、`Map`、`Set`、`undefined` 或其他不可 JSON 序列化的类型时，这非常有用。

下面的示例展示了如何使用 [superjson](https://github.com/blitz-js/superjson) 库处理扩展数据类型：


`deserialize` 函数在输入无效时必须抛出错误。当启用 `formatOnBlur` 时，`serialize` 和 `deserialize` 函数都会用于格式化。

```tsx
import { useState } from 'react';
import { JsonInput } from '@react-ui/ui';
import superjson from 'superjson';

function Demo() {
  const [value, setValue] = useState(
    superjson.stringify(
      {
        name: 'John Doe',
        createdAt: new Date(),
        tags: new Set(['admin', 'user']),
        metadata: new Map([['role', 'developer']]),
      },
      null,
      2
    )
  );

  return (
    <JsonInput
      label="使用 superjson 的扩展 JSON"
      description="支持 Date、Map、Set、BigInt、RegExp 等"
      placeholder="输入扩展 JSON"
      value={value}
      onChange={setValue}
      serialize={(val) => superjson.stringify(val, null, 2)}
      deserialize={superjson.parse}
      validationError="扩展 JSON 格式无效"
      formatOnBlur
      autosize
      minRows={6}
    />
  );
}
```

### 输入属性

<code src="./demo/configurator.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="JsonInput" element="textarea"></InputFeatures>

<StylesApiSelectors component="JsonInput"></StylesApiSelectors>

<GetElementRef component="JsonInput" refType="textarea"></GetElementRef>

<InputAccessibility component="JsonInput"></InputAccessibility>



## API {#api}

### JsonInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前 JSON 字符串（受控） | `string` | — |
| defaultValue | 默认 JSON 字符串（非受控） | `string` | — |
| onChange | JSON 变化回调 | `(value: string) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息（解析失败时自动设置） | `ReactNode` | — |
| formatOnBlur | 失焦时自动格式化 | `boolean` | `false` |
| validationError | 自定义校验错误信息 | `string` | — |
| serialize | 序列化函数 | `(value: any) => string` | `JSON.stringify` |
| deserialize | 反序列化函数 | `(value: string) => any` | `JSON.parse` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
