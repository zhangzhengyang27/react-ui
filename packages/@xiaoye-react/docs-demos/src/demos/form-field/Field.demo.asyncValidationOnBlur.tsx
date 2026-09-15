import { Loader, TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Loader, TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/ui';

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
    validateOnBlur: true,
    validate: validateAsync,
  });

  return (
    <TextInput
      {...field.getInputProps()}
      label="输入 'ui'"
      placeholder="输入 'ui'"
      rightSection={field.isValidating ? <Loader size={18} /> : null}
    />
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
    validateOnBlur: true,
    validate: validateAsync,
  });

  return (
    <TextInput
      {...field.getInputProps()}
      label="输入 'ui'"
      placeholder="输入 'ui'"
      rightSection={field.isValidating ? <Loader size={18} /> : null}
    />
  );
}

export const asyncValidationOnBlur: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
