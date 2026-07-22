import dayjs from 'dayjs';
import { DateTimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const now = dayjs('2024-01-15 12:00:00');

const code = `
import dayjs from 'dayjs';
import { DateTimePicker } from '@xiaoye-react/dates';

function Demo() {
  const now = dayjs('2024-01-15 12:00:00');

  return (
    <DateTimePicker
      label="选择日期和时间"
      placeholder="选择日期和时间"
      presets={[
        { value: now.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: '昨天' },
        { value: now.format('YYYY-MM-DD HH:mm:ss'), label: '今天' },
        { value: now.add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: '明天' },
        { value: now.add(1, 'month').format('YYYY-MM-DD HH:mm:ss'), label: '下月' },
        { value: now.add(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: '明年' },
        {
          value: now.subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
          label: '上月',
        },
        { value: now.subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: '去年' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      label="选择日期和时间"
      placeholder="选择日期和时间"
      presets={[
        { value: now.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: '昨天' },
        { value: now.format('YYYY-MM-DD HH:mm:ss'), label: '今天' },
        { value: now.add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: '明天' },
        { value: now.add(1, 'month').format('YYYY-MM-DD HH:mm:ss'), label: '下月' },
        { value: now.add(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: '明年' },
        {
          value: now.subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
          label: '上月',
        },
        { value: now.subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: '去年' },
      ]}
    />
  );
}

export const presets: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
