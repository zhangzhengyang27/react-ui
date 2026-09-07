---
category: Form
title: CreateFormContext
subtitle: 创建表单上下文
description: react-ui CreateFormContext 文档。
---


## 用法

`createFormContext` 函数创建一个 context Provider 和 Hook，用于从 context 中获取表单对象：

```tsx
import { TextInput } from '@xiaoye-react/ui';
import { createFormContext } from '@xiaoye-react/form';

// 表单值的定义是必需的
interface FormValues {
  age: number;
  name: string;
}

// createFormContext 返回一个包含 3 个元素的元组：
// FormProvider 是设置表单 context 的组件
// useFormContext Hook 返回之前在 FormProvider 中设置的表单对象
// useForm Hook 的工作方式与包中导出的 useForm 相同，但具有预定义类型
const [FormProvider, useFormContext, useForm] =
  createFormContext<FormValues>();

function ContextField() {
  const form = useFormContext();
  return (
    <TextInput
      label="你的名字"
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  );
}

export function Context() {
  // 按照 use-form 文档中的描述创建表单
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 0,
      name: '',
    },
  });

  // 用 FormProvider 包裹你的表单
  return (
    <FormProvider form={form}>
      <form onSubmit={form.onSubmit(() => {})}>
        <ContextField />
      </form>
    </FormProvider>
  );
}
```

## 将 context 存储在单独的文件中

通常，将表单 context 存储在单独的文件中是一个好主意，以避免循环依赖：


然后你可以从任何地方导入 context 变量：

```tsx
// form-context.ts 文件
import { createFormContext } from '@xiaoye-react/form';

interface UserFormValues {
  age: number;
  name: string;
}

// 你可以给 context 变量起任何名字
export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();
```

```tsx
// NameInput.tsx
import { TextInput } from '@xiaoye-react/ui';
import { useUserFormContext } from './form-context';

export function NameInput() {
  const form = useUserFormContext();
  return (
    <TextInput
      label="姓名"
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  );
}
```

```tsx
// UserForm.tsx
import { NumberInput } from '@xiaoye-react/ui';
import { UserFormProvider, useUserForm } from './form-context';
import { NameInput } from './NameInput';

function UserForm() {
  const form = useUserForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 0,
      name: '',
    },
  });

  return (
    <UserFormProvider form={form}>
      <form onSubmit={form.onSubmit(() => {})}>
        <NumberInput
          label="年龄"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />
        <NameInput />
      </form>
    </UserFormProvider>
  );
}
```
