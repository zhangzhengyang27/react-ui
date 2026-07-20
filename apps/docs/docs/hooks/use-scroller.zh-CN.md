---
category: Hooks
title: UseScroller
subtitle: 滚动器
description: react-ui 滚动器 Hook 文档。
---

## 用法

`use-scroller` Hook 管理容器元素的水平滚动行为。
它提供滚动状态（内容是否可以向任一方向滚动）、滚动函数和拖动滚动功能。

<code src="./use-scroller/demo/usage.tsx"></code>

## 滚动量

使用 `scrollAmount` 选项控制调用 `scrollStart` 或 `scrollEnd` 函数时内容滚动的像素数。默认值为 `200`：

<code src="./use-scroller/demo/scrollAmount.tsx"></code>

## 可拖动

使用 `draggable` 选项启用或禁用拖动滚动功能。
当 `draggable` 为 `true`（默认）时，用户可以点击并拖动来滚动内容：

<code src="./use-scroller/demo/draggable.tsx"></code>

## Scroller 组件

如果你更喜欢组件 API，可以使用 [Scroller](/components/scroller) 组件。
它提供相同的功能，并带有额外的样式和控制按钮功能。

## 类型定义

```tsx
function useScroller<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollerOptions
): UseScrollerReturnValue<T>;

interface UseScrollerOptions {
  /** 调用滚动函数时滚动的像素数，默认 `200` */
  scrollAmount?: number;

  /** 确定内容是否可以通过鼠标拖动滚动，默认 `true` */
  draggable?: boolean;

  /** 滚动状态变化时调用（canScrollStart 或 canScrollEnd） */
  onScrollStateChange?: (state: UseScrollerScrollState) => void;
}

interface UseScrollerScrollState {
  /** 内容是否可以向起始方向滚动（LTR 中为左，RTL 中为右） */
  canScrollStart: boolean;

  /** 内容是否可以向结束方向滚动（LTR 中为右，RTL 中为左） */
  canScrollEnd: boolean;
}

interface UseScrollerReturnValue<T extends HTMLElement = HTMLDivElement> {
  /** 附加到可滚动容器元素的 ref 回调 */
  ref: RefCallback<T | null>;

  /** 内容是否可以向起始方向滚动 */
  canScrollStart: boolean;

  /** 内容是否可以向结束方向滚动 */
  canScrollEnd: boolean;

  /** 向起始方向滚动 */
  scrollStart: () => void;

  /** 向结束方向滚动 */
  scrollEnd: () => void;

  /** 如果用户当前正在拖动内容，则为 `true` */
  isDragging: boolean;

  /** 要展开到可滚动容器以实现拖动功能的 props */
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
}
```

## 导出类型

`UseScrollerOptions`、`UseScrollerReturnValue` 和 `UseScrollerScrollState` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type {
  UseScrollerOptions,
  UseScrollerReturnValue,
  UseScrollerScrollState,
} from '@react-ui/hooks';
```
