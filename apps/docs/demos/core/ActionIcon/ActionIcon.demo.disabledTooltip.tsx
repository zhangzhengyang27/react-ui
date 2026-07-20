import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ActionIcon, Tooltip } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Tooltip label="禁用按钮的提示">
      <ActionIcon
        aria-label="悬停查看提示"
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
    <Tooltip label="禁用按钮的提示">
      <ActionIcon
        aria-label="悬停查看提示"
        size="xl"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        <HeartIcon />
      </ActionIcon>
    </Tooltip>
  );
}

export const disabledTooltip: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
