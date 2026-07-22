import { TimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  return <TimePicker label="输入时间" clearable defaultValue="12:34:44" />;
}
`;

function Demo() {
  return <TimePicker label="输入时间" clearable defaultValue="12:34:44" />;
}

export const clearable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
