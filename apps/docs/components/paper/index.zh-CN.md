---
category: Components
title: Paper
subtitle: 纸张
description: react-ui Paper 纸张组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要一个带背景色、边框、阴影、圆角的白色卡片容器作为内容载体时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

<Polymorphic defaultElement="div" changeToElement="button" component="Paper" withNext></Polymorphic>



## API {#api}

### PaperProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shadow | 阴影 | `UIShadow` | — |
| radius | 圆角 | `UIRadius` | — |
| withBorder | 是否显示边框 | `boolean` | `false` |
| p | 内边距（Box 样式属性，支持响应式） | `StyleProp<UISpacing>` | `0` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
