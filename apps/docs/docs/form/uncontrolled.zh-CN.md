---
category: Form
title: Uncontrolled
subtitle: 非受控模式
description: react-ui Uncontrolled 文档。
---


## 受控模式

受控模式是表单的默认模式。在此模式下，表单数据
存储在 React state 中，当表单数据变化时所有组件都会重新渲染。
受控模式不推荐用于大型表单。

受控模式表单的示例：


如上面的示例所示，`form.values` 在每次变化时都会更新。这
意味着每个使用 `form.values` 的组件都会在每次变化时重新渲染。

<code src="./uncontrolled/demo/controlled.tsx"></code>

## 非受控模式

非受控模式是在 7.8.0 版本中引入的替代表单模式。
它现在是所有表单推荐使用的模式。
非受控模式为大型表单提供了显著的性能提升。

在非受控模式下，表单数据存储在 ref 中而不是 React state 中，
`form.values` 不会在每次变化时更新。

非受控模式表单的示例：


如上面的示例所示，`form.values` 根本不会更新。

<code src="./uncontrolled/demo/uncontrolled.tsx"></code>

## form.getValues

`form.getValues` 函数返回当前表单值。它可以
在组件中的任何地方使用以获取当前表单值。它可以在
受控和非受控模式下使用。


虽然 `form.values` 可用于在受控模式下获取当前表单值，但
建议使用 `form.getValues`，因为它始终返回最新的
值，而 `form.values` 在非受控模式下是过时的，在受控模式下状态更新之前也是过时的。


`form.getValues()` 返回当前表单值的 ref 值。这意味着
你不能将它传递给 `useEffect` 依赖数组，因为它始终是相同的
引用。


不要使用 `useEffect` 观察表单值，而应使用 `onValuesChange` 回调
来监听表单值变化：

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: 'John Doe' },
});

form.getValues(); // { name: 'John Doe' }

form.setValues({ name: 'John Smith' });
form.getValues(); // { name: 'John Smith' }
```

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: 'John Doe' },
});

const handleNameChange = () => {
  form.setFieldValue('name', 'Test Name');

  // ❌ 不要使用 form.values 获取当前表单值
  // 在受控模式下，form.values 在下次重新渲染前具有陈旧的 name 值
  // 在非受控模式下始终过时
  console.log(form.values); // { name: 'John Doe' }

  // ✅ 使用 form.getValues 获取当前表单值
  // form.getValues 始终返回最新的表单值
  console.log(form.getValues()); // { name: 'Test Name' }
};
```

```tsx
import { useEffect } from 'react';
import { useForm } from '@xiaoye-react/ui';

const form = useForm({ mode: 'uncontrolled' });

useEffect(() => {
  // ❌ 这样不会生效，因为 form.getValues() 是 ref 值
  // 并且始终是相同的引用
}, [form.getValues()]);
```

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: 'John Doe' },
  onValuesChange: (values) => {
    // ✅ 这将在每次表单值变化时调用
    console.log(values);
  },
});
```

## form.getInputProps

[form.getInputProps](/docs/form/get-input-props/) 为受控和
非受控模式返回不同的 props。在受控模式下，返回的对象具有 `value` prop，
而在非受控模式下，它具有 `defaultValue` prop。

非受控模式依赖 `form.key()` 返回的 `key` 来在调用 `form.setFieldValue` 或 `form.setValues` 时更新
组件。你应将 `form.key()` 提供的 `key` 设置到输入组件上，以确保它具有
更新的值：


如果你需要创建 [字段列表](/docs/form/nested/#nested-arrays)，
不要直接将 `key` 传递给输入组件。相反，添加一个包装
元素并将 `key` 传递给它：

```tsx
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: '' },
  });

  return (
    <input {...form.getInputProps('text')} key={form.key('text')} />
  );
}
```

```tsx
import { useForm } from '@xiaoye-react/ui';
import { randomId } from '@xiaoye-react/hooks';

// ❌ 错误：即使在列表中也不要覆盖 key prop
function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      jobs: [{ company: 'Google' }, { company: 'Facebook' }],
    },
  });

  const fields = form.getValues().jobs.map((_, index) => (
      <input
        {...form.getInputProps(`jobs.${index}.company`)}
        key={index}
      />
    ));

  return <form>{fields}</form>;
}

// ✅ 正确：添加一个包装元素并将 key 传递给它
function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      jobs: [
        { company: 'Google', key: randomId() },
        { company: 'Facebook', key: randomId() },
      ],
    },
  });

  const fields = form.getValues().jobs.map((item, index) => (
      <div key={item.key}>
        <input
          {...form.getInputProps(`jobs.${index}.company`)}
          key={form.key(`jobs.${index}.company`)}
        />
      </div>
    ));

  return <form>{fields}</form>;
}
```

## 自定义组件中的非受控模式

如果你想构建一个支持非受控表单模式的自定义组件，
你必须添加对 `defaultValue` prop 的支持。添加 `defaultValue` 支持的最佳方式是使用 [use-uncontrolled](/docs/hooks/use-uncontrolled/) Hook：

```tsx
import { useUncontrolled } from '@xiaoye-react/hooks';

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

// ✅ CustomInput 同时支持受控和非受控模式
function CustomInput({
  value,
  defaultValue,
  onChange,
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 'Final',
    onChange,
  });

  return (
    <input
      type="text"
      value={_value}
      onChange={(event) => handleChange(event.currentTarget.value)}
    />
  );
}

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: 'Initial' },
  });

  // ✅ CustomInput 支持 `defaultValue` prop，
  // 因此可以在非受控模式下使用
  return (
    <CustomInput
      {...form.getInputProps('text')}
      key={form.key('text')}
    />
  );
}
```
