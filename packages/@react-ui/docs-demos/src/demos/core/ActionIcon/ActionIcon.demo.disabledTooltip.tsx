import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, Tooltip } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ActionIcon, Tooltip } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <ActionIcon
        aria-label="Hover to see tooltip"
        size="xl"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        <HeartIcon />
      </ActionIcon>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <ActionIcon
        aria-label="Hover to see tooltip"
        size="xl"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        <HeartIcon />
      </ActionIcon>
    </Tooltip>
  );
}

export const disabledTooltip: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
