---
category: Components
title: Select
subtitle: 选择器
description: react-ui Select 选择器组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户从一组候选项中选择一个或多个，支持下拉搜索时使用。

## 代码演示 {#examples}

### 用法

`Select` 允许根据列表建议捕获用户输入。
与 [Autocomplete](/components/autocomplete/) 不同，`Select` 不允许输入自定义值。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框右侧。
这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控

`Select` 的值必须是原始类型（string、number 或 boolean）。
`onChange` 函数以原始值作为唯一参数被调用。

```tsx
import { useState } from 'react';
import { Select } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>('');
  return <Select data={[]} value={value} onChange={setValue} />;
}
```

### onChange 处理函数

`onChange` 以两个参数被调用：

- `value` - 选中选项的字符串值
- `option` – 选中的选项对象

若更喜欢在状态中使用对象格式，请使用 onChange 处理函数的第二个参数：

```tsx
import { useState } from 'react';
import { ComboboxItem, Select } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<ComboboxItem | null>(null);
  return (
    <Select
      data={[{ value: 'react', label: 'React library' }]}
      value={value ? value.value : null}
      onChange={(_value, option) => setValue(option)}
    />
  );
}
```

### autoSelectOnBlur

设置 `autoSelectOnBlur` 属性，当输入框失去焦点时自动选中高亮选项。
注意：此属性仅在 `searchable` 设置为 `true` 时生效。要查看实际效果：使用上下箭头选择一个选项，然后点击输入框外部：

<code src="./demo/autoSelectOnBlur.tsx"></code>

### 可清除

设置 `clearable` 属性以在右侧区域显示清除按钮。以下情况不显示按钮：

- 组件没有值
- 组件被禁用
- 组件只读

<code src="./demo/clearable.tsx"></code>

<code src="./demo/clearSectionMode.tsx"></code>

### 允许取消选择

`allowDeselect` 属性决定用户点击已选中选项时是否取消选择该值。
默认情况下，`allowDeselect` 为 `true`：

<code src="./demo/allowDeselect.tsx"></code>

### 聚焦时打开

设置 `openOnFocus` 属性，当输入框获得焦点时打开下拉框。
注意：此属性仅在 `searchable` 设置为 `true` 时生效：

<code src="./demo/openOnFocus.tsx"></code>

### 可搜索

设置 `searchable` 属性以允许用户输入过滤选项：

<code src="./demo/searchable.tsx"></code>

### 受控搜索值

可使用 `searchValue` 和 `onSearchChange` 属性控制搜索值：

```tsx
import { useState } from 'react';
import { Select } from '@xiaoye-react/ui';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Select
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

### 无结果

设置 `nothingFoundMessage` 属性以在搜索查询没有匹配选项
或没有可用数据时显示指定消息。如果未设置 `nothingFoundMessage` 属性，`Select` 下拉框将被隐藏。

<code src="./demo/nothingFound.tsx"></code>

### 选中选项图标

将 `checkIconPosition` 属性设置为 `left` 或 `right` 以控制活动选项中勾选图标的位置。
要移除勾选图标，请设置 `withCheckIcon={false}`。要让未选中标签与已选中标签对齐，请设置 `withAlignedLabels` 属性。

<code src="./demo/checkIcon.tsx"></code>

### 值类型

`Select` 支持原始值（字符串、数字、布尔值）作为值类型。`Select` 会自动
推断值类型。如需显式设置值类型，请传递类型参数：

```tsx
import { Select } from '@xiaoye-react/ui';

type SelectValue = 'React' | 'Angular' | 'Svelte' | number;

