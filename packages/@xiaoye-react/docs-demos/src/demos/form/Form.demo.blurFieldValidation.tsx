/* oxlint-disable no-console */

import { Button, NumberInput, TextInput } from '@xiaoye-react/ui';
import { FORM_INDEX, useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useForm, FORM_INDEX } from '@xiaoye-react/form';
import { NumberInput, TextInput, Button } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnBlur: [
      'email',
      'name',
      // use FORM_INDEX to reference fields indices
      \`jobs.\${FORM_INDEX}.title\`,
    ],
    initialValues: { name: '', email: '', age: 0, jobs: [{ title: '' }, { title: '' }] },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? '姓名至少包含 2 个字母' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : '无效的邮箱'),
      age: (value) => (value < 18 ? '注册年龄必须至少 18 岁' : null),
      jobs: {
        title: (value) => (value.length < 2 ? 'Job must have at least 2 letters' : null),
      },
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
      <TextInput
        mt="sm"
        label="工作 1"
        placeholder="工作 1"
        key={form.key('jobs.0.title')}
        {...form.getInputProps('jobs.0.title')}
      />
      <TextInput
        mt="sm"
        label="工作 2"
        placeholder="工作 2"
        key={form.key('jobs.1.title')}
        {...form.getInputProps('jobs.1.title')}
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
    validateInputOnBlur: [
      'email',
      'name',
      // Use FORM_INDEX to reference fields indices
      `jobs.${FORM_INDEX}.title`,
    ],
    initialValues: { name: '', email: '', age: 0, jobs: [{ title: '' }, { title: '' }] },

    // Functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? '姓名至少包含 2 个字母' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : '无效的邮箱'),
      age: (value) => (value < 18 ? '注册年龄必须至少 18 岁' : null),
      jobs: {
        title: (value) => (value.length < 2 ? 'Job must have at least 2 letters' : null),
      },
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
      <TextInput
        mt="sm"
        label="工作 1"
        placeholder="工作 1"
        key={form.key('jobs.0.title')}
        {...form.getInputProps('jobs.0.title')}
      />
      <TextInput
        mt="sm"
        label="工作 2"
        placeholder="工作 2"
        key={form.key('jobs.1.title')}
        {...form.getInputProps('jobs.1.title')}
      />
      <Button type="submit" mt="sm">
        提交
      </Button>
    </form>
  );
}

export const blurFieldValidation: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
