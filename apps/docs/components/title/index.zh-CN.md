---
category: Components
title: Title
subtitle: 标题
description: react-ui Title 标题组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要展示标题文字，统一控制字号、字重、行高等排版样式时使用。

## 代码演示 {#examples}

### 用法

使用 Title 组件渲染带有 ReactUI [theme](/docs/theming/theme-object) 样式的 h1-h6 标题。
默认情况下，`Title` 没有外边距和内边距。
可通过 [theme.headings](/docs/theming/typography) 为每个标题更改 `font-size`、`font-weight` 和 `line-height`。

设置 `order` 属性以渲染特定元素（h1-h6）；默认 order 为 `1`：

<code src="./demo/usage.tsx"></code>

### 尺寸

可独立于 `order` 更改 Title 的 `size`：

- 如果将 size 设置为 `h1`-`h6`，则组件会从 [theme](/docs/theming/theme-object/) 添加相应的 `font-size` 和 `line-height`
- 如果将 size 设置为任何其他值，则 `line-height` 将基于 `order` 计算 – `size` 只影响 `font-size`

<code src="./demo/size.tsx"></code>

### 文本换行

使用 `textWrap` 属性控制 [text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
CSS 属性。它控制元素内部文本的换行方式。


也可在 [theme](/docs/theming/theme-object) 上设置 `textWrap`：

```tsx
import { createTheme, UIProvider, Title } from '@react-ui/ui';

const theme = createTheme({
  headings: {
    textWrap: 'wrap',
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Title>某个应该换行的很长标题</Title>
    </UIProvider>
  );
}
```

<code src="./demo/textWrap.tsx"></code>

### 行数限制

设置 `lineClamp` 属性以在指定行数后截断文本：

<code src="./demo/lineClamp.tsx"></code>



## API {#api}

### TitleProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| order | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` |
| size | 字号 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | — |
| weight | 字重 | `TextWeight` | — |
| c | 文字色 | `UIColor` | — |
| ta | 文本对齐 | `'left' \| 'center' \| 'right'` | — |
| lineClamp | 行数截断 | `number` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
