---
category: Guides
title: Next
subtitle: Next.js
description: react-ui Next 文档。
---


## 创建新应用

按照 [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app) 指南
创建新的 Next.js 应用：

<NpmScript yarnScript="yarn create next-app --typescript" npmScript="npx create-next-app@latest --typescript"></NpmScript>

## 安装

<PackagesInstallation></PackagesInstallation>

## PostCSS 配置

安装 PostCSS 插件和 [postcss-preset-ui](/docs/styles/postcss-preset)：

<InstallScript packages="postcss postcss-preset-ui postcss-simple-vars" dev></InstallScript>

在应用根目录创建 `postcss.config.cjs` 文件，内容如下：

```js
module.exports = {
  plugins: {
    'postcss-preset-ui': {},
    'postcss-simple-vars': {
      variables: {
        'ui-breakpoint-xs': '36em',
        'ui-breakpoint-sm': '48em',
        'ui-breakpoint-md': '62em',
        'ui-breakpoint-lg': '75em',
        'ui-breakpoint-xl': '88em',
      },
    },
  },
};
```

## 使用 Pages Router 配置

在 `pages/_app.tsx` 文件中添加样式导入和 [UIProvider](/docs/theming/ui-provider)：


创建包含 [ColorSchemeScript](/docs/theming/color-schemes) 组件的 `pages/_document.tsx` 文件。
注意，即使你的应用只使用一种颜色方案，也需要此文件。


配置完成！启动开发服务器：

```tsx
// 导入你已安装包的样式。
// 除 `@xiaoye-react/hooks` 外，所有包都需要导入样式
import '@xiaoye-react/ui/style.css';

import type { AppProps } from 'next/app';
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  /** 在此放置你的 ui 主题覆盖 */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider theme={theme}>
      <Component {...pageProps} />
    </UIProvider>
  );
}
```

```tsx
import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@xiaoye-react/ui';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

```bash
npm run dev
```

## 使用 App Router 配置

在 `app/layout.tsx` 文件中添加 [UIProvider](/docs/theming/ui-provider)、[ColorSchemeScript](/docs/theming/color-schemes)
和样式导入：


配置完成！启动开发服务器：

```tsx
// 导入你已安装包的样式。
// 除 `@xiaoye-react/hooks` 外，所有包都需要导入样式
import '@xiaoye-react/ui/style.css';

import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';

export const metadata = {
  title: 'My ReactUI app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
```

```bash
npm run dev
```

## 同时使用 app 和 pages router

如果在一个应用中同时使用 app 和 pages router，你需要按照上面的说明同时配置 `pages/_app.tsx`
和 `app/layout.tsx` 文件。

## 在多态组件中使用 Next.js Link

```tsx
import Link from 'next/link';
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Button component={Link} href="/hello">
      Next link button
    </Button>
  );
}
```

## 服务端组件

所有 ReactUI 组件都需要上下文以支持[默认属性](/docs/theming/default-props)
和 [Styles API](/docs/styles/styles-api)。ReactUI 组件不能用作服务端组件。
这意味着组件会在服务端和客户端同时渲染。

三个可发布包（`@xiaoye-react/ui`、`@xiaoye-react/hooks`、`@xiaoye-react/pro`）的 ESM 入口
（`es/index.js`）顶部都带 `'use client';` 指令——你不需要在页面/布局/组件中额外添加它。

该指令只加在 ESM 产物上：CJS 入口以 `'use strict'` 开头，再前面插一条指令序言会静默让
`'use strict'` 退化成普通表达式、丢掉严格模式。Next.js 的 RSC 分析走 ESM 路径，因此不受影响。

## 在服务端组件中使用复合组件

某些组件（如 [Popover](/components/popover)）有关联的复合组件（`Component.XXX`），
其中 `XXX` 是复合组件名称。复合组件不能在服务端组件中使用。
相反，请使用 `ComponentXXX` 语法，或在文件顶部添加 `'use client';` 指令。

在服务端组件中无法工作的示例：


使用 `'use client';` 指令的示例：


使用 `ComponentXXX` 语法的示例：

```tsx
import { Popover } from '@xiaoye-react/ui';

// 这会抛出错误
export default function Page() {
  return (
    <Popover>
      <Popover.Target>目标</Popover.Target>
      <Popover.Dropdown>下拉</Popover.Dropdown>
    </Popover>
  );
}
```

```tsx
'use client';

import { Popover } from '@xiaoye-react/ui';

// 不会报错
export default function Page() {
  return (
    <Popover>
      <Popover.Target>目标</Popover.Target>
      <Popover.Dropdown>下拉</Popover.Dropdown>
    </Popover>
  );
}
```

```tsx
import {
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@xiaoye-react/ui';

// 不会报错
export default function Page() {
  return (
    <Popover>
      <PopoverTarget>触发器</PopoverTarget>
      <PopoverDropdown>下拉</PopoverDropdown>
    </Popover>
  );
}
```

## App Router 摇树优化

要在 App Router 中启用摇树优化，请在 `next.config.mjs` 中开启实验性的 `optimizePackageImports` 功能：

```tsx
export default {
  // ...其他配置
  experimental: {
    optimizePackageImports: ['@xiaoye-react/ui', '@xiaoye-react/hooks'],
  },
};
```

## 水合与时钟相关的默认值

`Schedule` / `ResourcesSchedule` 不给 `date`（或 `defaultDate`）时，会把**当前时刻**当作
默认锚点日；`Calendar` 的"今天"高亮、`MonthYearSelect` 的年份列表同理。服务端与客户端
各自求值时，一旦跨日或跨年（例如服务端跑 UTC、用户在 UTC+8 的午夜附近），两边就会渲染出
不同的日期，React 会报水合差异。

这类差异**没法在组件内部消除**：延后到挂载后再求值，只是把"属性不一致"换成"水合完成后
内容突变"。因此请在使用 SSR 时显式传值，让两边从同一个日期出发：

```tsx
'use client'

import { Schedule } from '@xiaoye-react/ui'

// ✅ 由应用决定锚点日，服务端与客户端拿到同一个值
<Schedule date="2026-09-22" onDateChange={setDate} />

// ✅ 或者受控模式下用状态初始化，初始值来自一个双方一致的来源（如 URL、后端返回）
<Schedule defaultDate={props.initialDate} />
```

组件内已经对**属性级**的时钟依赖做了处理（例如日期格的 `data-today` 用
`suppressHydrationWarning` 抑制，`CurrentTimeIndicator` 在挂载前不渲染），
但由时间派生的整块内容不属于能"抑制"的范围。

## 故障排除

如果你在 Next.js 应用中使用 ReactUI 时遇到任何问题，请查看
[GitHub Discussions](https://github.com/zhangzhengyang27/react-ui/discussions)，其中涵盖了
与 App Router 和服务端组件相关的最常见问题。
