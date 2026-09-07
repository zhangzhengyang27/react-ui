---
category: Theming
title: UiProvider
subtitle: UI Provider
description: react-ui UiProvider 文档。
---


## 用法

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  /** Your theme override here */
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

## UIProvider 属性

`UIProvider` 支持以下 props：


### theme

向 `theme` prop 传递 [theme object](/docs/theming/theme-object) 覆盖对象。它将与默认主题合并，并用于所有组件。


### colorScheme

`colorScheme` 控制应用的配色方案，可选值为 `light`、`dark` 和 `auto`（跟随系统偏好）。默认值为 `light`。

该 prop 是**受控**的：不传入时组件内部维护状态（初始为 `light`）；传入后配色完全由你的状态控制，配合 `onColorSchemeChange` 风格的状态管理即可实现切换与持久化。你可以在 [配色方案指南](/docs/theming/color-schemes) 中了解更多。


### headless

`headless` 决定是否移除 ReactUI 的默认样式。设置为 `true` 时，UIProvider 不会注入全局样式，组件仍保留 [Styles API](/docs/styles/styles-api) class，便于完全自定义样式。默认值为 `false`。


### cssVariablesSelector

`cssVariablesSelector` 是用于添加 [CSS 变量](/docs/styles/css-variables/) 的 CSS 选择器。默认情况下，变量会应用到 `:root`。`UIProvider` 会根据给定的 [theme override](/docs/theming/theme-object/) 和 `cssVariablesResolver` 生成 CSS 变量，然后这些变量会渲染到 `<style />` 标签中。你可以在 [CSS 变量指南](/docs/styles/css-variables/) 中了解更多关于 ReactUI CSS 变量的内容。


### classNamesPrefix

`classNamesPrefix` 是组件静态 class 的前缀（例如 `ui-Text-root`）。默认值为 `ui`——所有组件的**静态 class**都会带有 `ui-` 前缀。


在这种情况下（默认 `classNamesPrefix`），[Text](/components/text) 组件将拥有以下 class：

- `ui-focus-auto` – 全局工具类
- `m-3nrA4eL` – 组件 class，通常是随机字符串；库样式通过此类应用
- `ui-Text-root` – 组件静态 class，属于 [Styles API](/docs/styles/styles-api)

使用 `classNamesPrefix` 可以只更改**静态 class**：


现在 [Text](/components/text) 组件将拥有以下 class：

- `ui-focus-auto` – `classNamesPrefix` 不会影响全局工具类——它们是静态的，**无法更改**
- `m-3nrA4eL` – `classNamesPrefix` 不会影响库的 class——它们是静态的，**无法更改**
- `app-Text-root` – 组件静态 class 使用 `classNamesPrefix` 替代了 `ui`

### withStaticClasses

`withStaticClasses` 决定是否应为组件添加静态 class，例如 `ui-Button-root`。默认情况下静态 class 是启用的。要禁用它们，将 `withStaticClasses` 设置为 `false`：


### cssVariablesResolver

`cssVariablesResolver` 是一个基于 [theme object](/docs/theming/theme-object) 生成 CSS 变量样式的函数。你可以在 [CSS 变量指南](/docs/styles/css-variables#css-variables-resolver) 中了解更多。


### env

`env` prop 可用于测试环境，以禁用可能影响测试和/或使组件测试更困难的一些功能：

- 延迟挂载/卸载子组件的过渡动画
- 在 DOM 其他位置渲染子组件的 portal

要启用测试环境，将 `env` 设置为 `test`：


注意，`env="test"` 仅适用于测试环境，配合 [Jest](/docs/guides/jest) 或 [Vitest](/docs/guides/vitest) 使用。请勿在开发或生产环境中使用它。也不建议将其与 Cypress 或 Playwright 等端到端测试工具一起使用。

```tsx
interface UIProviderProps {
  /** 主题覆盖对象，与默认主题合并 */
  theme?: UIThemeOverrides;

  /** 控制配色方案：'light' | 'dark' | 'auto'（跟随系统偏好）；不传入时内部维护状态，初始为 'light' */
  colorScheme?: UIColorScheme;

  /** 组件静态 class 的前缀（例如 ui-Text-root）；默认为 'ui' */
  classNamesPrefix?: string;

  /** 是否为组件添加静态 class（例如 ui-Button-root）；默认为 true */
  withStaticClasses?: boolean;

  /** 无头模式：不注入全局样式；默认为 false */
  headless?: boolean;

  /** CSS 变量挂载的 CSS 选择器；默认为 ':root' */
  cssVariablesSelector?: string;

  /** 基于主题对象生成 CSS 变量的函数；默认为 defaultCssVariablesResolver */
  cssVariablesResolver?: CSSVariablesResolver;

  /** 运行环境；'test' 会禁用过渡动画与 portal */
  env?: 'default' | 'test';

  /** 你的应用 */
  children?: React.ReactNode;
}
```

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider colorScheme="auto">
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider headless>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider cssVariablesSelector="html">
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider>
      <Text>只是一些文本</Text>
    </UIProvider>
  );
}
```

```tsx
import { UIProvider, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider classNamesPrefix="app">
      <Text>只是一些文本</Text>
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider withStaticClasses={false}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider env="test">
      {/* Your app here */}
    </UIProvider>
  );
}
```
