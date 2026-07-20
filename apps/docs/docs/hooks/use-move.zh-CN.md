---
category: Hooks
title: UseMove
subtitle: 移动手势
description: react-ui 移动手势 Hook 文档。
---


## 用法

`use-move` Hook 处理任何元素上的移动行为：

<code src="./use-move/demo/usage.tsx"></code>

## API 参考

该 Hook 接受一个回调函数，当用户在给定元素上按下鼠标移动时调用，
并返回一个包含 `ref` 和 active 状态的对象：


`x` 和 `y` 值始终在 `0` 到 `1` 之间；你可以用它们来计算你边界内的值。

```tsx
import { useMove } from '@react-ui/hooks';

const {
  ref, // -> 传递给目标元素
  active, // -> 用户是否正在更改值？
} = useMove(({ x, y }) => console.log({ x, y }));
```

## 水平滑块

你可以忽略其中一个轴的变化：

<code src="./use-move/demo/horizontal.tsx"></code>

## 带样式的水平滑块

<code src="./use-move/demo/customSlider.tsx"></code>

## 垂直滑块

向下滑动滑块会增加值，要反转这一点，请在 `setValue` 函数中将值设为 `1 - y`：

<code src="./use-move/demo/vertical.tsx"></code>

## 颜色选择器

<code src="./use-move/demo/color.tsx"></code>

## clampUseMovePosition

`clampUseMovePosition` 函数可用于将 `x` 和 `y` 值限制在 `0-1` 范围内。
当你想使用外部事件来更改值时，这很有用，例如使用键盘方向键更改值：

```tsx
import { clampUseMovePosition } from '@react-ui/hooks';

clampUseMovePosition({ x: 0.5, y: 0.5 }); // -> { x: 0.5, y: 0.5 }
clampUseMovePosition({ x: 1.5, y: 0.5 }); // -> { x: 1, y: 0.5 }
clampUseMovePosition({ x: -0.5, y: 0.5 }); // -> { x: 0, y: 0.5 }
```

## UseMovePosition

`@react-ui/hooks` 导出 `UseMovePosition` 类型，它可用作 `useState` 的类型参数：

```tsx
import { useState } from 'react';
import { UseMovePosition } from '@react-ui/hooks';

const [value, setValue] = useState<UseMovePosition>({
  x: 0.5,
  y: 0.5,
});
```

## 类型定义

```tsx
interface UseMovePosition {
  x: number;
  y: number;
}

interface UseMoveHandlers {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

interface UseMoveReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  active: boolean;
}

function useMove<T extends HTMLElement = any>(
  onChange: (value: UseMovePosition) => void,
  handlers?: UseMoveHandlers,
  dir?: "ltr" | "rtl",
): UseMoveReturnValue<T>
```

## 导出类型

`UseMovePosition`、`UseMoveReturnValue` 和 `UseMoveHandlers` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseMovePosition, UseMoveHandlers, UseMoveReturnValue } from '@react-ui/hooks';
```
