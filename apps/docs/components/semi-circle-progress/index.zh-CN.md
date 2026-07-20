---
category: Components
title: SemiCircleProgress
subtitle: 半圆进度
description: react-ui SemiCircleProgress 半圆进度组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要以半圆形进度条展示单个百分比数值，常用于仪表盘时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 更改空段颜色

使用 `emptySegmentColor` 属性更改空段颜色，
它接受 `theme.colors` 的键或任何有效的 CSS 颜色值：

<code src="./demo/emptySegmentColor.tsx"></code>

### 更改标签位置

默认情况下，标签显示在组件底部，
可使用 `labelPosition` 属性将其位置更改为 `center`：

<code src="./demo/labelPosition.tsx"></code>

### 填充段过渡

默认情况下过渡被禁用，要启用过渡，请将 `transitionDuration` 属性
设置为毫秒数：

<code src="./demo/transitions.tsx"></code>



## API {#api}

### SemiCircleProgressProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 进度（0-100） | `number` | `0` |
| size | 尺寸 | `number` | `120` |
| thickness | 厚度 | `number` | `12` |
| color | 主题色 | `UIColor` | `'blue'` |
| label | 中心标签 | `ReactNode` | — |
| roundCaps | 是否圆角 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
