import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker label="输入时间" withSeconds hoursPlaceholder="09" minutesPlaceholder="50" secondsPlaceholder="11" />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withSeconds
      hoursPlaceholder="09"
      minutesPlaceholder="50"
      secondsPlaceholder="11"
    />
  );
}

export const withPlaceholders: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
