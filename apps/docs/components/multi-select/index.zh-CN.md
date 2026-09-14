---
category: Components
title: MultiSelect
subtitle: 多选
description: react-ui MultiSelect 多选组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户从一组候选项中选择多个，并以标签形式展示已选项时使用。

## 代码演示 {#examples}

### 用法

`MultiSelect` 提供了一种输入多个值的方式。`MultiSelect` 与 [TagsInput](/components/tags-input) 类似，但不允许输入自定义值。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

`MultiSelect` 的值必须是字符串数组，不支持其他类型。`onChange` 函数以字符串数组作为唯一参数被调用。

```tsx
import { useState } from 'react';
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <MultiSelect data={[]} value={value} onChange={setValue} />;
}
```

### 可清除

设置 `clearable` 属性可在右侧区域显示清除按钮。以下情况不显示按钮：

- 组件没有值
- 组件被禁用
- 组件为只读

<code src="./demo/clearable.tsx"></code>

### 可搜索

设置 `searchable` 属性以允许用户输入过滤选项：

<code src="./demo/searchable.tsx"></code>

### 受控搜索值

可使用 `searchValue` 和 `onSearchChange` 属性控制搜索值：

```tsx
import { useState } from 'react';
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <MultiSelect
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

### 无匹配结果

设置 `nothingFoundMessage` 属性，以在搜索查询没有匹配选项或没有可用数据时显示指定消息。如果未设置 `nothingFoundMessage`，`MultiSelect` 下拉菜单将隐藏。

<code src="./demo/nothingFound.tsx"></code>

### 选中选项图标

设置 `checkIconPosition` 属性为 `left` 或 `right`，以控制活动选项中勾选图标的位置。要移除勾选图标，请设置 `withCheckIcon={false}`。要对齐未选中标签与已选中标签，请设置 `withAlignedLabels` 属性。

<code src="./demo/checkIcon.tsx"></code>

### 最大选中数量

可使用 `maxValues` 属性限制可选值的数量。达到限制后将无法再添加更多值。

<code src="./demo/maxValues.tsx"></code>

### 隐藏已选选项

要从可用选项列表中移除已选选项，请设置 `hidePickedOptions` 属性：

<code src="./demo/hidePickedOptions.tsx"></code>

### 值类型

`MultiSelect` 支持基本值类型（字符串、数字、布尔值）作为值类型。`MultiSelect` 会自动推断值类型。若需显式设置值类型，请传入类型参数：

```tsx
import { MultiSelect } from '@xiaoye-react/ui';

type MultiSelectValue = 'React' | 'Angular' | 'Svelte' | number;

