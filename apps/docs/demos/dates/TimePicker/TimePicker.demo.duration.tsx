import { TimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="输入时长" type="duration" withSeconds />;
}
`;

function Demo() {
  return <TimePicker label="输入时长" type="duration" withSeconds />;
}

export const duration: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
