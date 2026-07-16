import { PasswordInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';

function Demo() {
  return <PasswordInput placeholder="你的密码" loading />;
}
`;

function Demo() {
  return <PasswordInput placeholder="你的密码" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
