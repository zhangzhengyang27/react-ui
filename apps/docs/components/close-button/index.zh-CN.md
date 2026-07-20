---
category: Components
title: CloseButton
subtitle: 关闭按钮
description: react-ui CloseButton 关闭按钮组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要一个标准化的关闭/清除按钮，常用于弹窗、抽屉、输入框右侧清除等场景。

## 代码演示 {#examples}

### 用法

`CloseButton` 渲染一个内部带有 `X` 图标的按钮。它用于其他 ReactUI 组件，如 [Drawer](/components/drawer) 或 [Modal](/components/modal)。

<code src="./demo/usage.tsx"></code>

### 修改图标

可通过向 `icon` 属性传递任意 React 节点来更改图标。当 `CloseButton` 用作其他组件的一部分时很有用，例如在 [Drawer](/components/drawer) 或 [Modal](/components/modal) 中。注意，若使用 `icon` 属性，`iconSize` 属性将被忽略——需手动设置图标大小。

<code src="./demo/icon.tsx"></code>

### 可访问性

要使 `CloseButton` 对屏幕阅读器可访问，需要设置 `aria-label` 或使用 [VisuallyHidden](/components/visually-hidden) 组件：

```tsx
import { CloseButton, VisuallyHidden } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <CloseButton aria-label="关闭模态框" />

      <CloseButton>
        <VisuallyHidden>关闭模态框</VisuallyHidden>
      </CloseButton>
    </>
  );
}
```

## API {#api}

### CloseButtonProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| iconSize | 图标尺寸 | `number` | — |
| onClick | 点击回调 | `(event) => void` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| variant | 视觉变体 | `'transparent' \| 'default'` | `'transparent'` |
| aria-label | 无障碍标签 | `string` | `'Close'` |

除上表所列属性外，CloseButton 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
