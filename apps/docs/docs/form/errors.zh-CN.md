---
category: Form
title: Errors
subtitle: 表单错误
description: react-ui Errors 文档。
---


## 错误对象

`form.errors` 是一个包含验证错误的 React 节点对象：

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { firstName: '', lastName: '' },
  validate: {
    firstName: (value) =>
      value.length < 2 ? '名字太短' : null,
    lastName: (value) =>
      value.length < 2 ? '姓氏太短' : null,
  },
});

// 默认情况下 errors 对象为空
form.errors; // -> {}

// 当你手动调用 form.validate 时，错误将被填充
// 或者通过 form.onSubmit 处理程序自动填充
await form.validate();

form.errors; // ->
// {
//   firstName: '名字太短',
//   lastName: '姓氏太短'
// }
```

## 初始错误

与 [初始值](/docs/form/values/) 一样，你可以设置初始表单错误：

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { firstName: '', lastName: '' },
  initialErrors: {
    firstName: '名字太短',
    lastName: '姓氏太短',
  },
});
```

## setErrors 处理程序

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({ mode: 'uncontrolled' });
form.setErrors({ firstName: '太短', email: '邮箱无效' });

form.errors;
// -> { firstName: '太短', email: '邮箱无效' }
```

## setFieldError 处理程序

`form.setFieldError` 处理程序设置给定字段的错误：

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '' },
});

form.setFieldError('email', '邮箱无效');

form.errors; // -> { email: '邮箱无效' }
```

## clearErrors 处理程序

`form.clearErrors` 处理程序清除所有表单错误：

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialErrors: { name: '太短', email: '邮箱无效' },
});

form.clearErrors();

form.errors; // -> {}
```

## clearFieldError 处理程序

`form.clearFieldError` 处理程序清除给定字段的错误：

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialErrors: { name: '太短', email: '邮箱无效' },
});
form.clearFieldError('name');

form.errors; // -> { email: '邮箱无效' }
```

## 错误作为 React 节点

你可以使用任何 React 节点作为错误信息：


注意，为 `false`、`null` 或 `undefined` 的错误将被自动移除：

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '' },
  initialErrors: {
    name: <p>段落错误</p>, // -> 作为 react 元素的错误
    email: 42, // -> 作为数字的错误
  },
});
```

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({
  mode: 'uncontrolled',
  initialErrors: { name: 'name-error', email: null },
});

form.errors; // -> { name: 'name-error' }, email 错误不包含在 errors 对象中
```

## FormErrors 类型

`form.errors` 的类型是 `Record<string, React.ReactNode>`。你可以从 `@xiaoye-react/ui` 导入简写的 `FormErrors` 类型：


你也可以直接从 `form` 实例获取该类型：

```tsx
import type { FormErrors } from '@xiaoye-react/form';
```

```tsx
import { useForm } from '@xiaoye-react/form';

const form = useForm({ mode: 'uncontrolled' });

const handleErrors = (errors: typeof form.errors) => {};
```
