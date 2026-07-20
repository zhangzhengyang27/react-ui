import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, Group } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ActionIcon, Group } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="已禁用且不可交互">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="带有禁用样式但仍可交互">
        <HeartIcon />
      </ActionIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="已禁用且不可交互">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="带有禁用样式但仍可交互">
        <HeartIcon />
      </ActionIcon>
    </Group>
  );
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
