---
category: Styles
title: StylesApi
subtitle: Styles API
description: react-ui StylesApi 文档。
---


## 什么是 Styles API

Styles API 是一组 props 和技术，允许你自定义 ReactUI 组件内部任何元素的样式——可以使用内联样式，也可以使用 [theme object](/docs/theming/theme-object)。所有具有样式的 ReactUI 组件都支持 Styles API。

## Styles API 选择器

每个支持 Styles API 的 ReactUI 组件都有一组元素名称，可用于将样式应用于组件内部的内部元素。为简单起见，这些元素名称在 ReactUI 文档中被称为选择器。你可以在组件文档的 `Styles API` 标签下找到选择器信息。

[Button](/components/button) 组件选择器的示例：

> 完整的选择器列表请参考 [Button 组件的 Styles API](/components/button#api)。

你可以在组件 props 和 `theme.components` 中的 `classNames` 和 `styles` 中使用这些选择器：

```tsx
import { Button, createTheme, UIProvider } from '@xiaoye-react/ui';

function ClassNamesDemo() {
  return (
    <Button
      classNames={{
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      }}
    >
      Button
    </Button>
  );
}

function StylesDemo() {
  return (
    <Button
      styles={{
        root: { backgroundColor: 'red' },
        label: { color: 'blue' },
        inner: { fontSize: 20 },
      }}
    >
      Button
    </Button>
  );
}

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      },
      styles: {
        root: { backgroundColor: 'red' },
        label: { color: 'blue' },
        inner: { fontSize: 20 },
      },
    }),
  },
});

function ProviderDemo() {
  return (
    <UIProvider theme={theme}>
      <Button>按钮</Button>
    </UIProvider>
  );
}
```

## classNames prop

通过 `classNames` prop，你可以为 ReactUI 组件的内部元素添加 class。它接受一个以元素名称为键、class 为值的对象：

<code src="./styles-api/demo/classNames.tsx"></code>

## theme.components 中的 classNames

你也可以在 [`theme.components`](/docs/theming/theme-object) 中定义 `classNames`，以将它们应用于特定类型的所有组件：

```tsx
import { useState } from 'react';
import {
  createTheme,
  UIProvider,
  TextInput,
} from '@xiaoye-react/ui';
// 样式与上一个示例相同
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: {
        root: classes.root,
        input: classes.input,
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

## 组件 CSS 变量

大多数 ReactUI 组件使用 CSS 变量来定义颜色、大小、内边距和其他属性。你可以使用 [theme.components](/docs/theming/theme-object) 中的自定义 CSS 变量解析器函数，或将其传递给 `vars` prop 来覆盖这些值。

你可以在组件文档的 `Styles API` 标签下找到 CSS 变量信息。[Button](/components/button) 组件 CSS 变量的示例：

> 完整的 CSS 变量列表请参考 [Button 组件的 Styles API](/components/button#api)。

使用自定义 CSS 变量解析器函数为 [Button](/components/button) 组件添加更多尺寸的示例：

<code src="./styles-api/demo/vars.tsx"></code>

## styles prop

`styles` prop 的工作方式与 `classNames` 相同，但应用的是内联样式。注意，内联样式的特异性高于 class，因此如果不使用 `!important`，你将无法通过 class 覆盖它们。你不能在 `styles` prop 中使用伪类（例如 `:hover`、`:first-of-type`）和媒体查询。


> **styles prop 的使用**
>
> 文档中的一些示例和演示使用 `styles` prop 是为了方便，但不建议将 `styles` prop 作为样式化组件的主要方式，因为 `classNames` prop 更灵活且具有[更好的性能](/docs/styles/styles-performance)。

<code src="./styles-api/demo/styles.tsx"></code>

## 基于组件 props 的 Styles API

你还可以向 `classNames` 和 `styles` 传递回调函数。该函数接收 [theme](/docs/theming/theme-object) 作为第一个参数，组件 props 作为第二个参数。它应该返回一个 class 对象（用于 `classNames`）或样式对象（用于 `styles`）。

你可以使用此功能根据组件 props 有条件地应用样式。例如，如果输入框是 required，你可以更改 [TextInput](/components/text-input) 的标签颜色，或者如果输入错误，你可以更改输入框背景颜色：

<code src="./styles-api/demo/classNamesProps.tsx"></code>

## 静态 classes

每个支持 Styles API 的组件都包含可用于不使用 `classNames` 或 `styles` props 样式化组件的静态 class。默认情况下，静态 class 采用 `.ui-{ComponentName}-{selector}` 格式。例如，[Button](/components/button) 组件的 `root` 选择器将具有 `.ui-Button-root` class。

你可以使用静态 class 通过 CSS 或[任何其他样式解决方案](/docs/styles/css-modules#styling-without-css-modules)来样式化组件：


静态 class 的前缀可以通过 [UIProvider](/docs/theming/ui-provider#classnamesprefix) 的 `classNamesPrefix` 更改。

```css
.ui-Button-root {
  background-color: red;
}
```

## 组件 classes

每个组件的 class 都可以在 `Component.classes` 对象中找到。例如，你可以在 `Button.classes` 中找到 [Button](/components/button) 的 class：

<DataTable head={['Key', 'Class']} data={Object.keys(Button.classes).map((key) => [ key, Button.classes[key], ])}></DataTable>

你可以使用这些 class 创建与 ReactUI 组件样式相同的组件：

```tsx
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return <button type="button" className={Button.classes.root} />;
}
```

## 属性

你可以使用 `attributes` prop 将属性传递给 ReactUI 组件的内部元素。例如，它可以用于为测试目的添加 data attributes：

```tsx
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Button
      attributes={{
        root: { 'data-test-id': 'root' },
        label: { 'data-test-id': 'label' },
        inner: { 'data-test-id': 'inner' },
      }}
    >
      Button
    </Button>
  );
}
```
