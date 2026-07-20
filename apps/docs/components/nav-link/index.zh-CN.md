---
category: Components
title: NavLink
subtitle: 导航链接
description: react-ui NavLink 导航链接组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在导航栏或侧边栏中展示一个带激活状态的链接项时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 激活状态

设置 `active` 属性为 `NavLink` 添加激活样式。

注意，若在 `renderRoot` 中使用 React Router 的 `NavLink`，激活样式将基于
[React Router 设置的 `aria-current` 属性](https://reactrouter.com/en/main/components/nav-link#aria-current)，
因此无需显式设置 `active` 属性。

可使用 `color` 和 `variant` 属性自定义激活样式：

<code src="./demo/active.tsx"></code>

<code src="./demo/autoContrast.tsx"></code>

### 嵌套 NavLinks

要创建嵌套链接，请将 `NavLink` 作为另一个 `NavLink` 的子元素：

<code src="./demo/nested.tsx"></code>

<AutoContrast component="NavLink"></AutoContrast>

<Polymorphic defaultElement="a" changeToElement="button" component="NavLink" withNext></Polymorphic>

<GetElementRef component="NavLink" refType="a"></GetElementRef>



## API {#api}

### NavLinkProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子导航项 | `ReactNode` | — |
| active | 是否激活 | `boolean` | `false` |
| label | 标签文字 | `ReactNode` | — |
| icon | 图标 | `ReactNode` | — |
| rightSection | 右侧插槽 | `ReactNode` | — |
| onClick | 点击回调 | `(event) => void` | — |
| variant | 视觉变体 | `'filled' \| 'light' \| 'subtle'` | `'light'` |
| disabled | 是否禁用 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
