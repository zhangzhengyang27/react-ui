---
category: Components
title: BackgroundImage
subtitle: 背景图片
description: react-ui BackgroundImage 背景图片组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要将图片作为元素背景并叠加内容（如带遮罩的 Hero 区）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

<Polymorphic defaultElement="div" changeToElement="button" component="BackgroundImage"></Polymorphic>



## API {#api}

### BackgroundImageProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 背景图片地址 | `string` | — |
| radius | 圆角 | `UIRadius` | — |
| children | 叠加在图片上的内容 | `ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
