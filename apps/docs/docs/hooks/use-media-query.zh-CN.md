---
category: Hooks
title: UseMediaQuery
subtitle: 媒体查询
description: react-ui 媒体查询 Hook 文档。
---


## 用法

`use-media-query` Hook 订阅媒体查询。
它接收一个媒体查询作为参数，当该媒体查询匹配当前状态时返回 `true`。
该 Hook 依赖 `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
，如果 API 不可用则返回 `false`，除非在第二个参数中提供了初始值。

调整浏览器窗口大小以触发 `window.matchMedia` 事件：

<code src="./use-media-query/demo/usage.tsx"></code>

## 服务端渲染

在服务端渲染期间，由于 `window.matchMedia` API 不可用，该 Hook 始终返回 `false`。
如果你希望改变这一行为，可以覆盖初始值：

```tsx
import { useMediaQuery } from '@react-ui/hooks';

function Demo() {
  // 在第二个参数中设置初始值，并将 getInitialValueInEffect 选项设为 false
  const matches = useMediaQuery('(max-width: 40em)', true, {
    getInitialValueInEffect: false,
  });
}
```

## 类型定义

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useMediaQuery(
  query: string,
  initialValue?: boolean,
  options?: UseMediaQueryOptions,
): boolean;
```

## 导出类型

`UseMediaQueryOptions` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseMediaQueryOptions } from '@react-ui/hooks';
```
