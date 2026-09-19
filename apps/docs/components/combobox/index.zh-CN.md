---
category: Components
title: Combobox
subtitle: 组合框
description: react-ui Combobox 组合框组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要同时支持自由输入和从候选列表选择，且具备搜索过滤能力的复合控件时使用。

## 代码演示 {#examples}

### 用法

`Combobox` 提供了一组组件和 Hook，用于创建自定义 select、multiselect 或 autocomplete 组件。
该组件非常灵活——可完全控制渲染和逻辑。

<code src="./demo/select.tsx"></code>

### useCombobox hook

`useCombobox` Hook 提供一个 combobox store。store 包含组件的当前状态
以及更新它的处理函数。创建的 store 必须传递给 `Combobox` 的 `store` 属性：

```tsx
import { Combobox, useCombobox } from '@xiaoye-react/ui';

function Demo() {
  const combobox = useCombobox();
  return (
    <Combobox store={combobox}>{/* 你的实现 */}</Combobox>
  );
}
```

### useCombobox 选项

`useCombobox` Hook 接受一个选项对象，包含以下属性：


可从 `@xiaoye-react/ui` 包导入 `UseComboboxOptions` 类型：

```tsx
interface UseComboboxOptions {
  /** `dropdownOpened` 的默认值，默认为 `false` */
  defaultOpened?: boolean;

  /** 受控的 `dropdownOpened` 状态 */
  opened?: boolean;

  /** `dropdownOpened` 状态变化时调用 */
  onOpenedChange?(opened: boolean): void;

  /** 下拉框关闭时调用，带有事件来源：keyboard、mouse 或 unknown */
  onDropdownClose?(eventSource: ComboboxDropdownEventSource): void;

  /** 下拉框打开时调用，带有事件来源：keyboard、mouse 或 unknown */
  onDropdownOpen?(eventSource: ComboboxDropdownEventSource): void;

  /** 方向键是否循环遍历选项（从第一个到最后一个，以及从最后一个到第一个），默认为 `true` */
  loop?: boolean;

  /** 传递给 `element.scrollIntoView` 的 `behavior`，默认为 `'instant'` */
  scrollBehavior?: ScrollBehavior;
}
```

```tsx
import type { UseComboboxOptions } from '@xiaoye-react/ui';
```

### Combobox store

Combobox store 是一个具有以下属性的对象：


可从 `@xiaoye-react/ui` 包导入 `ComboboxStore` 类型：

```tsx
interface ComboboxStore {
  /** 当前下拉框打开状态 */
  dropdownOpened: boolean;

  /** 打开下拉框 */
  openDropdown(eventSource?: 'keyboard' | 'mouse' | 'unknown'): void;

  /** 关闭下拉框 */
  closeDropdown(eventSource?: 'keyboard' | 'mouse' | 'unknown'): void;

  /** 切换下拉框打开状态 */
  toggleDropdown(
    eventSource?: 'keyboard' | 'mouse' | 'unknown'
  ): void;

  /** 选中的选项索引 */
  selectedOptionIndex: number;

  /** 按索引选择 `Combobox.Option` */
  selectOption(index: number): void;

  /** 选择第一个设置了 `active` 属性的 `Combobox.Option`。
   *  如果没有这样的选项，函数不执行任何操作。
   */
  selectActiveOption(): string | null;

  /** 选择第一个未禁用的 `Combobox.Option`。
   *  如果没有这样的选项，函数不执行任何操作。
   * */
  selectFirstOption(): string | null;

  /** 选择下一个未禁用的 `Combobox.Option`。
   *  如果当前选项是最后一个，且 `loop` 为 true，则函数选择第一个选项。
   */
  selectNextOption(): string | null;

  /** 选择上一个未禁用的 `Combobox.Option`。
   *  如果当前选项是第一个，且 `loop` 为 true，则函数选择最后一个选项。
   * */
  selectPreviousOption(): string | null;

  /** 将选中选项索引重置为 -1，从选中选项中移除 `data-combobox-selected` */
  resetSelectedOption(): void;

  /** 触发选中选项的 `onClick` 事件。
   *  如果没有选中选项，函数不执行任何操作。
   */
  clickSelectedOption(): void;

  /** 将选中选项索引更新为当前选中或 active 选项。
   *  此函数必须用于可搜索组件，以便在选项列表根据搜索查询变化时更新选中选项索引。
   */
  updateSelectedOptionIndex(target?: 'active' | 'selected'): void;

  /** 列表 id，用于 `aria-*` 属性 */
  listId: string | null;

  /** 设置列表 id */
  setListId(id: string): void;

  /** `Combobox.Search` input 的 ref */
  searchRef: React.RefObject<HTMLInputElement | null>;

  /** 将焦点移动到 `Combobox.Search` input */
  focusSearchInput(): void;

  /** 目标元素的 ref */
  targetRef: React.RefObject<HTMLElement | null>;

  /** 将焦点移动到目标元素 */
  focusTarget(): void;
}
```

