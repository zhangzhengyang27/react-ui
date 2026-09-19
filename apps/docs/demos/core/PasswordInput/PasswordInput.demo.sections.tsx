import { LockIcon } from '@phosphor-icons/react/dist/csr/Lock'
import { PasswordInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { PasswordInput } from '@xiaoye-react/ui';
import { LockIcon } from '@phosphor-icons/react/dist/csr/Lock';
function Demo() {
  const icon = <LockIcon size={18} />;

  return (
    <PasswordInput
      leftSection={icon}
      leftSectionPointerEvents="none"
      label="带左侧区域"
      placeholder="带左侧区域"
    />
  );
}
`

function Demo() {
    const icon = <LockIcon size={18} />

    return (
        <PasswordInput
            leftSection={icon}
            leftSectionPointerEvents="none"
            label="带左侧区域"
            placeholder="带左侧区域"
        />
    )
}

export const sections: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
