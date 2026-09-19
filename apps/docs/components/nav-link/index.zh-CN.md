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

`NavLink` 是一个[多态组件](/docs/guides/polymorphic)，默认根元素是 `button`。
若要渲染真正的链接，请设置 `component="a"` 并传入 `href`。

<code src="./demo/usage.tsx"></code>

### 激活状态

设置 `active` 属性为 `NavLink` 添加激活样式。

注意，激活样式只由 `active` 属性控制（渲染为 `data-active`），组件不会读取
`aria-current` 属性。若通过 `component` 属性与 React Router 的 `NavLink` 组合使用，
需自行把路由的激活状态传给 `active`。

可使用 `color` 属性自定义激活样式：

<code src="./demo/active.tsx"></code>

### 嵌套 NavLinks

要创建嵌套链接，请将 `NavLink` 作为另一个 `NavLink` 的子元素：

<code src="./demo/nested.tsx"></code>

<Polymorphic defaultElement="button" changeToElement="a" component="NavLink" withNext></Polymorphic>

<GetElementRef component="NavLink" refType="button"></GetElementRef>



## API {#api}

### NavLinkProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子导航项 | `ReactNode` | — |
| active | 是否激活，渲染为 `data-active` | `boolean` | `false` |
| label | 标签文字 | `ReactNode` | — |
| leftSection | 标签左侧内容 | `ReactNode` | — |
| rightSection | 标签右侧内容；有子导航项时显示在 chevron 之前 | `ReactNode` | — |
| onClick | 点击回调；有子导航项时同时切换子项显隐 | `(event) => void` | — |
| color | 主题色，决定激活/悬停时的 `--navlink-*` 变量 | `UIColor` | `theme.primaryColor` |
| variant | 变体名，仅渲染为 `data-variant` 属性，内置样式不随其变化 | `'light' \| 'subtle' \| 'filled' \| 'transparent'` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| component | 多态渲染的根组件 | `React.ComponentType` | `'button'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
