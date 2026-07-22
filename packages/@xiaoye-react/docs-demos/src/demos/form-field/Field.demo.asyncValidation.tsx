import { Button, Loader, TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Loader, TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/form';

function validateAsync(value: string): Promise<string | null> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(value === 'ui' ? null : 'Value must be "ui"');
    }, 800);
  });
}

function Demo() {
  const field = useField({
    initialValue: '',
    validate: validateAsync,
  });

  return (
    <>
      <TextInput
        {...field.getInputProps()}
        label="输入 'ui'"
        placeholder="输入 'ui'"
        rightSection={field.isValidating ? <Loader size={18} /> : null}
        mb="md"
      />
      <Button onClick={field.validate}>异步验证</Button>
    </>
  );
}
`;

function validateAsync(value: string): Promise<string | null> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(value === 'ui' ? null : 'Value must be "ui"');
    }, 800);
  });
}

function Demo() {
  const field = useField({
    initialValue: '',
    validate: validateAsync,
  });

  return (
    <>
      <TextInput
        {...field.getInputProps()}
        label="输入 'ui'"
        placeholder="输入 'ui'"
        rightSection={field.isValidating ? <Loader size={18} /> : null}
        mb="md"
      />
      <Button onClick={field.validate}>异步验证</Button>
    </>
  );
}

export const asyncValidation: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
