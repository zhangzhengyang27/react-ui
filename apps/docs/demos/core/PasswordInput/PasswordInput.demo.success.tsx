import { PasswordInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';

function Demo() {
  return <PasswordInput label="密码输入" placeholder="密码输入" success="看起来不错！" />;
}
`;

function Demo() {
  return (
    <PasswordInput label="密码输入" placeholder="密码输入" success="看起来不错！" />
  );
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
