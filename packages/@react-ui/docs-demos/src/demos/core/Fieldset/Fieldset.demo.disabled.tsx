import { Button, Fieldset, Group, TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Fieldset, TextInput, Button, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Fieldset legend="Personal information" disabled>
      <TextInput label="你的姓名" placeholder="你的姓名" />
      <TextInput label="邮箱" placeholder="邮箱" mt="md" />

      <Group justify="flex-end" mt="md">
        <Button>提交</Button>
      </Group>
    </Fieldset>
  );
}
`;

function Demo() {
  return (
    <Fieldset legend="Personal information" disabled>
      <TextInput label="你的姓名" placeholder="你的姓名" />
      <TextInput label="邮箱" placeholder="邮箱" mt="md" />

      <Group justify="flex-end" mt="md">
        <Button>提交</Button>
      </Group>
    </Fieldset>
  );
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 500,
  centered: true,
  code,
};
