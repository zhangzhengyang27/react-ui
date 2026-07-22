import { getTimeRange, TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { getTimeRange, TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      presets={getTimeRange({ startTime: '06:00:00', endTime: '18:00:00', interval: '01:30:00' })}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      presets={getTimeRange({ startTime: '06:00:00', endTime: '18:00:00', interval: '01:30:00' })}
    />
  );
}

export const presetsRange: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
