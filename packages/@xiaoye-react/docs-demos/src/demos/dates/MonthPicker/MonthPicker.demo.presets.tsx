import dayjs from 'dayjs';
import { MonthPicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { MonthPicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <MonthPicker
      presets={[
        { value: dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD'), label: '本月' },
        { value: dayjs('2024-01-15').add(1, 'month').startOf('month').format('YYYY-MM-DD'), label: '下月' },
        { value: dayjs('2024-01-15').subtract(1, 'month').startOf('month').format('YYYY-MM-DD'), label: '上月' },
        { value: dayjs('2024-01-15').add(6, 'month').startOf('month').format('YYYY-MM-DD'), label: '6 个月后' },
        { value: dayjs('2024-01-15').add(1, 'year').startOf('month').format('YYYY-MM-DD'), label: '明年' },
        { value: dayjs('2024-01-15').subtract(1, 'year').startOf('month').format('YYYY-MM-DD'), label: '去年' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <MonthPicker
      presets={[
        { value: dayjs('2024-01-15').startOf('month').format('YYYY-MM-DD'), label: '本月' },
        {
          value: dayjs('2024-01-15').add(1, 'month').startOf('month').format('YYYY-MM-DD'),
          label: '下月',
        },
        {
          value: dayjs('2024-01-15').subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          label: '上月',
        },
        {
          value: dayjs('2024-01-15').add(6, 'month').startOf('month').format('YYYY-MM-DD'),
          label: '6 个月后',
        },
        {
          value: dayjs('2024-01-15').add(1, 'year').startOf('month').format('YYYY-MM-DD'),
          label: '明年',
        },
        {
          value: dayjs('2024-01-15').subtract(1, 'year').startOf('month').format('YYYY-MM-DD'),
          label: '去年',
        },
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
