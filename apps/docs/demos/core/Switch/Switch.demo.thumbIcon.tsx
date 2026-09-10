import { useState } from 'react'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import { Switch } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { Switch } from '@xiaoye-react/ui';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="带滑块图标的开关"
      thumbIcon={
        checked ? (
          <CheckIcon size={12} color="var(--ui-color-teal-6)" />
        ) : (
          <XIcon size={12} color="var(--ui-color-red-6)" />
        )
      }
    />
  );
}
`

function Demo() {
    const [checked, setChecked] = useState(false)

    return (
        <Switch
            checked={checked}
            onChange={event => setChecked(event.currentTarget.checked)}
            color="teal"
            size="md"
            label="带滑块图标的开关"
            thumbIcon={
                checked ? (
                    <CheckIcon size={12} color="var(--ui-color-teal-6)" />
                ) : (
                    <XIcon size={12} color="var(--ui-color-red-6)" />
                )
            }
        />
    )
}

export const thumbIcon: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
