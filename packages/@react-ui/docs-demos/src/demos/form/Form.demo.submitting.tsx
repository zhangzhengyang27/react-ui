import { useState } from 'react';
import { Button, Group, Stack, Text, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Group, Stack, Text, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';

const asyncSubmit = (values: any) =>
  new Promise((resolve) => setTimeout(() => resolve(values), 3000));

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '张三' },
  });

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    await asyncSubmit(values);
    setCompleted(true);
  };

  if (completed) {
    return (
      <Stack>
        <Text>表单已提交！</Text>
        <Button onClick={() => setCompleted(false)}>重置为初始状态</Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="姓名"
        placeholder="你的姓名"
        key={form.key('name')}
        disabled={form.submitting}
        {...form.getInputProps('name')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={form.submitting}>
          提交
        </Button>
      </Group>
    </form>
  );
}
`;

const asyncSubmit = (values: any) =>
  new Promise((resolve) => setTimeout(() => resolve(values), 3000));

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '张三' },
  });

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    await asyncSubmit(values);
    setCompleted(true);
  };

  if (completed) {
    return (
      <Stack>
        <Text>表单已提交！</Text>
        <Button onClick={() => setCompleted(false)}>重置为初始状态</Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="姓名"
        placeholder="你的姓名"
        key={form.key('name')}
        disabled={form.submitting}
        {...form.getInputProps('name')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={form.submitting}>
          提交
        </Button>
      </Group>
    </form>
  );
}

export const submitting: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
