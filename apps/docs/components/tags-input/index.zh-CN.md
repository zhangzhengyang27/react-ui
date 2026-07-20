---
category: Components
title: TagsInput
subtitle: 标签输入
description: react-ui TagsInput 标签输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户自由输入多个标签并逐个展示、删除时使用。

## 代码演示 {#examples}

### 用法

`TagsInput` 提供了一种输入多个值的方式。它可以与建议一起使用，也可以不使用。`TagsInput` 与 [MultiSelect](/components/multi-select) 类似，但允许输入自定义值。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

`TagsInput` 的值必须是字符串数组，不支持其他类型。`onChange` 函数以字符串数组作为唯一参数被调用。

```tsx
import { useState } from 'react';
import { TagsInput } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <TagsInput data={[]} value={value} onChange={setValue} />;
}
```

### 受控搜索值

可使用 `searchValue` 和 `onSearchChange` 属性控制搜索值：

```tsx
import { useState } from 'react';
import { TagsInput } from '@react-ui/ui';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <TagsInput
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

### 可清除

设置 `clearable` 属性可在右侧区域显示清除按钮。以下情况不显示按钮：

- 组件没有值
- 组件被禁用
- 组件为只读

<code src="./demo/clearable.tsx"></code>

<code src="./demo/clearSectionMode.tsx"></code>

### 最大选中数量

可使用 `maxTags` 属性限制可选值的数量。达到限制后将无法再添加更多值。

<code src="./demo/maxTags.tsx"></code>

### 失焦时接受值

默认情况下，如果用户输入一个值然后使输入框失焦，该值会被添加到列表中。可通过设置 `acceptValueOnBlur` 为 `false` 来更改此行为。在这种情况下，只有在用户按 `Enter` 或点击建议时才会添加值。

<code src="./demo/acceptValueOnBlur.tsx"></code>

### 允许重复

默认情况下，`TagsInput` 不允许添加重复值，但可通过设置 `allowDuplicates` 属性来更改此行为。如果值已经存在于 `value` 数组中，则无论大小写和尾部空格如何，都被视为重复。

<code src="./demo/allowDuplicates.tsx"></code>

### isDuplicate

可使用 `isDuplicate` 属性控制如何检测重复。它是一个函数，接收两个参数：tag 值和当前 tags。如果该值是重复项，函数必须返回 `true`。

使用 `isDuplicate` 允许相同值使用不同大小写的示例：

<code src="./demo/isDuplicate.tsx"></code>

### 分隔字符

默认情况下，`TagsInput` 按逗号（`,`）分隔值，可通过将 `splitChars` 属性设置为字符串数组来更改此行为。`splitChars` 中的所有值都不会包含在最终值中。粘贴时也会按分隔符拆分。

按 `,`、`|` 和空格分隔的示例：

<code src="./demo/splitChars.tsx"></code>

### 带建议

`TagsInput` 可以与建议一起使用，它会在输入框下方渲染建议列表，并允许使用键盘或鼠标选择建议。注意用户不限于建议，仍然可以输入自定义值。若希望只允许建议中的值，请改用 [MultiSelect](/components/multi-select) 组件。

<code src="./demo/data.tsx"></code>

<code src="./demo/search.tsx"></code>

### 排序选项

默认情况下，选项按其所在 `data` 数组的位置排序。可使用 `filter` 函数更改此行为：

<code src="./demo/sort.tsx"></code>

### 使用 fuse.js 进行模糊搜索

可使用 [fuse.js](https://fusejs.io/) 库实现模糊搜索，即使在输入有错字或部分匹配时也能匹配选项：

<code src="./demo/fuzzySearch.tsx"></code>

<code src="./demo/limit.tsx"></code>

### renderOption

`renderOption` 回调允许自定义选项渲染。它接收选项对象，必须返回一个 React 节点。

<code src="./demo/renderOption.tsx"></code>

### Pill 自定义

`renderPill` 回调允许自定义 pills 的渲染方式。它接收一个包含 `option`（combobox 项）、`value`（字符串）、`onRemove`（函数）和 `disabled` 的对象。注意，由于 `TagsInput` 允许添加自定义值，`option` 属性可能是即时生成的。

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
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
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

若希望使用原生滚动条，请设置 `withScrollArea={false}`。注意，在这种情况下，需使用 [Styles API](/docs/styles/styles-api) 更改下拉菜单样式。

<code src="./demo/scrollArea.tsx"></code>

### 下拉菜单适配视口高度

设置 `floatingHeight="viewport"` 可使下拉菜单扩展到视口中可用的垂直空间。此模式下 `flip` 中间件被禁用——下拉菜单始终按配置方向打开，并被限制在视口边缘而不是翻转到另一侧。适用于大量选项列表：

<code src="./demo/floatingHeight.tsx"></code>

### 分组选项

<code src="./demo/groups.tsx"></code>

### 禁用选项

当某个选项被禁用时，它无法被选中，并在键盘导航中被忽略。注意用户仍然可以将禁用选项作为值输入。若希望禁止某些值，请使用受控组件并在 `onChange` 函数中过滤掉它们。

<code src="./demo/disabledOptions.tsx"></code>

### 在 Popover 内使用

要在 popover 内使用 `TagsInput`，需设置 `withinPortal: false`：

<code src="./demo/withinPopover.tsx"></code>

### 控制下拉菜单打开状态

可使用 `dropdownOpened` 属性控制下拉菜单的打开状态。此外，还可以使用 `onDropdownClose` 和 `onDropdownOpen` 监听下拉菜单打开状态的变化。

<code src="./demo/dropdownOpened.tsx"></code>

### 下拉菜单位置

默认情况下，如果空间足够，下拉菜单显示在输入框下方；否则显示在输入框上方。可通过设置 `position` 和 `middlewares` 属性来更改此行为，这些属性会传递给底层的 [Popover](/components/popover) 组件。

下拉菜单始终显示在输入框上方的示例：

<code src="./demo/dropdownPosition.tsx"></code>

### 下拉菜单动画

默认情况下，下拉菜单动画被禁用。要启用动画，可设置 `transitionProps`，它会传递给底层的 [Transition](/components/transition) 组件。

<code src="./demo/dropdownAnimation.tsx"></code>

### 下拉菜单宽度

要更改下拉菜单宽度，请在 `comboboxProps` 中设置 `width` 属性。默认情况下，下拉菜单宽度等于输入框宽度。

<code src="./demo/dropdownWidth.tsx"></code>

### 下拉菜单内边距

<code src="./demo/dropdownPadding.tsx"></code>

### 下拉菜单阴影

<code src="./demo/dropdownShadow.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 输入属性

<code src="./demo/configurator.tsx"></code>

### 只读

设置 `readOnly` 使输入框只读。设置 `readOnly` 后，`TagsInput` 不会显示建议，也不会调用 `onChange` 函数。

<code src="./demo/readOnly.tsx"></code>

### 禁用

设置 `disabled` 禁用输入框。设置 `disabled` 后，用户无法与输入框交互，`TagsInput` 也不会显示建议。

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

要为清除按钮设置 `aria-label`，请使用 `clearButtonProps`。注意仅在设置 `clearable` 时才需要。

```tsx
import { TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <TagsInput
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

<ComboboxData component="TagsInput"></ComboboxData>

<ComboboxFiltering component="TagsInput"></ComboboxFiltering>

<ComboboxLargeData component="TagsInput"></ComboboxLargeData>

<ComboboxProps component="TagsInput"></ComboboxProps>

<InputSections component="TagsInput"></InputSections>

<InputFeatures component="TagsInput" element="input"></InputFeatures>

<StylesApiSelectors component="TagsInput"></StylesApiSelectors>

<GetElementRef component="TagsInput" refType="input"></GetElementRef>

<InputAccessibility component="TagsInput"></InputAccessibility>



## API {#api}

### TagsInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前标签数组（受控） | `string[]` | `[]` |
| defaultValue | 默认标签 | `string[]` | `[]` |
| onChange | 标签变化回调 | `(value: string[]) => void` | — |
| placeholder | 占位提示 | `string` | — |
| data | 自动补全候选项 | `string[]` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| maxTags | 最大标签数 | `number` | — |
| acceptValueOnBlur | 失焦时是否接受当前输入 | `boolean` | `true` |
| splitChars | 分隔字符 | `string[]` | `[',', 'Enter']` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
