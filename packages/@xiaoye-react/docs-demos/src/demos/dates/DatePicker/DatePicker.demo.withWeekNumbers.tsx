import { DatePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePicker } from '@xiaoye-react/dates';

function Demo() {
  return <DatePicker withWeekNumbers />;
}
`;

function Demo() {
  return <DatePicker withWeekNumbers />;
}

export const withWeekNumbers: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
