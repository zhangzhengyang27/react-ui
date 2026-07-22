import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      withSeconds
      format="12h"
      popoverProps={{
        width: 'target',
      }}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      withSeconds
      format="12h"
      popoverProps={{
        width: 'target',
      }}
    />
  );
}

export const dropdownWidth: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
