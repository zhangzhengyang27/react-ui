import { DateTimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DateTimePicker } from '@react-ui/dates';

function Demo() {
  return (
    <DateTimePicker
      dropdownType="modal"
      label="选择日期和时间"
      placeholder="选择日期和时间"
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      dropdownType="modal"
      label="选择日期和时间"
      placeholder="选择日期和时间"
    />
  );
}

export const modal: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
