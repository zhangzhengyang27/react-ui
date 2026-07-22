---
category: Form
title: Nested
subtitle: 嵌套表单
description: react-ui Nested 文档。
---


## 属性路径

大多数 `form` 处理程序接受一个属性路径作为第一个参数。
属性路径包含目标属性所在的对象/数组的键/索引：

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },

    fruits: [
      { name: 'Banana', available: true },
      { name: 'Orange', available: false },
    ],

    deeply: {
      nested: {
        object: [{ item: 1 }, { item: 2 }],
      },
    },
  },
});

// 由 user 对象的 firstName 字段控制的输入框的 props
form.getInputProps('user.firstName');

// 设置 fruits 数组第二个位置处对象中 `name` 字段的值：
form.setFieldValue('fruits.1.name', 'Carrot');

// 验证深层嵌套字段
await form.validateField('deeply.nested.object.0.item');
```

## 嵌套对象

<code src="./nested/demo/nested.tsx"></code>

## 设置嵌套对象值

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      name: '',
      occupation: '',
    },
  },
});

// 你可以单独设置每个字段的值
form.setFieldValue('user.name', 'John');
form.setFieldValue('user.occupation', 'Engineer');

// 或者设置整个对象
form.setFieldValue('user', { name: 'Jane', occupation: 'Architect' });
```

## 嵌套对象值验证

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      name: '',
      occupation: '',
    },
  },

  validate: {
    user: {
      name: (value) =>
        value.length < 2 ? '名字太短' : null,
      occupation: (value) =>
        value.length < 2 ? '职业太短' : null,
    },
  },
});

await form.validate();
form.errors; // -> { 'user.name': '名字太短', 'user.occupation': '职业太短' }
```

## 嵌套数组

<code src="./nested/demo/lists.tsx"></code>

## 列表处理程序

`useForm` Hook 提供以下处理程序来管理列表状态：

- `removeListItem` – 删除给定索引处的列表项
- `insertListItem` – 在给定索引处插入列表项（如果未指定索引，则追加到列表末尾）
- `reorderListItem` – 在指定字段处重新排序给定位置的列表项
- `replaceListItem` – 用新值替换给定索引处的列表项

## 列表值验证

```tsx
import { useForm } from '@xiaoye-react/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    users: [
      { name: '张三', age: 12 },
      { name: '', age: 22 },
    ],
  },

  validate: {
    users: {
      name: (value) =>
        value.length < 2
          ? '名字应至少有 2 个字母'
          : null,
      age: (value) =>
        value < 18 ? '用户必须年满 18 岁' : null,
    },
  },
});

// 验证列表项字段
await form.validateField('users.1.name');

// 或与其他字段一起验证
await form.validate();
console.log(form.errors);
// {
//  'users.0.age': '用户必须年满 18 岁',
//  'users.1.name': '名字应至少有 2 个字母'
// }
```