function Demo() {
  return <Select<SelectValue> data={['React', 'Angular', 'Svelte', 100]} />;
}
```

<code src="./demo/search.tsx"></code>

### 排序选项

默认情况下，选项按其所在 data 数组的位置排序。可使用
`filter` 函数更改此行为：

<code src="./demo/sort.tsx"></code>

### 使用 fuse.js 进行模糊搜索

可使用 [fuse.js](https://fusejs.io/) 库实现模糊搜索，即使存在拼写错误或不完整匹配也能匹配选项：

<code src="./demo/fuzzySearch.tsx"></code>

<code src="./demo/limit.tsx"></code>

### renderOption

`renderOption` 回调允许自定义选项渲染。它接收一个选项对象和
选中状态作为参数。该函数必须返回一个 React 节点。

<code src="./demo/renderOption.tsx"></code>

### 可滚动下拉框

默认情况下，选项列表会包裹在 [ScrollArea.Autosize](/components/scroll-area) 中。
若未更改默认设置，可使用 `maxDropdownHeight` 属性控制下拉框最大高度。

如需使用原生滚动条，请设置 `withScrollArea={false}`。注意，在这种情况下，
需使用 [Styles API](/docs/styles/styles-api) 更改下拉框样式。

<code src="./demo/scrollArea.tsx"></code>

### 适配视口高度

设置 `floatingHeight="viewport"` 使下拉框增长到填充视口中可用的垂直
空间。此模式下 `flip` 中间件被禁用——下拉框始终在配置的方向打开，
并被限制在视口边缘而不是翻转到另一侧。适用于处理大型选项列表：

<code src="./demo/floatingHeight.tsx"></code>

### 分组选项

`group` 属性接受任何 React 节点，因此可将自定义标记
（图标、徽标、样式化文本）渲染为分组标签，而不仅仅是纯字符串。这同样适用于
`MultiSelect`、`Autocomplete` 和 `TagsInput`。注意，
`NativeSelect` 渲染原生 `optgroup` 元素，仅支持字符串分组标签。

<code src="./demo/groups.tsx"></code>

### 禁用选项

当选项被禁用时，它无法被选中，并在键盘导航中被忽略。

<code src="./demo/disabledOptions.tsx"></code>

### 在 Popover 中使用

要在 popover 中使用 `Select`，需设置 `withinPortal: false`：

<code src="./demo/withinPopover.tsx"></code>

### 控制下拉框打开状态

可使用 `dropdownOpened` 属性控制下拉框的打开状态。此外，
还可使用 `onDropdownClose` 和 `onDropdownOpen` 监听下拉框打开状态的变化。

<code src="./demo/dropdownOpened.tsx"></code>

### 下拉框位置

默认情况下，如果下方有足够空间，下拉框会显示在输入框下方；否则显示在输入框上方。
可通过设置 `position` 和 `middlewares` 属性来更改此行为，这些属性会传递给底层的
[Popover](/components/popover) 组件。

下拉框始终显示在输入框上方的示例：

<code src="./demo/dropdownPosition.tsx"></code>

### 下拉框宽度

要更改下拉框宽度，请在 `comboboxProps` 中设置 `width` 属性。默认情况下，
下拉框宽度等于输入框宽度。

<code src="./demo/dropdownWidth.tsx"></code>

### 下拉框偏移

要更改下拉框偏移，请在 `comboboxProps` 中设置 `offset` 属性：

<code src="./demo/dropdownOffset.tsx"></code>

### 防止水平无限滚动

若在下拉框中遇到水平无限滚动，请将 `shift` 中间件的 `padding` 设置为 `0`：

```tsx
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
      data={['React', 'Angular', 'Vue']}
      comboboxProps={{
        middlewares: {
          shift: { padding: 0 }
        }
      }}
    />
  );
}
```

### 下拉框动画

默认情况下，下拉框动画被禁用。要启用它们，可设置 `transitionProps`，
它将传递给底层的 [Transition](/components/transition) 组件。

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
`Select` 不会显示建议，也不会调用 `onChange` 函数。

<code src="./demo/readOnly.tsx"></code>

### 禁用

设置 `disabled` 以禁用输入框。设置 `disabled` 后，
用户无法与输入框交互，`Select` 也不会显示建议。

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

要为清除按钮设置 `aria-label`，请使用 `clearButtonProps`。注意，仅在设置 `clearable` 时才需要这样做。

```tsx
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
      data={[]}
      clearable
      clearButtonProps={{
        'aria-label': '清除输入',
      }}
    />
  );
}
```

<code src="./demo/success.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<ClearSectionMode></ClearSectionMode>

<ComboboxData component="Select"></ComboboxData>

<ComboboxFiltering component="Select"></ComboboxFiltering>

<ComboboxLargeData component="Select"></ComboboxLargeData>

<ComboboxProps component="Select"></ComboboxProps>

<InputSections component="Select"></InputSections>

<InputFeatures component="Select" element="input"></InputFeatures>

<StylesApiSelectors component="Select"></StylesApiSelectors>

<GetElementRef component="Select" refType="input"></GetElementRef>

<InputAccessibility component="Select"></InputAccessibility>



## API {#api}

### SelectProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 选项数据 | `ComboboxItem[]` | — |
| value | 当前值 | `string \| string[] \| null` | — |
| defaultValue | 默认值 | `string \| string[] \| null` | — |
| onChange | 值变化回调 | `(value) => void` | — |
| placeholder | 占位提示 | `string` | — |
| searchable | 是否可搜索 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
