import { MiniCalendar } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { MiniCalendar } from '@react-ui/dates';

function Demo() {
  return <MiniCalendar numberOfDays={5} />;
}
`;

function Demo() {
  return <MiniCalendar numberOfDays={5} />;
}

export const numberOfDays: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
