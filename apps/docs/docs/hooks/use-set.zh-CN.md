---
category: Hooks
title: UseSet
subtitle: Set 状态
description: react-ui Set 状态 Hook 文档。
---


## 用法

`useSet` Hook 返回一个 [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
对象，可用作 React 状态：`add`、`clear` 和 `delete` 方法会触发状态更新。

<code src="./use-set/demo/usage.tsx"></code>

## 类型定义

```tsx
function useSet<T>(values?: T[]): Set<T>;
```
