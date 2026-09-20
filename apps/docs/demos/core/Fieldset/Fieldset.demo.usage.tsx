import { Fieldset, TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Fieldset, TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Fieldset legend="Personal information">
      <TextInput label="你的姓名" placeholder="你的姓名" />
      <TextInput label="邮箱" placeholder="邮箱" mt="md" />
    </Fieldset>
  );
}
`;

function Demo() {
  return (
    <Fieldset legend="Personal information">
      <TextInput label="你的姓名" placeholder="你的姓名" />
      <TextInput label="邮箱" placeholder="邮箱" mt="md" />
    </Fieldset>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 500,
  centered: true,
};
