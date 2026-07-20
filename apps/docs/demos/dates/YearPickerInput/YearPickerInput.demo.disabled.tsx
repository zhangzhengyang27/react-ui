import { YearPickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { YearPickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <YearPickerInput
      valueFormat="YY"
      type="multiple"
      label="已禁用"
      placeholder="选择年份"
      disabled
    />
  );
}
`;

function Demo() {
  return (
    <YearPickerInput
      valueFormat="YY"
      type="multiple"
      label="已禁用"
      placeholder="选择年份"
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
