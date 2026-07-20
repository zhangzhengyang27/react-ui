---
category: Components
title: FileButton
subtitle: 文件按钮
description: react-ui FileButton 文件按钮组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要一个触发文件选择对话框的按钮，但不显示已选文件信息时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 多文件

设置 `multiple` 属性以允许选择多个文件：

<code src="./demo/multiple.tsx"></code>

### 重置文件

`resetRef` 应用于修复隐藏 input 元素上陈旧值的问题，因为文件类型 input 无法受控。
当用户选择被清除时调用 `resetRef`：

<code src="./demo/reset.tsx"></code>

<ServerComponentsIncompatible component="FileButton"></ServerComponentsIncompatible>



## API {#api}

### FileButtonProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onChange | 文件选择回调 | `(files: File[] \| File) => void` | — |
| accept | 允许的文件类型 | `string` | — |
| multiple | 是否允许多选 | `boolean` | `false` |
| name | input 的 name 属性 | `string` | — |
| inputProps | input 元素属性 | `{ ... }` | — |
| children | 触发按钮渲染函数 | `(props) => ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
