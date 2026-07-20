---
category: Hooks
title: UseFetch
subtitle: 数据请求
description: react-ui 数据请求 Hook 文档。
---


## 用法

`useFetch` Hook 向指定 URL 发送 GET 请求，并返回响应数据、加载状态、错误、
`refetch` 和 `abort` 函数。

<code src="./use-fetch/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseFetchOptions extends RequestInit {
  autoInvoke?: boolean;
}

interface UseFetchReturnValue<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  abort: () => void;
}

function useFetch<T>(
  url: string,
  options?: UseFetchOptions,
): UseFetchReturnValue<T>
```

## 导出类型

`UseFetchOptions` 和 `UseFetchReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseFetchOptions, UseFetchReturnValue } from '@react-ui/hooks';
```
