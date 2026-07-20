---
category: Hooks
title: UseThrottledState
subtitle: 节流状态
description: react-ui 节流状态 Hook 文档。
---


## 用法

`useThrottledState` Hook 的工作方式与 `useState` 类似，但会对状态更新进行节流。
下面示例中的 `setThrottledState` 处理函数最多每 1000 毫秒调用一次。

<code src="./use-throttled-state/demo/usage.tsx"></code>

## 类型定义

```tsx
function useThrottledState<T = any>(
  defaultValue: T,
  wait: number
): readonly [T, (newValue: React.SetStateAction<T>) => void];
```
