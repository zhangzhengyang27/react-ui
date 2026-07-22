import { ActionIcon, Group, TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ActionIcon, Group, TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <TextInput placeholder="sm 尺寸输入" size="sm" />
      <ActionIcon size="input-sm" variant="default" aria-label="与输入框同尺寸的操作图标">
        SM
      </ActionIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <TextInput placeholder="sm 尺寸输入" size="sm" />
      <ActionIcon size="input-sm" variant="default" aria-label="与输入框同尺寸的操作图标">
        SM
      </ActionIcon>
    </Group>
  );
}

export const inputSize: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
