import dayjs from 'dayjs';
import { YearPickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { YearPickerInput } from '@xiaoye-react/ui';

function Demo() {
  const today = dayjs('2024-01-15');

  return (
    <YearPickerInput
      type="range"
      label="带预设"
      placeholder="选择年份范围"
      presets={[
        {
          value: [today.subtract(2, 'year').startOf('year').format('YYYY-MM-DD'), today.startOf('year').format('YYYY-MM-DD')],
          label: 'Last 2 years',
        },
        {
          value: [today.subtract(5, 'year').startOf('year').format('YYYY-MM-DD'), today.startOf('year').format('YYYY-MM-DD')],
          label: 'Last 5 years',
        },
        {
          value: [today.startOf('year').format('YYYY-MM-DD'), today.add(5, 'year').startOf('year').format('YYYY-MM-DD')],
          label: 'Next 5 years',
        },
        {
          value: [
            today.subtract(10, 'year').startOf('year').format('YYYY-MM-DD'),
            today.startOf('year').format('YYYY-MM-DD'),
          ],
          label: '过去十年',
        },
      ]}
    />
  );
}
`;

function Demo() {
  const today = dayjs('2024-01-15');

  return (
    <YearPickerInput
      type="range"
      label="带预设"
      placeholder="选择年份范围"
      presets={[
        {
          value: [
            today.subtract(2, 'year').startOf('year').format('YYYY-MM-DD'),
            today.startOf('year').format('YYYY-MM-DD'),
          ],
          label: 'Last 2 years',
        },
        {
          value: [
            today.subtract(5, 'year').startOf('year').format('YYYY-MM-DD'),
            today.startOf('year').format('YYYY-MM-DD'),
          ],
          label: 'Last 5 years',
        },
        {
          value: [
            today.startOf('year').format('YYYY-MM-DD'),
            today.add(5, 'year').startOf('year').format('YYYY-MM-DD'),
          ],
          label: 'Next 5 years',
        },
        {
          value: [
            today.subtract(10, 'year').startOf('year').format('YYYY-MM-DD'),
            today.startOf('year').format('YYYY-MM-DD'),
          ],
          label: '过去十年',
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
