import 'dayjs/locale/ru';

import { MonthPicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

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

export const locale: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
