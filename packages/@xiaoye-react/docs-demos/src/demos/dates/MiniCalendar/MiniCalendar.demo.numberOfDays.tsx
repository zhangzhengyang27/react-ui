import { MiniCalendar } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MiniCalendar } from '@xiaoye-react/dates';

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
