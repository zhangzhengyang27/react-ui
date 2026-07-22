import { Box, Checkbox, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useForm } from '@xiaoye-react/form';
import { Box, Checkbox, TextInput } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      terms: false,
      user: {
        firstName: '',
        lastName: '',
      },
    },
  });

  return (
    <Box maw={340} mx="auto">
      <TextInput
        label="名字"
        placeholder="名字"
        key={form.key('user.firstName')}
        {...form.getInputProps('user.firstName')}
      />
      <TextInput
        label="姓氏"
        placeholder="姓氏"
        mt="md"
        key={form.key('user.lastName')}
        {...form.getInputProps('user.lastName')}
      />
      <Checkbox
        label="我接受条款和条件"
        mt="sm"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </Box>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      terms: false,
      user: {
        firstName: '',
        lastName: '',
      },
    },
  });

  return (
    <Box maw={340} mx="auto">
      <TextInput
        label="名字"
        placeholder="名字"
        key={form.key('user.firstName')}
        {...form.getInputProps('user.firstName')}
      />
      <TextInput
        label="姓氏"
        placeholder="姓氏"
        mt="md"
        key={form.key('user.lastName')}
        {...form.getInputProps('user.lastName')}
      />
      <Checkbox
        label="我接受条款和条件"
        mt="sm"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </Box>
  );
}

export const nested: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
