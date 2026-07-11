import { DatePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker hideWeekdays />;
}
`;

function Demo() {
  return <DatePicker hideWeekdays />;
}

export const hideWeekdays: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
