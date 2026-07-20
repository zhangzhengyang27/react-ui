import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return <ColorInput withEyeDropper={false} label="不带取色器" placeholder="无取色器" />;
}
`;

function Demo() {
  return <ColorInput withEyeDropper={false} label="不带取色器" placeholder="无取色器" />;
}

export const noEyeDropper: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
