import { XCircleIcon } from '@phosphor-icons/react';
import { CloseButton } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { XCircleIcon } from '@phosphor-icons/react';
import { CloseButton } from '@react-ui/ui';

function Demo() {
  return <CloseButton icon={<XCircleIcon size={18} />} />;
}
`;

function Demo() {
  return <CloseButton icon={<XCircleIcon size={18} />} />;
}

export const icon: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
