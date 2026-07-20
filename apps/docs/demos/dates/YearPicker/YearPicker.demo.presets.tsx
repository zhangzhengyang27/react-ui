import dayjs from 'dayjs';
import { YearPicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { YearPicker } from '@react-ui/dates';

function Demo() {
  return (
    <YearPicker
      presets={[
        { value: dayjs('2024-01-15').startOf('year').format('YYYY-MM-DD'), label: '今年' },
        { value: dayjs('2024-01-15').add(1, 'year').startOf('year').format('YYYY-MM-DD'), label: '明年' },
        { value: dayjs('2024-01-15').subtract(1, 'year').startOf('year').format('YYYY-MM-DD'), label: '去年' },
        { value: dayjs('2024-01-15').add(5, 'year').startOf('year').format('YYYY-MM-DD'), label: 'In 5 years' },
        { value: dayjs('2024-01-15').subtract(5, 'year').startOf('year').format('YYYY-MM-DD'), label: '5 years ago' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <YearPicker
      presets={[
        { value: dayjs('2024-01-15').startOf('year').format('YYYY-MM-DD'), label: '今年' },
        {
          value: dayjs('2024-01-15').add(1, 'year').startOf('year').format('YYYY-MM-DD'),
          label: '明年',
        },
        {
          value: dayjs('2024-01-15').subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
          label: '去年',
        },
        {
          value: dayjs('2024-01-15').add(5, 'year').startOf('year').format('YYYY-MM-DD'),
          label: 'In 5 years',
        },
        {
          value: dayjs('2024-01-15').subtract(5, 'year').startOf('year').format('YYYY-MM-DD'),
          label: '5 years ago',
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
