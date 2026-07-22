---
category: Hooks
title: UseHover
subtitle: 悬停
description: react-ui 悬停 Hook 文档。
---


## 用法

<code src="./use-hover/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseHoverReturnValue<T extends HTMLElement = any> {
  hovered: boolean;
  ref: React.RefCallback<T | null>;
}

function useHover<T extends HTMLElement = any>(): UseHoverReturnValue<T>
```

## 导出类型

`UseHoverReturnValue` 类型从 `@xiaoye-react/hooks` 包导出：

```tsx
import type { UseHoverReturnValue } from '@xiaoye-react/hooks';
```
