---
category: Hooks
title: UseOs
subtitle: 操作系统检测
description: react-ui 操作系统检测 Hook 文档。
---


## 用法

`use-os` Hook 返回用户的操作系统。可能的值有：`undetermined`、`macos`、`ios`、`windows`、`android`、`linux`、`chromeos`。
如果无法识别操作系统，例如，在服务端渲染期间，将返回 `undetermined`。

<code src="./use-os/demo/usage.tsx"></code>

## 类型定义

```tsx
type UseOSReturnValue =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux'
  | 'chromeos';

interface UseOsOptions {
  getValueInEffect: boolean;
}

function getOS(options?: UseOsOptions): UseOSReturnValue;
```

## 导出类型

`UseOsOptions` 和 `UseOSReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseOsOptions, UseOSReturnValue } from '@react-ui/hooks';
```
