---
category: Hooks
title: UseClipboard
subtitle: 剪贴板
description: react-ui 剪贴板 Hook 文档。
---


## 用法

`use-clipboard` Hook 提供了一种简单的方式将文本复制到剪贴板、跟踪复制状态、处理错误，
并在给定超时后重置状态。它底层使用 [navigator.clipboard.writeText](https://caniuse.com/mdn-api_clipboard_writetext) API。

<code src="./use-clipboard/demo/usage.tsx"></code>

## 限制

由于安全原因，`use-clipboard` Hook 在 iframe 中无法工作，也可能无法与使用 `file://` 协议打开的本地文件一起工作
（该 Hook 可以正常使用 `http://` 协议的本地网站）。你可以在[这里](https://web.dev/async-clipboard/)了解更多关于 `navigator.clipboard` 的信息。

## 类型定义

```tsx
interface UseClipboardOptions {
  /** Time in ms after which the copied state will reset, `2000` by default */
  timeout?: number;
}

interface UseClipboardReturnValue {
  /** Function to copy value to clipboard */
  copy: (value: any) => void;

  /** Function to reset copied state and error */
  reset: () => void;

  /** Error if copying failed */
  error: Error | null;

  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
}

function useClipboard(options?: UseClipboardOptions): UseClipboardReturnValue
```

## 导出类型

`UseClipboardOptions` 和 `UseClipboardReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseClipboardOptions, UseClipboardReturnValue } from '@xiaoye-react/hooks';
```
