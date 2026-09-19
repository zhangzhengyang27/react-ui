---
category: Components
title: Tabs
subtitle: 标签页
description: react-ui Tabs 标签页组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要将内容按标签页切换展示，让用户在多个视图间切换时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 受控 Tabs

要控制 Tabs 的状态，请使用 `value` 和 `onChange` 属性：

```tsx
import { useState } from 'react';
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">第一面板</Tabs.Panel>
      <Tabs.Panel value="second">第二面板</Tabs.Panel>
    </Tabs>
  );
}
```

### 非受控 Tabs

若无需订阅 Tabs 的状态变化，请使用 `defaultValue`：

```tsx
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">第一面板</Tabs.Panel>
      <Tabs.Panel value="second">第二面板</Tabs.Panel>
    </Tabs>
  );
}
```

### 更改颜色

要更改所有标签页的颜色，请在 `Tabs` 组件上设置 `color`；要更改单个标签页的颜色，
请在 `Tabs.Tab` 上设置 `color`。

<code src="./demo/colors.tsx"></code>

### 标签页位置

要在相对侧显示标签页，请使用 `ml="auto"` 属性或 `className` 设置 `margin-left: auto`：

<code src="./demo/position.tsx"></code>

<code src="./demo/pull.tsx"></code>

### 禁用标签页

在 `Tabs.Tab` 组件上设置 `disabled` 属性以禁用某个标签页。
禁用的标签页无法通过鼠标或键盘激活，并且在使用方向键导航时会被跳过：

<code src="./demo/disabled.tsx"></code>

### 卸载非活动标签页

默认情况下，非活动的 `Tabs.Panel` 会保持挂载；要卸载非活动标签页，请在 Tabs 上设置 `keepMounted={false}`。
当希望在 `Tabs.Panel` 内部渲染影响性能的组件时，这很有用。注意，
渲染在 `Tabs.Panel` 内部的组件会在每次挂载（标签页切换）时重置其状态。

```tsx
import { Tabs } from '@xiaoye-react/ui';

// 第二个标签页面板仅在用户激活第二个标签页时才会挂载
function Demo() {
  return (
    <Tabs keepMounted={false} defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">第一面板</Tabs.Panel>
      <Tabs.Panel value="second">第二面板</Tabs.Panel>
    </Tabs>
  );
}
```

### 获取标签页控件 ref

```tsx
import { useRef } from 'react';
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  const secondTabRef = useRef<HTMLButtonElement>(null);

  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="Second" ref={secondTabRef}>
          第二个标签
        </Tabs.Tab>
        <Tabs.Tab value="third">第三个标签</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

### 作为链接的标签页

可使用 `renderRoot` 属性将 `Tabs.Tab` 渲染为 `a` 元素。这提供
原生链接行为：右键在新标签页中打开、中键点击，以及为爬虫和可访问性提供 `href`。


也可使用 `component` 属性将标签页渲染为链接：

```tsx
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Tab
          value="home"
          renderRoot={(props) => <a href="/home" {...props} />}
        >
          首页
        </Tabs.Tab>
        <Tabs.Tab
          value="about"
          renderRoot={(props) => <a href="/about" {...props} />}
        >
          关于
        </Tabs.Tab>
        <Tabs.Tab
          value="contacts"
          renderRoot={(props) => <a href="/contacts" {...props} />}
        >
          联系我们
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

