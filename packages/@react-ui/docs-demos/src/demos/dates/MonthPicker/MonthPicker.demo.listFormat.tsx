import { MonthPicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MonthPicker } from '@react-ui/dates';

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
