---
category: Hooks
title: UsePrevious
subtitle: 上一次值
description: react-ui 上一次值 Hook 文档。
---


## 用法

`use-previous` Hook 将状态的先前值存储在 ref 中。
它在初始渲染时返回 `undefined`，在重新渲染后返回状态的先前值：

<code src="./use-previous/demo/usage.tsx"></code>

## 类型定义

```tsx
function usePrevious<T>(value: T): T | undefined;
```
