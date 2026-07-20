import { ColorPicker } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorPicker } from '@react-ui/ui';

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
