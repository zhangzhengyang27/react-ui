import { DatePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePicker } from '@xiaoye-react/ui';

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
