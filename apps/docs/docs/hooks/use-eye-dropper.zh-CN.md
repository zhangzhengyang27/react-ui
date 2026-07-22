---
category: Hooks
title: UseEyeDropper
subtitle: 取色器
description: react-ui 取色器 Hook 文档。
---


## 用法

`use-eye-dropper` Hook 提供了与 [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API) 交互的接口。
请查看[浏览器支持](https://caniuse.com/mdn-api_eyedropper)了解哪些浏览器支持该 API。

<code src="./use-eye-dropper/demo/usage.tsx"></code>

## 类型定义

```tsx
interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

interface UseEyeDropperReturnValue {
  supported: boolean;
  open: (options?: EyeDropperOpenOptions) => Promise<EyeDropperOpenReturnType | undefined>;
}

function useEyeDropper(): UseEyeDropperReturnValue;
```

## 导出类型

`EyeDropperOpenOptions`、`EyeDropperOpenReturnType` 和 `UseEyeDropperReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type {
  EyeDropperOpenOptions,
  EyeDropperOpenReturnType,
  UseEyeDropperReturnValue,
} from '@xiaoye-react/hooks';
```
