---
category: Components
title: Badge
subtitle: 徽标
description: 用于显示状态、计数或标签的小型徽标组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

在元素角落或旁边展示小型标记时使用，例如未读数量、状态标签等。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

<code src="./demo/gradient.tsx"></code>

### 圆角

设置 `circle` 属性可减少水平内边距，并使徽标宽度等于其高度。

<code src="./demo/rounded.tsx"></code>

### 左右区域

<code src="./demo/sections.tsx"></code>

### 全宽

设置 `fullWidth` 后，徽标将占据父元素的整个宽度。

<code src="./demo/fullWidth.tsx"></code>

### 自定义变体颜色

通过向主题注册 [variantColorResolver](/docs/theming/colors#colors-variant-resolver)，可自定义 Badge 及其他组件变体的颜色。

<code src="./demo/variantColorsResolver.tsx"></code>

<code src="./demo/autoContrast.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<Gradient component="Badge"></Gradient>

<AutoContrast component="Badge"></AutoContrast>

<StylesApiSelectors component="Badge"></StylesApiSelectors>

<Polymorphic defaultElement="div" changeToElement="a" component="Badge" withNext></Polymorphic>

## API {#api}

### BadgeProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 视觉变体 | `'filled' \| 'light' \| 'outline' \| 'dot' \| 'transparent'` | `'light'` |
| color | 主题色 | `UIColor` | `'gray'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| radius | 圆角 | `UIRadius` | `'xl'` |
| circle | 是否强制圆形 | `boolean` | `false` |
| fullWidth | 是否占满宽度 | `boolean` | `false` |
| leftSection | 左侧内容 | `ReactNode` | — |
| rightSection | 右侧内容 | `ReactNode` | — |
| autoContrast | `filled` 变体下根据背景色自动调整文字颜色 | `boolean` | `theme.autoContrast` |

除上表所列属性外，Badge 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
