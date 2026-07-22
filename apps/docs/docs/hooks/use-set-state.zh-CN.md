---
category: Hooks
title: UseSetState
subtitle: 状态设置
description: react-ui 状态设置 Hook 文档。
---


## 用法

`use-set-state` Hook 的工作方式类似于类组件中的 `this.setState`——它会将状态的部分内容浅合并到当前状态中。


注意，它只能与对象一起使用；不支持原始值和数组：

```tsx
import { useSetState } from '@xiaoye-react/hooks';

const [state, setState] = useSetState({
  name: '张三',
  age: 35,
  job: 'Engineer',
});

state; // -> { name: '张三', age: 35, job: 'Engineer' }

setState({ name: 'Jane' }); // -> { name: 'Jane', age: 35, job: 'Engineer' }
setState({ age: 25, job: 'Manager' }); // -> { name: 'Jane', age: 25, job: 'Manager' }
setState((current) => ({ age: current.age + 7 })); // -> { name: 'Jane', age: 32, job: 'Manager' }
```

```tsx
import { useSetState } from '@xiaoye-react/hooks';

useSetState([1, 2, 3]); // -> 无效
useSetState(1); // -> 无效
useSetState({ skills: ['JavaScript', 'TypeScript'] }); // -> 正常工作
```

## 类型定义

```tsx
type UseSetStateCallback<T> = (
  state: Partial<T> | ((currentState: T) => Partial<T>)
) => void;

type UseSetStateReturnValue<T> = [T, UseSetStateCallback<T>];

function useSetState<T extends Record<string, any>>(initialState: T): UseSetStateReturnValue<T>
```

## 导出类型

`UseSetStateCallback` 和 `UseSetStateReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseSetStateCallback, UseSetStateReturnValue } from '@xiaoye-react/hooks';
```
