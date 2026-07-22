import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <>
      <TimePicker label="输入时间（24小时制）" min="10:00" max="18:30" />
      <TimePicker label="输入时间（12小时制）" min="10:00" max="18:30" format="12h" mt="md" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TimePicker label="输入时间（24小时制）" min="10:00" max="18:30" />
      <TimePicker label="输入时间（12小时制）" min="10:00" max="18:30" format="12h" mt="md" />
    </>
  );
}

export const minMax: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
