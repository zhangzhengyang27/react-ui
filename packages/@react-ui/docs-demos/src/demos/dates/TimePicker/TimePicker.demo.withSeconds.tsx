import { TimePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="Enter time" withSeconds />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" withSeconds />;
}

export const withSeconds: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
