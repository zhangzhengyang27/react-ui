---
category: Components
title: InputBase
subtitle: 输入框基础
description: react-ui InputBase 输入框基础组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要基于统一的输入框基础结构自定义复杂输入控件（如颜色选择器、自定义下拉）时使用。

## 代码演示 {#examples}

### 基础用法

输入框基础 的基础示例。

<code src="./demo/basic.tsx"></code>

## API {#api}

### InputBaseProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值（非受控） | `string` | — |
| onChange | 值变化回调 | `(event) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| leftSection | 左侧插槽 | `ReactNode` | — |
| rightSection | 右侧插槽 | `ReactNode` | — |
| variant | 视觉变体 | `'default' \| 'filled' \| 'unstyled'` | `'default'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
