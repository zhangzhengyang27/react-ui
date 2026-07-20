---
category: Components
title: MaskInput
subtitle: 掩码输入
description: react-ui MaskInput 掩码输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要按固定格式（如手机号、身份证、日期）输入文本并自动添加分隔符时使用。

## 代码演示 {#examples}

### 用法

`MaskInput` 是 [useMask](/docs/hooks/use-mask) Hook 的包装组件，提供所有标准输入属性（label、description、error 等）并支持所有 mask 选项。mask 字符串使用标记字符定义预期格式（`9` 表示数字，`a` 表示字母等）。

<code src="./demo/usage.tsx"></code>

### 动态 mask

使用 `modify` 选项根据当前输入值更改 mask。此示例在标准信用卡格式和美国运通格式之间切换：

<code src="./demo/dynamic.tsx"></code>

### 自定义标记

使用 `tokens` 选项覆盖或扩展内置标记映射：

<code src="./demo/customTokens.tsx"></code>

### 正则数组格式

对于内置标记不够用的复杂 mask，请传入字符串字面量和 `RegExp` 对象数组：

<code src="./demo/regex.tsx"></code>

### 转换

使用 `transform` 选项在验证前转换每个字符。此示例自动将输入转为大写，使 `A` 标记接受小写字母：

<code src="./demo/transform.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

### 重置值

`MaskInput` 内部是非受控的——从父级设置 `value` 不会清空它。使用 `resetRef` 属性获取一个函数，以命令式方式清空输入值：

<code src="./demo/resetRef.tsx"></code>

### 与 use-form 一起使用

`MaskInput` 按设计是非受控的——它在内部管理自己的 DOM 值。要与 [use-form](/docs/form/use-form) 集成，请通过 `defaultValue` 传入初始值，并使用 `onChangeRaw` 回调将原始（未 mask）值写入表单状态。在非受控表单模式下，向 `form.setFieldValue` 传入 `{ forceUpdate: false }`，以避免每次按键都重新挂载输入框：

<code src="./demo/withUseForm.tsx"></code>

### Mask 模式语法

mask 字符串定义预期格式。每个字符要么是**标记**（可编辑槽位），要么是**字面量**（自动插入的固定字符）。

### 内置标记

- `9` – 任意单个数字（`[0-9]`）
- `a` – 任意单个字母（`[A-Za-z]`）
- `A` – 任意大写字母（`[A-Z]`）
- `*` – 任意字母数字字符（`[A-Za-z0-9]`）
- `#` – 数字或符号（`[-+0-9]`）

### 可选段

在最后一个必需字符后附加 `?`，以将剩余槽位标记为可选：


### 转义

在标记字符前加 `\` 将其视为字面量：

```tsx
<MaskInput mask="(999) 999-9999? x9999" /> // Extension is optional
```

```tsx
<MaskInput mask="\A999" /> // "A" is literal, not a token
```



## API {#api}

### MaskInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值（非受控） | `string` | — |
| onChange | 值变化回调 | `(event: ChangeEvent<HTMLInputElement>) => void` | — |
| mask | 掩码格式（如 'AAAA-9999'） | `string \| string[]` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| unmask | onChange 是否返回去掉掩码的原始值 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
