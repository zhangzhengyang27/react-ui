import { MonthPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
