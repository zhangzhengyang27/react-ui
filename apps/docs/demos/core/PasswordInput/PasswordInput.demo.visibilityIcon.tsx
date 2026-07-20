import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { PasswordInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <EyeSlashIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <EyeIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

function Demo() {
  return (
    <PasswordInput
      maw={320}
      mx="auto"
      label="更改可见性切换图标"
      placeholder="更改可见性切换图标"
      defaultValue="secret"
      visibilityToggleIcon={VisibilityToggleIcon}
    />
  );
}
`;

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <EyeSlashIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <EyeIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

function Demo() {
  return (
    <PasswordInput
      maw={320}
      mx="auto"
      label="更改可见性切换图标"
      placeholder="更改可见性切换图标"
      defaultValue="secret"
      visibilityToggleIcon={VisibilityToggleIcon}
    />
  );
}

export const visibilityIcon: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
