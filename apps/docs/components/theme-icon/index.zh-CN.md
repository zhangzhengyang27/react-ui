---
category: Components
title: ThemeIcon
subtitle: 主题图标
description: react-ui ThemeIcon 主题图标组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要在一个带主题色背景的圆角方形内放置图标时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 自定义变体颜色
<Gradient component="ThemeIcon"></Gradient>

<AutoContrast component="ThemeIcon"></AutoContrast>



## API {#api}

### ThemeIconProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 视觉变体 | `'filled' \| 'light' \| 'outline' \| 'transparent' \| 'default' \| 'gradient'` | `'filled'` |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| radius | 圆角 | `UIRadius` | `'sm'` |
| gradient | 渐变配置（variant='gradient'） | `{ from: UIColor; to: UIColor; deg?: number }` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
