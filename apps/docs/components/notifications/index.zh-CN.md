---
category: Components
title: Notifications
subtitle: 通知中心
description: react-ui Notifications 通知中心组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要全局管理多条通知（如调用 `notifications.show()`）时使用，需配合 UIProvider。

## 代码演示 {#examples}

### 基础用法

通知中心的基础示例。

<code src="./demo/basic.tsx"></code>

## API {#api}

### NotificationsProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| (通过 notifications.show 等 API 调用) | 通知管理器 | — | — |
| position | 默认显示位置 | `NotificationPosition` | `'bottom-right'` |
| autoClose | 自动关闭时长（ms），false 不自动关闭 | `number \| false` | `4000` |
| limit | 同时显示的最大数量 | `number` | `5` |
| zIndex | 层级 | `number` | `1000` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
