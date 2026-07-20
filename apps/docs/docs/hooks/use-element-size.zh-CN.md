---
category: Hooks
title: UseElementSize
subtitle: 元素尺寸
description: react-ui 元素尺寸 Hook 文档。
---


## 用法

<code src="./use-element-size/demo/usage.tsx"></code>

## API 参考

`use-element-size` 是 [use-resize-observer](/docs/hooks/use-resize-observer/) Hook 的简化版本。
该 Hook 返回一个 `ref` 对象，应将其传递给被观察的元素，以及该元素的 `height` 和 `width`。
在第一次渲染（以及 SSR 期间）或未观察任何元素时，`width` 和 `height` 属性等于 `0`。

```tsx
import { useElementSize } from '@react-ui/hooks';

const { ref, width, height } = useElementSize();
```

## 类型定义

```tsx
interface UseElementSizeReturnValue {
  ref: React.RefObject<HTMLElement>;
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = any>(): UseElementSizeReturnValue;
```
