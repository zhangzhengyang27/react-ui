---
category: Styles
title: StyleProps
subtitle: 样式属性
description: react-ui StyleProps 文档。
---


## 支持的属性

所有具有根元素的 ReactUI 组件都支持以下 style props：

<StylePropsTable></StylePropsTable>

## 主题值

某些 style props 可以引用主题中的值。例如，当你设置 `xs`、`sm`、`md`、`lg`、`xl` 时，`mt` 会使用 `theme.spacing` 的值：


在 `c`、`bd` 和 `bg` 属性中，你可以引用 `theme.colors` 中的颜色：

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      {/* margin-top: theme.spacing.xs */}
      <Box mt="xs" />

      {/* margin-top: theme.spacing.md * -1 */}
      <Box mt="-md" />

      {/* margin-top: auto */}
      <Box mt="auto" />

      {/* margin-top: 1rem */}
      <Box mt={16} />

      {/* margin-top: 5rem */}
      <Box mt="5rem" />
    </>
  );
}
```

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      {/* color: theme.colors.blue[theme.primaryShade] */}
      <Box c="blue" />

      {/* background: theme.colors.orange[1] */}
      <Box bg="orange.1" />

      {/* border: 1px solid theme.colors.red[6] */}
      <Box bd="1px solid red.6" />

      {/* color: 如果 colorScheme 为 dark，则使用 `var(--ui-color-dark-2)`，
      如果 color scheme 为 light，则使用 `var(--ui-color-gray-6)` */}
      <Box c="dimmed" />

      {/* color: 如果 colorScheme 为 dark，则使用 `var(--ui-color-white)`，
      如果 color scheme 为 light，则使用 `var(--ui-color-black)` */}
      <Box c="bright" />

      {/* background: #EDFEFF */}
      <Box bg="#EDFEFF" />

      {/* background: rgba(0, 34, 45, 0.6) */}
      <Box bg="rgba(0, 34, 45, 0.6)" />
    </>
  );
}
```

## 响应式样式

你可以使用对象语法为 style props 添加响应式样式。
注意，响应式 style props 的性能低于普通 style props（参见 [样式性能](/docs/styles/styles-performance)）。
不建议在大量元素列表中使用它们。


响应式值的计算规则如下：

- 当没有任何断点值匹配时，使用 `base` 值
- 当视口宽度大于 [theme.breakpoints](/docs/styles/responsive/) 中对应断点的值时，使用 `xs`、`sm`、`md`、`lg`、`xl` 值


此时元素将拥有以下样式：

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return <Box w={{ base: 320, sm: 480, lg: 640 }} />;
}
```

```css
/* 基础样式会添加到元素上，然后被响应式值覆盖 */
.element {
  width: 20rem;
}

/* 48em 是默认的 theme.breakpoints.sm */
@media (min-width: 48em) {
  .element {
    width: 30rem;
  }
}

/* 75em 是默认的 theme.breakpoints.lg */
@media (min-width: 75em) {
  .element {
    width: 40rem;
  }
}
```

<code src="./style-props/demo/responsiveStyleProps.tsx"></code>
