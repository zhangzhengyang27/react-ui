---
category: Hooks
title: UseCounter
subtitle: 计数器
description: react-ui 计数器 Hook 文档。
---


## 用法

<code src="./use-counter/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterHandlers {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

type UseCounterReturnValue = [number, UseCounterHandlers];

function useCounter(
  initialValue?: number,
  options?: UseCounterOptions,
): UseCounterReturnValue
```

## 导出类型

`UseCounterOptions`、`UseCounterHandlers` 和 `UseCounterReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseCounterOptions, UseCounterHandlers, UseCounterReturnValue } from '@xiaoye-react/hooks';
```
