import { DatePickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <DatePickerInput
      withWeekNumbers
      label="显示周数"
      placeholder="选择日期"
    />
  );
}
`;

function Demo() {
  return <DatePickerInput withWeekNumbers label="显示周数" placeholder="选择日期" />;
}

export const withWeekNumbers: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
