---
category: Hooks
title: UseMask
subtitle: 输入掩码
description: react-ui 输入掩码 Hook 文档。
---


## 用法

`useMask` 通过 ref 回调为任何 `<input>` 元素附加实时输入掩码。
它会根据定义的模式格式化用户输入，并同时暴露掩码显示值和原始未掩码值。
如果你需要一个现成的输入组件，请使用 [MaskInput](/components/mask-input)，
它用这个 Hook 包装了所有标准输入属性。

<code src="./use-mask/demo/usage.tsx"></code>

## isComplete 与 placeholderChar

使用 `isComplete` 检查是否所有必需的掩码槽位都已填充——例如，用于控制提交按钮。
`placeholderChar` 选项设置未填充槽位中显示的字符（默认 `_`）：

<code src="./use-mask/demo/complete.tsx"></code>

## 自定义标记

使用 `tokens` 选项覆盖或扩展内置的标记映射：

<code src="./use-mask/demo/customTokens.tsx"></code>

## 转义

在标记字符前加 `\` 可将其视为字面量。
在本示例中，`A` 通常是大写字母标记，但 `\A` 使其成为字面量字符：

<code src="./use-mask/demo/escape.tsx"></code>

## 重置

使用 Hook 返回的 `reset` 函数以编程方式清除输入值：

<code src="./use-mask/demo/reset.tsx"></code>

## 掩码模式语法

掩码字符串定义了预期格式。每个字符要么是**标记**（可编辑槽位），要么是**字面量**（自动插入的固定字符）。

### 内置标记

- `9` – 任意单个数字（`[0-9]`）
- `a` – 任意单个字母（`[A-Za-z]`）
- `A` – 任意大写字母（`[A-Z]`）
- `*` – 任意字母数字字符（`[A-Za-z0-9]`）
- `#` – 数字或符号（`[-+0-9]`）

### 可选段

在最后一个必需字符后附加 `?`，将剩余槽位标记为可选：

```tsx
useMask({ mask: '(999) 999-9999? x9999' }) // 分机号是可选的
```

## 类型定义

```tsx
interface UseMaskOptions {
  // Mask pattern string, e.g. '9999 9999 9999 9999'
  mask: string;

  // Character displayed in unfilled slots, "_" by default
  placeholderChar?: string;

  // Override or extend the built-in token map
  tokens?: Record<string, RegExp>;
}

interface UseMaskReturnValue {
  // Ref callback to attach to the input element
  ref: React.RefCallback<HTMLInputElement>;

  // Current masked display value
  value: string;

  // Current raw unmasked value
  rawValue: string;

  // Whether all required mask slots are filled
  isComplete: boolean;

  // Clear the input value and reset state
  reset: () => void;
}

function useMask(options: UseMaskOptions): UseMaskReturnValue;
```

## 导出类型

`UseMaskOptions` 和 `UseMaskReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseMaskOptions, UseMaskReturnValue } from '@xiaoye-react/hooks';
```
