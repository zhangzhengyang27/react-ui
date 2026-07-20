---
category: Components
title: AspectRatio
subtitle: 宽高比
description: react-ui AspectRatio 宽高比组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要强制元素保持固定宽高比（如 16:9 视频、4:3 头像），避免内容被拉伸或压缩时使用。

## 代码演示 {#examples}

### 用法

`AspectRatio` 保持一致的宽高比，可用于展示图片、地图、视频和其他媒体。

<code src="./demo/image.tsx"></code>

### 地图嵌入

<code src="./demo/map.tsx"></code>

### 视频嵌入

<code src="./demo/video.tsx"></code>

### 在 flex 容器内

默认情况下，`AspectRatio` 没有固定的宽度和高度，会在常规容器中占据尽可能多的空间。但在 flex 容器内使用时，它不会拉伸以填充可用空间。要使其在 flexbox 容器内生效，请设置 `width` 或 `flex` 属性。

<code src="./demo/flex.tsx"></code>

## API {#api}

### AspectRatioProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ratio | 宽高比 | `number` | `1` |
| children | 内容 | `ReactNode` | — |

除上表所列属性外，AspectRatio 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
