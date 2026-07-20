---
category: Hooks
title: UseWindowEvent
subtitle: 窗口事件
description: react-ui 窗口事件 Hook 文档。
---


## 用法

`use-window-event` Hook 在组件挂载时向 `window` 对象添加事件监听器，并在卸载时移除它：

```tsx
import { useEffect } from 'react';
import { useWindowEvent } from '@react-ui/hooks';

const handler = (event: KeyboardEvent) => console.log(event);

// 常规方式
useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

// 使用 use-window-event Hook
useWindowEvent('keydown', handler);
```

## 示例

在 ReactUI 文档网站上，使用 `⌘ + K`（macOS）或 `Ctrl + K`（Windows/Linux）聚焦搜索框：

```tsx
import { useRef } from 'react';
import { useWindowEvent } from '@react-ui/hooks';

function Demo() {
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return <input ref={inputRef} />;
}
```

## 类型定义

该 Hook 的定义与 `window.addEventListener` 函数相同：

```tsx
function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
): void;
```
