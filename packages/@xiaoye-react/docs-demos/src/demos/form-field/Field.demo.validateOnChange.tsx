import { TextInput } from '@xiaoye-react/ui';
import { isEmail, useField } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput } from '@xiaoye-react/ui';
import { useField, isEmail } from '@xiaoye-react/form';

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
