import { TimeInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimeInput } from '@react-ui/dates';

function Demo() {
  return <TimeInput withSeconds />;
}
`;

function Demo() {
  return <TimeInput withSeconds />;
}

export const withSeconds: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
