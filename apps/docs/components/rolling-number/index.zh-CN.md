---
category: Components
title: RollingNumber
subtitle: 滚动数字
description: react-ui RollingNumber 滚动数字组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要让数字以滚动动画的方式从旧值变化到新值时使用。

## 代码演示 {#examples}

### 用法

`RollingNumber` 通过数字滚动过渡来动画化值变化。当值变化时，每个数字独立滚动到新位置。

<code src="./demo/usage.tsx"></code>

### 前缀与后缀

设置 `prefix` 和 `suffix` 属性以在动画数字前后添加静态文本。使用 `thousandSeparator` 分隔千位，使用 `decimalScale` 配合 `fixedDecimalScale` 控制小数格式：

<code src="./demo/prefix.tsx"></code>

### 动画持续时间

使用 `animationDuration` 属性控制动画速度（以毫秒为单位，默认 `600`）。使用 `timingFunction` 属性更改 CSS 计时函数（默认 `ease`）：

<code src="./demo/duration.tsx"></code>



## API {#api}

### RollingNumberProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前数值 | `number` | `0` |
| color | 主题色 | `UIColor` | — |
| animationDuration | 滚动动画时长（ms） | `number` | `600` |
| thousandSeparator | 千分位分隔符 | `string \| boolean` | — |
| decimalSeparator | 小数点分隔符 | `string` | `'.'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
