import 'dayjs/locale/ru';

import { MonthPicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import 'dayjs/locale/ru';
import { MonthPicker } from '@react-ui/dates';

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
