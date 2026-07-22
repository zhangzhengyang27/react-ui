import { ColorPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorPicker } from '@xiaoye-react/ui';

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}
`;

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}

export const fullWidth: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
