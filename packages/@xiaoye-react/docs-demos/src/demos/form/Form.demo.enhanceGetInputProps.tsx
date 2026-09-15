import { NumberInput, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => ({
      disabled: payload.field === 'name',
    }),
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
    enhanceGetInputProps: (payload) => ({
      disabled: payload.field === 'name',
    }),
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
    </>
  );
}

export const enhanceGetInputProps: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
