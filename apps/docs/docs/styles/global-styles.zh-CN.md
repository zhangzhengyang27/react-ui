---
category: Styles
title: GlobalStyles
subtitle: 全局样式
description: react-ui GlobalStyles 文档。
---


## CSS 重置

`@xiaoye-react/ui` 包包含最小的 CSS reset——它仅包含组件在现代浏览器中工作所需的基本样式。如果你需要支持旧浏览器，可以额外包含 [normalize.css](https://necolas.github.io/normalize.css/) 或任何你喜欢的其他 CSS reset。

```css
body {
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

input,
button,
textarea,
select {
  font: inherit;
}

button,
select {
  text-transform: none;
}
```

## Body 和 :root 元素样式

`@xiaoye-react/ui` 包包含以下 `body` 和 `:root` 元素样式：

```css
:root {
  color-scheme: var(--ui-color-scheme);
}

body {
  font-family: var(--ui-font-family);
  font-size: var(--ui-font-size-md);
  line-height: var(--ui-line-height);
  background-color: var(--ui-color-body);
  color: var(--ui-color-text);

  -webkit-font-smoothing: var(--ui-webkit-font-smoothing);
  -moz-osx-font-smoothing: var(--ui-moz-font-smoothing);
}
```

## 静态 classes

`@xiaoye-react/ui` 包包含以下静态 class：

- `ui-active` – 包含 `:active` 样式
- `ui-focus-auto` – 包含 `:focus-visible` 样式
- `ui-focus-always` – 包含 `:focus` 样式
- `ui-focus-never` – 移除默认浏览器 focus ring
- `ui-visible-from-{breakpoint}` – 当屏幕宽度大于断点时显示元素，例如 `ui-visible-from-sm`
- `ui-hidden-from-{breakpoint}` – 当屏幕宽度大于断点时隐藏元素，例如 `ui-hidden-from-sm`

你可以将这些 class 与任何组件或元素一起使用：

<code src="./global-styles/demo/globalClasses.tsx"></code>

## 在应用中添加全局样式

建议使用 [CSS modules](/docs/styles/css-modules) 配合 `className` prop 或 [Styles API](/docs/styles/styles-api) 为 ReactUI 组件应用样式。CSS modules 文件名通常以 `.module.css` 结尾。如果你想为应用添加全局样式，请创建一个带有 `.css` 扩展名但没有 `.module` 部分的文件，例如 `global.css`。

在全局 `.css` 文件中，你可以引用所有 ReactUI [CSS 变量](/docs/styles/css-variables) 并更改 `<body />`、`:root` 和其他元素的样式。例如，要更改 body 的 background-color：

```css
body {
  background-color: var(--ui-color-red-filled);
}
```
