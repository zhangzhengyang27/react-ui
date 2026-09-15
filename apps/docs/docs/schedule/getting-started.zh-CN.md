---
category: Schedule
title: GettingStarted
subtitle: 快速上手
description: react-ui GettingStarted 文档。
---


## 安装

<InstallScript packages="@xiaoye-react/ui dayjs"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/style.css';
```

## dayjs

`@xiaoye-react/ui` 组件在底层使用 [dayjs](https://day.js.org/) 进行日期操作和格式化。
dayjs 是必需的依赖——你无法将其更改为其他日期库。如果你想在应用中使用不同的日期库，需要单独安装。
