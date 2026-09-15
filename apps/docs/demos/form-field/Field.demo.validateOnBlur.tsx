import { TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/ui';

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnBlur: true,
    validate: (value) => (value.trim().length < 2 ? '值太短' : null),
  });

  return <TextInput {...field.getInputProps()} label="姓名" placeholder="输入你的姓名" />;
}
`;

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnBlur: true,
    validate: (value) => (value.trim().length < 2 ? '值太短' : null),
  });

  return <TextInput {...field.getInputProps()} label="姓名" placeholder="输入你的姓名" />;
}

export const validateOnBlur: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