```tsx
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home" component="a" href="/home">
          首页
        </Tabs.Tab>
        <Tabs.Tab value="about" component="a" href="/about">
          关于
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

### 与 Next.js 一起作为链接使用

使用 `renderRoot` 属性将 `Tabs.Tab` 渲染为 Next.js 的 `Link` 组件。需要使用 `renderRoot` 属性
而不是 `component`，因为 Next.js 的 `Link` 是泛型组件：

```tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  const pathname = usePathname();

  return (
    <Tabs value={pathname}>
      <Tabs.List>
        <Tabs.Tab
          value="/home"
          renderRoot={(props) => <Link href="/home" {...props} />}
        >
          首页
        </Tabs.Tab>
        <Tabs.Tab
          value="/about"
          renderRoot={(props) => <Link href="/about" {...props} />}
        >
          关于
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

### 与 React Router 一起作为链接使用

使用 `renderRoot` 属性将 `Tabs.Tab` 渲染为 React Router 的 `NavLink` 或 `Link` 组件：

```tsx
import {
  Link,
  Route,
  useLocation,
} from 'react-router-dom';
import { Tabs } from '@xiaoye-react/ui';

// 路由：<Route path="/tabs/:tabValue" element={<Demo />} />

function Demo() {
  const location = useLocation();

  return (
    <Tabs value={location.pathname}>
      <Tabs.List>
        <Tabs.Tab
          value="/tabs/first"
          renderRoot={(props) => (
            <Link to="/tabs/first" {...props} />
          )}
        >
          第一个标签
        </Tabs.Tab>
        <Tabs.Tab
          value="/tabs/second"
          renderRoot={(props) => (
            <Link to="/tabs/second" {...props} />
          )}
        >
          第二个标签
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

### 与 react-router 一起使用

```tsx
<Route path="/tabs/:tabValue" element={<Demo />} />
```

```tsx
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      value={tabValue}
      onChange={(value) => navigate(`/tabs/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

### 与 Next.js Pages Router 一起使用

```tsx
// 对应文件 /tabs/[activeTab].tsx
import { useRouter } from 'next/router';
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  const router = useRouter();

  return (
    <Tabs
      value={router.query.activeTab as string}
      onChange={(value) => router.push(`/tabs/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

### 与 Next.js App Router 一起使用

在 App Router 中，使用 `usePathname` Hook 从路径名获取当前标签页值，
并使用 `useRouter` 返回的路由器切换标签页。两个 Hook 都从 `next/navigation` 导入。
注意，使用这些 Hook 的组件必须是
[客户端组件](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
（在文件顶部添加 `'use client'` 指令）。




使用 Styles API 自定义标签页样式的示例：

```tsx
// 对应文件 /tabs/[activeTab]/page.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop();

  return (
    <Tabs
      value={activeTab}
      onChange={(value) => router.push(`/tabs/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">第一个标签</Tabs.Tab>
        <Tabs.Tab value="second">第二个标签</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

<code src="./demo/stylesApi.tsx"></code>

<code src="./demo/customize.tsx"></code>

### 与 Scroller 组件搭配使用

当标签页过多无法容纳在可用空间中时，使用 [Scroller](/components/scroller) 组件使标签页列表可滚动：

<code src="./demo/scroller.tsx"></code>

### 可访问性

Tabs 组件遵循关于可访问性的 [WAI-ARIA 建议](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html)。

### 作为链接的标签页

当 `Tabs.Tab` 渲染为链接（`<a>` 标签）时，`role="tab"` 属性会覆盖
隐式链接角色。屏幕阅读器会将该元素宣布为“标签页”而非“链接”。
这是 WAI-ARIA 规范所期望的行为。

当将标签页用作导航链接而不使用 `Tabs.Panel` 组件时，每个标签页上的 `aria-controls` 属性
会引用一个不存在于 DOM 中的面板元素。这是一个较小的
可访问性考虑因素——大多数屏幕阅读器都能优雅地处理这种情况。

若使用的 `Tabs.Tab` 没有文本内容，例如只有图标，请设置 `aria-label`
或使用 [VisuallyHidden](/components/visually-hidden) 组件：


要设置标签页列表的标签，请在 `Tabs.List` 组件上设置 `aria-label`；它会被屏幕阅读器朗读：

```tsx
import { CoinIcon } from '@phosphor-icons/react';
import { Tabs, VisuallyHidden } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        {/* 不需要 aria-label，标签页由子元素标记 */}
        <Tabs.Tab value="chat">聊天</Tabs.Tab>

        {/* 需要 aria-label，标签页没有子元素标记 */}
        <Tabs.Tab
          value="money"
          aria-label="获取资金"
          leftSection={<CoinIcon size={14} />}
        />

        {/* 可使用 VisuallyHidden 替代 aria-label */}
        <Tabs.Tab value="money" leftSection={<CoinIcon size={14} />}>
          <VisuallyHidden>获取资金</VisuallyHidden>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

```tsx
import { Tabs } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tabs defaultValue="recent">
      {/* Tabs.List 的 aria-label 会在标签页首次获得焦点时朗读 */}
      <Tabs.List aria-label="聊天">
        <Tabs.Tab value="recent">最近</Tabs.Tab>
        <Tabs.Tab value="recent">未回复</Tabs.Tab>
        <Tabs.Tab value="archived">已归档</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

<StylesApiSelectors component="Tabs"></StylesApiSelectors>



## API {#api}

### TabsProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前激活项（受控） | `string` | — |
| defaultValue | 默认激活项 | `string` | — |
| onChange | 激活项变化回调 | `(value: string) => void` | — |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| variant | 视觉变体 | `'default' \| 'outline' \| 'pills'` | `'default'` |
| color | 主题色 | `UIColor` | `'blue'` |
| radius | 圆角 | `UIRadius` | — |
| keepMounted | 是否保持所有面板挂载 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
