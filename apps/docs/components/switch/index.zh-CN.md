---
category: Components
title: Switch
subtitle: 开关
description: react-ui Switch 开关组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要在两个互斥状态之间切换（开/关、启用/禁用）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控

```tsx
import { useState } from 'react';
import { Switch } from '@xiaoye-react/ui';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

### 非受控

`Switch` 可以像原生 `input[type="checkbox"]` 一样用于非受控表单。
设置 `name` 属性以在表单提交时将开关值包含在 `FormData` 对象中。
要控制非受控表单中的初始选中状态，请使用 `defaultChecked` 属性。

非受控 `Switch` 与 `FormData` 的用法示例：

```tsx
import { Switch } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Switch value:', !!formData.get('notifications'));
      }}
    >
      <Switch label="启用通知" name="notifications" defaultChecked />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 状态

<code src="./demo/states.tsx"></code>

### 内部标签

<code src="./demo/labels.tsx"></code>

### 描述与错误

<code src="./demo/descriptionAndError.tsx"></code>

### 图标标签

<code src="./demo/iconLabels.tsx"></code>

### 带 Tooltip

使用 [Tooltip](/components/tooltip/) 直接包裹 `Switch` 即可显示提示：

<code src="./demo/tooltip.tsx"></code>

### 指针光标

默认情况下，开关输入和标签具有 `cursor: default`（与原生 `input[type="checkbox"]` 相同）。
要将光标更改为 pointer，请在 [theme](/docs/theming/theme-object/) 上设置 `cursorType`：

```tsx
import { createTheme, UIProvider, Switch } from '@xiaoye-react/ui';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Switch label="指针光标" />
    </UIProvider>
  );
}
```

### Switch.Group

<code src="./demo/groupConfigurator.tsx"></code>

### 与非受控表单一起使用的 Switch.Group

`Switch.Group` 可以用于非受控表单，它渲染一个隐藏输入，
使用 `hiddenInputValuesSeparator` 属性将所有选中值连接成单个字符串。

用于非受控表单的属性：
- `name` – 传递给隐藏输入的 name 属性
- `hiddenInputValuesSeparator` – 用于将选中值连接成单个字符串的字符串，默认为 `','`
- `hiddenInputProps` – 传递给隐藏输入的附加属性

```tsx
export function UncontrolledForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Switch group value:', formData.get('frameworks'));
      }}
    >
      <Switch.Group label="框架" name="frameworks" hiddenInputValuesSeparator="|">
        <Switch label="React" value="react" />
        <Switch label="Angular" value="ng" />
      </Switch.Group>
      <button type="submit">提交</button>
    </form>
  );
}
```

### Switch.Group 禁用

<code src="./demo/groupDisabled.tsx"></code>

### 受控 Switch.Group

```tsx
import { useState } from 'react';
import { Switch } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Switch.Group value={value} onChange={setValue}>
      <Switch value="react" label="React" />
      <Switch value="svelte" label="Svelte" />
    </Switch.Group>
  );
}
```

### 根据选中状态更改样式

<code src="./demo/styles.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 获取输入 ref

```tsx
import { useRef } from 'react';
import { Switch } from '@xiaoye-react/ui';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Switch ref={ref} />;
}
```

### 可访问性

`Switch` 是一个普通的 `input[type="checkbox"]`。如果在没有 `label` 属性的情况下使用 `Switch`，请设置 `aria-label`：

```tsx
import { Switch } from '@xiaoye-react/ui';

// -> 不好，输入框没有标签
function Bad() {
  return <Switch />;
}

// -> 好，输入框有 aria-label
function Good() {
  return <Switch aria-label="我同意所有内容" />;
}

// -> 好，输入框有关联标签
function AlsoGood() {
  return <Switch label="我同意所有内容" />;
}
```

<WrapperProps component="Switch"></WrapperProps>

<StylesApiSelectors component="Switch"></StylesApiSelectors>



## API {#api}

### SwitchProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控） | `boolean` | — |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| onChange | 选中状态变化回调 | `(event: ChangeEvent<HTMLInputElement>) => void` | — |
| label | 标签文字 | `ReactNode` | — |
| description | `label` 下方的描述 | `ReactNode` | — |
| error | `label` 下方的错误信息，同时给轨道着错误色 | `ReactNode` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| onLabel | 开启标签 | `ReactNode` | — |
| offLabel | 关闭标签 | `ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
