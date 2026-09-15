import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Stack } from '@xiaoye-react/ui'
import { DateTimePicker } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { Stack } from '@xiaoye-react/ui';
import { DateTimePicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <DateTimePicker
        label="clearSectionMode='both'（默认）"
        placeholder="选择日期和时间"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <DateTimePicker
        label="clearSectionMode='rightSection'"
        placeholder="选择日期和时间"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <DateTimePicker
        label="clearSectionMode='clear'"
        placeholder="选择日期和时间"
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
            <DateTimePicker
                label="clearSectionMode='both'（默认）"
                placeholder="选择日期和时间"
                defaultValue={new Date('2024-01-15')}
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="both"
            />

            <DateTimePicker
                label="clearSectionMode='rightSection'"
                placeholder="选择日期和时间"
                defaultValue={new Date('2024-01-15')}
                clearable
                rightSection={<CaretDownIcon size={16} />}
                clearSectionMode="rightSection"
            />

            <DateTimePicker
                label="clearSectionMode='clear'"
                placeholder="选择日期和时间"
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
