import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart'
import { ActionIcon, Tooltip } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon, Tooltip } from '@xiaoye-react/ui';
import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart';
function Demo() {
  return (
    <Tooltip label="禁用按钮的提示">
      <ActionIcon
        aria-label="悬停查看提示"
        size="xl"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        <HeartIcon />
      </ActionIcon>
    </Tooltip>
  );
}
`

function Demo() {
    return (
        <Tooltip label="禁用按钮的提示">
            <ActionIcon aria-label="悬停查看提示" size="xl" data-disabled onClick={event => event.preventDefault()}>
                <HeartIcon />
            </ActionIcon>
        </Tooltip>
    )
}

export const disabledTooltip: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
