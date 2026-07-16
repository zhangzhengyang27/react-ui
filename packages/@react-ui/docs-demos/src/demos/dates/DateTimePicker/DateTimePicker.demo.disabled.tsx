import { DateTimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DateTimePicker } from '@react-ui/dates';

function Demo() {
  return <DateTimePicker label="已禁用" placeholder="选择日期和时间" disabled />;
}
`;

function Demo() {
  return <DateTimePicker label="已禁用" placeholder="选择日期和时间" disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
