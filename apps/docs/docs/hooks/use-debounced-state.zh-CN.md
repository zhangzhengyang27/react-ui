---
category: Hooks
title: UseDebouncedState
subtitle: 防抖状态
description: react-ui 防抖状态 Hook 文档。
---


## 用法

`use-debounced-state` Hook 对值变化进行防抖。当你想基于 React 状态执行耗时操作（例如发送搜索请求）时，这很有用。
与 [use-debounced-value](/docs/hooks/use-debounced-value/) 不同，它设计用于非受控组件。

<code src="./use-debounced-state/demo/usage.tsx"></code>

## 与 use-debounced-value 的区别

- 你无法直接访问非防抖值。
- 它用于非受控输入（使用 `defaultValue` 属性而非 `value`），例如，它不会像输入框中输入字符那样在每次状态变化时都渲染。
- 它不适用于自定义状态提供者或 props，并且内部使用 `useState`。

## 前置更新

你可以使用 `{ leading: true }` 选项在第一次调用时立即更新值：

<code src="./use-debounced-state/demo/leading.tsx"></code>

## 类型定义

```tsx
interface UseDebouncedStateOptions {
  leading?: boolean;
}

type UseDebouncedStateReturnValue<T> = [T, (newValue: SetStateAction<T>) => void];

function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options?: UseDebouncedStateOptions,
): UseDebouncedStateReturnValue<T>
```

## 导出类型

`UseDebouncedStateOptions` 和 `UseDebouncedStateReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseDebouncedStateOptions, UseDebouncedStateReturnValue } from '@react-ui/hooks';
```
