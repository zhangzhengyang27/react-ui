---
category: Hooks
title: UseLongPress
subtitle: 长按
description: react-ui 长按 Hook 文档。
---


## 用法

<code src="./use-long-press/demo/usage.tsx"></code>

## 类型定义

```tsx
type UseLongPressEvent = 'mouse' | 'touch';

interface UseLongPressOptions {
  /** Time in milliseconds to trigger the long press, default is 400ms */
  threshold?: number;

  /** Input types that can trigger the long press, `['mouse', 'touch']` by default */
  events?: UseLongPressEvent[];

  /** If set, the long press is canceled when the pointer moves further than the given distance in px from the start position. `true` uses a 10px threshold, a number sets a custom threshold. `false` by default */
  cancelOnMove?: boolean | number;

  /** Callback triggered when the long press starts */
  onStart?: (event: React.MouseEvent | React.TouchEvent) => void;

  /** Callback triggered when the long press finishes */
  onFinish?: (event: React.MouseEvent | React.TouchEvent) => void;

  /** Callback triggered when the long press is canceled */
  onCancel?: (event: React.MouseEvent | React.TouchEvent) => void;
}

interface UseLongPressReturnValue {
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onTouchCancel?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
}

function useLongPress(
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void,
  options?: UseLongPressOptions,
): UseLongPressReturnValue
```

## 限制为特定输入类型

默认情况下，长按可由鼠标和触摸输入触发。使用 `events` 选项将其限制为子集——
例如，`['touch']` 仅返回触摸处理函数，将鼠标输入留给你的自定义处理函数：

```tsx
import { useLongPress } from '@react-ui/hooks';

function Demo() {
  const handlers = useLongPress(() => console.log('Long pressed'), {
    events: ['touch'],
  });

  return <button {...handlers}>按我</button>;
}
```

## 移动时取消

设置 `cancelOnMove` 以在指针移动距离超过给定距离时取消待处理的长按。
这在触摸设备上很有用，这样滚动手势不会触发长按。传递 `true` 以使用默认的 10px 阈值，
或传递数字以设置自定义阈值：

```tsx
import { useLongPress } from '@react-ui/hooks';

function Demo() {
  const handlers = useLongPress(() => console.log('Long pressed'), {
    cancelOnMove: true,
  });

  return <button {...handlers}>按我</button>;
}
```

## 导出类型

`UseLongPressEvent`、`UseLongPressOptions` 和 `UseLongPressReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type {
  UseLongPressEvent,
  UseLongPressOptions,
  UseLongPressReturnValue,
} from '@react-ui/hooks';
```
