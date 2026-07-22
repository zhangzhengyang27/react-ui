---
category: Hooks
title: UseHeadroom
subtitle: 滚动隐藏
description: react-ui 滚动隐藏 Hook 文档。
---


## 用法

`use-headroom` Hook 创建在用户滚动超过给定像素距离后隐藏的页头。
它返回 `{ pinned, scrollProgress }`，其中 `pinned` 在元素至少部分可见时为 `true`，
`scrollProgress` 是介于 `0`（完全隐藏）和 `1`（完全可见）之间的数字。

<code src="./use-headroom/demo/usage.tsx"></code>

## scrollProgress

使用 `scrollProgress` 创建滚动关联的显示动画，而不是瞬间显示/隐藏切换。
当用户向下滚动超过 `fixedAt` 时，该值从 `1`（完全可见）过渡到 `0`（完全隐藏），
并在用户向上滚动时回到 `1`。滚动中途改变方向也能正确处理——进度会从方向改变时的位置继续。
设置 `scrollDistance` 以控制完全显示或隐藏元素所需的滚动像素数。

<code src="./use-headroom/demo/scrollProgress.tsx"></code>

## 回调函数

该 Hook 支持 `onPin`、`onRelease` 和 `onFix` 回调：

- `onPin` 在页头变为可见时调用（用户向上滚动）
- `onRelease` 在页头隐藏时调用（用户向下滚动）
- `onFix` 在滚动位置进入固定区域时调用（滚动位置 &le; `fixedAt`）

<code src="./use-headroom/demo/callbacks.tsx"></code>

## 类型定义

```tsx
interface UseHeadroomOptions {
  /** Number in px at which element should be fixed, 0 by default */
  fixedAt?: number;

  /** Number of px to scroll to fully reveal or hide the element, 100 by default */
  scrollDistance?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;
}

interface UseHeadroomReturnValue {
  /** True when the element is at least partially visible */
  pinned: boolean;

  /** Reveal progress: 0 = fully hidden, 1 = fully visible */
  scrollProgress: number;
}

function useHeadroom(input?: UseHeadroomOptions): UseHeadroomReturnValue;
```

## 导出类型

`UseHeadroomOptions` 类型从 `@xiaoye-react/hooks` 包导出：

```tsx
import { UseHeadroomOptions } from '@xiaoye-react/hooks';
```
