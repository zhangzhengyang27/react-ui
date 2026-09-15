import dayjs from 'dayjs';
import { DateTimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { DateTimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DateTimePicker
      clearable
      defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}
      label="选择日期和时间"
      placeholder="选择日期和时间"
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      clearable
      defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}
      label="选择日期和时间"
      placeholder="选择日期和时间"
    />
  );
}

export const clearable: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
