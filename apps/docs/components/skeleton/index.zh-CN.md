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

`Skeleton` 本身总是渲染其子内容，因此没有内置的显隐开关。若需在真实内容加载前后切换，用 `loading` 状态做条件渲染：加载中时渲染 `Skeleton` 占位，加载完成后渲染真实内容：

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

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
