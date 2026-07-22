import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@xiaoye-react/ui';
import { DatePickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@xiaoye-react/ui';
import { DatePickerInput } from '@xiaoye-react/dates';

function Demo() {
  return (
    <Stack>
      <DatePickerInput
        label="clearSectionMode='both'（默认）"
        placeholder="选择日期"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <DatePickerInput
        label="clearSectionMode='rightSection'"
        placeholder="选择日期"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <DatePickerInput
        label="clearSectionMode='clear'"
        placeholder="选择日期"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <DatePickerInput
        label="clearSectionMode='both'（默认）"
        placeholder="选择日期"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <DatePickerInput
        label="clearSectionMode='rightSection'"
        placeholder="选择日期"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <DatePickerInput
        label="clearSectionMode='clear'"
        placeholder="选择日期"
        defaultValue={new Date('2024-01-15')}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}

export const clearSectionMode: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
