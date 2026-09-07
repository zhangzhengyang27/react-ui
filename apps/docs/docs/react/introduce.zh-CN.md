---
order: 0
title: react-ui 介绍
---

`react-ui` 是小叶维护的 React UI 组件库，基于 CSS Modules 与工厂模式构建，提供简洁、可定制、可访问的通用组件，适合中后台产品与前台桌面网站。

---

## ✨ 特性

- 📦 开箱即用的高质量 React 组件，覆盖通用、布局、表单、反馈、数据展示等场景。
- 🎨 主题系统基于 CSS 变量，统一使用 `--ui-*` 前缀，支持 light / dark 双主题切换。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 🧩 组件采用工厂模式 + CSS Modules，组件 props 继承自 `ElementProps`，完整支持 HTML 属性。
- 🪝 配套提供 `@xiaoye-react/hooks` 工具钩子集合，覆盖常见状态管理场景。
- 📊 内置 charts 图表组件（基于 recharts）与 form 表单方案。

## 兼容环境

- 现代浏览器（Chrome / Edge / Firefox / Safari 最近两个稳定版本）
- 支持服务端渲染
- [Electron](https://www.electronjs.org/)

| Edge | Firefox | Chrome | Safari | Electron |
| --- | --- | --- | --- | --- |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

> `react-ui` 要求 React >= 18。

## 版本

- 稳定版：[![npm package](https://img.shields.io/npm/v/@xiaoye-react/ui.svg?style=flat-square)](https://www.npmjs.org/package/@xiaoye-react/ui)

## 安装

### 使用 npm 或 yarn 或 pnpm 安装

**推荐使用 [pnpm](https://pnpm.io/zh/) 进行开发**，也可使用 npm / yarn。

<InstallDependencies npm='$ npm install @xiaoye-react/ui @xiaoye-react/hooks --save' yarn='$ yarn add @xiaoye-react/ui @xiaoye-react/hooks' pnpm='$ pnpm install @xiaoye-react/ui @xiaoye-react/hooks --save'></InstallDependencies>

### 浏览器引入

`react-ui` 主要面向打包器使用，不推荐通过 `script` 标签直接引入。

## 示例

```jsx
import React from 'react';
import { Button, TextInput } from '@xiaoye-react/ui';

const App = () => {
  return (
    <>
      <Button>Click me</Button>
      <TextInput placeholder="请输入" />
    </>
  );
};

export default App;
```

## 按需加载

`@xiaoye-react/ui` 默认通过 `package.json` 的 `exports` 字段提供 ESM 产物，主流打包器（webpack、mako、vite、esbuild）会自动按需加载你导入的组件，无需额外配置 babel-plugin-import 之类的工具。

## TypeScript

`react-ui` 使用 TypeScript 编写并在 `package.json` 的 `types` 字段提供完整类型定义，无需额外安装 `@types/react-ui`。

## 链接

- [首页](/)
- [组件总览](/components/overview)
- [快速上手](/docs/react/getting-started)
- 更新日志
