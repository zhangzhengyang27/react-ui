import { TimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="输入时间" withSeconds />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" withSeconds />;
}

export const withSeconds: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
