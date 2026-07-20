import { DatePickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <DatePickerInput
      weekendDays={[1, 2]}
      label="周末是周一和周二"
      placeholder="选择日期"
    />
  );
}
`;

function Demo() {
  return (
    <DatePickerInput
      weekendDays={[1, 2]}
      label="周末是周一和周二"
      placeholder="选择日期"
    />
  );
}

export const weekendDays: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
