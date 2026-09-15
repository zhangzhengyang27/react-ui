import 'dayjs/locale/ru';

import { DatePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import 'dayjs/locale/ru';
import { DatePicker } from '@xiaoye-react/ui';

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
