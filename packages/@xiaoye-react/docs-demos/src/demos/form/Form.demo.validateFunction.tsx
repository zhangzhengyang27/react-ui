/* oxlint-disable no-console */

import { Box, Button, Group, NumberInput, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useForm } from '@xiaoye-react/ui';
import { Box, TextInput, NumberInput, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm<{ name: string; age: number | undefined }>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: undefined },
    validate: (values) => ({
      name: values.name.length < 2 ? '姓名太短' : null,
      age:
        values.age === undefined
          ? '年龄必填'
          : values.age < 18
            ? '你必须至少 18 岁'
            : null,
    }),
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="姓名"
          placeholder="姓名"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <NumberInput
          mt="sm"
          label="年龄"
          placeholder="你的年龄"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">提交</Button>
        </Group>
      </form>
    </Box>
  );
}
`;

function Demo() {
  const form = useForm<{ name: string; age: number | undefined }>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: undefined },
    validate: (values) => ({
      name: values.name.length < 2 ? '姓名太短' : null,
      age:
        values.age === undefined
          ? '年龄必填'
          : values.age < 18
            ? '你必须至少 18 岁'
            : null,
    }),
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="姓名"
          placeholder="姓名"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <NumberInput
          mt="sm"
          label="年龄"
          placeholder="你的年龄"
          key={form.key('age')}
          {...form.getInputProps('age')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">提交</Button>
        </Group>
      </form>
    </Box>
  );
}

export const validateFunction: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
