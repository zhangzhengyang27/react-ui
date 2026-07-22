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


### colorSchemeManager

`colorSchemeManager` 用于在外部存储中读取和设置配色方案值。默认情况下，`UIProvider` 使用 `window.localStorage` 存储配色方案值，但你也可以向 `colorSchemeManager` prop 传入自己的实现。你可以在 [配色方案指南](/docs/theming/color-schemes) 中了解更多关于配色方案管理的内容。


### defaultColorScheme

当 `colorSchemeManager` 无法从外部存储获取值时（例如在服务端渲染期间，或用户尚未选择首选配色方案），将使用 `defaultColorScheme` 值。可选值为 `light`、`dark` 和 `auto`。默认配色方案值为 `light`。你可以在 [配色方案指南](/docs/theming/color-schemes) 中了解更多关于配色方案管理的内容。


### cssVariablesSelector

`cssVariablesSelector` 是用于添加 [CSS 变量](/docs/styles/css-variables/) 的 CSS 选择器。默认情况下，变量会应用到 `:root` 和 `:host`。`UIProvider` 会根据给定的 [theme override](/docs/theming/theme-object/) 和 `cssVariablesResolver` 生成 CSS 变量，然后这些变量会渲染到应用旁边的 `<style />` 标签中。你可以在 [CSS 变量指南](/docs/styles/css-variables/) 中了解更多关于 ReactUI CSS 变量的内容。


### withCssVariables

`withCssVariables` 决定是否应将主题 CSS 变量添加到给定的 `cssVariablesSelector`。默认值为 `true`。除非你希望通过 `.css` 文件管理 CSS 变量（注意，在这种情况下，你需要自行生成所有不属于默认主题的 theme token），否则不应更改它。


### deduplicateCssVariables

`deduplicateCssVariables` 决定是否应对 CSS 变量进行去重：如果某个 CSS 变量的值与默认主题中的值相同，则不会在运行时添加它。默认值为 `true`。如果设置为 `false`，即使所有 ReactUI CSS 变量的值与默认主题相同，它们也会被添加到 `<style />` 标签中。


### deduplicateInlineStyles

`deduplicateInlineStyles` 启用 React 19 的 style 标签去重功能，用于响应式 [style props](/docs/styles/style-props)。当多个组件共享相同的响应式 style prop 值时（例如，许多列表项都设置了 `mt={{ base: 10, md: 20 }}`），只会生成一个 `<style />` 标签并提升到 `<head />` 中，而不是每个组件都注入自己的 style 标签。

这在许多组件使用相同响应式 style props 的场景下可以显著提升性能。更多详情请参见 [样式性能指南](/docs/styles/styles-performance)。


### getRootElement

`getRootElement` 是一个返回根应用元素（通常是 `html`）的函数，用于设置 `data-ui-color-scheme` 属性。默认值为 `() => document.documentElement`，这意味着 `data-ui-color-scheme` 属性会被添加到 `<html />` 标签上。你可以在 [配色方案指南](/docs/theming/color-schemes) 中了解更多关于配色方案管理的内容。


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


### withGlobalClasses

`withGlobalClasses` 决定是否应通过 `<style />` 标签添加全局 class。`hiddenFrom`/`visibleFrom` 和 `lightHidden`/`darkHidden` props 需要全局 class 才能正常工作。默认情况下全局 class 是启用的。要禁用它们，将 `withGlobalClasses` 设置为 `false`。注意，禁用全局 class 可能会破坏某些组件的样式。


### getStyleNonce

`getStyleNonce` 是一个生成 [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) 属性的函数，该属性会添加到动态生成的 `<style />` 标签中。

### cssVariablesResolver

`cssVariablesResolver` 是一个基于 [theme object](/docs/theming/theme-object) 生成 CSS 变量样式的函数。你可以在 [CSS 变量指南](/docs/styles/css-variables#css-variables-resolver) 中了解更多。


### env

`env` prop 可用于测试环境，以禁用可能影响测试和/或使组件测试更困难的一些功能：

- 延迟挂载/卸载子组件的过渡动画
- 在 DOM 其他位置渲染子组件的 portal

要启用测试环境，将 `env` 设置为 `test`：


注意，`env="test"` 仅适用于测试环境，配合 [Jest](/docs/guides/jest) 或 [Vitest](/docs/guides/vitest) 使用。请勿在开发或生产环境中使用它。也不建议将其与 [Cypress](/docs/guides/cypress) 或 [Playwright](/docs/guides/playwright) 等端到端测试工具一起使用。

```tsx
interface UIProviderProps {
  /** Theme override object */
  theme?: UIThemeOverride;

  /** Used to retrieve/set color scheme value in external storage; by default uses `window.localStorage` */
  colorSchemeManager?: UIColorSchemeManager;

  /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage; `light` by default */
  defaultColorScheme?: UIColorScheme;

  /** Forces color scheme value; if set, UIProvider ignores `colorSchemeManager` and `defaultColorScheme` */
  forceColorScheme?: 'light' | 'dark';

  /** CSS selector to which CSS variables should be added, by default variables are applied to `:root` and `:host` */
  cssVariablesSelector?: string;

  /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`; `true` by default */
  withCssVariables?: boolean;

  /** Determines whether CSS variables should be deduplicated: if CSS variable has the same value as in default theme, it is not added in the runtime; `true` by default. */
  deduplicateCssVariables?: boolean;

  /** Function to resolve root element to set `data-ui-color-scheme` attribute; must return undefined on server, `() => document.documentElement` by default */
  getRootElement?: () => HTMLElement | undefined;

  /** A prefix for components' static classes (for example {selector}-Text-root); `ui` by default */
  classNamesPrefix?: string;

  /** Function to generate nonce attribute added to all generated `<style />` tags */
  getStyleNonce?: () => string;

  /** Function to generate CSS variables based on theme object */
  cssVariablesResolver?: CSSVariablesResolver;

  /** Determines whether components should have static classes, for example, `ui-Button-root`; `true` by default */
  withStaticClasses?: boolean;

  /** Determines whether global classes should be added with `<style />` tag. Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work; `true` by default. */
  withGlobalClasses?: boolean;

  /** Determines whether inline styles with identical content should be deduplicated using React 19 style hoisting. When enabled, components with the same responsive style props share a single `<style />` tag instead of each generating their own. @default false */
  deduplicateInlineStyles?: boolean;

  /** Environment in which the provider is used; `'test'` environment disables all transitions and portals */
  env?: 'default' | 'test';

  /** Your application */
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
import {
  localStorageColorSchemeManager,
  UIProvider,
} from '@xiaoye-react/ui';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
});

function Demo() {
  return (
    <UIProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider defaultColorScheme="dark">
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
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider withCssVariables={false}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider deduplicateCssVariables={false}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider deduplicateInlineStyles>
      {/* Your app here */}
    </UIProvider>
  );
}
```

```tsx
import { UIProvider } from '@xiaoye-react/ui';

const getRootElement = () =>
  typeof window === 'undefined' ? undefined : document.body;

function Demo() {
  return (
    <UIProvider getRootElement={getRootElement}>
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
    <UIProvider withGlobalClasses={false}>
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
