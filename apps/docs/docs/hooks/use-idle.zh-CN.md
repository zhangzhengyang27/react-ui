---
category: Hooks
title: UseIdle
subtitle: 空闲状态
description: react-ui 空闲状态 Hook 文档。
---


## 用法

`use-idle` Hook 检测用户在给定的毫秒时间内是否没有任何操作：

<code src="./use-idle/demo/usage.tsx"></code>

## 自定义事件

默认情况下，该 Hook 会监听 `keydown`、`mousemove`、`touchmove`、`click`、`scroll` 和 `wheel` 事件来设置空闲状态。
要更改这些事件，请在 `options` 参数中提供事件列表：

<code src="./use-idle/demo/events.tsx"></code>

## 初始状态

默认情况下，该 Hook 返回空闲状态。
要更改此行为，请在 `options` 参数中提供初始状态值：

<code src="./use-idle/demo/state.tsx"></code>

## 类型定义

```tsx
interface UseIdleOptions {
  events?: (keyof DocumentEventMap)[];
  initialState?: boolean;
}

function useIdle(timeout: number, options?: UseIdleOptions): boolean;
```

## 导出类型

`UseIdleOptions` 类型从 `@xiaoye-react/hooks` 包导出：

```tsx
import type { UseIdleOptions } from '@xiaoye-react/hooks';
```
