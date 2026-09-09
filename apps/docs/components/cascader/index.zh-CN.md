---
category: Components
title: Cascader
subtitle: 级联选择
description: react-ui Cascader 级联选择组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要在多级联动的选项集合中进行选择时使用，例如省市区选择、组织架构选择、类目选择等。数据结构复用 [Tree](/components/tree) 的 `TreeNodeData`（并额外支持 `disabled`）。

## 代码演示 {#examples}

### 基础用法

点击节点逐级展开，选中叶子节点后面板收起，输入框展示完整路径：

<code src="./demo/usage.tsx"></code>

### 多选

设置 `mode="multiple"` 后可勾选多个叶子节点，选中项以 Pill 展示：

<code src="./demo/multiple.tsx"></code>

### 可搜索

设置 `searchable` 后可按叶子节点搜索，结果展示所在路径：

<code src="./demo/searchable.tsx"></code>

### 懒加载

节点标记 `hasChildren` 并传入 `loadData`，首次展开该节点时触发异步加载：

<code src="./demo/lazyLoad.tsx"></code>

## API {#api}

### CascaderProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 级联数据 | `CascaderNode[]` | 必填 |
| mode | 选择模式 | `'single' \\| 'multiple'` | `'single'` |
| value | 选中值（受控）：单选为叶子节点 value，多选为叶子 value 数组 | `string \\| null \\| string[]` | - |
| defaultValue | 初始值（非受控） | `string \\| null \\| string[]` | - |
| onChange | 选中值变化回调 | `(value) => void` | - |
| loadData | 异步加载子节点 | `(node: CascaderNode) => Promise<CascaderNode[]>` | - |
| searchable | 是否可搜索叶子节点 | `boolean` | `false` |
| clearable | 显示清除按钮 | `boolean` | `false` |
| nothingFoundMessage | 搜索无结果提示 | `React.ReactNode` | `'无匹配结果'` |
| maxDropdownHeight | 下拉面板最大高度 | `number \\| string` | `240` |
| columnWidth | 每级面板宽度（px） | `number` | `180` |
| pathSeparator | 路径展示分隔符 | `string` | `' / '` |
| dropdownOpened | 下拉展开状态（受控） | `boolean` | - |
| defaultDropdownOpened | 下拉初始展开状态（非受控） | `boolean` | `false` |
| onDropdownOpen | 下拉展开回调 | `() => void` | - |
| onDropdownClose | 下拉收起回调 | `() => void` | - |

支持 [Input](/components/input) 通用属性（`label`、`error`、`size`、`variant` 等）与原生 `input` 属性。

### CascaderNode

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 节点唯一标识 | `string` | 必填 |
| label | 节点文案 | `React.ReactNode` | 必填 |
| children | 子节点 | `CascaderNode[]` | - |
| hasChildren | 标记存在未加载的子节点，配合 loadData 使用 | `boolean` | - |
| disabled | 是否禁用 | `boolean` | - |

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
