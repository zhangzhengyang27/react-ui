import { TimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TimePicker } from '@react-ui/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时长"
      type="duration"
      withSeconds
      minHoursDigits={3}
    />
  );
}
`;

function Demo() {
  return <TimePicker label="输入时长" type="duration" withSeconds minHoursDigits={3} />;
}

export const minHoursDigits: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
