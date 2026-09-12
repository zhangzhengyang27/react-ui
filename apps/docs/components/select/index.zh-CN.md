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

需要让用户从一组候选项中选择一个时使用，支持下拉搜索。

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

`Select` 的值是字符串类型，`null` 表示未选中。
`onChange` 函数以选中值（或 `null`）作为唯一参数被调用：

```tsx
import { useState } from 'react';
import { Select } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <Select data={['React', 'Vue']} value={value} onChange={setValue} />;
}
```

### 可清除

设置 `clearable` 属性以在右侧区域显示清除按钮。以下情况不显示按钮：

- 组件没有值
- 组件被禁用
- 组件处于加载中

<code src="./demo/clearable.tsx"></code>

### 允许取消选择

`allowDeselect` 属性决定用户点击已选中选项时是否取消选择该值。
默认情况下，`allowDeselect` 为 `true`：

<code src="./demo/allowDeselect.tsx"></code>

### 聚焦时打开

设置 `openOnFocus` 属性，当输入框获得焦点时打开下拉框：

<code src="./demo/openOnFocus.tsx"></code>

### 可搜索

设置 `searchable` 属性以允许用户输入过滤选项。
可搜索时，鼠标点击输入框或输入任意字符即可打开下拉框：

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
      data={['React', 'Vue']}
    />
  );
}
```

### 无结果

设置 `nothingFoundMessage` 属性以在搜索查询没有匹配选项
或没有可用数据时显示指定消息。如果未设置 `nothingFoundMessage` 属性，
下拉框会渲染为空列表。

<code src="./demo/nothingFound.tsx"></code>

### 选中选项图标

将 `checkIconPosition` 属性设置为 `left`（默认）或 `right` 以控制选中选项中勾选图标的位置：

<code src="./demo/checkIcon.tsx"></code>

### 排序选项

默认情况下，选项按其所在 data 数组的位置排序。可使用
`filter` 函数更改此行为：

<code src="./demo/sort.tsx"></code>

### 使用 fuse.js 进行模糊搜索

可使用 [fuse.js](https://fusejs.io/) 库实现模糊搜索，即使存在拼写错误或不完整匹配也能匹配选项：

<code src="./demo/fuzzySearch.tsx"></code>

### 大数据量优化

设置 `limit` 属性限制渲染的选项数量。结合 `searchable` 使用时，
仅渲染前 `limit` 个命中结果，避免大数据量下渲染过多 DOM 节点：

<code src="./demo/limit.tsx"></code>

### renderOption

`renderOption` 回调允许自定义选项渲染。它接收一个选项对象和
选中状态作为参数。该函数必须返回一个 React 节点。

<code src="./demo/renderOption.tsx"></code>

### 可滚动下拉框

使用 `maxDropdownHeight` 属性控制下拉框最大高度（数字按 px 处理）。
下拉框的 `dropdown`、`options`、`option` 等选择器支持通过 [Styles API](/docs/styles/styles-api) 自定义样式，
例如改用原生滚动条：

<code src="./demo/scrollArea.tsx"></code>

### 分组选项

选项数据支持两种分组格式：为每个选项设置 `group` 字段，或使用 `{ group, items }` 分组对象。
注意，`NativeSelect` 渲染原生 `optgroup` 元素，仅支持字符串分组标签。

<code src="./demo/groups.tsx"></code>

### 禁用选项

当选项被禁用时，它无法被选中，并在键盘导航中被忽略。

<code src="./demo/disabledOptions.tsx"></code>

### 下拉框位置

默认情况下，如果下方有足够空间，下拉框会显示在输入框下方；否则自动翻转到输入框上方。
可通过设置 `position` 属性强制指定位置：

<code src="./demo/dropdownPosition.tsx"></code>

### 下拉框偏移

使用 `offset` 属性更改下拉框与输入框的偏移距离（px）：

<code src="./demo/dropdownOffset.tsx"></code>

### 失焦关闭

下拉框默认在输入框失焦时自动关闭（包括 Tab 切走）。设置 `closeOnBlur={false}` 可禁用此行为。

### 输入框两侧区域

使用 `leftSection` / `rightSection` 在输入框两侧渲染图标等内容，
配合 `leftSectionPointerEvents` / `rightSectionPointerEvents` 控制点击行为：

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

<code src="./demo/success.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

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
| data | 选项数据，支持字符串、`{ value, label, disabled?, group? }` 或 `{ group, items }` 分组对象 | `SelectData` | `[]` |
| value | 受控值，`null` 表示未选中 | `string \| null` | — |
| defaultValue | 非受控初始值 | `string \| null` | — |
| onChange | 值变化回调，`null` 表示未选中 | `(value: string \| null) => void` | — |
| placeholder | 占位提示 | `string` | — |
| label | 输入框上方标签 | `ReactNode` | — |
| description | 标签下方描述 | `ReactNode` | — |
| error | 输入框下方错误信息，传入后输入框显示错误态 | `ReactNode` | — |
| required | 标签上显示必填星号 | `boolean` | `false` |
| size | 输入框大小 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| searchable | 是否可搜索 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| allowDeselect | 点击已选中选项时是否取消选择 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否显示加载指示器 | `boolean` | `false` |
| openOnFocus | 获得焦点时打开下拉框 | `boolean` | `false` |
| searchValue | 受控搜索值（需配合 `searchable`） | `string` | — |
| onSearchChange | 搜索值变化回调 | `(value: string) => void` | — |
| limit | 最多渲染的选项数量 | `number` | — |
| filter | 自定义过滤函数 | `({ options, search, limit }) => ComboboxItem[]` | 包含匹配 |
| renderOption | 自定义选项渲染 | `({ option, checked }) => ReactNode` | — |
| nothingFoundMessage | 无匹配结果时显示的消息 | `ReactNode` | — |
| maxDropdownHeight | 下拉框最大高度，数字按 px 处理 | `number \| string` | `300px` |
| position | 下拉框位置 | `FloatingPosition` | `'bottom-start'` |
| offset | 下拉框偏移距离（px） | `number` | `4` |
| checkIconPosition | 勾选图标位置 | `'left' \| 'right'` | `'left'` |
| closeOnBlur | 失焦时关闭下拉框 | `boolean` | `true` |

除上述属性外，`Select` 还支持 `leftSection`、`rightSection`、`variant`、`radius` 等 Input 属性，
以及所有原生 `<input>` 属性（`onFocus`、`onBlur`、`name`、`autoComplete` 等）。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
