import dayjs from 'dayjs';
import { DateTimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { DateTimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <DateTimePicker
      valueFormat={(date) => dayjs(date).format('dddd, MMMM D [at] h:mm A')}
      defaultValue="2024-04-11 14:45:00"
      label="选择日期和时间"
      placeholder="选择日期和时间"
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      valueFormat={(date) => dayjs(date).format('dddd, MMMM D [at] h:mm A')}
      defaultValue="2024-04-11 14:45:00"
      label="选择日期和时间"
      placeholder="选择日期和时间"
    />
  );
}

export const formatFunction: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
