---
category: Hooks
title: UseInViewport
subtitle: 视口内检测
description: react-ui 视口内检测 Hook 文档。
---


## 用法

`use-in-viewport` Hook 是 [use-intersection](/docs/hooks/use-intersection) 的更简单的替代方案，仅检查元素是否在视口中可见：

<code src="./use-in-viewport/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseInViewportReturnValue<T extends HTMLElement = any> {
  inViewport: boolean;
  ref: React.RefCallback<T | null>;
}

function useInViewport<T extends HTMLElement = any>(): UseInViewportReturnValue<T>
```

## 导出类型

`UseInViewportReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseInViewportReturnValue } from '@xiaoye-react/hooks';
```
