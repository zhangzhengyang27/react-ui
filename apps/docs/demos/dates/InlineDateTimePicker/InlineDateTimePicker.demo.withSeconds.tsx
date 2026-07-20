import { InlineDateTimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { InlineDateTimePicker } from '@react-ui/dates';

function Demo() {
  return <InlineDateTimePicker withSeconds />;
}
`;

function Demo() {
  return <InlineDateTimePicker withSeconds />;
}

export const withSeconds: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
