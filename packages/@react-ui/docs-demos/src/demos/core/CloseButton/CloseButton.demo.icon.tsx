import { XCircleIcon } from '@phosphor-icons/react';
import { CloseButton } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

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

export const icon: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
