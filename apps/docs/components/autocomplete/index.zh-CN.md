---
category: Components
title: Autocomplete
subtitle: 自动完成
description: react-ui Autocomplete 自动完成组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要在用户输入时从预设数据集中实时筛选并提示候选项，提升输入效率时使用。

## 代码演示 {#examples}

### 用法

`Autocomplete` 根据输入为用户提供建议列表，
但用户不受建议限制，可以输入任何内容。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。
可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

`Autocomplete` 的值必须是字符串；不支持其他类型。
`onChange` 函数以字符串值作为唯一参数调用。

```tsx
import { useState } from 'react';
import { Autocomplete } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  return <Autocomplete data={[]} value={value} onChange={setValue} />;
}
```

### 非受控模式

`Autocomplete` 可以像原生 `input` 元素一样用于非受控表单。
设置 `name` 属性以在表单提交时将 autocomplete 值包含在 `FormData` 对象中。
要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `Autocomplete` 与 `FormData` 的示例用法：

```tsx
import { Autocomplete } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Autocomplete value:', formData.get('country'));
      }}
    >
      <Autocomplete
        label="选择你的国家"
        placeholder="选择一个"
        name="country"
        data={['United States', 'Canada', 'Mexico']}
        defaultValue="United States"
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

<code src="./demo/limit.tsx"></code>

### 分组选项

<code src="./demo/groups.tsx"></code>

### 禁用选项

当选项被禁用时，它无法被选择，并且在键盘导航中会被忽略。

<code src="./demo/disabledOptions.tsx"></code>

### 在 Popover 内使用

`Autocomplete` 的下拉框始终通过 Portal 渲染，可直接在 `Popover`、`Modal` 等浮层内使用：

<code src="./demo/withinPopover.tsx"></code>

### 可清除

设置 `clearable` 属性以在右侧区域显示清除按钮。按钮在以下情况下不显示：

- 组件没有值
- 组件被禁用
- 组件为只读

<code src="./demo/clearable.tsx"></code>

### 下拉框位置

默认情况下，如果有足够空间，下拉框显示在输入框下方；否则显示在输入框上方。
可通过设置 `position` 属性来更改此行为，该属性会传递给底层的
[Combobox](/components/combobox) 组件。

下拉框始终显示在输入框上方的示例：

<code src="./demo/dropdownPosition.tsx"></code>

<code src="./demo/sections.tsx"></code>

### Input 属性

<code src="./demo/configurator.tsx"></code>

### 只读

设置 `readOnly` 使输入框只读。设置 `readOnly` 后，
`Autocomplete` 不会显示建议，也不会调用 `onChange` 函数。

<code src="./demo/readOnly.tsx"></code>

### 禁用

设置 `disabled` 以禁用输入框。设置 `disabled` 后，
用户无法与输入框交互，`Autocomplete` 也不会显示建议。

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<ComboboxData component="Autocomplete"></ComboboxData>

<ComboboxLargeData component="Autocomplete"></ComboboxLargeData>

<ComboboxProps component="Autocomplete"></ComboboxProps>

<InputSections component="Autocomplete"></InputSections>

<InputFeatures component="Autocomplete" element="input"></InputFeatures>

<StylesApiSelectors component="Autocomplete"></StylesApiSelectors>

<GetElementRef component="Autocomplete" refType="input"></GetElementRef>

<InputAccessibility component="Autocomplete"></InputAccessibility>



## API {#api}

### AutocompleteProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前输入值（受控） | `string` | — |
| defaultValue | 默认输入值 | `string` | — |
| onChange | 输入值变化回调 | `(value: string) => void` | — |
| data | 候选项数组 | `string[] \| { value: string; label?: string }[]` | `[]` |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| limit | 最多显示候选项数量 | `number` | `5` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
