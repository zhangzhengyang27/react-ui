import { DatePickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePickerInput } from '@xiaoye-react/dates';

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
