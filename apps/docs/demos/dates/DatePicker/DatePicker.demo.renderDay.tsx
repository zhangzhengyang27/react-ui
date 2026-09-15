import dayjs from 'dayjs';
import { Indicator } from '@xiaoye-react/ui';
import { DatePicker, DatePickerProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { Indicator } from '@xiaoye-react/ui';
import { DatePicker, DatePickerProps } from '@xiaoye-react/ui';

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return <DatePicker renderDay={dayRenderer} />;
}
`;

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return <DatePicker renderDay={dayRenderer} />;
}

export const renderDay: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
