---
category: Hooks
title: UseMounted
subtitle: 挂载状态
description: react-ui 挂载状态 Hook 文档。
---


## 用法

`useMounted` Hook 在组件已挂载时返回 `true`，未挂载时返回 `false`。

```tsx
import { useMounted } from '@xiaoye-react/hooks';

function Demo() {
  const mounted = useMounted();
  return (
    <div>
      {mounted ? '组件已挂载' : '组件未挂载'}
    </div>
  );
}
```

## 类型定义

```tsx
function useMounted(): boolean;
```
