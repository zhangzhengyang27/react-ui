---
category: Form
title: UseForm
subtitle: useForm
description: react-ui UseForm 文档。
---


## 安装

`@xiaoye-react/ui` 包不依赖任何其他库。你可以将其与 `@xiaoye-react/ui` 输入框一起使用，也可以单独使用：

<InstallScript packages="@xiaoye-react/ui"></InstallScript>

## 用法

<code src="./use-form/demo/usage.tsx"></code>

## API 概览

下面的所有示例都使用以下示例 use-form Hook。


### 值

[表单值指南](/docs/form/values/)


### 列表项

[嵌套字段指南](/docs/form/nested/)


### 验证

[表单验证指南](/docs/form/validation/)


### 错误

[表单错误指南](/docs/form/errors/)

当定义的验证规则被违反、在 useForm 属性中指定了 `initialErrors`，
或手动设置了验证错误时，就会发生验证错误。


### onReset 和 onSubmit

表单 `onSubmit` 和 `onReset` 事件处理程序的包装函数。`onSubmit` 处理程序接受第二个参数，
当验证失败时，将使用错误对象调用该参数。


### onSubmitPreventDefault 选项

默认情况下，会在表单 `onSubmit` 处理程序上调用 `event.preventDefault()`。
如果你想更改此行为，可以将 `onSubmitPreventDefault` 选项
传给 `useForm` Hook。它可以具有以下值：

- `always`（默认）- 始终调用 `event.preventDefault()`
- `never` - 从不调用 `event.preventDefault()`
- `validation-failed` - 仅在验证失败时调用 `event.preventDefault()`


### 触碰和脏状态

[触碰与脏状态指南](/docs/form/status/)

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    path: '',
    path2: '',
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },
    fruits: [
      { name: 'Banana', available: true },
      { name: 'Orange', available: false },
    ],
    accepted: false,
  },
});
```

```tsx
// 获取当前表单值
form.getValues();

// 设置所有表单值
form.setValues(values);

// 使用上一个状态设置所有表单值
form.setValues((prev) => ({ ...prev, ...values }));

// 设置单个字段的值
form.setFieldValue('path', value);

// 设置嵌套字段的值
form.setFieldValue('user.firstName', 'Jane');

// 将表单值重置为 `initialValues`，
// 清除所有验证错误，
// 重置触碰和脏状态
form.reset();

// 将 `path` 处的字段重置为其初始值
form.resetField('path');

// 设置初始值，用于表单重置时
form.setInitialValues({ values: 'object' });
```

```tsx
// 在指定路径插入给定的列表项
form.insertListItem('fruits', { name: 'Apple', available: true });

// 可以提供可选索引来指定嵌套字段中的位置。
// 如果提供了索引，项目将插入到给定位置。
// 如果索引大于当前列表长度，元素将插入到最后。
form.insertListItem('fruits', { name: 'Orange', available: true }, 1);

// 删除指定路径和索引处的列表项。
form.removeListItem('fruits', 1);

// 用新值替换指定路径和索引处的列表项。
form.replaceListItem('fruits', 1, { name: 'Apple', available: true });

// 交换指定路径处列表中的两个项目。
// 你应确保 `from` 和 `to` 索引处都有元素。
form.reorderListItem('fruits', { from: 1, to: 0 });
```

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    email: '',
    user: {
      firstName: '',
      lastName: '',
    },
  },
  validate: {
    email: (value) => (value.length < 2 ? '无效的邮箱' : null),
    user: {
      firstName: (value) =>
        value.length < 2
          ? 'First name must have at least 2 letters'
          : null,
    },
  },
});

// 使用指定的 `validate` 函数或模式验证所有字段，设置 form.errors
await form.validate();

// 验证指定路径处的单个字段，设置 form.errors
await form.validateField('user.firstName');

// 与 form.validate 工作方式相同，但不设置 form.errors，返回 Promise<boolean>
await form.isValid();
await form.isValid('user.firstName');

// 当任何异步验证正在运行时，值为 true
form.validating;

// 当指定字段的异步验证正在运行时，值为 true
form.isValidating('email');
```

```tsx
// 获取当前错误状态
form.errors;

// 设置所有错误
form.setErrors({ path: 'Error message', path2: 'Another error' });

// 在指定路径设置错误信息
form.setFieldError('user.lastName', 'No special characters allowed');

// 清除所有错误
form.clearErrors();

// 清除指定路径处字段的错误
form.clearFieldError('path');
```

```tsx
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({ mode: 'uncontrolled' });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <>
      {/* 将 handleSubmit 作为单个参数传入，以接收验证后的值 */}
      <form onSubmit={form.onSubmit(handleSubmit)} />

      {/* 传入第二个参数来处理错误 */}
      <form
        onSubmit={form.onSubmit(
          (values, event) => {
            console.log(
              values, // <- 提交时刻的 form.getValues()
              event // <- 表单元素提交事件
            );
          },
          (validationErrors, values, event) => {
            console.log(
              validationErrors, // <- 提交时刻的 form.errors
              values, // <- 提交时刻的 form.getValues()
              event // <- 表单元素提交事件
            );
          }
        )}
      />

      {/* form.onReset 调用 form.reset */}
      <form onReset={form.onReset}></form>
    </>
  );
}
```

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  onSubmitPreventDefault: 'never',
});
```

```tsx
// 如果用户以任何方式与表单中的任何字段交互过，则返回 true
form.isTouched();

// 如果用户与指定路径处的字段交互过，则返回 true
form.isTouched('path');

// 设置所有触碰值
form.setTouched({ 'user.firstName': true, 'user.lastName': false });

// 清除所有字段的触碰状态
form.resetTouched();

// 如果表单值与 initialValues 不相等，则返回 true
form.isDirty();

// 如果字段值与 initialValues 不相等，则返回 true
form.isDirty('path');

// 设置所有字段的脏状态
form.setDirty({ 'user.firstName': true, 'user.lastName': false });

// 清除所有字段的脏状态，保存 form.values 快照
// 调用 form.resetDirty 后，form.isDirty 将比较
// form.getValues() 与快照，而不是 initialValues
form.resetDirty();
```

## UseFormReturnType

当你想将 `form` 作为 prop 传递给另一个组件时，可以使用 `UseFormReturnType`：

```tsx
import { TextInput } from '@xiaoye-react/ui';
import { useForm, UseFormReturnType } from '@xiaoye-react/ui';

interface FormValues {
  name: string;
  occupation: string;
}

function NameInput({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <TextInput
      key={form.key('name')}
      {...form.getInputProps('name')}
    />
  );
}

function OccupationInput({
  form,
}: {
  form: UseFormReturnType<FormValues>;
}) {
  return (
    <TextInput
      key={form.key('occupation')}
      {...form.getInputProps('occupation')}
    />
  );
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', occupation: '' },
  });
  return (
    <>
      <NameInput form={form} />
      <OccupationInput form={form} />
    </>
  );
}
```
