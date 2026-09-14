---
category: Styles
title: Rem
subtitle: rem 单位
description: react-ui Rem 文档。
---


## rem 单位

所有 ReactUI 组件都使用 `rem` 单位来设置尺寸样式（如 `margin`、`padding`、`width` 等）。
默认情况下，`1rem` 被视为 `16px`，这也是大多数浏览器的默认设置。
所有组件都会根据用户的浏览器字体大小设置或 `html`/`:root` 元素的字体大小进行缩放。

<code src="./rem/demo/remSlider.tsx"></code>

## rem 单位缩放

如果你想修改 `:root`/`html` 元素的字体大小，同时保持 ReactUI 组件的尺寸不变，
可以在 [theme](/docs/theming/theme-object) 上设置 `scale` 为 `1 / htmlFontSize`。

例如，如果你将 `html` 的字体大小设为 `10px`，并希望 ReactUI 组件按此缩放，
需要将 `scale` 设为 `1 / (10 / 16)`（16 为默认字体大小）= `1 / 0.625` = `1.6`：

```css
:root {
  font-size: 10px;
}
```

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  scale: 1.6,
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

## em 单位

`em` 单位在媒体查询中的使用方式与 `rem` 相同，但不受 `html`/`:root` 元素上字体大小的影响。
`1em` 被视为 `16px`。

## px 转换

你可以在部分 ReactUI 组件 props 中使用数字。数字会被视为 `px` 并自动转换为 `rem`，例如：


同样的转换也发生在 [style props](/docs/styles/style-props/) 中：

```tsx
import { ColorSwatch } from '@xiaoye-react/ui';

function DemoPx() {
  // Specify ColorSwatch size in px, it will be automatically converted to rem
  // Width and height of ColorSwatch in this case will be 32px / 16 = 2rem
  return <ColorSwatch color="#000" size={32} />;
}

function DemoRem() {
  // This demo will have the same size as previous one
  return <ColorSwatch color="#000" size="2rem" />;
}
```

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  // width: calc(2rem * var(--ui-scale))
  // height: calc(1rem * var(--ui-scale))
  return <Box w={32} h={16} />;
}
```

## rem 和 em 函数

`@xiaoye-react/ui` 包导出了 `rem` 和 `em` 函数，可用于将 `px` 转换为 `rem`/`em`：

```tsx
import { em, rem } from '@xiaoye-react/ui';

// numbers and values in px are converted to rem
rem(32); // -> calc(2rem * var(--ui-scale))
em(32); // -> 2em
rem('16px'); // -> calc(1rem * var(--ui-scale))
em('16px'); // -> 1em

rem('2rem'); // -> 2rem
em('2rem'); // -> 2rem

rem('50%'); // -> 50%
em('50%'); // -> 50%

rem('5vh'); // -> 5vh
em('5vh'); // -> 5vh

// mixed values are converted to rem
rem('16px 2rem'); // -> calc(1rem * var(--ui-scale)) 2rem
```

## 将 rem 转换为 px

要将 `rem`/`em` 转换为 `px`，可以使用 `@xiaoye-react/ui` 导出的 `px` 函数：

```tsx
import { px } from '@xiaoye-react/ui';

px('2rem'); // -> 32
px('10rem'); // -> 160
```

## 在 css 文件中使用 rem/em 函数

如果已安装 [内置 PostCSS 插件](/docs/styles/postcss-preset)，你可以在 [css 文件](/docs/styles/css-modules)中使用 `rem` 和 `em` 函数：

```css
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

## 在 css 文件中自动将 px 转换为 rem

要在 css 文件中自动将 `px` 转换为 `rem`，请在
[内置 PostCSS 插件](/docs/styles/postcss-preset) 配置中启用 `autoRem` 选项：

```js
module.exports = {
  plugins: {
    '<内置插件>': {
      autoRem: true,
    },
  },
};
```
