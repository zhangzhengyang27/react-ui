import { DatePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker hideOutsideDates />;
}
`;

function Demo() {
  return <DatePicker hideOutsideDates />;
}

export const hideOutsideDates: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
