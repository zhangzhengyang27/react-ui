---
category: Components
title: Skeleton
subtitle: 骨架屏
description: react-ui Skeleton 骨架屏组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在内容加载完成前展示灰色的占位骨架，缓解用户等待焦虑时使用。

## 代码演示 {#examples}

### 用法

使用 `Skeleton` 为加载中的内容创建占位符。`Skeleton` 支持以下属性：

- `height` – 高度，任何有效的 CSS 值
- `width` – 宽度，任何有效的 CSS 值
- `radius` – `theme.radius` 的键或任何有效的 CSS 值来设置 border-radius
- `circle` – 如果为 true，width、height 和 border-radius 将等于 `height` 属性中指定的值
- `animate` – 默认为 true，控制动画

<code src="./demo/configurator.tsx"></code>

### 带内容

若需指示页面上已有内容的加载状态，请用 Skeleton 包裹该内容，并使用 `visible` 属性控制加载遮罩的可见性：

<code src="./demo/content.tsx"></code>



## API {#api}

### SkeletonProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 高度 | `number \| string` | `'auto'` |
| width | 宽度 | `number \| string` | `'100%'` |
| circle | 是否圆形 | `boolean` | `false` |
| radius | 圆角 | `UIRadius` | `'sm'` |
| animate | 是否动画 | `boolean` | `true` |
| visible | 是否可见（false 时直接渲染 children） | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
