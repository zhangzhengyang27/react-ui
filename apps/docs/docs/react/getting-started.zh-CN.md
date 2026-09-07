---
group:
  title: 如何使用
  order: 0
order: 0
title: 快速上手
---

本文档介绍如何在 React 项目中安装和使用 react-ui。

> 在阅读本文档之前，建议先掌握 [React](https://react.dev) 的基础知识，并确保本地环境已安装 [Node.js](https://nodejs.org/) 18 或更高版本。

---

## 第一个示例

### 1. 创建项目

使用 Vite 创建 React + TypeScript 项目：

```bash
npm create vite@latest react-ui-demo -- --template react-ts
cd react-ui-demo
```

### 2. 安装 react-ui

```bash
npm install @xiaoye-react/ui @xiaoye-react/hooks
```

### 3. 使用组件

在 `src/App.tsx` 中引入并渲染 react-ui 组件：

```tsx
import { Button, Stack, TextInput, UIProvider } from '@xiaoye-react/ui';

function App() {
  return (
    <UIProvider>
      <Stack gap="md" p="md">
        <Button>提交</Button>
        <TextInput placeholder="请输入内容" />
      </Stack>
    </UIProvider>
  );
}

export default App;
```

### 4. 启动开发服务器

```bash
npm run dev
```

开发服务器启动后，在浏览器中访问 http://localhost:5173/，即可看到页面中渲染的 Button 和 TextInput 组件。

## 探索更多

- [组件总览](/components/overview)：查看全部可用组件。
- [Hooks 集合](/docs/hooks/package)：查看全部工具 Hook。
- 更新日志：查看版本发布记录（见仓库 CHANGELOG.zh-CN.md）。

## TypeScript

react-ui 使用 TypeScript 编写，并提供完整的类型定义。组件 Props 继承自 `ElementProps`，因此支持对应原生 HTML 元素的所有属性。

```tsx
import type { ButtonProps } from '@xiaoye-react/ui';
```

## 主题

react-ui 内置 light 与 dark 两种主题，通过 `UIProvider` 的 `defaultColorScheme` 属性切换：

```tsx
<UIProvider defaultColorScheme="dark">
  <App />
</UIProvider>
```

CSS 变量统一使用 `--ui-*` 前缀，详见 [主题对象](/docs/theming/theme-object)。
