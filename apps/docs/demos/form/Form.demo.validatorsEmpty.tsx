import { Button, Group, NativeSelect, NumberInput, TextInput } from '@xiaoye-react/ui';
import {
  hasLength,
  isEmail,
  isInRange,
  isNotEmpty,
  isOneOf,
  isUrl,
  matches,
  useForm,
} from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches, isUrl, isOneOf } from '@xiaoye-react/ui';
import { Button, Group, TextInput, NumberInput, NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      job: '',
      email: '',
      favoriteColor: '',
      age: 18,
      website: '',
      role: '',
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }),
      job: isNotEmpty(),
      email: isEmail(),
      favoriteColor: matches(/^#([0-9a-f]{3}){1,2}$/),
      age: isInRange({ min: 18, max: 99 }),
      website: isUrl(),
      role: isOneOf(['developer', 'designer', 'manager']),
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        label="姓名"
        placeholder="姓名"
        withAsterisk
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        label="你的工作"
        placeholder="你的工作"
        withAsterisk
        mt="md"
        key={form.key('job')}
        {...form.getInputProps('job')}
      />
      <TextInput
        label="你的邮箱"
        placeholder="你的邮箱"
        withAsterisk
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="你最喜欢的颜色"
        placeholder="你最喜欢的颜色"
        withAsterisk
        mt="md"
        key={form.key('favoriteColor')}
        {...form.getInputProps('favoriteColor')}
      />
      <NumberInput
        label="你的年龄"
        placeholder="你的年龄"
        withAsterisk
        mt="md"
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <TextInput
        label="你的网站"
        placeholder="https://example.com"
        withAsterisk
        mt="md"
        key={form.key('website')}
        {...form.getInputProps('website')}
      />
      <NativeSelect
        label="你的角色"
        data={['', 'developer', 'designer', 'manager']}
        withAsterisk
        mt="md"
        key={form.key('role')}
        {...form.getInputProps('role')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      job: '',
      email: '',
      favoriteColor: '',
      age: 18,
      website: '',
      role: '',
    },

    validate: {
      name: hasLength({ min: 2, max: 10 }),
      job: isNotEmpty(),
      email: isEmail(),
      favoriteColor: matches(/^#([0-9a-f]{3}){1,2}$/),
      age: isInRange({ min: 18, max: 99 }),
      website: isUrl(),
      role: isOneOf(['developer', 'designer', 'manager']),
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        label="姓名"
        placeholder="姓名"
        withAsterisk
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        label="你的工作"
        placeholder="你的工作"
        withAsterisk
        mt="md"
        key={form.key('job')}
        {...form.getInputProps('job')}
      />
      <TextInput
        label="你的邮箱"
        placeholder="你的邮箱"
        withAsterisk
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="你最喜欢的颜色"
        placeholder="你最喜欢的颜色"
        withAsterisk
        mt="md"
        key={form.key('favoriteColor')}
        {...form.getInputProps('favoriteColor')}
      />
      <NumberInput
        label="你的年龄"
        placeholder="你的年龄"
        withAsterisk
        mt="md"
        key={form.key('age')}
        {...form.getInputProps('age')}
      />
      <TextInput
        label="你的网站"
        placeholder="https://example.com"
        withAsterisk
        mt="md"
        key={form.key('website')}
        {...form.getInputProps('website')}
      />
      <NativeSelect
        label="你的角色"
        data={['', 'developer', 'designer', 'manager']}
        withAsterisk
        mt="md"
        key={form.key('role')}
        {...form.getInputProps('role')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const validatorsEmpty: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
