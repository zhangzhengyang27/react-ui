import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import { Notification } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { Notification } from '@xiaoye-react/ui';

function Demo() {
  const xIcon = <XIcon size={20} />;
  const checkIcon = <CheckIcon size={20} />;

  return (
    <>
      <Notification icon={xIcon} color="red" title="糟糕！">
        Something went wrong
      </Notification>
      <Notification icon={checkIcon} color="teal" title="一切正常！" mt="md">
        Everything is fine
      </Notification>
    </>
  );
}
`

function Demo() {
    const xIcon = <XIcon size={20} />
    const checkIcon = <CheckIcon size={20} />

    return (
        <>
            <Notification icon={xIcon} color="red" title="糟糕！">
                Something went wrong
            </Notification>
            <Notification icon={checkIcon} color="teal" title="一切正常！" mt="md">
                Everything is fine
            </Notification>
        </>
    )
}

export const icon: UIDemo = {
    type: 'code',
    component: Demo,
    dimmed: true,
    maxWidth: 400,
    centered: true,
    code
}
