import { useState } from 'react'
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock'
import { ActionIcon } from '@xiaoye-react/ui'
import { TimePicker } from '@xiaoye-react/dates'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock';
import { ActionIcon } from '@xiaoye-react/ui';
import { TimePicker } from '@xiaoye-react/dates';

function Demo() {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [value, setValue] = useState('');

  return (
    <TimePicker
      withDropdown
      rightSection={
        <ActionIcon onClick={() => setDropdownOpened(true)} variant="default">
          <ClockIcon size={18} />
        </ActionIcon>
      }
      value={value}
      onChange={(val) => {
        setValue(val);
        if (value === '') {
          setDropdownOpened(false);
        }
      }}
      popoverProps={{
        opened: dropdownOpened,
        onChange: (_opened) => !_opened && setDropdownOpened(false),
      }}
    />
  );
}
`

function Demo() {
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [value, setValue] = useState('')

    return (
        <TimePicker
            withDropdown
            rightSection={
                <ActionIcon onClick={() => setDropdownOpened(true)} variant="default">
                    <ClockIcon size={18} />
                </ActionIcon>
            }
            value={value}
            onChange={val => {
                setValue(val)
                if (value === '') {
                    setDropdownOpened(false)
                }
            }}
            popoverProps={{
                opened: dropdownOpened,
                onChange: _opened => !_opened && setDropdownOpened(false)
            }}
        />
    )
}

export const controlledDropdown: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
