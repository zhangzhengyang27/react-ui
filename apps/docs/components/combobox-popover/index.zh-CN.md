---
category: Components
title: ComboboxPopover
subtitle: 组合框浮层
description: react-ui ComboboxPopover 组合框浮层组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要使用 Combobox 的下拉浮层部分进行自定义组合（如自由输入 + 候选列表）时使用。

## 代码演示 {#examples}

### 用法

`ComboboxPopover` 允许为任何按钮元素添加带有可选选项的 combobox 下拉框。与 `Select` 和 `MultiSelect` 不同，它不会渲染输入框——而是通过 `ComboboxPopover.Target` 提供自定义目标元素（通常是 `Button`）。

`ComboboxPopover.Target` 的子元素必须是单个元素或接受 `ref` 的组件。
不支持片段、字符串和其他原始值。

<code src="./demo/usage.tsx"></code>

### 可搜索

设置 `searchable` 属性以启用下拉框内的搜索输入，在输入时过滤选项。
使用 `nothingFoundMessage` 在没有选项匹配搜索查询时显示消息。

<code src="./demo/searchable.tsx"></code>

### 受控搜索值

使用 `searchValue` 和 `onSearchChange` 属性控制搜索输入值：

<code src="./demo/controlledSearch.tsx"></code>

### 排序选项

将 `filter` 属性与 `searchable` 一起使用以提供自定义过滤和排序函数：

<code src="./demo/sort.tsx"></code>

### 限制选项

将 `limit` 属性与 `searchable` 一起使用以限制一次显示的选项数量。
这对于提高大型数据集的性能非常有用：

<code src="./demo/limit.tsx"></code>

### 多选

设置 `multiple` 属性以允许选择多个值。设置 `multiple` 后，
`value` 类型从 `string | null` 变为 `string[]`，`onChange` 回调
接收一个选中值数组。

<code src="./demo/multiple.tsx"></code>

### 勾选图标

<code src="./demo/checkIcon.tsx"></code>

### 允许取消选择

默认情况下，可以通过再次点击已选选项来取消选择。
设置 `allowDeselect={false}` 以阻止此行为。

<code src="./demo/allowDeselect.tsx"></code>

### 无结果消息

设置 `nothingFoundMessage` 属性以在没有可用选项时显示消息：

<code src="./demo/nothingFound.tsx"></code>

### 禁用选项

<code src="./demo/disabledOptions.tsx"></code>

### 分组

<code src="./demo/groups.tsx"></code>

### 渲染选项

使用 `renderOption` 属性自定义选项渲染：

<code src="./demo/renderOption.tsx"></code>

### 大型数据集

默认情况下，下拉框使用 `ScrollArea.Autosize` 包裹。
使用 `maxDropdownHeight` 控制最大高度：

<code src="./demo/scrollArea.tsx"></code>

### 控制下拉框打开状态

使用 `dropdownOpened` 属性控制下拉框状态。
此外，可使用 `onDropdownOpen` 和 `onDropdownClose` 回调
来响应下拉框状态变化。

<code src="./demo/dropdownOpened.tsx"></code>

### 表单提交

`ComboboxPopover` 渲染一个隐藏 input，其中包含选中的值以进行原生表单提交。
使用 `name` 属性设置 input 名称。对于多选，默认情况下值以逗号连接——
使用 `hiddenInputValuesDivider` 更改分隔符。

<code src="./demo/formSubmission.tsx"></code>

<ComboboxData component="ComboboxPopover"></ComboboxData>



## API {#api}

### ComboboxPopoverProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | `ReactNode` | — |
| width | 浮层宽度 | `number \| string \| 'target'` | `'target'` |
| position | 浮层位置 | `'bottom' \| 'top'` | `'bottom'` |
| shadow | 阴影 | `UIShadow` | `'sm'` |
| withBorder | 是否显示边框 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
