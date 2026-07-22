/* oxlint-disable no-console */

import { Button, NumberInput, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useForm } from '@xiaoye-react/form';
import { NumberInput, TextInput, Button } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? '姓名至少包含 2 个字母' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : '无效的邮箱'),
      age: (value) => (value < 18 ? '注册年龄必须至少 18 岁' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="姓名"
        placeholder="姓名"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="邮箱"
        placeholder="邮箱"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="年龄"
        placeholder="年龄"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <Button type="submit" mt="sm">
        提交
      </Button>
    </form>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: true,
    initialValues: { name: '', email: '', age: 0 },

    // Functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? '姓名至少包含 2 个字母' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : '无效的邮箱'),
      age: (value) => (value < 18 ? '注册年龄必须至少 18 岁' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="姓名"
        placeholder="姓名"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="sm"
        label="邮箱"
        placeholder="邮箱"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <NumberInput
        mt="sm"
        label="年龄"
        placeholder="年龄"
        min={0}
        max={99}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <Button type="submit" mt="sm">
        提交
      </Button>
    </form>
  );
}

export const blurValidation: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
