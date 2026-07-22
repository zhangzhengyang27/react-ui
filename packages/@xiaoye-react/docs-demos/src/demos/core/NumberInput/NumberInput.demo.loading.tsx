import { NumberInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return <NumberInput placeholder="年龄" loading />;
}
`;

function Demo() {
  return <NumberInput placeholder="年龄" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
