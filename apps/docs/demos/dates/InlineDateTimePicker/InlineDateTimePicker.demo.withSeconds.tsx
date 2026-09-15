import { InlineDateTimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { InlineDateTimePicker } from '@xiaoye-react/ui';

function Demo() {
  return <InlineDateTimePicker withSeconds />;
}
`;

function Demo() {
  return <InlineDateTimePicker withSeconds />;
}

export const withSeconds: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
