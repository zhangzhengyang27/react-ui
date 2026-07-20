---
category: Hooks
title: UseShallowEffect
subtitle: 浅层 Effect
description: react-ui 浅层 Effect Hook 文档。
---


## 用法

`use-shallow-effect` Hook 的工作方式与 `useEffect` 完全相同，但执行浅依赖比较而非引用比较：


该 Hook 适用于原始值、数组和对象：

```tsx
import { useEffect } from 'react';
import { useShallowEffect } from '@react-ui/hooks';

// 每次渲染都会调用
useEffect(() => {}, [{ a: 1 }]);

// 只会调用一次
useShallowEffect(() => {}, [{ a: 1 }]);
```

```tsx
import { useShallowEffect } from '@react-ui/hooks';

// 原始值的处理方式与 useEffect 相同
useShallowEffect(() => {}, [1, 2, 3]);

// 包含原始值的数组不会触发回调
useShallowEffect(() => {}, [[1], [2], [3]]);

// 包含原始值的对象不会触发回调
useShallowEffect(() => {}, [{ a: 1 }, { b: 2 }]);

// 包含对象的数组会触发回调，因为值不是浅相等的
useShallowEffect(() => {}, [[{ a: 1 }], [{ b: 2 }]]);
```

## 类型定义

```tsx
function useShallowEffect(
  cb: () => void,
  dependencies?: React.DependencyList
): void;
```
