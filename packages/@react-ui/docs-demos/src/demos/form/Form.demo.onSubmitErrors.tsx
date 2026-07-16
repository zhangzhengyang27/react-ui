/* oxlint-disable no-console */

import { Button, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { notifications } from '@react-ui/notifications';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useForm } from '@react-ui/form';
import { TextInput, Button } from '@react-ui/ui';
import { notifications } from '@react-ui/notifications';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: (value) => (value.length < 2 ? '姓名至少包含 2 个字母' : null),
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : '无效的邮箱'),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: '请填写姓名字段', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: '请提供有效的邮箱', color: 'red' });
    }
  };

  return (
    <form onSubmit={form.onSubmit(console.log, handleError)}>
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
    initialValues: { name: '', email: '' },
    validate: {
      name: (value) => (value.length < 2 ? '姓名至少包含 2 个字母' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : '无效的邮箱'),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: '请填写姓名字段', color: 'red' });
    } else if (errors.email) {
      notifications.show({ message: '请提供有效的邮箱', color: 'red' });
    }
  };

  return (
    <form onSubmit={form.onSubmit(console.log, handleError)}>
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
      <Button type="submit" mt="sm">
        提交
      </Button>
    </form>
  );
}

export const onSubmitErrors: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
