---
category: Components
title: Box
subtitle: 盒模型
description: react-ui Box 盒模型组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要一个无样式的基础布局容器，并通过 `style` 或 `className` 完全自定义样式时使用。

## 代码演示 {#examples}

### 用法

`Box` 组件是所有其他组件的基础，支持以下能力：

- [component prop](/docs/guides/polymorphic)
- [style props](/docs/styles/style-props)
- [style prop](/docs/styles/style)

可将 `Box` 用作自定义组件的基础，或作为 HTML 元素的替代：

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Box bg="red.5" my="xl" component="a" href="/">
      My component
    </Box>
  );
}
```

## API {#api}

### BoxProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | — |
| style | 自定义样式 | `CSSProperties` | — |

除上表所列属性外，Box 还支持所有原生 HTML 属性。

## FAQ {#faq}
