---
category: Hooks
title: UseInterval
subtitle: 定时器
description: react-ui 定时器 Hook 文档。
---


## 用法

<code src="./use-interval/demo/usage.tsx"></code>

## 自动启动 interval

要在组件挂载时自动启动 interval，请将 `autoInvoke` 选项设置为 `true`：

```tsx
import { useInterval } from '@xiaoye-react/hooks';

const interval = useInterval(
  () => console.log('Interval tick'),
  1000,
  { autoInvoke: true }
);
```

## API 参考

参数：

- `fn` – 每次 interval tick 时调用的函数
- `interval` – 每次 tick 之间的毫秒数

返回对象：

- `start` – 启动 interval
- `stop` – 停止 interval
- `toggle` – 切换 interval
- `active` – 当前 interval 状态

```tsx
import { useInterval } from '@xiaoye-react/hooks';

const { start, stop, toggle, active } = useInterval(fn, interval);
```

## 类型定义

```tsx
interface UseIntervalOptions {
  /** 如果设置，interval 将在组件挂载时自动启动，默认 `false` */
  autoInvoke?: boolean;
}

interface UseIntervalReturnValue {
  /** 启动 interval */
  start: () => void;

  /** 停止 interval */
  stop: () => void;

  /** 切换 interval */
  toggle: () => void;

  /** 指示 interval 是否处于活动状态 */
  active: boolean;
}

function useInterval(
  fn: () => void,
  interval: number,
  options?: UseIntervalOptions,
): UseIntervalReturnValue
```

## 导出类型

`UseIntervalOptions` 和 `UseIntervalReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseIntervalOptions, UseIntervalReturnValue } from '@xiaoye-react/hooks';
```
