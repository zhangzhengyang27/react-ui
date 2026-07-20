---
category: Components
title: Carousel
subtitle: 轮播
description: react-ui Carousel 轮播组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要循环展示多张图片或幻灯片，支持自动播放和手动切换时使用。

## 代码演示 {#examples}

### 基础用法

轮播 的基础示例。

<code src="./demo/basic.tsx"></code>

## API {#api}

### CarouselProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| slideSize | 每张幻灯片宽度 | `number \| string \| Record<string, ...>` | `'100%'` |
| slidesToScroll | 每次滚动数量 | `number \| 'auto'` | `1` |
| loop | 是否循环 | `boolean` | `false` |
| align | 对齐方式 | `'start' \| 'center' \| 'end'` | `'center'` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| withIndicators | 是否显示指示器 | `boolean` | `false` |
| withControls | 是否显示前后控制按钮 | `boolean` | `true` |
| dragFree | 是否允许自由拖拽 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
