---
category: Components
title: Loader
subtitle: 加载器
description: react-ui Loader 加载器组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在异步操作进行中显示加载动画，告知用户等待时使用。

## 代码演示 {#examples}

### 用法

`Loader` 组件默认支持 3 种加载器类型：`oval`、`bars` 和 `dots`。所有加载器均使用 CSS 动画以获得更好的性能。

<code src="./demo/configurator.tsx"></code>

### size 属性

可向 `size` 属性传递任何有效的 CSS 值或数字。数字会被视为 px，但会转换为 [rem](/docs/styles/rem)。例如，`size={32}` 会生成 `--loader-size: 2rem` CSS 变量。

<code src="./demo/size.tsx"></code>

### 添加自定义加载器

`Loader` 组件在其他组件中使用（如 [Button](/components/button)、[ActionIcon](/components/action-icon)、[LoadingOverlay](/components/loading-overlay) 等）。可通过设置 `type` 使用[默认属性](/docs/theming/default-props)来更改加载器类型。还可使用 `loaders` [默认属性](/docs/theming/default-props)添加自定义 CSS 或 SVG 加载器。

### 自定义纯 CSS 加载器

注意，为了让自定义加载器支持 `size` 和 `color` 属性，需要在加载器样式中使用 `--loader-size` 和 `--loader-color` CSS 变量。

### 自定义 SVG 加载器

建议使用纯 CSS 加载器，因为基于 SVG 的动画可能存在以下问题：

- CPU 占用高——在低端设备上加载器可能会看起来卡顿
- 加载器动画可能要等到 JS 加载后才会开始播放——用户可能会看到静态加载器

在 SVG 加载器中，需要像纯 CSS 自定义加载器一样使用 `--loader-size` 和 `--loader-color` 变量，以使 `size` 和 `color` 属性生效。通常，需要将 `width` 和 `height` 设置为 `var(--loader-size)`，将 `fill`/`stroke` 设置为 `var(--loader-color)`。

<code src="./demo/cssLoader.tsx"></code>

<code src="./demo/customType.tsx"></code>

## API {#api}

### LoaderProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` |
| color | 主题色 | `UIColor` | `'blue'` |
| type | 类型 | `'bars' \| 'dots' \| 'oval'` | `'oval'` |
| variant | 视觉变体（兼容） | `'default'` | `'default'` |

除上表所列属性外，Loader 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
