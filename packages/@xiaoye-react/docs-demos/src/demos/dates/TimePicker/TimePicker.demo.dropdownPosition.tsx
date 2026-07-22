import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <TimePicker
      label="输入时间"
      withDropdown
      popoverProps={{
        position: 'top-start',
        middlewares: { flip: false, shift: false },
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
      popoverProps={{
        position: 'top-start',
        middlewares: { flip: false, shift: false },
      }}
    />
  );
}

export const dropdownPosition: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
