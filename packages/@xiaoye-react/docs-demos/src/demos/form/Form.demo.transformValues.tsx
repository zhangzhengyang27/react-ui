import { useState } from 'react';
import { Button, Code, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { useForm } from '@xiaoye-react/form';
import { TextInput, Button, Code } from '@xiaoye-react/ui';

function Demo() {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'Jane',
      lastName: 'Doe',
      age: '33',
    },

    transformValues: (values) => ({
      fullName: \`\${values.firstName} \${values.lastName}\`,
      age: Number(values.age) || 0,
    }),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}
      >
        <TextInput
          label="名字"
          placeholder="名字"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label="姓氏"
          placeholder="姓氏"
          mt="md"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <TextInput
          type="number"
          label="年龄"
          placeholder="年龄"
          mt="md"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />
        <Button type="submit" mt="md">
          提交
        </Button>
      </form>

      {submittedValues && (
        <Code block mt="md">
          {submittedValues}
        </Code>
      )}
    </>
  );
}
`;

function Demo() {
  const [submittedValues, setSubmittedValues] = useState('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'Jane',
      lastName: 'Doe',
      age: '33',
    },

    transformValues: (values) => ({
      fullName: `${values.firstName} ${values.lastName}`,
      age: Number(values.age) || 0,
    }),
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}
      >
        <TextInput
          label="名字"
          placeholder="名字"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label="姓氏"
          placeholder="姓氏"
          mt="md"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <TextInput
          type="number"
          label="年龄"
          placeholder="年龄"
          mt="md"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />
        <Button type="submit" mt="md">
          提交
        </Button>
      </form>

      {submittedValues && (
        <Code block mt="md">
          {submittedValues}
        </Code>
      )}
    </>
  );
}

export const transformValues: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
