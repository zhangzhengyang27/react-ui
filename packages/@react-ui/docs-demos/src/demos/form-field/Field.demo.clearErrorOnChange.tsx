import { Button, TextInput } from '@react-ui/ui';
import { useField } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, TextInput } from '@react-ui/ui';
import { useField } from '@react-ui/form';

function Demo() {
  const field = useField({
    initialValue: '',
    clearErrorOnChange: false,
    validate: (value) => (value.trim().length < 2 ? '值太短' : null),
  });

  return (
    <>
      <TextInput {...field.getInputProps()} label="姓名" placeholder="输入你的姓名" mb="md" />
      <Button onClick={field.validate}>验证</Button>
    </>
  );
}
`;

function Demo() {
  const field = useField({
    initialValue: '',
    clearErrorOnChange: false,
    validate: (value) => (value.trim().length < 2 ? '值太短' : null),
  });

  return (
    <>
      <TextInput {...field.getInputProps()} label="姓名" placeholder="输入你的姓名" mb="md" />
      <Button onClick={field.validate}>验证</Button>
    </>
  );
}

export const clearErrorOnChange: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
