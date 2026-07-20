---
category: Hooks
title: UseEventListener
subtitle: 事件监听
description: react-ui 事件监听 Hook 文档。
---


## 用法

`use-event-listener` Hook 为分配了 `ref` 的元素添加给定的事件监听器。
该 Hook 支持与 `addEventListener` 方法相同的选项。
组件卸载后，监听器会自动移除。

<code src="./use-event-listener/demo/usage.tsx"></code>

## 类型定义

```tsx
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
  type: K,
  listener: (this: T, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): React.RefCallback<T | null>
```
