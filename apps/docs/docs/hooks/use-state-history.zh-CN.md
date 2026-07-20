---
category: Hooks
title: UseStateHistory
subtitle: 状态历史
description: react-ui 状态历史 Hook 文档。
---


## 用法

`useStateHistory` Hook 创建一个带历史记录的状态。它返回当前值、后退/前进处理函数，
以及一个包含所有先前值和当前索引的历史对象。

<code src="./use-state-history/demo/usage.tsx"></code>

## 类型定义

`UseStateHistoryHandlers` 和 `UseStateHistoryValue` 接口从 `@react-ui/hooks` 包导出。

```tsx
interface UseStateHistoryHandlers<T> {
  set: (value: T) => void;
  back: (steps?: number) => void;
  forward: (steps?: number) => void;
  reset: () => void;
}

interface UseStateHistoryValue<T> {
  history: T[];
  current: number;
}

type UseStateHistoryReturnValue<T> = [
  T,
  UseStateHistoryHandlers<T>,
  UseStateHistoryValue<T>,
];

function useStateHistory<T>(initialValue: T): UseStateHistoryReturnValue<T>;
```

## 导出类型

`UseStateHistoryHandlers`、`UseStateHistoryReturnValue` 和 `UseStateHistoryValue` 类型从 `@react-ui/hooks` 包导出：

```tsx
import type { UseStateHistoryHandlers, UseStateHistoryReturnValue, UseStateHistoryValue } from '@react-ui/hooks';
```
