---
category: Hooks
title: UseFloatingWindow
subtitle: 浮动窗口
description: react-ui 浮动窗口 Hook 文档。
---

## 用法

`use-floating-window` Hook 使给定元素可拖动：

<code src="./use-floating-window/demo/usage.tsx"></code>

## 限制在视口内

使用 `constrainToViewport` 选项将元素移动限制在视口边界内。
如果未设置 `constrainToViewport` 选项，元素可以被拖出视口：

<code src="./use-floating-window/demo/constrainToViewport.tsx"></code>

## 约束偏移

使用 `constrainOffset` 选项设置元素约束时与视口边缘的偏移。
此选项需要 `constrainToViewport: true`：

<code src="./use-floating-window/demo/constrainOffset.tsx"></code>

## 拖动手柄选择器

`dragHandleSelector` 选项允许指定一个元素（或一组元素）的选择器，用于拖动悬浮窗口。
如果未指定，则整个根元素都用作拖动目标。

`excludeDragHandleSelector` 选项会从拖动事件中排除 `dragHandleSelector` 内的元素。
在以下示例中，关闭按钮被排除在拖动事件之外：

<code src="./use-floating-window/demo/dragHandleSelector.tsx"></code>

## Enabled 选项

使用 `enabled` 选项启用或禁用拖动：

<code src="./use-floating-window/demo/enabled.tsx"></code>

## 设置位置

调用 `setPosition` 函数以编程方式设置元素位置。
该函数接受一个包含 `top`、`left`、`right` 和 `bottom` 属性的对象，
你只需指定其中两个（例如，`top` 和 `left`，或 `bottom` 和 `right`）。

<code src="./use-floating-window/demo/setPosition.tsx"></code>

## 锁定轴

使用 `axis` 选项将移动限制到指定轴：

<code src="./use-floating-window/demo/axis.tsx"></code>

## FloatingWindow 组件

如果你更喜欢组件 API，可以使用 [FloatingWindow](/components/floating-window) 组件。
它支持与 Hook 相同的选项，并提供额外功能，如 portal 渲染、基础样式等。

## 类型定义

```tsx
function useFloatingWindow<T extends HTMLElement>(
  options?: UseFloatingWindowOptions
): UseFloatingWindowReturnValue<T>

interface FloatingWindowPositionConfig {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface FloatingWindowPosition {
  /** Element offset from the left side of the viewport */
  x: number;

  /** Element offset from the top side of the viewport */
  y: number;
}

interface UseFloatingWindowOptions {
  /** If `false`, the element can not be dragged. */
  enabled?: boolean;

  /** If `true`, the element can only move within
   * the current viewport boundaries. */
  constrainToViewport?: boolean;

  /** The offset from the viewport edges when constraining the element.
   * Requires `constrainToViewport: true`. */
  constrainOffset?: number;

  /** Selector of an element that should be used to drag floating window.
   * If not specified, the entire root element is used as a drag target. */
  dragHandleSelector?: string;

  /** Selector of an element within `dragHandleSelector`
   * that should be excluded from the drag event. */
  excludeDragHandleSelector?: string;

  /** If set, restricts movement to the specified axis */
  axis?: 'x' | 'y';

  /** Initial position. If not set, calculated from element styles. */
  initialPosition?: FloatingWindowPositionConfig;

  /** Called when the element position changes */
  onPositionChange?: (pos: FloatingWindowPosition) => void;

  /** Called when the drag starts */
  onDragStart?: () => void;

  /** Called when the drag stops */
  onDragEnd?: () => void;
}

type SetFloatingWindowPosition = (position: FloatingWindowPositionConfig) => void;

interface UseFloatingWindowReturnValue<T extends HTMLElement> {
  /** Ref to the element that should be draggable */
  ref: RefCallback<T | null>;

  /** Function to set the position of the element */
  setPosition: SetFloatingWindowPosition;

  /** `true` if the element is currently being dragged */
  isDragging: boolean;
}
```

## 导出类型

`UseFloatingWindowOptions` 和 `UseFloatingWindowReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseFloatingWindowOptions, UseFloatingWindowReturnValue } from '@xiaoye-react/hooks';
```
