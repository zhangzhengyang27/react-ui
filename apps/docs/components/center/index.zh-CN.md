---
category: Components
title: Center
subtitle: 居中
description: react-ui Center 居中组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要将子元素在水平和垂直方向同时居中展示时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 内联

要将 `Center` 与内联元素一起使用，请设置 `inline` 属性。例如，可将链接图标与标签居中展示：

<code src="./demo/inline.tsx"></code>

<Polymorphic defaultElement="div" changeToElement="button" component="Center"></Polymorphic>

## API {#api}

### CenterProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| inline | 是否使用 inline-flex | `boolean` | `false` |

除上表所列属性外，Center 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
