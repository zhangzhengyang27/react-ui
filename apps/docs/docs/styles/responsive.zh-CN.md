---
category: Styles
title: Responsive
subtitle: 响应式
description: react-ui Responsive 文档。
---


## 媒体查询

<code src="./responsive/demo/responsive.tsx"></code>

## 配置断点

`theme.breakpoints` 用于所有响应式 ReactUI 组件。断点应以 `em` 单位设置。你可以使用 [UIProvider](/docs/theming/ui-provider/) 配置这些值：


`theme.breakpoints` 的默认值：

<DataTable head={['Breakpoint', 'Viewport width', 'Value in px']} data={Object.keys(DEFAULT_THEME.breakpoints).map((size) => [ size, `${DEFAULT_THEME.breakpoints[size]}`, `${px(DEFAULT_THEME.breakpoints[size])}px`, ])}></DataTable>

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
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

## CSS modules 中的断点变量

不能在媒体查询中使用 CSS 变量——这些值无法由 [UIProvider](/docs/theming/ui-provider) 动态生成。要在 `.css` 文件中使用 ReactUI 主题断点，你需要 `postcss-simple-vars` 包：

<InstallScript dev packages="postcss-simple-vars"></InstallScript>

在你的 [PostCSS 配置](/docs/styles/postcss-preset) 的 `postcss.config.cjs` 中添加它：


然后你就可以在 `.css` 文件中访问这些变量：


将被转换为：


> **不支持动态断点**
>
> `postcss-simple-vars` 配置中定义的值是静态的，与[主题](/docs/theming/theme-object)无关——如果值发生变化，你需要在主题覆盖和 postcss 配置中手动更新它们。

```js
module.exports = {
  plugins: {
    '<内置插件>': {},
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

```css
.demo {
  @media (max-width: $ui-breakpoint-xs) {
    background-color: red;
  }
}
```

```css
@media (max-width: 36em) {
  .demo {
    background-color: red;
  }
}
```

## hiddenFrom 和 visibleFrom props

所有具有根元素的 ReactUI 组件都支持 `hiddenFrom` 和 `visibleFrom` props。这些 props 接受一个断点（`xs`、`sm`、`md`、`lg`、`xl`），并在视口宽度小于或大于指定断点时隐藏组件：

<code src="./responsive/demo/hiddenVisible.tsx"></code>

## 作为 class 的 Hidden 和 visible from

如果你正在构建自定义组件，并希望使用与 `hiddenFrom` 和 `visibleFrom` props 相同的逻辑，但不想使用 ReactUI 组件，你可以使用 `ui-hidden-from-{x}` 和 `ui-visible-from-{x}` class。

```tsx
function CustomComponent() {
  return (
    <>
      <div className="ui-hidden-from-md">从 md 隐藏</div>
      <div className="ui-visible-from-xl">从 xl 可见</div>
    </>
  );
}
```

## 基于媒体查询的组件尺寸

某些组件支持 `size` prop，它会改变组件外观的各个方面。`size` prop 不是响应式的——无法为不同屏幕尺寸定义不同的组件尺寸。相反，你可以渲染多个不同尺寸的组件，并根据 `className` 或 `hiddenFrom`/`visibleFrom` props 的媒体查询显示/隐藏它们：

<code src="./responsive/demo/sizesMedia.tsx"></code>

## use-media-query hook

你可以使用 [use-media-query hook](/docs/hooks/use-media-query/) 根据媒体查询更改某些组件 props。注意，如果你的应用中有 ssr（你使用 Next.js、React Router、Gatsby 或任何包含 ssr 的框架），则不推荐在大多数情况下使用这种方法，因为它可能导致 hydration 不匹配。如果你的应用中没有 ssr（例如，如果你使用 Vite），那么你可以安全地使用此 hook 根据返回值更改组件 props 或有条件地渲染组件。

[use-media-query hook](/docs/hooks/use-media-query/) 可以安全地用于更改未在服务端渲染的组件的 props（modals、tooltips 等）。在以下示例中，使用 `useMediaQuery` hook 更改 [Tooltip](/components/tooltip) props 是安全的，因为它未在服务端渲染：

<code src="./responsive/demo/useMediaQueryHook.tsx"></code>

## use-matches hook

`use-matches` hook 是从 `@xiaoye-react/ui` 导出的 [use-media-query](/docs/hooks/use-media-query/) 的替代方案，如果你需要匹配多个媒体查询和值。它接受一个以媒体查询为键、以给定断点处的值为值的对象。

注意，`use-matches` hook 底层使用与 [use-media-query](/docs/hooks/use-media-query/) 相同的逻辑，不建议将其作为主要响应式样式来源，特别是如果你的应用中有 ssr。

在以下示例中：

- 从 `theme.breakpoints.lg` 开始，颜色将为 `red.9`
- 在 `theme.breakpoints.sm` 和 `theme.breakpoints.lg` 之间，颜色将为 `orange.9`
- 低于 `theme.breakpoints.sm` 时，颜色将为 `blue.9`

<code src="./responsive/demo/useMatchesHook.tsx"></code>

## 容器查询

[容器查询](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries) 允许你根据元素容器的大小将样式应用于元素。例如，如果容器在周围上下文中可用空间较少，你可以隐藏某些元素或使用更小的字体。容器查询在[所有现代浏览器](https://caniuse.com/css-container-queries)中都得到支持。

你可以在容器查询中使用 [postcss preset](/docs/styles/postcss-preset/#remem-functions) 的 `rem` 和 `em` 函数。注意，CSS 变量在容器查询中不起作用，因此 [rem scaling](/docs/styles/rem/#rem-units-scaling) 功能不可用。如果你依赖此功能，最好使用 `px` 单位定义断点。

<code src="./responsive/demo/containers.tsx"></code>

## 响应式 style props

你可以使用对象语法通过 [style props](/docs/styles/style-props) 添加响应式样式。注意，响应式 style props 的[性能低于](/docs/styles/styles-performance)普通 style props，不建议在大量元素列表中使用它们。


响应式值的计算方式如下：

- 当没有任何断点值匹配时，使用 `base` 值
- 当视口宽度大于 [theme.breakpoints](/docs/styles/responsive/) 中对应断点的值时，使用 `xs`、`sm`、`md`、`lg`、`xl` 值


在这种情况下，元素将拥有以下样式：

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return <Box w={{ base: 320, sm: 480, lg: 640 }} />;
}
```

```css
/* 基础样式添加到元素上，然后被响应式值覆盖 */
.element {
  width: 20rem;
}

/* 48em 是默认的 theme.breakpoints.sm */
@media (min-width: 48em) {
  .element {
    width: 30rem;
  }
}

/* 75em 是默认的 theme.breakpoints.lg */
@media (min-width: 75em) {
  .element {
    width: 40rem;
  }
}
```

<code src="./responsive/demo/responsiveStyleProps.tsx"></code>
