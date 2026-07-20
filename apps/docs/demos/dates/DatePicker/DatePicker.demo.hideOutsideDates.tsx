import { DatePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker hideOutsideDates />;
}
`;

function Demo() {
  return <DatePicker hideOutsideDates />;
}

export const hideOutsideDates: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
