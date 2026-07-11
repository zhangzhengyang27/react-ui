import { DatePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}
`;

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}

export const weekendDays: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
