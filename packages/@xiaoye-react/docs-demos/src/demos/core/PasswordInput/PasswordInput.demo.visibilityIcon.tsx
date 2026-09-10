import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye'
import { EyeSlashIcon } from '@phosphor-icons/react/dist/csr/EyeSlash'
import { PasswordInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { PasswordInput } from '@xiaoye-react/ui';
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye';
import { EyeSlashIcon } from '@phosphor-icons/react/dist/csr/EyeSlash';
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
`

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
        <EyeSlashIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
        <EyeIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    )

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
    )
}

export const visibilityIcon: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
