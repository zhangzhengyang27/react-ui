---
category: Components
title: HoverCard
subtitle: 悬浮卡片
description: react-ui HoverCard 悬浮卡片组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要当用户将鼠标悬停在某个元素上时，弹出一张包含更多信息的卡片时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 延迟

使用 `openDelay` 和 `closeDelay` 属性设置打开和关闭延迟（毫秒）：

<code src="./demo/delay.tsx"></code>

### HoverCard 延迟组

使用 `HoverCard.Group` 组件同步多个 `HoverCard` 组件的打开和关闭延迟：

<code src="./demo/group.tsx"></code>

### 与交互元素一起使用

`HoverCard` 仅在鼠标位于目标元素或下拉菜单上时显示。
可在下拉菜单中使用锚点和按钮，不建议使用输入框：

<code src="./demo/profile.tsx"></code>

<TargetComponent component="HoverCard"></TargetComponent>



## API {#api}

### HoverCardProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 触发元素 | `ReactNode` | — |
| position | 浮层位置 | `Position` | `'top'` |
| width | 浮层宽度 | `number \| string` | — |
| withArrow | 是否显示箭头 | `boolean` | `false` |
| shadow | 阴影 | `UIShadow` | `'sm'` |
| openDelay | 打开延迟（ms） | `number` | `0` |
| closeDelay | 关闭延迟（ms） | `number` | `150` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
