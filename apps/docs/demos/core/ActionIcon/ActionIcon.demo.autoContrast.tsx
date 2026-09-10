import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint'
import { ActionIcon, Group } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { FingerprintIcon } from '@phosphor-icons/react/dist/csr/Fingerprint';
import { ActionIcon, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Group>
      <ActionIcon aria-label="默认操作图标" size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ActionIcon>
      <ActionIcon autoContrast aria-label="自动对比操作图标" size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ActionIcon>
    </Group>
  );
}
`

function Demo() {
    return (
        <Group>
            <ActionIcon aria-label="默认操作图标" size="lg" color="lime.4">
                <FingerprintIcon size={20} />
            </ActionIcon>
            <ActionIcon autoContrast aria-label="自动对比操作图标" size="lg" color="lime.4">
                <FingerprintIcon size={20} />
            </ActionIcon>
        </Group>
    )
}

export const autoContrast: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true
}
