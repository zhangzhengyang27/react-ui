import { InlineDateTimePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { InlineDateTimePicker } from '@react-ui/dates';

function Demo() {
  return <InlineDateTimePicker withSeconds />;
}
`;

function Demo() {
  return <InlineDateTimePicker withSeconds />;
}

export const withSeconds: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
