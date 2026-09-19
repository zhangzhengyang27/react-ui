---
category: Components
title: TreeSelect
subtitle: 树选择
description: react-ui TreeSelect 树选择组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要让用户在具有层级结构的数据中选择一个或多个节点时使用。

## 代码演示 {#examples}

### 用法

`TreeSelect` 允许从层级树数据中选择一个或多个值。
它支持三种选择模式：单选、多选和复选框（含父子级联）。

<code src="./demo/usage.tsx"></code>

### data 属性

传递给 `data` 属性的数据必须遵循与 [Tree](/components/tree) 组件相同的规则：

- 数据必须是 `TreeNodeData` 对象的数组
- 每个节点必须具有唯一的 `value` 和 `label` 键
- 每个节点可以有一个 `children` 键，其值为子节点数组

```tsx
import { TreeNodeData } from '@xiaoye-react/ui';

const data: TreeNodeData[] = [
  {
    value: 'fruits',
    label: '水果',
    children: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  { value: 'milk', label: 'Milk' },
];
```

### 选择模式

`TreeSelect` 支持由 `mode` 属性控制的三种选择模式：

- `single`（默认）——单值选择，渲染为输入框
- `multiple`——多值选择，渲染为 pills
- `checkbox`——带父子级联的复选框选择，渲染为 pills

### 多选模式

多值选择渲染为 pills，`value` 为字符串数组。

<code src="./demo/multiple.tsx"></code>

### 复选框模式

在复选框模式下，选中父节点会自动选中其所有子节点。
取消选中父节点会取消选中所有子节点。如果只有部分子节点被选中，
父节点会显示不确定状态。

<code src="./demo/checkbox.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { TreeSelect } from '@xiaoye-react/ui';

// 单选模式
function SingleDemo() {
  const [value, setValue] = useState<string | null>(null);
  return <TreeSelect data={[]} value={value} onChange={setValue} />;
}

// 多选或复选框模式
function MultipleDemo() {
  const [value, setValue] = useState<string[]>([]);
  return <TreeSelect data={[]} mode="multiple" value={value} onChange={setValue} />;
}
```

### 可搜索

设置 `searchable` 属性以允许用户输入过滤选项。
搜索时，会显示匹配的节点及其祖先节点：

<code src="./demo/searchable.tsx"></code>

### 无结果

设置 `nothingFoundMessage` 属性，以在没有选项匹配搜索查询或没有可用数据时显示指定消息：

<code src="./demo/nothingFound.tsx"></code>

### 可清除

设置 `clearable` 属性以在右侧区域显示清除按钮：

<code src="./demo/clearable.tsx"></code>

### 点击展开

设置 `expandOnClick` 属性，以便点击父节点时也能切换展开状态
（除了展开箭头外）。行为取决于选择模式：

- `single` 和 `multiple`——点击父节点仅展开/折叠它。只有叶子节点可以被选中。
- `checkbox`——点击父节点会同时切换其选中状态并展开它。

<code src="./demo/expandOnClick.tsx"></code>

### 连接线

`TreeSelect` 默认会在父子节点之间渲染连接线。
设置 `withLines={false}` 可禁用它们：

<code src="./demo/withLines.tsx"></code>

### 严格选中

设置 `checkStrictly` 以在复选框模式下禁用父子级联。
每个节点的选中状态将完全独立：

<code src="./demo/checkStrictly.tsx"></code>

### 选中策略

`checkedStrategy` 属性控制复选框模式下哪些选中节点会显示在值和 pills 中：

- `child`（默认）——只有叶子节点会显示在值中
- `all`——所有选中的节点（父节点和子节点）都会显示在值中
- `parent`——只有最顶层的完全选中父节点会显示在值中

<code src="./demo/checkedStrategy.tsx"></code>

### 最大可选值数

设置 `maxValues` 属性以限制多选和复选框模式下的选中值数量：

<code src="./demo/maxValues.tsx"></code>

### renderNode

`renderNode` 回调允许自定义下拉菜单中的节点渲染。
它会接收一个包含 `node`、`level`、`expanded`、`hasChildren`、
`selected`、`checked` 和 `indeterminate` 属性的对象：

<code src="./demo/renderNode.tsx"></code>

### 可滚动下拉菜单

默认情况下，选项列表使用 [ScrollArea.Autosize](/components/scroll-area) 包裹。
可使用 `maxDropdownHeight` 属性控制下拉菜单的最大高度：

<code src="./demo/scrollArea.tsx"></code>

### 控制下拉菜单打开状态

可使用 `dropdownOpened` 属性控制下拉菜单的打开状态。此外，
可以使用 `onDropdownClose` 和 `onDropdownOpen` 监听下拉菜单打开状态的变化。

<code src="./demo/dropdownOpened.tsx"></code>

### 下拉菜单位置

默认情况下，如果空间足够，下拉菜单显示在输入框下方；否则显示在输入框上方。
可通过设置 `position` 和 `middlewares` 属性来更改此行为，这些属性会传递给底层的
[Popover](/components/popover) 组件。

下拉菜单始终显示在输入框上方的示例：

<code src="./demo/dropdownPosition.tsx"></code>

### 下拉菜单偏移

要更改下拉菜单偏移，请在 `comboboxProps` 中设置 `offset` 属性：

<code src="./demo/dropdownOffset.tsx"></code>

### 展开状态

可控制节点的展开状态：

```tsx
import { TreeSelect } from '@xiaoye-react/ui';

// 默认展开指定节点
<TreeSelect data={data} defaultExpandedValues={['fruits', 'vegetables']} />

// 默认展开所有节点
<TreeSelect data={data} defaultExpandAll />

// 受控展开状态
<TreeSelect
  data={data}
  expandedValues={expandedValues}
  onExpandedChange={setExpandedValues}
/>
```

<code src="./demo/sections.tsx"></code>

### 输入属性

<code src="./demo/configurator.tsx"></code>

### 只读

设置 `readOnly` 使输入框只读。设置 `readOnly` 后，
`TreeSelect` 不会显示建议，也不会调用 `onChange` 函数。

<code src="./demo/readOnly.tsx"></code>

### 禁用

设置 `disabled` 禁用输入框。设置 `disabled` 后，
用户无法与输入框交互，`TreeSelect` 也不会显示建议。

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

要为清除按钮设置 `aria-label`，请使用 `clearButtonProps`。注意仅在设置 `clearable` 时才需要。

```tsx
import { TreeSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TreeSelect
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

<ComboboxProps component="TreeSelect"></ComboboxProps>

<InputSections component="TreeSelect"></InputSections>

<InputFeatures component="TreeSelect" element="input"></InputFeatures>

<GetElementRef component="TreeSelect" refType="input"></GetElementRef>

<InputAccessibility component="TreeSelect"></InputAccessibility>



## API {#api}

### TreeSelectProps

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
