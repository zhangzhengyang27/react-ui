---
category: Hooks
title: UseRovingIndex
subtitle: 漫游索引
description: react-ui 漫游索引 Hook 文档。
---


## 用法

`use-roving-index` 实现了 [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) 键盘导航模式。
在一组可聚焦元素中，只有一个元素具有 `tabIndex={0}`（可通过 Tab 键到达），
其余元素均为 `tabIndex={-1}`。方向键可在组内项目之间移动焦点。

<code src="./use-roving-index/demo/usage.tsx"></code>

## 方向

设置 `orientation` 以控制使用哪些方向键进行导航：
- `'horizontal'`（默认）– ArrowLeft/ArrowRight
- `'vertical'` – ArrowUp/ArrowDown
- `'both'` – 四个方向键均可

<code src="./use-roving-index/demo/vertical.tsx"></code>

## 网格导航

设置 `columns` 以启用二维网格导航。ArrowLeft/ArrowRight 在同一行内导航，
ArrowUp/ArrowDown 跨行导航并保持列位置不变。
导航在网格边界处停止。使用 Ctrl+Home/Ctrl+End 跳转到网格的第一个/最后一个项目，
使用 Home/End 跳转到当前行的第一个/最后一个项目。

<code src="./use-roving-index/demo/grid.tsx"></code>

## 禁用项

使用 `isItemDisabled` 回调函数将项目标记为禁用。禁用的项目会在键盘导航中被跳过。
如果初始聚焦项被禁用，则第一个非禁用项目会获得焦点。

<code src="./use-roving-index/demo/disabled.tsx"></code>

## 循环

默认情况下，导航在边界处循环（`loop` 为 `true`）。
设置 `loop={false}` 可在第一个和最后一个项目处停止。

<code src="./use-roving-index/demo/loop.tsx"></code>

## 受控模式

使用 `focusedIndex` 和 `onFocusChange` 在外部控制聚焦索引：

```tsx
import { useState } from 'react';
import { useRovingIndex } from '@react-ui/hooks';

function Demo() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { getItemProps } = useRovingIndex({
    total: 5,
    focusedIndex,
    onFocusChange: setFocusedIndex,
  });

  // ...
}
```

## activateOnFocus

设置 `activateOnFocus` 为 `true`，可在项目通过键盘导航获得焦点时自动点击它们。
这对于标签页式界面很有用，因为焦点和选择需要保持同步：

```tsx
import { useRovingIndex } from '@react-ui/hooks';

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: 5,
    activateOnFocus: true,
  });

  // ...
}
```

## RTL 支持

设置 `dir="rtl"` 以交换 ArrowLeft/ArrowRight 在从右到左布局中的行为：

```tsx
import { useRovingIndex } from '@react-ui/hooks';

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: 5,
    dir: 'rtl',
  });

  // ...
}
```

## 类型定义

```tsx
export interface UseRovingIndexInput {
  /** 组中项目的总数 */
  total: number;

  /** 哪些方向键用于导航，默认 `'horizontal'` */
  orientation?: 'horizontal' | 'vertical' | 'both';

  /** 导航是否在边界处循环，默认 `true` */
  loop?: boolean;

  /** 文本方向，默认 `'ltr'` */
  dir?: 'rtl' | 'ltr';

  /** 是否在该元素通过键盘获得焦点时点击它，默认 `false` */
  activateOnFocus?: boolean;

  /** 网格（二维）导航的列数。设置后启用网格模式 */
  columns?: number;

  /** 受控聚焦索引 */
  focusedIndex?: number;

  /** 非受控模式下的初始聚焦索引，默认第一个非禁用项目 */
  initialIndex?: number;

  /** 聚焦索引变化时调用 */
  onFocusChange?: (index: number) => void;

  /** 检查给定索引的项目是否禁用的函数，默认 `() => false` */
  isItemDisabled?: (index: number) => boolean;
}

export interface UseRovingIndexGetItemPropsInput {
  /** 项目在组中的索引 */
  index: number;

  /** 点击项目时调用 */
  onClick?: React.MouseEventHandler;

  /** 项目上触发 keydown 事件时调用 */
  onKeyDown?: React.KeyboardEventHandler;
}

export interface UseRovingIndexReturnValue {
  /** 获取要展开到每个可导航项目上的 props */
  getItemProps: (options: UseRovingIndexGetItemPropsInput) => {
    tabIndex: 0 | -1;
    onKeyDown: React.KeyboardEventHandler;
    onClick: React.MouseEventHandler;
    ref: React.RefCallback<HTMLElement>;
  };

  /** 当前聚焦索引 */
  focusedIndex: number;

  /** 以编程方式设置聚焦索引 */
  setFocusedIndex: (index: number) => void;
}

function useRovingIndex(input: UseRovingIndexInput): UseRovingIndexReturnValue;
```

## 导出类型

`UseRovingIndexInput`、`UseRovingIndexGetItemPropsInput` 和 `UseRovingIndexReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type {
  UseRovingIndexInput,
  UseRovingIndexGetItemPropsInput,
  UseRovingIndexReturnValue,
} from '@react-ui/hooks';
```
