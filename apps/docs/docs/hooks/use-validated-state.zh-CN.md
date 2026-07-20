---
category: Hooks
title: UseValidatedState
subtitle: 校验状态
description: react-ui 校验状态 Hook 文档。
---


## 用法

`use-validated-state` Hook 在每次设置状态时根据给定规则验证状态。
它返回一个包含当前验证状态、最后一个有效值和当前值的对象：

```tsx
import { useValidatedState } from '@react-ui/hooks';

const [{ lastValidValue, value, valid }, setValue] =
  useValidatedState('valid', (state) => state === 'valid');

lastValidValue; // -> valid
value; // -> valid
valid; // -> true

setValue('invalid');

lastValidValue; // -> valid
value; // -> invalid
valid; // -> false
```

## 示例

<code src="./use-validated-state/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseValidatedStateValue<T> {
  /** 当前值 */
  value: T;

  /** 最后一个有效值 */
  lastValidValue: T | undefined;

  /** 当前值是否有效；有效为 true，否则为 false */
  valid: boolean;
}

type UseValidatedStateReturnValue<T> = [
  /** 当前值 */
  UseValidatedStateValue<T>,
  /** 更新状态的处理函数，将 `value` 和 `payload` 传递给 `onChange` */
  (value: T) => void,
];

function useValidatedState<T>(
  initialValue: T,
  validate: (value: T) => boolean,
  initialValidationState?: boolean,
): UseValidatedStateReturnValue<T>
```

## 导出类型

`UseValidatedStateValue` 和 `UseValidatedStateReturnValue` 类型从 `@react-ui/hooks` 包导出：

```tsx
import type { UseValidatedStateValue, UseValidatedStateReturnValue } from '@react-ui/hooks';
```
