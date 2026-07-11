import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, Group } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ActionIcon, Group } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="Disabled and not interactive">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="Has disabled styles but still interactive">
        <HeartIcon />
      </ActionIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="Disabled and not interactive">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="Has disabled styles but still interactive">
        <HeartIcon />
      </ActionIcon>
    </Group>
  );
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
