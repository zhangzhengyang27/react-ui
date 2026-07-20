---
category: Components
title: Container
subtitle: 容器
description: react-ui Container 容器组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要将内容水平居中并限制最大宽度，以保持页面在不同屏幕尺寸下的可读性时使用。

## 代码演示 {#examples}

### Grid 策略

从 8.2.0 开始，`Container` 支持 `strategy="grid"` 属性，可启用更多布局能力。

与默认的 `strategy="block"` 相比，区别如下：

- 使用 `display: grid` 而非 `display: block`
- 不包含默认的内联水平内边距
- 不在根元素上设置 `max-width`，而是使用 grid template columns

`strategy="grid"` 支持的能力：

- 支持 `strategy="block"` 的所有能力
- 带有 `data-breakout` 属性的子元素占据容器父元素的整个宽度
- `data-breakout` 内部带有 `data-container` 的子元素与主网格列保持相同宽度

使用 breakout 能力的示例：

<code src="./demo/breakout.tsx"></code>

### 用法

`Container` 将内容居中，并将其 `max-width` 限制为 `size` 属性指定的值。注意，`size` 属性不会使 `max-width` 具有响应式；例如设置为 `lg` 时，无论屏幕尺寸如何，始终为 `lg`。

<code src="./demo/usage.tsx"></code>

### 流式布局

设置 `fluid` 属性使容器变为流式布局，将占据可用宽度的 100%，与设置 `size="100%"` 效果相同。

<code src="./demo/fluid.tsx"></code>

### 自定义尺寸

可通过 [theme](/docs/theming/theme-object) 上的 [CSS 变量](/docs/styles/styles-api) 自定义现有的 `Container` 尺寸并添加新尺寸：

<code src="./demo/sizes.tsx"></code>

### 响应式最大宽度

要使 `Container` 的 `max-width` 具有响应式，请使用 [Styles API](/docs/styles/styles-api) 设置 `classNames`。例如，可添加一个 `responsive` 尺寸，使 `Container` 的 `max-width` 随屏幕尺寸变化：

<code src="./demo/responsive.tsx"></code>

## API {#api}

### ContainerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 最大宽度 | `number \| string \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| fluid | 是否占满宽度 | `boolean` | `false` |
| px | 水平内边距 | `number \| string` | — |

除上表所列属性外，Container 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
