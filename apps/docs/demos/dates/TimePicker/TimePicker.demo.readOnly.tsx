import { TimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="输入时间" defaultValue="12:45:33" readOnly />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" defaultValue="12:45:33" readOnly />;
}

export const readOnly: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
