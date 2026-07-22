---
category: Form
title: Values
subtitle: 表单值
description: react-ui Values 文档。
---


## 初始值

在大多数情况下，你都应该设置 `initialValues`：

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
  },
});
```

## setValues 处理程序

使用 `form.setValues` 可以设置所有表单值。例如，你可以在收到后端 API 响应后设置值：

<code src="./values/demo/setValues.tsx"></code>

## setValues 部分设置

`form.setValues` 也可用于一次设置多个值。payload 将与当前 values 状态进行浅合并：

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '', age: 0 },
});

form.setValues({ name: '张三', age: 21 });
form.getValues(); // -> { name: '张三', email: '', age: 21 }
```

## 初始化表单

调用时，`form.initialize` 处理程序将 `initialValues` 和 `values` 设置为相同的值，
并将表单标记为已初始化。它只能使用一次。后续的 `form.initialize` 调用将被忽略。

`form.initialize` 在你希望将表单值与后端 API 响应同步时非常有用：


与 [TanStack Query](https://tanstack.com/query/latest)（react-query）一起使用的示例：


注意，`form.initialize` 会清除调用前设置的所有值。
在 `form.initialize` 被调用之前，通常最好在所有表单字段上设置 `readOnly` 或 `disabled`，
以防止数据丢失。你可以通过 [enhanceGetInputProps](/docs/form/get-input-props/#enhancegetinputprops) 实现这一点：

```tsx
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: () => fetch('/api/users/me').then((res) => res.json()),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (query.data) {
      // 即使 query.data 变化，表单也只会初始化一次
      form.initialize(query.data);
    }
  }, [query.data]);
}
```

<code src="./values/demo/initialize.tsx"></code>

<code src="./values/demo/enhanceGetInputPropsForm.tsx"></code>

## setFieldValue 处理程序

`form.setFieldValue` 处理程序允许你设置给定路径处字段的值：

<code src="./values/demo/setFieldValue.tsx"></code>

## reset 处理程序

`form.reset` 处理程序将值设置为 `initialValues` 并清除所有错误：

<code src="./values/demo/reset.tsx"></code>

## setInitialValues 处理程序

`form.setInitialValues` 处理程序允许你在表单初始化后更新 `initialValues`：

```tsx
import { useEffect } from 'react';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        // 在表单初始化后更新初始值
        // 这些值将在 form.reset 中使用
        // 并用于比较值以获取脏状态
        form.setInitialValues(data);
        form.setValues(data);
      });
  }, []);
}
```

## transformValues

使用 `transformValues` 在 `onSubmit` 处理程序提交之前转换值。
例如，它可以用于将多个字段合并为一个，或转换类型：

<code src="./values/demo/transformValues.tsx"></code>

## 获取转换后的值

你可以通过调用 `form.getTransformedValues` 在 `form.onSubmit` 方法之外获取转换后的值。
它接受一个可选参数 `values`，用于指定需要转换的值。如果未提供，则返回 `form.getValues()` 的转换结果：

```tsx
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
    }),
  });

  form.getTransformedValues(); // -> { fullName: 'John Doe' }
  form.getTransformedValues({
    firstName: 'Jane',
    lastName: 'Loe',
  }); // { fullName: 'Jane Loe' }
}
```

## onValuesChange

`onValuesChange` 函数在每次表单值变化时调用。使用它
代替 `useEffect` 来订阅表单值变化：

<code src="./values/demo/onValuesChange.tsx"></code>

## form.watch

`form.watch` 是一个 effect 函数，允许订阅特定表单字段的变化。
它接受一个字段路径和一个回调函数，回调函数会传入新值、旧值、触碰和脏字段状态：


注意，`form.watch` 底层使用 `useEffect`——所有 Hook 规则都适用。
例如，你不能在条件语句或循环中使用 `form.watch`。

```tsx
function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },
  });

  // ❌ 这样不会生效
  if (Math.random() > 0.5) {
    form.watch('name', ({ previousValue, value, touched, dirty }) => {
      console.log({ previousValue, value, touched, dirty });
    });
  }
}
```

<code src="./values/demo/watch.tsx"></code>

## form.watch 与数组

`form.watch` 适用于数组字段——当数组中任何嵌套字段变化，或执行列表操作
（`insertListItem`、`removeListItem`、`reorderListItem`、`replaceListItem`）
时，都会触发回调：

<code src="./values/demo/watchList.tsx"></code>

## form.watch 级联

默认情况下，`form.watch` 在嵌套字段变化时会通知父级 watcher
（向上级联）。要同时启用向下级联（当直接设置父级时通知嵌套字段 watcher），
请设置 `cascadeUpdates: true`：

<code src="./values/demo/cascadeUpdates.tsx"></code>

## 获取值类型

```tsx
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({ initialValues: { name: '', age: 0 } });

  // 获取推断的表单值类型，将是 `{ name: string; age: number }`
  type FormValues = typeof form.values;

  // 在 handleSubmit 函数或任何其他地方使用值类型
  const handleSubmit = (values: FormValues) => console.log(values);
}
```

## 获取转换后的值类型

要获取转换后的值（[transformValues](#transformvalues) 的输出），请使用 `TransformedValues` 类型。
当你想创建自定义提交函数时，它会很有用：

```tsx
import { TransformedValues, useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      locationId: '2',
    },

    transformValues: (values) => ({
      ...values,
      locationId: Number(values.locationId),
    }),
  });

  type Transformed = TransformedValues<typeof form>;
  // -> { name: string, locationId: number }

  const handleSubmit = (values: TransformedValues<typeof form>) => {};

  return <form onSubmit={form.onSubmit(handleSubmit)} />;
}
```

## 设置值类型

默认情况下，表单值类型将从 `initialValues` 推断。
要避免这种情况，你可以向 `useForm` Hook 传递一个类型。这种方法在
类型无法正确推断或你想提供更具体的类型时非常有用：

```tsx
import { useForm } from '@xiaoye-react/ui';

interface FormValues {
  name: string; // 常规字段，与推断类型相同
  role: 'user' | 'admin'; // 联合类型，比推断的 string 类型更具体

  // 可能为 undefined 或 null 的值
  // 在严格模式下无法正确推断
  age: number | undefined;
  registeredAt: Date | null;

  // 空数组无法正确推断
  jobs: string[];
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      role: 'user',
      age: undefined,
      registeredAt: null,
      jobs: [],
    },
  });
}
```

## 设置转换后的值类型

默认情况下，转换后的值类型与表单值类型相同。要设置不同的类型，你可以向 `useForm` 传递第二个泛型
参数：

```tsx
import { useForm } from '@xiaoye-react/ui';

interface FormValues {
  name: string;
  locationId: string;
}

interface TransformedValues {
  name: string;
  locationId: number;
}

function Demo() {
  const form = useForm<FormValues, TransformedValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      locationId: '2',
    },

    transformValues: (values) => ({
      ...values,
      locationId: Number(values.locationId),
    }),
  });
}
```
