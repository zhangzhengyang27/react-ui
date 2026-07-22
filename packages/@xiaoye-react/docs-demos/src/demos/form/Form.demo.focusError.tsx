/* oxlint-disable no-console */

import { Button, Group, TextInput } from '@xiaoye-react/ui';
import { isEmail, isNotEmpty, useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, TextInput } from '@xiaoye-react/ui';
import { isEmail, isNotEmpty, useForm } from '@xiaoye-react/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'register-form',
    initialValues: {
      name: '',
      email: '',
    },

    validate: {
      name: isNotEmpty('姓名必填'),
      email: isEmail('无效的邮箱'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(
        (values) => console.log(values),
        (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        }
      )}
    >
      <TextInput
        withAsterisk
        label="你的姓名"
        placeholder="你的姓名"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <TextInput
        withAsterisk
        label="你的邮箱"
        placeholder="yourname@example.com"
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    name: 'register-form',
    initialValues: {
      name: '',
      email: '',
    },

    validate: {
      name: isNotEmpty('姓名必填'),
      email: isEmail('无效的邮箱'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(
        (values) => console.log(values),
        (errors) => {
          const firstErrorPath = Object.keys(errors)[0];
          form.getInputNode(firstErrorPath)?.focus();
        }
      )}
    >
      <TextInput
        withAsterisk
        label="你的姓名"
        placeholder="你的姓名"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

      <TextInput
        withAsterisk
        label="你的邮箱"
        placeholder="yourname@example.com"
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const focusError: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
