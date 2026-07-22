import { PasswordInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { PasswordInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <PasswordInput disabled label="已禁用密码输入" placeholder="已禁用密码输入" />
  );
}
`;

function Demo() {
  return (
    <PasswordInput disabled label="已禁用密码输入" placeholder="已禁用密码输入" />
  );
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
