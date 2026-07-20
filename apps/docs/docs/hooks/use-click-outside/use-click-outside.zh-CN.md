---
category: Hooks
title: UseClickOutside
subtitle: 点击外部监听
description: react-ui 点击外部监听 Hook 文档。
---


## 用法

<code src="./demo/usage.tsx"></code>

## API 参考

`use-click-outside` Hook 接受 4 个参数：

- `handler` – 点击外部时调用的函数
- `events` – 触发外部点击的可选事件列表，默认为 `['mousedown', 'touchstart']`
- `nodes` – 不应触发外部点击事件的可选节点列表
- `enabled` – 用于动态启用/禁用监听器的可选布尔值，默认为 `true`

该 Hook 返回一个 `ref` 对象，必须将其传递给要捕获外部点击的元素。

```tsx
import { useClickOutside } from '@react-ui/hooks';

function Example() {
  const handleClickOutside = () =>
    console.log('Clicked outside of div');
  const ref = useClickOutside(handleClickOutside);
  return <div ref={ref} />;
}
```

## 更改事件

默认情况下，`use-click-outside` 监听 `mousedown` 和 `touchstart` 事件，
你可以通过将事件数组作为第二个参数传递来更改这些事件：

<code src="./demo/events.tsx"></code>

## 多个节点

```tsx
// 仅适用于 useState，不适用于 useRef
import { useState } from 'react';
import { Portal } from '@react-ui/ui';
import { useClickOutside } from '@react-ui/hooks';

function Demo() {
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(
    null
  );
  const [control, setControl] = useState<HTMLDivElement | null>(null);

  useClickOutside(() => console.log('outside'), null, [
    control,
    dropdown,
  ]);

  return (
    // 我们不能使用根元素 ref，因为它不包含下拉菜单
    <div>
      <div ref={setControl}>控制</div>
      <Portal>
        <div ref={setDropdown}>下拉</div>
      </Portal>
    </div>
  );
}
```

## 设置 ref 类型

```tsx
import { useClickOutside } from '@react-ui/hooks';

const ref = useClickOutside<HTMLDivElement>(() =>
  console.log('Click outside')
);
```

## 类型定义

```tsx
function useClickOutside<T extends HTMLElement = any>(
  handler: (event: MouseEvent | TouchEvent) => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[],
  enabled?: boolean
): React.RefObject<T>;
```
