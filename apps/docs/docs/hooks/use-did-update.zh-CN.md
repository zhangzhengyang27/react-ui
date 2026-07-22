---
category: Hooks
title: UseDidUpdate
subtitle: 更新副作用
description: react-ui 更新副作用 Hook 文档。
---


## 用法

`use-did-update` Hook 的工作方式与 `useEffect` 相同，但组件挂载时不会被调用：

```tsx
import { useDidUpdate } from '@xiaoye-react/hooks';

function Demo() {
  useDidUpdate(
    () => console.log("挂载时不会被调用"),
    [dependency1, dependency2]
  );
}
```

## 类型定义

```tsx
function useDidUpdate(fn: React.EffectCallback, dependencies?: any[]): void;
```
