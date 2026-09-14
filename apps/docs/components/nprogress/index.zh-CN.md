---
category: Components
title: Nprogress
subtitle: 进度条
description: react-ui Nprogress 文档。
group:
  title: 反馈
  order: 6
---


## 安装

> **⚠️ 尚未发布到 npm**：该组件位于仓库内的 `@xiaoye-react/nprogress` 包中，此包还没有发布到 npm。组件源码随本仓库提供，发布后此处会更新安装方式。


安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/style.css';
// ‼️ nprogress 样式必须在核心包样式之后导入
import '@xiaoye-react/nprogress/styles.css';
```

## 设置 NavigationProgress

在 [UIProvider](/docs/theming/ui-provider/) 内的任意位置渲染 `NavigationProgress` 组件：

```tsx
import { UIProvider } from '@xiaoye-react/ui';
import { NavigationProgress } from '@xiaoye-react/nprogress';

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

<code src="./demo/usage.tsx"></code>
