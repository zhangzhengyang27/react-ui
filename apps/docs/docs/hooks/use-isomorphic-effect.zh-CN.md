---
category: Hooks
title: UseIsomorphicEffect
subtitle: 同构 Effect
description: react-ui 同构 Effect Hook 文档。
---


## 用法

`use-isomorphic-effect` Hook 是 `useLayoutEffect` 的替代方案，可在浏览器和服务端环境中同时工作。

```tsx
import { useIsomorphicEffect } from '@react-ui/hooks';

function Demo() {
  useIsomorphicEffect(() => {
    document.title = 'title';
  });

  return null;
}
```
