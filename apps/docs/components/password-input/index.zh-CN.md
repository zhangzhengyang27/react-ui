---
category: Components
title: PasswordInput
subtitle: 密码输入
description: react-ui PasswordInput 密码输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户安全输入密码，并支持可见性切换、强度提示时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { PasswordInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <PasswordInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

### 非受控模式

`PasswordInput` 可以像原生 `input[type="password"]` 一样用于非受控表单。设置 `name` 属性以在表单提交时将密码输入值包含在 `FormData` 对象中。要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `PasswordInput` 与 `FormData` 的示例用法：

```tsx
import { PasswordInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Password value:', formData.get('password'));
      }}
    >
      <PasswordInput
        label="输入你的密码"
        name="password"
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 受控可见性切换

使用 `visible` 和 `onVisibilityChange` 属性控制可见性状态。例如，这些属性可用于在两个输入框之间同步可见性状态：

<code src="./demo/controlledVisibility.tsx"></code>

### 修改可见性切换图标

要更改可见性切换图标，请向 `visibilityToggleIcon` 传入一个接受 `reveal` 属性的 React 组件：

<code src="./demo/visibilityIcon.tsx"></code>

### 不使用可见性切换

若无需可见性切换按钮，请改用 [TextInput](/components/text-input/) 组件：



注意，当使用 `rightSection` 属性时，不会渲染可见性切换按钮。

```tsx
import { TextInput } from '@xiaoye-react/ui';

function Demo() {
  return <TextInput type="password" />;
}
```

<code src="./demo/sections.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 禁用

当设置 `disabled` 属性时，可见性切换按钮会被隐藏：






要为可见性切换按钮设置 `aria-label`，请使用 `visibilityToggleButtonProps` 属性：

```tsx
import { PasswordInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <PasswordInput
      label="密码"
      visibilityToggleButtonProps={{
        'aria-label': '切换密码可见性',
      }}
    />
  );
}
```

<code src="./demo/disabled.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="PasswordInput" element="input"></InputFeatures>

<InputSections component="PasswordInput"></InputSections>

<StylesApiSelectors component="PasswordInput"></StylesApiSelectors>

<GetElementRef component="PasswordInput" refType="input"></GetElementRef>

<InputAccessibility component="PasswordInput"></InputAccessibility>



## API {#api}

### PasswordInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值（非受控） | `string` | — |
| onChange | 值变化回调 | `(event: ChangeEvent<HTMLInputElement>) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| visible | 是否明文显示（受控） | `boolean` | — |
| onVisibilityChange | 可见性切换回调 | `(visible: boolean) => void` | — |
| visibilityToggleButtonProps | 切换按钮的属性 | `{ ... }` | — |
| visibilityToggleIcon | 自定义切换图标 | `(reveal: boolean) => ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
