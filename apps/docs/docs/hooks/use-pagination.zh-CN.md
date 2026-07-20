---
category: Hooks
title: UsePagination
subtitle: 分页
description: react-ui 分页 Hook 文档。
---


## 用法

`use-pagination` Hook 是 [Pagination](/components/pagination/) 组件的状态管理 Hook；
它以受控和非受控状态管理分页：

```tsx
import { usePagination } from '@react-ui/hooks';

const pagination = usePagination({ total: 10, initialPage: 1 });

pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];

pagination.setPage(5);
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

pagination.next();
pagination.range; // -> [1, 'dots', 5, 6, 7, 'dots', 10];

pagination.previous();
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

pagination.last();
pagination.range; // -> [1, 'dots', 6, 7, 8, 9, 10];

pagination.first();
pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];
```

<code src="./use-pagination/demo/usage.tsx"></code>

## 受控模式

该 Hook 支持受控模式；提供 `page` 和 `onChange` 属性以从外部管理状态：

```tsx
import { useState } from 'react';
import { usePagination } from '@react-ui/hooks';

const [page, onChange] = useState(1);
const pagination = usePagination({ total: 10, page, onChange });

// 将调用 onChange 并传入 5
pagination.setPage(5);
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

// ... 其他所有示例的工作方式相同
```

## 相邻项

使用 `siblings` 控制活动项两侧的相邻项数量：


<code src="./use-pagination/demo/siblings.tsx"></code>

```tsx
import { usePagination } from '@react-ui/hooks';

const pagination = usePagination({ total: 20, siblings: 3 });
```

## 边界

使用 `boundaries` 控制每侧边界上显示的元素数量：


<code src="./use-pagination/demo/boundaries.tsx"></code>

```tsx
import { usePagination } from '@react-ui/hooks';

const pagination = usePagination({ total: 20, boundaries: 3 });
```

## 起始值

设置 `startValue` 以定义起始页码。例如，当 `startValue={5}` 且 `total={15}` 时，
分页范围将从 5 到 15：

<code src="./use-pagination/demo/startValue.tsx"></code>

## 类型定义

```tsx
export interface UsePaginationOptions {
  /** 初始渲染时选中的页面，默认为 1，如果提供了 startValue 则使用 startValue */
  initialPage?: number;

  /** 受控活动页码 */
  page?: number;

  /** 总页数 */
  total: number;

  /** 选中页面左右两侧的相邻项数量，默认 1 */
  siblings?: number;

  /** 左右边缘可见的元素数量，默认 1  */
  boundaries?: number;

  /** 每次页面变化后触发的回调 */
  onChange?: (page: number) => void;

  /** 起始页码，默认 1 */
  startValue?: number;
}

export interface UsePaginationReturnValue {
  /** 页码和省略号的数组 */
  range: (number | 'dots')[];

  /** 活动页码 */
  active: number;

  /** 设置活动页码的函数 */
  setPage: (page: number) => void;

  /** 前往下一页的函数 */
  next: () => void;

  /** 前往上一页的函数 */
  previous: () => void;

  /** 前往第一页的函数 */
  first: () => void;

  /** 前往最后一页的函数 */
  last: () => void;
}

function usePagination(settings: UsePaginationOptions): UsePaginationReturnValue;
```

## 导出类型

`UsePaginationOptions` 和 `UsePaginationReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UsePaginationOptions, UsePaginationReturnValue } from '@react-ui/hooks';
```
