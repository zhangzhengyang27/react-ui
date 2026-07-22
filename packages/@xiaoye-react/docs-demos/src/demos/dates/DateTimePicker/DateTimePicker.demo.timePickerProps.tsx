import { DateTimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DateTimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <DateTimePicker
      label="选择日期和时间"
      placeholder="选择日期和时间"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      label="选择日期和时间"
      placeholder="选择日期和时间"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
    />
  );
}

export const timePickerProps: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
