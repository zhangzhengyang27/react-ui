---
category: Components
title: Chip
subtitle: 芯片
description: react-ui Chip 芯片组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要紧凑的复选样式控制项，常用于筛选器、紧凑多选场景时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { Chip } from '@xiaoye-react/ui';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Chip checked={checked} onChange={() => setChecked((v) => !v)}>
      My chip
    </Chip>
  );
}
```

### 状态

<code src="./demo/states.tsx"></code>

### 带 Tooltip 的 Chip

要将 `Chip` 与 [Tooltip](/components/tooltip/) 及其他类似组件一起使用，请在 [Tooltip](/components/tooltip/) 组件上设置 `refProp="rootRef"`：

<code src="./demo/tooltip.tsx"></code>

### Chip.Group

`Chip.Group` 组件管理子 Chip 组件的状态。
设置 `multiple` 属性以允许同时选择多个 chip：

<code src="./demo/group.tsx"></code>

### 受控 Chip.Group

```tsx
import { useState } from 'react';
import { Chip } from '@xiaoye-react/ui';

function Single() {
  // multiple 为 false（默认）时值为字符串
  const [value, setValue] = useState('react');

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
  );
}

function Multiple() {
  // multiple 为 true 时值为字符串数组
  const [value, setValue] = useState(['react']);

  return (
    <Chip.Group multiple value={value} onChange={setValue}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
  );
}
```

### 取消选择 radio chip

<code src="./demo/deselect.tsx"></code>

<WrapperProps component="Chip"></WrapperProps>



## API {#api}

### ChipProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控） | `boolean` | — |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| onChange | 选中状态变化回调 | `(checked: boolean) => void` | — |
| value | 在 ChipGroup 中的值 | `string` | — |
| variant | 视觉变体 | `'filled' \| 'outline'` | `'outline'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` |
| color | 主题色 | `UIColor` | `'blue'` |
| disabled | 是否禁用 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
