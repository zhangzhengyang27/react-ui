import { Text, TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, TextInput } from '@xiaoye-react/ui';
import { useField } from '@xiaoye-react/form';

function Demo() {
  const field = useField({ initialValue: '' });

  return (
    <>
      <TextInput {...field.getInputProps()} label="姓名" placeholder="输入你的姓名" mb="md" />

      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={field.isDirty() ? 'red' : 'teal'}>
          {field.isDirty() ? 'dirty' : 'not dirty'}
        </Text>
      </Text>
      <Text fz="sm">
        Touched:{' '}
        <Text span inherit c={field.isTouched() ? 'red' : 'teal'}>
          {field.isTouched() ? 'touched' : 'not touched'}
        </Text>
      </Text>
    </>
  );
}
`;

function Demo() {
  const field = useField({ initialValue: '' });

  return (
    <>
      <TextInput {...field.getInputProps()} label="姓名" placeholder="输入你的姓名" mb="md" />

      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={field.isDirty() ? 'red' : 'teal'}>
          {field.isDirty() ? 'dirty' : 'not dirty'}
        </Text>
      </Text>
      <Text fz="sm">
        Touched:{' '}
        <Text span inherit c={field.isTouched() ? 'red' : 'teal'}>
          {field.isTouched() ? 'touched' : 'not touched'}
        </Text>
      </Text>
    </>
  );
}

export const statusControlled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
