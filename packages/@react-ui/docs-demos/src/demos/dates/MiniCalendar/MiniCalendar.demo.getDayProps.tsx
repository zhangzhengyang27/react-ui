import dayjs from 'dayjs';
import { MiniCalendar } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { MiniCalendar } from '@react-ui/dates';

function Demo() {
  return (
    <MiniCalendar
      numberOfDays={6}
      getDayProps={(date) => ({
        style: {
          color: [0, 6].includes(dayjs(date).day()) ? 'var(--ui-color-red-8)' : undefined,
        },
      })}
    />
  );
}
`;

function Demo() {
  return (
    <MiniCalendar
      numberOfDays={6}
      getDayProps={(date) => ({
        style: {
          color: [0, 6].includes(dayjs(date).day()) ? 'var(--ui-color-red-8)' : undefined,
        },
      })}
    />
  );
}

export const getDayProps: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
