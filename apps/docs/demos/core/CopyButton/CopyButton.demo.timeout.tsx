import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { CopyIcon } from '@phosphor-icons/react/dist/csr/Copy'
import { ActionIcon, CopyButton, Tooltip } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon, CopyButton, Tooltip } from '@xiaoye-react/ui';
import { CopyIcon } from '@phosphor-icons/react/dist/csr/Copy';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
function Demo() {
  return (
    <CopyButton value="#" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

`

function Demo() {
    return (
        <CopyButton value="#" timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )
}

export const timeout: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
