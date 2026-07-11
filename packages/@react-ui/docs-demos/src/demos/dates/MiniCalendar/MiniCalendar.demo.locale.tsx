import 'dayjs/locale/ru';

import { MiniCalendar } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import 'dayjs/locale/ru';
import { MiniCalendar } from '@react-ui/dates';

function Demo() {
  return <MiniCalendar defaultDate="2025-04-15" locale="ru" numberOfDays={6} />;
}
`;

function Demo() {
  return <MiniCalendar numberOfDays={6} defaultDate="2025-04-15" locale="ru" />;
}

export const locale: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
