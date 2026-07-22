---
category: Hooks
title: UseColorScheme
subtitle: 配色方案
description: react-ui 配色方案 Hook 文档。
---


## 用法

`use-color-scheme` Hook 返回操作系统首选的颜色方案值（`dark` 或 `light`），并订阅其变化：

<code src="./use-color-scheme/demo/usage.tsx"></code>

## 限制

`use-color-scheme` 底层使用 [use-media-query](/docs/hooks/use-media-query/)。它依赖 `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)，
如果 API 不可用（例如，在服务端渲染期间），则始终返回指定的初始值（第一个参数，默认为 `light`）。

```tsx
// 在服务端返回 'dark'
// 在客户端挂载后返回计算值
const colorScheme = useColorScheme('dark');
```

## 在 effect 中获取初始值

默认情况下，为了支持服务端渲染，`use-color-scheme` 不会在状态初始化时的第一次渲染中计算初始值。
相反，该值在 `useEffect` 中计算，并在父组件挂载后更新。

如果你的应用没有服务端渲染，可以通过更改 `getInitialValueInEffect` 选项来启用初始值的立即计算：

```tsx
const colorScheme = useColorScheme('light', { getInitialValueInEffect: false });
```

## 类型定义

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type UseColorSchemeValue = 'dark' | 'light';

function useColorScheme(
  initialValue?: UseColorSchemeValue,
  options?: UseMediaQueryOptions,
): UseColorSchemeValue
```

## 导出类型

`UseColorSchemeValue` 和 `UseMediaQueryOptions` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseColorSchemeValue, UseMediaQueryOptions } from '@xiaoye-react/hooks';
```
