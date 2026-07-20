---
category: Components
title: NumberFormatter
subtitle: 数字格式化
description: react-ui NumberFormatter 数字格式化组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要按指定格式（千分位、小数位、货币）格式化展示数字时使用。

## 代码演示 {#examples}

### 用法

使用 `NumberFormatter` 格式化数字。它支持与 [NumberInput](/components/number-input/) 组件相同的格式化相关属性。

<code src="./demo/usage.tsx"></code>

### 前缀与后缀

设置 `prefix` 和 `suffix` 属性以在值的开头和结尾添加指定字符串：

<code src="./demo/prefixSuffix.tsx"></code>

### 千分位分隔符

设置 `thousandSeparator` 属性以使用字符分隔千位。可使用 `thousandsGroupStyle` 控制分组逻辑，它接受：`thousand`、`lakh`、`wan`、`none` 值。

<code src="./demo/thousandsSeparator.tsx"></code>

### 小数位数

`decimalScale` 属性控制允许的小数位数：

<code src="./demo/decimalScale.tsx"></code>



## API {#api}

### NumberFormatterProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 要格式化的数值 | `number \| string` | — |
| prefix | 前缀 | `string` | — |
| suffix | 后缀 | `string` | — |
| thousandSeparator | 千分位分隔符 | `string \| boolean` | `true` |
| decimalScale | 小数位数 | `number` | — |
| fixedDecimalScale | 是否固定小数位数 | `boolean` | `false` |
| allowNegative | 是否允许负号 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
