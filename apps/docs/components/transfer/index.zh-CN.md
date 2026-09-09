---
category: Components
title: Transfer
subtitle: 穿梭框
description: react-ui Transfer 穿梭框组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要在两组数据之间进行双向选择（如角色授权、成员分组）时使用。组件采用「勾选即迁移」的交互：点击左侧行迁入右侧，点击右侧行迁回左侧。

## 代码演示 {#examples}

### 基础用法

`value` 为右侧已选值集合，`onChange` 按 `data` 原始顺序返回，禁用项不参与迁移：

<code src="./demo/usage.tsx"></code>

### 可搜索

设置 `searchable` 后每个面板顶部出现搜索框，独立过滤本面板内容：

<code src="./demo/searchable.tsx"></code>

## API {#api}

### TransferProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 可选项数据 | `TransferItem[]` | 必填 |
| value | 右侧已选值集合（受控） | `string[]` | - |
| defaultValue | 初始值（非受控） | `string[]` | - |
| onChange | 值变化回调，按 data 原始顺序返回 | `(value: string[]) => void` | - |
| titles | 面板标题 | `[React.ReactNode, React.ReactNode]` | `['未选择', '已选择']` |
| searchable | 面板可搜索 | `boolean` | `false` |
| searchPlaceholder | 搜索占位符 | `string` | `'搜索'` |
| listHeight | 列表最大高度 | `number \\| string` | `280` |
| withSelectAll | 显示面板头部全选按钮 | `boolean` | `true` |
| nothingFoundMessage | 搜索无结果提示 | `React.ReactNode` | `'无匹配结果'` |
| size | 尺寸 | `UISize` | `'sm'` |
| disabled | 禁用整个组件 | `boolean` | `false` |

### TransferItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 唯一标识 | `string` | 必填 |
| label | 展示文案 | `React.ReactNode` | 必填 |
| disabled | 禁用该项迁移 | `boolean` | `false` |

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
