---
category: Theming
title: ThemeObject
subtitle: 主题对象
description: react-ui ThemeObject 文档。
---


## 用法

要自定义主题，请将主题覆盖对象传递给 [UIProvider](/docs/theming/ui-provider/) 的 `theme` 属性。主题覆盖对象会与默认主题进行深度合并。

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  colors: {
    // 添加你的颜色
    deepBlue: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
    // 或者替换默认主题颜色
    blue: [
      '#eef3ff',
      '#dee2f2',
      '#bdc2de',
      '#98a0ca',
      '#7a84ba',
      '#6672b0',
      '#5c68ac',
      '#4c5897',
      '#424e88',
      '#364379',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '36px' },
    },
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* 你的应用 */}
    </UIProvider>
  );
}
```

## 主题属性

### autoContrast

`autoContrast` 控制是否应根据传入的 `color` 属性更改文本颜色，适用于以下组件：

- [ActionIcon](/components/action-icon)，仅 `variant="filled"`
- [Alert](/components/alert)，仅 `variant="filled"`
- [Avatar](/components/avatar)，仅 `variant="filled"`
- [Badge](/components/badge)，仅 `variant="filled"`
- [Button](/components/button)，仅 `variant="filled"`
- [Chip](/components/chip)，仅 `variant="filled"`
- [NavLink](/components/nav-link)，仅 `variant="filled"`
- [ThemeIcon](/components/theme-icon)，仅 `variant="filled"`
- [Checkbox](/components/checkbox)，仅 `variant="filled"`
- [Radio](/components/radio)，仅 `variant="filled"`
- [Tabs](/components/tabs)，仅 `variant="pills"`
- [SegmentedControl](/components/segmented-control)
- [Stepper](/components/stepper)
- [Pagination](/components/pagination)
- [Progress](/components/progress)
- [Indicator](/components/indicator)
- [Timeline](/components/timeline)
- [Spotlight](/docs/x/spotlight)
- 所有基于 [Calendar](/docs/dates/calendar) 组件的 [@xiaoye-react/ui](/docs/dates/getting-started) 组件

`autoContrast` 会检查给定颜色的亮度是否高于或低于 `luminanceThreshold` 值，并相应地将文本颜色更改为 `theme.white` 或 `theme.black`。

`autoContrast` 可以在主题级别全局设置，也可以通过 `autoContrast` 属性为每个组件单独设置，但 [Spotlight](/docs/x/spotlight) 和 [@xiaoye-react/ui](/docs/dates/getting-started) 组件仅支持全局主题设置。


### luminanceThreshold

`luminanceThreshold` 控制用于判断文本颜色应为浅色还是深色的亮度值。仅在 `theme.autoContrast` 设置为 `true` 时使用。默认值为 `0.3`。


### focusRing

`theme.focusRing` 控制 focus ring 样式，支持以下值：

- `auto`（默认且推荐）– 仅当用户使用键盘导航时显示 focus ring，这是原生交互元素的默认浏览器行为
- `always` – 无论用户使用键盘还是鼠标导航都显示 focus ring，例如，用户点击按钮时也会显示 focus ring
- `never` – 始终隐藏 focus ring；不推荐——使用键盘导航的用户将无法看到当前聚焦元素


### focusClassName

`theme.focusClassName` 是一个 CSS 类，会添加到具有 focus 样式的元素上，例如 [Button](/components/button) 或 [ActionIcon](/components/action-icon)。它可用于自定义所有交互组件的 focus ring 样式（输入框除外）。注意，当设置了 `theme.focusClassName` 时，`theme.focusRing` 会被忽略。


> **:focus-visible 选择器**
>
> `:focus-visible` 选择器已被超过 [91% 的浏览器](https://caniuse.com/css-focus-visible) 支持（数据来自 2023 年 4 月）。
> Safari 浏览器在 15.4 版本（2022 年 3 月发布）中增加了对它的支持。如果你需要支持 Safari 15.3 及更早版本，可以使用 [focus-visible polyfill](https://github.com/WICG/focus-visible)
> 或使用 `:focus` 伪类提供[降级方案](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible#providing_a_focus_fallback)。

### activeClassName

`theme.activeClassName` 是一个 CSS 类，会添加到具有 active 样式的元素上，例如 [Button](/components/button) 或 [ActionIcon](/components/action-icon)。它可用于自定义所有交互组件的 active 样式。


要禁用所有组件的 active 样式，将 `theme.activeClassName` 设置为空字符串：


### defaultRadius

`theme.defaultRadius` 控制大多数组件的默认 `border-radius` 属性，例如 [Button](/components/button) 或 [TextInput](/components/text-input)。你可以将其设置为 `theme.radius` 中的一个值，或者设置为一个数字/字符串以使用精确值。注意，数字会被视为像素值，但会转换为 rem。例如，`theme.defaultRadius: 4` 会转换为 `0.25rem`。你可以在 [rem 单位指南](/docs/styles/rem) 中了解更多关于 rem 转换的内容。


### cursorType

`theme.cursorType` 控制默认的鼠标指针类型，适用于那些默认没有 `cursor: pointer` 样式的交互元素。例如 [Checkbox](/components/checkbox) 和 [NativeSelect](/components/native-select)。


### defaultGradient

`theme.defaultGradient` 控制支持 `variant="gradient"` 的组件的默认渐变配置（如 [Button](/components/button)、[ActionIcon](/components/action-icon)、[Badge](/components/badge) 等）。


### fontWeights

`theme.fontWeights` 控制所有组件中使用的 `font-weight` 值。默认值为 `regular: 400`、`medium: 600`、`bold: 700`。每个值都会映射到一个 CSS 变量：`--ui-font-weight-regular`、`--ui-font-weight-medium`、`--ui-font-weight-bold`。

例如，要将 medium 字重从 `600` 改回 ReactUI 8 中的默认值 `500`：


### components

`theme.components` 允许使用 `classNames` 和 `styles` 属性覆盖组件的[默认 props](/docs/theming/default-props)和样式。你可以在 [default props](/docs/theming/default-props) 和 [Styles API](/docs/styles/styles-api) 指南中了解更多。

### other

`theme.other` 是一个对象，可用于存储任何你想通过 theme 对象访问的其他属性。

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  fontWeights: {
    medium: '500',
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* 你的应用 */}
    </UIProvider>
  );
}
```

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  other: {
    charcoal: '#333333',
    primaryHeadingSize: 45,
    fontWeights: {
      bold: 700,
      extraBold: 900,
    },
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* 你的应用 */}
    </UIProvider>
  );
}
```

<code src="./theme-object/demo/autoContrast.tsx"></code>

<code src="./theme-object/demo/luminanceThreshold.tsx"></code>

<code src="./theme-object/demo/focusRing.tsx"></code>

<code src="./theme-object/demo/focusClassName.tsx"></code>

<code src="./theme-object/demo/activeClassName.tsx"></code>

<code src="./theme-object/demo/activeClassNameEmpty.tsx"></code>

<code src="./theme-object/demo/defaultRadiusConfigurator.tsx"></code>

<code src="./theme-object/demo/cursorType.tsx"></code>

<code src="./theme-object/demo/defaultGradient.tsx"></code>

## 将主题覆盖对象存储在变量中

要将主题覆盖对象存储在变量中，请使用 `createTheme` 函数：

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const myTheme = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

function Demo() {
  return (
    <UIProvider theme={myTheme}>
      {/* 你的应用 */}
    </UIProvider>
  );
}
```