```tsx
import type { ComboboxStore } from '@xiaoye-react/ui';
```

### useCombobox 处理函数

Combobox store 处理函数可用于控制 `Combobox` 状态。
例如，要打开下拉框，请调用 `openDropdown` 处理函数：


可在 `useCombobox` 选项中使用 store 处理函数。例如，可
在下拉框打开时调用 `selectFirstOption`，在关闭时调用 `resetSelectedOption`：

```tsx
import { Button, Combobox, useCombobox } from '@xiaoye-react/ui';

function Demo() {
  const combobox = useCombobox();

  return (
    <Combobox>
      <Combobox.Target>
        <Button onClick={() => combobox.openDropdown()}>
          Open dropdown
        </Button>
      </Combobox.Target>

      {/* 你的实现 */}
    </Combobox>
  );
}
```

```tsx
import { Combobox, useCombobox } from '@xiaoye-react/ui';

function Demo() {
  const combobox = useCombobox({
    onDropdownOpen: () => combobox.selectFirstOption(),
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox store={combobox}>{/* 你的实现 */}</Combobox>
  );
}
```

### Combobox.Target

`Combobox.Target` 应用作目标元素或组件的包装器。
`Combobox.Target` 将其子元素标记为下拉框的目标，并设置 `aria-*` 属性，
同时为其添加键盘事件监听器。

