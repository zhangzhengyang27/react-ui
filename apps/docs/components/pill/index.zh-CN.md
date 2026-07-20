---
category: Components
title: Pill
subtitle: 胶囊
description: react-ui Pill 胶囊组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要以胶囊形状展示一段紧凑的标签或状态信息（如版本号、角色）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 在输入框内使用

`Pill` 组件设计用于在输入框内部使用。可用于创建自定义多选或标签输入框。

<code src="./demo/withinInput.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<StylesApiSelectors component="Pill"></StylesApiSelectors>



## API {#api}

### PillProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 标签内容 | `ReactNode` | — |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| withRemoveButton | 是否显示移除按钮 | `boolean` | `false` |
| onRemove | 移除回调 | `() => void` | — |
| color | 主题色 | `UIColor` | `'gray'` |
| radius | 圆角 | `UIRadius` | `'xl'` |
支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