function Demo() {
  return <MultiSelect<MultiSelectValue> data={['React', 'Angular', 'Svelte', 100]} />;
}
```

<code src="./demo/search.tsx"></code>

### 排序选项

默认情况下，选项按其所在 `data` 数组的位置排序。可使用 `filter` 函数更改此行为：

<code src="./demo/sort.tsx"></code>

### 使用 fuse.js 进行模糊搜索

可使用 [fuse.js](https://fusejs.io/) 库实现模糊搜索，即使在输入有错字或部分匹配时也能匹配选项：

<code src="./demo/fuzzySearch.tsx"></code>

<code src="./demo/limit.tsx"></code>

### renderOption

`renderOption` 回调允许自定义选项渲染。它接收选项对象和选中状态，必须返回一个 React 节点。

<code src="./demo/renderOption.tsx"></code>

### renderPill

`renderPill` 回调允许自定义 pill 渲染。该函数接收传入 `data` 的选项、value、onRemove 和 disabled 属性，必须返回一个 React 节点。

<code src="./demo/renderPill.tsx"></code>

### 重新排序 pills

设置 `withPillsReorder` 属性以允许重新排序 pills。将 pill 拖到另一个 pill 前后会相应更新组件值。设置 `disabled` 或 `readOnly` 时会自动禁用重新排序。

可使用鼠标（拖放）或键盘重新排序 pills：

- Pills 不在 `Tab` 顺序中。当焦点在输入框时，按 `ArrowLeft`（当光标在输入框开头时）可将焦点移到最后一个 pill。
- `ArrowLeft` 和 `ArrowRight` 在 pills 之间移动焦点（支持 RTL）。在最后一个 pill 上按 `ArrowRight` 可将焦点返回到输入框。
- `Alt + ArrowLeft` 和 `Alt + ArrowRight` 重新排序当前聚焦的 pill（支持 RTL）。

焦点会跟随移动的 pill，因此可以连续进行多次移动而无需重新聚焦。


若使用 `renderPill` 属性自定义 pill 渲染，请将渲染回调负载中的 `reorderProps` 展开到可聚焦的 pill 根元素上，以保持重新排序功能正常。`reorderProps` 包含 `tabIndex`、`data-ui-pill-index` 属性和驱动键盘重新排序的键盘处理器，因此它必须落在用户可聚焦的元素上：

```tsx
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MultiSelect
      data={['React', 'Angular', 'Vue']}
      withPillsReorder
      renderPill={({ value, onRemove, reorderProps }) => (
        <div {...reorderProps}>
          {value} <button onClick={onRemove}>×</button>
        </div>
      )}
    />
  );
}
```

<code src="./demo/dragReorder.tsx"></code>

### 可滚动下拉菜单

默认情况下，选项列表使用 [ScrollArea.Autosize](/components/scroll-area) 包裹。若不更改默认设置，可以使用 `maxDropdownHeight` 属性控制下拉菜单的最大高度。

若需使用原生滚动条，请设置 `withScrollArea={false}`。注意，在这种情况下，需使用 [Styles API](/docs/styles/styles-api) 更改下拉菜单样式。

<code src="./demo/scrollArea.tsx"></code>

### 分组选项

<code src="./demo/groups.tsx"></code>

### 禁用选项

当某个选项被禁用时，它无法被选中，并在键盘导航中被忽略。注意用户仍然可以将禁用选项作为值输入。若需禁止某些值，请使用受控组件并在 `onChange` 函数中过滤掉它们。

<code src="./demo/disabledOptions.tsx"></code>

### 下拉菜单位置

默认情况下，如果空间足够，下拉菜单显示在输入框下方；否则显示在输入框上方。可通过设置 `position` 和 `middlewares` 属性来更改此行为，这些属性会传递给底层的 [Popover](/components/popover) 组件。

下拉菜单始终显示在输入框上方的示例：

<code src="./demo/dropdownPosition.tsx"></code>

### 下拉菜单偏移

要更改下拉菜单偏移，请在 `comboboxProps` 中设置 `offset` 属性：

<code src="./demo/dropdownOffset.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 输入属性

<code src="./demo/configurator.tsx"></code>

### 只读

设置 `readOnly` 使输入框只读。设置 `readOnly` 后，`MultiSelect` 不会显示建议，也不会调用 `onChange` 函数。

<code src="./demo/readOnly.tsx"></code>

### 禁用

设置 `disabled` 禁用输入框。设置 `disabled` 后，用户无法与输入框交互，`MultiSelect` 也不会显示建议。

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

要为清除按钮设置 `aria-label`，请使用 `clearButtonProps`。注意仅在设置 `clearable` 时才需要。

```tsx
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MultiSelect
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

<ComboboxData component="MultiSelect"></ComboboxData>

<ComboboxFiltering component="MultiSelect"></ComboboxFiltering>

<ComboboxLargeData component="MultiSelect"></ComboboxLargeData>

<ComboboxProps component="MultiSelect"></ComboboxProps>

<InputSections component="MultiSelect"></InputSections>

<InputFeatures component="MultiSelect" element="input"></InputFeatures>

<StylesApiSelectors component="MultiSelect"></StylesApiSelectors>

<GetElementRef component="MultiSelect" refType="input"></GetElementRef>

<InputAccessibility component="MultiSelect"></InputAccessibility>



## API {#api}

### MultiSelectProps

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
