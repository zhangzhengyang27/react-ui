import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Stack } from '@xiaoye-react/ui'
import { MonthPickerInput } from '@xiaoye-react/dates'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { Stack } from '@xiaoye-react/ui';
import { MonthPickerInput } from '@xiaoye-react/dates';

function Demo() {
  return (
    <Stack>
      <MonthPickerInput
        label="clearSectionMode='both'（默认）"
        placeholder="选择月份"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <MonthPickerInput
        label="clearSectionMode='rightSection'"
        placeholder="选择月份"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <MonthPickerInput
        label="clearSectionMode='clear'"
        placeholder="选择月份"
        defaultValue={new Date('2024-01-15')}
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
            <MonthPickerInput
                label="clearSectionMode='both'（默认）"
                placeholder="选择月份"
                defaultValue={new Date('2024-01-15')}
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="both"
            />

            <MonthPickerInput
                label="clearSectionMode='rightSection'"
                placeholder="选择月份"
                defaultValue={new Date('2024-01-15')}
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="rightSection"
            />

            <MonthPickerInput
                label="clearSectionMode='clear'"
                placeholder="选择月份"
                defaultValue={new Date('2024-01-15')}
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
