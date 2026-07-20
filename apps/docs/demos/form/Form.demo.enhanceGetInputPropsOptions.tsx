import { NumberInput, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => {
      if (payload.options.fieldType === 'name') {
        return {
          label: '你的姓名',
          placeholder: '你的姓名',
          withAsterisk: true,
          description: '你的个人信息已被安全存储。（开玩笑的！）',
        };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput {...form.getInputProps('name', { fieldType: 'name' })} key={form.key('name')} />
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
    enhanceGetInputProps: (payload) => {
      if (payload.options.fieldType === 'name') {
        return {
          label: '你的姓名',
          placeholder: '你的姓名',
          withAsterisk: true,
          description: '你的个人信息已被安全存储。（开玩笑的！）',
        };
      }

      return {};
    },
  });

  return (
    <>
      <TextInput {...form.getInputProps('name', { fieldType: 'name' })} key={form.key('name')} />
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

export const enhanceGetInputPropsOptions: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
