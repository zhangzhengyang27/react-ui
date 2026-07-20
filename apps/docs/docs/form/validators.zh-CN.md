---
category: Form
title: Validators
subtitle: 校验器
description: react-ui Validators 文档。
---


## 用法

`@react-ui/ui` 包导出了多个函数，可用于 [验证规则对象](/docs/form/validation/#validation-with-rules-object)。
验证函数体积很小，只提供基础验证。如果你有复杂的验证需求，请使用其他类型的 [验证](/docs/form/validation/)。

<code src="./validators/demo/validators.tsx"></code>

## 可选错误信息

以下所有验证器函数的最后一个参数都是可选的。如果未设置错误信息，则验证失败的字段
将只显示无效样式而不显示错误信息：

<code src="./validators/demo/validatorsEmpty.tsx"></code>

## isNotEmpty

`isNotEmpty` 检查表单值是否不为空。空字符串、空数组、`false`、`null` 和 `undefined`
值被视为空。字符串在验证前会被去除首尾空格。

```tsx
import { isNotEmpty, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    name: '',
    acceptTermsOfUse: false,
    country: null,
    previousJobs: [],
  },

  validate: {
    // 空字符串被视为无效
    name: isNotEmpty('姓名不能为空'),

    // false 值被视为无效
    acceptTermsOfUse: isNotEmpty('你必须接受使用条款'),

    // null 被视为无效
    country: isNotEmpty('请选择你的国家'),

    // 空数组被视为无效
    previousJobs: isNotEmpty('请至少输入一项工作'),
  },
});
```

## isEmail

`isEmail` 使用 `/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/` 正则表达式来判断表单值是否为邮箱：

```tsx
import { isEmail, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    email: '',
  },

  validate: {
    email: isEmail('邮箱无效'),
  },
});
```

## matches

`matches` 检查表单值是否与给定的正则表达式匹配。如果表单值不是字符串，验证将失败。

```tsx
import { matches, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    color: '',
  },

  validate: {
    color: matches(/^#([0-9a-f]{3}){1,2}$/, '颜色无效'),
  },
});
```

## isInRange

`isInRange` 检查表单值是否在给定的 `min`-`max` 范围内。如果表单值不是数字，验证将失败。

```tsx
import { isInRange, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    maxRange: 0,
    minRange: 0,
    minMaxRange: 0,
  },

  validate: {
    maxRange: isInRange({ max: 20 }, '值必须小于或等于 20'),
    minRange: isInRange({ min: 10 }, '值必须大于或等于 10'),
    minMaxRange: isInRange(
      { min: 10, max: 20 },
      '值必须在 10 到 20 之间'
    ),
  },
});
```

## hasLength

`hasLength` 检查表单值长度是否在给定的 `min`-`max` 范围内。
`hasLength` 可正确处理字符串、数组以及任何具有 `length` 属性的对象。
字符串在验证前会被去除首尾空格。

```tsx
import { hasLength, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    exact: '',
    maxLength: '',
    minLength: '',
    minMaxLength: '',
  },

  validate: {
    exact: hasLength(5, '值必须恰好有 5 个字符'),
    maxLength: hasLength(
      { max: 20 },
      '值必须有 20 个或更少字符'
    ),
    minLength: hasLength(
      { min: 10 },
      '值必须有 10 个或更多字符'
    ),
    minMaxLength: hasLength(
      { min: 10, max: 20 },
      '值必须有 10-20 个字符'
    ),
  },
});
```

## matchesField

`matchesField` 检查表单值是否与另一个表单字段的值相同。
注意 `matchesField` 只能用于基本类型值（数组和对象无法比较）。

```tsx
import { matchesField, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    password: '',
    confirmPassword: '',
  },

  validate: {
    confirmPassword: matchesField(
      'password',
      '两次输入的密码不一致'
    ),
  },
});
```

## isJSONString

`isJSONString` 检查表单值是否为有效的 JSON 字符串。

```tsx
import { isJSONString, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    json: '',
  },

  validate: {
    json: isJSONString('JSON 字符串无效'),
  },
});
```

## isUrl

`isUrl` 检查表单值是否为有效的 URL。默认情况下，只允许 `http` 和 `https` 协议，
并且会拒绝 `localhost`。你可以通过将选项作为第一个参数传递来自定义此行为。

```tsx
import { isUrl, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    website: '',
    internalUrl: '',
    ftpServer: '',
  },

  validate: {
    // 基础 URL 验证
    website: isUrl('URL 无效'),

    // 允许 localhost URL
    internalUrl: isUrl(
      { allowLocalhost: true },
      'URL 无效'
    ),

    // 允许自定义协议
    ftpServer: isUrl(
      { protocols: ['ftp', 'https'] },
      'FTP 或 HTTPS URL 无效'
    ),
  },
});
```

## isOneOf

`isOneOf` 检查表单值是否包含在给定的允许值列表中。
使用严格相等进行比较。

```tsx
import { isOneOf, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    role: '',
    priority: 0,
  },

  validate: {
    role: isOneOf(
      ['admin', 'user', 'moderator'],
      '角色无效'
    ),
    priority: isOneOf([1, 2, 3], '优先级必须是 1、2 或 3'),
  },
});
```

## isNotEmptyHTML

`isNotEmptyHTML` 检查表单值是否不是空 HTML 字符串。空字符串、仅包含 HTML 标签和空格的字符串被视为空。

```tsx
import { isNotEmptyHTML, useForm } from '@react-ui/ui';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    html: '',
  },

  validate: {
    html: isNotEmptyHTML('HTML 不能为空'),
  },
});
```
