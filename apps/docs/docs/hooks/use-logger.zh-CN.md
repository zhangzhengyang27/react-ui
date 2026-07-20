---
category: Hooks
title: UseLogger
subtitle: 日志
description: react-ui 日志 Hook 文档。
---


## 用法

`use-logger` Hook 在组件每次渲染时将给定值记录到控制台。
打开 DevTools 以在控制台中查看状态变化：

<code src="./use-logger/demo/usage.tsx"></code>

## 类型定义

```tsx
function useLogger(componentName: string, props: any[]): any;
```