`Combobox.Target` 需要单个元素或组件作为子元素。子组件
必须接受 `ref` 和 `...others` 属性。可使用任何 ReactUI 组件作为目标，无需
额外配置，例如 [Button](/components/button/)、[TextInput](/components/text-input/)
或 [InputBase](/components/input/#inputbase-component)。

`Combobox.Target` 与 [TextInput](/components/text-input/) 组件一起使用的示例：


`Combobox.Target` 与 [Button](/components/button) 组件一起使用的示例：

<code src="./demo/autocomplete.tsx"></code>

<code src="./demo/button.tsx"></code>

### 拆分事件和下拉框目标

在某些情况下，可能需要使用不同的元素作为事件目标和下拉框目标。
使用 `Combobox.EventsTarget` 添加 `aria-*` 属性和键盘事件处理函数，使用
`Combobox.DropdownTarget` 将下拉框相对于目标定位。

可拥有任意数量的 `Combobox.EventsTarget`，但每个 `Combobox` 只能有一个 `Combobox.DropdownTarget`。

使用 `Combobox.EventsTarget` 和 `Combobox.DropdownTarget` 与 [PillsInput](/components/pills-input) 组件一起
创建可搜索 multiselect 组件的示例：

<code src="./demo/searchableMultiselect.tsx"></code>

### 更新选中选项索引

当选项列表发生变化时，需要调用 `updateSelectedOptionIndex` 处理函数。
通常，选项列表会在根据搜索查询过滤选项时发生变化。在这种情况下，
需在搜索输入的 `onChange` 处理函数中调用 `updateSelectedOptionIndex`。

在可搜索 select 组件中使用 `updateSelectedOptionIndex` 处理函数的示例：

<code src="./demo/searchableSelect.tsx"></code>

### 搜索输入

若更喜欢下拉框内的搜索输入，请使用 `Combobox.Search` 组件。
要聚焦搜索输入，请调用 `combobox.focusSearchInput`，通常在
下拉框打开时执行。为防止下拉框关闭后焦点丢失，
请调用 `combobox.focusTarget`：

<code src="./demo/buttonSearch.tsx"></code>

### 选择首个选项

使用 `combobox.selectFirstOption` 函数选择第一个选项。这很有用，
例如当用户在列表中搜索选项时，希望选择第一个选项。
如果没有可用选项，它将不执行任何操作。

<code src="./demo/selectFirstOption.tsx"></code>

### Active 选项

在 `Combobox.Option` 组件上设置 `active` 属性以将其标记为 active。
默认情况下，active 选项没有任何样式，可使用 `data-combobox-active`
[data 属性](/docs/styles/data-attributes) 来设置样式。

`combobox.selectActiveOption` 函数选择 active 选项。通常在
下拉框打开时调用：

<code src="./demo/activeOption.tsx"></code>

### 选项分组

在 `Combobox.Group` 内渲染 `Combobox.Option` 组件以创建选项组。
如果组没有任何子元素，`Combobox.Group` 标签将自动隐藏。

<code src="./demo/groups.tsx"></code>

### 可滚动列表

在 `Combobox.Dropdown` 或 `Combobox.Options` 上设置 `max-height` 样式以
使选项列表可滚动。可使用 `mah` [style prop](/docs/styles/style-props) 设置
`max-height`。

<code src="./demo/nativeScroll.tsx"></code>

### 使用 ScrollArea 的可滚动列表

也可使用 [ScrollArea 或 ScrollArea.Autosize](/components/scroll-area) 组件
代替原生滚动条：

<code src="./demo/scrollArea.tsx"></code>

### 隐藏下拉框

在 `Combobox.Dropdown` 上设置 `hidden` 属性以隐藏下拉框。例如，
当希望仅当至少有一个可用选项时才显示下拉框时，这很有用：

<code src="./demo/hiddenDropdown.tsx"></code>

### 控制下拉框打开状态

要控制下拉框打开状态，请将 `opened` 传递给 `useCombobox` Hook：

<code src="./demo/controlledDropdown.tsx"></code>

### Popover 属性

`Combobox` 支持大多数 [Popover](/components/popover) 属性。例如，
可使用 `position` 属性控制下拉框位置：

<code src="./demo/dropdownPosition.tsx"></code>

### 不使用下拉框

可在没有下拉框的情况下使用 `Combobox`。为此，使用 `Combobox.EventsTarget` 代替
`Combobox.Target`：

<code src="./demo/noDropdown.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 虚拟化

`useVirtualizedCombobox` Hook 可用于创建带有虚拟化选项列表的 combobox。
请注意，由于虚拟化的特性，与 `useCombobox` Hook 相比，此 Hook 需要一些额外的配置。
在 `useVirtualizedCombobox` Hook 中，所有与选项索引相关的操作不依赖实际 DOM 结构，
而是需要在 React state 中保留值并将它们传递给 Hook。

`useVirtualizedCombobox` 不依赖任何特定的虚拟化库。
推荐的选择是 [@tanstack/react-virtual](https://tanstack.com/virtual/latest)：


使用 [react-virtuoso](https://virtuoso.dev/) 的实现示例：


可在 [Combobox 示例页面](/combobox?e=VirtualizedTanstack) 找到更多虚拟化示例。

Hook 选项：

```tsx
export interface UseVirtualizedComboboxOptions {
  /** `dropdownOpened` 的默认值，默认为 `false` */
  defaultOpened?: boolean;

  /** 受控的 `dropdownOpened` 状态 */
  opened?: boolean;

  /** `dropdownOpened` 状态变化时调用 */
  onOpenedChange?: (opened: boolean) => void;

  /** 下拉框关闭时调用 */
  onDropdownClose?: (eventSource: ComboboxDropdownEventSource) => void;

  /** 下拉框打开时调用 */
  onDropdownOpen?: (eventSource: ComboboxDropdownEventSource) => void;

  /** 方向键是否循环遍历选项（从第一个到最后一个，以及从最后一个到第一个），默认为 `true` */
  loop?: boolean;

  /** 确定选项是否禁用的函数 */
  isOptionDisabled?: (optionIndex: number) => boolean;

  /** 虚拟化列表中的选项总数。用于正确的键盘导航和索引计算。 */
  totalOptionsCount: number;

  /** 返回给定索引选项 id 的函数。用于设置 aria 属性和元素引用。 */
  getOptionId: (index: number) => string | null;

  /** 当前选中的选项索引。必须由父组件控制。 */
  selectedOptionIndex: number;

  /** 更新选中选项索引的回调。当用户导航或选择选项时调用。 */
  setSelectedOptionIndex: (index: number) => void;

  /** 当前 active/高亮选项索引。用于确定调用 selectActiveOption 时选择哪个选项。 */
  activeOptionIndex?: number;

  /** 选中选项提交时调用（例如通过 Enter 键或点击）。接收选中的选项索引。 */
  onSelectedOptionSubmit: (index: number) => void;
}
```

<code src="./demo/virtualizedTanstack.tsx"></code>

<code src="./demo/virtualized.tsx"></code>

<StylesApiSelectors component="Combobox"></StylesApiSelectors>



## API {#api}

### ComboboxProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string \| string[]` | — |
| onOptionSubmit | 选项被选中后回调 | `(value: string) => void` | — |
| data | 候选项数组 | `ComboboxItem[]` | `[]` |
| searchable | 是否可搜索 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| limit | 最多显示候选项数量 | `number` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
