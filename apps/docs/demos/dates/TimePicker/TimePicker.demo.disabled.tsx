import { TimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="输入时间" disabled />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
