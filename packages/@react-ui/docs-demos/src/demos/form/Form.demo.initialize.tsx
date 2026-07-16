import { Button, NumberInput, TextInput } from '@react-ui/ui';
import { isInRange, isNotEmpty, useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, NumberInput, TextInput } from '@react-ui/ui';
import { isInRange, isNotEmpty, useForm } from '@react-ui/form';

interface FormValues {
  name: string;
  age: number | string;
}

function apiRequest(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 25 });
    }, 1000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: 0 },
    validate: {
      name: isNotEmpty('姓名必填'),
      age: isInRange({ min: 18 }, '注册年龄必须至少 18 岁'),
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="姓名"
        placeholder="姓名"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="年龄"
        placeholder="年龄"
        mt="md"
      />
      <Button onClick={() => apiRequest().then((values) => form.initialize(values))} mt="md">
        Initialize form
      </Button>
    </>
  );
}
`;

interface FormValues {
  name: string;
  age: number | string;
}

function apiRequest(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 25 });
    }, 1000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: 0 },
    validate: {
      name: isNotEmpty('姓名必填'),
      age: isInRange({ min: 18 }, '注册年龄必须至少 18 岁'),
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="姓名"
        placeholder="姓名"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="年龄"
        placeholder="年龄"
        mt="md"
      />
      <Button onClick={() => apiRequest().then((values) => form.initialize(values))} mt="md">
        Initialize form
      </Button>
    </>
  );
}

export const initialize: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
