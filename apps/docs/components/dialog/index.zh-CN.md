---
category: Components
title: Dialog
subtitle: 对话框
description: react-ui Dialog 对话框组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要以模态弹窗的形式承载临时操作或确认信息，强制用户与之交互时使用。

## 代码演示 {#examples}

### 用法

`Dialog` 是 [Modal](/components/modal/) 组件的简化版本。
它不包含 [Modal](/components/modal/) 的大多数可访问性和可用性功能：

- 焦点陷阱不可用
- 点击外部不会关闭
- 没有遮罩层

使用 `Dialog` 来吸引用户对不重要信息或操作的注意。
例如，可创建一个邮件订阅表单：

<code src="./demo/usage.tsx"></code>

## API {#api}

### DialogProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opened | 是否打开 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | — |
| title | 标题 | `ReactNode` | — |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| radius | 圆角 | `UIRadius` | — |
| withCloseButton | 是否显示关闭按钮 | `boolean` | `true` |
| centered | 是否垂直居中 | `boolean` | `true` |
| closeOnClickOutside | 点击遮罩是否关闭 | `boolean` | `true` |
| closeOnEscape | 按 Esc 是否关闭 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
