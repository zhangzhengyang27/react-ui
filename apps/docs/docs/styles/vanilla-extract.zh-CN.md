---
category: Styles
title: VanillaExtract
subtitle: Vanilla Extract
description: react-ui VanillaExtract 文档。
---


## Vanilla extract 与 CSS Modules 对比

[Vanilla extract](https://vanilla-extract.style/) 和 [CSS Modules](/docs/styles/css-modules) 做的事情相同，只是语法不同。
[Vanilla extract](https://vanilla-extract.style/) 和 [CSS Modules](/docs/styles/css-modules) 的共同点：

- 样式在构建时生成——没有运行时开销和性能损耗
- class 名称作用于样式文件

[Vanilla extract](https://vanilla-extract.style/) 和 [CSS Modules](/docs/styles/css-modules) 的区别：

- Vanilla extract 的样式是类型安全的
- 你可以在 Vanilla extract 样式中使用任意 JavaScript/TypeScript 代码，包括 [颜色函数](/docs/styles/color-functions)
- 使用 Vanilla extract 时无法使用 [内置 PostCSS 插件](/docs/styles/postcss-preset) 的某些功能，例如 `light-dark` 函数和 `hover` mixin。
  因此，你不能直接复制粘贴 ReactUI 文档中的所有 demo 并在 Vanilla extract 中使用。
- Vanilla extract 需要额外的配置和设置，可能不适用于你的构建工具/框架。
  大多数流行工具（如 [Next.js](https://nextjs.org/) 和 [Vite](https://vitejs.dev/)）都有 Vanilla extract 插件，
  但如果你使用更小众的工具，可能需要自行配置。

注意，你可以在同一项目中同时使用 [Vanilla extract](https://vanilla-extract.style/) 和 [CSS Modules](/docs/styles/css-modules)；
这不会产生任何问题：性能相同，打包体积也不会受影响。

## 安装

按照 [Vanilla extract 安装说明](https://vanilla-extract.style/documentation/getting-started) 安装 Vanilla extract。
然后安装 `@ui/vanilla-extract` 包；它导出了 `themeToVars` 函数，用于将 ReactUI 主题转换为 CSS 变量：

<InstallScript packages="@ui/vanilla-extract"></InstallScript>

## 主题

Vanilla extract 提供了 [createTheme](https://vanilla-extract.style/documentation/theming/)
函数，可将给定的主题对象转换为 CSS 变量并赋值给 `:root` 或其他选择器。
你不应使用 Vanilla extract 的 `createTheme` 来生成 ReactUI 主题 token——所有 ReactUI [theme](/docs/theming/theme-object)
属性都已经作为 CSS 变量暴露出来了。相反，应使用 `@ui/vanilla-extract` 包中的 `themeToVars` 函数，
从 ReactUI 主题创建包含 CSS 变量的对象：

```tsx
// theme.ts
import { createTheme } from '@xiaoye-react/ui';

// Do not forget to pass theme to UIProvider
export const theme = createTheme({
  fontFamily: 'serif',
  primaryColor: 'cyan',
});
```

```tsx
// theme.css.ts
import { theme } from './theme';
import { themeToVars } from '@ui/vanilla-extract';

// CSS variables object, can be access in *.css.ts files
export const vars = themeToVars(theme);
```

## 样式

在 `*.css.ts` 文件中导入 `vars` 对象，即可访问 ReactUI [CSS 变量](/docs/styles/css-variables)：

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,
});
```

## rem 和 em

要将 px 转换为 [rem 或 em](/docs/styles/rem)，可以使用 `@xiaoye-react/ui` 包中的 `rem` 和 `em` 函数：

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { rem } from '@xiaoye-react/ui';

export const demo = style({
  fontSize: rem(16),

  '@media': {
    [`(min-width: ${em(768)})`]: {
      fontSize: rem(18),
    },
  },
});
```

## light 和 dark 选择器

`vars` 对象包含 `lightSelector` 和 `darkSelector` 属性，可用于仅在亮色或暗色配色方案下应用样式：


注意，通常只使用其中一个会更方便：
为亮色配色方案定义样式，然后用 `vars.darkSelector` 覆盖暗色配色方案下的样式（或相反）：

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,

  selectors: {
    [vars.lightSelector]: {
      backgroundColor: vars.colors.red[5],
      color: vars.colors.white,
    },

    [vars.darkSelector]: {
      backgroundColor: vars.colors.blue[5],
      color: vars.colors.white,
    },
  },
});
```

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,

  selectors: {
    [vars.darkSelector]: {
      backgroundColor: vars.colors.blue[5],
      color: vars.colors.white,
    },
  },
});
```

## largerThan 和 smallerThan

`vars` 对象包含 `largerThan` 和 `smallerThan` 属性，可在 `@media` 中作为 `min-width` 和 `max-width` 的简写：

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.sm,

  '@media': {
    // equivalent to `(min-width: 640px)` converted to em
    // -> `(min-width: 40em)`
    [vars.largerThan(640)]: {
      fontSize: vars.fontSizes.md,
    },

    // equivalent to `(max-width: 640px)` converted to em
    // -> `(max-width: 40em)`
    [vars.smallerThan(640)]: {
      fontSize: vars.fontSizes.xs,
    },

    // You can reference `theme.breakpoints` values
    [vars.largerThan('sm')]: {
      fontSize: vars.fontSizes.md,
    },
  },
});
```

## rtl 选择器

使用 `vars.rtlSelector` 仅在 rtl 方向下应用样式：

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  paddingRight: vars.spacing.md,

  selectors: {
    [vars.rtlSelector]: {
      paddingLeft: vars.spacing.md,
      paddingRight: 0,
    },
  },
});
```