## 合并多个主题覆盖

使用 `mergeThemeOverrides` 函数将多个主题合并为一个主题覆盖对象：

```tsx
import {
  createTheme,
  UIProvider,
  mergeThemeOverrides,
} from '@xiaoye-react/ui';

const theme1 = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

const theme2 = createTheme({
  cursorType: 'pointer',
});

// 注意：最好将主题覆盖对象存储在组件体外部，以避免不必要的重新渲染
const myTheme = mergeThemeOverrides(theme1, theme2);

function Demo() {
  return (
    <UIProvider theme={myTheme}>
      {/* 你的应用 */}
    </UIProvider>
  );
}
```

## use-ui-theme hook

`useUITheme` Hook 从 [UIProvider](/docs/theming/ui-provider) 上下文中返回主题对象：

```tsx
import { useUITheme } from '@xiaoye-react/ui';

function Demo() {
  const theme = useUITheme();
  return <div style={{ background: theme.colors.blue[5] }} />;
}
```

## 默认主题

你可以从 `@xiaoye-react/ui` 包中导入默认主题对象。它包含所有具有默认值的主题属性。当你将主题覆盖传递给 [UIProvider](/docs/theming/ui-provider) 时，它会与默认主题进行深度合并。

```tsx
import { DEFAULT_THEME } from '@xiaoye-react/ui';
```

## 在组件外部访问主题

要在组件外部访问主题，你需要创建一个完整的主题对象（你的主题覆盖与默认主题合并后的结果）。


然后你可以在应用的任何地方导入它：

```tsx
// theme.ts
import {
  createTheme,
  DEFAULT_THEME,
  mergeUITheme,
} from '@xiaoye-react/ui';

const themeOverride = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

export const theme = mergeUITheme(DEFAULT_THEME, themeOverride);
```

```tsx
import { theme } from './theme';
```
