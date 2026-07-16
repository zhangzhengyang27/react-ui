import dayjs from 'dayjs';
import { DatePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { DatePicker } from '@react-ui/dates';

function Demo() {
  return (
    <DatePicker
      presets={[
        { value: dayjs('2024-01-15').subtract(1, 'day').format('YYYY-MM-DD'), label: '昨天' },
        { value: dayjs('2024-01-15').format('YYYY-MM-DD'), label: '今天' },
        { value: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD'), label: '明天' },
        { value: dayjs('2024-01-15').add(1, 'month').format('YYYY-MM-DD'), label: '下月' },
        { value: dayjs('2024-01-15').add(1, 'year').format('YYYY-MM-DD'), label: '明年' },
        { value: dayjs('2024-01-15').subtract(1, 'month').format('YYYY-MM-DD'), label: '上月' },
        { value: dayjs('2024-01-15').subtract(1, 'year').format('YYYY-MM-DD'), label: '去年' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <DatePicker
      presets={[
        { value: dayjs('2024-01-15').subtract(1, 'day').format('YYYY-MM-DD'), label: '昨天' },
        { value: dayjs('2024-01-15').format('YYYY-MM-DD'), label: '今天' },
        { value: dayjs('2024-01-15').add(1, 'day').format('YYYY-MM-DD'), label: '明天' },
        { value: dayjs('2024-01-15').add(1, 'month').format('YYYY-MM-DD'), label: '下月' },
        { value: dayjs('2024-01-15').add(1, 'year').format('YYYY-MM-DD'), label: '明年' },
        { value: dayjs('2024-01-15').subtract(1, 'month').format('YYYY-MM-DD'), label: '上月' },
        { value: dayjs('2024-01-15').subtract(1, 'year').format('YYYY-MM-DD'), label: '去年' },
      ]}
    />
  );
}

export const presets: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
