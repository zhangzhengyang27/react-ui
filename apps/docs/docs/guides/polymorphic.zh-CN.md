---
category: Guides
title: Polymorphic
subtitle: 多态组件
description: react-ui Polymorphic 文档。
---


## 什么是多态组件

多态组件是指可以通过 `component` 属性更改其根元素的组件。
所有多态组件都有一个默认元素，在未提供 `component` 属性时使用。
例如，[Button](/components/button) 组件的默认元素是 `button`，
可以将其更改为 `a` 或任何其他元素或组件：

<code src="./polymorphic/demo/polymorphic.tsx"></code>

## renderRoot 属性

`renderRoot` 是 `component` 属性的替代方案，它接收一个应返回 React 元素的函数。
当无法使用 `component` 属性时（例如，你想传递给 `component` 的组件是泛型组件，
需要接受类型或从 props 推断类型，如 `<Link<'/'> />`），`renderRoot` 非常有用。

使用 `renderRoot` 属性的示例，效果与上一个示例相同：


**!important** 必须将 `props` 参数展开到根元素中。否则将没有样式，组件也可能无法访问。

```tsx
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button
      renderRoot={(props) => (
        <a href="https://react-ui.dev/" target="_blank" {...props} />
      )}
    >
      ReactUI website
    </Button>
  );
}
```

## 将多态组件作为其他 React 组件使用

你可以将任何其他 React 组件传递给 `component` 属性。
例如，可以传递 `react-router-dom` 的 `Link` 组件：

```tsx
import { Link } from 'react-router-dom';
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button component={Link} to="/react-router">
      React router link
    </Button>
  );
}
```

## 将多态组件作为 Next.js Link 使用

Next.js 的 Link 在不同 Next.js 版本中的工作方式与其他类似组件不同。

在 Next.js 12 及以下版本中：


在 Next.js 13 及以上版本中：

```tsx
import Link from 'next/link';
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Link href="/hello" passHref>
      <Button component="a">Next 链接按钮</Button>
    </Link>
  );
}
```

```tsx
import Link from 'next/link';
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button component={Link} href="/hello">
      Next link button
    </Button>
  );
}
```

## 多态组件与泛型组件

不能将泛型组件传递给 `component` 属性，因为无法从组件属性推断泛型类型。
例如，不能将 [类型化 Next.js Link](https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links)
传递给 `component` 属性，因为无法从中推断 `href` 的类型。组件本身可以正常工作，但你会遇到 TypeScript 错误。

要让泛型组件与多态组件一起工作，请使用 `renderRoot` 属性替代 `component`：

```tsx
import Link from 'next/link';
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button renderRoot={(props) => <Link href="/hello" {...props} />}>
      Typed Next link button
    </Button>
  );
}
```

## 多态组件与 react-router NavLink

[react-router-dom](https://reactrouter.com/en/main) 的 [NavLink](https://reactrouter.com/en/main/components/nav-link) 组件的
`className` 属性接受一个函数，你可以根据它为链接添加 active 类。这一特性与 ReactUI 的 `component` 属性不兼容，
但你可以改用 `renderRoot` 属性：

```tsx
import cx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button
      renderRoot={({ className, ...others }) => (
        <NavLink
          className={({ isActive }) =>
            cx(className, { 'active-class': isActive })
          }
          {...others}
        />
      )}
    >
      React router NavLink
    </Button>
  );
}
```

## 包装多态组件

非多态组件的 props 类型中包含 `React.ComponentProps<'x'>`，其中 `x` 是组件的根元素。
例如，[Container](/components/container) 组件不是多态的——它的根元素始终是 `div`，
因此其 props 类型包含 `React.ComponentProps<'div'>`。

多态组件的 props 类型中不包含 `React.ComponentProps<'x'>`，因为它们的根元素可以被更改，
因此 props 类型只能在组件渲染后才能推断。

为 ReactUI 多态组件创建非多态包装组件的示例：


为 ReactUI 多态组件创建多态包装组件的示例：

<code src="./polymorphic/demo/staticPolymorphic.tsx"></code>

<code src="./polymorphic/demo/createPolymorphic.tsx"></code>

## 动态 component 属性

你可以在 `component` 属性中使用动态值，但此时你需要手动提供类型，
或者通过向多态组件传递 `any` 类型参数来禁用类型检查：

```tsx
import { Box } from '@react-ui/ui';

function KeepTypes() {
  return (
    <Box<'input'>
      component={(Math.random() > 0.5 ? 'input' : 'div') as any}
    />
  );
}

function NukeTypes() {
  return (
    <Box<any> component={Math.random() > 0.5 ? 'input' : 'div'} />
  );
}
```

## 创建自定义多态组件

使用 `polymorphic` 函数和 [Box](/components/box) 组件创建新的多态组件：

<code src="./polymorphic/demo/newPolymorphic.tsx"></code>

## 使 ReactUI 组件变为多态

多态组件会给 tsserver 带来性能开销（不会影响运行时性能），
因此并非所有 ReactUI 组件都具有多态类型，但所有组件仍然接受 `component` 属性——根元素可以被更改。

要使 ReactUI 组件变为多态，请按照上一个示例的方式使用 `polymorphic` 函数：

```tsx
import { polymorphic, Group, GroupProps } from '@react-ui/ui';

const PolymorphicGroup = polymorphic<'button', GroupProps>(Group);

function Demo() {
  return (
    <PolymorphicGroup component="a" href="https://react-ui.dev" />
  );
}
```
