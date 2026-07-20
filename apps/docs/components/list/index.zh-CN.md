---
category: Components
title: List
subtitle: 列表
description: react-ui List 列表组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要以列表形式展示一组相关项，并支持图标、嵌套、序号等样式时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 带图标

可用图标替换列表项目符号。为此，请提供以下属性：

- List 组件上的 `icon` 将用作所有列表元素的默认图标
- List.Item 组件上的 `icon` 将覆盖来自 List 的上下文图标
- `spacing` – 列表项之间的间距，使用主题中的间距或任何有效的 CSS 值，默认为 `0`
- `center` – 将项目内容与图标居中对齐
- `size` – 设置主题中的字体大小

<code src="./demo/icon.tsx"></code>

### 嵌套列表

设置 `withPadding` 属性以偏移嵌套列表，并使用 `listStyleType` 控制项目符号类型：

<code src="./demo/nested.tsx"></code>

### 有序列表编号

### 从指定数字开始

使用 `start` 属性从特定值开始编号：

### 反向编号

使用 `reversed` 属性创建倒计时列表：

### 自定义项目值

在单个 `List.Item` 组件上使用 `value` 属性设置特定数字：

<code src="./demo/start.tsx"></code>

<code src="./demo/reversed.tsx"></code>

<code src="./demo/value.tsx"></code>

## API {#api}

### ListProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 列表类型 | `'ordered' \| 'unordered'` | `'unordered'` |
| spacing | 项间距 | `UISpacing` | `0` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| center | 是否垂直居中 | `boolean` | `false` |
| withPadding | 是否使用默认内边距 | `boolean` | `false` |
| icon | 默认项图标 | `ReactNode` | — |

除上表所列属性外，List 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
