import { ColorInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return <ColorInput label="Color" placeholder="Color" success="Color accepted" />;
}
`;

function Demo() {
  return <ColorInput label="Color" placeholder="Color" success="Color accepted" />;
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
