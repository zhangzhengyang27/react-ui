import { ClockIcon } from '@phosphor-icons/react';
import { TimeInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ClockIcon } from '@phosphor-icons/react';
import { TimeInput } from '@xiaoye-react/dates';

function Demo() {
  return <TimeInput leftSection={<ClockIcon size={16} />} />;
}
`;

function Demo() {
  return <TimeInput leftSection={<ClockIcon size={16} />} />;
}

export const icon: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
