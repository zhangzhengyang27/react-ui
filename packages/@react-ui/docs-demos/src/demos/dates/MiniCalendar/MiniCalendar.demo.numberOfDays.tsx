import { MiniCalendar } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MiniCalendar } from '@react-ui/dates';

function Demo() {
  return <MiniCalendar numberOfDays={5} />;
}
`;

function Demo() {
  return <MiniCalendar numberOfDays={5} />;
}

export const numberOfDays: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
