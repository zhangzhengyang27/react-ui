import { DatePickerInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DatePickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <DatePickerInput
      withWeekNumbers
      label="With week numbers"
      placeholder="Pick date"
    />
  );
}
`;

function Demo() {
  return <DatePickerInput withWeekNumbers label="With week numbers" placeholder="Pick date" />;
}

export const withWeekNumbers: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
