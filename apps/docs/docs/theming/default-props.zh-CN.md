---
category: Theming
title: DefaultProps
subtitle: 默认属性
description: react-ui DefaultProps 文档。
---


## 默认 props

你可以通过设置 `theme.components` 为每个 ReactUI 组件定义默认 props。这些默认值会在组件未显式传入对应 prop 时生效：

<code src="./default-props/demo/defaultProps.tsx"></code>

## 使用 UIThemeProvider 设置默认 props

你还可以使用 `UIThemeProvider` 为应用的某个部分定义默认 props：

```tsx
import {
  Button,
  createTheme,
  UIThemeProvider,
} from '@xiaoye-react/ui';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <>
      <UIThemeProvider theme={theme}>
        {/* 应用中使用该主题的部分 */}
      </UIThemeProvider>

      {/* 不使用该主题的其他部分 */}
    </>
  );
}
```

## 复合组件的默认 props

某些组件如 [Menu](/components/menu/) 和 [Tabs](/components/tabs/) 有相关联的复合组件：`Menu.Item`、`Tabs.List` 等。你可以通过省略组件名称中的点来为这些复合组件添加默认 props：

```tsx
import {
  createTheme,
  UIProvider,
  Menu,
  Tabs,
} from '@xiaoye-react/ui';

const theme = createTheme({
  components: {
    MenuItem: Menu.Item.extend({
      defaultProps: { color: 'red' },
    }),

    TabsList: Tabs.List.extend({
      defaultProps: {
        justify: 'center',
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

## useProps hook

你可以使用 `useProps` hook 为任何自定义组件添加默认 props 支持。`useProps` 接受三个参数：

- component name (string) – 用于将组件与主题关联
- `defaultProps` – 组件级别的默认 props – 当主题上未定义默认 props 时使用这些 props
- `props` – 传递给组件的 props

<code src="./default-props/demo/usePropsHook.tsx"></code>

## withProps 函数

所有 ReactUI 组件都有一个 `withProps` 静态函数，可用于向组件添加默认 props：

```tsx
import { Button, TextInput } from '@xiaoye-react/ui';

const LinkButton = Button.withProps({
  component: 'a',
  target: '_blank',
  rel: 'noreferrer',
  variant: 'subtle',
});

const PhoneInput = TextInput.withProps({
  label: 'Your phone number',
  placeholder: 'Your phone number',
});

function Demo() {
  return (
    <>
      {/* 你可以向使用 `withProps` 创建的组件传递额外 props */}
      <LinkButton href="https://react-ui.dev">
        ReactUI website
      </LinkButton>

      {/* 组件 props 会覆盖 `withProps` 中定义的默认 props */}
      <PhoneInput placeholder="个人电话" />
    </>
  );
}
```
