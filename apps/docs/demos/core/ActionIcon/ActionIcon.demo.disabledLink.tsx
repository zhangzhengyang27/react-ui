import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/csr/ArrowSquareOut'
import { ActionIcon } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon } from '@xiaoye-react/ui';
import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/csr/ArrowSquareOut';
function Demo() {
  return (
    <ActionIcon
      component="a"
      href="#"
      data-disabled
      size="xl"
      aria-label="在新标签页中打开"
      onClick={(event) => event.preventDefault()}
    >
      <ArrowSquareOutIcon />
    </ActionIcon>
  );
}
`

function Demo() {
    return (
        <ActionIcon
            component="a"
            href="#"
            data-disabled
            size="xl"
            aria-label="在新标签页中打开"
            onClick={event => event.preventDefault()}
        >
            <ArrowSquareOutIcon />
        </ActionIcon>
    )
}

export const disabledLink: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
