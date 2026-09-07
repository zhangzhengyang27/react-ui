---
category: Guides
title: ReactRouter
subtitle: React Router
description: react-ui ReactRouter 文档。
---


## 创建新应用

按照 [React Router 入门指南](https://reactrouter.com/start/framework/installation) 创建新的 React Router 应用：

```bash
npx create-react-router@latest my-react-router-app
```

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

在 `app/root.tsx` 中添加样式导入、[UIProvider](/docs/theming/ui-provider/) 和 [ColorSchemeScript](/docs/theming/color-schemes)：


配置完成！启动开发服务器：

```tsx
// 导入你已安装包的样式。
// 除 `@xiaoye-react/hooks` 外，所有包都需要导入样式
import '@xiaoye-react/ui/style.css';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <UIProvider>{children}</UIProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ... 其他 app/root.tsx 内容
```

```bash
npm run dev
```
