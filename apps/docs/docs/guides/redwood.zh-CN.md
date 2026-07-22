---
category: Guides
title: Redwood
subtitle: Redwood
description: react-ui Redwood 文档。
---


## 创建新应用

按照 [Redwood 入门指南](https://redwoodjs.com/docs/quick-start) 创建新的 Redwood 应用：

```bash
yarn create redwood-app my-redwood-project --typescript
```

## 安装

**注意，建议使用 `yarn` 而不是 `npm` 安装依赖。**

安装依赖前，先进入 `web` 目录：


<PackagesInstallation></PackagesInstallation>

```bash
cd web
```

## PostCSS 配置

安装 PostCSS 插件和 [postcss-preset-ui](/docs/styles/postcss-preset)：

<InstallScript packages="postcss postcss-preset-ui postcss-simple-vars" dev></InstallScript>

在 `web` 目录中创建 `postcss.config.js` 文件，内容如下：

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

在 `web/src/App.tsx` 文件中添加样式导入、[UIProvider](/docs/theming/ui-provider) 和 [ColorSchemeScript](/docs/theming/color-schemes)：


配置完成！启动开发服务器：

```tsx
// 导入你已安装包的样式。
// 除 `@xiaoye-react/hooks` 外，所有包都需要导入样式
import '@xiaoye-react/ui/styles.css';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';
import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorSchemeScript />
      <UIProvider>
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </UIProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
```

```bash
yarn rw dev
```
