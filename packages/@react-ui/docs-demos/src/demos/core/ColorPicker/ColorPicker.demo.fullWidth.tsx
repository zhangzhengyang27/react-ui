import { ColorPicker } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ColorPicker } from '@react-ui/ui';

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}
`;

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}

export const fullWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
