---
category: Hooks
title: UseUncontrolled
subtitle: 非受控状态
description: react-ui 非受控状态 Hook 文档。
---


## 用法

`use-uncontrolled` Hook 用于管理受控组件和非受控组件的状态：

```tsx
import { useUncontrolled } from '@xiaoye-react/hooks';

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function CustomInput({
  value,
  defaultValue,
  onChange,
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 'Final',
    onChange,
  });

  return (
    <input
      type="text"
      value={_value}
      onChange={(event) => handleChange(event.currentTarget.value)}
    />
  );
}
```

## 设置值类型

默认情况下，Hook 会自动设置类型，但你可以提供自己的类型：

```tsx
import { useUncontrolled } from '@xiaoye-react/hooks';

function Demo() {
  const [_value, handleChange] = useUncontrolled<number>({
    value: 10,
    defaultValue: 5,
    finalValue: 20,
    onChange: (val) => console.log(val > 10),
  });
}
```

## 类型定义

```tsx
interface UseUncontrolledOptions<T> {
  /** 受控状态的值 */
  value?: T;

  /** 非受控状态的初始值 */
  defaultValue?: T;

  /** 当 value 和 defaultValue 都未提供时，非受控状态的最终值 */
  finalValue?: T;

  /** 受控状态的 onChange 处理函数 */
  onChange?: (value: T, ...payload: any[]) => void;
}

type UseUncontrolledReturnValue<T> = [
  /** 当前值 */
  T,

  /** 更新状态的处理函数，将 `value` 和 `payload` 传递给 `onChange` */
  (value: T, ...payload: any[]) => void,

  /** 如果状态是受控的则为 true，非受控则为 false */
  boolean,
];

function useUncontrolled<T>(input: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T>;
```

## 导出类型

`UseUncontrolledOptions` 和 `UseUncontrolledReturnValue` 类型从 `@xiaoye-react/hooks` 包导出：

```tsx
import type { UseUncontrolledOptions, UseUncontrolledReturnValue } from '@xiaoye-react/hooks';
```
