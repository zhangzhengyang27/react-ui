---
category: Styles
title: PostcssPreset
subtitle: PostCSS 预设
description: react-ui PostcssPreset 文档。
---


## 安装

将 `postcss-preset-ui` 作为开发依赖安装：

<InstallScript dev packages="postcss-preset-ui"></InstallScript>

## 用法

注意，PostCSS 的配置方式可能因构建工具/框架而异。请参考
[框架专用指南](/getting-started) 了解更多。
将 `postcss-preset-ui` 添加到你的 `postcss.config.cjs` 文件中（通常位于项目根目录）：


全部完成！现在你可以使用 preset 的所有功能。

```js
module.exports = {
  plugins: {
    'postcss-preset-ui': {},
  },
};
```

## rem/em 函数

`rem` 和 `em` 函数可用于将像素转换为 rem/em 单位。
`16px = 1rem`，`16px = 1em`。`em` 值应用于媒体查询，
`rem` 用于其他所有场景。你可以在 [本指南](/docs/styles/rem) 中了解更多单位转换相关内容。


将被转换为：

```scss
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

```scss
.demo {
  font-size: calc(1rem * var(--ui-scale));

  @media (min-width: 20em) {
    font-size: calc(2rem * var(--ui-scale));
  }
}
```

## 自动将 px 转换为 rem

可以使用 `autoRem` 选项自动将 `.css` 文件中的所有像素值转换为 rem 单位：


该选项的工作方式与 `rem` 函数类似。以下代码：


将被转换为：


注意，`autoRem` 只转换 CSS 属性值，`@media` 查询中的值不会自动转换——
你仍然需要使用 `em` 函数来转换它们。

`autoRem` 选项不会转换以下情况的值：

- `calc()`、`var()`、`clamp()` 和 `url()` 函数中的值
- `content` 属性中的值
- 包含 `rgb()`、`rgba()`、`hsl()`、`hsla()` 颜色的值

如果你想将上述值转换为 rem 单位，请手动使用 `rem` 函数。

```js
module.exports = {
  plugins: {
    'postcss-preset-ui': {
      autoRem: true,
    },
  },
};
```

```scss
.demo {
  font-size: 16px;

  @media (min-width: 320px) {
    font-size: 32px;
  }
}
```

```scss
.demo {
  font-size: calc(1rem * var(--ui-scale));

  @media (min-width: 320px) {
    font-size: calc(2rem * var(--ui-scale));
  }
}
```

## dark 和 light mixins

`dark` 和 `light` mixins 可用于创建仅在暗色或亮色配色方案下应用的样式。


将被转换为：


注意，通常你不需要同时使用 `light` 和 `dark` mixin。
更简单的方式是为亮色配色方案定义样式，然后使用 `dark` mixin 在暗色配色方案下覆盖它们。


要在 `:root`/`html` 元素上定义亮色/暗色配色方案的值，请改用 `light-root` 和 `dark-root` mixins：

```scss
.demo {
  @mixin light {
    color: red;
  }

  @mixin dark {
    color: blue;
  }
}
```

```scss
[data-ui-color-scheme='light'] .demo {
  color: red;
}

[data-ui-color-scheme='dark'] .demo {
  color: blue;
}
```

```scss
.demo {
  // Value for light color scheme
  color: red;

  @mixin dark {
    // Value for dark color scheme
    color: blue;
  }
}
```

```scss
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## smaller-than 和 larger-than mixins

`smaller-than` 和 `larger-than` mixins 可用于创建仅在屏幕小于或大于指定断点时应用的样式。


将被转换为：


