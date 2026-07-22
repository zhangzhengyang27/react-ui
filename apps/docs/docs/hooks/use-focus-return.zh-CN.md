---
category: Hooks
title: UseFocusReturn
subtitle: 焦点返回
description: react-ui 焦点返回 Hook 文档。
---


## 用法

`use-focus-return` Hook 在给定条件满足时自动将焦点返回到上一个聚焦的元素。
例如，它在 [Modal](/components/modal/) 组件中用于在弹窗关闭后恢复焦点。

使用 `Escape` 键关闭弹窗，观察焦点如何在弹窗关闭后返回到按钮：

<code src="./use-focus-return/demo/usage.tsx"></code>

在大多数情况下，你应将此 Hook 与 [use-focus-trap](/docs/hooks/use-focus-trap/) 一起使用。


如果 `shouldReturnFocus` 选项设置为 `false`，你可以调用返回的函数来聚焦最后一个活动元素：

```tsx
import { useFocusReturn } from '@xiaoye-react/hooks';

useFocusReturn({
  // 焦点陷阱区域是否处于活动状态？
  // 当激活时，Hook 会将 document.activeElement 保存到内部状态
  // 并在焦点陷阱停用时聚焦该元素
  opened: false,

  // 决定是否应自动返回焦点，默认为 true
  shouldReturnFocus: true,
});
```

```tsx
import { useFocusReturn } from '@xiaoye-react/hooks';

const returnFocus = useFocusReturn({
  opened: false,
  shouldReturnFocus: false,
});

// ... 稍后
returnFocus();
```

## 类型定义

```tsx
interface UseFocusReturnOptions {
  opened: boolean;
  shouldReturnFocus?: boolean;
}

type UseFocusReturnReturnValue = () => void;

function useFocusReturn(options: UseFocusReturnOptions): UseFocusReturnReturnValue
```

## 导出类型

`UseFocusReturnOptions` 和 `UseFocusReturnReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseFocusReturnOptions, UseFocusReturnReturnValue } from '@xiaoye-react/hooks';
```
