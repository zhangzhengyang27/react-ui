import dayjs from 'dayjs';
import { Indicator } from '@react-ui/ui';
import { DatePickerInput, DatePickerInputProps } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import dayjs from 'dayjs';
import { Indicator } from '@react-ui/ui';
import { DatePickerInput, DatePickerInputProps } from '@react-ui/dates';

const dayRenderer: DatePickerInputProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      renderDay={dayRenderer}
    />
  );
}
`;

const dayRenderer: DatePickerInputProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return <DatePickerInput label="Pick date" placeholder="Pick date" renderDay={dayRenderer} />;
}

export const renderDay: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
