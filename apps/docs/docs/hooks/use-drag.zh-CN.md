---
category: Hooks
title: UseDrag
subtitle: 拖拽手势
description: react-ui 拖拽手势 Hook 文档。
---


## 用法

`use-drag` Hook 处理元素上的指针拖动手势。它跟踪移动、速度、方向，
并支持轴约束、阈值激活和点击检测。该 Hook 使用 Pointer Events API，
可同时兼容鼠标和触摸输入。

<code src="./use-drag/demo/usage.tsx"></code>

## 轴约束

使用 `axis` 选项将移动约束到单个轴。
将 `axis` 设置为 `'x'` 或 `'y'` 以固定约束，或设置为 `'lock'` 以在超过 `axisThreshold` 后锁定到移动更多的轴：

<code src="./use-drag/demo/axis.tsx"></code>

## 区分点击与拖动

启用 `filterTaps` 后，最后一次状态会包含一个 `tap` 属性，当总距离低于 `tapThreshold`（默认 `3px`）时为 `true`。
结合 `threshold` 使用，可以在同一元素上区分点击和拖动：

<code src="./use-drag/demo/filterTaps.tsx"></code>

## 滑动关闭

在最后一次事件上使用 `movement` 和 `velocity` 来决定是否关闭项目。
这种模式非常适合通知：

<code src="./use-drag/demo/swipe.tsx"></code>

## 拖动滚动

将 `delta` 应用于容器的 `scrollLeft` 以创建拖动滚动交互：

<code src="./use-drag/demo/scroll.tsx"></code>

## 触摸支持

该 Hook 使用 Pointer Events API，可自动处理鼠标和触摸。
对于触摸设备，请在可拖动元素上设置 `touch-action: none`，以防止浏览器将触摸拖动解释为滚动：


如果你想允许在一个轴上滚动，同时在另一个轴上拖动（例如，水平拖动配合垂直滚动），
请使用 `touch-action: pan-y` 或 `touch-action: pan-x`。

```css
.draggable {
  touch-action: none;
}
```

## 类型定义

```tsx
type Vector2 = [number, number];

interface UseDragState {
  /** Current pointer position */
  xy: Vector2;

  /** Position where the gesture started */
  initial: Vector2;

  /** Displacement from start, respects axis constraint */
  movement: Vector2;

  /** Change since previous event */
  delta: Vector2;

  /** Absolute distance per axis */
  distance: Vector2;

  /** Movement direction per axis: -1, 0 or 1 */
  direction: Vector2;

  /** Speed per axis in px/ms */
  velocity: Vector2;

  /** Time since drag started in ms */
  elapsedTime: number;

  /** `true` on the first handler call */
  first: boolean;

  /** `true` on the last handler call (pointer released or canceled) */
  last: boolean;

  /** `true` while the gesture is ongoing */
  active: boolean;

  /** `true` when the gesture qualifies as a tap (requires `filterTaps`) */
  tap: boolean;

  /** `true` when the gesture was interrupted by a `pointercancel` event */
  canceled: boolean;

  /** Function to programmatically cancel the current gesture */
  cancel: () => void;

  /** The source pointer event */
  event: PointerEvent;

}

interface UseDragOptions {
  /** Constrain movement to an axis, `'lock'` locks to whichever axis has more movement */
  axis?: 'x' | 'y' | 'lock';

  /** Movement in px to determine lock axis, default `1` */
  axisThreshold?: number;

  /** Enable tap detection on the last event, default `false` */
  filterTaps?: boolean;

  /** Max displacement in px to be considered a tap, default `3` */
  tapThreshold?: number;

  /** Min displacement before drag activates, default `0` */
  threshold?: number | Vector2;

  /** Enable or disable the hook, default `true` */
  enabled?: boolean;

}

interface UseDragReturnValue<T extends HTMLElement = any> {
  /** Ref callback to attach to the target element */
  ref: React.RefCallback<T | null>;

  /** `true` while a drag gesture is active */
  active: boolean;
}

function useDrag<T extends HTMLElement = any>(
  handler: (state: UseDragState) => void,
  options?: UseDragOptions,
): UseDragReturnValue<T>
```

## 导出类型

`UseDragState`、`UseDragOptions` 和 `UseDragReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseDragState, UseDragOptions, UseDragReturnValue } from '@react-ui/hooks';
```
