import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return <TimePicker label="输入时长" type="duration" withSeconds />;
}
`;

function Demo() {
  return <TimePicker label="输入时长" type="duration" withSeconds />;
}

export const duration: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
