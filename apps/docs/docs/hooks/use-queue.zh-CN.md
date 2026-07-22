---
category: Hooks
title: UseQueue
subtitle: 队列
description: react-ui 队列 Hook 文档。
---


## 用法

`use-queue` Hook 限制当前状态中的数据项数量，并将其余项放入队列。
例如，在 [@xiaoye-react/ui](/docs/x/notifications/) 包中，当前显示的通知数量是有限的，
其他新通知会被添加到队列中，一旦有可用空间就会显示。

```tsx
import { useQueue } from '@xiaoye-react/hooks';

const { state, queue, add, update, cleanQueue } = useQueue({
  initialValues: [1],
  limit: 2,
});

// state -> [1], queue -> []

// 当 state.length 小于 limit 时，新项被添加到 state
add(2);
// state -> [1,2], queue -> []

// 当 state.length 等于 limit 时，新项被添加到 queue
add(3, 4, 5, 6);
// state -> [1,2], queue -> [3,4,5,6]

// 使用 update 函数修改项目
update((values) => values.map((item) => item * 3));
// state -> [3,6], queue -> [9,12,15,18]

// 如果你在 update 函数中添加或删除项目，
// 它们将根据 limit 在 queue 和 state 之间分配；
// 顺序始终保留
update((values) => values.filter((item) => item % 2));
// state -> [3,9], queue -> [15]

// 从 queue 中移除所有项目
cleanQueue();
// state -> [3,9], queue -> []

// 从 queue 和 state 中移除所有项目
update(() => []);
// state -> [], queue -> []
```

## API 参考

该 Hook 接受一个参数——一个包含以下键的配置对象：

- `initialValues` – 可选的初始值（根据 limit 在 state 和 queue 之间分配），默认为空数组
- `limit` – state 可包含的最大项目数，超过 limit 后的每个后续项目都会放入 queue

返回值：

- `state` – 当前状态
- `queue` – 当前队列
- `add` – 向 state 或 queue 添加任意数量的项目
- `update` – 将给定函数应用于 state 和 queue 中的所有项目，用于过滤、修改或添加项目
- `cleanQueue` – 从 queue 中移除所有项目

## 设置项类型

默认情况下，Hook 会自动从 `initialValues` 获取类型信息：


如果你未提供 `initialValues`，请为 state 项传入类型：

```tsx
import { useQueue } from '@xiaoye-react/hooks';

const q = useQueue({
  limit: 2,
  initialValues: [
    { name: 'Bob', id: 1 },
    { name: 'Alice', id: 2 },
  ],
});

typeof q.state[number]; // -> { name: string; id: number; }
```

```tsx
import { useQueue } from '@xiaoye-react/hooks';

const q = useQueue<{ name: string; id: number }>({
  limit: 2,
  initialValues: [],
});

q.add({ name: 'Bob', id: 1 });
```

## 类型定义

```tsx
export interface UseQueueOptions<T> {
  /** 要添加到队列的初始值 */
  initialValues?: T[];

  /** state 中的最大项目数 */
  limit: number;
}

export interface UseQueueReturnValue<T> {
  /** 队列中的项目数组 */
  queue: T[];

  /** 状态中的项目数组 */
  state: T[];

  /** 向 state 或 queue 添加项目的函数 */
  add: (...items: T[]) => void;

  /** 将更新应用于当前项目的函数 */
  update: (fn: (state: T[]) => T[]) => void;

  /** 清空队列的函数 */
  cleanQueue: () => void;
}

function useQueue<T>(options: UseQueueOptions<T>): UseQueueReturnValue<T>
```

## 导出类型

`UseQueueOptions` 和 `UseQueueReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseQueueOptions, UseQueueReturnValue } from '@xiaoye-react/hooks';
```
