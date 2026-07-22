import { LockIcon } from '@phosphor-icons/react';
import { PasswordInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { PasswordInputStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { LockIcon } from '@phosphor-icons/react';
import { PasswordInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <PasswordInput
      label="标签"
      placeholder="密码输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<LockIcon size={18} />}
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <PasswordInput
      label="标签"
      placeholder="密码输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<LockIcon size={18} />}
      {...props}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: PasswordInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
