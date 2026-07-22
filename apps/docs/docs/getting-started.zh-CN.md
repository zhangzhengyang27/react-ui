---
title: 开始使用
group:
  title: 开始
  order: 1
---

# 开始使用

ReactUI 是一个 React 组件库，专注于提供出色的用户体验和开发体验。它包含 120+ 组件、30+ hooks，覆盖布局、表单、反馈、覆盖层、数据展示、图表等场景。

## 安装

首先安装核心包和 hooks 包：

<PackagesInstallation packages="@xiaoye-react/ui @xiaoye-react/hooks"></PackagesInstallation>

安装 PostCSS 插件和 [postcss-preset-ui](/docs/styles/postcss-preset)：

<InstallScript packages="postcss postcss-preset-ui postcss-simple-vars" dev></InstallScript>

> **PostCSS 配置**
>
> 如果你使用的框架未内置 PostCSS 支持，需要手动配置。请参考对应框架的文档。

创建 `postcss.config.cjs` 文件：

```js
module.exports = {
  plugins: {
    'postcss-preset-ui': {},
    'postcss-simple-vars': {
      variables: {
        'ui-breakpoint-xs': '36em',
        'ui-breakpoint-sm': '48em',
        'ui-breakpoint-md': '62em',
        'ui-breakpoint-lg': '75em',
        'ui-breakpoint-xl': '88em',
      },
    },
  },
};
```

## 引入样式

在应用根文件中引入样式（仅需引入一次）。例如在 Next.js pages router 的 `_app.tsx` 中：

```tsx
import '@xiaoye-react/ui/styles.css';
```

## 使用 UIProvider

使用 [UIProvider](/docs/theming/ui-provider/) 包裹应用：

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  /** 在此自定义主题 */
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* 你的应用 */}
    </UIProvider>
  );
}
```

如果你的应用使用服务端渲染，请在 `<head />` 中添加 [ColorSchemeScript](/docs/theming/color-schemes) 并将 `uiHtmlProps` 展开到 `<html />` 元素上，以避免 hydration 警告：

```tsx
import { ColorSchemeScript, uiHtmlProps } from '@xiaoye-react/ui';

function Demo() {
  return (
    <html lang="en" {...uiHtmlProps}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>我的超棒应用</title>
        <ColorSchemeScript />
      </head>
      <body>{/* 你的应用 */}</body>
    </html>
  );
}
```

一切就绪！现在你可以在应用中使用 ReactUI 组件了。

## 框架指南

如果你想将 ReactUI 添加到现有项目，或手动配置，请参考以下框架指南：

<FrameworksGuides></FrameworksGuides>

## VS Code 配置

默认情况下 VS Code 不识别 postcss 语法，建议安装 [PostCSS Intellisense and Highlighting](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-postcss) 扩展以启用语法高亮。

如需 CSS 变量自动补全，安装 [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables) 扩展，并在项目根目录创建 `.vscode/settings.json`：

```json
{
  "cssVariables.lookupFiles": [
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "node_modules/@xiaoye-react/ui/styles.css"
  ]
}
```

## 了解更多

在开始编码前，建议先了解 ReactUI 的主题和样式系统：

- [主题对象](/docs/theming/theme-object) — 了解可用的主题属性
- [颜色](/docs/theming/colors) — 了解如何添加/替换主题颜色
- [CSS 模块](/docs/styles/css-modules) — 了解如何在 ReactUI 中使用 CSS Modules
- [postcss-preset-ui](/docs/styles/postcss-preset) — 了解 postcss-preset-ui 的功能和混入
- [响应式样式](/docs/styles/responsive) — 了解如何为组件应用响应式样式
- [样式 API](/docs/styles/styles-api) — 了解如何为任意组件的内部元素添加样式
- [多态组件](/docs/guides/polymorphic) — 了解多态组件

## 许可证

ReactUI 基于 [MIT](https://github.com/xiaoye/react-ui/blob/main/LICENSE) 协议开源。
