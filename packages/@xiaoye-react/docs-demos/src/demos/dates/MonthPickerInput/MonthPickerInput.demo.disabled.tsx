import { MonthPickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MonthPickerInput } from '@xiaoye-react/dates';

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="已禁用"
      placeholder="选择月份"
      disabled
    />
  );
}
`;

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="已禁用"
      placeholder="选择月份"
      disabled
    />
  );
}

export const disabled: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
