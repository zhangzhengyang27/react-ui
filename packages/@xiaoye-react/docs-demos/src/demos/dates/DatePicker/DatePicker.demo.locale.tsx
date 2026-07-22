import 'dayjs/locale/ru';

import { DatePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import 'dayjs/locale/ru';
import { DatePicker } from '@xiaoye-react/dates';

function Demo() {
  return <DatePicker locale="ru" />;
}
`;

function Demo() {
  return <DatePicker locale="ru" />;
}

export const locale: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
