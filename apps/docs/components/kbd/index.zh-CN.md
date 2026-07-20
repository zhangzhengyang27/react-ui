---
category: Components
title: Kbd
subtitle: 键盘按键
description: react-ui Kbd 键盘按键组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要在文档或提示中展示键盘按键（如 Ctrl + K）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 尺寸

<code src="./demo/size.tsx"></code>

## API {#api}

### KbdProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按键文字 | `ReactNode` | — |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| color | 主题色 | `UIColor` | `'gray'` |

除上表所列属性外，Kbd 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
