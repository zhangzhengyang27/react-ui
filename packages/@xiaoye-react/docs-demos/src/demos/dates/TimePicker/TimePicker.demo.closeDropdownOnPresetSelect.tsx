import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      closeDropdownOnPresetSelect
      presets={['12:30', '15:45', '18:00', '20:15', '22:30']}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      closeDropdownOnPresetSelect
      presets={['12:30', '15:45', '18:00', '20:15', '22:30']}
    />
  );
}

export const closeDropdownOnPresetSelect: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
