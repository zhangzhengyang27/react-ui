import { ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorInput } from '@xiaoye-react/ui';

function Demo() {
  return <ColorInput placeholder="选择颜色" loading />;
}
`;

function Demo() {
  return <ColorInput placeholder="选择颜色" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
