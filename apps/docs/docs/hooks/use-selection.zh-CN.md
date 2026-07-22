---
category: Hooks
title: UseSelection
subtitle: 选择集合
description: react-ui 选择集合 Hook 文档。
---


## 用法

<code src="./use-selection/demo/usage.tsx"></code>

## 类型定义

```tsx
export interface UseSelectionInput<T> {
  /** 用于选择的项目数组 */
  data: T[];

  /** 初始选择，默认为空数组 */
  defaultSelection?: T[];

  /** 如果为 true，数据变化时选择会重置 */
  resetSelectionOnDataChange?: boolean;
}

export interface UseSelectionHandlers<T> {
  /** 将项目添加到选择中 */
  select: (selected: T) => void;

  /** 从选择中移除项目 */
  deselect: (deselected: T) => void;

  /** 切换项目的选择状态 */
  toggle: (toggled: T) => void;

  /** 如果 `data` 中所有项目都被选中则返回 true */
  isAllSelected: () => boolean;

  /** 如果 `data` 中至少有一个项目被选中则返回 true */
  isSomeSelected: () => boolean;

  /** 将选择设置为特定的项目数组 */
  setSelection: (selection: T[]) => void;

  /** 清除所有选择 */
  resetSelection: () => void;
}

export type UseSelectionReturnValue<T> = readonly [T[], UseSelectionHandlers<T>];

function useSelection<T>(input: UseSelectionInput<T>): UseSelectionReturnValue<T>
```

## 导出类型

`UseSelectionInput`、`UseSelectionReturnValue` 和 `UseSelectionHandlers` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseSelectionInput, UseSelectionReturnValue, UseSelectionHandlers } from '@xiaoye-react/hooks';
```
