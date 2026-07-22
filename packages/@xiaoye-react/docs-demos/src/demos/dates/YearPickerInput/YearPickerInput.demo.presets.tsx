import dayjs from 'dayjs';
import { YearPickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { YearPickerInput } from '@xiaoye-react/dates';

function Demo() {
  return (
    <YearPickerInput
      label="带预设"
      placeholder="选择年份"
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
    <YearPickerInput
      label="带预设"
      placeholder="选择年份"
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
  maxWidth: 400,
  component: Demo,
  code,
};
