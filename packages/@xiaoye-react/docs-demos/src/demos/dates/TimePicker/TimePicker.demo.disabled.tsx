import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return <TimePicker label="输入时间" disabled />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" disabled />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
