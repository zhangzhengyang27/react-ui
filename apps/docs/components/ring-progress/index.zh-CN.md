---
category: Components
title: RingProgress
subtitle: 环形进度
description: react-ui RingProgress 环形进度组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要以环形进度展示单个百分比数值（如完成率、健康度）时使用。

## 代码演示 {#examples}

### 用法

`sections` 属性接受一个对象数组，每个对象具有以下属性：

- `value` – 0 到 100 之间的数字，表示环形填充的百分比
- `color` – 来自 theme.colors 的分段颜色或任意 CSS 颜色值
- `tooltip`（可选）– 悬停在该分段上时显示的 React 节点
- 任何有效的 SVG `<circle>` 元素属性（onClick、onMouseEnter、style 等）

**注意：** 各分段值的总和应为 100% 或更少，以获得预期行为。总值超过 100% 会导致分段重叠。

<code src="./demo/usage.tsx"></code>

### 尺寸、粗细与圆角端点

使用 `size`、`thickness` 和 `roundCaps` 属性配置 RingProgress 的尺寸和粗细值：

<code src="./demo/configurator.tsx"></code>

### 自定义标签

可将任意 React 节点作为标签，例如带有自定义样式的 [Text](/components/text/) 组件或 [ActionIcon](/components/action-icon/)：

<code src="./demo/label.tsx"></code>



## API {#api}

### RingProgressProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `number` | `120` |
| sections | 各分段的进度与颜色 | `RingProgressSection[]`（`{ value: number; color?: UIColor }`） | — |
| thickness | 环厚度 | `number` | `12` |
| roundCaps | 是否圆角 | `boolean` | `true` |
| color | 未指定 `color` 的段的默认主题色 | `UIColor` | `theme.primaryColor` |
| label | 中心标签 | `ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
