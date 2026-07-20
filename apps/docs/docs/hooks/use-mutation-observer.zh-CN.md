---
category: Hooks
title: UseMutationObserver
subtitle: Mutation 观察者
description: react-ui Mutation 观察者 Hook 文档。
---


## 用法

`use-mutation-observer` Hook 是 [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 的包装器。
它允许你订阅 DOM 树的变化。

<code src="./use-mutation-observer/demo/usage.tsx"></code>

## 目标元素

如果你无法将 `ref` 传递给目标元素，可以将一个解析目标元素的函数作为第三个参数传递。

<code src="./use-mutation-observer/demo/target.tsx"></code>

## 类型定义

```tsx
function useMutationObserver<T extends HTMLElement>(
  callback: MutationCallback,
  options: MutationObserverInit
): React.RefCallback<T | null>;

function useMutationObserverTarget(
  callback: MutationCallback,
  options: MutationObserverInit,
  target?: HTMLElement | (() => HTMLElement) | null
): void;
```
