---
category: Components
title: FocusTrap
subtitle: 焦点陷阱
description: react-ui FocusTrap 焦点陷阱组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要将键盘焦点限制在某个容器内（如弹窗、抽屉），避免用户 Tab 出去时使用。

## 代码演示 {#examples}

### 用法

FocusTrap 是 [use-focus-trap](/docs/hooks/use-focus-trap/) Hook 的组件实现。
它用于所有需要焦点捕获的 ReactUI 组件（[Modal](/components/modal/)、[DatePicker](/docs/dates/date-picker/)、[Popover](/components/popover/) 等）。

<code src="./demo/usage.tsx"></code>

### 初始焦点

要定义将接收初始焦点的元素，请设置 `data-autofocus` 属性：

<code src="./demo/initial.tsx"></code>



## API {#api}

### FocusTrapProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 被陷阱包裹的内容 | `ReactNode` | — |
| active | 是否启用焦点陷阱 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
