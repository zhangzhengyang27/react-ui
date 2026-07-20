---
category: Hooks
title: UseFileDialog
subtitle: 文件选择对话框
description: react-ui 文件选择对话框 Hook 文档。
---


## 用法

`use-file-dialog` Hook 允许你在没有文件输入元素的情况下从用户那里获取一个或多个文件：

<code src="./use-file-dialog/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseFileDialogOptions {
  /** Determines whether multiple files are allowed, `true` by default */
  multiple?: boolean;

  /** `accept` attribute of the file input, '*' by default */
  accept?: string;

  /** `capture` attribute of the file input */
  capture?: string;

  /** Determines whether the user can pick a directory instead of file, `false` by default */
  directory?: boolean;

  /** Determines whether the file input state should be reset when the file dialog is opened, `false` by default */
  resetOnOpen?: boolean;

  /** Initial selected files */
  initialFiles?: FileList | File[];

  /** Called when files are selected */
  onChange?: (files: FileList | null) => void;

  /** Called when file dialog is canceled */
  onCancel?: () => void;
}

interface UseFileDialogReturnValue {
  files: FileList | null;
  open: () => void;
  reset: () => void;
}

function useFileDialog(input?: UseFileDialogOptions): UseFileDialogReturnValue;
```

## 导出类型

`UseFileDialogOptions` 和 `UseFileDialogReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseFileDialogOptions, UseFileDialogReturnValue } from '@react-ui/hooks';
```
