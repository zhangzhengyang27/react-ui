import { TimePicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return (
    <TimePicker label="Enter time" withSeconds hoursPlaceholder="09" minutesPlaceholder="50" secondsPlaceholder="11" />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withSeconds
      hoursPlaceholder="09"
      minutesPlaceholder="50"
      secondsPlaceholder="11"
    />
  );
}

export const withPlaceholders: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
