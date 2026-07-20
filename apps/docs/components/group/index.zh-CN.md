---
category: Components
title: Group
subtitle: 分组
description: react-ui Group 分组组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要将一组子元素水平排列，并统一间距和对齐方式时使用。

## 代码演示 {#examples}

### 用法

`Group` 是一个水平 flex 容器。若需垂直 flex 容器，请改用 [Stack](/components/stack) 组件；若需完全控制 flex 容器属性，请使用 [Flex](/components/flex) 组件。

<code src="./demo/usage.tsx"></code>

### preventGrowOverflow

`preventGrowOverflow` 属性用于控制当空间不足以在一行内容纳所有子元素时，`Group` 子元素的行为。默认情况下，子元素不允许占据超过 `(1 / 子元素数量) * 100%` 的父元素宽度（即 `preventGrowOverflow` 为 `true`）。若需更改此行为，请将 `preventGrowOverflow` 设置为 `false`，子元素将被允许增长并占据所需空间。

<code src="./demo/preventGrowOverflow.tsx"></code>

### Group 子元素

> **重要提示**：`Group` 仅对 React 元素正常工作。字符串、数字、片段在设置 `grow` 属性时可能具有不正确的样式：

```tsx
// 无效的 Group 用法，请勿这样做
import { Group } from '@react-ui/ui';

function InvalidDemo() {
  return (
    <Group grow>
      First string
      <>
        <div>片段内的元素</div>
        <div>另一个片段内的元素</div>
      </>
      {20}
    </Group>
  );
}
```

<FlexboxGapSupport component="Group"></FlexboxGapSupport>

## API {#api}

### GroupProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 子元素间距 | `UISpacing` | `'md'` |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end'` | `'center'` |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around'` | `'flex-start'` |
| wrap | 是否换行 | `'wrap' \| 'nowrap' \| 'wrap-reverse'` | `'wrap'` |
| grow | 是否让子元素等分宽度 | `boolean` | `false` |

除上表所列属性外，Group 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
