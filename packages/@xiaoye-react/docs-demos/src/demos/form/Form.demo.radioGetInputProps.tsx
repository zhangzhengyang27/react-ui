/* oxlint-disable no-console */

import { Button, Group, Radio, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Radio, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: 'red',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text fw={500} size="sm">
        Pick your favorite color
      </Text>

      <Group mt={5}>
        <Radio
          label="红色"
          name="color"
          {...form.getInputProps('color', { type: 'radio', value: 'red' })}
        />
        <Radio
          label="蓝色"
          name="color"
          {...form.getInputProps('color', { type: 'radio', value: 'blue' })}
        />
        <Radio
          label="绿色"
          name="color"
          {...form.getInputProps('color', { type: 'radio', value: 'green' })}
        />
      </Group>
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
      color: 'red',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text fw={500} size="sm">
        Pick your favorite color
      </Text>

      <Group mt={5}>
        <Radio
          label="红色"
          name="color"
          {...form.getInputProps('color', { type: 'radio', value: 'red' })}
        />
        <Radio
          label="蓝色"
          name="color"
          {...form.getInputProps('color', { type: 'radio', value: 'blue' })}
        />
        <Radio
          label="绿色"
          name="color"
          {...form.getInputProps('color', { type: 'radio', value: 'green' })}
        />
      </Group>
      <Group justify="flex-end" mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const radioGetInputProps: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
