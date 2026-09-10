import { XCircleIcon } from '@phosphor-icons/react/dist/csr/XCircle'
import { CloseButton } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { XCircleIcon } from '@phosphor-icons/react/dist/csr/XCircle';
import { CloseButton } from '@xiaoye-react/ui';

function Demo() {
  return <CloseButton icon={<XCircleIcon size={18} />} />;
}
`

function Demo() {
    return <CloseButton icon={<XCircleIcon size={18} />} />
}

export const icon: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true
}
