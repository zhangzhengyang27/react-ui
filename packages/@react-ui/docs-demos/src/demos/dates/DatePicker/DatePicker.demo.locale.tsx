import 'dayjs/locale/ru';

import { DatePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import 'dayjs/locale/ru';
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return <DatePicker locale="ru" />;
}
`;

function Demo() {
  return <DatePicker locale="ru" />;
}

export const locale: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
