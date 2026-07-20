---
category: Components
title: Overlay
subtitle: 遮罩层
description: react-ui Overlay 遮罩层组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要在页面之上覆盖一层半透明遮罩，常用于弹窗、抽屉的底层时使用。

## 代码演示 {#examples}

### 用法

`Overlay` 占据父容器的 100% 宽度和高度；如果设置了 `fixed` 属性，则占据视口的 100% 宽度和高度。设置 `color` 和 `backgroundOpacity` 属性以更改 `Overlay` 的背景色。注意，`backgroundOpacity` 属性不会更改 CSS opacity 属性，而是更改 background-color。例如，若设置 `color="#000"` 和 `backgroundOpacity={0.85}`，背景色将是 `rgba(0, 0, 0, 0.85)`：

<code src="./demo/usage.tsx"></code>

### 渐变

设置 `gradient` 属性以使用 background-image 替代 background-color。当设置 `gradient` 属性时，`color` 和 `backgroundOpacity` 属性将被忽略。

<code src="./demo/gradient.tsx"></code>

### 模糊

设置 `blur` 属性以添加 `backdrop-filter: blur({value})` 样式。注意，`backdrop-filter` [并非所有浏览器都支持](https://caniuse.com/css-backdrop-filter)。

<code src="./demo/blur.tsx"></code>

<Polymorphic defaultElement="div" changeToElement="a" component="Overlay" withNext></Polymorphic>



## API {#api}

### OverlayProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 遮罩颜色 | `string` | `'rgba(0, 0, 0, 0.6)'` |
| opacity | 透明度 | `number` | `0.6` |
| blur | 模糊半径 | `number \| string` | — |
| zIndex | 层级 | `number` | `200` |
| fixed | 是否固定到视口 | `boolean` | `true` |
| center | 是否居中子元素 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
