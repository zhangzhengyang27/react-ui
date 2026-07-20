---
category: Form
title: UseField
subtitle: useField
description: react-ui UseField 文档。
---


## 用法

`use-field` Hook 是 [use-form](/docs/form/use-form) 的更简单的替代方案。
它可以用来管理单个输入框的状态，而无需创建表单：

<code src="./use-field/demo/usage.tsx"></code>

## use-field API

`use-field` Hook 接受以下选项对象作为单个参数：


并返回以下对象：

```tsx
interface UseFieldInput<T> {
  /** 字段模式，默认为受控 */
  mode?: 'controlled' | 'uncontrolled';

  /** 初始字段值 */
  initialValue: T;

  /** 初始触碰值 */
  initialTouched?: boolean;

  /** 初始字段错误信息 */
  initialError?: React.ReactNode;

  /** 字段值变化时调用，传入更新后的值 */
  onValueChange?: (value: T) => void;

  /** 是否在值变化时验证字段，默认为 false */
  validateOnChange?: boolean;

  /** 是否在失去焦点时验证字段，默认为 false */
  validateOnBlur?: boolean;

  /** 是否在值变化时清除错误信息，默认为 true */
  clearErrorOnChange?: boolean;

  /** 验证字段值的函数，可以是同步或异步 */
  validate?: (value: T) => React.ReactNode | Promise<React.ReactNode>;

  /** 字段类型，默认为 input */
  type?: 'input' | 'checkbox';

  /** 一个函数，用于从 validate 函数返回的结果中解析验证错误，应返回一个 react 节点 */
  resolveValidationError?: (error: unknown) => React.ReactNode;
}
```

```tsx
export interface UseFieldReturnType<ValueType> {
  /** 返回要传递给输入元素的 props */
  getInputProps: () => {
    /* 输入组件的 props */
  };

  /** 返回当前输入值 */
  getValue: () => ValueType;

  /** 将输入值设置为给定值 */
  setValue: (value: ValueType) => void;

  /** 将字段值重置为初始状态，将触碰状态设置为 false，将错误设置为 null */
  reset: () => void;

  /** 调用时验证当前输入值 */
  validate: () => Promise<React.ReactNode | void>;

  /** 当异步 validate 函数被调用时设置为 true，直到返回的 Promise 解决前保持为 true */
  isValidating: boolean;

  /** 当前错误信息 */
  error: React.ReactNode;

  /** 将错误信息设置为给定的 react 节点 */
  setError: (error: React.ReactNode) => void;

  /** 如果输入至少被聚焦过一次，则返回 true */
  isTouched: () => boolean;

  /** 如果输入值与初始值不同，则返回 true */
  isDirty: () => boolean;

  /** 将触碰状态重置为 false */
  resetTouched: () => void;

  /** 当模式为非受控时，应添加到输入框的 key */
  key: number;
}
```

## 失焦验证

要在失焦时验证字段，请将 `validateOnBlur` 选项设置为 `true`：

<code src="./use-field/demo/validateOnBlur.tsx"></code>

## 变化时验证

要在值变化时验证字段，请将 `validateOnChange` 选项设置为 `true`：

<code src="./use-field/demo/validateOnChange.tsx"></code>

## 异步验证

`validate` 选项接受异步和同步函数。在这两种情况下，函数
必须返回将显示给用户的错误信息，如果值有效则返回 `null`。
要跟踪异步验证状态，请使用 `isValidating` 属性：


异步验证可以与 `validateOnBlur` 选项一起使用，但不建议与
`validateOnChange` 一起使用，因为它会在每次按键时触发验证，这可能
导致竞态条件：

<code src="./use-field/demo/asyncValidation.tsx"></code>

<code src="./use-field/demo/asyncValidationOnBlur.tsx"></code>

## 触碰和脏状态

要获取字段是否至少被聚焦过一次的信息，请使用 `isTouched` 方法。
要检查值是否已从初始值更改，请使用 `isDirty` 方法：

<code src="./use-field/demo/statusControlled.tsx"></code>

## 变化时清除错误

默认情况下，当值变化时错误信息会被清除。要禁用此行为，
请将 `clearErrorOnChange` 选项设置为 `false`：

<code src="./use-field/demo/clearErrorOnChange.tsx"></code>

## 非受控模式

`use-field` Hook 的非受控模式与 [use-form](/docs/form/uncontrolled) 的非受控模式类似。
在非受控模式下，会最小化重新渲染，输入值由输入框自身管理。
如果你在受控模式下遇到性能问题，它会很有用，但在大多数情况下，受控
模式是推荐的，因为它始终以 React state 形式提供最新的字段信息。

<code src="./use-field/demo/uncontrolled.tsx"></code>
