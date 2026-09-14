---
category: Schedule
title: GettingStarted
subtitle: 快速上手
description: react-ui GettingStarted 文档。
---


## 安装

> **ℹ️ 发布状态**：`@xiaoye-react/schedule` 目前尚未发布到 npm，当前随本仓库源码提供（本文档内容与仓库实现一致）。包正式发布后，下述安装方式即可直接使用。

<InstallScript packages="@xiaoye-react/schedule @xiaoye-react/ui dayjs"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/style.css';
import '@xiaoye-react/schedule/styles.css';
// ‼️ 在核心包和 dates 包样式之后导入 schedule 样式
import '@xiaoye-react/schedule/styles.css';
```

## 不要忘记导入样式

按照上述说明安装后，某些功能仍然无法正常工作（schedule 组件没有样式且显示损坏）？
你掉入了未导入 schedule 样式的陷阱！
要修复此问题，请在应用根目录导入 schedule 样式：

```tsx
import '@xiaoye-react/schedule/styles.css';
```

## dayjs

`@xiaoye-react/schedule` 组件在底层使用 [dayjs](https://day.js.org/) 进行日期操作和格式化。
dayjs 是必需的依赖——你无法将其更改为其他日期库。如果你想在应用中使用不同的日期库，需要单独安装。
