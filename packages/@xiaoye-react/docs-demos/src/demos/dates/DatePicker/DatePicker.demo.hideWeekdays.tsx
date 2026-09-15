import { DatePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePicker } from '@xiaoye-react/ui';

function Demo() {
  return <DatePicker hideWeekdays />;
}
`;

function Demo() {
  return <DatePicker hideWeekdays />;
}

export const hideWeekdays: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
