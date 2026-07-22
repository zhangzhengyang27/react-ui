---
category: X
title: Nprogress
subtitle: 进度条
description: react-ui Nprogress 文档。
---


## 安装

<InstallScript packages="@xiaoye-react/ui"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/styles.css';
// ‼️ nprogress 样式必须在核心包样式之后导入
import '@xiaoye-react/ui/styles.css';
```

## 设置 NavigationProgress

在 [UIProvider](/docs/theming/ui-provider/) 内的任意位置渲染 `NavigationProgress` 组件：

```tsx
import { UIProvider } from '@xiaoye-react/ui';
import { NavigationProgress } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider>
      <NavigationProgress />
      {/* 你的应用内容 */}
    </UIProvider>
  );
}
```

## 用法

<code src="./nprogress/demo/usage.tsx"></code>
