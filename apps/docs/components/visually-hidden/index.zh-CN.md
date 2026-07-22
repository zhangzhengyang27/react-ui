---
category: Components
title: VisuallyHidden
subtitle: 视觉隐藏
description: react-ui VisuallyHidden 视觉隐藏组件。
group:
  title: 工具
  order: 7
---

## 何时使用 {#when-to-use}

`VisuallyHidden` 是一个工具组件，用于在视觉上隐藏内容，但保留给屏幕阅读器访问。

## 代码演示 {#examples}

### 用法

`VisuallyHidden` 是一个工具组件，用于在视觉上隐藏内容，但保留给屏幕阅读器访问。

例如，可与 [ActionIcon](/components/action-icon) 组件一起使用：

```tsx
import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, VisuallyHidden } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ActionIcon>
      <HeartIcon />
      <VisuallyHidden>点赞帖子</VisuallyHidden>
    </ActionIcon>
  );
}
```



## API {#api}

### VisuallyHiddenProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | `React.ReactNode` | — |
| className | 自定义类名 | `string` | — |
| style | 自定义样式 | `CSSProperties` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
