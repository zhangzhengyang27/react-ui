---
category: Guides
title: Storybook
subtitle: Storybook
description: react-ui Storybook 文档。
---


## 将 Storybook 添加到你的应用

如果你的应用中已经有 Storybook，可以跳过这一步。

按照 [Storybook 入门](https://storybook.js.org/docs/react/get-started/install/) 指南将 Storybook 添加到你的应用中：

```bash
npx storybook@latest init
```

## 配置插件

安装 `@storybook/addon-themes` 插件：

<InstallScript packages="@storybook/addon-themes" dev></InstallScript>

在 `.storybook/main.ts` 中添加插件：

```tsx
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // ... 其他配置项
  addons: ['@storybook/addon-themes'],
};

export default config;
```

## 主题对象

要在应用和 Storybook 之间共享 [theme 对象](/docs/theming/theme-object)，请创建一个 `src/theme.ts`（或应用中的其他路径）文件来覆盖主题：


然后你可以在应用和 Storybook 中使用相同的主题：

```tsx
// src/theme.ts
import { createTheme } from '@xiaoye-react/ui';

export const theme = createTheme({
  fontFamily: 'serif',
  // ... 其他主题覆盖属性
});
```

```tsx
// 在你的应用中

import { UIProvider } from '@xiaoye-react/ui';
import { theme } from './theme';

function App() {
  return <UIProvider theme={theme}>{/* ... */}</UIProvider>;
}
```

## Storybook 预览

如果 `.storybook/preview.tsx` 文件不存在，请创建它并添加以下内容：


全部完成！启动 Storybook：

```tsx
// 导入你已安装的包样式
// 除 @xiaoye-react/hooks 外，所有包都需要导入样式
import '@xiaoye-react/ui/style.css';

import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';
import { theme } from '../theme';

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
    storySort: (a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }),
  },
  backgrounds: { disable: true },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'ReactUI color scheme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

export const decorators = [
  (renderStory: any, context: any) => {
    const scheme = (context.globals.theme || 'light') as 'light' | 'dark';
    return (
      <UIProvider theme={theme} forceColorScheme={scheme}>
        <ColorSchemeScript />
        {renderStory()}
      </UIProvider>
    );
  },
];
```

```bash
npm run storybook
```
