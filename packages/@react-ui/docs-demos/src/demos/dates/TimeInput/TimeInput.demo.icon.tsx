import { ClockIcon } from '@phosphor-icons/react';
import { TimeInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ClockIcon } from '@phosphor-icons/react';
import { TimeInput } from '@react-ui/dates';

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
