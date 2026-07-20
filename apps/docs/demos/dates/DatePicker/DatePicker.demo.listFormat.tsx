import { DatePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
