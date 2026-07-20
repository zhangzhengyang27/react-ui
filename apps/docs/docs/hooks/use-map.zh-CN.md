---
category: Hooks
title: UseMap
subtitle: Map 状态
description: react-ui Map 状态 Hook 文档。
---


## 用法

`useMap` Hook 返回一个 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 对象，
可用作 React 状态——`set`、`clear` 和 `delete` 方法会更新状态并触发重新渲染。

<code src="./use-map/demo/usage.tsx"></code>

## 类型定义

```tsx
function useMap<T, V>(initialState?: [T, V][]): Map<T, V>;
```
