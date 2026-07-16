import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Input } from '@react-ui/ui';

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
