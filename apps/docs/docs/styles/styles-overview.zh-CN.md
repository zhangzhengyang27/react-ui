---
category: Styles
title: StylesOverview
subtitle: 样式总览
description: react-ui StylesOverview 文档。
---


## 组件特定 props

大多数组件都提供允许你自定义样式的 props。例如，[Button](/components/button/) 组件具有 `color`、`variant`、`size` 和 `radius` props，用于控制其外观：


这些 props 通常控制多个 CSS 属性。例如，`color` 和 `variant` props 控制 `color`、`background-color` 和 `border` 属性。在大多数情况下，更改组件 props 是自定义 ReactUI 组件的最佳方式。

<code src="./styles-overview/demo/configurator.tsx"></code>

## 样式属性

[Style props](/docs/styles/style-props/) 的工作方式与组件特定 props 类似，但有以下几个区别：

- Style props 不是组件特定的；它们可以用于任何组件。
- Style props 始终控制单个 CSS 属性。例如，`c` prop 控制 CSS `color` 属性，而 `color` prop 控制一组属性：`color`、`background-color` 和 `border-color`。
- Style props 设置在 `style` 属性中。如果不使用 `!important`，则无法通过 CSS 覆盖它们。

当你需要更改单个 CSS 属性而无需为样式创建单独的文件时，[Style props](/docs/styles/style-props/) 非常有用。一些最常见的用例包括：

- 更改文本颜色和字体大小


- 为表单内的输入框应用外边距：


- 为各种元素添加内边距：


注意，[style props](/docs/styles/style-props/) 从未打算作为组件样式的主要方式。在大多数情况下，最好将每个组件使用的 style props 数量限制在 3-4 个以内。如果你发现自己使用了超过 4 个 style props，请考虑创建一个单独的样式文件——这样更容易维护，并且[性能更好](/docs/styles/styles-performance/)。

```tsx
import { Text } from '@react-ui/ui';

function Demo() {
  return (
    <div>
      <Text c="blue.8" fz="lg">
        Card title
      </Text>
      <Text c="dimmed" fz="sm">
        Card description
      </Text>
    </div>
  );
}
```

```tsx
import { TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <form>
      <TextInput label="名字" />
      <TextInput label="姓氏" mt="md" />
      <TextInput label="邮箱" mt="md" />
    </form>
  );
}
```

```tsx
import { Paper } from '@react-ui/ui';

function Demo() {
  return <Paper p="xl">我的自定义卡片</Paper>;
}
```

## style 属性

所有 ReactUI 组件都支持 [style 属性](/docs/styles/style/)，它允许设置 CSS 属性和 CSS 变量。它在以下情况下很有用：

- 你想为组件应用单个 CSS 属性：


- 你想基于组件 prop 设置 CSS 变量：


[style 属性](/docs/styles/style/) 的工作方式与 React 的 `style` prop 相同。不建议将其作为组件样式的主要方式。在大多数情况下，最好创建一个单独的样式文件——这样更容易维护，并且[性能更好](/docs/styles/styles-performance/)。

```tsx
import { Button, Flex } from '@react-ui/ui';

function Demo() {
  return (
    <Flex>
      <Button style={{ flex: 1 }}>大按钮</Button>
      <Button>小按钮</Button>
    </Flex>
  );
}
```

```tsx
import { Box } from '@react-ui/ui';

function Demo({ color }: { color: string }) {
  // 之后你可以在任何嵌套元素中使用 var(--my-color)
  return <Box style={{ '--my-color': color }}>我的 Box</Box>;
}
```

## CSS 模块

[CSS modules](/docs/styles/css-modules/) 是为 ReactUI 组件应用大多数样式的推荐方式。CSS modules 是样式化组件性能最好、最灵活的方式。

```scss
// Demo.module.css

.root {
  padding-right: 100px;

  &[data-collapsed] {
    padding-right: 40px;

    & .control {
      max-width: 200px;
    }
  }
}

.control {
  background-color: var(--ui-color-blue-1);
  color: var(--ui-color-blue-filled);
  padding: var(--ui-spacing-xl);
  margin-left: 40px;

  @media (max-width: $ui-breakpoint-sm) {
    margin-left: 0;
    margin-top: var(--ui-spacing-md);
  }

  @mixin hover {
    background-color: light-dark(
      var(--ui-color-blue-1),
      var(--ui-color-blue-9)
    );
  }
}
```

```tsx
// Demo.tsx
import classes from './Demo.module.css';

function Demo({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={classes.root}
      data-collapsed={collapsed || undefined}
    >
      <button type="button" className={classes.control}>
        Control
      </button>
    </div>
  );
}
```

## 主题 token

你可以在任何样式中通过 [CSS 变量](/docs/styles/css-variables/) 引用 ReactUI [主题](/docs/theming/theme-object/) 值：

- 在 [CSS modules](/docs/styles/css-modules/) 中：


- 在 [style props](/docs/styles/style-props/) 中：


- 在 [style 属性](/docs/styles/style/) 中：

```scss
.root {
  // 引用 theme.colors.red[5]
  background: var(--ui-color-red-5);

  // 引用 theme.spacing.md
  margin-top: var(--ui-spacing-md);

  // 引用 theme.headings.fontFamily
  font-family: var(--ui-font-family-headings);
}
```

```tsx
import { Box } from '@react-ui/ui';

function Demo() {
  // bg="red.5" 引用 theme.colors.red[5]
  // "red.5" 是 var(--ui-color-red-5) 的简写

  // mt="xl" 引用 theme.spacing.xl
  // "xl" 是 var(--ui-spacing-xl) 的简写
  return (
    <Box bg="red.5" mt="xl">
      My box
    </Box>
  );
}
```

```tsx
import { Box } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Box
        style={{
          margin: 'var(--ui-spacing-xl)',
          color: 'var(--ui-color-orange-5)',
        }}
      >
        With CSS variables
      </Box>

      <Box
        style={(theme) => ({
          margin: theme.spacing.xl,
          color: theme.colors.orange[5],
        })}
      >
        With theme object
      </Box>
    </>
  );
}
```
