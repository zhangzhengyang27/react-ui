import dayjs from 'dayjs';
import { Indicator } from '@xiaoye-react/ui';
import { Calendar } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { Indicator } from '@xiaoye-react/ui';
import { Calendar } from '@xiaoye-react/dates';

function Demo() {
  return (
    <Calendar
      static
      renderDay={(date) => {
        const day = dayjs(date).date();
        return (
          <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
}
`;

function Demo() {
  return (
    <Calendar
      static
      renderDay={(date) => {
        const day = dayjs(date).date();
        return (
          <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
}

export const isStatic: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
