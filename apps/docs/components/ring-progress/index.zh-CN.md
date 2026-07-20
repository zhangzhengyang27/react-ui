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

### 分段提示

在分段上添加 `tooltip` 属性，当用户悬停在该分段上时显示浮动 [Tooltip](/components/tooltip/)：

<code src="./demo/tooltip.tsx"></code>

### 分段间隙

使用 `sectionGap` 属性在分段之间添加视觉分隔。间隙以角度为单位：

<code src="./demo/sectionGap.tsx"></code>

### 起始角度

使用 `startAngle` 属性控制进度开始的位置。角度以度为单位，其中 `0` = 右侧，`90` = 底部，`180` = 左侧，`270` = 顶部（默认）：

<code src="./demo/startAngle.tsx"></code>

### 背景颜色

使用 `rootColor` 属性自定义环形未填充部分（背景）的颜色：

<code src="./demo/rootColor.tsx"></code>

### 分段事件

每个分段都可以接收任何有效的 SVG `<circle>` 元素属性，包括事件处理函数如 `onClick`、`onMouseEnter` 和 `onMouseLeave`：

<code src="./demo/sectionsProps.tsx"></code>

### 自定义标签

可将任意 React 节点作为标签，例如带有自定义样式的 [Text](/components/text/) 组件或 [ActionIcon](/components/action-icon/)：

<code src="./demo/label.tsx"></code>

### 填充分段过渡

默认情况下，过渡被禁用。要启用它们，请将 `transitionDuration` 属性设置为毫秒数：

<code src="./demo/transitions.tsx"></code>



## API {#api}

### RingProgressProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 进度（0-100）或多个段 | `number \| { value: number; color: UIColor }[]` | `0` |
| size | 尺寸 | `number` | `120` |
| thickness | 环厚度 | `number` | `12` |
| roundCaps | 是否圆角 | `boolean` | `true` |
| sectionsColor | 单色环颜色 | `UIColor` | `'blue'` |
| label | 中心标签 | `ReactNode` | — |
| rootColor | 底环颜色 | `UIColor` | `'gray'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
