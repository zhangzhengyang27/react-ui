---
category: Hooks
title: UseWindowScroll
subtitle: 窗口滚动
description: react-ui 窗口滚动 Hook 文档。
---


## 用法

`use-window-scroll` Hook 返回当前滚动位置以及一个平滑滚动到给定位置的函数：

<code src="./use-window-scroll/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseWindowScrollPosition {
  x: number;
  y: number;
}

type UseWindowScrollTo = (position: Partial<UseWindowScrollPosition>) => void;
type UseWindowScrollReturnValue = [UseWindowScrollPosition, UseWindowScrollTo];

function useWindowScroll(): UseWindowScrollReturnValue;
```

## 导出类型

`UseWindowScrollTo`、`UseWindowScrollPosition` 和 `UseWindowScrollReturnValue` 类型从 `@react-ui/hooks` 包导出：

```tsx
import type { UseWindowScrollTo, UseWindowScrollPosition, UseWindowScrollReturnValue } from '@react-ui/hooks';
```
