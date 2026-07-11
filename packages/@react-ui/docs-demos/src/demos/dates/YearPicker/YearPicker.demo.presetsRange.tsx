import dayjs from 'dayjs';
import { YearPicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { YearPicker } from '@react-ui/dates';

function Demo() {
  const today = dayjs();

  return (
    <YearPicker
      type="range"
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
          label: 'Last decade',
        },
      ]}
    />
  );
}
`;

function Demo() {
  const today = dayjs();

  return (
    <YearPicker
      type="range"
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
          label: 'Last decade',
        },
      ]}
    />
  );
}

export const presetsRange: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
  defaultExpanded: false,
};
