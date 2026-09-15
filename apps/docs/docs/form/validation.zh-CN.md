---
category: Form
title: Validation
subtitle: 表单校验
description: react-ui Validation 文档。
---


## 使用规则对象进行验证

要使用规则对象验证表单，请提供一个函数对象，这些函数接收字段值作为参数，
并返回错误信息（任意 React 节点）或 null（如果字段有效）：

<code src="./validation/demo/rulesValidation.tsx"></code>

## 规则函数参数

每个表单规则接收以下参数：

- `value` – 字段的值
- `values` – 所有表单值
- `path` – 字段路径，例如 `user.email` 或 `cart.0.price`
- `signal` – 一个 `AbortSignal`，当更新的验证取代当前验证时会被中止（可用于取消进行中的异步请求）

`path` 参数可用于获取字段相对于其他字段的位置信息。
例如，你可以获取数组元素的索引：

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { a: [{ b: 1 }, { b: 2 }] },
  validate: {
    a: {
      b: (value, values, path) => (path === 'a.0.b' ? 'error' : null),
    },
  },
});
```

## formRootRule

`formRootRule` 是一个特殊的路径规则，可用于同时验证对象和数组以及它们的嵌套字段。
例如，当你想收集一组值、单独验证每个值，然后再验证整个列表不为空时，它会很有用：


另一个示例是验证对象的字段组合：

<code src="./validation/demo/rootRuleArray.tsx"></code>

<code src="./validation/demo/rootRuleObject.tsx"></code>

## 基于其他表单值的验证

你可以将表单的所有值作为规则函数的第二个参数，以基于其他表单值执行字段验证。
例如，你可以验证密码确认是否与密码相同：

<code src="./validation/demo/password.tsx"></code>

## 基于函数的验证

另一种处理验证的方法是将一个函数传给 `validate`。
该函数接收表单值作为单个参数，并应返回一个包含相应字段错误的对象。
如果字段有效或不需要字段验证，你可以返回 null，或直接从验证结果中省略它。

<code src="./validation/demo/validateFunction.tsx"></code>

## 变化时验证字段

要在所有字段值变化时进行验证，请将 `validateInputOnChange` 选项设置为 `true`：


<code src="./validation/demo/liveValidation.tsx"></code>

你也可以提供一个字段路径数组，仅验证这些值：


<code src="./validation/demo/liveFieldValidation.tsx"></code>

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnChange: true,
});
```

```tsx
import { FORM_INDEX, useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnChange: [
    'name',
    'email',
    `jobs.${FORM_INDEX}.title`,
  ],
});
```

## 失焦时验证字段

要在所有字段失去焦点时进行验证，请将 `validateInputOnBlur` 选项设置为 `true`：


<code src="./validation/demo/blurValidation.tsx"></code>

你也可以提供一个字段路径数组，仅验证这些值：


<code src="./validation/demo/blurFieldValidation.tsx"></code>

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnBlur: true,
});
```

```tsx
import { FORM_INDEX, useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  validateInputOnBlur: ['name', 'email', `jobs.${FORM_INDEX}.title`],
});
```

## 变化时清除字段错误

默认情况下，当值变化时字段错误会被清除。要更改此行为，请将 `clearInputErrorOnChange` 设置为 `false`：


<code src="./validation/demo/clearErrorOnChange.tsx"></code>

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  clearInputErrorOnChange: false,
});
```

## 在 onSubmit 处理程序中进行验证

`form.onSubmit` 接受两个参数：第一个参数是 `handleSubmit` 函数，当验证无错误完成时，
将使用表单值调用它。第二个参数是 `handleErrors` 函数，当验证完成并带有错误时，
将使用错误对象调用它。

你可以使用 `handleErrors` 函数在用户尝试提交没有值的表单时执行某些操作。
例如，你可以显示通知：

<code src="./validation/demo/onSubmitErrors.tsx"></code>

## isValid 处理程序

`form.isValid` 使用给定的验证函数、规则对象或模式执行表单验证，但与
`form.validate` 不同，它不会设置 `form.errors`，而只是返回一个布尔值，指示表单是否有效。
如果任何验证规则是异步的，`form.isValid` 将返回一个 `Promise<boolean>`。

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', age: 0 },
  validate: {
    name: (value) => (value.trim().length < 2 ? 'Too short' : null),
    age: (value) => (value < 18 ? 'Too young' : null),
  },
});

// 使用同步规则时，直接返回布尔值
form.isValid(); // -> false
form.isValid('name'); // -> false
```

## 异步验证

验证规则可以是异步的——返回一个解析为错误信息或 `null` 的 `Promise`。
当所有规则都是同步的时，`form.validate()`、`form.validateField()` 和 `form.isValid()` 直接返回结果（不包装在 `Promise` 中）。
当任何规则是异步的时，这些方法将返回 Promise。
TypeScript 会根据你的验证规则推断正确的返回类型，因此你可以获得精确的类型，而无需手动注解。

当任何异步验证正在进行时，`form.validating` 属性为 `true`，`form.isValidating(path)` 可用于检查单个字段。
`validating` 状态不会为仅包含同步规则的表单设置。

每个规则接收一个 `AbortSignal` 作为第四个参数。当更新的验证取代当前验证时，该信号会被中止，
你可以用它取消进行中的 HTTP 请求并避免竞态条件。

<code src="./validation/demo/asyncValidation.tsx"></code>

## 带防抖的异步验证

当将异步验证与 `validateInputOnChange` 一起使用时，你可以设置 `validateDebounce`，
以避免在每次按键时都触发 API 调用。防抖仅适用于由 `validateInputOnChange` 和 `validateInputOnBlur` 触发的字段级验证——
它不会影响显式的 `form.validate()` 调用或 `form.onSubmit()`。

<code src="./validation/demo/asyncValidationDebounce.tsx"></code>

## 聚焦第一个无效字段

`form.onSubmit` 函数的第二个参数是一个回调函数，当表单验证失败时，
会使用 [errors 对象](/docs/form/errors) 调用它。
你可以使用此回调来聚焦第一个无效字段或执行任何其他操作。

要获取任何输入框的 DOM 节点，请使用 `form.getInputNode('path-to-field')`。注意，
为了让此功能正常工作，你需要将 `form.getInputProps('path-to-field')` 展开到输入元素上。

<code src="./validation/demo/focusError.tsx"></code>
