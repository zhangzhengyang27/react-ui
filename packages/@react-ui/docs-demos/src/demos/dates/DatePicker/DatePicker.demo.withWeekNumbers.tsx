import { DatePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker withWeekNumbers />;
}
`;

function Demo() {
  return <DatePicker withWeekNumbers />;
}

export const withWeekNumbers: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
