import { DateInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DateInput } from '@react-ui/dates';

function Demo() {
  return <DateInput label="已禁用" placeholder="日期输入" disabled />;
}
`;

function Demo() {
  return <DateInput label="已禁用" placeholder="日期输入" disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
