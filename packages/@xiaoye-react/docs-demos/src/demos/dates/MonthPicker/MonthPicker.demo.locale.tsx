import 'dayjs/locale/ru';

import { MonthPicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import 'dayjs/locale/ru';
import { MonthPicker } from '@xiaoye-react/dates';

function Demo() {
  return <MonthPicker locale="ru" />;
}
`;

function Demo() {
  return <MonthPicker locale="ru" />;
}

export const locale: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
