import { AtomIcon } from '@phosphor-icons/react/dist/csr/Atom'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { AtomIcon } from '@phosphor-icons/react/dist/csr/Atom';
function Demo() {
  return (
    <AtomIcon
      size={80}
      color="var(--ui-color-blue-filled)"
    />
  );
}
`

function Demo() {
    return <AtomIcon size={80} color="var(--ui-color-blue-filled)" />
}

export const icon: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
