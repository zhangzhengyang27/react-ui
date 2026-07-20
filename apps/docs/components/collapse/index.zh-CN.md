---
category: Components
title: Collapse
subtitle: 折叠面板
description: react-ui Collapse 折叠面板组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要让一段内容（如面板、菜单）以展开/收起的方式控制可见性时使用，常与 Accordion 或导航配合使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 水平方向

<code src="./demo/horizontal.tsx"></code>

### 修改过渡

设置以下属性以控制过渡：

- `transitionDuration` – 持续时间，单位为毫秒
- `transitionTimingFunction` – 计时函数（ease、linear 等），默认为 `ease`
- `onTransitionEnd` – 过渡结束时调用（打开和关闭都会触发）

<code src="./demo/transition.tsx"></code>

### 示例：嵌套 Collapse 组件

<code src="./demo/nested.tsx"></code>

## API {#api}

### CollapseProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| in | 是否展开 | `boolean` | `false` |
| transitionDuration | 过渡时长（ms） | `number` | `200` |
| transitionTimingFunction | 过渡缓动函数 | `string` | `'ease'` |
| animateOpacity | 是否同时过渡透明度 | `boolean` | `true` |
| onTransitionEnd | 过渡结束回调 | `() => void` | — |

除上表所列属性外，Collapse 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