你也可以将 `smaller-than` 和 `larger-than` mixins 与 [ui 断点](/docs/styles/responsive/#breakpoints-variables-in-css-modules) 一起使用：

```scss
.demo {
  @mixin smaller-than 320px {
    color: red;
  }

  @mixin larger-than 320px {
    color: blue;
  }
}
```

```scss
// Breakpoint values are converted to em units
// In smaller-than mixin 0.1px is subtracted from breakpoint value
// to avoid intersection with larger-than mixin
@media (max-width: 19.99375em) {
  .demo {
    color: red;
  }
}

@media (min-width: 20em) {
  .demo {
    color: blue;
  }
}
```

```scss
.demo {
  @mixin smaller-than $ui-breakpoint-sm {
    color: red;
  }

  @mixin larger-than $ui-breakpoint-sm {
    color: blue;
  }
}
```

## light-dark 函数

`light-dark` 函数是 `light` 和 `dark` mixins 的替代方案。它接受两个参数：
第一个参数是在亮色配色方案下应用的规则，第二个参数是在暗色配色方案下应用的规则。


将被转换为：


注意，`light-dark` 函数不能在 `:root`/`html` 元素上使用。请改用 `light-root` 和 `dark-root` mixins：

```css
.demo {
  color: light-dark(red, blue);
}
```

```css
.demo {
  color: red;
}

[data-ui-color-scheme='dark'] .demo {
  color: blue;
}
```

```scss
// ❌ 无效
:root {
  --color: light-dark(red, blue);
}

// ✅ 有效
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## alpha 函数

`alpha` 函数可用于为颜色添加 alpha 通道。注意它使用了 [color-mix](https://caniuse.com/mdn-css_types_color_color-mix)，在某些旧版浏览器中不受支持。


将被转换为：

```scss
.demo {
  color: alpha(var(--ui-color-red-4), 0.5);
  border: 1px solid alpha(#ffc, 0.2);
}
```

```scss
.demo {
  color: color-mix(
    in srgb,
    var(--ui-color-red-4),
    transparent 50%
  );
  border: 1px solid color-mix(in srgb, #ffc, transparent 80%);
}
```

## lighten 和 darken 函数

`lighten` 和 `darken` 函数的工作方式与 `alpha` 函数类似，但它们不是添加 alpha 通道，
而是通过 [color-mix](https://caniuse.com/mdn-css_types_color_color-mix) 向颜色中添加白色或黑色。


将被转换为：

```scss
.demo {
  color: lighten(var(--ui-color-red-4), 0.5);
  border: 1px solid darken(#ffc, 0.2);
}
```

```scss
.demo {
  color: color-mix(in srgb, var(--ui-color-red-4), white 50%);
  border: 1px solid color-mix(in srgb, #ffc, black 20%);
}
```

## hover mixin

`hover` mixin 可用于创建在 hover 时应用的样式。


将被转换为：

```css
.demo {
  @mixin hover {
    color: orange;
  }
}
```

```css
@media (hover: hover) {
  .demo:hover {
    color: orange;
  }
}

@media (hover: none) {
  .demo:active {
    color: orange;
  }
}
```

## rtl/ltr mixins

`rtl` mixin 可用于在父元素设置 `dir="rtl"` 时（通常是 `<html />`）应用样式。


将被转换为：


`ltr` mixin 的工作方式相同，但用于 `dir="ltr"`：


将被转换为：

```scss
.demo {
  margin-left: 1rem;

  @mixin rtl {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

```css
.demo {
  margin-left: 1rem;
}

[dir='rtl'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

```scss
.demo {
  margin-left: 1rem;

  @mixin ltr {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

```css
.demo {
  margin-left: 1rem;
}

[dir='ltr'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

## not-rtl/not-ltr mixins

`not-rtl`/`not-ltr` mixins 可用于在方向设置为相反值或完全未设置时应用样式。
例如，`not-rtl` 样式会在 `dir="ltr"` 或 `dir` 完全未设置时应用。


将被转换为：

```scss
.demo {
  @mixin not-rtl {
    margin-right: 1rem;
  }
}
```

```css
:root:not([dir='rtl']) .demo {
  margin-right: 1rem;
}
```

## where-\* mixins

`where-*` mixins 是 `light`、`dark`、`rlt` 和 `hover` mixins 的替代方案。
它们的工作方式完全相同，但生成的 CSS 优先级更低。这些 mixin 在你想轻松覆盖样式时非常有用，
例如当你正在构建一个库或扩展时。

使用 `where-light` mixin 的示例：


将被转换为：

```scss
.demo {
  @mixin where-light {
    color: red;
  }
}
```

```scss
:where([data-ui-color-scheme='light']) .demo {
  color: red;
}
```

## 自定义 mixins

你可以通过 `mixins` 选项定义 preset 未包含的自定义 mixins。要了解 mixins 语法，请参考 [postcss-mixins 文档](https://github.com/postcss/postcss-mixins#readme)。

添加 `clearfix` 和 `circle` mixins 的示例：


然后你就可以在样式中使用这些 mixins：

```tsx
module.exports = {
  plugins: {
    'postcss-preset-ui': {
      autoRem: true,
      mixins: {
        clearfix: {
          '&::after': {
            content: '""',
            display: 'table',
            clear: 'both',
          },
        },
        circle: (_mixin, size) => ({
          borderRadius: '50%',
          width: size,
          height: size,
        }),
      },
    },
    // ... Other plugins
  },
};
```

```scss
.demo {
  @mixin clearfix;
  @mixin circle 100px;
}
```

## 禁用特定功能

你可以通过将特定功能设置为 `false` 来禁用 preset 的部分功能：

```tsx
module.exports = {
  'postcss-preset-ui': {
    features: {
      // Turn off `light-dark` function
      lightDarkFunction: false,

      // Turn off `postcss-nested` plugin
      nested: false,

      // Turn off `lighten`, `darken` and `alpha` functions
      colorMixAlpha: false,

      // Turn off `rem` and `em` functions
      remEmFunctions: false,

      // Turn off `postcss-mixins` plugin
      mixins: false,
    },
  },
};
```
