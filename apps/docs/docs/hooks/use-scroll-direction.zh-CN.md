---
category: Hooks
title: UseScrollDirection
subtitle: 滚动方向
description: react-ui 滚动方向 Hook 文档。
---


## 用法

`use-scroll-direction` Hook 检测用户当前是向上还是向下滚动。
当用户向上滚动时返回 `'up'`，向下滚动时返回 `'down'`，在任何滚动事件发生之前返回 `'unknown'`。

<code src="./use-scroll-direction/demo/usage.tsx"></code>

## 类型定义

```tsx
function useScrollDirection(): 'up' | 'down' | 'unknown';
```
