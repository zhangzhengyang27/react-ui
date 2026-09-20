---
category: Components
title: Burger
subtitle: 汉堡按钮
description: react-ui Burger 汉堡按钮组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在小屏幕下作为侧边栏或菜单的切换按钮（三横线图标）时使用。

## 代码演示 {#examples}

### 用法

`Burger` 组件渲染一个打开/关闭菜单按钮。设置 `opened` 和 `onClick` 属性以控制组件状态。若设置了 `opened` 属性，将渲染叉号图标；否则渲染汉堡图标。

<code src="./demo/usage.tsx"></code>

### 修改线条尺寸

<code src="./demo/lineWidth.tsx"></code>

### 可访问性

要使 `Burger` 对屏幕阅读器可访问，需要设置 `aria-label` 或使用 [VisuallyHidden](/components/visually-hidden) 组件：

```tsx
import { Burger, VisuallyHidden } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Burger aria-label="切换导航" />

      <Burger>
        <VisuallyHidden>切换导航</VisuallyHidden>
      </Burger>
    </>
  );
}
```

<GetElementRef component="Burger" refType="button"></GetElementRef>

## API {#api}

### BurgerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opened | 是否打开 | `boolean` | `false` |
| onClick | 点击回调 | `(event) => void` | — |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| color | 颜色 | `UIColor` | `'gray'` |
| transitionDuration | 切换动画时长（ms） | `number` | `300` |
| lineSize | 横线粗细（高度），数字按 `1rem = 16px` 换算 | `string \| number` | 按 `size` 计算 |

除上表所列属性外，Burger 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
