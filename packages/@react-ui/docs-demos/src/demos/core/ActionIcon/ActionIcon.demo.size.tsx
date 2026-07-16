import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ActionIcon } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="数字尺寸的操作图标">
      <HeartIcon size={24} />
    </ActionIcon>
  );
}
`;

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="数字尺寸的操作图标">
      <HeartIcon size={24} />
    </ActionIcon>
  );
}

export const size: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
