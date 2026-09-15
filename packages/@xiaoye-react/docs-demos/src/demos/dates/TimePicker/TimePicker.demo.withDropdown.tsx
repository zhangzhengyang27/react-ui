import { TimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <TimePicker label="输入时间（24小时制）" withSeconds withDropdown />
      <TimePicker label="输入时间（12小时制）" withSeconds withDropdown format="12h" mt="md" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TimePicker label="输入时间（24小时制）" withSeconds withDropdown />
      <TimePicker label="输入时间（12小时制）" withSeconds withDropdown format="12h" mt="md" />
    </>
  );
}

export const withDropdown: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
