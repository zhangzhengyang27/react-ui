---
category: Dates
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

## 用法

安装 `@xiaoye-react/ui` 包并导入样式后，你就可以使用其中的所有组件：

<code src="./getting-started/demo/usage.tsx"></code>

## 字符串形式的日期值

`@xiaoye-react/ui` 组件使用日期字符串：`YYYY-MM-DD` 或 `YYYY-MM-DD HH:mm:ss`，具体取决于组件。这些字符串不包含任何时区相关信息。

## dayjs

`@xiaoye-react/ui` 组件底层使用 [dayjs](https://day.js.org/) 进行日期操作和格式化。
dayjs 是必需的依赖项——你不能将其更改为其他日期库。如果你想在应用中
使用不同的日期库，需要单独安装它。

## DatesProvider

`DatesProvider` 组件允许你设置各种在所有从 `@xiaoye-react/ui` 包导出的组件之间共享的设置。`DatesProvider` 支持以下设置：

- `locale` – dayjs 语言环境。注意，你还需要从 dayjs 导入相应的 locale 模块。默认值为 `en`。
- `firstDayOfWeek` – 0 到 6 之间的数字，其中 0 是星期日，6 是星期六。默认值为 1 – 星期一。
- `weekendDays` – 0 到 6 之间的数字数组，其中 0 是星期日，6 是星期六。默认值为 `[0, 6]` – 星期六和星期日。
- `consistentWeeks` – 布尔值。如果为 `true`，每个月都会有 6 周。默认值为 `false`。

## 固定周数

如果你想避免布局抖动，请在 `DatesProvider` 设置中设置 `consistentWeeks: true`。
这将确保每个月都有 6 周，即使外部日期不在同一个月内。

<code src="./getting-started/demo/consistentWeeks.tsx"></code>

## 自定义解析格式

某些组件（如 [DateInput](/docs/dates/date-input)）需要 [custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format)
dayjs 插件。在使用需要它的组件之前，你需要用此插件扩展 dayjs。注意，
这通常在你的应用根文件中完成一次，因此你不需要每次使用组件时都这样做。

```tsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
```

## 本地化和服务端组件

要添加本地化，你必须在应用中导入 `import 'dayjs/locale/x';`（`x` 是 locale 名称），
并在 `DatesProvider` 或每个组件上单独设置 `locale`。

在 DatesProvider 上设置 locale 的示例：

第一种写法在所有环境中都有效，Next.js app router 除外。
如果你使用 Next.js app router，你必须在导入 `dayjs/locale/x` 的文件顶部
添加 `'use client';`——locale 数据在客户端和服务端都是必需的。

```tsx
import 'dayjs/locale/ru';

import { DatesProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      {/* 你的应用  */}
    </DatesProvider>
  );
}
```

```tsx
'use client';

import 'dayjs/locale/ru';

import { DatesProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      {/* 你的应用  */}
    </DatesProvider>
  );
}
```
