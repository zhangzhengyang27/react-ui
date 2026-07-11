import { TimeInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TimeInput } from '@react-ui/dates';

function Demo() {
  return <TimeInput withSeconds />;
}
`;

function Demo() {
  return <TimeInput withSeconds />;
}

export const withSeconds: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
