---
category: Hooks
title: UseRadialMove
subtitle: 径向移动
description: react-ui 径向移动 Hook 文档。
---


## 用法

`use-radial-move` Hook 可用于创建自定义径向滑块。例如，[AngleSlider](/components/angle-slider)
组件就是基于此 Hook。它的工作方式与 [use-move](/docs/hooks/use-move) Hook 类似。

创建自定义径向滑块的示例：

<code src="./use-radial-move/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseRadialMoveOptions {
  /** 鼠标和触摸事件时值的增减步数，默认 `0.01` */
  step?: number;

  /** 在 `onMouseUp` 和 `onTouchEnd` 事件中调用，传入当前值 */
  onChangeEnd?: (value: number) => void;

  /** 在 `onMouseDown` 和 `onTouchStart` 事件中调用 */
  onScrubStart?: () => void;

  /** 在 `onMouseUp` 和 `onTouchEnd` 事件中调用 */
  onScrubEnd?: () => void;
}

interface UseRadialMoveReturnValue<T extends HTMLElement = any> {
  /** 传递给用于径向移动元素的 ref */
  ref: React.RefCallback<T | null>;

  /** 指示径向移动是否处于活动状态 */
  active: boolean;
}

function useRadialMove<T extends HTMLElement = HTMLDivElement>(
  onChange: (value: number) => void,
  options?: UseRadialMoveOptions,
): UseRadialMoveReturnValue<T>;
```

## 导出类型

`UseRadialMoveOptions` 和 `UseRadialMoveReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseRadialMoveOptions, UseRadialMoveReturnValue } from '@xiaoye-react/hooks';
```
