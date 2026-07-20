---
category: Components
title: ColorSwatch
subtitle: 色板
description: react-ui ColorSwatch 色板组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要展示一个色块（如主题预设颜色、调色板项）作为可点击选项时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### withShadow

默认情况下，`ColorSwatch` 具有内部 box-shadow，以使其在浅色背景上更加醒目。
可通过设置 `withShadow={false}` 属性来禁用它：



`ColorSwatch` 作为按钮的示例：

<code src="./demo/shadow.tsx"></code>

<code src="./demo/component.tsx"></code>

<Polymorphic defaultElement="div" changeToElement="button" component="ColorSwatch"></Polymorphic>



## API {#api}

### ColorSwatchProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 颜色值 | `string` | — |
| size | 尺寸 | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| radius | 圆角 | `UIRadius` | `'xl'` |
| withShadow | 是否显示内阴影 | `boolean` | `true` |
| onClick | 点击回调 | `(event) => void` | — |
| selected | 是否选中 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
