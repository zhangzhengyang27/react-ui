---
category: Styles
title: Sass
subtitle: Sass
description: react-ui Sass 文档。
---


## Sass 模块

你可以像使用 [CSS modules](/docs/styles/css-modules) 一样使用 Sass modules：

- 使用 `*.module.scss`/`*.module.sass` 扩展名启用 modules
- 使用 `*.scss`/`*.sass` 扩展名编写全局样式

## 配合 Vite 使用

安装 `sass`：

<InstallScript packages="sass-embedded" dev></InstallScript>

在你的 `vite.config.js` 文件中添加 ReactUI 资源：


创建 `src/_ui.scss` 文件：


全部完成！现在你可以使用断点变量、`rem` 函数、`hover`、`light`/`dark` mixins：

```tsx
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path.join(process.cwd(), 'src/_ui').replace(/\\/g, '/')}" as ui;`,
      },
    },
  },
});
```

```scss
@use 'sass:math';

// Define variables for your breakpoints,
// values must be the same as in your theme
$ui-breakpoint-xs: '36em';
$ui-breakpoint-sm: '48em';
$ui-breakpoint-md: '62em';
$ui-breakpoint-lg: '75em';
$ui-breakpoint-xl: '88em';

@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}

@mixin light {
  [data-ui-color-scheme='light'] & {
    @content;
  }
}

@mixin dark {
  [data-ui-color-scheme='dark'] & {
    @content;
  }
}

@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }

  @media (hover: none) {
    &:active {
      @content;
    }
  }
}

@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}

@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```

```scss
// example.module.scss
.title {
  // light-dark function is handled by PostCSS
  color: light-dark(
    var(--ui-color-black),
    var(--ui-color-white)
  );
  font-size: ui.rem(100px);
  font-weight: 900;
  letter-spacing: ui.rem(-2px);

  @include ui.light {
    background-color: red;
  }

  @include ui.dark {
    background-color: blue;
  }

  @include ui.smaller-than(ui.$ui-breakpoint-md) {
    font-size: ui.rem(50px);
  }
}
```

## 配合 Next.js 使用

安装 `sass`：

<InstallScript packages="sass-embedded" dev></InstallScript>

在你的 `next.config.mjs` 文件中添加 ui 资源：


在项目根目录创建 `_ui.scss` 文件：


全部完成！现在你可以使用断点变量、`rem` 函数、`hover`、`light`/`dark` mixins：

```tsx
import path from 'node:path';

export default {
  // ...other config
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), '_ui').replace(/\\/g, '/')}" as ui;`,
  },
};
```

```scss
@use 'sass:math';

// Define variables for your breakpoints,
// values must be the same as in your theme
$ui-breakpoint-xs: '36em';
$ui-breakpoint-sm: '48em';
$ui-breakpoint-md: '62em';
$ui-breakpoint-lg: '75em';
$ui-breakpoint-xl: '88em';

@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}

@mixin light {
  [data-ui-color-scheme='light'] & {
    @content;
  }
}

@mixin dark {
  [data-ui-color-scheme='dark'] & {
    @content;
  }
}

@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }

  @media (hover: none) {
    &:active {
      @content;
    }
  }
}

@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}

@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```

```scss
// example.module.scss
.title {
  // light-dark function is handled by PostCSS
  color: light-dark(
    var(--ui-color-black),
    var(--ui-color-white)
  );
  font-size: ui.rem(100px);
  font-weight: 900;
  letter-spacing: ui.rem(-2px);

  @include ui.light {
    background-color: red;
  }

  @include ui.dark {
    background-color: blue;
  }

  @include ui.smaller-than(ui.$ui-breakpoint-md) {
    font-size: ui.rem(50px);
  }
}
```
