import { TimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return <TimePicker label="输入时间" clearable defaultValue="12:34:44" />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" clearable defaultValue="12:34:44" />;
}

export const clearable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
