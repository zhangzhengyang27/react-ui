---
category: Hooks
title: UseFocusWithin
subtitle: 内部焦点
description: react-ui 内部焦点 Hook 文档。
---


## 用法

`use-focus-within` Hook 检测某个元素内部的任何元素是否获得了焦点。
它的工作方式与 `:focus-within` CSS 选择器相同：

<code src="./use-focus-within/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

interface UseFocusWithinReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  focused: boolean;
}

function useFocusWithin<T extends HTMLElement = any>(
  options?: UseFocusWithinOptions,
): UseFocusWithinReturnValue<T>
```

## 导出类型

`UseFocusWithinOptions` 和 `UseFocusWithinReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseFocusWithinOptions, UseFocusWithinReturnValue } from '@react-ui/hooks';
```
