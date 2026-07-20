---
category: Form
title: SchemaValidation
subtitle: Schema 校验
description: react-ui SchemaValidation 文档。
---


## 基于模式的验证

`@react-ui/ui` 内置支持 [Standard Schema](https://standardschema.dev/)——
一个由许多流行的模式验证库实现的社区规范，包括
[zod](https://www.npmjs.com/package/zod)、[valibot](https://www.npmjs.com/package/valibot)
和 [arktype](https://www.npmjs.com/package/arktype)。使用 `schemaResolver` 来验证
表单，无需额外的 resolver 包。

[支持的库完整列表](https://standardschema.dev/schema#what-schema-libraries-implement-the-spec)

如果你不知道该选择哪个模式验证库，请使用 [zod](https://www.npmjs.com/package/zod)——
它是最现代、最开发者友好的库。

## 同步和异步模式

默认情况下，`schemaResolver` 返回一个可能返回 `Promise` 的函数，因为
Standard Schema 规范允许异步验证。当你知道模式是同步的（例如 Zod、Valibot）时，
传递 `{ sync: true }` 以获取 `form.validate()`、`form.validateField()` 和 `form.isValid()` 的同步返回类型。

## zod

安装：

<InstallScript packages="zod"></InstallScript>

基础字段验证：


嵌套字段验证：


列表字段验证：


异步验证——当模式中包含异步检查（例如通过 API 调用检查邮箱是否已被占用）时，
请使用不带 `{ sync: true }` 的 `schemaResolver`。
在这种情况下，`form.validate()`、`form.validateField()` 和 `form.isValid()` 返回 Promise：

```tsx
import { z } from 'zod/v4';
import { useForm, schemaResolver } from '@react-ui/ui';

const schema = z.object({
  name: z.string().min(2, { error: '名字应至少有 2 个字母' }),
  email: z.email({ error: '邮箱无效' }),
  age: z.number().min(18, { error: '你必须年满 18 岁才能创建账户' }),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    email: '',
    age: 16,
  },
  validate: schemaResolver(schema, { sync: true }),
});

form.validate();
form.errors;
// -> {
//  name: '名字应至少有 2 个字母',
//  email: '邮箱无效',
//  age: '你必须年满 18 岁才能创建账户'
// }
```

```tsx
import { z } from 'zod/v4';
import { useForm, schemaResolver } from '@react-ui/ui';

const nestedSchema = z.object({
  nested: z.object({
    field: z.string().min(2, { error: '字段应至少有 2 个字母' }),
  }),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    nested: {
      field: '',
    },
  },
  validate: schemaResolver(nestedSchema, { sync: true }),
});

form.validate();
form.errors;
// -> {
//  'nested.field': '字段应至少有 2 个字母',
// }
```

```tsx
import { z } from 'zod/v4';
import { useForm, schemaResolver } from '@react-ui/ui';

const listSchema = z.object({
  list: z.array(
    z.object({
      name: z.string().min(2, { error: '名字应至少有 2 个字母' }),
    })
  ),
});

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    list: [{ name: '' }],
  },
  validate: schemaResolver(listSchema, { sync: true }),
});

form.validate();
form.errors;
// -> {
//  'list.0.name': '名字应至少有 2 个字母',
// }
```

```tsx
import { z } from 'zod/v4';
import { useForm, schemaResolver } from '@react-ui/ui';

const schema = z
  .object({
    email: z.email({ error: '邮箱无效' }),
  })
  .refine(
    async (data) => {
      const isTaken = await checkEmailExists(data.email);
      return !isTaken;
    },
    { error: '邮箱已被占用', path: ['email'] }
  );

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { email: '' },
  validate: schemaResolver(schema),
});

// form.validate() 返回一个 Promise
await form.validate();
```
