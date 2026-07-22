import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      maxDropdownContentHeight={300}
      presets={[
        { label: '上午', values: ['06:00:00', '08:00:00', '10:00:00'] },
        { label: '下午', values: ['12:00:00', '14:00:00', '16:00:00'] },
        { label: '晚上', values: ['18:00:00', '20:00:00', '22:00:00'] },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      maxDropdownContentHeight={300}
      presets={[
        { label: '上午', values: ['06:00', '06:30', '08:00', '08:30', '10:00', '10:45'] },
        { label: '下午', values: ['12:00', '12:30', '14:00', '14:45', '16:00', '17:30'] },
        { label: '晚上', values: ['18:00', '18:30', '20:00', '22:00'] },
      ]}
    />
  );
}

export const presetsGroups: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
