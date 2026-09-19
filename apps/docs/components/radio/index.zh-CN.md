---
category: Components
title: Radio
subtitle: 单选框
description: react-ui Radio 单选框组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户在一组互斥选项中选择一个时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控

```tsx
import { useState } from 'react';
import { Radio } from '@xiaoye-react/ui';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

### 非受控

`Radio` 可以像原生 `input[type="radio"]` 一样用于非受控表单。
设置 `name` 和 `value` 属性以在表单提交时将单选按钮值包含在 `FormData` 对象中。
要控制非受控表单中的初始选中状态，请使用 `defaultChecked` 属性。

非受控 `Radio` 与 `FormData` 的用法示例：

```tsx
import { Radio } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Radio value:', formData.get('option'));
      }}
    >
      <Radio name="option" value="option1" label="选项 1" />
      <Radio name="option" value="option2" label="选项 2" defaultChecked />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 状态

<code src="./demo/states.tsx"></code>

### 更改图标颜色

<code src="./demo/iconColor.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

### 指针光标

默认情况下，单选按钮输入和标签具有 `cursor: default`（与原生 `input[type="radio"]` 相同）。
要将光标更改为 pointer，请在 [theme](/docs/theming/theme-object/) 上设置 `cursorType`：

```tsx
import { createTheme, UIProvider, Radio } from '@xiaoye-react/ui';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Radio label="指针光标" />
    </UIProvider>
  );
}
```

### 带 Tooltip 的 Radio

使用 `Tooltip` 直接包裹 `Radio`，悬停时即可显示提示：

<code src="./demo/tooltip.tsx"></code>

### Radio.Group 组件

<code src="./demo/groupConfigurator.tsx"></code>

### Radio.Group 禁用状态

<code src="./demo/groupDisabled.tsx"></code>

### 受控 Radio.Group

```tsx
import { useState } from 'react';
import { Radio } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <Radio.Group
      value={value}
      onChange={setValue}
      name="favoriteFramework"
      label="选择你最喜欢的框架/库"
      description="这是匿名的"
      required
    >
      <Radio value="react" label="React" />
      <Radio value="svelte" label="Svelte" />
      <Radio value="ng" label="Angular" />
      <Radio value="vue" label="Vue" />
    </Radio.Group>
  );
}
```

### Radio.Indicator

`Radio.Indicator` 外观与 `Radio` 组件完全相同，但它没有
任何语义含义；它只是单选按钮状态的视觉表示。可在需要显示单选按钮状态但不需要任何与指示器交互的地方使用它。
例如，它适用于基于按钮的卡片、树等。

注意，`Radio.Indicator` 无法获得焦点或使用键盘选择。它不具备
可访问性，不应作为 `Radio` 组件的替代品。

<code src="./demo/indicator.tsx"></code>

### Radio.Card 组件

`Radio.Card` 组件可用作 `Radio` 的替代品，用于构建自定义
卡片/按钮/其他作为单选按钮工作的元素。组件的根元素具有 `role="radio"` 属性，默认具备可访问性并支持与 `input[type="radio"]` 相同的键盘交互。


可像使用 `Radio` 组件一样将 `Radio.Card` 与 `Radio.Group` 一起使用：

<code src="./demo/card.tsx"></code>

<code src="./demo/cardGroup.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

设置 `aria-label` 或 `label` 属性以使单选按钮可访问：

```tsx
import { Radio } from '@xiaoye-react/ui';

// 不好，输入框没有标签
function Bad() {
  return <Radio />;
}

// 好，输入框由 aria-label 标记
function GoodAriaLabel() {
  return <Radio aria-label="我的单选框" />;
}

// 好，输入框由 label 元素标记
function GoodLabel() {
  return <Radio label="我的单选框" />;
}
```

<WrapperProps component="Radio"></WrapperProps>

<GetElementRef component="Radio" refType="input"></GetElementRef>

<StylesApiSelectors component="Radio"></StylesApiSelectors>



## API {#api}

### RadioProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控） | `boolean` | — |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| onChange | 选中状态变化回调 | `(event) => void` | — |
| value | Radio.Group 中的值 | `string` | — |
| label | 标签文字 | `ReactNode` | — |
| description | 描述文字 | `ReactNode` | — |
| error | 错误信息 | `ReactNode` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
