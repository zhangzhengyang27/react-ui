import { Input } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Input } from '@xiaoye-react/ui';

function Demo() {
  return <Input placeholder="你的邮箱" loading />;
}
`;

function Demo() {
  return <Input placeholder="你的邮箱" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
