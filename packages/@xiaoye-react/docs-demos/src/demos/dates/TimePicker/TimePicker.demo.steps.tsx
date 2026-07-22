import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withSeconds
      withDropdown
      hoursStep={1}
      minutesStep={5}
      secondsStep={10}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withSeconds
      withDropdown
      hoursStep={1}
      minutesStep={5}
      secondsStep={10}
    />
  );
}

export const steps: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
