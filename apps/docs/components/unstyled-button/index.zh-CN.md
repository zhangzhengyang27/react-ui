---
category: Components
title: UnstyledButton
subtitle: 无样式按钮
description: react-ui UnstyledButton 无样式按钮组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要一个去除默认样式的按钮，便于完全自定义外观时使用。

## 代码演示 {#examples}

### 用法

`UnstyledButton` 重置默认的 button 样式，它用作所有其他按钮组件的基础。可将其用作自定义多态按钮的基础。

<code src="./demo/usage.tsx"></code>

<Polymorphic defaultElement="button" changeToElement="a" component="UnstyledButton"></Polymorphic>

<GetElementRef component="UnstyledButton" refType="button"></GetElementRef>



## API {#api}

### UnstyledButtonProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 渲染为的元素或组件 | `React.ElementType` | `'button'` |
| disabled | 是否禁用 | `boolean` | `false` |
| onClick | 点击回调 | `(event) => void` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
