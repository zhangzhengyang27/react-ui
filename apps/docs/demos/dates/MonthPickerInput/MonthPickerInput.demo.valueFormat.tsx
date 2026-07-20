import { MonthPickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MonthPickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="选择月份"
      placeholder="选择月份"
    />
  );
}
`;

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="选择月份"
      placeholder="选择月份"
    />
  );
}

export const valueFormat: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
