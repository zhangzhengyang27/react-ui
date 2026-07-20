---
category: Components
title: ModalBase
subtitle: 模态框基础
description: react-ui ModalBase 模态框基础组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要基于底层模态能力自定义构建弹窗、抽屉、Popover 等浮层组件时使用。

## 代码演示 {#examples}

### 基础用法

模态框基础 的基础示例。

<code src="./demo/basic.tsx"></code>

## API {#api}

### ModalBaseProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opened | 是否打开 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | — |
| closeOnEscape | 按 Esc 是否关闭 | `boolean` | `true` |
| closeOnClickOutside | 点击遮罩是否关闭 | `boolean` | `true` |
| trapFocus | 是否陷阱焦点 | `boolean` | `true` |
| returnFocus | 关闭后是否返回焦点 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
