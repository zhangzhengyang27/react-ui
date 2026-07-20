---
category: Guides
title: Gatsby
subtitle: Gatsby
description: react-ui Gatsby 文档。
---


## 创建新应用

按照 [Gatsby 快速入门](https://www.gatsbyjs.com/docs/quick-start/) 指南
创建新的 Gatsby 应用：

<NpmScript yarnScript="yarn create gatsby" npmScript="npm init gatsby"></NpmScript>

当询问“Would you like to install a styling system?”时，选择 `PostCSS`。

## 安装

<PackagesInstallation></PackagesInstallation>

## PostCSS 配置

安装 PostCSS 插件和 [postcss-preset-ui](/docs/styles/postcss-preset)：

<InstallScript packages="postcss postcss-preset-ui postcss-simple-vars" dev></InstallScript>

在应用根目录创建 `postcss.config.cjs` 文件，内容如下：

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

## 配置

创建 `src/theme.ts` 文件，包含你的主题覆盖：


创建 `gatsby-ssr.tsx` 文件，内容如下：


创建 `gatsby-browser.tsx` 文件，内容如下：


配置完成！启动开发服务器：

```tsx
// src/theme.ts
import { createTheme } from '@react-ui/ui';

export const theme = createTheme({
  fontFamily: 'serif',
  // ... 其他主题覆盖属性
});
```

```tsx
import { ColorSchemeScript, UIProvider } from '@react-ui/ui';
import { theme } from './src/theme';

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  replaceHeadComponents([
    ...headComponents,
    <ColorSchemeScript key="color-scheme-script" />,
  ]);
};

export const wrapPageElement = ({ element }) => {
  return <UIProvider theme={theme}>{element}</UIProvider>;
};
```

```tsx
// 导入你已安装包的样式。
// 除 `@react-ui/hooks` 外，所有包都需要导入样式
import '@react-ui/ui/styles.css';

import { UIProvider } from '@react-ui/ui';
import { theme } from './src/theme';

export const wrapPageElement = ({ element }) => {
  return <UIProvider theme={theme}>{element}</UIProvider>;
};
```

```bash
npm run develop
```

## CSS 模块

默认情况下，Gatsby 使用不同的 CSS 模块导入语法：

```tsx
// 默认语法——在 Gatsby 中无法使用
import classes from './Demo.module.css';

// Gatsby 语法
import * as classes from './Demo.module.css';
```
