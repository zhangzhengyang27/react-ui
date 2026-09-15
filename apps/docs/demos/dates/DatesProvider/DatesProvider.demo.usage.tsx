import 'dayjs/locale/ru';

import { DatePickerInput, DatesProvider, MonthPickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import 'dayjs/locale/ru';
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}>
      <MonthPickerInput label="选择月份" placeholder="选择月份" />
      <DatePickerInput mt="md" label="选择日期" placeholder="选择日期" />
    </DatesProvider>
  );
}
`;

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}>
      <MonthPickerInput label="选择月份" placeholder="选择月份" />
      <DatePickerInput mt="md" label="选择日期" placeholder="选择日期" />
    </DatesProvider>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
