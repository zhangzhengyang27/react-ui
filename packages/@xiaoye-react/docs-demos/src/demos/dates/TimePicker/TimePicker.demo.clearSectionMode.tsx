import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Stack } from '@xiaoye-react/ui'
import { TimePicker } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { Stack } from '@xiaoye-react/ui';
import { TimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <TimePicker
        label="clearSectionMode='both'（默认）"
        defaultValue="12:30"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <TimePicker
        label="clearSectionMode='rightSection'"
        defaultValue="12:30"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <TimePicker
        label="clearSectionMode='clear'"
        defaultValue="12:30"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
`

function Demo() {
    return (
        <Stack>
            <TimePicker
                label="clearSectionMode='both'（默认）"
                defaultValue="12:30"
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="both"
            />

            <TimePicker
                label="clearSectionMode='rightSection'"
                defaultValue="12:30"
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="rightSection"
            />

            <TimePicker
                label="clearSectionMode='clear'"
                defaultValue="12:30"
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="clear"
            />
        </Stack>
    )
}

export const clearSectionMode: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    maxWidth: 340,
    centered: true
}
