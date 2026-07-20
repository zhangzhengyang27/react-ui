---
category: Components
title: CopyButton
subtitle: 复制按钮
description: react-ui CopyButton 复制按钮组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要一键复制指定文本到剪贴板，并给出复制成功反馈时使用。

## 代码演示 {#examples}

### 用法

`CopyButton` 基于 [use-clipboard](/docs/hooks/use-clipboard/) Hook。它的 children 是一个函数，接收一个具有以下属性的对象：

- `copied` – 布尔值，表示给定值最近是否已复制到剪贴板，会在给定超时后重置（默认为 500ms）
- `copy` – 应调用以将给定值复制到剪贴板的函数

<code src="./demo/usage.tsx"></code>

### 超时

可提供一个自定义的 `copied` 重置 `timeout`：

<code src="./demo/timeout.tsx"></code>

<ServerComponentsIncompatible component="CopyButton"></ServerComponentsIncompatible>

## API {#api}

### CopyButtonProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 要复制的文本 | `string` | — |
| timeout | 复制成功后状态保持时长（ms） | `number` | `1000` |
| children | 渲染函数（接收 copied 状态） | `(props: { copied, copy }) => ReactNode` | — |

除上表所列属性外，CopyButton 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
