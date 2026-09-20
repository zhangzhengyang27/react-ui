---
category: Components
title: Image
subtitle: 图片
description: react-ui Image 图片组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要展示图片，并支持占位、回退、懒加载、适应方式等增强能力时使用。

## 代码演示 {#examples}

### 用法

`Image` 是对 `img` 的轻量封装，默认样式极少。默认情况下，图片会占据父容器 100% 的宽度。可以使用 `w` 和 `h` [样式属性](/docs/styles/style-props) 控制图片尺寸。

<code src="./demo/usage.tsx"></code>

### 图片高度

大多数情况下，需要设置图片高度以防止图片加载时出现布局跳动。可通过 `h` [样式属性](/docs/styles/style-props) 来设置。

<code src="./demo/height.tsx"></code>

### 图片适应方式

默认情况下，图片使用 `object-fit: cover` 样式——它会缩放以覆盖父元素。要更改此行为，请设置 `w="auto"` 和 `fit="contain"` 属性。

<code src="./demo/contain.tsx"></code>

### 占位图片

设置 `fallbackSrc` 属性，以便图片加载失败时显示占位图片：

<code src="./demo/fallback.tsx"></code>

### 与 Next.js Image 一起使用

`Image` 是一个[多态组件](/docs/guides/polymorphic)，可以通过 `component` 属性更改其根元素。可将它与 `next/image` 及其他类似组件一起使用。

```tsx
import NextImage from 'next/image';
import { Image } from '@xiaoye-react/ui';
import myImage from './my-image.jpg';

function Demo() {
  return <Image component={NextImage} src={myImage} alt="我的图片" />;
}
```

## API {#api}

### ImageProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | — |
| alt | 替代文本 | `string` | — |
| radius | 圆角 | `UIRadius` | — |
| fit | 适应方式 | `'contain' \| 'cover' \| 'fill'` | `'cover'` |
| fallbackSrc | 加载失败时的回退图片 | `string` | — |
| height | 高度 | `number \| string` | — |
| width | 宽度 | `number \| string` | — |

除上表所列属性外，Image 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
