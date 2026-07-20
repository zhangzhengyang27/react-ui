---
category: Hooks
title: UseTimeout
subtitle: 超时
description: react-ui 超时 Hook 文档。
---


## 用法

<code src="./use-timeout/demo/usage.tsx"></code>

## API 参考

参数：

- `callback` – 计时器到期后调用的函数
- `delay` – 计时器在执行指定函数前应等待的毫秒数
- `options: { autoInvoke }` – 决定计时器是否应在挂载时启动；默认 false

返回对象：

- `start` – 启动计时器
- `clear` – 取消计时器

```tsx
import { useTimeout } from '@react-ui/hooks';

const { start, clear } = useTimeout(callback, delay, {
  autoInvoke: true,
});
```

## 类型定义

```tsx
interface UseTimeoutOptions {
  autoInvoke: boolean;
}

interface UseTimeoutReturnValue {
  start: (...args: any[]) => void;
  clear: () => void;
}

function useTimeout(
  callback: (...args: any[]) => void,
  delay: number,
  options?: UseTimeoutOptions,
): UseTimeoutReturnValue
```

## 导出类型

`UseTimeoutOptions` 和 `UseTimeoutReturnValue` 类型从 `@react-ui/hooks` 包导出：

```tsx
import type { UseTimeoutOptions, UseTimeoutReturnValue } from '@react-ui/hooks';
```
