import { Button, NumberInput, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput, TextInput, Button } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => {
      if (!payload.form.initialized) {
        return { disabled: true };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="你的姓名"
        placeholder="你的姓名"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="年龄"
        placeholder="年龄"
        mt="md"
      />
      <Button onClick={() => form.initialize({ name: '张三', age: 20 })} mt="md">
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

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => {
      if (!payload.form.initialized) {
        return { disabled: true };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="你的姓名"
        placeholder="你的姓名"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="年龄"
        placeholder="年龄"
        mt="md"
      />
      <Button onClick={() => form.initialize({ name: '张三', age: 20 })} mt="md">
        Initialize form
      </Button>
    </>
  );
}

export const enhanceGetInputPropsForm: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
