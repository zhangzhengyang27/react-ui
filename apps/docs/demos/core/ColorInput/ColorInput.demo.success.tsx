import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return <ColorInput label="颜色" placeholder="颜色" success="颜色已接受" />;
}
`;

function Demo() {
  return <ColorInput label="颜色" placeholder="颜色" success="颜色已接受" />;
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
