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
import { Autocomplete } from '@react-ui/ui';

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
import { Autocomplete } from '@react-ui/ui';

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

### 更改时选择首个选项

设置 `selectFirstOptionOnChange` 属性，当输入值更改时自动选择下拉列表中的第一个选项。
此功能允许用户输入一个值并立即按 `Enter` 选择第一个匹配的选项，
无需先按向下箭头键。

<code src="./demo/selectFirstOptionOnChange.tsx"></code>

### autoSelectOnBlur

设置 `autoSelectOnBlur` 属性，当输入框失去焦点时自动选择高亮的选项。
要查看此功能的实际效果：使用上下箭头选择一个选项，然后点击输入框外部：

<code src="./demo/autoSelectOnBlur.tsx"></code>

<code src="./demo/search.tsx"></code>

### 排序选项

默认情况下，选项按其所在数据数组的位置排序。可使用 `filter` 函数更改此行为：

<code src="./demo/sort.tsx"></code>

### 使用 fuse.js 进行模糊搜索

可使用 [fuse.js](https://fusejs.io/) 库实现模糊搜索，即使存在拼写错误或部分匹配也能匹配选项：

<code src="./demo/fuzzySearch.tsx"></code>

<code src="./demo/limit.tsx"></code>

### renderOption

`renderOption` 回调允许自定义选项渲染。它接收一个选项对象作为参数。
该函数必须返回一个 React 节点。

<code src="./demo/renderOption.tsx"></code>

### 可滚动下拉

默认情况下，选项列表使用 [ScrollArea.Autosize](/components/scroll-area) 包裹。
若不更改默认设置，可使用 `maxDropdownHeight` 属性控制下拉列表的最大高度。

如需使用原生滚动条，请设置 `withScrollArea={false}`。请注意，在这种情况下，
需使用 [Styles API](/docs/styles/styles-api) 更改下拉列表样式。

<code src="./demo/scrollArea.tsx"></code>

### 下拉框适应视口高度

设置 `floatingHeight="viewport"` 使下拉框增长以填充视口中的可用垂直空间。
在此模式下，`flip` 中间件被禁用——下拉框始终在配置的方向打开，
并被约束到视口边缘，而不是翻转到另一侧。在处理大型选项列表时非常有用：

<code src="./demo/floatingHeight.tsx"></code>

### 分组选项

<code src="./demo/groups.tsx"></code>

### 禁用选项

当选项被禁用时，它无法被选择，并且在键盘导航中会被忽略。

<code src="./demo/disabledOptions.tsx"></code>

### 在 Popover 内使用

要在 popover 内使用 `Autocomplete`，需设置 `withinPortal: false`：

<code src="./demo/withinPopover.tsx"></code>

### 可清除

设置 `clearable` 属性以在右侧区域显示清除按钮。按钮在以下情况下不显示：

- 组件没有值
- 组件被禁用
- 组件为只读

<code src="./demo/clearable.tsx"></code>

<code src="./demo/clearSectionMode.tsx"></code>

### 控制下拉框打开状态

可使用 `dropdownOpened` 属性控制下拉框的打开状态。此外，
还可以使用 `onDropdownClose` 和 `onDropdownOpen` 监听下拉框打开状态的变化。

<code src="./demo/dropdownOpened.tsx"></code>

### 下拉框位置

默认情况下，如果有足够空间，下拉框显示在输入框下方；否则显示在输入框上方。
可通过设置 `position` 和 `middlewares` 属性来更改此行为，这些属性会传递给
底层的 [Popover](/components/popover) 组件。

下拉框始终显示在输入框上方的示例：

<code src="./demo/dropdownPosition.tsx"></code>

### 下拉框动画

默认情况下，下拉框动画被禁用。要启用它们，可以设置 `transitionProps`，
它会传递给底层的 [Transition](/components/transition) 组件。

<code src="./demo/dropdownAnimation.tsx"></code>

### 下拉框内边距

<code src="./demo/dropdownPadding.tsx"></code>

### 下拉框阴影

<code src="./demo/dropdownShadow.tsx"></code>

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

<ComboboxFiltering component="Autocomplete"></ComboboxFiltering>

<ComboboxLargeData component="Autocomplete"></ComboboxLargeData>

<ComboboxProps component="Autocomplete"></ComboboxProps>

<ClearSectionMode></ClearSectionMode>

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
| filter | 自定义过滤函数 | `(value, item) => boolean` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
