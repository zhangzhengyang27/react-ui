import { DateInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DateInput } from '@react-ui/dates';

function Demo() {
  return <DateInput valueFormat="YYYY MMM DD" label="日期输入" placeholder="日期输入" />;
}
`;

function Demo() {
  return <DateInput valueFormat="YYYY MMM DD" label="日期输入" placeholder="日期输入" />;
}

export const format: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
