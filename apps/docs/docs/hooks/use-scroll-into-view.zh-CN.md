---
category: Hooks
title: UseScrollIntoView
subtitle: 滚动到视口
description: react-ui 滚动到视口 Hook 文档。
---


## 用法

`use-scroll-into-view` Hook 处理任何可滚动元素的滚动行为。基本用法与 `element.scrollIntoView()` 相同。
该 Hook 会根据用户的 `reduced-motion` 偏好调整滚动动画。

<code src="./use-scroll-into-view/demo/usage.tsx"></code>

## API 参考

该 Hook 使用一个设置对象进行配置：

- `onScrollFinish` – 滚动动画完成后调用的函数
- `onScrollCancel` – 滚动动画被用户交互取消时调用的函数
- `easing` – 自定义数学缓动函数
- `duration` - 滚动动画的持续时间（毫秒）
- `axis` - 滚动的轴
- `cancelable` - 指示动画是否可以被用户滚动中断
- `offset` - 最近边缘与元素之间的额外距离
- `isList` - 指示器，可防止具有多个目标的滚动列表中的内容跳动，例如 Select、Carousel

该 Hook 返回一个包含以下内容的物体：

- `scrollIntoView` – 开始滚动动画的函数
- `cancel` – 停止滚动动画的函数
- `scrolling` – 指示滚动动画是否正在进行的布尔值
- `targetRef` - 目标 HTML 节点的 ref
- `scrollableRef` - 可滚动父 HTML 元素的 ref；如果未使用，将使用 document 元素

返回的 `scrollIntoView` 函数接受一个可选参数 `alignment` - 基于当前轴相对于父元素的目标元素对齐方式。

```tsx
import { useScrollIntoView } from '@react-ui/hooks';

const { scrollIntoView } = useScrollIntoView();

scrollIntoView({ alignment: 'center' });
```

## 缓动

该 Hook 接受自定义 `easing` 数学函数来控制动画流程。
它接受 `t` 参数，这是一个介于 `0` 和 `1` 之间的数字。

默认缓动为 `easeInOutQuad` - 更多信息请参阅[此处](https://easings.net/#easeInOutQuad)。
你可以在 [easings.net](https://easings.net/) 找到其他流行示例。

```tsx
import { useScrollIntoView } from '@react-ui/hooks';

useScrollIntoView({
  easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2), // easeInOutQuint
});
```

## 父节点

<code src="./use-scroll-into-view/demo/parent.tsx"></code>

## 滚动 X 轴

<code src="./use-scroll-into-view/demo/axis.tsx"></code>

## 类型定义

```tsx
interface UseScrollIntoViewAnimation {
  /** 基于当前轴相对于父元素的目标元素对齐方式 */
  alignment?: 'start' | 'end' | 'center';
}

interface UseScrollIntoViewOptions {
  /** 滚动后触发的回调 */
  onScrollFinish?: () => void;

  /** 滚动动画被用户交互取消时触发的回调 */
  onScrollCancel?: () => void;

  /** 滚动持续时间（毫秒） */
  duration?: number;

  /** 滚动轴 */
  axis?: 'x' | 'y';

  /** 自定义数学缓动函数 */
  easing?: (t: number) => number;

  /** 最近边缘与元素之间的额外距离 */
  offset?: number;

  /** 指示动画是否可以被用户滚动中断 */
  cancelable?: boolean;

  /** 防止具有多个目标的滚动列表中的内容跳动 */
  isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null,
> {
  scrollableRef: React.RefObject<Parent | null>;
  targetRef: React.RefObject<Target | null>;
  scrollIntoView: (params?: UseScrollIntoViewAnimation) => void;
  cancel: () => void;
  scrolling: boolean;
}

function useScrollIntoView<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null
>(
  options?: UseScrollIntoViewOptions,
): UseScrollIntoViewReturnValue<Target, Parent>
```

## 导出类型

`UseScrollIntoViewOptions` 和 `UseScrollIntoViewReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseScrollIntoViewOptions, UseScrollIntoViewReturnValue } from '@react-ui/hooks';
```
