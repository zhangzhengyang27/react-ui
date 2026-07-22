---
category: Charts
title: 图表入门
subtitle: Charts Getting Started
description: react-ui 图表组件入门指南。
---


## 安装

<InstallScript packages="@xiaoye-react/ui recharts"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/styles.css';
// ‼️ 图表样式必须在核心包样式之后导入
import '@xiaoye-react/ui/styles.css';
```

## 不要忘记导入样式

按照上面的安装说明操作后，某些功能仍然无法正常工作
（例如 tooltip 位置错乱或没有颜色）？
你掉入了未导入图表样式的陷阱！
要解决这个问题，请在应用根目录导入图表样式：

```tsx
import '@xiaoye-react/ui/styles.css';
```

## 基于 recharts

`@xiaoye-react/ui` 包中的大多数组件都基于 [recharts](https://recharts.org/) 库。
如果你需要 `@xiaoye-react/ui` 文档未涵盖的高级功能，
可以参考 [recharts 文档](https://recharts.org/en-US/api) 获取更多信息。
