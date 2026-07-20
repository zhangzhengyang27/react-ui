---
category: Components
title: Notification
subtitle: 通知提醒
description: react-ui Notification 通知提醒组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在页面角落弹出一条消息通知，自动消失或可手动关闭时使用。

## 代码演示 {#examples}

### 用法

Notification 是通知系统的基础组件。可基于它构建自己的通知系统，或使用 [@react-ui/ui](/docs/x/notifications/) 包。

<code src="./demo/configurator.tsx"></code>

### 带图标

<code src="./demo/icon.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

为了支持屏幕阅读器，请使用 `closeButtonProps` 设置关闭按钮的 aria-label 或 title：

```tsx
import { Notification } from '@react-ui/ui';

function Demo() {
  return (
    <Notification
      closeButtonProps={{ 'aria-label': '隐藏通知' }}
    />
  );
}
```

<StylesApiSelectors component="Notification"></StylesApiSelectors>



## API {#api}

### NotificationProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 通知标题 | `ReactNode` | — |
| children | 通知内容 | `ReactNode` | — |
| color | 主题色 | `UIColor` | `'blue'` |
| icon | 图标 | `ReactNode` | — |
| loading | 加载中状态 | `boolean` | `false` |
| withCloseButton | 是否显示关闭按钮 | `boolean` | `true` |
| onClose | 关闭回调 | `() => void` | — |
| withBorder | 是否显示边框 | `boolean` | `false` |
| radius | 圆角 | `UIRadius` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
