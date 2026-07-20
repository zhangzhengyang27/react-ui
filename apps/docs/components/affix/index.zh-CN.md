---
category: Components
title: Affix
subtitle: 固钉
description: react-ui Affix 固钉组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要将某个元素固定在视口的指定位置（如顶部导航、底部操作栏），使其在滚动时保持可见时使用。

## 代码演示 {#examples}

### 用法

`Affix` 在 [Portal](/components/portal) 组件内渲染一个固定定位的 div 元素。
使用它来将元素固定在屏幕上的任意位置，例如返回顶部按钮：

<code src="./demo/usage.tsx"></code>



## API {#api}

### AffixProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 距视口边缘的偏移 | `{ top?: string \| number; bottom?: string \| number; left?: string \| number; right?: string \| number }` | `{ bottom: 0, right: 0 }` |
| target | 滚动容器（默认为 viewport） | `HTMLElement \| (() => HTMLElement) \| null` | — |
| zIndex | 层级 | `number` | `1000` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
