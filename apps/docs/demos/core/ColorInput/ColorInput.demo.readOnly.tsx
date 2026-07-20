import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return <ColorInput readOnly label="无法修改值" defaultValue="#F0FCFE" />;
}
`;

function Demo() {
  return <ColorInput readOnly label="无法修改值" defaultValue="#F0FCFE" />;
}

export const readOnly: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
