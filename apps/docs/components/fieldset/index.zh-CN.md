---
category: Components
title: Fieldset
subtitle: 字段集
description: react-ui Fieldset 字段集组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要将表单中相关字段分组并附带标题（如"基本信息"、"高级设置"）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 禁用

`disabled` 属性禁用 fieldset 内的所有输入和按钮：

<code src="./demo/disabled.tsx"></code>



## API {#api}

### FieldsetProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| legend | 字段组标题 | `ReactNode` | — |
| variant | 视觉变体 | `'default' \| 'filled'` | `'default'` |
| radius | 圆角 | `UIRadius` | — |
| disabled | 是否禁用整组字段 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
