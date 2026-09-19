---
category: Components
title: Textarea
subtitle: 多行文本
description: react-ui Textarea 多行文本组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户输入多行文本，支持自动调整高度时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框右侧。
可使用 `loadingPosition` 属性将其位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控

```tsx
import { useState } from 'react';
import { Textarea } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <Textarea
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

### 非受控

`Textarea` 可以像原生 `textarea` 元素一样用于非受控表单。
设置 `name` 属性以在表单提交时将 textarea 值包含在 `FormData` 对象中。
要控制非受控表单中的初始值，请使用 `defaultValue` 属性。

非受控 `Textarea` 与 `FormData` 的用法示例：

```tsx
import { Textarea } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Textarea value:', formData.get('message'));
      }}
    >
      <Textarea label="输入你的消息" name="message" />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 底部区域

使用 `__bottomSection` 属性在输入框底部边框内渲染内容。
这适用于显示字符计数器、提示或其他补充信息：

<code src="./demo/bottomSection.tsx"></code>

### 自动调整大小

自动调整大小的 textarea 高度会增长，直到达到 maxRows，如果未设置 maxRows 则会无限增长：

<code src="./demo/autosize.tsx"></code>

### 启用调整大小

默认情况下，[resize](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) 为 `none`；
要启用它，请将 `resize` 属性设置为 `vertical` 或 `both`：

<code src="./demo/resize.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="Textarea" element="textarea"></InputFeatures>

<StylesApiSelectors component="Textarea"></StylesApiSelectors>

<GetElementRef component="Textarea" refType="textarea"></GetElementRef>

<InputAccessibility component="Textarea"></InputAccessibility>



## API {#api}

### TextareaProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值（非受控） | `string` | — |
| onChange | 值变化回调 | `(event: ChangeEvent<HTMLTextAreaElement>) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| minRows | 自适应高度的最小行数 | `number` | — |
| maxRows | 自适应高度的最大行数 | `number` | — |
| rows | 固定显示行数 | `number` | `4` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
