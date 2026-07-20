---
category: Hooks
title: UseThrottledCallback
subtitle: 节流回调
description: react-ui 节流回调 Hook 文档。
---


## 用法

`useThrottledCallback` Hook 接受一个函数和以毫秒为单位的等待时间。
它返回该函数的节流版本，最多每 `wait` 毫秒调用一次。

<code src="./use-throttled-callback/demo/usage.tsx"></code>

## 类型定义

```tsx
function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  wait: number
): (...args: Parameters<T>) => void;
```
