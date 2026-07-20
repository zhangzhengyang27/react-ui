import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@react-ui/ui';
import { MonthPickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@react-ui/ui';
import { MonthPickerInput } from '@react-ui/dates';

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
`;

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

export const clearSectionMode: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
