---
category: Hooks
title: UseFocusTrap
subtitle: 焦点陷阱
description: react-ui 焦点陷阱 Hook 文档。
---


## 用法

`use-focus-trap` Hook 将焦点限制在给定节点内，例如在弹窗、抽屉或菜单中。
该节点必须至少包含一个可聚焦元素。当节点卸载时，焦点陷阱会自动释放。

```tsx
import { useFocusTrap } from '@xiaoye-react/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
    </div>
  );
}
```

## API 参考

该 Hook 接受焦点陷阱的激活状态作为唯一参数：


该 Hook 返回应传递给元素的 `ref`：

```tsx
import { useFocusTrap } from '@xiaoye-react/hooks';

useFocusTrap(); // -> 焦点陷阱未激活
useFocusTrap(true); // -> 焦点陷阱激活

useFocusTrap(false); // -> 焦点陷阱禁用
```

```tsx
import { Paper } from '@xiaoye-react/ui';
import { useFocusTrap } from '@xiaoye-react/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <>
      {/* 普通元素： */}
      <div ref={focusTrapRef} />

      {/* ReactUI 组件： */}
      <Paper ref={focusTrapRef} />
    </>
  );
}
```

## 与其他基于 ref 的 Hook 结合使用

要将 `use-focus-trap` 与其他基于 ref 的 Hook 结合使用，请使用 [use-merged-ref](/docs/hooks/use-merged-ref/) Hook：

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

## 初始焦点

默认情况下，焦点陷阱会将焦点移动到第一个可交互元素。
要指定应接收初始焦点的元素，请添加 `data-autofocus` 属性：

```tsx
import { useFocusTrap } from '@xiaoye-react/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
      {/* 弹窗中的第二个输入框将获得初始焦点 */}
      <input data-autofocus />
      <input />
    </div>
  );
}
```

## 类型定义

```tsx
function useFocusTrap(active?: boolean): React.RefCallback<HTMLElement | null>
```
