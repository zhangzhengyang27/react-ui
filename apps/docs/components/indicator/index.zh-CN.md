---
category: Components
title: Indicator
subtitle: 指示器
description: react-ui Indicator 指示器组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要在元素右上角显示小尺寸标记（如未读小红点、在线状态）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 行内模式

当目标元素具有固定宽度时，设置 `inline` 属性为 Indicator 容器添加 `display: inline-block;` 样式。或者，若仍希望根元素保持 `display: block`，可以使用 `style` 属性设置宽度和高度。

<code src="./demo/inline.tsx"></code>

### 偏移

设置 `offset` 以更改指示器位置。当 Indicator 组件与具有 border-radius 的子元素一起使用时，这很有用。可传入一个数字实现统一偏移，或传入包含 `x` 和 `y` 属性的对象分别设置水平和垂直偏移：

<code src="./demo/offset.tsx"></code>

### 处理中动画

<code src="./demo/processing.tsx"></code>

### 禁用

设置 `disabled` 以隐藏指示器：

<code src="./demo/disabled.tsx"></code>

### 最大值

设置 `maxValue` 属性，当标签超过最大值时显示 `{maxValue}+`。这对于不应显示精确大数字的通知计数器很有用：

<code src="./demo/maxValue.tsx"></code>

### 显示零

默认情况下，当标签为 `0` 时指示器会显示。设置 `showZero={false}` 以在标签为 `0` 时隐藏指示器：

<code src="./demo/showZero.tsx"></code>

### 自动对比度

设置 `autoContrast` 属性以根据背景色自动调整文本颜色，确保可读对比度：

<code src="./demo/autoContrast.tsx"></code>

## API {#api}

### IndicatorProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 主元素 | `ReactNode` | — |
| color | 主题色 | `UIColor` | `'red'` |
| size | 标记尺寸 | `number` | `10` |
| position | 标记位置 | `'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'top-end'` |
| offset | 距边缘偏移 | `number` | `0` |
| processing | 是否显示脉冲动画 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| label | 标记内容（数字/文字） | `ReactNode` | — |

除上表所列属性外，Indicator 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
