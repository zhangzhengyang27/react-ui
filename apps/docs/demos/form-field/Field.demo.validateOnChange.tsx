import { TextInput } from '@react-ui/ui';
import { isEmail, useField } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput } from '@react-ui/ui';
import { useField, isEmail } from '@react-ui/form';

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnChange: true,
    validate: isEmail('无效的邮箱'),
  });

  return <TextInput {...field.getInputProps()} label="邮箱" placeholder="输入你的邮箱" />;
}
`;

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnChange: true,
    validate: isEmail('无效的邮箱'),
  });

  return <TextInput {...field.getInputProps()} label="邮箱" placeholder="输入你的邮箱" />;
}

export const validateOnChange: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
