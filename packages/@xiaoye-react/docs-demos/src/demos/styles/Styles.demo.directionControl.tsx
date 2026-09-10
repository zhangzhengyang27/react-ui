import { useEffect } from 'react'
import { TextAlignLeftIcon } from '@phosphor-icons/react/dist/csr/TextAlignLeft'
import { TextAlignRightIcon } from '@phosphor-icons/react/dist/csr/TextAlignRight'
import { ActionIcon, useDirection } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon, useDirection } from '@xiaoye-react/ui';
import { TextAlignLeftIcon } from '@phosphor-icons/react/dist/csr/TextAlignLeft';
import { TextAlignRightIcon } from '@phosphor-icons/react/dist/csr/TextAlignRight';
function Demo() {
  const { toggleDirection, dir } = useDirection();
  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" size="lg">
      {dir === 'rtl' ? (
        <TextAlignLeftIcon />
      ) : (
        <TextAlignRightIcon />
      )}
    </ActionIcon>
  );
}
`

function Demo() {
    const { toggleDirection, dir, setDirection } = useDirection()
    useEffect(() => () => setDirection('ltr'), [])

    return (
        <ActionIcon onClick={() => toggleDirection()} variant="default" size="lg">
            {dir === 'rtl' ? <TextAlignLeftIcon /> : <TextAlignRightIcon />}
        </ActionIcon>
    )
}

export const directionControl: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
