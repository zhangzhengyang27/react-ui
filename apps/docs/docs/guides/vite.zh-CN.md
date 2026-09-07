---
category: Guides
title: Vite
subtitle: Vite
description: react-ui Vite 文档。
---


## 创建新应用

按照 [Vite 入门指南](https://vitejs.dev/guide/) 创建新的 Vite 应用：

<NpmScript yarnScript="yarn create vite" npmScript="npm create vite@latest"></NpmScript>

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

在应用根组件（通常是 `App.tsx`）中添加样式导入和 [UIProvider](/docs/theming/ui-provider)：


配置完成！启动开发服务器：

```tsx
// 导入你已安装包的样式。
// 除 `@xiaoye-react/hooks` 外，所有包都需要导入样式
import '@xiaoye-react/ui/style.css';

import { UIProvider } from '@xiaoye-react/ui';

export default function App() {
  return <UIProvider>{/* 你的应用内容 */}</UIProvider>;
}
```

```bash
npm run dev
```
