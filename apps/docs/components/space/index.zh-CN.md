---
category: Components
title: Space
subtitle: 间距
description: react-ui Space 间距组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要在一组子元素之间添加统一的水平或垂直间距时使用。

## 代码演示 {#examples}

### 用法

使用 `Space` 组件在元素之间添加水平或垂直间距：

<br />

<code src="./demo/horizontal.tsx"></code>

<code src="./demo/vertical.tsx"></code>

### 使用场景

大多数情况下，使用 ReactUI 组件时建议优先使用 margin 属性而非 `Space`：

```tsx
import { Text } from '@react-ui/ui';

// 不需要 Space，使用 `mt` 属性即可实现相同效果
function Demo() {
  return (
    <>
      <Text>第一行</Text>
      <Text mt="md">第二行</Text>
    </>
  );
}
```

但当使用普通 HTML 元素时，无法访问 `theme.spacing`，此时可使用 `Space` 组件来避免直接订阅主题：

```tsx
import { Space } from '@react-ui/ui';

// div 上没有 margin 属性，使用 Space 来添加来自主题的间距
function Demo() {
  return (
    <>
      <div>第一行</div>
      <Space h="md" />
      <div>第二行</div>
    </>
  );
}
```

## API {#api}

### SpaceProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| h | 高度方向间距 | `number \| string` | — |
| w | 宽度方向间距 | `number \| string` | — |

除上表所列属性外，Space 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
