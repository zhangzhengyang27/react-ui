---
category: Styles
title: Style
subtitle: 样式
description: react-ui Style 文档。
---


## Style 对象

你可以向 `style` prop 传递一个 style 对象——在这种情况下，它与 React 的 `style` prop 工作方式相同。你可以在 style 对象中使用 ReactUI [CSS 变量](/docs/styles/css-variables)，方式与在 [.css 文件](/docs/styles/css-modules)中相同。

```tsx
import { Box, rem } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Box
      style={{
        color: 'var(--ui-color-red-5)',
        fontSize: rem(12),
      }}
    />
  );
}
```

## 在 style prop 中定义 CSS 变量

你可以在 style prop 中定义 CSS 变量。注意，这仅适用于 ReactUI 组件：

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Box
      style={{ '--radius': '0.5rem', borderRadius: 'var(--radius)' }}
    />
  );
}
```

## Style 函数

你可以向 `style` prop 传递一个 style 函数——在这种情况下，它将使用 [theme](/docs/theming/theme-object/) 调用。当你需要访问未作为 [CSS 变量](/docs/styles/css-variables) 暴露的 [theme](/docs/theming/theme-object/) 属性时，这很有用，例如 `theme.other` 中的属性。

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Box
      style={(theme) => ({
        color: theme.colors.red[5],
        fontSize: theme.fontSizes.xs,
      })}
    />
  );
}
```

## Styles 数组

你可以向 `style` prop 传递一个 style 对象和/或函数的数组——在这种情况下，所有样式将合并为一个对象。当你想创建 ReactUI 组件的包装器、添加内联样式并保留向其传递 `style` prop 的选项时，这很有用。

```tsx
import { Box, UIStyleProp } from '@xiaoye-react/ui';

interface DemoProps {
  style?: UIStyleProp;
}

function Demo({ style }: DemoProps) {
  return <Box style={[{ color: 'red' }, style]} />;
}
```
