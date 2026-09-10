import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart'
import { ActionIcon } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon } from '@xiaoye-react/ui';
import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart';
function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="数字尺寸的操作图标">
      <HeartIcon size={24} />
    </ActionIcon>
  );
}
`

function Demo() {
    return (
        <ActionIcon size={42} variant="default" aria-label="数字尺寸的操作图标">
            <HeartIcon size={24} />
        </ActionIcon>
    )
}

export const size: UIDemo = {
    type: 'code',
    centered: true,
    component: Demo,
    code
}
