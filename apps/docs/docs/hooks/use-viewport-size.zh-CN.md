---
category: Hooks
title: UseViewportSize
subtitle: 视口尺寸
description: react-ui 视口尺寸 Hook 文档。
---


## 用法

`use-viewport-size` Hook 返回当前视口的 `width` 和 `height`。它订阅 `resize` 和 `orientationchange` 事件。
在 SSR 期间，该 Hook 返回 `{ width: 0, height: 0 }`：

<code src="./use-viewport-size/demo/usage.tsx"></code>

## 类型定义

```tsx
function useViewportSize(): {
  height: number;
  width: number;
};
```
