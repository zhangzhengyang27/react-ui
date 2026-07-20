/* oxlint-disable no-console */

import { Box, Button, Group, PasswordInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useForm } from '@react-ui/form';
import { PasswordInput, Group, Button, Box } from '@react-ui/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: 'secret',
      confirmPassword: 'sevret',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <PasswordInput
          label="密码"
          placeholder="密码"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          mt="sm"
          label="确认密码"
          placeholder="确认密码"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">提交</Button>
        </Group>
      </form>
    </Box>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: 'secret',
      confirmPassword: 'sevret',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <PasswordInput
          label="密码"
          placeholder="密码"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          mt="sm"
          label="确认密码"
          placeholder="确认密码"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">提交</Button>
        </Group>
      </form>
    </Box>
  );
}

export const password: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
