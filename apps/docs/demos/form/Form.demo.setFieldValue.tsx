import { Button, Group, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';
import { randomId } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useForm } from '@xiaoye-react/ui';
import { TextInput, Button, Group } from '@xiaoye-react/ui';
import { randomId } from '@xiaoye-react/hooks';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
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

      <Group justify="center" mt="xl">
        <Button onClick={() => form.setFieldValue('name', randomId())}>随机姓名</Button>
        <Button onClick={() => form.setFieldValue('email', \`\${randomId()}@test.com\`)}>
          Random email
        </Button>
      </Group>
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

      <Group justify="center" mt="xl">
        <Button onClick={() => form.setFieldValue('name', randomId())}>随机姓名</Button>
        <Button onClick={() => form.setFieldValue('email', `${randomId()}@test.com`)}>
          Random email
        </Button>
      </Group>
    </div>
  );
}

export const setFieldValue: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
