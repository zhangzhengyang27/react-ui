---
category: Hooks
title: UseThrottledValue
subtitle: 节流值
description: react-ui 节流值 Hook 文档。
---


## 用法

`useThrottledValue` Hook 接受一个值和以毫秒为单位的等待时间。
它返回一个节流后的值，每 `wait` 毫秒最多变化一次。

<code src="./use-throttled-value/demo/usage.tsx"></code>

## 类型定义

```tsx
function useThrottledValue<T>(value: T, wait: number): T;
```
