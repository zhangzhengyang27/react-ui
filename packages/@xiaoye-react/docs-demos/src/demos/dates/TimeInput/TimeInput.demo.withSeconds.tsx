import { TimeInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TimeInput } from '@xiaoye-react/dates';

function Demo() {
  return <TimeInput withSeconds />;
}
`;

function Demo() {
  return <TimeInput withSeconds />;
}

export const withSeconds: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
