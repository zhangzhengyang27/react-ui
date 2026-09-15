import { InlineDateTimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { InlineDateTimePicker } from '@xiaoye-react/ui';

function Demo() {
  return <InlineDateTimePicker type="range" valueFormat="MMMM YYYY, DD HH:mm" />;
}
`;

function Demo() {
  return <InlineDateTimePicker type="range" valueFormat="MMMM YYYY, DD HH:mm" />;
}

export const format: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
