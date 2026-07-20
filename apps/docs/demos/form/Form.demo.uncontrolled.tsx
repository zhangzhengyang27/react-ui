import { useState } from 'react';
import { Button, Code, Text, TextInput } from '@react-ui/ui';
import { hasLength, isEmail, useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Code, Text, TextInput } from '@react-ui/ui';
import { hasLength, isEmail, useForm } from '@react-ui/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('无效的邮箱'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="姓名"
        placeholder="姓名"
      />
      <TextInput
        {...form.getInputProps('email')}
        key={form.key('email')}
        mt="md"
        label="邮箱"
        placeholder="邮箱"
      />
      <Button type="submit" mt="md">
        提交
      </Button>

      <Text mt="md">Form values:</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>

      <Text mt="md">Submitted values:</Text>
      <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
    </form>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('无效的邮箱'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="姓名"
        placeholder="姓名"
      />
      <TextInput
        {...form.getInputProps('email')}
        key={form.key('email')}
        mt="md"
        label="邮箱"
        placeholder="邮箱"
      />
      <Button type="submit" mt="md">
        提交
      </Button>

      <Text mt="md">Form values:</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>

      <Text mt="md">Submitted values:</Text>
      <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
    </form>
  );
}

export const uncontrolled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 500,
  centered: true,
  defaultExpanded: false,
};
