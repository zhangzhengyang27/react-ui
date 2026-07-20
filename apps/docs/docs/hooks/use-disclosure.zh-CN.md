---
category: Hooks
title: UseDisclosure
subtitle: 显隐控制
description: 用于管理布尔显隐状态的 Hook。
---

## 用法

`useDisclosure` 用于管理布尔状态，并提供 `open`、`close` 与 `toggle` 操作函数，同时支持可选的 `onOpen` 与 `onClose` 回调。常用于控制 Modal、Popover 等需要显隐切换的组件。

```tsx
import { useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false);

  // 将 opened 设为 true
  handlers.open();

  // 将 opened 设为 false
  handlers.close();

  // 切换 opened 状态
  handlers.toggle();
}
```

## 回调函数

`onOpen` 与 `onClose` 回调在 `opened` 状态变化时执行：

```tsx
import { useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false, {
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  });

  // 调用 onOpen 回调并将 opened 设为 true
  handlers.open();

  // 不执行任何操作，opened 已经是 true
  handlers.open();

  // 调用 onClose 回调并将 opened 设为 false
  handlers.close();

  // 不执行任何操作，opened 已经是 false
  handlers.close();

  // 根据当前状态调用 onOpen 或 onClose
  handlers.toggle();
}
```

## 类型定义

```tsx
interface UseDisclosureOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

interface UseDisclosureHandlers {
  set: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

function useDisclosure(
  initialState?: boolean,
  options?: UseDisclosureOptions,
): UseDisclosureReturnValue;
```

## 导出类型

`UseDisclosureOptions`、`UseDisclosureHandlers` 与 `UseDisclosureReturnValue` 类型均已从 `@react-ui/hooks` 导出，可在应用中按需导入：

```tsx
import type {
  UseDisclosureOptions,
  UseDisclosureHandlers,
  UseDisclosureReturnValue,
} from '@react-ui/hooks';
```
