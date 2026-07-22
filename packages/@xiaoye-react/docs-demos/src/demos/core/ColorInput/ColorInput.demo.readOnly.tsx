import { ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorInput } from '@xiaoye-react/ui';

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
