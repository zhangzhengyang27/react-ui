---
category: Hooks
title: UseCollapse
subtitle: 折叠状态
description: react-ui 折叠状态 Hook 文档。
---

## 用法

`use-collapse` 是 [Collapse](/components/collapse) 组件的 Hook 版本。
它允许高度从 `0` 到 `auto` 以及反向的动画。

<code src="./use-collapse/demo/usage.tsx"></code>

## 水平折叠

`use-horizontal-collapse` 与 `use-collapse` 工作方式相同，但动画的是宽度而非高度：

## ref 属性

`getCollapseProps` 的返回值现在包含 `ref` 属性。必须将其传递给可折叠元素，以使 Hook 正常工作。

## 类型定义

```tsx
interface UseCollapseInput {
  /** Expanded state  */
  expanded: boolean;

  /** Transition duration in milliseconds, by default calculated based on content height */
  transitionDuration?: number;

  /** Transition timing function, `ease` by default */
  transitionTimingFunction?: string;

  /** Called when transition ends */
  onTransitionEnd?: () => void;

  /** Called when transition starts */
  onTransitionStart?: () => void;

  /** If true, collapsed content is kept in the DOM and hidden with `display: none` styles */
  keepMounted?: boolean;
}

interface GetCollapsePropsInput {
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

interface GetCollapsePropsReturnValue {
  'aria-hidden': boolean;
  inert: boolean;
  ref: React.RefCallback<HTMLDivElement>;
  onTransitionEnd: (event: React.TransitionEvent<Element>) => void;
  style: React.CSSProperties;
}

type UseCollapseState = 'entering' | 'entered' | 'exiting' | 'exited';

interface UseCollapseReturnValue {
  state: UseCollapseState;
  getCollapseProps: (input?: GetCollapsePropsInput) => GetCollapsePropsReturnValue;
}

function useCollapse(input: UseCollapseInput): UseCollapseReturnValue;
```

## 导出类型

`UseCollapseInput`、`UseCollapseState` 和 `UseCollapseReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseCollapseInput, UseCollapseState, UseCollapseReturnValue } from '@react-ui/hooks';
```
