---
category: Hooks
title: UseScrollSpy
subtitle: 滚动监听
description: react-ui 滚动监听 Hook 文档。
---


## 用法

`use-scroll-spy` Hook 跟踪滚动位置并返回当前位于视口中的元素索引。
它适用于创建目录组件（如 react-ui.dev 右侧边栏所示）及类似功能。

<code src="./use-scroll-spy/demo/usage.tsx"></code>

## Hook 选项

`use-scroll-spy` Hook 接受一个包含选项的对象：

- `selector` - 获取标题的选择器；默认为 `'h1, h2, h3, h4, h5, h6'`
- `getDepth` - 获取标题深度的函数；默认根据标签名计算深度
- `getValue` - 获取标题值的函数；默认使用 `element.textContent`
- `scrollHost` - 附加滚动事件监听器的宿主元素，如果未提供，则使用 `window`
- `offset` - 确定活动标题时使用的视口顶部偏移量，默认为 `0`

使用自定义选项获取带有 `data-heading` 属性的标题的示例：

<code src="./use-scroll-spy/demo/selector.tsx"></code>

## 重新初始化 Hook 数据

默认情况下，`use-scroll-spy` 不会跟踪 DOM 的变化。如果你想在父组件挂载后
更新标题数据，可以使用 `reinitialize` 函数：

```tsx
import { useEffect } from 'react';
import { useScrollSpy } from '@react-ui/hooks';

function Demo({ dependency }) {
  const { reinitialize } = useScrollSpy();

  useEffect(() => {
    reinitialize();
  }, [dependency]);

  return null;
}
```

## 类型定义

定义中使用的所有类型都从 `@react-ui/hooks` 包导出。

```tsx
interface UseScrollSpyHeadingData {
  /** 标题深度，1-6 */
  depth: number;

  /** 标题文本内容值 */
  value: string;

  /** 标题 id */
  id: string;

  /** 获取标题节点的函数 */
  getNode: () => HTMLElement;
}

interface UseScrollSpyOptions {
  /** 获取标题的选择器，默认 `'h1, h2, h3, h4, h5, h6'` */
  selector?: string;

  /** 获取标题深度的函数，默认根据标签名计算深度 */
  getDepth?: (element: HTMLElement) => number;

  /** 获取标题值的函数，默认使用 `element.textContent` */
  getValue?: (element: HTMLElement) => string;

  /** 附加滚动事件监听器的宿主元素，如果未提供，则使用 `window` */
  scrollHost?: HTMLElement;

  /** 确定活动标题时使用的视口顶部偏移量，默认 `0` */
  offset?: number;
}

interface UseScrollSpyReturnValue {
  /** `data` 数组中活动标题的索引 */
  active: number;

  /** 标题数据。如果未初始化，数据表示为空数组。 */
  data: UseScrollSpyHeadingData[];

  /** 如果已从 DOM 获取标题值，则为 true。 */
  initialized: boolean;

  /** 在父组件挂载后更新标题值的函数。 */
  reinitialize: () => void;
}

function useScrollSpy(options?: UseScrollSpyOptions): UseScrollSpyReturnValue
```

## 导出类型

`UseScrollSpyOptions` 和 `UseScrollSpyReturnValue` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseScrollSpyOptions, UseScrollSpyReturnValue } from '@react-ui/hooks';
```
