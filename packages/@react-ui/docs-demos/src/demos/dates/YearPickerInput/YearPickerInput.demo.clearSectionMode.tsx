import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@react-ui/ui';
import { YearPickerInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@react-ui/ui';
import { YearPickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <Stack>
      <YearPickerInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <YearPickerInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <YearPickerInput
        label="clearSectionMode='clear'"
        placeholder="Pick year"
        defaultValue={new Date()}
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
      <YearPickerInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <YearPickerInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <YearPickerInput
        label="clearSectionMode='clear'"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}

export const clearSectionMode: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
