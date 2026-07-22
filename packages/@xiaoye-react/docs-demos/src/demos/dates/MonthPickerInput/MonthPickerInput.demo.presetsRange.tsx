import dayjs from 'dayjs';
import { MonthPickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { MonthPickerInput } from '@xiaoye-react/dates';

function Demo() {
  const today = dayjs('2024-01-15');

  return (
    <MonthPickerInput
      type="range"
      label="带预设"
      placeholder="选择月份范围"
      presets={[
        {
          value: [today.subtract(3, 'month').startOf('month').format('YYYY-MM-DD'), today.startOf('month').format('YYYY-MM-DD')],
          label: 'Last 3 months',
        },
        {
          value: [today.subtract(6, 'month').startOf('month').format('YYYY-MM-DD'), today.startOf('month').format('YYYY-MM-DD')],
          label: 'Last 6 months',
        },
        {
          value: [today.startOf('year').format('YYYY-MM-DD'), today.startOf('month').format('YYYY-MM-DD')],
          label: '今年',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').startOf('month').format('YYYY-MM-DD'),
          ],
          label: '去年',
        },
      ]}
    />
  );
}
`;

function Demo() {
  const today = dayjs('2024-01-15');

  return (
    <MonthPickerInput
      type="range"
      label="带预设"
      placeholder="选择月份范围"
      presets={[
        {
          value: [
            today.subtract(3, 'month').startOf('month').format('YYYY-MM-DD'),
            today.startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last 3 months',
        },
        {
          value: [
            today.subtract(6, 'month').startOf('month').format('YYYY-MM-DD'),
            today.startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last 6 months',
        },
        {
          value: [
            today.startOf('year').format('YYYY-MM-DD'),
            today.startOf('month').format('YYYY-MM-DD'),
          ],
          label: '今年',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').startOf('month').format('YYYY-MM-DD'),
          ],
          label: '去年',
        },
      ]}
    />
  );
}

export const presetsRange: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
  defaultExpanded: false,
};
