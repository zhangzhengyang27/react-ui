import { LockIcon } from '@phosphor-icons/react';
import { PasswordInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { PasswordInputStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { LockIcon } from '@phosphor-icons/react';
import { PasswordInput } from '@react-ui/ui';

function Demo() {
  return (
    <PasswordInput
      label="Label"
      placeholder="PasswordInput"
      description="Description"
      error="Error"
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
      label="Label"
      placeholder="PasswordInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<LockIcon size={18} />}
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: PasswordInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
