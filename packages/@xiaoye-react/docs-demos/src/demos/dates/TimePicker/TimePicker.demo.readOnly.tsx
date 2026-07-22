import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return <TimePicker label="输入时间" defaultValue="12:45:33" readOnly />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" defaultValue="12:45:33" readOnly />;
}

export const readOnly: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
