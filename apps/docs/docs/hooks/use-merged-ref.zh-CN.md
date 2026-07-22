---
category: Hooks
title: UseMergedRef
subtitle: 合并 Ref
description: react-ui 合并 Ref Hook 文档。
---


## 用法

`use-merged-ref` Hook 接受任意数量的 ref，并返回一个应传递给 `ref` 属性的函数。
当你需要在单个 DOM 节点上使用多个 ref 时，请使用此 Hook，例如，
当你想同时使用 [use-click-outside](/docs/hooks/use-click-outside/) 和 [use-focus-trap](/docs/hooks/use-focus-trap/) Hook，
并且自己也想获取一个 ref 时：

```tsx
import { useRef } from 'react';
import {
  useClickOutside,
  useFocusTrap,
  useMergedRef,
} from '@xiaoye-react/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(
    myRef,
    useClickOutsideRef,
    focusTrapRef
  );

  return <div ref={mergedRef} />;
}
```

## mergeRefs 函数

`use-merged-ref` Hook 使用 `useCallback` 对 ref 进行记忆化，但在某些情况下记忆化不是有效策略，
例如，当你处理动态组件列表时，React 会抱怨两次渲染之间调用的 Hook 数量不同。
要解决这个问题，请改用 `mergeRefs` 函数：


`mergeRefs` 的工作方式与 `use-merged-ref` 相同，但内部不使用 Hook。
只有在你无法使用 `use-merged-ref` 时才使用它。注意，`mergeRefs` 无法与 [use-focus-trap](/docs/hooks/use-focus-trap/) Hook 正确配合，
你必须使用 `use-merged-ref`。

```tsx
import { useRef } from 'react';
import { mergeRefs, useClickOutside } from '@xiaoye-react/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const mergedRef = mergeRefs(myRef, useClickOutsideRef);
  return <div ref={mergedRef} />;
}
```

## assignRef 函数

`assignRef` 函数可用于分配未使用 `useCallback` 记忆化的 ref。
它通常用于分配不引用元素的 ref：

```tsx
import { useState } from 'react';
import { assignRef } from '@xiaoye-react/hooks';

interface NumberInputHandlers {
  increment: () => void;
  decrement: () => void;
}

interface DemoProps {
  handlersRef?: React.ForwardedRef<NumberInputHandlers | undefined>;
}

function Demo({ handlersRef }: DemoProps) {
  const [value, setValue] = useState(0);

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => v - 1);

  assignRef(handlersRef, { increment, decrement });

  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}
```

## 设置节点类型

```tsx
import { useMergedRef } from '@xiaoye-react/hooks';

const ref = useMergedRef<HTMLDivElement>();
```

## 类型定义

```tsx
function useMergedRef<T = any>(
  ...refs: React.ForwardedRef<T>[]
): (node: T) => void;
```
