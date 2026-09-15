import { InlineDateTimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { InlineDateTimePicker } from '@xiaoye-react/ui';

function Demo() {
  return <InlineDateTimePicker type="range" />;
}
`;

function Demo() {
  return <InlineDateTimePicker type="range" />;
}

export const range: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
