---
category: Hooks
title: UseDebouncedValue
subtitle: 防抖值
description: react-ui 防抖值 Hook 文档。
---


## 用法

`use-debounced-value` Hook 对值变化进行防抖。当你想基于 React 状态执行耗时操作（例如发送搜索请求）时，这很有用。
与 [use-debounced-state](/docs/hooks/use-debounced-state/) 不同，它设计用于受控组件。

<code src="./use-debounced-value/demo/usage.tsx"></code>

## 与 use-debounced-state 的区别

- 你可以直接访问非防抖值。
- 它用于受控输入（使用 `value` 属性而非 `defaultValue`），例如，它会在每次状态变化时渲染，就像在输入框中输入字符一样。
- 它适用于 props 或其他状态提供者，并且不强制使用 `useState`。

## 前置更新

你可以使用 `{ leading: true }` 选项在第一次调用时立即更新值：

<code src="./use-debounced-value/demo/leading.tsx"></code>

## 取消与刷新

该 Hook 返回的元组第三个元素包含 `cancel` 和 `flush` 处理函数。`cancel` 丢弃待处理的更新，`flush` 立即应用更新。
组件卸载时会自动取消更新。

在本示例中，输入一些文本并在一秒内点击取消按钮以取消防抖值变化：


返回元组的第二个元素是 `cancel` 的简写，用于向后兼容。

```tsx
const [debounced, cancel, { cancel, flush }] = useDebouncedValue(value, 200);
```

<code src="./use-debounced-value/demo/cancel.tsx"></code>

## 类型定义

```tsx
interface UseDebouncedValueOptions {
  leading?: boolean;
}

interface UseDebouncedValueHandlers {
  cancel: () => void;
  flush: () => void;
}

type UseDebouncedValueReturnValue<T> = [T, () => void, UseDebouncedValueHandlers];

function useDebouncedValue<T = any>(
  value: T,
  wait: number,
  options?: UseDebouncedValueOptions,
): UseDebouncedValueReturnValue<T>
```

## 导出类型

`UseDebouncedValueOptions` 和 `UseDebouncedValueReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseDebouncedValueOptions, UseDebouncedValueReturnValue } from '@react-ui/hooks';
```
