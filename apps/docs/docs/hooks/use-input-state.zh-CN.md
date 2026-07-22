---
category: Hooks
title: UseInputState
subtitle: 输入状态
description: react-ui 输入状态 Hook 文档。
---


## 用法

`use-input-state` Hook 处理原生输入（事件在 `onChange` 处理函数中）和自定义输入（值在 `onChange` 处理函数中）的状态。
该 Hook 适用于所有 ReactUI 和原生输入：

```tsx
import { useState } from 'react';
import { NumberInput, TextInput } from '@xiaoye-react/ui';
import { useInputState } from '@xiaoye-react/hooks';

function WithUseInputState() {
  const [stringValue, setStringValue] = useInputState('');
  const [numberValue, setNumberValue] = useInputState<
    string | number
  >(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={setStringValue}
      />
      <TextInput value={stringValue} onChange={setStringValue} />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}

function WithUseState() {
  const [stringValue, setStringValue] = useState('');
  const [numberValue, setNumberValue] = useState<string | number>(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <TextInput
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}
```

## 类型定义

```tsx
type UseInputStateReturnValue<T> = [
  T,
  (value: null | undefined | T | React.ChangeEvent<any>) => void,
];

function useInputState<T>(initialState: T): UseInputStateReturnValue<T>
```

## 导出类型

`UseInputStateReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseInputStateReturnValue } from '@xiaoye-react/hooks';
```
