---
category: Components
title: OverflowList
subtitle: 溢出列表
description: react-ui OverflowList 溢出列表组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要在一行内展示一组项，超出宽度时自动折叠为"更多"下拉时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 数据类型

`OverflowList` 的 data 属性支持任意类型的数组。默认情况下，`OverflowList` 会自动从数据数组中推断数据类型。要显式指定数据类型，请向组件传入泛型类型参数：

```tsx
import { OverflowList } from '@xiaoye-react/ui';

function Demo() {
  return (
    <OverflowList<{ value: string; label: string }>
      data={[{ value: '1', label: 'Item 1' }]}
      renderItem={(item) => <div key={item.value}>{item.label}</div>}
      renderOverflow={(items) => <div>+{items.length} more</div>}
    />
  );
}
```

### 最大行数

使用 `maxRows` 限制可见行数。默认情况下，显示 1 行。

<code src="./demo/maxRows.tsx"></code>

### 最大可见项数

使用 `maxVisibleItems` 限制可见项数。默认情况下没有限制。

<code src="./demo/maxVisibleItems.tsx"></code>

### 折叠方向

使用 `collapseFrom` 属性控制当项目溢出时从哪个方向折叠。
默认情况下，项目从末尾折叠。设置 `collapseFrom="start"` 可从开头折叠——
这对于面包屑类的模式很有用，因为最后几项应该保持可见。

<code src="./demo/collapseFrom.tsx"></code>

### 示例：与 HoverCard 一起使用溢出列表

可在 `renderOverflow` 函数中使用任何 React 组件。以下示例展示
如何在 [HoverCard](/components/hover-card) 中显示折叠的项目：

<code src="./demo/hoverCard.tsx"></code>



## API {#api}

### OverflowListProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 列表项 | `ReactNode` | — |
| visibleItemsRef | 当前可见项的 ref | `Ref<HTMLElement[]>` | — |
| onOverflow | 溢出变化回调 | `(overflowed: boolean) => void` | — |
| renderRest | 渲染溢出指示 | `(overflowed: ReactNode[]) => ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
