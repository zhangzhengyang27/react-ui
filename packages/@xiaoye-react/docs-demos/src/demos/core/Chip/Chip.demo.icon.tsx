import { XIcon } from '@phosphor-icons/react';
import { Chip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Chip } from '@xiaoye-react/ui';
import { XIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Chip
      icon={<XIcon size={16} />}
      color="red"
      variant="filled"
      defaultChecked
    >
      Forbidden
    </Chip>
  );
}
`;

function Demo() {
  return (
    <Chip icon={<XIcon size={16} />} color="red" variant="filled" defaultChecked>
      Forbidden
    </Chip>
  );
}

export const icon: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
