/* oxlint-disable no-console */

import { TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  form.watch('name', ({ previousValue, value, touched, dirty }) => {
    console.log({ previousValue, value, touched, dirty });
  });

  return (
    <div>
      <TextInput label="姓名" placeholder="姓名" {...form.getInputProps('name')} />
      <TextInput mt="md" label="邮箱" placeholder="邮箱" {...form.getInputProps('email')} />
    </div>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  form.watch('name', ({ previousValue, value, touched, dirty }) => {
    console.log({ previousValue, value, touched, dirty });
  });

  return (
    <div>
      <TextInput
        label="姓名"
        placeholder="姓名"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="邮箱"
        placeholder="邮箱"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
    </div>
  );
}

export const watch: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
